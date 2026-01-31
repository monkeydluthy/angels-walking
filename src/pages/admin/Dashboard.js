import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { BookOpen, FileText, Eye, TrendingUp } from 'lucide-react';
import PageMeta from '../../components/PageMeta';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalStories: 0,
    publishedStories: 0,
    totalSubmissions: 0,
    unreadSubmissions: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      // Get success stories count
      const { count: totalStories } = await supabase
        .from('success_stories')
        .select('*', { count: 'exact', head: true });

      const { count: publishedStories } = await supabase
        .from('success_stories')
        .select('*', { count: 'exact', head: true })
        .eq('is_published', true);

      // Get form submissions count
      const { count: totalSubmissions } = await supabase
        .from('form_submissions')
        .select('*', { count: 'exact', head: true });

      const { count: unreadSubmissions } = await supabase
        .from('form_submissions')
        .select('*', { count: 'exact', head: true })
        .eq('read', false);

      setStats({
        totalStories: totalStories || 0,
        publishedStories: publishedStories || 0,
        totalSubmissions: totalSubmissions || 0,
        unreadSubmissions: unreadSubmissions || 0,
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: 'Total Stories',
      value: stats.totalStories,
      icon: BookOpen,
      color: 'primary',
    },
    {
      title: 'Published Stories',
      value: stats.publishedStories,
      icon: Eye,
      color: 'spiritual',
    },
    {
      title: 'Total Submissions',
      value: stats.totalSubmissions,
      icon: FileText,
      color: 'healing',
    },
    {
      title: 'Unread Submissions',
      value: stats.unreadSubmissions,
      icon: TrendingUp,
      color: 'primary',
    },
  ];

  if (loading) {
    return <div className="text-center py-12">Loading dashboard...</div>;
  }

  return (
    <div>
      <PageMeta title="Admin - Dashboard" />
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.title}
              className="bg-white rounded-lg shadow p-6 border border-gray-200"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {stat.value}
                  </p>
                </div>
                <div className={`w-12 h-12 bg-${stat.color}-100 rounded-lg flex items-center justify-center`}>
                  <Icon className={`w-6 h-6 text-${stat.color}-600`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Quick Actions
        </h2>
        <div className="space-y-2">
          <p className="text-gray-600">
            • Add new success story with image upload
          </p>
          <p className="text-gray-600">• View and manage form submissions</p>
          <p className="text-gray-600">• Check analytics and insights</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
