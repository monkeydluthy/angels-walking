/**
 * Verify Google Reviews Setup
 * Tests API key and Place ID from .env file
 * 
 * Usage: node verify-google-setup.js
 */

const fs = require('fs');
const path = require('path');

// Read .env file manually
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

// Use built-in fetch (Node 18+)
let fetch;
try {
  if (typeof globalThis.fetch === 'function') {
    fetch = globalThis.fetch;
  } else {
    fetch = require('node-fetch');
  }
} catch (e) {
  console.error('Error: fetch is not available. Please use Node.js 18+ or install node-fetch: npm install node-fetch');
  process.exit(1);
}

async function verifySetup() {
  console.log("🔍 Verifying Google Reviews Setup...\n");
  console.log("=".repeat(60));
  
  // Read .env file
  const env = readEnvFile();
  const apiKey = env.REACT_APP_GOOGLE_PLACES_API_KEY;
  const placeId = env.REACT_APP_GOOGLE_PLACE_ID;
  
  // Check if variables are set
  if (!apiKey) {
    console.error("❌ ERROR: REACT_APP_GOOGLE_PLACES_API_KEY not found in .env file");
    console.error("   Make sure it's set as: REACT_APP_GOOGLE_PLACES_API_KEY=your_key_here");
    process.exit(1);
  }
  
  if (!placeId) {
    console.error("❌ ERROR: REACT_APP_GOOGLE_PLACE_ID not found in .env file");
    console.error("   Make sure it's set as: REACT_APP_GOOGLE_PLACE_ID=your_place_id_here");
    process.exit(1);
  }
  
  console.log("✅ Found environment variables:");
  console.log(`   API Key: ${apiKey.substring(0, 15)}...${apiKey.substring(apiKey.length - 5)}`);
  console.log(`   Place ID: ${placeId}\n`);
  
  // Test API Key and Place ID
  console.log("Testing API connection...\n");
  
  try {
    const testUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,rating,user_ratings_total,reviews&key=${apiKey}`;
    const response = await fetch(testUrl);
    const data = await response.json();
    
    if (data.status === 'OK') {
      console.log("=".repeat(60));
      console.log("✅ SUCCESS! API Key and Place ID are correct!");
      console.log("=".repeat(60));
      console.log(`\n📍 Business: ${data.result.name}`);
      console.log(`⭐ Rating: ${data.result.rating || 'N/A'} (${data.result.user_ratings_total || 0} total reviews)`);
      
      if (data.result.reviews && data.result.reviews.length > 0) {
        const fiveStarReviews = data.result.reviews.filter(r => r.rating === 5);
        console.log(`\n📝 Reviews Found:`);
        console.log(`   Total Reviews: ${data.result.reviews.length}`);
        console.log(`   5-Star Reviews: ${fiveStarReviews.length}`);
        
        if (fiveStarReviews.length > 0) {
          console.log(`\n   Sample 5-Star Review:`);
          console.log(`   Author: ${fiveStarReviews[0].author_name}`);
          console.log(`   Rating: ${fiveStarReviews[0].rating} ⭐`);
          console.log(`   Text: "${fiveStarReviews[0].text.substring(0, 80)}..."`);
        }
      } else {
        console.log("\n⚠️  No reviews found in API response");
        console.log("   This might mean:");
        console.log("   - The business is new and doesn't have reviews yet");
        console.log("   - Reviews haven't been indexed yet");
      }
      
      console.log("\n" + "=".repeat(60));
      console.log("✅ Your .env file is configured correctly!");
      console.log("=".repeat(60));
      console.log("\n📝 Current .env configuration:");
      console.log(`   REACT_APP_GOOGLE_PLACES_API_KEY=${apiKey}`);
      console.log(`   REACT_APP_GOOGLE_PLACE_ID=${placeId}`);
      console.log("\n🚀 Next steps:");
      console.log("   1. Restart your dev server: npm start");
      console.log("   2. Check the testimonials section on your site");
      console.log("   3. You should see real Google Reviews (5-star only)");
      
    } else if (data.status === 'REQUEST_DENIED') {
      console.error("=".repeat(60));
      console.error("❌ API Key Error: Request Denied");
      console.error("=".repeat(60));
      console.error(`\nError: ${data.error_message || 'Unknown error'}`);
      console.error("\n💡 Possible issues:");
      console.error("   1. Places API is not enabled in Google Cloud Console");
      console.error("   2. API key restrictions are blocking the request");
      console.error("   3. API key is invalid or expired");
      console.error("\n🔧 How to fix:");
      console.error("   1. Go to: https://console.cloud.google.com/apis/library");
      console.error("   2. Search for 'Places API' and make sure it's enabled");
      console.error("   3. Check API key restrictions in Credentials");
      process.exit(1);
      
    } else if (data.status === 'INVALID_REQUEST') {
      console.error("=".repeat(60));
      console.error("❌ Place ID Error: Invalid Request");
      console.error("=".repeat(60));
      console.error(`\nError: ${data.error_message || 'Invalid Place ID'}`);
      console.error(`\nPlace ID tested: ${placeId}`);
      console.error("\n💡 The Place ID might be incorrect or the business might not be indexed yet");
      process.exit(1);
      
    } else {
      console.error("=".repeat(60));
      console.error(`❌ Error: ${data.status}`);
      console.error("=".repeat(60));
      if (data.error_message) {
        console.error(`\nMessage: ${data.error_message}`);
      }
      process.exit(1);
    }
    
  } catch (error) {
    console.error("=".repeat(60));
    console.error("❌ Network Error");
    console.error("=".repeat(60));
    console.error(`\nError: ${error.message}`);
    console.error("\n💡 Check your internet connection and try again");
    process.exit(1);
  }
}

// Run verification
verifySetup().catch(error => {
  console.error("\nFatal error:", error);
  process.exit(1);
});
