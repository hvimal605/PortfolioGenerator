const nodemailer = require("nodemailer");

const mailSender = async (email, title, body) => {
    try {
        // Create transporter
        let transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,        // smtp.gmail.com
            port: 587,                          // TLS port
            secure: false,                      // false for TLS
            auth: {
                user: process.env.MAIL_USER,    // full email
                pass: process.env.MAIL_PASS,    // App Password
            },
            tls: {
                rejectUnauthorized: false       // prevent certificate errors
            }
        });

        // Send mail
        let info = await transporter.sendMail({
            from: `"HarshPortfolioGenerator" <${process.env.MAIL_USER}>`, // proper from
            to: email,
            subject: title,
            html: body,
        });

        console.log("Mail sent successfully:", info.response);
        return info;

    } catch (error) {
        console.error("Mail sending failed:", error);
        throw error; // throw to catch in calling function if needed
    }
};

module.exports = mailSender;
