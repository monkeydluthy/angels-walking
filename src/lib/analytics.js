/**
 * Google Analytics 4 Integration
 * Handles page views, events, and user interactions
 */

import ReactGA from 'react-ga4';

// Initialize Google Analytics
export const initGA = (measurementId) => {
  if (!measurementId) {
    console.warn('Google Analytics Measurement ID not provided');
    return;
  }

  // Only initialize in production or if explicitly enabled
  if (process.env.NODE_ENV === 'production' || process.env.REACT_APP_ENABLE_GA === 'true') {
    ReactGA.initialize(measurementId, {
      testMode: process.env.NODE_ENV !== 'production',
    });
    console.log('Google Analytics initialized');
  }
};

// Track page views
export const trackPageView = (path, title) => {
  if (process.env.NODE_ENV === 'production' || process.env.REACT_APP_ENABLE_GA === 'true') {
    ReactGA.send({ hitType: 'pageview', page: path, title });
  }
};

// Track custom events
export const trackEvent = (eventName, eventParams = {}) => {
  if (process.env.NODE_ENV === 'production' || process.env.REACT_APP_ENABLE_GA === 'true') {
    ReactGA.event(eventName, eventParams);
  }
};

// Predefined event tracking functions
export const analytics = {
  // Form submissions
  trackFormSubmission: (formType, formName) => {
    trackEvent('form_submit', {
      form_type: formType,
      form_name: formName,
    });
  },

  // Contact form
  trackContactForm: () => {
    trackEvent('contact_form_submit', {
      form_type: 'contact',
    });
  },

  // Booking form
  trackBookingForm: () => {
    trackEvent('booking_form_submit', {
      form_type: 'booking',
    });
  },

  // Quiz completion
  trackQuizComplete: (score, category) => {
    trackEvent('quiz_complete', {
      quiz_name: 'self_care_quiz',
      score: score,
      category: category,
    });
  },

  // Button clicks
  trackButtonClick: (buttonName, location) => {
    trackEvent('button_click', {
      button_name: buttonName,
      location: location,
    });
  },

  // Service page views
  trackServiceView: (serviceName) => {
    trackEvent('service_view', {
      service_name: serviceName,
    });
  },

  // CTA clicks
  trackCTAClick: (ctaName, location) => {
    trackEvent('cta_click', {
      cta_name: ctaName,
      location: location,
    });
  },

  // External link clicks
  trackExternalLink: (url, linkText) => {
    trackEvent('external_link_click', {
      link_url: url,
      link_text: linkText,
    });
  },

  // Phone call tracking
  trackPhoneCall: (location) => {
    trackEvent('phone_call', {
      location: location,
    });
  },

  // Email click tracking
  trackEmailClick: (location, email) => {
    trackEvent('email_click', {
      location: location,
      email: email,
    });
  },

  // Review actions
  trackReviewClick: (action) => {
    trackEvent('review_action', {
      action: action, // 'read_all', 'leave_review'
    });
  },

  // Social media clicks
  trackSocialClick: (platform) => {
    trackEvent('social_click', {
      platform: platform,
    });
  },
};

export default analytics;
