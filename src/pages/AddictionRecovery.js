import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Shield,
  ArrowRight,
  Heart,
  Star,
  Clock,
  CheckCircle,
  Target,
  Award,
  Sparkles,
} from 'lucide-react';

const AddictionRecovery = () => {
  const benefits = [
    'Break free from destructive patterns and behaviors',
    'Address the root causes of addiction with spiritual guidance',
    'Develop healthy coping mechanisms and life skills',
    'Build self-esteem and self-worth through spiritual healing',
    'Create lasting change through holistic transformation',
    'Find purpose and meaning beyond addiction',
    'Establish supportive spiritual practices and routines',
    'Connect with your higher self and inner strength',
  ];

  const approach = [
    {
      icon: Heart,
      title: 'Compassionate Support',
      description:
        'Non-judgmental, loving guidance that honors your journey and recognizes your inherent worth.',
    },
    {
      icon: Shield,
      title: 'Spiritual Foundation',
      description:
        'Building a strong spiritual foundation to replace destructive patterns with positive practices.',
    },
    {
      icon: Target,
      title: 'Holistic Healing',
      description:
        'Addressing mind, body, and spirit to create comprehensive, lasting transformation.',
    },
    {
      icon: Sparkles,
      title: 'Personal Growth',
      description:
        'Focusing on your potential and helping you discover your true purpose and gifts.',
    },
  ];

  const process = [
    {
      step: '1',
      title: 'Assessment & Connection',
      description:
        'We begin with a compassionate assessment of your current situation and establish a trusting relationship.',
    },
    {
      step: '2',
      title: 'Spiritual Foundation',
      description:
        'Building spiritual practices and connecting with your higher self to create inner strength.',
    },
    {
      step: '3',
      title: 'Pattern Transformation',
      description:
        'Identifying and transforming destructive patterns through spiritual guidance and practical tools.',
    },
    {
      step: '4',
      title: 'Integration & Growth',
      description:
        'Integrating new practices into daily life and supporting continued spiritual growth and healing.',
    },
  ];

  const testimonials = [
    {
      name: 'David K.',
      location: 'Orlando, FL',
      text: 'Gladys helped me understand that my addiction was masking deeper spiritual pain. Her approach gave me the tools to heal from the inside out.',
      rating: 5,
    },
    {
      name: 'Maria S.',
      location: 'Tampa, FL',
      text: 'After years of struggling, I finally found lasting peace through spiritual recovery. Gladys showed me how to connect with my higher self.',
      rating: 5,
    },
    {
      name: 'Robert T.',
      location: 'Miami, FL',
      text: "The spiritual approach to recovery was exactly what I needed. It wasn't just about stopping the behavior, but about finding my true purpose.",
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
            <Shield className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6">
            Addiction Recovery <span className="text-gradient">Support</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Holistic approach to overcoming addiction with spiritual guidance
            and practical tools. Break free from destructive patterns and create
            lasting change.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="btn-primary inline-flex items-center justify-center"
            >
              Get Support
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

        {/* What is Spiritual Recovery */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-16"
        >
          <div className="bg-white rounded-xl p-8 shadow-lg">
            <h2 className="text-3xl font-serif font-bold text-gray-900 mb-8 text-center">
              What is Spiritual <span className="text-gradient">Recovery</span>?
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  Spiritual recovery is a holistic approach that addresses the
                  root causes of addiction through spiritual healing and
                  personal transformation. Unlike traditional methods that focus
                  solely on behavior modification, spiritual recovery helps you
                  connect with your higher self and discover your true purpose.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  Addiction often stems from a disconnection from our spiritual
                  essence and a search for meaning or comfort in external
                  substances or behaviors. Through spiritual recovery, we work
                  together to heal the underlying wounds, build inner strength,
                  and create a life filled with purpose and joy.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  This approach recognizes that you are not broken or flawed,
                  but rather a beautiful soul who has temporarily lost their
                  way. Together, we'll help you rediscover your inherent worth
                  and create lasting change from the inside out.
                </p>
              </div>
              <div className="relative">
                <div className="w-full h-80 bg-gradient-to-br from-primary-100 via-spiritual-100 to-healing-100 rounded-2xl shadow-2xl overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-32 h-32 bg-spiritual-gradient rounded-full flex items-center justify-center mx-auto mb-6">
                        <Shield className="w-16 h-16 text-white" />
                      </div>
                      <h3 className="text-2xl font-serif font-bold text-gray-800 mb-2">
                        Inner Strength
                      </h3>
                      <p className="text-gray-600">Rediscover Your True Self</p>
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
            Your Recovery <span className="text-gradient">Journey</span>
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
                  90-Minute Sessions
                </h3>
                <p className="text-white/90">
                  Comprehensive sessions with time for deep healing and
                  transformation
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Loving Support</h3>
                <p className="text-white/90">
                  Non-judgmental, compassionate guidance throughout your journey
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Proven Results</h3>
                <p className="text-white/90">
                  Holistic approach that addresses root causes for lasting
                  change
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
            Success <span className="text-gradient">Stories</span>
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
                      className="w-5 h-5 text-yellow-400 fill-current"
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
            Ready to Begin Your{' '}
            <span className="text-gradient">Transformation</span>?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Take the first step toward lasting freedom and discover the peace,
            purpose, and joy that await you beyond addiction.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="btn-primary inline-flex items-center justify-center"
            >
              Start Your Journey
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

export default AddictionRecovery;
