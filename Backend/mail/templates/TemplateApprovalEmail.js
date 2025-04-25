const templateApprovedMail = (name, templateName) => {
  return `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Template Approved!</title>
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
        box-shadow: 0 0 25px rgba(0, 246, 255, 0.1);
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
          transform: translateY(0);
          opacity: 0.7;
        }
      }
      .logo {
        width: 160px;
        margin-bottom: 22px;
        filter: drop-shadow(0 0 12px #00f6ffcc);
      }
      .heading {
        font-size: 28px;
        font-weight: bold;
        margin-bottom: 15px;
        color: #ffffff;
        text-shadow: 0 0 12px #00f6ff66;
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
        color: #00f6ff;
        text-shadow: 0 0 8px #00f6ff99;
      }
      .dev-name {
        color: #00f6ff;
        font-weight: bold;
        font-size: 17px;
        text-shadow: 0 0 8px #00f6ff99;
      }
      .highlighted-msg {
        color: #ffffff;
        font-weight: 600;
        text-shadow: 0 0 10px rgba(0, 246, 255, 0.3);
        background: linear-gradient(90deg, #00f6ff1a, #00f6ff0d);
        padding: 10px 16px;
        border-radius: 10px;
        margin-top: 10px;
      }
      .cta-button {
        display: inline-block;
        margin-top: 20px;
        padding: 14px 30px;
        background-color: #00f6ff;
        color: #000;
        font-size: 16px;
        font-weight: bold;
        text-decoration: none;
        border-radius: 10px;
        box-shadow: 0 0 15px #00f6ffb0;
        transition: all 0.3s ease;
      }
      .cta-button:hover {
        background-color: #00c2d3;
        transform: scale(1.05);
        box-shadow: 0 0 20px #00f6ff;
      }
      .footer {
        margin-top: 35px;
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
      <div class="heading">🎉 It's Live. It's Lit!</div>
      <div class="message">
        <p><span class="dev-name"> Hey ${name}</span>,</p>
        <p>Your template <span class="template-name">${templateName}</span> has been <strong>approved</strong> and is now officially <span style="color:#00f6ff;font-weight:bold;">LIVE</span> on our platform! 🚀</p>
        <p class="highlighted-msg">Users across the world can now build stunning portfolios with your creation. You're not just a dev now... you're a creator! 💥</p>
      </div>
      <a href="http://localhost:5173/developerDas" class="cta-button" target="_blank">⚡ Go to Your Dashboard</a>
      <div class="message" style="margin-top: 30px;">
        Track usage, feedback, and watch your template rise to fame!<br />You earned this, now own it! 💼🔥
      </div>
      <div class="footer">
        Need help? Contact us at
        <a href="mailto:generatorportfolio@gmail.com">generatorportfolio@gmail.com</a>
      </div>
    </div>
  </body>
  </html>`;
};

module.exports = templateApprovedMail;
