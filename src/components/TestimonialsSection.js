import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, Quote, ExternalLink } from 'lucide-react';
import { fetchGoogleReviews, fetchBusinessRating } from '../lib/googleReviews';
import { analytics } from '../lib/analytics';

// Placeholder testimonials as fallback (moved outside component to avoid dependency warning)
const placeholderTestimonials = [
    {
      name: 'Sarah M.',
      location: 'Orlando, FL',
      service: 'Spiritual Recovery Coaching',
      rating: 5,
      text: "Working with Gladys has completely transformed my life! I was struggling with negative thinking and low self-esteem for years. Through her spiritual recovery coaching, I've learned to love myself and find inner peace. Her guidance is truly life-changing.",
      avatar: 'SM',
    },
    {
      name: 'Michael R.',
      location: 'Tampa, FL',
      service: 'Addiction Recovery Support',
      rating: 5,
      text: "Gladys helped me break free from destructive patterns that were holding me back. Her holistic approach to addiction recovery combines spiritual guidance with practical tools. I'm now 2 years sober and living my best life.",
      avatar: 'MR',
    },
    {
      name: 'Jennifer L.',
      location: 'Miami, FL',
      service: 'Angel Card Reading',
      rating: 5,
      text: 'The angel card reading with Gladys was incredibly insightful and accurate. She helped me find clarity about my life path and gave me the guidance I needed to make important decisions. I highly recommend her services.',
      avatar: 'JL',
    },
    {
      name: 'David K.',
      location: 'Jacksonville, FL',
      service: 'Life Coaching',
      rating: 5,
      text: 'Gladys is an amazing life coach who truly cares about her clients. She helped me identify my limiting beliefs and develop a clear vision for my future. Her coaching has been instrumental in my personal and professional growth.',
      avatar: 'DK',
    },
    {
      name: 'Lisa T.',
      location: 'Gainesville, FL',
      service: 'Spiritual Recovery Coaching',
      rating: 5,
      text: "I was skeptical about spiritual coaching at first, but Gladys made me a believer. Her approach is gentle yet powerful, and she has a unique ability to help you see what's hidden within. My life has never been better.",
      avatar: 'LT',
    },
    {
      name: 'Robert W.',
      location: 'Fort Lauderdale, FL',
      service: 'Addiction Recovery Support',
      rating: 5,
      text: "Gladys helped me understand that I wasn't broken, just in need of healing. Her spiritual approach to addiction recovery has given me tools I use every day. I'm grateful for her guidance and support.",
      avatar: 'RW',
    },
];

const TestimonialsSection = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [businessRating, setBusinessRating] = useState(null);
  const [googlePlaceUrl, setGooglePlaceUrl] = useState(null);

  useEffect(() => {
    const loadReviews = async () => {
      try {
        // Fetch Google Reviews (5-star only)
        // onNewReviews callback will update state when new reviews are detected
        const googleReviews = await fetchGoogleReviews(false, (newReviews) => {
          // When new reviews are detected, update the testimonials
          setTestimonials(newReviews);
        });
        
        // Fetch business rating info
        const ratingInfo = await fetchBusinessRating();
        
        if (googleReviews && googleReviews.length > 0) {
          setTestimonials(googleReviews);
        } else {
          // Fallback to placeholder testimonials if no Google reviews
          setTestimonials(placeholderTestimonials);
        }

        if (ratingInfo) {
          setBusinessRating(ratingInfo);
        }

        // Build Google Place URL for "Leave a Review" button
        const placeId = process.env.REACT_APP_GOOGLE_PLACE_ID;
        if (placeId) {
          setGooglePlaceUrl(`https://search.google.com/local/writereview?placeid=${placeId}`);
        }
      } catch (error) {
        console.error('Error loading reviews:', error);
        // Fallback to placeholder testimonials on error
        setTestimonials(placeholderTestimonials);
      } finally {
        setLoading(false);
      }
    };

    loadReviews();

    // Set up periodic refresh every hour
    const refreshInterval = setInterval(() => {
      // Refresh reviews in background
      fetchGoogleReviews(false, (newReviews) => {
        setTestimonials(newReviews);
      }).catch(err => console.error('Periodic refresh error:', err));
    }, 60 * 60 * 1000); // Every hour

    // Also refresh when page becomes visible (user returns to tab)
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        // Refresh reviews when user returns to the page
        fetchGoogleReviews(false, (newReviews) => {
          setTestimonials(newReviews);
        }).catch(err => console.error('Visibility refresh error:', err));
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Cleanup
    return () => {
      clearInterval(refreshInterval);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? 'text-spiritual-500 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <section className="section-padding bg-gradient-to-br from-primary-50 to-spiritual-50">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6">
            What My Clients <span className="text-gradient">Say</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Real stories from real people who have transformed their lives
            through spiritual recovery coaching and angel card guidance.
          </p>
        </motion.div>

        {loading ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading reviews...</p>
          </div>
        ) : testimonials.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <p className="text-lg">No reviews available at this time.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={`${testimonial.name}-${index}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-lg card-hover"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-spiritual-gradient rounded-full flex items-center justify-center text-white font-semibold">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        {testimonial.name}
                      </h4>
                      <p className="text-sm text-gray-500">
                        {testimonial.location}
                      </p>
                    </div>
                  </div>
                  <Quote className="w-6 h-6 text-primary-300" />
                </div>

                <div className="flex items-center mb-4">
                  {renderStars(testimonial.rating)}
                  <span className="ml-2 text-sm text-gray-600">
                    ({testimonial.rating}.0)
                  </span>
                  {testimonial.isGoogleReview && (
                    <span className="ml-2 text-xs text-primary-600 font-medium bg-primary-50 px-2 py-1 rounded">
                      Google Review
                    </span>
                  )}
                </div>

                <p className="text-gray-600 leading-relaxed mb-4">
                  "{testimonial.text}"
                </p>

                {testimonial.service && (
                  <div className="text-sm text-primary-600 font-medium">
                    {testimonial.service}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}

        {/* Overall Rating */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center mt-16"
        >
          <div className="bg-white rounded-xl p-8 shadow-lg max-w-2xl mx-auto">
            <div className="flex items-center justify-center space-x-2 mb-4">
              {renderStars(businessRating?.rating || 5)}
              <span className="text-2xl font-bold text-gray-900 ml-2">
                {businessRating?.rating?.toFixed(1) || '5.0'}
              </span>
            </div>
            <h3 className="text-2xl font-serif font-bold text-gray-900 mb-2">
              Average Client Rating
            </h3>
            <p className="text-gray-600 mb-6">
              {businessRating?.totalRatings
                ? `Based on ${businessRating.totalRatings} Google Reviews`
                : 'Based on client sessions and spiritual recovery coaching experiences'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {googlePlaceUrl ? (
                <>
                  <a
                    href={googlePlaceUrl}
                    onClick={() => analytics.trackReviewClick('read_all')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary inline-flex items-center justify-center"
                  >
                    Read All Reviews
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </a>
                  <a
                    href={googlePlaceUrl}
                    onClick={() => analytics.trackReviewClick('leave_review')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline inline-flex items-center justify-center"
                  >
                    Leave a Review
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </a>
                </>
              ) : (
                <p className="text-sm text-gray-500 italic">
                  Review links will appear here once Google Place is set up. In the meantime, share your experience with us via the{' '}
                  <Link to="/contact" className="text-primary-600 hover:underline font-medium">
                    Contact
                  </Link>{' '}
                  page.
                </p>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
