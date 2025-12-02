-- ============================================================================
-- Fusion Mining Limited - Database Setup Script for pgAdmin4 Testing
-- Generated: December 2025
-- 
-- This script creates all necessary tables and inserts test data for the
-- Fusion Mining Limited platform admin permission system.
-- ============================================================================

-- Drop existing tables if they exist (be careful in production!)
-- Uncomment these lines if you want to reset the database
-- DROP TABLE IF EXISTS admin_permissions CASCADE;
-- DROP TABLE IF EXISTS user_profiles CASCADE;
-- DROP TABLE IF EXISTS users CASCADE;

-- ============================================================================
-- Create ENUM Types
-- ============================================================================

DO $$ 
BEGIN
    -- User role enum
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'user_role') THEN
        CREATE TYPE user_role AS ENUM ('admin', 'buyer', 'seller');
    END IF;
    
    -- Admin role enum
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'admin_role') THEN
        CREATE TYPE admin_role AS ENUM ('super_admin', 'verification_admin', 'content_admin', 'support_admin', 'analytics_admin');
    END IF;
    
    -- Membership tier enum
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'membership_tier') THEN
        CREATE TYPE membership_tier AS ENUM ('basic', 'standard', 'premium');
    END IF;
    
    -- Verification status enum
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'verification_status') THEN
        CREATE TYPE verification_status AS ENUM ('not_requested', 'pending', 'approved', 'rejected');
    END IF;
    
    -- Profile type enum
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'profile_type') THEN
        CREATE TYPE profile_type AS ENUM ('individual', 'company');
    END IF;
END $$;

-- ============================================================================
-- Create Users Table
-- ============================================================================

CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(255) PRIMARY KEY DEFAULT gen_random_uuid()::varchar,
    email VARCHAR(255) UNIQUE,
    username VARCHAR(255) UNIQUE,
    password VARCHAR(255),
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    profile_image_url VARCHAR(255),
    role user_role NOT NULL DEFAULT 'buyer',
    membership_tier membership_tier NOT NULL DEFAULT 'basic',
    verification_status verification_status NOT NULL DEFAULT 'not_requested',
    badge_color VARCHAR(50),
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- ============================================================================
-- Create Admin Permissions Table
-- ============================================================================

CREATE TABLE IF NOT EXISTS admin_permissions (
    id VARCHAR(255) PRIMARY KEY DEFAULT gen_random_uuid()::varchar,
    admin_user_id VARCHAR(255) NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
    admin_role admin_role NOT NULL DEFAULT 'content_admin',
    -- Core permissions
    can_manage_users BOOLEAN NOT NULL DEFAULT false,
    can_manage_listings BOOLEAN NOT NULL DEFAULT false,
    can_manage_projects BOOLEAN NOT NULL DEFAULT false,
    can_manage_blog BOOLEAN NOT NULL DEFAULT false,
    can_manage_cms BOOLEAN NOT NULL DEFAULT false,
    can_view_analytics BOOLEAN NOT NULL DEFAULT false,
    can_manage_messages BOOLEAN NOT NULL DEFAULT false,
    -- Enhanced permissions
    can_manage_verification BOOLEAN NOT NULL DEFAULT false,
    can_manage_settings BOOLEAN NOT NULL DEFAULT false,
    can_manage_admins BOOLEAN NOT NULL DEFAULT false,
    can_access_audit_logs BOOLEAN NOT NULL DEFAULT false,
    can_manage_documents BOOLEAN NOT NULL DEFAULT false,
    can_reset_passwords BOOLEAN NOT NULL DEFAULT false,
    can_force_logout BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- ============================================================================
-- Create User Profiles Table
-- ============================================================================

CREATE TABLE IF NOT EXISTS user_profiles (
    id VARCHAR(255) PRIMARY KEY DEFAULT gen_random_uuid()::varchar,
    user_id VARCHAR(255) NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
    profile_type profile_type NOT NULL DEFAULT 'individual',
    company_name VARCHAR(255),
    phone_number VARCHAR(50),
    location VARCHAR(255),
    bio TEXT,
    interests TEXT[],
    verified BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- ============================================================================
-- Insert Test Admin Users
-- ============================================================================

-- Super Admin (full access)
INSERT INTO users (id, email, username, password, first_name, last_name, role, membership_tier, verification_status)
VALUES ('test-admin-super', 'superadmin@fusionmining.com', 'superadmin', '$2b$10$demo', 'Super', 'Admin', 'admin', 'premium', 'approved')
ON CONFLICT (id) DO UPDATE SET 
    email = EXCLUDED.email,
    username = EXCLUDED.username,
    first_name = EXCLUDED.first_name,
    last_name = EXCLUDED.last_name,
    role = EXCLUDED.role,
    updated_at = NOW();

-- Super Admin Permissions (all permissions enabled)
INSERT INTO admin_permissions (admin_user_id, admin_role, can_manage_users, can_manage_listings, can_manage_projects, can_manage_blog, can_manage_cms, can_view_analytics, can_manage_messages, can_manage_verification, can_manage_settings, can_manage_admins, can_access_audit_logs, can_manage_documents, can_reset_passwords, can_force_logout)
VALUES ('test-admin-super', 'super_admin', true, true, true, true, true, true, true, true, true, true, true, true, true, true)
ON CONFLICT (admin_user_id) DO UPDATE SET 
    admin_role = 'super_admin',
    can_manage_users = true,
    can_manage_listings = true,
    can_manage_projects = true,
    can_manage_blog = true,
    can_manage_cms = true,
    can_view_analytics = true,
    can_manage_messages = true,
    can_manage_verification = true,
    can_manage_settings = true,
    can_manage_admins = true,
    can_access_audit_logs = true,
    can_manage_documents = true,
    can_reset_passwords = true,
    can_force_logout = true,
    updated_at = NOW();

-- Verification Admin
INSERT INTO users (id, email, username, password, first_name, last_name, role, membership_tier, verification_status)
VALUES ('test-admin-verification', 'verifyadmin@fusionmining.com', 'verifyadmin', '$2b$10$demo', 'Verification', 'Admin', 'admin', 'basic', 'approved')
ON CONFLICT (id) DO UPDATE SET 
    email = EXCLUDED.email,
    username = EXCLUDED.username,
    first_name = EXCLUDED.first_name,
    last_name = EXCLUDED.last_name,
    role = EXCLUDED.role,
    updated_at = NOW();

-- Verification Admin Permissions
INSERT INTO admin_permissions (admin_user_id, admin_role, can_manage_verification, can_manage_listings, can_view_analytics, can_access_audit_logs)
VALUES ('test-admin-verification', 'verification_admin', true, true, true, true)
ON CONFLICT (admin_user_id) DO UPDATE SET 
    admin_role = 'verification_admin',
    can_manage_verification = true,
    can_manage_listings = true,
    can_view_analytics = true,
    can_access_audit_logs = true,
    can_manage_users = false,
    can_manage_projects = false,
    can_manage_blog = false,
    can_manage_cms = false,
    can_manage_messages = false,
    can_manage_settings = false,
    can_manage_admins = false,
    can_manage_documents = false,
    can_reset_passwords = false,
    can_force_logout = false,
    updated_at = NOW();

-- Content Admin
INSERT INTO users (id, email, username, password, first_name, last_name, role, membership_tier, verification_status)
VALUES ('test-admin-content', 'contentadmin@fusionmining.com', 'contentadmin', '$2b$10$demo', 'Content', 'Admin', 'admin', 'basic', 'approved')
ON CONFLICT (id) DO UPDATE SET 
    email = EXCLUDED.email,
    username = EXCLUDED.username,
    first_name = EXCLUDED.first_name,
    last_name = EXCLUDED.last_name,
    role = EXCLUDED.role,
    updated_at = NOW();

-- Content Admin Permissions
INSERT INTO admin_permissions (admin_user_id, admin_role, can_manage_blog, can_manage_cms, can_manage_documents)
VALUES ('test-admin-content', 'content_admin', true, true, true)
ON CONFLICT (admin_user_id) DO UPDATE SET 
    admin_role = 'content_admin',
    can_manage_blog = true,
    can_manage_cms = true,
    can_manage_documents = true,
    can_manage_users = false,
    can_manage_listings = false,
    can_manage_projects = false,
    can_view_analytics = false,
    can_manage_messages = false,
    can_manage_verification = false,
    can_manage_settings = false,
    can_manage_admins = false,
    can_access_audit_logs = false,
    can_reset_passwords = false,
    can_force_logout = false,
    updated_at = NOW();

-- Support Admin
INSERT INTO users (id, email, username, password, first_name, last_name, role, membership_tier, verification_status)
VALUES ('test-admin-support', 'supportadmin@fusionmining.com', 'supportadmin', '$2b$10$demo', 'Support', 'Admin', 'admin', 'basic', 'approved')
ON CONFLICT (id) DO UPDATE SET 
    email = EXCLUDED.email,
    username = EXCLUDED.username,
    first_name = EXCLUDED.first_name,
    last_name = EXCLUDED.last_name,
    role = EXCLUDED.role,
    updated_at = NOW();

-- Support Admin Permissions
INSERT INTO admin_permissions (admin_user_id, admin_role, can_manage_messages, can_reset_passwords, can_force_logout, can_view_analytics)
VALUES ('test-admin-support', 'support_admin', true, true, true, true)
ON CONFLICT (admin_user_id) DO UPDATE SET 
    admin_role = 'support_admin',
    can_manage_messages = true,
    can_reset_passwords = true,
    can_force_logout = true,
    can_view_analytics = true,
    can_manage_users = false,
    can_manage_listings = false,
    can_manage_projects = false,
    can_manage_blog = false,
    can_manage_cms = false,
    can_manage_verification = false,
    can_manage_settings = false,
    can_manage_admins = false,
    can_access_audit_logs = false,
    can_manage_documents = false,
    updated_at = NOW();

-- Analytics Admin
INSERT INTO users (id, email, username, password, first_name, last_name, role, membership_tier, verification_status)
VALUES ('test-admin-analytics', 'analyticsadmin@fusionmining.com', 'analyticsadmin', '$2b$10$demo', 'Analytics', 'Admin', 'admin', 'basic', 'approved')
ON CONFLICT (id) DO UPDATE SET 
    email = EXCLUDED.email,
    username = EXCLUDED.username,
    first_name = EXCLUDED.first_name,
    last_name = EXCLUDED.last_name,
    role = EXCLUDED.role,
    updated_at = NOW();

-- Analytics Admin Permissions
INSERT INTO admin_permissions (admin_user_id, admin_role, can_view_analytics, can_access_audit_logs)
VALUES ('test-admin-analytics', 'analytics_admin', true, true)
ON CONFLICT (admin_user_id) DO UPDATE SET 
    admin_role = 'analytics_admin',
    can_view_analytics = true,
    can_access_audit_logs = true,
    can_manage_users = false,
    can_manage_listings = false,
    can_manage_projects = false,
    can_manage_blog = false,
    can_manage_cms = false,
    can_manage_messages = false,
    can_manage_verification = false,
    can_manage_settings = false,
    can_manage_admins = false,
    can_manage_documents = false,
    can_reset_passwords = false,
    can_force_logout = false,
    updated_at = NOW();

-- ============================================================================
-- Insert Test Regular Users (Buyer and Seller)
-- ============================================================================

-- Test Buyer
INSERT INTO users (id, email, username, password, first_name, last_name, role, membership_tier, verification_status)
VALUES ('test-buyer-789', 'henry@fusionmining.com', 'henry', '$2b$10$demo', 'Henry', 'Pass', 'buyer', 'premium', 'not_requested')
ON CONFLICT (id) DO UPDATE SET 
    email = EXCLUDED.email,
    username = EXCLUDED.username,
    first_name = EXCLUDED.first_name,
    last_name = EXCLUDED.last_name,
    role = EXCLUDED.role,
    membership_tier = EXCLUDED.membership_tier,
    updated_at = NOW();

-- Test Seller
INSERT INTO users (id, email, username, password, first_name, last_name, role, membership_tier, verification_status)
VALUES ('test-seller-456', 'ray@fusionmining.com', 'ray', '$2b$10$demo', 'Ray', 'Pass', 'seller', 'basic', 'approved')
ON CONFLICT (id) DO UPDATE SET 
    email = EXCLUDED.email,
    username = EXCLUDED.username,
    first_name = EXCLUDED.first_name,
    last_name = EXCLUDED.last_name,
    role = EXCLUDED.role,
    verification_status = EXCLUDED.verification_status,
    updated_at = NOW();

-- ============================================================================
-- Verification Queries
-- ============================================================================

-- Query to view all users with their roles
SELECT id, username, email, first_name, last_name, role, membership_tier, verification_status
FROM users
ORDER BY 
    CASE role 
        WHEN 'admin' THEN 1 
        WHEN 'seller' THEN 2 
        WHEN 'buyer' THEN 3 
    END, 
    username;

-- Query to view admin permissions
SELECT 
    u.username,
    u.first_name || ' ' || u.last_name AS full_name,
    ap.admin_role,
    ap.can_manage_users,
    ap.can_manage_listings,
    ap.can_manage_projects,
    ap.can_manage_blog,
    ap.can_manage_cms,
    ap.can_view_analytics,
    ap.can_manage_messages,
    ap.can_manage_verification,
    ap.can_manage_settings,
    ap.can_manage_admins,
    ap.can_access_audit_logs,
    ap.can_manage_documents,
    ap.can_reset_passwords,
    ap.can_force_logout
FROM admin_permissions ap
JOIN users u ON ap.admin_user_id = u.id
ORDER BY 
    CASE ap.admin_role 
        WHEN 'super_admin' THEN 1
        WHEN 'verification_admin' THEN 2
        WHEN 'content_admin' THEN 3
        WHEN 'support_admin' THEN 4
        WHEN 'analytics_admin' THEN 5
    END;

-- ============================================================================
-- Test Credentials Reference
-- ============================================================================
/*
ADMIN ACCOUNTS:
+------------------+------------------+------------+---------------------+
| Username         | Password         | Admin Role | Key Permissions     |
+------------------+------------------+------------+---------------------+
| admin            | admin123         | super      | All permissions     |
| superadmin       | super123         | super      | All permissions     |
| verifyadmin      | verify123        | verify     | Listings, Verify    |
| contentadmin     | content123       | content    | Blog, CMS, Docs     |
| supportadmin     | support123       | support    | Messages, Passwords |
| analyticsadmin   | analytics123     | analytics  | Analytics, Logs     |
+------------------+------------------+------------+---------------------+

REGULAR ACCOUNTS:
+----------+----------+--------+------------------+
| Username | Password | Role   | Tier             |
+----------+----------+--------+------------------+
| henry    | henry123 | buyer  | premium          |
| ray      | ray123   | seller | basic (verified) |
+----------+----------+--------+------------------+

NOTE: Passwords shown are for development testing only.
In the application, authentication is handled by session cookies,
not direct password comparison in the database.
*/

