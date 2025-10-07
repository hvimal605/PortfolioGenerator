const otpTemplate = (otp) => {
	return `<!DOCTYPE html>
	<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<title>OTP Verification - My Portfolio Generator</title>
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
			.otp-box {
				display: inline-block;
				background-color: #000000;
				color: #00f6ff;
				font-size: 28px;
				letter-spacing: 4px;
				font-weight: bold;
				padding: 14px 28px;
				border-radius: 10px;
				box-shadow: 0 0 10px #00f6ff60;
				margin: 20px 0;
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
			<div class="heading">OTP Verification</div>
			<div class="message">
				<p>Hey there 👋,</p>
				<p>You're almost in! Use the OTP below to complete your verification for Portfolio Generator.</p>
			</div>
			<div class="otp-box">${otp}</div>
			<div class="message">
				<p>This OTP is valid for <strong>5 minutes</strong>.</p>
				<p>If you didn’t request this, you can safely ignore this email.</p>
			</div>
			<div class="footer">
				Need help? Contact us at
				<a href="mailto:generatorportfolio@gmail.com">generatorportfolio@gmail.com</a>
			</div>
		</div>
	</body>
	</html>`;
};

module.exports = otpTemplate;
