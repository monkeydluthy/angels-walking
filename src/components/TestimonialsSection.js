import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: 'Sarah M.',
      location: 'Orlando, FL',
      service: 'Spiritual Recovery Coaching',
      rating: 5,
      text: "Working with Gladys has completely transformed my life! I was struggling with negative thinking and low self-esteem for years. Through her spiritual recovery coaching, I've learned to love myself and find inner peace. Her guidance is truly life-changing.",
      avatar: 'SM',
    },
    {
      name: 'Michael R.',
      location: 'Tampa, FL',
      service: 'Addiction Recovery Support',
      rating: 5,
      text: "Gladys helped me break free from destructive patterns that were holding me back. Her holistic approach to addiction recovery combines spiritual guidance with practical tools. I'm now 2 years sober and living my best life.",
      avatar: 'MR',
    },
    {
      name: 'Jennifer L.',
      location: 'Miami, FL',
      service: 'Angel Card Reading',
      rating: 5,
      text: 'The angel card reading with Gladys was incredibly insightful and accurate. She helped me find clarity about my life path and gave me the guidance I needed to make important decisions. I highly recommend her services.',
      avatar: 'JL',
    },
    {
      name: 'David K.',
      location: 'Jacksonville, FL',
      service: 'Life Coaching',
      rating: 5,
      text: 'Gladys is an amazing life coach who truly cares about her clients. She helped me identify my limiting beliefs and develop a clear vision for my future. Her coaching has been instrumental in my personal and professional growth.',
      avatar: 'DK',
    },
    {
      name: 'Lisa T.',
      location: 'Gainesville, FL',
      service: 'Spiritual Recovery Coaching',
      rating: 5,
      text: "I was skeptical about spiritual coaching at first, but Gladys made me a believer. Her approach is gentle yet powerful, and she has a unique ability to help you see what's hidden within. My life has never been better.",
      avatar: 'LT',
    },
    {
      name: 'Robert W.',
      location: 'Fort Lauderdale, FL',
      service: 'Addiction Recovery Support',
      rating: 5,
      text: "Gladys helped me understand that I wasn't broken, just in need of healing. Her spiritual approach to addiction recovery has given me tools I use every day. I'm grateful for her guidance and support.",
      avatar: 'RW',
    },
  ];

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? 'text-spiritual-500 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <section className="section-padding bg-gradient-to-br from-primary-50 to-spiritual-50">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6">
            What My Clients <span className="text-gradient">Say</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Real stories from real people who have transformed their lives
            through spiritual recovery coaching and angel card guidance.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-xl p-6 shadow-lg card-hover"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-spiritual-gradient rounded-full flex items-center justify-center text-white font-semibold">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-gray-500">
                      {testimonial.location}
                    </p>
                  </div>
                </div>
                <Quote className="w-6 h-6 text-primary-300" />
              </div>

              <div className="flex items-center mb-4">
                {renderStars(testimonial.rating)}
                <span className="ml-2 text-sm text-gray-600">
                  ({testimonial.rating}.0)
                </span>
              </div>

              <p className="text-gray-600 leading-relaxed mb-4">
                "{testimonial.text}"
              </p>

              <div className="text-sm text-primary-600 font-medium">
                {testimonial.service}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Overall Rating */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center mt-16"
        >
          <div className="bg-white rounded-xl p-8 shadow-lg max-w-2xl mx-auto">
            <div className="flex items-center justify-center space-x-2 mb-4">
              {renderStars(5)}
              <span className="text-2xl font-bold text-gray-900 ml-2">5.0</span>
            </div>
            <h3 className="text-2xl font-serif font-bold text-gray-900 mb-2">
              Average Client Rating
            </h3>
            <p className="text-gray-600 mb-6">
              Based on 500+ client sessions and spiritual recovery coaching
              experiences
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-primary">Read All Reviews</button>
              <button className="btn-outline">Leave a Review</button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
