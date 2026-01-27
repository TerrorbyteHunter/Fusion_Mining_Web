var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined") return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x + '" is not supported');
});
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

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
  insertPaymentMethodDetailsSchema: () => insertPaymentMethodDetailsSchema,
  insertPlatformSettingSchema: () => insertPlatformSettingSchema,
  insertProjectSchema: () => insertProjectSchema,
  insertSellerVerificationDocumentSchema: () => insertSellerVerificationDocumentSchema,
  insertSellerVerificationRequestSchema: () => insertSellerVerificationRequestSchema,
  insertSettingsAuditSchema: () => insertSettingsAuditSchema,
  insertSustainabilityContentSchema: () => insertSustainabilityContentSchema,
  insertTierUpgradePaymentSchema: () => insertTierUpgradePaymentSchema,
  insertTierUpgradeRequestSchema: () => insertTierUpgradeRequestSchema,
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
  tierUpgradeRequests: () => tierUpgradeRequests,
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
  updatePaymentMethodDetailsSchema: () => updatePaymentMethodDetailsSchema,
  updatePlatformSettingSchema: () => updatePlatformSettingSchema,
  updateSellerVerificationRequestSchema: () => updateSellerVerificationRequestSchema,
  updateTierUpgradePaymentSchema: () => updateTierUpgradePaymentSchema,
  updateTierUpgradeRequestSchema: () => updateTierUpgradeRequestSchema,
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
var sessions, userRoleEnum, adminRoleEnum, profileTypeEnum, membershipTierEnum, verificationStatusEnum, users, adminPermissions, userProfiles, licenseTypeEnum, projectStatusEnum, projects, expressInterest, listingTypeEnum, listingStatusEnum, mainCategoryEnum, mineralSubcategoryEnum, toolSubcategoryEnum, serviceSubcategoryEnum, ppeSubcategoryEnum, marketplaceListings, buyerRequests, threadStatusEnum, ticketStatusEnum, ticketPriorityEnum, messageContextEnum, threadTypeEnum, messageThreads, messages, messageIdempotency, templateTypeEnum, messageTemplates, blogPosts, contactSubmissions, sustainabilityContent, verificationQueue, activityTypeEnum, activityLogs, notificationTypeEnum, notifications, videos, contactSettings, settingDataTypeEnum, platformSettings, settingsAudit, emailTemplates, loginHistory, verificationRules, documentTemplates, adminAuditLogs, twoFactorAuth, membershipBenefits, tierUsageTracking, sellerVerificationRequestStatusEnum, sellerVerificationDocumentTypeEnum, sellerVerificationRequests, sellerVerificationDocuments, usersRelations, adminPermissionsRelations, userProfilesRelations, projectsRelations, expressInterestRelations, marketplaceListingsRelations, buyerRequestsRelations, messageThreadsRelations, messagesRelations, blogPostsRelations, verificationQueueRelations, activityLogsRelations, notificationsRelations, tierUsageTrackingRelations, sellerVerificationRequestsRelations, sellerVerificationDocumentsRelations, upsertUserSchema, insertAdminPermissionsSchema, updateAdminPermissionsSchema, insertUserProfileSchema, updateUserProfileSchema, insertProjectSchema, insertExpressInterestSchema, insertMarketplaceListingSchema, insertBuyerRequestSchema, insertMessageThreadSchema, insertMessageSchema, insertBlogPostSchema, insertContactSubmissionSchema, insertActivityLogSchema, insertNotificationSchema, insertVideoSchema, updateVideoSchema, insertSustainabilityContentSchema, insertContactSettingsSchema, updateContactSettingsSchema, insertMembershipBenefitSchema, updateMembershipBenefitSchema, insertTierUsageTrackingSchema, updateTierUsageTrackingSchema, insertMessageTemplateSchema, updateMessageTemplateSchema, insertPlatformSettingSchema, updatePlatformSettingSchema, insertSettingsAuditSchema, insertEmailTemplateSchema, updateEmailTemplateSchema, insertLoginHistorySchema, insertVerificationRuleSchema, updateVerificationRuleSchema, insertDocumentTemplateSchema, updateDocumentTemplateSchema, insertAdminAuditLogSchema, insertTwoFactorAuthSchema, updateTwoFactorAuthSchema, insertSellerVerificationRequestSchema, updateSellerVerificationRequestSchema, insertSellerVerificationDocumentSchema, paymentMethodEnum, tierUpgradeRequests, tierUpgradePayments, paymentMethodDetails, insertTierUpgradePaymentSchema, updateTierUpgradePaymentSchema, insertPaymentMethodDetailsSchema, updatePaymentMethodDetailsSchema, insertTierUpgradeRequestSchema, updateTierUpgradeRequestSchema;
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
      profileImageUrl: true,
      clerkId: true,
      role: true
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
    insertSustainabilityContentSchema = createInsertSchema(sustainabilityContent).omit({
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
    tierUpgradeRequests = pgTable("tier_upgrade_requests", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      userId: varchar("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
      requestedTier: membershipTierEnum("requested_tier").notNull(),
      status: varchar("status").notNull().default("draft"),
      // draft, pending, approved, rejected
      rejectionReason: text("rejection_reason"),
      submittedAt: timestamp("submitted_at"),
      reviewedAt: timestamp("reviewed_at"),
      reviewedBy: varchar("reviewed_by").references(() => users.id),
      documentCount: integer("document_count").notNull().default(0),
      createdAt: timestamp("created_at").defaultNow().notNull(),
      updatedAt: timestamp("updated_at").defaultNow().notNull()
    });
    tierUpgradePayments = pgTable("tier_upgrade_payments", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      upgradeRequestId: varchar("upgrade_request_id").notNull().references(() => tierUpgradeRequests.id, { onDelete: "cascade" }),
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
    insertPaymentMethodDetailsSchema = createInsertSchema(paymentMethodDetails).omit({
      id: true,
      createdAt: true,
      updatedAt: true
    });
    updatePaymentMethodDetailsSchema = createInsertSchema(paymentMethodDetails).omit({
      createdAt: true,
      updatedAt: true
    }).partial().required({ id: true });
    insertTierUpgradeRequestSchema = createInsertSchema(tierUpgradeRequests).omit({
      id: true,
      submittedAt: true,
      reviewedAt: true,
      createdAt: true,
      updatedAt: true
    });
    updateTierUpgradeRequestSchema = createInsertSchema(tierUpgradeRequests).omit({
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
        const [thread] = await db.update(messageThreads).set({
          assignedAdminId: adminId,
          ticketStatus: "in_progress"
        }).where(and(
          eq(messageThreads.id, ticketId),
          eq(messageThreads.isAdminSupport, true)
        )).returning();
        return thread;
      }
      /**
       * Resolve a support ticket with optional notes.
       * Changes ticketStatus to 'resolved'
       */
      async resolveSupportTicket(ticketId, notes) {
        const [thread] = await db.update(messageThreads).set({
          ticketStatus: "resolved",
          resolvedAt: /* @__PURE__ */ new Date()
        }).where(and(
          eq(messageThreads.id, ticketId),
          eq(messageThreads.isAdminSupport, true)
        )).returning();
        return thread;
      }
      /**
       * Create a new support ticket (user-initiated).
       * User can contact admin about account/verification/payment issues
       */
      async createSupportTicket(userId, title, description, priority = "normal") {
        const [thread] = await db.insert(messageThreads).values({
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
        return thread;
      }
      /**
       * Update a support ticket's status.
       */
      async updateTicketStatus(ticketId, status) {
        const [thread] = await db.update(messageThreads).set({
          ticketStatus: status
        }).where(and(
          eq(messageThreads.id, ticketId),
          eq(messageThreads.isAdminSupport, true)
        )).returning();
        return thread;
      }
      /**
       * Update a support ticket's priority.
       */
      async updateTicketPriority(ticketId, priority) {
        const [thread] = await db.update(messageThreads).set({
          ticketPriority: priority
        }).where(and(
          eq(messageThreads.id, ticketId),
          eq(messageThreads.isAdminSupport, true)
        )).returning();
        return thread;
      }
      /**
       * Update a support ticket's assigned admin.
       */
      async updateTicketAssignee(ticketId, adminId) {
        const [thread] = await db.update(messageThreads).set({
          assignedAdminId: adminId
        }).where(and(
          eq(messageThreads.id, ticketId),
          eq(messageThreads.isAdminSupport, true)
        )).returning();
        return thread;
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

// api/login.ts
var login_exports = {};
__export(login_exports, {
  default: () => handler
});
import jwt from "jsonwebtoken";
import { serialize } from "cookie";
async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).end("Method Not Allowed");
  }
  const { username, password } = req.body || {};
  const users2 = {
    admin: { id: "test-admin-123", username: "admin", password: "admin123", role: "admin", email: "admin@fusionmining.com", firstName: "Admin", lastName: "User" },
    henry: { id: "test-buyer-789", username: "henry", password: "henry123", role: "buyer", email: "henry@fusionmining.com", firstName: "Henry", lastName: "Pass" },
    ray: { id: "test-seller-456", username: "ray", password: "ray123", role: "seller", email: "ray@fusionmining.com", firstName: "Ray", lastName: "Pass" }
  };
  const user = Object.values(users2).find((u) => u.username === username && u.password === password);
  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
  const token = jwt.sign(
    { sub: user.id, role: user.role, email: user.email, firstName: user.firstName, lastName: user.lastName },
    JWT_SECRET,
    { expiresIn: MAX_AGE }
  );
  const cookie = serialize("fm_auth", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: MAX_AGE
  });
  res.setHeader("Set-Cookie", cookie);
  res.status(200).json({ success: true, user });
}
var JWT_SECRET, MAX_AGE;
var init_login = __esm({
  "api/login.ts"() {
    "use strict";
    JWT_SECRET = process.env.JWT_SECRET || "dev-secret-change-me";
    MAX_AGE = 60 * 60 * 24 * 7;
  }
});

// api/logout.ts
var logout_exports = {};
__export(logout_exports, {
  default: () => handler2
});
import { serialize as serialize2 } from "cookie";
async function handler2(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).end("Method Not Allowed");
  }
  const cookie = serialize2("fm_auth", "", { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax", path: "/", maxAge: 0 });
  res.setHeader("Set-Cookie", cookie);
  res.status(200).json({ message: "Logout successful" });
}
var init_logout = __esm({
  "api/logout.ts"() {
    "use strict";
  }
});

// api/auth_user.ts
var auth_user_exports = {};
__export(auth_user_exports, {
  default: () => handler3
});
import jwt2 from "jsonwebtoken";
import { parse } from "cookie";
async function handler3(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).end("Method Not Allowed");
  }
  const cookieHeader = req.headers?.cookie || "";
  const cookies = parse(cookieHeader || "");
  const token = cookies["fm_auth"];
  if (!token) return res.status(401).json({ message: "Unauthorized" });
  try {
    const payload = jwt2.verify(token, JWT_SECRET2);
    const userId = payload.sub;
    const role = payload.role;
    let dbUser = null;
    try {
      dbUser = await storage.getUser(userId) || await storage.getUserByClerkId(userId);
    } catch (e) {
      console.error("Error fetching user from DB:", e);
    }
    let adminPermissions2 = null;
    if (role === "admin") {
      const adminRole = payload.adminRole || "super_admin";
      switch (adminRole) {
        case "super_admin":
          adminPermissions2 = {
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
            canForceLogout: true,
            adminRole: "super_admin"
          };
          break;
        case "verification_admin":
          adminPermissions2 = {
            canManageUsers: true,
            canManageListings: false,
            canManageProjects: false,
            canManageBlog: false,
            canManageCMS: false,
            canViewAnalytics: false,
            canManageMessages: true,
            canManageVerification: true,
            canManageSettings: false,
            canManageAdmins: false,
            canAccessAuditLogs: true,
            canManageDocuments: true,
            canResetPasswords: false,
            canForceLogout: false,
            adminRole: "verification_admin"
          };
          break;
        case "content_admin":
          adminPermissions2 = {
            canManageUsers: false,
            canManageListings: false,
            canManageProjects: false,
            canManageBlog: true,
            canManageCMS: true,
            canViewAnalytics: false,
            canManageMessages: false,
            canManageVerification: false,
            canManageSettings: true,
            canManageAdmins: false,
            canAccessAuditLogs: false,
            canManageDocuments: false,
            canResetPasswords: false,
            canForceLogout: false,
            adminRole: "content_admin"
          };
          break;
        case "analytics_admin":
          adminPermissions2 = {
            canManageUsers: false,
            canManageListings: false,
            canManageProjects: false,
            canManageBlog: false,
            canManageCMS: false,
            canViewAnalytics: true,
            canManageMessages: false,
            canManageVerification: false,
            canManageSettings: false,
            canManageAdmins: false,
            canAccessAuditLogs: true,
            canManageDocuments: false,
            canResetPasswords: false,
            canForceLogout: false,
            adminRole: "analytics_admin"
          };
          break;
        default:
          adminPermissions2 = {
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
            canForceLogout: false,
            adminRole: "super_admin"
          };
      }
    }
    console.log("[AUTH/USER] Retrieved admin permissions for user:", userId, adminPermissions2 ? "admin" : "non-admin");
    return res.status(200).json({
      id: userId,
      role,
      email: payload.email,
      firstName: payload.firstName,
      lastName: payload.lastName,
      adminPermissions: adminPermissions2
    });
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
}
var JWT_SECRET2;
var init_auth_user = __esm({
  "api/auth_user.ts"() {
    "use strict";
    init_storage();
    JWT_SECRET2 = process.env.JWT_SECRET || "dev-secret-change-me";
  }
});

// server/index.ts
import "dotenv/config";
import path2 from "path";
import express2 from "express";
import cors from "cors";

// server/routes.ts
init_storage();
import { createServer } from "http";

// server/clerk.ts
init_storage();
import { Clerk } from "@clerk/clerk-sdk-node";
console.log("Initializing Clerk with secret key:", process.env.CLERK_SECRET_KEY ? "PRESENT" : "MISSING");
var clerk = Clerk({
  secretKey: process.env.CLERK_SECRET_KEY
});
var requireAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log("Auth header received:", authHeader ? authHeader.substring(0, 20) + "..." : "NONE");
  return clerk.expressRequireAuth({
    onError: (error) => {
      console.error("Clerk auth error:", error);
      res.status(401).json({ message: "Unauthorized" });
    }
  })(req, res, next);
};

// server/localAuth.ts
init_storage();

// server/rbac.ts
init_db();
init_schema();
import { eq as eq2 } from "drizzle-orm";

// server/routes.ts
init_db();
init_schema();
import { eq as eq3 } from "drizzle-orm";
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
async function registerRoutes(app2) {
  app2.get("/api/health", (req, res) => {
    res.json({
      status: "ok",
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      environment: process.env.NODE_ENV || "development"
    });
  });
  app2.post("/api/clear-jwt", (req, res) => {
    res.setHeader("Set-Cookie", [
      "fm_auth=; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=0",
      "fm_auth=; HttpOnly; Secure=false; SameSite=Lax; Path=/; Max-Age=0"
      // Also clear non-secure for development
    ]);
    res.json({ success: true, message: "JWT cookies cleared" });
  });
  app2.get("/api/auth/user", requireAuth, async (req, res) => {
    try {
      const clerkUserId = req.auth.userId;
      const user = await storage.getUserByClerkId(clerkUserId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });
  app2.get("/api/contact-settings", async (req, res) => {
    try {
      const settings = await storage.getContactSettings();
      res.json(settings);
    } catch (error) {
      console.error("Error fetching contact settings:", error);
      res.status(500).json({ message: "Failed to fetch contact settings" });
    }
  });
  const httpServer = createServer(app2);
  return httpServer;
}

// server/vite.ts
import express from "express";
import fs from "fs";
import path from "path";
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
    root: path.resolve(import.meta.dirname, "..", "client"),
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
        "@": path.resolve(import.meta.dirname, "..", "client", "src"),
        "@shared": path.resolve(import.meta.dirname, "..", "shared"),
        // Serve project-level assets from the attached_assets folder during dev
        "@assets": path.resolve(import.meta.dirname, "..", "attached_assets")
      }
    },
    plugins: [reactPlugin()]
  });
  app2.use("/attached_assets", express.static(path.resolve(import.meta.dirname, "..", "attached_assets")));
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path.resolve(
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
  const distPath = path.resolve(import.meta.dirname, "..", "dist", "public");
  const attachedAssetsPath = path.resolve(import.meta.dirname, "..", "attached_assets");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  if (fs.existsSync(attachedAssetsPath)) {
    app2.use("/attached_assets", express.static(attachedAssetsPath));
  }
  app2.use(express.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path.resolve(distPath, "index.html"));
  });
}

// server/index.ts
import pg from "pg";
if (!process.env.CLERK_SECRET_KEY) {
  __require("dotenv").config({ path: path2.resolve(__dirname, "..", ".env") });
}
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
    if (app.get("env") === "development") {
      console.log("Mounting API handlers for development...");
      const loginHandler = (await Promise.resolve().then(() => (init_login(), login_exports))).default;
      const logoutHandler = (await Promise.resolve().then(() => (init_logout(), logout_exports))).default;
      const authUserHandler = (await Promise.resolve().then(() => (init_auth_user(), auth_user_exports))).default;
      app.post("/api/login", loginHandler);
      app.post("/api/logout", logoutHandler);
      app.get("/api/auth/user", authUserHandler);
      console.log("API handlers mounted");
    }
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
