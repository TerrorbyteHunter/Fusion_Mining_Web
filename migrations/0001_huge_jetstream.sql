ALTER TYPE "public"."activity_type" ADD VALUE 'tier_upgrade';--> statement-breakpoint
ALTER TYPE "public"."notification_type" ADD VALUE 'tier_upgrade';--> statement-breakpoint
ALTER TYPE "public"."notification_type" ADD VALUE 'seller_verification';--> statement-breakpoint
CREATE TABLE "account_deletion_requests" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" varchar NOT NULL,
	"reason" text,
	"status" varchar DEFAULT 'pending' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "tier_upgrade_documents" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"request_id" varchar NOT NULL,
	"document_type" varchar NOT NULL,
	"file_name" varchar NOT NULL,
	"file_path" varchar NOT NULL,
	"file_size" integer,
	"mime_type" varchar,
	"uploaded_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "marketplace_listings" ADD COLUMN "rejection_reason" text;--> statement-breakpoint
ALTER TABLE "user_profiles" ADD COLUMN "onboarding_completed" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "account_deletion_requests" ADD CONSTRAINT "account_deletion_requests_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tier_upgrade_documents" ADD CONSTRAINT "tier_upgrade_documents_request_id_tier_upgrade_requests_id_fk" FOREIGN KEY ("request_id") REFERENCES "public"."tier_upgrade_requests"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "IDX_tier_upgrade_doc_req_id" ON "tier_upgrade_documents" USING btree ("request_id");