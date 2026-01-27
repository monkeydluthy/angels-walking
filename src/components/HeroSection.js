import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Heart, Star } from 'lucide-react';
import { analytics } from '../lib/analytics';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden w-full">
      {/* Background */}
      <div className="absolute inset-0 gradient-bg"></div>

      {/* Content */}
      <div className="container-custom relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
          {/* Left Column - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <div className="flex items-center justify-center lg:justify-start space-x-2 mb-6 mt-8 md:mt-12">
              <div className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg max-w-full">
                <Sparkles className="w-5 h-5 text-primary-600 flex-shrink-0" />
                <span className="text-sm font-medium text-gray-700 truncate">
                  Certified Life Coach & Angel Card Reader
                </span>
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-serif font-bold text-gray-900 mb-6 leading-tight text-center lg:text-left">
              I'm calling time on the idea that you're{' '}
              <span className="text-gradient">broken.</span>
            </h1>

            <p className="text-lg md:text-xl lg:text-2xl text-gray-600 mb-8 leading-relaxed text-center lg:text-left px-4 lg:px-0">
              You don't need fixing. You need help to appreciate and prioritize
              yourself.
              <span className="font-semibold text-primary-600">
                {' '}
                What you need is a spiritual recovery revolution.
              </span>
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8 w-full">
              <Link
                to="/self-care-quiz"
                onClick={() => analytics.trackCTAClick('Take Self-Care Quiz', 'hero_section')}
                className="btn-primary inline-flex items-center justify-center w-full sm:w-auto"
              >
                Take Self-Care Quiz
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
              <Link
                to="/contact"
                onClick={() => analytics.trackCTAClick('Book Free Consultation', 'hero_section')}
                className="btn-outline inline-flex items-center justify-center w-full sm:w-auto"
              >
                Book Free Consultation
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-8 text-sm text-gray-600 px-4 lg:px-0 w-full">
              <div className="flex items-center space-x-2">
                <Star className="w-4 h-4 text-spiritual-500 fill-current flex-shrink-0" />
                <span>10+ Years Experience</span>
              </div>
              <div className="flex items-center space-x-2">
                <Heart className="w-4 h-4 text-primary-500 fill-current flex-shrink-0" />
                <span>500+ Lives Transformed</span>
              </div>
              <div className="flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-healing-500 flex-shrink-0" />
                <span>Certified Professional</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Visual Element */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative">
              {/* Main Image Placeholder */}
              <div className="relative w-full h-96 md:h-[500px] bg-gradient-to-br from-primary-100 via-spiritual-100 to-healing-100 rounded-2xl shadow-2xl overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-32 h-32 bg-spiritual-gradient rounded-full flex items-center justify-center mx-auto mb-6">
                      <Sparkles className="w-16 h-16 text-white" />
                    </div>
                    <h3 className="text-2xl font-serif font-bold text-gray-800 mb-2">
                      Gladys Schmanski
                    </h3>
                    <p className="text-gray-600">Spiritual Recovery Coach</p>
                  </div>
                </div>

                {/* Simple Location Badge */}
                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
                  <div className="text-center">
                    <div className="text-lg font-bold text-primary-600">
                      Orlando, FL
                    </div>
                    <div className="text-xs text-gray-600">
                      Serving Central Florida
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
