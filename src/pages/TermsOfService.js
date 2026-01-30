import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FileText, ArrowLeft } from 'lucide-react';

const TermsOfService = () => {
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
              <FileText className="w-6 h-6 text-primary-600" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-serif font-bold text-gray-900">
                Terms of Service
              </h1>
              <p className="text-gray-600 mt-1">Last updated: January 2026</p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 md:p-10 space-y-8 text-gray-700 leading-relaxed">
            <section>
              <h2 className="text-xl font-serif font-bold text-gray-900 mb-3">
                Agreement to Terms
              </h2>
              <p>
                By accessing or using the Angels Walking website (“Site”) and any related services offered by Gladys Schmanski / Angels Walking (“we,” “us,” or “our”), you agree to be bound by these Terms of Service. If you do not agree, please do not use the Site or our services.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-serif font-bold text-gray-900 mb-3">
                Description of Services
              </h2>
              <p>
                Angels Walking provides spiritual recovery coaching, life coaching, angel card readings, addiction recovery support, and related guidance. Services may be offered in person, by phone, or via video/online sessions. The self-care quiz and other content on the Site are for informational and self-assessment purposes only and do not replace professional medical, psychological, or legal advice.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-serif font-bold text-gray-900 mb-3">
                Not Professional Advice
              </h2>
              <p>
                Our services are intended to support your personal and spiritual growth. They are not a substitute for professional medical, mental health, addiction treatment, or legal advice. If you are in crisis or need clinical care, please contact a licensed healthcare provider or emergency services. We do not diagnose conditions or prescribe treatment.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-serif font-bold text-gray-900 mb-3">
                Use of the Site
              </h2>
              <p className="mb-3">You agree to use the Site only for lawful purposes and in a way that does not:</p>
              <ul className="list-disc list-inside space-y-2 ml-2">
                <li>Violate any applicable laws or regulations</li>
                <li>Infringe on the rights of others</li>
                <li>Transmit harmful, offensive, or illegal content</li>
                <li>Attempt to gain unauthorized access to our systems or data</li>
                <li>Interfere with the proper functioning of the Site</li>
              </ul>
              <p className="mt-3">
                We reserve the right to suspend or terminate access to the Site or services for anyone who violates these terms.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-serif font-bold text-gray-900 mb-3">
                Scheduling and Communication
              </h2>
              <p>
                Contact and scheduling are handled by email and phone. By submitting the contact form or providing your contact information, you consent to being contacted at the email and phone number you provide. Response times may vary; we aim to respond within 24 hours where possible.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-serif font-bold text-gray-900 mb-3">
                Intellectual Property
              </h2>
              <p>
                The Site and its content—including text, graphics, logos, and design—are owned by Angels Walking or its licensors and are protected by copyright and other intellectual property laws. You may not copy, modify, distribute, or use our content for commercial purposes without our prior written permission.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-serif font-bold text-gray-900 mb-3">
                Disclaimer of Warranties
              </h2>
              <p>
                The Site and services are provided “as is” and “as available” without warranties of any kind, either express or implied. We do not warrant that the Site will be uninterrupted, error-free, or free of viruses or other harmful components. Your use of the Site and services is at your own risk.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-serif font-bold text-gray-900 mb-3">
                Limitation of Liability
              </h2>
              <p>
                To the fullest extent permitted by law, Angels Walking and Gladys Schmanski shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits, data, or goodwill, arising from your use of the Site or services. Our total liability for any claims related to the Site or services shall not exceed the amount you paid to us, if any, in the twelve months preceding the claim.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-serif font-bold text-gray-900 mb-3">
                Indemnification
              </h2>
              <p>
                You agree to indemnify and hold harmless Angels Walking, Gladys Schmanski, and their affiliates from any claims, damages, losses, or expenses (including reasonable attorneys’ fees) arising from your use of the Site or services or your violation of these terms.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-serif font-bold text-gray-900 mb-3">
                Governing Law
              </h2>
              <p>
                These Terms shall be governed by and construed in accordance with the laws of the State of Florida, without regard to its conflict of law provisions. Any disputes shall be resolved in the state or federal courts located in Florida.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-serif font-bold text-gray-900 mb-3">
                Changes
              </h2>
              <p>
                We may update these Terms of Service from time to time. We will post the updated terms on this page and update the “Last updated” date. Your continued use of the Site after changes constitutes acceptance of the revised terms.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-serif font-bold text-gray-900 mb-3">
                Contact
              </h2>
              <p>
                For questions about these Terms of Service, please contact:
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
            <Link to="/privacy" className="text-primary-600 hover:text-primary-700 font-medium">
              Privacy Policy →
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

export default TermsOfService;
