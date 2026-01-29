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
            .section {
              margin-top: 30px;
              padding-top: 20px;
              border-top: 2px solid #A78BFA;
            }
            .section-title {
              color: #7C3AED;
              font-size: 20px;
              font-weight: 600;
              margin-bottom: 15px;
            }
            table {
              width: 100%;
              border-collapse: collapse;
              margin-top: 10px;
            }
            table td {
              padding: 12px;
              border-bottom: 1px solid #e5e7eb;
            }
            table tr:last-child td {
              border-bottom: none;
            }
            .recommendations {
              background: linear-gradient(135deg, #7C3AED 0%, #A78BFA 100%);
              color: white;
              padding: 20px;
              border-radius: 8px;
              margin-top: 20px;
            }
            .recommendations h3 {
              margin-top: 0;
              color: white;
            }
            .recommendations ul {
              margin: 15px 0;
              padding-left: 20px;
            }
            .recommendations li {
              margin-bottom: 10px;
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
              <h1>New Self-Care Quiz Completed</h1>
            </div>
            
            <div class="info-section">
              <div class="info-row">
                <div class="label">Name</div>
                <div class="value">${userName}</div>
              </div>
              ${
                userEmail
                  ? `
              <div class="info-row">
                <div class="label">Email</div>
                <div class="value">${userEmail}</div>
              </div>
              `
                  : ''
              }
              ${
                userPhone
                  ? `
              <div class="info-row">
                <div class="label">Phone</div>
                <div class="value">${userPhone}</div>
              </div>
              `
                  : ''
              }
            </div>

            <div class="section">
              <div class="section-title">Quiz Answers</div>
              ${formatQuizAnswers(quizData.answers, [])}
            </div>

            ${
              quizData.results
                ? `
            <div class="section">
              <div class="section-title">Primary Focus Area</div>
              <div class="value" style="font-size: 18px; color: #7C3AED; font-weight: 600;">
                ${quizData.results.primaryFocus}
              </div>
            </div>

            <div class="recommendations">
              <h3>Personalized Recommendations</h3>
              <ul>
                ${quizData.results.recommendations?.map((rec) => `<li>${rec}</li>`).join('') || ''}
              </ul>
            </div>

            ${
              quizData.results.serviceRecommendation
                ? `
            <div class="section">
              <div class="section-title">Recommended Service</div>
              <div class="value" style="font-size: 18px; color: #F59E0B; font-weight: 600;">
                ${quizData.results.serviceRecommendation}
              </div>
            </div>
            `
                : ''
            }

            ${
              quizData.results.nextSteps
                ? `
            <div class="section">
              <div class="section-title">Next Steps</div>
              <ul style="margin: 15px 0; padding-left: 20px;">
                ${quizData.results.nextSteps.map((step) => `<li style="margin-bottom: 10px;">${step}</li>`).join('')}
              </ul>
            </div>
            `
                : ''
            }
            `
                : ''
            }

            <div class="timestamp">
              Completed: ${new Date().toLocaleString('en-US', {
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
              <p>This email was sent from the Angels Walking self-care quiz.</p>
              <p>Submission ID: ${submissionId}</p>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    // Send email to Gladys
    const gladysResult = await resend.emails.send(emailToGladys);

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        emailSent: !!gladysResult.data,
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
