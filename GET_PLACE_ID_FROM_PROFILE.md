# Get Place ID from Google Business Profile

Since your business is verified, we can get the Place ID directly from Google Business Profile or Google Maps.

## Method 1: From Google Business Profile (Easiest!)

1. **Click "See your profile"** button in your Google Business Profile Manager
2. This will open the public Google Maps page
3. **Look at the URL** - the Place ID might be in it
4. **Or use Method 2 below** to extract it from the page

## Method 2: Extract from Google Maps Page

1. **Go to the public Google Maps page** for your business:
   - Click "See your profile" from Business Profile Manager
   - Or go to: https://www.google.com/maps/place/Gladys+Schmanski+Spiritual+Recovery+Life+Coach

2. **Open Browser Dev Tools:**
   - Press `F12` (or right-click → "Inspect")
   - Go to the **Console** tab

3. **Paste and run this code:**
   ```javascript
   // Method 1: Search page scripts
   const scripts = document.getElementsByTagName('script');
   for (let script of scripts) {
     const content = script.textContent || script.innerHTML;
     const match = content.match(/place_id["\s:]+(ChIJ[^"'\s,}]+)/i);
     if (match) {
       console.log("✅ Place ID found:", match[1]);
       break;
     }
   }
   
   // Method 2: Check window data
   if (window.google && window.google.maps) {
     console.log("Google Maps loaded");
   }
   
   // Method 3: Search all text content
   const bodyText = document.body.innerText;
   const placeIdMatch = bodyText.match(/ChIJ[\w-]{27}/);
   if (placeIdMatch) {
     console.log("✅ Place ID in page text:", placeIdMatch[0]);
   }
   ```

4. **Copy the Place ID** that appears in the console

## Method 3: From the Share Link

1. **Click "Share"** on the Google Maps page
2. **Copy the share link**
3. The Place ID might be in the URL, or use the extraction code above

## Method 4: Check Page Source

1. **Right-click on the page** → "View Page Source" (or `Ctrl+U` / `Cmd+U`)
2. **Press `Ctrl+F`** (or `Cmd+F`) to search
3. **Search for:** `ChIJ` or `place_id`
4. **Look for a string** that starts with `ChIJ` (about 27 characters)

## Expected Format

The Place ID should look like:
- `ChIJN1t_tDeuEmsRUsoyG83frY4` (starts with ChIJ, ~27 characters)
- NOT `0x4ebcf23697b85cef:0x3d6a3d8f849fd1d8` (that's an internal ID)

## Once You Have It

Add to your `.env` file:
```
REACT_APP_GOOGLE_PLACES_API_KEY=AIzaSyAw_feFD6KfBjeTVdwG7BSU5xSlZdK6pb0
REACT_APP_GOOGLE_PLACE_ID=ChIJ...your_place_id_here
```

---

**Try Method 2 first - it's the most reliable for verified businesses!**
