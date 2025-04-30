const messageTemplate = (senderName, subject, message, email, userName, link) => {
  return `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>New Message Notification</title>
    <style>
      body {
        margin: 0;
        padding: 0;
        background: #0c0c0c;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        color: #eaeaea;
        line-height: 1.6;
      }

      .container {
        max-width: 680px;
        margin: 50px auto;
        padding: 40px 32px;
        background: radial-gradient(circle at top left, #161616, #0a0a0a 85%);
        border-radius: 20px;
        box-shadow: 0 0 40px rgba(0, 246, 255, 0.12), inset 0 0 10px rgba(255, 255, 255, 0.03);
        border: 1px solid #1e1e1e;
        backdrop-filter: blur(2px);
      }

      .logo {
        width: 150px;
        margin: 0 auto 25px;
        display: block;
        filter: drop-shadow(0 0 5px rgba(0, 246, 255, 0.3));
      }

      .heading {
        text-align: center;
        font-size: 30px;
        font-weight: 700;
        color: #00f6ff;
        text-shadow: 0 0 6px rgba(0, 246, 255, 0.4);
        margin-bottom: 10px;
      }

      .subheading {
        text-align: center;
        font-size: 15px;
        color: #9a9a9a;
        margin-bottom: 25px;
      }

      .greeting {
        font-size: 18px;
        color: #cccccc;
        text-align: center;
        margin-bottom: 30px;
      }

      .info-box {
        background: linear-gradient(to bottom right, #1e1e1e, #2a2a2a);
        border-left: 4px solid #00f6ff;
        padding: 25px 30px;
        border-radius: 14px;
        box-shadow: 0 0 10px rgba(0, 246, 255, 0.08);
      }

      .label {
        font-size: 16px;
        font-weight: 600;
        color: #aaa;
        margin-bottom: 8px;
      }

      .value {
        font-size: 17px;
        color: #ffffff;
        margin-bottom: 20px;
        word-break: break-word;
      }

      .btn {
        display: inline-block;
        background: #00f6ff;
        color: #000;
        padding: 12px 26px;
        font-size: 16px;
        font-weight: 600;
        border-radius: 10px;
        text-decoration: none;
        transition: all 0.3s ease;
        box-shadow: 0 0 12px rgba(0, 246, 255, 0.3);
      }

      .btn:hover {
        background: #4ffbff;
        transform: scale(1.04);
        box-shadow: 0 0 20px rgba(0, 246, 255, 0.5);
      }

      .footer {
        margin-top: 40px;
        text-align: center;
        font-size: 13px;
        color: #777;
        padding-top: 20px;
        border-top: 1px solid #222;
      }

      .footer a {
        color: #00f6ff;
        text-decoration: none;
      }

      .footer a:hover {
        text-decoration: underline;
      }

      @media (max-width: 600px) {
        .container {
          padding: 28px 20px;
        }

        .info-box {
          padding: 22px;
        }
      }
    </style>
  </head>
  <body>
    <div class="container">
      <img class="logo" src="https://res.cloudinary.com/dqvgcinom/image/upload/v1745505304/porfolioGenrator_logo_e1uhni.png" alt="Portfolio Generator Logo" />
      <div class="heading">📬 New Message Received!</div>
      <div class="subheading">From <a class="link-highlight" href="${link}" target="_blank">${link}</a></div>
   
      <div class="greeting">Hey ${userName}, you just received a new message on your portfolio 🎉</div>

      <div class="info-box">
        <div class="label">💬 Message:</div>
        <div class="value">Click below to check the message on your dashboard 👇</div>
        <div style="text-align: center;">
          <a class="btn" href="https://theportfoliogenerator.netlify.app/UserDas" target="_blank">Go to Dashboard</a>
        </div>
      </div>

      <div class="footer">
        Need help? Contact us at
        <a href="mailto:generatorportfolio@gmail.com">generatorportfolio@gmail.com</a>
      </div>
    </div>
  </body>
  </html>`;
};

module.exports = messageTemplate;
