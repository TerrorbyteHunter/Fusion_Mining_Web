// Fusion Mining Limited - Database Schema
// Following Replit Auth integration requirements and normalized design

import { sql } from 'drizzle-orm';
import { relations } from 'drizzle-orm';
import {
  index,
  jsonb,
  pgTable,
  timestamp,
  varchar,
  text,
  integer,
  decimal,
  boolean,
  pgEnum,
  unique,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

// ============================================================================
// Session storage table (Required for Replit Auth)
// ============================================================================
export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)],
);

// ============================================================================
// User storage table (Required for Replit Auth)
// ============================================================================
export const userRoleEnum = pgEnum('user_role', ['admin', 'buyer', 'seller']);
export const adminRoleEnum = pgEnum('admin_role', ['super_admin', 'verification_admin', 'content_admin', 'support_admin', 'analytics_admin']);
export const profileTypeEnum = pgEnum('profile_type', ['individual', 'company']);
export const membershipTierEnum = pgEnum('membership_tier', ['basic', 'standard', 'premium']);

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: varchar("email").unique(),
  password: varchar("password"),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  profileImageUrl: varchar("profile_image_url"),
  role: userRoleEnum("role").notNull().default('buyer'),
  membershipTier: membershipTierEnum("membership_tier").notNull().default('basic'),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Admin granular permissions (role-based control)
export const adminPermissions = pgTable("admin_permissions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  adminUserId: varchar("admin_user_id").notNull().references(() => users.id, { onDelete: 'cascade' }).unique(),
  adminRole: adminRoleEnum("admin_role").notNull().default('content_admin'),
  // Core permissions
  canManageUsers: boolean("can_manage_users").notNull().default(false),
  canManageListings: boolean("can_manage_listings").notNull().default(false),
  canManageProjects: boolean("can_manage_projects").notNull().default(false),
  canManageBlog: boolean("can_manage_blog").notNull().default(false),
  canManageCMS: boolean("can_manage_cms").notNull().default(false),
  canViewAnalytics: boolean("can_view_analytics").notNull().default(false),
  canManageMessages: boolean("can_manage_messages").notNull().default(false),
  // Enhanced permissions
  canManageVerification: boolean("can_manage_verification").notNull().default(false),
  canManageSettings: boolean("can_manage_settings").notNull().default(false),
  canManageAdmins: boolean("can_manage_admins").notNull().default(false),
  canAccessAuditLogs: boolean("can_access_audit_logs").notNull().default(false),
  canManageDocuments: boolean("can_manage_documents").notNull().default(false),
  canResetPasswords: boolean("can_reset_passwords").notNull().default(false),
  canForceLogout: boolean("can_force_logout").notNull().default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const userProfiles = pgTable("user_profiles", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id, { onDelete: 'cascade' }).unique(),
  profileType: profileTypeEnum("profile_type").notNull().default('individual'),
  companyName: varchar("company_name"),
  phoneNumber: varchar("phone_number"),
  location: varchar("location"),
  bio: text("bio"),
  interests: text("interests").array(),
  verified: boolean("verified").notNull().default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// ============================================================================
// Projects
// ============================================================================
export const licenseTypeEnum = pgEnum('license_type', ['exploration', 'mining', 'processing']);
export const projectStatusEnum = pgEnum('project_status', ['active', 'pending', 'completed', 'suspended', 'closed']);

export const projects = pgTable("projects", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  // short human-friendly item id shown when project is published/active
  itemId: varchar("item_id", { length: 5 }),
  ownerId: varchar("owner_id").notNull().references(() => users.id, { onDelete: 'cascade' }),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description").notNull(),
  licenseType: licenseTypeEnum("license_type").notNull(),
  minerals: text("minerals").array().notNull(),
  location: varchar("location").notNull(), // Region in Zambia
  latitude: decimal("latitude", { precision: 10, scale: 7 }),
  longitude: decimal("longitude", { precision: 10, scale: 7 }),
  status: projectStatusEnum("status").notNull().default('active'),
  imageUrl: varchar("image_url"),
  area: varchar("area"), // e.g., "500 hectares"
  estimatedValue: varchar("estimated_value"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const expressInterest = pgTable("express_interest", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  projectId: varchar("project_id").references(() => projects.id, { onDelete: 'cascade' }),
  listingId: varchar("listing_id").references(() => marketplaceListings.id, { onDelete: 'cascade' }),
  userId: varchar("user_id").notNull().references(() => users.id, { onDelete: 'cascade' }),
  message: text("message"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ============================================================================
// Marketplace
// ============================================================================
export const listingTypeEnum = pgEnum('listing_type', ['mineral', 'partnership', 'project']);
export const listingStatusEnum = pgEnum('listing_status', ['pending', 'approved', 'rejected', 'inactive', 'closed']);

// Main categories matching B2B Mineral structure
export const mainCategoryEnum = pgEnum('main_category', ['minerals', 'mining_tools', 'mining_services', 'mining_ppe']);

// Subcategories for each main category
export const mineralSubcategoryEnum = pgEnum('mineral_subcategory', ['metallic', 'non_metallic', 'marble_natural_stone', 'gravel_sand_aggregate', 'coal_peat', 'other_minerals']);
export const toolSubcategoryEnum = pgEnum('tool_subcategory', ['drilling_equipment', 'energy_machines', 'engineering_devices', 'heavy_equipment', 'industrial_equipment', 'marble_machinery', 'ore_processing', 'underground_mining', 'other_tools']);
export const serviceSubcategoryEnum = pgEnum('service_subcategory', ['analysis_services', 'consulting_advisory', 'drilling_blasting', 'exploration_surveying', 'freight_services', 'mine_extraction', 'mineral_processing', 'supply_chain', 'other_services']);
export const ppeSubcategoryEnum = pgEnum('ppe_subcategory', ['head_face_protection', 'respiratory_protection', 'hand_foot_protection', 'fall_protection', 'protective_clothing', 'other_ppe']);

export const marketplaceListings = pgTable("marketplace_listings", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  // short human-friendly item id assigned when listing is approved
  itemId: varchar("item_id", { length: 5 }),
  sellerId: varchar("seller_id").notNull().references(() => users.id, { onDelete: 'cascade' }),
  type: listingTypeEnum("type").notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description").notNull(),
  
  // Hierarchical categorization (B2B Mineral style)
  mainCategory: mainCategoryEnum("main_category"),
  mineralSubcategory: mineralSubcategoryEnum("mineral_subcategory"),
  toolSubcategory: toolSubcategoryEnum("tool_subcategory"),
  serviceSubcategory: serviceSubcategoryEnum("service_subcategory"),
  ppeSubcategory: ppeSubcategoryEnum("ppe_subcategory"),
  specificType: varchar("specific_type"), // e.g., "Copper Ore", "Excavator", "Freight Forwarding"
  
  // Legacy field for backward compatibility
  mineralType: varchar("mineral_type"), // e.g., "Copper", "Emerald"
  grade: varchar("grade"), // e.g., "High Grade", "25% purity"
  location: varchar("location").notNull(),
  quantity: varchar("quantity"), // e.g., "1000 tonnes"
  price: varchar("price"), // e.g., "$5000/tonne"
  imageUrl: varchar("image_url"),
  status: listingStatusEnum("status").notNull().default('pending'),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const buyerRequests = pgTable("buyer_requests", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  // short human-friendly item id for buyer requests/RFQs
  itemId: varchar("item_id", { length: 5 }),
  buyerId: varchar("buyer_id").notNull().references(() => users.id, { onDelete: 'cascade' }),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description").notNull(),
  
  // Hierarchical categorization (same as listings)
  mainCategory: mainCategoryEnum("main_category"),
  mineralSubcategory: mineralSubcategoryEnum("mineral_subcategory"),
  toolSubcategory: toolSubcategoryEnum("tool_subcategory"),
  serviceSubcategory: serviceSubcategoryEnum("service_subcategory"),
  ppeSubcategory: ppeSubcategoryEnum("ppe_subcategory"),
  specificType: varchar("specific_type"),
  
  // Legacy field for backward compatibility
  mineralType: varchar("mineral_type"),
  quantity: varchar("quantity"),
  budget: varchar("budget"),
  location: varchar("location"),
  country: varchar("country", { length: 100 }), // Country code or name for flag display
  
  // RFQ-specific fields
  verified: boolean("verified").notNull().default(false), // Admin verification badge
  expiryDate: timestamp("expiry_date"), // When the RFQ expires
  
  status: varchar("status").notNull().default('active'), // active, closed
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// ============================================================================
// Messaging
// ============================================================================
export const threadStatusEnum = pgEnum('thread_status', ['open', 'closed']);
export const messageContextEnum = pgEnum('message_context', ['marketplace', 'project_interest', 'general']);
export const threadTypeEnum = pgEnum('thread_type', ['project_interest', 'marketplace_inquiry', 'admin_to_seller', 'admin_to_buyer', 'general']);

export const messageThreads = pgTable("message_threads", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: varchar("title", { length: 255 }).notNull(),
  type: threadTypeEnum("type").notNull().default('general'),
  projectId: varchar("project_id").references(() => projects.id, { onDelete: 'cascade' }),
  listingId: varchar("listing_id").references(() => marketplaceListings.id, { onDelete: 'cascade' }),
  buyerId: varchar("buyer_id").references(() => users.id, { onDelete: 'cascade' }),
  sellerId: varchar("seller_id").references(() => users.id, { onDelete: 'cascade' }),
  adminId: varchar("admin_id").references(() => users.id, { onDelete: 'cascade' }),
  createdBy: varchar("created_by").notNull().references(() => users.id, { onDelete: 'cascade' }),
  context: messageContextEnum("context").default('general'),
  status: threadStatusEnum("status").notNull().default('open'),
  lastMessageAt: timestamp("last_message_at").defaultNow().notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
}, (table) => [
  index("IDX_thread_buyer_id").on(table.buyerId),
  index("IDX_thread_seller_id").on(table.sellerId),
  index("IDX_thread_admin_id").on(table.adminId),
  index("IDX_thread_created_by").on(table.createdBy),
  index("IDX_thread_project_id").on(table.projectId),
  index("IDX_thread_listing_id").on(table.listingId),
  index("IDX_thread_context").on(table.context),
  index("IDX_thread_type").on(table.type),
]);

export const messages = pgTable("messages", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  threadId: varchar("thread_id").references(() => messageThreads.id, { onDelete: 'cascade' }),
  senderId: varchar("sender_id").notNull().references(() => users.id, { onDelete: 'cascade' }),
  receiverId: varchar("receiver_id").notNull().references(() => users.id, { onDelete: 'cascade' }),
  subject: varchar("subject", { length: 255 }),
  content: text("content").notNull(),
  context: messageContextEnum("context").default('general'),
  read: boolean("read").notNull().default(false),
  closed: boolean("closed").notNull().default(false),
   unread: boolean("unread").notNull().default(true),
  relatedProjectId: varchar("related_project_id").references(() => projects.id, { onDelete: 'set null' }),
  relatedListingId: varchar("related_listing_id").references(() => marketplaceListings.id, { onDelete: 'set null' }),
  isAutoRelay: boolean("is_auto_relay").notNull().default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
}, (table) => [
  index("IDX_message_thread_id").on(table.threadId),
  index("IDX_message_context").on(table.context),
]);

// Idempotency mapping to prevent duplicate message creation when clients
// retry requests. The key should be provided by the client as an Idempotency-Key
// header and is unique.
export const messageIdempotency = pgTable("message_idempotency", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  key: varchar("key", { length: 255 }).notNull().unique(),
  messageId: varchar("message_id").notNull().references(() => messages.id, { onDelete: 'cascade' }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const templateTypeEnum = pgEnum('template_type', ['buyer_interest_to_buyer', 'buyer_interest_to_seller', 'buyer_interest_to_admin']);

export const messageTemplates = pgTable("message_templates", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: varchar("name", { length: 255 }).notNull(),
  type: templateTypeEnum("type").notNull(),
  subject: varchar("subject", { length: 255 }).notNull(),
  content: text("content").notNull(),
  active: boolean("active").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// ============================================================================
// Blog
// ============================================================================
export const blogPosts = pgTable("blog_posts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  authorId: varchar("author_id").notNull().references(() => users.id, { onDelete: 'cascade' }),
  title: varchar("title", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  excerpt: text("excerpt"),
  content: text("content").notNull(),
  imageUrl: varchar("image_url"),
  category: varchar("category"), // e.g., "Industry News", "Mining Tips", "Market Analysis"
  published: boolean("published").notNull().default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// ============================================================================
// Contact
// ============================================================================
export const contactSubmissions = pgTable("contact_submissions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 50 }),
  subject: varchar("subject", { length: 255 }).notNull(),
  message: text("message").notNull(),
  status: varchar("status").notNull().default('new'), // new, contacted, resolved
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ============================================================================
// Sustainability Content
// ============================================================================
export const sustainabilityContent = pgTable("sustainability_content", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: varchar("title", { length: 255 }).notNull(),
  section: varchar("section", { length: 255 }).notNull(), // e.g., "Environmental", "Community", "Social"
  content: text("content").notNull(),
  imageUrl: varchar("image_url"),
  order: integer("order").default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// ============================================================================
// Verification Queue
// ============================================================================
export const verificationQueue = pgTable("verification_queue", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  listingId: varchar("listing_id").notNull().references(() => marketplaceListings.id, { onDelete: 'cascade' }).unique(),
  submittedAt: timestamp("submitted_at").defaultNow().notNull(),
  reviewedAt: timestamp("reviewed_at"),
  reviewedBy: varchar("reviewed_by").references(() => users.id),
  notes: text("notes"),
});

// ============================================================================
// Activity Logs
// ============================================================================
export const activityTypeEnum = pgEnum('activity_type', ['login', 'logout', 'listing_created', 'listing_approved', 'listing_rejected', 'message_sent', 'interest_expressed', 'profile_updated', 'blog_post_created']);

export const activityLogs = pgTable("activity_logs", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id, { onDelete: 'cascade' }),
  activityType: activityTypeEnum("activity_type").notNull(),
  description: text("description").notNull(),
  ipAddress: varchar("ip_address", { length: 45 }),
  userAgent: text("user_agent"),
  metadata: jsonb("metadata"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
}, (table) => [index("IDX_activity_user_id").on(table.userId), index("IDX_activity_created_at").on(table.createdAt)]);

// ============================================================================
// Notifications
// ============================================================================
export const notificationTypeEnum = pgEnum('notification_type', ['message', 'listing_approved', 'listing_rejected', 'interest_received', 'system']);

export const notifications = pgTable("notifications", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id, { onDelete: 'cascade' }),
  type: notificationTypeEnum("type").notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  message: text("message").notNull(),
  link: varchar("link"),
  read: boolean("read").notNull().default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
}, (table) => [index("IDX_notification_user_id").on(table.userId), index("IDX_notification_read").on(table.read)]);

// ============================================================================
// Videos
// ============================================================================
export const videos = pgTable("videos", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  videoUrl: text("video_url").notNull(),
  thumbnailUrl: text("thumbnail_url"),
  duration: varchar("duration"), 
  active: boolean("active").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// ============================================================================
// Contact Settings
// ============================================================================
export const contactSettings = pgTable("contact_settings", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  officeAddress: text("office_address").notNull(),
  phone: varchar("phone").notNull(),
  email: varchar("email").notNull(),
  supportEmail: varchar("support_email"),
  mondayFriday: varchar("monday_friday").notNull().default('8:00 AM - 5:00 PM'),
  saturday: varchar("saturday").default('9:00 AM - 1:00 PM'),
  sunday: varchar("sunday").default('Closed'),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// ============================================================================
// Admin Settings & Configuration
// ============================================================================

export const settingDataTypeEnum = pgEnum('setting_data_type', ['boolean', 'number', 'string', 'json']);

// Platform-wide settings
export const platformSettings = pgTable("platform_settings", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  key: varchar("key", { length: 100 }).notNull().unique(),
  value: text("value").notNull(),
  dataType: settingDataTypeEnum("data_type").notNull().default('string'),
  description: text("description"),
  category: varchar("category", { length: 50 }).notNull(), // 'general', 'payment', 'security', 'branding', etc.
  isPublic: boolean("is_public").notNull().default(false),
  updatedBy: varchar("updated_by").references(() => users.id),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Settings audit log for tracking changes
export const settingsAudit = pgTable("settings_audit", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  settingKey: varchar("setting_key", { length: 100 }).notNull(),
  oldValue: text("old_value"),
  newValue: text("new_value").notNull(),
  changedBy: varchar("changed_by").notNull().references(() => users.id),
  changedAt: timestamp("changed_at").defaultNow().notNull(),
}, (table) => [
  index("IDX_settings_audit_key").on(table.settingKey),
  index("IDX_settings_audit_changed_by").on(table.changedBy),
  index("IDX_settings_audit_changed_at").on(table.changedAt),
]);

// Email templates for system notifications
export const emailTemplates = pgTable("email_templates", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  templateKey: varchar("template_key", { length: 100 }).notNull().unique(),
  subject: varchar("subject", { length: 255 }).notNull(),
  bodyHtml: text("body_html").notNull(),
  bodyText: text("body_text"),
  variables: text("variables").array(), // Available template variables
  active: boolean("active").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Login history and security tracking
export const loginHistory = pgTable("login_history", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id, { onDelete: 'cascade' }),
  ipAddress: varchar("ip_address", { length: 45 }),
  userAgent: text("user_agent"),
  loginSuccess: boolean("login_success").notNull(),
  failureReason: varchar("failure_reason"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
}, (table) => [
  index("IDX_login_user_id").on(table.userId),
  index("IDX_login_created").on(table.createdAt),
]);

// KYC/AML verification rules
export const verificationStatusEnum = pgEnum('verification_status', ['pending', 'approved', 'rejected']);
export const verificationRules = pgTable("verification_rules", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  ruleName: varchar("rule_name", { length: 100 }).notNull().unique(),
  description: text("description"),
  requiredFor: varchar("required_for", { length: 50 }).notNull(), // 'buyer', 'seller', 'both'
  documentTypes: text("document_types").array().notNull(), // ['passport', 'license', etc]
  minDocuments: integer("min_documents").notNull().default(1),
  autoApprove: boolean("auto_approve").notNull().default(false),
  active: boolean("active").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Document templates for legal/compliance
export const documentTemplates = pgTable("document_templates", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  templateName: varchar("template_name", { length: 100 }).notNull(),
  documentType: varchar("document_type", { length: 50 }).notNull(), // 'contract', 'nda', 'terms', etc
  content: text("content").notNull(),
  variables: text("variables").array(), // Available merge fields
  version: varchar("version", { length: 20 }).notNull().default('1.0'),
  active: boolean("active").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Admin audit logs for compliance
export const adminAuditLogs = pgTable("admin_audit_logs", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  adminId: varchar("admin_id").notNull().references(() => users.id, { onDelete: 'cascade' }),
  action: varchar("action", { length: 100 }).notNull(), // 'user_deleted', 'settings_updated', etc
  targetType: varchar("target_type", { length: 50 }), // 'user', 'listing', 'project', etc
  targetId: varchar("target_id"),
  changes: jsonb("changes"), // Store before/after values
  ipAddress: varchar("ip_address", { length: 45 }),
  userAgent: text("user_agent"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
}, (table) => [
  index("IDX_audit_admin_id").on(table.adminId),
  index("IDX_audit_created").on(table.createdAt),
  index("IDX_audit_action").on(table.action),
]);

// Two-factor authentication settings
export const twoFactorAuth = pgTable("two_factor_auth", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id, { onDelete: 'cascade' }).unique(),
  enabled: boolean("enabled").notNull().default(false),
  secret: varchar("secret"), // Encrypted TOTP secret
  backupCodes: text("backup_codes").array(), // Encrypted backup codes
  lastUsed: timestamp("last_used"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// ============================================================================
// Membership Tier Configuration
// ============================================================================
export const membershipBenefits = pgTable("membership_benefits", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  tier: membershipTierEnum("tier").notNull().unique(),
  maxActiveRFQs: integer("max_active_rfqs").notNull(),
  canAccessAnalytics: boolean("can_access_analytics").notNull().default(false),
  canDirectMessage: boolean("can_direct_message").notNull().default(false),
  prioritySupport: boolean("priority_support").notNull().default(false),
  visibilityRanking: integer("visibility_ranking").notNull(), // 1=highest, 3=lowest
  monthlyPrice: decimal("monthly_price", { precision: 10, scale: 2 }).notNull().default('0'),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Track monthly usage for tier limits (resets monthly)
export const tierUsageTracking = pgTable("tier_usage_tracking", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id, { onDelete: 'cascade' }),
  month: varchar("month", { length: 7 }).notNull(), // Format: "YYYY-MM"
  activeRFQsCount: integer("active_rfqs_count").notNull().default(0),
  messagesCount: integer("messages_count").notNull().default(0),
  analyticsViews: integer("analytics_views").notNull().default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
}, (table) => [
  index("IDX_usage_user_month").on(table.userId, table.month),
  unique("UNQ_user_month").on(table.userId, table.month),
]);

// ============================================================================
// Relations
// ============================================================================
export const usersRelations = relations(users, ({ one, many }) => ({
  profile: one(userProfiles, {
    fields: [users.id],
    references: [userProfiles.userId],
  }),
  listings: many(marketplaceListings),
  buyerRequests: many(buyerRequests),
  buyerThreads: many(messageThreads, { relationName: 'buyerThreads' }),
  sellerThreads: many(messageThreads, { relationName: 'sellerThreads' }),
  adminThreads: many(messageThreads, { relationName: 'adminThreads' }),
  createdThreads: many(messageThreads, { relationName: 'createdThreads' }),
  sentMessages: many(messages, { relationName: 'sentMessages' }),
  receivedMessages: many(messages, { relationName: 'receivedMessages' }),
  blogPosts: many(blogPosts),
  interests: many(expressInterest),
  activityLogs: many(activityLogs),
  notifications: many(notifications),
  tierUsage: many(tierUsageTracking),
}));

export const adminPermissionsRelations = relations(adminPermissions, ({ one }) => ({
  adminUser: one(users, {
    fields: [adminPermissions.adminUserId],
    references: [users.id],
  }),
}));

export const userProfilesRelations = relations(userProfiles, ({ one }) => ({
  user: one(users, {
    fields: [userProfiles.userId],
    references: [users.id],
  }),
}));

export const projectsRelations = relations(projects, ({ many }) => ({
  interests: many(expressInterest),
}));

export const expressInterestRelations = relations(expressInterest, ({ one }) => ({
  project: one(projects, {
    fields: [expressInterest.projectId],
    references: [projects.id],
  }),
  user: one(users, {
    fields: [expressInterest.userId],
    references: [users.id],
  }),
}));

export const marketplaceListingsRelations = relations(marketplaceListings, ({ one }) => ({
  seller: one(users, {
    fields: [marketplaceListings.sellerId],
    references: [users.id],
  }),
  verification: one(verificationQueue, {
    fields: [marketplaceListings.id],
    references: [verificationQueue.listingId],
  }),
}));

export const buyerRequestsRelations = relations(buyerRequests, ({ one }) => ({
  buyer: one(users, {
    fields: [buyerRequests.buyerId],
    references: [users.id],
  }),
}));

export const messageThreadsRelations = relations(messageThreads, ({ one, many }) => ({
  project: one(projects, {
    fields: [messageThreads.projectId],
    references: [projects.id],
  }),
  listing: one(marketplaceListings, {
    fields: [messageThreads.listingId],
    references: [marketplaceListings.id],
  }),
  buyer: one(users, {
    fields: [messageThreads.buyerId],
    references: [users.id],
    relationName: 'buyerThreads',
  }),
  seller: one(users, {
    fields: [messageThreads.sellerId],
    references: [users.id],
    relationName: 'sellerThreads',
  }),
  admin: one(users, {
    fields: [messageThreads.adminId],
    references: [users.id],
    relationName: 'adminThreads',
  }),
  creator: one(users, {
    fields: [messageThreads.createdBy],
    references: [users.id],
    relationName: 'createdThreads',
  }),
  messages: many(messages),
}));

export const messagesRelations = relations(messages, ({ one }) => ({
  thread: one(messageThreads, {
    fields: [messages.threadId],
    references: [messageThreads.id],
  }),
  sender: one(users, {
    fields: [messages.senderId],
    references: [users.id],
    relationName: 'sentMessages',
  }),
  receiver: one(users, {
    fields: [messages.receiverId],
    references: [users.id],
    relationName: 'receivedMessages',
  }),
}));

export const blogPostsRelations = relations(blogPosts, ({ one }) => ({
  author: one(users, {
    fields: [blogPosts.authorId],
    references: [users.id],
  }),
}));

export const verificationQueueRelations = relations(verificationQueue, ({ one }) => ({
  listing: one(marketplaceListings, {
    fields: [verificationQueue.listingId],
    references: [marketplaceListings.id],
  }),
  reviewer: one(users, {
    fields: [verificationQueue.reviewedBy],
    references: [users.id],
  }),
}));

export const activityLogsRelations = relations(activityLogs, ({ one }) => ({
  user: one(users, {
    fields: [activityLogs.userId],
    references: [users.id],
  }),
}));

export const notificationsRelations = relations(notifications, ({ one }) => ({
  user: one(users, {
    fields: [notifications.userId],
    references: [users.id],
  }),
}));

export const tierUsageTrackingRelations = relations(tierUsageTracking, ({ one }) => ({
  user: one(users, {
    fields: [tierUsageTracking.userId],
    references: [users.id],
  }),
}));

// ============================================================================
// Zod Schemas for validation
// ============================================================================

// User schemas
export const upsertUserSchema = createInsertSchema(users).pick({
  id: true,
  email: true,
  password: true,
  firstName: true,
  lastName: true,
  profileImageUrl: true,
});
export type UpsertUser = z.infer<typeof upsertUserSchema>;
export type User = typeof users.$inferSelect;
export type AdminPermissions = typeof adminPermissions.$inferSelect;
export const insertAdminPermissionsSchema = createInsertSchema(adminPermissions).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
export const updateAdminPermissionsSchema = createInsertSchema(adminPermissions).omit({
  createdAt: true,
  updatedAt: true,
}).partial().required({ adminUserId: true });
export type InsertAdminPermissions = z.infer<typeof insertAdminPermissionsSchema>;
export type UpdateAdminPermissions = z.infer<typeof updateAdminPermissionsSchema>;

// User Profile schemas
export const insertUserProfileSchema = createInsertSchema(userProfiles).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
export const updateUserProfileSchema = insertUserProfileSchema.partial().required({ userId: true });
export type InsertUserProfile = z.infer<typeof insertUserProfileSchema>;
export type UpdateUserProfile = z.infer<typeof updateUserProfileSchema>;
export type UserProfile = typeof userProfiles.$inferSelect;

// Project schemas
export const insertProjectSchema = createInsertSchema(projects).omit({
  id: true,
  itemId: true,
  createdAt: true,
  updatedAt: true,
}).extend({
  ownerId: z.string().optional(), // Optional since it will be set from authenticated user
});
export type InsertProject = z.infer<typeof insertProjectSchema>;
export type Project = typeof projects.$inferSelect;

// Project with owner information (for display)
export type ProjectWithOwner = Project & {
  owner: {
    id: string;
    firstName: string | null;
    lastName: string | null;
    email: string | null;
  } | null;
};

// Express Interest schemas
export const insertExpressInterestSchema = createInsertSchema(expressInterest).omit({
  id: true,
  createdAt: true,
});
export type InsertExpressInterest = z.infer<typeof insertExpressInterestSchema>;
export type ExpressInterest = typeof expressInterest.$inferSelect;

// Marketplace Listing schemas
export const insertMarketplaceListingSchema = createInsertSchema(marketplaceListings).omit({
  id: true,
  status: true,
  createdAt: true,
  updatedAt: true,
});
export type InsertMarketplaceListing = z.infer<typeof insertMarketplaceListingSchema>;
export type MarketplaceListing = typeof marketplaceListings.$inferSelect;

// Marketplace Listing with seller information (for display)
export type MarketplaceListingWithSeller = MarketplaceListing & {
  seller: {
    id: string;
    firstName: string | null;
    lastName: string | null;
    email: string | null;
  } | null;
};

// Buyer Request schemas
export const insertBuyerRequestSchema = createInsertSchema(buyerRequests).omit({
  id: true,
  status: true,
  createdAt: true,
  updatedAt: true,
});
export type InsertBuyerRequest = z.infer<typeof insertBuyerRequestSchema>;
export type BuyerRequest = typeof buyerRequests.$inferSelect;

// Message Thread schemas
export const insertMessageThreadSchema = createInsertSchema(messageThreads).omit({
  id: true,
  lastMessageAt: true,
  createdAt: true,
});
export type InsertMessageThread = z.infer<typeof insertMessageThreadSchema>;
export type MessageThread = typeof messageThreads.$inferSelect & {
  unread?: boolean;
};

// Message schemas
export const insertMessageSchema = createInsertSchema(messages).omit({
  id: true,
  read: true,
  createdAt: true,
});
export type InsertMessage = z.infer<typeof insertMessageSchema>;
export type Message = typeof messages.$inferSelect;

// Blog Post schemas
export const insertBlogPostSchema = createInsertSchema(blogPosts).omit({
  id: true,
  published: true,
  createdAt: true,
  updatedAt: true,
});
export type InsertBlogPost = z.infer<typeof insertBlogPostSchema>;
export type BlogPost = typeof blogPosts.$inferSelect;

// Contact Submission schemas
export const insertContactSubmissionSchema = createInsertSchema(contactSubmissions).omit({
  id: true,
  status: true,
  createdAt: true,
});
export type InsertContactSubmission = z.infer<typeof insertContactSubmissionSchema>;
export type ContactSubmission = typeof contactSubmissions.$inferSelect;

// Activity Log schemas
export const insertActivityLogSchema = createInsertSchema(activityLogs).omit({
  id: true,
  createdAt: true,
});
export type InsertActivityLog = z.infer<typeof insertActivityLogSchema>;
export type ActivityLog = typeof activityLogs.$inferSelect;

// Notification schemas
export const insertNotificationSchema = createInsertSchema(notifications).omit({
  id: true,
  read: true,
  createdAt: true,
});
export type InsertNotification = z.infer<typeof insertNotificationSchema>;
export type Notification = typeof notifications.$inferSelect;

// Video schemas
export const insertVideoSchema = createInsertSchema(videos).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
export const updateVideoSchema = createInsertSchema(videos).omit({
  createdAt: true,
  updatedAt: true,
}).partial().required({ id: true });
export type InsertVideo = z.infer<typeof insertVideoSchema>;
export type UpdateVideo = z.infer<typeof updateVideoSchema>;
export type Video = typeof videos.$inferSelect;

// Sustainability Content schemas
export const insertSustainabilityContentSchema = createInsertSchema(sustainabilityContent).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
export type InsertSustainabilityContent = z.infer<typeof insertSustainabilityContentSchema>;
export type SustainabilityContent = typeof sustainabilityContent.$inferSelect;

// Contact Settings schemas
export const insertContactSettingsSchema = createInsertSchema(contactSettings).omit({
  id: true,
  updatedAt: true,
});
export const updateContactSettingsSchema = createInsertSchema(contactSettings).omit({
  updatedAt: true,
}).partial().required({ id: true });
export type InsertContactSettings = z.infer<typeof insertContactSettingsSchema>;
export type UpdateContactSettings = z.infer<typeof updateContactSettingsSchema>;
export type ContactSettings = typeof contactSettings.$inferSelect;

// Membership Benefit schemas
export const insertMembershipBenefitSchema = createInsertSchema(membershipBenefits).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
export const updateMembershipBenefitSchema = createInsertSchema(membershipBenefits).omit({
  createdAt: true,
  updatedAt: true,
}).partial().required({ id: true });
export type InsertMembershipBenefit = z.infer<typeof insertMembershipBenefitSchema>;
export type UpdateMembershipBenefit = z.infer<typeof updateMembershipBenefitSchema>;
export type MembershipBenefit = typeof membershipBenefits.$inferSelect;

// Tier Usage Tracking schemas
export const insertTierUsageTrackingSchema = createInsertSchema(tierUsageTracking).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
export const updateTierUsageTrackingSchema = createInsertSchema(tierUsageTracking).omit({
  createdAt: true,
  updatedAt: true,
}).partial().required({ id: true });
export type InsertTierUsageTracking = z.infer<typeof insertTierUsageTrackingSchema>;
export type UpdateTierUsageTracking = z.infer<typeof updateTierUsageTrackingSchema>;
export type TierUsageTracking = typeof tierUsageTracking.$inferSelect;

// Message Template schemas
export const insertMessageTemplateSchema = createInsertSchema(messageTemplates).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
export const updateMessageTemplateSchema = createInsertSchema(messageTemplates).omit({
  createdAt: true,
  updatedAt: true,
}).partial().required({ id: true });
export type InsertMessageTemplate = z.infer<typeof insertMessageTemplateSchema>;
export type UpdateMessageTemplate = z.infer<typeof updateMessageTemplateSchema>;
export type MessageTemplate = typeof messageTemplates.$inferSelect;

// Platform Settings schemas
export const insertPlatformSettingSchema = createInsertSchema(platformSettings).omit({
  id: true,
  updatedAt: true,
});
export const updatePlatformSettingSchema = createInsertSchema(platformSettings).omit({
  updatedAt: true,
}).partial().required({ id: true });
export type InsertPlatformSetting = z.infer<typeof insertPlatformSettingSchema>;
export type UpdatePlatformSetting = z.infer<typeof updatePlatformSettingSchema>;
export type PlatformSetting = typeof platformSettings.$inferSelect;

// Settings Audit schemas
export const insertSettingsAuditSchema = createInsertSchema(settingsAudit).omit({
  id: true,
  changedAt: true,
});
export type InsertSettingsAudit = z.infer<typeof insertSettingsAuditSchema>;
export type SettingsAudit = typeof settingsAudit.$inferSelect;

// Email Template schemas
export const insertEmailTemplateSchema = createInsertSchema(emailTemplates).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
export const updateEmailTemplateSchema = createInsertSchema(emailTemplates).omit({
  createdAt: true,
  updatedAt: true,
}).partial().required({ id: true });
export type InsertEmailTemplate = z.infer<typeof insertEmailTemplateSchema>;
export type UpdateEmailTemplate = z.infer<typeof updateEmailTemplateSchema>;
export type EmailTemplate = typeof emailTemplates.$inferSelect;

// Login History schemas
export const insertLoginHistorySchema = createInsertSchema(loginHistory).omit({
  id: true,
  createdAt: true,
});
export type InsertLoginHistory = z.infer<typeof insertLoginHistorySchema>;
export type LoginHistory = typeof loginHistory.$inferSelect;

// Verification Rule schemas
export const insertVerificationRuleSchema = createInsertSchema(verificationRules).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
export const updateVerificationRuleSchema = createInsertSchema(verificationRules).omit({
  createdAt: true,
  updatedAt: true,
}).partial().required({ id: true });
export type InsertVerificationRule = z.infer<typeof insertVerificationRuleSchema>;
export type UpdateVerificationRule = z.infer<typeof updateVerificationRuleSchema>;
export type VerificationRule = typeof verificationRules.$inferSelect;

// Document Template schemas
export const insertDocumentTemplateSchema = createInsertSchema(documentTemplates).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
export const updateDocumentTemplateSchema = createInsertSchema(documentTemplates).omit({
  createdAt: true,
  updatedAt: true,
}).partial().required({ id: true });
export type InsertDocumentTemplate = z.infer<typeof insertDocumentTemplateSchema>;
export type UpdateDocumentTemplate = z.infer<typeof updateDocumentTemplateSchema>;
export type DocumentTemplate = typeof documentTemplates.$inferSelect;

// Admin Audit Log schemas
export const insertAdminAuditLogSchema = createInsertSchema(adminAuditLogs).omit({
  id: true,
  createdAt: true,
});
export type InsertAdminAuditLog = z.infer<typeof insertAdminAuditLogSchema>;
export type AdminAuditLog = typeof adminAuditLogs.$inferSelect;

// Two Factor Auth schemas
export const insertTwoFactorAuthSchema = createInsertSchema(twoFactorAuth).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
export const updateTwoFactorAuthSchema = createInsertSchema(twoFactorAuth).omit({
  createdAt: true,
  updatedAt: true,
}).partial().required({ id: true });
export type InsertTwoFactorAuth = z.infer<typeof insertTwoFactorAuthSchema>;
export type UpdateTwoFactorAuth = z.infer<typeof updateTwoFactorAuthSchema>;
export type TwoFactorAuth = typeof twoFactorAuth.$inferSelect;
