-- Fusion Mining Limited - Database Schema Export
-- PostgreSQL Database Schema for Offline Production Testing
-- Generated: October 2024
-- 
-- This script provides the database schema structure.
-- For actual deployment, use: npm run db:push

-- ============================================================================
-- Session Storage (Required for Replit Auth)
-- ============================================================================

CREATE TABLE IF NOT EXISTS sessions (
    sid VARCHAR PRIMARY KEY,
    sess JSONB NOT NULL,
    expire TIMESTAMP NOT NULL
);

CREATE INDEX IF NOT EXISTS IDX_session_expire ON sessions(expire);

-- ============================================================================
-- Users (Required for Replit Auth)
-- ============================================================================

CREATE TYPE user_role AS ENUM ('admin', 'buyer', 'seller');
CREATE TYPE profile_type AS ENUM ('individual', 'company');

CREATE TABLE IF NOT EXISTS users (
    id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR UNIQUE,
    first_name VARCHAR,
    last_name VARCHAR,
    profile_image_url VARCHAR,
    role user_role NOT NULL DEFAULT 'buyer',
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- ============================================================================
-- User Profiles
-- ============================================================================

CREATE TABLE IF NOT EXISTS user_profiles (
    id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id VARCHAR NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
    profile_type profile_type NOT NULL DEFAULT 'individual',
    company_name VARCHAR,
    phone_number VARCHAR,
    location VARCHAR,
    bio TEXT,
    interests TEXT[],
    verified BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- ============================================================================
-- Projects
-- ============================================================================

CREATE TYPE license_type AS ENUM ('exploration', 'mining', 'processing');
CREATE TYPE project_status AS ENUM ('active', 'pending', 'completed', 'suspended');

CREATE TABLE IF NOT EXISTS projects (
    id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    license_type license_type NOT NULL,
    minerals TEXT[] NOT NULL,
    location VARCHAR NOT NULL,
    latitude DECIMAL(10, 7),
    longitude DECIMAL(10, 7),
    status project_status NOT NULL DEFAULT 'active',
    image_url VARCHAR,
    area VARCHAR,
    estimated_value VARCHAR,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS express_interest (
    id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id VARCHAR NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    user_id VARCHAR NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    message TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- ============================================================================
-- Marketplace
-- ============================================================================

CREATE TYPE listing_type AS ENUM ('mineral', 'partnership');
CREATE TYPE listing_status AS ENUM ('pending', 'approved', 'rejected', 'inactive');

CREATE TABLE IF NOT EXISTS marketplace_listings (
    id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
    seller_id VARCHAR NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    type listing_type NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    mineral_type VARCHAR,
    grade VARCHAR,
    location VARCHAR NOT NULL,
    quantity VARCHAR,
    price VARCHAR,
    image_url VARCHAR,
    status listing_status NOT NULL DEFAULT 'pending',
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS buyer_requests (
    id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
    buyer_id VARCHAR NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    mineral_type VARCHAR NOT NULL,
    quantity VARCHAR,
    budget VARCHAR,
    location VARCHAR,
    status VARCHAR NOT NULL DEFAULT 'active',
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- ============================================================================
-- Messaging
-- ============================================================================

CREATE TABLE IF NOT EXISTS messages (
    id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
    sender_id VARCHAR NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    receiver_id VARCHAR NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    subject VARCHAR(255),
    content TEXT NOT NULL,
    read BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- ============================================================================
-- Blog
-- ============================================================================

CREATE TABLE IF NOT EXISTS blog_posts (
    id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
    author_id VARCHAR NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    excerpt TEXT,
    content TEXT NOT NULL,
    image_url VARCHAR,
    category VARCHAR,
    published BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- ============================================================================
-- Contact
-- ============================================================================

CREATE TABLE IF NOT EXISTS contact_submissions (
    id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    subject VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    status VARCHAR NOT NULL DEFAULT 'new',
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- ============================================================================
-- Verification Queue
-- ============================================================================

CREATE TABLE IF NOT EXISTS verification_queue (
    id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
    listing_id VARCHAR NOT NULL UNIQUE REFERENCES marketplace_listings(id) ON DELETE CASCADE,
    submitted_at TIMESTAMP NOT NULL DEFAULT NOW(),
    reviewed_at TIMESTAMP,
    reviewed_by VARCHAR REFERENCES users(id),
    notes TEXT
);

-- ============================================================================
-- Sample Data for Testing
-- ============================================================================

-- Insert a sample admin user (update with actual credentials after Replit Auth signup)
-- UPDATE users SET role = 'admin' WHERE email = 'admin@fusionmining.com';

-- Insert sample projects
INSERT INTO projects (name, description, license_type, minerals, location, status) VALUES
('Copperbelt Exploration', 'High-grade copper deposits in the Copperbelt Province', 'exploration', ARRAY['Copper', 'Cobalt'], 'Copperbelt', 'active'),
('Emerald Valley Mine', 'Premium emerald mining operation', 'mining', ARRAY['Emerald'], 'Luapula Province', 'active'),
('Northern Gold Project', 'Gold exploration with promising surveys', 'exploration', ARRAY['Gold'], 'Northern Province', 'active');

-- Insert sample blog posts (requires an admin user ID)
-- INSERT INTO blog_posts (author_id, title, slug, excerpt, content, category, published) VALUES
-- ('admin-user-id', 'Welcome to Fusion Mining', 'welcome-to-fusion-mining', 'Introducing our platform...', 'Full article content here...', 'Company News', TRUE);

-- ============================================================================
-- Indexes for Performance
-- ============================================================================

CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);
CREATE INDEX IF NOT EXISTS idx_marketplace_seller ON marketplace_listings(seller_id);
CREATE INDEX IF NOT EXISTS idx_marketplace_status ON marketplace_listings(status);
CREATE INDEX IF NOT EXISTS idx_marketplace_type ON marketplace_listings(type);
CREATE INDEX IF NOT EXISTS idx_messages_sender ON messages(sender_id);
CREATE INDEX IF NOT EXISTS idx_messages_receiver ON messages(receiver_id);
CREATE INDEX IF NOT EXISTS idx_blog_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_published ON blog_posts(published);

-- ============================================================================
-- Notes
-- ============================================================================

-- To deploy this schema:
-- 1. Ensure DATABASE_URL environment variable is set
-- 2. Run: npm run db:push
-- 3. The schema will be automatically synced with your Drizzle schema definition

-- To promote a user to admin:
-- UPDATE users SET role = 'admin' WHERE email = 'your-email@example.com';

-- To create sample marketplace listings:
-- INSERT INTO marketplace_listings (seller_id, type, title, description, mineral_type, grade, location, quantity, price)
-- VALUES ('user-id', 'mineral', 'High Grade Copper Ore', 'Premium copper from Copperbelt', 'Copper', 'High Grade', 'Copperbelt', '1000 tonnes', '$5000/tonne');
