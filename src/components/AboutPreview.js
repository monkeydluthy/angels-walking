import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Heart, Star, Award } from 'lucide-react';

const AboutPreview = () => {
  const credentials = [
    { icon: Award, text: 'Certified Life Coach' },
    { icon: Star, text: 'Angel Card Reader' },
    { icon: Heart, text: 'Spiritual Recovery Specialist' },
  ];

  return (
    <section className="section-padding">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative">
              {/* Main Image Placeholder */}
              <div className="relative w-full h-96 md:h-[500px] bg-gradient-to-br from-primary-100 via-spiritual-100 to-healing-100 rounded-2xl shadow-2xl overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-32 h-32 bg-spiritual-gradient rounded-full flex items-center justify-center mx-auto mb-6">
                      <Heart className="w-16 h-16 text-white" />
                    </div>
                    <h3 className="text-2xl font-serif font-bold text-gray-800 mb-2">
                      Gladys Schmanski
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Spiritual Recovery Coach
                    </p>
                    <div className="flex justify-center space-x-4">
                      {credentials.map((credential, index) => (
                        <div key={index} className="text-center">
                          <div className="w-8 h-8 bg-white/80 rounded-full flex items-center justify-center mx-auto mb-2">
                            <credential.icon className="w-4 h-4 text-primary-600" />
                          </div>
                          <p className="text-xs text-gray-600">
                            {credential.text}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="absolute -top-4 -right-4 bg-white rounded-lg p-4 shadow-xl"
              >
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary-600">10+</div>
                  <div className="text-xs text-gray-600">Years Experience</div>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="absolute -bottom-4 -left-4 bg-white rounded-lg p-4 shadow-xl"
              >
                <div className="text-center">
                  <div className="text-2xl font-bold text-spiritual-600">
                    500+
                  </div>
                  <div className="text-xs text-gray-600">Lives Transformed</div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <div>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6">
                My Mission is to Empower You to{' '}
                <span className="text-gradient">Love the Life You're In</span>
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed mb-6">
                I'm Gladys Schmanski, a certified life coach and angel card
                reader specializing in helping others dispel negativity from
                their thinking, increase self-esteem, and promote peacefulness,
                joy, and happiness.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Heart className="w-4 h-4 text-primary-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Personal Transformation
                  </h3>
                  <p className="text-gray-600">
                    I help you achieve personal growth and expansion of
                    spiritual consciousness while working on eliminating
                    negative thinking to achieve your highest possibility.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-spiritual-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Star className="w-4 h-4 text-spiritual-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Spiritual Guidance
                  </h3>
                  <p className="text-gray-600">
                    Through angel card readings and spiritual recovery coaching,
                    I guide you to see what's hidden within and connect with
                    your higher self.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-healing-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Award className="w-4 h-4 text-healing-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Certified Professional
                  </h3>
                  <p className="text-gray-600">
                    As a certified life coach, I'm equipped with the tools and
                    techniques to help you create lasting change and find
                    balance in your life.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <Link
                to="/about"
                className="btn-primary inline-flex items-center"
              >
                Read My Full Story
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutPreview;
