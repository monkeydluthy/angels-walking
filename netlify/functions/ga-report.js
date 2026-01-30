/**
 * Netlify Function: Fetch GA4 metrics and top pages via Google Analytics Data API.
 * Requires: GA_PROPERTY_ID (numeric), and either GA_SERVICE_ACCOUNT_JSON or GA_CLIENT_EMAIL + GA_PRIVATE_KEY.
 */

const { BetaAnalyticsDataClient } = require('@google-analytics/data');

// Normalize private key so OpenSSL can parse it (fixes "DECODER routines::unsupported").
// Env vars may have: literal \n, real newlines, \r\n, or one line with newlines stripped.
function normalizePrivateKey(key) {
  if (!key || typeof key !== 'string') return '';
  let k = key.trim();
  // Literal backslash-n (e.g. from JSON or one-line paste) -> real newline
  k = k.replace(/\\n/g, '\n');
  // Normalize line endings
  k = k.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
  // If key is still one long line (Netlify sometimes strips newlines), rebuild PEM:
  // Format is "-----BEGIN PRIVATE KEY-----\n<base64>\n-----END PRIVATE KEY-----"
  if (!k.includes('\n') && k.includes('-----BEGIN') && k.includes('-----END')) {
    const begin = '-----BEGIN PRIVATE KEY-----';
    const end = '-----END PRIVATE KEY-----';
    const startIdx = k.indexOf(begin) + begin.length;
    const endIdx = k.indexOf(end);
    if (startIdx > 0 && endIdx > startIdx) {
      const base64 = k.slice(startIdx, endIdx).replace(/\s/g, '');
      // Split base64 into 64-char lines (standard PEM)
      const lines = base64.match(/.{1,64}/g) || [];
      k = begin + '\n' + lines.join('\n') + '\n' + end;
    }
  }
  return k;
}

function getCredentials() {
  // Option 1: Base64-encoded JSON (avoids quoting/newline issues in Netlify UI)
  const b64 = process.env.GA_SERVICE_ACCOUNT_JSON_B64;
  if (b64) {
    try {
      const json = Buffer.from(b64, 'base64').toString('utf8');
      const creds = JSON.parse(json);
      return {
        client_email: creds.client_email,
        private_key: normalizePrivateKey(creds.private_key),
      };
    } catch (e) {
      console.error('GA_SERVICE_ACCOUNT_JSON_B64 error:', e.message);
      return null;
    }
  }

  // Option 2: Raw JSON string (minify to one line or paste as-is if Netlify keeps newlines)
  const json = process.env.GA_SERVICE_ACCOUNT_JSON;
  if (json) {
    try {
      const creds = typeof json === 'string' ? JSON.parse(json) : json;
      return {
        client_email: creds.client_email,
        private_key: normalizePrivateKey(creds.private_key),
      };
    } catch (e) {
      console.error('GA_SERVICE_ACCOUNT_JSON parse error:', e.message);
      return null;
    }
  }

  // Option 3: Separate email + key (private key: use \n for newlines in Netlify)
  const email = process.env.GA_CLIENT_EMAIL;
  const key = process.env.GA_PRIVATE_KEY;
  if (email && key) {
    return {
      client_email: email.trim(),
      private_key: normalizePrivateKey(key),
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
        error: 'GA4 credentials missing (set GA_SERVICE_ACCOUNT_JSON, GA_SERVICE_ACCOUNT_JSON_B64, or GA_CLIENT_EMAIL + GA_PRIVATE_KEY in Netlify)',
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
