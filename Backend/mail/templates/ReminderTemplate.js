const reminderTemplate = (userName) => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>PortfolioCraft Reminder</title>
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
      font-size: 22px;
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
    <div class="heading">Hey ${userName}, your portfolio is waiting! 🚀</div>

    <div class="message">
      <p>
        A while ago, you started building your portfolio on <b>PortfolioCraft</b> but didn’t complete it or deploy it.  
        Great news — the platform is now more powerful, faster, and easier to use!
      </p>

      <p>
        Here’s how you can get your portfolio live and also add new ones:
      </p>

      <ol>
        <li>Go to <a href="https://portfolioshub.in/" target="_blank">PortfolioCraft</a> and log in.</li>
        <li>Click on your <b>profile icon</b> and open the <b>Dashboard</b>.</li>
        <li>In the <b>My Portfolios</b> section, find your old portfolio.</li>
        <li>Click the <b>Redeploy</b> button to publish it again 🚀.</li>
        <li>To improve it, go to <b>Add Details</b> and fill in missing info — images, descriptions, links, etc.</li>
        <li>You can also create a <b>new portfolio</b> anytime by clicking <b>Create New Portfolio</b>.</li>
      </ol>

      <p style="margin-top: 20px; text-align:center;">
        <a href="https://portfolioshub.in/" class="button">Go to PortfolioCraft</a>
      </p>

      <p style="margin-top: 20px;">
        Need help or have questions? Just <a href="mailto:generatorportfolio@gmail.com">contact us</a> — we’re always happy to assist!
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

module.exports = reminderTemplate;
