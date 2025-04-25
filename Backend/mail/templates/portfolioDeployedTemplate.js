const portfolioDeployedTemplate = (name, portfolioLink) => {
  return `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Portfolio Deployed Successfully</title>
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
        max-width: 600px;
        margin: 30px auto;
        padding: 30px;
        background-color: #1a1a1a;
        border-radius: 12px;
        text-align: center;
        box-shadow: 0 0 20px rgba(255, 255, 255, 0.05);
        position: relative;
      }
      .confetti {
        position: absolute;
        top: -20px;
        left: 0;
        right: 0;
        height: 60px;
        background-image: url("https://cdn.pixabay.com/photo/2016/11/18/15/20/confetti-1839406_960_720.png");
        background-size: cover;
        background-repeat: repeat-x;
        animation: floatDown 2.5s ease-out forwards;
        opacity: 0.7;
      }
      @keyframes floatDown {
        0% {
          transform: translateY(-100px);
          opacity: 0;
        }
        100% {
          transform: translateY(0px);
          opacity: 0.7;
        }
      }
      .logo {
        width: 150px;
        margin-bottom: 20px;
        filter: drop-shadow(0 0 10px #00f6ff88);
      }
      .heading {
        font-size: 26px;
        font-weight: bold;
        margin-bottom: 10px;
        color: #ffffff;
        text-shadow: 0 0 10px #00f6ff55;
      }
      .message {
        font-size: 16px;
        color: #d1d1d1;
        margin-bottom: 25px;
        line-height: 1.6;
      }
      .link-box {
        background-color: #000000;
        color: #00f6ff;
        font-size: 16px;
        padding: 12px 20px;
        border-radius: 8px;
        display: inline-block;
        word-break: break-all;
        box-shadow: 0 0 10px #00f6ff80;
        margin-bottom: 15px;
      }
      .cta-button {
        display: inline-block;
        padding: 12px 24px;
        background-color: #00f6ff;
        color: #000;
        font-size: 16px;
        font-weight: bold;
        text-decoration: none;
        border-radius: 8px;
        margin-top: 10px;
        transition: background 0.3s ease, transform 0.3s ease;
        box-shadow: 0 0 10px #00f6ff80;
      }
      .cta-button:hover {
        background-color: #00c2d3;
        transform: scale(1.05);
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
      <div class="confetti"></div>
      <img class="logo" src="https://res.cloudinary.com/dqvgcinom/image/upload/v1745505304/porfolioGenrator_logo_e1uhni.png" alt="My Portfolio Generator" />
      <div class="heading">🎉 Portfolio Deployed Successfully!</div>
      <div class="message">
        <p>Hey <strong>${name}</strong>,</p>
        <p>Your portfolio is now <span style="color:#00f6ff;font-weight:bold;">LIVE</span> on the internet! 🚀</p>
      </div>
      <div class="link-box">${portfolioLink}</div>
      <a class="cta-button" href="${portfolioLink}" target="_blank">🔗 View Portfolio</a>
      <div class="message" style="margin-top: 25px;">
        Manage or update it anytime from your dashboard. Keep building and show off your work! 💼✨
      </div>
      <div class="footer">
        Need help? Contact us at
        <a href="mailto:generatorportfolio@gmail.com">generatorportfolio@gmail.com</a>
      </div>
    </div>
  </body>
  </html>`;
};

module.exports = portfolioDeployedTemplate;
