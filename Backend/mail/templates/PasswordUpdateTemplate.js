const passwordUpdateTemplate = (updatedUserDetails) => {
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <title>Password Updated - My Portfolio Generator</title>
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
        .user-name {
          font-size: 22px;
          font-weight: bold;
          color: #f0c54b;
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
        <img class="logo" src="https://res.cloudinary.com/dykhwoa5a/image/upload/v1759846019/Screenshot_2025-10-07_193422_i9hfqt.png" alt="Portfolio Generator" />
        <div class="heading">Password Updated Successfully</div>
        <div class="message">
          <p>Hi ${updatedUserDetails.firstName} ${updatedUserDetails.lastName},</p>
          <p>We're writing to let you know that your password has been successfully updated.</p>
          <p>Your account is now more secure. If you did not request this change, please contact us immediately.</p>
        </div>
        <div class="message">
          <p>Thank you for using Portfolio Generator!</p>
        </div>
        <div class="footer">
          Need help? Contact us at
          <a href="mailto:generatorportfolio@gmail.com">generatorportfolio@gmail.com</a>
        </div>
      </div>
    </body>
    </html>`;
  };
  
  module.exports = passwordUpdateTemplate;
  