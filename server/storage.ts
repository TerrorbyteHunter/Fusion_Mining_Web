// Database storage implementation with complete CRUD operations
import {
  users,
  userProfiles,
  projects,
  expressInterest,
  marketplaceListings,
  buyerRequests,
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
} from "@shared/schema";
import { db } from "./db";
import { eq, and, desc, or, sql } from "drizzle-orm";

export interface IStorage {
  // User operations (Required for Replit Auth)
  getUser(id: string): Promise<User | undefined>;
  getUserById(id: string): Promise<User | undefined>;
  getAdminUser(): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
  getAllUsers(): Promise<User[]>;
  updateUserRole(id: string, role: string): Promise<User>;
  deleteUser(id: string): Promise<void>;

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

  // Message operations
  createMessage(message: InsertMessage): Promise<Message>;
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

  async getAdminUser(): Promise<User | undefined> {
    const [admin] = await db.select().from(users).where(eq(users.role, 'admin')).limit(1);
    return admin;
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
        const [user] = await db
          .update(users)
          .set({
            firstName: userData.firstName,
            lastName: userData.lastName,
            profileImageUrl: userData.profileImageUrl,
            updatedAt: new Date(),
          })
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

  // ========================================================================
  // Buyer Request operations
  // ========================================================================
  async createBuyerRequest(requestData: InsertBuyerRequest): Promise<BuyerRequest> {
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
  // Message operations
  // ========================================================================
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
    const results = await db
      .select({
        message: messages,
        senderFirstName: users.firstName,
        senderLastName: users.lastName,
        listing: marketplaceListings,
        sellerFirstName: sql<string>`seller.first_name`,
        sellerLastName: sql<string>`seller.last_name`,
      })
      .from(messages)
      .leftJoin(users, eq(messages.senderId, users.id))
      .leftJoin(marketplaceListings, eq(messages.relatedListingId, marketplaceListings.id))
      .leftJoin(
        sql`users as seller`, 
        eq(marketplaceListings.sellerId, sql`seller.id`)
      )
      .where(
        or(
          eq(messages.senderId, userId),
          eq(messages.receiverId, userId)
        )
      )
      .orderBy(messages.createdAt);

    // Transform the results to include full names and maintain the Message type
    return results.map(result => ({
      ...result.message,
      senderName: result.senderFirstName && result.senderLastName 
        ? `${result.senderFirstName} ${result.senderLastName}` 
        : undefined,
      listing: result.listing,
      sellerName: result.sellerFirstName && result.sellerLastName 
        ? `${result.sellerFirstName} ${result.sellerLastName}` 
        : undefined,
    }));
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
      .set({ read: true })
      .where(eq(messages.id, id));
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

  async approveListing(listingId: string, reviewerId: string): Promise<void> {
    // Update listing status
    await db
      .update(marketplaceListings)
      .set({
        status: 'approved',
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
    const result = await db
      .select({ count: sql<number>`count(*)::int` })
      .from(messages)
      .where(
        and(
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
}

export const storage = new DatabaseStorage();
