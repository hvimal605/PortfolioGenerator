const redeployTemplate = (userName) => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>PortfolioCraft Redeploy</title>
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
      width: 160px;
      margin-bottom: 20px;
    }
    .heading {
      font-size: 20px;
      font-weight: bold;
      margin-bottom: 10px;
      color: #00f6ff;
    }
    .message {
      font-size: 16px;
      color: #d1d1d1;
      margin-bottom: 25px;
      line-height: 1.6;
      text-align: left;
    }
    .button {
      display: inline-block;
      background: linear-gradient(135deg, #4f46e5, #7c3aed);
      color: white !important;
      text-decoration: none;
      padding: 12px 22px;
      border-radius: 8px;
      font-weight: 600;
      margin-top: 16px;
    }
    .footer {
      margin-top: 30px;
      font-size: 13px;
      color: #888;
      text-align: center;
    }
    .footer a {
      color: #00f6ff;
      text-decoration: none;
    }
    ol {
      padding-left: 20px;
      color: #d1d1d1;
    }
    ol li {
      margin-bottom: 10px;
    }
  </style>
</head>
<body>
  <div class="container">
    <img class="logo" src="https://res.cloudinary.com/dykhwoa5a/image/upload/v1759846019/Screenshot_2025-10-07_193422_i9hfqt.png" alt="PortfolioCraft Logo" />
    <div class="heading">Hello ${userName},</div>

    <div class="message">
      <p>
        We recently noticed a minor issue that affected the deployment of your portfolio. We sincerely apologize for the inconvenience.
      </p>

      <p>
        Fortunately, you can resolve this quickly by following these steps:
      </p>

      <ol>
        <li>Visit <a href="https://portfolioshub.in/" target="_blank">PortfolioCraft</a> and log in to your account.</li>
        <li>Click on your <b>profile icon</b> and navigate to the <b>Dashboard</b>.</li>
        <li>Locate your portfolio under the <b>My Portfolios</b> section.</li>
        <li>Click the <b>Redeploy</b> button to deploy your portfolio again 🚀</li>
      </ol>

      <p>
        If you encounter any difficulties or have questions, please <a href="mailto:generatorportfolio@gmail.com">contact us</a> — we’re happy to assist.
      </p>

      <p style="margin-top: 20px;">
        Thank you for being a valued member of <b>PortfolioCraft</b>. We are continuously improving our platform to ensure smooth and reliable deployments.
      </p>
    </div>

    <div class="footer">
      Made with ❤️ by the PortfolioCraft Team<br />
      <a href="https://portfolioshub.in/" target="_blank">Visit Website</a>
    </div>
  </div>
</body>
</html>`;
};

module.exports = redeployTemplate;
