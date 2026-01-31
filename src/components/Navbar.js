import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone } from 'lucide-react';
import { analytics } from '../lib/analytics';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'About', path: '/about' },
    {
      name: 'Services',
      path: '/services',
      dropdown: [
        { name: 'Spiritual Recovery', path: '/spiritual-recovery' },
        { name: 'Angel Card Reading', path: '/angel-card-reading' },
        { name: 'Addiction Recovery', path: '/addiction-recovery' },
        { name: 'Life Coaching', path: '/life-coaching' },
      ],
    },
    { name: 'Self-Care Quiz', path: '/self-care-quiz' },
    { name: 'Success Stories', path: '/success-stories' },
    { name: 'FAQ', path: '/faq' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-lg w-full -ml-0 -pl-0" aria-label="Main navigation">
      {/* Mobile Layout */}
      <div className="lg:hidden relative">
        <div className="flex items-center h-16">
          {/* Logo - Absolute left */}
          <Link
            to="/"
            className="absolute left-0 flex items-center -ml-4 -pl-4"
          >
            <img
              src="/logo-transparent.png"
              alt="Angels Walking"
              className="h-12 w-auto object-contain"
            />
          </Link>

          {/* Hamburger Menu - Absolute right */}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="absolute right-4 p-2 rounded-md text-gray-700 hover:text-primary-600 hover:bg-primary-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
            aria-controls="mobile-nav-menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              id="mobile-nav-menu"
              role="dialog"
              aria-label="Main navigation"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-gradient-to-br from-white via-primary-50 to-spiritual-50 border-t border-primary-200 shadow-xl max-h-[calc(100vh-4rem)] overflow-y-auto"
            >
              <div className="py-3 space-y-1 text-center">
                {navItems.map((item) => (
                  <div key={item.name}>
                    <Link
                      to={item.path}
                      onClick={() => setIsOpen(false)}
                      className={`block px-6 py-3 font-bold text-base transition-all duration-300 rounded-xl mx-3 ${
                        isActive(item.path)
                          ? 'text-primary-600 bg-gradient-to-r from-primary-100 to-spiritual-100 shadow-lg'
                          : 'text-gray-700 hover:text-primary-600 hover:bg-white/90 hover:shadow-lg'
                      }`}
                    >
                      {item.name}
                    </Link>

                    {/* Mobile Dropdown */}
                    {item.dropdown && (
                      <div className="mt-1 space-y-1">
                        {item.dropdown.map((subItem) => (
                          <Link
                            key={subItem.name}
                            to={subItem.path}
                            onClick={() => setIsOpen(false)}
                            className="block px-4 py-2 text-sm text-gray-600 hover:text-primary-600 hover:bg-white/70 transition-all duration-300 rounded-lg mx-6"
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}

                <div className="pt-4 border-t border-primary-200 mt-4 text-center pb-4">
                  <a
                    href="tel:407-782-5048"
                    onClick={() => analytics.trackEvent('phone_call', { location: 'mobile_menu' })}
                    className="flex items-center justify-center space-x-3 px-6 py-3 text-primary-600 hover:text-primary-700 transition-all duration-300 rounded-xl mx-3 hover:bg-white/90 mb-3 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                    aria-label="Call 407-782-5048"
                  >
                    <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-spiritual-600 rounded-full flex items-center justify-center shadow-lg">
                      <Phone className="w-5 h-5 text-white" />
                    </div>
                    <span className="font-bold text-lg">407-782-5048</span>
                  </a>
                  <Link
                    to="/contact"
                    onClick={() => setIsOpen(false)}
                    className="block mx-3 btn-primary text-center text-lg py-4 shadow-xl hover:shadow-2xl font-bold"
                  >
                    Book Session
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:block">
        <div className="container-custom">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <img
                src="/logo-transparent.png"
                alt="Angels Walking"
                className="h-16 w-auto object-contain"
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="flex items-center space-x-8">
              {navItems.map((item) => (
                <div key={item.name} className="relative group">
                  <Link
                    to={item.path}
                    className={`font-medium transition-colors duration-200 ${
                      isActive(item.path)
                        ? 'text-primary-600'
                        : 'text-gray-700 hover:text-primary-600'
                    }`}
                  >
                    {item.name}
                  </Link>

                  {/* Dropdown for Services */}
                  {item.dropdown && (
                    <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform group-hover:translate-y-0 translate-y-2">
                      <div className="py-2">
                        {item.dropdown.map((subItem) => (
                          <Link
                            key={subItem.name}
                            to={subItem.path}
                            className="block px-4 py-2 text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors duration-200"
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div className="flex items-center space-x-4">
              <a
                href="tel:407-782-5048"
                onClick={() => analytics.trackEvent('phone_call', { location: 'desktop_navbar' })}
                className="flex items-center space-x-2 text-primary-600 hover:text-primary-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded"
                aria-label="Call 407-782-5048"
              >
                <Phone className="w-4 h-4" />
                <span className="font-medium">407-782-5048</span>
              </a>
              <Link 
                to="/contact" 
                onClick={() => analytics.trackCTAClick('Book Session', 'navbar')}
                className="btn-primary"
              >
                Book Session
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
