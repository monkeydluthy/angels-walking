# Supabase Setup Instructions

## Step 1: Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Sign up or log in
3. Click "New Project"
4. Fill in project details:
   - Name: `angels-walking`
   - Database Password: (choose a strong password)
   - Region: (choose closest to your users)
5. Wait for project to be created (2-3 minutes)

## Step 2: Get Your API Keys

1. Go to Project Settings (gear icon)
2. Click on "API" in the sidebar
3. Copy these values:
   - **Project URL** (e.g., `https://xxxxx.supabase.co`)
   - **anon/public key** (starts with `eyJ...`)

## Step 3: Set Up Environment Variables

1. Create a `.env` file in the root of your project
2. Add these lines:
   ```
   REACT_APP_SUPABASE_URL=your_project_url_here
   REACT_APP_SUPABASE_ANON_KEY=your_anon_key_here
   ```
3. Replace the placeholder values with your actual keys

## Step 4: Run Database Schema

1. Go to your Supabase project dashboard
2. Click on "SQL Editor" in the sidebar
3. Click "New Query"
4. Copy the entire contents of `supabase/schema.sql`
5. Paste into the SQL editor
6. Click "Run" (or press Cmd/Ctrl + Enter)
7. You should see "Success. No rows returned"

## Step 5: Set Up Storage Buckets

1. Go to "Storage" in the sidebar
2. Click "New bucket"
3. Create bucket: `success-story-images`
   - Make it **Public**
   - Click "Create bucket"
4. (Optional) Create bucket: `success-story-videos`
   - Make it **Public**
   - Click "Create bucket"

## Step 6: Set Up Storage Policies

For the `success-story-images` bucket:

1. Click on the bucket name
2. Go to "Policies" tab
3. Click "New Policy"
4. Create these policies:

**Policy 1: Public Read**
- Policy name: "Public can view images"
- Allowed operation: SELECT
- Target roles: `anon`, `authenticated`
- Policy definition: `bucket_id = 'success-story-images'`

**Policy 2: Admin Upload**
- Policy name: "Admins can upload images"
- Allowed operation: INSERT
- Target roles: `authenticated`
- Policy definition: `bucket_id = 'success-story-images'`

**Policy 3: Admin Manage**
- Policy name: "Admins can manage images"
- Allowed operation: UPDATE, DELETE
- Target roles: `authenticated`
- Policy definition: `bucket_id = 'success-story-images'`

Repeat for `success-story-videos` if you created it.

## Step 7: Create Admin Users

1. Go to "Authentication" in the sidebar
2. Click "Users"
3. Click "Add user" → "Create new user"
4. Create first admin user:
   - Email: `luthdigitalconsult@gmail.com`
   - Password: (you'll set this manually)
   - Auto Confirm User: ✅ (check this)
   - Click "Create user"
5. Create second admin user:
   - Email: `gladys@angelswalking.com`
   - Password: `Gladysangel1!`
   - Auto Confirm User: ✅ (check this)
   - Click "Create user"

## Step 8: Test the Setup

1. Start your React app: `npm start`
2. Navigate to `/admin/login`
3. Try logging in with one of the admin accounts
4. If successful, you should see the dashboard!

## Troubleshooting

### Can't connect to Supabase
- Check your `.env` file has the correct values
- Make sure you restarted the dev server after adding `.env`
- Verify the URL and key in Supabase dashboard

### RLS Policy Errors
- Make sure you ran the schema.sql file completely
- Check that RLS is enabled on all tables
- Verify policies are set correctly

### Storage Upload Errors
- Check bucket is set to Public
- Verify storage policies are created
- Make sure you're authenticated as admin

### Authentication Issues
- Verify users are created in Supabase Auth
- Check "Auto Confirm User" is enabled
- Try resetting password if needed

## Next Steps

Once everything is set up:
1. Log into admin panel
2. Create your first success story
3. Upload an image
4. Publish it
5. Check the public Success Stories page to see it!
