// Fusion Mining Limited - OPTIMIZED Database Schema
// Removes: videos, sustainabilityContent, messageTemplates, verificationRules, documentTemplates,
// twoFactorAuth, emailTemplates, loginHistory, messageIdempotency, tierUsageTracking, settingsAudit,
// platformSettings, contactSettings, adminAuditLogs
// Keeps: Core functionality for marketplace, messaging, verification, projects, and tier management

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
export const verificationStatusEnum = pgEnum('verification_status', ['not_requested', 'pending', 'approved', 'rejected']);

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: varchar("email").unique(),
  password: varchar("password"),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  profileImageUrl: varchar("profile_image_url"),
  role: userRoleEnum("role").notNull().default('buyer'),
  membershipTier: membershipTierEnum("membership_tier").notNull().default('basic'),
  verificationStatus: verificationStatusEnum("verification_status").notNull().default('not_requested'),
  badgeColor: varchar("badge_color"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Admin granular permissions (role-based control)
export const adminPermissions = pgTable("admin_permissions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  adminUserId: varchar("admin_user_id").notNull().references(() => users.id, { onDelete: 'cascade' }).unique(),
  adminRole: adminRoleEnum("admin_role").notNull().default('content_admin'),
  canManageUsers: boolean("can_manage_users").notNull().default(false),
  canManageListings: boolean("can_manage_listings").notNull().default(false),
  canManageProjects: boolean("can_manage_projects").notNull().default(false),
  canManageBlog: boolean("can_manage_blog").notNull().default(false),
  canManageCMS: boolean("can_manage_cms").notNull().default(false),
  canViewAnalytics: boolean("can_view_analytics").notNull().default(false),
  canManageMessages: boolean("can_manage_messages").notNull().default(false),
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
  itemId: varchar("item_id", { length: 5 }),
  ownerId: varchar("owner_id").notNull().references(() => users.id, { onDelete: 'cascade' }),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description").notNull(),
  licenseType: licenseTypeEnum("license_type").notNull(),
  minerals: text("minerals").array().notNull(),
  location: varchar("location").notNull(),
  latitude: decimal("latitude", { precision: 10, scale: 7 }),
  longitude: decimal("longitude", { precision: 10, scale: 7 }),
  status: projectStatusEnum("status").notNull().default('active'),
  imageUrl: varchar("image_url"),
  area: varchar("area"),
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
export const mainCategoryEnum = pgEnum('main_category', ['minerals', 'mining_tools', 'mining_services', 'mining_ppe']);
export const mineralSubcategoryEnum = pgEnum('mineral_subcategory', ['metallic', 'non_metallic', 'marble_natural_stone', 'gravel_sand_aggregate', 'coal_peat', 'other_minerals']);
export const toolSubcategoryEnum = pgEnum('tool_subcategory', ['drilling_equipment', 'energy_machines', 'engineering_devices', 'heavy_equipment', 'industrial_equipment', 'marble_machinery', 'ore_processing', 'underground_mining', 'other_tools']);
export const serviceSubcategoryEnum = pgEnum('service_subcategory', ['analysis_services', 'consulting_advisory', 'drilling_blasting', 'exploration_surveying', 'freight_services', 'mine_extraction', 'mineral_processing', 'supply_chain', 'other_services']);
export const ppeSubcategoryEnum = pgEnum('ppe_subcategory', ['head_face_protection', 'respiratory_protection', 'hand_foot_protection', 'fall_protection', 'protective_clothing', 'other_ppe']);

export const marketplaceListings = pgTable("marketplace_listings", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  itemId: varchar("item_id", { length: 5 }),
  sellerId: varchar("seller_id").notNull().references(() => users.id, { onDelete: 'cascade' }),
  type: listingTypeEnum("type").notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description").notNull(),
  mainCategory: mainCategoryEnum("main_category"),
  mineralSubcategory: mineralSubcategoryEnum("mineral_subcategory"),
  toolSubcategory: toolSubcategoryEnum("tool_subcategory"),
  serviceSubcategory: serviceSubcategoryEnum("service_subcategory"),
  ppeSubcategory: ppeSubcategoryEnum("ppe_subcategory"),
  specificType: varchar("specific_type"),
  mineralType: varchar("mineral_type"),
  grade: varchar("grade"),
  location: varchar("location").notNull(),
  quantity: varchar("quantity"),
  price: varchar("price"),
  imageUrl: varchar("image_url"),
  status: listingStatusEnum("status").notNull().default('pending'),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const buyerRequests = pgTable("buyer_requests", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  itemId: varchar("item_id", { length: 5 }),
  buyerId: varchar("buyer_id").notNull().references(() => users.id, { onDelete: 'cascade' }),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description").notNull(),
  mainCategory: mainCategoryEnum("main_category"),
  mineralSubcategory: mineralSubcategoryEnum("mineral_subcategory"),
  toolSubcategory: toolSubcategoryEnum("tool_subcategory"),
  serviceSubcategory: serviceSubcategoryEnum("service_subcategory"),
  ppeSubcategory: ppeSubcategoryEnum("ppe_subcategory"),
  specificType: varchar("specific_type"),
  mineralType: varchar("mineral_type"),
  quantity: varchar("quantity"),
  budget: varchar("budget"),
  location: varchar("location"),
  country: varchar("country", { length: 100 }),
  verified: boolean("verified").notNull().default(false),
  expiryDate: timestamp("expiry_date"),
  status: varchar("status").notNull().default('active'),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  rejectionReason: text("rejection_reason"),
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
  category: varchar("category"),
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
  status: varchar("status").notNull().default('new'),
  createdAt: timestamp("created_at").defaultNow().notNull(),
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
}, (table) => [
  index("IDX_activity_user_id").on(table.userId),
  index("IDX_activity_created_at").on(table.createdAt),
]);

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
}, (table) => [
  index("IDX_notification_user_id").on(table.userId),
  index("IDX_notification_read").on(table.read),
]);

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
  visibilityRanking: integer("visibility_ranking").notNull(),
  monthlyPrice: decimal("monthly_price", { precision: 10, scale: 2 }).notNull().default('0'),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// ============================================================================
// Seller Verification
// ============================================================================
export const sellerVerificationRequestStatusEnum = pgEnum('seller_verification_request_status', ['draft', 'pending', 'approved', 'rejected']);
export const sellerVerificationDocumentTypeEnum = pgEnum('seller_verification_document_type', [
  'certificate_of_incorporation',
  'company_profile',
  'shareholder_list',
  'tax_certificate',
  'letter_of_authorization',
  'director_id'
]);

export const sellerVerificationRequests = pgTable("seller_verification_requests", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  sellerId: varchar("seller_id").notNull().references(() => users.id, { onDelete: 'cascade' }),
  status: sellerVerificationRequestStatusEnum("status").notNull().default('draft'),
  rejectionReason: text("rejection_reason"),
  submittedAt: timestamp("submitted_at").defaultNow().notNull(),
  reviewedAt: timestamp("reviewed_at"),
  reviewedBy: varchar("reviewed_by").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
}, (table) => [
  index("IDX_verification_seller_id").on(table.sellerId),
  index("IDX_verification_status").on(table.status),
]);

export const sellerVerificationDocuments = pgTable("seller_verification_documents", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  requestId: varchar("request_id").notNull().references(() => sellerVerificationRequests.id, { onDelete: 'cascade' }),
  documentType: sellerVerificationDocumentTypeEnum("document_type").notNull(),
  fileName: varchar("file_name", { length: 255 }).notNull(),
  filePath: text("file_path").notNull(),
  fileSize: integer("file_size"),
  mimeType: varchar("mime_type", { length: 100 }),
  uploadedAt: timestamp("uploaded_at").defaultNow().notNull(),
}, (table) => [
  index("IDX_verification_doc_request_id").on(table.requestId),
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
  verificationRequests: many(sellerVerificationRequests),
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

export const sellerVerificationRequestsRelations = relations(sellerVerificationRequests, ({ one, many }) => ({
  seller: one(users, {
    fields: [sellerVerificationRequests.sellerId],
    references: [users.id],
  }),
  reviewer: one(users, {
    fields: [sellerVerificationRequests.reviewedBy],
    references: [users.id],
  }),
  documents: many(sellerVerificationDocuments),
}));

export const sellerVerificationDocumentsRelations = relations(sellerVerificationDocuments, ({ one }) => ({
  request: one(sellerVerificationRequests, {
    fields: [sellerVerificationDocuments.requestId],
    references: [sellerVerificationRequests.id],
  }),
}));

// ============================================================================
// Zod Schemas for validation (Keep existing patterns)
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
  ownerId: z.string().optional(),
});
export type InsertProject = z.infer<typeof insertProjectSchema>;
export type Project = typeof projects.$inferSelect;

export type ProjectWithOwner = Project & {
  owner: {
    id: string;
    firstName: string | null;
    lastName: string | null;
    email: string | null;
    verified: boolean;
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

export type MarketplaceListingWithSeller = MarketplaceListing & {
  seller: {
    id: string;
    firstName: string | null;
    lastName: string | null;
    email: string | null;
    verified: boolean;
    verificationStatus: 'not_requested' | 'pending' | 'approved' | 'rejected' | null;
    badgeColor: 'bronze' | 'silver' | 'gold' | null;
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

// Seller Verification Request schemas
export const insertSellerVerificationRequestSchema = createInsertSchema(sellerVerificationRequests).omit({
  id: true,
  submittedAt: true,
  reviewedAt: true,
  createdAt: true,
  updatedAt: true,
});
export const updateSellerVerificationRequestSchema = createInsertSchema(sellerVerificationRequests).omit({
  submittedAt: true,
  createdAt: true,
  updatedAt: true,
}).partial().required({ id: true });
export type InsertSellerVerificationRequest = z.infer<typeof insertSellerVerificationRequestSchema>;
export type UpdateSellerVerificationRequest = z.infer<typeof updateSellerVerificationRequestSchema>;
export type SellerVerificationRequest = typeof sellerVerificationRequests.$inferSelect;

// Seller Verification Document schemas
export const insertSellerVerificationDocumentSchema = createInsertSchema(sellerVerificationDocuments).omit({
  id: true,
  uploadedAt: true,
});
export type InsertSellerVerificationDocument = z.infer<typeof insertSellerVerificationDocumentSchema>;
export type SellerVerificationDocument = typeof sellerVerificationDocuments.$inferSelect;
