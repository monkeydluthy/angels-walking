# Check Your API Setup

## ✅ What Looks Good

1. **API Key exists** - You have "Maps Platform API Key"
2. **Unrestricted settings** - This is fine for development (though not recommended for production)

## ⚠️ Things to Check

### 1. Verify Places API is Enabled

The API key exists, but you need to make sure **Places API** is enabled:

1. Go to: **https://console.cloud.google.com/apis/library**
2. Search for **"Places API"** (not "Places API (New)")
3. Click on it
4. Make sure it says **"Enabled"** (green checkmark)
5. If it says "Enable", click that button

### 2. Check API Key Value

I notice in the screenshot the key shows as `AlzaSyAw...` but it should be `AIzaSy...` (capital I, not lowercase L). This might be a font rendering issue, but double-check:

- The key should start with: **AIza** (capital A, capital I, lowercase z, lowercase a)
- Not: Alza (lowercase L)

### 3. Test the API Key

1. Open `test-api-key.html` in your browser
2. Click "Test API Key"
3. If it says "API Key Works!" - you're good!
4. If it says "REQUEST_DENIED" - Places API might not be enabled

## 🎯 Recommended: Use Google Places ID Finder

Since you're having issues with the API, the **easiest solution** is to use Google's official tool (no API key needed):

1. Go to: **https://developers.google.com/maps/documentation/places/web-service/place-id#find-id**
2. Search for: **Gladys Schmanski Spiritual Recovery Life Coach**
3. Copy the Place ID

This bypasses all API setup issues!

## 📝 Once You Have the Place ID

Update your `.env` file:

```
REACT_APP_GOOGLE_PLACES_API_KEY=AIzaSyAw_feFD6KfBjeTVdwG7BSU5xSlZdK6pb0
REACT_APP_GOOGLE_PLACE_ID=ChIJ...your_place_id_here
```

**Note:** Make sure the variable name is `REACT_APP_GOOGLE_PLACES_API_KEY` (not just `GOOGLE API`)
