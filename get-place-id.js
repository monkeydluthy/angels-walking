/**
 * Get Google Place ID using Node.js (bypasses CORS)
 * 
 * Usage:
 *   node get-place-id.js
 * 
 * Note: Works with Node.js 18+ (has built-in fetch)
 *       For older Node versions, install: npm install node-fetch
 */

// Use built-in fetch (Node 18+) or require node-fetch for older versions
let fetch;
try {
  // Try built-in fetch first (Node 18+)
  if (typeof globalThis.fetch === 'function') {
    fetch = globalThis.fetch;
  } else {
    fetch = require('node-fetch');
  }
} catch (e) {
  console.error('Error: fetch is not available. Please use Node.js 18+ or install node-fetch: npm install node-fetch');
  process.exit(1);
}

const apiKey = "AIzaSyAw_feFD6KfBjeTVdwG7BSU5xSlZdK6pb0";
const businessName = "Gladys Schmanski Spiritual Recovery Life Coach";

async function getPlaceId() {
  console.log("🔍 Searching for Place ID...\n");
  console.log(`Business: ${businessName}`);
  console.log(`API Key: ${apiKey.substring(0, 10)}...\n`);

  // Method 1: Try Find Place API (most reliable)
  console.log("Method 1: Using Find Place API...");
  try {
    const findPlaceUrl = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${encodeURIComponent(businessName)}&inputtype=textquery&fields=place_id,name,formatted_address&key=${apiKey}`;
    
    const response = await fetch(findPlaceUrl);
    const data = await response.json();

    if (data.status === 'OK' && data.candidates && data.candidates.length > 0) {
      // Filter for the exact business
      const business = data.candidates.find(c => {
        const name = c.name.toLowerCase();
        return (name.includes('gladys') && name.includes('schmanski')) ||
               (name.includes('gladys') && name.includes('spiritual recovery')) ||
               (name.includes('angels walking'));
      }) || data.candidates[0];
      
      // Verify it's the right business
      const name = business.name.toLowerCase();
      if (!name.includes('gladys') && !name.includes('schmanski') && !name.includes('angels walking')) {
        console.log(`⚠️  Warning: Found "${business.name}" which doesn't match "Gladys Schmanski"`);
        console.log(`   This might not be the correct business. Continuing search...\n`);
      } else {
        console.log("✅ SUCCESS!\n");
        console.log("Business Name:", business.name);
        console.log("Address:", business.formatted_address || 'N/A');
        console.log("\n📍 Place ID:", business.place_id);
        console.log("\n📝 Add this to your .env file:");
        console.log(`REACT_APP_GOOGLE_PLACE_ID=${business.place_id}`);
        return business.place_id;
      }
    } else {
      console.log(`❌ Find Place API returned: ${data.status}`);
      if (data.error_message) {
        console.log(`Error: ${data.error_message}\n`);
      }
    }
  } catch (error) {
    console.log(`❌ Error: ${error.message}\n`);
  }

  // Method 2: Try Text Search API
  console.log("Method 2: Using Text Search API...");
  try {
    const searchTerms = [
      businessName,
      "Gladys Schmanski Spiritual Recovery Life Coach Orlando",
      "Gladys Schmanski Spiritual Recovery Life Coach California",
      "Gladys Schmanski Life Coach"
    ];

    for (const searchTerm of searchTerms) {
      const textSearchUrl = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(searchTerm)}&key=${apiKey}`;
      
      const response = await fetch(textSearchUrl);
      const data = await response.json();

      if (data.status === 'OK' && data.results && data.results.length > 0) {
        // Filter for the exact business - must include both "gladys" and "schmanski"
        const business = data.results.find(r => {
          const name = r.name.toLowerCase();
          return (name.includes('gladys') && name.includes('schmanski')) ||
                 (name.includes('gladys') && name.includes('spiritual recovery')) ||
                 (name.includes('angels walking'));
        });
        
        if (!business) {
          console.log(`   Found ${data.results.length} results, but none match "Gladys Schmanski"`);
          console.log(`   First result: ${data.results[0].name}`);
          continue; // Try next search term
        }

        console.log("✅ SUCCESS!\n");
        console.log("Business Name:", business.name);
        console.log("Address:", business.formatted_address || 'N/A');
        console.log("\n📍 Place ID:", business.place_id);
        console.log("\n📝 Add this to your .env file:");
        console.log(`REACT_APP_GOOGLE_PLACE_ID=${business.place_id}`);
        return business.place_id;
      } else {
        console.log(`   Search "${searchTerm}": ${data.status}`);
      }
    }
  } catch (error) {
    console.log(`❌ Error: ${error.message}\n`);
  }

  // Method 3: Try with coordinates (if Geocoding API is enabled)
  console.log("\nMethod 3: Using Reverse Geocoding (requires Geocoding API)...");
  try {
    const lat = 46.423669;
    const lng = -129.9427085;
    const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`;
    
    const response = await fetch(geocodeUrl);
    const data = await response.json();

    if (data.status === 'OK' && data.results && data.results.length > 0) {
      const result = data.results.find(r => 
        r.types.includes('establishment') ||
        r.types.includes('point_of_interest')
      ) || data.results[0];

      if (result.place_id) {
        // Get details to verify
        const detailsUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${result.place_id}&fields=name,formatted_address&key=${apiKey}`;
        const detailsResponse = await fetch(detailsUrl);
        const detailsData = await detailsResponse.json();

        if (detailsData.status === 'OK' && detailsData.result) {
          console.log("✅ SUCCESS!\n");
          console.log("Business Name:", detailsData.result.name);
          console.log("Address:", detailsData.result.formatted_address || 'N/A');
          console.log("\n📍 Place ID:", result.place_id);
          console.log("\n📝 Add this to your .env file:");
          console.log(`REACT_APP_GOOGLE_PLACE_ID=${result.place_id}`);
          return result.place_id;
        }
      }
    } else {
      console.log(`❌ Geocoding returned: ${data.status}`);
      if (data.error_message) {
        console.log(`Error: ${data.error_message}`);
        console.log("\n💡 Tip: Enable Geocoding API in Google Cloud Console");
      }
    }
  } catch (error) {
    console.log(`❌ Error: ${error.message}`);
    console.log("\n💡 Tip: Enable Geocoding API in Google Cloud Console");
  }

  console.log("\n❌ Could not find Place ID for 'Gladys Schmanski Spiritual Recovery Life Coach'");
  console.log("\n💡 The business might not be searchable via Places API yet.");
  console.log("\n📋 Alternative Solutions:");
  console.log("   1. The business might not be fully indexed in Google Places yet");
  console.log("   2. Service area businesses (without specific address) are harder to find");
  console.log("   3. Try adding a specific address to the Google Business Profile");
  console.log("   4. Wait 24-48 hours if the business profile was recently created");
  console.log("   5. Use the Google Maps URL directly - the Place ID might be extractable from the page");
  console.log("\n🔗 Try this:");
  console.log("   - Go to: https://www.google.com/maps/place/Gladys+Schmanski+Spiritual+Recovery+Life+Coach");
  console.log("   - Right-click on the business name → Inspect Element");
  console.log("   - Look for 'place_id' or 'ChIJ' in the page source");
  console.log("   - Or use browser dev tools to search for 'place_id'");
  
  return null;
}

// Run the script
getPlaceId().catch(error => {
  console.error("Fatal error:", error);
  process.exit(1);
});
