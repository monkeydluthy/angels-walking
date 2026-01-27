# Get Place ID - Simple Solutions

## ❌ The Problem
You're getting a CORS error because you're trying to run the code from google.com. This won't work due to browser security.

## ✅ Solution 1: Use the HTML Tool (Easiest!)

1. **Close the Google Maps tab**
2. **Open `find-place-id.html`** in a new browser tab (double-click the file)
3. **Paste your API key:** `AIzaSyAw_feFD6KfBjeTVdwG7BSU5xSlZdK6pb0`
4. **Click "Find Place ID"**
5. **Copy the result!**

This works because the HTML file runs from your computer, not from google.com, so no CORS issues!

## ✅ Solution 2: Google Places ID Finder (No Code Needed!)

1. Go to: **https://developers.google.com/maps/documentation/places/web-service/place-id#find-id**
2. In the search box, paste: **Gladys Schmanski Spiritual Recovery Life Coach**
3. Click on the business that appears
4. **Copy the Place ID** (it will be highlighted in green)

This is the official Google tool - no API key or code needed!

## ✅ Solution 3: Run from Terminal (If you have Node.js)

1. Open your terminal in the project folder
2. Run: `node get-place-id.js`
3. Copy the Place ID from the output

## 🎯 Recommended: Use Solution 2 (Google Places ID Finder)

It's the fastest and doesn't require any code or API setup. Just search and copy!

---

**Once you have the Place ID, add it to your `.env` file:**
```
REACT_APP_GOOGLE_PLACES_API_KEY=AIzaSyAw_feFD6KfBjeTVdwG7BSU5xSlZdK6pb0
REACT_APP_GOOGLE_PLACE_ID=ChIJ...your_place_id_here
```

Then restart your dev server!
