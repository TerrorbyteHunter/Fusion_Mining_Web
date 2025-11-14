var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// server/index.ts
import "dotenv/config";
import express2 from "express";
import cors from "cors";

// server/routes.ts
import multer from "multer";
import path from "path";
import fs from "fs";
import { createServer } from "http";

// shared/schema.ts
var schema_exports = {};
__export(schema_exports, {
  activityLogs: () => activityLogs,
  activityLogsRelations: () => activityLogsRelations,
  activityTypeEnum: () => activityTypeEnum,
  adminPermissions: () => adminPermissions,
  adminPermissionsRelations: () => adminPermissionsRelations,
  blogPosts: () => blogPosts,
  blogPostsRelations: () => blogPostsRelations,
  buyerRequests: () => buyerRequests,
  buyerRequestsRelations: () => buyerRequestsRelations,
  contactSettings: () => contactSettings,
  contactSubmissions: () => contactSubmissions,
  expressInterest: () => expressInterest,
  expressInterestRelations: () => expressInterestRelations,
  insertActivityLogSchema: () => insertActivityLogSchema,
  insertAdminPermissionsSchema: () => insertAdminPermissionsSchema,
  insertBlogPostSchema: () => insertBlogPostSchema,
  insertBuyerRequestSchema: () => insertBuyerRequestSchema,
  insertContactSettingsSchema: () => insertContactSettingsSchema,
  insertContactSubmissionSchema: () => insertContactSubmissionSchema,
  insertExpressInterestSchema: () => insertExpressInterestSchema,
  insertMarketplaceListingSchema: () => insertMarketplaceListingSchema,
  insertMessageSchema: () => insertMessageSchema,
  insertMessageTemplateSchema: () => insertMessageTemplateSchema,
  insertMessageThreadSchema: () => insertMessageThreadSchema,
  insertNotificationSchema: () => insertNotificationSchema,
  insertProjectSchema: () => insertProjectSchema,
  insertUserProfileSchema: () => insertUserProfileSchema,
  insertVideoSchema: () => insertVideoSchema,
  licenseTypeEnum: () => licenseTypeEnum,
  listingStatusEnum: () => listingStatusEnum,
  listingTypeEnum: () => listingTypeEnum,
  mainCategoryEnum: () => mainCategoryEnum,
  marketplaceListings: () => marketplaceListings,
  marketplaceListingsRelations: () => marketplaceListingsRelations,
  messageContextEnum: () => messageContextEnum,
  messageIdempotency: () => messageIdempotency,
  messageTemplates: () => messageTemplates,
  messageThreads: () => messageThreads,
  messageThreadsRelations: () => messageThreadsRelations,
  messages: () => messages,
  messagesRelations: () => messagesRelations,
  mineralSubcategoryEnum: () => mineralSubcategoryEnum,
  notificationTypeEnum: () => notificationTypeEnum,
  notifications: () => notifications,
  notificationsRelations: () => notificationsRelations,
  ppeSubcategoryEnum: () => ppeSubcategoryEnum,
  profileTypeEnum: () => profileTypeEnum,
  projectStatusEnum: () => projectStatusEnum,
  projects: () => projects,
  projectsRelations: () => projectsRelations,
  serviceSubcategoryEnum: () => serviceSubcategoryEnum,
  sessions: () => sessions,
  templateTypeEnum: () => templateTypeEnum,
  threadStatusEnum: () => threadStatusEnum,
  threadTypeEnum: () => threadTypeEnum,
  toolSubcategoryEnum: () => toolSubcategoryEnum,
  updateAdminPermissionsSchema: () => updateAdminPermissionsSchema,
  updateContactSettingsSchema: () => updateContactSettingsSchema,
  updateMessageTemplateSchema: () => updateMessageTemplateSchema,
  updateUserProfileSchema: () => updateUserProfileSchema,
  updateVideoSchema: () => updateVideoSchema,
  upsertUserSchema: () => upsertUserSchema,
  userProfiles: () => userProfiles,
  userProfilesRelations: () => userProfilesRelations,
  userRoleEnum: () => userRoleEnum,
  users: () => users,
  usersRelations: () => usersRelations,
  verificationQueue: () => verificationQueue,
  verificationQueueRelations: () => verificationQueueRelations,
  videos: () => videos
});
import { sql } from "drizzle-orm";
import { relations } from "drizzle-orm";
import {
  index,
  jsonb,
  pgTable,
  timestamp,
  varchar,
  text,
  decimal,
  boolean,
  pgEnum
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
var sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull()
  },
  (table) => [index("IDX_session_expire").on(table.expire)]
);
var userRoleEnum = pgEnum("user_role", ["admin", "buyer", "seller"]);
var profileTypeEnum = pgEnum("profile_type", ["individual", "company"]);
var users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: varchar("email").unique(),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  profileImageUrl: varchar("profile_image_url"),
  role: userRoleEnum("role").notNull().default("buyer"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull()
});
var adminPermissions = pgTable("admin_permissions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  adminUserId: varchar("admin_user_id").notNull().references(() => users.id, { onDelete: "cascade" }).unique(),
  canManageUsers: boolean("can_manage_users").notNull().default(true),
  canManageListings: boolean("can_manage_listings").notNull().default(true),
  canManageProjects: boolean("can_manage_projects").notNull().default(true),
  canManageBlog: boolean("can_manage_blog").notNull().default(true),
  canManageCMS: boolean("can_manage_cms").notNull().default(true),
  canViewAnalytics: boolean("can_view_analytics").notNull().default(true),
  canManageMessages: boolean("can_manage_messages").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull()
});
var userProfiles = pgTable("user_profiles", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id, { onDelete: "cascade" }).unique(),
  profileType: profileTypeEnum("profile_type").notNull().default("individual"),
  companyName: varchar("company_name"),
  phoneNumber: varchar("phone_number"),
  location: varchar("location"),
  bio: text("bio"),
  interests: text("interests").array(),
  verified: boolean("verified").notNull().default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull()
});
var licenseTypeEnum = pgEnum("license_type", ["exploration", "mining", "processing"]);
var projectStatusEnum = pgEnum("project_status", ["active", "pending", "completed", "suspended", "closed"]);
var projects = pgTable("projects", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  // short human-friendly item id shown when project is published/active
  itemId: varchar("item_id", { length: 5 }),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description").notNull(),
  licenseType: licenseTypeEnum("license_type").notNull(),
  minerals: text("minerals").array().notNull(),
  location: varchar("location").notNull(),
  // Region in Zambia
  latitude: decimal("latitude", { precision: 10, scale: 7 }),
  longitude: decimal("longitude", { precision: 10, scale: 7 }),
  status: projectStatusEnum("status").notNull().default("active"),
  imageUrl: varchar("image_url"),
  area: varchar("area"),
  // e.g., "500 hectares"
  estimatedValue: varchar("estimated_value"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull()
});
var expressInterest = pgTable("express_interest", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  projectId: varchar("project_id").references(() => projects.id, { onDelete: "cascade" }),
  listingId: varchar("listing_id").references(() => marketplaceListings.id, { onDelete: "cascade" }),
  userId: varchar("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  message: text("message"),
  createdAt: timestamp("created_at").defaultNow().notNull()
});
var listingTypeEnum = pgEnum("listing_type", ["mineral", "partnership", "project"]);
var listingStatusEnum = pgEnum("listing_status", ["pending", "approved", "rejected", "inactive", "closed"]);
var mainCategoryEnum = pgEnum("main_category", ["minerals", "mining_tools", "mining_services", "mining_ppe"]);
var mineralSubcategoryEnum = pgEnum("mineral_subcategory", ["metallic", "non_metallic", "marble_natural_stone", "gravel_sand_aggregate", "coal_peat", "other_minerals"]);
var toolSubcategoryEnum = pgEnum("tool_subcategory", ["drilling_equipment", "energy_machines", "engineering_devices", "heavy_equipment", "industrial_equipment", "marble_machinery", "ore_processing", "underground_mining", "other_tools"]);
var serviceSubcategoryEnum = pgEnum("service_subcategory", ["analysis_services", "consulting_advisory", "drilling_blasting", "exploration_surveying", "freight_services", "mine_extraction", "mineral_processing", "supply_chain", "other_services"]);
var ppeSubcategoryEnum = pgEnum("ppe_subcategory", ["head_face_protection", "respiratory_protection", "hand_foot_protection", "fall_protection", "protective_clothing", "other_ppe"]);
var marketplaceListings = pgTable("marketplace_listings", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  // short human-friendly item id assigned when listing is approved
  itemId: varchar("item_id", { length: 5 }),
  sellerId: varchar("seller_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  type: listingTypeEnum("type").notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description").notNull(),
  // Hierarchical categorization (B2B Mineral style)
  mainCategory: mainCategoryEnum("main_category"),
  mineralSubcategory: mineralSubcategoryEnum("mineral_subcategory"),
  toolSubcategory: toolSubcategoryEnum("tool_subcategory"),
  serviceSubcategory: serviceSubcategoryEnum("service_subcategory"),
  ppeSubcategory: ppeSubcategoryEnum("ppe_subcategory"),
  specificType: varchar("specific_type"),
  // e.g., "Copper Ore", "Excavator", "Freight Forwarding"
  // Legacy field for backward compatibility
  mineralType: varchar("mineral_type"),
  // e.g., "Copper", "Emerald"
  grade: varchar("grade"),
  // e.g., "High Grade", "25% purity"
  location: varchar("location").notNull(),
  quantity: varchar("quantity"),
  // e.g., "1000 tonnes"
  price: varchar("price"),
  // e.g., "$5000/tonne"
  imageUrl: varchar("image_url"),
  status: listingStatusEnum("status").notNull().default("pending"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull()
});
var buyerRequests = pgTable("buyer_requests", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  // short human-friendly item id for buyer requests/RFQs
  itemId: varchar("item_id", { length: 5 }),
  buyerId: varchar("buyer_id").notNull().references(() => users.id, { onDelete: "cascade" }),
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
  country: varchar("country", { length: 100 }),
  // Country code or name for flag display
  // RFQ-specific fields
  verified: boolean("verified").notNull().default(false),
  // Admin verification badge
  expiryDate: timestamp("expiry_date"),
  // When the RFQ expires
  status: varchar("status").notNull().default("active"),
  // active, closed
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull()
});
var threadStatusEnum = pgEnum("thread_status", ["open", "closed"]);
var messageContextEnum = pgEnum("message_context", ["marketplace", "project_interest", "general"]);
var threadTypeEnum = pgEnum("thread_type", ["project_interest", "marketplace_inquiry", "admin_to_seller", "admin_to_buyer", "general"]);
var messageThreads = pgTable("message_threads", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: varchar("title", { length: 255 }).notNull(),
  type: threadTypeEnum("type").notNull().default("general"),
  projectId: varchar("project_id").references(() => projects.id, { onDelete: "cascade" }),
  listingId: varchar("listing_id").references(() => marketplaceListings.id, { onDelete: "cascade" }),
  buyerId: varchar("buyer_id").references(() => users.id, { onDelete: "cascade" }),
  sellerId: varchar("seller_id").references(() => users.id, { onDelete: "cascade" }),
  adminId: varchar("admin_id").references(() => users.id, { onDelete: "cascade" }),
  createdBy: varchar("created_by").notNull().references(() => users.id, { onDelete: "cascade" }),
  context: messageContextEnum("context").default("general"),
  status: threadStatusEnum("status").notNull().default("open"),
  lastMessageAt: timestamp("last_message_at").defaultNow().notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull()
}, (table) => [
  index("IDX_thread_buyer_id").on(table.buyerId),
  index("IDX_thread_seller_id").on(table.sellerId),
  index("IDX_thread_admin_id").on(table.adminId),
  index("IDX_thread_created_by").on(table.createdBy),
  index("IDX_thread_project_id").on(table.projectId),
  index("IDX_thread_listing_id").on(table.listingId),
  index("IDX_thread_context").on(table.context),
  index("IDX_thread_type").on(table.type)
]);
var messages = pgTable("messages", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  threadId: varchar("thread_id").references(() => messageThreads.id, { onDelete: "cascade" }),
  senderId: varchar("sender_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  receiverId: varchar("receiver_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  subject: varchar("subject", { length: 255 }),
  content: text("content").notNull(),
  context: messageContextEnum("context").default("general"),
  read: boolean("read").notNull().default(false),
  closed: boolean("closed").notNull().default(false),
  unread: boolean("unread").notNull().default(true),
  relatedProjectId: varchar("related_project_id").references(() => projects.id, { onDelete: "set null" }),
  relatedListingId: varchar("related_listing_id").references(() => marketplaceListings.id, { onDelete: "set null" }),
  isAutoRelay: boolean("is_auto_relay").notNull().default(false),
  createdAt: timestamp("created_at").defaultNow().notNull()
}, (table) => [
  index("IDX_message_thread_id").on(table.threadId),
  index("IDX_message_context").on(table.context)
]);
var messageIdempotency = pgTable("message_idempotency", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  key: varchar("key", { length: 255 }).notNull().unique(),
  messageId: varchar("message_id").notNull().references(() => messages.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").defaultNow().notNull()
});
var templateTypeEnum = pgEnum("template_type", ["buyer_interest_to_buyer", "buyer_interest_to_seller", "buyer_interest_to_admin"]);
var messageTemplates = pgTable("message_templates", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: varchar("name", { length: 255 }).notNull(),
  type: templateTypeEnum("type").notNull(),
  subject: varchar("subject", { length: 255 }).notNull(),
  content: text("content").notNull(),
  active: boolean("active").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull()
});
var blogPosts = pgTable("blog_posts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  authorId: varchar("author_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  title: varchar("title", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  excerpt: text("excerpt"),
  content: text("content").notNull(),
  imageUrl: varchar("image_url"),
  category: varchar("category"),
  // e.g., "Industry News", "Mining Tips", "Market Analysis"
  published: boolean("published").notNull().default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull()
});
var contactSubmissions = pgTable("contact_submissions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 50 }),
  subject: varchar("subject", { length: 255 }).notNull(),
  message: text("message").notNull(),
  status: varchar("status").notNull().default("new"),
  // new, contacted, resolved
  createdAt: timestamp("created_at").defaultNow().notNull()
});
var verificationQueue = pgTable("verification_queue", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  listingId: varchar("listing_id").notNull().references(() => marketplaceListings.id, { onDelete: "cascade" }).unique(),
  submittedAt: timestamp("submitted_at").defaultNow().notNull(),
  reviewedAt: timestamp("reviewed_at"),
  reviewedBy: varchar("reviewed_by").references(() => users.id),
  notes: text("notes")
});
var activityTypeEnum = pgEnum("activity_type", ["login", "logout", "listing_created", "listing_approved", "listing_rejected", "message_sent", "interest_expressed", "profile_updated", "blog_post_created"]);
var activityLogs = pgTable("activity_logs", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id, { onDelete: "cascade" }),
  activityType: activityTypeEnum("activity_type").notNull(),
  description: text("description").notNull(),
  ipAddress: varchar("ip_address", { length: 45 }),
  userAgent: text("user_agent"),
  metadata: jsonb("metadata"),
  createdAt: timestamp("created_at").defaultNow().notNull()
}, (table) => [index("IDX_activity_user_id").on(table.userId), index("IDX_activity_created_at").on(table.createdAt)]);
var notificationTypeEnum = pgEnum("notification_type", ["message", "listing_approved", "listing_rejected", "interest_received", "system"]);
var notifications = pgTable("notifications", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  type: notificationTypeEnum("type").notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  message: text("message").notNull(),
  link: varchar("link"),
  read: boolean("read").notNull().default(false),
  createdAt: timestamp("created_at").defaultNow().notNull()
}, (table) => [index("IDX_notification_user_id").on(table.userId), index("IDX_notification_read").on(table.read)]);
var videos = pgTable("videos", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  videoUrl: text("video_url").notNull(),
  thumbnailUrl: text("thumbnail_url"),
  duration: varchar("duration"),
  active: boolean("active").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull()
});
var contactSettings = pgTable("contact_settings", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  officeAddress: text("office_address").notNull(),
  phone: varchar("phone").notNull(),
  email: varchar("email").notNull(),
  supportEmail: varchar("support_email"),
  mondayFriday: varchar("monday_friday").notNull().default("8:00 AM - 5:00 PM"),
  saturday: varchar("saturday").default("9:00 AM - 1:00 PM"),
  sunday: varchar("sunday").default("Closed"),
  updatedAt: timestamp("updated_at").defaultNow().notNull()
});
var usersRelations = relations(users, ({ one, many }) => ({
  profile: one(userProfiles, {
    fields: [users.id],
    references: [userProfiles.userId]
  }),
  listings: many(marketplaceListings),
  buyerRequests: many(buyerRequests),
  buyerThreads: many(messageThreads, { relationName: "buyerThreads" }),
  sellerThreads: many(messageThreads, { relationName: "sellerThreads" }),
  adminThreads: many(messageThreads, { relationName: "adminThreads" }),
  createdThreads: many(messageThreads, { relationName: "createdThreads" }),
  sentMessages: many(messages, { relationName: "sentMessages" }),
  receivedMessages: many(messages, { relationName: "receivedMessages" }),
  blogPosts: many(blogPosts),
  interests: many(expressInterest),
  activityLogs: many(activityLogs),
  notifications: many(notifications)
}));
var adminPermissionsRelations = relations(adminPermissions, ({ one }) => ({
  adminUser: one(users, {
    fields: [adminPermissions.adminUserId],
    references: [users.id]
  })
}));
var userProfilesRelations = relations(userProfiles, ({ one }) => ({
  user: one(users, {
    fields: [userProfiles.userId],
    references: [users.id]
  })
}));
var projectsRelations = relations(projects, ({ many }) => ({
  interests: many(expressInterest)
}));
var expressInterestRelations = relations(expressInterest, ({ one }) => ({
  project: one(projects, {
    fields: [expressInterest.projectId],
    references: [projects.id]
  }),
  user: one(users, {
    fields: [expressInterest.userId],
    references: [users.id]
  })
}));
var marketplaceListingsRelations = relations(marketplaceListings, ({ one }) => ({
  seller: one(users, {
    fields: [marketplaceListings.sellerId],
    references: [users.id]
  }),
  verification: one(verificationQueue, {
    fields: [marketplaceListings.id],
    references: [verificationQueue.listingId]
  })
}));
var buyerRequestsRelations = relations(buyerRequests, ({ one }) => ({
  buyer: one(users, {
    fields: [buyerRequests.buyerId],
    references: [users.id]
  })
}));
var messageThreadsRelations = relations(messageThreads, ({ one, many }) => ({
  project: one(projects, {
    fields: [messageThreads.projectId],
    references: [projects.id]
  }),
  listing: one(marketplaceListings, {
    fields: [messageThreads.listingId],
    references: [marketplaceListings.id]
  }),
  buyer: one(users, {
    fields: [messageThreads.buyerId],
    references: [users.id],
    relationName: "buyerThreads"
  }),
  seller: one(users, {
    fields: [messageThreads.sellerId],
    references: [users.id],
    relationName: "sellerThreads"
  }),
  admin: one(users, {
    fields: [messageThreads.adminId],
    references: [users.id],
    relationName: "adminThreads"
  }),
  creator: one(users, {
    fields: [messageThreads.createdBy],
    references: [users.id],
    relationName: "createdThreads"
  }),
  messages: many(messages)
}));
var messagesRelations = relations(messages, ({ one }) => ({
  thread: one(messageThreads, {
    fields: [messages.threadId],
    references: [messageThreads.id]
  }),
  sender: one(users, {
    fields: [messages.senderId],
    references: [users.id],
    relationName: "sentMessages"
  }),
  receiver: one(users, {
    fields: [messages.receiverId],
    references: [users.id],
    relationName: "receivedMessages"
  })
}));
var blogPostsRelations = relations(blogPosts, ({ one }) => ({
  author: one(users, {
    fields: [blogPosts.authorId],
    references: [users.id]
  })
}));
var verificationQueueRelations = relations(verificationQueue, ({ one }) => ({
  listing: one(marketplaceListings, {
    fields: [verificationQueue.listingId],
    references: [marketplaceListings.id]
  }),
  reviewer: one(users, {
    fields: [verificationQueue.reviewedBy],
    references: [users.id]
  })
}));
var activityLogsRelations = relations(activityLogs, ({ one }) => ({
  user: one(users, {
    fields: [activityLogs.userId],
    references: [users.id]
  })
}));
var notificationsRelations = relations(notifications, ({ one }) => ({
  user: one(users, {
    fields: [notifications.userId],
    references: [users.id]
  })
}));
var upsertUserSchema = createInsertSchema(users).pick({
  id: true,
  email: true,
  firstName: true,
  lastName: true,
  profileImageUrl: true
});
var insertAdminPermissionsSchema = createInsertSchema(adminPermissions).omit({
  id: true,
  createdAt: true,
  updatedAt: true
});
var updateAdminPermissionsSchema = createInsertSchema(adminPermissions).omit({
  createdAt: true,
  updatedAt: true
}).partial().required({ adminUserId: true });
var insertUserProfileSchema = createInsertSchema(userProfiles).omit({
  id: true,
  createdAt: true,
  updatedAt: true
});
var updateUserProfileSchema = insertUserProfileSchema.partial().required({ userId: true });
var insertProjectSchema = createInsertSchema(projects).omit({
  id: true,
  createdAt: true,
  updatedAt: true
});
var insertExpressInterestSchema = createInsertSchema(expressInterest).omit({
  id: true,
  createdAt: true
});
var insertMarketplaceListingSchema = createInsertSchema(marketplaceListings).omit({
  id: true,
  status: true,
  createdAt: true,
  updatedAt: true
});
var insertBuyerRequestSchema = createInsertSchema(buyerRequests).omit({
  id: true,
  status: true,
  createdAt: true,
  updatedAt: true
});
var insertMessageThreadSchema = createInsertSchema(messageThreads).omit({
  id: true,
  lastMessageAt: true,
  createdAt: true
});
var insertMessageSchema = createInsertSchema(messages).omit({
  id: true,
  read: true,
  createdAt: true
});
var insertBlogPostSchema = createInsertSchema(blogPosts).omit({
  id: true,
  published: true,
  createdAt: true,
  updatedAt: true
});
var insertContactSubmissionSchema = createInsertSchema(contactSubmissions).omit({
  id: true,
  status: true,
  createdAt: true
});
var insertActivityLogSchema = createInsertSchema(activityLogs).omit({
  id: true,
  createdAt: true
});
var insertNotificationSchema = createInsertSchema(notifications).omit({
  id: true,
  read: true,
  createdAt: true
});
var insertVideoSchema = createInsertSchema(videos).omit({
  id: true,
  createdAt: true,
  updatedAt: true
});
var updateVideoSchema = createInsertSchema(videos).omit({
  createdAt: true,
  updatedAt: true
}).partial().required({ id: true });
var insertContactSettingsSchema = createInsertSchema(contactSettings).omit({
  id: true,
  updatedAt: true
});
var updateContactSettingsSchema = createInsertSchema(contactSettings).omit({
  updatedAt: true
}).partial().required({ id: true });
var insertMessageTemplateSchema = createInsertSchema(messageTemplates).omit({
  id: true,
  createdAt: true,
  updatedAt: true
});
var updateMessageTemplateSchema = createInsertSchema(messageTemplates).omit({
  createdAt: true,
  updatedAt: true
}).partial().required({ id: true });

// server/db.ts
import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not defined. Please provision a database.");
}
var pool = new Pool({
  connectionString: process.env.DATABASE_URL
});
var db = drizzle(pool, { schema: schema_exports });

// server/storage.ts
import { eq, and, desc, or, sql as sql2, inArray } from "drizzle-orm";
async function generateUniqueItemId(db2, length = 5) {
  const CHARS = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const maxAttempts = 20;
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    let id = "";
    for (let i = 0; i < length; i++) id += CHARS[Math.floor(Math.random() * CHARS.length)];
    const exists = await db2.select().from(marketplaceListings).where(eq(marketplaceListings.itemId, id)).limit(1);
    if (exists.length > 0) continue;
    const exists2 = await db2.select().from(projects).where(eq(projects.itemId, id)).limit(1);
    if (exists2.length > 0) continue;
    const exists3 = await db2.select().from(buyerRequests).where(eq(buyerRequests.itemId, id)).limit(1);
    if (exists3.length > 0) continue;
    return id;
  }
  throw new Error("Failed to generate unique item id");
}
var DatabaseStorage = class {
  // ========================================================================
  // User operations
  // ========================================================================
  async getUser(id) {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }
  async getUserById(id) {
    return this.getUser(id);
  }
  async getAdminUser() {
    const [admin] = await db.select().from(users).where(eq(users.role, "admin")).limit(1);
    return admin;
  }
  async getUsersByRole(role) {
    return await db.select().from(users).where(eq(users.role, role));
  }
  async upsertUser(userData) {
    if (userData.email) {
      const existingUsers = await db.select().from(users).where(eq(users.email, userData.email)).limit(1);
      if (existingUsers.length > 0) {
        const [user2] = await db.update(users).set({
          firstName: userData.firstName,
          lastName: userData.lastName,
          profileImageUrl: userData.profileImageUrl,
          updatedAt: /* @__PURE__ */ new Date()
        }).where(eq(users.email, userData.email)).returning();
        return user2;
      }
    }
    const [user] = await db.insert(users).values(userData).onConflictDoUpdate({
      target: users.id,
      set: {
        ...userData,
        updatedAt: /* @__PURE__ */ new Date()
      }
    }).returning();
    return user;
  }
  async getAllUsers() {
    return await db.select().from(users).orderBy(desc(users.createdAt));
  }
  async updateUserRole(id, role) {
    const [user] = await db.update(users).set({ role, updatedAt: /* @__PURE__ */ new Date() }).where(eq(users.id, id)).returning();
    return user;
  }
  async deleteUser(id) {
    await db.delete(users).where(eq(users.id, id));
  }
  // ========================================================================
  // Admin Permissions operations
  // ========================================================================
  async getAdminPermissions(adminUserId) {
    const [row] = await db.select().from(adminPermissions).where(eq(adminPermissions.adminUserId, adminUserId)).limit(1);
    return row;
  }
  async upsertAdminPermissions(data) {
    const existing = await this.getAdminPermissions(data.adminUserId);
    if (existing) {
      const [updated] = await db.update(adminPermissions).set({ ...data, updatedAt: /* @__PURE__ */ new Date() }).where(eq(adminPermissions.adminUserId, data.adminUserId)).returning();
      return updated;
    }
    const [inserted] = await db.insert(adminPermissions).values(data).returning();
    return inserted;
  }
  async updateAdminPermissions(data) {
    const [updated] = await db.update(adminPermissions).set({ ...data, updatedAt: /* @__PURE__ */ new Date() }).where(eq(adminPermissions.adminUserId, data.adminUserId)).returning();
    return updated;
  }
  // ========================================================================
  // User Profile operations
  // ========================================================================
  async getUserProfile(userId) {
    const [profile] = await db.select().from(userProfiles).where(eq(userProfiles.userId, userId));
    return profile;
  }
  async createUserProfile(profileData) {
    const [profile] = await db.insert(userProfiles).values(profileData).returning();
    return profile;
  }
  async updateUserProfile(profileData) {
    const [profile] = await db.update(userProfiles).set({
      ...profileData,
      updatedAt: /* @__PURE__ */ new Date()
    }).where(eq(userProfiles.userId, profileData.userId)).returning();
    return profile;
  }
  // ========================================================================
  // Project operations
  // ========================================================================
  async createProject(projectData) {
    if (!projectData.itemId && projectData.status === "active") {
      projectData.itemId = await generateUniqueItemId(db);
    }
    const [project] = await db.insert(projects).values(projectData).returning();
    return project;
  }
  async getProjects() {
    return await db.select().from(projects).orderBy(desc(projects.createdAt));
  }
  async getProjectById(id) {
    const [project] = await db.select().from(projects).where(eq(projects.id, id));
    return project;
  }
  async updateProject(id, data) {
    if (data.status === "active") {
      const [existing] = await db.select().from(projects).where(eq(projects.id, id)).limit(1);
      if (existing && !existing.itemId) {
        data.itemId = await generateUniqueItemId(db);
      }
    }
    const [project] = await db.update(projects).set({ ...data, updatedAt: /* @__PURE__ */ new Date() }).where(eq(projects.id, id)).returning();
    return project;
  }
  async deleteProject(id) {
    await db.delete(projects).where(eq(projects.id, id));
  }
  async closeProject(id) {
    const [project] = await db.update(projects).set({ status: "closed", updatedAt: /* @__PURE__ */ new Date() }).where(eq(projects.id, id)).returning();
    return project;
  }
  async expressProjectInterest(interestData) {
    const [interest] = await db.insert(expressInterest).values(interestData).returning();
    return interest;
  }
  async getAllExpressedInterests() {
    const interests = await db.select({
      id: expressInterest.id,
      projectId: expressInterest.projectId,
      listingId: expressInterest.listingId,
      userId: expressInterest.userId,
      message: expressInterest.message,
      createdAt: expressInterest.createdAt,
      userName: sql2`${users.firstName} || ' ' || ${users.lastName}`.as("userName"),
      userEmail: users.email,
      projectName: projects.name,
      listingTitle: marketplaceListings.title
    }).from(expressInterest).leftJoin(users, eq(expressInterest.userId, users.id)).leftJoin(projects, eq(expressInterest.projectId, projects.id)).leftJoin(marketplaceListings, eq(expressInterest.listingId, marketplaceListings.id)).orderBy(desc(expressInterest.createdAt));
    return interests;
  }
  // ========================================================================
  // Marketplace Listing operations
  // ========================================================================
  async createMarketplaceListing(listingData) {
    const [listing] = await db.insert(marketplaceListings).values(listingData).returning();
    await db.insert(verificationQueue).values({
      listingId: listing.id
    });
    return listing;
  }
  async getMarketplaceListings(filters) {
    let query = db.select().from(marketplaceListings);
    if (filters?.type && filters?.status) {
      query = query.where(
        and(
          eq(marketplaceListings.type, filters.type),
          eq(marketplaceListings.status, filters.status)
        )
      );
    } else if (filters?.type) {
      query = query.where(eq(marketplaceListings.type, filters.type));
    } else if (filters?.status) {
      query = query.where(eq(marketplaceListings.status, filters.status));
    }
    return await query.orderBy(desc(marketplaceListings.createdAt));
  }
  async getMarketplaceListingById(id) {
    const [listing] = await db.select().from(marketplaceListings).where(eq(marketplaceListings.id, id));
    return listing;
  }
  async updateListingStatus(id, status) {
    const [listing] = await db.update(marketplaceListings).set({
      status,
      updatedAt: /* @__PURE__ */ new Date()
    }).where(eq(marketplaceListings.id, id)).returning();
    return listing;
  }
  async updateMarketplaceListing(id, data) {
    const [listing] = await db.update(marketplaceListings).set({ ...data, updatedAt: /* @__PURE__ */ new Date() }).where(eq(marketplaceListings.id, id)).returning();
    return listing;
  }
  async deleteMarketplaceListing(id) {
    await db.delete(marketplaceListings).where(eq(marketplaceListings.id, id));
  }
  async closeMarketplaceListing(id) {
    const [listing] = await db.update(marketplaceListings).set({ status: "closed", updatedAt: /* @__PURE__ */ new Date() }).where(eq(marketplaceListings.id, id)).returning();
    return listing;
  }
  async getListingsBySellerId(sellerId) {
    return await db.select().from(marketplaceListings).where(eq(marketplaceListings.sellerId, sellerId)).orderBy(desc(marketplaceListings.createdAt));
  }
  // When approving a listing, assign itemId if missing
  async approveListing(listingId, reviewerId) {
    const [existing] = await db.select().from(marketplaceListings).where(eq(marketplaceListings.id, listingId)).limit(1);
    let itemId = existing?.itemId || null;
    if (!itemId) {
      itemId = await generateUniqueItemId(db);
    }
    await db.update(marketplaceListings).set({
      status: "approved",
      itemId,
      updatedAt: /* @__PURE__ */ new Date()
    }).where(eq(marketplaceListings.id, listingId));
    await db.update(verificationQueue).set({
      reviewedAt: /* @__PURE__ */ new Date(),
      reviewedBy: reviewerId
    }).where(eq(verificationQueue.listingId, listingId));
  }
  // ========================================================================
  // Buyer Request operations
  // ========================================================================
  async createBuyerRequest(requestData) {
    if (!requestData.itemId) {
      requestData.itemId = await generateUniqueItemId(db);
    }
    const [request] = await db.insert(buyerRequests).values(requestData).returning();
    return request;
  }
  async getBuyerRequests() {
    return await db.select().from(buyerRequests).orderBy(desc(buyerRequests.createdAt));
  }
  async getBuyerRequestById(id) {
    const [request] = await db.select().from(buyerRequests).where(eq(buyerRequests.id, id));
    return request;
  }
  // ========================================================================
  // Message Thread operations
  // ========================================================================
  async createMessageThread(threadData) {
    const [thread] = await db.insert(messageThreads).values(threadData).returning();
    return thread;
  }
  async getThreadById(id) {
    const [thread] = await db.select().from(messageThreads).where(eq(messageThreads.id, id));
    return thread;
  }
  async getThreadWithParticipants(id) {
    const thread = await this.getThreadById(id);
    if (!thread) return null;
    const [listing] = thread.listingId ? await db.select().from(marketplaceListings).where(eq(marketplaceListings.id, thread.listingId)).limit(1) : [null];
    const [project] = thread.projectId ? await db.select().from(projects).where(eq(projects.id, thread.projectId)).limit(1) : [null];
    const buyer = thread.buyerId ? await this.getUserById(thread.buyerId) : null;
    const buyerProfile = thread.buyerId ? await this.getUserProfile(thread.buyerId) : null;
    const seller = thread.sellerId ? await this.getUserById(thread.sellerId) : null;
    const sellerProfile = thread.sellerId ? await this.getUserProfile(thread.sellerId) : null;
    return {
      thread,
      listing: listing || null,
      project: project || null,
      buyer: buyer || null,
      buyerProfile: buyerProfile || null,
      seller: seller || null,
      sellerProfile: sellerProfile || null
    };
  }
  async getThreadsByUserId(userId) {
    return await db.select().from(messageThreads).where(
      or(
        eq(messageThreads.buyerId, userId),
        eq(messageThreads.sellerId, userId)
      )
    ).orderBy(desc(messageThreads.lastMessageAt));
  }
  async getThreadsByBuyerId(buyerId) {
    return await db.select().from(messageThreads).where(eq(messageThreads.buyerId, buyerId)).orderBy(desc(messageThreads.lastMessageAt));
  }
  async getAllMessageThreads() {
    const results = await db.select({
      thread: messageThreads,
      listing: marketplaceListings,
      project: projects,
      buyerFirstName: sql2`buyer.first_name`,
      buyerLastName: sql2`buyer.last_name`,
      sellerFirstName: sql2`seller.first_name`,
      sellerLastName: sql2`seller.last_name`
    }).from(messageThreads).leftJoin(marketplaceListings, eq(messageThreads.listingId, marketplaceListings.id)).leftJoin(projects, eq(messageThreads.projectId, projects.id)).leftJoin(
      sql2`users as buyer`,
      eq(messageThreads.buyerId, sql2`buyer.id`)
    ).leftJoin(
      sql2`users as seller`,
      eq(messageThreads.sellerId, sql2`seller.id`)
    ).orderBy(desc(messageThreads.lastMessageAt));
    return results.map((r) => {
      const { thread, listing, project, buyerFirstName, buyerLastName, sellerFirstName, sellerLastName } = r;
      const thread_without_context = {
        ...thread,
        // Explicitly omit the context field
        id: thread.id,
        title: thread.title,
        projectId: thread.projectId,
        listingId: thread.listingId,
        buyerId: thread.buyerId,
        sellerId: thread.sellerId,
        status: thread.status,
        lastMessageAt: thread.lastMessageAt,
        createdAt: thread.createdAt
      };
      return {
        ...thread_without_context,
        listing,
        project,
        buyerName: buyerFirstName && buyerLastName ? `${buyerFirstName} ${buyerLastName}` : void 0,
        sellerName: sellerFirstName && sellerLastName ? `${sellerFirstName} ${sellerLastName}` : void 0
      };
    });
  }
  async getThreadsBySellerId(sellerId) {
    return await db.select().from(messageThreads).where(eq(messageThreads.sellerId, sellerId)).orderBy(desc(messageThreads.lastMessageAt));
  }
  async updateThreadLastMessage(threadId) {
    await db.update(messageThreads).set({ lastMessageAt: /* @__PURE__ */ new Date() }).where(eq(messageThreads.id, threadId));
  }
  async closeThread(threadId) {
    const [thread] = await db.update(messageThreads).set({ status: "closed" }).where(eq(messageThreads.id, threadId)).returning();
    return thread;
  }
  // ========================================================================
  // Message operations
  // ========================================================================
  async getMessagesByThreadId(threadId) {
    return await db.select().from(messages).where(eq(messages.threadId, threadId)).orderBy(messages.createdAt);
  }
  async createMessage(messageData) {
    try {
      const [message] = await db.insert(messages).values(messageData).returning();
      return message;
    } catch (err) {
      if (err?.cause?.code === "42703" || err?.code === "42703") {
        const minimalPayload = {
          senderId: messageData.senderId,
          receiverId: messageData.receiverId,
          subject: messageData.subject,
          content: messageData.content,
          isAutoRelay: messageData.isAutoRelay ?? false
        };
        const [message] = await db.insert(messages).values(minimalPayload).returning();
        return message;
      }
      throw err;
    }
  }
  async getMessageByIdempotencyKey(key) {
    const [row] = await db.select({ id: messageIdempotency.messageId }).from(messageIdempotency).where(eq(messageIdempotency.key, key)).limit(1);
    if (!row) return void 0;
    const messageId = row.id;
    const [message] = await db.select().from(messages).where(eq(messages.id, messageId)).limit(1);
    return message;
  }
  async createMessageWithIdempotency(key, messageData) {
    if (!key) {
      return await this.createMessage(messageData);
    }
    const existing = await this.getMessageByIdempotencyKey(key);
    if (existing) return existing;
    const message = await this.createMessage(messageData);
    try {
      await db.insert(messageIdempotency).values({
        key,
        messageId: message.id
      });
      return message;
    } catch (err) {
      if (err?.cause?.code === "23505" || err?.code === "23505") {
        const mapped = await this.getMessageByIdempotencyKey(key);
        if (mapped) return mapped;
      }
      throw err;
    }
  }
  async getMessagesByUserId(userId) {
    const threads = await db.select({
      threadId: messageThreads.id
    }).from(messageThreads).where(
      or(
        eq(messageThreads.buyerId, userId),
        eq(messageThreads.sellerId, userId)
      )
    );
    if (threads.length === 0) return [];
    const threadIds = threads.map((t) => t.threadId);
    const results = await db.select({
      // Message fields
      id: messages.id,
      threadId: messages.threadId,
      senderId: messages.senderId,
      receiverId: messages.receiverId,
      subject: messages.subject,
      content: messages.content,
      read: messages.read,
      closed: messages.closed,
      unread: messages.unread,
      isAutoRelay: messages.isAutoRelay,
      createdAt: messages.createdAt,
      // Sender info
      senderFirstName: users.firstName,
      senderLastName: users.lastName,
      // Context info
      listing: marketplaceListings,
      project: projects
    }).from(messages).innerJoin(messageThreads, eq(messages.threadId, messageThreads.id)).leftJoin(users, eq(messages.senderId, users.id)).leftJoin(marketplaceListings, eq(messageThreads.listingId, marketplaceListings.id)).leftJoin(projects, eq(messageThreads.projectId, projects.id)).where(inArray(messages.threadId, threadIds)).orderBy(messages.createdAt);
    return results.map((result) => ({
      id: result.id,
      threadId: result.threadId,
      senderId: result.senderId,
      receiverId: result.receiverId,
      subject: result.subject,
      content: result.content,
      read: result.read,
      closed: result.closed,
      unread: result.unread,
      isAutoRelay: result.isAutoRelay,
      createdAt: result.createdAt,
      relatedProjectId: result.project?.id || null,
      relatedListingId: result.listing?.id || null,
      senderName: result.senderFirstName && result.senderLastName ? `${result.senderFirstName} ${result.senderLastName}` : void 0,
      context: result.listing ? "marketplace" : result.project ? "project_interest" : "general"
    }));
  }
  async getConversation(user1Id, user2Id) {
    return await db.select().from(messages).where(
      or(
        and(
          eq(messages.senderId, user1Id),
          eq(messages.receiverId, user2Id)
        ),
        and(
          eq(messages.senderId, user2Id),
          eq(messages.receiverId, user1Id)
        )
      )
    ).orderBy(messages.createdAt);
  }
  async markMessageAsRead(id) {
    await db.update(messages).set({ read: true, unread: false }).where(eq(messages.id, id));
  }
  // Helper to get a message by id (used by some admin routes)
  async getMessageById(id) {
    const [message] = await db.select().from(messages).where(eq(messages.id, id)).limit(1);
    return message;
  }
  // Return count of unread messages for a given user (receiver)
  async getUnreadMessagesCount(userId) {
    const result = await db.select({ count: sql2`count(*)::int` }).from(messages).where(
      and(
        eq(messages.receiverId, userId),
        eq(messages.unread, true)
      )
    );
    return result[0]?.count || 0;
  }
  async closeConversationByMessageId(messageId) {
    const [main] = await db.select().from(messages).where(eq(messages.id, messageId)).limit(1);
    if (!main) return;
    await db.update(messages).set({ closed: true }).where(
      or(
        and(eq(messages.senderId, main.senderId), eq(messages.receiverId, main.receiverId)),
        and(eq(messages.senderId, main.receiverId), eq(messages.receiverId, main.senderId))
      )
    );
  }
  async checkUserHasContactedAboutProject(userId, projectId) {
    const result = await db.select().from(messages).where(
      and(
        eq(messages.senderId, userId),
        eq(messages.relatedProjectId, projectId)
      )
    ).limit(1);
    return result.length > 0;
  }
  async checkUserHasContactedAboutListing(userId, listingId) {
    const result = await db.select().from(messages).where(
      and(
        eq(messages.senderId, userId),
        eq(messages.relatedListingId, listingId)
      )
    ).limit(1);
    return result.length > 0;
  }
  async getMessageWithSenderDetails(messageId) {
    const result = await db.select({
      message: messages,
      sender: users,
      senderProfile: userProfiles
    }).from(messages).leftJoin(users, eq(messages.senderId, users.id)).leftJoin(userProfiles, eq(users.id, userProfiles.userId)).where(eq(messages.id, messageId)).limit(1);
    if (!result[0]) return null;
    const mainMessage = result[0].message;
    const conversationMessages = await db.select({
      message: messages,
      sender: users,
      senderProfile: userProfiles
    }).from(messages).leftJoin(users, eq(messages.senderId, users.id)).leftJoin(userProfiles, eq(users.id, userProfiles.userId)).where(
      and(
        or(
          and(
            eq(messages.senderId, mainMessage.senderId),
            eq(messages.receiverId, mainMessage.receiverId)
          ),
          and(
            eq(messages.senderId, mainMessage.receiverId),
            eq(messages.receiverId, mainMessage.senderId)
          )
        )
      )
    ).orderBy(desc(messages.createdAt));
    return {
      ...result[0],
      conversation: conversationMessages
    };
  }
  // ========================================================================
  // Blog Post operations
  // ========================================================================
  async createBlogPost(postData) {
    const [post] = await db.insert(blogPosts).values(postData).returning();
    return post;
  }
  async getBlogPosts(publishedOnly = true) {
    let query = db.select().from(blogPosts);
    if (publishedOnly) {
      query = query.where(eq(blogPosts.published, true));
    }
    return await query.orderBy(desc(blogPosts.createdAt));
  }
  async getBlogPostById(id) {
    const [post] = await db.select().from(blogPosts).where(eq(blogPosts.id, id));
    return post;
  }
  async getBlogPostBySlug(slug) {
    const [post] = await db.select().from(blogPosts).where(eq(blogPosts.slug, slug));
    return post;
  }
  async publishBlogPost(id) {
    const [post] = await db.update(blogPosts).set({
      published: true,
      updatedAt: /* @__PURE__ */ new Date()
    }).where(eq(blogPosts.id, id)).returning();
    return post;
  }
  async updateBlogPost(id, postData) {
    const [post] = await db.update(blogPosts).set({
      ...postData,
      updatedAt: /* @__PURE__ */ new Date()
    }).where(eq(blogPosts.id, id)).returning();
    return post;
  }
  async deleteBlogPost(id) {
    await db.delete(blogPosts).where(eq(blogPosts.id, id));
  }
  // ========================================================================
  // Contact Submission operations
  // ========================================================================
  async createContactSubmission(submissionData) {
    const [submission] = await db.insert(contactSubmissions).values(submissionData).returning();
    return submission;
  }
  async getContactSubmissions() {
    return await db.select().from(contactSubmissions).orderBy(desc(contactSubmissions.createdAt));
  }
  async updateContactSubmissionStatus(id, status) {
    const [submission] = await db.update(contactSubmissions).set({ status }).where(eq(contactSubmissions.id, id)).returning();
    return submission;
  }
  // ========================================================================
  // Contact Settings operations
  // ========================================================================
  async getContactSettings() {
    const settings = await db.select().from(contactSettings).limit(1);
    if (settings.length === 0) {
      const [defaultSettings] = await db.insert(contactSettings).values({
        officeAddress: "Fusion Mining Limited\nCentral Business District\nLusaka, Zambia",
        phone: "+260 978 838 939",
        email: "info@fusionmining.com",
        supportEmail: "support@fusionmining.com",
        mondayFriday: "8:00 AM - 5:00 PM",
        saturday: "9:00 AM - 1:00 PM",
        sunday: "Closed"
      }).returning();
      return defaultSettings;
    }
    return settings[0];
  }
  async updateContactSettings(settingsData) {
    const existing = await this.getContactSettings();
    if (!existing) {
      const [newSettings] = await db.insert(contactSettings).values(settingsData).returning();
      return newSettings;
    }
    const [updated] = await db.update(contactSettings).set({
      ...settingsData,
      updatedAt: /* @__PURE__ */ new Date()
    }).where(eq(contactSettings.id, existing.id)).returning();
    return updated;
  }
  // ========================================================================
  // Verification Queue operations
  // ========================================================================
  async getPendingListings() {
    return await db.select().from(marketplaceListings).where(eq(marketplaceListings.status, "pending")).orderBy(desc(marketplaceListings.createdAt));
  }
  async rejectListing(listingId, reviewerId) {
    await db.update(marketplaceListings).set({
      status: "rejected",
      updatedAt: /* @__PURE__ */ new Date()
    }).where(eq(marketplaceListings.id, listingId));
    await db.update(verificationQueue).set({
      reviewedAt: /* @__PURE__ */ new Date(),
      reviewedBy: reviewerId
    }).where(eq(verificationQueue.listingId, listingId));
  }
  // ========================================================================
  // Activity Log operations
  // ========================================================================
  async createActivityLog(logData) {
    const [log] = await db.insert(activityLogs).values(logData).returning();
    return log;
  }
  async getActivityLogs(limit = 100) {
    return await db.select().from(activityLogs).orderBy(desc(activityLogs.createdAt)).limit(limit);
  }
  async getUserActivityLogs(userId, limit = 50) {
    return await db.select().from(activityLogs).where(eq(activityLogs.userId, userId)).orderBy(desc(activityLogs.createdAt)).limit(limit);
  }
  // ========================================================================
  // Notification operations
  // ========================================================================
  async createNotification(notificationData) {
    const [notification] = await db.insert(notifications).values(notificationData).returning();
    return notification;
  }
  async getUserNotifications(userId) {
    return await db.select().from(notifications).where(eq(notifications.userId, userId)).orderBy(desc(notifications.createdAt)).limit(50);
  }
  async getUnreadNotificationCount(userId) {
    const result = await db.select({ count: sql2`count(*)::int` }).from(notifications).where(
      and(
        eq(notifications.userId, userId),
        eq(notifications.read, false)
      )
    );
    return result[0]?.count || 0;
  }
  async markNotificationAsRead(id) {
    await db.update(notifications).set({ read: true }).where(eq(notifications.id, id));
  }
  async markAllNotificationsAsRead(userId) {
    await db.update(notifications).set({ read: true }).where(eq(notifications.userId, userId));
  }
  // ========================================================================
  // Stats operations for dashboard
  // ========================================================================
  async getUserListingsCount(userId) {
    const result = await db.select({ count: sql2`count(*)::int` }).from(marketplaceListings).where(eq(marketplaceListings.sellerId, userId));
    return result[0]?.count || 0;
  }
  async getUserUnreadMessagesCount(userId) {
    const threads = await db.select({ id: messageThreads.id }).from(messageThreads).where(
      or(
        eq(messageThreads.buyerId, userId),
        eq(messageThreads.sellerId, userId)
      )
    );
    if (threads.length === 0) return 0;
    const threadIds = threads.map((t) => t.id);
    const result = await db.select({ count: sql2`count(*)::int` }).from(messages).where(
      and(
        inArray(messages.threadId, threadIds),
        eq(messages.receiverId, userId),
        eq(messages.read, false)
      )
    );
    return result[0]?.count || 0;
  }
  async getUserInterestsCount(userId) {
    const result = await db.select({ count: sql2`count(*)::int` }).from(expressInterest).where(eq(expressInterest.userId, userId));
    return result[0]?.count || 0;
  }
  async checkUserHasExpressedInterest(userId, projectId) {
    const [interest] = await db.select().from(expressInterest).where(
      and(
        eq(expressInterest.userId, userId),
        eq(expressInterest.projectId, projectId)
      )
    ).limit(1);
    return !!interest;
  }
  // ========================================================================
  // Video operations
  // ========================================================================
  async createVideo(videoData) {
    const activeVideosCount = await db.select({ count: sql2`count(*)::int` }).from(videos).where(eq(videos.active, true));
    const count = activeVideosCount[0]?.count || 0;
    const shouldActivate = count < 4 && videoData.active !== false;
    const [video] = await db.insert(videos).values({ ...videoData, active: shouldActivate }).returning();
    return video;
  }
  async getActiveVideos() {
    return await db.select().from(videos).where(eq(videos.active, true)).orderBy(desc(videos.createdAt)).limit(4);
  }
  async getAllVideos() {
    return await db.select().from(videos).orderBy(desc(videos.createdAt));
  }
  async updateVideo(videoData) {
    const [video] = await db.update(videos).set(videoData).where(eq(videos.id, videoData.id)).returning();
    return video;
  }
  async toggleVideoActive(id) {
    const [currentVideo] = await db.select().from(videos).where(eq(videos.id, id)).limit(1);
    if (!currentVideo) {
      throw new Error("Video not found");
    }
    if (!currentVideo.active) {
      const activeVideosCount = await db.select({ count: sql2`count(*)::int` }).from(videos).where(eq(videos.active, true));
      const count = activeVideosCount[0]?.count || 0;
      if (count >= 4) {
        throw new Error("Maximum of 4 active videos allowed");
      }
    }
    const [video] = await db.update(videos).set({ active: !currentVideo.active }).where(eq(videos.id, id)).returning();
    return video;
  }
  async deleteVideo(id) {
    await db.delete(videos).where(eq(videos.id, id));
  }
  // ========================================================================
  // Message Template operations
  // ========================================================================
  async createMessageTemplate(templateData) {
    const [template] = await db.insert(messageTemplates).values(templateData).returning();
    return template;
  }
  async getMessageTemplates(activeOnly = false) {
    if (activeOnly) {
      return await db.select().from(messageTemplates).where(eq(messageTemplates.active, true)).orderBy(messageTemplates.type);
    }
    return await db.select().from(messageTemplates).orderBy(messageTemplates.type);
  }
  async getMessageTemplateByType(type) {
    const [template] = await db.select().from(messageTemplates).where(and(
      eq(messageTemplates.type, type),
      eq(messageTemplates.active, true)
    )).limit(1);
    return template;
  }
};
var storage = new DatabaseStorage();

// server/localAuth.ts
import passport from "passport";
function setupAuth(app2) {
  app2.use(passport.initialize());
  app2.use(passport.session());
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  passport.deserializeUser(async (id, done) => {
    const testUsers = {
      "test-admin-123": { id: "test-admin-123", username: "admin", role: "admin", email: "admin@fusionmining.com", firstName: "Admin", lastName: "User" },
      "test-buyer-789": { id: "test-buyer-789", username: "henry", role: "buyer", email: "henry@fusionmining.com", firstName: "Henry", lastName: "Pass" },
      "test-seller-456": { id: "test-seller-456", username: "ray", role: "seller", email: "ray@fusionmining.com", firstName: "Ray", lastName: "Pass" }
    };
    if (testUsers[id]) {
      return done(null, testUsers[id]);
    }
    try {
      const user = await storage.getUser(id);
      return done(null, user);
    } catch (error) {
      return done(null, false);
    }
  });
}
var isAuthenticated = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  next();
};
var isAdmin = (req, res, next) => {
  if (!req.isAuthenticated() || req.user.role !== "admin") {
    return res.status(403).json({ message: "Forbidden" });
  }
  next();
};
var isSeller = (req, res, next) => {
  if (!req.isAuthenticated() || req.user.role !== "seller") {
    return res.status(403).json({ message: "Forbidden" });
  }
  next();
};
function requireAdminPermission(permissionKey) {
  return async (req, res, next) => {
    try {
      if (!req.isAuthenticated() || req.user.role !== "admin") {
        return res.status(403).json({ message: "Forbidden" });
      }
      const perms = await storage.getAdminPermissions(req.user.id);
      if (!perms) {
        return next();
      }
      if (!perms[permissionKey]) {
        return res.status(403).json({ message: "Insufficient permissions" });
      }
      next();
    } catch (err) {
      return res.status(500).json({ message: "Permission check failed" });
    }
  };
}

// server/routes.ts
import { ZodError } from "zod";
function formatZodError(error) {
  return error.errors.map((err) => `${err.path.join(".")}: ${err.message}`).join(", ");
}
async function registerRoutes(app2) {
  app2.get("/api/health", (req, res) => {
    res.json({
      status: "ok",
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      environment: process.env.NODE_ENV || "development"
    });
  });
  await setupAuth(app2);
  app2.post("/api/login", async (req, res) => {
    const { username, password } = req.body;
    console.warn("\u26A0\uFE0F  WARNING: Using demo login endpoint - NOT FOR PRODUCTION USE");
    const users2 = {
      admin: { id: "test-admin-123", username: "admin", password: "admin123", role: "admin", email: "admin@fusionmining.com", firstName: "Admin", lastName: "User" },
      henry: { id: "test-buyer-789", username: "henry", password: "henry123", role: "buyer", email: "henry@fusionmining.com", firstName: "Henry", lastName: "Pass" },
      ray: { id: "test-seller-456", username: "ray", password: "ray123", role: "seller", email: "ray@fusionmining.com", firstName: "Ray", lastName: "Pass" }
    };
    const user = Object.values(users2).find((u) => u.username === username && u.password === password);
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    console.log("[DEMO LOGIN] before login, sessionID=", req.sessionID, "isAuthenticated=", req.isAuthenticated && req.isAuthenticated());
    req.login(user, (err) => {
      if (err) {
        console.error("[DEMO LOGIN] login error", err);
        return res.status(500).json({ message: "Login failed" });
      }
      try {
        console.log("[DEMO LOGIN] after login, sessionID=", req.sessionID, "isAuthenticated=", req.isAuthenticated && req.isAuthenticated(), "req.user=", req.user?.id);
      } catch (e) {
      }
      res.json({ success: true, user });
    });
  });
  if (process.env.NODE_ENV === "development") {
    app2.post("/api/test-login", async (req, res) => {
      const { userId } = req.body;
      if (!userId) {
        return res.status(400).json({ message: "userId is required" });
      }
      try {
        let user = await storage.getUser(userId);
        if (!user) {
          const testUsers = {
            "test-admin-123": { email: "admin@fusionmining.com", firstName: "Admin", lastName: "User", role: "admin" },
            "test-seller-456": { email: "ray@fusionmining.com", firstName: "Ray", lastName: "Pass", role: "seller" },
            "test-buyer-789": { email: "henry@fusionmining.com", firstName: "Henry", lastName: "Pass", role: "buyer" }
          };
          const testUserData = testUsers[userId];
          if (testUserData) {
            user = await storage.upsertUser({
              id: userId,
              email: testUserData.email,
              firstName: testUserData.firstName,
              lastName: testUserData.lastName
            });
            await storage.updateUserRole(userId, testUserData.role);
            user = await storage.getUser(userId);
          }
        }
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }
        console.log("[DEV] /api/test-login - before login, sessionID=", req.sessionID, "isAuthenticated=", req.isAuthenticated && req.isAuthenticated());
        req.login(user, (err) => {
          if (err) {
            console.error("[DEV] /api/test-login - Login error:", err);
            return res.status(500).json({ message: "Failed to login" });
          }
          console.log("[DEV] /api/test-login - after login, sessionID=", req.sessionID, "isAuthenticated=", req.isAuthenticated && req.isAuthenticated(), "req.user=", req.user?.id);
          res.json({
            message: "Test login successful",
            user
          });
        });
      } catch (error) {
        console.error("Error during test login:", error);
        res.status(500).json({ message: "Failed to login" });
      }
    });
    app2.post("/api/messages/mark-read", isAuthenticated, async (req, res) => {
      try {
        const userId = req.user.claims?.sub || req.user.id;
        const { messageIds } = req.body;
        if (!Array.isArray(messageIds)) {
          return res.status(400).json({ message: "messageIds must be an array" });
        }
        for (const messageId of messageIds) {
          const message = await storage.getMessageById(messageId);
          if (message && message.receiverId === userId) {
            await storage.markMessageAsRead(messageId);
          }
        }
        res.json({ success: true });
      } catch (error) {
        console.error("Error marking messages as read:", error);
        res.status(500).json({ message: "Failed to mark messages as read" });
      }
    });
    app2.post("/api/logout", (req, res) => {
      req.logout(() => {
        res.json({ message: "Logout successful" });
      });
    });
    app2.post("/api/test-logout", (req, res) => {
      req.logout(() => {
        res.json({ message: "Test logout successful" });
      });
    });
    app2.get("/api/auth/user", async (req, res) => {
      console.log("[DEV] /api/auth/user - sessionID=", req.sessionID, "isAuthenticated=", req.isAuthenticated && req.isAuthenticated(), "req.user=", req.user?.id);
      if (!req.isAuthenticated()) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      try {
        if (req.user && req.user.id && req.user.id.startsWith("test-")) {
          return res.json(req.user);
        }
        const user = await storage.getUser(req.user.id);
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }
        res.json(user);
      } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({ message: "Failed to fetch user" });
      }
    });
    app2.get("/api/test-accounts", async (req, res) => {
      try {
        const testAccounts = [
          { id: "test-admin-123", email: "admin@fusionmining.com", role: "admin", name: "Admin User" },
          { id: "test-seller-456", email: "ray@fusionmining.com", role: "seller", name: "Ray Pass" },
          { id: "test-buyer-789", email: "henry@fusionmining.com", role: "buyer", name: "Henry Pass" }
        ];
        res.json(testAccounts);
      } catch (error) {
        console.error("Error fetching test accounts:", error);
        res.status(500).json({ message: "Failed to fetch test accounts" });
      }
    });
    app2.get("/api/contact-settings", async (req, res) => {
      try {
        const settings = await storage.getContactSettings();
        if (!settings) {
          return res.status(404).json({ message: "Contact settings not found" });
        }
        res.json(settings);
      } catch (error) {
        console.error("Error fetching contact settings:", error);
        res.status(500).json({ message: "Failed to fetch contact settings" });
      }
    });
    app2.get("/api/admin/contact-user", async (req, res) => {
      try {
        const adminUser = await storage.getAdminUser();
        if (!adminUser) {
          return res.status(404).json({ message: "Admin user not found" });
        }
        res.json({
          id: adminUser.id,
          email: adminUser.email,
          firstName: adminUser.firstName,
          lastName: adminUser.lastName,
          name: `${adminUser.firstName || ""} ${adminUser.lastName || ""}`.trim()
        });
      } catch (error) {
        console.error("Error fetching admin contact user:", error);
        res.status(500).json({ message: "Failed to fetch admin contact" });
      }
    });
    if (process.env.NODE_ENV === "development") {
      app2.post("/api/contact-settings", async (req, res) => {
        try {
          const payload = req.body || {};
          const updated = await storage.updateContactSettings(payload);
          res.json(updated);
        } catch (error) {
          console.error("Error updating contact settings:", error);
          res.status(500).json({ message: "Failed to update contact settings" });
        }
      });
    }
    app2.post("/api/seed-data", async (req, res) => {
      try {
        const testUsers = [
          {
            id: "test-admin-123",
            email: "admin@fusionmining.com",
            firstName: "Admin",
            lastName: "User",
            role: "admin"
          },
          {
            id: "test-seller-456",
            email: "ray@fusionmining.com",
            firstName: "Ray",
            lastName: "Pass",
            role: "seller"
          },
          {
            id: "test-buyer-789",
            email: "henry@fusionmining.com",
            firstName: "Henry",
            lastName: "Pass",
            role: "buyer"
          }
        ];
        for (const userData of testUsers) {
          try {
            let user = await storage.getUser(userData.id);
            if (!user) {
              user = await storage.upsertUser({
                id: userData.id,
                email: userData.email,
                firstName: userData.firstName,
                lastName: userData.lastName
              });
              await storage.updateUserRole(userData.id, userData.role);
            }
          } catch (error) {
            console.error(`Error creating user ${userData.id}:`, error);
          }
        }
        const projectsData = [
          {
            name: "Konkola Copper Mine",
            description: "Large-scale copper mining operation in the Copperbelt Province. Excellent infrastructure and proven reserves of high-grade copper ore.",
            licenseType: "mining",
            minerals: ["Copper", "Cobalt"],
            location: "Copperbelt",
            latitude: "-12.4178",
            longitude: "27.4178",
            status: "active",
            area: "1,200 hectares",
            estimatedValue: "$500M - $1B"
          },
          {
            name: "Kagem Emerald Mine",
            description: "World's largest emerald mine producing premium quality gemstones. Partnership opportunities available for exploration expansion.",
            licenseType: "mining",
            minerals: ["Emerald"],
            location: "Copperbelt",
            latitude: "-13.0000",
            longitude: "28.0000",
            status: "active",
            area: "41 square kilometers",
            estimatedValue: "$100M - $300M"
          },
          {
            name: "Mwinilunga Gold Exploration",
            description: "New gold exploration license in promising geological formation. Seeking investment partners for initial drilling and sampling.",
            licenseType: "exploration",
            minerals: ["Gold"],
            location: "Northern Province",
            latitude: "-11.7358",
            longitude: "24.4289",
            status: "active",
            area: "500 hectares",
            estimatedValue: "$50M - $150M"
          },
          {
            name: "Luapula Cobalt Processing",
            description: "Strategic cobalt processing facility with modern infrastructure. Perfect for battery-grade cobalt production.",
            licenseType: "processing",
            minerals: ["Cobalt"],
            location: "Luapula Province",
            latitude: "-11.6667",
            longitude: "28.7167",
            status: "active",
            area: "200 hectares",
            estimatedValue: "$200M - $400M"
          },
          {
            name: "Central Province Gold Fields",
            description: "Multiple gold-bearing sites across Central Province. Excellent potential for small to medium scale operations.",
            licenseType: "exploration",
            minerals: ["Gold", "Silver"],
            location: "Central Province",
            latitude: "-14.4333",
            longitude: "28.2833",
            status: "pending",
            area: "800 hectares",
            estimatedValue: "$75M - $200M"
          },
          {
            name: "Kabwe Lead and Zinc Mine",
            description: "Historic mining site with significant lead and zinc deposits. Environmental remediation completed, ready for modern extraction methods.",
            licenseType: "mining",
            minerals: ["Lead", "Zinc", "Silver"],
            location: "Central Province",
            latitude: "-14.4469",
            longitude: "28.4469",
            status: "active",
            area: "950 hectares",
            estimatedValue: "$120M - $250M"
          },
          {
            name: "Mufulira Copper Expansion",
            description: "Expansion opportunity for established copper mining operations. Includes access to processing facilities and skilled workforce.",
            licenseType: "mining",
            minerals: ["Copper"],
            location: "Copperbelt",
            latitude: "-12.5500",
            longitude: "28.2667",
            status: "active",
            area: "1,500 hectares",
            estimatedValue: "$400M - $800M"
          },
          {
            name: "Solwezi Copper-Gold Project",
            description: "Combined copper and gold mining project in Northwestern Province. High-grade ore bodies with excellent exploration potential.",
            licenseType: "exploration",
            minerals: ["Copper", "Gold"],
            location: "Northwestern Province",
            latitude: "-12.1833",
            longitude: "26.3833",
            status: "active",
            area: "2,000 hectares",
            estimatedValue: "$300M - $600M"
          },
          {
            name: "Copperbelt Manganese Processing",
            description: "Modern manganese processing facility with export capabilities. Strategic location near major transport routes.",
            licenseType: "processing",
            minerals: ["Manganese"],
            location: "Copperbelt",
            latitude: "-12.8000",
            longitude: "28.2000",
            status: "active",
            area: "150 hectares",
            estimatedValue: "$80M - $150M"
          },
          {
            name: "Kafue Amethyst Mine",
            description: "High-quality amethyst deposits suitable for jewelry and collectors market. Eco-friendly mining practices in place.",
            licenseType: "mining",
            minerals: ["Amethyst", "Quartz"],
            location: "Southern Province",
            latitude: "-15.7667",
            longitude: "28.1833",
            status: "active",
            area: "300 hectares",
            estimatedValue: "$25M - $60M"
          }
        ];
        for (const project of projectsData) {
          try {
            await storage.createProject(project);
          } catch (error) {
          }
        }
        const listingsData = [
          {
            sellerId: "test-seller-456",
            type: "mineral",
            title: "High-Grade Copper Ore - 5000 Tonnes",
            description: "Premium quality copper ore from our Copperbelt operations. Consistent grade, ready for immediate shipment. Full documentation and certificates available.",
            mineralType: "Copper",
            grade: "25% Cu content",
            location: "Kitwe, Copperbelt",
            quantity: "5,000 tonnes",
            price: "$4,500/tonne",
            status: "approved"
          },
          {
            sellerId: "test-seller-456",
            type: "mineral",
            title: "Premium Zambian Emeralds - Investment Grade",
            description: "Exceptional quality emeralds suitable for jewelry and investment. Sourced from certified mines with full traceability.",
            mineralType: "Emerald",
            grade: "AAA Grade",
            location: "Ndola, Copperbelt",
            quantity: "500 carats",
            price: "$8,000/carat",
            status: "approved"
          },
          {
            sellerId: "test-seller-456",
            type: "mineral",
            title: "Battery-Grade Cobalt Hydroxide",
            description: "High-purity cobalt hydroxide perfect for battery manufacturing. Meets all international standards and certifications.",
            mineralType: "Cobalt",
            grade: "20% Co min",
            location: "Copperbelt",
            quantity: "2,000 tonnes",
            price: "$35,000/tonne",
            status: "approved"
          },
          {
            sellerId: "test-seller-456",
            type: "mineral",
            title: "Gold Ore Concentrate",
            description: "Gold concentrate from Northern Province operations. Ready for refining with excellent recovery rates.",
            mineralType: "Gold",
            grade: "45 g/t Au",
            location: "Northern Province",
            quantity: "100 tonnes",
            price: "$1,200/tonne",
            status: "pending"
          },
          {
            sellerId: "test-seller-456",
            type: "partnership",
            title: "Joint Venture - Copper Mine Expansion",
            description: "Seeking strategic partner for expanding existing copper mining operations. Proven reserves, established infrastructure, and experienced team in place.",
            location: "Copperbelt",
            status: "approved"
          },
          {
            sellerId: "test-seller-456",
            type: "partnership",
            title: "Emerald Processing Facility Partnership",
            description: "Looking for technology and investment partner to establish state-of-the-art emerald cutting and processing facility in Zambia.",
            location: "Lusaka",
            status: "approved"
          }
        ];
        for (const listing of listingsData) {
          try {
            await storage.createMarketplaceListing(listing);
          } catch (error) {
          }
        }
        const requestsData = [
          {
            buyerId: "test-buyer-789",
            title: "Seeking Regular Copper Ore Supply",
            description: "International buyer seeking long-term copper ore supplier. Looking for 10,000+ tonnes monthly with consistent quality. Will provide advance payment for reliable suppliers.",
            mineralType: "Copper",
            quantity: "10,000 tonnes/month",
            budget: "$40-45M annually",
            location: "Any major mining region",
            status: "active"
          },
          {
            buyerId: "test-buyer-789",
            title: "High-Quality Emerald Procurement",
            description: "Luxury jewelry company seeks premium grade emeralds. Looking for certified stones with excellent clarity and color. Long-term partnership preferred.",
            mineralType: "Emerald",
            quantity: "1,000+ carats quarterly",
            budget: "$5-10M per quarter",
            location: "Copperbelt preferred",
            status: "active"
          },
          {
            buyerId: "test-buyer-789",
            title: "Cobalt for Battery Manufacturing",
            description: "Battery manufacturer requires sustainable cobalt supply chain. Looking for ethically sourced, battery-grade cobalt with full traceability.",
            mineralType: "Cobalt",
            quantity: "5,000 tonnes annually",
            budget: "$150-200M annually",
            location: "Any region with export capability",
            status: "active"
          }
        ];
        for (const request of requestsData) {
          try {
            await storage.createBuyerRequest(request);
          } catch (error) {
          }
        }
        const blogPostsData = [
          {
            authorId: "test-admin-123",
            title: "Zambia's Mining Sector: A Bright Future Ahead",
            slug: "zambia-mining-sector-bright-future",
            excerpt: "Exploring the opportunities and growth potential in Zambia's thriving mining industry.",
            content: `<p>Zambia's mining sector continues to show remarkable growth, driven by increasing global demand for copper, cobalt, and precious stones. The country's strategic location and stable political environment make it an attractive destination for mining investments.</p>
            
            <h2>Key Growth Drivers</h2>
            <p>Several factors are contributing to the sector's expansion:</p>
            <ul>
              <li>Growing demand for battery minerals, particularly cobalt</li>
              <li>Infrastructure improvements in mining regions</li>
              <li>Government support for sustainable mining practices</li>
              <li>Increased international investment partnerships</li>
            </ul>
            
            <h2>Investment Opportunities</h2>
            <p>For investors looking to enter the Zambian mining market, there are numerous opportunities across exploration, mining, and processing operations. The Fusion Mining Limited platform connects investors with verified projects and partnerships.</p>`,
            imageUrl: "",
            category: "Industry News",
            published: true
          },
          {
            authorId: "test-admin-123",
            title: "Sustainable Mining Practices in Zambia",
            slug: "sustainable-mining-practices-zambia",
            excerpt: "How Zambian mining companies are embracing environmental responsibility and community development.",
            content: `<p>Environmental sustainability has become a cornerstone of modern mining operations in Zambia. Companies are increasingly adopting practices that minimize environmental impact while maximizing community benefits.</p>
            
            <h2>Environmental Initiatives</h2>
            <p>Leading mining operations in Zambia are implementing:</p>
            <ul>
              <li>Water recycling and conservation programs</li>
              <li>Renewable energy integration in mining operations</li>
              <li>Land rehabilitation and reforestation projects</li>
              <li>Wildlife corridor preservation</li>
            </ul>
            
            <h2>Community Development</h2>
            <p>Mining companies are partnering with local communities to provide education, healthcare, and economic opportunities, creating shared value for all stakeholders.</p>`,
            imageUrl: "",
            category: "Sustainability",
            published: true
          },
          {
            authorId: "test-admin-123",
            title: "Copper Market Outlook 2025",
            slug: "copper-market-outlook-2025",
            excerpt: "Analysis of global copper demand trends and implications for Zambian producers.",
            content: `<p>The global copper market is experiencing a significant transformation, driven by the green energy transition and electric vehicle revolution. Zambia, as Africa's second-largest copper producer, is well-positioned to benefit from these trends.</p>
            
            <h2>Market Dynamics</h2>
            <p>Key trends shaping the copper market include:</p>
            <ul>
              <li>Surging demand from EV manufacturing sector</li>
              <li>Renewable energy infrastructure expansion</li>
              <li>Supply constraints in major producing regions</li>
              <li>Rising copper prices benefiting producers</li>
            </ul>
            
            <h2>Zambia's Advantage</h2>
            <p>With established infrastructure, skilled workforce, and abundant reserves, Zambian copper producers are capitalizing on favorable market conditions.</p>`,
            imageUrl: "",
            category: "Market Analysis",
            published: true
          },
          {
            authorId: "test-admin-123",
            title: "Emerald Mining: Zambia's Hidden Gem",
            slug: "emerald-mining-zambia-hidden-gem",
            excerpt: "Discover why Zambian emeralds are among the finest in the world and the opportunities in this sector.",
            content: `<p>Zambia produces some of the world's finest emeralds, with the Kagem Mine being the largest single emerald mine globally. These precious stones are prized for their exceptional clarity and rich green color.</p>
            
            <h2>Quality and Value</h2>
            <p>Zambian emeralds are distinguished by:</p>
            <ul>
              <li>Superior clarity and color saturation</li>
              <li>Excellent size and quality consistency</li>
              <li>Ethical sourcing and full traceability</li>
              <li>Growing market recognition and premium pricing</li>
            </ul>
            
            <h2>Investment Potential</h2>
            <p>The emerald sector offers unique opportunities for investors, from mining operations to processing and jewelry manufacturing partnerships.</p>`,
            imageUrl: "",
            category: "Industry News",
            published: true
          },
          {
            authorId: "test-admin-123",
            title: "Technology Revolution in African Mining",
            slug: "technology-revolution-african-mining",
            excerpt: "How digital transformation and innovation are reshaping mining operations across the continent.",
            content: `<p>African mining operations are embracing cutting-edge technologies to improve efficiency, safety, and sustainability. From autonomous vehicles to AI-powered exploration, the industry is undergoing a digital transformation.</p>
            
            <h2>Key Technologies</h2>
            <p>Innovations being adopted include:</p>
            <ul>
              <li>Drone surveying and mapping technologies</li>
              <li>IoT sensors for real-time monitoring</li>
              <li>AI and machine learning for resource optimization</li>
              <li>Blockchain for supply chain transparency</li>
            </ul>
            
            <h2>Benefits for Zambia</h2>
            <p>These technological advances are helping Zambian miners increase productivity while reducing environmental footprint and improving worker safety.</p>`,
            imageUrl: "",
            category: "Mining Tips",
            published: true
          },
          {
            authorId: "test-admin-123",
            title: "Understanding Mining Licenses in Zambia",
            slug: "understanding-mining-licenses-zambia",
            excerpt: "A comprehensive guide to navigating the mining licensing process in Zambia.",
            content: `<p>Understanding the licensing framework is crucial for anyone looking to invest in Zambian mining. This guide covers the different types of licenses and the application process.</p>
            
            <h2>License Types</h2>
            <p>Zambia offers several mining license categories:</p>
            <ul>
              <li><strong>Exploration License:</strong> For initial prospecting and exploration activities</li>
              <li><strong>Mining License:</strong> For commercial mining operations</li>
              <li><strong>Processing License:</strong> For mineral processing facilities</li>
            </ul>
            
            <h2>Application Process</h2>
            <p>The licensing process involves geological surveys, environmental impact assessments, and community consultations. Working with experienced local partners can streamline the application process.</p>`,
            imageUrl: "",
            category: "Mining Tips",
            published: true
          }
        ];
        for (const post of blogPostsData) {
          try {
            await storage.createBlogPost(post);
          } catch (error) {
          }
        }
        res.json({
          message: "Sample data seeded successfully",
          details: {
            projects: projectsData.length,
            marketplaceListings: listingsData.length,
            buyerRequests: requestsData.length,
            blogPosts: blogPostsData.length
          }
        });
      } catch (error) {
        console.error("Error seeding data:", error);
        res.status(500).json({ message: "Failed to seed data" });
      }
    });
    app2.post("/api/seed-message-templates", async (req, res) => {
      try {
        const templates = [
          {
            name: "Buyer Interest Confirmation",
            type: "buyer_interest_to_buyer",
            subject: "Thank you for your interest in {project_name}",
            content: "Hello {buyer_name},\n\nThank you for expressing interest in {project_name}. Our admin team has been notified and will review your request shortly. We will get back to you with more information soon.\n\nBest regards,\nFusion Mining Limited",
            active: true
          },
          {
            name: "Admin Interest Notification",
            type: "buyer_interest_to_admin",
            subject: "New buyer interest in {project_name}",
            content: "A new buyer ({buyer_name}) has expressed interest in {project_name}. Please review and respond accordingly.\n\nYou can view the details in your admin panel.",
            active: true
          },
          {
            name: "Seller Interest Notification",
            type: "buyer_interest_to_seller",
            subject: "New buyer interest in {listing_title}",
            content: "Good news! A buyer ({buyer_name}) has expressed interest in your listing: {listing_title}.\n\nThe admin team will coordinate with them and keep you informed about the next steps.\n\nBest regards,\nFusion Mining Limited",
            active: true
          }
        ];
        for (const template of templates) {
          await storage.createMessageTemplate(template);
        }
        res.json({
          message: "Message templates seeded successfully",
          count: templates.length
        });
      } catch (error) {
        console.error("Error seeding templates:", error);
        res.status(500).json({ message: "Failed to seed message templates" });
      }
    });
  }
  app2.get("/api/auth/user", isAuthenticated, async (req, res) => {
    try {
      const userId = req.user.claims?.sub || req.user.id;
      const user = await storage.getUser(userId);
      if (!user) return res.status(404).json({ message: "User not found" });
      let adminPerms = void 0;
      if (user.role === "admin") {
        adminPerms = await storage.getAdminPermissions(user.id);
      }
      res.json({ ...user, adminPermissions: adminPerms || null });
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });
  app2.get("/api/admin/users/:id/permissions", isAuthenticated, isAdmin, requireAdminPermission("canManageUsers"), async (req, res) => {
    try {
      const perms = await storage.getAdminPermissions(req.params.id);
      res.json(perms || null);
    } catch (error) {
      console.error("Error fetching admin permissions:", error);
      res.status(500).json({ message: "Failed to fetch admin permissions" });
    }
  });
  app2.patch("/api/admin/users/:id/permissions", isAuthenticated, isAdmin, requireAdminPermission("canManageUsers"), async (req, res) => {
    try {
      const adminUserId = req.params.id;
      const payload = {
        adminUserId,
        canManageUsers: req.body?.canManageUsers,
        canManageListings: req.body?.canManageListings,
        canManageProjects: req.body?.canManageProjects,
        canManageBlog: req.body?.canManageBlog,
        canViewAnalytics: req.body?.canViewAnalytics,
        canManageMessages: req.body?.canManageMessages
      };
      const updated = await storage.upsertAdminPermissions(payload);
      res.json(updated);
    } catch (error) {
      console.error("Error updating admin permissions:", error);
      res.status(500).json({ message: "Failed to update admin permissions" });
    }
  });
  app2.post("/api/admin/messages/start", isAuthenticated, isAdmin, requireAdminPermission("canManageMessages"), async (req, res) => {
    try {
      const adminId = req.user.claims?.sub || req.user.id;
      const { receiverId, subject, content } = req.body || {};
      if (!receiverId || !content) {
        return res.status(400).json({ message: "receiverId and content are required" });
      }
      const thread = await storage.createMessageThread({
        title: subject || "Admin message",
        type: "general",
        buyerId: null,
        sellerId: null,
        adminId,
        createdBy: adminId,
        context: "general",
        status: "open"
      });
      const message = await storage.createMessage({
        threadId: thread.id,
        senderId: adminId,
        receiverId,
        subject: subject || null,
        content,
        context: "general",
        isAutoRelay: false
      });
      await storage.updateThreadLastMessage(thread.id);
      res.json({ thread, message });
    } catch (error) {
      console.error("Error starting admin conversation:", error);
      res.status(500).json({ message: "Failed to start conversation" });
    }
  });
  app2.post("/api/admin/threads/start", isAuthenticated, isAdmin, requireAdminPermission("canManageMessages"), async (req, res) => {
    try {
      const adminId = req.user.claims?.sub || req.user.id;
      const { receiverId, subject, content, listingId, projectId } = req.body || {};
      if (!receiverId || !content || !listingId && !projectId) {
        return res.status(400).json({ message: "receiverId, content and listingId/projectId are required" });
      }
      const thread = await storage.createMessageThread({
        title: subject || "Admin message",
        type: listingId ? "admin_to_seller" : projectId ? "admin_to_buyer" : "general",
        projectId: projectId || null,
        listingId: listingId || null,
        buyerId: projectId ? receiverId : null,
        sellerId: listingId ? receiverId : null,
        adminId,
        createdBy: adminId,
        context: listingId ? "marketplace" : projectId ? "project_interest" : "general",
        status: "open"
      });
      const message = await storage.createMessage({
        threadId: thread.id,
        senderId: adminId,
        receiverId,
        subject: subject || null,
        content,
        relatedProjectId: projectId || null,
        relatedListingId: listingId || null,
        context: listingId ? "marketplace" : projectId ? "project_interest" : "general",
        isAutoRelay: false
      });
      await storage.updateThreadLastMessage(thread.id);
      res.json({ thread, message });
    } catch (error) {
      console.error("Error starting context thread:", error);
      res.status(500).json({ message: "Failed to start thread" });
    }
  });
  app2.get("/api/profile", isAuthenticated, async (req, res) => {
    try {
      const userId = req.user.claims?.sub || req.user.id;
      const profile = await storage.getUserProfile(userId);
      res.json(profile);
    } catch (error) {
      console.error("Error fetching profile:", error);
      res.status(500).json({ message: "Failed to fetch profile" });
    }
  });
  app2.post("/api/profile", isAuthenticated, async (req, res) => {
    try {
      const userId = req.user.claims?.sub || req.user.id;
      const validatedData = insertUserProfileSchema.parse({
        ...req.body,
        userId
      });
      const profile = await storage.createUserProfile(validatedData);
      res.json(profile);
    } catch (error) {
      if (error instanceof ZodError) {
        console.error("Validation error creating profile:", formatZodError(error));
        return res.status(400).json({ message: formatZodError(error) });
      }
      console.error("Error creating profile:", error);
      res.status(500).json({ message: "Failed to create profile" });
    }
  });
  app2.patch("/api/profile", isAuthenticated, async (req, res) => {
    try {
      const userId = req.user.claims?.sub || req.user.id;
      const validatedData = updateUserProfileSchema.parse({
        ...req.body,
        userId
      });
      const profile = await storage.updateUserProfile(validatedData);
      res.json(profile);
    } catch (error) {
      if (error instanceof ZodError) {
        console.error("Validation error updating profile:", formatZodError(error));
        return res.status(400).json({ message: formatZodError(error) });
      }
      console.error("Error updating profile:", error);
      res.status(500).json({ message: "Failed to update profile" });
    }
  });
  app2.get("/api/projects", async (req, res) => {
    try {
      const projects2 = await storage.getProjects();
      const isAdmin2 = req.user && req.user.role === "admin";
      const filteredProjects = isAdmin2 ? projects2 : projects2.filter((p) => p.status === "active");
      res.json(filteredProjects);
    } catch (error) {
      console.error("Error fetching projects:", error);
      res.status(500).json({ message: "Failed to fetch projects" });
    }
  });
  app2.get("/api/projects/:id", async (req, res) => {
    try {
      const project = await storage.getProjectById(req.params.id);
      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }
      res.json(project);
    } catch (error) {
      console.error("Error fetching project:", error);
      res.status(500).json({ message: "Failed to fetch project" });
    }
  });
  app2.post("/api/projects", isAuthenticated, async (req, res) => {
    try {
      const validatedData = insertProjectSchema.parse(req.body);
      const project = await storage.createProject(validatedData);
      res.json(project);
    } catch (error) {
      if (error instanceof ZodError) {
        console.error("Validation error creating project:", formatZodError(error));
        return res.status(400).json({ message: formatZodError(error) });
      }
      console.error("Error creating project:", error);
      res.status(500).json({ message: "Failed to create project" });
    }
  });
  app2.patch("/api/projects/:id", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const validatedData = insertProjectSchema.partial().parse(req.body);
      const project = await storage.updateProject(req.params.id, validatedData);
      res.json(project);
    } catch (error) {
      if (error instanceof ZodError) {
        console.error("Validation error updating project:", formatZodError(error));
        return res.status(400).json({ message: formatZodError(error) });
      }
      console.error("Error updating project:", error);
      res.status(500).json({ message: "Failed to update project" });
    }
  });
  app2.delete("/api/projects/:id", isAuthenticated, isAdmin, async (req, res) => {
    try {
      await storage.deleteProject(req.params.id);
      res.json({ success: true });
    } catch (error) {
      console.error("Error deleting project:", error);
      res.status(500).json({ message: "Failed to delete project" });
    }
  });
  app2.patch("/api/projects/:id/close", isAuthenticated, async (req, res) => {
    try {
      const project = await storage.closeProject(req.params.id);
      res.json(project);
    } catch (error) {
      console.error("Error closing project:", error);
      res.status(500).json({ message: "Failed to close project" });
    }
  });
  app2.post("/api/projects/interest", isAuthenticated, async (req, res) => {
    try {
      const userId = req.user.claims?.sub || req.user.id;
      const { projectId, listingId } = req.body;
      if (projectId) {
        const hasInterest = await storage.checkUserHasExpressedInterest(userId, projectId);
        if (hasInterest) {
          return res.status(400).json({ message: "You have already expressed interest in this project" });
        }
      }
      const validatedData = insertExpressInterestSchema.parse({
        ...req.body,
        userId
      });
      const interest = await storage.expressProjectInterest(validatedData);
      const buyer = await storage.getUserById(userId);
      const adminUser = await storage.getAdminUser();
      if (projectId) {
        const project = await storage.getProjectById(projectId);
        if (adminUser && project && buyer) {
          const thread = await storage.createMessageThread({
            title: `Inquiry about: ${project.name}`,
            type: "project_interest",
            projectId,
            buyerId: userId,
            sellerId: adminUser.id,
            adminId: adminUser.id,
            createdBy: userId,
            context: "project_interest",
            status: "open"
          });
          await storage.createNotification({
            userId: adminUser.id,
            type: "interest_received",
            title: "New Interest in Project",
            message: `${buyer.firstName} ${buyer.lastName} expressed interest in ${project.name}`,
            link: `/admin/projects/${projectId}`
          });
          const buyerTemplate = await storage.getMessageTemplateByType("buyer_interest_to_buyer");
          const adminTemplate = await storage.getMessageTemplateByType("buyer_interest_to_admin");
          if (buyerTemplate && adminUser) {
            await storage.createMessage({
              threadId: thread.id,
              senderId: adminUser.id,
              receiverId: userId,
              subject: buyerTemplate.subject.replace("{project_name}", project.name),
              content: buyerTemplate.content.replace("{project_name}", project.name).replace("{buyer_name}", buyer.firstName || "there"),
              context: "project_interest",
              relatedProjectId: projectId,
              isAutoRelay: true
            });
          }
          if (adminTemplate) {
            await storage.createMessage({
              threadId: thread.id,
              senderId: userId,
              receiverId: adminUser.id,
              subject: adminTemplate.subject.replace("{project_name}", project.name),
              content: adminTemplate.content.replace("{project_name}", project.name).replace("{buyer_name}", `${buyer.firstName} ${buyer.lastName}`),
              context: "project_interest",
              relatedProjectId: projectId,
              isAutoRelay: true
            });
          }
        }
      } else if (listingId) {
        const listing = await storage.getMarketplaceListingById(listingId);
        const seller = listing ? await storage.getUserById(listing.sellerId) : null;
        if (adminUser && listing && buyer) {
          const thread = await storage.createMessageThread({
            title: `Inquiry about: ${listing.title}`,
            type: "marketplace_inquiry",
            listingId,
            buyerId: userId,
            sellerId: listing.sellerId,
            adminId: adminUser.id,
            createdBy: userId,
            context: "marketplace",
            status: "open"
          });
          await storage.createNotification({
            userId: adminUser.id,
            type: "interest_received",
            title: "New Interest in Listing",
            message: `${buyer.firstName} ${buyer.lastName} expressed interest in ${listing.title}`,
            link: `/admin/marketplace/${listingId}`
          });
          if (seller) {
            await storage.createNotification({
              userId: seller.id,
              type: "interest_received",
              title: "New Interest in Your Listing",
              message: `${buyer.firstName} ${buyer.lastName} expressed interest in ${listing.title}`,
              link: `/marketplace/${listingId}`
            });
          }
          const buyerTemplate = await storage.getMessageTemplateByType("buyer_interest_to_buyer");
          const adminTemplate = await storage.getMessageTemplateByType("buyer_interest_to_admin");
          if (buyerTemplate && adminUser) {
            await storage.createMessage({
              threadId: thread.id,
              senderId: adminUser.id,
              receiverId: userId,
              subject: buyerTemplate.subject.replace("{project_name}", listing.title),
              content: buyerTemplate.content.replace("{project_name}", listing.title).replace("{buyer_name}", buyer.firstName || "there"),
              context: "marketplace",
              relatedListingId: listingId,
              isAutoRelay: true
            });
          }
          if (adminTemplate) {
            await storage.createMessage({
              threadId: thread.id,
              senderId: userId,
              receiverId: adminUser.id,
              subject: adminTemplate.subject.replace("{project_name}", listing.title),
              content: adminTemplate.content.replace("{project_name}", listing.title).replace("{buyer_name}", `${buyer.firstName} ${buyer.lastName}`),
              context: "marketplace",
              relatedListingId: listingId,
              isAutoRelay: true
            });
          }
          const sellerTemplate = await storage.getMessageTemplateByType("buyer_interest_to_seller");
          if (sellerTemplate && seller) {
            const adminSellerThread = await storage.createMessageThread({
              title: `Interest in your listing: ${listing.title}`,
              type: "admin_to_seller",
              listingId,
              buyerId: null,
              sellerId: seller.id,
              adminId: adminUser.id,
              createdBy: adminUser.id,
              context: "marketplace",
              status: "open"
            });
            await storage.createMessage({
              threadId: adminSellerThread.id,
              senderId: adminUser.id,
              receiverId: seller.id,
              subject: sellerTemplate.subject.replace("{listing_title}", listing.title),
              content: sellerTemplate.content.replace("{listing_title}", listing.title).replace("{buyer_name}", `${buyer.firstName} ${buyer.lastName}`),
              context: "marketplace",
              relatedListingId: listingId,
              isAutoRelay: true
            });
          }
        }
      }
      await storage.createActivityLog({
        userId,
        activityType: "interest_expressed",
        description: projectId ? `User expressed interest in project ${projectId}` : `User expressed interest in listing ${listingId}`,
        ipAddress: req.ip,
        userAgent: req.get("user-agent")
      });
      const adminUsers = await storage.getUsersByRole("admin");
      let titleText = "";
      if (projectId) {
        const proj = await storage.getProjectById(projectId);
        titleText = proj?.name || projectId;
      } else if (listingId) {
        const list = await storage.getMarketplaceListingById(listingId);
        titleText = list?.title || listingId;
      }
      for (const admin of adminUsers) {
        await storage.createNotification({
          userId: admin.id,
          type: "interest_received",
          title: "New Interest Expression",
          message: `${buyer?.firstName || ""} ${buyer?.lastName || ""} expressed interest in ${projectId ? "project" : "listing"}: ${titleText}`,
          link: projectId ? `/projects/${projectId}` : `/marketplace/${listingId}`
        });
      }
      res.json(interest);
    } catch (error) {
      if (error instanceof ZodError) {
        console.error("Validation error expressing interest:", formatZodError(error));
        return res.status(400).json({ message: formatZodError(error) });
      }
      console.error("Error expressing interest:", error);
      res.status(500).json({ message: "Failed to express interest" });
    }
  });
  app2.get("/api/projects/:id/has-interest", isAuthenticated, async (req, res) => {
    try {
      const userId = req.user.claims?.sub || req.user.id;
      const projectId = req.params.id;
      const hasInterest = await storage.checkUserHasExpressedInterest(userId, projectId);
      res.json({ hasInterest });
    } catch (error) {
      console.error("Error checking interest:", error);
      res.status(500).json({ message: "Failed to check interest" });
    }
  });
  app2.get("/api/admin/projects-interest", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const interests = await storage.getAllExpressedInterests();
      res.json(interests);
    } catch (error) {
      console.error("Error fetching expressed interests:", error);
      res.status(500).json({ message: "Failed to fetch expressed interests" });
    }
  });
  app2.get("/api/marketplace/listings", async (req, res) => {
    try {
      const { type, status } = req.query;
      const isAdmin2 = req.user && req.user.role === "admin";
      const listings = await storage.getMarketplaceListings({
        type,
        status
      });
      const filteredListings = isAdmin2 ? listings : listings.filter((l) => l.status === "approved");
      res.json(filteredListings);
    } catch (error) {
      console.error("Error fetching listings:", error);
      res.status(500).json({ message: "Failed to fetch listings" });
    }
  });
  app2.get("/api/dashboard/listings", isAuthenticated, async (req, res) => {
    try {
      const userId = req.user.claims?.sub || req.user.id;
      const listings = await storage.getListingsBySellerId(userId);
      res.json(listings || []);
    } catch (error) {
      console.error("Error fetching dashboard listings:", error);
      res.status(500).json({ message: "Failed to fetch dashboard listings" });
    }
  });
  app2.get("/api/marketplace/listings/:id", async (req, res) => {
    try {
      const listingId = req.params.id;
      const listing = await storage.getMarketplaceListingById(listingId);
      if (!listing) return res.status(404).json({ message: "Listing not found" });
      const seller = listing.sellerId ? await storage.getUserById(listing.sellerId) : null;
      res.json({
        ...listing,
        sellerName: seller ? `${seller.firstName || ""} ${seller.lastName || ""}`.trim() : void 0
      });
    } catch (error) {
      console.error("Error fetching listing:", error);
      res.status(500).json({ message: "Failed to fetch listing" });
    }
  });
  app2.post("/api/marketplace/listings", isAuthenticated, isSeller, async (req, res) => {
    try {
      const sellerId = req.user.claims?.sub || req.user.id;
      const validatedData = insertMarketplaceListingSchema.parse({
        ...req.body,
        sellerId
      });
      const listing = await storage.createMarketplaceListing(validatedData);
      res.json(listing);
    } catch (error) {
      if (error instanceof ZodError) {
        console.error("Validation error creating listing:", formatZodError(error));
        return res.status(400).json({ message: formatZodError(error) });
      }
      console.error("Error creating listing:", error);
      res.status(500).json({ message: "Failed to create listing" });
    }
  });
  app2.get("/api/marketplace/buyer-requests", async (req, res) => {
    try {
      const requests = await storage.getBuyerRequests();
      res.json(requests);
    } catch (error) {
      console.error("Error fetching buyer requests:", error);
      res.status(500).json({ message: "Failed to fetch buyer requests" });
    }
  });
  app2.get("/api/buyer-requests/latest", async (req, res) => {
    try {
      const requests = await storage.getBuyerRequests();
      const latestRequests = requests.filter((r) => r.status === "active").sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 6);
      res.json(latestRequests);
    } catch (error) {
      console.error("Error fetching latest buyer requests:", error);
      res.status(500).json({ message: "Failed to fetch latest requests" });
    }
  });
  app2.post("/api/marketplace/buyer-requests", isAuthenticated, async (req, res) => {
    try {
      const buyerId = req.user.claims?.sub || req.user.id;
      const validatedData = insertBuyerRequestSchema.parse({
        ...req.body,
        buyerId
      });
      const request = await storage.createBuyerRequest(validatedData);
      res.json(request);
    } catch (error) {
      if (error instanceof ZodError) {
        console.error("Validation error creating buyer request:", formatZodError(error));
        return res.status(400).json({ message: formatZodError(error) });
      }
      console.error("Error creating buyer request:", error);
      res.status(500).json({ message: "Failed to create request" });
    }
  });
  app2.get("/api/dashboard/listings", isAuthenticated, async (req, res) => {
    try {
      const sellerId = req.user.claims?.sub || req.user.id;
      const listings = await storage.getListingsBySellerId(sellerId);
      res.json(listings);
    } catch (error) {
      console.error("Error fetching user listings:", error);
      res.status(500).json({ message: "Failed to fetch listings" });
    }
  });
  app2.patch("/api/marketplace/listings/:id", isAuthenticated, isAdmin, requireAdminPermission("canManageListings"), async (req, res) => {
    try {
      const validatedData = insertMarketplaceListingSchema.partial().parse(req.body);
      const listing = await storage.updateMarketplaceListing(req.params.id, validatedData);
      res.json(listing);
    } catch (error) {
      if (error instanceof ZodError) {
        console.error("Validation error updating listing:", formatZodError(error));
        return res.status(400).json({ message: formatZodError(error) });
      }
      console.error("Error updating listing:", error);
      res.status(500).json({ message: "Failed to update listing" });
    }
  });
  app2.delete("/api/marketplace/listings/:id", isAuthenticated, isAdmin, requireAdminPermission("canManageListings"), async (req, res) => {
    try {
      await storage.deleteMarketplaceListing(req.params.id);
      res.json({ success: true });
    } catch (error) {
      console.error("Error deleting listing:", error);
      res.status(500).json({ message: "Failed to delete listing" });
    }
  });
  app2.patch("/api/marketplace/listings/:id/close", isAuthenticated, async (req, res) => {
    try {
      const userId = req.user.claims?.sub || req.user.id;
      const user = await storage.getUserById(userId);
      const listing = await storage.getMarketplaceListingById(req.params.id);
      if (!listing) {
        return res.status(404).json({ message: "Listing not found" });
      }
      if (user?.role !== "admin" && listing.sellerId !== userId) {
        return res.status(403).json({ message: "Only the seller or admin can close this listing" });
      }
      const closedListing = await storage.closeMarketplaceListing(req.params.id);
      res.json(closedListing);
    } catch (error) {
      console.error("Error closing listing:", error);
      res.status(500).json({ message: "Failed to close listing" });
    }
  });
  app2.post("/api/threads", isAuthenticated, async (req, res) => {
    try {
      const userId = req.user.claims?.sub || req.user.id;
      const { projectId, listingId, title } = req.body;
      if (!projectId && !listingId) {
        return res.status(400).json({ message: "Either projectId or listingId is required" });
      }
      let sellerId = null;
      let threadTitle = title;
      if (projectId) {
        const project = await storage.getProjectById(projectId);
        if (!project) {
          return res.status(404).json({ message: "Project not found" });
        }
        const adminUser = await storage.getAdminUser();
        sellerId = adminUser?.id || null;
        threadTitle = threadTitle || `Inquiry about: ${project.name}`;
      } else if (listingId) {
        const listing = await storage.getMarketplaceListingById(listingId);
        if (!listing) {
          return res.status(404).json({ message: "Listing not found" });
        }
        const adminUser = await storage.getAdminUser();
        sellerId = adminUser?.id || null;
        threadTitle = threadTitle || `Inquiry about: ${listing.title}`;
      }
      const thread = await storage.createMessageThread({
        title: threadTitle,
        type: projectId ? "project_interest" : "marketplace_inquiry",
        projectId,
        listingId,
        buyerId: userId,
        sellerId,
        createdBy: userId,
        status: "open"
      });
      res.json(thread);
    } catch (error) {
      console.error("Error creating thread:", error);
      res.status(500).json({ message: "Failed to create thread" });
    }
  });
  app2.get("/api/threads", isAuthenticated, async (req, res) => {
    try {
      const userId = req.user.claims?.sub || req.user.id;
      const threads = await storage.getThreadsByUserId(userId);
      res.json(threads);
    } catch (error) {
      console.error("Error fetching threads:", error);
      res.status(500).json({ message: "Failed to fetch threads" });
    }
  });
  app2.get("/api/threads/all", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const threads = await storage.getAllMessageThreads();
      res.json(threads);
    } catch (error) {
      console.error("Error fetching all threads:", error);
      res.status(500).json({ message: "Failed to fetch threads" });
    }
  });
  app2.get("/api/admin/threads/categorized", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const allThreads = await storage.getAllMessageThreads();
      const projectInquiries = allThreads.filter((t) => t.type === "project_interest");
      const marketplaceInquiries = allThreads.filter((t) => t.type === "marketplace_inquiry");
      const sellerCommunication = allThreads.filter((t) => t.type === "admin_to_seller");
      const adminToBuyer = allThreads.filter((t) => t.type === "admin_to_buyer");
      res.json({
        projectInquiries,
        marketplaceInquiries,
        sellerCommunication,
        adminToBuyer
      });
    } catch (error) {
      console.error("Error fetching categorized threads:", error);
      res.status(500).json({ message: "Failed to fetch categorized threads" });
    }
  });
  app2.get("/api/threads/:id", isAuthenticated, async (req, res) => {
    try {
      const thread = await storage.getThreadById(req.params.id);
      if (!thread) {
        return res.status(404).json({ message: "Thread not found" });
      }
      res.json(thread);
    } catch (error) {
      console.error("Error fetching thread:", error);
      res.status(500).json({ message: "Failed to fetch thread" });
    }
  });
  app2.get("/api/threads/:id/details", isAuthenticated, async (req, res) => {
    try {
      const threadId = req.params.id;
      const details = await storage.getThreadWithParticipants(threadId);
      if (!details) return res.status(404).json({ message: "Thread not found" });
      res.json(details);
    } catch (error) {
      console.error("Error fetching thread details:", error);
      res.status(500).json({ message: "Failed to fetch thread details" });
    }
  });
  app2.get("/api/threads/:id/messages", isAuthenticated, async (req, res) => {
    try {
      const messages2 = await storage.getMessagesByThreadId(req.params.id);
      res.json(messages2);
    } catch (error) {
      console.error("Error fetching thread messages:", error);
      res.status(500).json({ message: "Failed to fetch messages" });
    }
  });
  app2.post("/api/threads/:id/messages", isAuthenticated, async (req, res) => {
    try {
      const senderId = req.user.claims?.sub || req.user.id;
      const threadId = req.params.id;
      const thread = await storage.getThreadById(threadId);
      if (!thread) {
        return res.status(404).json({ message: "Thread not found" });
      }
      const sender = await storage.getUserById(senderId);
      if (!sender) {
        return res.status(404).json({ message: "User not found" });
      }
      const receiverId = senderId === thread.buyerId ? thread.sellerId : thread.buyerId;
      const validatedData = insertMessageSchema.parse({
        threadId,
        senderId,
        receiverId,
        subject: req.body.subject || thread.title,
        content: req.body.content,
        relatedProjectId: thread.projectId,
        relatedListingId: thread.listingId
      });
      const message = await storage.createMessage(validatedData);
      await storage.updateThreadLastMessage(threadId);
      res.json(message);
    } catch (error) {
      if (error instanceof ZodError) {
        console.error("Validation error creating message:", formatZodError(error));
        return res.status(400).json({ message: formatZodError(error) });
      }
      console.error("Error creating message:", error);
      res.status(500).json({ message: "Failed to send message" });
    }
  });
  app2.patch("/api/threads/:id/close", isAuthenticated, async (req, res) => {
    try {
      const thread = await storage.closeThread(req.params.id);
      res.json(thread);
    } catch (error) {
      console.error("Error closing thread:", error);
      res.status(500).json({ message: "Failed to close thread" });
    }
  });
  const uploadsRoot = path.resolve(import.meta.dirname, "..", "attached_assets", "files", "uploads", "messages");
  fs.mkdirSync(uploadsRoot, { recursive: true });
  const storageEngine = multer.diskStorage({
    destination: (_req, _file, cb) => cb(null, uploadsRoot),
    filename: (_req, file, cb) => {
      const timestamp2 = Date.now();
      const sanitizedOriginal = file.originalname.replace(/[^a-zA-Z0-9._-]/g, "_");
      cb(null, `${timestamp2}-${sanitizedOriginal}`);
    }
  });
  const upload = multer({
    storage: storageEngine,
    limits: { fileSize: 10 * 1024 * 1024 },
    // 10 MB
    fileFilter: (_req, file, cb) => {
      const allowed = [
        "image/png",
        "image/jpeg",
        "image/gif",
        "application/pdf",
        "text/plain"
      ];
      if (allowed.includes(file.mimetype)) {
        return cb(null, true);
      }
      return cb(new Error("Unsupported file type"));
    }
  });
  app2.post("/api/uploads/messages", isAuthenticated, upload.single("file"), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }
      const relativePath = `/attached_assets/files/uploads/messages/${req.file.filename}`;
      res.json({
        filename: req.file.originalname,
        url: relativePath,
        size: req.file.size,
        mimetype: req.file.mimetype
      });
    } catch (error) {
      console.error("Error uploading file:", error);
      res.status(500).json({ message: "Failed to upload file" });
    }
  });
  app2.get("/api/messages", isAuthenticated, async (req, res) => {
    try {
      const userId = req.user.claims?.sub || req.user.id;
      const messages2 = await storage.getMessagesByUserId(userId);
      res.json(messages2);
    } catch (error) {
      console.error("Error fetching messages:", error);
      res.status(500).json({ message: "Failed to fetch messages" });
    }
  });
  app2.post("/api/messages", isAuthenticated, async (req, res) => {
    try {
      const senderId = req.user.claims?.sub || req.user.id;
      const receiverId = req.body.receiverId;
      const sender = await storage.getUserById(senderId);
      const receiver = await storage.getUserById(receiverId);
      if (!sender || !receiver) {
        return res.status(404).json({ message: "User not found" });
      }
      const adminUser = await storage.getAdminUser();
      const adminId = adminUser?.id;
      let isAllowed = sender.role === "admin" || receiver.role === "admin" || sender.role === "buyer" && receiverId === adminId || sender.role === "seller" && receiverId === adminId;
      const relatedListingId = req.body?.relatedListingId;
      if (!isAllowed && relatedListingId) {
        try {
          const listing = await storage.getMarketplaceListingById(relatedListingId);
          if (listing && listing.sellerId === receiverId) {
            isAllowed = true;
          }
        } catch (err) {
          console.warn("Failed to lookup listing for message authorization", err);
        }
      }
      if (!isAllowed) {
        return res.status(403).json({
          message: "You are not authorized to send this message. For inquiries about listings or projects, contact the listing seller or admin."
        });
      }
      const validatedData = insertMessageSchema.parse({
        ...req.body,
        senderId
      });
      const idempotencyKey = req.header("Idempotency-Key") || req.header("idempotency-key") || null;
      const message = await storage.createMessageWithIdempotency(idempotencyKey, validatedData);
      res.json(message);
    } catch (error) {
      if (error instanceof ZodError) {
        console.error("Validation error creating message:", formatZodError(error));
        return res.status(400).json({ message: formatZodError(error) });
      }
      console.error("Error creating message:", error);
      res.status(500).json({ message: "Failed to send message" });
    }
  });
  app2.post("/api/messages/contact-seller", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const adminId = req.user.claims?.sub || req.user.id;
      const { projectId, listingId, sellerId } = req.body;
      if (!projectId && !listingId) {
        return res.status(400).json({ message: "Either projectId or listingId is required" });
      }
      if (!sellerId) {
        return res.status(400).json({ message: "sellerId is required" });
      }
      const admin = await storage.getUserById(adminId);
      if (!admin || admin.role !== "admin") {
        return res.status(403).json({ message: "Only admins can use this endpoint" });
      }
      const existingThreads = await storage.getAllMessageThreads();
      let existingThread = existingThreads.find(
        (t) => t.type === "admin_to_seller" && t.adminId === adminId && t.sellerId === sellerId && (projectId ? t.projectId === projectId : t.listingId === listingId)
      );
      if (existingThread) {
        return res.json({ thread: existingThread, existed: true });
      }
      let threadTitle = "";
      if (projectId) {
        const project = await storage.getProjectById(projectId);
        if (!project) {
          return res.status(404).json({ message: "Project not found" });
        }
        threadTitle = `Admin inquiry about project: ${project.name}`;
      } else if (listingId) {
        const listing = await storage.getMarketplaceListingById(listingId);
        if (!listing) {
          return res.status(404).json({ message: "Listing not found" });
        }
        threadTitle = `Admin inquiry about listing: ${listing.title}`;
      }
      const newThread = await storage.createMessageThread({
        title: threadTitle,
        type: "admin_to_seller",
        projectId: projectId || null,
        listingId: listingId || null,
        buyerId: null,
        sellerId,
        adminId,
        createdBy: adminId,
        context: "general",
        status: "open"
      });
      res.json({ thread: newThread, existed: false });
    } catch (error) {
      console.error("Error creating admin-seller thread:", error);
      res.status(500).json({ message: "Failed to create thread" });
    }
  });
  app2.get("/api/conversations/:userId", isAuthenticated, async (req, res) => {
    try {
      const currentUserId = req.user.claims?.sub || req.user.id;
      const otherUserId = req.params.userId;
      const messages2 = await storage.getConversation(currentUserId, otherUserId);
      res.json(messages2);
    } catch (error) {
      console.error("Error fetching conversation:", error);
      res.status(500).json({ message: "Failed to fetch conversation" });
    }
  });
  app2.get("/api/messages/:id/details", isAuthenticated, async (req, res) => {
    try {
      const messageId = req.params.id;
      const currentUserId = req.user?.claims?.sub || req.user?.id;
      console.log(`Fetching message details for id=${messageId} (user=${currentUserId})`);
      const messageDetails = await storage.getMessageWithSenderDetails(messageId);
      if (!messageDetails) {
        console.warn(`Message not found: id=${messageId}`);
        return res.status(404).json({ message: "Message not found" });
      }
      try {
        if (messageDetails.message && messageDetails.message.receiverId === currentUserId) {
          await storage.markMessageAsRead(messageId);
        }
      } catch (err) {
        console.error(`Failed to mark message read for id=${messageId}:`, err);
      }
      console.log(`Returning message details for id=${messageId}: sender=${messageDetails.sender?.id}`);
      res.json(messageDetails);
    } catch (error) {
      console.error("Error fetching message details:", error);
      res.status(500).json({ message: "Failed to fetch message details" });
    }
  });
  app2.patch("/api/messages/:id/close", isAuthenticated, async (req, res) => {
    try {
      const messageId = req.params.id;
      const currentUserId = req.user.claims?.sub || req.user.id;
      const messageDetails = await storage.getMessageWithSenderDetails(messageId);
      if (!messageDetails) return res.status(404).json({ message: "Message not found" });
      const main = messageDetails.message;
      const isParticipant = [main.senderId, main.receiverId].includes(currentUserId);
      const user = await storage.getUser(currentUserId);
      const isAdminUser = user?.role === "admin";
      if (!isParticipant && !isAdminUser) {
        return res.status(403).json({ message: "Not authorized to close this conversation" });
      }
      await storage.closeConversationByMessageId(messageId);
      res.json({ success: true });
    } catch (error) {
      console.error("Error closing conversation:", error);
      res.status(500).json({ message: "Failed to close conversation" });
    }
  });
  app2.get("/api/messages/check-contact", isAuthenticated, async (req, res) => {
    try {
      const userId = req.user.claims?.sub || req.user.id;
      const { projectId, listingId } = req.query;
      if (!userId) {
        return res.status(400).json({ error: "User ID is required" });
      }
      if (projectId) {
        const hasContacted = await storage.checkUserHasContactedAboutProject(userId, projectId);
        return res.json({ hasContacted });
      }
      if (listingId) {
        const hasContacted = await storage.checkUserHasContactedAboutListing(userId, listingId);
        return res.json({ hasContacted });
      }
      return res.status(400).json({ error: "Either projectId or listingId is required" });
    } catch (error) {
      console.error("Error checking contact status:", error);
      return res.status(500).json({ error: "Internal server error while checking contact status" });
      res.status(500).json({ message: "Failed to check contact status" });
    }
  });
  app2.get("/api/users/:id", isAuthenticated, async (req, res) => {
    try {
      const currentUserId = req.user?.claims?.sub || req.user?.id;
      const targetId = req.params.id;
      const requestingUser = await storage.getUser(currentUserId);
      const isAdminUser = requestingUser?.role === "admin";
      if (!isAdminUser && currentUserId !== targetId) {
        return res.status(403).json({ message: "Not authorized to view this user" });
      }
      const user = await storage.getUserById(targetId);
      if (!user) return res.status(404).json({ message: "User not found" });
      const profile = await storage.getUserProfile(targetId);
      let listings = null;
      let recentMessages = null;
      try {
        listings = await storage.getListingsBySellerId(targetId);
      } catch (err) {
        listings = null;
      }
      if (isAdminUser || currentUserId === targetId) {
        try {
          const msgs = await storage.getMessagesByUserId(targetId);
          recentMessages = (msgs || []).slice(0, 5).map((m) => ({ id: m.id, content: m.content, createdAt: m.createdAt, senderId: m.senderId, receiverId: m.receiverId }));
        } catch (err) {
          recentMessages = null;
        }
      }
      res.json({ user, profile, listings, recentMessages });
    } catch (error) {
      console.error("Error fetching user details:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });
  app2.get("/api/public/users/:id", async (req, res) => {
    try {
      const targetId = req.params.id;
      const user = await storage.getUserById(targetId);
      if (!user) return res.status(404).json({ message: "User not found" });
      const profile = await storage.getUserProfile(targetId);
      let publicListings = [];
      try {
        const allListings = await storage.getListingsBySellerId(targetId);
        publicListings = (allListings || []).filter((l) => (l.status || "").toLowerCase() === "active");
      } catch (err) {
        publicListings = [];
      }
      const publicUser = { id: user.id, firstName: user.firstName, lastName: user.lastName, role: user.role };
      const publicProfile = { companyName: profile?.companyName, location: profile?.location, bio: profile?.bio };
      res.json({ user: publicUser, profile: publicProfile, listings: publicListings });
    } catch (error) {
      console.error("Error fetching public user profile:", error);
      res.status(500).json({ message: "Failed to fetch public profile" });
    }
  });
  app2.get("/api/blog", async (req, res) => {
    try {
      const posts = await storage.getBlogPosts(true);
      res.json(posts);
    } catch (error) {
      console.error("Error fetching blog posts:", error);
      res.status(500).json({ message: "Failed to fetch blog posts" });
    }
  });
  app2.get("/api/blog/:slug", async (req, res) => {
    try {
      const post = await storage.getBlogPostBySlug(req.params.slug);
      if (!post) {
        return res.status(404).json({ message: "Blog post not found" });
      }
      res.json(post);
    } catch (error) {
      console.error("Error fetching blog post:", error);
      res.status(500).json({ message: "Failed to fetch blog post" });
    }
  });
  app2.post("/api/blog", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const authorId = req.user.claims?.sub || req.user.id;
      const validatedData = insertBlogPostSchema.parse({
        ...req.body,
        authorId
      });
      const post = await storage.createBlogPost(validatedData);
      res.json(post);
    } catch (error) {
      if (error instanceof ZodError) {
        console.error("Validation error creating blog post:", formatZodError(error));
        return res.status(400).json({ message: formatZodError(error) });
      }
      console.error("Error creating blog post:", error);
      res.status(500).json({ message: "Failed to create blog post" });
    }
  });
  app2.patch("/api/blog/:id/publish", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const post = await storage.publishBlogPost(req.params.id);
      res.json(post);
    } catch (error) {
      console.error("Error publishing blog post:", error);
      res.status(500).json({ message: "Failed to publish blog post" });
    }
  });
  app2.patch("/api/blog/:id", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const validatedData = insertBlogPostSchema.partial().parse(req.body);
      const post = await storage.updateBlogPost(req.params.id, validatedData);
      res.json(post);
    } catch (error) {
      if (error instanceof ZodError) {
        console.error("Validation error updating blog post:", formatZodError(error));
        return res.status(400).json({ message: formatZodError(error) });
      }
      console.error("Error updating blog post:", error);
      res.status(500).json({ message: "Failed to update blog post" });
    }
  });
  app2.delete("/api/blog/:id", isAuthenticated, isAdmin, async (req, res) => {
    try {
      await storage.deleteBlogPost(req.params.id);
      res.json({ message: "Blog post deleted successfully" });
    } catch (error) {
      console.error("Error deleting blog post:", error);
      res.status(500).json({ message: "Failed to delete blog post" });
    }
  });
  app2.get("/api/blog/admin/all", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const posts = await storage.getBlogPosts(false);
      res.json(posts);
    } catch (error) {
      console.error("Error fetching all blog posts:", error);
      res.status(500).json({ message: "Failed to fetch blog posts" });
    }
  });
  app2.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactSubmissionSchema.parse(req.body);
      const submission = await storage.createContactSubmission(validatedData);
      res.json(submission);
    } catch (error) {
      if (error instanceof ZodError) {
        console.error("Validation error submitting contact form:", formatZodError(error));
        return res.status(400).json({ message: formatZodError(error) });
      }
      console.error("Error submitting contact form:", error);
      res.status(500).json({ message: "Failed to submit contact form" });
    }
  });
  app2.get("/api/contact/submissions", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const submissions = await storage.getContactSubmissions();
      res.json(submissions);
    } catch (error) {
      console.error("Error fetching contact submissions:", error);
      res.status(500).json({ message: "Failed to fetch submissions" });
    }
  });
  app2.patch("/api/contact/submissions/:id", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const { status } = req.body;
      if (!status || !["new", "contacted", "resolved"].includes(status)) {
        return res.status(400).json({ message: "Invalid status value" });
      }
      const submission = await storage.updateContactSubmissionStatus(req.params.id, status);
      res.json(submission);
    } catch (error) {
      console.error("Error updating contact submission:", error);
      res.status(500).json({ message: "Failed to update submission" });
    }
  });
  app2.get("/api/contact/settings", async (req, res) => {
    try {
      const settings = await storage.getContactSettings();
      res.json(settings);
    } catch (error) {
      console.error("Error fetching contact settings:", error);
      res.status(500).json({ message: "Failed to fetch contact settings" });
    }
  });
  app2.patch("/api/contact/settings", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const settings = await storage.updateContactSettings(req.body);
      res.json(settings);
    } catch (error) {
      console.error("Error updating contact settings:", error);
      res.status(500).json({ message: "Failed to update contact settings" });
    }
  });
  app2.get("/api/admin/verification-queue", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const listings = await storage.getPendingListings();
      res.json(listings);
    } catch (error) {
      console.error("Error fetching verification queue:", error);
      res.status(500).json({ message: "Failed to fetch verification queue" });
    }
  });
  app2.post("/api/admin/verify/:id", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const reviewerId = req.user.claims?.sub || req.user.id;
      const listingId = req.params.id;
      await storage.approveListing(listingId, reviewerId);
      res.json({ message: "Listing approved successfully" });
    } catch (error) {
      console.error("Error approving listing:", error);
      res.status(500).json({ message: "Failed to approve listing" });
    }
  });
  app2.post("/api/admin/reject/:id", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const reviewerId = req.user.claims?.sub || req.user.id;
      const listingId = req.params.id;
      await storage.rejectListing(listingId, reviewerId);
      res.json({ message: "Listing rejected successfully" });
    } catch (error) {
      console.error("Error rejecting listing:", error);
      res.status(500).json({ message: "Failed to reject listing" });
    }
  });
  app2.get("/api/admin/users", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const users2 = await storage.getAllUsers();
      res.json(users2);
    } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).json({ message: "Failed to fetch users" });
    }
  });
  app2.post("/api/admin/users", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const { email, password, firstName, lastName, role } = req.body || {};
      if (!email || !role) {
        return res.status(400).json({ message: "Email and role are required" });
      }
      const user = await storage.upsertUser({
        email,
        firstName,
        lastName,
        // allow setting role on creation
        // @ts-ignore
        role
      });
      if (role === "admin") {
        await storage.upsertAdminPermissions({ adminUserId: user.id });
      }
      res.json(user);
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(500).json({ message: "Failed to create user" });
    }
  });
  app2.patch("/api/admin/users/:id/role", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const { role } = req.body;
      if (!role || !["admin", "buyer", "seller"].includes(role)) {
        return res.status(400).json({ message: "Invalid role" });
      }
      const user = await storage.updateUserRole(req.params.id, role);
      res.json(user);
    } catch (error) {
      console.error("Error updating user role:", error);
      res.status(500).json({ message: "Failed to update user role" });
    }
  });
  app2.delete("/api/admin/users/:id", isAuthenticated, isAdmin, async (req, res) => {
    try {
      await storage.deleteUser(req.params.id);
      res.json({ message: "User deleted successfully" });
    } catch (error) {
      console.error("Error deleting user:", error);
      res.status(500).json({ message: "Failed to delete user" });
    }
  });
  app2.get("/api/admin/users/:id/listings", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const sellerId = req.params.id;
      const listings = await storage.getListingsBySellerId(sellerId);
      res.json(listings);
    } catch (error) {
      console.error("Error fetching user listings (admin):", error);
      res.status(500).json({ message: "Failed to fetch user listings" });
    }
  });
  app2.get("/api/admin/activity-logs", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit) : 100;
      const logs = await storage.getActivityLogs(limit);
      res.json(logs);
    } catch (error) {
      console.error("Error fetching activity logs:", error);
      res.status(500).json({ message: "Failed to fetch activity logs" });
    }
  });
  app2.get("/api/activity-logs/me", isAuthenticated, async (req, res) => {
    try {
      const userId = req.user.claims?.sub || req.user.id;
      const limit = req.query.limit ? parseInt(req.query.limit) : 50;
      const logs = await storage.getUserActivityLogs(userId, limit);
      res.json(logs);
    } catch (error) {
      console.error("Error fetching user activity logs:", error);
      res.status(500).json({ message: "Failed to fetch activity logs" });
    }
  });
  app2.get("/api/notifications", isAuthenticated, async (req, res) => {
    try {
      const userId = req.user.claims?.sub || req.user.id;
      const notifications2 = await storage.getUserNotifications(userId);
      res.json(notifications2);
    } catch (error) {
      console.error("Error fetching notifications:", error);
      res.status(500).json({ message: "Failed to fetch notifications" });
    }
  });
  app2.get("/api/notifications/unread-count", isAuthenticated, async (req, res) => {
    try {
      const userId = req.user.claims?.sub || req.user.id;
      const count = await storage.getUnreadNotificationCount(userId);
      res.json({ count });
    } catch (error) {
      console.error("Error fetching unread count:", error);
      res.status(500).json({ message: "Failed to fetch unread count" });
    }
  });
  app2.post("/api/notifications/:id/read", isAuthenticated, async (req, res) => {
    try {
      await storage.markNotificationAsRead(req.params.id);
      res.json({ message: "Notification marked as read" });
    } catch (error) {
      console.error("Error marking notification as read:", error);
      res.status(500).json({ message: "Failed to mark notification as read" });
    }
  });
  app2.post("/api/notifications/mark-all-read", isAuthenticated, async (req, res) => {
    try {
      const userId = req.user.claims?.sub || req.user.id;
      await storage.markAllNotificationsAsRead(userId);
      res.json({ message: "All notifications marked as read" });
    } catch (error) {
      console.error("Error marking all notifications as read:", error);
      res.status(500).json({ message: "Failed to mark all notifications as read" });
    }
  });
  app2.get("/api/dashboard/stats", isAuthenticated, async (req, res) => {
    try {
      const userId = req.user.claims?.sub || req.user.id;
      const [listingsCount, unreadMessagesCount, interestsCount] = await Promise.all([
        storage.getUserListingsCount(userId),
        storage.getUserUnreadMessagesCount(userId),
        storage.getUserInterestsCount(userId)
      ]);
      res.json({
        listingsCount,
        unreadMessagesCount,
        interestsCount
      });
    } catch (error) {
      console.error("Error fetching dashboard stats:", error);
      res.status(500).json({ message: "Failed to fetch dashboard stats" });
    }
  });
  app2.get("/api/videos/active", async (req, res) => {
    try {
      const videos2 = await storage.getActiveVideos();
      res.json(videos2);
    } catch (error) {
      console.error("Error fetching active videos:", error);
      res.status(500).json({ message: "Failed to fetch active videos" });
    }
  });
  app2.get("/api/videos", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const videos2 = await storage.getAllVideos();
      res.json(videos2);
    } catch (error) {
      console.error("Error fetching videos:", error);
      res.status(500).json({ message: "Failed to fetch videos" });
    }
  });
  app2.post("/api/videos", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const validatedData = insertVideoSchema.parse(req.body);
      const video = await storage.createVideo(validatedData);
      res.json(video);
    } catch (error) {
      if (error instanceof ZodError) {
        console.error("Validation error creating video:", formatZodError(error));
        return res.status(400).json({ message: formatZodError(error) });
      }
      console.error("Error creating video:", error);
      res.status(500).json({ message: "Failed to create video" });
    }
  });
  app2.patch("/api/videos/:id", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const validatedData = updateVideoSchema.parse({ ...req.body, id: req.params.id });
      const video = await storage.updateVideo(validatedData);
      res.json(video);
    } catch (error) {
      if (error instanceof ZodError) {
        console.error("Validation error updating video:", formatZodError(error));
        return res.status(400).json({ message: formatZodError(error) });
      }
      console.error("Error updating video:", error);
      res.status(500).json({ message: "Failed to update video" });
    }
  });
  app2.post("/api/videos/:id/toggle-active", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const video = await storage.toggleVideoActive(req.params.id);
      res.json(video);
    } catch (error) {
      console.error("Error toggling video active status:", error);
      res.status(400).json({ message: error.message || "Failed to toggle video status" });
    }
  });
  app2.delete("/api/videos/:id", isAuthenticated, isAdmin, async (req, res) => {
    try {
      await storage.deleteVideo(req.params.id);
      res.json({ message: "Video deleted successfully" });
    } catch (error) {
      console.error("Error deleting video:", error);
      res.status(500).json({ message: "Failed to delete video" });
    }
  });
  const httpServer = createServer(app2);
  return httpServer;
}

// server/vite.ts
import express from "express";
import fs2 from "fs";
import path2 from "path";
import { nanoid } from "nanoid";
var viteLogger;
async function setupVite(app2, server) {
  const viteModule = await import("vite");
  const createViteServer = viteModule.createServer;
  viteLogger = viteModule.createLogger();
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const reactPlugin = await import("@vitejs/plugin-react").then((m) => m.default);
  const vite = await createViteServer({
    root: path2.resolve(import.meta.dirname, "..", "client"),
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: {
      ...serverOptions,
      // disable the http proxy when embedding Vite into our server process
      proxy: {}
    },
    appType: "custom",
    resolve: {
      alias: {
        "@": path2.resolve(import.meta.dirname, "..", "client", "src"),
        "@shared": path2.resolve(import.meta.dirname, "..", "shared"),
        // Serve project-level assets from the attached_assets folder during dev
        "@assets": path2.resolve(import.meta.dirname, "..", "attached_assets")
      }
    },
    plugins: [reactPlugin()]
  });
  app2.use("/attached_assets", express.static(path2.resolve(import.meta.dirname, "..", "attached_assets")));
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path2.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html"
      );
      let template = await fs2.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path2.resolve(import.meta.dirname, "..", "dist", "public");
  const attachedAssetsPath = path2.resolve(import.meta.dirname, "..", "attached_assets");
  if (!fs2.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  if (fs2.existsSync(attachedAssetsPath)) {
    app2.use("/attached_assets", express.static(attachedAssetsPath));
  }
  app2.use(express.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path2.resolve(distPath, "index.html"));
  });
}

// server/index.ts
import session from "express-session";
import connectPgSimple from "connect-pg-simple";
import passport2 from "passport";
import pg from "pg";
var app = express2();
app.use(express2.json());
app.use(express2.urlencoded({ extended: false }));
console.log("Starting server bootstrap", { NODE_ENV: process.env.NODE_ENV, PORT: process.env.PORT });
process.on("uncaughtException", (err) => {
  console.error("uncaughtException:", err instanceof Error ? err.stack || err.message : String(err));
});
process.on("unhandledRejection", (reason) => {
  console.error("unhandledRejection:", reason instanceof Error ? reason.stack || reason.message : String(reason));
});
app.set("trust proxy", 1);
var corsOrigin = process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(",").map((s) => s.trim()) : void 0;
app.use(cors({
  origin: corsOrigin || true,
  credentials: true
}));
var sessionStore;
if (process.env.DATABASE_URL) {
  try {
    const PgStore = connectPgSimple(session);
    sessionStore = new PgStore({
      conString: process.env.DATABASE_URL,
      tableName: "sessions",
      createTableIfMissing: true
    });
    console.log("Postgres session store initialized");
  } catch (err) {
    console.log("Warning: failed to initialize Postgres session store. Falling back to default MemoryStore. Error:", err.message);
    sessionStore = void 0;
  }
} else {
  console.log("No DATABASE_URL set \u2014 using MemoryStore for sessions (not recommended for production).");
}
app.use(session({
  store: sessionStore,
  secret: process.env.SESSION_SECRET || "dev-secret-key",
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === "production",
    // use secure cookies in production
    httpOnly: true,
    sameSite: process.env.COOKIE_SAMESITE || (process.env.NODE_ENV === "production" ? "none" : "lax"),
    domain: process.env.COOKIE_DOMAIN || void 0,
    maxAge: 24 * 60 * 60 * 1e3
    // 24 hours
  }
}));
app.use(passport2.initialize());
app.use(passport2.session());
app.use((req, res, next) => {
  const start = Date.now();
  const path3 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path3.startsWith("/api")) {
      let logLine = `${req.method} ${path3} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      console.log(logLine);
    }
  });
  next();
});
(async () => {
  try {
    console.log("Registering routes...");
    const server = await registerRoutes(app);
    console.log("Routes registered");
    app.use((err, _req, res, _next) => {
      const status = err.status || err.statusCode || 500;
      const message = err.message || "Internal Server Error";
      res.status(status).json({ message });
      console.error("Unhandled error:", err);
    });
    if (app.get("env") === "development") {
      await setupVite(app, server);
      const port = parseInt(process.env.PORT || "5000", 10);
      (async function schemaCheck() {
        try {
          const requiredColumns = ["related_project_id", "related_listing_id"];
          const pool2 = new pg.Pool({ connectionString: process.env.DATABASE_URL });
          const res = await pool2.query(
            `select column_name from information_schema.columns where table_name = 'messages' and column_name = ANY($1)`,
            [requiredColumns]
          );
          await pool2.end();
          const present = (res.rows || []).map((r) => r.column_name);
          const missing = requiredColumns.filter((c) => !present.includes(c));
          if (missing.length) {
            console.log(`WARNING: Database schema appears out of date. Missing columns on 'messages' table: ${missing.join(", ")}`);
            console.log(`Run 'npm run db:push' to synchronize your local database schema with the application schema.`);
          }
        } catch (err) {
          console.log(`Schema check failed: ${err.message}`);
        }
      })();
      server.listen(port, () => {
        console.log(`Server running at http://localhost:${port} (development)`);
      });
    } else {
      console.log("Production mode: serving static files");
      serveStatic(app);
      const port = parseInt(process.env.PORT || "5000", 10);
      server.listen(port, () => {
        console.log(`Server running at http://localhost:${port} (production)`);
      });
    }
  } catch (err) {
    console.error("Fatal error during server startup:", err.message || err);
  }
})();
var index_default = app;
export {
  index_default as default
};
