CREATE TYPE "public"."activity_type" AS ENUM('login', 'logout', 'listing_created', 'listing_approved', 'listing_rejected', 'message_sent', 'interest_expressed', 'profile_updated', 'blog_post_created');--> statement-breakpoint
CREATE TYPE "public"."license_type" AS ENUM('exploration', 'mining', 'processing');--> statement-breakpoint
CREATE TYPE "public"."listing_status" AS ENUM('pending', 'approved', 'rejected', 'inactive', 'closed');--> statement-breakpoint
CREATE TYPE "public"."listing_type" AS ENUM('mineral', 'partnership', 'project');--> statement-breakpoint
CREATE TYPE "public"."notification_type" AS ENUM('message', 'listing_approved', 'listing_rejected', 'interest_received', 'system');--> statement-breakpoint
CREATE TYPE "public"."profile_type" AS ENUM('individual', 'company');--> statement-breakpoint
CREATE TYPE "public"."project_status" AS ENUM('active', 'pending', 'completed', 'suspended', 'closed');--> statement-breakpoint
CREATE TYPE "public"."template_type" AS ENUM('buyer_interest_to_buyer', 'buyer_interest_to_seller', 'buyer_interest_to_admin');--> statement-breakpoint
CREATE TYPE "public"."user_role" AS ENUM('admin', 'buyer', 'seller');--> statement-breakpoint
CREATE TABLE "activity_logs" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" varchar,
	"activity_type" "activity_type" NOT NULL,
	"description" text NOT NULL,
	"ip_address" varchar(45),
	"user_agent" text,
	"metadata" jsonb,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "blog_posts" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"author_id" varchar NOT NULL,
	"title" varchar(255) NOT NULL,
	"slug" varchar(255) NOT NULL,
	"excerpt" text,
	"content" text NOT NULL,
	"image_url" varchar,
	"category" varchar,
	"published" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "blog_posts_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "buyer_requests" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"buyer_id" varchar NOT NULL,
	"title" varchar(255) NOT NULL,
	"description" text NOT NULL,
	"mineral_type" varchar NOT NULL,
	"quantity" varchar,
	"budget" varchar,
	"location" varchar,
	"status" varchar DEFAULT 'active' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "contact_settings" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"office_address" text NOT NULL,
	"phone" varchar NOT NULL,
	"email" varchar NOT NULL,
	"support_email" varchar,
	"monday_friday" varchar DEFAULT '8:00 AM - 5:00 PM' NOT NULL,
	"saturday" varchar DEFAULT '9:00 AM - 1:00 PM',
	"sunday" varchar DEFAULT 'Closed',
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "contact_submissions" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"phone" varchar(50),
	"subject" varchar(255) NOT NULL,
	"message" text NOT NULL,
	"status" varchar DEFAULT 'new' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "express_interest" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"project_id" varchar,
	"listing_id" varchar,
	"user_id" varchar NOT NULL,
	"message" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "marketplace_listings" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"seller_id" varchar NOT NULL,
	"type" "listing_type" NOT NULL,
	"title" varchar(255) NOT NULL,
	"description" text NOT NULL,
	"mineral_type" varchar,
	"grade" varchar,
	"location" varchar NOT NULL,
	"quantity" varchar,
	"price" varchar,
	"image_url" varchar,
	"status" "listing_status" DEFAULT 'pending' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "message_templates" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"type" "template_type" NOT NULL,
	"subject" varchar(255) NOT NULL,
	"content" text NOT NULL,
	"active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "messages" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"sender_id" varchar NOT NULL,
	"receiver_id" varchar NOT NULL,
	"subject" varchar(255),
	"content" text NOT NULL,
	"read" boolean DEFAULT false NOT NULL,
	"related_project_id" varchar,
	"related_listing_id" varchar,
	"is_auto_relay" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "notifications" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" varchar NOT NULL,
	"type" "notification_type" NOT NULL,
	"title" varchar(255) NOT NULL,
	"message" text NOT NULL,
	"link" varchar,
	"read" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "projects" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"description" text NOT NULL,
	"license_type" "license_type" NOT NULL,
	"minerals" text[] NOT NULL,
	"location" varchar NOT NULL,
	"latitude" numeric(10, 7),
	"longitude" numeric(10, 7),
	"status" "project_status" DEFAULT 'active' NOT NULL,
	"image_url" varchar,
	"area" varchar,
	"estimated_value" varchar,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "sessions" (
	"sid" varchar PRIMARY KEY NOT NULL,
	"sess" jsonb NOT NULL,
	"expire" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user_profiles" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" varchar NOT NULL,
	"profile_type" "profile_type" DEFAULT 'individual' NOT NULL,
	"company_name" varchar,
	"phone_number" varchar,
	"location" varchar,
	"bio" text,
	"interests" text[],
	"verified" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "user_profiles_user_id_unique" UNIQUE("user_id")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" varchar,
	"first_name" varchar,
	"last_name" varchar,
	"profile_image_url" varchar,
	"role" "user_role" DEFAULT 'buyer' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "verification_queue" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"listing_id" varchar NOT NULL,
	"submitted_at" timestamp DEFAULT now() NOT NULL,
	"reviewed_at" timestamp,
	"reviewed_by" varchar,
	"notes" text,
	CONSTRAINT "verification_queue_listing_id_unique" UNIQUE("listing_id")
);
--> statement-breakpoint
CREATE TABLE "videos" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" varchar(255) NOT NULL,
	"description" text,
	"video_url" text NOT NULL,
	"thumbnail_url" text,
	"duration" varchar,
	"active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "activity_logs" ADD CONSTRAINT "activity_logs_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "blog_posts" ADD CONSTRAINT "blog_posts_author_id_users_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "buyer_requests" ADD CONSTRAINT "buyer_requests_buyer_id_users_id_fk" FOREIGN KEY ("buyer_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "express_interest" ADD CONSTRAINT "express_interest_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "express_interest" ADD CONSTRAINT "express_interest_listing_id_marketplace_listings_id_fk" FOREIGN KEY ("listing_id") REFERENCES "public"."marketplace_listings"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "express_interest" ADD CONSTRAINT "express_interest_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "marketplace_listings" ADD CONSTRAINT "marketplace_listings_seller_id_users_id_fk" FOREIGN KEY ("seller_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "messages" ADD CONSTRAINT "messages_sender_id_users_id_fk" FOREIGN KEY ("sender_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "messages" ADD CONSTRAINT "messages_receiver_id_users_id_fk" FOREIGN KEY ("receiver_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "messages" ADD CONSTRAINT "messages_related_project_id_projects_id_fk" FOREIGN KEY ("related_project_id") REFERENCES "public"."projects"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "messages" ADD CONSTRAINT "messages_related_listing_id_marketplace_listings_id_fk" FOREIGN KEY ("related_listing_id") REFERENCES "public"."marketplace_listings"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_profiles" ADD CONSTRAINT "user_profiles_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "verification_queue" ADD CONSTRAINT "verification_queue_listing_id_marketplace_listings_id_fk" FOREIGN KEY ("listing_id") REFERENCES "public"."marketplace_listings"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "verification_queue" ADD CONSTRAINT "verification_queue_reviewed_by_users_id_fk" FOREIGN KEY ("reviewed_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "IDX_activity_user_id" ON "activity_logs" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "IDX_activity_created_at" ON "activity_logs" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "IDX_notification_user_id" ON "notifications" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "IDX_notification_read" ON "notifications" USING btree ("read");--> statement-breakpoint
CREATE INDEX "IDX_session_expire" ON "sessions" USING btree ("expire");