-- Add unread flag to messages table
ALTER TABLE "messages" ADD COLUMN IF NOT EXISTS "unread" boolean DEFAULT true NOT NULL;

-- Initially mark all messages as unread
UPDATE "messages" SET "unread" = true WHERE "unread" IS NULL;

-- Add an index to improve performance of unread message queries
CREATE INDEX IF NOT EXISTS "IDX_message_unread" ON "messages" ("unread");

-- Migrate any existing message threads to include unread status
UPDATE "messages" 
SET "unread" = CASE WHEN "read" = true THEN false ELSE true END 
WHERE "read" IS NOT NULL;