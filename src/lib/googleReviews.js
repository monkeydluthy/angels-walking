/**
 * Google Reviews Integration
 * Fetches reviews from Google Places API and filters for 5-star reviews only
 */

const CACHE_KEY = 'google_reviews_cache';
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

/**
 * Get cached reviews if they exist and are still valid
 */
const getCachedReviews = () => {
  try {
    const cached = localStorage.getItem(CACHE_KEY);
    if (!cached) return null;

    const { reviews, timestamp } = JSON.parse(cached);
    const now = Date.now();

    // Check if cache is still valid (less than 24 hours old)
    if (now - timestamp < CACHE_DURATION) {
      return reviews;
    }

    // Cache expired, remove it
    localStorage.removeItem(CACHE_KEY);
    return null;
  } catch (error) {
    console.error('Error reading cached reviews:', error);
    return null;
  }
};

/**
 * Cache reviews in localStorage
 */
const cacheReviews = (reviews) => {
  try {
    const cacheData = {
      reviews,
      timestamp: Date.now(),
    };
    localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
  } catch (error) {
    console.error('Error caching reviews:', error);
  }
};

/**
 * Fetch reviews from Google Places API
 */
export const fetchGoogleReviews = async () => {
  const apiKey = process.env.REACT_APP_GOOGLE_PLACES_API_KEY;
  const placeId = process.env.REACT_APP_GOOGLE_PLACE_ID;

  // Check if API key and Place ID are configured
  if (!apiKey || !placeId) {
    console.warn('Google Places API key or Place ID not configured');
    return [];
  }

  // Check cache first
  const cachedReviews = getCachedReviews();
  if (cachedReviews) {
    return cachedReviews;
  }

  try {
    // Use Places API (New) - works better for verified businesses
    const response = await fetch(
      `https://places.googleapis.com/v1/places/${placeId}?fields=id,displayName,rating,userRatingCount,reviews&key=${apiKey}`,
      {
        headers: {
          'Content-Type': 'application/json',
          'X-Goog-Api-Key': apiKey,
          'X-Goog-FieldMask': 'id,displayName,rating,userRatingCount,reviews'
        }
      }
    );

    if (!response.ok) {
      // Fallback to regular Places API if Places API (New) fails
      return await fetchWithRegularPlacesAPI(apiKey, placeId);
    }

    const data = await response.json();

    if (!data.reviews || data.reviews.length === 0) {
      console.warn('No reviews found in API response');
      return [];
    }

    // Filter for 5-star reviews only
    const fiveStarReviews = data.reviews.filter(
      (review) => review.rating === 5
    );

    // Transform reviews to match our testimonial format
    const formattedReviews = fiveStarReviews.map((review) => {
      // Places API (New) uses different field names
      const authorName = review.authorAttribution?.displayName || review.authorName || 'Anonymous';
      const reviewText = review.text?.text || review.text || '';
      const reviewTime = review.publishTime || review.time;
      
      // Extract initials from author name
      const nameParts = authorName.split(' ');
      const initials =
        nameParts.length > 1
          ? `${nameParts[0][0]}${nameParts[nameParts.length - 1][0]}`.toUpperCase()
          : nameParts[0].substring(0, 2).toUpperCase();

      return {
        name: authorName,
        location: 'Orlando, FL', // Default location, can be customized
        service: 'Spiritual Recovery Coaching', // Default service, can be customized
        rating: review.rating,
        text: reviewText,
        avatar: initials,
        date: reviewTime ? new Date(reviewTime).toLocaleDateString() : null,
        isGoogleReview: true, // Flag to identify Google reviews
      };
    });

    // Cache the reviews
    cacheReviews(formattedReviews);

    return formattedReviews;
  } catch (error) {
    console.error('Error fetching Google Reviews:', error);
    // Return cached reviews even if expired, as fallback
    const expiredCache = getCachedReviews();
    if (expiredCache) {
      return expiredCache;
    }
    return [];
  }
};

/**
 * Fallback to regular Places API if Places API (New) fails
 */
const fetchWithRegularPlacesAPI = async (apiKey, placeId) => {
  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,rating,reviews&key=${apiKey}`
    );

    if (!response.ok) {
      return [];
    }

    const data = await response.json();

    if (data.status !== 'OK' || !data.result || !data.result.reviews) {
      return [];
    }

    const fiveStarReviews = data.result.reviews.filter(
      (review) => review.rating === 5
    );

    return fiveStarReviews.map((review) => {
      const nameParts = review.author_name.split(' ');
      const initials =
        nameParts.length > 1
          ? `${nameParts[0][0]}${nameParts[nameParts.length - 1][0]}`.toUpperCase()
          : nameParts[0].substring(0, 2).toUpperCase();

      return {
        name: review.author_name,
        location: 'Orlando, FL',
        service: 'Spiritual Recovery Coaching',
        rating: review.rating,
        text: review.text,
        avatar: initials,
        date: review.time ? new Date(review.time * 1000).toLocaleDateString() : null,
        isGoogleReview: true,
      };
    });
  } catch (error) {
    console.error('Error with regular Places API fallback:', error);
    return [];
  }
};

/**
 * Get the business rating from Google
 */
export const fetchBusinessRating = async () => {
  const apiKey = process.env.REACT_APP_GOOGLE_PLACES_API_KEY;
  const placeId = process.env.REACT_APP_GOOGLE_PLACE_ID;

  if (!apiKey || !placeId) {
    return null;
  }

  try {
    // Try Places API (New) first
    const response = await fetch(
      `https://places.googleapis.com/v1/places/${placeId}?fields=rating,userRatingCount&key=${apiKey}`,
      {
        headers: {
          'Content-Type': 'application/json',
          'X-Goog-Api-Key': apiKey,
          'X-Goog-FieldMask': 'rating,userRatingCount'
        }
      }
    );

    if (response.ok) {
      const data = await response.json();
      return {
        rating: data.rating,
        totalRatings: data.userRatingCount || 0,
      };
    }

    // Fallback to regular Places API
    const fallbackResponse = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=rating,user_ratings_total&key=${apiKey}`
    );

    if (fallbackResponse.ok) {
      const fallbackData = await fallbackResponse.json();
      if (fallbackData.status === 'OK' && fallbackData.result) {
        return {
          rating: fallbackData.result.rating,
          totalRatings: fallbackData.result.user_ratings_total || 0,
        };
      }
    }

    return null;
  } catch (error) {
    console.error('Error fetching business rating:', error);
    return null;
  }
};
