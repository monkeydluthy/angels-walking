# Step-by-Step: Get Place ID (No API Key Needed!)

## ✅ Method: Google Places ID Finder (100% Works, No Code)

### Step 1: Open the Tool
1. Click this link: **https://developers.google.com/maps/documentation/places/web-service/place-id#find-id**
   - Or copy/paste: `https://developers.google.com/maps/documentation/places/web-service/place-id#find-id`

### Step 2: Search for the Business
1. You'll see a search box that says "Search for a place"
2. Type exactly: **Gladys Schmanski Spiritual Recovery Life Coach**
3. Press Enter or click the search button

### Step 3: Select the Business
1. You should see search results appear
2. Look for "Gladys Schmanski Spiritual Recovery Life Coach"
3. Click on it

### Step 4: Copy the Place ID
1. The Place ID will appear in a green highlighted box
2. It will look like: `ChIJ...` (about 27 characters)
3. Click the "Copy" button or manually select and copy it

### Step 5: Add to .env File
1. Open your `.env` file
2. Add this line (replace with your actual Place ID):
   ```
   REACT_APP_GOOGLE_PLACE_ID=ChIJ...paste_your_place_id_here
   ```

---

## 🔧 If the Tool Doesn't Work

### Alternative: Check API Key Setup

The "Failed to fetch" error might mean Places API isn't enabled. Let's check:

1. Go to: **https://console.cloud.google.com/apis/library**
2. Search for "Places API"
3. Make sure it says "Enabled" (not "Enable")
4. If it's not enabled, click "Enable"

### Then Try the HTML Tool Again

1. Open `find-place-id.html` in your browser
2. Make sure you're using the correct API key
3. Try again

---

## 📞 Still Stuck?

If you're still having issues, you can:
1. Share a screenshot of what you see in the Places ID Finder tool
2. Or tell me what error message you're getting

The Google Places ID Finder tool should work without any API key - it's Google's official tool!
