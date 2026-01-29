/**
 * Email service integration
 * Handles sending emails via Netlify Functions
 */

// Get the base URL - use custom URL if provided, otherwise use current origin
const getBaseUrl = () => {
  if (process.env.REACT_APP_NETLIFY_FUNCTIONS_URL) {
    return process.env.REACT_APP_NETLIFY_FUNCTIONS_URL;
  }
  // Default to current origin (works for Netlify deployments)
  return window.location.origin;
};

/**
 * Send contact form email
 */
export const sendContactEmail = async (formData, submissionId) => {
  try {
    const response = await fetch(`${getBaseUrl()}/.netlify/functions/send-contact-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        formData,
        submissionId,
      }),
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error sending contact email:', error);
    return {
      success: false,
      error: error.message,
    };
  }
};

/**
 * Send quiz completion email
 */
export const sendQuizEmail = async (quizData, submissionId) => {
  try {
    const response = await fetch(`${getBaseUrl()}/.netlify/functions/send-quiz-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        quizData,
        submissionId,
      }),
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error sending quiz email:', error);
    return {
      success: false,
      error: error.message,
    };
  }
};
