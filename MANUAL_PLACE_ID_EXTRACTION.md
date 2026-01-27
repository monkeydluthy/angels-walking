# Manual Place ID Extraction (If API Doesn't Work)

Since the Places API isn't finding Gladys's business (it's finding other businesses instead), here's how to get the Place ID manually:

## Method 1: From Google Maps Page Source

1. **Go to the business on Google Maps:**
   - https://www.google.com/maps/place/Gladys+Schmanski+Spiritual+Recovery+Life+Coach
   - Or use the share link: https://maps.app.goo.gl/rbbnGDod4PDz8Aer6

2. **Open Browser Dev Tools:**
   - Press `F12` or right-click → "Inspect"
   - Go to the "Console" tab

3. **Run this JavaScript in the console:**
   ```javascript
   // Try to find Place ID in the page data
   const scripts = document.getElementsByTagName('script');
   for (let script of scripts) {
     const content = script.textContent || script.innerHTML;
     const match = content.match(/place_id["\s:]+(ChIJ[^"'\s]+)/i);
     if (match) {
       console.log("Place ID found:", match[1]);
       break;
     }
   }
   ```

4. **Or search the page source:**
   - Press `Ctrl+F` (or `Cmd+F` on Mac)
   - Search for: `ChIJ` or `place_id`
   - Look for a string that starts with `ChIJ` (about 27 characters)

## Method 2: Use Google Business Profile

1. **Go to Google Business Profile:**
   - https://business.google.com/
   - Sign in and select the business

2. **Check the URL:**
   - The Place ID might be in the URL or in the page data

## Method 3: Contact Google Support

If the business is verified but not showing up in Places API searches, contact Google Business Profile support - this might be an indexing issue.

## Method 4: Wait and Retry

If the business profile was recently created or updated:
- Wait 24-48 hours for Google to fully index it
- Then try the Node.js script again

---

**The Place ID format should be:** `ChIJ...` (starts with ChIJ, about 27 characters)
