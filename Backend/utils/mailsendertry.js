// const nodemailer = require("nodemailer")

// const mailSender = async (email, title, body) => {
//     try {

//         let transporter = nodemailer.createTransport({
//             host: process.env.MAIL_HOST,
//             auth: {
//                 user: process.env.MAIL_USER,
//                 pass: process.env.MAIL_PASS,
//             }

//         })
//         let info = await transporter.sendMail({
//             from: "HarshPortfolioGenrator",
//             to: `${email}`,
//             subject: `${title}`,
//             html: `${body}`,
//         })
//         console.log(info);
//         return info;




//     }
//     catch (error) {
//         console.log(error.message);


//     }
// }

// module.exports = mailSender;




// require("dotenv").config(); // Always at the top

// const nodemailer = require("nodemailer");

// // Create transporter once to reuse for multiple emails
// const transporter = nodemailer.createTransport({
//   host: process.env.MAIL_HOST || "smtp-relay.brevo.com",
//   port: Number(process.env.MAIL_PORT) || 587,
//   secure: false, // TLS
//   auth: {
//     user: process.env.BREVO_USER,
//     pass: process.env.BREVO_PASS,
//   },
// });

// // Verify SMTP connection at startup
// transporter.verify((err, success) => {
//   if (err) {
//     console.error("❌ SMTP connection failed:", err.message);
//   } else {
//     console.log("✅ SMTP connection successful!");
//   }
// });

// const mailSender = async (email, subject, htmlBody) => {
//   try {
//     const info = await transporter.sendMail({
//       from: `"Portfolio Hub" <noreply@portfolioshub.in>`, // Verified sender
//       to: email,
//       subject,
//       html: htmlBody,
//     });

//     console.log("✅ Email sent:", info.messageId);
//     return info;
//   } catch (error) {
//     console.error("❌ Error sending email:", error.message);
//     throw error; // Let caller handle it
//   }
// };

// module.exports = mailSender;


require("dotenv").config();
const axios = require("axios");

const mailSender = async (email, subject, htmlBody) => {
  try {
    const resp = await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      {
        sender: { name: "Portfolio Hub", email: "noreply@portfolioshub.in" },
        to: [{ email }],
        subject,
        htmlContent: htmlBody,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "api-key": process.env.BREVO_API_KEY,
        },
        timeout: 15000,
      }
    );

    console.log("✅ Email sent via API:", resp.data);
    return resp.data;
  } catch (err) {
    // Better error output: Brevo returns JSON body on error
    if (err.response && err.response.data) {
      console.error("❌ Brevo API error:", err.response.status, err.response.data);
      throw new Error(JSON.stringify(err.response.data));
    }
    console.error("❌ API Error:", err.message);
    throw err;
  }
};

module.exports = mailSender;

