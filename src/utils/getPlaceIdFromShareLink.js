/**
 * Utility to help extract Place ID from Google Maps share links
 * 
 * Instructions:
 * 1. Open the share link: https://maps.app.goo.gl/rbbnGDod4PDz8Aer6
 * 2. The link will redirect to the full Google Maps URL
 * 3. Look for the Place ID in the URL or use the Place ID Finder tool
 */

/**
 * Alternative: Use Google Places API Text Search to find Place ID
 * This requires the API key to be set up first
 */
export const findPlaceIdByBusinessName = async (businessName, apiKey) => {
  if (!apiKey) {
    console.error('Google Places API key is required');
    return null;
  }

  try {
    // Use Text Search to find the business
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(businessName)}&key=${apiKey}`
    );

    const data = await response.json();

    if (data.status === 'OK' && data.results && data.results.length > 0) {
      // Find the most relevant result
      const business = data.results.find(
        (result) =>
          result.name.toLowerCase().includes('gladys') ||
          result.name.toLowerCase().includes('schmanski') ||
          result.name.toLowerCase().includes('spiritual recovery')
      ) || data.results[0];

      return business.place_id;
    }

    return null;
  } catch (error) {
    console.error('Error finding Place ID:', error);
    return null;
  }
};

/**
 * Instructions for manual extraction:
 * 
 * 1. Open the share link in your browser
 * 2. It will redirect to a full Google Maps URL
 * 3. Look for the Place ID in the URL (starts with ChIJ or EiJ)
 * 4. OR use: https://developers.google.com/maps/documentation/places/web-service/place-id#find-id
 * 5. Search for "Gladys Schmanski Spiritual Recovery Life Coach"
 */
