# Quick Start: Get Place ID (You Already Have API Key!)

## ✅ Good News: You Already Have Your API Key!

I can see you have: `AIzaSyAw_feFD6KfBjeTVdwG7BSU5xSlZdK6pb0`

## Method 1: Use the HTML Tool (Easiest - 2 Minutes)

1. **Open `find-place-id.html`** in your web browser (double-click it)
2. **Paste your API key:** `AIzaSyAw_feFD6KfBjeTVdwG7BSU5xSlZdK6pb0`
3. **Business name is already filled in** (Gladys Schmanski Spiritual Recovery Life Coach)
4. **Click "Find Place ID"**
5. **Copy the Place ID** that appears
6. **Add it to your `.env` file**

## Method 2: Use Browser Console (If HTML tool doesn't work)

1. Open your browser (Chrome/Firefox)
2. Press **F12** to open Developer Tools
3. Go to the **Console** tab
4. Copy and paste this code (replace with your API key):

```javascript
const apiKey = "AIzaSyAw_feFD6KfBjeTVdwG7BSU5xSlZdK6pb0";
const businessName = "Gladys Schmanski Spiritual Recovery Life Coach";

fetch(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(businessName)}&key=${apiKey}`)
  .then(response => response.json())
  .then(data => {
    if (data.results && data.results.length > 0) {
      const business = data.results.find(r => 
        r.name.toLowerCase().includes('gladys') || 
        r.name.toLowerCase().includes('schmanski')
      ) || data.results[0];
      
      console.log("✅ Place ID Found!");
      console.log("Business:", business.name);
      console.log("Place ID:", business.place_id);
      console.log("\nAdd this to your .env file:");
      console.log("REACT_APP_GOOGLE_PLACE_ID=" + business.place_id);
    } else {
      console.log("❌ No results found. Error:", data.status);
    }
  })
  .catch(error => console.error("Error:", error));
```

5. Press **Enter**
6. Copy the Place ID from the console output

## Method 3: Google Places ID Finder (No API Key Needed)

1. Go to: https://developers.google.com/maps/documentation/places/web-service/place-id#find-id
2. Search for: **Gladys Schmanski Spiritual Recovery Life Coach**
3. Click the business
4. Copy the Place ID

## Once You Have the Place ID

Add it to your `.env` file on a new line:

```
REACT_APP_GOOGLE_PLACE_ID=ChIJ...your_place_id_here
```

Then restart your dev server: `npm start`

---

**Try Method 1 first - it's the easiest!** Just open `find-place-id.html` in your browser.
