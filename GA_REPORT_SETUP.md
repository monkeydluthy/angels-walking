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

**Important:** Your local `.env` file is **not** used by Netlify for server-side functions. You must add these variables in the Netlify dashboard so the `ga-report` function can read them.

In **Netlify** → your site → **Site configuration** → **Environment variables**, add:

| Variable | Description |
|----------|-------------|
| `GA_PROPERTY_ID` | Your GA4 Property ID (numeric, e.g. `412345678`). |

Then use **one** of the options below for credentials.

---

### Option A: JSON as a string (recommended)

**A1 – Minified one-line JSON**

1. Open the service account JSON file in a text editor.
2. Remove all line breaks so the whole file is one line (or use a “minify JSON” tool).
3. In Netlify, create a variable:
   - **Key:** `GA_SERVICE_ACCOUNT_JSON`
   - **Value:** Paste that single line (the entire JSON). Do **not** wrap it in extra quotes.

**A2 – Base64 (avoids quoting/newline issues)**

1. In a terminal (from the folder containing the JSON file):
   ```bash
   # macOS/Linux – outputs one long base64 string
   base64 -i your-service-account-key.json | tr -d '\n'
   ```
2. Copy the entire output (one line).
3. In Netlify, create a variable:
   - **Key:** `GA_SERVICE_ACCOUNT_JSON_B64`
   - **Value:** Paste the base64 string.

The function accepts either `GA_SERVICE_ACCOUNT_JSON` (raw JSON string) or `GA_SERVICE_ACCOUNT_JSON_B64` (base64 of that JSON). Use only one.

---

### Option B: Email + private key separately

| Variable | Value |
|----------|--------|
| `GA_CLIENT_EMAIL` | From the JSON: the `client_email` value (e.g. `something@project.iam.gserviceaccount.com`). |
| `GA_PRIVATE_KEY` | From the JSON: the entire `private_key` value. |

**How to add the private key in Netlify:**

- **If Netlify allows multiline values:** Paste the key exactly as in the JSON, including the lines between `-----BEGIN PRIVATE KEY-----` and `-----END PRIVATE KEY-----`. The function will accept real newlines.
- **If you must use one line:** Keep the key on one line and use the literal characters `\n` where each newline would be (same as in the JSON). Example: `-----BEGIN PRIVATE KEY-----\nMIIE...\n...\n-----END PRIVATE KEY-----\n`

Do **not** put the key in your repo or in a local `.env` that you commit. Set it only in Netlify (or your host) environment variables.

---

- Use **only one** of: Option A (JSON or B64) **or** Option B (email + key).
- After adding or changing variables, **redeploy** the site so the function sees them.

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

## Troubleshooting

- **“I set everything in `.env` but the live site still says not configured”**  
  Netlify does **not** read your repo’s `.env` for server-side functions. Add the same variables in **Netlify** → **Site configuration** → **Environment variables**, then redeploy.

- **“I added the JSON as a string but get parse error”**  
  Use **minified** JSON (one line, no line breaks) for `GA_SERVICE_ACCOUNT_JSON`, or use **base64**: run `base64 -i your-key.json | tr -d '\n'` and set that as `GA_SERVICE_ACCOUNT_JSON_B64`.

- **“Private key invalid” or API errors**  
  Ensure the service account email has **Viewer** access on the GA4 property (Admin → Property access management), and that the **Google Analytics Data API** is enabled in the Google Cloud project.

- **“DECODER routines::unsupported” or “Getting metadata from plugin failed”**  
  This usually means the private key was corrupted when stored (e.g. newlines stripped or altered). **Best fix:** switch to the **base64** method so the key never goes through Netlify’s multiline handling:
  1. In Terminal: `base64 -i your-service-account-key.json | tr -d '\n'` (copy the output).
  2. In Netlify, **delete** `GA_CLIENT_EMAIL` and `GA_PRIVATE_KEY`, then add one variable: **Key** `GA_SERVICE_ACCOUNT_JSON_B64`, **Value** = the pasted base64 string.
  3. Redeploy. The function will decode the JSON and use the key from there.
