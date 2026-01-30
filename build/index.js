var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
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
var __copyProps = (to, from, except, desc3) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc3 = __getOwnPropDesc(from, key)) || desc3.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// shared/schema.ts
var schema_exports = {};
__export(schema_exports, {
  accountDeletionRequests: () => accountDeletionRequests,
  accountDeletionRequestsRelations: () => accountDeletionRequestsRelations,
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
  insertAccountDeletionRequestSchema: () => insertAccountDeletionRequestSchema,
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
  insertSustainabilityContentSchema: () => insertSustainabilityContentSchema2,
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
  tierUpgradeDocuments: () => tierUpgradeDocuments,
  tierUpgradeDocumentsRelations: () => tierUpgradeDocumentsRelations,
  tierUpgradePayments: () => tierUpgradePayments,
  tierUpgradeRequests: () => tierUpgradeRequests,
  tierUpgradeRequestsRelations: () => tierUpgradeRequestsRelations,
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
var sessions, userRoleEnum, adminRoleEnum, profileTypeEnum, membershipTierEnum, verificationStatusEnum, users, adminPermissions, userProfiles, licenseTypeEnum, projectStatusEnum, projects, expressInterest, listingTypeEnum, listingStatusEnum, mainCategoryEnum, mineralSubcategoryEnum, toolSubcategoryEnum, serviceSubcategoryEnum, ppeSubcategoryEnum, marketplaceListings, buyerRequests, threadStatusEnum, ticketStatusEnum, ticketPriorityEnum, messageContextEnum, threadTypeEnum, messageThreads, messages, messageIdempotency, templateTypeEnum, messageTemplates, blogPosts, contactSubmissions, accountDeletionRequests, sustainabilityContent, verificationQueue, activityTypeEnum, activityLogs, notificationTypeEnum, notifications, videos, contactSettings, settingDataTypeEnum, platformSettings, settingsAudit, emailTemplates, loginHistory, verificationRules, documentTemplates, adminAuditLogs, twoFactorAuth, membershipBenefits, tierUsageTracking, sellerVerificationRequestStatusEnum, sellerVerificationDocumentTypeEnum, sellerVerificationRequests, sellerVerificationDocuments, usersRelations, adminPermissionsRelations, userProfilesRelations, projectsRelations, expressInterestRelations, marketplaceListingsRelations, buyerRequestsRelations, messageThreadsRelations, messagesRelations, blogPostsRelations, verificationQueueRelations, activityLogsRelations, notificationsRelations, accountDeletionRequestsRelations, tierUsageTrackingRelations, sellerVerificationRequestsRelations, sellerVerificationDocumentsRelations, paymentMethodEnum, tierUpgradeRequests, tierUpgradePayments, tierUpgradeDocuments, tierUpgradeRequestsRelations, tierUpgradeDocumentsRelations, upsertUserSchema, insertAdminPermissionsSchema, updateAdminPermissionsSchema, insertUserProfileSchema, updateUserProfileSchema, insertProjectSchema, insertExpressInterestSchema, insertMarketplaceListingSchema, insertBuyerRequestSchema, insertMessageThreadSchema, insertMessageSchema, insertBlogPostSchema, insertContactSubmissionSchema, insertActivityLogSchema, insertNotificationSchema, insertVideoSchema, updateVideoSchema, insertSustainabilityContentSchema2, insertContactSettingsSchema, updateContactSettingsSchema, insertMembershipBenefitSchema, updateMembershipBenefitSchema, insertTierUsageTrackingSchema, updateTierUsageTrackingSchema, insertMessageTemplateSchema, updateMessageTemplateSchema, insertPlatformSettingSchema, updatePlatformSettingSchema, insertSettingsAuditSchema, insertEmailTemplateSchema, updateEmailTemplateSchema, insertLoginHistorySchema, insertVerificationRuleSchema, updateVerificationRuleSchema, insertDocumentTemplateSchema, updateDocumentTemplateSchema, insertAdminAuditLogSchema, insertTwoFactorAuthSchema, updateTwoFactorAuthSchema, insertSellerVerificationRequestSchema, updateSellerVerificationRequestSchema, insertSellerVerificationDocumentSchema, paymentMethodDetails, insertTierUpgradePaymentSchema, updateTierUpgradePaymentSchema, insertPaymentMethodDetailsSchema, updatePaymentMethodDetailsSchema, insertTierUpgradeRequestSchema, updateTierUpgradeRequestSchema, insertAccountDeletionRequestSchema;
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
      onboardingCompleted: boolean("onboarding_completed").notNull().default(false),
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
      rejectionReason: text("rejection_reason"),
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
    accountDeletionRequests = pgTable("account_deletion_requests", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      userId: varchar("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
      reason: text("reason"),
      status: varchar("status").notNull().default("pending"),
      // pending, processed, cancelled
      createdAt: timestamp("created_at").defaultNow().notNull(),
      updatedAt: timestamp("updated_at").defaultNow().notNull()
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
    activityTypeEnum = pgEnum("activity_type", ["login", "logout", "listing_created", "listing_approved", "listing_rejected", "message_sent", "interest_expressed", "profile_updated", "blog_post_created", "tier_upgrade"]);
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
    notificationTypeEnum = pgEnum("notification_type", ["message", "listing_approved", "listing_rejected", "interest_received", "system", "tier_upgrade", "seller_verification"]);
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
      deletionRequests: many(accountDeletionRequests),
      tierUsage: many(tierUsageTracking),
      // sellerVerificationRequests references users in two different ways (sellerId and reviewedBy).
      // Disambiguate the relations by giving explicit relation names so Drizzle can map fields correctly.
      verificationRequestsAsSeller: many(sellerVerificationRequests, { relationName: "seller" }),
      verificationRequestsAsReviewer: many(sellerVerificationRequests, { relationName: "reviewer" })
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
    accountDeletionRequestsRelations = relations(accountDeletionRequests, ({ one }) => ({
      user: one(users, {
        fields: [accountDeletionRequests.userId],
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
        references: [users.id],
        relationName: "seller"
      }),
      reviewer: one(users, {
        fields: [sellerVerificationRequests.reviewedBy],
        references: [users.id],
        relationName: "reviewer"
      }),
      documents: many(sellerVerificationDocuments)
    }));
    sellerVerificationDocumentsRelations = relations(sellerVerificationDocuments, ({ one }) => ({
      request: one(sellerVerificationRequests, {
        fields: [sellerVerificationDocuments.requestId],
        references: [sellerVerificationRequests.id]
      })
    }));
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
    tierUpgradeDocuments = pgTable("tier_upgrade_documents", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      requestId: varchar("request_id").notNull().references(() => tierUpgradeRequests.id, { onDelete: "cascade" }),
      documentType: varchar("document_type").notNull(),
      // e.g., 'proof_of_funds', 'company_reg'
      fileName: varchar("file_name").notNull(),
      filePath: varchar("file_path").notNull(),
      fileSize: integer("file_size"),
      mimeType: varchar("mime_type"),
      uploadedAt: timestamp("uploaded_at").defaultNow().notNull()
    }, (table) => [
      index("IDX_tier_upgrade_doc_req_id").on(table.requestId)
    ]);
    tierUpgradeRequestsRelations = relations(tierUpgradeRequests, ({ one, many }) => ({
      user: one(users, {
        fields: [tierUpgradeRequests.userId],
        references: [users.id],
        relationName: "user"
      }),
      reviewer: one(users, {
        fields: [tierUpgradeRequests.reviewedBy],
        references: [users.id],
        relationName: "reviewer"
      }),
      documents: many(tierUpgradeDocuments)
    }));
    tierUpgradeDocumentsRelations = relations(tierUpgradeDocuments, ({ one }) => ({
      request: one(tierUpgradeRequests, {
        fields: [tierUpgradeDocuments.requestId],
        references: [tierUpgradeRequests.id]
      })
    }));
    upsertUserSchema = createInsertSchema(users).pick({
      id: true,
      clerkId: true,
      email: true,
      username: true,
      password: true,
      firstName: true,
      lastName: true,
      profileImageUrl: true,
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
    insertAccountDeletionRequestSchema = createInsertSchema(accountDeletionRequests).omit({
      id: true,
      status: true,
      createdAt: true,
      updatedAt: true
    });
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
        if (userData.clerkId) {
          const existingUsers = await db.select().from(users).where(eq(users.clerkId, userData.clerkId)).limit(1);
          if (existingUsers.length > 0) {
            const updateData = {
              email: userData.email,
              firstName: userData.firstName,
              lastName: userData.lastName,
              profileImageUrl: userData.profileImageUrl,
              role: userData.role,
              updatedAt: /* @__PURE__ */ new Date()
            };
            if (userData.password) {
              updateData.password = userData.password;
            }
            const [user2] = await db.update(users).set(updateData).where(eq(users.clerkId, userData.clerkId)).returning();
            return user2;
          }
        }
        if (userData.email) {
          const existingUsers = await db.select().from(users).where(eq(users.email, userData.email)).limit(1);
          if (existingUsers.length > 0) {
            const updateData = {
              firstName: userData.firstName,
              lastName: userData.lastName,
              profileImageUrl: userData.profileImageUrl,
              updatedAt: /* @__PURE__ */ new Date()
            };
            if (userData.clerkId) {
              updateData.clerkId = userData.clerkId;
            }
            if (userData.role) {
              updateData.role = userData.role;
            }
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
      // ========================================================================
      // Buyer Tier Upgrade operations implementation
      // ========================================================================
      async createTierUpgradeRequest(requestId, userId, requestedTier) {
        const [request] = await db.insert(tierUpgradeRequests).values({
          id: requestId,
          userId,
          requestedTier,
          status: "draft",
          submittedAt: /* @__PURE__ */ new Date()
        }).returning();
        return request;
      }
      async submitTierUpgradeRequest(requestId) {
        const [request] = await db.update(tierUpgradeRequests).set({
          status: "pending",
          submittedAt: /* @__PURE__ */ new Date(),
          updatedAt: /* @__PURE__ */ new Date()
        }).where(eq(tierUpgradeRequests.id, requestId)).returning();
        return request;
      }
      async getTierUpgradeRequestById(id) {
        const [request] = await db.select({
          ...tierUpgradeRequests,
          // all fields from request
          buyerEmail: users.email,
          buyerFirstName: users.firstName,
          buyerLastName: users.lastName
        }).from(tierUpgradeRequests).leftJoin(users, eq(tierUpgradeRequests.userId, users.id)).where(eq(tierUpgradeRequests.id, id));
        return request;
      }
      async getTierUpgradeRequestByUserId(userId) {
        const [request] = await db.select({
          ...tierUpgradeRequests,
          buyerEmail: users.email,
          buyerFirstName: users.firstName,
          buyerLastName: users.lastName
        }).from(tierUpgradeRequests).leftJoin(users, eq(tierUpgradeRequests.userId, users.id)).where(eq(tierUpgradeRequests.userId, userId)).orderBy(desc(tierUpgradeRequests.createdAt)).limit(1);
        return request;
      }
      async getAllTierUpgradeRequests() {
        return await db.select({
          id: tierUpgradeRequests.id,
          userId: tierUpgradeRequests.userId,
          requestedTier: tierUpgradeRequests.requestedTier,
          status: tierUpgradeRequests.status,
          rejectionReason: tierUpgradeRequests.rejectionReason,
          submittedAt: tierUpgradeRequests.submittedAt,
          reviewedAt: tierUpgradeRequests.reviewedAt,
          reviewedBy: tierUpgradeRequests.reviewedBy,
          documentCount: tierUpgradeRequests.documentCount,
          createdAt: tierUpgradeRequests.createdAt,
          updatedAt: tierUpgradeRequests.updatedAt,
          buyerEmail: users.email,
          buyerFirstName: users.firstName,
          buyerLastName: users.lastName
        }).from(tierUpgradeRequests).leftJoin(users, eq(tierUpgradeRequests.userId, users.id)).orderBy(desc(tierUpgradeRequests.submittedAt));
      }
      async getPendingTierUpgradeRequests() {
        return await db.select({
          id: tierUpgradeRequests.id,
          userId: tierUpgradeRequests.userId,
          requestedTier: tierUpgradeRequests.requestedTier,
          status: tierUpgradeRequests.status,
          rejectionReason: tierUpgradeRequests.rejectionReason,
          submittedAt: tierUpgradeRequests.submittedAt,
          reviewedAt: tierUpgradeRequests.reviewedAt,
          reviewedBy: tierUpgradeRequests.reviewedBy,
          documentCount: tierUpgradeRequests.documentCount,
          createdAt: tierUpgradeRequests.createdAt,
          updatedAt: tierUpgradeRequests.updatedAt,
          buyerEmail: users.email,
          buyerFirstName: users.firstName,
          buyerLastName: users.lastName
        }).from(tierUpgradeRequests).leftJoin(users, eq(tierUpgradeRequests.userId, users.id)).where(or(eq(tierUpgradeRequests.status, "pending"), eq(tierUpgradeRequests.status, "draft"))).orderBy(desc(tierUpgradeRequests.submittedAt));
      }
      async approveTierUpgradeRequest(id, reviewerId) {
        const request = await this.getTierUpgradeRequestById(id);
        if (!request) throw new Error("Request not found");
        const [updatedRequest] = await db.update(tierUpgradeRequests).set({
          status: "approved",
          reviewedBy: reviewerId,
          reviewedAt: /* @__PURE__ */ new Date(),
          updatedAt: /* @__PURE__ */ new Date()
        }).where(eq(tierUpgradeRequests.id, id)).returning();
        await db.update(users).set({ membershipTier: request.requestedTier }).where(eq(users.id, request.userId));
        return updatedRequest;
      }
      async rejectTierUpgradeRequest(id, reviewerId, reason) {
        const [updatedRequest] = await db.update(tierUpgradeRequests).set({
          status: "rejected",
          rejectionReason: reason,
          reviewedBy: reviewerId,
          reviewedAt: /* @__PURE__ */ new Date(),
          updatedAt: /* @__PURE__ */ new Date()
        }).where(eq(tierUpgradeRequests.id, id)).returning();
        return updatedRequest;
      }
      async revertTierUpgradeRequest(id) {
        const [updatedRequest] = await db.update(tierUpgradeRequests).set({
          status: "draft",
          rejectionReason: null,
          // Clear rejection reason
          reviewedBy: null,
          reviewedAt: null,
          updatedAt: /* @__PURE__ */ new Date()
        }).where(eq(tierUpgradeRequests.id, id)).returning();
        return updatedRequest;
      }
      async createTierUpgradeDocument(data) {
        const [doc] = await db.insert(tierUpgradeDocuments).values(data).returning();
        await db.execute(sql2`
      UPDATE ${tierUpgradeRequests}
      SET document_count = document_count + 1, updated_at = NOW()
      WHERE id = ${data.requestId}
    `);
        return doc;
      }
      async getTierUpgradeDocuments(requestId) {
        return await db.select().from(tierUpgradeDocuments).where(eq(tierUpgradeDocuments.requestId, requestId)).orderBy(desc(tierUpgradeDocuments.uploadedAt));
      }
      async createTierUpgradePayment(data) {
        const [payment] = await db.insert(tierUpgradePayments).values(data).returning();
        return payment;
      }
      async updateTierUpgradePayment(id, data) {
        const [updated] = await db.update(tierUpgradePayments).set({ ...data, updatedAt: /* @__PURE__ */ new Date() }).where(eq(tierUpgradePayments.id, id)).returning();
        return updated;
      }
      async getTierUpgradePaymentByRequestId(requestId) {
        const [payment] = await db.select().from(tierUpgradePayments).where(eq(tierUpgradePayments.upgradeRequestId, requestId)).limit(1);
        return payment;
      }
      // Onboarding & Deletion Implementation
      async completeOnboarding(userId, role) {
        await db.update(users).set({ role, updatedAt: /* @__PURE__ */ new Date() }).where(eq(users.id, userId));
        await db.update(userProfiles).set({ onboardingCompleted: true, updatedAt: /* @__PURE__ */ new Date() }).where(eq(userProfiles.userId, userId));
      }
      async createAccountDeletionRequest(data) {
        const [request] = await db.insert(accountDeletionRequests).values(data).returning();
        return request;
      }
      async getAccountDeletionRequests() {
        return await db.select().from(accountDeletionRequests).orderBy(desc(accountDeletionRequests.createdAt));
      }
      async updateAccountDeletionRequestStatus(id, status) {
        const [updated] = await db.update(accountDeletionRequests).set({ status, updatedAt: /* @__PURE__ */ new Date() }).where(eq(accountDeletionRequests.id, id)).returning();
        return updated;
      }
    };
    storage = new DatabaseStorage();
  }
});

// server/clerk.ts
import { Clerk } from "@clerk/clerk-sdk-node";
async function checkAdminRole(req, res, next) {
  try {
    if (!req.auth?.userId) {
      return res.status(401).json({ message: "Authentication required" });
    }
    const dbUser = await storage.getUserByClerkId(req.auth.userId);
    if (!dbUser || dbUser.role !== "admin") {
      return res.status(403).json({ message: "Admin access required" });
    }
    req.user = dbUser;
    next();
  } catch (error) {
    console.error("Error checking admin role:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
var clerk, requireAuth, requireAdmin, requireSeller, requireAdminPermission, getClerkUser;
var init_clerk = __esm({
  "server/clerk.ts"() {
    "use strict";
    init_storage();
    console.log("Initializing Clerk with secret key:", process.env.CLERK_SECRET_KEY ? "PRESENT" : "MISSING");
    clerk = Clerk({
      secretKey: process.env.CLERK_SECRET_KEY
    });
    requireAuth = async (req, res, next) => {
      const authHeader = req.headers.authorization;
      console.log("Auth header received:", authHeader ? authHeader.substring(0, 20) + "..." : "NONE");
      return clerk.expressRequireAuth({
        onError: (error) => {
          console.error("Clerk auth error:", error);
          res.status(401).json({ message: "Unauthorized" });
        }
      })(req, res, async () => {
        console.log("Clerk auth successful, req.auth:", req.auth);
        if (req.auth?.userId) {
          req.user = await storage.getUserByClerkId(req.auth.userId);
        }
        next();
      });
    };
    requireAdmin = async (req, res, next) => {
      console.log("requireAdmin: Using Clerk auth");
      return clerk.expressRequireAuth({
        onError: (error) => {
          console.error("requireAdmin: Clerk auth failed:", error);
          res.status(401).json({ message: "Authentication required" });
        }
      })(req, res, async () => {
        await checkAdminRole(req, res, next);
      });
    };
    requireSeller = async (req, res, next) => {
      try {
        if (!req.auth?.userId) {
          return res.status(401).json({ message: "Unauthorized" });
        }
        const dbUser = await storage.getUserByClerkId(req.auth.userId);
        if (!dbUser || dbUser.role !== "seller") {
          return res.status(403).json({ message: "Seller access required" });
        }
        req.user = dbUser;
        next();
      } catch (error) {
        console.error("Error in requireSeller:", error);
        res.status(500).json({ message: "Internal server error" });
      }
    };
    requireAdminPermission = (permission) => {
      return async (req, res, next) => {
        try {
          if (!req.auth?.userId) {
            return res.status(401).json({ message: "Unauthorized" });
          }
          let adminPerms = await storage.getAdminPermissions(req.auth.userId);
          if (!adminPerms) {
            const dbUser = await storage.getUserByClerkId(req.auth.userId);
            if (!dbUser || dbUser.role !== "admin") {
              return res.status(403).json({ message: "Admin access required" });
            }
            console.log(`[requireAdminPermission] No permissions in DB for admin user ${req.auth.userId}, granting all permissions as super_admin`);
            adminPerms = {
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
          }
          if (!adminPerms?.[permission]) {
            return res.status(403).json({ message: `Permission '${permission}' required` });
          }
          next();
        } catch (error) {
          console.error("Error in requireAdminPermission:", error);
          res.status(500).json({ message: "Internal server error" });
        }
      };
    };
    getClerkUser = async (userId) => {
      console.log("getClerkUser: Fetching user from Clerk:", userId);
      try {
        const user = await clerk.users.getUser(userId);
        console.log("getClerkUser: Clerk user fetch successful:", !!user);
        return user;
      } catch (error) {
        console.error("getClerkUser: Error fetching Clerk user:", error);
        return null;
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
import { eq as eq2 } from "drizzle-orm";
async function loadAdminPermissions(req, res, next) {
  try {
    if (!req.user || req.user.role !== "admin") {
      return next();
    }
    const permissions = await db.query.adminPermissions.findFirst({
      where: eq2(adminPermissions.adminUserId, req.user.id)
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

// server/localAuth.ts
var syncClerkUser;
var init_localAuth = __esm({
  "server/localAuth.ts"() {
    "use strict";
    init_clerk();
    init_storage();
    init_rbac();
    syncClerkUser = async (clerkUserId) => {
      console.log("syncClerkUser: Starting sync for userId:", clerkUserId);
      try {
        let dbUser = await storage.getUserByClerkId(clerkUserId);
        console.log("syncClerkUser: Existing user check result:", dbUser ? "FOUND" : "NOT FOUND");
        if (!dbUser) {
          console.log("syncClerkUser: User not found, fetching from Clerk...");
          const clerkUser = await getClerkUser(clerkUserId);
          console.log("syncClerkUser: Clerk user fetch result:", clerkUser ? "SUCCESS" : "FAILED");
          if (!clerkUser) {
            throw new Error("User not found in Clerk");
          }
          const email = clerkUser.emailAddresses[0]?.emailAddress;
          const firstName = clerkUser.firstName || "";
          const lastName = clerkUser.lastName || "";
          console.log("syncClerkUser: Extracted user data:", { email, firstName, lastName });
          if (!email) {
            throw new Error("User email not found");
          }
          const role = clerkUser.publicMetadata?.role || clerkUser.unsafeMetadata?.role || "buyer";
          const adminRole = clerkUser.publicMetadata?.adminRole || clerkUser.unsafeMetadata?.adminRole;
          console.log("syncClerkUser: User role and adminRole:", { role, adminRole });
          console.log("syncClerkUser: Creating user in database...");
          dbUser = await storage.upsertUser({
            clerkId: clerkUserId,
            email,
            firstName,
            lastName,
            role
          });
          console.log("syncClerkUser: User creation result:", dbUser ? "SUCCESS" : "FAILED", "user:", dbUser);
          console.log("syncClerkUser: Creating user profile...");
          await storage.createUserProfile({
            userId: dbUser.id,
            profileType: "individual",
            verified: false
          });
          console.log("syncClerkUser: Profile creation completed");
          if (role === "admin" && adminRole) {
            console.log("syncClerkUser: Creating admin permissions...");
            const permissions = ROLE_PERMISSIONS[adminRole] || ROLE_PERMISSIONS.super_admin;
            await storage.upsertAdminPermissions({
              adminUserId: dbUser.id,
              adminRole,
              ...permissions
            });
          }
        } else {
          const clerkUser = await getClerkUser(clerkUserId);
          if (clerkUser) {
            const currentRole = clerkUser.publicMetadata?.role || clerkUser.unsafeMetadata?.role || "buyer";
            const currentAdminRole = clerkUser.publicMetadata?.adminRole || clerkUser.unsafeMetadata?.adminRole;
            if (dbUser.role !== currentRole) {
              dbUser = await storage.updateUserRole(dbUser.id, currentRole);
              if (currentRole === "admin" && currentAdminRole) {
                const permissions = ROLE_PERMISSIONS[currentAdminRole] || ROLE_PERMISSIONS.super_admin;
                await storage.upsertAdminPermissions({
                  adminUserId: dbUser.id,
                  adminRole: currentAdminRole,
                  ...permissions
                });
              }
            }
          }
        }
        console.log("syncClerkUser: Final dbUser:", dbUser);
        return dbUser;
      } catch (error) {
        console.error("Error syncing Clerk user:", error);
        throw error;
      }
    };
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
  try {
    console.log("Auth handler called, method:", req.method, "auth:", !!req.auth);
    if (req.method !== "GET") {
      res.setHeader("Allow", "GET");
      return res.status(405).end("Method Not Allowed");
    }
    if (req.auth?.userId) {
      console.log("Auth handler: Clerk userId found:", req.auth.userId);
      const clerkUserId = req.auth.userId;
      let dbUser = await storage.getUserByClerkId(clerkUserId);
      console.log("Auth handler: DB user lookup result:", dbUser ? "FOUND" : "NOT FOUND");
      console.log("Auth handler: Attempting to sync user from Clerk...");
      try {
        await syncClerkUser(clerkUserId);
        console.log("Auth handler: Sync completed, looking up user again...");
        dbUser = await storage.getUserByClerkId(clerkUserId);
      } catch (syncError) {
        console.error("Auth handler: Error syncing Clerk user:", syncError);
        if (!dbUser) {
          return res.status(500).json({ message: "Failed to sync user data" });
        }
      }
      if (!dbUser) {
        console.log("Auth handler: User not found after sync attempt");
        return res.status(404).json({ message: "User not found" });
      }
      console.log("Auth handler: Returning user data for:", dbUser.email);
      const profile = await storage.getUserProfile(dbUser.id);
      const onboardingCompleted = profile?.onboardingCompleted || false;
      let adminPermissions2 = null;
      if (dbUser.role === "admin") {
        try {
          console.log("[AUTH_USER] User is admin, fetching permissions for:", dbUser.id);
          adminPermissions2 = await storage.getAdminPermissions(dbUser.id);
          console.log("[AUTH_USER] Permissions from DB:", JSON.stringify(adminPermissions2, null, 2));
          if (!adminPermissions2) {
            console.log("[AUTH_USER] No admin permissions found in DB, providing default super_admin permissions for user:", dbUser.id);
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
            console.log("[AUTH_USER] Default permissions set:", JSON.stringify(adminPermissions2, null, 2));
          } else {
            console.log("[AUTH_USER] Using permissions from database");
          }
        } catch (permError) {
          console.error("[AUTH_USER] Error fetching admin permissions:", permError);
          console.log("[AUTH_USER] Providing default super_admin permissions due to error");
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
        }
      }
      return res.json({
        ...dbUser,
        onboardingCompleted,
        adminPermissions: adminPermissions2
      });
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
  } catch (error) {
    console.error("Auth handler error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
var JWT_SECRET2;
var init_auth_user = __esm({
  "api/auth_user.ts"() {
    "use strict";
    init_storage();
    init_localAuth();
    JWT_SECRET2 = process.env.JWT_SECRET || "dev-secret-change-me";
  }
});

// server/index.ts
import "dotenv/config";
import path3 from "path";
import fs3 from "fs";
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
import { eq as eq3 } from "drizzle-orm";
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
function getUserId(req) {
  return req.auth?.userId || req.user?.claims?.sub || req.user?.id || null;
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
async function registerRoutes(app2) {
  const isAuthenticated = requireAuth;
  const isSeller = requireSeller;
  const isAdmin = requireAdmin;
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
  app2.patch("/api/projects/:id", isAuthenticated, isAdmin, async (req, res) => {
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
      const userId = getUserId(req);
      const user = userId ? await storage.getUser(userId) : null;
      const isAdmin2 = user && user.role === "admin";
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
  app2.post("/api/marketplace/buyer-requests", isAuthenticated, async (req, res) => {
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
  app2.patch("/api/marketplace/buyer-requests/:id/close", isAuthenticated, async (req, res) => {
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
      const listing = await storage.getMarketplaceListingById(req.params.id);
      if (!listing) {
        return res.status(404).json({ message: "Listing not found" });
      }
      if (req.user.role !== "admin" && listing.sellerId !== req.user.id) {
        return res.status(403).json({ message: "Only the seller or admin can close this listing" });
      }
      const closedListing = await storage.closeMarketplaceListing(req.params.id);
      res.json(closedListing);
    } catch (error) {
      console.error("Error closing listing:", error);
      res.status(500).json({ message: "Failed to close listing" });
    }
  });
  app2.post("/api/admin/listings/create", isAuthenticated, isAdmin, requireAdminPermission("canManageListings"), async (req, res) => {
    try {
      console.log("[ADMIN] Creating listing with body:", req.body);
      const validatedData = insertMarketplaceListingSchema.parse({
        ...req.body,
        sellerId: req.body.sellerId || req.user.id,
        // Default to admin's ID if no sellerId provided
        status: "active",
        // Admin created listings are active by default
        verified: true,
        // Admin created listings are verified by default
        createdAt: (/* @__PURE__ */ new Date()).toISOString(),
        updatedAt: (/* @__PURE__ */ new Date()).toISOString()
      });
      const listing = await storage.createMarketplaceListing(validatedData);
      try {
        await storage.createActivityLog({
          userId: req.user.id,
          action: "admin_create_listing",
          entityType: "listing",
          entityId: listing.id,
          details: `Admin created listing: ${listing.title}`,
          metadata: { listingId: listing.id, listingType: listing.type }
        });
      } catch (logError) {
        console.error("[ACTIVITY LOG] Failed to log listing creation:", logError);
      }
      res.status(201).json(listing);
    } catch (error) {
      if (error instanceof ZodError) {
        console.error("Validation error creating listing:", formatZodError(error));
        return res.status(400).json({ message: formatZodError(error) });
      }
      console.error("Error creating listing:", error);
      res.status(500).json({ message: "Failed to create listing" });
    }
  });
  app2.post("/api/admin/reject/:id", isAuthenticated, isAdmin, requireAdminPermission("canManageVerification"), async (req, res) => {
    try {
      const { reason } = req.body;
      const listingId = req.params.id;
      if (!reason) {
        return res.status(400).json({ message: "Rejection reason is required" });
      }
      console.log(`[ADMIN] Rejecting listing ${listingId} with reason: ${reason}`);
      const listing = await storage.getMarketplaceListingById(listingId);
      if (!listing) {
        return res.status(404).json({ message: "Listing not found" });
      }
      await storage.updateMarketplaceListing(listingId, {
        status: "rejected",
        rejectionReason: reason
      });
      res.json({ success: true, message: "Listing rejected" });
    } catch (error) {
      console.error("Error rejecting listing:", error);
      res.status(500).json({ message: "Failed to reject listing" });
    }
  });
  app2.post("/api/threads", isAuthenticated, async (req, res) => {
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
  app2.get("/api/admin/threads/categorized", isAuthenticated, isAdmin, async (req, res) => {
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
  app2.get("/api/threads/:id", isAuthenticated, async (req, res) => {
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
  app2.patch("/api/threads/:id/close", isAuthenticated, async (req, res) => {
    try {
      const thread2 = await storage.closeThread(req.params.id);
      res.json(thread2);
    } catch (error) {
      console.error("Error closing thread:", error);
      res.status(500).json({ message: "Failed to close thread" });
    }
  });
  app2.post("/api/support/tickets", isAuthenticated, async (req, res) => {
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
  app2.post("/api/admin/support/tickets/:id/claim", isAuthenticated, isAdmin, async (req, res) => {
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
  app2.patch("/api/admin/support/tickets/:id/resolve", isAuthenticated, isAdmin, async (req, res) => {
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
  app2.get("/api/admin/support/tickets", isAuthenticated, isAdmin, async (req, res) => {
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
  app2.patch("/api/threads/:id/ticket-status", isAuthenticated, isAdmin, async (req, res) => {
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
  app2.patch("/api/threads/:id/ticket-priority", isAuthenticated, isAdmin, async (req, res) => {
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
  app2.patch("/api/threads/:id/ticket-assign", isAuthenticated, isAdmin, async (req, res) => {
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
  app2.get("/api/admin/analytics", isAuthenticated, isAdmin, async (req, res) => {
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
  app2.get("/api/sustainability", async (req, res) => {
    try {
      const items = await storage.getSustainabilityContent();
      res.json(items);
    } catch (error) {
      console.error("Error fetching sustainability content:", error);
      res.status(500).json({ message: "Failed to fetch sustainability content" });
    }
  });
  app2.post("/api/sustainability", isAuthenticated, isAdmin, async (req, res) => {
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
  app2.patch("/api/sustainability/:id", isAuthenticated, isAdmin, async (req, res) => {
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
  app2.delete("/api/sustainability/:id", isAuthenticated, isAdmin, async (req, res) => {
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
              isAdminSupport: true,
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
              isAdminSupport: true,
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
  app2.get("/api/admin/stats", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const allUsers = await storage.getAllUsers();
      const totalUsers = allUsers.length;
      const admins = allUsers.filter((u) => u.role === "admin").length;
      const sellers = allUsers.filter((u) => u.role === "seller").length;
      const buyers = allUsers.filter((u) => u.role === "buyer").length;
      const pendingListings = await storage.getPendingListings();
      const allListings = await db.select().from(marketplaceListings);
      const totalListings = allListings.length;
      const approvedListings = allListings.filter((l) => l.status === "approved").length;
      const allProjects = await db.select().from(projects);
      const totalProjects = allProjects.length;
      const activeProjects = allProjects.filter((p) => p.status === "active").length;
      const allMessages = await db.select().from(messages);
      const totalMessages = allMessages.length;
      const unreadMessages = allMessages.filter((m) => !m.read).length;
      const allBuyerRequests = await db.select().from(buyerRequests);
      const totalRFQs = allBuyerRequests.length;
      return res.json({
        totalUsers,
        admins,
        sellers,
        buyers,
        pendingVerifications: pendingListings.length,
        totalListings,
        approvedListings,
        totalProjects,
        activeProjects,
        totalMessages,
        unreadMessages,
        totalRFQs
      });
    } catch (error) {
      console.error("Error fetching admin stats:", error);
      res.status(500).json({ message: "Failed to fetch admin stats" });
    }
  });
  app2.post("/api/admin/verify/:id", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const reviewerId = req.user.id;
      const listingId = req.params.id;
      const listing = await storage.getMarketplaceListingById(listingId);
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
      try {
        await storage.logAdminAudit({
          adminId: reviewerId,
          action: "listing_approved",
          targetType: "listing",
          targetId: listingId,
          changes: {
            title: listing?.title,
            type: listing?.type,
            status: "approved"
          },
          ipAddress: req.ip || req.headers["x-forwarded-for"]?.split(",")[0]?.trim() || null,
          userAgent: req.get("user-agent") || null
        });
      } catch (auditError) {
        console.error("[ADMIN AUDIT] Failed to log listing approval:", auditError);
      }
      res.json({ message: "Listing approved successfully" });
    } catch (error) {
      console.error("Error approving listing:", error);
      res.status(500).json({ message: "Failed to approve listing" });
    }
  });
  app2.post("/api/admin/reject/:id", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const reviewerId = req.user.id;
      const listingId = req.params.id;
      const listing = await storage.getMarketplaceListingById(listingId);
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
      try {
        await storage.logAdminAudit({
          adminId: reviewerId,
          action: "listing_rejected",
          targetType: "listing",
          targetId: listingId,
          changes: {
            title: listing?.title,
            type: listing?.type,
            status: "rejected"
          },
          ipAddress: req.ip || req.headers["x-forwarded-for"]?.split(",")[0]?.trim() || null,
          userAgent: req.get("user-agent") || null
        });
      } catch (auditError) {
        console.error("[ADMIN AUDIT] Failed to log listing rejection:", auditError);
      }
      res.json({ message: "Listing rejected successfully" });
    } catch (error) {
      console.error("Error rejecting listing:", error);
      res.status(500).json({ message: "Failed to reject listing" });
    }
  });
  app2.get("/api/admin/users", isAuthenticated, isAdmin, async (req, res) => {
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
  app2.post("/api/admin/users", isAuthenticated, isAdmin, async (req, res) => {
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
  app2.patch("/api/admin/users/:id/info", isAuthenticated, isAdmin, async (req, res) => {
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
        await db.update(users).set(updateData).where(eq3(users.id, userId));
      }
      if (phoneNumber !== void 0 || companyName !== void 0) {
        const profileUpdateData = {};
        if (phoneNumber !== void 0) profileUpdateData.phoneNumber = phoneNumber;
        if (companyName !== void 0) profileUpdateData.companyName = companyName;
        const existingProfile = await db.select().from(userProfiles).where(eq3(userProfiles.userId, userId)).limit(1);
        if (existingProfile.length > 0) {
          await db.update(userProfiles).set(profileUpdateData).where(eq3(userProfiles.userId, userId));
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
  app2.get("/api/admin/roles", isAuthenticated, isAdmin, async (req, res) => {
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
  app2.get("/api/admin/users/by-role/:role", isAuthenticated, isAdmin, async (req, res) => {
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
  app2.patch("/api/admin/users/:id/admin-role", isAuthenticated, isAdmin, async (req, res) => {
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
  app2.put("/api/admin/users/:id/custom-permissions", isAuthenticated, isAdmin, async (req, res) => {
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
  app2.get("/api/admin/audit-logs", isAuthenticated, isAdmin, async (req, res) => {
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
  app2.post("/api/admin/audit-log", isAuthenticated, isAdmin, async (req, res) => {
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
  app2.get("/api/admin/activity-logs", isAuthenticated, isAdmin, async (req, res) => {
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
      const notifications3 = await storage.getUserNotifications(userId);
      res.json(notifications3);
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
  app2.get("/api/admin/settings/platform", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const settings = await storage.getAllPlatformSettings();
      res.json(settings);
    } catch (error) {
      console.error("Error fetching platform settings:", error);
      res.status(500).json({ message: "Failed to fetch platform settings" });
    }
  });
  app2.post("/api/admin/settings/platform", isAuthenticated, isAdmin, async (req, res) => {
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
  app2.patch("/api/admin/settings/platform/:id", isAuthenticated, isAdmin, async (req, res) => {
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
  app2.delete("/api/admin/settings/platform/:id", isAuthenticated, isAdmin, async (req, res) => {
    try {
      await storage.deletePlatformSetting(req.params.id);
      res.json({ message: "Platform setting deleted successfully" });
    } catch (error) {
      console.error("Error deleting platform setting:", error);
      res.status(500).json({ message: "Failed to delete platform setting" });
    }
  });
  app2.get("/api/admin/settings/platform/category/:category", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const settings = await storage.getPlatformSettingsByCategory(req.params.category);
      res.json(settings);
    } catch (error) {
      console.error("Error fetching settings by category:", error);
      res.status(500).json({ message: "Failed to fetch settings" });
    }
  });
  app2.get("/api/admin/settings/audit", isAuthenticated, isAdmin, async (req, res) => {
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
  app2.get("/api/admin/settings/email-templates", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const templates = await storage.getAllEmailTemplates();
      res.json(templates);
    } catch (error) {
      console.error("Error fetching email templates:", error);
      res.status(500).json({ message: "Failed to fetch email templates" });
    }
  });
  app2.post("/api/admin/settings/email-templates", isAuthenticated, isAdmin, async (req, res) => {
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
  app2.patch("/api/admin/settings/email-templates/:id", isAuthenticated, isAdmin, async (req, res) => {
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
  app2.delete("/api/admin/settings/email-templates/:id", isAuthenticated, isAdmin, async (req, res) => {
    try {
      await storage.deleteEmailTemplate(req.params.id);
      res.json({ message: "Email template deleted successfully" });
    } catch (error) {
      console.error("Error deleting email template:", error);
      res.status(500).json({ message: "Failed to delete email template" });
    }
  });
  app2.get("/api/admin/settings/login-history", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const userId = req.query.userId;
      const history = await storage.getLoginHistory(userId);
      res.json(history);
    } catch (error) {
      console.error("Error fetching login history:", error);
      res.status(500).json({ message: "Failed to fetch login history" });
    }
  });
  app2.get("/api/admin/settings/verification-rules", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const rules = await storage.getAllVerificationRules();
      res.json(rules);
    } catch (error) {
      console.error("Error fetching verification rules:", error);
      res.status(500).json({ message: "Failed to fetch verification rules" });
    }
  });
  app2.post("/api/admin/settings/verification-rules", isAuthenticated, isAdmin, async (req, res) => {
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
  app2.patch("/api/admin/settings/verification-rules/:id", isAuthenticated, isAdmin, async (req, res) => {
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
  app2.delete("/api/admin/settings/verification-rules/:id", isAuthenticated, isAdmin, async (req, res) => {
    try {
      await storage.deleteVerificationRule(req.params.id);
      res.json({ message: "Verification rule deleted successfully" });
    } catch (error) {
      console.error("Error deleting verification rule:", error);
      res.status(500).json({ message: "Failed to delete verification rule" });
    }
  });
  app2.get("/api/admin/settings/document-templates", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const templates = await storage.getAllDocumentTemplates();
      res.json(templates);
    } catch (error) {
      console.error("Error fetching document templates:", error);
      res.status(500).json({ message: "Failed to fetch document templates" });
    }
  });
  app2.post("/api/admin/settings/document-templates", isAuthenticated, isAdmin, async (req, res) => {
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
  app2.patch("/api/admin/settings/document-templates/:id", isAuthenticated, isAdmin, async (req, res) => {
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
  app2.delete("/api/admin/settings/document-templates/:id", isAuthenticated, isAdmin, async (req, res) => {
    try {
      await storage.deleteDocumentTemplate(req.params.id);
      res.json({ message: "Document template deleted successfully" });
    } catch (error) {
      console.error("Error deleting document template:", error);
      res.status(500).json({ message: "Failed to delete document template" });
    }
  });
  app2.get("/api/admin/settings/audit-logs", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const adminId = req.query.adminId;
      const logs = await storage.getAdminAuditLogs(adminId);
      res.json(logs);
    } catch (error) {
      console.error("Error fetching audit logs:", error);
      res.status(500).json({ message: "Failed to fetch audit logs" });
    }
  });
  app2.patch("/api/admin/users/:id/password-reset", isAuthenticated, isAdmin, async (req, res) => {
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
  app2.post("/api/admin/users/:id/force-logout", isAuthenticated, isAdmin, async (req, res) => {
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
  app2.patch("/api/admin/users/:id/role", isAuthenticated, isAdmin, async (req, res) => {
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
  app2.patch("/api/account/profile", isAuthenticated, async (req, res) => {
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
  app2.post("/api/account/password-change", isAuthenticated, async (req, res) => {
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
  app2.get("/api/account/login-history", isAuthenticated, async (req, res) => {
    try {
      const history = await storage.getLoginHistory(req.user.id);
      res.json(history);
    } catch (error) {
      console.error("Error fetching login history:", error);
      res.status(500).json({ message: "Failed to fetch login history" });
    }
  });
  app2.get("/api/account/2fa/status", isAuthenticated, async (req, res) => {
    try {
      const twoFAStatus = await storage.getTwoFactorAuthStatus(req.user.id);
      res.json(twoFAStatus);
    } catch (error) {
      console.error("Error fetching 2FA status:", error);
      res.status(500).json({ message: "Failed to fetch 2FA status" });
    }
  });
  app2.post("/api/account/2fa/enable", isAuthenticated, async (req, res) => {
    try {
      await storage.enableTwoFactorAuth(req.user.id);
      res.json({ message: "2FA enabled successfully" });
    } catch (error) {
      console.error("Error enabling 2FA:", error);
      res.status(500).json({ message: "Failed to enable 2FA" });
    }
  });
  app2.post("/api/account/2fa/disable", isAuthenticated, async (req, res) => {
    try {
      await storage.disableTwoFactorAuth(req.user.id);
      res.json({ message: "2FA disabled successfully" });
    } catch (error) {
      console.error("Error disabling 2FA:", error);
      res.status(500).json({ message: "Failed to disable 2FA" });
    }
  });
  app2.post("/api/verification/request", isAuthenticated, async (req, res) => {
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
  app2.post("/api/verification/submit", isAuthenticated, async (req, res) => {
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
  app2.get("/api/verification/my-request", isAuthenticated, async (req, res) => {
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
  app2.get("/api/verification/requests", isAuthenticated, async (req, res) => {
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
  app2.get("/api/verification/requests/pending", isAuthenticated, async (req, res) => {
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
  app2.get("/api/verification/documents/:requestId", isAuthenticated, async (req, res) => {
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
  app2.post("/api/verification/approve/:id", isAuthenticated, async (req, res) => {
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
  app2.post("/api/verification/reject/:id", isAuthenticated, async (req, res) => {
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
  app2.post("/api/verification/upload", isAuthenticated, verificationUpload.single("file"), async (req, res) => {
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
  app2.post("/api/buyer/tier-upgrade-request", isAuthenticated, async (req, res) => {
    try {
      if (req.user.role !== "buyer") {
        return res.status(403).json({ message: "Only buyers can request tier upgrades" });
      }
      const { requestedTier } = req.body;
      if (!requestedTier || !["standard", "premium"].includes(requestedTier)) {
        return res.status(400).json({ message: "Invalid tier. Must be 'standard' or 'premium'" });
      }
      const existing = await storage.getTierUpgradeRequestByUserId(req.user.id);
      if (existing && (existing.status === "pending" || existing.status === "draft")) {
        if (existing.status === "draft") return res.json(existing);
        return res.status(400).json({ message: "You already have a pending tier upgrade request" });
      }
      const requestId = `tier-upgrade-${Date.now()}`;
      const request = await storage.createTierUpgradeRequest(requestId, req.user.id, requestedTier);
      res.json(request);
    } catch (error) {
      console.error("Error creating tier upgrade request:", error);
      res.status(500).json({ message: "Failed to create tier upgrade request" });
    }
  });
  app2.get("/api/buyer/tier-upgrade-request", isAuthenticated, async (req, res) => {
    try {
      if (req.user.role !== "buyer") {
        return res.status(403).json({ message: "Only buyers can access this endpoint" });
      }
      const request = await storage.getTierUpgradeRequestByUserId(req.user.id);
      res.json(request || null);
    } catch (error) {
      console.error("Error fetching tier upgrade request:", error);
      res.status(500).json({ message: "Failed to fetch tier upgrade request" });
    }
  });
  app2.post("/api/buyer/tier-upgrade/upload", isAuthenticated, verificationUpload.single("file"), async (req, res) => {
    try {
      if (req.user.role !== "buyer") {
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
      const document = await storage.createTierUpgradeDocument({
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
      console.error("Error uploading tier upgrade document:", error);
      res.status(500).json({ message: error.message || "Failed to upload document" });
    }
  });
  app2.post("/api/buyer/tier-upgrade/submit", isAuthenticated, async (req, res) => {
    try {
      if (req.user.role !== "buyer") {
        return res.status(403).json({ message: "Only buyers can submit tier upgrade requests" });
      }
      const { requestId } = req.body;
      if (!requestId) {
        return res.status(400).json({ message: "Request ID is required" });
      }
      const request = await storage.getTierUpgradeRequestById(requestId);
      if (!request) {
        return res.status(404).json({ message: "Tier upgrade request not found" });
      }
      if (request.userId !== req.user.id) {
        return res.status(403).json({ message: "Unauthorized - request does not belong to user" });
      }
      const updated = await storage.submitTierUpgradeRequest(requestId);
      res.json({
        success: true,
        message: "Tier upgrade request submitted successfully",
        status: updated.status,
        submittedAt: updated.submittedAt
      });
    } catch (error) {
      console.error("Error submitting tier upgrade request:", error);
      res.status(500).json({ message: error.message || "Failed to submit tier upgrade request" });
    }
  });
  app2.get("/api/buyer/tier-upgrade-request", isAuthenticated, async (req, res) => {
    try {
      if (req.user.role !== "buyer") {
        return res.status(403).json({ message: "Only buyers can access this endpoint" });
      }
      const request = await storage.getTierUpgradeRequestByUserId(req.user.id);
      res.json(request || null);
    } catch (error) {
      console.error("Error fetching tier upgrade request:", error);
      res.status(500).json({ message: "Failed to fetch tier upgrade request" });
    }
  });
  app2.get("/api/admin/buyer-upgrades/pending", requireAdmin, async (req, res) => {
    try {
      const pendingRequests = await storage.getPendingTierUpgradeRequests();
      res.json(pendingRequests);
    } catch (error) {
      console.error("Error fetching pending buyer tier upgrades:", error);
      res.status(500).json({ message: "Failed to fetch pending buyer tier upgrades" });
    }
  });
  app2.get("/api/admin/buyer-upgrades", requireAdmin, async (req, res) => {
    try {
      const allRequests = await storage.getAllTierUpgradeRequests();
      res.json(allRequests);
    } catch (error) {
      console.error("Error fetching buyer tier upgrades:", error);
      res.status(500).json({ message: "Failed to fetch buyer tier upgrades" });
    }
  });
  app2.get("/api/admin/buyer-upgrades/documents/:requestId", requireAdmin, async (req, res) => {
    try {
      const { requestId } = req.params;
      const documents = await storage.getTierUpgradeDocuments(requestId);
      res.json(documents);
    } catch (error) {
      console.error("Error fetching buyer tier upgrade documents:", error);
      res.status(500).json({ message: "Failed to fetch documents" });
    }
  });
  app2.post("/api/admin/buyer-upgrades/approve/:id", requireAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      const reviewerId = req.user.id;
      const updated = await storage.approveTierUpgradeRequest(id, reviewerId);
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
        reviewedAt: updated.reviewedAt
      });
    } catch (error) {
      console.error("Error approving buyer tier upgrade:", error);
      res.status(500).json({ message: "Failed to approve tier upgrade request" });
    }
  });
  app2.post("/api/admin/buyer-upgrades/reject/:id", requireAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      const { reason } = req.body;
      const reviewerId = req.user.id;
      if (!reason) {
        return res.status(400).json({ message: "Rejection reason is required" });
      }
      const updated = await storage.rejectTierUpgradeRequest(id, reviewerId, reason);
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
        reviewedAt: updated.reviewedAt
      });
    } catch (error) {
      console.error("Error rejecting buyer tier upgrade:", error);
      res.status(500).json({ message: "Failed to reject tier upgrade request" });
    }
  });
  app2.post("/api/admin/buyer-upgrades/revert/:id", requireAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      const updated = await storage.revertTierUpgradeRequest(id);
      res.json({
        success: true,
        message: "Tier upgrade request reverted to draft successfully",
        status: "draft",
        updatedAt: updated.updatedAt
      });
    } catch (error) {
      console.error("Error reverting buyer tier upgrade:", error);
      res.status(500).json({ message: "Failed to revert tier upgrade request" });
    }
  });
  app2.get("/api/payment-methods", async (req, res) => {
    try {
      const methods = await storage.getAllPaymentMethodDetails();
      if (methods.length === 0) {
        const defaults = [
          {
            method: "bank_transfer",
            name: "Bank Transfer (Zambia)",
            description: "Local ZMK/USD bank transfer",
            instructions: "Please transfer the amount to the provided account and upload proof of payment.",
            accountDetails: { bank: "Zambia National Commercial Bank (Zanaco)", accountName: "Fusion Mining Limited", accountNo: "54829302930" },
            currencyCode: "ZMW",
            currencyName: "Zambian Kwacha",
            isActive: true
          },
          {
            method: "airtel_money",
            name: "Airtel Money",
            description: "Mobile money payment",
            instructions: "Send money to +260 978 838 939 and upload confirmation message screenshot.",
            accountDetails: { merchantId: "FUSION789", phone: "+260 978 838 939" },
            currencyCode: "ZMW",
            currencyName: "Zambian Kwacha",
            isActive: true
          },
          {
            method: "wechat_alipay",
            name: "WeChat / AliPay (USD)",
            description: "International digital payments",
            instructions: "Scan the QR code to pay via WeChat or AliPay.",
            accountDetails: { wechatId: "fusion_mining_china", alipayId: "fusion@mining.com" },
            currencyCode: "USD",
            currencyName: "US Dollar",
            isActive: true
          }
        ];
        for (const d of defaults) {
          await storage.createPaymentMethodDetails(d);
        }
        return res.json(await storage.getAllPaymentMethodDetails());
      }
      res.json(methods);
    } catch (error) {
      console.error("Error fetching payment methods:", error);
      res.status(500).json({ message: "Failed to fetch payment methods" });
    }
  });
  app2.post("/api/buyer/tier-upgrade/payment", isAuthenticated, async (req, res) => {
    try {
      const { upgradeRequestId, paymentMethod, amount } = req.body;
      if (!upgradeRequestId || !paymentMethod || !amount) {
        return res.status(400).json({ message: "Missing required payment fields" });
      }
      const exchangeRate = 25;
      const amountZMW = amount * exchangeRate;
      const payment = await storage.createTierUpgradePayment({
        upgradeRequestId,
        userId: req.user.id,
        requestedTier: "premium",
        // Default to premium for now or fetch from request
        paymentMethod,
        amountUSD: amount.toString(),
        amount: amountZMW.toString(),
        currency: "ZMW",
        status: "pending"
      });
      res.json(payment);
    } catch (error) {
      console.error("Error creating tier upgrade payment:", error);
      res.status(500).json({ message: error.message || "Failed to create payment" });
    }
  });
  app2.post("/api/buyer/tier-upgrade/payment/:id/proof", isAuthenticated, verificationUpload.single("proofOfPayment"), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No proof of payment file uploaded" });
      }
      const paymentId = req.params.id;
      const relativePath = `/attached_assets/files/uploads/verification/${req.file.filename}`;
      const updated = await storage.updateTierUpgradePayment(paymentId, {
        proofOfPaymentUrl: relativePath,
        status: "paid"
        // Mark as paid once proof is uploaded
      });
      res.json(updated);
    } catch (error) {
      console.error("Error uploading proof of payment:", error);
      res.status(500).json({ message: error.message || "Failed to upload proof" });
    }
  });
  app2.post("/api/complete-onboarding", isAuthenticated, async (req, res) => {
    try {
      const userId = req.user.id;
      const { role } = req.body;
      if (!["buyer", "seller"].includes(role)) {
        return res.status(400).json({ message: "Invalid role" });
      }
      await storage.completeOnboarding(userId, role);
      res.json({ success: true });
    } catch (error) {
      console.error("Error completing onboarding:", error);
      res.status(500).json({ message: "Failed to complete onboarding" });
    }
  });
  app2.post("/api/account-deletion-request", isAuthenticated, async (req, res) => {
    try {
      const userId = req.user.id;
      const { reason } = req.body;
      const request = await storage.createAccountDeletionRequest({
        userId,
        reason
      });
      res.json(request);
    } catch (error) {
      console.error("Error creating deletion request:", error);
      res.status(500).json({ message: "Failed to submit deletion request" });
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
  const distPath = path2.resolve(import.meta.dirname, "..", "build", "public");
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
  app2.use("*", (req, res) => {
    try {
      const indexFile = path2.resolve(distPath, "index.html");
      const exists = fs2.existsSync(indexFile);
      console.log(`Static fallback: ${req.method} ${req.originalUrl} -> index.html exists=${exists} path=${indexFile}`);
      if (!exists) {
        res.status(404).send("Not Found");
        return;
      }
      res.sendFile(indexFile);
    } catch (e) {
      console.error("Error serving index.html fallback:", e instanceof Error ? e.stack || e.message : String(e));
      res.status(500).send("Internal Server Error");
    }
  });
}

// server/index.ts
init_clerk();
import pg from "pg";

// api/clerk-webhook.ts
init_storage();
import { Webhook } from "svix";
async function clerkWebhookHandler(req, res) {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;
  if (!WEBHOOK_SECRET) {
    console.error("CLERK_WEBHOOK_SECRET is not set");
    return res.status(500).json({ message: "Webhook secret not configured" });
  }
  const svix_id = req.headers["svix-id"];
  const svix_timestamp = req.headers["svix-timestamp"];
  const svix_signature = req.headers["svix-signature"];
  if (!svix_id || !svix_timestamp || !svix_signature) {
    console.error("Missing svix headers");
    return res.status(400).json({ message: "Error occured -- no svix headers" });
  }
  const body = req.rawBody || JSON.stringify(req.body);
  const wh = new Webhook(WEBHOOK_SECRET);
  let evt;
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature
    });
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return res.status(400).json({ message: "Error occured" });
  }
  const eventType = evt.type;
  console.log(`Clerk Webhook received: ${eventType}`);
  if (eventType === "user.created" || eventType === "user.updated") {
    const { id, email_addresses, first_name, last_name, image_url, public_metadata, unsafe_metadata } = evt.data;
    const email = email_addresses?.[0]?.email_address;
    const role = public_metadata?.role || unsafe_metadata?.role || "buyer";
    try {
      console.log(`Upserting user: ${id} (${email})`);
      const user = await storage.upsertUser({
        clerkId: id,
        email: email || "",
        firstName: first_name || "",
        lastName: last_name || "",
        profileImageUrl: image_url || null,
        role
      });
      const existingProfile = await storage.getUserProfile(user.id);
      if (!existingProfile) {
        console.log(`Creating profile for user: ${user.id}`);
        await storage.createUserProfile({
          userId: user.id,
          profileType: "individual",
          verified: false
        });
      }
      return res.status(200).json({ message: "User updated in database" });
    } catch (error) {
      console.error("Error updating user from Clerk webhook:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
  if (eventType === "user.deleted") {
    const { id } = evt.data;
    try {
      console.log(`Deleting user: ${id}`);
      const user = await storage.getUserByClerkId(id);
      if (user) {
        await storage.deleteUser(user.id);
      }
      return res.status(200).json({ message: "User deleted from database" });
    } catch (error) {
      console.error("Error deleting user from Clerk webhook:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
  return res.status(200).json({ message: "Webhook received" });
}

// server/index.ts
if (!process.env.CLERK_SECRET_KEY) {
  __require("dotenv").config({ path: path3.resolve(__dirname, "..", ".env") });
}
var app = express2();
app.post("/api/clerk-webhook", express2.json({
  verify: (req, _res, buf) => {
    req.rawBody = buf.toString();
  }
}), clerkWebhookHandler);
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
  const path4 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path4.startsWith("/api")) {
      let logLine = `${req.method} ${path4} ${res.statusCode} in ${duration}ms`;
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
      app.get("/api/auth/user", requireAuth, authUserHandler);
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
      try {
        const checkPath = path3.resolve(process.cwd(), "build", "public");
        console.log("Resolved build public path for production:", checkPath);
        console.log("Exists:", fs3.existsSync(checkPath));
        try {
          console.log("Files at build/public:", fs3.readdirSync(checkPath).slice(0, 20));
        } catch (e) {
          console.log("Could not list files at build/public:", e instanceof Error ? e.message : String(e));
        }
      } catch (e) {
        console.log("Error while checking build/public path:", e instanceof Error ? e.message : String(e));
      }
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
