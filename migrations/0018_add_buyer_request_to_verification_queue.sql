-- Add buyer_request_id column to verification_queue table
-- This allows buyer requests (RFQs) to be tracked in the verification queue

ALTER TABLE "verification_queue" ADD COLUMN "buyer_request_id" varchar;-->statement-breakpoint
ALTER TABLE "verification_queue" DROP CONSTRAINT IF EXISTS "verification_queue_listing_id_unique";-->statement-breakpoint
ALTER TABLE "verification_queue" ALTER COLUMN "listing_id" DROP NOT NULL;-->statement-breakpoint
ALTER TABLE "verification_queue" ADD CONSTRAINT "verification_queue_buyer_request_id_buyer_requests_id_fk" FOREIGN KEY ("buyer_request_id") REFERENCES "public"."buyer_requests"("id") ON DELETE cascade ON UPDATE no action;
