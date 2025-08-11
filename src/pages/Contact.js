import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageCircle,
  Sparkles,
} from 'lucide-react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const contactInfo = [
    {
      icon: Phone,
      title: 'Phone',
      value: '407-782-5048',
      link: 'tel:407-782-5048',
      description: 'Call for immediate assistance',
    },
    {
      icon: Mail,
      title: 'Email',
      value: 'info@angelswalking.com',
      link: 'mailto:info@angelswalking.com',
      description: 'Send us a message anytime',
    },
    {
      icon: MapPin,
      title: 'Location',
      value: 'Orlando, FL 32826',
      link: null,
      description: 'Virtual sessions available worldwide',
    },
    {
      icon: Clock,
      title: 'Hours',
      value: 'Tue-Fri: 10AM-6PM, Sat: 10AM-8PM',
      link: null,
      description: 'EST Time Zone',
    },
  ];

  const services = [
    {
      name: 'Spiritual Recovery Coaching',
      duration: '60 minutes',
      description: 'Personalized spiritual recovery session',
    },
    {
      name: 'Angel Card Reading',
      duration: '45 minutes',
      description: 'Divine guidance and clarity',
    },
    {
      name: 'Addiction Recovery Support',
      duration: '90 minutes',
      description: 'Holistic recovery coaching',
    },
    {
      name: 'Life Coaching Session',
      duration: '60 minutes',
      description: 'Personal growth and goal setting',
    },
  ];

  const onSubmit = async (data) => {
    setIsSubmitting(true);

    try {
      // Simulate form submission
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Here you would typically send the data to your backend
      console.log('Form data:', data);

      toast.success(
        "Thank you! Your message has been sent. We'll get back to you within 24 hours."
      );
      reset();
    } catch (error) {
      toast.error('Error sending message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-spiritual-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-100 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-spiritual-100 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute top-1/2 left-1/4 w-60 h-60 bg-healing-100 rounded-full opacity-10 blur-3xl"></div>
      </div>

      <div className="container-custom py-8 md:py-16 relative z-10">
        {/* Main content background */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/50 p-6 md:p-8 lg:p-12 mt-8 md:mt-12">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <div className="w-20 h-20 bg-spiritual-gradient rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl border-4 border-black">
              <MessageCircle className="w-10 h-10 text-black" />
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-gray-900 mb-4 md:mb-6 text-center">
              Let's Start Your{' '}
              <span className="text-gradient">Transformation</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto text-center px-4">
              Ready to begin your spiritual recovery journey? Contact me for a
              free consultation and discover how we can work together to
              transform your life.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16">
            {/* Contact Information - Full Width */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-2 mb-8 md:mb-16"
            >
              <div className="bg-gradient-to-br from-primary-50 to-spiritual-50 rounded-2xl p-6 md:p-8 lg:p-12 shadow-xl border border-white/50">
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-8 md:mb-12 text-center">
                  Get in <span className="text-gradient">Touch</span>
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                  {contactInfo.map((info, index) => (
                    <motion.div
                      key={info.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="text-center group"
                    >
                      <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-primary-500 to-spiritual-600 rounded-2xl flex items-center justify-center mx-auto mb-4 md:mb-6 shadow-2xl border-4 border-white group-hover:scale-105 transition-all duration-300">
                        <info.icon className="w-8 h-8 md:w-10 md:h-10 text-white drop-shadow-lg" />
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-2 md:mb-3 text-base md:text-lg text-center">
                        {info.title}
                      </h3>
                      {info.link ? (
                        <a
                          href={info.link}
                          className="text-primary-600 hover:text-primary-700 font-medium transition-colors duration-200 text-base md:text-lg hover:underline text-center block"
                        >
                          {info.value}
                        </a>
                      ) : (
                        <p className="text-gray-700 font-medium text-base md:text-lg text-center">
                          {info.value}
                        </p>
                      )}
                      <p className="text-gray-600 text-sm md:text-base mt-2 md:mt-3 leading-relaxed text-center">
                        {info.description}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Services */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-2xl border border-white/50">
                <h3 className="text-2xl font-serif font-bold text-gray-900 mb-6 md:mb-8 text-center">
                  Available <span className="text-gradient">Services</span>
                </h3>
                <div className="space-y-4 md:space-y-6">
                  {services.map((service, index) => (
                    <motion.div
                      key={service.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="p-4 md:p-6 bg-white/90 backdrop-blur-sm rounded-xl border border-white/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                    >
                      <h4 className="font-semibold text-gray-900 mb-2 md:mb-3 text-base md:text-lg text-center">
                        {service.name}
                      </h4>
                      <p className="text-gray-600 mb-2 md:mb-3 leading-relaxed text-center text-sm md:text-base">
                        {service.description}
                      </p>
                      <div className="flex justify-center">
                        <p className="text-sm text-primary-600 font-semibold bg-primary-50 px-3 py-1 rounded-full inline-block text-center">
                          Duration: {service.duration}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-2xl border border-white/50">
                <h2 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mb-6 md:mb-8 text-center">
                  Book Your <span className="text-gradient">Session</span>
                </h2>

                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="space-y-6 md:space-y-8"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        First Name *
                      </label>
                      <input
                        type="text"
                        {...register('firstName', {
                          required: 'First name is required',
                        })}
                        className={`w-full px-4 py-4 border-2 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 ${
                          errors.firstName
                            ? 'border-red-500'
                            : 'border-gray-200'
                        }`}
                        placeholder="Your first name"
                      />
                      {errors.firstName && (
                        <p className="text-red-500 text-sm mt-2">
                          {errors.firstName.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        {...register('lastName', {
                          required: 'Last name is required',
                        })}
                        className={`w-full px-4 py-4 border-2 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 ${
                          errors.lastName ? 'border-red-500' : 'border-gray-200'
                        }`}
                        placeholder="Your last name"
                      />
                      {errors.lastName && (
                        <p className="text-red-500 text-sm mt-2">
                          {errors.lastName.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      {...register('email', {
                        required: 'Email is required',
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: 'Invalid email address',
                        },
                      })}
                      className={`w-full px-4 py-4 border-2 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 ${
                        errors.email ? 'border-red-500' : 'border-gray-200'
                      }`}
                      placeholder="your.email@example.com"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-2">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      {...register('phone')}
                      className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                      placeholder="(407) 555-0123"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Preferred Service *
                    </label>
                    <select
                      {...register('service', {
                        required: 'Please select a service',
                      })}
                      className={`w-full px-4 py-4 border-2 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 ${
                        errors.service ? 'border-red-500' : 'border-gray-200'
                      }`}
                    >
                      <option value="">Select a service</option>
                      <option value="spiritual-recovery">
                        Spiritual Recovery Coaching
                      </option>
                      <option value="angel-cards">Angel Card Reading</option>
                      <option value="addiction-recovery">
                        Addiction Recovery Support
                      </option>
                      <option value="life-coaching">Life Coaching</option>
                      <option value="consultation">Free Consultation</option>
                    </select>
                    {errors.service && (
                      <p className="text-red-500 text-sm mt-2">
                        {errors.service.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Preferred Date & Time
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input
                        type="date"
                        {...register('preferredDate')}
                        className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                      />
                      <select
                        {...register('preferredTime')}
                        className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                      >
                        <option value="">Select time</option>
                        <option value="morning">Morning (10AM-12PM)</option>
                        <option value="afternoon">Afternoon (1PM-4PM)</option>
                        <option value="evening">Evening (5PM-8PM)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Message *
                    </label>
                    <textarea
                      {...register('message', {
                        required: 'Message is required',
                      })}
                      rows={5}
                      className={`w-full px-4 py-4 border-2 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 ${
                        errors.message ? 'border-red-500' : 'border-gray-200'
                      }`}
                      placeholder="Tell me about your spiritual recovery goals and what you hope to achieve..."
                    />
                    {errors.message && (
                      <p className="text-red-500 text-sm mt-2">
                        {errors.message.message}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-5 px-8 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 ${
                      isSubmitting
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-gradient-to-r from-primary-600 to-spiritual-600 text-white shadow-xl hover:shadow-2xl'
                    }`}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center space-x-3">
                        <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Sending Message...</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center space-x-3">
                        <Sparkles className="w-6 h-6" />
                        <span>Send Message & Book Session</span>
                      </div>
                    )}
                  </button>
                </form>

                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-600">
                    I'll respond within 24 hours to confirm your session and
                    answer any questions.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* FAQ Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-16"
          >
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <h2 className="text-3xl font-serif font-bold text-gray-900 mb-8 text-center">
                Frequently Asked Questions
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    What happens during a consultation?
                  </h3>
                  <p className="text-gray-600">
                    We'll discuss your spiritual recovery goals, challenges, and
                    how I can help you achieve transformation. This is a free
                    30-minute session to ensure we're a good fit.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Are sessions conducted virtually?
                  </h3>
                  <p className="text-gray-600">
                    Yes! All sessions are conducted virtually via Zoom or phone,
                    making spiritual recovery coaching accessible to clients
                    worldwide.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    How long does it take to see results?
                  </h3>
                  <p className="text-gray-600">
                    Many clients experience immediate shifts in perspective and
                    begin implementing positive changes after their first
                    session. Lasting transformation typically occurs over 3-6
                    months.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    What if I'm not satisfied?
                  </h3>
                  <p className="text-gray-600">
                    I offer a satisfaction guarantee. If you're not completely
                    satisfied with your first session, I'll provide a full
                    refund or reschedule at no additional cost.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
