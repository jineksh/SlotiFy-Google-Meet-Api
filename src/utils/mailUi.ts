export function getMailHtml(name: string, date: string, time: string): string {

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Booking Confirmed - Slotify</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f4f5f7; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased; width: 100% !important;">
  <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f4f5f7; padding: 40px 10px;">
    <tr>
      <td align="center">
        <!-- Main Card Wrapper -->
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);">
          
          <!-- Header/Branding Banner -->
          <tr>
            <td align="center" style="background-color: #6366f1; padding: 32px 20px;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 800; letter-spacing: -0.5px;">Slotify</h1>
            </td>
          </tr>

          <!-- Main Content -->
          <tr>
            <td style="padding: 40px 32px;">
              <h2 style="margin: 0 0 16px 0; color: #1f2937; font-size: 22px; font-weight: 700; line-height: 1.3;">Booking Confirmed! 🎉</h2>
              <p style="margin: 0 0 24px 0; color: #4b5563; font-size: 16px; line-height: 1.6;">Hi ${name}, your spot is locked in. Here are your booking details for your upcoming session:</p>
              
              <!-- Details Box -->
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f9fafb; border-radius: 12px; border: 1px solid #e5e7eb; padding: 24px; margin-bottom: 32px;">
                
                <tr>
                  <td style="padding-bottom: 12px; padding-top: 12px; border-top: 1px dashed #e5e7eb;">
                    <span style="display: block; font-size: 12px; font-weight: 600; text-transform: uppercase; color: #9ca3af; letter-spacing: 0.5px; margin-bottom: 2px;">Date</span>
                    <strong style="font-size: 16px; color: #111827;">${date}</strong>
                  </td>
                </tr>
                <tr>
                  <td style="padding-top: 12px; border-top: 1px dashed #e5e7eb;">
                    <span style="display: block; font-size: 12px; font-weight: 600; text-transform: uppercase; color: #9ca3af; letter-spacing: 0.5px; margin-bottom: 2px;">Time Slot</span>
                    <strong style="font-size: 16px; color: #111827;">${time}</strong>
                  </td>
                </tr>
              </table>

              <!-- Call to Action Button -->
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td align="center">
                    <a href="https://slotify.com" target="_blank" style="display: inline-block; background-color: #6366f1; color: #ffffff; font-size: 16px; font-weight: 600; text-decoration: none; padding: 14px 32px; border-radius: 8px; box-shadow: 0 4px 6px rgba(99, 102, 241, 0.2);">Manage Booking</a>
                  </td>
                </tr>
              </table>

              <p style="margin: 32px 0 0 0; color: #4b5563; font-size: 14px; line-height: 1.6;">Need to reschedule or cancel? You can change your time slot directly in your dashboard up to 24 hours before the event.</p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="padding: 0 32px 40px 32px; border-top: 1px solid #f3f4f6;">
              <p style="margin: 24px 0 0 0; color: #9ca3af; font-size: 12px; line-height: 1.5;">
                Sent automatically by <strong>Slotify Inc.</strong><br>
                If you did not make this booking, please ignore this email.
              </p>
            </td>
          </tr>

        </table>
        <!-- End Card Wrapper -->
      </td>
    </tr>
  </table>
</body>
</html>
`


}