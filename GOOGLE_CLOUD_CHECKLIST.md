# Google Cloud Console Checklist

Since your business has been verified for years, let's make sure everything is set up correctly in Google Cloud Console.

## ✅ Required Setup in Google Cloud Console

### 1. Enable Places API (New)

**Important:** Google has a newer "Places API (New)" that might be needed:

1. Go to: **https://console.cloud.google.com/apis/library**
2. Search for **"Places API (New)"**
3. Make sure it's **Enabled** (not just "Places API")
4. If it's not enabled, click **"Enable"**

### 2. Check API Key Restrictions

1. Go to: **https://console.cloud.google.com/apis/credentials**
2. Click on your API key: **"Maps Platform API Key"**
3. Under **"API restrictions"**, make sure:
   - Either **"Don't restrict key"** is selected, OR
   - Both **"Places API"** AND **"Places API (New)"** are in the allowed list
4. Click **"Save"**

### 3. Check Application Restrictions

1. In the same API key settings
2. Under **"Application restrictions"**:
   - For development: **"None"** is fine
   - For production: You might want to restrict by HTTP referrer (your domain)
3. Click **"Save"**

### 4. Enable Billing (If Required)

Some Google Cloud projects require billing to be enabled even for free tier:

1. Go to: **https://console.cloud.google.com/billing**
2. Make sure billing is enabled (free tier should cover this)
3. Check if there are any billing alerts or issues

### 5. Check API Quotas

1. Go to: **https://console.cloud.google.com/apis/api/places-backend.googleapis.com/quotas**
2. Make sure you haven't exceeded any quotas
3. The free tier usually allows 1,000 requests/day

## 🔍 Test After Changes

After making any changes, wait 2-3 minutes, then run:

```bash
node verify-google-setup.js
```

## ⚠️ Common Issues

### Issue: "REQUEST_DENIED"
- **Solution:** Make sure Places API (New) is enabled
- **Solution:** Check API key restrictions allow Places API

### Issue: "NOT_FOUND" 
- **Solution:** The Place ID might be correct but the business might not be accessible via API
- **Solution:** Try using "Places API (New)" instead of regular "Places API"

### Issue: "INVALID_REQUEST"
- **Solution:** Check Place ID format (should start with ChIJ)
- **Solution:** Verify the Place ID is for the correct business

## 🎯 Most Likely Fix

Since your business is verified but the API isn't finding it, try:

1. **Enable "Places API (New)"** in addition to "Places API"
2. **Update API key restrictions** to include both APIs
3. **Wait 5-10 minutes** for changes to propagate
4. **Test again**

---

**Try enabling "Places API (New)" first - that's often the missing piece!**
