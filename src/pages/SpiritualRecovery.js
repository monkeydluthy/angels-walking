import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Heart,
  Star,
  ArrowRight,
  CheckCircle,
  Clock,
  Users,
  Target,
} from 'lucide-react';
import PageMeta from '../components/PageMeta';

const SpiritualRecovery = () => {
  const benefits = [
    'Transform negative thinking patterns',
    'Develop inner peace and calm',
    'Discover your life purpose',
    'Build unshakeable self-esteem',
    'Connect with your spiritual self',
    'Create lasting positive change',
  ];

  const process = [
    {
      step: 1,
      title: 'Initial Assessment',
      description:
        'We begin with a comprehensive assessment of your current situation, challenges, and spiritual recovery goals.',
    },
    {
      step: 2,
      title: 'Personalized Plan',
      description:
        'I create a customized spiritual recovery plan tailored to your unique needs and transformation goals.',
    },
    {
      step: 3,
      title: 'Guided Transformation',
      description:
        'Through regular sessions, I guide you through your spiritual recovery journey with practical tools and techniques.',
    },
    {
      step: 4,
      title: 'Ongoing Support',
      description:
        'Receive continuous support and guidance as you implement positive changes and maintain your transformation.',
    },
  ];

  const testimonials = [
    {
      name: 'Sarah M.',
      text: 'Spiritual recovery coaching with Gladys completely transformed my life. I went from constant negative thinking to finding inner peace and purpose.',
      rating: 5,
    },
    {
      name: 'Michael R.',
      text: "The spiritual recovery process helped me break free from destructive patterns and discover my true potential. I'm now living a life I love.",
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-spiritual-50 pt-16">
      <PageMeta
        title="Spiritual Recovery Coaching"
        description="Transform your life through spiritual recovery coaching. Address root causes, develop inner peace, and connect with your higher self. Orlando, FL and virtual."
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
            Spiritual Recovery <span className="text-gradient">Coaching</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Transform your life through spiritual recovery coaching that
            addresses the root causes of your challenges and guides you toward
            lasting transformation and inner peace.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="btn-primary inline-flex items-center justify-center"
            >
              Book Your Session
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

        {/* What You'll Experience */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-16"
        >
          <div className="bg-white rounded-xl p-8 shadow-lg">
            <h2 className="text-3xl font-serif font-bold text-gray-900 mb-8 text-center">
              What You'll <span className="text-gradient">Experience</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-center space-x-3"
                >
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700 text-lg">{benefit}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Process */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-serif font-bold text-gray-900 mb-8 text-center">
            Your <span className="text-gradient">Transformation</span> Process
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

        {/* Pricing & Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-16"
        >
          <div className="bg-gradient-to-r from-primary-600 to-spiritual-600 rounded-xl p-8 text-white">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-serif font-bold mb-6">
                  Investment in Your{' '}
                  <span className="text-spiritual-200">Transformation</span>
                </h2>
                <div className="space-y-4 mb-6">
                  <div className="flex items-center space-x-3">
                    <Clock className="w-5 h-5" />
                    <span>60-minute sessions</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Users className="w-5 h-5" />
                    <span>One-on-one coaching</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Target className="w-5 h-5" />
                    <span>Personalized approach</span>
                  </div>
                </div>
              </div>
              <div className="text-center">
                <Link
                  to="/contact"
                  className="bg-white text-primary-600 hover:bg-gray-100 font-semibold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl inline-flex items-center"
                >
                  Book Your Session
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Testimonials */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-serif font-bold text-gray-900 mb-8 text-center">
            Client <span className="text-gradient">Success Stories</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
                      className="w-5 h-5 text-spiritual-500 fill-current"
                    />
                  ))}
                </div>
                <p className="text-gray-600 mb-4 italic">
                  "{testimonial.text}"
                </p>
                <p className="font-semibold text-gray-900">
                  - {testimonial.name}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="text-center"
        >
          <div className="bg-white rounded-xl p-8 shadow-lg">
            <h2 className="text-3xl font-serif font-bold text-gray-900 mb-6">
              Ready to Start Your{' '}
              <span className="text-gradient">Spiritual Recovery</span>?
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Take the first step toward transformation and discover the peace,
              purpose, and joy that await you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="btn-primary inline-flex items-center"
              >
                Book Free Consultation
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
              <Link to="/self-care-quiz" className="btn-outline">
                Take Self-Care Quiz
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SpiritualRecovery;
