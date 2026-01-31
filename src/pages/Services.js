import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Heart,
  Sparkles,
  Shield,
  Star,
  ArrowRight,
  CheckCircle,
  Award,
  Target,
} from 'lucide-react';
import PageMeta from '../components/PageMeta';

const Services = () => {
  const services = [
    {
      icon: Heart,
      title: 'Spiritual Recovery Coaching',
      description:
        'Transform your life through spiritual recovery coaching that addresses the root causes of your challenges and guides you toward lasting transformation.',
      duration: '60 minutes',
      features: [
        'Personal transformation guidance',
        'Spiritual awakening support',
        'Inner peace development',
        'Life purpose discovery',
        'Negative thinking elimination',
        'Self-esteem building',
      ],
      path: '/spiritual-recovery',
      color: 'primary',
    },
    {
      icon: Sparkles,
      title: 'Angel Card Reading',
      description:
        'Receive divine messages and clarity through professional angel card readings. Get guidance on your life path and answers to your most pressing questions.',
      duration: '45 minutes',
      features: [
        'Divine guidance and messages',
        'Life path clarity',
        'Spiritual insights',
        'Personal guidance',
        'Future direction',
        'Inner wisdom connection',
      ],
      path: '/angel-card-reading',
      color: 'spiritual',
    },
    {
      icon: Shield,
      title: 'Addiction Recovery Support',
      description:
        'Holistic approach to overcoming addiction with spiritual guidance and practical tools. Break free from destructive patterns and create lasting change.',
      duration: '90 minutes',
      features: [
        'Holistic healing approach',
        'Behavioral change support',
        'Spiritual guidance',
        'Recovery tools and techniques',
        'Relapse prevention',
        'Life rebuilding strategies',
      ],
      path: '/addiction-recovery',
      color: 'healing',
    },
    {
      icon: Star,
      title: 'Life Coaching',
      description:
        'Achieve personal growth and expansion of spiritual consciousness while eliminating negative thinking to reach your highest possibility.',
      duration: '60 minutes',
      features: [
        'Personal growth guidance',
        'Goal achievement support',
        'Mindset transformation',
        'Life balance coaching',
        'Career and purpose alignment',
        'Relationship improvement',
      ],
      path: '/life-coaching',
      color: 'primary',
    },
  ];

  const getColorClasses = (color) => {
    const colorMap = {
      primary: {
        bg: 'bg-primary-50',
        text: 'text-primary-600',
        border: 'border-primary-200',
        gradient: 'from-primary-600 to-primary-700',
      },
      spiritual: {
        bg: 'bg-spiritual-50',
        text: 'text-spiritual-600',
        border: 'border-spiritual-200',
        gradient: 'from-spiritual-600 to-spiritual-700',
      },
      healing: {
        bg: 'bg-healing-50',
        text: 'text-healing-600',
        border: 'border-healing-200',
        gradient: 'from-healing-600 to-healing-700',
      },
    };
    return colorMap[color] || colorMap.primary;
  };

  const benefits = [
    {
      icon: Target,
      title: '500+ Lives Transformed',
      description:
        'Proven track record of helping clients achieve lasting change',
    },
    {
      icon: Award,
      title: '10+ Years Experience',
      description: 'Decades of expertise in spiritual recovery and coaching',
    },
    {
      icon: CheckCircle,
      title: 'Certified Professional',
      description: 'Fully certified and trained in all offered services',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-spiritual-50 pt-16">
      <PageMeta
        title="Services"
        description="Spiritual recovery coaching, angel card reading, addiction recovery support, and life coaching. Personalized programs in Orlando, FL and virtually."
      />
      <div className="container-custom py-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="w-20 h-20 bg-spiritual-gradient rounded-full flex items-center justify-center mx-auto mb-6">
            <Star className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6">
            Spiritual Recovery <span className="text-gradient">Services</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover personalized spiritual recovery programs designed to help
            you transform your life, overcome challenges, and step into your
            highest possibility.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          {services.map((service, index) => {
            const colors = getColorClasses(service.color);
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden card-hover"
              >
                <div className={`p-10 ${colors.bg} border-b ${colors.border}`}>
                  <div className="flex items-start space-x-6 mb-6">
                    <div
                      className={`w-16 h-16 ${colors.bg} rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg`}
                    >
                      <service.icon className={`w-8 h-8 ${colors.text}`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-serif font-bold text-gray-900 mb-3">
                        {service.title}
                      </h3>
                      <div className="flex items-center space-x-4">
                        <span className="text-sm font-medium text-gray-600 bg-white/50 px-3 py-1 rounded-full">
                          {service.duration}
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600 leading-relaxed text-lg">
                    {service.description}
                  </p>
                </div>

                <div className="p-10">
                  <h4 className="font-semibold text-gray-900 mb-6 text-lg">
                    What's Included:
                  </h4>
                  <ul className="space-y-4 mb-8">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-600 leading-relaxed">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    to={service.path}
                    className={`inline-flex items-center ${colors.text} font-semibold hover:underline transition-colors duration-200 text-lg`}
                  >
                    Learn More
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Benefits Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-16"
        >
          <div className="bg-white rounded-xl p-8 shadow-lg">
            <h2 className="text-3xl font-serif font-bold text-gray-900 mb-8 text-center">
              Why Choose <span className="text-gradient">Angels Walking</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-spiritual-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl border-4 border-white">
                    <benefit.icon className="w-10 h-10 text-white drop-shadow-lg" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {benefit.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-primary-600 to-spiritual-600 rounded-xl p-8 text-white">
            <h2 className="text-3xl font-serif font-bold mb-6">
              Not Sure Which Service Is Right For You?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Take our free self-care quiz to discover personalized
              recommendations for your spiritual recovery journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/self-care-quiz"
                className="bg-white text-primary-600 hover:bg-gray-100 font-semibold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl inline-flex items-center justify-center"
              >
                Take Free Quiz
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
              <Link
                to="/contact"
                className="border-2 border-white text-white hover:bg-white hover:text-primary-600 font-semibold py-4 px-8 rounded-lg transition-all duration-300 inline-flex items-center justify-center"
              >
                Schedule Consultation
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Services;
