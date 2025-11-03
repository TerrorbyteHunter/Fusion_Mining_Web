-- Migration: 0006_add_thread_type_and_columns.sql
-- Purpose: Add thread_type enum and thread metadata columns to support admin/buyer/seller workflows
-- Created: 2025-11-01

DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'thread_type') THEN
    CREATE TYPE thread_type AS ENUM ('project_interest', 'marketplace_inquiry', 'admin_to_seller', 'admin_to_buyer', 'general');
  END IF;
END$$;

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'message_threads' AND column_name = 'type') THEN
    ALTER TABLE message_threads ADD COLUMN type thread_type DEFAULT 'general' NOT NULL;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'message_threads' AND column_name = 'admin_id') THEN
    ALTER TABLE message_threads ADD COLUMN admin_id VARCHAR REFERENCES users(id) ON DELETE CASCADE;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'message_threads' AND column_name = 'created_by') THEN
    ALTER TABLE message_threads ADD COLUMN created_by VARCHAR REFERENCES users(id) ON DELETE CASCADE;
  END IF;
END$$;

-- Populate created_by for existing threads (use buyer_id, then seller_id, then admin_id, then a fallback admin user)
UPDATE message_threads
SET created_by = COALESCE(
  buyer_id,
  seller_id,
  admin_id,
  (SELECT id FROM users WHERE role = 'admin' LIMIT 1)
)
WHERE created_by IS NULL;

-- Remove any orphaned threads without a creator
DELETE FROM message_threads WHERE created_by IS NULL;

-- Make created_by NOT NULL if it's currently nullable
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'message_threads' 
    AND column_name = 'created_by' 
    AND is_nullable = 'YES'
  ) THEN
    ALTER TABLE message_threads ALTER COLUMN created_by SET NOT NULL;
  END IF;
END$$;

CREATE INDEX IF NOT EXISTS IDX_thread_admin_id ON message_threads(admin_id);
CREATE INDEX IF NOT EXISTS IDX_thread_created_by ON message_threads(created_by);
CREATE INDEX IF NOT EXISTS IDX_thread_type ON message_threads(type);

-- Set thread.type based on existing context/project/listing data
UPDATE message_threads
SET type = 'project_interest'
WHERE context = 'project_interest' AND project_id IS NOT NULL;

UPDATE message_threads
SET type = 'marketplace_inquiry'
WHERE context = 'marketplace' AND listing_id IS NOT NULL;

-- End of migration
