const { instance } = require("../config/razorpay");
const Template = require("../models/Template");
const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const crypto = require("crypto");
const mongoose = require("mongoose");
require("dotenv").config();
const InvoiceTemplate = require("../mail/templates/InvoiceTemplate");
const { generateInvoicePDF } = require("../utils/pdfGenerator");
const PaymentRecord = require("../models/PaymentRecord");

// 💸 Create Razorpay order (initiate payment)
exports.capturePayment = async (req, res) => {
  try {
    const { templates } = req.body; // array of templateIds
    console.log("backend se",templates)
    const userId = req.user.id;

    if (!templates || templates.length === 0) {
      return res.status(400).json({ success: false, message: "No templates provided" });
    }

    let totalAmount = 0;

    // ✅ Calculate total price and check ownership
    const user = await User.findById(userId);
    for (const templateId of templates) {
      const template = await Template.findById(templateId);
      if (!template) {
        return res.status(404).json({ success: false, message: "Template not found" });
      }

      // Check if user already owns this template (compare ObjectIds as strings)
      const alreadyOwned = user.purchasedTemplates.some(id => id.toString() === templateId.toString());
      if (alreadyOwned) {
        return res.status(400).json({
          success: false,
          message: `You already own the ${template.name} template`,
        });
      }

      if (template.templateType === "free") {
        return res.status(400).json({
          success: false,
          message: "Free templates don't require payment",
        });
      }

      totalAmount += template.price || 0;
    }

    if (totalAmount <= 0) {
      return res.status(400).json({
        success: false,
        message: "Total amount must be greater than zero for premium purchases",
      });
    }

    // ✅ Create Razorpay order with Template Metadata (Anti-Exploit)
    const options = {
      amount: totalAmount * 100,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
      notes: {
        templateIds: templates.join(","),
        userId: userId
      }
    };

    const order = await instance.orders.create(options);
    return res.status(200).json({
      success: true,
      data: order,
    });
  } catch (error) {
    console.error("Error in capturePayment:", error);
    return res.status(500).json({ success: false, message: "Payment initiation failed" });
  }
};

// ✅ Verify Razorpay payment and grant access
exports.verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, templates } = req.body;
    const userId = req.user.id;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ success: false, message: "Invalid payment details" });
    }

    // ✅ Verify signature
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(body.toString())
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ success: false, message: "Payment verification failed (Signature mismatch)" });
    }

    // ✅ Order Integrity Check (Verify that templates match the original order notes)
    // This prevents "Template Swapping" exploits.
    const razorpayOrder = await instance.orders.fetch(razorpay_order_id);
    const originalTemplateIds = razorpayOrder.notes.templateIds.split(",");
    
    // Ensure all requested templates were part of the original order
    const isValidOrder = templates.every(tId => originalTemplateIds.includes(tId));
    if (!isValidOrder) {
      console.error(`🚨 FRAUD ATTEMPT: User ${userId} tried to swap templates in verification for order ${razorpay_order_id}`);
      return res.status(403).json({ success: false, message: "Order data mismatch. Verification failed." });
    }

    // ✅ Anti-Replay Check: Ensure this payment hasn't been processed yet
    const existingPayment = await PaymentRecord.findOne({ paymentId: razorpay_payment_id });
    if (existingPayment) {
      console.warn(`🛑 REPLAY ATTACK: Payment ${razorpay_payment_id} already processed.`);
      return res.status(400).json({ success: false, message: "Payment already processed" });
    }

    // ✅ Payment verified → add templates to user's purchased list
    await grantTemplateAccess(templates, userId, {
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id
    });

    return res.status(200).json({ success: true, message: "Payment verified successfully" });
  } catch (error) {
    console.error("Error verifying payment:", error);
    return res.status(500).json({ success: false, message: "Payment verification failed" });
  }
};

const grantTemplateAccess = async (templates, userId, paymentDetails) => {
  let session = null;
  let useTransaction = true;

  try {
    session = await mongoose.startSession();
    session.startTransaction();
  } catch (err) {
    console.warn("⚠️ Transactions not supported. Falling back to simple updates.");
    useTransaction = false;
  }
  
  try {
    const opts = useTransaction ? { session } : {};
    const purchasedItems = [];
    let totalPaid = 0;

    for (const templateId of templates) {
      const template = await Template.findById(templateId).session(useTransaction ? session : null);
      if (!template) continue;

      // Add user to template usage list
      await Template.findByIdAndUpdate(templateId, {
        $addToSet: { usage: userId },
      }, opts);

      // Add template to user's purchased list
      await User.findByIdAndUpdate(userId, {
        $addToSet: { purchasedTemplates: templateId },
      }, opts);

      purchasedItems.push({
        name: template.name,
        price: template.price,
        previewUrl: template.previewUrl
      });
      totalPaid += template.price || 0;
    }

    // ✅ Secure Payment Record Entry (to prevent replays)
    await PaymentRecord.create([
      {
        paymentId: paymentDetails.paymentId,
        orderId: paymentDetails.orderId,
        userId: userId,
        templateIds: templates,
        amount: totalPaid,
      },
    ], opts);

    if (useTransaction) {
      await session.commitTransaction();
    }
    
    console.log(`✅ Access granted for user ${userId} to templates: ${templates.join(", ")}`);

    // ✅ Send Professional Consolidated Invoice
    try {
      const user = await User.findById(userId);
      const invoiceData = {
        orderId: paymentDetails?.orderId || "N/A",
        paymentId: paymentDetails?.paymentId || "N/A",
        amount: totalPaid,
        date: new Date().toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "long",
          year: "numeric"
        })
      };

      // ✅ Generate PDF Attachment
      const pdfBuffer = await generateInvoicePDF(user, invoiceData, purchasedItems);

      await mailSender(
        user.email,
        "Your Template is Ready! 🧾",
        InvoiceTemplate(user, invoiceData),
        [
          {
            filename: `Invoice_${invoiceData.orderId.slice(-8).toUpperCase()}.pdf`,
            content: pdfBuffer,
            contentType: "application/pdf"
          }
        ]
      );
      console.log("✅ Consolidated Invoice Email with PDF sent successfully");
    } catch (err) {
      console.log("❌ Invoice Email Notification failed (but purchase completed):", err);
    }

  } catch (error) {
    if (useTransaction && session) {
      await session.abortTransaction();
    }
    console.error("❌ Error during Template Access Grant:", error);
    throw error;
  } finally {
    if (session) {
      session.endSession();
    }
  }
};

