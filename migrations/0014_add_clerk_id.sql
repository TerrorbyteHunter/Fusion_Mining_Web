-- Add clerk_id to users table
ALTER TABLE users ADD COLUMN clerk_id VARCHAR(255) UNIQUE;