import React from 'react';
import { Helmet } from 'react-helmet-async';

const SITE_SUFFIX = ' | Angels Walking - Spiritual Recovery & Life Coaching';
const HOME_TITLE = 'Angels Walking - Spiritual Recovery & Life Coaching | Orlando, FL';
const DEFAULT_DESCRIPTION =
  'Transform your life with spiritual recovery coaching. Certified life coach and angel card reader helping you find healing, hope, and your highest possibility.';

/**
 * Sets page <title> and optional meta description for SEO.
 * @param {string} title - Page title (e.g. "About", "Contact"). Use empty string for home.
 * @param {string} [description] - Meta description; omit to use default.
 * @param {boolean} [isHome] - If true, uses the full home title (Orlando, FL).
 */
const PageMeta = ({ title, description, isHome }) => {
  const pageTitle = isHome ? HOME_TITLE : title ? `${title}${SITE_SUFFIX}` : HOME_TITLE;
  const metaDescription = description || DEFAULT_DESCRIPTION;

  return (
    <Helmet>
      <title>{pageTitle}</title>
      <meta name="description" content={metaDescription} />
    </Helmet>
  );
};

export default PageMeta;
