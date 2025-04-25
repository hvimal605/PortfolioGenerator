const templateReceivedMail = (name, templateName) => {
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <title>Template Received</title>
      <style>
        body {
          margin: 0;
          padding: 0;
          background-color: #0f0f0f;
          color: #f5f5f5;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          overflow-x: hidden;
        }
        .container {
          max-width: 620px;
          margin: 30px auto;
          padding: 30px;
          background-color: #1a1a1a;
          border-radius: 14px;
          text-align: center;
          box-shadow: 0 0 25px rgba(0, 150, 255, 0.08);
        }
        .logo {
          width: 150px;
          margin-bottom: 20px;
          filter: drop-shadow(0 0 10px #00c3ffbb);
        }
        .heading {
          font-size: 26px;
          font-weight: bold;
          margin-bottom: 15px;
          color: #00c3ff;
          text-shadow: 0 0 10px #00c3ff88;
        }
        .message {
          font-size: 16px;
          color: #d1d1d1;
          margin-bottom: 25px;
          line-height: 1.7;
        }
        .template-name {
          font-weight: bold;
          font-size: 17px;
          color: #00c3ff;
          text-shadow: 0 0 6px #00c3ff88;
        }
        .dev-name {
          color: #00c3ff;
          font-weight: bold;
          font-size: 17px;
        }
        .footer {
          margin-top: 35px;
          font-size: 13px;
          color: #888;
        }
        .footer a {
          color: #00c3ff;
          text-decoration: none;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <img class="logo" src="https://res.cloudinary.com/dqvgcinom/image/upload/v1745505304/porfolioGenrator_logo_e1uhni.png" alt="My Portfolio Generator" />
        <div class="heading">📩 Template Received</div>
        <div class="message">
          <p>Hey <span class="dev-name">${name}</span>,</p>
          <p>We’ve successfully received your template submission: <span class="template-name">${templateName}</span>.</p>
          <p>Our review team will carefully check it and get back to you within <strong>5–7 days</strong>.</p>
          <p>You'll be notified via email once the review is complete. 🚀</p>
        </div>
        <div class="message" style="margin-top: 25px;">
          Thanks for contributing to the platform.<br />Wishing you all the best! 💼✨
        </div>
        <div class="footer">
          Need help? Contact us at
          <a href="mailto:generatorportfolio@gmail.com">generatorportfolio@gmail.com</a>
        </div>
      </div>
    </body>
    </html>`;
  };
  
  module.exports = templateReceivedMail;
  