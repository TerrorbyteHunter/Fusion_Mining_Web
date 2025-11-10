-- Add CMS permission flag to admin_permissions
ALTER TABLE admin_permissions
ADD COLUMN IF NOT EXISTS can_manage_cms BOOLEAN NOT NULL DEFAULT TRUE;


