ALTER TABLE "verification_queue" DROP CONSTRAINT "verification_queue_listing_id_unique";--> statement-breakpoint
ALTER TABLE "buyer_requests" ALTER COLUMN "status" SET DEFAULT 'pending';--> statement-breakpoint
ALTER TABLE "verification_queue" ALTER COLUMN "listing_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "buyer_requests" ADD COLUMN "rejection_reason" text;--> statement-breakpoint
ALTER TABLE "verification_queue" ADD COLUMN "buyer_request_id" varchar;--> statement-breakpoint
ALTER TABLE "verification_queue" ADD CONSTRAINT "verification_queue_buyer_request_id_buyer_requests_id_fk" FOREIGN KEY ("buyer_request_id") REFERENCES "public"."buyer_requests"("id") ON DELETE cascade ON UPDATE no action;