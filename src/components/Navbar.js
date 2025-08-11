import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sparkles, Phone } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/' },
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
    { name: 'FAQ', path: '/faq' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-lg w-full -ml-0 -pl-0">
      {/* Mobile Layout */}
      <div className="lg:hidden relative">
        <div className="flex items-center h-16">
          {/* Logo - Absolute left */}
          <Link
            to="/"
            className="absolute left-0 flex items-center -ml-4 -pl-4"
          >
            <div className="flex items-center justify-center w-10 h-10 bg-spiritual-gradient rounded-full">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div className="ml-2">
              <h1 className="text-lg font-serif font-bold text-gradient">
                Angels Walking
              </h1>
              <p className="text-xs text-gray-600 -mt-1">Spiritual Recovery</p>
            </div>
          </Link>

          {/* Hamburger Menu - Absolute right */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="absolute right-4 p-2 rounded-md text-gray-700 hover:text-primary-600 hover:bg-primary-50 transition-colors duration-200"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-gradient-to-br from-white via-primary-50 to-spiritual-50 border-t border-primary-200 shadow-xl"
            >
              <div className="py-4 space-y-2 text-center">
                {navItems.map((item) => (
                  <div key={item.name}>
                    <Link
                      to={item.path}
                      onClick={() => setIsOpen(false)}
                      className={`block px-8 py-4 font-bold text-lg transition-all duration-300 rounded-xl mx-4 ${
                        isActive(item.path)
                          ? 'text-primary-600 bg-gradient-to-r from-primary-100 to-spiritual-100 shadow-lg'
                          : 'text-gray-700 hover:text-primary-600 hover:bg-white/90 hover:shadow-lg'
                      }`}
                    >
                      {item.name}
                    </Link>

                    {/* Mobile Dropdown */}
                    {item.dropdown && (
                      <div className="mt-2 space-y-1">
                        {item.dropdown.map((subItem) => (
                          <Link
                            key={subItem.name}
                            to={subItem.path}
                            onClick={() => setIsOpen(false)}
                            className="block px-6 py-3 text-base text-gray-600 hover:text-primary-600 hover:bg-white/70 transition-all duration-300 rounded-lg mx-8"
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}

                <div className="pt-6 border-t border-primary-200 mt-6 text-center">
                  <a
                    href="tel:407-782-5048"
                    className="flex items-center justify-center space-x-3 px-8 py-3 text-primary-600 hover:text-primary-700 transition-all duration-300 rounded-xl mx-4 hover:bg-white/90 mb-4"
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-spiritual-600 rounded-full flex items-center justify-center shadow-lg">
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                    <span className="font-bold text-xl">407-782-5048</span>
                  </a>
                  <Link
                    to="/contact"
                    onClick={() => setIsOpen(false)}
                    className="block mx-4 btn-primary text-center text-xl py-5 shadow-xl hover:shadow-2xl font-bold"
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
            <Link to="/" className="flex items-center space-x-2">
              <div className="flex items-center justify-center w-10 h-10 bg-spiritual-gradient rounded-full">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-serif font-bold text-gradient">
                  Angels Walking
                </h1>
                <p className="text-xs text-gray-600 -mt-1">
                  Spiritual Recovery
                </p>
              </div>
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
                className="flex items-center space-x-2 text-primary-600 hover:text-primary-700 transition-colors duration-200"
              >
                <Phone className="w-4 h-4" />
                <span className="font-medium">407-782-5048</span>
              </a>
              <Link to="/contact" className="btn-primary">
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
