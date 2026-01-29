import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Check, X, Eye, Filter, Mail, MailCheck } from 'lucide-react';
import toast from 'react-hot-toast';

const FormSubmissions = () => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [filter, setFilter] = useState('all'); // all, unread, contact, self_care_quiz

  useEffect(() => {
    fetchSubmissions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  const fetchSubmissions = async () => {
    try {
      let query = supabase.from('form_submissions').select('*');

      if (filter === 'unread') {
        query = query.eq('read', false);
      } else if (filter !== 'all') {
        query = query.eq('form_type', filter);
      }

      const { data, error } = await query.order('created_at', {
        ascending: false,
      });

      if (error) throw error;
      setSubmissions(data || []);
    } catch (error) {
      toast.error('Error fetching submissions: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id, currentStatus) => {
    try {
      const { error } = await supabase
        .from('form_submissions')
        .update({ read: !currentStatus })
        .eq('id', id);

      if (error) throw error;
      toast.success(`Marked as ${!currentStatus ? 'read' : 'unread'}`);
      fetchSubmissions();
    } catch (error) {
      toast.error('Error updating submission: ' + error.message);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  const renderSubmissionData = (data) => {
    if (!data) return null;

    return Object.entries(data).map(([key, value]) => (
      <div key={key} className="mb-3">
        <span className="font-semibold text-gray-700 capitalize">
          {key.replace(/_/g, ' ')}:
        </span>{' '}
        <span className="text-gray-600">
          {typeof value === 'object' ? JSON.stringify(value) : String(value)}
        </span>
      </div>
    ));
  };

  if (loading) {
    return <div className="text-center py-12">Loading submissions...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Form Submissions</h1>
        <div className="flex items-center space-x-2">
          <Filter className="w-5 h-5 text-gray-600" />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-2 border rounded-lg"
          >
            <option value="all">All Submissions</option>
            <option value="unread">Unread Only</option>
            <option value="contact">Contact Form</option>
            <option value="self_care_quiz">Self-Care Quiz</option>
            <option value="consultation">Consultation</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                Details
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {submissions.map((submission) => (
              <tr
                key={submission.id}
                className={!submission.read ? 'bg-blue-50' : ''}
              >
                <td className="px-6 py-4">
                  <span className="px-2 py-1 bg-primary-100 text-primary-700 rounded text-xs font-semibold capitalize">
                    {submission.form_type.replace(/_/g, ' ')}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {formatDate(submission.created_at)}
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm">
                    {submission.data?.firstName && (
                      <div>
                        <strong>{submission.data.firstName}</strong>{' '}
                        {submission.data.lastName}
                      </div>
                    )}
                    {submission.data?.email && (
                      <div className="text-gray-600">{submission.data.email}</div>
                    )}
                    {submission.data?.contactInfo?.email && (
                      <div className="text-gray-600">{submission.data.contactInfo.email}</div>
                    )}
                    {submission.data?.contactInfo?.phone && (
                      <div className="text-gray-600">{submission.data.contactInfo.phone}</div>
                    )}
                    {submission.data?.service && (
                      <div className="text-gray-600">
                        Service: {submission.data.service}
                      </div>
                    )}
                    {submission.data?.name && (
                      <div className="text-gray-600">{submission.data.name}</div>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4">
                  {submission.read ? (
                    <span className="text-green-600 text-sm">Read</span>
                  ) : (
                    <span className="text-blue-600 text-sm font-semibold">
                      Unread
                    </span>
                  )}
                </td>
                <td className="px-6 py-4">
                  {submission.email_sent ? (
                    <div className="flex items-center space-x-1 text-green-600" title="Email sent successfully">
                      <MailCheck className="w-4 h-4" />
                      <span className="text-sm">Sent</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-1 text-red-600" title="Email not sent">
                      <Mail className="w-4 h-4" />
                      <span className="text-sm">Failed</span>
                    </div>
                  )}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setSelectedSubmission(submission)}
                      className="p-2 hover:bg-gray-100 rounded"
                      title="View Details"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => markAsRead(submission.id, submission.read)}
                      className="p-2 hover:bg-gray-100 rounded"
                      title={submission.read ? 'Mark as Unread' : 'Mark as Read'}
                    >
                      {submission.read ? (
                        <X className="w-4 h-4 text-gray-600" />
                      ) : (
                        <Check className="w-4 h-4 text-green-600" />
                      )}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {submissions.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            No submissions found.
          </div>
        )}
      </div>

      {/* Submission Detail Modal */}
      {selectedSubmission && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">
                Submission Details
              </h2>
              <button
                onClick={() => setSelectedSubmission(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6">
              <div className="mb-4">
                <span className="font-semibold">Type: </span>
                <span className="px-2 py-1 bg-primary-100 text-primary-700 rounded text-sm capitalize">
                  {selectedSubmission.form_type.replace(/_/g, ' ')}
                </span>
              </div>
              <div className="mb-4">
                <span className="font-semibold">Date: </span>
                <span>{formatDate(selectedSubmission.created_at)}</span>
              </div>
              <div className="mb-4">
                <span className="font-semibold">Status: </span>
                <span
                  className={
                    selectedSubmission.read
                      ? 'text-green-600'
                      : 'text-blue-600 font-semibold'
                  }
                >
                  {selectedSubmission.read ? 'Read' : 'Unread'}
                </span>
              </div>
              <div className="border-t pt-4">
                <h3 className="font-semibold mb-3">Submission Data:</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  {renderSubmissionData(selectedSubmission.data)}
                </div>
              </div>
              <div className="mt-6 flex space-x-4">
                <button
                  onClick={() =>
                    markAsRead(
                      selectedSubmission.id,
                      selectedSubmission.read
                    )
                  }
                  className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
                >
                  {selectedSubmission.read
                    ? 'Mark as Unread'
                    : 'Mark as Read'}
                </button>
                <button
                  onClick={() => setSelectedSubmission(null)}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FormSubmissions;
