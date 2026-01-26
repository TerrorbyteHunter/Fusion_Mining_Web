var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc2) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc2 = __getOwnPropDesc(from, key)) || desc2.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// shared/schema.ts
var schema_exports = {};
__export(schema_exports, {
  activityLogs: () => activityLogs,
  activityLogsRelations: () => activityLogsRelations,
  activityTypeEnum: () => activityTypeEnum,
  adminAuditLogs: () => adminAuditLogs,
  adminPermissions: () => adminPermissions,
  adminPermissionsRelations: () => adminPermissionsRelations,
  adminRoleEnum: () => adminRoleEnum,
  blogPosts: () => blogPosts,
  blogPostsRelations: () => blogPostsRelations,
  buyerRequests: () => buyerRequests,
  buyerRequestsRelations: () => buyerRequestsRelations,
  contactSettings: () => contactSettings,
  contactSubmissions: () => contactSubmissions,
  documentTemplates: () => documentTemplates,
  emailTemplates: () => emailTemplates,
  expressInterest: () => expressInterest,
  expressInterestRelations: () => expressInterestRelations,
  insertActivityLogSchema: () => insertActivityLogSchema,
  insertAdminAuditLogSchema: () => insertAdminAuditLogSchema,
  insertAdminPermissionsSchema: () => insertAdminPermissionsSchema,
  insertBlogPostSchema: () => insertBlogPostSchema,
  insertBuyerRequestSchema: () => insertBuyerRequestSchema,
  insertContactSettingsSchema: () => insertContactSettingsSchema,
  insertContactSubmissionSchema: () => insertContactSubmissionSchema,
  insertDocumentTemplateSchema: () => insertDocumentTemplateSchema,
  insertEmailTemplateSchema: () => insertEmailTemplateSchema,
  insertExpressInterestSchema: () => insertExpressInterestSchema,
  insertLoginHistorySchema: () => insertLoginHistorySchema,
  insertMarketplaceListingSchema: () => insertMarketplaceListingSchema,
  insertMembershipBenefitSchema: () => insertMembershipBenefitSchema,
  insertMessageSchema: () => insertMessageSchema,
  insertMessageTemplateSchema: () => insertMessageTemplateSchema,
  insertMessageThreadSchema: () => insertMessageThreadSchema,
  insertNotificationSchema: () => insertNotificationSchema,
  insertPaymentMethodDetailsSchema: () => insertPaymentMethodDetailsSchema2,
  insertPlatformSettingSchema: () => insertPlatformSettingSchema,
  insertProjectSchema: () => insertProjectSchema,
  insertSellerVerificationDocumentSchema: () => insertSellerVerificationDocumentSchema,
  insertSellerVerificationRequestSchema: () => insertSellerVerificationRequestSchema,
  insertSettingsAuditSchema: () => insertSettingsAuditSchema,
  insertSustainabilityContentSchema: () => insertSustainabilityContentSchema2,
  insertTierUpgradePaymentSchema: () => insertTierUpgradePaymentSchema,
  insertTierUsageTrackingSchema: () => insertTierUsageTrackingSchema,
  insertTwoFactorAuthSchema: () => insertTwoFactorAuthSchema,
  insertUserProfileSchema: () => insertUserProfileSchema,
  insertVerificationRuleSchema: () => insertVerificationRuleSchema,
  insertVideoSchema: () => insertVideoSchema,
  licenseTypeEnum: () => licenseTypeEnum,
  listingStatusEnum: () => listingStatusEnum,
  listingTypeEnum: () => listingTypeEnum,
  loginHistory: () => loginHistory,
  mainCategoryEnum: () => mainCategoryEnum,
  marketplaceListings: () => marketplaceListings,
  marketplaceListingsRelations: () => marketplaceListingsRelations,
  membershipBenefits: () => membershipBenefits,
  membershipTierEnum: () => membershipTierEnum,
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
  paymentMethodDetails: () => paymentMethodDetails,
  paymentMethodEnum: () => paymentMethodEnum,
  platformSettings: () => platformSettings,
  ppeSubcategoryEnum: () => ppeSubcategoryEnum,
  profileTypeEnum: () => profileTypeEnum,
  projectStatusEnum: () => projectStatusEnum,
  projects: () => projects,
  projectsRelations: () => projectsRelations,
  sellerVerificationDocumentTypeEnum: () => sellerVerificationDocumentTypeEnum,
  sellerVerificationDocuments: () => sellerVerificationDocuments,
  sellerVerificationDocumentsRelations: () => sellerVerificationDocumentsRelations,
  sellerVerificationRequestStatusEnum: () => sellerVerificationRequestStatusEnum,
  sellerVerificationRequests: () => sellerVerificationRequests,
  sellerVerificationRequestsRelations: () => sellerVerificationRequestsRelations,
  serviceSubcategoryEnum: () => serviceSubcategoryEnum,
  sessions: () => sessions,
  settingDataTypeEnum: () => settingDataTypeEnum,
  settingsAudit: () => settingsAudit,
  sustainabilityContent: () => sustainabilityContent,
  templateTypeEnum: () => templateTypeEnum,
  threadStatusEnum: () => threadStatusEnum,
  threadTypeEnum: () => threadTypeEnum,
  ticketPriorityEnum: () => ticketPriorityEnum,
  ticketStatusEnum: () => ticketStatusEnum,
  tierUpgradePayments: () => tierUpgradePayments,
  tierUsageTracking: () => tierUsageTracking,
  tierUsageTrackingRelations: () => tierUsageTrackingRelations,
  toolSubcategoryEnum: () => toolSubcategoryEnum,
  twoFactorAuth: () => twoFactorAuth,
  updateAdminPermissionsSchema: () => updateAdminPermissionsSchema,
  updateContactSettingsSchema: () => updateContactSettingsSchema,
  updateDocumentTemplateSchema: () => updateDocumentTemplateSchema,
  updateEmailTemplateSchema: () => updateEmailTemplateSchema,
  updateMembershipBenefitSchema: () => updateMembershipBenefitSchema,
  updateMessageTemplateSchema: () => updateMessageTemplateSchema,
  updatePaymentMethodDetailsSchema: () => updatePaymentMethodDetailsSchema2,
  updatePlatformSettingSchema: () => updatePlatformSettingSchema,
  updateSellerVerificationRequestSchema: () => updateSellerVerificationRequestSchema,
  updateTierUpgradePaymentSchema: () => updateTierUpgradePaymentSchema,
  updateTierUsageTrackingSchema: () => updateTierUsageTrackingSchema,
  updateTwoFactorAuthSchema: () => updateTwoFactorAuthSchema,
  updateUserProfileSchema: () => updateUserProfileSchema,
  updateVerificationRuleSchema: () => updateVerificationRuleSchema,
  updateVideoSchema: () => updateVideoSchema,
  upsertUserSchema: () => upsertUserSchema,
  userProfiles: () => userProfiles,
  userProfilesRelations: () => userProfilesRelations,
  userRoleEnum: () => userRoleEnum,
  users: () => users,
  usersRelations: () => usersRelations,
  verificationQueue: () => verificationQueue,
  verificationQueueRelations: () => verificationQueueRelations,
  verificationRules: () => verificationRules,
  verificationStatusEnum: () => verificationStatusEnum,
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
  integer,
  decimal,
  boolean,
  pgEnum,
  unique
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
var sessions, userRoleEnum, adminRoleEnum, profileTypeEnum, membershipTierEnum, verificationStatusEnum, users, adminPermissions, userProfiles, licenseTypeEnum, projectStatusEnum, projects, expressInterest, listingTypeEnum, listingStatusEnum, mainCategoryEnum, mineralSubcategoryEnum, toolSubcategoryEnum, serviceSubcategoryEnum, ppeSubcategoryEnum, marketplaceListings, buyerRequests, threadStatusEnum, ticketStatusEnum, ticketPriorityEnum, messageContextEnum, threadTypeEnum, messageThreads, messages, messageIdempotency, templateTypeEnum, messageTemplates, blogPosts, contactSubmissions, sustainabilityContent, verificationQueue, activityTypeEnum, activityLogs, notificationTypeEnum, notifications, videos, contactSettings, settingDataTypeEnum, platformSettings, settingsAudit, emailTemplates, loginHistory, verificationRules, documentTemplates, adminAuditLogs, twoFactorAuth, membershipBenefits, tierUsageTracking, sellerVerificationRequestStatusEnum, sellerVerificationDocumentTypeEnum, sellerVerificationRequests, sellerVerificationDocuments, usersRelations, adminPermissionsRelations, userProfilesRelations, projectsRelations, expressInterestRelations, marketplaceListingsRelations, buyerRequestsRelations, messageThreadsRelations, messagesRelations, blogPostsRelations, verificationQueueRelations, activityLogsRelations, notificationsRelations, tierUsageTrackingRelations, sellerVerificationRequestsRelations, sellerVerificationDocumentsRelations, upsertUserSchema, insertAdminPermissionsSchema, updateAdminPermissionsSchema, insertUserProfileSchema, updateUserProfileSchema, insertProjectSchema, insertExpressInterestSchema, insertMarketplaceListingSchema, insertBuyerRequestSchema, insertMessageThreadSchema, insertMessageSchema, insertBlogPostSchema, insertContactSubmissionSchema, insertActivityLogSchema, insertNotificationSchema, insertVideoSchema, updateVideoSchema, insertSustainabilityContentSchema2, insertContactSettingsSchema, updateContactSettingsSchema, insertMembershipBenefitSchema, updateMembershipBenefitSchema, insertTierUsageTrackingSchema, updateTierUsageTrackingSchema, insertMessageTemplateSchema, updateMessageTemplateSchema, insertPlatformSettingSchema, updatePlatformSettingSchema, insertSettingsAuditSchema, insertEmailTemplateSchema, updateEmailTemplateSchema, insertLoginHistorySchema, insertVerificationRuleSchema, updateVerificationRuleSchema, insertDocumentTemplateSchema, updateDocumentTemplateSchema, insertAdminAuditLogSchema, insertTwoFactorAuthSchema, updateTwoFactorAuthSchema, insertSellerVerificationRequestSchema, updateSellerVerificationRequestSchema, insertSellerVerificationDocumentSchema, paymentMethodEnum, tierUpgradePayments, paymentMethodDetails, insertTierUpgradePaymentSchema, updateTierUpgradePaymentSchema, insertPaymentMethodDetailsSchema2, updatePaymentMethodDetailsSchema2;
var init_schema = __esm({
  "shared/schema.ts"() {
    "use strict";
    sessions = pgTable(
      "sessions",
      {
        sid: varchar("sid").primaryKey(),
        sess: jsonb("sess").notNull(),
        expire: timestamp("expire").notNull()
      },
      (table) => [index("IDX_session_expire").on(table.expire)]
    );
    userRoleEnum = pgEnum("user_role", ["admin", "buyer", "seller"]);
    adminRoleEnum = pgEnum("admin_role", ["super_admin", "verification_admin", "content_admin", "support_admin", "analytics_admin"]);
    profileTypeEnum = pgEnum("profile_type", ["individual", "company"]);
    membershipTierEnum = pgEnum("membership_tier", ["basic", "standard", "premium"]);
    verificationStatusEnum = pgEnum("verification_status", ["not_requested", "pending", "approved", "rejected"]);
    users = pgTable("users", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      clerkId: varchar("clerk_id").unique(),
      email: varchar("email").unique(),
      username: varchar("username").unique(),
      password: varchar("password"),
      firstName: varchar("first_name"),
      lastName: varchar("last_name"),
      profileImageUrl: varchar("profile_image_url"),
      role: userRoleEnum("role").notNull().default("buyer"),
      membershipTier: membershipTierEnum("membership_tier").notNull().default("basic"),
      verificationStatus: verificationStatusEnum("verification_status").notNull().default("not_requested"),
      badgeColor: varchar("badge_color"),
      createdAt: timestamp("created_at").defaultNow().notNull(),
      updatedAt: timestamp("updated_at").defaultNow().notNull()
    });
    adminPermissions = pgTable("admin_permissions", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      adminUserId: varchar("admin_user_id").notNull().references(() => users.id, { onDelete: "cascade" }).unique(),
      adminRole: adminRoleEnum("admin_role").notNull().default("content_admin"),
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
      updatedAt: timestamp("updated_at").defaultNow().notNull()
    });
    userProfiles = pgTable("user_profiles", {
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
    licenseTypeEnum = pgEnum("license_type", ["exploration", "mining", "processing"]);
    projectStatusEnum = pgEnum("project_status", ["active", "pending", "completed", "suspended", "closed"]);
    projects = pgTable("projects", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      // short human-friendly item id shown when project is published/active
      itemId: varchar("item_id", { length: 5 }),
      ownerId: varchar("owner_id").notNull().references(() => users.id, { onDelete: "cascade" }),
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
    expressInterest = pgTable("express_interest", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      projectId: varchar("project_id").references(() => projects.id, { onDelete: "cascade" }),
      listingId: varchar("listing_id").references(() => marketplaceListings.id, { onDelete: "cascade" }),
      userId: varchar("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
      message: text("message"),
      createdAt: timestamp("created_at").defaultNow().notNull()
    });
    listingTypeEnum = pgEnum("listing_type", ["mineral", "partnership", "project"]);
    listingStatusEnum = pgEnum("listing_status", ["pending", "approved", "rejected", "inactive", "closed"]);
    mainCategoryEnum = pgEnum("main_category", ["minerals", "mining_tools", "mining_services", "mining_ppe", "mining_equipment"]);
    mineralSubcategoryEnum = pgEnum("mineral_subcategory", ["metallic", "non_metallic", "marble_natural_stone", "gravel_sand_aggregate", "coal_peat", "other_minerals"]);
    toolSubcategoryEnum = pgEnum("tool_subcategory", ["drilling_equipment", "energy_machines", "engineering_devices", "heavy_equipment", "industrial_equipment", "marble_machinery", "ore_processing", "underground_mining", "other_tools"]);
    serviceSubcategoryEnum = pgEnum("service_subcategory", ["analysis_services", "consulting_advisory", "drilling_blasting", "exploration_surveying", "freight_services", "mine_extraction", "mineral_processing", "supply_chain", "other_services"]);
    ppeSubcategoryEnum = pgEnum("ppe_subcategory", ["head_face_protection", "respiratory_protection", "hand_foot_protection", "fall_protection", "protective_clothing", "other_ppe"]);
    marketplaceListings = pgTable("marketplace_listings", {
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
    buyerRequests = pgTable("buyer_requests", {
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
    threadStatusEnum = pgEnum("thread_status", ["open", "closed"]);
    ticketStatusEnum = pgEnum("ticket_status", ["open", "in_progress", "waiting_user", "resolved", "closed"]);
    ticketPriorityEnum = pgEnum("ticket_priority", ["low", "normal", "high", "urgent"]);
    messageContextEnum = pgEnum("message_context", ["marketplace", "project_interest", "general"]);
    threadTypeEnum = pgEnum("thread_type", ["project_interest", "marketplace_inquiry", "admin_to_seller", "admin_to_buyer", "general"]);
    messageThreads = pgTable("message_threads", {
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
      createdAt: timestamp("created_at").defaultNow().notNull(),
      // Support ticket fields (privacy-controlled)
      isAdminSupport: boolean("is_admin_support").notNull().default(false),
      assignedAdminId: varchar("assigned_admin_id").references(() => users.id, { onDelete: "set null" }),
      ticketStatus: ticketStatusEnum("ticket_status").default("open"),
      ticketPriority: ticketPriorityEnum("ticket_priority").default("normal"),
      resolvedAt: timestamp("resolved_at")
    }, (table) => [
      index("IDX_thread_buyer_id").on(table.buyerId),
      index("IDX_thread_seller_id").on(table.sellerId),
      index("IDX_thread_admin_id").on(table.adminId),
      index("IDX_thread_created_by").on(table.createdBy),
      index("IDX_thread_project_id").on(table.projectId),
      index("IDX_thread_listing_id").on(table.listingId),
      index("IDX_thread_context").on(table.context),
      index("IDX_thread_type").on(table.type),
      index("IDX_thread_is_admin_support").on(table.isAdminSupport),
      index("IDX_thread_ticket_status").on(table.ticketStatus)
    ]);
    messages = pgTable("messages", {
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
    messageIdempotency = pgTable("message_idempotency", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      key: varchar("key", { length: 255 }).notNull().unique(),
      messageId: varchar("message_id").notNull().references(() => messages.id, { onDelete: "cascade" }),
      createdAt: timestamp("created_at").defaultNow().notNull()
    });
    templateTypeEnum = pgEnum("template_type", ["buyer_interest_to_buyer", "buyer_interest_to_seller", "buyer_interest_to_admin"]);
    messageTemplates = pgTable("message_templates", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      name: varchar("name", { length: 255 }).notNull(),
      type: templateTypeEnum("type").notNull(),
      subject: varchar("subject", { length: 255 }).notNull(),
      content: text("content").notNull(),
      active: boolean("active").notNull().default(true),
      createdAt: timestamp("created_at").defaultNow().notNull(),
      updatedAt: timestamp("updated_at").defaultNow().notNull()
    });
    blogPosts = pgTable("blog_posts", {
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
    contactSubmissions = pgTable("contact_submissions", {
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
    sustainabilityContent = pgTable("sustainability_content", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      title: varchar("title", { length: 255 }).notNull(),
      section: varchar("section", { length: 255 }).notNull(),
      // e.g., "Environmental", "Community", "Social"
      content: text("content").notNull(),
      imageUrl: varchar("image_url"),
      order: integer("order").default(0),
      createdAt: timestamp("created_at").defaultNow().notNull(),
      updatedAt: timestamp("updated_at").defaultNow().notNull()
    });
    verificationQueue = pgTable("verification_queue", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      listingId: varchar("listing_id").notNull().references(() => marketplaceListings.id, { onDelete: "cascade" }).unique(),
      submittedAt: timestamp("submitted_at").defaultNow().notNull(),
      reviewedAt: timestamp("reviewed_at"),
      reviewedBy: varchar("reviewed_by").references(() => users.id),
      notes: text("notes")
    });
    activityTypeEnum = pgEnum("activity_type", ["login", "logout", "listing_created", "listing_approved", "listing_rejected", "message_sent", "interest_expressed", "profile_updated", "blog_post_created"]);
    activityLogs = pgTable("activity_logs", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      userId: varchar("user_id").references(() => users.id, { onDelete: "cascade" }),
      activityType: activityTypeEnum("activity_type").notNull(),
      description: text("description").notNull(),
      ipAddress: varchar("ip_address", { length: 45 }),
      userAgent: text("user_agent"),
      metadata: jsonb("metadata"),
      createdAt: timestamp("created_at").defaultNow().notNull()
    }, (table) => [index("IDX_activity_user_id").on(table.userId), index("IDX_activity_created_at").on(table.createdAt)]);
    notificationTypeEnum = pgEnum("notification_type", ["message", "listing_approved", "listing_rejected", "interest_received", "system"]);
    notifications = pgTable("notifications", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      userId: varchar("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
      type: notificationTypeEnum("type").notNull(),
      title: varchar("title", { length: 255 }).notNull(),
      message: text("message").notNull(),
      link: varchar("link"),
      read: boolean("read").notNull().default(false),
      createdAt: timestamp("created_at").defaultNow().notNull()
    }, (table) => [index("IDX_notification_user_id").on(table.userId), index("IDX_notification_read").on(table.read)]);
    videos = pgTable("videos", {
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
    contactSettings = pgTable("contact_settings", {
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
    settingDataTypeEnum = pgEnum("setting_data_type", ["boolean", "number", "string", "json"]);
    platformSettings = pgTable("platform_settings", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      key: varchar("key", { length: 100 }).notNull().unique(),
      value: text("value").notNull(),
      dataType: settingDataTypeEnum("data_type").notNull().default("string"),
      description: text("description"),
      category: varchar("category", { length: 50 }).notNull(),
      // 'general', 'payment', 'security', 'branding', etc.
      isPublic: boolean("is_public").notNull().default(false),
      updatedBy: varchar("updated_by").references(() => users.id),
      updatedAt: timestamp("updated_at").defaultNow().notNull()
    });
    settingsAudit = pgTable("settings_audit", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      settingKey: varchar("setting_key", { length: 100 }).notNull(),
      oldValue: text("old_value"),
      newValue: text("new_value").notNull(),
      changedBy: varchar("changed_by").notNull().references(() => users.id),
      changedAt: timestamp("changed_at").defaultNow().notNull()
    }, (table) => [
      index("IDX_settings_audit_key").on(table.settingKey),
      index("IDX_settings_audit_changed_by").on(table.changedBy),
      index("IDX_settings_audit_changed_at").on(table.changedAt)
    ]);
    emailTemplates = pgTable("email_templates", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      templateKey: varchar("template_key", { length: 100 }).notNull().unique(),
      subject: varchar("subject", { length: 255 }).notNull(),
      bodyHtml: text("body_html").notNull(),
      bodyText: text("body_text"),
      variables: text("variables").array(),
      // Available template variables
      active: boolean("active").notNull().default(true),
      createdAt: timestamp("created_at").defaultNow().notNull(),
      updatedAt: timestamp("updated_at").defaultNow().notNull()
    });
    loginHistory = pgTable("login_history", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      userId: varchar("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
      ipAddress: varchar("ip_address", { length: 45 }),
      userAgent: text("user_agent"),
      loginSuccess: boolean("login_success").notNull(),
      failureReason: varchar("failure_reason"),
      createdAt: timestamp("created_at").defaultNow().notNull()
    }, (table) => [
      index("IDX_login_user_id").on(table.userId),
      index("IDX_login_created").on(table.createdAt)
    ]);
    verificationRules = pgTable("verification_rules", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      ruleName: varchar("rule_name", { length: 100 }).notNull().unique(),
      description: text("description"),
      requiredFor: varchar("required_for", { length: 50 }).notNull(),
      // 'buyer', 'seller', 'both'
      documentTypes: text("document_types").array().notNull(),
      // ['passport', 'license', etc]
      minDocuments: integer("min_documents").notNull().default(1),
      autoApprove: boolean("auto_approve").notNull().default(false),
      active: boolean("active").notNull().default(true),
      createdAt: timestamp("created_at").defaultNow().notNull(),
      updatedAt: timestamp("updated_at").defaultNow().notNull()
    });
    documentTemplates = pgTable("document_templates", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      templateName: varchar("template_name", { length: 100 }).notNull(),
      documentType: varchar("document_type", { length: 50 }).notNull(),
      // 'contract', 'nda', 'terms', etc
      content: text("content").notNull(),
      variables: text("variables").array(),
      // Available merge fields
      version: varchar("version", { length: 20 }).notNull().default("1.0"),
      active: boolean("active").notNull().default(true),
      createdAt: timestamp("created_at").defaultNow().notNull(),
      updatedAt: timestamp("updated_at").defaultNow().notNull()
    });
    adminAuditLogs = pgTable("admin_audit_logs", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      adminId: varchar("admin_id").notNull().references(() => users.id, { onDelete: "cascade" }),
      action: varchar("action", { length: 100 }).notNull(),
      // 'user_deleted', 'settings_updated', etc
      targetType: varchar("target_type", { length: 50 }),
      // 'user', 'listing', 'project', etc
      targetId: varchar("target_id"),
      changes: jsonb("changes"),
      // Store before/after values
      ipAddress: varchar("ip_address", { length: 45 }),
      userAgent: text("user_agent"),
      createdAt: timestamp("created_at").defaultNow().notNull()
    }, (table) => [
      index("IDX_audit_admin_id").on(table.adminId),
      index("IDX_audit_created").on(table.createdAt),
      index("IDX_audit_action").on(table.action)
    ]);
    twoFactorAuth = pgTable("two_factor_auth", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      userId: varchar("user_id").notNull().references(() => users.id, { onDelete: "cascade" }).unique(),
      enabled: boolean("enabled").notNull().default(false),
      secret: varchar("secret"),
      // Encrypted TOTP secret
      backupCodes: text("backup_codes").array(),
      // Encrypted backup codes
      lastUsed: timestamp("last_used"),
      createdAt: timestamp("created_at").defaultNow().notNull(),
      updatedAt: timestamp("updated_at").defaultNow().notNull()
    });
    membershipBenefits = pgTable("membership_benefits", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      tier: membershipTierEnum("tier").notNull().unique(),
      maxActiveRFQs: integer("max_active_rfqs").notNull(),
      canAccessAnalytics: boolean("can_access_analytics").notNull().default(false),
      canDirectMessage: boolean("can_direct_message").notNull().default(false),
      prioritySupport: boolean("priority_support").notNull().default(false),
      visibilityRanking: integer("visibility_ranking").notNull(),
      // 1=highest, 3=lowest
      monthlyPrice: decimal("monthly_price", { precision: 10, scale: 2 }).notNull().default("0"),
      createdAt: timestamp("created_at").defaultNow().notNull(),
      updatedAt: timestamp("updated_at").defaultNow().notNull()
    });
    tierUsageTracking = pgTable("tier_usage_tracking", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      userId: varchar("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
      month: varchar("month", { length: 7 }).notNull(),
      // Format: "YYYY-MM"
      activeRFQsCount: integer("active_rfqs_count").notNull().default(0),
      messagesCount: integer("messages_count").notNull().default(0),
      analyticsViews: integer("analytics_views").notNull().default(0),
      createdAt: timestamp("created_at").defaultNow().notNull(),
      updatedAt: timestamp("updated_at").defaultNow().notNull()
    }, (table) => [
      index("IDX_usage_user_month").on(table.userId, table.month),
      unique("UNQ_user_month").on(table.userId, table.month)
    ]);
    sellerVerificationRequestStatusEnum = pgEnum("seller_verification_request_status", ["draft", "pending", "approved", "rejected"]);
    sellerVerificationDocumentTypeEnum = pgEnum("seller_verification_document_type", [
      "certificate_of_incorporation",
      "company_profile",
      "shareholder_list",
      "tax_certificate",
      "letter_of_authorization",
      "director_id"
    ]);
    sellerVerificationRequests = pgTable("seller_verification_requests", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      sellerId: varchar("seller_id").notNull().references(() => users.id, { onDelete: "cascade" }),
      status: sellerVerificationRequestStatusEnum("status").notNull().default("draft"),
      rejectionReason: text("rejection_reason"),
      submittedAt: timestamp("submitted_at").defaultNow().notNull(),
      reviewedAt: timestamp("reviewed_at"),
      reviewedBy: varchar("reviewed_by").references(() => users.id),
      createdAt: timestamp("created_at").defaultNow().notNull(),
      updatedAt: timestamp("updated_at").defaultNow().notNull()
    }, (table) => [
      index("IDX_verification_seller_id").on(table.sellerId),
      index("IDX_verification_status").on(table.status)
    ]);
    sellerVerificationDocuments = pgTable("seller_verification_documents", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      requestId: varchar("request_id").notNull().references(() => sellerVerificationRequests.id, { onDelete: "cascade" }),
      documentType: sellerVerificationDocumentTypeEnum("document_type").notNull(),
      fileName: varchar("file_name", { length: 255 }).notNull(),
      filePath: text("file_path").notNull(),
      fileSize: integer("file_size"),
      mimeType: varchar("mime_type", { length: 100 }),
      uploadedAt: timestamp("uploaded_at").defaultNow().notNull()
    }, (table) => [
      index("IDX_verification_doc_request_id").on(table.requestId)
    ]);
    usersRelations = relations(users, ({ one, many }) => ({
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
      notifications: many(notifications),
      tierUsage: many(tierUsageTracking),
      verificationRequests: many(sellerVerificationRequests)
    }));
    adminPermissionsRelations = relations(adminPermissions, ({ one }) => ({
      adminUser: one(users, {
        fields: [adminPermissions.adminUserId],
        references: [users.id]
      })
    }));
    userProfilesRelations = relations(userProfiles, ({ one }) => ({
      user: one(users, {
        fields: [userProfiles.userId],
        references: [users.id]
      })
    }));
    projectsRelations = relations(projects, ({ many }) => ({
      interests: many(expressInterest)
    }));
    expressInterestRelations = relations(expressInterest, ({ one }) => ({
      project: one(projects, {
        fields: [expressInterest.projectId],
        references: [projects.id]
      }),
      user: one(users, {
        fields: [expressInterest.userId],
        references: [users.id]
      })
    }));
    marketplaceListingsRelations = relations(marketplaceListings, ({ one }) => ({
      seller: one(users, {
        fields: [marketplaceListings.sellerId],
        references: [users.id]
      }),
      verification: one(verificationQueue, {
        fields: [marketplaceListings.id],
        references: [verificationQueue.listingId]
      })
    }));
    buyerRequestsRelations = relations(buyerRequests, ({ one }) => ({
      buyer: one(users, {
        fields: [buyerRequests.buyerId],
        references: [users.id]
      })
    }));
    messageThreadsRelations = relations(messageThreads, ({ one, many }) => ({
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
    messagesRelations = relations(messages, ({ one }) => ({
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
    blogPostsRelations = relations(blogPosts, ({ one }) => ({
      author: one(users, {
        fields: [blogPosts.authorId],
        references: [users.id]
      })
    }));
    verificationQueueRelations = relations(verificationQueue, ({ one }) => ({
      listing: one(marketplaceListings, {
        fields: [verificationQueue.listingId],
        references: [marketplaceListings.id]
      }),
      reviewer: one(users, {
        fields: [verificationQueue.reviewedBy],
        references: [users.id]
      })
    }));
    activityLogsRelations = relations(activityLogs, ({ one }) => ({
      user: one(users, {
        fields: [activityLogs.userId],
        references: [users.id]
      })
    }));
    notificationsRelations = relations(notifications, ({ one }) => ({
      user: one(users, {
        fields: [notifications.userId],
        references: [users.id]
      })
    }));
    tierUsageTrackingRelations = relations(tierUsageTracking, ({ one }) => ({
      user: one(users, {
        fields: [tierUsageTracking.userId],
        references: [users.id]
      })
    }));
    sellerVerificationRequestsRelations = relations(sellerVerificationRequests, ({ one, many }) => ({
      seller: one(users, {
        fields: [sellerVerificationRequests.sellerId],
        references: [users.id]
      }),
      reviewer: one(users, {
        fields: [sellerVerificationRequests.reviewedBy],
        references: [users.id]
      }),
      documents: many(sellerVerificationDocuments)
    }));
    sellerVerificationDocumentsRelations = relations(sellerVerificationDocuments, ({ one }) => ({
      request: one(sellerVerificationRequests, {
        fields: [sellerVerificationDocuments.requestId],
        references: [sellerVerificationRequests.id]
      })
    }));
    upsertUserSchema = createInsertSchema(users).pick({
      id: true,
      email: true,
      password: true,
      firstName: true,
      lastName: true,
      profileImageUrl: true
    });
    insertAdminPermissionsSchema = createInsertSchema(adminPermissions).omit({
      id: true,
      createdAt: true,
      updatedAt: true
    });
    updateAdminPermissionsSchema = createInsertSchema(adminPermissions).omit({
      createdAt: true,
      updatedAt: true
    }).partial().required({ adminUserId: true });
    insertUserProfileSchema = createInsertSchema(userProfiles).omit({
      id: true,
      createdAt: true,
      updatedAt: true
    });
    updateUserProfileSchema = insertUserProfileSchema.partial().required({ userId: true });
    insertProjectSchema = createInsertSchema(projects).omit({
      id: true,
      itemId: true,
      createdAt: true,
      updatedAt: true
    }).extend({
      ownerId: z.string().optional()
      // Optional since it will be set from authenticated user
    });
    insertExpressInterestSchema = createInsertSchema(expressInterest).omit({
      id: true,
      createdAt: true
    });
    insertMarketplaceListingSchema = createInsertSchema(marketplaceListings).omit({
      id: true,
      status: true,
      createdAt: true,
      updatedAt: true
    });
    insertBuyerRequestSchema = createInsertSchema(buyerRequests).omit({
      id: true,
      status: true,
      createdAt: true,
      updatedAt: true
    });
    insertMessageThreadSchema = createInsertSchema(messageThreads).omit({
      id: true,
      lastMessageAt: true,
      createdAt: true
    });
    insertMessageSchema = createInsertSchema(messages).omit({
      id: true,
      read: true,
      createdAt: true
    });
    insertBlogPostSchema = createInsertSchema(blogPosts).omit({
      id: true,
      published: true,
      createdAt: true,
      updatedAt: true
    });
    insertContactSubmissionSchema = createInsertSchema(contactSubmissions).omit({
      id: true,
      status: true,
      createdAt: true
    });
    insertActivityLogSchema = createInsertSchema(activityLogs).omit({
      id: true,
      createdAt: true
    });
    insertNotificationSchema = createInsertSchema(notifications).omit({
      id: true,
      read: true,
      createdAt: true
    });
    insertVideoSchema = createInsertSchema(videos).omit({
      id: true,
      createdAt: true,
      updatedAt: true
    });
    updateVideoSchema = createInsertSchema(videos).omit({
      createdAt: true,
      updatedAt: true
    }).partial().required({ id: true });
    insertSustainabilityContentSchema2 = createInsertSchema(sustainabilityContent).omit({
      id: true,
      createdAt: true,
      updatedAt: true
    });
    insertContactSettingsSchema = createInsertSchema(contactSettings).omit({
      id: true,
      updatedAt: true
    });
    updateContactSettingsSchema = createInsertSchema(contactSettings).omit({
      updatedAt: true
    }).partial().required({ id: true });
    insertMembershipBenefitSchema = createInsertSchema(membershipBenefits).omit({
      id: true,
      createdAt: true,
      updatedAt: true
    });
    updateMembershipBenefitSchema = createInsertSchema(membershipBenefits).omit({
      createdAt: true,
      updatedAt: true
    }).partial().required({ id: true });
    insertTierUsageTrackingSchema = createInsertSchema(tierUsageTracking).omit({
      id: true,
      createdAt: true,
      updatedAt: true
    });
    updateTierUsageTrackingSchema = createInsertSchema(tierUsageTracking).omit({
      createdAt: true,
      updatedAt: true
    }).partial().required({ id: true });
    insertMessageTemplateSchema = createInsertSchema(messageTemplates).omit({
      id: true,
      createdAt: true,
      updatedAt: true
    });
    updateMessageTemplateSchema = createInsertSchema(messageTemplates).omit({
      createdAt: true,
      updatedAt: true
    }).partial().required({ id: true });
    insertPlatformSettingSchema = createInsertSchema(platformSettings).omit({
      id: true,
      updatedAt: true
    });
    updatePlatformSettingSchema = createInsertSchema(platformSettings).omit({
      updatedAt: true
    }).partial().required({ id: true });
    insertSettingsAuditSchema = createInsertSchema(settingsAudit).omit({
      id: true,
      changedAt: true
    });
    insertEmailTemplateSchema = createInsertSchema(emailTemplates).omit({
      id: true,
      createdAt: true,
      updatedAt: true
    });
    updateEmailTemplateSchema = createInsertSchema(emailTemplates).omit({
      createdAt: true,
      updatedAt: true
    }).partial().required({ id: true });
    insertLoginHistorySchema = createInsertSchema(loginHistory).omit({
      id: true,
      createdAt: true
    });
    insertVerificationRuleSchema = createInsertSchema(verificationRules).omit({
      id: true,
      createdAt: true,
      updatedAt: true
    });
    updateVerificationRuleSchema = createInsertSchema(verificationRules).omit({
      createdAt: true,
      updatedAt: true
    }).partial().required({ id: true });
    insertDocumentTemplateSchema = createInsertSchema(documentTemplates).omit({
      id: true,
      createdAt: true,
      updatedAt: true
    });
    updateDocumentTemplateSchema = createInsertSchema(documentTemplates).omit({
      createdAt: true,
      updatedAt: true
    }).partial().required({ id: true });
    insertAdminAuditLogSchema = createInsertSchema(adminAuditLogs).omit({
      id: true,
      createdAt: true
    });
    insertTwoFactorAuthSchema = createInsertSchema(twoFactorAuth).omit({
      id: true,
      createdAt: true,
      updatedAt: true
    });
    updateTwoFactorAuthSchema = createInsertSchema(twoFactorAuth).omit({
      createdAt: true,
      updatedAt: true
    }).partial().required({ id: true });
    insertSellerVerificationRequestSchema = createInsertSchema(sellerVerificationRequests).omit({
      id: true,
      submittedAt: true,
      reviewedAt: true,
      createdAt: true,
      updatedAt: true
    });
    updateSellerVerificationRequestSchema = createInsertSchema(sellerVerificationRequests).omit({
      submittedAt: true,
      createdAt: true,
      updatedAt: true
    }).partial().required({ id: true });
    insertSellerVerificationDocumentSchema = createInsertSchema(sellerVerificationDocuments).omit({
      id: true,
      uploadedAt: true
    });
    paymentMethodEnum = pgEnum("payment_method", ["bank_transfer", "airtel_money", "wechat_alipay"]);
    tierUpgradePayments = pgTable("tier_upgrade_payments", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      upgradeRequestId: varchar("upgrade_request_id").notNull(),
      userId: varchar("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
      requestedTier: membershipTierEnum("requested_tier").notNull(),
      paymentMethod: paymentMethodEnum("payment_method").notNull(),
      amountUSD: decimal("amount_usd", { precision: 10, scale: 2 }).notNull(),
      // Original USD amount
      amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
      // Converted amount in local currency
      currency: varchar("currency").notNull().default("ZMW"),
      // Local currency code
      status: varchar("status").notNull().default("pending"),
      // pending, paid, verified, rejected
      paymentDetails: jsonb("payment_details"),
      // Store payment method specific details
      proofOfPaymentUrl: varchar("proof_of_payment_url"),
      submittedAt: timestamp("submitted_at").defaultNow().notNull(),
      verifiedAt: timestamp("verified_at"),
      verifiedBy: varchar("verified_by").references(() => users.id),
      rejectionReason: text("rejection_reason"),
      createdAt: timestamp("created_at").defaultNow().notNull(),
      updatedAt: timestamp("updated_at").defaultNow().notNull()
    });
    paymentMethodDetails = pgTable("payment_method_details", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      method: paymentMethodEnum("method").notNull().unique(),
      name: varchar("name").notNull(),
      description: text("description"),
      instructions: text("instructions"),
      accountDetails: jsonb("account_details"),
      // Store account numbers, names, etc.
      currencyCode: varchar("currency_code").notNull().default("USD"),
      // ISO 4217 currency code
      currencyName: varchar("currency_name").notNull().default("US Dollar"),
      // Full currency name
      isActive: boolean("is_active").notNull().default(true),
      createdAt: timestamp("created_at").defaultNow().notNull(),
      updatedAt: timestamp("updated_at").defaultNow().notNull()
    });
    insertTierUpgradePaymentSchema = createInsertSchema(tierUpgradePayments).omit({
      id: true,
      submittedAt: true,
      verifiedAt: true,
      createdAt: true,
      updatedAt: true
    });
    updateTierUpgradePaymentSchema = createInsertSchema(tierUpgradePayments).omit({
      submittedAt: true,
      createdAt: true,
      updatedAt: true
    }).partial().required({ id: true });
    insertPaymentMethodDetailsSchema2 = createInsertSchema(paymentMethodDetails).omit({
      id: true,
      createdAt: true,
      updatedAt: true
    });
    updatePaymentMethodDetailsSchema2 = createInsertSchema(paymentMethodDetails).omit({
      createdAt: true,
      updatedAt: true
    }).partial().required({ id: true });
  }
});

// server/db.ts
import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
var pool, db;
var init_db = __esm({
  "server/db.ts"() {
    "use strict";
    init_schema();
    if (!process.env.DATABASE_URL) {
      throw new Error("DATABASE_URL is not defined. Please provision a database.");
    }
    pool = new Pool({
      connectionString: process.env.DATABASE_URL
    });
    db = drizzle(pool, { schema: schema_exports });
  }
});

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
var DatabaseStorage, storage;
var init_storage = __esm({
  "server/storage.ts"() {
    "use strict";
    init_schema();
    init_db();
    DatabaseStorage = class {
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
      async getUserByEmail(email) {
        const [user] = await db.select().from(users).where(eq(users.email, email));
        return user;
      }
      async getUserByUsername(username) {
        const [user] = await db.select().from(users).where(eq(users.username, username));
        return user;
      }
      async getUserByClerkId(clerkId) {
        const [user] = await db.select().from(users).where(eq(users.clerkId, clerkId));
        return user;
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
            const updateData = {
              firstName: userData.firstName,
              lastName: userData.lastName,
              profileImageUrl: userData.profileImageUrl,
              updatedAt: /* @__PURE__ */ new Date()
            };
            if (userData.password) {
              updateData.password = userData.password;
            }
            const [user2] = await db.update(users).set(updateData).where(eq(users.email, userData.email)).returning();
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
        const dataToInsert = { ...projectData };
        if (!dataToInsert.itemId && dataToInsert.status === "active") {
          dataToInsert.itemId = await generateUniqueItemId(db);
        }
        const [project] = await db.insert(projects).values(dataToInsert).returning();
        return project;
      }
      async getProjects() {
        const results = await db.select({
          project: projects,
          owner: {
            id: users.id,
            firstName: users.firstName,
            lastName: users.lastName,
            email: users.email
          },
          profile: userProfiles
        }).from(projects).leftJoin(users, eq(projects.ownerId, users.id)).leftJoin(userProfiles, eq(users.id, userProfiles.userId)).orderBy(desc(projects.createdAt));
        return results.map((r) => ({
          ...r.project,
          owner: r.owner ? { ...r.owner, verified: r.profile?.verified ?? false } : null
        }));
      }
      async getProjectById(id) {
        const results = await db.select({
          project: projects,
          owner: {
            id: users.id,
            firstName: users.firstName,
            lastName: users.lastName,
            email: users.email
          },
          profile: userProfiles
        }).from(projects).leftJoin(users, eq(projects.ownerId, users.id)).leftJoin(userProfiles, eq(users.id, userProfiles.userId)).where(eq(projects.id, id));
        if (results.length === 0) {
          return void 0;
        }
        return {
          ...results[0].project,
          owner: results[0].owner ? { ...results[0].owner, verified: results[0].profile?.verified ?? false } : null
        };
      }
      async updateProject(id, data) {
        const updateData = { ...data, updatedAt: /* @__PURE__ */ new Date() };
        if (data.status === "active") {
          const [existing] = await db.select().from(projects).where(eq(projects.id, id)).limit(1);
          if (existing && !existing.itemId) {
            updateData.itemId = await generateUniqueItemId(db);
          }
        }
        const [project] = await db.update(projects).set(updateData).where(eq(projects.id, id)).returning();
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
        let whereConditions;
        if (filters?.type && filters?.status) {
          whereConditions = and(
            eq(marketplaceListings.type, filters.type),
            eq(marketplaceListings.status, filters.status)
          );
        } else if (filters?.type) {
          whereConditions = eq(marketplaceListings.type, filters.type);
        } else if (filters?.status) {
          whereConditions = eq(marketplaceListings.status, filters.status);
        }
        let query = db.select({
          listing: marketplaceListings,
          seller: {
            id: users.id,
            firstName: users.firstName,
            lastName: users.lastName,
            email: users.email
          },
          profile: userProfiles
        }).from(marketplaceListings).leftJoin(users, eq(marketplaceListings.sellerId, users.id)).leftJoin(userProfiles, eq(users.id, userProfiles.userId));
        if (whereConditions) {
          query = query.where(whereConditions);
        }
        const results = await query.orderBy(desc(marketplaceListings.createdAt));
        return results.map((r) => ({
          ...r.listing,
          seller: r.seller ? { ...r.seller, verified: r.profile?.verified ?? false } : null
        }));
      }
      async getMarketplaceListingById(id) {
        const results = await db.select({
          listing: marketplaceListings,
          seller: {
            id: users.id,
            firstName: users.firstName,
            lastName: users.lastName,
            email: users.email
          },
          profile: userProfiles
        }).from(marketplaceListings).leftJoin(users, eq(marketplaceListings.sellerId, users.id)).leftJoin(userProfiles, eq(users.id, userProfiles.userId)).where(eq(marketplaceListings.id, id));
        if (results.length === 0) {
          return void 0;
        }
        return {
          ...results[0].listing,
          seller: results[0].seller ? { ...results[0].seller, verified: results[0].profile?.verified ?? false } : null
        };
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
      async updateBuyerRequestStatus(id, status) {
        const [updated] = await db.update(buyerRequests).set({
          status,
          updatedAt: /* @__PURE__ */ new Date()
        }).where(eq(buyerRequests.id, id)).returning();
        return updated;
      }
      // ========================================================================
      // Message Thread operations
      // ========================================================================
      async createMessageThread(threadData) {
        const [thread2] = await db.insert(messageThreads).values(threadData).returning();
        return thread2;
      }
      async getThreadById(id) {
        const [thread2] = await db.select().from(messageThreads).where(eq(messageThreads.id, id));
        return thread2;
      }
      async getThreadWithParticipants(id) {
        const thread2 = await this.getThreadById(id);
        if (!thread2) return null;
        const [listing] = thread2.listingId ? await db.select().from(marketplaceListings).where(eq(marketplaceListings.id, thread2.listingId)).limit(1) : [null];
        const [project] = thread2.projectId ? await db.select().from(projects).where(eq(projects.id, thread2.projectId)).limit(1) : [null];
        const buyer = thread2.buyerId ? await this.getUserById(thread2.buyerId) : null;
        const buyerProfile = thread2.buyerId ? await this.getUserProfile(thread2.buyerId) : null;
        const seller = thread2.sellerId ? await this.getUserById(thread2.sellerId) : null;
        const sellerProfile = thread2.sellerId ? await this.getUserProfile(thread2.sellerId) : null;
        return {
          thread: thread2,
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
          const { thread: thread2, listing, project, buyerFirstName, buyerLastName, sellerFirstName, sellerLastName } = r;
          const thread_without_context = {
            ...thread2,
            // Explicitly omit the context field
            id: thread2.id,
            title: thread2.title,
            projectId: thread2.projectId,
            listingId: thread2.listingId,
            buyerId: thread2.buyerId,
            sellerId: thread2.sellerId,
            status: thread2.status,
            lastMessageAt: thread2.lastMessageAt,
            createdAt: thread2.createdAt
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
        const [thread2] = await db.update(messageThreads).set({ status: "closed" }).where(eq(messageThreads.id, threadId)).returning();
        return thread2;
      }
      // ========================================================================
      // Support Ticket Operations (Privacy-Controlled)
      // ========================================================================
      /**
       * Get admin support tickets (ONLY threads marked as admin support).
       * Privacy: Admins can ONLY see support tickets, never buyer-seller conversations
       */
      async getAdminSupportTickets(filters) {
        let query = db.select().from(messageThreads).where(eq(messageThreads.isAdminSupport, true));
        if (filters?.status) {
          query = query.where(eq(messageThreads.ticketStatus, filters.status));
        }
        if (filters?.priority) {
          query = query.where(eq(messageThreads.ticketPriority, filters.priority));
        }
        if (filters?.assignedAdminId) {
          query = query.where(eq(messageThreads.assignedAdminId, filters.assignedAdminId));
        }
        return await query.orderBy(desc(messageThreads.lastMessageAt));
      }
      /**
       * Claim a support ticket (assign to an admin).
       * Changes ticketStatus to 'in_progress'
       */
      async claimSupportTicket(ticketId, adminId) {
        const [thread2] = await db.update(messageThreads).set({
          assignedAdminId: adminId,
          ticketStatus: "in_progress"
        }).where(and(
          eq(messageThreads.id, ticketId),
          eq(messageThreads.isAdminSupport, true)
        )).returning();
        return thread2;
      }
      /**
       * Resolve a support ticket with optional notes.
       * Changes ticketStatus to 'resolved'
       */
      async resolveSupportTicket(ticketId, notes) {
        const [thread2] = await db.update(messageThreads).set({
          ticketStatus: "resolved",
          resolvedAt: /* @__PURE__ */ new Date()
        }).where(and(
          eq(messageThreads.id, ticketId),
          eq(messageThreads.isAdminSupport, true)
        )).returning();
        return thread2;
      }
      /**
       * Create a new support ticket (user-initiated).
       * User can contact admin about account/verification/payment issues
       */
      async createSupportTicket(userId, title, description, priority = "normal") {
        const [thread2] = await db.insert(messageThreads).values({
          title,
          type: "general",
          createdBy: userId,
          buyerId: userId,
          context: "general",
          status: "open",
          isAdminSupport: true,
          ticketStatus: "open",
          ticketPriority: priority
        }).returning();
        return thread2;
      }
      /**
       * Update a support ticket's status.
       */
      async updateTicketStatus(ticketId, status) {
        const [thread2] = await db.update(messageThreads).set({
          ticketStatus: status
        }).where(and(
          eq(messageThreads.id, ticketId),
          eq(messageThreads.isAdminSupport, true)
        )).returning();
        return thread2;
      }
      /**
       * Update a support ticket's priority.
       */
      async updateTicketPriority(ticketId, priority) {
        const [thread2] = await db.update(messageThreads).set({
          ticketPriority: priority
        }).where(and(
          eq(messageThreads.id, ticketId),
          eq(messageThreads.isAdminSupport, true)
        )).returning();
        return thread2;
      }
      /**
       * Update a support ticket's assigned admin.
       */
      async updateTicketAssignee(ticketId, adminId) {
        const [thread2] = await db.update(messageThreads).set({
          assignedAdminId: adminId
        }).where(and(
          eq(messageThreads.id, ticketId),
          eq(messageThreads.isAdminSupport, true)
        )).returning();
        return thread2;
      }
      /**
       * Return analytics summary: user role counts, listing status counts,
       * and simple weekly activity aggregates (last 4 weeks).
       */
      async getAnalyticsSummary() {
        const allUsers = await db.select().from(users);
        const allListings = await db.select().from(marketplaceListings);
        const allMessages = await db.select().from(messages);
        const usersByRole = {
          buyers: allUsers.filter((u) => (u.role || "").toLowerCase() === "buyer").length,
          sellers: allUsers.filter((u) => (u.role || "").toLowerCase() === "seller").length,
          admins: allUsers.filter((u) => (u.role || "").toLowerCase() === "admin").length
        };
        const listingsByStatus = {
          approved: allListings.filter((l) => (l.status || "").toLowerCase() === "approved").length,
          pending: allListings.filter((l) => (l.status || "").toLowerCase() === "pending").length,
          total: allListings.length
        };
        const now = /* @__PURE__ */ new Date();
        const currentWeekStart = new Date(now);
        currentWeekStart.setHours(0, 0, 0, 0);
        currentWeekStart.setDate(currentWeekStart.getDate() - currentWeekStart.getDay());
        const weeklyActivity = [];
        for (let i = 3; i >= 0; i--) {
          const start = new Date(currentWeekStart);
          start.setDate(start.getDate() - 7 * i);
          const end = new Date(start);
          end.setDate(start.getDate() + 7);
          const listingsCount = allListings.filter((l) => {
            const c = l.createdAt ? new Date(l.createdAt) : null;
            return c && c >= start && c < end;
          }).length;
          const messagesCount = allMessages.filter((m) => {
            const c = m.createdAt ? new Date(m.createdAt) : null;
            return c && c >= start && c < end;
          }).length;
          const usersCount = allUsers.filter((u) => {
            const c = u.createdAt ? new Date(u.createdAt) : null;
            return c && c >= start && c < end;
          }).length;
          weeklyActivity.push({
            week: `${start.toISOString().slice(0, 10)}`,
            listings: listingsCount,
            messages: messagesCount,
            users: usersCount
          });
        }
        return {
          usersByRole,
          listingsByStatus,
          weeklyActivity
        };
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
        const payload = {
          ...result[0],
          conversation: conversationMessages
        };
        try {
          const content = mainMessage && (mainMessage.content || "");
          const m = content.match(/Contact submission from\s+([^<\n]+)\s*<([^>]+)>[\s\S]*?Phone:\s*([^\n\r]*)[\s\S]*?\n\n([\s\S]*?)(?:\n\nView (?:submission|thread):\s*[^\s]+(?:id=|\?threadId=)([a-f0-9\-]+))?/i);
          if (m) {
            payload.contactSubmission = {
              name: (m[1] || "").trim(),
              email: (m[2] || "").trim(),
              phone: (m[3] || "").trim(),
              message: (m[4] || "").trim(),
              submissionId: m[5] || void 0
            };
          }
        } catch (err) {
        }
        return payload;
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
        const results = await db.select({
          id: activityLogs.id,
          userId: activityLogs.userId,
          activityType: activityLogs.activityType,
          description: activityLogs.description,
          ipAddress: activityLogs.ipAddress,
          userAgent: activityLogs.userAgent,
          metadata: activityLogs.metadata,
          createdAt: activityLogs.createdAt,
          user: {
            id: users.id,
            email: users.email,
            username: users.username,
            firstName: users.firstName,
            lastName: users.lastName,
            role: users.role,
            profileImageUrl: users.profileImageUrl
          }
        }).from(activityLogs).leftJoin(users, eq(activityLogs.userId, users.id)).orderBy(desc(activityLogs.createdAt)).limit(limit);
        return results.map((r) => ({
          id: r.id,
          userId: r.userId,
          activityType: r.activityType,
          description: r.description,
          ipAddress: r.ipAddress,
          userAgent: r.userAgent,
          metadata: r.metadata,
          createdAt: r.createdAt,
          user: r.user?.id ? r.user : null
        }));
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
      // Sustainability Content operations
      // ========================================================================
      async createSustainabilityContent(content) {
        const [item] = await db.insert(sustainabilityContent).values(content).returning();
        return item;
      }
      async getSustainabilityContent() {
        try {
          return await db.select().from(sustainabilityContent).orderBy(sustainabilityContent.order);
        } catch (err) {
          if (err?.code === "42P01") return [];
          throw err;
        }
      }
      async getSustainabilityContentById(id) {
        try {
          const [item] = await db.select().from(sustainabilityContent).where(eq(sustainabilityContent.id, id)).limit(1);
          return item;
        } catch (err) {
          if (err?.code === "42P01") return void 0;
          throw err;
        }
      }
      async updateSustainabilityContent(id, content) {
        const [item] = await db.update(sustainabilityContent).set(content).where(eq(sustainabilityContent.id, id)).returning();
        return item;
      }
      async deleteSustainabilityContent(id) {
        await db.delete(sustainabilityContent).where(eq(sustainabilityContent.id, id));
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
      // ========================================================================
      // Membership Benefit operations
      // ========================================================================
      async createMembershipBenefit(benefitData) {
        const [benefit] = await db.insert(membershipBenefits).values(benefitData).returning();
        return benefit;
      }
      async getAllMembershipBenefits() {
        return await db.select().from(membershipBenefits).orderBy(membershipBenefits.visibilityRanking);
      }
      async getMembershipBenefitByTier(tier) {
        const [benefit] = await db.select().from(membershipBenefits).where(eq(membershipBenefits.tier, tier)).limit(1);
        return benefit;
      }
      async updateMembershipBenefit(tier, benefitData) {
        const [updated] = await db.update(membershipBenefits).set({
          ...benefitData,
          updatedAt: /* @__PURE__ */ new Date()
        }).where(eq(membershipBenefits.tier, tier)).returning();
        return updated;
      }
      async updateUserMembershipTier(userId, tier) {
        const [updated] = await db.update(users).set({
          membershipTier: tier,
          updatedAt: /* @__PURE__ */ new Date()
        }).where(eq(users.id, userId)).returning();
        return updated;
      }
      // ========================================================================
      // Tier Usage Tracking operations
      // ========================================================================
      async getUserTierUsage(userId, month) {
        const [usage] = await db.select().from(tierUsageTracking).where(and(
          eq(tierUsageTracking.userId, userId),
          eq(tierUsageTracking.month, month)
        )).limit(1);
        return usage;
      }
      async incrementUserRFQCount(userId, month) {
        const existing = await this.getUserTierUsage(userId, month);
        if (existing) {
          await db.update(tierUsageTracking).set({
            activeRFQsCount: sql2`${tierUsageTracking.activeRFQsCount} + 1`,
            updatedAt: /* @__PURE__ */ new Date()
          }).where(eq(tierUsageTracking.id, existing.id));
        } else {
          await db.insert(tierUsageTracking).values({
            userId,
            month,
            activeRFQsCount: 1,
            messagesCount: 0,
            analyticsViews: 0
          });
        }
      }
      async getUserActiveRFQCount(userId) {
        const result = await db.select({ count: sql2`count(*)::int` }).from(buyerRequests).where(and(
          eq(buyerRequests.buyerId, userId),
          eq(buyerRequests.status, "active")
        ));
        return result[0]?.count || 0;
      }
      async checkUserCanCreateRFQ(userId) {
        const user = await this.getUser(userId);
        if (!user) {
          return { allowed: false, reason: "User not found" };
        }
        const benefit = await this.getMembershipBenefitByTier(user.membershipTier);
        if (!benefit) {
          return { allowed: false, reason: "Membership tier not configured" };
        }
        if (benefit.maxActiveRFQs === -1) {
          return { allowed: true };
        }
        const activeCount = await this.getUserActiveRFQCount(userId);
        if (activeCount >= benefit.maxActiveRFQs) {
          return {
            allowed: false,
            reason: `You have reached your ${user.membershipTier} tier limit of ${benefit.maxActiveRFQs} active RFQ${benefit.maxActiveRFQs > 1 ? "s" : ""}. Upgrade to create more RFQs.`
          };
        }
        return { allowed: true };
      }
      // ========================================================================
      // Platform Settings operations
      // ========================================================================
      async getAllPlatformSettings() {
        try {
          return await db.select().from(platformSettings).orderBy(desc(platformSettings.updatedAt));
        } catch (err) {
          if (err?.code === "42P01") return [];
          throw err;
        }
      }
      async createPlatformSetting(setting) {
        try {
          const [created] = await db.insert(platformSettings).values(setting).returning();
          return created;
        } catch (err) {
          if (err?.code === "42P01") throw new Error("Platform settings table missing");
          throw err;
        }
      }
      async updatePlatformSetting(setting) {
        try {
          const { id, ...updates } = setting;
          const [updated] = await db.update(platformSettings).set({ ...updates, updatedAt: /* @__PURE__ */ new Date() }).where(eq(platformSettings.id, id)).returning();
          return updated;
        } catch (err) {
          if (err?.code === "42P01") throw new Error("Platform settings table missing");
          throw err;
        }
      }
      async deletePlatformSetting(id) {
        try {
          await db.delete(platformSettings).where(eq(platformSettings.id, id));
        } catch (err) {
          if (err?.code === "42P01") return;
          throw err;
        }
      }
      async getPlatformSettingByKey(key) {
        try {
          const [setting] = await db.select().from(platformSettings).where(eq(platformSettings.key, key)).limit(1);
          return setting;
        } catch (err) {
          if (err?.code === "42P01") return void 0;
          throw err;
        }
      }
      async getPlatformSettingsByCategory(category) {
        try {
          return await db.select().from(platformSettings).where(eq(platformSettings.category, category)).orderBy(platformSettings.key);
        } catch (err) {
          if (err?.code === "42P01") return [];
          throw err;
        }
      }
      // ========================================================================
      // Settings Audit operations
      // ========================================================================
      async getSettingsAuditLogs(settingKey, limit = 50) {
        if (settingKey) {
          return await db.select().from(settingsAudit).where(eq(settingsAudit.settingKey, settingKey)).orderBy(desc(settingsAudit.changedAt)).limit(limit);
        }
        return await db.select().from(settingsAudit).orderBy(desc(settingsAudit.changedAt)).limit(limit);
      }
      async logSettingChange(audit) {
        await db.insert(settingsAudit).values(audit);
      }
      // ========================================================================
      // Email Template operations
      // ========================================================================
      async getAllEmailTemplates() {
        return await db.select().from(emailTemplates).orderBy(desc(emailTemplates.createdAt));
      }
      async createEmailTemplate(template) {
        const [created] = await db.insert(emailTemplates).values(template).returning();
        return created;
      }
      async updateEmailTemplate(template) {
        const { id, ...updates } = template;
        const [updated] = await db.update(emailTemplates).set({ ...updates, updatedAt: /* @__PURE__ */ new Date() }).where(eq(emailTemplates.id, id)).returning();
        return updated;
      }
      async deleteEmailTemplate(id) {
        await db.delete(emailTemplates).where(eq(emailTemplates.id, id));
      }
      // ========================================================================
      // Login History operations
      // ========================================================================
      async getLoginHistory(userId) {
        if (userId) {
          return await db.select().from(loginHistory).where(eq(loginHistory.userId, userId)).orderBy(desc(loginHistory.createdAt)).limit(100);
        }
        return await db.select().from(loginHistory).orderBy(desc(loginHistory.createdAt)).limit(100);
      }
      async logLoginAttempt(data) {
        await db.insert(loginHistory).values(data);
      }
      // ========================================================================
      // Verification Rule operations
      // ========================================================================
      async getAllVerificationRules() {
        return await db.select().from(verificationRules).orderBy(desc(verificationRules.createdAt));
      }
      async createVerificationRule(rule) {
        const [created] = await db.insert(verificationRules).values(rule).returning();
        return created;
      }
      async updateVerificationRule(rule) {
        const { id, ...updates } = rule;
        const [updated] = await db.update(verificationRules).set({ ...updates, updatedAt: /* @__PURE__ */ new Date() }).where(eq(verificationRules.id, id)).returning();
        return updated;
      }
      async deleteVerificationRule(id) {
        await db.delete(verificationRules).where(eq(verificationRules.id, id));
      }
      // ========================================================================
      // Document Template operations
      // ========================================================================
      async getAllDocumentTemplates() {
        return await db.select().from(documentTemplates).orderBy(desc(documentTemplates.createdAt));
      }
      async createDocumentTemplate(template) {
        const [created] = await db.insert(documentTemplates).values(template).returning();
        return created;
      }
      async updateDocumentTemplate(template) {
        const { id, ...updates } = template;
        const [updated] = await db.update(documentTemplates).set({ ...updates, updatedAt: /* @__PURE__ */ new Date() }).where(eq(documentTemplates.id, id)).returning();
        return updated;
      }
      async deleteDocumentTemplate(id) {
        await db.delete(documentTemplates).where(eq(documentTemplates.id, id));
      }
      // ========================================================================
      // Admin Audit Log operations
      // ========================================================================
      async getAdminAuditLogs(adminId) {
        const baseQuery = db.select({
          id: adminAuditLogs.id,
          adminId: adminAuditLogs.adminId,
          action: adminAuditLogs.action,
          targetType: adminAuditLogs.targetType,
          targetId: adminAuditLogs.targetId,
          changes: adminAuditLogs.changes,
          ipAddress: adminAuditLogs.ipAddress,
          userAgent: adminAuditLogs.userAgent,
          createdAt: adminAuditLogs.createdAt,
          admin: {
            id: users.id,
            email: users.email,
            username: users.username,
            firstName: users.firstName,
            lastName: users.lastName,
            role: users.role,
            profileImageUrl: users.profileImageUrl
          }
        }).from(adminAuditLogs).leftJoin(users, eq(adminAuditLogs.adminId, users.id));
        if (adminId) {
          const results2 = await baseQuery.where(eq(adminAuditLogs.adminId, adminId)).orderBy(desc(adminAuditLogs.createdAt)).limit(200);
          return results2.map((r) => ({
            id: r.id,
            adminId: r.adminId,
            action: r.action,
            targetType: r.targetType,
            targetId: r.targetId,
            changes: r.changes,
            ipAddress: r.ipAddress,
            userAgent: r.userAgent,
            createdAt: r.createdAt,
            admin: r.admin?.id ? r.admin : null
          }));
        }
        const results = await baseQuery.orderBy(desc(adminAuditLogs.createdAt)).limit(200);
        return results.map((r) => ({
          id: r.id,
          adminId: r.adminId,
          action: r.action,
          targetType: r.targetType,
          targetId: r.targetId,
          changes: r.changes,
          ipAddress: r.ipAddress,
          userAgent: r.userAgent,
          createdAt: r.createdAt,
          admin: r.admin?.id ? r.admin : null
        }));
      }
      async logAdminAudit(data) {
        await db.insert(adminAuditLogs).values(data);
      }
      // ========================================================================
      // Two-Factor Auth operations
      // ========================================================================
      async getTwoFactorAuthStatus(userId) {
        const [twoFA] = await db.select().from(twoFactorAuth).where(eq(twoFactorAuth.userId, userId)).limit(1);
        return twoFA;
      }
      async enableTwoFactorAuth(userId) {
        const existing = await this.getTwoFactorAuthStatus(userId);
        if (existing) {
          await db.update(twoFactorAuth).set({ enabled: true, updatedAt: /* @__PURE__ */ new Date() }).where(eq(twoFactorAuth.userId, userId));
        } else {
          await db.insert(twoFactorAuth).values({
            userId,
            enabled: true,
            secret: null,
            backupCodes: []
          });
        }
      }
      async disableTwoFactorAuth(userId) {
        await db.update(twoFactorAuth).set({ enabled: false, updatedAt: /* @__PURE__ */ new Date() }).where(eq(twoFactorAuth.userId, userId));
      }
      // ========================================================================
      // User Management (Admin) operations
      // ========================================================================
      async updateUserPassword(userId, hashedPassword) {
        await db.update(users).set({ password: hashedPassword, updatedAt: /* @__PURE__ */ new Date() }).where(eq(users.id, userId));
      }
      async forceUserLogout(userId) {
        await db.delete(sessions).where(sql2`${sessions.sess}->>'userId' = ${userId}`);
      }
      async updateUserInfo(userId, data) {
        const [updated] = await db.update(users).set({ ...data, updatedAt: /* @__PURE__ */ new Date() }).where(eq(users.id, userId)).returning();
        return updated;
      }
      // ========================================================================
      // Seller Verification operations
      // ========================================================================
      async createVerificationRequest(sellerId) {
        const existing = await db.select().from(sellerVerificationRequests).where(
          and(
            eq(sellerVerificationRequests.sellerId, sellerId),
            eq(sellerVerificationRequests.status, "pending")
          )
        ).limit(1);
        if (existing.length > 0) {
          return existing[0];
        }
        const [request] = await db.insert(sellerVerificationRequests).values({ sellerId }).returning();
        return request;
      }
      async getVerificationRequestById(id) {
        const [request] = await db.select().from(sellerVerificationRequests).where(eq(sellerVerificationRequests.id, id)).limit(1);
        return request;
      }
      async getVerificationRequestBySellerId(sellerId) {
        const [request] = await db.select().from(sellerVerificationRequests).where(eq(sellerVerificationRequests.sellerId, sellerId)).orderBy(desc(sellerVerificationRequests.createdAt)).limit(1);
        return request;
      }
      async getAllPendingVerificationRequests() {
        const requests = await db.select({
          id: sellerVerificationRequests.id,
          status: sellerVerificationRequests.status,
          rejectionReason: sellerVerificationRequests.rejectionReason,
          submittedAt: sellerVerificationRequests.submittedAt,
          reviewedAt: sellerVerificationRequests.reviewedAt,
          sellerId: users.id,
          sellerEmail: users.email,
          sellerFirstName: users.firstName,
          sellerLastName: users.lastName,
          sellerCompanyName: userProfiles.companyName
        }).from(sellerVerificationRequests).leftJoin(users, eq(sellerVerificationRequests.sellerId, users.id)).leftJoin(userProfiles, eq(users.id, userProfiles.userId)).where(eq(sellerVerificationRequests.status, "pending")).orderBy(desc(sellerVerificationRequests.submittedAt));
        return requests;
      }
      async getAllVerificationRequests() {
        const requests = await db.select({
          id: sellerVerificationRequests.id,
          status: sellerVerificationRequests.status,
          rejectionReason: sellerVerificationRequests.rejectionReason,
          submittedAt: sellerVerificationRequests.submittedAt,
          reviewedAt: sellerVerificationRequests.reviewedAt,
          sellerId: users.id,
          sellerEmail: users.email,
          sellerFirstName: users.firstName,
          sellerLastName: users.lastName,
          sellerCompanyName: userProfiles.companyName
        }).from(sellerVerificationRequests).leftJoin(users, eq(sellerVerificationRequests.sellerId, users.id)).leftJoin(userProfiles, eq(users.id, userProfiles.userId)).orderBy(desc(sellerVerificationRequests.submittedAt));
        return requests;
      }
      async updateVerificationRequestStatus(id, status) {
        const [updated] = await db.update(sellerVerificationRequests).set({
          status,
          submittedAt: status === "pending" ? /* @__PURE__ */ new Date() : void 0,
          updatedAt: /* @__PURE__ */ new Date()
        }).where(eq(sellerVerificationRequests.id, id)).returning();
        return updated;
      }
      async approveVerificationRequest(id, reviewerId) {
        const request = await this.getVerificationRequestById(id);
        if (!request) {
          throw new Error("Verification request not found");
        }
        const seller = await this.getUserById(request.sellerId);
        if (!seller) {
          throw new Error("Seller not found");
        }
        const badgeColorMap = {
          basic: "",
          // No badge for basic tier
          standard: "blue",
          premium: "gold"
        };
        const badgeColor = badgeColorMap[seller.membershipTier] || "";
        const [updated] = await db.update(sellerVerificationRequests).set({
          status: "approved",
          reviewedAt: /* @__PURE__ */ new Date(),
          reviewedBy: reviewerId,
          updatedAt: /* @__PURE__ */ new Date()
        }).where(eq(sellerVerificationRequests.id, id)).returning();
        await this.updateUserVerificationStatus(request.sellerId, "approved", badgeColor);
        await this.logAdminAudit({
          adminId: reviewerId,
          action: "verification_approved",
          targetType: "seller_verification_request",
          targetId: id,
          changes: { status: "approved", sellerId: request.sellerId }
        });
        return updated;
      }
      async rejectVerificationRequest(id, reviewerId, reason) {
        const request = await this.getVerificationRequestById(id);
        if (!request) {
          throw new Error("Verification request not found");
        }
        const [updated] = await db.update(sellerVerificationRequests).set({
          status: "rejected",
          rejectionReason: reason,
          reviewedAt: /* @__PURE__ */ new Date(),
          reviewedBy: reviewerId,
          updatedAt: /* @__PURE__ */ new Date()
        }).where(eq(sellerVerificationRequests.id, id)).returning();
        await this.updateUserVerificationStatus(request.sellerId, "rejected");
        await this.logAdminAudit({
          adminId: reviewerId,
          action: "verification_rejected",
          targetType: "seller_verification_request",
          targetId: id,
          changes: { status: "rejected", reason, sellerId: request.sellerId }
        });
        return updated;
      }
      async createVerificationDocument(data) {
        const [document] = await db.insert(sellerVerificationDocuments).values(data).returning();
        return document;
      }
      async getDocumentsByRequestId(requestId) {
        return await db.select().from(sellerVerificationDocuments).where(eq(sellerVerificationDocuments.requestId, requestId)).orderBy(desc(sellerVerificationDocuments.uploadedAt));
      }
      async updateUserVerificationStatus(userId, status, badgeColor) {
        const updateData = {
          verificationStatus: status,
          updatedAt: /* @__PURE__ */ new Date()
        };
        if (badgeColor !== void 0) {
          updateData.badgeColor = badgeColor;
        }
        const [updated] = await db.update(users).set(updateData).where(eq(users.id, userId)).returning();
        return updated;
      }
      // ============================================================================
      // Payment Methods
      // ============================================================================
      async createTierUpgradePayment(data) {
        const [payment] = await db.insert(tierUpgradePayments).values(data).returning();
        return payment;
      }
      async getTierUpgradePaymentById(id) {
        const [payment] = await db.select().from(tierUpgradePayments).where(eq(tierUpgradePayments.id, id));
        return payment;
      }
      async getTierUpgradePaymentsByUserId(userId) {
        return await db.select().from(tierUpgradePayments).where(eq(tierUpgradePayments.userId, userId)).orderBy(desc(tierUpgradePayments.createdAt));
      }
      async getTierUpgradePaymentsByUpgradeRequestId(upgradeRequestId) {
        return await db.select().from(tierUpgradePayments).where(eq(tierUpgradePayments.upgradeRequestId, upgradeRequestId)).orderBy(desc(tierUpgradePayments.createdAt));
      }
      async updateTierUpgradePayment(id, data) {
        const [payment] = await db.update(tierUpgradePayments).set({ ...data, updatedAt: /* @__PURE__ */ new Date() }).where(eq(tierUpgradePayments.id, id)).returning();
        return payment;
      }
      async getAllPendingTierUpgradePayments() {
        return await db.select().from(tierUpgradePayments).where(eq(tierUpgradePayments.status, "paid")).orderBy(desc(tierUpgradePayments.submittedAt));
      }
      async createPaymentMethodDetails(data) {
        const [method] = await db.insert(paymentMethodDetails).values(data).returning();
        return method;
      }
      async getAllPaymentMethodDetails() {
        return await db.select().from(paymentMethodDetails).where(eq(paymentMethodDetails.isActive, true)).orderBy(paymentMethodDetails.name);
      }
      async getPaymentMethodDetailsByMethod(method) {
        const [paymentMethod] = await db.select().from(paymentMethodDetails).where(and(eq(paymentMethodDetails.method, method), eq(paymentMethodDetails.isActive, true)));
        return paymentMethod;
      }
      async updatePaymentMethodDetails(id, data) {
        const [method] = await db.update(paymentMethodDetails).set({ ...data, updatedAt: /* @__PURE__ */ new Date() }).where(eq(paymentMethodDetails.id, id)).returning();
        return method;
      }
    };
    storage = new DatabaseStorage();
  }
});

// server/clerk.ts
import { Clerk } from "@clerk/clerk-sdk-node";
import { eq as eq2 } from "drizzle-orm";
var clerk, requireAuth, requireAdmin, requireSeller, requireAdminPermission, getClerkUser;
var init_clerk = __esm({
  "server/clerk.ts"() {
    "use strict";
    init_db();
    init_schema();
    clerk = Clerk({
      secretKey: process.env.CLERK_SECRET_KEY
    });
    requireAuth = clerk.expressRequireAuth({
      onError: (error) => {
        console.error("Clerk auth error:", error);
      }
    });
    requireAdmin = (req, res, next) => {
      if (!req.auth?.userId) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      const role = req.auth.user?.publicMetadata?.role;
      if (role !== "admin") {
        return res.status(403).json({ message: "Admin access required" });
      }
      next();
    };
    requireSeller = (req, res, next) => {
      if (!req.auth?.userId) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      const role = req.auth.user?.publicMetadata?.role;
      if (role !== "seller") {
        return res.status(403).json({ message: "Seller access required" });
      }
      next();
    };
    requireAdminPermission = (permission) => {
      return async (req, res, next) => {
        if (!req.auth?.userId) {
          return res.status(401).json({ message: "Unauthorized" });
        }
        const role = req.auth.user?.publicMetadata?.role;
        if (role !== "admin") {
          return res.status(403).json({ message: "Admin access required" });
        }
        try {
          const userPerms = await db.select().from(adminPermissions).where(eq2(adminPermissions.adminUserId, req.auth.userId)).limit(1);
          if (!userPerms.length || !userPerms[0][permission]) {
            return res.status(403).json({ message: `Permission '${permission}' required` });
          }
          next();
        } catch (error) {
          console.error("Error checking admin permissions:", error);
          return res.status(500).json({ message: "Internal server error" });
        }
      };
    };
    getClerkUser = async (userId) => {
      try {
        return await clerk.users.getUser(userId);
      } catch (error) {
        console.error("Error fetching Clerk user:", error);
        return null;
      }
    };
  }
});

// server/localAuth.ts
var localAuth_exports = {};
__export(localAuth_exports, {
  requireAdmin: () => requireAdmin,
  requireAdminPermission: () => requireAdminPermission,
  requireAuth: () => requireAuth,
  requireSeller: () => requireSeller,
  syncClerkUser: () => syncClerkUser
});
var syncClerkUser;
var init_localAuth = __esm({
  "server/localAuth.ts"() {
    "use strict";
    init_clerk();
    init_storage();
    syncClerkUser = async (clerkUserId) => {
      try {
        let dbUser = await storage.getUserByClerkId(clerkUserId);
        if (!dbUser) {
          const clerkUser = await getClerkUser(clerkUserId);
          if (!clerkUser) {
            throw new Error("User not found in Clerk");
          }
          const email = clerkUser.emailAddresses[0]?.emailAddress;
          const firstName = clerkUser.firstName || "";
          const lastName = clerkUser.lastName || "";
          if (!email) {
            throw new Error("User email not found");
          }
          const role = clerkUser.publicMetadata?.role || clerkUser.unsafeMetadata?.role || "buyer";
          dbUser = await storage.upsertUser({
            clerkId: clerkUserId,
            email,
            firstName,
            lastName,
            role
          });
          await storage.createUserProfile({
            userId: dbUser.id,
            profileType: "individual",
            verified: false
          });
        } else {
          const clerkUser = await getClerkUser(clerkUserId);
          if (clerkUser) {
            const currentRole = clerkUser.publicMetadata?.role || clerkUser.unsafeMetadata?.role || "buyer";
            if (dbUser.role !== currentRole) {
              dbUser = await storage.updateUserRole(dbUser.id, currentRole);
            }
          }
        }
        return dbUser;
      } catch (error) {
        console.error("Error syncing Clerk user:", error);
        throw error;
      }
    };
  }
});

// server/rbac.ts
var rbac_exports = {};
__export(rbac_exports, {
  ROLE_PERMISSIONS: () => ROLE_PERMISSIONS,
  getAdminRoleDisplayName: () => getAdminRoleDisplayName,
  getPermissionDisplayName: () => getPermissionDisplayName,
  loadAdminPermissions: () => loadAdminPermissions,
  logAdminAction: () => logAdminAction,
  requirePermission: () => requirePermission,
  requireRole: () => requireRole,
  requireSuperAdmin: () => requireSuperAdmin
});
import { eq as eq3 } from "drizzle-orm";
async function loadAdminPermissions(req, res, next) {
  try {
    if (!req.user || req.user.role !== "admin") {
      return next();
    }
    const permissions = await db.query.adminPermissions.findFirst({
      where: eq3(adminPermissions.adminUserId, req.user.id)
    });
    if (permissions) {
      req.adminPermissions = permissions;
    }
    next();
  } catch (error) {
    console.error("Error loading admin permissions:", error);
    next();
  }
}
function requirePermission(permission) {
  return (req, res, next) => {
    if (!req.user || req.user.role !== "admin") {
      return res.status(403).json({ message: "Admin access required" });
    }
    if (!req.adminPermissions) {
      return res.status(403).json({ message: "Admin permissions not loaded" });
    }
    if (!req.adminPermissions[permission]) {
      return res.status(403).json({
        message: `Permission denied: ${permission} is required`
      });
    }
    next();
  };
}
function requireRole(...roles) {
  return (req, res, next) => {
    if (!req.user || req.user.role !== "admin") {
      return res.status(403).json({ message: "Admin access required" });
    }
    if (!req.adminPermissions) {
      return res.status(403).json({ message: "Admin permissions not loaded" });
    }
    if (!roles.includes(req.adminPermissions.adminRole)) {
      return res.status(403).json({
        message: `Role denied: One of ${roles.join(", ")} is required`
      });
    }
    next();
  };
}
function requireSuperAdmin(req, res, next) {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ message: "Admin access required" });
  }
  if (!req.adminPermissions || req.adminPermissions.adminRole !== "super_admin") {
    return res.status(403).json({ message: "Super Admin access required" });
  }
  next();
}
async function logAdminAction(adminId, action, targetType, targetId, changes, req) {
  try {
    const ipAddress = req.headers["x-forwarded-for"]?.split(",")[0].trim() || req.socket.remoteAddress || null;
    const userAgent = req.headers["user-agent"] || null;
    await db.insert((init_schema(), __toCommonJS(schema_exports)).adminAuditLogs).values({
      adminId,
      action,
      targetType,
      targetId,
      changes,
      ipAddress,
      userAgent
    });
  } catch (error) {
    console.error("Error logging admin action:", error);
  }
}
function getAdminRoleDisplayName(role) {
  const roleNames = {
    super_admin: "Super Admin",
    verification_admin: "Verification & Support Admin",
    content_admin: "Content Admin",
    analytics_admin: "Analytics Admin"
  };
  return roleNames[role] || role;
}
function getPermissionDisplayName(permission) {
  const permissionNames = {
    canManageUsers: "Manage Users",
    canManageListings: "Manage Listings",
    canManageProjects: "Manage Projects",
    canManageBlog: "Manage Blog",
    canManageCMS: "Manage CMS",
    canViewAnalytics: "View Analytics",
    canManageMessages: "Manage Messages",
    canManageVerification: "Manage Verification",
    canManageSettings: "Manage Settings",
    canManageAdmins: "Manage Admins",
    canAccessAuditLogs: "Access Audit Logs",
    canManageDocuments: "Manage Documents",
    canResetPasswords: "Reset Passwords",
    canForceLogout: "Force Logout"
  };
  return permissionNames[permission] || permission;
}
var ROLE_PERMISSIONS;
var init_rbac = __esm({
  "server/rbac.ts"() {
    "use strict";
    init_db();
    init_schema();
    ROLE_PERMISSIONS = {
      super_admin: {
        canManageUsers: true,
        canManageListings: true,
        canManageProjects: true,
        canManageBlog: true,
        canManageCMS: true,
        canViewAnalytics: true,
        canManageMessages: true,
        canManageVerification: true,
        canManageSettings: true,
        canManageAdmins: true,
        canAccessAuditLogs: true,
        canManageDocuments: true,
        canResetPasswords: true,
        canForceLogout: true
      },
      // Combined Verification & Support Admin:
      // Handles compliance/KYC, listing approvals, and user support operations
      verification_admin: {
        canManageVerification: true,
        canManageListings: true,
        canViewAnalytics: true,
        canAccessAuditLogs: true,
        canManageMessages: true,
        canResetPasswords: true,
        canForceLogout: true
      },
      content_admin: {
        canManageBlog: true,
        canManageCMS: true,
        canManageDocuments: true
      },
      analytics_admin: {
        canViewAnalytics: true,
        canAccessAuditLogs: true
      }
    };
  }
});

// server/index.ts
import "dotenv/config";
import express2 from "express";
import cors from "cors";

// server/routes.ts
init_storage();
init_localAuth();
init_db();
init_schema();
init_schema();
import multer from "multer";
import path from "path";
import fs from "fs";
import { createServer } from "http";
import { ZodError } from "zod";
import { sql as sql3 } from "drizzle-orm";
import { eq as eq4 } from "drizzle-orm";
import bcrypt from "bcrypt";

// server/ai/gemini.ts
import { GoogleGenerativeAI } from "@google/generative-ai";
var apiKey = process.env.GEMINI_API || process.env.GEMINI_API_KEY;
var genAI = null;
var model = null;
if (apiKey) {
  try {
    genAI = new GoogleGenerativeAI(apiKey);
    model = genAI.getGenerativeModel({ model: "gemini-3-pro-preview" });
  } catch (err) {
    console.warn("Failed to initialize Google Generative AI client, falling back to local assistant:", err);
    genAI = null;
    model = null;
  }
} else {
  console.warn("GEMINI API key not provided; using local assistant fallback.");
}
function localFallbackReply(userMessage, history = []) {
  const hints = [
    "You can ask about: marketplace listings, projects, seller verification, or account settings.",
    "Try: 'How do I verify my seller account?' or 'How do I create a listing?'."
  ];
  return `I don't have access to the AI assistant right now. ${hints.join(" ")}

You asked: ${userMessage}`;
}
async function askSupportBot(userMessage, history = []) {
  const systemPrompt = `You are Fusion Mining's support assistant for a B2B mining investment and trading platform. Answer clearly and professionally. Do not provide legal, tax, or investment advice. If a question needs a human, say you'll connect them to an admin.`;
  const contents = [
    { role: "user", parts: [{ text: systemPrompt }] },
    ...history.map((m) => ({ role: m.role, parts: [{ text: m.content }] })),
    { role: "user", parts: [{ text: userMessage }] }
  ];
  if (!model) {
    return localFallbackReply(userMessage, history);
  }
  try {
    const result = await model.generateContent({ contents });
    return result.response.text();
  } catch (err) {
    console.error("Generative AI error \u2014 falling back to local assistant:", err);
    try {
      if (err?.status === 429) {
        return `The assistant is currently rate limited. Please try again shortly.`;
      }
    } catch (inner) {
      console.error("Error inspecting generative AI error:", inner);
    }
    return localFallbackReply(userMessage, history);
  }
}

// server/ai/hf.ts
async function askHuggingFace(model2, prompt, apiKey2) {
  const useRouter = model2.includes(":") || process.env.HF_USE_ROUTER === "1";
  try {
    if (useRouter) {
      const systemMessage = prompt.split("\n\n")[0] || "";
      const userContent = prompt;
      const routerUrl = `https://router.huggingface.co/v1/chat/completions`;
      const body = {
        model: model2,
        messages: [
          { role: "system", content: systemMessage },
          { role: "user", content: userContent }
        ],
        // Optional: adjust generation parameters
        max_tokens: 512,
        temperature: 0.7
      };
      try {
        const preview = { model: model2, messages: body.messages };
        console.debug("HF router request ->", routerUrl, JSON.stringify(preview).slice(0, 200));
      } catch (e) {
      }
      const resp = await fetch(routerUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey2}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
      });
      if (!resp.ok) {
        const txt = await resp.text().catch(() => "(no body)");
        console.debug("HF router response error:", resp.status, resp.statusText, txt.slice ? txt.slice(0, 1e3) : txt);
        const err = new Error(`HF Inference API error: ${resp.status}`);
        err.status = resp.status;
        err.statusText = resp.statusText;
        err.body = txt;
        throw err;
      }
      const data2 = await resp.json();
      const content = data2?.choices?.[0]?.message?.content || data2?.choices?.[0]?.message || null;
      if (!content) {
        console.warn("Unexpected HF router response:", data2);
        throw new Error("HF router returned unexpected response format");
      }
      try {
        const outPreview = typeof content === "string" ? content.slice(0, 1e3) : JSON.stringify(content).slice(0, 1e3);
        console.debug("HF router response OK (truncated):", outPreview);
      } catch (e) {
      }
      return typeof content === "string" ? content : JSON.stringify(content);
    }
    const url = `https://api-inference.huggingface.co/models/${model2}`;
    try {
      const preview = { url, inputs: String(prompt).slice(0, 200) };
      console.debug("HF inference request ->", url, JSON.stringify(preview));
    } catch (e) {
    }
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey2}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        inputs: prompt,
        parameters: {
          max_new_tokens: 256,
          temperature: 0.7,
          top_p: 0.9,
          do_sample: true
        }
      })
    });
    if (!response.ok) {
      const errorBody = await response.text().catch(() => "(no body)");
      console.debug("HF inference response error:", response.status, response.statusText, String(errorBody).slice(0, 1e3));
      if (response.status === 503) {
        console.log("Model loading, retrying in 2 seconds...");
        await new Promise((resolve) => setTimeout(resolve, 2e3));
        return askHuggingFace(model2, prompt, apiKey2);
      }
      const err = new Error(`HF Inference API error: ${response.status}`);
      err.status = response.status;
      err.statusText = response.statusText;
      err.body = errorBody;
      throw err;
    }
    const data = await response.json();
    let generatedText = null;
    if (typeof data?.generated_text === "string") {
      generatedText = data.generated_text;
    } else if (Array.isArray(data) && data.length > 0) {
      if (typeof data[0]?.generated_text === "string") {
        generatedText = data[0].generated_text;
      }
    }
    if (!generatedText) {
      console.warn("Unexpected HF response format:", data);
      throw new Error("HF model returned unexpected response format");
    }
    try {
      console.debug("HF inference response OK (truncated):", generatedText.slice(0, 500));
    } catch (e) {
    }
    if (generatedText.includes(prompt)) {
      const idx = generatedText.indexOf(prompt);
      generatedText = generatedText.substring(idx + prompt.length).trim();
    }
    return generatedText || "I'm here to help.";
  } catch (err) {
    console.error("HF Inference error:", err);
    throw err;
  }
}
function formatChatPrompt(userMessage, history = []) {
  const systemPrompt = `You are Fusion Mining's support assistant for a B2B mining investment and trading platform. Answer clearly and professionally. Keep responses concise and to the point (brief by default, ~1-3 short sentences or <=100 words). Only provide more detailed explanations when the user asks for them. Explain platform features, help with navigation, and give high-level guidance about mining investment, but do not give personalized legal, tax, or investment advice. If a question needs a human, say you'll connect them to an admin.`;
  let prompt = systemPrompt + "\n\n";
  for (const msg of history) {
    if (msg.role === "user") {
      prompt += `User: ${msg.content}
`;
    } else if (msg.role === "assistant") {
      prompt += `Assistant: ${msg.content}
`;
    }
  }
  prompt += `User: ${userMessage}
Assistant:`;
  return prompt;
}

// server/routes.ts
function formatZodError(error) {
  return error.errors.map((err) => `${err.path.join(".")}: ${err.message}`).join(", ");
}
var testUsersStore = /* @__PURE__ */ new Map([
  ["test-buyer-789", {
    id: "test-buyer-789",
    email: "henry@fusionmining.com",
    role: "buyer",
    firstName: "Henry",
    lastName: "Pass",
    membershipTier: "premium",
    verificationStatus: "not_requested"
  }],
  ["test-seller-456", {
    id: "test-seller-456",
    email: "ray@fusionmining.com",
    role: "seller",
    firstName: "Ray",
    lastName: "Pass",
    membershipTier: "basic",
    verificationStatus: "approved"
  }],
  ["test-admin-super", {
    id: "test-admin-super",
    email: "superadmin@fusionmining.com",
    role: "admin",
    firstName: "Super",
    lastName: "Admin",
    membershipTier: "premium",
    verificationStatus: "approved"
  }],
  ["test-admin-verification", {
    id: "test-admin-verification",
    email: "verifyadmin@fusionmining.com",
    role: "admin",
    firstName: "Verification",
    lastName: "Admin",
    membershipTier: "basic",
    verificationStatus: "approved"
  }],
  ["test-admin-content", {
    id: "test-admin-content",
    email: "contentadmin@fusionmining.com",
    role: "admin",
    firstName: "Content",
    lastName: "Admin",
    membershipTier: "basic",
    verificationStatus: "approved"
  }],
  ["test-admin-support", {
    id: "test-admin-support",
    email: "supportadmin@fusionmining.com",
    role: "admin",
    firstName: "Support",
    lastName: "Admin",
    membershipTier: "basic",
    verificationStatus: "approved"
  }],
  ["test-admin-analytics", {
    id: "test-admin-analytics",
    email: "analyticsadmin@fusionmining.com",
    role: "admin",
    firstName: "Analytics",
    lastName: "Admin",
    membershipTier: "basic",
    verificationStatus: "approved"
  }]
]);
var customTestCredentials = /* @__PURE__ */ new Map([
  ["admin", { username: "admin", password: "admin123", userId: "test-admin-super", role: "admin", firstName: "Super", lastName: "Admin", adminRole: "super_admin" }],
  ["superadmin", { username: "superadmin", password: "super123", userId: "test-admin-super", role: "admin", firstName: "Super", lastName: "Admin", adminRole: "super_admin" }],
  ["verifyadmin", { username: "verifyadmin", password: "verify123", userId: "test-admin-verification", role: "admin", firstName: "Verification", lastName: "Admin", adminRole: "verification_admin" }],
  ["contentadmin", { username: "contentadmin", password: "content123", userId: "test-admin-content", role: "admin", firstName: "Content", lastName: "Admin", adminRole: "content_admin" }],
  ["supportadmin", { username: "supportadmin", password: "support123", userId: "test-admin-support", role: "admin", firstName: "Support", lastName: "Admin", adminRole: "support_admin" }],
  ["analyticsadmin", { username: "analyticsadmin", password: "analytics123", userId: "test-admin-analytics", role: "admin", firstName: "Analytics", lastName: "Admin", adminRole: "analytics_admin" }],
  ["henry", { username: "henry", password: "henry123", userId: "test-buyer-789", role: "buyer", firstName: "Henry", lastName: "Pass" }],
  ["ray", { username: "ray", password: "ray123", userId: "test-seller-456", role: "seller", firstName: "Ray", lastName: "Pass" }]
]);
var buyerUpgradeRequests = /* @__PURE__ */ new Map([
  ["upgrade-1", {
    id: "upgrade-1",
    userId: "test-buyer-789",
    buyerEmail: "henry@fusionmining.com",
    buyerFirstName: "Henry",
    buyerLastName: "Brown",
    requestedTier: "premium",
    status: "approved",
    submittedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1e3).toISOString(),
    reviewedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1e3).toISOString(),
    documentCount: 4
  }],
  ["upgrade-2", {
    id: "upgrade-2",
    userId: "buyer-2",
    buyerEmail: "buyer2@example.com",
    buyerFirstName: "John",
    buyerLastName: "Doe",
    requestedTier: "standard",
    status: "approved",
    submittedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1e3).toISOString(),
    reviewedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1e3).toISOString(),
    documentCount: 3
  }],
  ["upgrade-3", {
    id: "upgrade-3",
    userId: "buyer-3",
    buyerEmail: "buyer3@example.com",
    buyerFirstName: "Sarah",
    buyerLastName: "Smith",
    requestedTier: "premium",
    status: "rejected",
    rejectionReason: "Incomplete documentation. Missing Director ID and Tax Certificate.",
    submittedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1e3).toISOString(),
    reviewedAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1e3).toISOString(),
    documentCount: 2
  }]
]);
function getAllBuyerUpgrades() {
  return Array.from(buyerUpgradeRequests.values());
}
function getPendingBuyerUpgrades() {
  return Array.from(buyerUpgradeRequests.values()).filter((r) => r.status === "pending");
}
function initializeUserTiersFromApprovedRequests() {
  const approvedRequests = Array.from(buyerUpgradeRequests.values()).filter((r) => r.status === "approved");
  for (const request of approvedRequests) {
    const user = testUsersStore.get(request.userId);
    if (user) {
      user.membershipTier = request.requestedTier;
      testUsersStore.set(request.userId, user);
    }
  }
}
function approveBuyerUpgrade(id) {
  const request = buyerUpgradeRequests.get(id);
  if (request) {
    request.status = "approved";
    request.reviewedAt = (/* @__PURE__ */ new Date()).toISOString();
    buyerUpgradeRequests.set(id, request);
    const user = testUsersStore.get(request.userId);
    if (user) {
      user.membershipTier = request.requestedTier;
      testUsersStore.set(request.userId, user);
    }
  }
  return request || null;
}
function rejectBuyerUpgrade(id, reason) {
  const request = buyerUpgradeRequests.get(id);
  if (request) {
    request.status = "rejected";
    request.rejectionReason = reason;
    request.reviewedAt = (/* @__PURE__ */ new Date()).toISOString();
    buyerUpgradeRequests.set(id, request);
  }
  return request || null;
}
function revertBuyerUpgrade(id) {
  const request = buyerUpgradeRequests.get(id);
  if (request) {
    request.status = "draft";
    request.rejectionReason = void 0;
    request.reviewedAt = void 0;
    buyerUpgradeRequests.set(id, request);
  }
  return request || null;
}
async function registerRoutes(app2) {
  initializeUserTiersFromApprovedRequests();
  app2.use(async (req, res, next) => {
    try {
      if (req.auth?.userId) {
        const user = await syncClerkUser(req.auth.userId);
        req.user = {
          id: user.id,
          clerkId: user.clerkId,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role || "buyer",
          // Ensure role defaults to 'buyer' if not set
          claims: {
            sub: req.auth.userId
          }
        };
      }
    } catch (error) {
      console.error("Error in user sync middleware:", error);
    }
    next();
  });
  app2.get("/api/health", (req, res) => {
    res.json({
      status: "ok",
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      environment: process.env.NODE_ENV || "development"
    });
  });
  try {
    const demoUsers = [
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
    for (const demoUser of demoUsers) {
      try {
        const existing = await storage.getUser(demoUser.id);
        if (!existing) {
          console.log("[SEED] Creating demo user:", demoUser.id);
          await storage.upsertUser({
            id: demoUser.id,
            email: demoUser.email,
            firstName: demoUser.firstName,
            lastName: demoUser.lastName
          });
          await storage.updateUserRole(demoUser.id, demoUser.role);
          console.log("[SEED] Demo user created:", demoUser.id);
        }
      } catch (error) {
        console.error("[SEED] Error creating demo user:", demoUser.id, error);
      }
    }
  } catch (error) {
    console.error("[SEED] Error during demo user seeding:", error);
  }
  app2.post("/api/register-test-credential", (req, res) => {
    const { username, password, firstName, lastName, role } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: "Username and password are required" });
    }
    if (customTestCredentials.has(username)) {
      return res.status(400).json({ message: "Username already exists" });
    }
    const userId = `test-${role}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const credential = {
      username,
      password,
      userId,
      role: role || "buyer",
      firstName: firstName || "Test",
      lastName: lastName || "User"
    };
    customTestCredentials.set(username, credential);
    console.log("[REGISTER TEST CREDENTIAL] Registered:", username, "with role:", role);
    res.json({
      success: true,
      credential: {
        username,
        userId,
        role,
        firstName,
        lastName
      }
    });
  });
  app2.post("/api/messages/mark-read", requireAuth, async (req, res) => {
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
  app2.post("/api/logout", async (req, res) => {
    const userId = req.user?.id || req.user?.claims?.sub;
    req.logout(async () => {
      if (userId) {
        try {
          const ipAddress = req.headers["x-forwarded-for"]?.split(",")[0]?.trim() || req.headers["x-real-ip"] || req.ip || req.socket.remoteAddress || null;
          await storage.createActivityLog({
            userId,
            activityType: "logout",
            description: `User logged out`,
            ipAddress,
            userAgent: req.get("user-agent") || null
          });
        } catch (logError) {
          console.error("[ACTIVITY LOG] Failed to log logout:", logError);
        }
      }
      res.json({ message: "Logout successful" });
    });
  });
  app2.get("/api/auth/user", requireAuth, async (req, res) => {
    try {
      const clerkUserId = req.auth.userId;
      const user = await syncClerkUser(clerkUserId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      let adminPerms = void 0;
      if (user.role === "admin") {
        try {
          adminPerms = await storage.getAdminPermissions(user.id);
          console.log("[AUTH/USER] Retrieved admin permissions for user:", adminPerms?.adminRole);
        } catch (e) {
          console.error("[AUTH/USER] Error getting admin permissions:", e);
        }
      }
      res.json({ ...user, adminPermissions: adminPerms || null });
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });
  app2.get("/api/test-accounts", async (req, res) => {
    try {
      const testAccounts = [
        { id: "test-admin-super", email: "superadmin@fusionmining.com", role: "admin", name: "Super Admin", adminRole: "super_admin", credentials: "superadmin / super123" },
        { id: "test-admin-verification", email: "verifyadmin@fusionmining.com", role: "admin", name: "Verification Admin", adminRole: "verification_admin", credentials: "verifyadmin / verify123" },
        { id: "test-admin-content", email: "contentadmin@fusionmining.com", role: "admin", name: "Content Admin", adminRole: "content_admin", credentials: "contentadmin / content123" },
        { id: "test-admin-support", email: "supportadmin@fusionmining.com", role: "admin", name: "Support Admin", adminRole: "support_admin", credentials: "supportadmin / support123" },
        { id: "test-admin-analytics", email: "analyticsadmin@fusionmining.com", role: "admin", name: "Analytics Admin", adminRole: "analytics_admin", credentials: "analyticsadmin / analytics123" },
        { id: "test-seller-456", email: "ray@fusionmining.com", role: "seller", name: "Ray Pass", credentials: "ray / ray123" },
        { id: "test-buyer-789", email: "henry@fusionmining.com", role: "buyer", name: "Henry Pass", credentials: "henry / henry123" }
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
          role: "admin",
          membershipTier: "premium"
        },
        {
          id: "test-seller-456",
          email: "ray@fusionmining.com",
          firstName: "Ray",
          lastName: "Pass",
          role: "seller",
          membershipTier: "premium"
        },
        {
          id: "test-buyer-789",
          email: "henry@fusionmining.com",
          firstName: "Henry",
          lastName: "Pass",
          role: "buyer",
          membershipTier: "standard"
        },
        {
          id: "test-buyer-basic-001",
          email: "alice@example.com",
          firstName: "Alice",
          lastName: "Johnson",
          role: "buyer",
          membershipTier: "basic"
        },
        {
          id: "test-buyer-premium-002",
          email: "bob@example.com",
          firstName: "Bob",
          lastName: "Williams",
          role: "buyer",
          membershipTier: "premium"
        },
        {
          id: "test-seller-standard-003",
          email: "carol@example.com",
          firstName: "Carol",
          lastName: "Davis",
          role: "seller",
          membershipTier: "standard"
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
            await db.update(users).set({ membershipTier: userData.membershipTier }).where(eq4(users.id, userData.id));
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
        // Premium seller listings
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
        // Standard seller listings
        {
          sellerId: "test-seller-standard-003",
          type: "mineral",
          title: "Amethyst Gemstones - Small Lots",
          description: "Beautiful purple amethyst from Southern Province mines. Perfect for jewelry makers and collectors. Available in various sizes.",
          mineralType: "Amethyst",
          grade: "AA Grade",
          location: "Southern Province",
          quantity: "100 carats",
          price: "$50/carat",
          status: "approved"
        },
        {
          sellerId: "test-seller-standard-003",
          type: "mineral",
          title: "Manganese Ore",
          description: "High-grade manganese ore for steel production. Reliable supply from established mine. Competitive pricing available.",
          mineralType: "Manganese",
          grade: "42% Mn",
          location: "Copperbelt",
          quantity: "500 tonnes",
          price: "$750/tonne",
          status: "approved"
        },
        {
          sellerId: "test-seller-standard-003",
          type: "service",
          title: "Mining Consulting Services",
          description: "Experienced mining consultants offering geological surveys, feasibility studies, and operational optimization services.",
          location: "Nationwide",
          status: "approved"
        },
        {
          sellerId: "test-seller-standard-003",
          type: "partnership",
          title: "Small-Scale Gold Mining Partnership",
          description: "Looking for investment partner for small-scale gold mining operation. Low entry cost with good potential returns.",
          location: "Northern Province",
          status: "pending"
        },
        {
          sellerId: "test-seller-standard-003",
          type: "mineral",
          title: "Quartz Crystals - Wholesale",
          description: "Clear quartz crystals suitable for industrial and decorative use. Bulk quantities available at wholesale prices.",
          mineralType: "Quartz",
          grade: "Industrial Grade",
          location: "Eastern Province",
          quantity: "10 tonnes",
          price: "$100/tonne",
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
        // Basic tier buyer (1 RFQ - at limit)
        {
          buyerId: "test-buyer-basic-001",
          title: "Small Gold Purchase for Jewelry",
          description: "Small jewelry business seeking gold for custom pieces. Looking for reliable local supplier with fair pricing.",
          mineralType: "Gold",
          quantity: "5 kg",
          budget: "$300,000",
          location: "Lusaka area",
          status: "active"
        },
        // Standard tier buyer (3 RFQs - within 5 limit)
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
        },
        // Premium tier buyer (4 RFQs - unlimited tier)
        {
          buyerId: "test-buyer-premium-002",
          title: "Bulk Copper Concentrate Purchase",
          description: "Large-scale buyer seeking premium copper concentrate for processing. Long-term contracts preferred with competitive pricing.",
          mineralType: "Copper",
          quantity: "50,000 tonnes annually",
          budget: "$200M+",
          location: "Copperbelt or Northern Province",
          status: "active"
        },
        {
          buyerId: "test-buyer-premium-002",
          title: "Rare Earth Elements Sourcing",
          description: "Technology company seeking rare earth elements for manufacturing. Looking for sustainable and ethical suppliers.",
          mineralType: "Rare Earth Elements",
          quantity: "1,000 tonnes",
          budget: "$50M",
          location: "Any region",
          status: "active"
        },
        {
          buyerId: "test-buyer-premium-002",
          title: "Gemstone Investment Portfolio",
          description: "Investment firm building gemstone portfolio. Interested in emeralds, amethysts, and other precious stones from certified sources.",
          mineralType: "Mixed Gemstones",
          quantity: "Various lots",
          budget: "$10-20M",
          location: "Nationwide",
          status: "active"
        },
        {
          buyerId: "test-buyer-premium-002",
          title: "Manganese Ore for Steel Production",
          description: "Steel manufacturer requires high-grade manganese ore. Looking for reliable supply chain with export capabilities.",
          mineralType: "Manganese",
          quantity: "20,000 tonnes annually",
          budget: "$15M annually",
          location: "Any major mining region",
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
        message: "Sample data seeded successfully with membership tiers",
        results: {
          users: testUsers.length,
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
  app2.post("/api/seed-membership-benefits", async (req, res) => {
    try {
      const benefits = [
        {
          tier: "basic",
          maxActiveRFQs: 1,
          canAccessAnalytics: false,
          canDirectMessage: false,
          prioritySupport: false,
          visibilityRanking: 3,
          monthlyPrice: "0"
        },
        {
          tier: "standard",
          maxActiveRFQs: 5,
          canAccessAnalytics: true,
          canDirectMessage: true,
          prioritySupport: false,
          visibilityRanking: 2,
          monthlyPrice: "50"
        },
        {
          tier: "premium",
          maxActiveRFQs: -1,
          // unlimited
          canAccessAnalytics: true,
          canDirectMessage: true,
          prioritySupport: true,
          visibilityRanking: 1,
          monthlyPrice: "200"
        }
      ];
      for (const benefit of benefits) {
        try {
          await storage.createMembershipBenefit(benefit);
        } catch (error) {
        }
      }
      res.json({
        message: "Membership benefits seeded successfully",
        count: benefits.length
      });
    } catch (error) {
      console.error("Error seeding membership benefits:", error);
      res.status(500).json({ message: "Failed to seed membership benefits" });
    }
  });
  async function ensurePlatformSettingsTables() {
    try {
      await db.execute(sql3`select 1 from "platform_settings" limit 1`);
    } catch (err) {
      if (err?.code !== "42P01") throw err;
      await db.execute(sql3`
          DO $$
          BEGIN
            IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'setting_data_type') THEN
              CREATE TYPE setting_data_type AS ENUM ('boolean', 'number', 'string', 'json');
            END IF;
          END $$;
        `);
      await db.execute(sql3`
          CREATE TABLE IF NOT EXISTS "platform_settings" (
            "id" varchar PRIMARY KEY DEFAULT gen_random_uuid(),
            "key" varchar(100) NOT NULL UNIQUE,
            "value" text NOT NULL,
            "data_type" setting_data_type NOT NULL DEFAULT 'string',
            "description" text,
            "category" varchar(50) NOT NULL,
            "is_public" boolean NOT NULL DEFAULT false,
            "updated_by" varchar REFERENCES "users"("id"),
            "updated_at" timestamptz NOT NULL DEFAULT now()
          );
        `);
      await db.execute(sql3`
          CREATE TABLE IF NOT EXISTS "settings_audit" (
            "id" varchar PRIMARY KEY DEFAULT gen_random_uuid(),
            "setting_key" varchar(100) NOT NULL,
            "old_value" text,
            "new_value" text NOT NULL,
            "changed_by" varchar NOT NULL REFERENCES "users"("id"),
            "changed_at" timestamptz NOT NULL DEFAULT now()
          );
        `);
      await db.execute(sql3`CREATE INDEX IF NOT EXISTS "IDX_settings_audit_key" ON "settings_audit" ("setting_key");`);
      await db.execute(sql3`CREATE INDEX IF NOT EXISTS "IDX_settings_audit_changed_by" ON "settings_audit" ("changed_by");`);
      await db.execute(sql3`CREATE INDEX IF NOT EXISTS "IDX_settings_audit_changed_at" ON "settings_audit" ("changed_at");`);
    }
  }
  app2.post("/api/seed-platform-settings", async (req, res) => {
    try {
      await ensurePlatformSettingsTables();
      const settings = [
        {
          key: "platform_name",
          value: "Fusion Mining Limited",
          description: "Name of the platform",
          category: "general",
          dataType: "string",
          isPublic: true
        },
        {
          key: "platform_tagline",
          value: "B2B Mining Marketplace & Investment Platform",
          description: "Platform tagline and description",
          category: "general",
          dataType: "string",
          isPublic: true
        },
        {
          key: "commission_rate",
          value: "5",
          description: "Platform commission rate on transactions (percentage)",
          category: "payment",
          dataType: "number",
          isPublic: false
        },
        {
          key: "support_email",
          value: "support@fusionmining.com",
          description: "Contact email for platform support",
          category: "email",
          dataType: "string",
          isPublic: true
        },
        {
          key: "smtp_enabled",
          value: "false",
          description: "Enable SMTP email sending",
          category: "email",
          dataType: "boolean",
          isPublic: false
        },
        {
          key: "maintenance_mode",
          value: "false",
          description: "Enable/disable maintenance mode",
          category: "general",
          dataType: "boolean",
          isPublic: false
        },
        {
          key: "max_upload_size_mb",
          value: "10",
          description: "Maximum file upload size in megabytes",
          category: "general",
          dataType: "number",
          isPublic: false
        },
        {
          key: "auto_approve_listings",
          value: "false",
          description: "Automatically approve marketplace listings without admin review",
          category: "general",
          dataType: "boolean",
          isPublic: false
        },
        {
          key: "session_timeout_hours",
          value: "24",
          description: "User session timeout in hours",
          category: "security",
          dataType: "number",
          isPublic: false
        },
        {
          key: "require_email_verification",
          value: "true",
          description: "Require users to verify their email address",
          category: "security",
          dataType: "boolean",
          isPublic: false
        },
        {
          key: "stripe_enabled",
          value: "false",
          description: "Enable Stripe payment processing",
          category: "payment",
          dataType: "boolean",
          isPublic: false
        }
      ];
      for (const setting of settings) {
        try {
          await storage.createPlatformSetting(setting);
        } catch (error) {
          if (error?.code !== "23505") {
            console.warn("Seed setting skipped:", setting.key, error?.message);
          }
        }
      }
      const allSettings = await storage.getAllPlatformSettings();
      res.json({
        message: "Platform settings seeded successfully",
        count: allSettings.length,
        settings: allSettings
      });
    } catch (error) {
      console.error("Error seeding platform settings:", error);
      res.status(500).json({ message: "Failed to seed platform settings" });
    }
  });
  app2.get("/api/platform-settings", requireAuth, requireAdmin, async (req, res) => {
    try {
      const settings = await storage.getAllPlatformSettings();
      res.json(settings);
    } catch (error) {
      console.error("Error fetching platform settings:", error);
      res.status(500).json({ message: "Failed to fetch platform settings" });
    }
  });
  app2.get("/api/membership-benefits", async (req, res) => {
    try {
      const benefits = await storage.getAllMembershipBenefits();
      res.json(benefits);
    } catch (error) {
      console.error("Error fetching membership benefits:", error);
      res.status(500).json({ message: "Failed to fetch membership benefits" });
    }
  });
  app2.put("/api/admin/membership-benefits/:tier", requireAuth, requireAdmin, async (req, res) => {
    try {
      const { tier } = req.params;
      const updated = await storage.updateMembershipBenefit(tier, req.body);
      res.json(updated);
    } catch (error) {
      console.error("Error updating membership benefit:", error);
      res.status(500).json({ message: "Failed to update membership benefit" });
    }
  });
  app2.post("/api/admin/users/:userId/tier", requireAuth, requireAdmin, async (req, res) => {
    try {
      const { userId } = req.params;
      const { tier } = req.body;
      if (!tier || !["basic", "standard", "premium"].includes(tier)) {
        return res.status(400).json({ message: "Invalid tier" });
      }
      const updated = await storage.updateUserMembershipTier(userId, tier);
      res.json(updated);
    } catch (error) {
      console.error("Error updating user tier:", error);
      res.status(500).json({ message: "Failed to update user tier" });
    }
  });
  app2.post("/api/admin/users/:userId/verification-status", requireAuth, requireAdmin, async (req, res) => {
    try {
      const { userId } = req.params;
      const { status } = req.body;
      if (!status || !["not_requested", "pending", "approved", "rejected"].includes(status)) {
        return res.status(400).json({ message: "Invalid verification status" });
      }
      const targetUser = await storage.getUserById(userId);
      if (!targetUser) {
        return res.status(404).json({ message: "User not found" });
      }
      if (targetUser.role !== "seller") {
        return res.status(400).json({ message: "Verification status can only be updated for sellers" });
      }
      const updated = await storage.updateUserVerificationStatus(userId, status);
      res.json(updated);
    } catch (error) {
      console.error("Error updating user verification status:", error);
      res.status(500).json({ message: "Failed to update user verification status" });
    }
  });
  app2.post("/api/admin/seed-sample-data", requireAuth, requireAdmin, async (req, res) => {
    try {
      const results = {
        users: 0,
        projects: 0,
        listings: 0,
        buyerRequests: 0,
        blogPosts: 0
      };
      const sampleUsers = [
        {
          email: "basic.user@fusionmining.com",
          password: await bcrypt.hash("basic123", 10),
          firstName: "Basic",
          lastName: "User",
          role: "buyer",
          membershipTier: "basic"
        },
        {
          email: "standard.user@fusionmining.com",
          password: await bcrypt.hash("standard123", 10),
          firstName: "Standard",
          lastName: "User",
          role: "buyer",
          membershipTier: "standard"
        },
        {
          email: "premium.user@fusionmining.com",
          password: await bcrypt.hash("premium123", 10),
          firstName: "Premium",
          lastName: "User",
          role: "buyer",
          membershipTier: "premium"
        },
        {
          email: "seller.verified@fusionmining.com",
          password: await bcrypt.hash("seller123", 10),
          firstName: "Verified",
          lastName: "Seller",
          role: "seller",
          membershipTier: "premium"
        }
      ];
      for (const userData of sampleUsers) {
        try {
          await storage.upsertUser(userData);
          results.users++;
        } catch (e) {
          console.log("User already exists:", userData.email);
        }
      }
      res.json({
        message: "Sample data seeded successfully",
        results
      });
    } catch (error) {
      console.error("Error seeding sample data:", error);
      res.status(500).json({ message: "Failed to seed sample data" });
    }
  });
  app2.post("/api/register", async (req, res) => {
    try {
      const { email, password, firstName, lastName, role, membershipTier } = req.body;
      if (!email || !password || !firstName || !lastName || !role) {
        return res.status(400).json({ message: "Missing required fields" });
      }
      const existingUser = await storage.getUserByEmail(email);
      if (existingUser) {
        return res.status(400).json({ message: "User with this email already exists" });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await storage.upsertUser({
        email,
        password: hashedPassword,
        firstName,
        lastName
      });
      await storage.updateUserRole(user.id, role);
      if (membershipTier && ["basic", "standard", "premium"].includes(membershipTier)) {
        await db.update(users).set({ membershipTier }).where(eq4(users.id, user.id));
      }
      await storage.createUserProfile({
        userId: user.id,
        profileType: "individual",
        verified: false
      });
      const updatedUser = await storage.getUser(user.id);
      res.json({
        success: true,
        message: "Registration successful",
        user: updatedUser
      });
    } catch (error) {
      console.error("Error during registration:", error);
      res.status(500).json({ message: "Registration failed" });
    }
  });
  app2.get("/api/auth/user", requireAuth, async (req, res) => {
    try {
      const clerkUserId = req.auth.userId;
      if (!clerkUserId) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      const { syncClerkUser: syncClerkUser2 } = await Promise.resolve().then(() => (init_localAuth(), localAuth_exports));
      const user = await syncClerkUser2(clerkUserId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      let adminPerms = void 0;
      if (user.role === "admin") {
        try {
          adminPerms = await storage.getAdminPermissions(user.id);
          console.log("[AUTH/USER] Retrieved admin permissions:", adminPerms?.adminRole);
        } catch (e) {
          console.error("Error getting admin permissions:", e);
        }
      }
      res.json({
        user: {
          ...user,
          adminPermissions: adminPerms
        }
      });
    } catch (error) {
      console.error("Error in /api/auth/user:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  function getPermissionsForRole(role) {
    const basePerms = {
      canManageUsers: false,
      canManageListings: false,
      canManageProjects: false,
      canManageBlog: false,
      canManageCMS: false,
      canViewAnalytics: false,
      canManageMessages: false,
      canManageVerification: false,
      canManageSettings: false,
      canManageAdmins: false,
      canAccessAuditLogs: false,
      canManageDocuments: false,
      canResetPasswords: false,
      canForceLogout: false
    };
    switch (role) {
      case "super_admin":
        return { ...basePerms, ...Object.keys(basePerms).reduce((acc, key) => ({ ...acc, [key]: true }), {}) };
      case "verification_admin":
        return { ...basePerms, canManageVerification: true, canManageListings: true, canAccessAuditLogs: true, canManageUsers: true };
      case "content_admin":
        return { ...basePerms, canManageBlog: true, canManageCMS: true, canManageSettings: true };
      case "support_admin":
        return { ...basePerms, canManageMessages: true, canManageUsers: true, canAccessAuditLogs: true };
      case "analytics_admin":
        return { ...basePerms, canViewAnalytics: true, canAccessAuditLogs: true };
      default:
        return basePerms;
    }
  }
  app2.get("/api/admin/users/:id/permissions", requireAuth, requireAdmin, requireAdminPermission("canManageUsers"), async (req, res) => {
    try {
      const perms = await storage.getAdminPermissions(req.params.id);
      res.json(perms || null);
    } catch (error) {
      console.error("Error fetching admin permissions:", error);
      res.status(500).json({ message: "Failed to fetch admin permissions" });
    }
  });
  app2.patch("/api/admin/users/:id/permissions", requireAuth, requireAdmin, requireAdminPermission("canManageUsers"), async (req, res) => {
    try {
      const adminUserId = req.params.id;
      const adminRole = req.body?.adminRole || "content_admin";
      const rolePerms = getPermissionsForRole(adminRole);
      const payload = {
        adminUserId,
        adminRole,
        ...rolePerms
      };
      const updated = await storage.upsertAdminPermissions(payload);
      res.json(updated);
    } catch (error) {
      console.error("Error updating admin permissions:", error);
      res.status(500).json({ message: "Failed to update admin permissions" });
    }
  });
  app2.post("/api/admin/messages/start", requireAuth, requireAdmin, requireAdminPermission("canManageMessages"), async (req, res) => {
    try {
      const adminId = req.user.claims?.sub || req.user.id;
      const { receiverId, subject, content } = req.body || {};
      if (!receiverId || !content) {
        return res.status(400).json({ message: "receiverId and content are required" });
      }
      const thread2 = await storage.createMessageThread({
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
        threadId: thread2.id,
        senderId: adminId,
        receiverId,
        subject: subject || null,
        content,
        context: "general",
        isAutoRelay: false
      });
      await storage.updateThreadLastMessage(thread2.id);
      res.json({ thread: thread2, message });
    } catch (error) {
      console.error("Error starting admin conversation:", error);
      res.status(500).json({ message: "Failed to start conversation" });
    }
  });
  app2.post("/api/admin/threads/start", requireAuth, requireAdmin, requireAdminPermission("canManageMessages"), async (req, res) => {
    try {
      const adminId = req.user.claims?.sub || req.user.id;
      const { receiverId, subject, content, listingId, projectId } = req.body || {};
      if (!receiverId || !content || !listingId && !projectId) {
        return res.status(400).json({ message: "receiverId, content and listingId/projectId are required" });
      }
      const thread2 = await storage.createMessageThread({
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
        threadId: thread2.id,
        senderId: adminId,
        receiverId,
        subject: subject || null,
        content,
        relatedProjectId: projectId || null,
        relatedListingId: listingId || null,
        context: listingId ? "marketplace" : projectId ? "project_interest" : "general",
        isAutoRelay: false
      });
      await storage.updateThreadLastMessage(thread2.id);
      res.json({ thread: thread2, message });
    } catch (error) {
      console.error("Error starting context thread:", error);
      res.status(500).json({ message: "Failed to start thread" });
    }
  });
  app2.get("/api/profile", requireAuth, async (req, res) => {
    try {
      const userId = req.user.claims?.sub || req.user.id;
      const profile = await storage.getUserProfile(userId);
      res.json(profile);
    } catch (error) {
      console.error("Error fetching profile:", error);
      res.status(500).json({ message: "Failed to fetch profile" });
    }
  });
  app2.post("/api/profile", requireAuth, async (req, res) => {
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
  app2.patch("/api/profile", requireAuth, async (req, res) => {
    try {
      const userId = req.user.claims?.sub || req.user.id;
      const validatedData = updateUserProfileSchema.parse({
        ...req.body,
        userId
      });
      const profile = await storage.updateUserProfile(validatedData);
      try {
        await storage.createActivityLog({
          userId,
          activityType: "profile_updated",
          description: `Updated user profile`,
          ipAddress: req.headers["x-forwarded-for"]?.split(",")[0]?.trim() || req.headers["x-real-ip"] || req.ip || req.socket.remoteAddress || null,
          userAgent: req.get("user-agent") || null,
          metadata: { profileId: profile.id }
        });
      } catch (logError) {
        console.error("[ACTIVITY LOG] Failed to log profile update:", logError);
      }
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
      const requireAdmin2 = req.user && req.user.role === "admin";
      const filteredProjects = requireAdmin2 ? projects2 : projects2.filter((p) => p.status === "active");
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
  app2.post("/api/projects", requireAuth, async (req, res) => {
    try {
      const userId = req.user.claims?.sub || req.user.id;
      if (!userId) {
        return res.status(401).json({ message: "Authentication required" });
      }
      const validatedData = insertProjectSchema.parse(req.body);
      const projectData = {
        ...validatedData,
        ownerId: userId
      };
      const project = await storage.createProject(projectData);
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
  app2.patch("/api/projects/:id", requireAuth, requireAdmin, async (req, res) => {
    try {
      const validatedData = insertProjectSchema.partial().parse(req.body);
      const { ownerId, ...updateData } = validatedData;
      const project = await storage.updateProject(req.params.id, updateData);
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
  app2.delete("/api/projects/:id", requireAuth, requireAdmin, async (req, res) => {
    try {
      await storage.deleteProject(req.params.id);
      res.json({ success: true });
    } catch (error) {
      console.error("Error deleting project:", error);
      res.status(500).json({ message: "Failed to delete project" });
    }
  });
  app2.patch("/api/projects/:id/close", requireAuth, async (req, res) => {
    try {
      const project = await storage.closeProject(req.params.id);
      res.json(project);
    } catch (error) {
      console.error("Error closing project:", error);
      res.status(500).json({ message: "Failed to close project" });
    }
  });
  app2.post("/api/projects/interest", requireAuth, async (req, res) => {
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
      if (projectId) {
        const project = await storage.getProjectById(projectId);
        if (project && buyer && project.ownerId) {
          const projectOwner = await storage.getUserById(project.ownerId);
          if (projectOwner) {
            const thread2 = await storage.createMessageThread({
              title: `Inquiry about: ${project.name}`,
              type: "project_interest",
              projectId,
              buyerId: userId,
              sellerId: project.ownerId,
              adminId: null,
              createdBy: userId,
              context: "project_interest",
              status: "open"
            });
            await storage.createNotification({
              userId: project.ownerId,
              type: "interest_received",
              title: "New Interest in Your Project",
              message: `${buyer.firstName} ${buyer.lastName} expressed interest in ${project.name}`,
              link: `/dashboard/messages`
            });
            const ownerName = `${projectOwner.firstName || ""} ${projectOwner.lastName || ""}`.trim() || "Project Owner";
            const buyerName = `${buyer.firstName || ""} ${buyer.lastName || ""}`.trim() || "there";
            await storage.createMessage({
              threadId: thread2.id,
              senderId: project.ownerId,
              receiverId: userId,
              subject: `Re: Inquiry about ${project.name}`,
              content: `Hello ${buyerName},

Thank you for your interest in ${project.name}. I'm ${ownerName}, the project owner. I'd be happy to discuss this opportunity with you.

Please feel free to ask any questions you may have.

Best regards,
${ownerName}`,
              context: "project_interest",
              relatedProjectId: projectId,
              isAutoRelay: true
            });
          }
        }
      } else if (listingId) {
        const listing = await storage.getMarketplaceListingById(listingId);
        const seller = listing ? await storage.getUserById(listing.sellerId) : null;
        if (listing && buyer && seller) {
          const thread2 = await storage.createMessageThread({
            title: `Inquiry about: ${listing.title}`,
            type: "marketplace_inquiry",
            listingId,
            buyerId: userId,
            sellerId: listing.sellerId,
            adminId: null,
            createdBy: userId,
            context: "marketplace",
            status: "open"
          });
          await storage.createNotification({
            userId: seller.id,
            type: "interest_received",
            title: "New Interest in Your Listing",
            message: `${buyer.firstName} ${buyer.lastName} expressed interest in ${listing.title}`,
            link: `/dashboard/messages`
          });
          const sellerName = `${seller.firstName || ""} ${seller.lastName || ""}`.trim() || "Seller";
          const buyerName = `${buyer.firstName || ""} ${buyer.lastName || ""}`.trim() || "there";
          await storage.createMessage({
            threadId: thread2.id,
            senderId: listing.sellerId,
            receiverId: userId,
            subject: `Re: Inquiry about ${listing.title}`,
            content: `Hello ${buyerName},

Thank you for your interest in ${listing.title}. I'm ${sellerName}, the seller. I'd be happy to provide more information and answer any questions you might have.

Feel free to reach out with your questions.

Best regards,
${sellerName}`,
            context: "marketplace",
            relatedListingId: listingId,
            isAutoRelay: true
          });
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
  app2.get("/api/projects/:id/has-interest", requireAuth, async (req, res) => {
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
  app2.get("/api/admin/projects-interest", requireAuth, requireAdmin, async (req, res) => {
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
      const requireAdmin2 = req.user && req.user.role === "admin";
      const listings = await storage.getMarketplaceListings({
        type,
        status
      });
      const filteredListings = requireAdmin2 ? listings : listings.filter((l) => l.status === "approved");
      res.json(filteredListings);
    } catch (error) {
      console.error("Error fetching listings:", error);
      res.status(500).json({ message: "Failed to fetch listings" });
    }
  });
  app2.get("/api/dashboard/listings", requireAuth, async (req, res) => {
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
  app2.post("/api/marketplace/listings", requireAuth, requireSeller, async (req, res) => {
    try {
      const sellerId = req.user.claims?.sub || req.user.id;
      const validatedData = insertMarketplaceListingSchema.parse({
        ...req.body,
        sellerId
      });
      const listing = await storage.createMarketplaceListing(validatedData);
      try {
        await storage.createActivityLog({
          userId: sellerId,
          activityType: "listing_created",
          description: `Created marketplace listing: "${listing.title || listing.id}"`,
          ipAddress: req.headers["x-forwarded-for"]?.split(",")[0]?.trim() || req.headers["x-real-ip"] || req.ip || req.socket.remoteAddress || null,
          userAgent: req.get("user-agent") || null,
          metadata: { listingId: listing.id, listingType: listing.listingType }
        });
      } catch (logError) {
        console.error("[ACTIVITY LOG] Failed to log listing creation:", logError);
      }
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
  app2.post("/api/marketplace/buyer-requests", requireAuth, async (req, res) => {
    try {
      const buyerId = req.user.claims?.sub || req.user.id;
      const tierCheck = await storage.checkUserCanCreateRFQ(buyerId);
      if (!tierCheck.allowed) {
        return res.status(403).json({
          message: tierCheck.reason || "You have reached your tier limit for active RFQs",
          tierLimitReached: true
        });
      }
      const validatedData = insertBuyerRequestSchema.parse({
        ...req.body,
        buyerId
      });
      const request = await storage.createBuyerRequest(validatedData);
      const currentMonth = (/* @__PURE__ */ new Date()).toISOString().slice(0, 7);
      await storage.incrementUserRFQCount(buyerId, currentMonth);
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
  app2.patch("/api/marketplace/buyer-requests/:id/close", requireAuth, async (req, res) => {
    try {
      const buyerId = req.user.claims?.sub || req.user.id;
      const id = req.params.id;
      const existing = await storage.getBuyerRequestById(id);
      if (!existing) {
        return res.status(404).json({ message: "Request not found" });
      }
      if (existing.buyerId !== buyerId) {
        return res.status(403).json({ message: "You are not allowed to modify this request" });
      }
      const updated = await storage.updateBuyerRequestStatus(id, "closed");
      res.json(updated);
    } catch (error) {
      console.error("Error closing buyer request:", error);
      res.status(500).json({ message: "Failed to close request" });
    }
  });
  app2.get("/api/dashboard/listings", requireAuth, async (req, res) => {
    try {
      const sellerId = req.user.claims?.sub || req.user.id;
      const listings = await storage.getListingsBySellerId(sellerId);
      res.json(listings);
    } catch (error) {
      console.error("Error fetching user listings:", error);
      res.status(500).json({ message: "Failed to fetch listings" });
    }
  });
  app2.patch("/api/marketplace/listings/:id", requireAuth, requireAdmin, requireAdminPermission("canManageListings"), async (req, res) => {
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
  app2.delete("/api/marketplace/listings/:id", requireAuth, requireAdmin, requireAdminPermission("canManageListings"), async (req, res) => {
    try {
      await storage.deleteMarketplaceListing(req.params.id);
      res.json({ success: true });
    } catch (error) {
      console.error("Error deleting listing:", error);
      res.status(500).json({ message: "Failed to delete listing" });
    }
  });
  app2.patch("/api/marketplace/listings/:id/close", requireAuth, async (req, res) => {
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
  app2.post("/api/threads", requireAuth, async (req, res) => {
    try {
      const userId = req.user.claims?.sub || req.user.id;
      const { projectId, listingId, title } = req.body;
      if (!projectId && !listingId) {
        return res.status(400).json({ message: "Either projectId or listingId is required" });
      }
      const currentUser = await storage.getUserById(userId);
      if (!currentUser) {
        return res.status(404).json({ message: "User not found" });
      }
      let buyerId = userId;
      let sellerId = null;
      let adminId = null;
      let threadTitle = title;
      const adminUser = await storage.getAdminUser();
      adminId = adminUser?.id || null;
      if (projectId) {
        const project = await storage.getProjectById(projectId);
        if (!project) {
          return res.status(404).json({ message: "Project not found" });
        }
        sellerId = project.ownerId;
        threadTitle = threadTitle || `Inquiry about: ${project.name}`;
      } else if (listingId) {
        const listing = await storage.getMarketplaceListingById(listingId);
        if (!listing) {
          return res.status(404).json({ message: "Listing not found" });
        }
        sellerId = listing.sellerId;
        threadTitle = threadTitle || `Inquiry about: ${listing.title}`;
      }
      const thread2 = await storage.createMessageThread({
        title: threadTitle,
        type: projectId ? "project_interest" : "marketplace_inquiry",
        projectId,
        listingId,
        buyerId,
        sellerId,
        adminId,
        createdBy: userId,
        status: "open"
      });
      res.json(thread2);
    } catch (error) {
      console.error("Error creating thread:", error);
      res.status(500).json({ message: "Failed to create thread" });
    }
  });
  app2.get("/api/threads", requireAuth, async (req, res) => {
    try {
      const user = await syncClerkUser(req.auth.userId);
      const userId = user.id;
      const threads = await storage.getThreadsByUserId(userId);
      res.json(threads);
    } catch (error) {
      console.error("Error fetching threads:", error);
      res.status(500).json({ message: "Failed to fetch threads" });
    }
  });
  app2.get("/api/threads/all", requireAuth, requireAdmin, async (req, res) => {
    try {
      const status = req.query.status;
      const priority = req.query.priority;
      const assignedAdminId = req.query.assignedAdminId;
      const tickets = await storage.getAdminSupportTickets({ status, priority, assignedAdminId });
      res.json(tickets);
    } catch (error) {
      console.error("Error fetching admin support tickets:", error);
      res.status(500).json({ message: "Failed to fetch support tickets" });
    }
  });
  app2.get("/api/admin/threads/categorized", requireAuth, requireAdmin, async (req, res) => {
    try {
      const allTickets = await storage.getAdminSupportTickets();
      const open = allTickets.filter((t) => t.ticketStatus === "open");
      const inProgress = allTickets.filter((t) => t.ticketStatus === "in_progress");
      const waitingUser = allTickets.filter((t) => t.ticketStatus === "waiting_user");
      const resolved = allTickets.filter((t) => t.ticketStatus === "resolved");
      res.json({
        open,
        inProgress,
        waitingUser,
        resolved
      });
    } catch (error) {
      console.error("Error fetching categorized support tickets:", error);
      res.status(500).json({ message: "Failed to fetch support tickets" });
    }
  });
  app2.get("/api/threads/:id", requireAuth, async (req, res) => {
    try {
      const thread2 = await storage.getThreadById(req.params.id);
      if (!thread2) {
        return res.status(404).json({ message: "Thread not found" });
      }
      res.json(thread2);
    } catch (error) {
      console.error("Error fetching thread:", error);
      res.status(500).json({ message: "Failed to fetch thread" });
    }
  });
  app2.get("/api/threads/:id/details", requireAuth, async (req, res) => {
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
  app2.get("/api/threads/:id/messages", requireAuth, async (req, res) => {
    try {
      const messages2 = await storage.getMessagesByThreadId(req.params.id);
      res.json(messages2);
    } catch (error) {
      console.error("Error fetching thread messages:", error);
      res.status(500).json({ message: "Failed to fetch messages" });
    }
  });
  app2.post("/api/threads/:id/messages", requireAuth, async (req, res) => {
    try {
      const senderId = req.user.claims?.sub || req.user.id;
      const threadId = req.params.id;
      const thread2 = await storage.getThreadById(threadId);
      if (!thread2) {
        return res.status(404).json({ message: "Thread not found" });
      }
      const sender = await storage.getUserById(senderId);
      if (!sender) {
        return res.status(404).json({ message: "User not found" });
      }
      const receiverId = senderId === thread2.buyerId ? thread2.sellerId : thread2.buyerId;
      const validatedData = insertMessageSchema.parse({
        threadId,
        senderId,
        receiverId,
        subject: req.body.subject || thread2.title,
        content: req.body.content,
        relatedProjectId: thread2.projectId,
        relatedListingId: thread2.listingId
      });
      const message = await storage.createMessage(validatedData);
      await storage.updateThreadLastMessage(threadId);
      try {
        await storage.createActivityLog({
          userId: senderId,
          activityType: "message_sent",
          description: `Sent message in thread: "${thread2.title || threadId}"`,
          ipAddress: req.headers["x-forwarded-for"]?.split(",")[0]?.trim() || req.headers["x-real-ip"] || req.ip || req.socket.remoteAddress || null,
          userAgent: req.get("user-agent") || null,
          metadata: { threadId, messageId: message.id, receiverId }
        });
      } catch (logError) {
        console.error("[ACTIVITY LOG] Failed to log message:", logError);
      }
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
  app2.patch("/api/threads/:id/close", requireAuth, async (req, res) => {
    try {
      const thread2 = await storage.closeThread(req.params.id);
      res.json(thread2);
    } catch (error) {
      console.error("Error closing thread:", error);
      res.status(500).json({ message: "Failed to close thread" });
    }
  });
  app2.post("/api/support/tickets", requireAuth, async (req, res) => {
    try {
      const userId = req.user.claims?.sub || req.user.id;
      const { title, description, priority } = req.body;
      if (!title || !description) {
        return res.status(400).json({ message: "Title and description are required" });
      }
      const ticket = await storage.createSupportTicket(userId, title, description, priority);
      await storage.createMessage({
        threadId: ticket.id,
        senderId: userId,
        receiverId: "admin",
        // Will be matched to actual admin later
        subject: title,
        content: description,
        context: "general"
      });
      res.json(ticket);
    } catch (error) {
      console.error("Error creating support ticket:", error);
      res.status(500).json({ message: "Failed to create support ticket" });
    }
  });
  app2.post("/api/admin/support/tickets/:id/claim", requireAuth, requireAdmin, async (req, res) => {
    try {
      const adminId = req.user.claims?.sub || req.user.id;
      const ticketId = req.params.id;
      const ticket = await storage.claimSupportTicket(ticketId, adminId);
      res.json(ticket);
    } catch (error) {
      console.error("Error claiming support ticket:", error);
      res.status(500).json({ message: "Failed to claim support ticket" });
    }
  });
  app2.patch("/api/admin/support/tickets/:id/resolve", requireAuth, requireAdmin, async (req, res) => {
    try {
      const ticketId = req.params.id;
      const { notes } = req.body;
      const ticket = await storage.resolveSupportTicket(ticketId, notes);
      res.json(ticket);
    } catch (error) {
      console.error("Error resolving support ticket:", error);
      res.status(500).json({ message: "Failed to resolve support ticket" });
    }
  });
  app2.get("/api/admin/support/tickets", requireAuth, requireAdmin, async (req, res) => {
    try {
      const status = req.query.status;
      const priority = req.query.priority;
      const assignedAdminId = req.query.assignedAdminId;
      const tickets = await storage.getAdminSupportTickets({ status, priority, assignedAdminId });
      res.json(tickets);
    } catch (error) {
      console.error("Error fetching support tickets:", error);
      res.status(500).json({ message: "Failed to fetch support tickets" });
    }
  });
  app2.patch("/api/threads/:id/ticket-status", requireAuth, requireAdmin, async (req, res) => {
    try {
      const ticketId = req.params.id;
      const { status } = req.body;
      if (!status) {
        return res.status(400).json({ message: "Status is required" });
      }
      const validStatuses = ["open", "in_progress", "waiting_user", "resolved"];
      if (!validStatuses.includes(status)) {
        return res.status(400).json({ message: "Invalid status value" });
      }
      const ticket = await storage.updateTicketStatus(ticketId, status);
      if (!ticket) {
        return res.status(404).json({ message: "Ticket not found" });
      }
      res.json(ticket);
    } catch (error) {
      console.error("Error updating ticket status:", error);
      res.status(500).json({ message: "Failed to update ticket status" });
    }
  });
  app2.patch("/api/threads/:id/ticket-priority", requireAuth, requireAdmin, async (req, res) => {
    try {
      const ticketId = req.params.id;
      const { priority } = req.body;
      if (!priority) {
        return res.status(400).json({ message: "Priority is required" });
      }
      const validPriorities = ["low", "normal", "high", "urgent"];
      if (!validPriorities.includes(priority)) {
        return res.status(400).json({ message: "Invalid priority value" });
      }
      const ticket = await storage.updateTicketPriority(ticketId, priority);
      if (!ticket) {
        return res.status(404).json({ message: "Ticket not found" });
      }
      res.json(ticket);
    } catch (error) {
      console.error("Error updating ticket priority:", error);
      res.status(500).json({ message: "Failed to update ticket priority" });
    }
  });
  app2.patch("/api/threads/:id/ticket-assign", requireAuth, requireAdmin, async (req, res) => {
    try {
      const ticketId = req.params.id;
      const { assignedAdminId } = req.body;
      const ticket = await storage.updateTicketAssignee(ticketId, assignedAdminId);
      if (!ticket) {
        return res.status(404).json({ message: "Ticket not found" });
      }
      res.json(ticket);
    } catch (error) {
      console.error("Error updating ticket assignee:", error);
      res.status(500).json({ message: "Failed to update ticket assignee" });
    }
  });
  app2.get("/api/admin/analytics", requireAuth, requireAdmin, async (req, res) => {
    try {
      const summary = await storage.getAnalyticsSummary();
      return res.json(summary);
    } catch (err) {
      console.error("Analytics error", err);
      return res.status(500).json({ error: "Failed to fetch analytics" });
    }
  });
  app2.post("/api/assistant/chat", async (req, res) => {
    try {
      const userId = req.user ? req.user.claims?.sub || req.user.id : null;
      const { message, history } = req.body;
      if (!message || typeof message !== "string") {
        return res.status(400).json({ message: "message is required" });
      }
      const safeHistory = Array.isArray(history) ? history.filter((h) => h && typeof h.content === "string").map((h) => ({
        role: h.role === "assistant" ? "assistant" : "user",
        content: h.content
      })) : [];
      let reply = "";
      const hfApiKey = process.env.HF_API_KEY;
      const hfModel = process.env.HF_MODEL || "deepseek-ai/DeepSeek-V3.2:novita";
      try {
        const m = String(hfModel || "").toLowerCase();
        if (!process.env.HF_USE_ROUTER && (m.includes("llama") || hfModel.includes("/"))) {
          process.env.HF_USE_ROUTER = "1";
          console.debug("HF_USE_ROUTER enabled for model:", hfModel);
        }
      } catch (e) {
      }
      if (hfApiKey) {
        try {
          const prompt = formatChatPrompt(message, safeHistory);
          reply = await askHuggingFace(hfModel, prompt, hfApiKey);
        } catch (hfErr) {
          console.error("HF Inference failed, falling back to Gemini/local:", hfErr);
          reply = await askSupportBot(message, safeHistory);
        }
      } else {
        reply = await askSupportBot(message, safeHistory);
      }
      res.json({ reply, userId });
    } catch (error) {
      console.error("Assistant chat error:", error);
      try {
        if (error && (error.status === 429 || error?.errorDetails && Array.isArray(error.errorDetails))) {
          let retryDelay = null;
          const details = error.errorDetails || [];
          for (const d of details) {
            if (d && typeof d === "object" && d["@type"] && d["@type"].includes("RetryInfo")) {
              retryDelay = d.retryDelay || null;
              break;
            }
          }
          if (retryDelay && typeof retryDelay === "string") {
            const m = /^\s*(\d+(?:\.\d+)?)(s|m|h)?\s*$/i.exec(retryDelay);
            if (m) {
              const val = Number(m[1]);
              const unit = (m[2] || "s").toLowerCase();
              let seconds = val;
              if (unit === "m") seconds = val * 60;
              if (unit === "h") seconds = val * 3600;
              res.setHeader("Retry-After", String(Math.ceil(seconds)));
            }
          }
          return res.status(429).json({ message: "Assistant quota exceeded; please try again later", retryDelay });
        }
      } catch (innerErr) {
        console.error("Error while handling assistant error details:", innerErr);
      }
      res.status(500).json({ message: "Assistant is temporarily unavailable" });
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
  app2.post("/api/uploads/messages", requireAuth, upload.single("file"), async (req, res) => {
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
  app2.get("/api/messages", requireAuth, async (req, res) => {
    try {
      const user = await syncClerkUser(req.auth.userId);
      const userId = user.id;
      const messages2 = await storage.getMessagesByUserId(userId);
      res.json(messages2);
    } catch (error) {
      console.error("Error fetching messages:", error);
      res.status(500).json({ message: "Failed to fetch messages" });
    }
  });
  app2.post("/api/messages", requireAuth, async (req, res) => {
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
      await storage.createNotification({
        userId: receiverId,
        type: "message",
        title: "New Message",
        message: `${sender.firstName} ${sender.lastName} sent you a message`,
        link: "/messages"
      });
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
  app2.post("/api/messages/contact-seller", requireAuth, requireAdmin, async (req, res) => {
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
  app2.get("/api/conversations/:userId", requireAuth, async (req, res) => {
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
  app2.get("/api/messages/:id/details", requireAuth, async (req, res) => {
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
  app2.patch("/api/messages/:id/close", requireAuth, async (req, res) => {
    try {
      const messageId = req.params.id;
      const currentUserId = req.user.claims?.sub || req.user.id;
      const messageDetails = await storage.getMessageWithSenderDetails(messageId);
      if (!messageDetails) return res.status(404).json({ message: "Message not found" });
      const main = messageDetails.message;
      const isParticipant = [main.senderId, main.receiverId].includes(currentUserId);
      const user = await storage.getUser(currentUserId);
      const requireAdminUser = user?.role === "admin";
      if (!isParticipant && !requireAdminUser) {
        return res.status(403).json({ message: "Not authorized to close this conversation" });
      }
      await storage.closeConversationByMessageId(messageId);
      res.json({ success: true });
    } catch (error) {
      console.error("Error closing conversation:", error);
      res.status(500).json({ message: "Failed to close conversation" });
    }
  });
  app2.get("/api/messages/check-contact", requireAuth, async (req, res) => {
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
  app2.get("/api/users/:id", requireAuth, async (req, res) => {
    try {
      const currentUserId = req.user?.claims?.sub || req.user?.id;
      const targetId = req.params.id;
      const requestingUser = await storage.getUser(currentUserId);
      const requireAdminUser = requestingUser?.role === "admin";
      if (!requireAdminUser && currentUserId !== targetId) {
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
      if (requireAdminUser || currentUserId === targetId) {
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
  app2.post("/api/blog", requireAuth, requireAdmin, async (req, res) => {
    try {
      const authorId = req.user.claims?.sub || req.user.id;
      const validatedData = insertBlogPostSchema.parse({
        ...req.body,
        authorId
      });
      const post = await storage.createBlogPost(validatedData);
      try {
        await storage.createActivityLog({
          userId: authorId,
          activityType: "blog_post_created",
          description: `Created blog post: "${post.title || post.id}"`,
          ipAddress: req.headers["x-forwarded-for"]?.split(",")[0]?.trim() || req.headers["x-real-ip"] || req.ip || req.socket.remoteAddress || null,
          userAgent: req.get("user-agent") || null,
          metadata: { postId: post.id, slug: post.slug }
        });
      } catch (logError) {
        console.error("[ACTIVITY LOG] Failed to log blog post creation:", logError);
      }
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
  app2.patch("/api/blog/:id/publish", requireAuth, requireAdmin, async (req, res) => {
    try {
      const post = await storage.publishBlogPost(req.params.id);
      res.json(post);
    } catch (error) {
      console.error("Error publishing blog post:", error);
      res.status(500).json({ message: "Failed to publish blog post" });
    }
  });
  app2.patch("/api/blog/:id", requireAuth, requireAdmin, async (req, res) => {
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
  app2.delete("/api/blog/:id", requireAuth, requireAdmin, async (req, res) => {
    try {
      await storage.deleteBlogPost(req.params.id);
      res.json({ message: "Blog post deleted successfully" });
    } catch (error) {
      console.error("Error deleting blog post:", error);
      res.status(500).json({ message: "Failed to delete blog post" });
    }
  });
  app2.get("/api/blog/admin/all", requireAuth, requireAdmin, async (req, res) => {
    try {
      const posts = await storage.getBlogPosts(false);
      res.json(posts);
    } catch (error) {
      console.error("Error fetching all blog posts:", error);
      res.status(500).json({ message: "Failed to fetch blog posts" });
    }
  });
  app2.get("/api/sustainability", async (req, res) => {
    try {
      const items = await storage.getSustainabilityContent();
      res.json(items);
    } catch (error) {
      console.error("Error fetching sustainability content:", error);
      res.status(500).json({ message: "Failed to fetch sustainability content" });
    }
  });
  app2.post("/api/sustainability", requireAuth, requireAdmin, async (req, res) => {
    try {
      const validatedData = insertSustainabilityContentSchema.parse(req.body);
      const item = await storage.createSustainabilityContent(validatedData);
      res.json(item);
    } catch (error) {
      if (error instanceof ZodError) {
        console.error("Validation error creating sustainability content:", formatZodError(error));
        return res.status(400).json({ message: formatZodError(error) });
      }
      console.error("Error creating sustainability content:", error);
      res.status(500).json({ message: "Failed to create sustainability content" });
    }
  });
  app2.patch("/api/sustainability/:id", requireAuth, requireAdmin, async (req, res) => {
    try {
      const validatedData = insertSustainabilityContentSchema.partial().parse(req.body);
      const item = await storage.updateSustainabilityContent(req.params.id, validatedData);
      res.json(item);
    } catch (error) {
      if (error instanceof ZodError) {
        console.error("Validation error updating sustainability content:", formatZodError(error));
        return res.status(400).json({ message: formatZodError(error) });
      }
      console.error("Error updating sustainability content:", error);
      res.status(500).json({ message: "Failed to update sustainability content" });
    }
  });
  app2.delete("/api/sustainability/:id", requireAuth, requireAdmin, async (req, res) => {
    try {
      await storage.deleteSustainabilityContent(req.params.id);
      res.json({ message: "Sustainability content deleted successfully" });
    } catch (error) {
      console.error("Error deleting sustainability content:", error);
      res.status(500).json({ message: "Failed to delete sustainability content" });
    }
  });
  app2.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactSubmissionSchema.parse(req.body);
      const submission = await storage.createContactSubmission(validatedData);
      try {
        const adminUser = await storage.getAdminUser();
        let thread2 = null;
        if (adminUser) {
          const requesterId = req.user ? req.user.claims?.sub || req.user.id : null;
          if (requesterId) {
            thread2 = await storage.createMessageThread({
              title: submission.subject || "Contact Admin",
              type: "support",
              projectId: null,
              listingId: null,
              buyerId: requesterId,
              sellerId: null,
              adminId: adminUser.id,
              createdBy: requesterId,
              context: "support",
              status: "open",
              requireAdminSupport: true,
              assignedAdminId: adminUser.id,
              ticketStatus: "open"
            });
            const content = `Contact submission from ${submission.name || ""} <${submission.email || ""}>
Phone: ${submission.phone || "N/A"}

${submission.message}

View thread: /dashboard/messages?threadId=${thread2.id}`;
            await storage.createMessage({
              threadId: thread2.id,
              senderId: requesterId,
              receiverId: adminUser.id,
              subject: submission.subject,
              content,
              context: "support",
              isAutoRelay: false
            });
            await storage.updateThreadLastMessage(thread2.id);
          } else {
            thread2 = await storage.createMessageThread({
              title: submission.subject || "Contact Form Submission",
              type: "support",
              projectId: null,
              listingId: null,
              buyerId: null,
              sellerId: null,
              adminId: adminUser.id,
              createdBy: adminUser.id,
              context: "support",
              status: "open",
              requireAdminSupport: true,
              assignedAdminId: adminUser.id,
              ticketStatus: "open"
            });
            const content = `Contact submission from ${submission.name} <${submission.email}>
Phone: ${submission.phone || "N/A"}

${submission.message}

View thread: /dashboard/messages?threadId=${thread2.id}`;
            await storage.createMessage({
              threadId: thread2.id,
              senderId: adminUser.id,
              receiverId: adminUser.id,
              subject: submission.subject,
              content,
              context: "support",
              isAutoRelay: true
            });
            await storage.updateThreadLastMessage(thread2.id);
          }
        }
      } catch (err) {
        console.error("Failed to create support thread for contact submission:", err);
      }
      try {
        const adminUsers = await storage.getUsersByRole("admin");
        for (const admin of adminUsers) {
          await storage.createNotification({
            userId: admin.id,
            type: "message",
            title: "New Contact Submission",
            message: `${submission.name || "Visitor"} submitted a contact: ${submission.subject || "No subject"}`,
            link: thread ? `/dashboard/messages?threadId=${thread.id}` : `/dashboard/messages`
          });
        }
      } catch (err) {
        console.error("Failed to create admin notifications for contact submission:", err);
      }
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
  app2.get("/api/contact/submissions", requireAuth, requireAdmin, async (req, res) => {
    try {
      const submissions = await storage.getContactSubmissions();
      res.json(submissions);
    } catch (error) {
      console.error("Error fetching contact submissions:", error);
      res.status(500).json({ message: "Failed to fetch submissions" });
    }
  });
  app2.patch("/api/contact/submissions/:id", requireAuth, requireAdmin, async (req, res) => {
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
  app2.patch("/api/contact/settings", requireAuth, requireAdmin, async (req, res) => {
    try {
      const settings = await storage.updateContactSettings(req.body);
      res.json(settings);
    } catch (error) {
      console.error("Error updating contact settings:", error);
      res.status(500).json({ message: "Failed to update contact settings" });
    }
  });
  app2.get("/api/admin/verification-queue", requireAuth, requireAdmin, async (req, res) => {
    try {
      const listings = await storage.getPendingListings();
      res.json(listings);
    } catch (error) {
      console.error("Error fetching verification queue:", error);
      res.status(500).json({ message: "Failed to fetch verification queue" });
    }
  });
  app2.post("/api/admin/verify/:id", requireAuth, requireAdmin, async (req, res) => {
    try {
      const reviewerId = req.user.claims?.sub || req.user.id;
      const listingId = req.params.id;
      const listing = await storage.getListing(listingId);
      await storage.approveListing(listingId, reviewerId);
      if (listing?.sellerId) {
        try {
          await storage.createActivityLog({
            userId: listing.sellerId,
            activityType: "listing_approved",
            description: `Listing "${listing.title || listingId}" was approved by admin`,
            ipAddress: req.ip || req.headers["x-forwarded-for"]?.split(",")[0]?.trim() || null,
            userAgent: req.get("user-agent") || null,
            metadata: { listingId, reviewerId }
          });
        } catch (logError) {
          console.error("[ACTIVITY LOG] Failed to log listing approval:", logError);
        }
      }
      res.json({ message: "Listing approved successfully" });
    } catch (error) {
      console.error("Error approving listing:", error);
      res.status(500).json({ message: "Failed to approve listing" });
    }
  });
  app2.post("/api/admin/reject/:id", requireAuth, requireAdmin, async (req, res) => {
    try {
      const reviewerId = req.user.claims?.sub || req.user.id;
      const listingId = req.params.id;
      const listing = await storage.getListing(listingId);
      await storage.rejectListing(listingId, reviewerId);
      if (listing?.sellerId) {
        try {
          await storage.createActivityLog({
            userId: listing.sellerId,
            activityType: "listing_rejected",
            description: `Listing "${listing.title || listingId}" was rejected by admin`,
            ipAddress: req.ip || req.headers["x-forwarded-for"]?.split(",")[0]?.trim() || null,
            userAgent: req.get("user-agent") || null,
            metadata: { listingId, reviewerId }
          });
        } catch (logError) {
          console.error("[ACTIVITY LOG] Failed to log listing rejection:", logError);
        }
      }
      res.json({ message: "Listing rejected successfully" });
    } catch (error) {
      console.error("Error rejecting listing:", error);
      res.status(500).json({ message: "Failed to reject listing" });
    }
  });
  app2.get("/api/admin/users", requireAuth, requireAdmin, async (req, res) => {
    try {
      const users2 = await storage.getAllUsers();
      const profiles = await db.select().from(userProfiles);
      const profileMap = new Map(profiles.map((p) => [p.userId, p]));
      const adminUsers = users2.filter((u) => u.role === "admin");
      const adminPermissionsMap = /* @__PURE__ */ new Map();
      for (const adminUser of adminUsers) {
        try {
          const permissions = await storage.getAdminPermissions(adminUser.id);
          if (permissions) {
            adminPermissionsMap.set(adminUser.id, permissions);
          }
        } catch (error) {
        }
      }
      const mergedUsers = users2.map((user) => {
        const profile = profileMap.get(user.id);
        const testUser = testUsersStore.get(user.id);
        const adminPermissions2 = adminPermissionsMap.get(user.id);
        return {
          ...user,
          phoneNumber: profile?.phoneNumber || "-",
          companyName: profile?.companyName || "-",
          // For admin user management, always trust the real database values
          // for membershipTier and verificationStatus, not any testUser overrides.
          ...adminPermissions2 && {
            adminRole: adminPermissions2.adminRole
          }
        };
      });
      res.json(mergedUsers);
    } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).json({ message: "Failed to fetch users" });
    }
  });
  app2.post("/api/admin/users", requireAuth, requireAdmin, async (req, res) => {
    try {
      const { email, password, username, firstName, lastName, role } = req.body || {};
      if (!email || !role) {
        return res.status(400).json({ message: "Email and role are required" });
      }
      let hashedPassword = void 0;
      if (password) {
        const saltRounds = 10;
        hashedPassword = await bcrypt.hash(password, saltRounds);
        console.log("[CREATE USER] Password hashed for user:", email);
      }
      const user = await storage.upsertUser({
        email,
        firstName,
        lastName,
        password: hashedPassword,
        username: username || void 0,
        // allow setting role on creation
        // @ts-ignore
        role
      });
      if (role === "admin") {
        await storage.upsertAdminPermissions({ adminUserId: user.id });
      }
      console.log("[CREATE USER] User created successfully:", { id: user.id, email, username, role });
      res.json(user);
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(500).json({ message: "Failed to create user" });
    }
  });
  app2.patch("/api/admin/users/:id/role", requireAuth, requireAdmin, async (req, res) => {
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
  app2.patch("/api/admin/users/:id/info", requireAuth, requireAdmin, async (req, res) => {
    try {
      const { firstName, lastName, email, phoneNumber, companyName, password, username } = req.body;
      const userId = req.params.id;
      if (firstName || lastName || email || password || username) {
        const updateData = {};
        if (firstName !== void 0) updateData.firstName = firstName;
        if (lastName !== void 0) updateData.lastName = lastName;
        if (email !== void 0) updateData.email = email;
        if (username !== void 0) updateData.username = username;
        if (password) {
          const saltRounds = 10;
          updateData.password = await bcrypt.hash(password, saltRounds);
          console.log("[UPDATE USER] Password updated and hashed for user:", userId);
        }
        await db.update(users).set(updateData).where(eq4(users.id, userId));
      }
      if (phoneNumber !== void 0 || companyName !== void 0) {
        const profileUpdateData = {};
        if (phoneNumber !== void 0) profileUpdateData.phoneNumber = phoneNumber;
        if (companyName !== void 0) profileUpdateData.companyName = companyName;
        const existingProfile = await db.select().from(userProfiles).where(eq4(userProfiles.userId, userId)).limit(1);
        if (existingProfile.length > 0) {
          await db.update(userProfiles).set(profileUpdateData).where(eq4(userProfiles.userId, userId));
        } else {
          await db.insert(userProfiles).values({
            userId,
            ...profileUpdateData,
            profileType: "individual"
          });
        }
      }
      const updatedUser = await storage.getUser(userId);
      res.json(updatedUser);
    } catch (error) {
      console.error("Error updating user information:", error);
      res.status(500).json({ message: "Failed to update user information" });
    }
  });
  app2.delete("/api/admin/users/:id", requireAuth, requireAdmin, async (req, res) => {
    try {
      await storage.deleteUser(req.params.id);
      res.json({ message: "User deleted successfully" });
    } catch (error) {
      console.error("Error deleting user:", error);
      res.status(500).json({ message: "Failed to delete user" });
    }
  });
  app2.get("/api/admin/users/:id/listings", requireAuth, requireAdmin, async (req, res) => {
    try {
      const sellerId = req.params.id;
      const listings = await storage.getListingsBySellerId(sellerId);
      res.json(listings);
    } catch (error) {
      console.error("Error fetching user listings (admin):", error);
      res.status(500).json({ message: "Failed to fetch user listings" });
    }
  });
  app2.get("/api/admin/roles", requireAuth, requireAdmin, async (req, res) => {
    try {
      const { ROLE_PERMISSIONS: ROLE_PERMISSIONS2, getAdminRoleDisplayName: getAdminRoleDisplayName2 } = await Promise.resolve().then(() => (init_rbac(), rbac_exports));
      const roles = Object.keys(ROLE_PERMISSIONS2).map((role) => ({
        value: role,
        label: getAdminRoleDisplayName2(role),
        permissions: ROLE_PERMISSIONS2[role]
      }));
      res.json(roles);
    } catch (error) {
      console.error("Error fetching admin roles:", error);
      res.status(500).json({ message: "Failed to fetch admin roles" });
    }
  });
  app2.get("/api/admin/users/by-role/:role", requireAuth, requireAdmin, async (req, res) => {
    try {
      const { role } = req.params;
      if (!["admin", "buyer", "seller"].includes(role)) {
        return res.status(400).json({ message: "Invalid role" });
      }
      const allUsers = await storage.getAllUsers();
      const filteredUsers = allUsers.filter((u) => u.role === role);
      if (role === "admin") {
        const usersWithPermissions = await Promise.all(
          filteredUsers.map(async (user) => {
            const permissions = await storage.getAdminPermissions(user.id);
            return {
              ...user,
              adminRole: permissions?.adminRole || null,
              permissions: permissions || null
            };
          })
        );
        res.json(usersWithPermissions);
      } else {
        res.json(filteredUsers);
      }
    } catch (error) {
      console.error("Error fetching users by role:", error);
      res.status(500).json({ message: "Failed to fetch users" });
    }
  });
  app2.patch("/api/admin/users/:id/admin-role", requireAuth, requireAdmin, async (req, res) => {
    try {
      const { adminRole } = req.body;
      const userId = req.params.id;
      if (!adminRole || !["super_admin", "verification_admin", "content_admin", "support_admin", "analytics_admin"].includes(adminRole)) {
        return res.status(400).json({ message: "Invalid admin role" });
      }
      const user = await storage.getUser(userId);
      if (!user || user.role !== "admin") {
        return res.status(400).json({ message: "User must be an admin" });
      }
      const { ROLE_PERMISSIONS: ROLE_PERMISSIONS2 } = await Promise.resolve().then(() => (init_rbac(), rbac_exports));
      const defaultPermissions = ROLE_PERMISSIONS2[adminRole];
      const permissions = await storage.upsertAdminPermissions({
        adminUserId: userId,
        adminRole,
        ...defaultPermissions
      });
      res.json(permissions);
    } catch (error) {
      console.error("Error updating admin role:", error);
      res.status(500).json({ message: "Failed to update admin role" });
    }
  });
  app2.put("/api/admin/users/:id/custom-permissions", requireAuth, requireAdmin, async (req, res) => {
    try {
      const userId = req.params.id;
      const permissions = req.body;
      if (req.adminPermissions?.adminRole !== "super_admin") {
        return res.status(403).json({ message: "Only Super Admins can update custom permissions" });
      }
      const updated = await storage.updateAdminPermissions({
        adminUserId: userId,
        ...permissions
      });
      res.json(updated);
    } catch (error) {
      console.error("Error updating custom permissions:", error);
      res.status(500).json({ message: "Failed to update permissions" });
    }
  });
  app2.get("/api/admin/audit-logs", requireAuth, requireAdmin, async (req, res) => {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit) : 500;
      const fromDate = req.query.from;
      const toDate = req.query.to;
      const action = req.query.action;
      let auditLogs = await storage.getAdminAuditLogs();
      if (action && action !== "all") {
        auditLogs = auditLogs.filter((log) => log.action === action);
      }
      if (fromDate || toDate) {
        auditLogs = auditLogs.filter((log) => {
          const logDate = new Date(log.createdAt);
          if (fromDate && logDate < new Date(fromDate)) return false;
          if (toDate) {
            const toDateEnd = new Date(toDate);
            toDateEnd.setHours(23, 59, 59, 999);
            if (logDate > toDateEnd) return false;
          }
          return true;
        });
      }
      res.json(auditLogs.slice(0, limit));
    } catch (error) {
      console.error("Error fetching admin audit logs:", error);
      res.status(500).json({ message: "Failed to fetch audit logs" });
    }
  });
  app2.post("/api/admin/audit-log", requireAuth, requireAdmin, async (req, res) => {
    try {
      const adminId = req.user.claims?.sub || req.user.id;
      const { action, targetType, targetId, changes } = req.body;
      if (!action || !targetType) {
        return res.status(400).json({ message: "Missing required fields" });
      }
      await db.insert(adminAuditLogs).values({
        adminId,
        action,
        targetType,
        targetId: targetId || null,
        changes: changes || null,
        ipAddress: req.ip,
        userAgent: req.get("user-agent"),
        createdAt: /* @__PURE__ */ new Date()
      });
      res.json({ message: "Audit log recorded" });
    } catch (error) {
      console.error("Error logging admin action:", error);
      res.status(500).json({ message: "Failed to log action" });
    }
  });
  app2.get("/api/admin/activity-logs", requireAuth, requireAdmin, async (req, res) => {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit) : 500;
      const activityType = req.query.activityType;
      const userId = req.query.userId;
      const logs = await storage.getActivityLogs(limit);
      let filteredLogs = logs.filter((log) => {
        return log.user?.role !== "admin";
      });
      if (activityType) {
        filteredLogs = filteredLogs.filter((log) => log.activityType === activityType);
      }
      if (userId) {
        filteredLogs = filteredLogs.filter((log) => log.userId === userId);
      }
      res.json(filteredLogs);
    } catch (error) {
      console.error("Error fetching activity logs:", error);
      res.status(500).json({ message: "Failed to fetch activity logs" });
    }
  });
  app2.get("/api/activity-logs/me", requireAuth, async (req, res) => {
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
  app2.get("/api/notifications", requireAuth, async (req, res) => {
    try {
      const user = await syncClerkUser(req.auth.userId);
      const userId = user.id;
      const notifications2 = await storage.getUserNotifications(userId);
      res.json(notifications2);
    } catch (error) {
      console.error("Error fetching notifications:", error);
      res.status(500).json({ message: "Failed to fetch notifications" });
    }
  });
  app2.get("/api/notifications/unread-count", requireAuth, async (req, res) => {
    try {
      const userId = req.user.claims?.sub || req.user.id;
      const count = await storage.getUnreadNotificationCount(userId);
      res.json({ count });
    } catch (error) {
      console.error("Error fetching unread count:", error);
      res.status(500).json({ message: "Failed to fetch unread count" });
    }
  });
  app2.post("/api/notifications/:id/read", requireAuth, async (req, res) => {
    try {
      await storage.markNotificationAsRead(req.params.id);
      res.json({ message: "Notification marked as read" });
    } catch (error) {
      console.error("Error marking notification as read:", error);
      res.status(500).json({ message: "Failed to mark notification as read" });
    }
  });
  app2.post("/api/notifications/mark-all-read", requireAuth, async (req, res) => {
    try {
      const userId = req.user.claims?.sub || req.user.id;
      await storage.markAllNotificationsAsRead(userId);
      res.json({ message: "All notifications marked as read" });
    } catch (error) {
      console.error("Error marking all notifications as read:", error);
      res.status(500).json({ message: "Failed to mark all notifications as read" });
    }
  });
  app2.get("/api/dashboard/stats", requireAuth, async (req, res) => {
    try {
      const user = await syncClerkUser(req.auth.userId);
      const userId = user.id;
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
  app2.get("/api/videos", requireAuth, requireAdmin, async (req, res) => {
    try {
      const videos2 = await storage.getAllVideos();
      res.json(videos2);
    } catch (error) {
      console.error("Error fetching videos:", error);
      res.status(500).json({ message: "Failed to fetch videos" });
    }
  });
  app2.post("/api/videos", requireAuth, requireAdmin, async (req, res) => {
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
  app2.patch("/api/videos/:id", requireAuth, requireAdmin, async (req, res) => {
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
  app2.post("/api/videos/:id/toggle-active", requireAuth, requireAdmin, async (req, res) => {
    try {
      const video = await storage.toggleVideoActive(req.params.id);
      res.json(video);
    } catch (error) {
      console.error("Error toggling video active status:", error);
      res.status(400).json({ message: error.message || "Failed to toggle video status" });
    }
  });
  app2.delete("/api/videos/:id", requireAuth, requireAdmin, async (req, res) => {
    try {
      await storage.deleteVideo(req.params.id);
      res.json({ message: "Video deleted successfully" });
    } catch (error) {
      console.error("Error deleting video:", error);
      res.status(500).json({ message: "Failed to delete video" });
    }
  });
  app2.get("/api/admin/settings/platform", requireAuth, requireAdmin, async (req, res) => {
    try {
      const settings = await storage.getAllPlatformSettings();
      res.json(settings);
    } catch (error) {
      console.error("Error fetching platform settings:", error);
      res.status(500).json({ message: "Failed to fetch platform settings" });
    }
  });
  app2.post("/api/admin/settings/platform", requireAuth, requireAdmin, async (req, res) => {
    try {
      const validatedData = insertPlatformSettingSchema.parse({ ...req.body, updatedBy: req.user.id });
      const setting = await storage.createPlatformSetting(validatedData);
      res.json(setting);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ message: formatZodError(error) });
      }
      console.error("Error creating platform setting:", error);
      res.status(500).json({ message: "Failed to create platform setting" });
    }
  });
  app2.patch("/api/admin/settings/platform/:id", requireAuth, requireAdmin, async (req, res) => {
    try {
      const currentSetting = await storage.getAllPlatformSettings();
      const existing = currentSetting.find((s) => s.id === req.params.id);
      const validatedData = updatePlatformSettingSchema.parse({ ...req.body, id: req.params.id, updatedBy: req.user.id });
      const setting = await storage.updatePlatformSetting(validatedData);
      if (existing && req.body.value !== void 0) {
        await storage.logSettingChange({
          settingKey: existing.key,
          oldValue: existing.value,
          newValue: req.body.value,
          changedBy: req.user.id
        });
      }
      res.json(setting);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ message: formatZodError(error) });
      }
      console.error("Error updating platform setting:", error);
      res.status(500).json({ message: "Failed to update platform setting" });
    }
  });
  app2.delete("/api/admin/settings/platform/:id", requireAuth, requireAdmin, async (req, res) => {
    try {
      await storage.deletePlatformSetting(req.params.id);
      res.json({ message: "Platform setting deleted successfully" });
    } catch (error) {
      console.error("Error deleting platform setting:", error);
      res.status(500).json({ message: "Failed to delete platform setting" });
    }
  });
  app2.get("/api/admin/settings/platform/category/:category", requireAuth, requireAdmin, async (req, res) => {
    try {
      const settings = await storage.getPlatformSettingsByCategory(req.params.category);
      res.json(settings);
    } catch (error) {
      console.error("Error fetching settings by category:", error);
      res.status(500).json({ message: "Failed to fetch settings" });
    }
  });
  app2.get("/api/admin/settings/audit", requireAuth, requireAdmin, async (req, res) => {
    try {
      const { settingKey, limit } = req.query;
      const logs = await storage.getSettingsAuditLogs(
        settingKey,
        limit ? parseInt(limit) : 50
      );
      res.json(logs);
    } catch (error) {
      console.error("Error fetching settings audit logs:", error);
      res.status(500).json({ message: "Failed to fetch audit logs" });
    }
  });
  app2.get("/api/admin/settings/email-templates", requireAuth, requireAdmin, async (req, res) => {
    try {
      const templates = await storage.getAllEmailTemplates();
      res.json(templates);
    } catch (error) {
      console.error("Error fetching email templates:", error);
      res.status(500).json({ message: "Failed to fetch email templates" });
    }
  });
  app2.post("/api/admin/settings/email-templates", requireAuth, requireAdmin, async (req, res) => {
    try {
      const validatedData = insertEmailTemplateSchema.parse(req.body);
      const template = await storage.createEmailTemplate(validatedData);
      res.json(template);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ message: formatZodError(error) });
      }
      console.error("Error creating email template:", error);
      res.status(500).json({ message: "Failed to create email template" });
    }
  });
  app2.patch("/api/admin/settings/email-templates/:id", requireAuth, requireAdmin, async (req, res) => {
    try {
      const validatedData = updateEmailTemplateSchema.parse({ ...req.body, id: req.params.id });
      const template = await storage.updateEmailTemplate(validatedData);
      res.json(template);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ message: formatZodError(error) });
      }
      console.error("Error updating email template:", error);
      res.status(500).json({ message: "Failed to update email template" });
    }
  });
  app2.delete("/api/admin/settings/email-templates/:id", requireAuth, requireAdmin, async (req, res) => {
    try {
      await storage.deleteEmailTemplate(req.params.id);
      res.json({ message: "Email template deleted successfully" });
    } catch (error) {
      console.error("Error deleting email template:", error);
      res.status(500).json({ message: "Failed to delete email template" });
    }
  });
  app2.get("/api/admin/settings/login-history", requireAuth, requireAdmin, async (req, res) => {
    try {
      const userId = req.query.userId;
      const history = await storage.getLoginHistory(userId);
      res.json(history);
    } catch (error) {
      console.error("Error fetching login history:", error);
      res.status(500).json({ message: "Failed to fetch login history" });
    }
  });
  app2.get("/api/admin/settings/verification-rules", requireAuth, requireAdmin, async (req, res) => {
    try {
      const rules = await storage.getAllVerificationRules();
      res.json(rules);
    } catch (error) {
      console.error("Error fetching verification rules:", error);
      res.status(500).json({ message: "Failed to fetch verification rules" });
    }
  });
  app2.post("/api/admin/settings/verification-rules", requireAuth, requireAdmin, async (req, res) => {
    try {
      const validatedData = insertVerificationRuleSchema.parse(req.body);
      const rule = await storage.createVerificationRule(validatedData);
      res.json(rule);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ message: formatZodError(error) });
      }
      console.error("Error creating verification rule:", error);
      res.status(500).json({ message: "Failed to create verification rule" });
    }
  });
  app2.patch("/api/admin/settings/verification-rules/:id", requireAuth, requireAdmin, async (req, res) => {
    try {
      const validatedData = updateVerificationRuleSchema.parse({ ...req.body, id: req.params.id });
      const rule = await storage.updateVerificationRule(validatedData);
      res.json(rule);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ message: formatZodError(error) });
      }
      console.error("Error updating verification rule:", error);
      res.status(500).json({ message: "Failed to update verification rule" });
    }
  });
  app2.delete("/api/admin/settings/verification-rules/:id", requireAuth, requireAdmin, async (req, res) => {
    try {
      await storage.deleteVerificationRule(req.params.id);
      res.json({ message: "Verification rule deleted successfully" });
    } catch (error) {
      console.error("Error deleting verification rule:", error);
      res.status(500).json({ message: "Failed to delete verification rule" });
    }
  });
  app2.get("/api/admin/settings/document-templates", requireAuth, requireAdmin, async (req, res) => {
    try {
      const templates = await storage.getAllDocumentTemplates();
      res.json(templates);
    } catch (error) {
      console.error("Error fetching document templates:", error);
      res.status(500).json({ message: "Failed to fetch document templates" });
    }
  });
  app2.post("/api/admin/settings/document-templates", requireAuth, requireAdmin, async (req, res) => {
    try {
      const validatedData = insertDocumentTemplateSchema.parse(req.body);
      const template = await storage.createDocumentTemplate(validatedData);
      res.json(template);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ message: formatZodError(error) });
      }
      console.error("Error creating document template:", error);
      res.status(500).json({ message: "Failed to create document template" });
    }
  });
  app2.patch("/api/admin/settings/document-templates/:id", requireAuth, requireAdmin, async (req, res) => {
    try {
      const validatedData = updateDocumentTemplateSchema.parse({ ...req.body, id: req.params.id });
      const template = await storage.updateDocumentTemplate(validatedData);
      res.json(template);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ message: formatZodError(error) });
      }
      console.error("Error updating document template:", error);
      res.status(500).json({ message: "Failed to update document template" });
    }
  });
  app2.delete("/api/admin/settings/document-templates/:id", requireAuth, requireAdmin, async (req, res) => {
    try {
      await storage.deleteDocumentTemplate(req.params.id);
      res.json({ message: "Document template deleted successfully" });
    } catch (error) {
      console.error("Error deleting document template:", error);
      res.status(500).json({ message: "Failed to delete document template" });
    }
  });
  app2.get("/api/admin/settings/audit-logs", requireAuth, requireAdmin, async (req, res) => {
    try {
      const adminId = req.query.adminId;
      const logs = await storage.getAdminAuditLogs(adminId);
      res.json(logs);
    } catch (error) {
      console.error("Error fetching audit logs:", error);
      res.status(500).json({ message: "Failed to fetch audit logs" });
    }
  });
  app2.patch("/api/admin/users/:id/password-reset", requireAuth, requireAdmin, async (req, res) => {
    try {
      const { newPassword } = req.body;
      if (!newPassword || newPassword.length < 6) {
        return res.status(400).json({ message: "Password must be at least 6 characters long" });
      }
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      await storage.updateUserPassword(req.params.id, hashedPassword);
      await storage.logAdminAudit({
        adminId: req.user.id,
        action: "user_password_reset",
        targetType: "user",
        targetId: req.params.id,
        changes: { resetBy: "admin" },
        ipAddress: req.ip,
        userAgent: req.get("user-agent")
      });
      res.json({ message: "Password reset successfully" });
    } catch (error) {
      console.error("Error resetting user password:", error);
      res.status(500).json({ message: "Failed to reset password" });
    }
  });
  app2.post("/api/admin/users/:id/force-logout", requireAuth, requireAdmin, async (req, res) => {
    try {
      await storage.forceUserLogout(req.params.id);
      await storage.logAdminAudit({
        adminId: req.user.id,
        action: "user_force_logout",
        targetType: "user",
        targetId: req.params.id,
        changes: {},
        ipAddress: req.ip,
        userAgent: req.get("user-agent")
      });
      res.json({ message: "User logged out successfully" });
    } catch (error) {
      console.error("Error forcing user logout:", error);
      res.status(500).json({ message: "Failed to force logout" });
    }
  });
  app2.patch("/api/admin/users/:id/role", requireAuth, requireAdmin, async (req, res) => {
    try {
      const { role } = req.body;
      if (!["admin", "buyer", "seller"].includes(role)) {
        return res.status(400).json({ message: "Invalid role" });
      }
      const updatedUser = await storage.updateUserRole(req.params.id, role);
      await storage.logAdminAudit({
        adminId: req.user.id,
        action: "user_role_updated",
        targetType: "user",
        targetId: req.params.id,
        changes: { newRole: role },
        ipAddress: req.ip,
        userAgent: req.get("user-agent")
      });
      res.json(updatedUser);
    } catch (error) {
      console.error("Error updating user role:", error);
      res.status(500).json({ message: "Failed to update user role" });
    }
  });
  app2.patch("/api/account/profile", requireAuth, async (req, res) => {
    try {
      const { firstName, lastName, email, profileImageUrl } = req.body;
      const updatedUser = await storage.updateUserInfo(req.user.id, {
        firstName,
        lastName,
        email,
        profileImageUrl
      });
      res.json(updatedUser);
    } catch (error) {
      console.error("Error updating profile:", error);
      res.status(500).json({ message: "Failed to update profile" });
    }
  });
  app2.post("/api/account/password-change", requireAuth, async (req, res) => {
    try {
      const { currentPassword, newPassword } = req.body;
      if (!currentPassword || !newPassword) {
        return res.status(400).json({ message: "Current and new password required" });
      }
      if (newPassword.length < 6) {
        return res.status(400).json({ message: "New password must be at least 6 characters long" });
      }
      const user = await storage.getUserById(req.user.id);
      if (!user || !user.password) {
        return res.status(400).json({ message: "Invalid user" });
      }
      const isValidPassword = await bcrypt.compare(currentPassword, user.password);
      if (!isValidPassword) {
        return res.status(400).json({ message: "Current password is incorrect" });
      }
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      await storage.updateUserPassword(req.user.id, hashedPassword);
      res.json({ message: "Password updated successfully" });
    } catch (error) {
      console.error("Error changing password:", error);
      res.status(500).json({ message: "Failed to change password" });
    }
  });
  app2.get("/api/account/login-history", requireAuth, async (req, res) => {
    try {
      const history = await storage.getLoginHistory(req.user.id);
      res.json(history);
    } catch (error) {
      console.error("Error fetching login history:", error);
      res.status(500).json({ message: "Failed to fetch login history" });
    }
  });
  app2.get("/api/account/2fa/status", requireAuth, async (req, res) => {
    try {
      const twoFAStatus = await storage.getTwoFactorAuthStatus(req.user.id);
      res.json(twoFAStatus);
    } catch (error) {
      console.error("Error fetching 2FA status:", error);
      res.status(500).json({ message: "Failed to fetch 2FA status" });
    }
  });
  app2.post("/api/account/2fa/enable", requireAuth, async (req, res) => {
    try {
      await storage.enableTwoFactorAuth(req.user.id);
      res.json({ message: "2FA enabled successfully" });
    } catch (error) {
      console.error("Error enabling 2FA:", error);
      res.status(500).json({ message: "Failed to enable 2FA" });
    }
  });
  app2.post("/api/account/2fa/disable", requireAuth, async (req, res) => {
    try {
      await storage.disableTwoFactorAuth(req.user.id);
      res.json({ message: "2FA disabled successfully" });
    } catch (error) {
      console.error("Error disabling 2FA:", error);
      res.status(500).json({ message: "Failed to disable 2FA" });
    }
  });
  app2.post("/api/verification/request", requireAuth, async (req, res) => {
    try {
      if (req.user.role !== "seller") {
        return res.status(403).json({ message: "Only sellers can request verification" });
      }
      let seller = await storage.getUser(req.user.id);
      if (!seller) {
        console.log("[VERIFICATION] Creating missing seller in database:", req.user.id);
        try {
          await storage.upsertUser({
            id: req.user.id,
            email: req.user.email || "seller@fusionmining.com",
            firstName: req.user.firstName || "Seller",
            lastName: req.user.lastName || "User"
          });
          console.log("[VERIFICATION] User upserted successfully");
          await storage.updateUserRole(req.user.id, "seller");
          console.log("[VERIFICATION] User role updated to seller");
          seller = await storage.getUser(req.user.id);
          if (!seller) {
            throw new Error("User was not created in database after upsert");
          }
          console.log("[VERIFICATION] User confirmed in database");
        } catch (userError) {
          console.error("[VERIFICATION] Error creating user:", userError);
          throw userError;
        }
      } else {
        console.log("[VERIFICATION] Seller already exists in database");
      }
      const request = await storage.createVerificationRequest(req.user.id);
      res.json(request);
    } catch (error) {
      console.error("Error creating verification request:", error);
      res.status(500).json({ message: "Failed to create verification request" });
    }
  });
  app2.post("/api/verification/submit", requireAuth, async (req, res) => {
    try {
      if (req.user.role !== "seller") {
        return res.status(403).json({ message: "Only sellers can submit verification" });
      }
      const request = await storage.getVerificationRequestBySellerId(req.user.id);
      if (!request) {
        return res.status(404).json({ message: "Verification request not found" });
      }
      const documents = await storage.getDocumentsByRequestId(request.id);
      if (!documents || documents.length === 0) {
        return res.status(400).json({ message: "Please upload at least one document before submitting" });
      }
      const updatedRequest = await storage.updateVerificationRequestStatus(request.id, "pending");
      const updatedDocuments = await storage.getDocumentsByRequestId(request.id);
      const seller = await storage.getUser(req.user.id);
      if (seller) {
        await storage.createNotification({
          userId: req.user.id,
          type: "seller_verification",
          title: "Verification Request Submitted",
          message: "Your seller verification request has been submitted for review. We will review it within 2-3 business days.",
          link: "/dashboard/seller-verification"
        });
      }
      const adminUser = await storage.getAdminUser();
      if (adminUser) {
        await storage.createNotification({
          userId: adminUser.id,
          type: "seller_verification",
          title: "New Seller Verification Request",
          message: `${seller?.firstName} ${seller?.lastName} (${seller?.email}) submitted a new verification request.`,
          link: "/admin?tab=seller-verification"
        });
      }
      console.log("[VERIFICATION] Request submitted:", request.id, "Status changed to pending");
      res.json({ ...updatedRequest, documents: updatedDocuments });
    } catch (error) {
      console.error("Error submitting verification request:", error);
      res.status(500).json({ message: "Failed to submit verification request" });
    }
  });
  app2.get("/api/verification/my-request", requireAuth, async (req, res) => {
    try {
      if (req.user.role !== "seller") {
        return res.status(403).json({ message: "Only sellers can access this endpoint" });
      }
      const request = await storage.getVerificationRequestBySellerId(req.user.id);
      if (!request) {
        return res.json(null);
      }
      const documents = await storage.getDocumentsByRequestId(request.id);
      res.json({ ...request, documents });
    } catch (error) {
      console.error("Error fetching verification request:", error);
      res.status(500).json({ message: "Failed to fetch verification request" });
    }
  });
  app2.get("/api/verification/requests", requireAuth, async (req, res) => {
    try {
      if (req.user.role !== "admin") {
        return res.status(403).json({ message: "Admin access required" });
      }
      const requests = await storage.getAllVerificationRequests();
      res.json(requests);
    } catch (error) {
      console.error("Error fetching verification requests:", error);
      res.status(500).json({ message: "Failed to fetch verification requests" });
    }
  });
  app2.get("/api/verification/requests/pending", requireAuth, async (req, res) => {
    try {
      if (req.user.role !== "admin") {
        return res.status(403).json({ message: "Admin access required" });
      }
      const requests = await storage.getAllPendingVerificationRequests();
      res.json(requests);
    } catch (error) {
      console.error("Error fetching pending verification requests:", error);
      res.status(500).json({ message: "Failed to fetch pending verification requests" });
    }
  });
  app2.get("/api/verification/documents/:requestId", requireAuth, async (req, res) => {
    try {
      if (req.user.role !== "admin") {
        return res.status(403).json({ message: "Admin access required" });
      }
      const documents = await storage.getDocumentsByRequestId(req.params.requestId);
      res.json(documents);
    } catch (error) {
      console.error("Error fetching verification documents:", error);
      res.status(500).json({ message: "Failed to fetch verification documents" });
    }
  });
  app2.post("/api/verification/approve/:id", requireAuth, async (req, res) => {
    try {
      if (req.user.role !== "admin") {
        return res.status(403).json({ message: "Admin access required" });
      }
      const request = await storage.approveVerificationRequest(req.params.id, req.user.id);
      res.json(request);
    } catch (error) {
      console.error("Error approving verification request:", error);
      res.status(500).json({ message: "Failed to approve verification request" });
    }
  });
  app2.post("/api/verification/reject/:id", requireAuth, async (req, res) => {
    try {
      if (req.user.role !== "admin") {
        return res.status(403).json({ message: "Admin access required" });
      }
      const { reason } = req.body;
      if (!reason) {
        return res.status(400).json({ message: "Rejection reason is required" });
      }
      const request = await storage.rejectVerificationRequest(req.params.id, req.user.id, reason);
      res.json(request);
    } catch (error) {
      console.error("Error rejecting verification request:", error);
      res.status(500).json({ message: "Failed to reject verification request" });
    }
  });
  const verificationUploadsRoot = path.resolve(import.meta.dirname, "..", "attached_assets", "files", "uploads", "verification");
  fs.mkdirSync(verificationUploadsRoot, { recursive: true });
  const verificationStorageEngine = multer.diskStorage({
    destination: (_req, _file, cb) => cb(null, verificationUploadsRoot),
    filename: (_req, file, cb) => {
      const timestamp2 = Date.now();
      const sanitizedOriginal = file.originalname.replace(/[^a-zA-Z0-9._-]/g, "_");
      cb(null, `${timestamp2}-${sanitizedOriginal}`);
    }
  });
  const verificationUpload = multer({
    storage: verificationStorageEngine,
    limits: { fileSize: 20 * 1024 * 1024 },
    // 20 MB for verification documents
    fileFilter: (_req, file, cb) => {
      const allowed = [
        "application/pdf",
        "image/png",
        "image/jpeg",
        "image/jpg",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      ];
      if (allowed.includes(file.mimetype)) {
        return cb(null, true);
      }
      return cb(new Error("Unsupported file type. Please upload PDF, JPG, PNG, or DOC files."));
    }
  });
  app2.post("/api/verification/upload", requireAuth, verificationUpload.single("file"), async (req, res) => {
    try {
      if (req.user.role !== "seller") {
        return res.status(403).json({ message: "Only sellers can upload verification documents" });
      }
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }
      const { requestId, documentType } = req.body;
      if (!requestId || !documentType) {
        return res.status(400).json({ message: "Request ID and document type are required" });
      }
      const request = await storage.getVerificationRequestById(requestId);
      if (!request || request.sellerId !== req.user.id) {
        return res.status(403).json({ message: "Invalid verification request" });
      }
      const relativePath = `/attached_assets/files/uploads/verification/${req.file.filename}`;
      const document = await storage.createVerificationDocument({
        requestId,
        documentType,
        fileName: req.file.originalname,
        filePath: relativePath,
        fileSize: req.file.size,
        mimeType: req.file.mimetype
      });
      res.json({
        document,
        filename: req.file.originalname,
        url: relativePath,
        size: req.file.size,
        mimetype: req.file.mimetype
      });
    } catch (error) {
      console.error("Error uploading verification document:", error);
      res.status(500).json({ message: error.message || "Failed to upload verification document" });
    }
  });
  app2.post("/api/buyer/tier-upgrade-request", requireAuth, async (req, res) => {
    try {
      const user = await syncClerkUser(req.auth.userId);
      if (user.role !== "buyer") {
        return res.status(403).json({ message: "Only buyers can request tier upgrades" });
      }
      const { requestedTier } = req.body;
      if (!requestedTier || !["standard", "premium"].includes(requestedTier)) {
        return res.status(400).json({ message: "Invalid tier. Must be 'standard' or 'premium'" });
      }
      const newRequest = {
        id: `tier-upgrade-${Date.now()}`,
        userId: user.id,
        buyerEmail: user.email || "",
        buyerFirstName: user.firstName || "",
        buyerLastName: user.lastName || "",
        requestedTier,
        status: "draft",
        submittedAt: (/* @__PURE__ */ new Date()).toISOString(),
        documentCount: 0
      };
      buyerUpgradeRequests.set(newRequest.id, newRequest);
      res.json(newRequest);
    } catch (error) {
      console.error("Error creating tier upgrade request:", error);
      res.status(500).json({ message: "Failed to create tier upgrade request" });
    }
  });
  app2.get("/api/buyer/tier-upgrade-request", requireAuth, async (req, res) => {
    try {
      const user = await syncClerkUser(req.auth.userId);
      if (user.role !== "buyer") {
        return res.status(403).json({ message: "Only buyers can access this endpoint" });
      }
      let userRequest = null;
      for (const request of buyerUpgradeRequests.values()) {
        if (request.userId === user.id) {
          userRequest = request;
          break;
        }
      }
      res.json(userRequest);
    } catch (error) {
      console.error("Error fetching tier upgrade request:", error);
      res.status(500).json({ message: "Failed to fetch tier upgrade request" });
    }
  });
  app2.post("/api/buyer/tier-upgrade/upload", requireAuth, verificationUpload.single("file"), async (req, res) => {
    try {
      const user = await syncClerkUser(req.auth.userId);
      if (user.role !== "buyer") {
        return res.status(403).json({ message: "Only buyers can upload tier upgrade documents" });
      }
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }
      const { requestId, documentType } = req.body;
      if (!requestId || !documentType) {
        return res.status(400).json({ message: "Request ID and document type are required" });
      }
      const relativePath = `/attached_assets/files/uploads/verification/${req.file.filename}`;
      const mockDocument = {
        id: `doc-${Date.now()}`,
        requestId,
        documentType,
        fileName: req.file.originalname,
        filePath: relativePath,
        uploadedAt: (/* @__PURE__ */ new Date()).toISOString()
      };
      res.json({
        document: mockDocument,
        filename: req.file.originalname,
        url: relativePath,
        size: req.file.size,
        mimetype: req.file.mimetype
      });
    } catch (error) {
      console.error("Error uploading tier upgrade document:", error);
      res.status(500).json({ message: error.message || "Failed to upload document" });
    }
  });
  app2.post("/api/buyer/tier-upgrade/submit", requireAuth, async (req, res) => {
    try {
      const user = await syncClerkUser(req.auth.userId);
      if (user.role !== "buyer") {
        return res.status(403).json({ message: "Only buyers can submit tier upgrade requests" });
      }
      const { requestId } = req.body;
      if (!requestId) {
        return res.status(400).json({ message: "Request ID is required" });
      }
      const request = buyerUpgradeRequests.get(requestId);
      if (!request) {
        return res.status(404).json({ message: "Tier upgrade request not found" });
      }
      if (request.userId !== user.id) {
        return res.status(403).json({ message: "Unauthorized - request does not belong to user" });
      }
      request.status = "pending";
      request.submittedAt = (/* @__PURE__ */ new Date()).toISOString();
      buyerUpgradeRequests.set(requestId, request);
      res.json({
        success: true,
        message: "Tier upgrade request submitted successfully",
        status: "pending",
        submittedAt: (/* @__PURE__ */ new Date()).toISOString()
      });
    } catch (error) {
      console.error("Error submitting tier upgrade request:", error);
      res.status(500).json({ message: error.message || "Failed to submit tier upgrade request" });
    }
  });
  app2.get("/api/admin/buyer-upgrades/pending", async (req, res) => {
    try {
      const isDev = process.env.NODE_ENV === "development";
      if (!isDev && !req.user?.id) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      const pendingRequests = getPendingBuyerUpgrades();
      res.json(pendingRequests);
    } catch (error) {
      console.error("Error fetching pending buyer tier upgrades:", error);
      res.status(500).json({ message: "Failed to fetch pending buyer tier upgrades" });
    }
  });
  app2.get("/api/admin/buyer-upgrades", async (req, res) => {
    try {
      const isDev = process.env.NODE_ENV === "development";
      if (!isDev && !req.user?.id) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      const allRequests = getAllBuyerUpgrades();
      res.json(allRequests);
    } catch (error) {
      console.error("Error fetching buyer tier upgrades:", error);
      res.status(500).json({ message: "Failed to fetch buyer tier upgrades" });
    }
  });
  app2.get("/api/admin/buyer-upgrades/documents/:requestId", async (req, res) => {
    const isDev = process.env.NODE_ENV === "development";
    if (!isDev && !req.user?.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    try {
      const { requestId } = req.params;
      const mockDocuments = [
        {
          id: "doc-1",
          documentType: "certificate_of_incorporation",
          fileName: "Company_Certificate.pdf",
          filePath: "/attached_assets/files/uploads/verification/cert.pdf",
          uploadedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1e3).toISOString()
        },
        {
          id: "doc-2",
          documentType: "company_profile",
          fileName: "Company_Profile.docx",
          filePath: "/attached_assets/files/uploads/verification/profile.docx",
          uploadedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1e3).toISOString()
        },
        {
          id: "doc-3",
          documentType: "shareholder_list",
          fileName: "Shareholders.pdf",
          filePath: "/attached_assets/files/uploads/verification/shareholders.pdf",
          uploadedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1e3).toISOString()
        },
        {
          id: "doc-4",
          documentType: "tax_certificate",
          fileName: "Tax_Certificate.pdf",
          filePath: "/attached_assets/files/uploads/verification/tax.pdf",
          uploadedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1e3).toISOString()
        }
      ];
      res.json(mockDocuments);
    } catch (error) {
      console.error("Error fetching buyer tier upgrade documents:", error);
      res.status(500).json({ message: "Failed to fetch documents" });
    }
  });
  app2.post("/api/admin/buyer-upgrades/approve/:id", async (req, res) => {
    const isDev = process.env.NODE_ENV === "development";
    if (!isDev && !req.user?.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    try {
      const { id } = req.params;
      const updated = approveBuyerUpgrade(id);
      if (!updated) {
        return res.status(404).json({ message: "Tier upgrade request not found" });
      }
      await storage.createNotification({
        userId: updated.userId,
        type: "tier_upgrade",
        title: "Tier Upgrade Approved",
        message: `Congratulations! Your upgrade to ${updated.requestedTier} tier has been approved.`,
        link: "/dashboard"
      });
      res.json({
        success: true,
        message: "Tier upgrade request approved successfully",
        status: "approved",
        reviewedAt: (/* @__PURE__ */ new Date()).toISOString()
      });
    } catch (error) {
      console.error("Error approving buyer tier upgrade:", error);
      res.status(500).json({ message: "Failed to approve tier upgrade request" });
    }
  });
  app2.post("/api/admin/buyer-upgrades/reject/:id", async (req, res) => {
    const isDev = process.env.NODE_ENV === "development";
    if (!isDev && !req.user?.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    try {
      const { id } = req.params;
      const { reason } = req.body;
      if (!reason) {
        return res.status(400).json({ message: "Rejection reason is required" });
      }
      const updated = rejectBuyerUpgrade(id, reason);
      if (!updated) {
        return res.status(404).json({ message: "Tier upgrade request not found" });
      }
      await storage.createNotification({
        userId: updated.userId,
        type: "tier_upgrade",
        title: "Tier Upgrade Rejected",
        message: `Your upgrade request to ${updated.requestedTier} tier was rejected. Reason: ${reason}`,
        link: "/dashboard"
      });
      res.json({
        success: true,
        message: "Tier upgrade request rejected successfully",
        status: "rejected",
        rejectionReason: reason,
        reviewedAt: (/* @__PURE__ */ new Date()).toISOString()
      });
    } catch (error) {
      console.error("Error rejecting buyer tier upgrade:", error);
      res.status(500).json({ message: "Failed to reject tier upgrade request" });
    }
  });
  app2.post("/api/admin/buyer-upgrades/revert/:id", async (req, res) => {
    const isDev = process.env.NODE_ENV === "development";
    if (!isDev && !req.user?.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    try {
      const { id } = req.params;
      const updated = revertBuyerUpgrade(id);
      if (!updated) {
        return res.status(404).json({ message: "Tier upgrade request not found" });
      }
      res.json({
        success: true,
        message: "Tier upgrade request reverted to draft successfully",
        status: "draft"
      });
    } catch (error) {
      console.error("Error reverting buyer tier upgrade:", error);
      res.status(500).json({ message: "Failed to revert tier upgrade request" });
    }
  });
  app2.get("/api/payment-methods", async (req, res) => {
    try {
      const paymentMethods = await storage.getAllPaymentMethodDetails();
      res.json(paymentMethods);
    } catch (error) {
      console.error("Error fetching payment methods:", error);
      res.status(500).json({ message: "Failed to fetch payment methods" });
    }
  });
  app2.get("/api/payment-methods/:method", async (req, res) => {
    try {
      const { method } = req.params;
      const paymentMethod = await storage.getPaymentMethodDetailsByMethod(method);
      if (!paymentMethod) {
        return res.status(404).json({ message: "Payment method not found" });
      }
      res.json(paymentMethod);
    } catch (error) {
      console.error("Error fetching payment method:", error);
      res.status(500).json({ message: "Failed to fetch payment method" });
    }
  });
  app2.post("/api/admin/payment-methods", requireAuth, requireAdmin, async (req, res) => {
    try {
      const validatedData = insertPaymentMethodDetailsSchema.parse(req.body);
      const paymentMethod = await storage.createPaymentMethodDetails(validatedData);
      res.json(paymentMethod);
    } catch (error) {
      if (error instanceof ZodError) {
        console.error("Validation error creating payment method:", formatZodError(error));
        return res.status(400).json({ message: formatZodError(error) });
      }
      console.error("Error creating payment method:", error);
      res.status(500).json({ message: "Failed to create payment method" });
    }
  });
  app2.patch("/api/admin/payment-methods/:id", requireAuth, requireAdmin, async (req, res) => {
    try {
      const validatedData = updatePaymentMethodDetailsSchema.parse({ ...req.body, id: req.params.id });
      const paymentMethod = await storage.updatePaymentMethodDetails(req.params.id, validatedData);
      res.json(paymentMethod);
    } catch (error) {
      if (error instanceof ZodError) {
        console.error("Validation error updating payment method:", formatZodError(error));
        return res.status(400).json({ message: formatZodError(error) });
      }
      console.error("Error updating payment method:", error);
      res.status(500).json({ message: "Failed to update payment method" });
    }
  });
  app2.post("/api/buyer/tier-upgrade/payment", requireAuth, async (req, res) => {
    try {
      const user = await syncClerkUser(req.auth.userId);
      if (user.role !== "buyer") {
        return res.status(403).json({ message: "Only buyers can create tier upgrade payments" });
      }
      const { upgradeRequestId, paymentMethod, amount } = req.body;
      if (!upgradeRequestId || !paymentMethod || !amount) {
        return res.status(400).json({ message: "upgradeRequestId, paymentMethod, and amount are required" });
      }
      const upgradeRequest = buyerUpgradeRequests.get(upgradeRequestId);
      if (!upgradeRequest) {
        return res.status(404).json({ message: "Tier upgrade request not found" });
      }
      if (upgradeRequest.userId !== user.id) {
        return res.status(403).json({ message: "Unauthorized - request does not belong to user" });
      }
      const paymentMethodDetails2 = await storage.getPaymentMethodDetailsByMethod(paymentMethod);
      if (!paymentMethodDetails2) {
        return res.status(400).json({ message: "Invalid payment method" });
      }
      const usdAmount = parseFloat(amount);
      const payment = await storage.createTierUpgradePayment({
        upgradeRequestId,
        userId: user.id,
        requestedTier: upgradeRequest.requestedTier,
        paymentMethod,
        amountUSD: usdAmount,
        amount: usdAmount,
        // Store USD amount (users convert manually)
        currency: "USD",
        // Always store as USD
        status: "pending",
        paymentDetails: paymentMethodDetails2.accountDetails
      });
      res.json({
        ...payment,
        paymentMethodDetails: {
          name: paymentMethodDetails2.name,
          currencyCode: paymentMethodDetails2.currencyCode,
          currencyName: paymentMethodDetails2.currencyName
        },
        usdAmount
      });
    } catch (error) {
      if (error instanceof ZodError) {
        console.error("Validation error creating payment:", formatZodError(error));
        return res.status(400).json({ message: formatZodError(error) });
      }
      console.error("Error creating tier upgrade payment:", error);
      res.status(500).json({ message: "Failed to create payment" });
    }
  });
  app2.post("/api/buyer/tier-upgrade/payment/:paymentId/proof", requireAuth, verificationUpload.single("proofOfPayment"), async (req, res) => {
    try {
      if (!req.auth?.userId) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      const user = await syncClerkUser(req.auth.userId);
      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }
      if (user.role !== "buyer") {
        return res.status(403).json({ message: "Only buyers can upload proof of payment" });
      }
      const { paymentId } = req.params;
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }
      const payment = await storage.getTierUpgradePaymentById(paymentId);
      if (!payment) {
        return res.status(404).json({ message: "Payment not found" });
      }
      if (payment.userId !== user.id) {
        return res.status(403).json({ message: "Unauthorized - payment does not belong to user" });
      }
      const proofOfPaymentUrl = `/attached_assets/files/uploads/verification/${req.file.filename}`;
      const updatedPayment = await storage.updateTierUpgradePayment(paymentId, {
        proofOfPaymentUrl,
        status: "paid"
      });
      res.json(updatedPayment);
    } catch (error) {
      console.error("Error uploading proof of payment:", error);
      res.status(500).json({ message: error.message || "Failed to upload proof of payment" });
    }
  });
  app2.get("/api/buyer/tier-upgrade/payments", requireAuth, async (req, res) => {
    try {
      if (req.user.role !== "buyer") {
        return res.status(403).json({ message: "Only buyers can view tier upgrade payments" });
      }
      const payments = await storage.getTierUpgradePaymentsByUserId(req.user.id);
      res.json(payments);
    } catch (error) {
      console.error("Error fetching tier upgrade payments:", error);
      res.status(500).json({ message: "Failed to fetch payments" });
    }
  });
  app2.get("/api/buyer/tier-upgrade/payment/:upgradeRequestId", requireAuth, async (req, res) => {
    try {
      const user = await syncClerkUser(req.auth.userId);
      if (user.role !== "buyer") {
        return res.status(403).json({ message: "Only buyers can view tier upgrade payments" });
      }
      const { upgradeRequestId } = req.params;
      const payments = await storage.getTierUpgradePaymentsByUpgradeRequestId(upgradeRequestId);
      const userPayments = payments.filter((p) => p.userId === user.id);
      res.json(userPayments[0] || null);
    } catch (error) {
      console.error("Error fetching tier upgrade payment:", error);
      res.status(500).json({ message: "Failed to fetch payment" });
    }
  });
  app2.get("/api/admin/tier-upgrade-payments/pending", requireAuth, requireAdmin, async (req, res) => {
    try {
      const payments = await storage.getAllPendingTierUpgradePayments();
      res.json(payments);
    } catch (error) {
      console.error("Error fetching pending payments:", error);
      res.status(500).json({ message: "Failed to fetch pending payments" });
    }
  });
  app2.post("/api/admin/tier-upgrade-payments/verify/:paymentId", requireAuth, requireAdmin, async (req, res) => {
    try {
      const { paymentId } = req.params;
      const { action, rejectionReason } = req.body;
      const payment = await storage.getTierUpgradePaymentById(paymentId);
      if (!payment) {
        return res.status(404).json({ message: "Payment not found" });
      }
      if (action === "approve") {
        await storage.updateTierUpgradePayment(paymentId, {
          status: "verified",
          verifiedAt: /* @__PURE__ */ new Date(),
          verifiedBy: req.user.id
        });
        await storage.updateUserMembershipTier(payment.userId, payment.requestedTier);
        const upgradeRequest = buyerUpgradeRequests.get(payment.upgradeRequestId);
        if (upgradeRequest) {
          upgradeRequest.status = "approved";
          upgradeRequest.reviewedAt = (/* @__PURE__ */ new Date()).toISOString();
          buyerUpgradeRequests.set(payment.upgradeRequestId, upgradeRequest);
        }
        res.json({ message: "Payment verified and tier upgraded successfully" });
      } else if (action === "reject") {
        await storage.updateTierUpgradePayment(paymentId, {
          status: "rejected",
          rejectionReason,
          verifiedAt: /* @__PURE__ */ new Date(),
          verifiedBy: req.user.id
        });
        res.json({ message: "Payment rejected" });
      } else {
        return res.status(400).json({ message: "Invalid action" });
      }
    } catch (error) {
      console.error("Error verifying tier upgrade payment:", error);
      res.status(500).json({ message: "Failed to verify payment" });
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
