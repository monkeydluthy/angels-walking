import React from 'react';
import { ExternalLink, BarChart3, Users, MousePointerClick, FileText } from 'lucide-react';

const Analytics = () => {
  const measurementId = process.env.REACT_APP_GA_MEASUREMENT_ID;
  const isConfigured = !!measurementId;

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Analytics</h1>

      {/* Setup Status */}
      <div className={`rounded-lg shadow p-6 border-2 mb-6 ${
        isConfigured 
          ? 'bg-green-50 border-green-200' 
          : 'bg-yellow-50 border-yellow-200'
      }`}>
        <div className="flex items-start">
          <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${
            isConfigured ? 'bg-green-100' : 'bg-yellow-100'
          }`}>
            <BarChart3 className={`w-6 h-6 ${
              isConfigured ? 'text-green-600' : 'text-yellow-600'
            }`} />
          </div>
          <div className="ml-4 flex-1">
            <h3 className={`text-lg font-semibold mb-2 ${
              isConfigured ? 'text-green-900' : 'text-yellow-900'
            }`}>
              {isConfigured ? '✅ Google Analytics Configured' : '⚠️ Setup Required'}
            </h3>
            {isConfigured ? (
              <div>
                <p className="text-green-800 mb-2">
                  Your Google Analytics Measurement ID is configured: <code className="bg-green-100 px-2 py-1 rounded text-sm">{measurementId}</code>
                </p>
                <p className="text-sm text-green-700">
                  Analytics is tracking page views, form submissions, and user interactions.
                </p>
              </div>
            ) : (
              <div>
                <p className="text-yellow-800 mb-4">
                  To view analytics data, you need to set up Google Analytics 4.
                </p>
                <ol className="list-decimal list-inside text-sm text-yellow-800 space-y-2 mb-4">
                  <li>Go to <a href="https://analytics.google.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Google Analytics</a> and create a property</li>
                  <li>Get your Measurement ID (format: G-XXXXXXXXXX)</li>
                  <li>Add it to your <code className="bg-yellow-100 px-1 rounded">.env</code> file as <code className="bg-yellow-100 px-1 rounded">REACT_APP_GA_MEASUREMENT_ID</code></li>
                  <li>Redeploy your site on Netlify with the new environment variable</li>
                </ol>
                <a
                  href="https://analytics.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Set Up Google Analytics
                  <ExternalLink className="w-4 h-4 ml-2" />
                </a>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* What's Being Tracked */}
      <div className="bg-white rounded-lg shadow p-6 border border-gray-200 mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">What's Being Tracked</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="flex items-start p-4 bg-gray-50 rounded-lg">
            <BarChart3 className="w-5 h-5 text-primary-600 mr-3 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Page Views</h3>
              <p className="text-sm text-gray-600">
                Every page navigation is automatically tracked
              </p>
            </div>
          </div>
          <div className="flex items-start p-4 bg-gray-50 rounded-lg">
            <FileText className="w-5 h-5 text-primary-600 mr-3 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Form Submissions</h3>
              <p className="text-sm text-gray-600">
                Contact form and quiz completions
              </p>
            </div>
          </div>
          <div className="flex items-start p-4 bg-gray-50 rounded-lg">
            <MousePointerClick className="w-5 h-5 text-primary-600 mr-3 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">User Interactions</h3>
              <p className="text-sm text-gray-600">
                Button clicks, CTA interactions, and more
              </p>
            </div>
          </div>
          <div className="flex items-start p-4 bg-gray-50 rounded-lg">
            <Users className="w-5 h-5 text-primary-600 mr-3 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">User Behavior</h3>
              <p className="text-sm text-gray-600">
                Session duration, bounce rate, and user flow
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* View Analytics Link */}
      {isConfigured && (
        <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">View Your Analytics</h2>
          <p className="text-gray-600 mb-4">
            View detailed analytics reports, user behavior, and conversion data in Google Analytics.
          </p>
          <a
            href="https://analytics.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
          >
            Open Google Analytics Dashboard
            <ExternalLink className="w-5 h-5 ml-2" />
          </a>
        </div>
      )}
    </div>
  );
};

export default Analytics;
