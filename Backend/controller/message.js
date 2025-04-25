const messageTemplate = require('../mail/templates/messageTemplate');
const Message = require('../models/message')

const Portfolio = require('../models/Portfolio');
const User = require('../models/User');
const mailSender = require('../utils/mailSender');

exports.sendMessage = async (req, res) => {
    try {
        const { senderName, subject, message, email, slug } = req.body;

        if (!senderName || !subject || !message || !email || !slug) {
            return res.status(400).json({ success: false, message: "All fields are required!" });
        }

        const newMessage = new Message({ senderName, subject, message, email });
        await newMessage.save();

        const portfolio = await Portfolio.findOne({ slug });

        if (!portfolio) {
            return res.status(404).json({ success: false, message: "Portfolio not found!" });
        }

        portfolio.messages.push(newMessage._id);
        await portfolio.save();

        const emailNotifications = portfolio.emailNotifications;


        if (emailNotifications) {
            const userId = portfolio.userId;
            const user = await User.findById(userId)

            const userEmail = user.email;
            const userName = user.firstName + " " + user.lastName;
            const link  = portfolio.deployLink;
            mailSender(userEmail, `Heads Up ${userName}! You Got a New Portfolio Message`, messageTemplate(senderName, subject, message, email,userName,link))
        }

        // Respond
        res.status(200).json({
            success: true,
            message: "Message sent!",
            data: newMessage
        });

    } catch (err) {
        console.error("Message Send Error:", err);
        res.status(500).json({ success: false, message: "Server error while sending message." });
    }
};


exports.getMessagesByPortfolioId = async (req, res) => {
    try {
        const { portfolioId } = req.body;

        if (!portfolioId) {
            return res.status(400).json({ success: false, message: "Portfolio ID is required!" });
        }

        const portfolio = await Portfolio.findById(portfolioId).populate('messages');

        if (!portfolio) {
            return res.status(404).json({ success: false, message: "Portfolio not found!" });
        }

        res.status(200).json({
            success: true,
            message: "Messages fetched successfully.",
            data: portfolio.messages
        });

    } catch (err) {
        console.error("Error fetching messages:", err);
        res.status(500).json({ success: false, message: "Server error while fetching messages." });
    }
};


exports.deleteMessageByIdForPortfolio = async (req, res) => {
    try {
        const { messageId, portfolioId } = req.body;

        const portfolio = await Portfolio.findById(portfolioId);
        if (!portfolio) {
            return res.status(404).json({ success: false, message: "Portfolio not found!" });
        }

        const messageExists = portfolio.messages.includes(messageId);
        if (!messageExists) {
            return res.status(404).json({ success: false, message: "Message not found in this portfolio!" });
        }

        await Message.findByIdAndDelete(messageId);

        await Portfolio.findByIdAndUpdate(portfolioId, {
            $pull: { messages: messageId }
        });

        res.status(200).json({
            success: true,
            message: "Message deleted !",
        });

    } catch (err) {
        console.error("Delete Message Error:", err);
        res.status(500).json({ success: false, message: "Server error while deleting message." });
    }
};


exports.toggleEmailNotifications = async (req, res) => {
    const { portfolioId } = req.body;
    try {
        const portfolio = await Portfolio.findById(portfolioId);
        if (!portfolio) {
            return res.status(404).json({ success: false, message: "Portfolio not found" });
        }

        portfolio.emailNotifications = !portfolio.emailNotifications;
        await portfolio.save();

        res.status(200).json({
            success: true,
            emailNotifications: portfolio.emailNotifications,
            message: `Email notifications ${portfolio.emailNotifications ? "enabled" : "disabled"}.`
        });
    } catch (err) {
        console.error("Toggle error:", err);
        res.status(500).json({ success: false, message: "Server error." });
    }
};
