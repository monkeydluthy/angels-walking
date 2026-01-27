# Finding the Place ID from the Share Link

You have the share link: `https://maps.app.goo.gl/rbbnGDod4PDz8Aer6`

## Method 1: Follow the Link and Extract Place ID

1. **Open the share link** in your browser: https://maps.app.goo.gl/rbbnGDod4PDz8Aer6
2. It will redirect to the full Google Maps URL
3. Look at the URL - the Place ID might be visible in the address bar
4. Copy the Place ID (starts with `ChIJ...` or `EiJ...`)

## Method 2: Use Google Places ID Finder (Recommended)

1. Go to: **https://developers.google.com/maps/documentation/places/web-service/place-id#find-id**
2. In the search box, enter: **"Gladys Schmanski Spiritual Recovery Life Coach"**
3. Select the correct business listing
4. Copy the **Place ID** shown (it will be highlighted)

## Method 3: Use Places API Text Search (If you have API key)

If you've already set up your Google Places API key, you can use this:

1. Open your browser's developer console (F12)
2. Run this JavaScript code:

```javascript
const businessName = "Gladys Schmanski Spiritual Recovery Life Coach";
const apiKey = "YOUR_API_KEY_HERE"; // Replace with your actual API key

fetch(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(businessName)}&key=${apiKey}`)
  .then(response => response.json())
  .then(data => {
    if (data.results && data.results.length > 0) {
      console.log("Place ID:", data.results[0].place_id);
      console.log("Business Name:", data.results[0].name);
    } else {
      console.log("No results found");
    }
  });
```

## What the Place ID Looks Like

- Format: Usually starts with `ChIJ` or `EiJ`
- Length: Typically 27 characters
- Example: `ChIJN1t_tDeuEmsRUsoyG83frY4`

## Once You Have It

Add it to your `.env` file:
```
REACT_APP_GOOGLE_PLACE_ID=ChIJ...your_place_id_here
```

Then restart your development server.
