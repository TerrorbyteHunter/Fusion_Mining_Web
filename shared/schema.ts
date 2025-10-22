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
export const profileTypeEnum = pgEnum('profile_type', ['individual', 'company']);

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: varchar("email").unique(),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  profileImageUrl: varchar("profile_image_url"),
  role: userRoleEnum("role").notNull().default('buyer'),
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
export const projectStatusEnum = pgEnum('project_status', ['active', 'pending', 'completed', 'suspended']);

export const projects = pgTable("projects", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
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
  projectId: varchar("project_id").notNull().references(() => projects.id, { onDelete: 'cascade' }),
  userId: varchar("user_id").notNull().references(() => users.id, { onDelete: 'cascade' }),
  message: text("message"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ============================================================================
// Marketplace
// ============================================================================
export const listingTypeEnum = pgEnum('listing_type', ['mineral', 'partnership']);
export const listingStatusEnum = pgEnum('listing_status', ['pending', 'approved', 'rejected', 'inactive']);

export const marketplaceListings = pgTable("marketplace_listings", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  sellerId: varchar("seller_id").notNull().references(() => users.id, { onDelete: 'cascade' }),
  type: listingTypeEnum("type").notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description").notNull(),
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
  buyerId: varchar("buyer_id").notNull().references(() => users.id, { onDelete: 'cascade' }),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description").notNull(),
  mineralType: varchar("mineral_type").notNull(),
  quantity: varchar("quantity"),
  budget: varchar("budget"),
  location: varchar("location"),
  status: varchar("status").notNull().default('active'), // active, closed
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// ============================================================================
// Messaging
// ============================================================================
export const messages = pgTable("messages", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  senderId: varchar("sender_id").notNull().references(() => users.id, { onDelete: 'cascade' }),
  receiverId: varchar("receiver_id").notNull().references(() => users.id, { onDelete: 'cascade' }),
  subject: varchar("subject", { length: 255 }),
  content: text("content").notNull(),
  read: boolean("read").notNull().default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
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
// Relations
// ============================================================================
export const usersRelations = relations(users, ({ one, many }) => ({
  profile: one(userProfiles, {
    fields: [users.id],
    references: [userProfiles.userId],
  }),
  listings: many(marketplaceListings),
  buyerRequests: many(buyerRequests),
  sentMessages: many(messages, { relationName: 'sentMessages' }),
  receivedMessages: many(messages, { relationName: 'receivedMessages' }),
  blogPosts: many(blogPosts),
  interests: many(expressInterest),
  activityLogs: many(activityLogs),
  notifications: many(notifications),
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

export const messagesRelations = relations(messages, ({ one }) => ({
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

// ============================================================================
// Zod Schemas for validation
// ============================================================================

// User schemas
export const upsertUserSchema = createInsertSchema(users).pick({
  id: true,
  email: true,
  firstName: true,
  lastName: true,
  profileImageUrl: true,
});
export type UpsertUser = z.infer<typeof upsertUserSchema>;
export type User = typeof users.$inferSelect;

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
  createdAt: true,
  updatedAt: true,
});
export type InsertProject = z.infer<typeof insertProjectSchema>;
export type Project = typeof projects.$inferSelect;

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

// Buyer Request schemas
export const insertBuyerRequestSchema = createInsertSchema(buyerRequests).omit({
  id: true,
  status: true,
  createdAt: true,
  updatedAt: true,
});
export type InsertBuyerRequest = z.infer<typeof insertBuyerRequestSchema>;
export type BuyerRequest = typeof buyerRequests.$inferSelect;

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
