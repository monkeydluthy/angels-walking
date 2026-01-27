import React, { useState, useEffect } from 'react';
import { 
  ExternalLink, 
  BarChart3, 
  Users, 
  MousePointerClick, 
  FileText,
  Phone,
  Mail,
  TrendingUp,
  Clock,
  Eye,
  MessageSquare,
  BookOpen,
  Star
} from 'lucide-react';

const Analytics = () => {
  const measurementId = process.env.REACT_APP_GA_MEASUREMENT_ID;
  const isConfigured = !!measurementId;
  const [timeRange, setTimeRange] = useState('30'); // days

  // Mock data structure - in production, this would come from GA API
  // For now, showing structure and linking to GA dashboard
  const mockMetrics = {
    pageviews: 0,
    sessions: 0,
    users: 0,
    avgSessionDuration: '0:00',
    formSubmits: 0,
    phoneCalls: 0,
    emailClicks: 0,
    ctaClicks: 0,
    quizCompletions: 0,
    serviceViews: 0,
    reviewActions: 0,
  };

  const mockTopPages = [
    { path: '/', views: 0, label: 'Home' },
    { path: '/contact', views: 0, label: 'Contact' },
    { path: '/about', views: 0, label: 'About' },
    { path: '/services', views: 0, label: 'Services' },
    { path: '/self-care-quiz', views: 0, label: 'Self-Care Quiz' },
    { path: '/spiritual-recovery', views: 0, label: 'Spiritual Recovery' },
    { path: '/angel-card-reading', views: 0, label: 'Angel Card Reading' },
    { path: '/addiction-recovery', views: 0, label: 'Addiction Recovery' },
    { path: '/life-coaching', views: 0, label: 'Life Coaching' },
    { path: '/success-stories', views: 0, label: 'Success Stories' },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
        <div className="flex items-center space-x-4">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="7">Last 7 days</option>
            <option value="30">Last 30 days</option>
            <option value="90">Last 90 days</option>
          </select>
        </div>
      </div>

      {/* Setup Status */}
      {!isConfigured && (
        <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg shadow p-6 mb-6">
          <div className="flex items-start">
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="ml-4 flex-1">
              <h3 className="text-lg font-semibold text-yellow-900 mb-2">
                ⚠️ Setup Required
              </h3>
              <p className="text-yellow-800 mb-4">
                Add your Google Analytics Measurement ID to start tracking. Data will appear here once configured.
              </p>
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
          </div>
        </div>
      )}

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {/* Pageviews */}
        <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
              <Eye className="w-6 h-6 text-primary-600" />
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">
            {mockMetrics.pageviews || '--'}
          </div>
          <div className="text-sm text-gray-600">Pageviews</div>
        </div>

        {/* Sessions */}
        <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-spiritual-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-spiritual-600" />
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">
            {mockMetrics.sessions || '--'}
          </div>
          <div className="text-sm text-gray-600">Sessions</div>
        </div>

        {/* Users */}
        <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-healing-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-healing-600" />
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">
            {mockMetrics.users || '--'}
          </div>
          <div className="text-sm text-gray-600">Users</div>
        </div>

        {/* Avg Session Duration */}
        <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-primary-600" />
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">
            {mockMetrics.avgSessionDuration || '--'}
          </div>
          <div className="text-sm text-gray-600">Avg. Session</div>
        </div>
      </div>

      {/* Engagement Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {/* Form Submits */}
        <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">
            {mockMetrics.formSubmits || '--'}
          </div>
          <div className="text-sm text-gray-600">Form Submits</div>
        </div>

        {/* Phone Calls */}
        <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Phone className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">
            {mockMetrics.phoneCalls || '--'}
          </div>
          <div className="text-sm text-gray-600">Phone Calls</div>
        </div>

        {/* Email Clicks */}
        <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Mail className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">
            {mockMetrics.emailClicks || '--'}
          </div>
          <div className="text-sm text-gray-600">Email Clicks</div>
        </div>

        {/* CTA Clicks */}
        <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <MousePointerClick className="w-6 h-6 text-orange-600" />
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">
            {mockMetrics.ctaClicks || '--'}
          </div>
          <div className="text-sm text-gray-600">CTA Clicks</div>
        </div>
      </div>

      {/* Additional Metrics for This App */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* Quiz Completions */}
        <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-healing-100 rounded-lg flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-healing-600" />
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">
            {mockMetrics.quizCompletions || '--'}
          </div>
          <div className="text-sm text-gray-600">Quiz Completions</div>
        </div>

        {/* Service Views */}
        <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-spiritual-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-spiritual-600" />
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">
            {mockMetrics.serviceViews || '--'}
          </div>
          <div className="text-sm text-gray-600">Service Views</div>
        </div>

        {/* Review Actions */}
        <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Star className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">
            {mockMetrics.reviewActions || '--'}
          </div>
          <div className="text-sm text-gray-600">Review Actions</div>
        </div>
      </div>

      {/* Top Pages Widget */}
      <div className="bg-white rounded-lg shadow p-6 border border-gray-200 mb-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            Top Pages (Last {timeRange} Days)
          </h2>
        </div>
        <div className="space-y-2">
          {mockTopPages.map((page, index) => (
            <div
              key={page.path}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <span className="text-sm font-medium text-gray-500 w-6">
                  {index + 1}
                </span>
                <span className="text-gray-900 font-medium">{page.label}</span>
                <span className="text-sm text-gray-500">{page.path}</span>
              </div>
              <span className="text-lg font-bold text-primary-600">
                {page.views || 0} views
              </span>
            </div>
          ))}
        </div>
        {isConfigured && (
          <div className="mt-6 pt-6 border-t border-gray-200">
            <a
              href="https://analytics.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center w-full justify-center px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
            >
              View Full Analytics Dashboard →
            </a>
            <p className="text-sm text-gray-500 text-center mt-3">
              See detailed reports, real-time data, and advanced insights in Google Analytics
            </p>
          </div>
        )}
      </div>

      {/* Info Note */}
      {isConfigured && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-800">
            <strong>Note:</strong> This dashboard shows a summary of key metrics. For real-time data and detailed analytics, 
            visit your Google Analytics dashboard. Data may take 24-48 hours to fully populate after initial setup.
          </p>
        </div>
      )}
    </div>
  );
};

export default Analytics;
