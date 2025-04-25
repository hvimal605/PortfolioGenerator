const passwordResetTemplate = (url) => {
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <title>Password Reset - My Portfolio Generator</title>
      <style>
        body {
          margin: 0;
          padding: 0;
          background-color: #0f0f0f;
          color: #f5f5f5;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        .container {
          max-width: 600px;
          margin: 30px auto;
          padding: 30px;
          background-color: #1a1a1a;
          border-radius: 12px;
          text-align: center;
          box-shadow: 0 0 20px rgba(255, 255, 255, 0.05);
        }
        .logo {
          width: 150px;
          margin-bottom: 20px;
        }
        .heading {
          font-size: 24px;
          font-weight: bold;
          margin-bottom: 10px;
          color: #ffffff;
        }
        .message {
          font-size: 16px;
          color: #d1d1d1;
          margin-bottom: 25px;
          line-height: 1.6;
        }
        .url-box {
          display: inline-block;
          background-color: #000000;
          color: #00f6ff;
          font-size: 20px;
          letter-spacing: 1px;
          font-weight: bold;
          padding: 14px 28px;
          border-radius: 10px;
          box-shadow: 0 0 10px #00f6ff60;
          margin: 20px 0;
          text-decoration: none;
        }
        .footer {
          margin-top: 30px;
          font-size: 13px;
          color: #888;
        }
        .footer a {
          color: #00f6ff;
          text-decoration: none;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <img class="logo" src="https://res.cloudinary.com/dqvgcinom/image/upload/v1745505304/porfolioGenrator_logo_e1uhni.png" alt="Portfolio Generator" />
        <div class="heading">Password Reset Request</div>
        <div class="message">
          <p>Hey there 👋,</p>
          <p>We received a request to reset your password for Portfolio Generator. Click the button below to reset it.</p>
        </div>
        <a href="${url}" class="url-box">Reset Your Password</a>
        <div class="message">
          <p>If you didn’t request this, you can safely ignore this email.</p>
          <p>This link is valid for <strong> 15 minutes</strong>.</p>
        </div>
        <div class="footer">
          Need help? Contact us at
          <a href="mailto:generatorportfolio@gmail.com">generatorportfolio@gmail.com</a>
        </div>
      </div>
    </body>
    </html>`;
  };
  
  module.exports = passwordResetTemplate;
  