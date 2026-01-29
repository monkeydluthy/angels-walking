const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

// Helper function to format quiz answers as HTML table
function formatQuizAnswers(answers, questions) {
  const questionLabels = {
    self_care_level: 'How would you describe your current level of self-care?',
    stress_level: 'How would you rate your current stress level?',
    spiritual_connection: 'How connected do you feel to your spiritual self?',
    life_satisfaction:
      'How satisfied are you with your current life situation?',
    support_system: 'How strong is your support system?',
    goals_clarity: 'How clear are you about your life goals and purpose?',
    negative_thoughts: 'How often do negative thoughts affect your daily life?',
    self_esteem: 'How would you rate your self-esteem?',
    healing_areas: 'Which areas do you feel need the most healing?',
    preferred_approach: 'What approach resonates most with you?',
  };

  let html =
    '<table style="width: 100%; border-collapse: collapse; margin-top: 10px;">';

  Object.keys(answers).forEach((key) => {
    const question = questionLabels[key] || key;
    let answer = answers[key];

    // Handle array answers (multiple choice)
    if (Array.isArray(answer)) {
      answer = answer.join(', ');
    }

    // Format answer labels
    answer = answer.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());

    html += `
      <tr style="border-bottom: 1px solid #e5e7eb;">
        <td style="padding: 12px; font-weight: 600; color: #6B7280; width: 40%; vertical-align: top;">${question}</td>
        <td style="padding: 12px; color: #111827; vertical-align: top;">${answer}</td>
      </tr>
    `;
  });

  html += '</table>';
  return html;
}

exports.handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const { quizData, submissionId } = JSON.parse(event.body);

    // Get email addresses from environment
    // Use Resend's default domain when RESEND_FROM_EMAIL is empty (allows testing without DNS setup)
    const fromEmail = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';
    // Use test email if provided, otherwise use Gladys email
    const gladysEmail =
      process.env.TEST_EMAIL ||
      process.env.GLADYS_EMAIL ||
      'gladys@angelswalking.com';

    const userName = quizData.contactInfo?.name || 'Unknown';
    const userEmail = quizData.contactInfo?.email || null;
    const userPhone = quizData.contactInfo?.phone || null;

    const siteUrl = process.env.URL || 'https://angels-walking.netlify.app';
    const logoUrl = `${siteUrl}/logo-transparent.png`;

    // Build email to Gladys
    const emailToGladys = {
      from: fromEmail,
      to: gladysEmail,
      subject: `New Self-Care Quiz Completed - ${userName}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New Self-Care Quiz Completed</title>
        </head>
        <body style="margin:0; padding:0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f5f3ff; line-height: 1.6;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f3ff; padding: 40px 20px;">
            <tr>
              <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="max-width: 600px; width: 100%; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px rgba(124, 58, 237, 0.1);">
                  <tr>
                    <td style="padding: 32px 40px 24px; text-align: center; background: linear-gradient(135deg, #7C3AED 0%, #A78BFA 100%);">
                      <img src="${logoUrl}" alt="Angels Walking" width="180" style="display: block; margin: 0 auto 16px; max-height: 80px; width: auto;" />
                      <h1 style="margin: 0; color: #ffffff; font-size: 22px; font-weight: 700;">New Self-Care Quiz Completed</h1>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 32px 40px;">
                      <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #faf5ff; border-radius: 12px; padding: 24px; margin-bottom: 24px;">
                        <tr><td style="padding: 12px 0; border-bottom: 1px solid #e9d5ff;"><span style="font-size: 11px; font-weight: 600; color: #7C3AED; letter-spacing: 0.5px;">NAME</span><br/><span style="font-size: 16px; color: #1f2937;">${userName}</span></td></tr>
                        ${userEmail ? `<tr><td style="padding: 12px 0; border-bottom: 1px solid #e9d5ff;"><span style="font-size: 11px; font-weight: 600; color: #7C3AED; letter-spacing: 0.5px;">EMAIL</span><br/><a href="mailto:${userEmail}" style="font-size: 16px; color: #2563eb; text-decoration: none;">${userEmail}</a></td></tr>` : ''}
                        ${userPhone ? `<tr><td style="padding: 12px 0;"><span style="font-size: 11px; font-weight: 600; color: #7C3AED; letter-spacing: 0.5px;">PHONE</span><br/><span style="font-size: 16px; color: #1f2937;">${userPhone}</span></td></tr>` : ''}
                      </table>
                      <p style="margin: 0 0 12px; font-size: 14px; font-weight: 600; color: #7C3AED;">Quiz answers</p>
                      <div style="background-color: #f9fafb; border-radius: 8px; overflow: hidden; margin-bottom: 24px;">${formatQuizAnswers(quizData.answers, [])}</div>
                      ${
                        quizData.results
                          ? `
                      <p style="margin: 0 0 8px; font-size: 14px; font-weight: 600; color: #7C3AED;">Primary focus</p>
                      <p style="margin: 0 0 24px; font-size: 18px; color: #7C3AED; font-weight: 600;">${quizData.results.primaryFocus}</p>
                      <div style="background: linear-gradient(135deg, #7C3AED 0%, #A78BFA 100%); color: #ffffff; padding: 24px; border-radius: 12px; margin-bottom: 24px;">
                        <p style="margin: 0 0 12px; font-size: 14px; font-weight: 600;">Personalized recommendations</p>
                        <ul style="margin: 0; padding-left: 20px;">${(quizData.results.recommendations || []).map((rec) => `<li style="margin-bottom: 8px;">${rec}</li>`).join('')}</ul>
                      </div>
                      ${quizData.results.serviceRecommendation ? `<p style="margin: 0 0 8px; font-size: 14px; font-weight: 600; color: #7C3AED;">Recommended service</p><p style="margin: 0 0 24px; font-size: 18px; color: #F59E0B; font-weight: 600;">${quizData.results.serviceRecommendation}</p>` : ''}
                      ${quizData.results.nextSteps && quizData.results.nextSteps.length ? `<p style="margin: 0 0 8px; font-size: 14px; font-weight: 600; color: #7C3AED;">Next steps</p><ul style="margin: 0 0 24px; padding-left: 20px;">${quizData.results.nextSteps.map((step) => `<li style="margin-bottom: 8px; color: #374151;">${step}</li>`).join('')}</ul>` : ''}
                      `
                          : ''
                      }
                      <p style="font-size: 13px; color: #9ca3af;">Completed: ${new Date().toLocaleString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', timeZoneName: 'short' })}</p>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 24px 40px; background-color: #f9fafb; border-top: 1px solid #e5e7eb; text-align: center; font-size: 12px; color: #6b7280;">
                      <p style="margin: 0;">Sent from Angels Walking self-care quiz</p>
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

    // Build confirmation email to quiz-taker (if they provided email)
    const emailToUser = userEmail
      ? {
          from: fromEmail,
          to: userEmail,
          subject: 'Your Self-Care Quiz Results - Angels Walking',
          html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Your Self-Care Quiz Results</title>
        </head>
        <body style="margin:0; padding:0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f5f3ff; line-height: 1.6;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f3ff; padding: 40px 20px;">
            <tr>
              <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="max-width: 600px; width: 100%; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px rgba(124, 58, 237, 0.1);">
                  <tr>
                    <td style="padding: 32px 40px 24px; text-align: center; background: linear-gradient(135deg, #7C3AED 0%, #A78BFA 100%);">
                      <img src="${logoUrl}" alt="Angels Walking" width="180" style="display: block; margin: 0 auto 16px; max-height: 80px; width: auto;" />
                      <h1 style="margin: 0; color: #ffffff; font-size: 22px; font-weight: 700;">Your Quiz Results Are Here</h1>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 32px 40px;">
                      <p style="margin: 0 0 24px; font-size: 16px; color: #374151;">Hi ${userName},</p>
                      <p style="margin: 0 0 24px; font-size: 16px; color: #374151;">Thank you for completing the Angels Walking self-care assessment. Here’s a summary of your personalized results.</p>
                      ${
                        quizData.results?.primaryFocus
                          ? `
                      <div style="margin-bottom: 24px;">
                        <p style="margin: 0 0 8px; font-size: 12px; font-weight: 600; color: #7C3AED; text-transform: uppercase; letter-spacing: 0.5px;">Primary focus</p>
                        <p style="margin: 0; font-size: 18px; color: #7C3AED; font-weight: 600;">${quizData.results.primaryFocus}</p>
                      </div>
                      `
                          : ''
                      }
                      ${
                        quizData.results?.serviceRecommendation
                          ? `
                      <div style="margin-bottom: 24px;">
                        <p style="margin: 0 0 8px; font-size: 12px; font-weight: 600; color: #7C3AED; text-transform: uppercase; letter-spacing: 0.5px;">Recommended service</p>
                        <p style="margin: 0; font-size: 18px; color: #1f2937; font-weight: 600;">${quizData.results.serviceRecommendation}</p>
                      </div>
                      `
                          : ''
                      }
                      ${
                        quizData.results?.recommendations &&
                        quizData.results.recommendations.length
                          ? `
                      <div style="margin-bottom: 24px; padding: 20px; background-color: #faf5ff; border-radius: 12px;">
                        <p style="margin: 0 0 12px; font-size: 12px; font-weight: 600; color: #7C3AED; text-transform: uppercase; letter-spacing: 0.5px;">Personalized recommendations</p>
                        <ul style="margin: 0; padding-left: 20px; color: #374151;">${quizData.results.recommendations.map((rec) => `<li style="margin-bottom: 8px;">${rec}</li>`).join('')}</ul>
                      </div>
                      `
                          : ''
                      }
                      ${
                        quizData.results?.nextSteps &&
                        quizData.results.nextSteps.length
                          ? `
                      <div style="margin-bottom: 24px;">
                        <p style="margin: 0 0 12px; font-size: 12px; font-weight: 600; color: #7C3AED; text-transform: uppercase; letter-spacing: 0.5px;">Next steps</p>
                        <ul style="margin: 0; padding-left: 20px; color: #374151;">${quizData.results.nextSteps.map((step) => `<li style="margin-bottom: 8px;">${step}</li>`).join('')}</ul>
                      </div>
                      `
                          : ''
                      }
                      <p style="margin: 24px 0 0; font-size: 16px; color: #374151;">We’ve received your responses and will reach out to you soon. If you’d like to schedule a free consultation in the meantime, reply to this email or call us at 407-782-5048.</p>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 24px 40px; background-color: #f9fafb; border-top: 1px solid #e5e7eb; text-align: center; font-size: 14px; color: #6b7280;">
                      <p style="margin: 0;">Blessings,<br/><strong>The Angels Walking Team</strong></p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `,
        }
      : null;

    // Send email to Gladys
    const gladysResult = await resend.emails.send(emailToGladys);

    // Send confirmation to quiz-taker if they provided email
    let userResult = { data: null };
    if (emailToUser) {
      try {
        userResult = await resend.emails.send(emailToUser);
      } catch (err) {
        console.error('Quiz confirmation email to user failed:', err);
      }
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        emailSent: !!gladysResult.data,
        userConfirmationSent: !!userResult?.data,
        submissionId,
      }),
    };
  } catch (error) {
    console.error('Error sending quiz email:', error);
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
