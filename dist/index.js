var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// server/index.ts
import "dotenv/config";
import express2 from "express";

// server/routes.ts
import { createServer } from "http";

// shared/schema.ts
var schema_exports = {};
__export(schema_exports, {
  activityLogs: () => activityLogs,
  activityLogsRelations: () => activityLogsRelations,
  activityTypeEnum: () => activityTypeEnum,
  blogPosts: () => blogPosts,
  blogPostsRelations: () => blogPostsRelations,
  buyerRequests: () => buyerRequests,
  buyerRequestsRelations: () => buyerRequestsRelations,
  contactSettings: () => contactSettings,
  contactSubmissions: () => contactSubmissions,
  expressInterest: () => expressInterest,
  expressInterestRelations: () => expressInterestRelations,
  insertActivityLogSchema: () => insertActivityLogSchema,
  insertBlogPostSchema: () => insertBlogPostSchema,
  insertBuyerRequestSchema: () => insertBuyerRequestSchema,
  insertContactSettingsSchema: () => insertContactSettingsSchema,
  insertContactSubmissionSchema: () => insertContactSubmissionSchema,
  insertExpressInterestSchema: () => insertExpressInterestSchema,
  insertMarketplaceListingSchema: () => insertMarketplaceListingSchema,
  insertMessageSchema: () => insertMessageSchema,
  insertNotificationSchema: () => insertNotificationSchema,
  insertProjectSchema: () => insertProjectSchema,
  insertUserProfileSchema: () => insertUserProfileSchema,
  insertVideoSchema: () => insertVideoSchema,
  licenseTypeEnum: () => licenseTypeEnum,
  listingStatusEnum: () => listingStatusEnum,
  listingTypeEnum: () => listingTypeEnum,
  marketplaceListings: () => marketplaceListings,
  marketplaceListingsRelations: () => marketplaceListingsRelations,
  messages: () => messages,
  messagesRelations: () => messagesRelations,
  notificationTypeEnum: () => notificationTypeEnum,
  notifications: () => notifications,
  notificationsRelations: () => notificationsRelations,
  profileTypeEnum: () => profileTypeEnum,
  projectStatusEnum: () => projectStatusEnum,
  projects: () => projects,
  projectsRelations: () => projectsRelations,
  sessions: () => sessions,
  updateContactSettingsSchema: () => updateContactSettingsSchema,
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
var projectStatusEnum = pgEnum("project_status", ["active", "pending", "completed", "suspended"]);
var projects = pgTable("projects", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
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
  projectId: varchar("project_id").notNull().references(() => projects.id, { onDelete: "cascade" }),
  userId: varchar("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  message: text("message"),
  createdAt: timestamp("created_at").defaultNow().notNull()
});
var listingTypeEnum = pgEnum("listing_type", ["mineral", "partnership"]);
var listingStatusEnum = pgEnum("listing_status", ["pending", "approved", "rejected", "inactive"]);
var marketplaceListings = pgTable("marketplace_listings", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  sellerId: varchar("seller_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  type: listingTypeEnum("type").notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description").notNull(),
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
  buyerId: varchar("buyer_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description").notNull(),
  mineralType: varchar("mineral_type").notNull(),
  quantity: varchar("quantity"),
  budget: varchar("budget"),
  location: varchar("location"),
  status: varchar("status").notNull().default("active"),
  // active, closed
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull()
});
var messages = pgTable("messages", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  senderId: varchar("sender_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  receiverId: varchar("receiver_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  subject: varchar("subject", { length: 255 }),
  content: text("content").notNull(),
  read: boolean("read").notNull().default(false),
  createdAt: timestamp("created_at").defaultNow().notNull()
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
  sentMessages: many(messages, { relationName: "sentMessages" }),
  receivedMessages: many(messages, { relationName: "receivedMessages" }),
  blogPosts: many(blogPosts),
  interests: many(expressInterest),
  activityLogs: many(activityLogs),
  notifications: many(notifications)
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
var messagesRelations = relations(messages, ({ one }) => ({
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

// server/db.ts
import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
var connectionConfig = {
  host: "localhost",
  port: 5432,
  database: "fusion_mining",
  user: "postgres",
  password: "1234"
};
var pool = new Pool(connectionConfig);
var db = drizzle(pool, { schema: schema_exports });

// server/storage.ts
import { eq, and, desc, or, sql as sql2 } from "drizzle-orm";
var DatabaseStorage = class {
  // ========================================================================
  // User operations
  // ========================================================================
  async getUser(id) {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
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
    const [project] = await db.update(projects).set({ ...data, updatedAt: /* @__PURE__ */ new Date() }).where(eq(projects.id, id)).returning();
    return project;
  }
  async deleteProject(id) {
    await db.delete(projects).where(eq(projects.id, id));
  }
  async expressProjectInterest(interestData) {
    const [interest] = await db.insert(expressInterest).values(interestData).returning();
    return interest;
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
  async getListingsBySellerId(sellerId) {
    return await db.select().from(marketplaceListings).where(eq(marketplaceListings.sellerId, sellerId)).orderBy(desc(marketplaceListings.createdAt));
  }
  // ========================================================================
  // Buyer Request operations
  // ========================================================================
  async createBuyerRequest(requestData) {
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
  // Message operations
  // ========================================================================
  async createMessage(messageData) {
    const [message] = await db.insert(messages).values(messageData).returning();
    return message;
  }
  async getMessagesByUserId(userId) {
    return await db.select().from(messages).where(
      or(
        eq(messages.senderId, userId),
        eq(messages.receiverId, userId)
      )
    ).orderBy(desc(messages.createdAt));
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
    await db.update(messages).set({ read: true }).where(eq(messages.id, id));
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
  async approveListing(listingId, reviewerId) {
    await db.update(marketplaceListings).set({
      status: "approved",
      updatedAt: /* @__PURE__ */ new Date()
    }).where(eq(marketplaceListings.id, listingId));
    await db.update(verificationQueue).set({
      reviewedAt: /* @__PURE__ */ new Date(),
      reviewedBy: reviewerId
    }).where(eq(verificationQueue.listingId, listingId));
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
    const [log2] = await db.insert(activityLogs).values(logData).returning();
    return log2;
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
    const result = await db.select({ count: sql2`count(*)::int` }).from(messages).where(
      and(
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
    try {
      const user = await storage.getUser(id);
      done(null, user);
    } catch (error) {
      done(error, null);
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

// server/routes.ts
import { ZodError } from "zod";
function formatZodError(error) {
  return error.errors.map((err) => `${err.path.join(".")}: ${err.message}`).join(", ");
}
async function registerRoutes(app2) {
  await setupAuth(app2);
  if (process.env.NODE_ENV === "development") {
    app2.post("/api/login", async (req, res) => {
      const { username, password } = req.body;
      const users2 = {
        admin: { id: "test-admin-123", username: "admin", password: "admin123", role: "admin", email: "admin@fusionmining.com", firstName: "Admin", lastName: "User" },
        user: { id: "test-buyer-789", username: "user", password: "user123", role: "buyer", email: "buyer@fusionmining.com", firstName: "Bob", lastName: "Buyer" }
      };
      const user = Object.values(users2).find((u) => u.username === username && u.password === password);
      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      req.login(user, (err) => {
        if (err) {
          return res.status(500).json({ message: "Login failed" });
        }
        res.json({ success: true, user });
      });
    });
  }
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
            "test-seller-456": { email: "seller@fusionmining.com", firstName: "Sarah", lastName: "Seller", role: "seller" },
            "test-buyer-789": { email: "buyer@fusionmining.com", firstName: "Bob", lastName: "Buyer", role: "buyer" }
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
        req.login(user, (err) => {
          if (err) {
            console.error("Login error:", err);
            return res.status(500).json({ message: "Failed to login" });
          }
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
    app2.post("/api/test-logout", (req, res) => {
      req.logout(() => {
        res.json({ message: "Test logout successful" });
      });
    });
    app2.get("/api/auth/user", async (req, res) => {
      if (!req.session || !req.session.user) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      try {
        const user = await storage.getUser(req.session.user.id);
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
          { id: "test-seller-456", email: "seller@fusionmining.com", role: "seller", name: "Sarah Seller" },
          { id: "test-buyer-789", email: "buyer@fusionmining.com", role: "buyer", name: "Bob Buyer" }
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
            email: "seller@fusionmining.com",
            firstName: "Sarah",
            lastName: "Seller",
            role: "seller"
          },
          {
            id: "test-buyer-789",
            email: "buyer@fusionmining.com",
            firstName: "Bob",
            lastName: "Buyer",
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
  }
  app2.get("/api/auth/user", isAuthenticated, async (req, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });
  app2.get("/api/profile", isAuthenticated, async (req, res) => {
    try {
      const userId = req.user.claims.sub;
      const profile = await storage.getUserProfile(userId);
      res.json(profile);
    } catch (error) {
      console.error("Error fetching profile:", error);
      res.status(500).json({ message: "Failed to fetch profile" });
    }
  });
  app2.post("/api/profile", isAuthenticated, async (req, res) => {
    try {
      const userId = req.user.claims.sub;
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
      const userId = req.user.claims.sub;
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
      res.json(projects2);
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
  app2.post("/api/projects", isAuthenticated, isAdmin, async (req, res) => {
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
  app2.post("/api/projects/interest", isAuthenticated, async (req, res) => {
    try {
      const userId = req.user.claims.sub;
      const { projectId } = req.body;
      const hasInterest = await storage.checkUserHasExpressedInterest(userId, projectId);
      if (hasInterest) {
        return res.status(400).json({ message: "You have already expressed interest in this project" });
      }
      const validatedData = insertExpressInterestSchema.parse({
        ...req.body,
        userId
      });
      const interest = await storage.expressProjectInterest(validatedData);
      await storage.createActivityLog({
        userId,
        activityType: "interest_expressed",
        description: `User expressed interest in project ${projectId}`,
        ipAddress: req.ip,
        userAgent: req.get("user-agent")
      });
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
      const userId = req.user.claims.sub;
      const projectId = req.params.id;
      const hasInterest = await storage.checkUserHasExpressedInterest(userId, projectId);
      res.json({ hasInterest });
    } catch (error) {
      console.error("Error checking interest:", error);
      res.status(500).json({ message: "Failed to check interest" });
    }
  });
  app2.get("/api/marketplace/listings", async (req, res) => {
    try {
      const { type, status } = req.query;
      const listings = await storage.getMarketplaceListings({
        type,
        status
      });
      res.json(listings);
    } catch (error) {
      console.error("Error fetching listings:", error);
      res.status(500).json({ message: "Failed to fetch listings" });
    }
  });
  app2.post("/api/marketplace/listings", isAuthenticated, isSeller, async (req, res) => {
    try {
      const sellerId = req.user.claims.sub;
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
  app2.post("/api/marketplace/buyer-requests", isAuthenticated, async (req, res) => {
    try {
      const buyerId = req.user.claims.sub;
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
      const sellerId = req.user.claims.sub;
      const listings = await storage.getListingsBySellerId(sellerId);
      res.json(listings);
    } catch (error) {
      console.error("Error fetching user listings:", error);
      res.status(500).json({ message: "Failed to fetch listings" });
    }
  });
  app2.patch("/api/marketplace/listings/:id", isAuthenticated, isAdmin, async (req, res) => {
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
  app2.delete("/api/marketplace/listings/:id", isAuthenticated, isAdmin, async (req, res) => {
    try {
      await storage.deleteMarketplaceListing(req.params.id);
      res.json({ success: true });
    } catch (error) {
      console.error("Error deleting listing:", error);
      res.status(500).json({ message: "Failed to delete listing" });
    }
  });
  app2.get("/api/messages", isAuthenticated, async (req, res) => {
    try {
      const userId = req.user.claims.sub;
      const messages2 = await storage.getMessagesByUserId(userId);
      res.json(messages2);
    } catch (error) {
      console.error("Error fetching messages:", error);
      res.status(500).json({ message: "Failed to fetch messages" });
    }
  });
  app2.post("/api/messages", isAuthenticated, async (req, res) => {
    try {
      const senderId = req.user.claims.sub;
      const validatedData = insertMessageSchema.parse({
        ...req.body,
        senderId
      });
      const message = await storage.createMessage(validatedData);
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
  app2.get("/api/conversations/:userId", isAuthenticated, async (req, res) => {
    try {
      const currentUserId = req.user.claims.sub;
      const otherUserId = req.params.userId;
      const messages2 = await storage.getConversation(currentUserId, otherUserId);
      res.json(messages2);
    } catch (error) {
      console.error("Error fetching conversation:", error);
      res.status(500).json({ message: "Failed to fetch conversation" });
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
      const authorId = req.user.claims.sub;
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
      const reviewerId = req.user.claims.sub;
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
      const reviewerId = req.user.claims.sub;
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
      const userId = req.user.claims.sub;
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
      const userId = req.user.claims.sub;
      const notifications2 = await storage.getUserNotifications(userId);
      res.json(notifications2);
    } catch (error) {
      console.error("Error fetching notifications:", error);
      res.status(500).json({ message: "Failed to fetch notifications" });
    }
  });
  app2.get("/api/notifications/unread-count", isAuthenticated, async (req, res) => {
    try {
      const userId = req.user.claims.sub;
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
      const userId = req.user.claims.sub;
      await storage.markAllNotificationsAsRead(userId);
      res.json({ message: "All notifications marked as read" });
    } catch (error) {
      console.error("Error marking all notifications as read:", error);
      res.status(500).json({ message: "Failed to mark all notifications as read" });
    }
  });
  app2.get("/api/dashboard/stats", isAuthenticated, async (req, res) => {
    try {
      const userId = req.user.claims.sub;
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
import fs from "fs";
import path2 from "path";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    ...process.env.NODE_ENV !== "production" && process.env.REPL_ID !== void 0 ? [
      await import("@replit/vite-plugin-cartographer").then(
        (m) => m.cartographer()
      ),
      await import("@replit/vite-plugin-dev-banner").then(
        (m) => m.devBanner()
      )
    ] : []
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets")
    }
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true
  },
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"]
    }
  }
});

// server/vite.ts
import { nanoid } from "nanoid";
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
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
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
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
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path2.resolve(distPath, "index.html"));
  });
}

// server/index.ts
import session from "express-session";
import passport2 from "passport";
var app = express2();
app.use(express2.json());
app.use(express2.urlencoded({ extended: false }));
app.use(session({
  secret: process.env.SESSION_SECRET || "dev-secret-key",
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === "production",
    // use secure cookies in production
    httpOnly: true,
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
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
    const port = parseInt(process.env.PORT || "5000", 10);
    server.listen(port, () => {
      log(`Server running at http://localhost:${port}`);
    });
  } else {
    serveStatic(app);
    if (!process.env.VERCEL && !process.env.REPL_ID) {
      const port = parseInt(process.env.PORT || "5000", 10);
      server.listen(port, () => {
        log(`Server running at http://localhost:${port}`);
      });
    }
  }
})();
var index_default = app;
export {
  index_default as default
};
