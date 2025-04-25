const templateRejectedMail = (name, templateName) => {
  return `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Template Rejected</title>
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
        box-shadow: 0 0 25px rgba(255, 50, 50, 0.1);
        position: relative;
      }
      .logo {
        width: 160px;
        margin-bottom: 22px;
        filter: drop-shadow(0 0 12px #ff5555cc);
      }
      .heading {
        font-size: 28px;
        font-weight: bold;
        margin-bottom: 15px;
        color: #ff4d4d;
        text-shadow: 0 0 12px #ff4d4d88;
      }
      .message {
        font-size: 16px;
        color: #d1d1d1;
        margin-bottom: 25px;
        line-height: 1.7;
      }
      .highlight {
        color: #f0f0f0;
        text-shadow: 0 0 6px rgba(255, 255, 255, 0.2);
      }
      .template-name {
        font-weight: bold;
        font-size: 17px;
        color: #ff4d4d;
        text-shadow: 0 0 8px #ff4d4d99;
      }
      .dev-name {
        color: #ff4d4d;
        font-weight: bold;
        font-size: 17px;
        text-shadow: 0 0 8px #ff4d4d99;
      }
      .cta-button {
        display: inline-block;
        margin-top: 20px;
        padding: 14px 30px;
        background-color: #ff4d4d;
        color: #000;
        font-size: 16px;
        font-weight: bold;
        text-decoration: none;
        border-radius: 10px;
        box-shadow: 0 0 15px #ff4d4db0;
        transition: all 0.3s ease;
      }
      .cta-button:hover {
        background-color: #d63838;
        transform: scale(1.05);
        box-shadow: 0 0 20px #ff4d4d;
      }
      .footer {
        margin-top: 35px;
        font-size: 13px;
        color: #888;
      }
      .footer a {
        color: #ff4d4d;
        text-decoration: none;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <img class="logo" src="https://res.cloudinary.com/dqvgcinom/image/upload/v1745505304/porfolioGenrator_logo_e1uhni.png" alt="My Portfolio Generator" />
      <div class="heading">😔 Template Rejected</div>
      <div class="message">
        <p> <span class="highlight">Hey </span> <span class="dev-name">${name}</span>,</p>
        <p>
          <span class="highlight">
            We appreciate your effort in submitting the template <span class="template-name">${templateName}</span>, but unfortunately, it didn't meet our platform guidelines and has been <strong>rejected</strong>.
          </span>
        </p>
        <p>
          Reasons may include missing responsiveness, design issues, or not following the structure/instruction formats mentioned in our documentation.
        </p>
      </div>
      <a href="http://localhost:5173/developerDas" class="cta-button" target="_blank">🔁 Revise & Re-submit</a>
      <div class="message" style="margin-top: 30px;">
        Don't worry — mistakes are stepping stones!<br />
        You can revise your template and resubmit it for review anytime. We're rooting for you! 🚀
      </div>
      <div class="footer">
        Need help? Contact us at
        <a href="mailto:generatorportfolio@gmail.com">generatorportfolio@gmail.com</a>
      </div>
    </div>
  </body>
  </html>`;
};

module.exports = templateRejectedMail;
