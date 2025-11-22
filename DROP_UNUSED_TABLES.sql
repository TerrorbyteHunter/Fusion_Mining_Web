-- Fusion Mining Limited - Drop Unused Tables
-- This script removes 14 unused tables from the database
-- Run this BEFORE updating your schema.ts file

-- Drop in dependency order to avoid cascade issues
DROP TABLE IF EXISTS email_templates CASCADE;
DROP TABLE IF EXISTS document_templates CASCADE;
DROP TABLE IF EXISTS message_templates CASCADE;
DROP TABLE IF EXISTS verification_rules CASCADE;
DROP TABLE IF EXISTS login_history CASCADE;
DROP TABLE IF EXISTS message_idempotency CASCADE;
DROP TABLE IF EXISTS tier_usage_tracking CASCADE;
DROP TABLE IF EXISTS settings_audit CASCADE;
DROP TABLE IF EXISTS platform_settings CASCADE;
DROP TABLE IF EXISTS contact_settings CASCADE;
DROP TABLE IF EXISTS sustainability_content CASCADE;
DROP TABLE IF EXISTS videos CASCADE;
DROP TABLE IF EXISTS admin_audit_logs CASCADE;
DROP TABLE IF EXISTS two_factor_auth CASCADE;

-- Verify remaining tables
SELECT COUNT(*) as remaining_tables FROM information_schema.tables WHERE table_schema = 'public';

-- Optional: List all remaining tables
SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' ORDER BY table_name;
