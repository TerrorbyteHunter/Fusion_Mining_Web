-- ============================================================================
-- Fusion Mining Limited - Complete Database Schema Setup
-- For Offline App Functionality
-- ============================================================================
-- This SQL file creates all necessary tables and enums for your app to run offline
-- Execute this in PostgreSQL to set up the complete database schema

-- ============================================================================
-- DROP ALL EXISTING OBJECTS (if re-initializing)
-- ============================================================================
-- Uncomment these lines if you want to drop existing tables before creating new ones
/*
DROP TABLE IF EXISTS seller_verification_documents CASCADE;
DROP TABLE IF EXISTS seller_verification_requests CASCADE;
DROP TABLE IF EXISTS membership_benefits CASCADE;
DROP TABLE IF EXISTS notifications CASCADE;
DROP TABLE IF EXISTS activity_logs CASCADE;
DROP TABLE IF EXISTS verification_queue CASCADE;
DROP TABLE IF EXISTS contact_submissions CASCADE;
DROP TABLE IF EXISTS blog_posts CASCADE;
DROP TABLE IF EXISTS messages CASCADE;
DROP TABLE IF EXISTS message_threads CASCADE;
DROP TABLE IF EXISTS buyer_requests CASCADE;
DROP TABLE IF EXISTS marketplace_listings CASCADE;
DROP TABLE IF EXISTS express_interest CASCADE;
DROP TABLE IF EXISTS projects CASCADE;
DROP TABLE IF EXISTS user_profiles CASCADE;
DROP TABLE IF EXISTS admin_permissions CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS sessions CASCADE;

DROP TYPE IF EXISTS user_role CASCADE;
DROP TYPE IF EXISTS admin_role CASCADE;
DROP TYPE IF EXISTS profile_type CASCADE;
DROP TYPE IF EXISTS membership_tier CASCADE;
DROP TYPE IF EXISTS verification_status CASCADE;
DROP TYPE IF EXISTS license_type CASCADE;
DROP TYPE IF EXISTS project_status CASCADE;
DROP TYPE IF EXISTS listing_type CASCADE;
DROP TYPE IF EXISTS listing_status CASCADE;
DROP TYPE IF EXISTS main_category CASCADE;
DROP TYPE IF EXISTS mineral_subcategory CASCADE;
DROP TYPE IF EXISTS tool_subcategory CASCADE;
DROP TYPE IF EXISTS service_subcategory CASCADE;
DROP TYPE IF EXISTS ppe_subcategory CASCADE;
DROP TYPE IF EXISTS thread_status CASCADE;
DROP TYPE IF EXISTS message_context CASCADE;
DROP TYPE IF EXISTS thread_type CASCADE;
DROP TYPE IF EXISTS activity_type CASCADE;
DROP TYPE IF EXISTS notification_type CASCADE;
DROP TYPE IF EXISTS seller_verification_request_status CASCADE;
DROP TYPE IF EXISTS seller_verification_document_type CASCADE;
*/

-- ============================================================================
-- CREATE ENUMS
-- ============================================================================

CREATE TYPE user_role AS ENUM ('admin', 'buyer', 'seller');
CREATE TYPE admin_role AS ENUM ('super_admin', 'verification_admin', 'content_admin', 'support_admin', 'analytics_admin');
CREATE TYPE profile_type AS ENUM ('individual', 'company');
CREATE TYPE membership_tier AS ENUM ('basic', 'standard', 'premium');
CREATE TYPE verification_status AS ENUM ('not_requested', 'pending', 'approved', 'rejected');
CREATE TYPE license_type AS ENUM ('exploration', 'mining', 'processing');
CREATE TYPE project_status AS ENUM ('active', 'pending', 'completed', 'suspended', 'closed');
CREATE TYPE listing_type AS ENUM ('mineral', 'partnership', 'project');
CREATE TYPE listing_status AS ENUM ('pending', 'approved', 'rejected', 'inactive', 'closed');
CREATE TYPE main_category AS ENUM ('minerals', 'mining_tools', 'mining_services', 'mining_ppe');
CREATE TYPE mineral_subcategory AS ENUM ('metallic', 'non_metallic', 'marble_natural_stone', 'gravel_sand_aggregate', 'coal_peat', 'other_minerals');
CREATE TYPE tool_subcategory AS ENUM ('drilling_equipment', 'energy_machines', 'engineering_devices', 'heavy_equipment', 'industrial_equipment', 'marble_machinery', 'ore_processing', 'underground_mining', 'other_tools');
CREATE TYPE service_subcategory AS ENUM ('analysis_services', 'consulting_advisory', 'drilling_blasting', 'exploration_surveying', 'freight_services', 'mine_extraction', 'mineral_processing', 'supply_chain', 'other_services');
CREATE TYPE ppe_subcategory AS ENUM ('head_face_protection', 'respiratory_protection', 'hand_foot_protection', 'fall_protection', 'protective_clothing', 'other_ppe');
CREATE TYPE thread_status AS ENUM ('open', 'closed');
CREATE TYPE message_context AS ENUM ('marketplace', 'project_interest', 'general');
CREATE TYPE thread_type AS ENUM ('project_interest', 'marketplace_inquiry', 'admin_to_seller', 'admin_to_buyer', 'general');
CREATE TYPE activity_type AS ENUM ('login', 'logout', 'listing_created', 'listing_approved', 'listing_rejected', 'message_sent', 'interest_expressed', 'profile_updated', 'blog_post_created');
CREATE TYPE notification_type AS ENUM ('message', 'listing_approved', 'listing_rejected', 'interest_received', 'system');
CREATE TYPE seller_verification_request_status AS ENUM ('draft', 'pending', 'approved', 'rejected');
CREATE TYPE seller_verification_document_type AS ENUM ('certificate_of_incorporation', 'company_profile', 'shareholder_list', 'tax_certificate', 'letter_of_authorization', 'director_id');

-- ============================================================================
-- CREATE TABLES
-- ============================================================================

-- Session Table (Required for Replit Auth)
CREATE TABLE sessions (
  sid VARCHAR PRIMARY KEY,
  sess JSONB NOT NULL,
  expire TIMESTAMP NOT NULL
);
CREATE INDEX idx_session_expire ON sessions(expire);

-- Users Table (Core User Data)
CREATE TABLE users (
  id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid()::VARCHAR,
  email VARCHAR UNIQUE,
  password VARCHAR,
  first_name VARCHAR,
  last_name VARCHAR,
  profile_image_url VARCHAR,
  role user_role NOT NULL DEFAULT 'buyer'::user_role,
  membership_tier membership_tier NOT NULL DEFAULT 'basic'::membership_tier,
  verification_status verification_status NOT NULL DEFAULT 'not_requested'::verification_status,
  badge_color VARCHAR,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);

-- Admin Permissions Table
CREATE TABLE admin_permissions (
  id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid()::VARCHAR,
  admin_user_id VARCHAR NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
  admin_role admin_role NOT NULL DEFAULT 'content_admin'::admin_role,
  can_manage_users BOOLEAN NOT NULL DEFAULT FALSE,
  can_manage_listings BOOLEAN NOT NULL DEFAULT FALSE,
  can_manage_projects BOOLEAN NOT NULL DEFAULT FALSE,
  can_manage_blog BOOLEAN NOT NULL DEFAULT FALSE,
  can_manage_cms BOOLEAN NOT NULL DEFAULT FALSE,
  can_view_analytics BOOLEAN NOT NULL DEFAULT FALSE,
  can_manage_messages BOOLEAN NOT NULL DEFAULT FALSE,
  can_manage_verification BOOLEAN NOT NULL DEFAULT FALSE,
  can_manage_settings BOOLEAN NOT NULL DEFAULT FALSE,
  can_manage_admins BOOLEAN NOT NULL DEFAULT FALSE,
  can_access_audit_logs BOOLEAN NOT NULL DEFAULT FALSE,
  can_manage_documents BOOLEAN NOT NULL DEFAULT FALSE,
  can_reset_passwords BOOLEAN NOT NULL DEFAULT FALSE,
  can_force_logout BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- User Profiles Table
CREATE TABLE user_profiles (
  id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid()::VARCHAR,
  user_id VARCHAR NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
  profile_type profile_type NOT NULL DEFAULT 'individual'::profile_type,
  company_name VARCHAR,
  phone_number VARCHAR,
  location VARCHAR,
  bio TEXT,
  interests TEXT[],
  verified BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Projects Table
CREATE TABLE projects (
  id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid()::VARCHAR,
  item_id VARCHAR(5),
  owner_id VARCHAR NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  license_type license_type NOT NULL,
  minerals TEXT[] NOT NULL,
  location VARCHAR NOT NULL,
  latitude DECIMAL(10, 7),
  longitude DECIMAL(10, 7),
  status project_status NOT NULL DEFAULT 'active'::project_status,
  image_url VARCHAR,
  area VARCHAR,
  estimated_value VARCHAR,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_projects_owner_id ON projects(owner_id);
CREATE INDEX idx_projects_status ON projects(status);

-- Express Interest Table
CREATE TABLE express_interest (
  id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid()::VARCHAR,
  project_id VARCHAR REFERENCES projects(id) ON DELETE CASCADE,
  listing_id VARCHAR REFERENCES marketplace_listings(id) ON DELETE CASCADE,
  user_id VARCHAR NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  message TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_express_interest_user_id ON express_interest(user_id);

-- Marketplace Listings Table
CREATE TABLE marketplace_listings (
  id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid()::VARCHAR,
  item_id VARCHAR(5),
  seller_id VARCHAR NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  type listing_type NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  main_category main_category,
  mineral_subcategory mineral_subcategory,
  tool_subcategory tool_subcategory,
  service_subcategory service_subcategory,
  ppe_subcategory ppe_subcategory,
  specific_type VARCHAR,
  mineral_type VARCHAR,
  grade VARCHAR,
  location VARCHAR NOT NULL,
  quantity VARCHAR,
  price VARCHAR,
  image_url VARCHAR,
  status listing_status NOT NULL DEFAULT 'pending'::listing_status,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_marketplace_seller_id ON marketplace_listings(seller_id);
CREATE INDEX idx_marketplace_status ON marketplace_listings(status);

-- Buyer Requests Table
CREATE TABLE buyer_requests (
  id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid()::VARCHAR,
  item_id VARCHAR(5),
  buyer_id VARCHAR NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  main_category main_category,
  mineral_subcategory mineral_subcategory,
  tool_subcategory tool_subcategory,
  service_subcategory service_subcategory,
  ppe_subcategory ppe_subcategory,
  specific_type VARCHAR,
  mineral_type VARCHAR,
  quantity VARCHAR,
  budget VARCHAR,
  location VARCHAR,
  country VARCHAR(100),
  verified BOOLEAN NOT NULL DEFAULT FALSE,
  expiry_date TIMESTAMP,
  status VARCHAR NOT NULL DEFAULT 'active',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_buyer_requests_buyer_id ON buyer_requests(buyer_id);

-- Message Threads Table
CREATE TABLE message_threads (
  id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid()::VARCHAR,
  title VARCHAR(255) NOT NULL,
  type thread_type NOT NULL DEFAULT 'general'::thread_type,
  project_id VARCHAR REFERENCES projects(id) ON DELETE CASCADE,
  listing_id VARCHAR REFERENCES marketplace_listings(id) ON DELETE CASCADE,
  buyer_id VARCHAR REFERENCES users(id) ON DELETE CASCADE,
  seller_id VARCHAR REFERENCES users(id) ON DELETE CASCADE,
  admin_id VARCHAR REFERENCES users(id) ON DELETE CASCADE,
  created_by VARCHAR NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  context message_context DEFAULT 'general'::message_context,
  status thread_status NOT NULL DEFAULT 'open'::thread_status,
  last_message_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_message_threads_buyer_id ON message_threads(buyer_id);
CREATE INDEX idx_message_threads_seller_id ON message_threads(seller_id);
CREATE INDEX idx_message_threads_admin_id ON message_threads(admin_id);
CREATE INDEX idx_message_threads_created_by ON message_threads(created_by);
CREATE INDEX idx_message_threads_project_id ON message_threads(project_id);
CREATE INDEX idx_message_threads_listing_id ON message_threads(listing_id);

-- Messages Table
CREATE TABLE messages (
  id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid()::VARCHAR,
  thread_id VARCHAR REFERENCES message_threads(id) ON DELETE CASCADE,
  sender_id VARCHAR NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  receiver_id VARCHAR NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  subject VARCHAR(255),
  content TEXT NOT NULL,
  context message_context DEFAULT 'general'::message_context,
  read BOOLEAN NOT NULL DEFAULT FALSE,
  closed BOOLEAN NOT NULL DEFAULT FALSE,
  unread BOOLEAN NOT NULL DEFAULT TRUE,
  related_project_id VARCHAR REFERENCES projects(id) ON DELETE SET NULL,
  related_listing_id VARCHAR REFERENCES marketplace_listings(id) ON DELETE SET NULL,
  is_auto_relay BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_messages_thread_id ON messages(thread_id);
CREATE INDEX idx_messages_context ON messages(context);

-- Blog Posts Table
CREATE TABLE blog_posts (
  id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid()::VARCHAR,
  author_id VARCHAR NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  excerpt TEXT,
  content TEXT NOT NULL,
  image_url VARCHAR,
  category VARCHAR,
  published BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_blog_posts_author_id ON blog_posts(author_id);

-- Contact Submissions Table
CREATE TABLE contact_submissions (
  id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid()::VARCHAR,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  subject VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  status VARCHAR NOT NULL DEFAULT 'new',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Verification Queue Table
CREATE TABLE verification_queue (
  id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid()::VARCHAR,
  listing_id VARCHAR NOT NULL UNIQUE REFERENCES marketplace_listings(id) ON DELETE CASCADE,
  submitted_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  reviewed_at TIMESTAMP,
  reviewed_by VARCHAR REFERENCES users(id),
  notes TEXT
);

-- Activity Logs Table
CREATE TABLE activity_logs (
  id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid()::VARCHAR,
  user_id VARCHAR REFERENCES users(id) ON DELETE CASCADE,
  activity_type activity_type NOT NULL,
  description TEXT NOT NULL,
  ip_address VARCHAR(45),
  user_agent TEXT,
  metadata JSONB,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_activity_logs_user_id ON activity_logs(user_id);
CREATE INDEX idx_activity_logs_created_at ON activity_logs(created_at);

-- Notifications Table
CREATE TABLE notifications (
  id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid()::VARCHAR,
  user_id VARCHAR NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  type notification_type NOT NULL,
  title VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  link VARCHAR,
  read BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_notifications_user_id ON notifications(user_id);
CREATE INDEX idx_notifications_read ON notifications(read);

-- Membership Benefits Table
CREATE TABLE membership_benefits (
  id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid()::VARCHAR,
  tier membership_tier NOT NULL UNIQUE,
  max_active_rfqs INTEGER NOT NULL,
  can_access_analytics BOOLEAN NOT NULL DEFAULT FALSE,
  can_direct_message BOOLEAN NOT NULL DEFAULT FALSE,
  priority_support BOOLEAN NOT NULL DEFAULT FALSE,
  visibility_ranking INTEGER NOT NULL,
  monthly_price DECIMAL(10, 2) NOT NULL DEFAULT 0,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Seller Verification Requests Table
CREATE TABLE seller_verification_requests (
  id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid()::VARCHAR,
  seller_id VARCHAR NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  status seller_verification_request_status NOT NULL DEFAULT 'draft'::seller_verification_request_status,
  rejection_reason TEXT,
  submitted_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  reviewed_at TIMESTAMP,
  reviewed_by VARCHAR REFERENCES users(id),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_seller_verification_seller_id ON seller_verification_requests(seller_id);
CREATE INDEX idx_seller_verification_status ON seller_verification_requests(status);

-- Seller Verification Documents Table
CREATE TABLE seller_verification_documents (
  id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid()::VARCHAR,
  request_id VARCHAR NOT NULL REFERENCES seller_verification_requests(id) ON DELETE CASCADE,
  document_type seller_verification_document_type NOT NULL,
  file_name VARCHAR(255) NOT NULL,
  file_path TEXT NOT NULL,
  file_size INTEGER,
  mime_type VARCHAR(100),
  uploaded_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_seller_verification_doc_request_id ON seller_verification_documents(request_id);

-- ============================================================================
-- VERIFICATION QUERIES
-- ============================================================================

-- Verify all tables are created (should show 18 tables)
SELECT COUNT(*) as total_tables FROM information_schema.tables 
WHERE table_schema = 'public' AND table_type = 'BASE TABLE';

-- List all created tables
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public' AND table_type = 'BASE TABLE'
ORDER BY table_name;

-- Verify all enums are created (should show 21 enums)
SELECT COUNT(*) as total_enums FROM pg_type 
WHERE typtype = 'e' AND typnamespace = (SELECT oid FROM pg_namespace WHERE nspname = 'public');

-- ============================================================================
-- DATABASE SETUP COMPLETE
-- ============================================================================
-- Your database is now ready for offline use!
-- All 18 tables are created with proper relationships and indexes
-- You can now run your app with full offline functionality
