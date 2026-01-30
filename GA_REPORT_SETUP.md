# GA4 Report Setup (Admin Dashboard Data)

The admin Analytics page can show real numbers (pageviews, sessions, users, events, top pages) by using the **Google Analytics Data API**. This requires a **GA4 Property ID** (numeric) and a **Google Cloud service account** with access to that property.

## 1. Get your GA4 Property ID

The Property ID is a **numeric** ID (e.g. `123456789`), **not** the Measurement ID (e.g. `G-XXXXXXXXXX`).

1. Go to [Google Analytics](https://analytics.google.com) and select your property (Angels Walking).
2. Open **Admin** (gear icon) → **Property settings**.
3. Under **Property details**, find **Property ID**. It’s a number like `412345678`. Use this as `GA_PROPERTY_ID`.

## 2. Create a Google Cloud project and enable the API

1. Go to [Google Cloud Console](https://console.cloud.google.com).
2. Create a project or select an existing one (can be the same project that has your GA4 property).
3. Enable the **Google Analytics Data API**:
   - **APIs & Services** → **Library** → search for “Google Analytics Data API” → **Enable**.

## 3. Create a service account

1. In Google Cloud Console: **APIs & Services** → **Credentials** → **Create credentials** → **Service account**.
2. Name it (e.g. “Angels Walking GA Report”), then **Create and continue**.
3. Skip optional steps (roles can be set in GA4) and **Done**.
4. Open the new service account → **Keys** → **Add key** → **Create new key** → **JSON** → **Create**. Save the JSON file securely.

## 4. Grant the service account access in GA4

1. In [Google Analytics](https://analytics.google.com): **Admin** → **Property** column → **Property access management**.
2. Click **+** → **Add users**.
3. Enter the **service account email** (e.g. `ga-report@your-project.iam.gserviceaccount.com` from the JSON `client_email`).
4. Role: **Viewer** (read-only). Save.

## 5. Set environment variables in Netlify

In **Netlify** → your site → **Site configuration** → **Environment variables**, add:

| Variable | Description |
|----------|-------------|
| `GA_PROPERTY_ID` | Your GA4 Property ID (numeric, e.g. `412345678`). |
| **Option A** | |
| `GA_SERVICE_ACCOUNT_JSON` | The **entire** contents of the service account JSON file as a single string. (In Netlify you can paste the JSON; keep newlines as-is or ensure the private key uses `\n` where needed.) |
| **Option B** | |
| `GA_CLIENT_EMAIL` | From the JSON: `client_email`. |
| `GA_PRIVATE_KEY` | From the JSON: `private_key`. For Netlify, you can paste the key with real newlines, or use `\n` for line breaks. |

- Use **either** Option A **or** Option B, not both.
- Redeploy the site after adding or changing these variables so the `ga-report` function uses them.

## 6. Verify

1. Open the **Admin** area of your site → **Analytics**.
2. Choose a time range (e.g. Last 30 days) and click **Refresh**.
3. If setup is correct, the KPI cards and Top Pages will show data from GA4.
4. If you see “Dashboard data unavailable” or an error message, check:
   - `GA_PROPERTY_ID` is the numeric Property ID.
   - Service account email has **Viewer** access on the GA4 property.
   - Google Analytics Data API is enabled in the Cloud project.
   - `GA_SERVICE_ACCOUNT_JSON` or `GA_CLIENT_EMAIL` + `GA_PRIVATE_KEY` are set correctly in Netlify (and redeployed).

## Notes

- **REACT_APP_GA_MEASUREMENT_ID** is used by the frontend to send events to GA4 (already set for tracking). The **GA_PROPERTY_ID** and service account are used only by the server-side `ga-report` function to read data for the admin dashboard.
- GA4 data can take 24–48 hours to appear; for new properties or low traffic, some metrics may be zero at first.
- Keep the service account JSON and keys private. Do not commit them to git; use Netlify (or your host) environment variables only.
