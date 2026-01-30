import React from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  Phone,
  Mail,
  MapPin,
  Facebook,
  Instagram,
  Youtube,
  Heart,
} from 'lucide-react';
import { analytics } from '../lib/analytics';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    services: [
      { name: 'Spiritual Recovery', path: '/spiritual-recovery' },
      { name: 'Angel Card Reading', path: '/angel-card-reading' },
      { name: 'Addiction Recovery', path: '/addiction-recovery' },
      { name: 'Life Coaching', path: '/life-coaching' },
    ],
    resources: [
      { name: 'Self-Care Quiz', path: '/self-care-quiz' },
      { name: 'Success Stories', path: '/success-stories' },
      { name: 'FAQ', path: '/faq' },
      { name: 'About', path: '/about' },
    ],
    support: [
      { name: 'Contact', path: '/contact' },
      { name: 'Book Session', path: '/contact' },
      { name: 'Privacy Policy', path: '/privacy' },
      { name: 'Terms of Service', path: '/terms' },
      { name: 'Medical Disclaimer', path: '/medical-disclaimer' },
    ],
  };

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, href: 'https://facebook.com' },
    { name: 'Instagram', icon: Instagram, href: 'https://instagram.com' },
    { name: 'YouTube', icon: Youtube, href: 'https://youtube.com' },
  ];

  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 bg-spiritual-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-primary-500 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-healing-500 rounded-full blur-2xl"></div>
      </div>

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="container-custom py-20">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary-600 to-spiritual-600 rounded-full shadow-2xl mb-8">
              <Sparkles className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">
              Angels Walking
            </h3>
            <p className="text-xl text-spiritual-200 mb-6 font-medium">
              Spiritual Recovery
            </p>
            <p className="text-gray-300 max-w-3xl mx-auto leading-relaxed text-lg">
              Transform your life with spiritual recovery coaching. Find
              healing, hope, and your highest possibility through certified life
              coaching and angel card guidance.
            </p>
          </div>

          {/* Contact Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-300 group">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-primary-600 to-primary-700 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-400 uppercase tracking-wide font-semibold">
                    Phone
                  </p>
                  <a
                    href="tel:407-782-5048"
                    className="text-white hover:text-primary-300 transition-colors duration-200 font-bold text-lg"
                  >
                    407-782-5048
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-300 group">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-spiritual-600 to-spiritual-700 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-400 uppercase tracking-wide font-semibold">
                    Email
                  </p>
                  <a
                    href="mailto:gladys@angelswalking.com"
                    onClick={() => analytics.trackEvent('email_click', { location: 'footer', email: 'gladys@angelswalking.com' })}
                    className="text-white hover:text-spiritual-300 transition-colors duration-200 font-bold text-lg"
                  >
                    gladys@angelswalking.com
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-300 group">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-healing-600 to-healing-700 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-400 uppercase tracking-wide font-semibold">
                    Location
                  </p>
                  <span className="text-white font-bold text-lg">
                    Orlando, FL 32826
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Links Grid - Hidden on Mobile */}
          <div className="hidden md:grid md:grid-cols-3 gap-12 mb-16">
            <div>
              <h4 className="text-xl font-serif font-bold text-white mb-6 flex items-center">
                <Heart className="w-5 h-5 text-primary-400 mr-3" />
                Services
              </h4>
              <ul className="space-y-4">
                {footerLinks.services.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="text-gray-300 hover:text-primary-300 transition-all duration-200 text-lg group flex items-center"
                    >
                      <span className="w-2 h-2 bg-primary-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-xl font-serif font-bold text-white mb-6 flex items-center">
                <Sparkles className="w-5 h-5 text-spiritual-400 mr-3" />
                Resources
              </h4>
              <ul className="space-y-4">
                {footerLinks.resources.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="text-gray-300 hover:text-spiritual-300 transition-all duration-200 text-lg group flex items-center"
                    >
                      <span className="w-2 h-2 bg-spiritual-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-xl font-serif font-bold text-white mb-6 flex items-center">
                <Phone className="w-5 h-5 text-healing-400 mr-3" />
                Support
              </h4>
              <ul className="space-y-4">
                {footerLinks.support.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="text-gray-300 hover:text-healing-300 transition-all duration-200 text-lg group flex items-center"
                    >
                      <span className="w-2 h-2 bg-healing-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Social Links */}
          <div className="text-center mb-12">
            <h5 className="text-lg font-semibold mb-6 text-gray-300 uppercase tracking-widest">
              Connect With Us
            </h5>
            <div className="flex justify-center space-x-6">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative"
                  aria-label={social.name}
                >
                  <div className="w-14 h-14 bg-gradient-to-br from-gray-800 to-gray-700 rounded-2xl flex items-center justify-center shadow-lg hover:shadow-2xl transition-all duration-300 group-hover:scale-110 border border-white/10">
                    <social.icon className="w-7 h-7 text-gray-300 group-hover:text-white transition-colors duration-200" />
                  </div>
                  <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <span className="text-xs text-gray-400 whitespace-nowrap">
                      {social.name}
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 bg-black/20 backdrop-blur-sm">
          <div className="container-custom py-8">
            <div className="flex flex-col lg:flex-row justify-between items-center space-y-6 lg:space-y-0">
              <div className="text-gray-400 text-center lg:text-left">
                <p className="text-lg">
                  © {currentYear} Angels Walking Spiritual Recovery
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  All rights reserved
                </p>
              </div>
              <div className="flex flex-wrap justify-center lg:justify-end items-center space-x-8 text-sm">
                <Link
                  to="/privacy"
                  className="text-gray-400 hover:text-white transition-colors duration-200 font-medium"
                >
                  Privacy Policy
                </Link>
                <Link
                  to="/terms"
                  className="text-gray-400 hover:text-white transition-colors duration-200 font-medium"
                >
                  Terms of Service
                </Link>
                <Link
                  to="/medical-disclaimer"
                  className="text-gray-400 hover:text-white transition-colors duration-200 font-medium"
                >
                  Medical Disclaimer
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="bg-black/40 backdrop-blur-sm border-t border-white/5">
          <div className="container-custom py-8">
            <div className="max-w-4xl mx-auto text-center">
              <p className="text-sm text-gray-400 leading-relaxed">
                <span className="font-semibold text-gray-300">
                  Important Notice:
                </span>{' '}
                Spiritual recovery coaching and angel card reading are
                complementary practices and should not replace professional
                medical, psychological, or addiction treatment. Always consult
                with qualified healthcare providers for medical concerns.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
