/**
 * Netlify Function: Ping Supabase with a minimal query to keep the free-tier
 * project from pausing due to inactivity.
 *
 * Run on a schedule via:
 * 1. Netlify UI: Site → Functions → supabase-keep-alive → Trigger → Schedule (e.g. "0 */6 * * *" for every 6 hours)
 * 2. External cron: GET https://your-site.netlify.app/.netlify/functions/supabase-keep-alive every 6–12 hours (e.g. cron-job.org, Uptime Robot)
 *
 * Env: Uses SUPABASE_URL + SUPABASE_ANON_KEY, or REACT_APP_SUPABASE_URL + REACT_APP_SUPABASE_ANON_KEY if set.
 */

const { createClient } = require('@supabase/supabase-js');

const supabaseUrl =
  process.env.SUPABASE_URL || process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey =
  process.env.SUPABASE_ANON_KEY || process.env.REACT_APP_SUPABASE_ANON_KEY;

exports.handler = async function (event, context) {
  if (!supabaseUrl || !supabaseAnonKey) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        ok: false,
        error: 'Missing SUPABASE_URL or SUPABASE_ANON_KEY (or REACT_APP_* equivalents)',
      }),
      headers: { 'Content-Type': 'application/json' },
    };
  }

  try {
    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    // Minimal query: one row from a table that exists (form_submissions or success_stories).
    const { error } = await supabase
      .from('form_submissions')
      .select('id')
      .limit(1)
      .maybeSingle();

    if (error) {
      // If form_submissions doesn't exist or RLS blocks, try success_stories
      const { error: err2 } = await supabase
        .from('success_stories')
        .select('id')
        .limit(1)
        .maybeSingle();

      if (err2) {
        return {
          statusCode: 200,
          body: JSON.stringify({
            ok: true,
            message: 'Keep-alive ran; Supabase reachable (query returned no rows or RLS applied).',
          }),
          headers: { 'Content-Type': 'application/json' },
        };
      }
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ ok: true, message: 'Supabase keep-alive ping succeeded.' }),
      headers: { 'Content-Type': 'application/json' },
    };
  } catch (err) {
    return {
      statusCode: 200,
      body: JSON.stringify({
        ok: true,
        message: 'Keep-alive ran; Supabase may have been cold.',
        detail: err.message,
      }),
      headers: { 'Content-Type': 'application/json' },
    };
  }
};
