-- Add admin_permissions table for granular admin RBAC
CREATE TABLE IF NOT EXISTS admin_permissions (
    id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
    admin_user_id VARCHAR NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
    can_manage_users BOOLEAN NOT NULL DEFAULT TRUE,
    can_manage_listings BOOLEAN NOT NULL DEFAULT TRUE,
    can_manage_projects BOOLEAN NOT NULL DEFAULT TRUE,
    can_manage_blog BOOLEAN NOT NULL DEFAULT TRUE,
    can_view_analytics BOOLEAN NOT NULL DEFAULT TRUE,
    can_manage_messages BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Seed default permissions for existing admins
INSERT INTO admin_permissions (admin_user_id)
SELECT id FROM users WHERE role = 'admin'
ON CONFLICT (admin_user_id) DO NOTHING;


