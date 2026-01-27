# Simple Guide: Get Your Google Place ID

## Option 1: Use the HTML Tool (Easiest!)

I've created a simple tool for you:

1. **Open the file:** `find-place-id.html` in your browser
2. **Enter your Google Places API key** (if you have it)
3. **Enter the business name:** "Gladys Schmanski Spiritual Recovery Life Coach"
4. **Click "Find Place ID"**
5. **Copy the Place ID** that appears

## Option 2: Manual Method (If you don't have API key yet)

### Step 1: Get Google Places API Key First

1. Go to: https://console.cloud.google.com/
2. Click "Select a project" → "New Project"
3. Name it: `angels-walking-reviews`
4. Click "Create"

5. Go to "APIs & Services" → "Library"
6. Search for "Places API"
7. Click "Enable"

7. Go to "APIs & Services" → "Credentials"
8. Click "Create Credentials" → "API Key"
9. Copy the API key

### Step 2: Use the HTML Tool

Now use `find-place-id.html` with your API key!

## Option 3: Use Google Places ID Finder (No API Key Needed)

1. Go to: https://developers.google.com/maps/documentation/places/web-service/place-id#find-id
2. In the search box, paste: **Gladys Schmanski Spiritual Recovery Life Coach**
3. Click on the business that appears
4. Copy the Place ID shown (it will be highlighted)

## Once You Have the Place ID

Add it to your `.env` file:
```
REACT_APP_GOOGLE_PLACE_ID=ChIJ...your_place_id_here
```

The Place ID will look like: `ChIJN1t_tDeuEmsRUsoyG83frY4` (about 27 characters, starts with ChIJ)

## Need Help?

- If the HTML tool doesn't work, use Option 3 (Google Places ID Finder)
- Make sure your API key has "Places API" enabled
- The business must be verified on Google Business Profile
