-- Step 1: Add columns if they don't exist
ALTER TABLE "express_interest" ADD COLUMN IF NOT EXISTS "listing_id" varchar;--> statement-breakpoint
ALTER TABLE "express_interest" ADD COLUMN IF NOT EXISTS "project_id" varchar;--> statement-breakpoint

-- Step 2: Create indices
CREATE INDEX IF NOT EXISTS "IDX_express_interest_project_id" ON "express_interest" ("project_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "IDX_express_interest_listing_id" ON "express_interest" ("listing_id");--> statement-breakpoint