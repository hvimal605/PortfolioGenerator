const PDFDocument = require("pdfkit");

/**
 * 📄 Professional PDF Generator for Invoices
 * @param {Object} userData - { firstName, lastName, email }
 * @param {Object} paymentData - { orderId, paymentId, amount, date }
 * @param {Array} purchasedTemplates - [{ name, price }]
 * @returns {Promise<Buffer>}
 */
const generateInvoicePDF = (userData, paymentData, purchasedTemplates) => {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({ margin: 50, size: "A4", bufferPages: true });
      let buffers = [];
      doc.on("data", buffers.push.bind(buffers));
      doc.on("end", () => {
        const pdfData = Buffer.concat(buffers);
        resolve(pdfData);
      });

      // --- 🎨 Professional Palette ---
      const brandColor = "#4F46E5"; // Indigo 600
      const brandDark = "#1E1B4B";  // Indigo 950
      const textColor = "#1F2937";  // Gray 800
      const subTextColor = "#6B7280";// Gray 500
      const borderColor = "#E5E7EB"; // Gray 200
      const highlightBg = "#F3F4F6"; // Gray 100

      // 🏙 Decorative Top Bar
      doc.rect(0, 0, 612, 8).fill(brandColor);

      // 🏷 Header & Branding
      doc
        .font("Helvetica-Bold")
        .fillColor(brandDark)
        .fontSize(28)
        .text("PortfolioCraft", 50, 45)
        .font("Helvetica")
        .fontSize(10)
        .fillColor(subTextColor)
        .text("Empowering Modern Creators", 50, 75, { characterSpacing: 0.5 })
        .text("generatorportfolio@gmail.com", 50, 90);

      // 📄 Invoice Title & Meta
      doc
        .font("Helvetica-Bold")
        .fillColor(brandColor)
        .fontSize(32)
        .text("INVOICE", 50, 45, { align: "right" })
        .font("Helvetica")
        .fontSize(10)
        .fillColor(textColor)
        .text(`Date Issued: ${paymentData.date}`, 50, 85, { align: "right" })
        .font("Helvetica-Bold")
        .text(`Order Ref: #${paymentData.orderId.slice(-8).toUpperCase()}`, 50, 100, { align: "right" })
        .font("Helvetica")
        .fillColor(subTextColor)
        .text(`Payment Method: Online(RAZORPAY)`, 50, 115, { align: "right" });

      doc.moveDown(4);

      // 👤 Billed To Section
      const infoY = 160;
      doc
        .font("Helvetica-Bold")
        .fillColor(subTextColor)
        .fontSize(10)
        .text("BILLED TO:", 50, infoY);

      doc
        .font("Helvetica-Bold")
        .fillColor(textColor)
        .fontSize(14)
        .text(`${userData.firstName} ${userData.lastName}`, 50, infoY + 15);

      doc
        .font("Helvetica")
        .fillColor(subTextColor)
        .fontSize(10)
        .text(userData.email, 50, infoY + 32);

      // ✨ Payment Status Stamp
      doc
        .roundedRect(450, infoY, 110, 30, 4)
        .fillAndStroke("#ECFDF5", "#34D399");
      doc
        .font("Helvetica-Bold")
        .fillColor("#059669")
        .fontSize(14)
        .text("PAID", 450, infoY + 8, { width: 110, align: "center", characterSpacing: 2 });

      // 📊 Table Header
      const tableTop = 260;
      doc
        .roundedRect(50, tableTop, 512, 30, 4)
        .fill(highlightBg);
      
      doc
        .font("Helvetica-Bold")
        .fillColor(textColor)
        .fontSize(10)
        .text("ITEM DESCRIPTION", 70, tableTop + 10)
        .text("AMOUNT", 450, tableTop + 10, { align: "right", width: 90 });

      // 🛍 Items List
      let itemY = tableTop + 45;
      purchasedTemplates.forEach((item, index) => {
        doc
          .font("Helvetica-Bold")
          .fillColor(textColor)
          .fontSize(12)
          .text(item.name, 70, itemY)
          .font("Helvetica")
          .text(`INR ${item.price}`, 450, itemY, { align: "right", width: 90 });
        
        doc
          .strokeColor(borderColor)
          .lineWidth(1)
          .moveTo(50, itemY + 25)
          .lineTo(562, itemY + 25)
          .stroke();

        itemY += 40;
      });

      // 💰 Summary Section
      const summaryY = itemY + 20;
      doc
        .font("Helvetica-Bold")
        .fillColor(subTextColor)
        .fontSize(10)
        .text("TOTAL AMOUNT PAID", 300, summaryY + 5, { width: 140, align: "right" })
        .font("Helvetica-Bold")
        .fillColor(brandColor)
        .fontSize(20)
        .text(`INR ${paymentData.amount}`, 450, summaryY, { align: "right", width: 90 });

      // 🧾 Transaction Proof Badge
      const authY = summaryY + 70;
      doc
        .roundedRect(50, authY, 512, 50, 6)
        .fill(highlightBg);
      
      doc
        .font("Helvetica-Bold")
        .fillColor(subTextColor)
        .fontSize(9)
        .text("AUTHENTICATED TRANSACTION SECURED VIA RAZORPAY", 70, authY + 12)
        .font("Helvetica")
        .fillColor(textColor)
        .fontSize(10)
        .text(`Payment ID: ${paymentData.paymentId}`, 70, authY + 28);

      // 🏁 Footer Note
      const pageBottom = doc.page.height - 70;
      doc
        .strokeColor(borderColor)
        .lineWidth(1)
        .moveTo(50, pageBottom - 20)
        .lineTo(562, pageBottom - 20)
        .stroke();

      doc
        .font("Helvetica")
        .fontSize(9)
        .fillColor(subTextColor)
        .text("Thank you for choosing PortfolioCraft. If you have any questions, please contact our support team.", 50, pageBottom, { align: "center", width: 512 });

      doc.end();
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = { generateInvoicePDF };
