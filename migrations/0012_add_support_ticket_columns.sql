-- Add support ticket fields to message_threads
-- Run this against your development database (replace DB/host/port/user as needed)
BEGIN;

-- Add columns (safe defaults where appropriate)
ALTER TABLE message_threads
  ADD COLUMN IF NOT EXISTS is_admin_support boolean NOT NULL DEFAULT false;

ALTER TABLE message_threads
  ADD COLUMN IF NOT EXISTS assigned_admin_id varchar(255);

ALTER TABLE message_threads
  ADD COLUMN IF NOT EXISTS ticket_status varchar(32) NOT NULL DEFAULT 'open';

ALTER TABLE message_threads
  ADD COLUMN IF NOT EXISTS ticket_priority varchar(32) NOT NULL DEFAULT 'normal';

ALTER TABLE message_threads
  ADD COLUMN IF NOT EXISTS resolved_at timestamptz;

-- Indexes to make lookups fast for admin views
CREATE INDEX IF NOT EXISTS idx_message_threads_is_admin_support ON message_threads(is_admin_support);
CREATE INDEX IF NOT EXISTS idx_message_threads_ticket_status ON message_threads(ticket_status);

COMMIT;
