import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Star,
  ArrowRight,
  Heart,
  Shield,
  Clock,
  CheckCircle,
  Target,
  Award,
  Zap,
} from 'lucide-react';

const LifeCoaching = () => {
  const benefits = [
    'Achieve personal growth and spiritual consciousness expansion',
    'Eliminate negative thinking patterns and limiting beliefs',
    'Discover your life purpose and highest possibility',
    'Develop clarity and direction for your life path',
    'Build confidence and self-empowerment',
    'Create actionable goals and strategies for success',
    'Overcome obstacles and challenges with spiritual guidance',
    'Transform your mindset and create lasting positive change',
  ];

  const approach = [
    {
      icon: Target,
      title: 'Goal-Oriented',
      description:
        'Clear, actionable strategies to help you achieve your dreams and reach your highest potential.',
    },
    {
      icon: Heart,
      title: 'Spiritually Grounded',
      description:
        'Integrating spiritual wisdom with practical life skills for holistic transformation.',
    },
    {
      icon: Zap,
      title: 'Transformational',
      description:
        'Deep, lasting change that goes beyond surface-level improvements to create real transformation.',
    },
    {
      icon: Shield,
      title: 'Supportive',
      description:
        'Loving guidance and accountability to help you stay on track and overcome challenges.',
    },
  ];

  const process = [
    {
      step: '1',
      title: 'Discovery & Vision',
      description:
        'We explore your current situation, dreams, and create a clear vision for your ideal life.',
    },
    {
      step: '2',
      title: 'Goal Setting',
      description:
        'Breaking down your vision into specific, achievable goals with clear action steps.',
    },
    {
      step: '3',
      title: 'Transformation',
      description:
        'Working through limiting beliefs and implementing strategies for lasting change.',
    },
    {
      step: '4',
      title: 'Integration & Growth',
      description:
        'Supporting you as you integrate new practices and continue growing toward your highest self.',
    },
  ];

  const testimonials = [
    {
      name: 'Amanda P.',
      location: 'Orlando, FL',
      text: "Gladys helped me discover my true purpose and gave me the tools to eliminate negative thinking. I've never felt more confident and clear about my direction.",
      rating: 5,
    },
    {
      name: 'James L.',
      location: 'Tampa, FL',
      text: "The spiritual approach to life coaching was exactly what I needed. I've achieved more in 6 months than I did in years of traditional coaching.",
      rating: 5,
    },
    {
      name: 'Rachel M.',
      location: 'Miami, FL',
      text: 'Gladys showed me how to connect with my higher self and use that wisdom to make better decisions. My life has completely transformed.',
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-spiritual-50 pt-16">
      <div className="container-custom py-16">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="w-20 h-20 bg-spiritual-gradient rounded-full flex items-center justify-center mx-auto mb-6">
            <Star className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6">
            Life <span className="text-gradient">Coaching</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Achieve personal growth and expansion of spiritual consciousness
            while eliminating negative thinking to reach your highest
            possibility.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="btn-primary inline-flex items-center justify-center"
            >
              Start Coaching
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
            <Link
              to="/services"
              className="btn-outline inline-flex items-center justify-center"
            >
              View All Services
            </Link>
          </div>
        </motion.div>

        {/* What is Life Coaching */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-16"
        >
          <div className="bg-white rounded-xl p-8 shadow-lg">
            <h2 className="text-3xl font-serif font-bold text-gray-900 mb-8 text-center">
              What is Spiritual Life{' '}
              <span className="text-gradient">Coaching</span>?
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  Spiritual life coaching combines traditional coaching
                  techniques with spiritual wisdom to help you achieve your
                  highest potential. Unlike conventional coaching that focuses
                  solely on external goals, spiritual life coaching addresses
                  the deeper aspects of your being and helps you align with your
                  soul's purpose.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  We work together to eliminate negative thinking patterns,
                  expand your spiritual consciousness, and create a life that
                  reflects your true essence. This approach recognizes that
                  lasting change comes from within and that your highest
                  possibility is already within you, waiting to be discovered.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Through spiritual life coaching, you'll learn to trust your
                  intuition, connect with your higher self, and make decisions
                  that align with your soul's journey. The result is a life
                  filled with purpose, joy, and authentic success.
                </p>
              </div>
              <div className="relative">
                <div className="w-full h-80 bg-gradient-to-br from-primary-100 via-spiritual-100 to-healing-100 rounded-2xl shadow-2xl overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-32 h-32 bg-spiritual-gradient rounded-full flex items-center justify-center mx-auto mb-6">
                        <Star className="w-16 h-16 text-white" />
                      </div>
                      <h3 className="text-2xl font-serif font-bold text-gray-800 mb-2">
                        Your Highest Self
                      </h3>
                      <p className="text-gray-600">
                        Unlock Your Full Potential
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Our Approach */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-serif font-bold text-gray-900 mb-8 text-center">
            Our <span className="text-gradient">Approach</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {approach.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-lg"
              >
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-serif font-bold text-gray-900 mb-8 text-center">
            What You'll <span className="text-gradient">Achieve</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-center space-x-3 bg-white rounded-xl p-6 shadow-lg"
              >
                <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                <span className="text-gray-700 text-lg">{benefit}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Process */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-serif font-bold text-gray-900 mb-8 text-center">
            Your Coaching <span className="text-gradient">Journey</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {process.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-lg text-center"
              >
                <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-lg">
                    {step.step}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* What to Expect */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="mb-16"
        >
          <div className="bg-gradient-to-r from-primary-600 to-spiritual-600 rounded-xl p-8 text-white">
            <h2 className="text-3xl font-serif font-bold mb-6 text-center">
              What to <span className="text-spiritual-200">Expect</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  60-Minute Sessions
                </h3>
                <p className="text-white/90">
                  Focused, productive sessions with actionable insights and
                  strategies
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  Spiritual Guidance
                </h3>
                <p className="text-white/90">
                  Connect with your higher self and receive divine wisdom for
                  your journey
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Proven Results</h3>
                <p className="text-white/90">
                  Transformational approach that creates lasting change and
                  growth
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Testimonials */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-serif font-bold text-gray-900 mb-8 text-center">
            Client <span className="text-gradient">Success</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-lg"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 text-healing-400 fill-current"
                    />
                  ))}
                </div>
                <p className="text-gray-600 mb-4 italic">
                  "{testimonial.text}"
                </p>
                <div>
                  <p className="font-semibold text-gray-900">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    {testimonial.location}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="text-center"
        >
          <h2 className="text-3xl font-serif font-bold text-gray-900 mb-6">
            Ready to Reach Your{' '}
            <span className="text-gradient">Highest Possibility</span>?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Transform your life through spiritual coaching and discover the
            extraordinary person you were meant to be.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="btn-primary inline-flex items-center justify-center"
            >
              Begin Your Journey
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
            <Link
              to="/self-care-quiz"
              className="btn-outline inline-flex items-center justify-center"
            >
              Take Free Assessment
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LifeCoaching;
