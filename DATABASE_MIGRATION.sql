-- Database Migration for Enhanced Messaging System
-- Created: November 1, 2025
-- Description: Adds thread types and metadata for differentiated buyer/seller/admin messaging views

-- Step 1: Create new thread_type enum (if it doesn't exist)
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'thread_type') THEN
    CREATE TYPE thread_type AS ENUM ('project_interest', 'marketplace_inquiry', 'admin_to_seller', 'admin_to_buyer', 'general');
  END IF;
END$$;

-- Step 2: Add new columns to message_threads table (created_by nullable first, if they don't exist)
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

-- Step 3: Migrate existing data (set created_by before making it NOT NULL)
-- Use buyer_id as the creator for existing threads, fall back to seller_id, then admin_id
-- For threads with all NULL participants, try to get first admin user as fallback
UPDATE message_threads
SET created_by = COALESCE(
  buyer_id, 
  seller_id, 
  admin_id,
  (SELECT id FROM users WHERE role = 'admin' LIMIT 1)
)
WHERE created_by IS NULL;

-- Delete any remaining threads that still have NULL created_by (orphaned threads with no participants)
DELETE FROM message_threads WHERE created_by IS NULL;

-- Step 4: Now make created_by NOT NULL (after populating it, if not already)
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

-- Step 5: Create indexes for new columns (if they don't exist)
CREATE INDEX IF NOT EXISTS IDX_thread_admin_id ON message_threads(admin_id);
CREATE INDEX IF NOT EXISTS IDX_thread_created_by ON message_threads(created_by);
CREATE INDEX IF NOT EXISTS IDX_thread_type ON message_threads(type);

-- Step 6: Update existing thread types based on context
UPDATE message_threads
SET type = 'project_interest'
WHERE context = 'project_interest' AND project_id IS NOT NULL;

UPDATE message_threads
SET type = 'marketplace_inquiry'
WHERE context = 'marketplace' AND listing_id IS NOT NULL;

-- Note: After running this migration, you should push the schema using:
-- npm run db:push --force

-- Verification queries:
-- SELECT type, COUNT(*) FROM message_threads GROUP BY type;
-- SELECT * FROM message_threads WHERE created_by IS NULL; -- Should return 0 rows
