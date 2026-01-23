# Supabase Storage Buckets Setup

## Steps to Create Storage Buckets

1. Go to your Supabase project dashboard
2. Navigate to Storage section
3. Create the following buckets:

### Bucket 1: `success-story-images`
- **Public**: Yes (so images can be accessed publicly)
- **File size limit**: 5MB
- **Allowed MIME types**: image/jpeg, image/png, image/webp, image/gif

### Bucket 2: `success-story-videos` (Optional)
- **Public**: Yes
- **File size limit**: 50MB
- **Allowed MIME types**: video/mp4, video/webm, video/quicktime

## Storage Policies

After creating buckets, set up these policies in the Storage section:

### success-story-images Policies:
1. **Public Read Access**:
   - Policy Name: "Public can view images"
   - Operation: SELECT
   - Target Roles: anon, authenticated
   - Policy Definition: `bucket_id = 'success-story-images'`

2. **Admin Upload Access**:
   - Policy Name: "Admins can upload images"
   - Operation: INSERT
   - Target Roles: authenticated
   - Policy Definition: `bucket_id = 'success-story-images'`

3. **Admin Update/Delete Access**:
   - Policy Name: "Admins can manage images"
   - Operation: UPDATE, DELETE
   - Target Roles: authenticated
   - Policy Definition: `bucket_id = 'success-story-images'`

### success-story-videos Policies (if using):
Same as above but for `success-story-videos` bucket.

## Notes
- Make sure to enable RLS (Row Level Security) on the buckets
- The public read access allows the frontend to display images without authentication
- Only authenticated admin users can upload/manage files
