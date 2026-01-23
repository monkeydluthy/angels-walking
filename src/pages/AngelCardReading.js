import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  Star,
  ArrowRight,
  Heart,
  Shield,
  Clock,
  CheckCircle,
} from 'lucide-react';

const AngelCardReading = () => {
  const benefits = [
    'Receive divine guidance and clarity on life decisions',
    'Connect with your guardian angels and spiritual guides',
    'Gain insights into your life purpose and soul mission',
    'Find answers to your most pressing questions',
    'Experience deep emotional healing and comfort',
    'Discover hidden opportunities and possibilities',
    'Release fears and limiting beliefs',
    'Strengthen your spiritual connection and intuition',
  ];

  const process = [
    {
      step: '1',
      title: 'Sacred Preparation',
      description:
        'We begin with a moment of prayer and intention setting to create a sacred space for divine communication.',
    },
    {
      step: '2',
      title: 'Card Selection',
      description:
        "You'll be guided to select cards that resonate with your energy and current situation.",
    },
    {
      step: '3',
      title: 'Divine Interpretation',
      description:
        'I interpret the messages from your angels, providing clarity and guidance for your journey.',
    },
    {
      step: '4',
      title: 'Integration',
      description:
        'We discuss how to apply the guidance in your daily life and create an action plan.',
    },
  ];

  const testimonials = [
    {
      name: 'Sarah M.',
      location: 'Orlando, FL',
      text: 'The angel card reading was incredibly accurate and gave me the clarity I needed to make a major life decision. I felt so supported and guided.',
      rating: 5,
    },
    {
      name: 'Michael R.',
      location: 'Tampa, FL',
      text: 'Gladys has a true gift for connecting with the divine. Her reading helped me understand my life purpose and gave me the courage to pursue my dreams.',
      rating: 5,
    },
    {
      name: 'Jennifer L.',
      location: 'Miami, FL',
      text: 'I was going through a difficult time and the angel cards provided such comfort and hope. The messages were exactly what I needed to hear.',
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
            <Sparkles className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6">
            Angel Card <span className="text-gradient">Reading</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Receive divine messages and clarity through professional angel card
            readings. Get guidance on your life path and answers to your most
            pressing questions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="btn-primary inline-flex items-center justify-center"
            >
              Book Your Reading
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

        {/* What is Angel Card Reading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-16"
        >
          <div className="bg-white rounded-xl p-8 shadow-lg">
            <h2 className="text-3xl font-serif font-bold text-gray-900 mb-8 text-center">
              What is Angel Card <span className="text-gradient">Reading</span>?
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  Angel card reading is a sacred practice that connects you with
                  your guardian angels and spiritual guides. Through the use of
                  specially designed oracle cards, I act as a bridge between the
                  physical and spiritual realms to bring you messages of love,
                  guidance, and support.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  Unlike traditional tarot, angel cards focus on positive
                  messages and divine guidance. They help you understand your
                  life purpose, make important decisions, and receive comfort
                  during challenging times. Each reading is unique and tailored
                  to your specific needs and questions.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  The cards are tools that help amplify your own intuition and
                  connect you with the wisdom of your higher self. They provide
                  clarity, hope, and direction when you need it most.
                </p>
              </div>
              <div className="relative">
                <div className="w-full h-80 bg-gradient-to-br from-primary-100 via-spiritual-100 to-healing-100 rounded-2xl shadow-2xl overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-32 h-32 bg-spiritual-gradient rounded-full flex items-center justify-center mx-auto mb-6">
                        <Sparkles className="w-16 h-16 text-white" />
                      </div>
                      <h3 className="text-2xl font-serif font-bold text-gray-800 mb-2">
                        Divine Guidance
                      </h3>
                      <p className="text-gray-600">Messages from Your Angels</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-serif font-bold text-gray-900 mb-8 text-center">
            What You'll <span className="text-gradient">Receive</span>
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
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-serif font-bold text-gray-900 mb-8 text-center">
            Your Reading <span className="text-gradient">Process</span>
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
          transition={{ duration: 0.8, delay: 0.8 }}
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
                  45-Minute Session
                </h3>
                <p className="text-white/90">
                  Deep, meaningful reading with time for questions and
                  discussion
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Loving Guidance</h3>
                <p className="text-white/90">
                  Messages of love, support, and encouragement from your angels
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Safe Space</h3>
                <p className="text-white/90">
                  Sacred, confidential environment for spiritual exploration
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Testimonials */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-serif font-bold text-gray-900 mb-8 text-center">
            Client <span className="text-gradient">Testimonials</span>
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
          transition={{ duration: 0.8, delay: 1.2 }}
          className="text-center"
        >
          <h2 className="text-3xl font-serif font-bold text-gray-900 mb-6">
            Ready to Receive Your{' '}
            <span className="text-gradient">Divine Guidance</span>?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Connect with your guardian angels and receive the clarity, comfort,
            and guidance you need to navigate your life's journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="btn-primary inline-flex items-center justify-center"
            >
              Book Your Reading
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

export default AngelCardReading;
