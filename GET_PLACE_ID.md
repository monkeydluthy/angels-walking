# How to Get the Place ID for Gladys's Business

## Quick Method: Use Google Places ID Finder

1. **Go to:** https://developers.google.com/maps/documentation/places/web-service/place-id#find-id

2. **In the search box, enter:**
   ```
   Gladys Schmanski Spiritual Recovery Life Coach
   ```

3. **Select the correct listing** from the results

4. **Copy the Place ID** - it will look like:
   - `ChIJ...` (most common format)
   - `EiJ...` (alternative format)
   - Usually 27 characters long

## Alternative: Use Google Maps Directly

1. Go to: https://www.google.com/maps
2. Search for: "Gladys Schmanski Spiritual Recovery Life Coach"
3. Click on the business listing
4. Look at the URL - sometimes the Place ID is visible
5. Or right-click on the business name → "What's here?" → Check the URL

## Once You Have the Place ID

Add it to your `.env` file:
```
REACT_APP_GOOGLE_PLACE_ID=ChIJ...your_place_id_here
```

## Note

The identifier `0x4ebcf23697b85cef:0x3d6a3d8f849fd1d8` in your embed URL is **not** the Place ID. It's an internal Google Maps identifier. You need to use the Place ID Finder tool to get the correct Place ID format that the Places API requires.
