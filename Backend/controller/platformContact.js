const PlatformContact = require('../models/PlatformContact');
const mailSender = require('../utils/mailSender');

exports.submitContactForm = async (req, res) => {
    try {
        const { firstName, lastName, email, message } = req.body;

        if (!firstName || !email || !message) {
            return res.status(400).json({ 
                success: false, 
                message: "First Name, Email, and Message are required fields." 
            });
        }

        const newContact = await PlatformContact.create({
            firstName,
            lastName,
            email,
            message
        });

        // Send Notification Email to Admin
        try {
            await mailSender(
                "generatorportfolio@gmail.com",
                `New Platform Inquiry from ${firstName}`,
                `<div style="font-family: sans-serif; padding: 20px;">
                    <h2 style="color: #4f46e5;">New Message Received</h2>
                    <p><strong>Name:</strong> ${firstName} ${lastName || ""}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <div style="background-color: #f3f4f6; padding: 15px; border-radius: 8px; margin-top: 15px;">
                        <p style="margin: 0; white-space: pre-wrap;">${message}</p>
                    </div>
                </div>`
            );
        } catch (emailErr) {
            console.error("Failed to send admin notification email:", emailErr);
            // Non-blocking: We don't fail the submission if the email fails.
        }

        res.status(200).json({
            success: true,
            message: "Your message has been received successfully. We will get back to you soon!",
            data: newContact
        });

    } catch (error) {
        console.error("Error submitting contact form:", error);
        res.status(500).json({ 
            success: false, 
            message: "Internal server error. Please try again later." 
        });
    }
};

exports.getAllContactMessages = async (req, res) => {
    try {
        // Fetch all messages sorted by newest first
        const messages = await PlatformContact.find().sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            message: "Messages fetched successfully.",
            data: messages
        });

    } catch (error) {
        console.error("Error fetching contact messages:", error);
        res.status(500).json({ 
            success: false, 
            message: "Internal server error while fetching messages." 
        });
    }
};

exports.deleteContactMessage = async (req, res) => {
    try {
        const { messageId } = req.body;

        if (!messageId) {
            return res.status(400).json({ success: false, message: "Message ID is required." });
        }

        const deletedMessage = await PlatformContact.findByIdAndDelete(messageId);

        if (!deletedMessage) {
            return res.status(404).json({ success: false, message: "Message not found." });
        }

        res.status(200).json({
            success: true,
            message: "Message deleted successfully."
        });

    } catch (error) {
        console.error("Error deleting contact message:", error);
        res.status(500).json({ 
            success: false, 
            message: "Internal server error while deleting message." 
        });
    }
};
