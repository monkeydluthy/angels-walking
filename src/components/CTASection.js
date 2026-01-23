import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Heart, Star, CheckCircle } from 'lucide-react';

const CTASection = () => {
  const benefits = [
    {
      icon: CheckCircle,
      title: 'Personalized Guidance',
      description:
        'Get customized recommendations based on your unique spiritual journey.',
    },
    {
      icon: CheckCircle,
      title: 'Immediate Insights',
      description:
        'Discover three simple actions you can take right now to transform your life.',
    },
    {
      icon: CheckCircle,
      title: 'Free Resources',
      description:
        'Access valuable self-care tools and spiritual guidance at no cost.',
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 via-primary-800 to-spiritual-800 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="container-custom relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 mb-8 border border-white/20"
          >
            <Sparkles className="w-5 h-5 text-healing-400" />
            <span className="text-white font-medium">
              Free Self-Care Assessment
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-6 leading-tight"
          >
            Transform Your Life
            <br />
            <span className="text-healing-400 font-bold">In Just 5 Minutes</span>
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-200 mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            Take our free self-care quiz and receive personalized spiritual
            guidance that will help you dispel negativity, increase self-esteem,
            and find lasting peace and joy.
          </motion.p>

          {/* Benefits */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
          >
            {benefits.map((benefit, index) => (
              <div
                key={benefit.title}
                className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300"
              >
                <div className="w-12 h-12 bg-healing-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <benefit.icon className="w-6 h-6 text-gray-900" />
                </div>
                <h3 className="text-white font-semibold text-lg mb-2">
                  {benefit.title}
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          >
            <Link
              to="/self-care-quiz"
              className="bg-healing-500 text-gray-900 hover:bg-healing-400 font-bold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl inline-flex items-center justify-center text-lg"
            >
              Take Self-Care Quiz
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
            <Link
              to="/contact"
              className="bg-transparent text-white hover:bg-white hover:text-gray-900 font-bold py-4 px-8 rounded-lg transition-all duration-300 border-2 border-white inline-flex items-center justify-center text-lg"
            >
              Book Your Session
            </Link>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 text-gray-300"
          >
            <div className="flex items-center space-x-2">
              <Star className="w-5 h-5 text-healing-400 fill-current" />
              <span className="font-medium">500+ People Helped</span>
            </div>
            <div className="flex items-center space-x-2">
              <Heart className="w-5 h-5 text-red-400 fill-current" />
              <span className="font-medium">100% Free</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-400 fill-current" />
              <span className="font-medium">5 Minutes Only</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
