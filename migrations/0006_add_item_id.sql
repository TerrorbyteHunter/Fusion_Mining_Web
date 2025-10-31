-- Add item_id columns to key tables so items can have a short, human-friendly identifier

ALTER TABLE projects
ADD COLUMN IF NOT EXISTS item_id VARCHAR(5);

ALTER TABLE marketplace_listings
ADD COLUMN IF NOT EXISTS item_id VARCHAR(5);

ALTER TABLE buyer_requests
ADD COLUMN IF NOT EXISTS item_id VARCHAR(5);

-- Create unique indexes to ensure item ids are unique per table
CREATE UNIQUE INDEX IF NOT EXISTS idx_projects_item_id_unique ON projects(item_id);
CREATE UNIQUE INDEX IF NOT EXISTS idx_marketplace_listings_item_id_unique ON marketplace_listings(item_id);
CREATE UNIQUE INDEX IF NOT EXISTS idx_buyer_requests_item_id_unique ON buyer_requests(item_id);

-- Optional: create a consolidated view to lookup item ids across types
CREATE OR REPLACE VIEW v_items_summary AS
SELECT 'project' AS type, id AS source_id, item_id, name AS title, created_at
FROM projects
UNION ALL
SELECT 'listing' AS type, id AS source_id, item_id, title AS title, created_at
FROM marketplace_listings
UNION ALL
SELECT 'buyer_request' AS type, id AS source_id, item_id, title AS title, created_at
FROM buyer_requests;

GRANT SELECT ON v_items_summary TO public;
