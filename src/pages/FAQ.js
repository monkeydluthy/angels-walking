import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ChevronDown,
  ChevronUp,
  MessageCircle,
  ArrowRight,
} from 'lucide-react';
import PageMeta from '../components/PageMeta';

const FAQ = () => {
  const [openItems, setOpenItems] = useState(new Set());

  const toggleItem = (index) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(index)) {
      newOpenItems.delete(index);
    } else {
      newOpenItems.add(index);
    }
    setOpenItems(newOpenItems);
  };

  const faqs = [
    {
      question: 'What is spiritual recovery coaching?',
      answer:
        'Spiritual recovery coaching is a holistic approach to personal transformation that combines traditional coaching techniques with spiritual guidance. It helps you address the root causes of your challenges, dispel negative thinking, and connect with your higher self to achieve lasting change and inner peace.',
    },
    {
      question: 'How is this different from regular therapy?',
      answer:
        "While therapy often focuses on past experiences and mental health diagnosis, spiritual recovery coaching is forward-focused and action-oriented. It emphasizes your spiritual growth, personal empowerment, and practical tools for transformation. It's complementary to therapy but serves a different purpose.",
    },
    {
      question: 'What happens during a session?',
      answer:
        'Sessions typically begin with a check-in about your current situation and goals. We then work through specific challenges using spiritual guidance, practical tools, and personalized strategies. Each session includes actionable steps you can implement immediately in your daily life.',
    },
    {
      question: 'How long does it take to see results?',
      answer:
        'Many clients experience immediate shifts in perspective and begin implementing positive changes after their first session. However, lasting transformation typically occurs over 3-6 months of consistent work and practice. The timeline varies based on your specific goals and commitment level.',
    },
    {
      question: 'Are sessions conducted virtually?',
      answer:
        'Yes! All sessions are conducted virtually via Zoom or phone, making spiritual recovery coaching accessible to clients worldwide. Virtual sessions are just as effective as in-person sessions and offer the convenience of participating from the comfort of your own space.',
    },
    {
      question: "What if I'm not satisfied with my session?",
      answer:
        "I offer a satisfaction guarantee. If you're not completely satisfied with your first session, I'll provide a full refund or reschedule at no additional cost. Your transformation and satisfaction are my top priorities.",
    },
    {
      question: 'Do you work with people dealing with addiction?',
      answer:
        'Yes, I provide holistic addiction recovery support that combines spiritual guidance with practical recovery tools. However, this is complementary to professional medical treatment and should not replace medical care for addiction. I work alongside your healthcare providers.',
    },
    {
      question: 'What qualifications do you have?',
      answer:
        'I am a certified life coach with specialized training in spiritual recovery and angel card reading. I have over 10 years of experience helping clients transform their lives and have worked with hundreds of people on their spiritual recovery journeys.',
    },
    {
      question: 'How do I know if spiritual recovery coaching is right for me?',
      answer:
        "If you're feeling stuck, overwhelmed, or disconnected from your true self, spiritual recovery coaching might be perfect for you. Take our free self-care quiz to get personalized recommendations, or schedule a free consultation to discuss your specific needs and goals.",
    },
    {
      question: 'Can I combine different services?',
      answer:
        'Absolutely! Many clients benefit from a combination of services. For example, you might start with spiritual recovery coaching and add angel card readings for additional guidance. I can help you create a personalized program that addresses all aspects of your transformation journey.',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-spiritual-50 pt-16">
      <PageMeta
        title="FAQ"
        description="Frequently asked questions about spiritual recovery coaching, angel card reading, sessions, and life coaching. Orlando, FL and virtual."
      />
      <div className="container-custom py-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="w-20 h-20 bg-spiritual-gradient rounded-full flex items-center justify-center mx-auto mb-6">
            <MessageCircle className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6">
            Frequently Asked <span className="text-gradient">Questions</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Find answers to common questions about spiritual recovery coaching,
            angel card readings, and how we can work together to transform your
            life.
          </p>
        </motion.div>

        {/* FAQ Section */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => toggleItem(index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-inset rounded-xl"
                  aria-expanded={openItems.has(index)}
                  aria-controls={`faq-answer-${index}`}
                  id={`faq-question-${index}`}
                  aria-label={openItems.has(index) ? `Collapse: ${faq.question}` : `Expand: ${faq.question}`}
                >
                  <h3 className="text-lg font-semibold text-gray-900 pr-4">
                    {faq.question}
                  </h3>
                  {openItems.has(index) ? (
                    <ChevronUp className="w-5 h-5 text-primary-600 flex-shrink-0" aria-hidden />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-primary-600 flex-shrink-0" aria-hidden />
                  )}
                </button>
                {openItems.has(index) && (
                  <motion.div
                    id={`faq-answer-${index}`}
                    role="region"
                    aria-labelledby={`faq-question-${index}`}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="px-6 pb-4"
                  >
                    <p className="text-gray-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-primary-600 to-spiritual-600 rounded-xl p-8 text-white">
            <h2 className="text-3xl font-serif font-bold mb-6">
              Still Have Questions?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              I'm here to help! Schedule a free consultation to discuss your
              specific needs and get personalized answers to your questions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="bg-white text-primary-600 hover:bg-gray-100 font-semibold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl inline-flex items-center justify-center"
              >
                Schedule Free Consultation
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
              <Link
                to="/self-care-quiz"
                className="border-2 border-white text-white hover:bg-white hover:text-primary-600 font-semibold py-4 px-8 rounded-lg transition-all duration-300 inline-flex items-center justify-center"
              >
                Take Self-Care Quiz
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default FAQ;
