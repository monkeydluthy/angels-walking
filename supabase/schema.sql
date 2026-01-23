-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Success Stories Table
CREATE TABLE IF NOT EXISTS success_stories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  service TEXT NOT NULL,
  location TEXT NOT NULL,
  summary TEXT NOT NULL,
  image_url TEXT,
  video_url TEXT,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5) DEFAULT 5,
  is_published BOOLEAN DEFAULT false,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Form Submissions Table
CREATE TABLE IF NOT EXISTS form_submissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  form_type TEXT NOT NULL CHECK (form_type IN ('contact', 'self_care_quiz', 'consultation')),
  data JSONB NOT NULL,
  read BOOLEAN DEFAULT false,
  email_sent BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Analytics Events Table (optional, for custom tracking)
CREATE TABLE IF NOT EXISTS analytics_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_type TEXT NOT NULL,
  page_path TEXT,
  user_data JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_success_stories_published ON success_stories(is_published, display_order);
CREATE INDEX IF NOT EXISTS idx_form_submissions_type ON form_submissions(form_type, created_at);
CREATE INDEX IF NOT EXISTS idx_form_submissions_read ON form_submissions(read, created_at);
CREATE INDEX IF NOT EXISTS idx_analytics_events_type ON analytics_events(event_type, created_at);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to automatically update updated_at
CREATE TRIGGER update_success_stories_updated_at
  BEFORE UPDATE ON success_stories
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Row Level Security (RLS) Policies

-- Enable RLS on all tables
ALTER TABLE success_stories ENABLE ROW LEVEL SECURITY;
ALTER TABLE form_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics_events ENABLE ROW LEVEL SECURITY;

-- Success Stories: Public can read published stories, authenticated admins can do everything
CREATE POLICY "Public can view published success stories"
  ON success_stories FOR SELECT
  USING (is_published = true);

CREATE POLICY "Admins can manage success stories"
  ON success_stories FOR ALL
  USING (auth.role() = 'authenticated');

-- Form Submissions: Only admins can read
CREATE POLICY "Admins can view form submissions"
  ON form_submissions FOR SELECT
  USING (auth.role() = 'authenticated');

CREATE POLICY "Anyone can insert form submissions"
  ON form_submissions FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admins can update form submissions"
  ON form_submissions FOR UPDATE
  USING (auth.role() = 'authenticated');

-- Analytics: Only admins can read, anyone can insert
CREATE POLICY "Anyone can insert analytics events"
  ON analytics_events FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admins can view analytics"
  ON analytics_events FOR SELECT
  USING (auth.role() = 'authenticated');
