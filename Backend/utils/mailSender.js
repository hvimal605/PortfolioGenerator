require("dns").setDefaultResultOrder("ipv4first");
const nodemailer = require("nodemailer");

const mailSender = async (email, title, body) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,           // 465 secure kaam nahi kar raha Render pe
      secure: false,       // TLS handle kare
      auth: {
        user: process.env.MAIL_USER,  // Gmail
        pass: process.env.MAIL_PASS,  // Gmail App Password
      },
      tls: {
        rejectUnauthorized: false,    // Render IPs ke liye bypass
      },
    });

    const info = await transporter.sendMail({
      from: `"PortfolioCraft" <${process.env.MAIL_USER}>`,
      to: email,
      subject: title,
      html: body,
    });

    console.log("✅ Mail sent:", info.messageId);
    return info;
  } catch (err) {
    console.error("❌ Mail sending failed:", err);
  }
};

module.exports = mailSender;
