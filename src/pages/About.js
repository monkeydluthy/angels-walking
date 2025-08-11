import React from 'react';
import { motion } from 'framer-motion';
import {
  Heart,
  Star,
  Award,
  Sparkles,
  ArrowRight,
  Users,
  Clock,
  Target,
} from 'lucide-react';
import { Link } from 'react-router-dom';

const About = () => {
  const credentials = [
    {
      icon: Award,
      title: 'Certified Life Coach',
      description:
        'Professional certification in life coaching and spiritual guidance',
    },
    {
      icon: Star,
      title: 'Angel Card Reader',
      description: 'Experienced in divine guidance and spiritual communication',
    },
    {
      icon: Heart,
      title: 'Spiritual Recovery Specialist',
      description:
        'Specialized training in addiction recovery and spiritual healing',
    },
  ];

  const values = [
    {
      icon: Heart,
      title: 'Compassion',
      description:
        "I approach every client with deep empathy and understanding, recognizing that each person's journey is unique and sacred.",
    },
    {
      icon: Star,
      title: 'Authenticity',
      description:
        'I believe in being genuine and transparent, sharing my own experiences and growth to inspire others on their path.',
    },
    {
      icon: Sparkles,
      title: 'Transformation',
      description:
        'I am committed to helping clients achieve lasting change and discover their highest possibility through spiritual recovery.',
    },
    {
      icon: Target,
      title: 'Purpose',
      description:
        'I guide clients to find their life purpose and create meaningful, fulfilling lives aligned with their spiritual values.',
    },
  ];

  const stats = [
    { icon: Users, number: '500+', label: 'Lives Transformed' },
    { icon: Clock, number: '10+', label: 'Years Experience' },
    { icon: Award, number: '100%', label: 'Certified Professional' },
    { icon: Heart, number: '24/7', label: 'Support Available' },
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
            <Heart className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6">
            My Story of <span className="text-gradient">Transformation</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From personal struggle to spiritual awakening, discover how my
            journey led me to help others find healing, hope, and their highest
            possibility.
          </p>
        </motion.div>

        {/* Personal Story */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative">
              <div className="w-full h-96 md:h-[500px] bg-gradient-to-br from-primary-100 via-spiritual-100 to-healing-100 rounded-2xl shadow-2xl overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-32 h-32 bg-spiritual-gradient rounded-full flex items-center justify-center mx-auto mb-6">
                      <Sparkles className="w-16 h-16 text-white" />
                    </div>
                    <h3 className="text-2xl font-serif font-bold text-gray-800 mb-2">
                      Gladys Schmanski
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Spiritual Recovery Coach
                    </p>
                    <p className="text-sm text-gray-500 max-w-xs mx-auto">
                      "Where there is healing, there is hope"
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <h2 className="text-3xl font-serif font-bold text-gray-900 mb-6">
              My Mission is to Empower You to{' '}
              <span className="text-gradient">Love the Life You're In</span>
            </h2>

            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                I'm Gladys Schmanski, a certified life coach and angel card
                reader who has dedicated my life to helping others find healing,
                hope, and their highest possibility. My journey began with my
                own struggles and spiritual awakening, which led me to discover
                the transformative power of spiritual recovery coaching.
              </p>

              <p>
                After experiencing the profound impact of spiritual guidance in
                my own life, I felt called to help others who were struggling
                with similar challenges. I became certified as a life coach and
                developed my skills in angel card reading, combining traditional
                coaching techniques with spiritual wisdom.
              </p>

              <p>
                Today, I specialize in helping clients dispel negativity from
                their thinking, increase self-esteem, and promote peacefulness,
                joy, and happiness. My approach is gentle yet powerful,
                recognizing that each person's journey is unique and sacred.
              </p>
            </div>

            <div className="pt-4 text-center">
              <Link
                to="/contact"
                className="btn-primary inline-flex items-center"
              >
                Schedule a Consultation
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Credentials */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-serif font-bold text-gray-900 mb-8 text-center">
            My <span className="text-gradient">Credentials</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {credentials.map((credential, index) => (
              <motion.div
                key={credential.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-lg text-center card-hover"
              >
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <credential.icon className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {credential.title}
                </h3>
                <p className="text-gray-600">{credential.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-16"
        >
          <div className="bg-white rounded-xl p-8 shadow-lg">
            <h2 className="text-3xl font-serif font-bold text-gray-900 mb-8 text-center">
              Impact & <span className="text-gradient">Experience</span>
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 bg-spiritual-gradient rounded-full flex items-center justify-center">
                      <stat.icon className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <h3 className="text-3xl md:text-4xl font-bold text-primary-600 mb-2">
                    {stat.number}
                  </h3>
                  <p className="text-gray-600 font-medium">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Values */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-serif font-bold text-gray-900 mb-8 text-center">
            My <span className="text-gradient">Values</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-lg"
              >
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <value.icon className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {value.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Philosophy */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="bg-gradient-to-r from-primary-600 to-spiritual-600 rounded-xl p-8 text-white text-center"
        >
          <h2 className="text-3xl font-serif font-bold mb-6">My Philosophy</h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            "I believe that every person has the power to transform their life.
            You don't need fixing - you need help to appreciate and prioritize
            yourself. Through spiritual recovery coaching, I guide you to see
            what's hidden within and connect with your higher self. Where there
            is healing, there is hope."
          </p>
          <div className="mt-8">
            <p className="text-lg font-semibold">- Gladys Schmanski</p>
            <p className="text-white/80">Spiritual Recovery Coach</p>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="text-center mt-16"
        >
          <h2 className="text-3xl font-serif font-bold text-gray-900 mb-6">
            Ready to Start Your{' '}
            <span className="text-gradient">Transformation</span>?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Let's work together to dispel negativity, increase your self-esteem,
            and help you find peace, joy, and happiness.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/self-care-quiz"
              className="btn-primary inline-flex items-center"
            >
              Take Self-Care Quiz
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
            <Link to="/contact" className="btn-outline">
              Book Free Consultation
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
