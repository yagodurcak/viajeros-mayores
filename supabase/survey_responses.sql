-- Survey responses: stores user preferences about desired content
-- Run this in Supabase SQL Editor

CREATE TABLE IF NOT EXISTS survey_responses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT now(),
  response_option TEXT NOT NULL, -- 'offers' | 'tips' | 'destinations' | 'community' | 'other'
  other_text TEXT,               -- free text when response_option = 'other'
  page_url TEXT                  -- URL where the popup appeared
);

-- Only allow inserts from public (anon/authenticated), no reads via client
ALTER TABLE survey_responses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert survey response"
  ON survey_responses FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);
