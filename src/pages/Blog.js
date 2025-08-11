import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FileText, ArrowRight } from 'lucide-react';

const Blog = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-spiritual-50 pt-20">
      <div className="container-custom py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="w-20 h-20 bg-spiritual-gradient rounded-full flex items-center justify-center mx-auto mb-6">
            <FileText className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6">
            Spiritual Recovery <span className="text-gradient">Blog</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Insights, guidance, and inspiration for your spiritual recovery
            journey. Discover practical tools and wisdom to transform your life.
          </p>
          <div className="bg-white rounded-xl p-8 shadow-lg max-w-2xl mx-auto">
            <h2 className="text-2xl font-serif font-bold text-gray-900 mb-4">
              Coming Soon
            </h2>
            <p className="text-gray-600 mb-6">
              We're working on creating valuable content to support your
              spiritual recovery journey. Sign up for our newsletter to be
              notified when new articles are published.
            </p>
            <Link
              to="/contact"
              className="btn-primary inline-flex items-center"
            >
              Get Notified
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Blog;
