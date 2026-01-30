import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, ArrowLeft } from 'lucide-react';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-spiritual-50 pt-24 pb-16">
      <div className="container-custom max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link
            to="/"
            className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium mb-8"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>

          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
              <Shield className="w-6 h-6 text-primary-600" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-serif font-bold text-gray-900">
                Privacy Policy
              </h1>
              <p className="text-gray-600 mt-1">Last updated: January 2026</p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 md:p-10 space-y-8 text-gray-700 leading-relaxed">
            <section>
              <h2 className="text-xl font-serif font-bold text-gray-900 mb-3">
                Introduction
              </h2>
              <p>
                Angels Walking (“we,” “our,” or “us”) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website at angelswalking.com (the “Site”) and use our spiritual recovery coaching, life coaching, and related services. Please read this policy carefully.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-serif font-bold text-gray-900 mb-3">
                Information We Collect
              </h2>
              <p className="mb-3">We may collect information that you provide directly to us, including:</p>
              <ul className="list-disc list-inside space-y-2 ml-2">
                <li><strong>Contact information</strong> — Name, email address, phone number when you submit our contact form or complete the self-care quiz</li>
                <li><strong>Message content</strong> — The content of messages you send us through the contact form</li>
                <li><strong>Quiz responses</strong> — Answers and results from the self-care assessment, used to provide personalized recommendations</li>
                <li><strong>Service preferences</strong> — Information about services you’re interested in (e.g., spiritual recovery coaching, angel card reading)</li>
              </ul>
              <p className="mt-3">
                We also automatically collect certain technical information when you visit the Site, such as your IP address, browser type, device type, and pages visited. We use Google Analytics to understand how visitors use our Site; you can learn more about Google’s practices at{' '}
                <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">Google’s Privacy Policy</a>.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-serif font-bold text-gray-900 mb-3">
                How We Use Your Information
              </h2>
              <p className="mb-3">We use the information we collect to:</p>
              <ul className="list-disc list-inside space-y-2 ml-2">
                <li>Respond to your inquiries and schedule sessions</li>
                <li>Send you confirmation emails when you submit forms or complete the quiz</li>
                <li>Send you your quiz results and personalized recommendations</li>
                <li>Improve our website and services</li>
                <li>Analyze Site usage (e.g., via Google Analytics) to improve user experience</li>
                <li>Comply with applicable laws and protect our rights</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-serif font-bold text-gray-900 mb-3">
                How We Share Your Information
              </h2>
              <p>
                We do not sell your personal information. We may share your information with trusted service providers who assist us in operating our Site and conducting our business, including:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-2 mt-3">
                <li><strong>Supabase</strong> — To store form and quiz submissions securely</li>
                <li><strong>Resend</strong> — To send transactional emails (confirmations, quiz results)</li>
                <li><strong>Google Analytics</strong> — To analyze Site traffic (data may be processed by Google)</li>
                <li><strong>Netlify</strong> — To host and deliver the Site</li>
              </ul>
              <p className="mt-3">
                These providers are contractually required to protect your information and use it only for the purposes we specify. We may also disclose information if required by law or to protect our rights, safety, or property.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-serif font-bold text-gray-900 mb-3">
                Cookies and Tracking
              </h2>
              <p>
                We use cookies and similar technologies to improve your experience and analyze Site usage. Google Analytics may set cookies to help us understand how visitors interact with our Site. You can control cookies through your browser settings; disabling cookies may affect some Site features.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-serif font-bold text-gray-900 mb-3">
                Data Security
              </h2>
              <p>
                We take reasonable measures to protect your personal information using industry-standard security practices. Data is transmitted over HTTPS and stored using secure, modern systems. No method of transmission or storage is 100% secure; we encourage you to use strong passwords and protect your own devices.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-serif font-bold text-gray-900 mb-3">
                Your Rights
              </h2>
              <p>
                Depending on where you live, you may have the right to access, correct, or delete your personal information, or to object to or restrict certain processing. To exercise these rights or ask questions about your data, please contact us at the email or phone number below.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-serif font-bold text-gray-900 mb-3">
                Children’s Privacy
              </h2>
              <p>
                Our Site and services are not directed to individuals under 18. We do not knowingly collect personal information from children. If you believe we have collected information from a child, please contact us and we will take steps to delete it.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-serif font-bold text-gray-900 mb-3">
                Changes to This Policy
              </h2>
              <p>
                We may update this Privacy Policy from time to time. We will post the updated policy on this page and update the “Last updated” date. Your continued use of the Site after changes constitutes acceptance of the revised policy.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-serif font-bold text-gray-900 mb-3">
                Contact Us
              </h2>
              <p>
                If you have questions about this Privacy Policy or our practices, please contact:
              </p>
              <p className="mt-3 font-medium text-gray-900">
                Gladys Schmanski — Angels Walking<br />
                Email: <a href="mailto:gladys@angelswalking.com" className="text-primary-600 hover:underline">gladys@angelswalking.com</a><br />
                Phone: 407-782-5048<br />
                Orlando, FL 32826
              </p>
            </section>
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link to="/terms" className="text-primary-600 hover:text-primary-700 font-medium">
              Terms of Service →
            </Link>
            <Link to="/contact" className="text-primary-600 hover:text-primary-700 font-medium">
              Contact Us →
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
