// Database storage implementation with complete CRUD operations
import {
  users,
  userProfiles,
  projects,
  expressInterest,
  marketplaceListings,
  buyerRequests,
  messageThreads,
  messages,
  messageIdempotency,
  messageTemplates,
  blogPosts,
  contactSubmissions,
  contactSettings,
  sustainabilityContent,
  verificationQueue,
  activityLogs,
  notifications,
  videos,
  adminPermissions,
  accountDeletionRequests,
  membershipBenefits,
  tierUsageTracking,
  platformSettings,
  settingsAudit,
  emailTemplates,
  loginHistory,
  verificationRules,
  documentTemplates,
  adminAuditLogs,
  twoFactorAuth,
  sessions,
  sellerVerificationRequests,
  sellerVerificationDocuments,
  tierUpgradePayments,
  paymentMethodDetails,
  tierUpgradeRequests,
  tierUpgradeDocuments,
  type AdminPermissions,
  type InsertAdminPermissions,
  type UpdateAdminPermissions,
  type User,
  type UpsertUser,
  type UserProfile,
  type InsertUserProfile,
  type UpdateUserProfile,
  type Project,
  type ProjectWithOwner,
  type InsertProject,
  type ExpressInterest,
  type InsertExpressInterest,
  type MarketplaceListing,
  type MarketplaceListingWithSeller,
  type InsertMarketplaceListing,
  type BuyerRequest,
  type InsertBuyerRequest,
  type MessageThread,
  type InsertMessageThread,
  type Message,
  type InsertMessage,
  type MessageTemplate,
  type InsertMessageTemplate,
  type BlogPost,
  type InsertBlogPost,
  type ContactSubmission,
  type InsertContactSubmission,
  type ContactSettings,
  type InsertContactSettings,
  type SustainabilityContent,
  type InsertSustainabilityContent,
  type ActivityLog,
  type InsertActivityLog,
  type Notification,
  type InsertNotification,
  type Video,
  type InsertVideo,
  type UpdateVideo,
  type MembershipBenefit,
  type InsertMembershipBenefit,
  type TierUsageTracking,
  type InsertTierUsageTracking,
  type PlatformSetting,
  type InsertPlatformSetting,
  type UpdatePlatformSetting,
  type SettingsAudit,
  type InsertSettingsAudit,
  type EmailTemplate,
  type InsertEmailTemplate,
  type UpdateEmailTemplate,
  type LoginHistory,
  type InsertLoginHistory,
  type VerificationRule,
  type InsertVerificationRule,
  type UpdateVerificationRule,
  type DocumentTemplate,
  type InsertDocumentTemplate,
  type UpdateDocumentTemplate,
  type AdminAuditLog,
  type InsertAdminAuditLog,
  type TwoFactorAuth,
  type InsertTwoFactorAuth,
  type UpdateTwoFactorAuth,
  type SellerVerificationRequest,
  type InsertSellerVerificationRequest,
  type SellerVerificationDocument,
  type InsertSellerVerificationDocument,
  type TierUpgradePayment,
  type InsertTierUpgradePayment,
  type UpdateTierUpgradePayment,
  type PaymentMethodDetails,
  type InsertPaymentMethodDetails,
  type UpdatePaymentMethodDetails,
  type AccountDeletionRequest,
  type InsertAccountDeletionRequest,
} from "@shared/schema";
import { db } from "./db";
import { eq, and, desc, or, sql, inArray } from "drizzle-orm";

// Helper: generate a short (5 char) human-friendly item id and ensure uniqueness
async function generateUniqueItemId(db: any, length = 5) {
  const CHARS = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  const maxAttempts = 20;

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    let id = '';
    for (let i = 0; i < length; i++) id += CHARS[Math.floor(Math.random() * CHARS.length)];

    // check uniqueness across tables we care about
    const exists = await db
      .select()
      .from(marketplaceListings)
      .where(eq(marketplaceListings.itemId, id))
      .limit(1);
    if (exists.length > 0) continue;

    const exists2 = await db
      .select()
      .from(projects)
      .where(eq(projects.itemId, id))
      .limit(1);
    if (exists2.length > 0) continue;

    const exists3 = await db
      .select()
      .from(buyerRequests)
      .where(eq(buyerRequests.itemId, id))
      .limit(1);
    if (exists3.length > 0) continue;

    return id;
  }

  throw new Error('Failed to generate unique item id');
}

export interface IStorage {
  // User operations (Required for Replit Auth)
  getUser(id: string): Promise<User | undefined>;
  getUserById(id: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByClerkId(clerkId: string): Promise<User | undefined>;
  getAdminUser(): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
  getAllUsers(): Promise<User[]>;
  updateUserRole(id: string, role: string): Promise<User>;
  deleteUser(id: string): Promise<void>;
  // Admin permissions
  getAdminPermissions(adminUserId: string): Promise<AdminPermissions | undefined>;
  upsertAdminPermissions(data: InsertAdminPermissions): Promise<AdminPermissions>;
  updateAdminPermissions(data: UpdateAdminPermissions): Promise<AdminPermissions>;

  // User Profile operations
  getUserProfile(userId: string): Promise<UserProfile | undefined>;
  createUserProfile(profile: InsertUserProfile): Promise<UserProfile>;
  updateUserProfile(profile: UpdateUserProfile): Promise<UserProfile>;

  // Project operations
  createProject(project: InsertProject): Promise<Project>;
  getProjects(): Promise<ProjectWithOwner[]>;
  getProjectById(id: string): Promise<ProjectWithOwner | undefined>;
  updateProject(id: string, data: Partial<InsertProject>): Promise<Project>;
  deleteProject(id: string): Promise<void>;
  closeProject(id: string): Promise<Project>;
  expressProjectInterest(interest: InsertExpressInterest): Promise<ExpressInterest>;
  getAllExpressedInterests(): Promise<any[]>;

  // Marketplace Listing operations
  createMarketplaceListing(listing: InsertMarketplaceListing): Promise<MarketplaceListing>;
  getMarketplaceListings(filters?: { type?: string; status?: string }): Promise<MarketplaceListingWithSeller[]>;
  getMarketplaceListingById(id: string): Promise<MarketplaceListingWithSeller | undefined>;
  updateListingStatus(id: string, status: string): Promise<MarketplaceListing>;
  updateMarketplaceListing(id: string, data: Partial<InsertMarketplaceListing>): Promise<MarketplaceListing>;
  deleteMarketplaceListing(id: string): Promise<void>;
  closeMarketplaceListing(id: string): Promise<MarketplaceListing>;
  getListingsBySellerId(sellerId: string): Promise<MarketplaceListing[]>;

  // Buyer Request operations
  createBuyerRequest(request: InsertBuyerRequest): Promise<BuyerRequest>;
  getBuyerRequests(): Promise<BuyerRequest[]>;
  getBuyerRequestById(id: string): Promise<BuyerRequest | undefined>;
  updateBuyerRequestStatus(id: string, status: string): Promise<BuyerRequest>;

  // Message Thread operations
  createMessageThread(thread: InsertMessageThread): Promise<MessageThread>;
  getThreadById(id: string): Promise<MessageThread | undefined>;
  getThreadsByUserId(userId: string): Promise<MessageThread[]>;
  getThreadsByBuyerId(buyerId: string): Promise<MessageThread[]>;
  getThreadsBySellerId(sellerId: string): Promise<MessageThread[]>;
  getThreadWithParticipants(id: string): Promise<any>;
  updateThreadLastMessage(threadId: string): Promise<void>;
  closeThread(threadId: string): Promise<MessageThread>;

  // Message operations
  createMessage(message: InsertMessage): Promise<Message>;
  getMessagesByThreadId(threadId: string): Promise<Message[]>;
  getMessagesByUserId(userId: string): Promise<Message[]>;
  getConversation(user1Id: string, user2Id: string): Promise<Message[]>;
  markMessageAsRead(id: string): Promise<void>;
  // Mark all messages in a two-way conversation (based on a message id) as closed
  closeConversationByMessageId(messageId: string): Promise<void>;
  // Idempotency helpers
  getMessageByIdempotencyKey(key: string): Promise<Message | undefined>;
  createMessageWithIdempotency(key: string | null, message: InsertMessage): Promise<Message>;

  // Blog Post operations
  createBlogPost(post: InsertBlogPost): Promise<BlogPost>;
  getBlogPosts(publishedOnly?: boolean): Promise<BlogPost[]>;
  getBlogPostById(id: string): Promise<BlogPost | undefined>;
  getBlogPostBySlug(slug: string): Promise<BlogPost | undefined>;
  publishBlogPost(id: string): Promise<BlogPost>;
  updateBlogPost(id: string, post: Partial<InsertBlogPost>): Promise<BlogPost>;
  deleteBlogPost(id: string): Promise<void>;

  // Contact Submission operations
  createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission>;
  getContactSubmissions(): Promise<ContactSubmission[]>;
  updateContactSubmissionStatus(id: string, status: string): Promise<ContactSubmission>;

  // Contact Settings operations
  getContactSettings(): Promise<ContactSettings | undefined>;
  updateContactSettings(settings: Partial<InsertContactSettings>): Promise<ContactSettings>;

  // Verification Queue operations
  getPendingListings(): Promise<MarketplaceListing[]>;
  approveListing(listingId: string, reviewerId: string): Promise<void>;
  rejectListing(listingId: string, reviewerId: string): Promise<void>;

  // Activity Log operations
  createActivityLog(log: InsertActivityLog): Promise<ActivityLog>;
  getActivityLogs(limit?: number): Promise<ActivityLog[]>;
  getUserActivityLogs(userId: string, limit?: number): Promise<ActivityLog[]>;

  // Notification operations
  createNotification(notification: InsertNotification): Promise<Notification>;
  getUserNotifications(userId: string): Promise<Notification[]>;
  getUnreadNotificationCount(userId: string): Promise<number>;
  markNotificationAsRead(id: string): Promise<void>;
  markAllNotificationsAsRead(userId: string): Promise<void>;

  // Stats operations for dashboard
  getUserListingsCount(userId: string): Promise<number>;
  getUserUnreadMessagesCount(userId: string): Promise<number>;
  getUserInterestsCount(userId: string): Promise<number>;
  checkUserHasExpressedInterest(userId: string, projectId: string): Promise<boolean>;

  // Video operations
  createVideo(video: InsertVideo): Promise<Video>;
  getActiveVideos(): Promise<Video[]>;
  getAllVideos(): Promise<Video[]>;
  updateVideo(video: UpdateVideo): Promise<Video>;
  toggleVideoActive(id: string): Promise<Video>;
  deleteVideo(id: string): Promise<void>;

  // Sustainability Content operations
  createSustainabilityContent(content: InsertSustainabilityContent): Promise<SustainabilityContent>;
  getSustainabilityContent(): Promise<SustainabilityContent[]>;
  getSustainabilityContentById(id: string): Promise<SustainabilityContent | undefined>;
  updateSustainabilityContent(id: string, content: Partial<InsertSustainabilityContent>): Promise<SustainabilityContent>;
  deleteSustainabilityContent(id: string): Promise<void>;

  // Message Template operations
  createMessageTemplate(template: InsertMessageTemplate): Promise<MessageTemplate>;
  getMessageTemplates(activeOnly?: boolean): Promise<MessageTemplate[]>;
  getMessageTemplateByType(type: string): Promise<MessageTemplate | undefined>;

  // Membership Benefit operations
  createMembershipBenefit(benefit: InsertMembershipBenefit): Promise<MembershipBenefit>;
  getAllMembershipBenefits(): Promise<MembershipBenefit[]>;
  getMembershipBenefitByTier(tier: string): Promise<MembershipBenefit | undefined>;
  initializeMembershipBenefits(): Promise<void>;

  // Tier Usage Tracking operations
  getUserTierUsage(userId: string, month: string): Promise<TierUsageTracking | undefined>;
  incrementUserRFQCount(userId: string, month: string): Promise<void>;
  checkUserCanCreateRFQ(userId: string): Promise<{ allowed: boolean; reason?: string }>;
  getUserActiveRFQCount(userId: string): Promise<number>;

  // Platform Settings operations
  getAllPlatformSettings(): Promise<PlatformSetting[]>;
  getPlatformSettingByKey(key: string): Promise<PlatformSetting | undefined>;
  getPlatformSettingsByCategory(category: string): Promise<PlatformSetting[]>;
  createPlatformSetting(setting: InsertPlatformSetting): Promise<PlatformSetting>;
  updatePlatformSetting(setting: UpdatePlatformSetting): Promise<PlatformSetting>;
  deletePlatformSetting(id: string): Promise<void>;

  // Settings Audit operations
  getSettingsAuditLogs(settingKey?: string, limit?: number): Promise<SettingsAudit[]>;
  logSettingChange(audit: InsertSettingsAudit): Promise<void>;

  // Email Template operations
  getAllEmailTemplates(): Promise<EmailTemplate[]>;
  createEmailTemplate(template: InsertEmailTemplate): Promise<EmailTemplate>;
  updateEmailTemplate(template: UpdateEmailTemplate): Promise<EmailTemplate>;
  deleteEmailTemplate(id: string): Promise<void>;

  // Login History operations
  getLoginHistory(userId?: string): Promise<LoginHistory[]>;
  logLoginAttempt(data: InsertLoginHistory): Promise<void>;

  // Verification Rule operations
  getAllVerificationRules(): Promise<VerificationRule[]>;
  createVerificationRule(rule: InsertVerificationRule): Promise<VerificationRule>;
  updateVerificationRule(rule: UpdateVerificationRule): Promise<VerificationRule>;
  deleteVerificationRule(id: string): Promise<void>;

  // Document Template operations
  getAllDocumentTemplates(): Promise<DocumentTemplate[]>;
  createDocumentTemplate(template: InsertDocumentTemplate): Promise<DocumentTemplate>;
  updateDocumentTemplate(template: UpdateDocumentTemplate): Promise<DocumentTemplate>;
  deleteDocumentTemplate(id: string): Promise<void>;

  // Admin Audit Log operations
  getAdminAuditLogs(adminId?: string): Promise<AdminAuditLog[]>;
  logAdminAudit(data: InsertAdminAuditLog): Promise<void>;

  // Two-Factor Auth operations
  getTwoFactorAuthStatus(userId: string): Promise<TwoFactorAuth | undefined>;
  enableTwoFactorAuth(userId: string): Promise<void>;
  disableTwoFactorAuth(userId: string): Promise<void>;

  // Seller Verification operations
  createVerificationRequest(sellerId: string): Promise<any>;
  getVerificationRequestById(id: string): Promise<any>;
  getVerificationRequestBySellerId(sellerId: string): Promise<any>;
  getAllPendingVerificationRequests(): Promise<any[]>;
  getAllVerificationRequests(): Promise<any[]>;
  approveVerificationRequest(id: string, reviewerId: string): Promise<any>;
  rejectVerificationRequest(id: string, reviewerId: string, reason: string): Promise<any>;
  updateVerificationRequestStatus(id: string, status: string): Promise<any>;
  createVerificationDocument(data: any): Promise<any>;
  getDocumentsByRequestId(requestId: string): Promise<any[]>;
  updateUserVerificationStatus(userId: string, status: string, badgeColor?: string): Promise<User>;

  // Buyer Tier Upgrade operations
  createTierUpgradeRequest(requestId: string, userId: string, requestedTier: string): Promise<any>;
  submitTierUpgradeRequest(requestId: string): Promise<any>;
  getTierUpgradeRequestById(id: string): Promise<any>;
  getTierUpgradeRequestByUserId(userId: string): Promise<any>;
  getAllTierUpgradeRequests(): Promise<any[]>;
  getPendingTierUpgradeRequests(): Promise<any[]>;
  approveTierUpgradeRequest(id: string, reviewerId: string): Promise<any>;
  rejectTierUpgradeRequest(id: string, reviewerId: string, reason: string): Promise<any>;
  revertTierUpgradeRequest(id: string): Promise<any>;
  createTierUpgradeDocument(data: any): Promise<any>;
  getTierUpgradeDocuments(requestId: string): Promise<any[]>;
  createPaymentMethodDetails(data: InsertPaymentMethodDetails): Promise<PaymentMethodDetails>;
  getAllPaymentMethodDetails(): Promise<PaymentMethodDetails[]>;
  getPaymentMethodDetailsByMethod(method: string): Promise<PaymentMethodDetails | undefined>;
  createTierUpgradePayment(data: any): Promise<any>;
  updateTierUpgradePayment(id: string, data: any): Promise<any>;
  getTierUpgradePaymentByRequestId(requestId: string): Promise<any | undefined>;
  updateUserPassword(userId: string, hashedPassword: string): Promise<void>;
  forceUserLogout(userId: string): Promise<void>;
  updateUserInfo(userId: string, data: any): Promise<User>;

  // Onboarding & Deletion
  completeOnboarding(userId: string, role: string): Promise<void>;
  createAccountDeletionRequest(data: InsertAccountDeletionRequest): Promise<AccountDeletionRequest>;
  getAccountDeletionRequests(): Promise<AccountDeletionRequest[]>;
  updateAccountDeletionRequestStatus(id: string, status: string): Promise<AccountDeletionRequest>;
}

export class DatabaseStorage implements IStorage {
  // ========================================================================
  // User operations
  // ========================================================================
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserById(id: string): Promise<User | undefined> {
    return this.getUser(id);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async getUserByClerkId(clerkId: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.clerkId, clerkId));
    return user;
  }

  async getAdminUser(): Promise<User | undefined> {
    const [admin] = await db.select().from(users).where(eq(users.role, 'admin')).limit(1);
    return admin;
  }

  async getUsersByRole(role: 'admin' | 'buyer' | 'seller'): Promise<User[]> {
    return await db
      .select()
      .from(users)
      .where(eq(users.role, role));
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    // Check if user exists by clerkId first (for Clerk users)
    if (userData.clerkId) {
      const existingUsers = await db
        .select()
        .from(users)
        .where(eq(users.clerkId, userData.clerkId))
        .limit(1);

      if (existingUsers.length > 0) {
        // Update existing Clerk user
        const updateData: any = {
          email: userData.email,
          firstName: userData.firstName,
          lastName: userData.lastName,
          profileImageUrl: userData.profileImageUrl,
          role: userData.role,
          updatedAt: new Date(),
        };

        // Only update password if provided
        if (userData.password) {
          updateData.password = userData.password;
        }

        const [user] = await db
          .update(users)
          .set(updateData)
          .where(eq(users.clerkId, userData.clerkId))
          .returning();
        return user;
      }
    }

    // Check if user exists by email (for legacy users)
    if (userData.email) {
      const existingUsers = await db
        .select()
        .from(users)
        .where(eq(users.email, userData.email))
        .limit(1);

      if (existingUsers.length > 0) {
        // Update existing user, preserving the original ID and merging data
        const updateData: any = {
          firstName: userData.firstName,
          lastName: userData.lastName,
          profileImageUrl: userData.profileImageUrl,
          updatedAt: new Date(),
        };

        // Update clerkId if provided (linking legacy user to Clerk)
        if (userData.clerkId) {
          updateData.clerkId = userData.clerkId;
        }

        // Update role if provided
        if (userData.role) {
          updateData.role = userData.role;
        }

        // Only update password if provided
        if (userData.password) {
          updateData.password = userData.password;
        }

        const [user] = await db
          .update(users)
          .set(updateData)
          .where(eq(users.email, userData.email))
          .returning();
        return user;
      }
    }

    // No existing user, insert new one
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }

  async getAllUsers(): Promise<User[]> {
    return await db.select().from(users).orderBy(desc(users.createdAt));
  }

  async updateUserRole(id: string, role: string): Promise<User> {
    const [user] = await db
      .update(users)
      .set({ role: role as any, updatedAt: new Date() })
      .where(eq(users.id, id))
      .returning();
    return user;
  }

  async deleteUser(id: string): Promise<void> {
    await db.delete(users).where(eq(users.id, id));
  }

  // ========================================================================
  // Admin Permissions operations
  // ========================================================================
  async getAdminPermissions(adminUserId: string): Promise<AdminPermissions | undefined> {
    const [row] = await db
      .select()
      .from(adminPermissions)
      .where(eq(adminPermissions.adminUserId, adminUserId))
      .limit(1);
    return row;
  }

  async upsertAdminPermissions(data: InsertAdminPermissions): Promise<AdminPermissions> {
    const existing = await this.getAdminPermissions(data.adminUserId);
    if (existing) {
      const [updated] = await db
        .update(adminPermissions)
        .set({ ...data, updatedAt: new Date() })
        .where(eq(adminPermissions.adminUserId, data.adminUserId))
        .returning();
      return updated;
    }
    const [inserted] = await db
      .insert(adminPermissions)
      .values(data)
      .returning();
    return inserted;
  }

  async updateAdminPermissions(data: UpdateAdminPermissions): Promise<AdminPermissions> {
    const [updated] = await db
      .update(adminPermissions)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(adminPermissions.adminUserId, data.adminUserId))
      .returning();
    return updated;
  }

  // ========================================================================
  // User Profile operations
  // ========================================================================
  async getUserProfile(userId: string): Promise<UserProfile | undefined> {
    const [profile] = await db
      .select()
      .from(userProfiles)
      .where(eq(userProfiles.userId, userId));
    return profile;
  }

  async createUserProfile(profileData: InsertUserProfile): Promise<UserProfile> {
    const [profile] = await db
      .insert(userProfiles)
      .values(profileData)
      .returning();
    return profile;
  }

  async updateUserProfile(profileData: UpdateUserProfile): Promise<UserProfile> {
    const [profile] = await db
      .update(userProfiles)
      .set({
        ...profileData,
        updatedAt: new Date(),
      })
      .where(eq(userProfiles.userId, profileData.userId))
      .returning();
    return profile;
  }

  // ========================================================================
  // Project operations
  // ========================================================================
  async createProject(projectData: InsertProject): Promise<Project> {
    const dataToInsert: any = { ...projectData };
    // If created active immediately, assign an item id; otherwise will be assigned when activated
    if (!dataToInsert.itemId && dataToInsert.status === 'active') {
      dataToInsert.itemId = await generateUniqueItemId(db);
    }

    const [project] = await db
      .insert(projects)
      .values(dataToInsert)
      .returning();
    return project;
  }

  async getProjects(): Promise<ProjectWithOwner[]> {
    const results = await db
      .select({
        project: projects,
        owner: {
          id: users.id,
          firstName: users.firstName,
          lastName: users.lastName,
          email: users.email,
        },
        profile: userProfiles,
      })
      .from(projects)
      .leftJoin(users, eq(projects.ownerId, users.id))
      .leftJoin(userProfiles, eq(users.id, userProfiles.userId))
      .orderBy(desc(projects.createdAt));

    return results.map(r => ({
      ...r.project,
      owner: r.owner ? { ...r.owner, verified: r.profile?.verified ?? false } : null,
    }));
  }

  async getProjectById(id: string): Promise<ProjectWithOwner | undefined> {
    const results = await db
      .select({
        project: projects,
        owner: {
          id: users.id,
          firstName: users.firstName,
          lastName: users.lastName,
          email: users.email,
        },
        profile: userProfiles,
      })
      .from(projects)
      .leftJoin(users, eq(projects.ownerId, users.id))
      .leftJoin(userProfiles, eq(users.id, userProfiles.userId))
      .where(eq(projects.id, id));

    if (results.length === 0) {
      return undefined;
    }

    return {
      ...results[0].project,
      owner: results[0].owner ? { ...results[0].owner, verified: results[0].profile?.verified ?? false } : null,
    };
  }

  async updateProject(id: string, data: Partial<InsertProject>): Promise<Project> {
    const updateData: any = { ...data, updatedAt: new Date() };
    // If status is being changed to active and itemId is missing, generate one
    if (data.status === 'active') {
      const [existing] = await db.select().from(projects).where(eq(projects.id, id)).limit(1);
      if (existing && !existing.itemId) {
        updateData.itemId = await generateUniqueItemId(db);
      }
    }

    const [project] = await db
      .update(projects)
      .set(updateData)
      .where(eq(projects.id, id))
      .returning();
    return project;
  }

  async deleteProject(id: string): Promise<void> {
    await db.delete(projects).where(eq(projects.id, id));
  }

  async closeProject(id: string): Promise<Project> {
    const [project] = await db
      .update(projects)
      .set({ status: 'closed', updatedAt: new Date() })
      .where(eq(projects.id, id))
      .returning();
    return project;
  }

  async expressProjectInterest(interestData: InsertExpressInterest): Promise<ExpressInterest> {
    const [interest] = await db
      .insert(expressInterest)
      .values(interestData)
      .returning();
    return interest;
  }

  async getAllExpressedInterests(): Promise<any[]> {
    const interests = await db
      .select({
        id: expressInterest.id,
        projectId: expressInterest.projectId,
        listingId: expressInterest.listingId,
        userId: expressInterest.userId,
        message: expressInterest.message,
        createdAt: expressInterest.createdAt,
        userName: sql<string>`${users.firstName} || ' ' || ${users.lastName}`.as('userName'),
        userEmail: users.email,
        projectName: projects.name,
        listingTitle: marketplaceListings.title,
      })
      .from(expressInterest)
      .leftJoin(users, eq(expressInterest.userId, users.id))
      .leftJoin(projects, eq(expressInterest.projectId, projects.id))
      .leftJoin(marketplaceListings, eq(expressInterest.listingId, marketplaceListings.id))
      .orderBy(desc(expressInterest.createdAt));

    return interests;
  }

  // ========================================================================
  // Marketplace Listing operations
  // ========================================================================
  async createMarketplaceListing(listingData: InsertMarketplaceListing): Promise<MarketplaceListing> {
    const [listing] = await db
      .insert(marketplaceListings)
      .values(listingData)
      .returning();

    // Create verification queue entry
    await db.insert(verificationQueue).values({
      listingId: listing.id,
    });

    return listing;
  }

  async getMarketplaceListings(filters?: { type?: string; status?: string }): Promise<MarketplaceListingWithSeller[]> {
    // Build where conditions only if filters are provided
    let whereConditions;
    if (filters?.type && filters?.status) {
      whereConditions = and(
        eq(marketplaceListings.type, filters.type as any),
        eq(marketplaceListings.status, filters.status as any)
      );
    } else if (filters?.type) {
      whereConditions = eq(marketplaceListings.type, filters.type as any);
    } else if (filters?.status) {
      whereConditions = eq(marketplaceListings.status, filters.status as any);
    }

    let query = db
      .select({
        listing: marketplaceListings,
        seller: {
          id: users.id,
          firstName: users.firstName,
          lastName: users.lastName,
          email: users.email,
        },
        profile: userProfiles,
      })
      .from(marketplaceListings)
      .leftJoin(users, eq(marketplaceListings.sellerId, users.id))
      .leftJoin(userProfiles, eq(users.id, userProfiles.userId));

    if (whereConditions) {
      query = query.where(whereConditions) as any;
    }

    const results = await query.orderBy(desc(marketplaceListings.createdAt));

    return results.map(r => ({
      ...r.listing,
      seller: r.seller ? { ...r.seller, verified: r.profile?.verified ?? false } : null,
    }));
  }

  async getMarketplaceListingById(id: string): Promise<MarketplaceListingWithSeller | undefined> {
    const results = await db
      .select({
        listing: marketplaceListings,
        seller: {
          id: users.id,
          firstName: users.firstName,
          lastName: users.lastName,
          email: users.email,
        },
        profile: userProfiles,
      })
      .from(marketplaceListings)
      .leftJoin(users, eq(marketplaceListings.sellerId, users.id))
      .leftJoin(userProfiles, eq(users.id, userProfiles.userId))
      .where(eq(marketplaceListings.id, id));

    if (results.length === 0) {
      return undefined;
    }

    return {
      ...results[0].listing,
      seller: results[0].seller ? { ...results[0].seller, verified: results[0].profile?.verified ?? false } : null,
    };
  }

  async updateListingStatus(id: string, status: string): Promise<MarketplaceListing> {
    const [listing] = await db
      .update(marketplaceListings)
      .set({
        status: status as any,
        updatedAt: new Date(),
      })
      .where(eq(marketplaceListings.id, id))
      .returning();
    return listing;
  }

  async updateMarketplaceListing(id: string, data: Partial<InsertMarketplaceListing>): Promise<MarketplaceListing> {
    const [listing] = await db
      .update(marketplaceListings)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(marketplaceListings.id, id))
      .returning();
    return listing;
  }

  async deleteMarketplaceListing(id: string): Promise<void> {
    await db.delete(marketplaceListings).where(eq(marketplaceListings.id, id));
  }

  async closeMarketplaceListing(id: string): Promise<MarketplaceListing> {
    const [listing] = await db
      .update(marketplaceListings)
      .set({ status: 'closed', updatedAt: new Date() })
      .where(eq(marketplaceListings.id, id))
      .returning();
    return listing;
  }

  async getListingsBySellerId(sellerId: string): Promise<MarketplaceListing[]> {
    return await db
      .select()
      .from(marketplaceListings)
      .where(eq(marketplaceListings.sellerId, sellerId))
      .orderBy(desc(marketplaceListings.createdAt));
  }

  // When approving a listing, assign itemId if missing
  async approveListing(listingId: string, reviewerId: string): Promise<void> {
    // Update listing status and set itemId if not present
    const [existing] = await db.select().from(marketplaceListings).where(eq(marketplaceListings.id, listingId)).limit(1);

    let itemId = existing?.itemId || null;
    if (!itemId) {
      itemId = await generateUniqueItemId(db);
    }

    await db
      .update(marketplaceListings)
      .set({
        status: 'approved',
        itemId,
        updatedAt: new Date(),
      })
      .where(eq(marketplaceListings.id, listingId));

    // Update verification queue
    await db
      .update(verificationQueue)
      .set({
        reviewedAt: new Date(),
        reviewedBy: reviewerId,
      })
      .where(eq(verificationQueue.listingId, listingId));
  }

  // ========================================================================
  // Buyer Request operations
  // ========================================================================
  async createBuyerRequest(requestData: InsertBuyerRequest): Promise<BuyerRequest> {
    // assign an itemId for easy reference
    if (!requestData.itemId) {
      requestData.itemId = await generateUniqueItemId(db);
    }

    const [request] = await db
      .insert(buyerRequests)
      .values(requestData)
      .returning();
    return request;
  }

  async getBuyerRequests(): Promise<BuyerRequest[]> {
    return await db
      .select()
      .from(buyerRequests)
      .orderBy(desc(buyerRequests.createdAt));
  }

  async getBuyerRequestById(id: string): Promise<BuyerRequest | undefined> {
    const [request] = await db
      .select()
      .from(buyerRequests)
      .where(eq(buyerRequests.id, id));
    return request;
  }

  async updateBuyerRequestStatus(id: string, status: string): Promise<BuyerRequest> {
    const [updated] = await db
      .update(buyerRequests)
      .set({
        status,
        updatedAt: new Date(),
      })
      .where(eq(buyerRequests.id, id))
      .returning();
    return updated;
  }

  // ========================================================================
  // Message Thread operations
  // ========================================================================
  async createMessageThread(threadData: InsertMessageThread): Promise<MessageThread> {
    const [thread] = await db
      .insert(messageThreads)
      .values(threadData)
      .returning();
    return thread;
  }

  async getThreadById(id: string): Promise<MessageThread | undefined> {
    const [thread] = await db
      .select()
      .from(messageThreads)
      .where(eq(messageThreads.id, id));
    return thread;
  }

  async getThreadWithParticipants(id: string): Promise<any> {
    // Simpler implementation: fetch the thread, then load buyer/seller users and profiles
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
      sellerProfile: sellerProfile || null,
    };
  }

  async getThreadsByUserId(userId: string): Promise<MessageThread[]> {
    return await db
      .select()
      .from(messageThreads)
      .where(
        or(
          eq(messageThreads.buyerId, userId),
          eq(messageThreads.sellerId, userId)
        )
      )
      .orderBy(desc(messageThreads.lastMessageAt));
  }

  async getThreadsByBuyerId(buyerId: string): Promise<MessageThread[]> {
    return await db
      .select()
      .from(messageThreads)
      .where(eq(messageThreads.buyerId, buyerId))
      .orderBy(desc(messageThreads.lastMessageAt));
  }

  async getAllMessageThreads(): Promise<MessageThread[]> {
    const results = await db
      .select({
        thread: messageThreads,
        listing: marketplaceListings,
        project: projects,
        buyerFirstName: sql<string>`buyer.first_name`,
        buyerLastName: sql<string>`buyer.last_name`,
        sellerFirstName: sql<string>`seller.first_name`,
        sellerLastName: sql<string>`seller.last_name`,
      })
      .from(messageThreads)
      .leftJoin(marketplaceListings, eq(messageThreads.listingId, marketplaceListings.id))
      .leftJoin(projects, eq(messageThreads.projectId, projects.id))
      .leftJoin(
        sql`users as buyer`,
        eq(messageThreads.buyerId, sql`buyer.id`)
      )
      .leftJoin(
        sql`users as seller`,
        eq(messageThreads.sellerId, sql`seller.id`)
      )
      .orderBy(desc(messageThreads.lastMessageAt));

    return results.map(r => {
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
        buyerName: buyerFirstName && buyerLastName ? `${buyerFirstName} ${buyerLastName}` : undefined,
        sellerName: sellerFirstName && sellerLastName ? `${sellerFirstName} ${sellerLastName}` : undefined,
      };
    });
  }

  async getThreadsBySellerId(sellerId: string): Promise<MessageThread[]> {
    return await db
      .select()
      .from(messageThreads)
      .where(eq(messageThreads.sellerId, sellerId))
      .orderBy(desc(messageThreads.lastMessageAt));
  }

  async updateThreadLastMessage(threadId: string): Promise<void> {
    await db
      .update(messageThreads)
      .set({ lastMessageAt: new Date() })
      .where(eq(messageThreads.id, threadId));
  }

  async closeThread(threadId: string): Promise<MessageThread> {
    const [thread] = await db
      .update(messageThreads)
      .set({ status: 'closed' })
      .where(eq(messageThreads.id, threadId))
      .returning();
    return thread;
  }

  // ========================================================================
  // Support Ticket Operations (Privacy-Controlled)
  // ========================================================================

  /**
   * Get admin support tickets (ONLY threads marked as admin support).
   * Privacy: Admins can ONLY see support tickets, never buyer-seller conversations
   */
  async getAdminSupportTickets(
    filters?: { status?: string; priority?: string; assignedAdminId?: string }
  ): Promise<MessageThread[]> {
    let query = db
      .select()
      .from(messageThreads)
      .where(eq(messageThreads.isAdminSupport, true));

    if (filters?.status) {
      query = query.where(eq(messageThreads.ticketStatus, filters.status as any));
    }
    if (filters?.priority) {
      query = query.where(eq(messageThreads.ticketPriority, filters.priority as any));
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
  async claimSupportTicket(ticketId: string, adminId: string): Promise<MessageThread> {
    const [thread] = await db
      .update(messageThreads)
      .set({
        assignedAdminId: adminId,
        ticketStatus: 'in_progress',
      })
      .where(and(
        eq(messageThreads.id, ticketId),
        eq(messageThreads.isAdminSupport, true)
      ))
      .returning();
    return thread;
  }

  /**
   * Resolve a support ticket with optional notes.
   * Changes ticketStatus to 'resolved'
   */
  async resolveSupportTicket(
    ticketId: string,
    notes?: string
  ): Promise<MessageThread> {
    const [thread] = await db
      .update(messageThreads)
      .set({
        ticketStatus: 'resolved',
        resolvedAt: new Date(),
      })
      .where(and(
        eq(messageThreads.id, ticketId),
        eq(messageThreads.isAdminSupport, true)
      ))
      .returning();
    return thread;
  }

  /**
   * Create a new support ticket (user-initiated).
   * User can contact admin about account/verification/payment issues
   */
  async createSupportTicket(
    userId: string,
    title: string,
    description: string,
    priority: 'low' | 'normal' | 'high' | 'urgent' = 'normal'
  ): Promise<MessageThread> {
    const [thread] = await db
      .insert(messageThreads)
      .values({
        title,
        type: 'general',
        createdBy: userId,
        buyerId: userId,
        context: 'general',
        status: 'open',
        isAdminSupport: true,
        ticketStatus: 'open',
        ticketPriority: priority,
      })
      .returning();
    return thread;
  }

  /**
   * Update a support ticket's status.
   */
  async updateTicketStatus(
    ticketId: string,
    status: 'open' | 'in_progress' | 'waiting_user' | 'resolved'
  ): Promise<MessageThread> {
    const [thread] = await db
      .update(messageThreads)
      .set({
        ticketStatus: status,
      })
      .where(and(
        eq(messageThreads.id, ticketId),
        eq(messageThreads.isAdminSupport, true)
      ))
      .returning();
    return thread;
  }

  /**
   * Update a support ticket's priority.
   */
  async updateTicketPriority(
    ticketId: string,
    priority: 'low' | 'normal' | 'high' | 'urgent'
  ): Promise<MessageThread> {
    const [thread] = await db
      .update(messageThreads)
      .set({
        ticketPriority: priority,
      })
      .where(and(
        eq(messageThreads.id, ticketId),
        eq(messageThreads.isAdminSupport, true)
      ))
      .returning();
    return thread;
  }

  /**
   * Update a support ticket's assigned admin.
   */
  async updateTicketAssignee(
    ticketId: string,
    adminId: string | null
  ): Promise<MessageThread> {
    const [thread] = await db
      .update(messageThreads)
      .set({
        assignedAdminId: adminId,
      })
      .where(and(
        eq(messageThreads.id, ticketId),
        eq(messageThreads.isAdminSupport, true)
      ))
      .returning();
    return thread;
  }

  /**
   * Return analytics summary: user role counts, listing status counts,
   * and simple weekly activity aggregates (last 4 weeks).
   */
  async getAnalyticsSummary(): Promise<any> {
    // Fetch base datasets (small scale assumed for admin analytics)
    const allUsers = await db.select().from(users);
    const allListings = await db.select().from(marketplaceListings);
    const allMessages = await db.select().from(messages);

    const usersByRole = {
      buyers: allUsers.filter((u: any) => (u.role || '').toLowerCase() === 'buyer').length,
      sellers: allUsers.filter((u: any) => (u.role || '').toLowerCase() === 'seller').length,
      admins: allUsers.filter((u: any) => (u.role || '').toLowerCase() === 'admin').length,
    };

    const listingsByStatus = {
      approved: allListings.filter((l: any) => (l.status || '').toLowerCase() === 'approved').length,
      pending: allListings.filter((l: any) => (l.status || '').toLowerCase() === 'pending').length,
      total: allListings.length,
    };

    // Compute weekly activity for last 4 weeks (Sunday-based weeks)
    const now = new Date();
    const currentWeekStart = new Date(now);
    currentWeekStart.setHours(0, 0, 0, 0);
    currentWeekStart.setDate(currentWeekStart.getDate() - currentWeekStart.getDay());

    const weeklyActivity: Array<any> = [];
    for (let i = 3; i >= 0; i--) {
      const start = new Date(currentWeekStart);
      start.setDate(start.getDate() - (7 * i));
      const end = new Date(start);
      end.setDate(start.getDate() + 7);

      const listingsCount = allListings.filter((l: any) => {
        const c = l.createdAt ? new Date(l.createdAt) : null;
        return c && c >= start && c < end;
      }).length;

      const messagesCount = allMessages.filter((m: any) => {
        const c = m.createdAt ? new Date(m.createdAt) : null;
        return c && c >= start && c < end;
      }).length;

      const usersCount = allUsers.filter((u: any) => {
        const c = u.createdAt ? new Date(u.createdAt) : null;
        return c && c >= start && c < end;
      }).length;

      weeklyActivity.push({
        week: `${start.toISOString().slice(0, 10)}`,
        listings: listingsCount,
        messages: messagesCount,
        users: usersCount,
      });
    }

    return {
      usersByRole,
      listingsByStatus,
      weeklyActivity,
    };
  }

  // ========================================================================
  // Message operations
  // ========================================================================
  async getMessagesByThreadId(threadId: string): Promise<Message[]> {
    return await db
      .select()
      .from(messages)
      .where(eq(messages.threadId, threadId))
      .orderBy(messages.createdAt);
  }

  async createMessage(messageData: InsertMessage): Promise<Message> {
    try {
      const [message] = await db
        .insert(messages)
        .values(messageData)
        .returning();
      return message;
    } catch (err: any) {
      // If the database table is missing newly added columns (common during
      // iterative development), attempt a fallback insert with a reduced
      // column set. This makes the API more tolerant to mismatched schema vs DB.
      // Specifically handle Postgres undefined-column error (42703).
      if (err?.cause?.code === '42703' || err?.code === '42703') {
        // Build a minimal payload that excludes optional relation columns
        const minimalPayload: any = {
          senderId: messageData.senderId,
          receiverId: messageData.receiverId,
          subject: messageData.subject,
          content: messageData.content,
          isAutoRelay: messageData.isAutoRelay ?? false,
        };
        const [message] = await db
          .insert(messages)
          .values(minimalPayload)
          .returning();
        return message;
      }
      throw err;
    }
  }

  async getMessageByIdempotencyKey(key: string): Promise<Message | undefined> {
    const [row] = await db
      .select({ id: messageIdempotency.messageId })
      .from(messageIdempotency)
      .where(eq(messageIdempotency.key, key))
      .limit(1);
    if (!row) return undefined;
    const messageId = (row as any).id;
    const [message] = await db
      .select()
      .from(messages)
      .where(eq(messages.id, messageId))
      .limit(1);
    return message;
  }

  async createMessageWithIdempotency(key: string | null, messageData: InsertMessage): Promise<Message> {
    // If no key provided, fallback to regular create
    if (!key) {
      return await this.createMessage(messageData);
    }

    // Check existing mapping
    const existing = await this.getMessageByIdempotencyKey(key);
    if (existing) return existing;

    // Create message first
    const message = await this.createMessage(messageData);

    try {
      await db.insert(messageIdempotency).values({
        key,
        messageId: message.id,
      });
      return message;
    } catch (err: any) {
      // Unique violation on key means another process created the mapping concurrently
      if (err?.cause?.code === '23505' || err?.code === '23505') {
        const mapped = await this.getMessageByIdempotencyKey(key);
        if (mapped) return mapped;
      }
      throw err;
    }
  }

  async getMessagesByUserId(userId: string): Promise<Message[]> {
    // First get all threads involving the user
    const threads = await db
      .select({
        threadId: messageThreads.id,
      })
      .from(messageThreads)
      .where(
        or(
          eq(messageThreads.buyerId, userId),
          eq(messageThreads.sellerId, userId)
        )
      );

    if (threads.length === 0) return [];

    // Then get all messages from these threads with rich metadata
    const threadIds = threads.map(t => t.threadId);
    const results = await db
      .select({
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
        project: projects,
      })
      .from(messages)
      .innerJoin(messageThreads, eq(messages.threadId, messageThreads.id))
      .leftJoin(users, eq(messages.senderId, users.id))
      .leftJoin(marketplaceListings, eq(messageThreads.listingId, marketplaceListings.id))
      .leftJoin(projects, eq(messageThreads.projectId, projects.id))
      .where(inArray(messages.threadId, threadIds))
      .orderBy(messages.createdAt);

    // Transform the results to maintain the Message type
    return results.map(result => ({
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
      senderName: result.senderFirstName && result.senderLastName
        ? `${result.senderFirstName} ${result.senderLastName}`
        : undefined,
      context: result.listing
        ? 'marketplace' as const
        : result.project
          ? 'project_interest' as const
          : 'general' as const
    } as Message));
  }

  async getConversation(user1Id: string, user2Id: string): Promise<Message[]> {
    return await db
      .select()
      .from(messages)
      .where(
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
      )
      .orderBy(messages.createdAt);
  }

  async markMessageAsRead(id: string): Promise<void> {
    await db
      .update(messages)
      .set({ read: true, unread: false })
      .where(eq(messages.id, id));
  }

  // Helper to get a message by id (used by some admin routes)
  async getMessageById(id: string): Promise<Message | undefined> {
    const [message] = await db
      .select()
      .from(messages)
      .where(eq(messages.id, id))
      .limit(1);
    return message;
  }

  // Return count of unread messages for a given user (receiver)
  async getUnreadMessagesCount(userId: string): Promise<number> {
    const result = await db
      .select({ count: sql<number>`count(*)::int` })
      .from(messages)
      .where(
        and(
          eq(messages.receiverId, userId),
          eq(messages.unread, true)
        )
      );
    return result[0]?.count || 0;
  }

  async closeConversationByMessageId(messageId: string): Promise<void> {
    // fetch the main message to determine the two participants
    const [main] = await db.select().from(messages).where(eq(messages.id, messageId)).limit(1);
    if (!main) return;

    await db
      .update(messages)
      .set({ closed: true })
      .where(
        or(
          and(eq(messages.senderId, main.senderId), eq(messages.receiverId, main.receiverId)),
          and(eq(messages.senderId, main.receiverId), eq(messages.receiverId, main.senderId))
        )
      );
  }

  async checkUserHasContactedAboutProject(userId: string, projectId: string): Promise<boolean> {
    const result = await db
      .select()
      .from(messages)
      .where(
        and(
          eq(messages.senderId, userId),
          eq(messages.relatedProjectId, projectId)
        )
      )
      .limit(1);
    return result.length > 0;
  }

  async checkUserHasContactedAboutListing(userId: string, listingId: string): Promise<boolean> {
    const result = await db
      .select()
      .from(messages)
      .where(
        and(
          eq(messages.senderId, userId),
          eq(messages.relatedListingId, listingId)
        )
      )
      .limit(1);
    return result.length > 0;
  }

  async getMessageWithSenderDetails(messageId: string): Promise<any> {
    // First, get the main message with sender details
    const result = await db
      .select({
        message: messages,
        sender: users,
        senderProfile: userProfiles,
      })
      .from(messages)
      .leftJoin(users, eq(messages.senderId, users.id))
      .leftJoin(userProfiles, eq(users.id, userProfiles.userId))
      .where(eq(messages.id, messageId))
      .limit(1);

    if (!result[0]) return null;

    // Get the conversation chain (messages between these two users)
    const mainMessage = result[0].message;
    const conversationMessages = await db
      .select({
        message: messages,
        sender: users,
        senderProfile: userProfiles,
      })
      .from(messages)
      .leftJoin(users, eq(messages.senderId, users.id))
      .leftJoin(userProfiles, eq(users.id, userProfiles.userId))
      .where(
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
      )
      .orderBy(desc(messages.createdAt));

    const payload: any = {
      ...result[0],
      conversation: conversationMessages
    };

    // If this message looks like an auto-created contact submission relay,
    // attempt to parse the submitter details from the message content so the
    // client can display the visitor's name/email/phone even though the
    // message sender is an internal admin user.
    try {
      const content: string = (mainMessage && (mainMessage.content || '')) as string;
      // Expect content like: "Contact submission from NAME <email>\nPhone: PHONE\n\nMESSAGE...\n\nView thread: /dashboard/messages?threadId=THREAD_ID"
      const m = content.match(/Contact submission from\s+([^<\n]+)\s*<([^>]+)>[\s\S]*?Phone:\s*([^\n\r]*)[\s\S]*?\n\n([\s\S]*?)(?:\n\nView (?:submission|thread):\s*[^\s]+(?:id=|\?threadId=)([a-f0-9\-]+))?/i);
      if (m) {
        payload.contactSubmission = {
          name: (m[1] || '').trim(),
          email: (m[2] || '').trim(),
          phone: (m[3] || '').trim(),
          message: (m[4] || '').trim(),
          submissionId: m[5] || undefined,
        };
      }
    } catch (err) {
      // parsing should not break the endpoint
    }

    return payload;
  }

  // ========================================================================
  // Blog Post operations
  // ========================================================================
  async createBlogPost(postData: InsertBlogPost): Promise<BlogPost> {
    const [post] = await db
      .insert(blogPosts)
      .values(postData)
      .returning();
    return post;
  }

  async getBlogPosts(publishedOnly: boolean = true): Promise<BlogPost[]> {
    let query = db.select().from(blogPosts);

    if (publishedOnly) {
      query = query.where(eq(blogPosts.published, true)) as any;
    }

    return await query.orderBy(desc(blogPosts.createdAt));
  }

  async getBlogPostById(id: string): Promise<BlogPost | undefined> {
    const [post] = await db
      .select()
      .from(blogPosts)
      .where(eq(blogPosts.id, id));
    return post;
  }

  async getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
    const [post] = await db
      .select()
      .from(blogPosts)
      .where(eq(blogPosts.slug, slug));
    return post;
  }

  async publishBlogPost(id: string): Promise<BlogPost> {
    const [post] = await db
      .update(blogPosts)
      .set({
        published: true,
        updatedAt: new Date(),
      })
      .where(eq(blogPosts.id, id))
      .returning();
    return post;
  }

  async updateBlogPost(id: string, postData: Partial<InsertBlogPost>): Promise<BlogPost> {
    const [post] = await db
      .update(blogPosts)
      .set({
        ...postData,
        updatedAt: new Date(),
      })
      .where(eq(blogPosts.id, id))
      .returning();
    return post;
  }

  async deleteBlogPost(id: string): Promise<void> {
    await db
      .delete(blogPosts)
      .where(eq(blogPosts.id, id));
  }

  // ========================================================================
  // Contact Submission operations
  // ========================================================================
  async createContactSubmission(submissionData: InsertContactSubmission): Promise<ContactSubmission> {
    const [submission] = await db
      .insert(contactSubmissions)
      .values(submissionData)
      .returning();
    return submission;
  }

  async getContactSubmissions(): Promise<ContactSubmission[]> {
    return await db
      .select()
      .from(contactSubmissions)
      .orderBy(desc(contactSubmissions.createdAt));
  }

  async updateContactSubmissionStatus(id: string, status: string): Promise<ContactSubmission> {
    const [submission] = await db
      .update(contactSubmissions)
      .set({ status })
      .where(eq(contactSubmissions.id, id))
      .returning();
    return submission;
  }

  // ========================================================================
  // Contact Settings operations
  // ========================================================================
  async getContactSettings(): Promise<ContactSettings | undefined> {
    const settings = await db
      .select()
      .from(contactSettings)
      .limit(1);

    if (settings.length === 0) {
      // Create default settings if none exist
      const [defaultSettings] = await db
        .insert(contactSettings)
        .values({
          officeAddress: "Fusion Mining Limited\nCentral Business District\nLusaka, Zambia",
          phone: "+260 978 838 939",
          email: "info@fusionmining.com",
          supportEmail: "support@fusionmining.com",
          mondayFriday: "8:00 AM - 5:00 PM",
          saturday: "9:00 AM - 1:00 PM",
          sunday: "Closed",
        })
        .returning();
      return defaultSettings;
    }

    return settings[0];
  }

  async updateContactSettings(settingsData: Partial<InsertContactSettings>): Promise<ContactSettings> {
    const existing = await this.getContactSettings();

    if (!existing) {
      const [newSettings] = await db
        .insert(contactSettings)
        .values(settingsData as InsertContactSettings)
        .returning();
      return newSettings;
    }

    const [updated] = await db
      .update(contactSettings)
      .set({
        ...settingsData,
        updatedAt: new Date(),
      })
      .where(eq(contactSettings.id, existing.id))
      .returning();
    return updated;
  }

  // ========================================================================
  // Verification Queue operations
  // ========================================================================
  async getPendingListings(): Promise<MarketplaceListing[]> {
    return await db
      .select()
      .from(marketplaceListings)
      .where(eq(marketplaceListings.status, 'pending'))
      .orderBy(desc(marketplaceListings.createdAt));
  }


  async rejectListing(listingId: string, reviewerId: string): Promise<void> {
    // Update listing status
    await db
      .update(marketplaceListings)
      .set({
        status: 'rejected',
        updatedAt: new Date(),
      })
      .where(eq(marketplaceListings.id, listingId));

    // Update verification queue
    await db
      .update(verificationQueue)
      .set({
        reviewedAt: new Date(),
        reviewedBy: reviewerId,
      })
      .where(eq(verificationQueue.listingId, listingId));
  }

  // ========================================================================
  // Activity Log operations
  // ========================================================================
  async createActivityLog(logData: InsertActivityLog): Promise<ActivityLog> {
    const [log] = await db
      .insert(activityLogs)
      .values(logData)
      .returning();
    return log;
  }

  async getActivityLogs(limit: number = 100): Promise<(ActivityLog & { user?: User | null })[]> {
    const results = await db
      .select({
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
          profileImageUrl: users.profileImageUrl,
        },
      })
      .from(activityLogs)
      .leftJoin(users, eq(activityLogs.userId, users.id))
      .orderBy(desc(activityLogs.createdAt))
      .limit(limit);

    return results.map(r => ({
      id: r.id,
      userId: r.userId,
      activityType: r.activityType,
      description: r.description,
      ipAddress: r.ipAddress,
      userAgent: r.userAgent,
      metadata: r.metadata,
      createdAt: r.createdAt,
      user: r.user?.id ? r.user as User : null,
    }));
  }

  async getUserActivityLogs(userId: string, limit: number = 50): Promise<ActivityLog[]> {
    return await db
      .select()
      .from(activityLogs)
      .where(eq(activityLogs.userId, userId))
      .orderBy(desc(activityLogs.createdAt))
      .limit(limit);
  }

  // ========================================================================
  // Notification operations
  // ========================================================================
  async createNotification(notificationData: InsertNotification): Promise<Notification> {
    const [notification] = await db
      .insert(notifications)
      .values(notificationData)
      .returning();
    return notification;
  }

  async getUserNotifications(userId: string): Promise<Notification[]> {
    return await db
      .select()
      .from(notifications)
      .where(eq(notifications.userId, userId))
      .orderBy(desc(notifications.createdAt))
      .limit(50);
  }

  async getUnreadNotificationCount(userId: string): Promise<number> {
    const result = await db
      .select({ count: sql<number>`count(*)::int` })
      .from(notifications)
      .where(
        and(
          eq(notifications.userId, userId),
          eq(notifications.read, false)
        )
      );
    return result[0]?.count || 0;
  }

  async markNotificationAsRead(id: string): Promise<void> {
    await db
      .update(notifications)
      .set({ read: true })
      .where(eq(notifications.id, id));
  }

  async markAllNotificationsAsRead(userId: string): Promise<void> {
    await db
      .update(notifications)
      .set({ read: true })
      .where(eq(notifications.userId, userId));
  }

  // ========================================================================
  // Stats operations for dashboard
  // ========================================================================
  async getUserListingsCount(userId: string): Promise<number> {
    const [listingsResult, rfqResult] = await Promise.all([
      db
        .select({ count: sql<number>`count(*)::int` })
        .from(marketplaceListings)
        .where(eq(marketplaceListings.sellerId, userId)),
      db
        .select({ count: sql<number>`count(*)::int` })
        .from(buyerRequests)
        .where(eq(buyerRequests.buyerId, userId))
    ]);

    const listingsCount = listingsResult[0]?.count || 0;
    const rfqCount = rfqResult[0]?.count || 0;

    return listingsCount + rfqCount;
  }

  async getUserUnreadMessagesCount(userId: string): Promise<number> {
    // First get all threads where user is buyer or seller
    const threads = await db
      .select({ id: messageThreads.id })
      .from(messageThreads)
      .where(
        or(
          eq(messageThreads.buyerId, userId),
          eq(messageThreads.sellerId, userId)
        )
      );

    if (threads.length === 0) return 0;

    // Then count unread messages in those threads where the user is the receiver
    const threadIds = threads.map(t => t.id);
    const result = await db
      .select({ count: sql<number>`count(*)::int` })
      .from(messages)
      .where(
        and(
          inArray(messages.threadId, threadIds),
          eq(messages.receiverId, userId),
          eq(messages.read, false)
        )
      );

    return result[0]?.count || 0;
  }

  async getUserInterestsCount(userId: string): Promise<number> {
    const result = await db
      .select({ count: sql<number>`count(*)::int` })
      .from(expressInterest)
      .where(eq(expressInterest.userId, userId));
    return result[0]?.count || 0;
  }

  async checkUserHasExpressedInterest(userId: string, projectId: string): Promise<boolean> {
    const [interest] = await db
      .select()
      .from(expressInterest)
      .where(
        and(
          eq(expressInterest.userId, userId),
          eq(expressInterest.projectId, projectId)
        )
      )
      .limit(1);
    return !!interest;
  }

  // ========================================================================
  // Video operations
  // ========================================================================
  async createVideo(videoData: InsertVideo): Promise<Video> {
    const activeVideosCount = await db
      .select({ count: sql<number>`count(*)::int` })
      .from(videos)
      .where(eq(videos.active, true));

    const count = activeVideosCount[0]?.count || 0;
    const shouldActivate = count < 4 && (videoData.active !== false);

    const [video] = await db
      .insert(videos)
      .values({ ...videoData, active: shouldActivate })
      .returning();
    return video;
  }

  async getActiveVideos(): Promise<Video[]> {
    return await db
      .select()
      .from(videos)
      .where(eq(videos.active, true))
      .orderBy(desc(videos.createdAt))
      .limit(4);
  }

  async getAllVideos(): Promise<Video[]> {
    return await db
      .select()
      .from(videos)
      .orderBy(desc(videos.createdAt));
  }

  async updateVideo(videoData: UpdateVideo): Promise<Video> {
    const [video] = await db
      .update(videos)
      .set(videoData)
      .where(eq(videos.id, videoData.id))
      .returning();
    return video;
  }

  async toggleVideoActive(id: string): Promise<Video> {
    const [currentVideo] = await db
      .select()
      .from(videos)
      .where(eq(videos.id, id))
      .limit(1);

    if (!currentVideo) {
      throw new Error("Video not found");
    }

    if (!currentVideo.active) {
      const activeVideosCount = await db
        .select({ count: sql<number>`count(*)::int` })
        .from(videos)
        .where(eq(videos.active, true));

      const count = activeVideosCount[0]?.count || 0;
      if (count >= 4) {
        throw new Error("Maximum of 4 active videos allowed");
      }
    }

    const [video] = await db
      .update(videos)
      .set({ active: !currentVideo.active })
      .where(eq(videos.id, id))
      .returning();
    return video;
  }

  async deleteVideo(id: string): Promise<void> {
    await db.delete(videos).where(eq(videos.id, id));
  }

  // ========================================================================
  // Sustainability Content operations
  // ========================================================================
  async createSustainabilityContent(content: InsertSustainabilityContent): Promise<SustainabilityContent> {
    const [item] = await db
      .insert(sustainabilityContent)
      .values(content)
      .returning();
    return item;
  }

  async getSustainabilityContent(): Promise<SustainabilityContent[]> {
    try {
      return await db
        .select()
        .from(sustainabilityContent)
        .orderBy(sustainabilityContent.order);
    } catch (err: any) {
      if (err?.code === '42P01') return [];
      throw err;
    }
  }

  async getSustainabilityContentById(id: string): Promise<SustainabilityContent | undefined> {
    try {
      const [item] = await db
        .select()
        .from(sustainabilityContent)
        .where(eq(sustainabilityContent.id, id))
        .limit(1);
      return item;
    } catch (err: any) {
      if (err?.code === '42P01') return undefined;
      throw err;
    }
  }

  async updateSustainabilityContent(id: string, content: Partial<InsertSustainabilityContent>): Promise<SustainabilityContent> {
    const [item] = await db
      .update(sustainabilityContent)
      .set(content)
      .where(eq(sustainabilityContent.id, id))
      .returning();
    return item;
  }

  async deleteSustainabilityContent(id: string): Promise<void> {
    await db.delete(sustainabilityContent).where(eq(sustainabilityContent.id, id));
  }

  // ========================================================================
  // Message Template operations
  // ========================================================================
  async createMessageTemplate(templateData: InsertMessageTemplate): Promise<MessageTemplate> {
    const [template] = await db
      .insert(messageTemplates)
      .values(templateData)
      .returning();
    return template;
  }

  async getMessageTemplates(activeOnly: boolean = false): Promise<MessageTemplate[]> {
    if (activeOnly) {
      return await db
        .select()
        .from(messageTemplates)
        .where(eq(messageTemplates.active, true))
        .orderBy(messageTemplates.type);
    }
    return await db.select().from(messageTemplates).orderBy(messageTemplates.type);
  }

  async getMessageTemplateByType(type: string): Promise<MessageTemplate | undefined> {
    const [template] = await db
      .select()
      .from(messageTemplates)
      .where(and(
        eq(messageTemplates.type, type as any),
        eq(messageTemplates.active, true)
      ))
      .limit(1);
    return template;
  }

  // ========================================================================
  // Membership Benefit operations
  // ========================================================================
  async createMembershipBenefit(benefitData: InsertMembershipBenefit): Promise<MembershipBenefit> {
    const [benefit] = await db
      .insert(membershipBenefits)
      .values(benefitData)
      .returning();
    return benefit;
  }

  async getAllMembershipBenefits(): Promise<MembershipBenefit[]> {
    return await db
      .select()
      .from(membershipBenefits)
      .orderBy(membershipBenefits.visibilityRanking);
  }

  async getMembershipBenefitByTier(tier: string): Promise<MembershipBenefit | undefined> {
    const [benefit] = await db
      .select()
      .from(membershipBenefits)
      .where(eq(membershipBenefits.tier, tier as any))
      .limit(1);
    return benefit;
  }

  async initializeMembershipBenefits(): Promise<void> {
    try {
      const benefits = [
        {
          tier: "basic",
          maxActiveRFQs: 2,
          canAccessAnalytics: false,
          canDirectMessage: false,
          prioritySupport: false,
          visibilityRanking: 3,
          monthlyPrice: "0.00",
        },
        {
          tier: "standard",
          maxActiveRFQs: 10,
          canAccessAnalytics: true,
          canDirectMessage: true,
          prioritySupport: false,
          visibilityRanking: 2,
          monthlyPrice: "49.99",
        },
        {
          tier: "premium",
          maxActiveRFQs: -1,
          canAccessAnalytics: true,
          canDirectMessage: true,
          prioritySupport: true,
          visibilityRanking: 1,
          monthlyPrice: "199.99",
        },
      ];

      for (const benefit of benefits) {
        await db.insert(membershipBenefits)
          .values(benefit as any)
          .onConflictDoUpdate({
            target: [membershipBenefits.tier],
            set: {
              maxActiveRFQs: benefit.maxActiveRFQs,
              canAccessAnalytics: benefit.canAccessAnalytics,
              canDirectMessage: benefit.canDirectMessage,
              prioritySupport: benefit.prioritySupport,
              visibilityRanking: benefit.visibilityRanking,
              monthlyPrice: benefit.monthlyPrice,
              updatedAt: new Date(),
            },
          });
      }
      console.log("✓ Membership benefits initialized/synced");
    } catch (error) {
      console.error("Failed to initialize membership benefits:", error);
    }
  }

  async updateMembershipBenefit(tier: string, benefitData: Partial<InsertMembershipBenefit>): Promise<MembershipBenefit> {
    const [updated] = await db
      .update(membershipBenefits)
      .set({
        ...benefitData,
        updatedAt: new Date(),
      })
      .where(eq(membershipBenefits.tier, tier as any))
      .returning();
    return updated;
  }

  async updateUserMembershipTier(userId: string, tier: string): Promise<User> {
    const [updated] = await db
      .update(users)
      .set({
        membershipTier: tier as any,
        updatedAt: new Date(),
      })
      .where(eq(users.id, userId))
      .returning();
    return updated;
  }

  // ========================================================================
  // Tier Usage Tracking operations
  // ========================================================================
  async getUserTierUsage(userId: string, month: string): Promise<TierUsageTracking | undefined> {
    const [usage] = await db
      .select()
      .from(tierUsageTracking)
      .where(and(
        eq(tierUsageTracking.userId, userId),
        eq(tierUsageTracking.month, month)
      ))
      .limit(1);
    return usage;
  }

  async incrementUserRFQCount(userId: string, month: string): Promise<void> {
    const existing = await this.getUserTierUsage(userId, month);

    if (existing) {
      await db
        .update(tierUsageTracking)
        .set({
          activeRFQsCount: sql`${tierUsageTracking.activeRFQsCount} + 1`,
          updatedAt: new Date()
        })
        .where(eq(tierUsageTracking.id, existing.id));
    } else {
      await db
        .insert(tierUsageTracking)
        .values({
          userId,
          month,
          activeRFQsCount: 1,
          messagesCount: 0,
          analyticsViews: 0,
        });
    }
  }

  async getUserActiveRFQCount(userId: string): Promise<number> {
    const result = await db
      .select({ count: sql<number>`count(*)::int` })
      .from(buyerRequests)
      .where(and(
        eq(buyerRequests.buyerId, userId),
        eq(buyerRequests.status, 'active')
      ));
    return result[0]?.count || 0;
  }

  async checkUserCanCreateRFQ(userId: string): Promise<{ allowed: boolean; reason?: string; limit?: number; current?: number }> {
    const user = await this.getUser(userId);

    if (!user) {
      return { allowed: false, reason: 'User not found' };
    }

    const benefit = await this.getMembershipBenefitByTier(user.membershipTier);

    if (!benefit) {
      return { allowed: false, reason: 'Membership tier not configured' };
    }

    // -1 means unlimited
    if (benefit.maxActiveRFQs === -1) {
      return { allowed: true, limit: -1 };
    }

    const activeCount = await this.getUserActiveRFQCount(userId);

    if (activeCount >= benefit.maxActiveRFQs) {
      return {
        allowed: false,
        reason: `You have reached your ${user.membershipTier} tier limit of ${benefit.maxActiveRFQs} active RFQ${benefit.maxActiveRFQs > 1 ? 's' : ''}. Upgrade your membership to create more RFQs.`,
        limit: benefit.maxActiveRFQs,
        current: activeCount
      };
    }

    return { allowed: true, limit: benefit.maxActiveRFQs, current: activeCount };
  }

  // ========================================================================
  // Platform Settings operations
  // ========================================================================
  async getAllPlatformSettings(): Promise<PlatformSetting[]> {
    try {
      return await db.select().from(platformSettings).orderBy(desc(platformSettings.updatedAt));
    } catch (err: any) {
      if (err?.code === '42P01') return [];
      throw err;
    }
  }

  async createPlatformSetting(setting: InsertPlatformSetting): Promise<PlatformSetting> {
    try {
      const [created] = await db.insert(platformSettings).values(setting).returning();
      return created;
    } catch (err: any) {
      if (err?.code === '42P01') throw new Error('Platform settings table missing');
      throw err;
    }
  }

  async updatePlatformSetting(setting: UpdatePlatformSetting): Promise<PlatformSetting> {
    try {
      const { id, ...updates } = setting;
      const [updated] = await db
        .update(platformSettings)
        .set({ ...updates, updatedAt: new Date() })
        .where(eq(platformSettings.id, id!))
        .returning();
      return updated;
    } catch (err: any) {
      if (err?.code === '42P01') throw new Error('Platform settings table missing');
      throw err;
    }
  }

  async deletePlatformSetting(id: string): Promise<void> {
    try {
      await db.delete(platformSettings).where(eq(platformSettings.id, id));
    } catch (err: any) {
      if (err?.code === '42P01') return;
      throw err;
    }
  }

  async getPlatformSettingByKey(key: string): Promise<PlatformSetting | undefined> {
    try {
      const [setting] = await db
        .select()
        .from(platformSettings)
        .where(eq(platformSettings.key, key))
        .limit(1);
      return setting;
    } catch (err: any) {
      if (err?.code === '42P01') return undefined;
      throw err;
    }
  }

  async getPlatformSettingsByCategory(category: string): Promise<PlatformSetting[]> {
    try {
      return await db
        .select()
        .from(platformSettings)
        .where(eq(platformSettings.category, category))
        .orderBy(platformSettings.key);
    } catch (err: any) {
      if (err?.code === '42P01') return [];
      throw err;
    }
  }

  // ========================================================================
  // Settings Audit operations
  // ========================================================================
  async getSettingsAuditLogs(settingKey?: string, limit: number = 50): Promise<SettingsAudit[]> {
    if (settingKey) {
      return await db
        .select()
        .from(settingsAudit)
        .where(eq(settingsAudit.settingKey, settingKey))
        .orderBy(desc(settingsAudit.changedAt))
        .limit(limit);
    }
    return await db
      .select()
      .from(settingsAudit)
      .orderBy(desc(settingsAudit.changedAt))
      .limit(limit);
  }

  async logSettingChange(audit: InsertSettingsAudit): Promise<void> {
    await db.insert(settingsAudit).values(audit);
  }

  // ========================================================================
  // Email Template operations
  // ========================================================================
  async getAllEmailTemplates(): Promise<EmailTemplate[]> {
    return await db.select().from(emailTemplates).orderBy(desc(emailTemplates.createdAt));
  }

  async createEmailTemplate(template: InsertEmailTemplate): Promise<EmailTemplate> {
    const [created] = await db.insert(emailTemplates).values(template).returning();
    return created;
  }

  async updateEmailTemplate(template: UpdateEmailTemplate): Promise<EmailTemplate> {
    const { id, ...updates } = template;
    const [updated] = await db
      .update(emailTemplates)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(emailTemplates.id, id!))
      .returning();
    return updated;
  }

  async deleteEmailTemplate(id: string): Promise<void> {
    await db.delete(emailTemplates).where(eq(emailTemplates.id, id));
  }

  // ========================================================================
  // Login History operations
  // ========================================================================
  async getLoginHistory(userId?: string): Promise<LoginHistory[]> {
    if (userId) {
      return await db
        .select()
        .from(loginHistory)
        .where(eq(loginHistory.userId, userId))
        .orderBy(desc(loginHistory.createdAt))
        .limit(100);
    }
    return await db
      .select()
      .from(loginHistory)
      .orderBy(desc(loginHistory.createdAt))
      .limit(100);
  }

  async logLoginAttempt(data: InsertLoginHistory): Promise<void> {
    await db.insert(loginHistory).values(data);
  }

  // ========================================================================
  // Verification Rule operations
  // ========================================================================
  async getAllVerificationRules(): Promise<VerificationRule[]> {
    return await db.select().from(verificationRules).orderBy(desc(verificationRules.createdAt));
  }

  async createVerificationRule(rule: InsertVerificationRule): Promise<VerificationRule> {
    const [created] = await db.insert(verificationRules).values(rule).returning();
    return created;
  }

  async updateVerificationRule(rule: UpdateVerificationRule): Promise<VerificationRule> {
    const { id, ...updates } = rule;
    const [updated] = await db
      .update(verificationRules)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(verificationRules.id, id!))
      .returning();
    return updated;
  }

  async deleteVerificationRule(id: string): Promise<void> {
    await db.delete(verificationRules).where(eq(verificationRules.id, id));
  }

  // ========================================================================
  // Document Template operations
  // ========================================================================
  async getAllDocumentTemplates(): Promise<DocumentTemplate[]> {
    return await db.select().from(documentTemplates).orderBy(desc(documentTemplates.createdAt));
  }

  async createDocumentTemplate(template: InsertDocumentTemplate): Promise<DocumentTemplate> {
    const [created] = await db.insert(documentTemplates).values(template).returning();
    return created;
  }

  async updateDocumentTemplate(template: UpdateDocumentTemplate): Promise<DocumentTemplate> {
    const { id, ...updates } = template;
    const [updated] = await db
      .update(documentTemplates)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(documentTemplates.id, id!))
      .returning();
    return updated;
  }

  async deleteDocumentTemplate(id: string): Promise<void> {
    await db.delete(documentTemplates).where(eq(documentTemplates.id, id));
  }

  // ========================================================================
  // Admin Audit Log operations
  // ========================================================================
  async getAdminAuditLogs(adminId?: string): Promise<(AdminAuditLog & { admin?: User | null })[]> {
    const baseQuery = db
      .select({
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
          profileImageUrl: users.profileImageUrl,
        },
      })
      .from(adminAuditLogs)
      .leftJoin(users, eq(adminAuditLogs.adminId, users.id));

    if (adminId) {
      const results = await baseQuery
        .where(eq(adminAuditLogs.adminId, adminId))
        .orderBy(desc(adminAuditLogs.createdAt))
        .limit(200);

      return results.map(r => ({
        id: r.id,
        adminId: r.adminId,
        action: r.action,
        targetType: r.targetType,
        targetId: r.targetId,
        changes: r.changes,
        ipAddress: r.ipAddress,
        userAgent: r.userAgent,
        createdAt: r.createdAt,
        admin: r.admin?.id ? r.admin as User : null,
      }));
    }

    const results = await baseQuery
      .orderBy(desc(adminAuditLogs.createdAt))
      .limit(200);

    return results.map(r => ({
      id: r.id,
      adminId: r.adminId,
      action: r.action,
      targetType: r.targetType,
      targetId: r.targetId,
      changes: r.changes,
      ipAddress: r.ipAddress,
      userAgent: r.userAgent,
      createdAt: r.createdAt,
      admin: r.admin?.id ? r.admin as User : null,
    }));
  }

  async logAdminAudit(data: InsertAdminAuditLog): Promise<void> {
    await db.insert(adminAuditLogs).values(data);
  }

  // ========================================================================
  // Two-Factor Auth operations
  // ========================================================================
  async getTwoFactorAuthStatus(userId: string): Promise<TwoFactorAuth | undefined> {
    const [twoFA] = await db
      .select()
      .from(twoFactorAuth)
      .where(eq(twoFactorAuth.userId, userId))
      .limit(1);
    return twoFA;
  }

  async enableTwoFactorAuth(userId: string): Promise<void> {
    const existing = await this.getTwoFactorAuthStatus(userId);

    if (existing) {
      await db
        .update(twoFactorAuth)
        .set({ enabled: true, updatedAt: new Date() })
        .where(eq(twoFactorAuth.userId, userId));
    } else {
      await db
        .insert(twoFactorAuth)
        .values({
          userId,
          enabled: true,
          secret: null,
          backupCodes: [],
        });
    }
  }

  async disableTwoFactorAuth(userId: string): Promise<void> {
    await db
      .update(twoFactorAuth)
      .set({ enabled: false, updatedAt: new Date() })
      .where(eq(twoFactorAuth.userId, userId));
  }

  // ========================================================================
  // User Management (Admin) operations
  // ========================================================================
  async updateUserPassword(userId: string, hashedPassword: string): Promise<void> {
    await db
      .update(users)
      .set({ password: hashedPassword, updatedAt: new Date() })
      .where(eq(users.id, userId));
  }

  async forceUserLogout(userId: string): Promise<void> {
    // Delete all sessions for this user
    await db
      .delete(sessions)
      .where(sql`${sessions.sess}->>'userId' = ${userId}`);
  }

  async updateUserInfo(userId: string, data: any): Promise<User> {
    const [updated] = await db
      .update(users)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(users.id, userId))
      .returning();
    return updated;
  }

  // ========================================================================
  // Seller Verification operations
  // ========================================================================
  async createVerificationRequest(sellerId: string): Promise<SellerVerificationRequest> {
    // Check if there's already a pending request
    const existing = await db
      .select()
      .from(sellerVerificationRequests)
      .where(
        and(
          eq(sellerVerificationRequests.sellerId, sellerId),
          eq(sellerVerificationRequests.status, 'pending')
        )
      )
      .limit(1);

    if (existing.length > 0) {
      return existing[0];
    }

    const [request] = await db
      .insert(sellerVerificationRequests)
      .values({ sellerId })
      .returning();
    return request;
  }

  async getVerificationRequestById(id: string): Promise<SellerVerificationRequest | undefined> {
    const [request] = await db
      .select()
      .from(sellerVerificationRequests)
      .where(eq(sellerVerificationRequests.id, id))
      .limit(1);
    return request;
  }

  async getVerificationRequestBySellerId(sellerId: string): Promise<SellerVerificationRequest | undefined> {
    const [request] = await db
      .select()
      .from(sellerVerificationRequests)
      .where(eq(sellerVerificationRequests.sellerId, sellerId))
      .orderBy(desc(sellerVerificationRequests.createdAt))
      .limit(1);
    return request;
  }

  async getAllPendingVerificationRequests(): Promise<any[]> {
    const requests = await db
      .select({
        id: sellerVerificationRequests.id,
        status: sellerVerificationRequests.status,
        rejectionReason: sellerVerificationRequests.rejectionReason,
        submittedAt: sellerVerificationRequests.submittedAt,
        reviewedAt: sellerVerificationRequests.reviewedAt,
        sellerId: users.id,
        sellerEmail: users.email,
        sellerFirstName: users.firstName,
        sellerLastName: users.lastName,
        sellerCompanyName: userProfiles.companyName,
      })
      .from(sellerVerificationRequests)
      .leftJoin(users, eq(sellerVerificationRequests.sellerId, users.id))
      .leftJoin(userProfiles, eq(users.id, userProfiles.userId))
      .where(eq(sellerVerificationRequests.status, 'pending'))
      .orderBy(desc(sellerVerificationRequests.submittedAt));

    return requests;
  }

  async getAllVerificationRequests(): Promise<any[]> {
    const requests = await db
      .select({
        id: sellerVerificationRequests.id,
        status: sellerVerificationRequests.status,
        rejectionReason: sellerVerificationRequests.rejectionReason,
        submittedAt: sellerVerificationRequests.submittedAt,
        reviewedAt: sellerVerificationRequests.reviewedAt,
        sellerId: users.id,
        sellerEmail: users.email,
        sellerFirstName: users.firstName,
        sellerLastName: users.lastName,
        sellerCompanyName: userProfiles.companyName,
      })
      .from(sellerVerificationRequests)
      .leftJoin(users, eq(sellerVerificationRequests.sellerId, users.id))
      .leftJoin(userProfiles, eq(users.id, userProfiles.userId))
      .orderBy(desc(sellerVerificationRequests.submittedAt));

    return requests;
  }

  async updateVerificationRequestStatus(id: string, status: string): Promise<SellerVerificationRequest> {
    const [updated] = await db
      .update(sellerVerificationRequests)
      .set({
        status: status as any,
        submittedAt: status === 'pending' ? new Date() : undefined,
        updatedAt: new Date(),
      })
      .where(eq(sellerVerificationRequests.id, id))
      .returning();

    return updated;
  }

  async approveVerificationRequest(id: string, reviewerId: string): Promise<SellerVerificationRequest> {
    // Get the request first to get the seller ID
    const request = await this.getVerificationRequestById(id);
    if (!request) {
      throw new Error('Verification request not found');
    }

    // Get the seller's membership tier
    const seller = await this.getUserById(request.sellerId);
    if (!seller) {
      throw new Error('Seller not found');
    }

    // Determine badge color based on membership tier
    const badgeColorMap: Record<string, string> = {
      basic: '', // No badge for basic tier
      standard: 'blue',
      premium: 'gold',
    };
    const badgeColor = badgeColorMap[seller.membershipTier] || '';

    // Update verification request
    const [updated] = await db
      .update(sellerVerificationRequests)
      .set({
        status: 'approved',
        reviewedAt: new Date(),
        reviewedBy: reviewerId,
        updatedAt: new Date(),
      })
      .where(eq(sellerVerificationRequests.id, id))
      .returning();

    // Update user verification status
    await this.updateUserVerificationStatus(request.sellerId, 'approved', badgeColor);

    // Log activity
    await this.logAdminAudit({
      adminId: reviewerId,
      action: 'verification_approved',
      targetType: 'seller_verification_request',
      targetId: id,
      changes: { status: 'approved', sellerId: request.sellerId },
    });

    return updated;
  }

  async rejectVerificationRequest(id: string, reviewerId: string, reason: string): Promise<SellerVerificationRequest> {
    const request = await this.getVerificationRequestById(id);
    if (!request) {
      throw new Error('Verification request not found');
    }

    const [updated] = await db
      .update(sellerVerificationRequests)
      .set({
        status: 'rejected',
        rejectionReason: reason,
        reviewedAt: new Date(),
        reviewedBy: reviewerId,
        updatedAt: new Date(),
      })
      .where(eq(sellerVerificationRequests.id, id))
      .returning();

    // Update user verification status
    await this.updateUserVerificationStatus(request.sellerId, 'rejected');

    // Log activity
    await this.logAdminAudit({
      adminId: reviewerId,
      action: 'verification_rejected',
      targetType: 'seller_verification_request',
      targetId: id,
      changes: { status: 'rejected', reason, sellerId: request.sellerId },
    });

    return updated;
  }

  async createVerificationDocument(data: InsertSellerVerificationDocument): Promise<SellerVerificationDocument> {
    const [document] = await db
      .insert(sellerVerificationDocuments)
      .values(data)
      .returning();
    return document;
  }

  async getDocumentsByRequestId(requestId: string): Promise<SellerVerificationDocument[]> {
    return await db
      .select()
      .from(sellerVerificationDocuments)
      .where(eq(sellerVerificationDocuments.requestId, requestId))
      .orderBy(desc(sellerVerificationDocuments.uploadedAt));
  }

  async updateUserVerificationStatus(userId: string, status: string, badgeColor?: string): Promise<User> {
    const updateData: any = {
      verificationStatus: status as any,
      updatedAt: new Date(),
    };

    if (badgeColor !== undefined) {
      updateData.badgeColor = badgeColor;
    }

    const [updated] = await db
      .update(users)
      .set(updateData)
      .where(eq(users.id, userId))
      .returning();

    return updated;
  }

  // ============================================================================
  // Payment Methods
  // ============================================================================

  async createTierUpgradePayment(data: InsertTierUpgradePayment): Promise<TierUpgradePayment> {
    const [payment] = await db
      .insert(tierUpgradePayments)
      .values(data)
      .returning();
    return payment;
  }

  async getTierUpgradePaymentById(id: string): Promise<TierUpgradePayment | undefined> {
    const [payment] = await db
      .select()
      .from(tierUpgradePayments)
      .where(eq(tierUpgradePayments.id, id));
    return payment;
  }

  async getTierUpgradePaymentsByUserId(userId: string): Promise<TierUpgradePayment[]> {
    return await db
      .select()
      .from(tierUpgradePayments)
      .where(eq(tierUpgradePayments.userId, userId))
      .orderBy(desc(tierUpgradePayments.createdAt));
  }

  async getTierUpgradePaymentsByUpgradeRequestId(upgradeRequestId: string): Promise<TierUpgradePayment[]> {
    return await db
      .select()
      .from(tierUpgradePayments)
      .where(eq(tierUpgradePayments.upgradeRequestId, upgradeRequestId))
      .orderBy(desc(tierUpgradePayments.createdAt));
  }

  async updateTierUpgradePayment(id: string, data: UpdateTierUpgradePayment): Promise<TierUpgradePayment> {
    const [payment] = await db
      .update(tierUpgradePayments)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(tierUpgradePayments.id, id))
      .returning();
    return payment;
  }

  async getAllPendingTierUpgradePayments(): Promise<TierUpgradePayment[]> {
    return await db
      .select()
      .from(tierUpgradePayments)
      .where(eq(tierUpgradePayments.status, 'paid'))
      .orderBy(desc(tierUpgradePayments.submittedAt));
  }

  async createPaymentMethodDetails(data: InsertPaymentMethodDetails): Promise<PaymentMethodDetails> {
    const [method] = await db
      .insert(paymentMethodDetails)
      .values(data)
      .returning();
    return method;
  }

  async getAllPaymentMethodDetails(): Promise<PaymentMethodDetails[]> {
    return await db
      .select()
      .from(paymentMethodDetails)
      .where(eq(paymentMethodDetails.isActive, true))
      .orderBy(paymentMethodDetails.name);
  }

  async getPaymentMethodDetailsByMethod(method: string): Promise<PaymentMethodDetails | undefined> {
    const [paymentMethod] = await db
      .select()
      .from(paymentMethodDetails)
      .where(and(eq(paymentMethodDetails.method, method as any), eq(paymentMethodDetails.isActive, true)));
    return paymentMethod;
  }

  async updatePaymentMethodDetails(id: string, data: UpdatePaymentMethodDetails): Promise<PaymentMethodDetails> {
    const [method] = await db
      .update(paymentMethodDetails)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(paymentMethodDetails.id, id))
      .returning();
    return method;
  }

  // ========================================================================
  // Buyer Tier Upgrade operations implementation
  // ========================================================================
  async createTierUpgradeRequest(requestId: string, userId: string, requestedTier: string): Promise<any> {
    const [request] = await db
      .insert(tierUpgradeRequests)
      .values({
        id: requestId,
        userId,
        requestedTier: requestedTier as any,
        status: 'draft',
        submittedAt: new Date(),
      })
      .returning();
    return request;
  }

  async submitTierUpgradeRequest(requestId: string): Promise<any> {
    const [request] = await db
      .update(tierUpgradeRequests)
      .set({
        status: 'pending',
        submittedAt: new Date(),
        updatedAt: new Date(),
      })
      .where(eq(tierUpgradeRequests.id, requestId))
      .returning();
    return request;
  }

  async getTierUpgradeRequestById(id: string): Promise<any> {
    const [request] = await db
      .select({
        ...tierUpgradeRequests, // all fields from request
        buyerEmail: users.email,
        buyerFirstName: users.firstName,
        buyerLastName: users.lastName,
      })
      .from(tierUpgradeRequests)
      .leftJoin(users, eq(tierUpgradeRequests.userId, users.id))
      .where(eq(tierUpgradeRequests.id, id));
    return request;
  }

  async getTierUpgradeRequestByUserId(userId: string): Promise<any> {
    const [request] = await db
      .select({
        ...tierUpgradeRequests,
        buyerEmail: users.email,
        buyerFirstName: users.firstName,
        buyerLastName: users.lastName,
      })
      .from(tierUpgradeRequests)
      .leftJoin(users, eq(tierUpgradeRequests.userId, users.id))
      .where(eq(tierUpgradeRequests.userId, userId))
      .orderBy(desc(tierUpgradeRequests.createdAt))
      .limit(1);
    return request;
  }

  async getAllTierUpgradeRequests(): Promise<any[]> {
    return await db
      .select({
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
        buyerLastName: users.lastName,
      })
      .from(tierUpgradeRequests)
      .leftJoin(users, eq(tierUpgradeRequests.userId, users.id))
      .orderBy(desc(tierUpgradeRequests.submittedAt));
  }

  async getPendingTierUpgradeRequests(): Promise<any[]> {
    return await db
      .select({
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
        buyerLastName: users.lastName,
      })
      .from(tierUpgradeRequests)
      .leftJoin(users, eq(tierUpgradeRequests.userId, users.id))
      .where(or(eq(tierUpgradeRequests.status, 'pending'), eq(tierUpgradeRequests.status, 'draft')))
      .orderBy(desc(tierUpgradeRequests.submittedAt));
  }

  async approveTierUpgradeRequest(id: string, reviewerId: string): Promise<any> {
    // First get the request
    const request = await this.getTierUpgradeRequestById(id);
    if (!request) throw new Error("Request not found");

    // Update request status
    const [updatedRequest] = await db
      .update(tierUpgradeRequests)
      .set({
        status: 'approved',
        reviewedBy: reviewerId,
        reviewedAt: new Date(),
        updatedAt: new Date(),
      })
      .where(eq(tierUpgradeRequests.id, id))
      .returning();

    // Update user tier
    await db
      .update(users)
      .set({ membershipTier: request.requestedTier as any })
      .where(eq(users.id, request.userId));

    return updatedRequest;
  }

  async rejectTierUpgradeRequest(id: string, reviewerId: string, reason: string): Promise<any> {
    const [updatedRequest] = await db
      .update(tierUpgradeRequests)
      .set({
        status: 'rejected',
        rejectionReason: reason,
        reviewedBy: reviewerId,
        reviewedAt: new Date(),
        updatedAt: new Date(),
      })
      .where(eq(tierUpgradeRequests.id, id))
      .returning();
    return updatedRequest;
  }

  async revertTierUpgradeRequest(id: string): Promise<any> {
    const [updatedRequest] = await db
      .update(tierUpgradeRequests)
      .set({
        status: 'draft',
        rejectionReason: null, // Clear rejection reason
        reviewedBy: null,
        reviewedAt: null,
        updatedAt: new Date(),
      })
      .where(eq(tierUpgradeRequests.id, id))
      .returning();
    return updatedRequest;
  }

  async createTierUpgradeDocument(data: any): Promise<any> {
    const [doc] = await db
      .insert(tierUpgradeDocuments)
      .values(data)
      .returning();

    // Increment document count on request
    await db.execute(sql`
      UPDATE ${tierUpgradeRequests}
      SET document_count = document_count + 1, updated_at = NOW()
      WHERE id = ${data.requestId}
    `);

    return doc;
  }

  async getTierUpgradeDocuments(requestId: string): Promise<any[]> {
    return await db
      .select()
      .from(tierUpgradeDocuments)
      .where(eq(tierUpgradeDocuments.requestId, requestId))
      .orderBy(desc(tierUpgradeDocuments.uploadedAt));
  }

  async createTierUpgradePayment(data: any): Promise<any> {
    const [payment] = await db
      .insert(tierUpgradePayments)
      .values(data)
      .returning();
    return payment;
  }

  async updateTierUpgradePayment(id: string, data: any): Promise<any> {
    const [updated] = await db
      .update(tierUpgradePayments)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(tierUpgradePayments.id, id))
      .returning();
    return updated;
  }

  async getTierUpgradePaymentByRequestId(requestId: string): Promise<any | undefined> {
    const [payment] = await db
      .select()
      .from(tierUpgradePayments)
      .where(eq(tierUpgradePayments.upgradeRequestId, requestId))
      .limit(1);
    return payment;
  }

  // Onboarding & Deletion Implementation
  async completeOnboarding(userId: string, role: string): Promise<void> {
    await db.update(users)
      .set({ role: role as any, updatedAt: new Date() })
      .where(eq(users.id, userId));

    await db.update(userProfiles)
      .set({ onboardingCompleted: true, updatedAt: new Date() })
      .where(eq(userProfiles.userId, userId));
  }

  async createAccountDeletionRequest(data: InsertAccountDeletionRequest): Promise<AccountDeletionRequest> {
    const [request] = await db
      .insert(accountDeletionRequests)
      .values(data)
      .returning();
    return request;
  }

  async getAccountDeletionRequests(): Promise<AccountDeletionRequest[]> {
    return await db
      .select()
      .from(accountDeletionRequests)
      .orderBy(desc(accountDeletionRequests.createdAt));
  }

  async updateAccountDeletionRequestStatus(id: string, status: string): Promise<AccountDeletionRequest> {
    const [updated] = await db
      .update(accountDeletionRequests)
      .set({ status, updatedAt: new Date() })
      .where(eq(accountDeletionRequests.id, id))
      .returning();
    return updated;
  }
}

export const storage = new DatabaseStorage();
