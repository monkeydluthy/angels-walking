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

    // Get email addresses from environment
    // Use Resend's default domain when RESEND_FROM_EMAIL is empty (allows testing without DNS setup)
    const fromEmail = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';
    // Use test email if provided, otherwise use Gladys email
    const gladysEmail =
      process.env.TEST_EMAIL ||
      process.env.GLADYS_EMAIL ||
      'gladys@angelswalking.com';

    // Build email to Gladys
    const emailToGladys = {
      from: fromEmail,
      to: gladysEmail,
      subject: `New Contact Form Submission - ${formData.name || 'Unknown'}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              background-color: #f9fafb;
            }
            .container {
              background-color: #ffffff;
              border-radius: 12px;
              padding: 30px;
              box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            }
            .header {
              text-align: center;
              margin-bottom: 30px;
              padding-bottom: 20px;
              border-bottom: 2px solid #7C3AED;
            }
            .logo {
              max-width: 200px;
              height: auto;
              margin-bottom: 20px;
            }
            h1 {
              color: #7C3AED;
              font-size: 24px;
              margin: 0;
            }
            .info-section {
              background-color: #f9fafb;
              border-radius: 8px;
              padding: 20px;
              margin-bottom: 20px;
            }
            .info-row {
              margin-bottom: 15px;
              padding-bottom: 15px;
              border-bottom: 1px solid #e5e7eb;
            }
            .info-row:last-child {
              border-bottom: none;
              margin-bottom: 0;
              padding-bottom: 0;
            }
            .label {
              font-weight: 600;
              color: #6B7280;
              font-size: 14px;
              text-transform: uppercase;
              letter-spacing: 0.5px;
              margin-bottom: 5px;
            }
            .value {
              color: #111827;
              font-size: 16px;
            }
            .message-box {
              background-color: #F3F4F6;
              border-left: 4px solid #A78BFA;
              padding: 20px;
              margin-top: 20px;
              border-radius: 4px;
            }
            .footer {
              text-align: center;
              margin-top: 30px;
              padding-top: 20px;
              border-top: 1px solid #e5e7eb;
              color: #6B7280;
              font-size: 12px;
            }
            .timestamp {
              color: #9CA3AF;
              font-size: 14px;
              margin-top: 10px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>New Contact Form Submission</h1>
            </div>
            
            <div class="info-section">
              <div class="info-row">
                <div class="label">Name</div>
                <div class="value">${formData.name || 'Not provided'}</div>
              </div>
              <div class="info-row">
                <div class="label">Email</div>
                <div class="value">${formData.email || 'Not provided'}</div>
              </div>
              <div class="info-row">
                <div class="label">Phone</div>
                <div class="value">${formData.phone || 'Not provided'}</div>
              </div>
              ${
                formData.service
                  ? `
              <div class="info-row">
                <div class="label">Service Interest</div>
                <div class="value">${formData.service}</div>
              </div>
              `
                  : ''
              }
            </div>

            ${
              formData.message
                ? `
            <div class="message-box">
              <div class="label">Message</div>
              <div class="value" style="white-space: pre-wrap; margin-top: 10px;">${formData.message}</div>
            </div>
            `
                : ''
            }

            <div class="timestamp">
              Submitted: ${new Date().toLocaleString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                timeZoneName: 'short',
              })}
            </div>

            <div class="footer">
              <p>This email was sent from the Angels Walking contact form.</p>
              <p>Submission ID: ${submissionId}</p>
            </div>
          </div>
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
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              background-color: #f9fafb;
            }
            .container {
              background-color: #ffffff;
              border-radius: 12px;
              padding: 30px;
              box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            }
            .header {
              text-align: center;
              margin-bottom: 30px;
              padding-bottom: 20px;
              border-bottom: 2px solid #7C3AED;
            }
            .logo {
              max-width: 200px;
              height: auto;
              margin-bottom: 20px;
            }
            h1 {
              color: #7C3AED;
              font-size: 24px;
              margin: 0;
            }
            .message {
              color: #111827;
              font-size: 16px;
              margin-bottom: 20px;
            }
            .message-copy {
              background-color: #F3F4F6;
              border-left: 4px solid #A78BFA;
              padding: 20px;
              margin: 20px 0;
              border-radius: 4px;
            }
            .contact-info {
              background-color: #f9fafb;
              border-radius: 8px;
              padding: 20px;
              margin-top: 20px;
            }
            .contact-item {
              margin-bottom: 10px;
            }
            .contact-item:last-child {
              margin-bottom: 0;
            }
            .footer {
              text-align: center;
              margin-top: 30px;
              padding-top: 20px;
              border-top: 1px solid #e5e7eb;
              color: #6B7280;
              font-size: 12px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Thank You for Contacting Us!</h1>
            </div>
            
            <div class="message">
              <p>Hi ${formData.name || 'there'},</p>
              <p>Thank you for reaching out to Angels Walking. We've received your message and will get back to you within 24 hours.</p>
            </div>

            ${
              formData.message
                ? `
            <div class="message-copy">
              <strong>Your Message:</strong>
              <p style="white-space: pre-wrap; margin-top: 10px;">${formData.message}</p>
            </div>
            `
                : ''
            }

            <div class="contact-info">
              <h3 style="color: #7C3AED; margin-top: 0;">Our Contact Information</h3>
              <div class="contact-item">
                <strong>Email:</strong> gladys@angelswalking.com
              </div>
              <div class="contact-item">
                <strong>Phone:</strong> 407-782-5048
              </div>
              <div class="contact-item">
                <strong>Location:</strong> Orlando, FL 32826
              </div>
            </div>

            <div class="footer">
              <p>We look forward to connecting with you soon!</p>
              <p>Blessings,<br>The Angels Walking Team</p>
            </div>
          </div>
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
