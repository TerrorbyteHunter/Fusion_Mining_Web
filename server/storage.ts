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
  verificationQueue,
  activityLogs,
  notifications,
  videos,
  adminPermissions,
  membershipBenefits,
  tierUsageTracking,
  type AdminPermissions,
  type InsertAdminPermissions,
  type UpdateAdminPermissions,
  type User,
  type UpsertUser,
  type UserProfile,
  type InsertUserProfile,
  type UpdateUserProfile,
  type Project,
  type InsertProject,
  type ExpressInterest,
  type InsertExpressInterest,
  type MarketplaceListing,
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
  getProjects(): Promise<Project[]>;
  getProjectById(id: string): Promise<Project | undefined>;
  updateProject(id: string, data: Partial<InsertProject>): Promise<Project>;
  deleteProject(id: string): Promise<void>;
  closeProject(id: string): Promise<Project>;
  expressProjectInterest(interest: InsertExpressInterest): Promise<ExpressInterest>;
  getAllExpressedInterests(): Promise<any[]>;

  // Marketplace Listing operations
  createMarketplaceListing(listing: InsertMarketplaceListing): Promise<MarketplaceListing>;
  getMarketplaceListings(filters?: { type?: string; status?: string }): Promise<MarketplaceListing[]>;
  getMarketplaceListingById(id: string): Promise<MarketplaceListing | undefined>;
  updateListingStatus(id: string, status: string): Promise<MarketplaceListing>;
  updateMarketplaceListing(id: string, data: Partial<InsertMarketplaceListing>): Promise<MarketplaceListing>;
  deleteMarketplaceListing(id: string): Promise<void>;
  closeMarketplaceListing(id: string): Promise<MarketplaceListing>;
  getListingsBySellerId(sellerId: string): Promise<MarketplaceListing[]>;

  // Buyer Request operations
  createBuyerRequest(request: InsertBuyerRequest): Promise<BuyerRequest>;
  getBuyerRequests(): Promise<BuyerRequest[]>;
  getBuyerRequestById(id: string): Promise<BuyerRequest | undefined>;

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

  // Message Template operations
  createMessageTemplate(template: InsertMessageTemplate): Promise<MessageTemplate>;
  getMessageTemplates(activeOnly?: boolean): Promise<MessageTemplate[]>;
  getMessageTemplateByType(type: string): Promise<MessageTemplate | undefined>;

  // Membership Benefit operations
  createMembershipBenefit(benefit: InsertMembershipBenefit): Promise<MembershipBenefit>;
  getAllMembershipBenefits(): Promise<MembershipBenefit[]>;
  getMembershipBenefitByTier(tier: string): Promise<MembershipBenefit | undefined>;
  
  // Tier Usage Tracking operations
  getUserTierUsage(userId: string, month: string): Promise<TierUsageTracking | undefined>;
  incrementUserRFQCount(userId: string, month: string): Promise<void>;
  checkUserCanCreateRFQ(userId: string): Promise<{ allowed: boolean; reason?: string }>;
  getUserActiveRFQCount(userId: string): Promise<number>;
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
    // Check if user exists by email first
    if (userData.email) {
      const existingUsers = await db
        .select()
        .from(users)
        .where(eq(users.email, userData.email))
        .limit(1);
      
      if (existingUsers.length > 0) {
        // Update existing user, preserving the original ID and role
        const updateData: any = {
          firstName: userData.firstName,
          lastName: userData.lastName,
          profileImageUrl: userData.profileImageUrl,
          updatedAt: new Date(),
        };
        
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
    // If created active immediately, assign an item id; otherwise will be assigned when activated
    if (!projectData.itemId && projectData.status === 'active') {
      projectData.itemId = await generateUniqueItemId(db);
    }

    const [project] = await db
      .insert(projects)
      .values(projectData)
      .returning();
    return project;
  }

  async getProjects(): Promise<Project[]> {
    return await db
      .select()
      .from(projects)
      .orderBy(desc(projects.createdAt));
  }

  async getProjectById(id: string): Promise<Project | undefined> {
    const [project] = await db
      .select()
      .from(projects)
      .where(eq(projects.id, id));
    return project;
  }

  async updateProject(id: string, data: Partial<InsertProject>): Promise<Project> {
    // If status is being changed to active and itemId is missing, generate one
    if (data.status === 'active') {
      const [existing] = await db.select().from(projects).where(eq(projects.id, id)).limit(1);
      if (existing && !existing.itemId) {
        data.itemId = await generateUniqueItemId(db);
      }
    }

    const [project] = await db
      .update(projects)
      .set({ ...data, updatedAt: new Date() })
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

  async getMarketplaceListings(filters?: { type?: string; status?: string }): Promise<MarketplaceListing[]> {
    let query = db.select().from(marketplaceListings);

    if (filters?.type && filters?.status) {
      query = query.where(
        and(
          eq(marketplaceListings.type, filters.type as any),
          eq(marketplaceListings.status, filters.status as any)
        )
      ) as any;
    } else if (filters?.type) {
      query = query.where(eq(marketplaceListings.type, filters.type as any)) as any;
    } else if (filters?.status) {
      query = query.where(eq(marketplaceListings.status, filters.status as any)) as any;
    }

    return await query.orderBy(desc(marketplaceListings.createdAt));
  }

  async getMarketplaceListingById(id: string): Promise<MarketplaceListing | undefined> {
    const [listing] = await db
      .select()
      .from(marketplaceListings)
      .where(eq(marketplaceListings.id, id));
    return listing;
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

    return {
      ...result[0],
      conversation: conversationMessages
    };
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

  async getActivityLogs(limit: number = 100): Promise<ActivityLog[]> {
    return await db
      .select()
      .from(activityLogs)
      .orderBy(desc(activityLogs.createdAt))
      .limit(limit);
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
    const result = await db
      .select({ count: sql<number>`count(*)::int` })
      .from(marketplaceListings)
      .where(eq(marketplaceListings.sellerId, userId));
    return result[0]?.count || 0;
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

  async checkUserCanCreateRFQ(userId: string): Promise<{ allowed: boolean; reason?: string }> {
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
      return { allowed: true };
    }

    const activeCount = await this.getUserActiveRFQCount(userId);
    
    if (activeCount >= benefit.maxActiveRFQs) {
      return { 
        allowed: false, 
        reason: `You have reached your ${user.membershipTier} tier limit of ${benefit.maxActiveRFQs} active RFQ${benefit.maxActiveRFQs > 1 ? 's' : ''}. Upgrade to create more RFQs.`
      };
    }

    return { allowed: true };
  }
}

export const storage = new DatabaseStorage();
