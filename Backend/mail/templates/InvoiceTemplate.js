/**
 * 💼 Professional SaaS Invoice & Delivery Notification
 * Optimized for Gmail and All Major Email Clients using INLINE CSS
 * @param {Object} userData - { firstName, lastName, email }
 * @param {Object} paymentData - { orderId }
 */
const InvoiceTemplate = (userData, paymentData) => {
  const { firstName } = userData;

  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
  <html xmlns="http://www.w3.org/1999/xhtml" lang="en">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your Template is Ready - PortfolioCraft</title>
  </head>
  <body style="margin: 0; padding: 0; background-color: #F3F4F6; color: #1F2937; font-family: 'Inter', 'Helvetica Neue', Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased;">
    <center style="width: 100%; table-layout: fixed; background-color: #F3F4F6; padding-top: 40px; padding-bottom: 60px;">
      <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #FFFFFF; margin: 0 auto; width: 100%; max-width: 600px; border-radius: 12px; border: 1px solid #E5E7EB; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03); overflow: hidden; border-collapse: collapse;">
        <tr>
          <td style="height: 6px; background-color: #4F46E5; width: 100%;"></td>
        </tr>
        <tr>
          <td style="padding: 48px 40px 40px; text-align: left;">
            <div style="font-size: 24px; font-weight: 800; color: #111827; margin: 0 0 40px 0; letter-spacing: -0.5px;">Portfolio<span style="color: #4F46E5;">Craft</span></div>
            
            <h1 style="font-size: 24px; font-weight: 700; margin: 0 0 24px 0; color: #111827; letter-spacing: -0.5px;">Your Template is Ready!</h1>
            
            <p style="font-size: 16px; line-height: 1.6; color: #4B5563; margin: 0 0 24px 0;">Hello <span style="color: #111827; font-weight: 600;">${firstName}</span>,</p>
            
            <p style="font-size: 16px; line-height: 1.6; color: #4B5563; margin: 0 0 24px 0;">Thank you for your purchase. Your payment was successful, and your premium template has been instantly unlocked and added to your dashboard. You have full access to deploy it immediately.</p>
            
            <div style="background-color: #F9FAFB; border: 1px solid #E5E7EB; border-left: 4px solid #4F46E5; padding: 24px; border-radius: 8px; margin-bottom: 32px; color: #374151; font-size: 15px; line-height: 1.5;">
              <strong style="color: #111827; display: block; margin-bottom: 8px;">🧾 Official Tax Invoice Attached</strong>
              Your payment receipt for order <span style="color: #111827; font-weight: 600;">#${paymentData.orderId.slice(-8).toUpperCase()}</span> is attached to this email as a PDF. Please keep it for your records.
            </div>

            <div style="text-align: center; margin-top: 40px;">
              <a href="https://portfolioshub.in/UserDas" style="background-color: #4F46E5; color: #FFFFFF; display: inline-block; padding: 14px 32px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px;">Access Your Templates</a>
            </div>
          </td>
        </tr>
        <tr>
          <td style="padding: 32px 40px; background-color: #F9FAFB; border-top: 1px solid #E5E7EB; font-size: 13px; color: #6B7280; text-align: center; line-height: 1.5;">
            <p style="font-size: 13px; line-height: 1.5; color: #6B7280; margin: 0 0 8px 0;">Need help? Reply to this email or visit our <a href="https://portfolioshub.in/contactus" style="color: #4F46E5; text-decoration: none;">Support Center</a>.</p>
            <p style="font-size: 13px; line-height: 1.5; color: #6B7280; margin: 0;">&copy; 2026 PortfolioCraft. All rights reserved.</p>
          </td>
        </tr>
      </table>
    </center>
  </body>
  </html>`;
};

module.exports = InvoiceTemplate;
