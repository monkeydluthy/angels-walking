import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Sparkles,
  Heart,
  Shield,
  Star,
  Users,
  Clock,
  Award,
} from 'lucide-react';
import HeroSection from '../components/HeroSection';
import ServicesOverview from '../components/ServicesOverview';
import AboutPreview from '../components/AboutPreview';
import TestimonialsSection from '../components/TestimonialsSection';
import CTASection from '../components/CTASection';

const Home = () => {
  const stats = [
    { icon: Users, number: '500+', label: 'Lives Transformed' },
    { icon: Clock, number: '10+', label: 'Years Experience' },
    { icon: Award, number: '100%', label: 'Certified Coach' },
  ];

  const features = [
    {
      icon: Heart,
      title: 'Spiritual Healing',
      description:
        'Connect with your higher self and find inner peace through spiritual recovery coaching.',
    },
    {
      icon: Shield,
      title: 'Addiction Recovery',
      description:
        'Holistic approach to overcoming addiction with spiritual guidance and practical tools.',
    },
    {
      icon: Star,
      title: 'Angel Card Guidance',
      description:
        'Receive divine messages and clarity through professional angel card readings.',
    },
    {
      icon: Sparkles,
      title: 'Life Transformation',
      description:
        'Break free from limiting beliefs and step into your highest possibility.',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection />

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-primary-50 to-spiritual-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="flex justify-center mb-6">
                  <div className="flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary-500 to-spiritual-600 rounded-full shadow-xl border-4 border-white">
                    <stat.icon className="w-10 h-10 text-white drop-shadow-lg" />
                  </div>
                </div>
                <h3 className="text-4xl md:text-5xl font-bold text-primary-600 mb-3">
                  {stat.number}
                </h3>
                <p className="text-gray-700 font-semibold text-lg">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6">
              Where There Is <span className="text-gradient">Healing</span>,
              There Is <span className="text-gradient">Hope</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Transform your life with spiritual recovery coaching that
              addresses the root causes of your challenges and guides you toward
              lasting transformation.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-lg card-hover"
              >
                <div className="flex items-center justify-center w-12 h-12 bg-primary-100 rounded-lg mb-4">
                  <feature.icon className="w-6 h-6 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <ServicesOverview />

      {/* About Preview */}
      <AboutPreview />

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* CTA Section */}
      <CTASection />

      {/* Final CTA */}
      <section className="py-16 bg-white">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-6">
              Ready to Start Your{' '}
              <span className="text-primary-600">Transformation</span>?
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              The future depends on what you do in the present. Take the first
              step toward healing and hope today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/self-care-quiz"
                className="bg-yellow-500 text-gray-900 hover:bg-yellow-400 font-bold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl inline-flex items-center justify-center text-lg"
              >
                Take Self-Care Quiz
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
              <Link
                to="/contact"
                className="text-primary-600 hover:text-primary-700 font-bold py-4 px-8 rounded-lg transition-all duration-300 inline-flex items-center justify-center text-lg"
              >
                Book Your Session
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
