/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      colors: {
        // Primary: Deep Navy (#2C4A6B)
        primary: {
          50: '#f0f4f8',
          100: '#d9e3ed',
          200: '#b3c7db',
          300: '#8dabc9',
          400: '#678fb7',
          500: '#5A7A9B',
          600: '#2C4A6B',
          700: '#223a55',
          800: '#182a3f',
          900: '#0e1a29',
        },
        // Secondary: Soft Teal (#5A9B9B)
        spiritual: {
          50: '#f0f8f8',
          100: '#d9eeee',
          200: '#b3dddd',
          300: '#8dcccc',
          400: '#67bbbb',
          500: '#5A9B9B',
          600: '#4a8b8b',
          700: '#3a7b7b',
          800: '#2a6b6b',
          900: '#1a5b5b',
        },
        // Accent: Warm Amber (#E6A85C)
        healing: {
          50: '#fef8f0',
          100: '#fdf0d9',
          200: '#fbe1b3',
          300: '#f9d28d',
          400: '#f7c367',
          500: '#E6A85C',
          600: '#d4944a',
          700: '#b87d3d',
          800: '#9c6630',
          900: '#804f23',
        },
      },
      fontFamily: {
        serif: ['Playfair Display', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        float: 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
};
