import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AlertCircle, ArrowLeft } from 'lucide-react';

const MedicalDisclaimer = () => {
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
            <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
              <AlertCircle className="w-6 h-6 text-amber-600" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-serif font-bold text-gray-900">
                Medical Disclaimer
              </h1>
              <p className="text-gray-600 mt-1">Last updated: January 2026</p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 md:p-10 space-y-8 text-gray-700 leading-relaxed">
            <section>
              <h2 className="text-xl font-serif font-bold text-gray-900 mb-3">
                Not Medical or Mental Health Care
              </h2>
              <p>
                The information, content, and services offered by Angels Walking and Gladys Schmanski—including but not limited to spiritual recovery coaching, life coaching, angel card readings, addiction recovery support, the self-care quiz, and any materials on this website—are for <strong>informational, educational, and supportive purposes only</strong>. They are <strong>not</strong> a substitute for professional medical advice, diagnosis, or treatment.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-serif font-bold text-gray-900 mb-3">
                No Doctor-Patient or Therapist-Client Relationship
              </h2>
              <p>
                Angels Walking does not provide medical, psychiatric, psychological, or clinical services. Gladys Schmanski is not a licensed physician, psychiatrist, psychologist, therapist, or clinical counselor. No doctor-patient, therapist-client, or other clinical relationship is formed by using this website or our coaching and spiritual guidance services.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-serif font-bold text-gray-900 mb-3">
                Always Seek Professional Care When Needed
              </h2>
              <p>
                If you have a medical or mental health condition, or suspect you might, please consult a qualified healthcare provider. If you are in crisis, having thoughts of self-harm or harm to others, or experiencing a medical emergency, contact emergency services (e.g., 988 Suicide & Crisis Lifeline, 911) or go to your nearest emergency room. Do not rely on this website or our services for crisis intervention or clinical care.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-serif font-bold text-gray-900 mb-3">
                Addiction and Substance Use
              </h2>
              <p>
                Our addiction recovery support is offered as spiritual and life coaching only. It is not medical detox, rehabilitation, or licensed addiction treatment. If you or someone you know is struggling with substance use or addiction, please seek care from licensed healthcare and addiction treatment professionals in addition to any supportive services we offer.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-serif font-bold text-gray-900 mb-3">
                Self-Care Quiz and Site Content
              </h2>
              <p>
                The self-care quiz and other content on this site are intended to help you reflect on your well-being and explore resources. They do not diagnose any condition, recommend specific medical or mental health treatment, or replace advice from your doctor or therapist. Use them as a starting point for self-awareness and conversation with qualified professionals when appropriate.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-serif font-bold text-gray-900 mb-3">
                Your Responsibility
              </h2>
              <p>
                You are responsible for your own health decisions. Do not disregard or delay seeking professional medical or mental health advice because of something you have read or received from Angels Walking. If you are currently under the care of a physician, therapist, or other provider, we encourage you to continue that care and to inform them of any complementary practices you choose to pursue.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-serif font-bold text-gray-900 mb-3">
                Contact Us
              </h2>
              <p>
                If you have questions about this disclaimer or our services, please contact:
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

export default MedicalDisclaimer;
