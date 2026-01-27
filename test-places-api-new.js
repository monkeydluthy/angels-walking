/**
 * Test with Places API (New)
 * Some businesses require the newer Places API
 */

const fs = require('fs');
const path = require('path');

// Read .env file
function readEnvFile() {
  const envPath = path.join(__dirname, '.env');
  const envContent = fs.readFileSync(envPath, 'utf8');
  const env = {};
  
  envContent.split('\n').forEach(line => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#')) {
      const [key, ...valueParts] = trimmed.split('=');
      if (key && valueParts.length > 0) {
        env[key.trim()] = valueParts.join('=').trim();
      }
    }
  });
  
  return env;
}

// Use built-in fetch
let fetch;
try {
  if (typeof globalThis.fetch === 'function') {
    fetch = globalThis.fetch;
  } else {
    fetch = require('node-fetch');
  }
} catch (e) {
  console.error('Error: fetch is not available. Please use Node.js 18+');
  process.exit(1);
}

async function testPlacesApiNew() {
  console.log("🔍 Testing Places API (New)...\n");
  console.log("=".repeat(60));
  
  const env = readEnvFile();
  const apiKey = env.REACT_APP_GOOGLE_PLACES_API_KEY;
  const placeId = env.REACT_APP_GOOGLE_PLACE_ID;
  
  if (!apiKey || !placeId) {
    console.error("❌ API Key or Place ID not found in .env file");
    process.exit(1);
  }
  
  console.log(`API Key: ${apiKey.substring(0, 15)}...`);
  console.log(`Place ID: ${placeId}\n`);
  
  // Test with regular Places API
  console.log("Test 1: Regular Places API...");
  try {
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,rating,reviews&key=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();
    
    console.log(`   Status: ${data.status}`);
    if (data.status === 'OK') {
      console.log("   ✅ Works with regular Places API!");
      console.log(`   Business: ${data.result.name}`);
      return true;
    } else if (data.status === 'NOT_FOUND') {
      console.log("   ❌ NOT_FOUND - Business not accessible via regular Places API");
    } else {
      console.log(`   ❌ Error: ${data.error_message || data.status}`);
    }
  } catch (error) {
    console.log(`   ❌ Network error: ${error.message}`);
  }
  
  // Test with Places API (New) - different endpoint
  console.log("\nTest 2: Places API (New) endpoint...");
  try {
    // Places API (New) uses a different endpoint format
    const url = `https://places.googleapis.com/v1/places/${placeId}?fields=id,displayName,rating,userRatingCount,reviews&key=${apiKey}`;
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': apiKey,
        'X-Goog-FieldMask': 'id,displayName,rating,userRatingCount,reviews'
      }
    });
    
    if (response.ok) {
      const data = await response.json();
      console.log("   ✅ Works with Places API (New)!");
      console.log(`   Business: ${data.displayName?.text || 'N/A'}`);
      console.log(`   Rating: ${data.rating || 'N/A'}`);
      console.log(`   Total Reviews: ${data.userRatingCount || 0}`);
      
      if (data.reviews && data.reviews.length > 0) {
        const fiveStar = data.reviews.filter(r => r.rating === 5);
        console.log(`   5-Star Reviews: ${fiveStar.length}`);
      }
      
      return true;
    } else {
      const errorText = await response.text();
      console.log(`   ❌ Error: ${response.status} ${response.statusText}`);
      console.log(`   Response: ${errorText.substring(0, 200)}...`);
      
      if (response.status === 403) {
        console.log("\n   💡 This means Places API (New) is not enabled!");
        console.log("   Go to: https://console.cloud.google.com/apis/library");
        console.log("   Search for 'Places API (New)' and enable it");
      }
    }
  } catch (error) {
    console.log(`   ❌ Network error: ${error.message}`);
  }
  
  console.log("\n" + "=".repeat(60));
  console.log("💡 Recommendations:");
  console.log("=".repeat(60));
  console.log("\n1. Enable 'Places API (New)' in Google Cloud Console");
  console.log("   https://console.cloud.google.com/apis/library");
  console.log("\n2. Update API key restrictions to include both:");
  console.log("   - Places API");
  console.log("   - Places API (New)");
  console.log("\n3. Wait 5-10 minutes for changes to propagate");
  console.log("\n4. Run this test again: node test-places-api-new.js");
  
  return false;
}

testPlacesApiNew().catch(error => {
  console.error("Fatal error:", error);
  process.exit(1);
});
