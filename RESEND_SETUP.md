# Resend Email Setup Guide

## Overview

This guide will help you set up Resend for sending automated emails from the Angels Walking website. Emails are sent for:
- Contact form submissions (to Gladys + user confirmation)
- Self-care quiz completions (to Gladys)

## Step 1: Get Your Resend API Key

1. Go to [resend.com](https://resend.com) and sign in (or create an account)
2. Navigate to **API Keys** in the dashboard
3. Click **"Create API Key"**
4. Give it a name (e.g., "Angels Walking Production")
5. Copy the API key (starts with `re_`)

## Step 2: Add Domain to Resend

1. In Resend dashboard, go to **Domains**
2. Click **"Add Domain"**
3. Enter your domain: `angelswalking.com`
4. Click **"Add"**

## Step 3: Configure DNS Records

Resend will provide you with DNS records to add. You'll need to add these to your domain's DNS settings:

### Required DNS Records:

1. **SPF Record** (TXT):
   ```
   Type: TXT
   Name: @ (or leave blank)
   Value: v=spf1 include:_spf.resend.com ~all
   TTL: 3600
   ```

2. **DKIM Records** (CNAME):
   Resend will provide 2-3 CNAME records. They'll look like:
   ```
   Type: CNAME
   Name: resend._domainkey (or similar)
   Value: [provided by Resend]
   TTL: 3600
   ```

3. **DMARC Record** (TXT) - Optional but recommended:
   ```
   Type: TXT
   Name: _dmarc
   Value: v=DMARC1; p=none; rua=mailto:gladys@angelswalking.com
   TTL: 3600
   ```

### How to Add DNS Records:

1. Log into your domain registrar (where you bought angelswalking.com)
2. Find **DNS Management** or **DNS Settings**
3. Add each record provided by Resend
4. Wait for DNS propagation (can take a few minutes to 48 hours)

## Step 4: Verify Domain in Resend

1. After adding DNS records, go back to Resend dashboard
2. Click **"Verify"** next to your domain
3. Wait for verification (usually takes a few minutes)
4. Once verified, you'll see a green checkmark ✅

## Step 5: Set Up Environment Variables

### Local Development (.env file):
```env
RESEND_API_KEY=re_your_api_key_here
RESEND_FROM_EMAIL=noreply@angelswalking.com
GLADYS_EMAIL=gladys@angelswalking.com
```

### Netlify Deployment:

1. Go to your Netlify site dashboard
2. Navigate to **Site settings** → **Environment variables**
3. Add the following variables:

   - **Key**: `RESEND_API_KEY`
     **Value**: `re_your_api_key_here` (your actual API key)

   - **Key**: `RESEND_FROM_EMAIL`
     **Value**: `noreply@angelswalking.com`

   - **Key**: `GLADYS_EMAIL`
     **Value**: `gladys@angelswalking.com`

4. Click **"Save"**
5. **Redeploy** your site for changes to take effect

## Step 6: Test Email Sending

1. Visit your deployed site
2. Submit the contact form
3. Complete the self-care quiz
4. Check Gladys's email inbox for the notifications
5. Check the user's email (if provided) for confirmation

## Troubleshooting

### Email Not Sending

1. **Check API Key**: Make sure `RESEND_API_KEY` is set correctly in Netlify
2. **Check Domain Verification**: Ensure domain is verified in Resend dashboard
3. **Check DNS Records**: Verify all DNS records are correctly added and propagated
4. **Check Netlify Functions Logs**: 
   - Go to Netlify dashboard → **Functions** tab
   - Check for any error messages

### DNS Propagation

- DNS changes can take 24-48 hours to fully propagate
- Use a DNS checker tool to verify records are live
- Resend will show verification status in the dashboard

### Common Issues

**"Domain not verified"**
- Wait for DNS propagation
- Double-check DNS records match exactly what Resend provided
- Ensure TTL is set correctly

**"API key invalid"**
- Regenerate API key in Resend dashboard
- Update environment variable in Netlify
- Redeploy site

**"Email not received"**
- Check spam/junk folder
- Verify `GLADYS_EMAIL` is correct
- Check Resend dashboard for delivery status

## Email Templates

The email templates are built into the Netlify Functions:
- `netlify/functions/send-contact-email.js` - Contact form emails
- `netlify/functions/send-quiz-email.js` - Quiz completion emails

Templates include:
- Professional HTML design
- Site branding and colors
- Logo (hosted on your site)
- Responsive design for mobile

## Monitoring

- Check Resend dashboard for email delivery statistics
- Monitor Netlify Functions logs for errors
- Admin panel shows email_sent status for each submission

---

**Once setup is complete, emails will automatically send when users submit forms or complete the quiz!** 🎉
