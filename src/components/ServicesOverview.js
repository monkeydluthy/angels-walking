import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Sparkles, Shield, Star, ArrowRight } from 'lucide-react';

const ServicesOverview = () => {
  const services = [
    {
      icon: Heart,
      title: 'Spiritual Recovery Coaching',
      description:
        'Transform your life through spiritual recovery coaching that addresses the root causes of your challenges. Connect with your higher self and find lasting peace.',
      features: [
        'Personal transformation',
        'Spiritual guidance',
        'Inner peace',
        'Life purpose',
      ],
      path: '/spiritual-recovery',
      color: 'primary',
    },
    {
      icon: Sparkles,
      title: 'Angel Card Reading',
      description:
        'Receive divine messages and clarity through professional angel card readings. Get guidance on your life path and answers to your most pressing questions.',
      features: [
        'Divine guidance',
        'Life clarity',
        'Spiritual messages',
        'Personal insights',
      ],
      path: '/angel-card-reading',
      color: 'spiritual',
    },
    {
      icon: Shield,
      title: 'Addiction Recovery Support',
      description:
        'Holistic approach to overcoming addiction with spiritual guidance and practical tools. Break free from destructive patterns and create lasting change.',
      features: [
        'Holistic healing',
        'Behavioral change',
        'Spiritual support',
        'Recovery tools',
      ],
      path: '/addiction-recovery',
      color: 'healing',
    },
    {
      icon: Star,
      title: 'Life Coaching',
      description:
        'Achieve personal growth and expansion of spiritual consciousness while eliminating negative thinking to reach your highest possibility.',
      features: [
        'Personal growth',
        'Goal achievement',
        'Mindset shift',
        'Life balance',
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
        hover: 'hover:bg-primary-100',
      },
      spiritual: {
        bg: 'bg-spiritual-50',
        text: 'text-spiritual-600',
        border: 'border-spiritual-200',
        hover: 'hover:bg-spiritual-100',
      },
      healing: {
        bg: 'bg-healing-50',
        text: 'text-healing-600',
        border: 'border-healing-200',
        hover: 'hover:bg-healing-100',
      },
    };
    return colorMap[color] || colorMap.primary;
  };

  return (
    <section className="section-padding bg-gray-50">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6">
            Spiritual Recovery Programs{' '}
            <span className="text-gradient">That Work</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover personalized spiritual recovery programs designed to help
            you transform your life, overcome challenges, and step into your
            highest possibility.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => {
            const colors = getColorClasses(service.color);
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden card-hover"
              >
                <div className={`p-8 ${colors.bg} border-b ${colors.border}`}>
                  <div className="flex items-center space-x-4 mb-4">
                    <div
                      className={`w-12 h-12 ${colors.bg} rounded-lg flex items-center justify-center`}
                    >
                      <service.icon className={`w-6 h-6 ${colors.text}`} />
                    </div>
                    <h3 className="text-2xl font-serif font-bold text-gray-900">
                      {service.title}
                    </h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed">
                    {service.description}
                  </p>
                </div>

                <div className="p-8">
                  <h4 className="font-semibold text-gray-900 mb-4">
                    What You'll Experience:
                  </h4>
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center space-x-2">
                        <div
                          className={`w-2 h-2 rounded-full ${colors.bg}`}
                        ></div>
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    to={service.path}
                    className={`inline-flex items-center ${colors.text} font-semibold hover:underline transition-colors duration-200`}
                  >
                    Learn More
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-16"
        >
          <div className="bg-white rounded-xl p-8 shadow-lg">
            <h3 className="text-2xl font-serif font-bold text-gray-900 mb-4">
              Not Sure Which Service Is Right For You?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Take our free self-care quiz to discover personalized
              recommendations for your spiritual recovery journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/self-care-quiz"
                className="btn-primary inline-flex items-center"
              >
                Take Free Quiz
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
              <Link to="/contact" className="btn-outline">
                Schedule Consultation
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesOverview;
