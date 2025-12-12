-- Add admin_audit_logs table for tracking admin actions
-- Run this against your database
BEGIN;

CREATE TABLE IF NOT EXISTS admin_audit_logs (
  id varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  admin_id varchar NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  action varchar(100) NOT NULL,
  target_type varchar(50),
  target_id varchar,
  changes jsonb,
  ip_address varchar(45),
  user_agent text,
  created_at timestamp DEFAULT now() NOT NULL
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS IDX_audit_admin_id ON admin_audit_logs(admin_id);
CREATE INDEX IF NOT EXISTS IDX_audit_created ON admin_audit_logs(created_at);
CREATE INDEX IF NOT EXISTS IDX_audit_action ON admin_audit_logs(action);

COMMIT;

