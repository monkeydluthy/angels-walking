import React from 'react';
import PageMeta from '../../components/PageMeta';
import {
  Database,
  BarChart3,
  Star,
  Mail,
  Phone,
  MapPin,
  Clock,
  CheckCircle,
  XCircle,
  HelpCircle,
} from 'lucide-react';

const Settings = () => {
  const hasGa = !!process.env.REACT_APP_GA_MEASUREMENT_ID;
  const hasGooglePlace = !!process.env.REACT_APP_GOOGLE_PLACE_ID;

  const integrations = [
    {
      name: 'Database (Supabase)',
      description: 'Form submissions, quiz results, success stories',
      configured: true,
      icon: Database,
      detail: 'Connected',
    },
    {
      name: 'Analytics (Google)',
      description: 'Site traffic and event tracking',
      configured: hasGa,
      icon: BarChart3,
      detail: hasGa ? 'Measurement ID set' : 'Set REACT_APP_GA_MEASUREMENT_ID in Netlify',
    },
    {
      name: 'Google Reviews',
      description: 'Reviews on homepage and write-a-review link',
      configured: hasGooglePlace,
      icon: Star,
      detail: hasGooglePlace ? 'Place ID set' : 'Set REACT_APP_GOOGLE_PLACE_ID in Netlify',
    },
    {
      name: 'Email (Resend)',
      description: 'Contact and quiz notification emails',
      configured: null,
      icon: Mail,
      detail: 'Configured in Netlify (RESEND_API_KEY, GLADYS_EMAIL). See RESEND_SETUP.md',
    },
  ];

  const contactInfo = [
    { label: 'Phone', value: '407-782-5048', icon: Phone },
    { label: 'Email', value: 'gladys@angelswalking.com', icon: Mail },
    { label: 'Location', value: 'Orlando, FL 32826', icon: MapPin },
    { label: 'Hours', value: 'Tue-Fri: 10AM-6PM, Sat: 10AM-8PM (EST)', icon: Clock },
  ];

  return (
    <div>
      <PageMeta title="Admin - Settings" />
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Settings</h1>

      {/* Integrations */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Integrations</h2>
        <p className="text-gray-600 mb-6 max-w-2xl">
          Status of services used by the site. Values for Analytics, Google Reviews, and email are set in Netlify environment variables.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {integrations.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.name}
                className="bg-white rounded-lg shadow p-6 border border-gray-200"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-primary-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{item.name}</h3>
                      <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                      <p className="text-xs text-gray-500 mt-2">{item.detail}</p>
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    {item.configured === true && (
                      <CheckCircle className="w-6 h-6 text-green-600" aria-hidden />
                    )}
                    {item.configured === false && (
                      <XCircle className="w-6 h-6 text-amber-600" aria-hidden />
                    )}
                    {item.configured === null && (
                      <HelpCircle className="w-6 h-6 text-gray-400" aria-hidden />
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Site contact info (read-only) */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Site contact info</h2>
        <p className="text-gray-600 mb-6 max-w-2xl">
          This is the contact information shown on the public site (Contact page, footer, etc.). To change it, update the Contact page or ask your developer.
        </p>
        <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
          <ul className="space-y-4">
            {contactInfo.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.label} className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">{item.label}</span>
                    <p className="text-gray-900 font-medium">{item.value}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* Help */}
      <section>
        <div className="bg-primary-50 rounded-lg border border-primary-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Need to change something?</h2>
          <p className="text-gray-700 text-sm">
            Analytics, Google Reviews, and email (Resend) are configured via environment variables in Netlify. See <code className="bg-white px-1 rounded text-xs">RESEND_SETUP.md</code> and <code className="bg-white px-1 rounded text-xs">GA_REPORT_SETUP.md</code> in the project for setup steps. Contact info above is in the codebase and can be updated by your developer.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Settings;
