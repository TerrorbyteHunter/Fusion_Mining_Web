CREATE TYPE "public"."thread_status" AS ENUM('open', 'closed');--> statement-breakpoint

CREATE TABLE "message_threads" (
    "id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
    "title" varchar(255) NOT NULL,
    "project_id" varchar,
    "listing_id" varchar,
    "buyer_id" varchar NOT NULL,
    "seller_id" varchar,
    "status" "thread_status" DEFAULT 'open' NOT NULL,
    "last_message_at" timestamp DEFAULT now() NOT NULL,
    "created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint

-- Indexes for threads
CREATE INDEX "IDX_thread_buyer_id" ON "message_threads" USING btree ("buyer_id");--> statement-breakpoint
CREATE INDEX "IDX_thread_seller_id" ON "message_threads" USING btree ("seller_id");--> statement-breakpoint
CREATE INDEX "IDX_thread_project_id" ON "message_threads" USING btree ("project_id");--> statement-breakpoint
CREATE INDEX "IDX_thread_listing_id" ON "message_threads" USING btree ("listing_id");--> statement-breakpoint

-- Foreign key constraints for message_threads
ALTER TABLE "message_threads" ADD CONSTRAINT "message_threads_buyer_id_users_id_fk" FOREIGN KEY ("buyer_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "message_threads" ADD CONSTRAINT "message_threads_seller_id_users_id_fk" FOREIGN KEY ("seller_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "message_threads" ADD CONSTRAINT "message_threads_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "message_threads" ADD CONSTRAINT "message_threads_listing_id_marketplace_listings_id_fk" FOREIGN KEY ("listing_id") REFERENCES "public"."marketplace_listings"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint

-- Add thread_id and closed columns to messages table if not present
ALTER TABLE "messages" ADD COLUMN IF NOT EXISTS "thread_id" varchar;--> statement-breakpoint
ALTER TABLE "messages" ADD COLUMN IF NOT EXISTS "closed" boolean DEFAULT false NOT NULL;--> statement-breakpoint

-- Index for messages.thread_id
CREATE INDEX IF NOT EXISTS "IDX_message_thread_id" ON "messages" USING btree ("thread_id");--> statement-breakpoint

-- Foreign key from messages.thread_id to message_threads.id
ALTER TABLE "messages" ADD CONSTRAINT "messages_thread_id_message_threads_id_fk" FOREIGN KEY ("thread_id") REFERENCES "public"."message_threads"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint

-- Create idempotency mapping table for messages
CREATE TABLE IF NOT EXISTS "message_idempotency" (
    "id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
    "key" varchar(255) NOT NULL UNIQUE,
    "message_id" varchar NOT NULL,
    "created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint

ALTER TABLE "message_idempotency" ADD CONSTRAINT "message_idempotency_message_id_messages_id_fk" FOREIGN KEY ("message_id") REFERENCES "public"."messages"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
