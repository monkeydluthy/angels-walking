const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

exports.handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const { formData, submissionId } = JSON.parse(event.body);

    // Display name: contact form uses firstName + lastName
    const displayName =
      [formData.firstName, formData.lastName].filter(Boolean).join(' ') ||
      formData.name ||
      'Not provided';

    // Get email addresses from environment
    const fromEmail = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';
    const gladysEmail =
      process.env.TEST_EMAIL ||
      process.env.GLADYS_EMAIL ||
      'gladys@angelswalking.com';

    // Logo URL (Netlify provides URL, or use production domain)
    const siteUrl = process.env.URL || 'https://angels-walking.netlify.app';
    const logoUrl = `${siteUrl}/logo-transparent.png`;

    // Build email to Gladys
    const emailToGladys = {
      from: fromEmail,
      to: gladysEmail,
      subject: `New Contact Form Submission - ${displayName}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New Contact Form Submission</title>
        </head>
        <body style="margin:0; padding:0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f5f3ff; line-height: 1.6;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f3ff; padding: 40px 20px;">
            <tr>
              <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="max-width: 600px; width: 100%; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px rgba(124, 58, 237, 0.1);">
                  <!-- Header with logo -->
                  <tr>
                    <td style="padding: 32px 40px 24px; text-align: center; background: linear-gradient(135deg, #7C3AED 0%, #A78BFA 100%);">
                      <img src="${logoUrl}" alt="Angels Walking" width="180" style="display: block; margin: 0 auto 16px; max-height: 80px; width: auto;" />
                      <h1 style="margin: 0; color: #ffffff; font-size: 22px; font-weight: 700;">New Contact Form Submission</h1>
                    </td>
                  </tr>
                  <!-- Contact details -->
                  <tr>
                    <td style="padding: 32px 40px;">
                      <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #faf5ff; border-radius: 12px; padding: 24px;">
                        <tr><td style="padding: 12px 0; border-bottom: 1px solid #e9d5ff;"><span style="font-size: 11px; font-weight: 600; color: #7C3AED; letter-spacing: 0.5px;">NAME</span><br/><span style="font-size: 16px; color: #1f2937;">${displayName}</span></td></tr>
                        <tr><td style="padding: 12px 0; border-bottom: 1px solid #e9d5ff;"><span style="font-size: 11px; font-weight: 600; color: #7C3AED; letter-spacing: 0.5px;">EMAIL</span><br/><a href="mailto:${formData.email || ''}" style="font-size: 16px; color: #2563eb; text-decoration: none;">${formData.email || 'Not provided'}</a></td></tr>
                        <tr><td style="padding: 12px 0; border-bottom: 1px solid #e9d5ff;"><span style="font-size: 11px; font-weight: 600; color: #7C3AED; letter-spacing: 0.5px;">PHONE</span><br/><span style="font-size: 16px; color: #1f2937;">${formData.phone || 'Not provided'}</span></td></tr>
                        ${formData.service ? `<tr><td style="padding: 12px 0;"><span style="font-size: 11px; font-weight: 600; color: #7C3AED; letter-spacing: 0.5px;">SERVICE INTEREST</span><br/><span style="font-size: 16px; color: #1f2937;">${formData.service}</span></td></tr>` : ''}
                      </table>
                      ${
                        formData.message
                          ? `
                      <div style="margin-top: 24px; padding: 20px; background-color: #f3f4f6; border-left: 4px solid #A78BFA; border-radius: 8px;">
                        <span style="font-size: 11px; font-weight: 600; color: #6b7280; letter-spacing: 0.5px;">MESSAGE</span>
                        <p style="margin: 12px 0 0; font-size: 15px; color: #374151; white-space: pre-wrap;">${formData.message}</p>
                      </div>
                      `
                          : ''
                      }
                      <p style="margin-top: 24px; font-size: 13px; color: #9ca3af;">Submitted: ${new Date().toLocaleString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', timeZoneName: 'short' })}</p>
                    </td>
                  </tr>
                  <!-- Footer -->
                  <tr>
                    <td style="padding: 24px 40px; background-color: #f9fafb; border-top: 1px solid #e5e7eb; text-align: center; font-size: 12px; color: #6b7280;">
                      <p style="margin: 0;">Sent from Angels Walking contact form</p>
                      <p style="margin: 4px 0 0;">ID: ${submissionId}</p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `,
    };

    // Build confirmation email to user
    const emailToUser = {
      from: fromEmail,
      to: formData.email,
      subject: 'Thank you for contacting Angels Walking',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Thank you for contacting Angels Walking</title>
        </head>
        <body style="margin:0; padding:0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f5f3ff; line-height: 1.6;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f3ff; padding: 40px 20px;">
            <tr>
              <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="max-width: 600px; width: 100%; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px rgba(124, 58, 237, 0.1);">
                  <!-- Header with logo -->
                  <tr>
                    <td style="padding: 32px 40px 24px; text-align: center; background: linear-gradient(135deg, #7C3AED 0%, #A78BFA 100%);">
                      <img src="${logoUrl}" alt="Angels Walking" width="180" style="display: block; margin: 0 auto 16px; max-height: 80px; width: auto;" />
                      <h1 style="margin: 0; color: #ffffff; font-size: 22px; font-weight: 700;">Thank You for Contacting Us!</h1>
                    </td>
                  </tr>
                  <!-- Body -->
                  <tr>
                    <td style="padding: 32px 40px;">
                      <p style="margin: 0 0 16px; font-size: 16px; color: #374151;">Hi ${displayName},</p>
                      <p style="margin: 0 0 24px; font-size: 16px; color: #374151;">Thank you for reaching out to Angels Walking. We've received your message and will get back to you within 24 hours.</p>
                      ${
                        formData.message
                          ? `
                      <div style="padding: 20px; background-color: #faf5ff; border-left: 4px solid #A78BFA; border-radius: 8px; margin-bottom: 24px;">
                        <span style="font-size: 12px; font-weight: 600; color: #7C3AED;">Your message</span>
                        <p style="margin: 12px 0 0; font-size: 15px; color: #4b5563; white-space: pre-wrap;">${formData.message}</p>
                      </div>
                      `
                          : ''
                      }
                      <div style="padding: 24px; background-color: #f9fafb; border-radius: 12px;">
                        <p style="margin: 0 0 12px; font-size: 14px; font-weight: 600; color: #7C3AED;">Our contact information</p>
                        <p style="margin: 0 0 8px; font-size: 15px; color: #374151;"><strong>Email:</strong> <a href="mailto:gladys@angelswalking.com" style="color: #2563eb; text-decoration: none;">gladys@angelswalking.com</a></p>
                        <p style="margin: 0 0 8px; font-size: 15px; color: #374151;"><strong>Phone:</strong> 407-782-5048</p>
                        <p style="margin: 0; font-size: 15px; color: #374151;"><strong>Location:</strong> Orlando, FL 32826</p>
                      </div>
                    </td>
                  </tr>
                  <!-- Footer -->
                  <tr>
                    <td style="padding: 24px 40px; background-color: #f9fafb; border-top: 1px solid #e5e7eb; text-align: center; font-size: 14px; color: #6b7280;">
                      <p style="margin: 0;">We look forward to connecting with you soon.</p>
                      <p style="margin: 8px 0 0;">Blessings,<br/><strong>The Angels Walking Team</strong></p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `,
    };

    // Send both emails
    const [gladysResult, userResult] = await Promise.all([
      resend.emails.send(emailToGladys),
      formData.email
        ? resend.emails.send(emailToUser).catch((err) => {
            // Don't fail if user email fails
            console.error('User confirmation email failed:', err);
            return { error: err.message };
          })
        : Promise.resolve({ success: true, skipped: 'No email provided' }),
    ]);

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        gladysEmailSent: !!gladysResult.data,
        userEmailSent: !!userResult.data && !userResult.error,
        submissionId,
      }),
    };
  } catch (error) {
    console.error('Error sending email:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        success: false,
        error: error.message,
        submissionId,
      }),
    };
  }
};
