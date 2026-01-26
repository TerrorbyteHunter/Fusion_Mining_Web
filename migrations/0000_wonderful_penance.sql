CREATE TYPE "public"."activity_type" AS ENUM('login', 'logout', 'listing_created', 'listing_approved', 'listing_rejected', 'message_sent', 'interest_expressed', 'profile_updated', 'blog_post_created');--> statement-breakpoint
CREATE TYPE "public"."admin_role" AS ENUM('super_admin', 'verification_admin', 'content_admin', 'support_admin', 'analytics_admin');--> statement-breakpoint
CREATE TYPE "public"."license_type" AS ENUM('exploration', 'mining', 'processing');--> statement-breakpoint
CREATE TYPE "public"."listing_status" AS ENUM('pending', 'approved', 'rejected', 'inactive', 'closed');--> statement-breakpoint
CREATE TYPE "public"."listing_type" AS ENUM('mineral', 'partnership', 'project');--> statement-breakpoint
CREATE TYPE "public"."main_category" AS ENUM('minerals', 'mining_tools', 'mining_services', 'mining_ppe', 'mining_equipment');--> statement-breakpoint
CREATE TYPE "public"."membership_tier" AS ENUM('basic', 'standard', 'premium');--> statement-breakpoint
CREATE TYPE "public"."message_context" AS ENUM('marketplace', 'project_interest', 'general');--> statement-breakpoint
CREATE TYPE "public"."mineral_subcategory" AS ENUM('metallic', 'non_metallic', 'marble_natural_stone', 'gravel_sand_aggregate', 'coal_peat', 'other_minerals');--> statement-breakpoint
CREATE TYPE "public"."notification_type" AS ENUM('message', 'listing_approved', 'listing_rejected', 'interest_received', 'system');--> statement-breakpoint
CREATE TYPE "public"."payment_method" AS ENUM('bank_transfer', 'airtel_money', 'wechat_alipay');--> statement-breakpoint
CREATE TYPE "public"."ppe_subcategory" AS ENUM('head_face_protection', 'respiratory_protection', 'hand_foot_protection', 'fall_protection', 'protective_clothing', 'other_ppe');--> statement-breakpoint
CREATE TYPE "public"."profile_type" AS ENUM('individual', 'company');--> statement-breakpoint
CREATE TYPE "public"."project_status" AS ENUM('active', 'pending', 'completed', 'suspended', 'closed');--> statement-breakpoint
CREATE TYPE "public"."seller_verification_document_type" AS ENUM('certificate_of_incorporation', 'company_profile', 'shareholder_list', 'tax_certificate', 'letter_of_authorization', 'director_id');--> statement-breakpoint
CREATE TYPE "public"."seller_verification_request_status" AS ENUM('draft', 'pending', 'approved', 'rejected');--> statement-breakpoint
CREATE TYPE "public"."service_subcategory" AS ENUM('analysis_services', 'consulting_advisory', 'drilling_blasting', 'exploration_surveying', 'freight_services', 'mine_extraction', 'mineral_processing', 'supply_chain', 'other_services');--> statement-breakpoint
CREATE TYPE "public"."setting_data_type" AS ENUM('boolean', 'number', 'string', 'json');--> statement-breakpoint
CREATE TYPE "public"."template_type" AS ENUM('buyer_interest_to_buyer', 'buyer_interest_to_seller', 'buyer_interest_to_admin');--> statement-breakpoint
CREATE TYPE "public"."thread_status" AS ENUM('open', 'closed');--> statement-breakpoint
CREATE TYPE "public"."thread_type" AS ENUM('project_interest', 'marketplace_inquiry', 'admin_to_seller', 'admin_to_buyer', 'general');--> statement-breakpoint
CREATE TYPE "public"."ticket_priority" AS ENUM('low', 'normal', 'high', 'urgent');--> statement-breakpoint
CREATE TYPE "public"."ticket_status" AS ENUM('open', 'in_progress', 'waiting_user', 'resolved', 'closed');--> statement-breakpoint
CREATE TYPE "public"."tool_subcategory" AS ENUM('drilling_equipment', 'energy_machines', 'engineering_devices', 'heavy_equipment', 'industrial_equipment', 'marble_machinery', 'ore_processing', 'underground_mining', 'other_tools');--> statement-breakpoint
CREATE TYPE "public"."user_role" AS ENUM('admin', 'buyer', 'seller');--> statement-breakpoint
CREATE TYPE "public"."verification_status" AS ENUM('not_requested', 'pending', 'approved', 'rejected');--> statement-breakpoint
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
CREATE TABLE "admin_audit_logs" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"admin_id" varchar NOT NULL,
	"action" varchar(100) NOT NULL,
	"target_type" varchar(50),
	"target_id" varchar,
	"changes" jsonb,
	"ip_address" varchar(45),
	"user_agent" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "admin_permissions" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"admin_user_id" varchar NOT NULL,
	"admin_role" "admin_role" DEFAULT 'content_admin' NOT NULL,
	"can_manage_users" boolean DEFAULT false NOT NULL,
	"can_manage_listings" boolean DEFAULT false NOT NULL,
	"can_manage_projects" boolean DEFAULT false NOT NULL,
	"can_manage_blog" boolean DEFAULT false NOT NULL,
	"can_manage_cms" boolean DEFAULT false NOT NULL,
	"can_view_analytics" boolean DEFAULT false NOT NULL,
	"can_manage_messages" boolean DEFAULT false NOT NULL,
	"can_manage_verification" boolean DEFAULT false NOT NULL,
	"can_manage_settings" boolean DEFAULT false NOT NULL,
	"can_manage_admins" boolean DEFAULT false NOT NULL,
	"can_access_audit_logs" boolean DEFAULT false NOT NULL,
	"can_manage_documents" boolean DEFAULT false NOT NULL,
	"can_reset_passwords" boolean DEFAULT false NOT NULL,
	"can_force_logout" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "admin_permissions_admin_user_id_unique" UNIQUE("admin_user_id")
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
	"item_id" varchar(5),
	"buyer_id" varchar NOT NULL,
	"title" varchar(255) NOT NULL,
	"description" text NOT NULL,
	"main_category" "main_category",
	"mineral_subcategory" "mineral_subcategory",
	"tool_subcategory" "tool_subcategory",
	"service_subcategory" "service_subcategory",
	"ppe_subcategory" "ppe_subcategory",
	"specific_type" varchar,
	"mineral_type" varchar,
	"quantity" varchar,
	"budget" varchar,
	"location" varchar,
	"country" varchar(100),
	"verified" boolean DEFAULT false NOT NULL,
	"expiry_date" timestamp,
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
CREATE TABLE "document_templates" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"template_name" varchar(100) NOT NULL,
	"document_type" varchar(50) NOT NULL,
	"content" text NOT NULL,
	"variables" text[],
	"version" varchar(20) DEFAULT '1.0' NOT NULL,
	"active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "email_templates" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"template_key" varchar(100) NOT NULL,
	"subject" varchar(255) NOT NULL,
	"body_html" text NOT NULL,
	"body_text" text,
	"variables" text[],
	"active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "email_templates_template_key_unique" UNIQUE("template_key")
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
CREATE TABLE "login_history" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" varchar NOT NULL,
	"ip_address" varchar(45),
	"user_agent" text,
	"login_success" boolean NOT NULL,
	"failure_reason" varchar,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "marketplace_listings" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"item_id" varchar(5),
	"seller_id" varchar NOT NULL,
	"type" "listing_type" NOT NULL,
	"title" varchar(255) NOT NULL,
	"description" text NOT NULL,
	"main_category" "main_category",
	"mineral_subcategory" "mineral_subcategory",
	"tool_subcategory" "tool_subcategory",
	"service_subcategory" "service_subcategory",
	"ppe_subcategory" "ppe_subcategory",
	"specific_type" varchar,
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
CREATE TABLE "membership_benefits" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"tier" "membership_tier" NOT NULL,
	"max_active_rfqs" integer NOT NULL,
	"can_access_analytics" boolean DEFAULT false NOT NULL,
	"can_direct_message" boolean DEFAULT false NOT NULL,
	"priority_support" boolean DEFAULT false NOT NULL,
	"visibility_ranking" integer NOT NULL,
	"monthly_price" numeric(10, 2) DEFAULT '0' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "membership_benefits_tier_unique" UNIQUE("tier")
);
--> statement-breakpoint
CREATE TABLE "message_idempotency" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"key" varchar(255) NOT NULL,
	"message_id" varchar NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "message_idempotency_key_unique" UNIQUE("key")
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
CREATE TABLE "message_threads" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" varchar(255) NOT NULL,
	"type" "thread_type" DEFAULT 'general' NOT NULL,
	"project_id" varchar,
	"listing_id" varchar,
	"buyer_id" varchar,
	"seller_id" varchar,
	"admin_id" varchar,
	"created_by" varchar NOT NULL,
	"context" "message_context" DEFAULT 'general',
	"status" "thread_status" DEFAULT 'open' NOT NULL,
	"last_message_at" timestamp DEFAULT now() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"is_admin_support" boolean DEFAULT false NOT NULL,
	"assigned_admin_id" varchar,
	"ticket_status" "ticket_status" DEFAULT 'open',
	"ticket_priority" "ticket_priority" DEFAULT 'normal',
	"resolved_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "messages" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"thread_id" varchar,
	"sender_id" varchar NOT NULL,
	"receiver_id" varchar NOT NULL,
	"subject" varchar(255),
	"content" text NOT NULL,
	"context" "message_context" DEFAULT 'general',
	"read" boolean DEFAULT false NOT NULL,
	"closed" boolean DEFAULT false NOT NULL,
	"unread" boolean DEFAULT true NOT NULL,
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
CREATE TABLE "payment_method_details" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"method" "payment_method" NOT NULL,
	"name" varchar NOT NULL,
	"description" text,
	"instructions" text,
	"account_details" jsonb,
	"currency_code" varchar DEFAULT 'USD' NOT NULL,
	"currency_name" varchar DEFAULT 'US Dollar' NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "payment_method_details_method_unique" UNIQUE("method")
);
--> statement-breakpoint
CREATE TABLE "platform_settings" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"key" varchar(100) NOT NULL,
	"value" text NOT NULL,
	"data_type" "setting_data_type" DEFAULT 'string' NOT NULL,
	"description" text,
	"category" varchar(50) NOT NULL,
	"is_public" boolean DEFAULT false NOT NULL,
	"updated_by" varchar,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "platform_settings_key_unique" UNIQUE("key")
);
--> statement-breakpoint
CREATE TABLE "projects" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"item_id" varchar(5),
	"owner_id" varchar NOT NULL,
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
CREATE TABLE "seller_verification_documents" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"request_id" varchar NOT NULL,
	"document_type" "seller_verification_document_type" NOT NULL,
	"file_name" varchar(255) NOT NULL,
	"file_path" text NOT NULL,
	"file_size" integer,
	"mime_type" varchar(100),
	"uploaded_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "seller_verification_requests" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"seller_id" varchar NOT NULL,
	"status" "seller_verification_request_status" DEFAULT 'draft' NOT NULL,
	"rejection_reason" text,
	"submitted_at" timestamp DEFAULT now() NOT NULL,
	"reviewed_at" timestamp,
	"reviewed_by" varchar,
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
CREATE TABLE "settings_audit" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"setting_key" varchar(100) NOT NULL,
	"old_value" text,
	"new_value" text NOT NULL,
	"changed_by" varchar NOT NULL,
	"changed_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "sustainability_content" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" varchar(255) NOT NULL,
	"section" varchar(255) NOT NULL,
	"content" text NOT NULL,
	"image_url" varchar,
	"order" integer DEFAULT 0,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "tier_upgrade_payments" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"upgrade_request_id" varchar NOT NULL,
	"user_id" varchar NOT NULL,
	"requested_tier" "membership_tier" NOT NULL,
	"payment_method" "payment_method" NOT NULL,
	"amount_usd" numeric(10, 2) NOT NULL,
	"amount" numeric(10, 2) NOT NULL,
	"currency" varchar DEFAULT 'ZMW' NOT NULL,
	"status" varchar DEFAULT 'pending' NOT NULL,
	"payment_details" jsonb,
	"proof_of_payment_url" varchar,
	"submitted_at" timestamp DEFAULT now() NOT NULL,
	"verified_at" timestamp,
	"verified_by" varchar,
	"rejection_reason" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "tier_upgrade_requests" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" varchar NOT NULL,
	"requested_tier" "membership_tier" NOT NULL,
	"status" varchar DEFAULT 'draft' NOT NULL,
	"rejection_reason" text,
	"submitted_at" timestamp,
	"reviewed_at" timestamp,
	"reviewed_by" varchar,
	"document_count" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "tier_usage_tracking" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" varchar NOT NULL,
	"month" varchar(7) NOT NULL,
	"active_rfqs_count" integer DEFAULT 0 NOT NULL,
	"messages_count" integer DEFAULT 0 NOT NULL,
	"analytics_views" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "UNQ_user_month" UNIQUE("user_id","month")
);
--> statement-breakpoint
CREATE TABLE "two_factor_auth" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" varchar NOT NULL,
	"enabled" boolean DEFAULT false NOT NULL,
	"secret" varchar,
	"backup_codes" text[],
	"last_used" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "two_factor_auth_user_id_unique" UNIQUE("user_id")
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
	"clerk_id" varchar,
	"email" varchar,
	"username" varchar,
	"password" varchar,
	"first_name" varchar,
	"last_name" varchar,
	"profile_image_url" varchar,
	"role" "user_role" DEFAULT 'buyer' NOT NULL,
	"membership_tier" "membership_tier" DEFAULT 'basic' NOT NULL,
	"verification_status" "verification_status" DEFAULT 'not_requested' NOT NULL,
	"badge_color" varchar,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_clerk_id_unique" UNIQUE("clerk_id"),
	CONSTRAINT "users_email_unique" UNIQUE("email"),
	CONSTRAINT "users_username_unique" UNIQUE("username")
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
CREATE TABLE "verification_rules" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"rule_name" varchar(100) NOT NULL,
	"description" text,
	"required_for" varchar(50) NOT NULL,
	"document_types" text[] NOT NULL,
	"min_documents" integer DEFAULT 1 NOT NULL,
	"auto_approve" boolean DEFAULT false NOT NULL,
	"active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "verification_rules_rule_name_unique" UNIQUE("rule_name")
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
ALTER TABLE "admin_audit_logs" ADD CONSTRAINT "admin_audit_logs_admin_id_users_id_fk" FOREIGN KEY ("admin_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "admin_permissions" ADD CONSTRAINT "admin_permissions_admin_user_id_users_id_fk" FOREIGN KEY ("admin_user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "blog_posts" ADD CONSTRAINT "blog_posts_author_id_users_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "buyer_requests" ADD CONSTRAINT "buyer_requests_buyer_id_users_id_fk" FOREIGN KEY ("buyer_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "express_interest" ADD CONSTRAINT "express_interest_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "express_interest" ADD CONSTRAINT "express_interest_listing_id_marketplace_listings_id_fk" FOREIGN KEY ("listing_id") REFERENCES "public"."marketplace_listings"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "express_interest" ADD CONSTRAINT "express_interest_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "login_history" ADD CONSTRAINT "login_history_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "marketplace_listings" ADD CONSTRAINT "marketplace_listings_seller_id_users_id_fk" FOREIGN KEY ("seller_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "message_idempotency" ADD CONSTRAINT "message_idempotency_message_id_messages_id_fk" FOREIGN KEY ("message_id") REFERENCES "public"."messages"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "message_threads" ADD CONSTRAINT "message_threads_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "message_threads" ADD CONSTRAINT "message_threads_listing_id_marketplace_listings_id_fk" FOREIGN KEY ("listing_id") REFERENCES "public"."marketplace_listings"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "message_threads" ADD CONSTRAINT "message_threads_buyer_id_users_id_fk" FOREIGN KEY ("buyer_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "message_threads" ADD CONSTRAINT "message_threads_seller_id_users_id_fk" FOREIGN KEY ("seller_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "message_threads" ADD CONSTRAINT "message_threads_admin_id_users_id_fk" FOREIGN KEY ("admin_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "message_threads" ADD CONSTRAINT "message_threads_created_by_users_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "message_threads" ADD CONSTRAINT "message_threads_assigned_admin_id_users_id_fk" FOREIGN KEY ("assigned_admin_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "messages" ADD CONSTRAINT "messages_thread_id_message_threads_id_fk" FOREIGN KEY ("thread_id") REFERENCES "public"."message_threads"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "messages" ADD CONSTRAINT "messages_sender_id_users_id_fk" FOREIGN KEY ("sender_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "messages" ADD CONSTRAINT "messages_receiver_id_users_id_fk" FOREIGN KEY ("receiver_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "messages" ADD CONSTRAINT "messages_related_project_id_projects_id_fk" FOREIGN KEY ("related_project_id") REFERENCES "public"."projects"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "messages" ADD CONSTRAINT "messages_related_listing_id_marketplace_listings_id_fk" FOREIGN KEY ("related_listing_id") REFERENCES "public"."marketplace_listings"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "platform_settings" ADD CONSTRAINT "platform_settings_updated_by_users_id_fk" FOREIGN KEY ("updated_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "projects" ADD CONSTRAINT "projects_owner_id_users_id_fk" FOREIGN KEY ("owner_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "seller_verification_documents" ADD CONSTRAINT "seller_verification_documents_request_id_seller_verification_requests_id_fk" FOREIGN KEY ("request_id") REFERENCES "public"."seller_verification_requests"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "seller_verification_requests" ADD CONSTRAINT "seller_verification_requests_seller_id_users_id_fk" FOREIGN KEY ("seller_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "seller_verification_requests" ADD CONSTRAINT "seller_verification_requests_reviewed_by_users_id_fk" FOREIGN KEY ("reviewed_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "settings_audit" ADD CONSTRAINT "settings_audit_changed_by_users_id_fk" FOREIGN KEY ("changed_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tier_upgrade_payments" ADD CONSTRAINT "tier_upgrade_payments_upgrade_request_id_tier_upgrade_requests_id_fk" FOREIGN KEY ("upgrade_request_id") REFERENCES "public"."tier_upgrade_requests"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tier_upgrade_payments" ADD CONSTRAINT "tier_upgrade_payments_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tier_upgrade_payments" ADD CONSTRAINT "tier_upgrade_payments_verified_by_users_id_fk" FOREIGN KEY ("verified_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tier_upgrade_requests" ADD CONSTRAINT "tier_upgrade_requests_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tier_upgrade_requests" ADD CONSTRAINT "tier_upgrade_requests_reviewed_by_users_id_fk" FOREIGN KEY ("reviewed_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tier_usage_tracking" ADD CONSTRAINT "tier_usage_tracking_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "two_factor_auth" ADD CONSTRAINT "two_factor_auth_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_profiles" ADD CONSTRAINT "user_profiles_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "verification_queue" ADD CONSTRAINT "verification_queue_listing_id_marketplace_listings_id_fk" FOREIGN KEY ("listing_id") REFERENCES "public"."marketplace_listings"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "verification_queue" ADD CONSTRAINT "verification_queue_reviewed_by_users_id_fk" FOREIGN KEY ("reviewed_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "IDX_activity_user_id" ON "activity_logs" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "IDX_activity_created_at" ON "activity_logs" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "IDX_audit_admin_id" ON "admin_audit_logs" USING btree ("admin_id");--> statement-breakpoint
CREATE INDEX "IDX_audit_created" ON "admin_audit_logs" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "IDX_audit_action" ON "admin_audit_logs" USING btree ("action");--> statement-breakpoint
CREATE INDEX "IDX_login_user_id" ON "login_history" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "IDX_login_created" ON "login_history" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "IDX_thread_buyer_id" ON "message_threads" USING btree ("buyer_id");--> statement-breakpoint
CREATE INDEX "IDX_thread_seller_id" ON "message_threads" USING btree ("seller_id");--> statement-breakpoint
CREATE INDEX "IDX_thread_admin_id" ON "message_threads" USING btree ("admin_id");--> statement-breakpoint
CREATE INDEX "IDX_thread_created_by" ON "message_threads" USING btree ("created_by");--> statement-breakpoint
CREATE INDEX "IDX_thread_project_id" ON "message_threads" USING btree ("project_id");--> statement-breakpoint
CREATE INDEX "IDX_thread_listing_id" ON "message_threads" USING btree ("listing_id");--> statement-breakpoint
CREATE INDEX "IDX_thread_context" ON "message_threads" USING btree ("context");--> statement-breakpoint
CREATE INDEX "IDX_thread_type" ON "message_threads" USING btree ("type");--> statement-breakpoint
CREATE INDEX "IDX_thread_is_admin_support" ON "message_threads" USING btree ("is_admin_support");--> statement-breakpoint
CREATE INDEX "IDX_thread_ticket_status" ON "message_threads" USING btree ("ticket_status");--> statement-breakpoint
CREATE INDEX "IDX_message_thread_id" ON "messages" USING btree ("thread_id");--> statement-breakpoint
CREATE INDEX "IDX_message_context" ON "messages" USING btree ("context");--> statement-breakpoint
CREATE INDEX "IDX_notification_user_id" ON "notifications" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "IDX_notification_read" ON "notifications" USING btree ("read");--> statement-breakpoint
CREATE INDEX "IDX_verification_doc_request_id" ON "seller_verification_documents" USING btree ("request_id");--> statement-breakpoint
CREATE INDEX "IDX_verification_seller_id" ON "seller_verification_requests" USING btree ("seller_id");--> statement-breakpoint
CREATE INDEX "IDX_verification_status" ON "seller_verification_requests" USING btree ("status");--> statement-breakpoint
CREATE INDEX "IDX_session_expire" ON "sessions" USING btree ("expire");--> statement-breakpoint
CREATE INDEX "IDX_settings_audit_key" ON "settings_audit" USING btree ("setting_key");--> statement-breakpoint
CREATE INDEX "IDX_settings_audit_changed_by" ON "settings_audit" USING btree ("changed_by");--> statement-breakpoint
CREATE INDEX "IDX_settings_audit_changed_at" ON "settings_audit" USING btree ("changed_at");--> statement-breakpoint
CREATE INDEX "IDX_usage_user_month" ON "tier_usage_tracking" USING btree ("user_id","month");