import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Sparkles, ArrowRight } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-spiritual-50 pt-24 pb-16 px-4">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto text-center"
        >
          {/* Icon */}
          <div className="w-24 h-24 mx-auto mb-8 rounded-full bg-gradient-to-br from-primary-500 to-spiritual-600 flex items-center justify-center shadow-lg">
            <Sparkles className="w-12 h-12 text-white" />
          </div>

          {/* 404 */}
          <h1 className="text-8xl md:text-9xl font-serif font-bold text-primary-200 mb-2">
            404
          </h1>

          {/* Message */}
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mb-4">
            Page not found
          </h2>
          <p className="text-lg text-gray-600 mb-10 max-w-md mx-auto">
            This page may have moved or the link might be incorrect. Let's get you back on your path.
          </p>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/"
              className="inline-flex items-center justify-center px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-semibold"
            >
              <Home className="w-5 h-5 mr-2" />
              Back to Home
            </Link>
            <Link
              to="/self-care-quiz"
              className="inline-flex items-center justify-center px-6 py-3 border-2 border-primary-600 text-primary-600 rounded-lg hover:bg-primary-50 transition-colors font-semibold"
            >
              Take Self-Care Quiz
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-6 py-3 text-gray-700 hover:text-primary-600 transition-colors font-medium"
            >
              Contact Us
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;
