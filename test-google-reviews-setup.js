/**
 * Test Google Reviews Setup
 * Verifies API key and Place ID are correct
 * 
 * Usage: node test-google-reviews-setup.js
 */

// Load environment variables
require('dotenv').config();

const apiKey = process.env.REACT_APP_GOOGLE_PLACES_API_KEY;
const placeId = process.env.REACT_APP_GOOGLE_PLACE_ID;

// Use built-in fetch (Node 18+) or require node-fetch
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

async function testSetup() {
  console.log("🔍 Testing Google Reviews Setup...\n");
  console.log("=".repeat(60));
  
  // Check if variables are set
  if (!apiKey) {
    console.error("❌ ERROR: REACT_APP_GOOGLE_PLACES_API_KEY is not set in .env file");
    process.exit(1);
  }
  
  if (!placeId) {
    console.error("❌ ERROR: REACT_APP_GOOGLE_PLACE_ID is not set in .env file");
    process.exit(1);
  }
  
  console.log("✅ Environment variables found:");
  console.log(`   API Key: ${apiKey.substring(0, 15)}...${apiKey.substring(apiKey.length - 5)}`);
  console.log(`   Place ID: ${placeId}\n`);
  
  // Test 1: Verify API Key works
  console.log("Test 1: Verifying API Key...");
  try {
    const testUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,rating,reviews&key=${apiKey}`;
    const response = await fetch(testUrl);
    const data = await response.json();
    
    if (data.status === 'OK') {
      console.log("   ✅ API Key is valid and working!");
      console.log(`   ✅ Place ID is correct!`);
      console.log(`   ✅ Business Name: ${data.result.name}`);
      console.log(`   ✅ Rating: ${data.result.rating || 'N/A'} (${data.result.user_ratings_total || 0} reviews)`);
      
      if (data.result.reviews && data.result.reviews.length > 0) {
        const fiveStarReviews = data.result.reviews.filter(r => r.rating === 5);
        console.log(`   ✅ Total Reviews: ${data.result.reviews.length}`);
        console.log(`   ✅ 5-Star Reviews: ${fiveStarReviews.length}`);
        
        if (fiveStarReviews.length > 0) {
          console.log("\n   📝 Sample 5-Star Review:");
          console.log(`      Author: ${fiveStarReviews[0].author_name}`);
          console.log(`      Rating: ${fiveStarReviews[0].rating} stars`);
          console.log(`      Text: ${fiveStarReviews[0].text.substring(0, 100)}...`);
        }
      } else {
        console.log("   ⚠️  No reviews found (this is okay if the business is new)");
      }
      
      console.log("\n" + "=".repeat(60));
      console.log("✅ SUCCESS! Your Google Reviews setup is correct!");
      console.log("=".repeat(60));
      console.log("\n📝 Your .env file is configured correctly:");
      console.log(`   REACT_APP_GOOGLE_PLACES_API_KEY=${apiKey}`);
      console.log(`   REACT_APP_GOOGLE_PLACE_ID=${placeId}`);
      console.log("\n🚀 You can now restart your dev server and the reviews should appear!");
      
    } else if (data.status === 'REQUEST_DENIED') {
      console.error("   ❌ API Key Error:", data.error_message || 'Request denied');
      console.error("   💡 Check:");
      console.error("      - Places API is enabled in Google Cloud Console");
      console.error("      - API key restrictions allow this usage");
      process.exit(1);
    } else if (data.status === 'INVALID_REQUEST') {
      console.error("   ❌ Invalid Place ID:", data.error_message || 'Invalid request');
      console.error(`   💡 The Place ID "${placeId}" might be incorrect`);
      process.exit(1);
    } else {
      console.error(`   ❌ Error: ${data.status}`);
      if (data.error_message) {
        console.error(`   Message: ${data.error_message}`);
      }
      process.exit(1);
    }
    
  } catch (error) {
    console.error("   ❌ Network Error:", error.message);
    console.error("   💡 Check your internet connection");
    process.exit(1);
  }
}

// Run the test
testSetup().catch(error => {
  console.error("Fatal error:", error);
  process.exit(1);
});
