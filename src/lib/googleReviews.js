/**
 * Google Reviews Integration
 * Fetches reviews from Google Places API and filters for 5-star reviews only
 */

const CACHE_KEY = 'google_reviews_cache';
const CACHE_DURATION = 2 * 60 * 60 * 1000; // 2 hours in milliseconds (reduced for faster updates)
const STALE_THRESHOLD = 30 * 60 * 1000; // Consider cache stale after 30 minutes (refresh in background)

/**
 * Get cached reviews if they exist and are still valid
 * Returns { reviews, isStale } - isStale indicates if cache should be refreshed in background
 */
const getCachedReviews = () => {
  try {
    const cached = localStorage.getItem(CACHE_KEY);
    if (!cached) return { reviews: null, isStale: true };

    const { reviews, timestamp, reviewIds } = JSON.parse(cached);
    const now = Date.now();
    const age = now - timestamp;

    // Check if cache is still valid (less than 2 hours old)
    if (age < CACHE_DURATION) {
      // Cache is valid, but check if it's stale (older than 30 minutes)
      const isStale = age > STALE_THRESHOLD;
      return { reviews, isStale, reviewIds: reviewIds || [] };
    }

    // Cache expired, remove it
    localStorage.removeItem(CACHE_KEY);
    return { reviews: null, isStale: true };
  } catch (error) {
    console.error('Error reading cached reviews:', error);
    return { reviews: null, isStale: true };
  }
};

/**
 * Cache reviews in localStorage
 * Also stores review IDs to detect new reviews
 */
const cacheReviews = (reviews) => {
  try {
    // Extract review IDs (using a combination of author name + text hash for uniqueness)
    const reviewIds = reviews.map(review => {
      const hash = review.text.substring(0, 50).replace(/\s/g, '').toLowerCase();
      return `${review.name}-${hash}`;
    });

    const cacheData = {
      reviews,
      timestamp: Date.now(),
      reviewIds,
    };
    localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
  } catch (error) {
    console.error('Error caching reviews:', error);
  }
};

/**
 * Check if there are new reviews by comparing IDs
 */
const hasNewReviews = (newReviews, oldReviewIds = []) => {
  if (!oldReviewIds || oldReviewIds.length === 0) return true;
  
  const newReviewIds = newReviews.map(review => {
    const hash = review.text.substring(0, 50).replace(/\s/g, '').toLowerCase();
    return `${review.name}-${hash}`;
  });
  
  // Check if any new review IDs don't exist in old ones
  return newReviewIds.some(id => !oldReviewIds.includes(id));
};

/**
 * Fetch reviews from Google Places API
 * @param {boolean} forceRefresh - Force refresh even if cache is valid
 * @param {Function} onNewReviews - Callback when new reviews are detected
 */
export const fetchGoogleReviews = async (forceRefresh = false, onNewReviews = null) => {
  const apiKey = process.env.REACT_APP_GOOGLE_PLACES_API_KEY;
  const placeId = process.env.REACT_APP_GOOGLE_PLACE_ID;

  // Check if API key and Place ID are configured
  if (!apiKey || !placeId) {
    console.warn('Google Places API key or Place ID not configured');
    return [];
  }

  // Check cache first (unless forcing refresh)
  if (!forceRefresh) {
    const { reviews, isStale, reviewIds } = getCachedReviews();
    if (reviews) {
      // If cache is stale, refresh in background but return cached data immediately
      if (isStale) {
        // Refresh in background (don't await)
        refreshReviewsInBackground(apiKey, placeId, reviewIds, onNewReviews).catch(err => {
          console.error('Background refresh failed:', err);
        });
      }
      return reviews;
    }
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

    // Filter for 5-star reviews only AND reviews with actual text (not just ratings)
    const fiveStarReviews = data.reviews.filter(
      (review) => {
        const rating = review.rating || review.ratingValue || 5;
        const text = review.text?.text || review.text || '';
        // Must be 5 stars AND have actual review text (at least 10 characters)
        return rating === 5 && text.trim().length >= 10;
      }
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

    // Check for new reviews if we have old review IDs
    const { reviewIds: oldReviewIds } = getCachedReviews();
    if (oldReviewIds && oldReviewIds.length > 0 && hasNewReviews(formattedReviews, oldReviewIds)) {
      console.log('🆕 New reviews detected!');
      if (onNewReviews) {
        onNewReviews(formattedReviews);
      }
    }

    // Cache the reviews
    cacheReviews(formattedReviews);

    return formattedReviews;
  } catch (error) {
    console.error('Error fetching Google Reviews:', error);
    // Return cached reviews even if expired, as fallback
    const { reviews } = getCachedReviews();
    if (reviews) {
      return reviews;
    }
    return [];
  }
};

/**
 * Refresh reviews in background without blocking
 */
const refreshReviewsInBackground = async (apiKey, placeId, oldReviewIds, onNewReviews) => {
  try {
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

    if (!response.ok) return;

    const data = await response.json();
    if (!data.reviews || data.reviews.length === 0) return;

    // Filter for 5-star reviews with text
    const fiveStarReviews = data.reviews.filter(
      (review) => {
        const rating = review.rating || review.ratingValue || 5;
        const text = review.text?.text || review.text || '';
        return rating === 5 && text.trim().length >= 10;
      }
    );

    const formattedReviews = fiveStarReviews.map((review) => {
      const authorName = review.authorAttribution?.displayName || review.authorName || 'Anonymous';
      const reviewText = review.text?.text || review.text || '';
      const reviewTime = review.publishTime || review.time;
      
      const nameParts = authorName.split(' ');
      const initials =
        nameParts.length > 1
          ? `${nameParts[0][0]}${nameParts[nameParts.length - 1][0]}`.toUpperCase()
          : nameParts[0].substring(0, 2).toUpperCase();

      return {
        name: authorName,
        location: 'Orlando, FL',
        service: 'Spiritual Recovery Coaching',
        rating: review.rating,
        text: reviewText,
        avatar: initials,
        date: reviewTime ? new Date(reviewTime).toLocaleDateString() : null,
        isGoogleReview: true,
      };
    });

    // Check for new reviews
    if (oldReviewIds && oldReviewIds.length > 0 && hasNewReviews(formattedReviews, oldReviewIds)) {
      console.log('🆕 New reviews detected in background refresh!');
      if (onNewReviews) {
        onNewReviews(formattedReviews);
      }
    }

    // Update cache
    cacheReviews(formattedReviews);
  } catch (error) {
    console.error('Background refresh error:', error);
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

    // Filter for 5-star reviews with actual text (not just ratings)
    const fiveStarReviews = data.result.reviews.filter(
      (review) => {
        const rating = review.rating || 5;
        const text = review.text || '';
        // Must be 5 stars AND have actual review text (at least 10 characters)
        return rating === 5 && text.trim().length >= 10;
      }
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
