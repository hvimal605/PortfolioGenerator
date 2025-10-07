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



require("dotenv").config();
const axios = require("axios");

const mailSender = async (email, subject, htmlBody) => {
  try {
    const resp = await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      {
        sender: { name: "PortfolioCraft", email: "noreply@portfolioshub.in" },
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
   
    if (err.response && err.response.data) {
      console.error("❌ Brevo API error:", err.response.status, err.response.data);
      throw new Error(JSON.stringify(err.response.data));
    }
    console.error("❌ API Error:", err.message);
    throw err;
  }
};

module.exports = mailSender;

