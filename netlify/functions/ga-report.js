/**
 * Netlify Function: Fetch GA4 metrics and top pages via Google Analytics Data API.
 * Requires: GA_PROPERTY_ID (numeric), and either GA_SERVICE_ACCOUNT_JSON or GA_CLIENT_EMAIL + GA_PRIVATE_KEY.
 */

const { BetaAnalyticsDataClient } = require('@google-analytics/data');

function getCredentials() {
  const json = process.env.GA_SERVICE_ACCOUNT_JSON;
  if (json) {
    try {
      const creds = typeof json === 'string' ? JSON.parse(json) : json;
      return {
        client_email: creds.client_email,
        private_key: (creds.private_key || '').replace(/\\n/g, '\n'),
      };
    } catch (e) {
      console.error('GA_SERVICE_ACCOUNT_JSON parse error:', e.message);
      return null;
    }
  }
  const email = process.env.GA_CLIENT_EMAIL;
  const key = process.env.GA_PRIVATE_KEY;
  if (email && key) {
    return {
      client_email: email,
      private_key: key.replace(/\\n/g, '\n'),
    };
  }
  return null;
}

function getDateRange(days) {
  const end = new Date();
  const start = new Date();
  start.setDate(start.getDate() - Math.min(Math.max(Number(days) || 30, 1), 365));
  return {
    startDate: start.toISOString().slice(0, 10),
    endDate: end.toISOString().slice(0, 10),
  };
}

exports.handler = async (event) => {
  if (event.httpMethod !== 'GET') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  const propertyId = process.env.GA_PROPERTY_ID;
  if (!propertyId) {
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        error: 'GA4 not configured',
        configured: false,
        metrics: null,
        topPages: [],
        events: {},
      }),
    };
  }

  const credentials = getCredentials();
  if (!credentials) {
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        error: 'GA4 credentials missing (GA_SERVICE_ACCOUNT_JSON or GA_CLIENT_EMAIL + GA_PRIVATE_KEY)',
        configured: true,
        metrics: null,
        topPages: [],
        events: {},
      }),
    };
  }

  const timeRange = event.queryStringParameters?.timeRange || '30';
  const { startDate, endDate } = getDateRange(timeRange);
  const property = `properties/${propertyId}`;

  try {
    const analyticsDataClient = new BetaAnalyticsDataClient({ credentials });

    // 1) Overview metrics: pageviews, sessions, users, avg session duration
    const [overviewResponse] = await analyticsDataClient.runReport({
      property,
      dateRanges: [{ startDate, endDate }],
      metrics: [
        { name: 'screenPageViews' },
        { name: 'sessions' },
        { name: 'activeUsers' },
        { name: 'averageSessionDuration' },
      ],
    });

    let pageviews = 0;
    let sessions = 0;
    let users = 0;
    let avgSessionSeconds = 0;
    if (overviewResponse.rows && overviewResponse.rows.length > 0) {
      const row = overviewResponse.rows[0];
      pageviews = Number(row.metricValues?.[0]?.value ?? 0);
      sessions = Number(row.metricValues?.[1]?.value ?? 0);
      users = Number(row.metricValues?.[2]?.value ?? 0);
      avgSessionSeconds = Number(row.metricValues?.[3]?.value ?? 0);
    }

    const formatDuration = (seconds) => {
      const m = Math.floor(seconds / 60);
      const s = Math.floor(seconds % 60);
      return `${m}:${String(s).padStart(2, '0')}`;
    };

    // 2) Top pages by page path
    const [pagesResponse] = await analyticsDataClient.runReport({
      property,
      dateRanges: [{ startDate, endDate }],
      dimensions: [{ name: 'pagePath' }],
      metrics: [{ name: 'screenPageViews' }],
      orderBys: [{ metric: { metricName: 'screenPageViews' }, desc: true }],
      limit: 20,
    });

    const topPages = (pagesResponse.rows || []).map((row) => ({
      path: row.dimensionValues?.[0]?.value || '',
      views: Number(row.metricValues?.[0]?.value ?? 0),
      label: (row.dimensionValues?.[0]?.value || '/').replace(/^\/$/, 'Home').replace(/^\//, '').replace(/-/g, ' ') || 'Page',
    }));

    // 3) Event counts by event name (for form_submit, contact_form_submit, quiz_complete, phone_call, email_click, cta_click, service_view, review_action)
    const [eventsResponse] = await analyticsDataClient.runReport({
      property,
      dateRanges: [{ startDate, endDate }],
      dimensions: [{ name: 'eventName' }],
      metrics: [{ name: 'eventCount' }],
    });

    const eventCounts = {};
    const eventMap = {
      contact_form_submit: 'formSubmits',
      form_submit: 'formSubmits',
      quiz_complete: 'quizCompletions',
      phone_call: 'phoneCalls',
      email_click: 'emailClicks',
      cta_click: 'ctaClicks',
      service_view: 'serviceViews',
      review_action: 'reviewActions',
    };
    (eventsResponse.rows || []).forEach((row) => {
      const name = row.dimensionValues?.[0]?.value;
      const count = Number(row.metricValues?.[0]?.value ?? 0);
      const key = eventMap[name];
      if (key) {
        if (key === 'formSubmits') eventCounts.formSubmits = (eventCounts.formSubmits || 0) + count;
        else eventCounts[key] = (eventCounts[key] || 0) + count;
      }
    });

    const body = {
      configured: true,
      timeRange: Number(timeRange) || 30,
      startDate,
      endDate,
      metrics: {
        pageviews,
        sessions,
        users,
        avgSessionDuration: formatDuration(avgSessionSeconds),
        ...eventCounts,
      },
      topPages,
      events: eventCounts,
    };

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    };
  } catch (err) {
    console.error('GA report error:', err.message);
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        error: err.message || 'Failed to fetch GA data',
        configured: true,
        metrics: null,
        topPages: [],
        events: {},
      }),
    };
  }
};
