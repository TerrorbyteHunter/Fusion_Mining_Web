-- Migration: 0007_split_project_inquiries_into_threads.sql
-- Purpose: Ensure each express_interest (buyer + project) has its own message_threads row.
-- This migration is reversible (it creates a backup table for previous message.thread_id values).
-- Recommended workflow: run the DRY-RUN SELECTs below first, inspect results, then run the migration inside pgAdmin.

-- DRY-RUN: express_interest rows that currently lack a dedicated project_interest thread
-- (run this first to inspect what would be created)
-- SELECT ei.id AS express_interest_id, ei.project_id, ei.user_id AS buyer_id, p.name AS project_name, ei.created_at
-- FROM express_interest ei
-- JOIN projects p ON p.id = ei.project_id
-- LEFT JOIN message_threads mt
--   ON mt.project_id = ei.project_id
--   AND mt.buyer_id = ei.user_id
--   AND mt.type = 'project_interest'
-- WHERE ei.project_id IS NOT NULL
--   AND mt.id IS NULL
-- ORDER BY ei.created_at DESC
-- LIMIT 200;

-- DRY-RUN: count messages per express_interest that WOULD be reassigned
-- SELECT ei.project_id, ei.user_id AS buyer_id, p.name AS project_name, COUNT(m.id) AS messages_matching
-- FROM express_interest ei
-- JOIN projects p ON p.id = ei.project_id
-- JOIN messages m ON m.related_project_id = ei.project_id
--   AND (m.sender_id = ei.user_id OR m.receiver_id = ei.user_id)
-- LEFT JOIN message_threads mt
--   ON mt.project_id = ei.project_id
--   AND mt.buyer_id = ei.user_id
--   AND mt.type = 'project_interest'
-- WHERE ei.project_id IS NOT NULL
--   AND mt.id IS NULL
-- GROUP BY ei.project_id, ei.user_id, p.name
-- ORDER BY messages_matching DESC
-- LIMIT 200;

-- When you're ready to apply changes, run the block below. It will:
-- 1) create a backup table `message_thread_reassign_backup` with previous message.thread_id values (so it's reversible)
-- 2) insert one `message_threads` row per express_interest that lacks one
-- 3) update messages to point to the new per-project-per-buyer thread

BEGIN;

-- Safety: don't recreate backup if it exists; fail if table already exists
DO $$
BEGIN
  IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'message_thread_reassign_backup') THEN
    RAISE NOTICE 'Backup table message_thread_reassign_backup already exists. Aborting to avoid overwriting.';
    RETURN;
  END IF;
  CREATE TABLE message_thread_reassign_backup (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    message_id varchar(255) NOT NULL,
    old_thread_id varchar(255),
    note text,
    created_at timestamp with time zone DEFAULT now()
  );
END$$;

-- Insert new threads for each express_interest that doesn't currently have a project_interest thread
WITH admin AS (
  SELECT id AS admin_id
  FROM users
  WHERE role = 'admin'
  LIMIT 1
),
to_create AS (
  SELECT
    ei.id AS express_interest_id,
    ei.project_id,
    ei.user_id AS buyer_id,
    ei.created_at,
    p.name AS project_name
  FROM express_interest ei
  JOIN projects p ON p.id = ei.project_id
  LEFT JOIN message_threads mt
    ON mt.project_id = ei.project_id
    AND mt.buyer_id = ei.user_id
    AND mt.type = 'project_interest'
  WHERE ei.project_id IS NOT NULL
    AND mt.id IS NULL
)
INSERT INTO message_threads (
  id, title, type, project_id, listing_id, buyer_id,
  seller_id, admin_id, created_by, context, status, last_message_at, created_at
)
SELECT
  gen_random_uuid() AS id,
  'Inquiry about: ' || to_create.project_name AS title,
  'project_interest'::thread_type AS type,
  to_create.project_id,
  NULL::varchar AS listing_id,
  to_create.buyer_id,
  admin.admin_id AS seller_id,
  admin.admin_id AS admin_id,
  to_create.buyer_id AS created_by,
  'project_interest'::message_context AS context,
  'open'::thread_status AS status,
  to_create.created_at AS last_message_at,
  to_create.created_at AS created_at
FROM to_create, admin;

-- Backup current messages that will be reassigned (store their old thread_id)
INSERT INTO message_thread_reassign_backup (message_id, old_thread_id, note)
SELECT m.id, m.thread_id, 'backup before reassignment to per-express_interest thread'
FROM messages m
JOIN express_interest ei ON ei.project_id IS NOT NULL
  AND m.related_project_id = ei.project_id
  AND (m.sender_id = ei.user_id OR m.receiver_id = ei.user_id)
LEFT JOIN message_threads mt
  ON mt.project_id = ei.project_id
  AND mt.buyer_id = ei.user_id
  AND mt.type = 'project_interest'
WHERE mt.id IS NULL
  AND (m.thread_id IS NULL OR m.thread_id IS NOT NULL);

-- Update messages to reference the newly created per-project-per-buyer thread
UPDATE messages m
SET thread_id = mt.id
FROM message_threads mt
JOIN express_interest ei ON ei.project_id = mt.project_id
  AND ei.user_id = mt.buyer_id
WHERE mt.type = 'project_interest'
  AND m.related_project_id IS NOT NULL
  AND m.related_project_id = mt.project_id
  AND (m.sender_id = mt.buyer_id OR m.receiver_id = mt.buyer_id)
  AND (m.thread_id IS NULL OR m.thread_id != mt.id);

COMMIT;

-- After running, verify newly created threads and message assignments using these sample queries:
-- SELECT mt.id, mt.project_id, mt.buyer_id, mt.created_at, mt.title FROM message_threads mt WHERE mt.type = 'project_interest' ORDER BY mt.created_at DESC LIMIT 200;
-- SELECT mt.id AS thread_id, mt.title, COUNT(m.id) AS message_count FROM message_threads mt LEFT JOIN messages m ON m.thread_id = mt.id WHERE mt.type = 'project_interest' GROUP BY mt.id, mt.title ORDER BY message_count DESC LIMIT 200;

-- ROLLBACK: to revert message thread assignments (if needed), you can use the backup table to restore message.thread_id:
-- UPDATE messages m SET thread_id = b.old_thread_id FROM message_thread_reassign_backup b WHERE m.id = b.message_id;

-- NOTE: This migration intentionally leaves old (combined) threads in place. If you want to remove them, do so only after verifying the new threads and backups.
