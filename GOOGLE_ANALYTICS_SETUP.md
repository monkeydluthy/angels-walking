# Google Analytics 4 Setup Guide

## ✅ What's Already Implemented

Google Analytics 4 (GA4) integration is fully set up in your React app! The following is automatically tracked:

### 📊 Automatic Tracking
- **Page Views**: Every route change is tracked
- **Contact Form Submissions**: Tracked when users submit the contact form
- **Quiz Completions**: Tracked when users complete the self-care quiz
- **User Interactions**: Ready for button clicks, CTA interactions, etc.

### 🔧 Technical Implementation
- Uses `react-ga4` library for GA4 integration
- Tracks page views via React Router
- Event tracking for forms and user actions
- Only runs in production (or when explicitly enabled)

## 🚀 Setup Steps

### 1. Create Google Analytics Property

1. Go to [Google Analytics](https://analytics.google.com)
2. Sign in with your Google account
3. Click **"Admin"** (gear icon) in the bottom left
4. In the **"Property"** column, click **"Create Property"**
5. Fill in:
   - Property name: `Angels Walking`
   - Reporting time zone: Your timezone
   - Currency: USD
6. Click **"Next"** and fill in business information
7. Click **"Create"**

### 2. Get Your Measurement ID

1. After creating the property, you'll see **"Data Streams"**
2. Click **"Add stream"** → **"Web"**
3. Fill in:
   - Website URL: Your Netlify URL (e.g., `https://angelswalking.netlify.app`)
   - Stream name: `Angels Walking Website`
4. Click **"Create stream"**
5. Copy your **Measurement ID** (format: `G-XXXXXXXXXX`)

### 3. Add to Environment Variables

#### Local Development (.env file)
Add this line to your `.env` file:
```env
REACT_APP_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```
Replace `G-XXXXXXXXXX` with your actual Measurement ID.

#### Netlify Deployment
1. Go to your Netlify dashboard
2. Select your site
3. Go to **Site settings** → **Environment variables**
4. Click **"Add variable"**
5. Add:
   - **Key**: `REACT_APP_GA_MEASUREMENT_ID`
   - **Value**: `G-XXXXXXXXXX` (your Measurement ID)
6. Click **"Save"**
7. **Redeploy** your site (or trigger a new deployment)

### 4. Verify It's Working

1. Deploy your site with the Measurement ID
2. Visit your site and navigate around
3. Submit the contact form or complete the quiz
4. Go to Google Analytics → **Reports** → **Realtime**
5. You should see your activity appear within a few seconds!

## 📈 What You'll See in Google Analytics

### Realtime Reports
- Active users on your site right now
- Pages being viewed
- Events being triggered

### Standard Reports
- **Engagement**: Page views, sessions, user engagement
- **Acquisition**: How users find your site
- **Events**: Form submissions, quiz completions, button clicks
- **Demographics**: User location, device types, browsers

### Custom Events Being Tracked

| Event Name | When It Fires | Parameters |
|------------|---------------|------------|
| `form_submit` | Any form submission | `form_type`, `form_name` |
| `contact_form_submit` | Contact form submitted | `form_type: 'contact'` |
| `quiz_complete` | Self-care quiz completed | `score`, `category` |
| `button_click` | Button clicked | `button_name`, `location` |
| `service_view` | Service page viewed | `service_name` |
| `cta_click` | CTA button clicked | `cta_name`, `location` |

## 🔍 Testing in Development

By default, Google Analytics only runs in production. To test locally:

1. Add to your `.env` file:
   ```env
   REACT_APP_ENABLE_GA=true
   ```
2. Restart your dev server
3. Analytics will now run in development mode

## 📝 Notes

- **Privacy**: GA4 respects user privacy and GDPR compliance
- **No Performance Impact**: Analytics loads asynchronously and doesn't block page rendering
- **Free Tier**: Google Analytics is free for most websites
- **Data Delay**: Some reports may take 24-48 hours to populate fully

## 🎯 Next Steps

1. Set up your Measurement ID in Netlify
2. Redeploy your site
3. Visit your site to generate some test data
4. Check Google Analytics Realtime reports to verify tracking
5. Set up custom goals/conversions in GA4 if needed

---

**Your Google Analytics integration is ready to go! Just add your Measurement ID and redeploy.** 🚀
