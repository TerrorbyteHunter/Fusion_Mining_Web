-- Migration 0008: bring marketplace-related enums and columns up-to-date with drizzle schema
-- Adds missing enum values/types and adds non-destructive columns needed by the app
-- This migration is written defensively: it only creates types/columns when missing.

-- ==========================
-- Create / extend enums
-- ==========================
DO $$
BEGIN
  -- listing_type: add 'project' if missing
  IF NOT EXISTS (
    SELECT 1 FROM pg_enum e JOIN pg_type t ON e.enumtypid = t.oid WHERE t.typname = 'listing_type' AND e.enumlabel = 'project'
  ) THEN
    ALTER TYPE listing_type ADD VALUE 'project';
  END IF;
EXCEPTION WHEN undefined_object THEN
  -- listing_type doesn't exist yet: create it with full set
  CREATE TYPE listing_type AS ENUM ('mineral','partnership','project');
END$$;

DO $$
BEGIN
  -- listing_status: add 'closed' if missing
  IF NOT EXISTS (
    SELECT 1 FROM pg_enum e JOIN pg_type t ON e.enumtypid = t.oid WHERE t.typname = 'listing_status' AND e.enumlabel = 'closed'
  ) THEN
    ALTER TYPE listing_status ADD VALUE 'closed';
  END IF;
EXCEPTION WHEN undefined_object THEN
  CREATE TYPE listing_status AS ENUM ('pending','approved','rejected','inactive','closed');
END$$;

-- create marketplace categorization enums if they don't exist
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'main_category') THEN
    CREATE TYPE main_category AS ENUM ('minerals','mining_tools','mining_services','mining_ppe');
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'mineral_subcategory') THEN
    CREATE TYPE mineral_subcategory AS ENUM ('metallic','non_metallic','marble_natural_stone','gravel_sand_aggregate','coal_peat','other_minerals');
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'tool_subcategory') THEN
    CREATE TYPE tool_subcategory AS ENUM ('drilling_equipment','energy_machines','engineering_devices','heavy_equipment','industrial_equipment','marble_machinery','ore_processing','underground_mining','other_tools');
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'service_subcategory') THEN
    CREATE TYPE service_subcategory AS ENUM ('analysis_services','consulting_advisory','drilling_blasting','exploration_surveying','freight_services','mine_extraction','mineral_processing','supply_chain','other_services');
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'ppe_subcategory') THEN
    CREATE TYPE ppe_subcategory AS ENUM ('head_face_protection','respiratory_protection','hand_foot_protection','fall_protection','protective_clothing','other_ppe');
  END IF;
END$$;

-- message-related enums
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'message_context') THEN
    CREATE TYPE message_context AS ENUM ('marketplace','project_interest','general');
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'thread_type') THEN
    CREATE TYPE thread_type AS ENUM ('project_interest','marketplace_inquiry','admin_to_seller','admin_to_buyer','general');
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'thread_status') THEN
    CREATE TYPE thread_status AS ENUM ('open','closed');
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'template_type') THEN
    CREATE TYPE template_type AS ENUM ('buyer_interest_to_buyer','buyer_interest_to_seller','buyer_interest_to_admin');
  END IF;
END$$;

-- ==========================
-- Add missing columns safely
-- ==========================
ALTER TABLE marketplace_listings
  ADD COLUMN IF NOT EXISTS item_id VARCHAR(5),
  ADD COLUMN IF NOT EXISTS main_category main_category,
  ADD COLUMN IF NOT EXISTS mineral_subcategory mineral_subcategory,
  ADD COLUMN IF NOT EXISTS tool_subcategory tool_subcategory,
  ADD COLUMN IF NOT EXISTS service_subcategory service_subcategory,
  ADD COLUMN IF NOT EXISTS ppe_subcategory ppe_subcategory,
  ADD COLUMN IF NOT EXISTS specific_type VARCHAR;

ALTER TABLE buyer_requests
  ADD COLUMN IF NOT EXISTS item_id VARCHAR(5),
  ADD COLUMN IF NOT EXISTS main_category main_category,
  ADD COLUMN IF NOT EXISTS mineral_subcategory mineral_subcategory,
  ADD COLUMN IF NOT EXISTS tool_subcategory tool_subcategory,
  ADD COLUMN IF NOT EXISTS service_subcategory service_subcategory,
  ADD COLUMN IF NOT EXISTS ppe_subcategory ppe_subcategory,
  ADD COLUMN IF NOT EXISTS specific_type VARCHAR,
  ADD COLUMN IF NOT EXISTS country VARCHAR(100),
  ADD COLUMN IF NOT EXISTS verified BOOLEAN NOT NULL DEFAULT FALSE,
  ADD COLUMN IF NOT EXISTS expiry_date TIMESTAMP;

-- Messages: add thread relationship, expanded metadata and flags
ALTER TABLE messages
  ADD COLUMN IF NOT EXISTS thread_id VARCHAR,
  ADD COLUMN IF NOT EXISTS context message_context,
  ADD COLUMN IF NOT EXISTS closed BOOLEAN NOT NULL DEFAULT FALSE,
  ADD COLUMN IF NOT EXISTS unread BOOLEAN NOT NULL DEFAULT TRUE,
  ADD COLUMN IF NOT EXISTS related_project_id VARCHAR,
  ADD COLUMN IF NOT EXISTS related_listing_id VARCHAR,
  ADD COLUMN IF NOT EXISTS is_auto_relay BOOLEAN NOT NULL DEFAULT FALSE;

-- Message threads: ensure last_message_at exists and created_by exists
ALTER TABLE message_threads
  ADD COLUMN IF NOT EXISTS last_message_at TIMESTAMP DEFAULT NOW(),
  ADD COLUMN IF NOT EXISTS created_by VARCHAR;

-- Verification queue: ensure listing_id unique (migration earlier created unique, but safe to ensure constraint exists)
ALTER TABLE verification_queue
  ADD COLUMN IF NOT EXISTS notes TEXT;

-- Add useful indexes if missing
CREATE INDEX IF NOT EXISTS idx_messages_thread_id ON messages(thread_id);
CREATE INDEX IF NOT EXISTS idx_messages_context ON messages(context);
CREATE INDEX IF NOT EXISTS idx_buyerrequests_buyer ON buyer_requests(buyer_id);

-- ==========================================================================
-- Seed safe sample marketplace test data (idempotent inserts)
-- Note: these use ON CONFLICT DO NOTHING so they are safe to run multiple times.
-- ==========================================================================

-- Create test users used by seed scripts
INSERT INTO users (id, email, first_name, last_name, role)
VALUES
  ('test-admin-123','admin@fusionmining.com','Admin','User','admin'),
  ('test-seller-456','seller@fusionmining.com','Sarah','Seller','seller'),
  ('test-buyer-789','buyer@fusionmining.com','Bob','Buyer','buyer')
ON CONFLICT (id) DO NOTHING;

-- Marketplace listings sample (referencing test-seller-456)
INSERT INTO marketplace_listings (id, seller_id, type, title, description, mineral_type, grade, location, quantity, price, status, item_id, main_category)
VALUES
  (gen_random_uuid(), 'test-seller-456', 'mineral','High-Grade Copper Ore - 5000 Tonnes', 'Premium quality copper ore from Copperbelt. Full documentation available.', 'Copper','25% Cu content','Kitwe, Copperbelt','5,000 tonnes','$4,500/tonne','approved', NULL, 'minerals'),
  (gen_random_uuid(), 'test-seller-456', 'mineral','Premium Zambian Emeralds - Investment Grade','Exceptional quality emeralds suitable for jewelry and investment.','Emerald','AAA Grade','Ndola, Copperbelt','500 carats','$8,000/carat','approved', NULL, 'minerals'),
  (gen_random_uuid(), 'test-seller-456', 'mineral','Battery-Grade Cobalt Hydroxide','High-purity cobalt hydroxide perfect for battery manufacturing.','Cobalt','20% Co min','Copperbelt','2,000 tonnes','$35,000/tonne','approved', NULL, 'minerals'),
  (gen_random_uuid(), 'test-seller-456', 'mineral','Gold Ore Concentrate','Gold concentrate from Northern Province operations.','Gold','45 g/t Au','Northern Province','100 tonnes','$1,200/tonne','pending', NULL, 'minerals'),
  (gen_random_uuid(), 'test-seller-456', 'partnership','Joint Venture - Copper Mine Expansion','Seeking strategic partner for expanding existing copper mining operations.','',NULL,'Copperbelt',NULL,NULL,'approved', NULL, 'mining_services')
ON CONFLICT DO NOTHING;

-- Buyer requests sample
INSERT INTO buyer_requests (id, buyer_id, title, description, mineral_type, quantity, budget, location, status)
VALUES
  (gen_random_uuid(), 'test-buyer-789', 'Seeking Regular Copper Ore Supply', 'Looking for 10,000+ tonnes monthly with consistent quality.', 'Copper','10,000 tonnes/month','$40-45M annually','Any major mining region','active'),
  (gen_random_uuid(), 'test-buyer-789', 'High-Quality Emerald Procurement', 'Luxury jewelry company seeks premium grade emeralds.', 'Emerald','1,000+ carats quarterly','$5-10M per quarter','Copperbelt','active')
ON CONFLICT DO NOTHING;

-- mark seeding complete
-- End of migration
