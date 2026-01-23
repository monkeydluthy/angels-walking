import React, { useEffect, useState } from 'react';
import { supabase, getStorageUrl } from '../../lib/supabase';
import { Plus, Edit, Trash2, Eye, EyeOff, Image as ImageIcon, Play } from 'lucide-react';
import toast from 'react-hot-toast';

const SuccessStories = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingStory, setEditingStory] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    service: '',
    location: '',
    summary: '',
    rating: 5,
    is_published: false,
    display_order: 0,
  });
  const [imageFile, setImageFile] = useState(null);
  const [videoFile, setVideoFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchStories();
  }, []);

  const fetchStories = async () => {
    try {
      const { data, error } = await supabase
        .from('success_stories')
        .select('*')
        .order('display_order', { ascending: true });

      if (error) throw error;
      setStories(data || []);
    } catch (error) {
      toast.error('Error fetching stories: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleVideoChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setVideoFile(e.target.files[0]);
    }
  };

  const uploadImage = async (storyId) => {
    if (!imageFile) return null;

    try {
      const fileExt = imageFile.name.split('.').pop();
      const fileName = `${storyId}-${Date.now()}.${fileExt}`;
      const filePath = `success-stories/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('success-story-images')
        .upload(filePath, imageFile);

      if (uploadError) throw uploadError;

      return filePath;
    } catch (error) {
      toast.error('Error uploading image: ' + error.message);
      return null;
    }
  };

  const uploadVideo = async (storyId) => {
    if (!videoFile) return null;

    try {
      const fileExt = videoFile.name.split('.').pop();
      const fileName = `${storyId}-${Date.now()}.${fileExt}`;
      const filePath = `success-stories/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('success-story-videos')
        .upload(filePath, videoFile);

      if (uploadError) throw uploadError;

      return filePath;
    } catch (error) {
      toast.error('Error uploading video: ' + error.message);
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);

    try {
      let imageUrl = null;
      let videoUrl = null;

      if (editingStory) {
        // Update existing story
        if (imageFile) {
          // Delete old image if exists
          if (editingStory.image_url) {
            try {
              // Extract path from Supabase URL
              const urlParts = editingStory.image_url.split('/');
              const bucketIndex = urlParts.findIndex(part => part === 'success-story-images');
              if (bucketIndex !== -1) {
                const oldPath = urlParts.slice(bucketIndex + 1).join('/');
                await supabase.storage
                  .from('success-story-images')
                  .remove([oldPath]);
              }
            } catch (err) {
              console.error('Error deleting old image:', err);
              // Continue anyway
            }
          }
          const imagePath = await uploadImage(editingStory.id);
          if (imagePath) {
            imageUrl = getStorageUrl('success-story-images', imagePath);
          }
        }

        if (videoFile) {
          // Delete old video if exists
          if (editingStory.video_url) {
            try {
              // Extract path from URL - format is usually: https://xxx.supabase.co/storage/v1/object/public/success-story-videos/success-stories/filename
              const urlParts = editingStory.video_url.split('/');
              const pathIndex = urlParts.findIndex(part => part === 'success-story-videos');
              if (pathIndex !== -1) {
                const oldPath = urlParts.slice(pathIndex + 1).join('/');
                await supabase.storage
                  .from('success-story-videos')
                  .remove([oldPath]);
              }
            } catch (err) {
              console.error('Error deleting old video:', err);
              // Continue anyway
            }
          }
          const videoPath = await uploadVideo(editingStory.id);
          if (videoPath) {
            videoUrl = getStorageUrl('success-story-videos', videoPath);
          }
        }

        const updateData = {
          ...formData,
          image_url: imageUrl || editingStory.image_url,
        };

        // Only update video_url if we have a new video or explicitly want to keep the old one
        if (videoUrl) {
          updateData.video_url = videoUrl;
        } else if (videoFile === null && editingStory.video_url) {
          // Keep existing video if no new file selected
          updateData.video_url = editingStory.video_url;
        }

        const { error } = await supabase
          .from('success_stories')
          .update(updateData)
          .eq('id', editingStory.id);

        if (error) throw error;
        toast.success('Story updated successfully!');
      } else {
        // Create new story
        const { data: newStory, error } = await supabase
          .from('success_stories')
          .insert([formData])
          .select()
          .single();

        if (error) throw error;

        if (imageFile) {
          const imagePath = await uploadImage(newStory.id);
          if (imagePath) {
            imageUrl = getStorageUrl('success-story-images', imagePath);
          }
        }

        if (videoFile) {
          const videoPath = await uploadVideo(newStory.id);
          if (videoPath) {
            videoUrl = getStorageUrl('success-story-videos', videoPath);
          }
        }

        // Update with URLs if we uploaded files
        if (imageUrl || videoUrl) {
          await supabase
            .from('success_stories')
            .update({
              image_url: imageUrl,
              video_url: videoUrl,
            })
            .eq('id', newStory.id);
        }

        toast.success('Story created successfully!');
      }

      resetForm();
      fetchStories();
    } catch (error) {
      toast.error('Error saving story: ' + error.message);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this story?')) return;

    try {
      // Find the story to get file URLs
      const story = stories.find((s) => s.id === id);
      
      // Delete image from storage if it exists
      if (story?.image_url) {
        try {
          // Extract path from Supabase URL
          // Format: https://xxx.supabase.co/storage/v1/object/public/success-story-images/success-stories/filename.ext
          const urlParts = story.image_url.split('/');
          const bucketIndex = urlParts.findIndex(part => part === 'success-story-images');
          if (bucketIndex !== -1) {
            const filePath = urlParts.slice(bucketIndex + 1).join('/');
            await supabase.storage
              .from('success-story-images')
              .remove([filePath]);
          }
        } catch (err) {
          console.error('Error deleting image:', err);
          // Continue with deletion even if image deletion fails
        }
      }

      // Delete video from storage if it exists
      if (story?.video_url) {
        try {
          // Extract path from Supabase URL
          const urlParts = story.video_url.split('/');
          const bucketIndex = urlParts.findIndex(part => part === 'success-story-videos');
          if (bucketIndex !== -1) {
            const filePath = urlParts.slice(bucketIndex + 1).join('/');
            await supabase.storage
              .from('success-story-videos')
              .remove([filePath]);
          }
        } catch (err) {
          console.error('Error deleting video:', err);
          // Continue with deletion even if video deletion fails
        }
      }

      // Delete the story record from database
      const { error } = await supabase
        .from('success_stories')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast.success('Story and associated files deleted successfully!');
      fetchStories();
    } catch (error) {
      toast.error('Error deleting story: ' + error.message);
    }
  };

  const handleEdit = (story) => {
    setEditingStory(story);
    setFormData({
      name: story.name,
      service: story.service,
      location: story.location,
      summary: story.summary,
      rating: story.rating,
      is_published: story.is_published,
      display_order: story.display_order,
    });
    setShowForm(true);
  };

  const togglePublish = async (story) => {
    try {
      const { error } = await supabase
        .from('success_stories')
        .update({ is_published: !story.is_published })
        .eq('id', story.id);

      if (error) throw error;
      toast.success(
        `Story ${!story.is_published ? 'published' : 'unpublished'}!`
      );
      fetchStories();
    } catch (error) {
      toast.error('Error updating story: ' + error.message);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      service: '',
      location: '',
      summary: '',
      rating: 5,
      is_published: false,
      display_order: 0,
    });
    setImageFile(null);
    setVideoFile(null);
    setEditingStory(null);
    setShowForm(false);
  };

  if (loading) {
    return <div className="text-center py-12">Loading stories...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Success Stories</h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-primary-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-primary-700"
        >
          <Plus className="w-5 h-5" />
          <span>Add New Story</span>
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-lg shadow p-6 mb-8 border border-gray-200">
          <h2 className="text-xl font-semibold mb-4">
            {editingStory ? 'Edit Story' : 'Create New Story'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-4 py-2 border rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Service
                </label>
                <input
                  type="text"
                  value={formData.service}
                  onChange={(e) =>
                    setFormData({ ...formData, service: e.target.value })
                  }
                  className="w-full px-4 py-2 border rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Location
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                  className="w-full px-4 py-2 border rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Rating
                </label>
                <input
                  type="number"
                  min="1"
                  max="5"
                  value={formData.rating}
                  onChange={(e) =>
                    setFormData({ ...formData, rating: parseInt(e.target.value) })
                  }
                  className="w-full px-4 py-2 border rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Display Order
                </label>
                <input
                  type="number"
                  value={formData.display_order}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      display_order: parseInt(e.target.value),
                    })
                  }
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Video (Optional)
                </label>
                <input
                  type="file"
                  accept="video/mp4,video/webm,video/quicktime,video/x-msvideo"
                  onChange={handleVideoChange}
                  className="w-full px-4 py-2 border rounded-lg"
                />
                {videoFile && (
                  <p className="text-sm text-gray-600 mt-1">
                    Selected: {videoFile.name} ({(videoFile.size / 1024 / 1024).toFixed(2)} MB)
                  </p>
                )}
                <p className="text-xs text-gray-500 mt-1">
                  Supported: MP4, WebM, QuickTime, AVI (Max 50MB)
                </p>
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Summary</label>
              <textarea
                value={formData.summary}
                onChange={(e) =>
                  setFormData({ ...formData, summary: e.target.value })
                }
                rows="4"
                className="w-full px-4 py-2 border rounded-lg"
                required
              />
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.is_published}
                onChange={(e) =>
                  setFormData({ ...formData, is_published: e.target.checked })
                }
                className="w-4 h-4"
              />
              <label className="text-sm font-semibold">Published</label>
            </div>
            <div className="flex space-x-4">
              <button
                type="submit"
                disabled={uploading}
                className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 disabled:opacity-50"
              >
                {uploading ? 'Saving...' : editingStory ? 'Update' : 'Create'}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stories.map((story) => (
          <div
            key={story.id}
            className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden"
          >
            <div className="h-48 bg-gradient-to-br from-primary-100 to-spiritual-100 relative">
              {story.image_url ? (
                <img
                  src={story.image_url}
                  alt={story.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <ImageIcon className="w-16 h-16 text-gray-400" />
                </div>
              )}
              <div className="absolute top-2 right-2 flex flex-col items-end space-y-1">
                {story.is_published ? (
                  <span className="bg-green-500 text-white px-2 py-1 rounded text-xs">
                    Published
                  </span>
                ) : (
                  <span className="bg-gray-500 text-white px-2 py-1 rounded text-xs">
                    Draft
                  </span>
                )}
                {story.video_url && (
                  <span className="bg-primary-600 text-white px-2 py-1 rounded text-xs flex items-center space-x-1">
                    <Play className="w-3 h-3" />
                    <span>Video</span>
                  </span>
                )}
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-bold text-lg mb-1">{story.name}</h3>
              <p className="text-sm text-gray-600 mb-2">{story.location}</p>
              <p className="text-sm text-primary-600 mb-2">{story.service}</p>
              <p className="text-sm text-gray-700 line-clamp-2 mb-4">
                {story.summary}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex space-x-1">
                  {[...Array(story.rating)].map((_, i) => (
                    <span key={i} className="text-yellow-400">★</span>
                  ))}
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => togglePublish(story)}
                    className="p-2 hover:bg-gray-100 rounded"
                    title={story.is_published ? 'Unpublish' : 'Publish'}
                  >
                    {story.is_published ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                  <button
                    onClick={() => handleEdit(story)}
                    className="p-2 hover:bg-gray-100 rounded"
                    title="Edit"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(story.id)}
                    className="p-2 hover:bg-red-100 rounded text-red-600"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {stories.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          No success stories yet. Create your first one!
        </div>
      )}
    </div>
  );
};

export default SuccessStories;
