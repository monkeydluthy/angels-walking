# Fix API Issues

## Problem 1: Network Error (CORS)

The "Failed to fetch" error is a CORS issue - browsers block API calls from local HTML files.

## Problem 2: REQUEST_DENIED

The "REQUEST_DENIED" error means the **Geocoding API** isn't enabled.

## ✅ Solution: Enable Geocoding API

1. Go to: **https://console.cloud.google.com/apis/library**
2. Search for **"Geocoding API"**
3. Click on it
4. Click **"Enable"**
5. Wait 1-2 minutes for it to activate

## Alternative: Use Places API Only (No Geocoding Needed)

Since we're searching by business name, we don't actually need Geocoding API. Let's use a simpler approach that only uses Places API.
