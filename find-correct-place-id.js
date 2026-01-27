/**
 * Find the correct Place ID using business name
 * Since the extracted Place ID isn't working, let's find it via API
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

async function findCorrectPlaceId() {
  console.log("🔍 Finding correct Place ID...\n");
  
  const env = readEnvFile();
  const apiKey = env.REACT_APP_GOOGLE_PLACES_API_KEY;
  const businessName = "Gladys Schmanski Spiritual Recovery Life Coach";
  
  if (!apiKey) {
    console.error("❌ API Key not found in .env file");
    process.exit(1);
  }
  
  console.log(`Searching for: "${businessName}"\n`);
  
  // Try Find Place API
  try {
    const url = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${encodeURIComponent(businessName)}&inputtype=textquery&fields=place_id,name,formatted_address&key=${apiKey}`;
    
    const response = await fetch(url);
    const data = await response.json();
    
    if (data.status === 'OK' && data.candidates && data.candidates.length > 0) {
      const business = data.candidates.find(c => 
        c.name.toLowerCase().includes('gladys') || 
        c.name.toLowerCase().includes('schmanski')
      ) || data.candidates[0];
      
      console.log("=".repeat(60));
      console.log("✅ Found Business!");
      console.log("=".repeat(60));
      console.log(`Name: ${business.name}`);
      console.log(`Address: ${business.formatted_address || 'N/A'}`);
      console.log(`\n📍 Place ID: ${business.place_id}`);
      console.log("\n📝 Update your .env file with:");
      console.log(`REACT_APP_GOOGLE_PLACE_ID=${business.place_id}`);
      
      // Now test if this Place ID works
      console.log("\n" + "=".repeat(60));
      console.log("Testing Place ID...");
      console.log("=".repeat(60));
      
      const testUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${business.place_id}&fields=name,rating,reviews&key=${apiKey}`;
      const testResponse = await fetch(testUrl);
      const testData = await testResponse.json();
      
      if (testData.status === 'OK') {
        console.log("✅ Place ID works!");
        console.log(`Rating: ${testData.result.rating || 'N/A'}`);
        console.log(`Total Reviews: ${testData.result.user_ratings_total || 0}`);
        
        if (testData.result.reviews) {
          const fiveStar = testData.result.reviews.filter(r => r.rating === 5);
          console.log(`5-Star Reviews: ${fiveStar.length}`);
        }
      } else {
        console.log(`⚠️  Place ID test returned: ${testData.status}`);
        if (testData.error_message) {
          console.log(`Error: ${testData.error_message}`);
        }
      }
      
      return business.place_id;
    } else {
      console.log(`❌ Find Place API returned: ${data.status}`);
      if (data.error_message) {
        console.log(`Error: ${data.error_message}`);
      }
      
      // Try Text Search as fallback
      console.log("\nTrying Text Search API...");
      const textUrl = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(businessName)}&key=${apiKey}`;
      const textResponse = await fetch(textUrl);
      const textData = await textResponse.json();
      
      if (textData.status === 'OK' && textData.results && textData.results.length > 0) {
        const business = textData.results.find(r => 
          r.name.toLowerCase().includes('gladys') || 
          r.name.toLowerCase().includes('schmanski')
        ) || textData.results[0];
        
        console.log("=".repeat(60));
        console.log("✅ Found via Text Search!");
        console.log("=".repeat(60));
        console.log(`Name: ${business.name}`);
        console.log(`Address: ${business.formatted_address || 'N/A'}`);
        console.log(`\n📍 Place ID: ${business.place_id}`);
        console.log("\n📝 Update your .env file with:");
        console.log(`REACT_APP_GOOGLE_PLACE_ID=${business.place_id}`);
        
        return business.place_id;
      } else {
        console.log(`❌ Text Search returned: ${textData.status}`);
      }
    }
  } catch (error) {
    console.error("❌ Error:", error.message);
  }
  
  console.log("\n" + "=".repeat(60));
  console.log("⚠️  Could not find Place ID via API");
  console.log("=".repeat(60));
  console.log("\n💡 This might mean:");
  console.log("   - The business isn't fully indexed in Places API yet");
  console.log("   - Service area businesses can take longer to index");
  console.log("   - You may need to wait 24-48 hours after verification");
  console.log("\n🔧 Alternative: Use the Place ID from the network response");
  console.log("   The Place ID we found was: ChIJ71y4lzbyvE4R2NGfhI89aj0");
  console.log("   It might work once the business is fully indexed.");
  
  return null;
}

findCorrectPlaceId().catch(error => {
  console.error("Fatal error:", error);
  process.exit(1);
});
