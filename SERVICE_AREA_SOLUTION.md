# Solution for Service Area Business

## The Problem

Gladys's business uses a **service area** (California and Orlando) instead of a specific address. This causes:
- The map pin to appear in the wrong location (Pacific Ocean)
- API searches to fail because there's no specific address
- Difficulty finding the Place ID

## ✅ Solution Options

### Option 1: Extract Place ID from Existing URL (Easiest!)

You already have the Google Maps URL. We can extract the Place ID from it:

1. **Open `extract-from-url.html`** in your browser
2. **Paste this URL:**
   ```
   https://www.google.com/maps/place/Gladys+Schmanski+Spiritual+Recovery+Life+Coach/@46.423669,-129.9427085,3z/data=!4m6!3m5!1s0x4ebcf23697b85cef:0x3d6a3d8f849fd1d8!8m2!3d46.423669!4d-129.9427086!16s%2Fg%2F11q9rpqprz?hl=en&entry=ttu
   ```
3. **Click "Extract Place ID"** or **"Or Use API with Coordinates"**
4. **Copy the Place ID**

### Option 2: Have Gladys Add a Specific Address (Recommended Long-term)

**Benefits:**
- More accurate location on Google Maps
- Better for local SEO
- Easier for clients to find
- More reliable Place ID

**Options for address:**
- **Home address** (if she works from home) - can be hidden from public view
- **Virtual office address** (if available)
- **P.O. Box** (for mail, but won't help with location)
- **Primary service location** (if she has a preferred location)

**How to add:**
1. Go to Google Business Profile
2. Click "Edit profile" → "Location"
3. Add a specific address
4. Choose "Hide address" if it's a home address (only show service area)
5. Save and wait 24-48 hours for updates

### Option 3: Use Coordinates to Find Place ID

The URL has coordinates: `@46.423669,-129.9427085`

We can use reverse geocoding to find the Place ID, but this might not work well for service area businesses.

## 🎯 Recommended Approach

**Short-term:** Use Option 1 (extract from URL) to get the Place ID now

**Long-term:** Have Gladys add a specific address (Option 2) for better accuracy

## 📝 Once You Have the Place ID

Add it to your `.env` file:

```
REACT_APP_GOOGLE_PLACES_API_KEY=AIzaSyAw_feFD6KfBjeTVdwG7BSU5xSlZdK6pb0
REACT_APP_GOOGLE_PLACE_ID=ChIJ...your_place_id_here
```

**Note:** Make sure the variable name is `REACT_APP_GOOGLE_PLACES_API_KEY` (not `GOOGLE API`)

---

**Try the `extract-from-url.html` tool first - it should work with the URL you already have!**
