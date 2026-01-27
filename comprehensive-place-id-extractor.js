// Comprehensive Place ID Extractor for Google Maps
// Run this in the browser console on the Google Maps page

(function() {
  console.log("🔍 Comprehensive Place ID Search...\n");
  console.log("=".repeat(60));
  
  let placeId = null;
  const foundIn = [];
  
  // Method 1: Search ALL script tags more thoroughly
  console.log("Method 1: Searching script tags...");
  const scripts = document.getElementsByTagName('script');
  for (let i = 0; i < scripts.length; i++) {
    const script = scripts[i];
    const content = script.textContent || script.innerHTML || '';
    
    // More comprehensive patterns
    const patterns = [
      /place_id["\s:]+(ChIJ[^"'\s,}]+)/gi,
      /"place_id":"(ChIJ[^"]+)"/gi,
      /place_id=(ChIJ[^&\s]+)/gi,
      /ChIJ[\w-]{27}/g,
      /EiJ[\w-]{27}/g,
      /placeId["\s:]+(ChIJ[^"'\s,}]+)/gi,
      /placeId["\s:]+(EiJ[^"'\s,}]+)/gi,
      /data-place-id=["'](ChIJ[^"']+)["']/gi,
      /data-place-id=["'](EiJ[^"']+)["']/gi
    ];
    
    for (const pattern of patterns) {
      const matches = content.matchAll(pattern);
      for (const match of matches) {
        const candidate = match[1] || match[0];
        if ((candidate.startsWith('ChIJ') || candidate.startsWith('EiJ')) && candidate.length >= 25 && candidate.length <= 30) {
          placeId = candidate;
          foundIn.push(`Script tag ${i}`);
          console.log(`  ✅ Found: ${placeId} in script ${i}`);
          break;
        }
      }
      if (placeId) break;
    }
    if (placeId) break;
  }
  
  // Method 2: Search in data attributes
  if (!placeId) {
    console.log("\nMethod 2: Searching data attributes...");
    const elements = document.querySelectorAll('[data-place-id], [data-place_id], [data-placeId]');
    for (const el of elements) {
      const id = el.getAttribute('data-place-id') || el.getAttribute('data-place_id') || el.getAttribute('data-placeId');
      if (id && (id.startsWith('ChIJ') || id.startsWith('EiJ'))) {
        placeId = id;
        foundIn.push('Data attribute');
        console.log(`  ✅ Found: ${placeId}`);
        break;
      }
    }
  }
  
  // Method 3: Search in window/global variables
  if (!placeId) {
    console.log("\nMethod 3: Searching window variables...");
    try {
      // Check various possible locations
      const checks = [
        () => window.google?.maps?.places?.PlaceResult?.place_id,
        () => window.__APP_INITIALIZATION_STATE__,
        () => window.__INITIAL_STATE__,
        () => window.APP_INITIALIZATION_STATE
      ];
      
      for (const check of checks) {
        try {
          const result = check();
          if (result) {
            const jsonStr = JSON.stringify(result);
            const match = jsonStr.match(/(ChIJ|EiJ)[\w-]{25,30}/);
            if (match) {
              placeId = match[0];
              foundIn.push('Window variable');
              console.log(`  ✅ Found: ${placeId}`);
              break;
            }
          }
        } catch (e) {}
      }
    } catch (e) {
      console.log("  ⚠️  Could not access window variables");
    }
  }
  
  // Method 4: Search in localStorage/sessionStorage
  if (!placeId) {
    console.log("\nMethod 4: Searching storage...");
    try {
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const value = localStorage.getItem(key);
        const match = value?.match(/(ChIJ|EiJ)[\w-]{25,30}/);
        if (match) {
          placeId = match[0];
          foundIn.push('localStorage');
          console.log(`  ✅ Found: ${placeId}`);
          break;
        }
      }
    } catch (e) {}
  }
  
  // Method 5: Search entire document HTML
  if (!placeId) {
    console.log("\nMethod 5: Searching entire document...");
    const html = document.documentElement.outerHTML;
    const matches = html.matchAll(/(ChIJ|EiJ)[\w-]{25,30}/g);
    const candidates = Array.from(matches).map(m => m[0]);
    const uniqueCandidates = [...new Set(candidates)];
    
    if (uniqueCandidates.length > 0) {
      // Filter for likely Place IDs (not in URLs, not in comments, etc.)
      for (const candidate of uniqueCandidates) {
        if (candidate.length >= 25 && candidate.length <= 30) {
          placeId = candidate;
          foundIn.push('Document HTML');
          console.log(`  ✅ Found: ${placeId}`);
          break;
        }
      }
    }
  }
  
  // Method 6: Check URL parameters
  if (!placeId) {
    console.log("\nMethod 6: Checking URL...");
    const url = window.location.href;
    const urlParams = new URLSearchParams(window.location.search);
    
    // Check query params
    for (const [key, value] of urlParams.entries()) {
      if (value.match(/(ChIJ|EiJ)[\w-]{25,30}/)) {
        placeId = value.match(/(ChIJ|EiJ)[\w-]{25,30}/)[0];
        foundIn.push('URL parameter');
        console.log(`  ✅ Found: ${placeId}`);
        break;
      }
    }
    
    // Check hash
    if (!placeId && window.location.hash) {
      const hashMatch = window.location.hash.match(/(ChIJ|EiJ)[\w-]{25,30}/);
      if (hashMatch) {
        placeId = hashMatch[0];
        foundIn.push('URL hash');
        console.log(`  ✅ Found: ${placeId}`);
      }
    }
  }
  
  // Display results
  console.log("\n" + "=".repeat(60));
  if (placeId) {
    console.log("✅ PLACE ID FOUND!");
    console.log("=".repeat(60));
    console.log(`\n📍 Place ID: ${placeId}`);
    console.log(`📌 Found in: ${foundIn.join(', ')}`);
    console.log(`\n📝 Add this to your .env file:`);
    console.log(`REACT_APP_GOOGLE_PLACE_ID=${placeId}`);
    console.log("\n" + "=".repeat(60));
    
    // Copy to clipboard
    if (navigator.clipboard) {
      navigator.clipboard.writeText(placeId).then(() => {
        console.log("\n✅ Place ID copied to clipboard!");
      }).catch(() => {
        console.log("\n⚠️  Could not copy to clipboard automatically");
      });
    }
    
    // Also try to select it for easy copying
    console.log("\n💡 The Place ID is above - you can copy it manually");
    
  } else {
    console.log("❌ Place ID not found with automated methods");
    console.log("=".repeat(60));
    console.log("\n💡 Manual Methods:");
    console.log("\n1. View Page Source:");
    console.log("   - Right-click → 'View Page Source' (or Ctrl+U / Cmd+U)");
    console.log("   - Press Ctrl+F (or Cmd+F)");
    console.log("   - Search for: ChIJ");
    console.log("   - Look for a 27-character string");
    console.log("\n2. Network Tab:");
    console.log("   - Open Dev Tools → Network tab");
    console.log("   - Refresh the page");
    console.log("   - Search for 'place' or 'details' in network requests");
    console.log("   - Check the request/response for place_id");
    console.log("\n3. Use the Share Link:");
    console.log("   - Click 'Share' on the Google Maps page");
    console.log("   - The Place ID might be in the share URL");
    console.log("\n4. Contact Google Support:");
    console.log("   - Since the business is verified, Google Support can provide the Place ID");
  }
})();
