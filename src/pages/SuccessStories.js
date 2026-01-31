import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Heart, Star, Image as ImageIcon, Play, X } from 'lucide-react';
import { supabase } from '../lib/supabase';
import PageMeta from '../components/PageMeta';

const SuccessStories = () => {
  const [successStories, setSuccessStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState(null);

  useEffect(() => {
    fetchStories();
  }, []);

  const fetchStories = async () => {
    try {
      const { data, error } = await supabase
        .from('success_stories')
        .select('*')
        .eq('is_published', true)
        .order('display_order', { ascending: true });

      if (error) throw error;
      setSuccessStories(data || []);
    } catch (error) {
      console.error('Error fetching stories:', error);
      // Fallback to empty array if error
      setSuccessStories([]);
    } finally {
      setLoading(false);
    }
  };

  // Note: Stories are now fetched from Supabase database

  const renderStars = (rating) => {
    return [...Array(rating)].map((_, i) => (
      <Star key={i} className="w-4 h-4 text-healing-400 fill-current" />
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-spiritual-50 pt-16">
      <PageMeta
        title="Success Stories"
        description="Real transformations from clients who chose spiritual recovery coaching, angel card readings, and life coaching. Healing and hope at Angels Walking."
      />
      <div className="container-custom py-16">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="w-20 h-20 bg-spiritual-gradient rounded-full flex items-center justify-center mx-auto mb-6">
            <Heart className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6">
            Success <span className="text-gradient">Stories</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Real transformations from real people. Discover how spiritual recovery
            coaching, angel card readings, and life coaching have helped hundreds
            of clients find healing, hope, and their highest possibility.
          </p>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto mt-4">
            Each story represents a journey of growth, healing, and transformation.
            These are the voices of those who chose to prioritize their spiritual
            well-being and are now living lives they love.
          </p>
        </motion.div>

        {/* Success Stories Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading success stories...</p>
          </div>
        ) : successStories.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <p className="text-lg mb-4">No success stories available at this time.</p>
            <p className="text-sm">Check back soon for inspiring transformation stories!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {successStories.map((story, index) => (
            <motion.div
              key={story.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden card-hover group"
            >
              {/* Image/Video Thumbnail */}
              <div className="relative h-64 bg-gradient-to-br from-primary-100 via-spiritual-100 to-healing-100 overflow-hidden cursor-pointer"
                onClick={() => story.video_url && setSelectedVideo(story)}
              >
                {story.video_url ? (
                  // Video thumbnail with play button
                  <>
                    {story.image_url ? (
                      <img
                        src={story.image_url}
                        alt={story.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary-200 to-spiritual-200">
                        <div className="text-center">
                          <div className="w-20 h-20 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-3 shadow-xl">
                            <Play className="w-10 h-10 text-primary-600 ml-1" fill="currentColor" />
                          </div>
                          <p className="text-gray-700 text-sm font-medium">Watch Video</p>
                        </div>
                      </div>
                    )}
                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors">
                      <div className="w-16 h-16 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-2xl transform group-hover:scale-110 transition-transform">
                        <Play className="w-8 h-8 text-primary-600 ml-1" fill="currentColor" />
                      </div>
                    </div>
                  </>
                ) : story.image_url ? (
                  // Just an image
                  <img
                    src={story.image_url}
                    alt={story.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                ) : (
                  // No image or video - placeholder
                  <div className="w-full h-full flex flex-col items-center justify-center">
                    <div className="w-24 h-24 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center mb-4 shadow-lg">
                      <ImageIcon className="w-12 h-12 text-primary-600" />
                    </div>
                    <p className="text-gray-600 text-sm font-medium">
                      Success Story Image
                    </p>
                  </div>
                )}
                {/* Rating Badge */}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center space-x-1 shadow-lg z-10">
                  {renderStars(story.rating)}
                </div>
                {/* Video Badge */}
                {story.video_url && (
                  <div className="absolute top-4 left-4 bg-primary-600 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg z-10">
                    Video Available
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="mb-3">
                  <span className="text-xs font-semibold text-primary-600 uppercase tracking-wide">
                    {story.service}
                  </span>
                </div>
                <h3 className="text-2xl font-serif font-bold text-gray-900 mb-2">
                  {story.name}
                </h3>
                <p className="text-sm text-gray-500 mb-4">{story.location}</p>
                <p className="text-gray-600 leading-relaxed mb-4">
                  {story.summary}
                </p>
                <div className="pt-4 border-t border-gray-100">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1">
                      {renderStars(story.rating)}
                      <span className="text-sm text-gray-500 ml-1">
                        ({story.rating}.0)
                      </span>
                    </div>
                    <Heart className="w-5 h-5 text-primary-300" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
          </div>
        )}

        {/* Video Modal */}
        <AnimatePresence>
          {selectedVideo && (
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label={`Video: ${selectedVideo.name}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedVideo(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Video Header */}
                <div className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-primary-600 to-spiritual-600">
                  <div>
                    <h3 className="text-xl font-bold text-white">{selectedVideo.name}</h3>
                    <p className="text-white/80 text-sm">{selectedVideo.service}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelectedVideo(null)}
                    className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent"
                    aria-label="Close video"
                  >
                    <X className="w-6 h-6 text-white" />
                  </button>
                </div>

                {/* Video Player */}
                <div className="relative bg-black">
                  <video
                    controls
                    autoPlay
                    className="w-full h-auto max-h-[70vh]"
                    poster={selectedVideo.image_url || undefined}
                  >
                    <source src={selectedVideo.video_url} type="video/mp4" />
                    <source src={selectedVideo.video_url} type="video/webm" />
                    Your browser does not support the video tag.
                  </video>
                </div>

                {/* Video Info */}
                <div className="p-6">
                  <p className="text-gray-600 leading-relaxed">{selectedVideo.summary}</p>
                  <div className="mt-4 flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      {renderStars(selectedVideo.rating)}
                      <span className="text-sm text-gray-500 ml-1">
                        ({selectedVideo.rating}.0)
                      </span>
                    </div>
                    <span className="text-sm text-gray-500">•</span>
                    <span className="text-sm text-gray-500">{selectedVideo.location}</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-primary-600 to-spiritual-600 rounded-xl p-8 md:p-12 text-white">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
              Ready to Write Your Own Success Story?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join hundreds of clients who have transformed their lives through
              spiritual recovery coaching and angel card guidance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="bg-white text-primary-600 hover:bg-gray-100 font-semibold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl inline-flex items-center justify-center"
              >
                Book Your Session
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
              <Link
                to="/self-care-quiz"
                className="border-2 border-white text-white hover:bg-white hover:text-primary-600 font-semibold py-4 px-8 rounded-lg transition-all duration-300 inline-flex items-center justify-center"
              >
                Take Free Assessment
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SuccessStories;
