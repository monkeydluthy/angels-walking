# Run Node.js Script to Get Place ID

## Step 1: Check Node.js Version

The script works with Node.js 18+ (which has built-in fetch).

Check your version:
```bash
node --version
```

If you have Node.js 18 or higher, you're good to go!

If you have an older version, install node-fetch:
```bash
npm install node-fetch
```

## Step 2: Run the Script

```bash
node get-place-id.js
```

## What It Does

The script will:
1. Try **Find Place API** (most reliable)
2. Try **Text Search API** with multiple search variations
3. Try **Reverse Geocoding** (if Geocoding API is enabled)

It will output the Place ID in the correct format (starts with `ChIJ` or `EiJ`).

## Expected Output

If successful, you'll see:

```
✅ SUCCESS!

Business Name: Gladys Schmanski Spiritual Recovery Life Coach
Address: [address]

📍 Place ID: ChIJ...your_place_id_here

📝 Add this to your .env file:
REACT_APP_GOOGLE_PLACE_ID=ChIJ...your_place_id_here
```

## If It Fails

The script will try all methods and give you suggestions if none work.

## Once You Have the Place ID

Add it to your `.env` file:

```
REACT_APP_GOOGLE_PLACES_API_KEY=AIzaSyAw_feFD6KfBjeTVdwG7BSU5xSlZdK6pb0
REACT_APP_GOOGLE_PLACE_ID=ChIJ...your_place_id_here
```

**Remember:** Change `GOOGLE API` to `REACT_APP_GOOGLE_PLACES_API_KEY` in your `.env` file!
