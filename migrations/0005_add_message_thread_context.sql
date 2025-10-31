-- Add message_context enum if it doesn't exist
DO $$ BEGIN
    CREATE TYPE message_context AS ENUM ('marketplace', 'project_interest', 'general');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Add context column to message_threads table
ALTER TABLE message_threads
ADD COLUMN IF NOT EXISTS context message_context DEFAULT 'general';