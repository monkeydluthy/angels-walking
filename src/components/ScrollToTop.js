import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { trackPageView } from '../lib/analytics';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll to top on route change
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth', // Smooth scroll animation
    });

    // Track page view in Google Analytics
    const pageTitle = document.title || pathname;
    trackPageView(pathname, pageTitle);
  }, [pathname]);

  return null;
};

export default ScrollToTop;
