# Google Reviews Integration Setup

## ⚠️ Prerequisite: Google Business Profile Setup

**IMPORTANT:** Before you can integrate Google Reviews, Gladys needs to have a Google Business Profile set up. If she doesn't have one yet, follow these steps first:

### Creating a Google Business Profile

1. **Go to [Google Business Profile](https://www.google.com/business/)**
   - Sign in with a Google account (preferably one associated with the business)

2. **Click "Manage Now" or "Get Started"**

3. **Enter Business Information:**
   - Business name: "Angels Walking" (or whatever the official name is)
   - Business category: Choose the most relevant (e.g., "Life Coach", "Spiritual Center", "Personal Coach")
   - Address: 
     - If she has a physical location: Enter the full address
     - If she's home-based/virtual only: You can use a service area instead
     - For virtual businesses: You can list "Service Area" (Orlando, FL and surrounding areas)
   - Phone number: 407-782-5048
   - Website: angelswalking.com (or the site URL)
   - Hours: Tue-Fri: 10AM-6PM, Sat: 10AM-8PM (EST)

4. **Verify the Business:**
   - Google will need to verify the business
   - Options include:
     - **Phone verification** (fastest, usually instant)
     - **Email verification**
     - **Postcard verification** (if physical address, takes 5-7 days)
   - For virtual businesses, phone or email verification is usually available

5. **Complete the Profile:**
   - Add photos (logo, Gladys's photo, etc.)
   - Add a business description
   - Set service areas if virtual
   - Add services offered

6. **Wait for Verification:**
   - Once verified, the business will appear on Google Maps
   - This usually takes a few minutes to a few days depending on verification method

### For Virtual/Home-Based Businesses

If Gladys works from home and doesn't want her address public:
- Use "Service Area" instead of a specific address
- Set service area to Orlando, FL and surrounding areas
- Google will still create a Place ID for service-area businesses
- Reviews can still be collected and displayed

---

## Step 1: Get Your Google Place ID

**Once the Google Business Profile is set up and verified:**

1. Go to [Google Places ID Finder](https://developers.google.com/maps/documentation/places/web-service/place-id#find-id)
2. Search for "Angels Walking" or Gladys's business name in Orlando, FL
3. Click on the correct business listing
4. Copy the **Place ID** (it looks like: `ChIJN1t_tDeuEmsRUsoyG83frY4`)

**Alternative Method:**
1. Go to [Google Maps](https://www.google.com/maps)
2. Search for "Angels Walking" or the business name
3. Click on the business listing
4. The Place ID can be found in the URL or by using Google's Place ID finder tool

**Note:** If you can't find the business yet, it may still be processing verification. Wait 24-48 hours after verification and try again.

## Step 2: Create Google Cloud Project & Enable Places API

**Note:** You can do this step while waiting for Google Business Profile verification.

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Sign in with your Google account
3. Click "Select a project" → "New Project"
4. Name it: `angels-walking-reviews`
5. Click "Create"

6. Once the project is created, go to "APIs & Services" → "Library"
7. Search for "Places API"
8. **Enable BOTH:**
   - **"Places API"** - Click "Enable"
   - **"Places API (New)"** - Click "Enable" (This is required for verified businesses!)
9. Both APIs should show "Enabled" status

## Step 3: Create API Key

1. Go to "APIs & Services" → "Credentials"
2. Click "Create Credentials" → "API Key"
3. Copy the API key (it will look like: `AIzaSy...`)
4. **Important:** Click on the API key to edit it
5. Under "API restrictions", select "Restrict key"
6. **Choose BOTH from the list:**
   - **"Places API"**
   - **"Places API (New)"** (Important for verified businesses!)
7. Under "Application restrictions", you can optionally restrict to your website domain
8. Click "Save"

## Step 4: Add Environment Variables

1. Open your `.env` file in the project root (create it if it doesn't exist)
2. Add these lines:
   ```
   REACT_APP_GOOGLE_PLACES_API_KEY=your_api_key_here
   REACT_APP_GOOGLE_PLACE_ID=your_place_id_here
   ```
3. Replace `your_api_key_here` with the API key from Step 3
4. Replace `your_place_id_here` with the Place ID from Step 1
5. Save the file

## Step 5: Update .env.example

Add these to `.env.example` for reference:
```
REACT_APP_GOOGLE_PLACES_API_KEY=your_api_key_here
REACT_APP_GOOGLE_PLACE_ID=your_place_id_here
```

## Step 6: For Netlify Deployment

When deploying to Netlify, add these environment variables in Netlify:

1. Go to your Netlify site dashboard
2. Go to "Site settings" → "Environment variables"
3. Add:
   - `REACT_APP_GOOGLE_PLACES_API_KEY` = your API key
   - `REACT_APP_GOOGLE_PLACE_ID` = your Place ID

## Important Notes

- **API Quotas:** The Places API has free tier limits (usually 1,000 requests/day). Reviews are cached to minimize API calls.
- **Billing:** Make sure billing is enabled in Google Cloud (free tier should cover this)
- **Security:** The API key will be visible in the frontend code. Restricting it by domain in Google Cloud Console helps protect it.
- **Caching:** Reviews are cached for 24 hours to reduce API calls and improve performance.

## Testing

After setup, restart your development server:
```bash
npm start
```

The testimonials section should now display real Google Reviews (5-star only).
