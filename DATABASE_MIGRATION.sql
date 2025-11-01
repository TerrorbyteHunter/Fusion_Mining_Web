-- Database Migration for Enhanced Messaging System
-- Created: November 1, 2025
-- Description: Adds thread types and metadata for differentiated buyer/seller/admin messaging views

-- Step 1: Create new thread_type enum
CREATE TYPE thread_type AS ENUM ('project_interest', 'marketplace_inquiry', 'admin_to_seller', 'admin_to_buyer', 'general');

-- Step 2: Add new columns to message_threads table
ALTER TABLE message_threads
  ADD COLUMN type thread_type DEFAULT 'general' NOT NULL,
  ADD COLUMN admin_id VARCHAR REFERENCES users(id) ON DELETE CASCADE,
  ADD COLUMN created_by VARCHAR NOT NULL REFERENCES users(id) ON DELETE CASCADE;

-- Step 3: Create indexes for new columns
CREATE INDEX IDX_thread_admin_id ON message_threads(admin_id);
CREATE INDEX IDX_thread_created_by ON message_threads(created_by);
CREATE INDEX IDX_thread_type ON message_threads(type);

-- Step 4: Migrate existing data (set created_by to buyer_id for existing threads)
-- This assumes existing threads were created by the buyer
UPDATE message_threads
SET created_by = buyer_id
WHERE created_by IS NULL;

-- Step 5: Update existing thread types based on context
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
