# Supabase Keep-Alive (Free Tier)

The free Supabase tier can pause your project after a period of inactivity. The `supabase-keep-alive` Netlify function pings Supabase with a minimal query so the project stays active.

## What it does

- Runs a lightweight query against your Supabase project (e.g. `form_submissions` or `success_stories`).
- No new env vars needed if you already have `REACT_APP_SUPABASE_URL` and `REACT_APP_SUPABASE_ANON_KEY` in Netlify (the function falls back to those).

## How to run it on a schedule — External cron (recommended)

Since scheduled functions are not available in your Netlify plan, use a **free external cron** service to call the function URL every 6–12 hours.

### Step-by-step with cron-job.org (free)

1. Go to **[cron-job.org](https://cron-job.org/en/)** and sign up for a free account.
2. Click **"Create cronjob"**.
3. **Title:** "Supabase keep-alive for Angels Walking"
4. **URL:** `https://YOUR-SITE.netlify.app/.netlify/functions/supabase-keep-alive`  
   (Replace `YOUR-SITE` with your actual Netlify site name, e.g. `angels-walking.netlify.app`.)
5. **Schedule:**
   - **Every 6 hours:** Select "Every 6 hours" from the dropdown, or use advanced with `0 */6 * * *`.
   - **Every 12 hours:** `0 */12 * * *` (runs at midnight and noon UTC).
6. **Request method:** GET
7. Click **"Create cronjob"**.

The cron service will call your function every 6 (or 12) hours. Each request wakes Supabase and logs a success message.

### Alternative free services

- **[Uptime Robot](https://uptimerobot.com):** Create an "HTTP(s)" monitor with the function URL; set check interval to 12+ hours (free tier allows 50 monitors; you can set custom intervals).
- **GitHub Actions:** If your repo is on GitHub, we can add a scheduled workflow (`.github/workflows/keep-alive.yml`) that runs every 6 hours and calls the function URL. Let me know if you want that option.

## Verifying

- Call the function URL in your browser or with `curl`:
  ```bash
  curl https://YOUR-SITE.netlify.app/.netlify/functions/supabase-keep-alive
  ```
- You should get JSON like:
  ```json
  {"ok":true,"message":"Supabase keep-alive ping succeeded."}
  ```
- If env vars are missing, you'll get a 500 error; add `SUPABASE_URL` and `SUPABASE_ANON_KEY` to Netlify (or confirm `REACT_APP_SUPABASE_URL` and `REACT_APP_SUPABASE_ANON_KEY` are set) and redeploy.

## Env vars (if needed)

If the function returns a 500 about missing env vars:

1. Go to **Netlify** → **Site settings** → **Environment variables**.
2. Add (if not already present):
   - `SUPABASE_URL`: your Supabase project URL (e.g. `https://abcdefgh.supabase.co`)
   - `SUPABASE_ANON_KEY`: your Supabase anon key (same as `REACT_APP_SUPABASE_ANON_KEY`)
3. Redeploy the site so the function picks up the new vars.
