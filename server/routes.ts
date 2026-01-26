// API routes for Fusion Mining Limited platform
import type { Express } from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { requireAuth, requireAdmin, requireSeller, requireAdminPermission, syncClerkUser } from "./localAuth";
import { ZodError } from "zod";
import { db } from "./db";
import { users, userProfiles, adminAuditLogs, tierUpgradeRequests, tierUpgradePayments, paymentMethodDetails } from "@shared/schema";
import { sql } from "drizzle-orm";
import { eq, desc } from "drizzle-orm";
import bcrypt from "bcrypt";
import {
  insertUserProfileSchema,
  updateUserProfileSchema,
  insertProjectSchema,
  insertExpressInterestSchema,
  insertMarketplaceListingSchema,
  insertBuyerRequestSchema,
  insertMessageSchema,
  insertMessageTemplateSchema,
  insertBlogPostSchema,
  insertContactSubmissionSchema,
  insertActivityLogSchema,
  insertNotificationSchema,
  insertVideoSchema,
  updateVideoSchema,
  insertPlatformSettingSchema,
  updatePlatformSettingSchema,
  insertEmailTemplateSchema,
  updateEmailTemplateSchema,
  insertVerificationRuleSchema,
  updateVerificationRuleSchema,
  insertDocumentTemplateSchema,
  updateDocumentTemplateSchema,
  insertTierUpgradeRequestSchema,
  updateTierUpgradeRequestSchema,
  insertTierUpgradePaymentSchema,
  updateTierUpgradePaymentSchema,
  insertPaymentMethodDetailsSchema,
} from "@shared/schema";
import { askSupportBot, type ChatHistoryItem } from "./ai/gemini";
import { askHuggingFace, formatChatPrompt } from "./ai/hf";
// import { getSession } from "./replitAuth";

// Helper function to format Zod errors
function formatZodError(error: ZodError): string {
  return error.errors.map(err => `${err.path.join('.')}: ${err.message}`).join(', ');
}

// Helper function to safely get user ID from request
function getUserId(req: any): string | null {
  return req.auth?.userId || req.user?.claims?.sub || req.user?.id || null;
}

// ========================================================================
// In-Memory State Management for Demo/Development
// ========================================================================

interface BuyerUpgradeRequest {
  id: string;
  userId: string;
  buyerEmail: string;
  buyerFirstName: string;
  buyerLastName: string;
  requestedTier: string;
  status: 'draft' | 'pending' | 'approved' | 'rejected';
  rejectionReason?: string;
  submittedAt?: string;
  reviewedAt?: string;
  documentCount: number;
}

interface TestUser {
  id: string;
  email: string;
  role: string;
  firstName: string;
  lastName: string;
  membershipTier: string;
  verificationStatus: string;
}

// In-memory storage for test users
const testUsersStore: Map<string, TestUser> = new Map([
  ['test-buyer-789', {
    id: 'test-buyer-789',
    email: 'henry@fusionmining.com',
    role: 'buyer',
    firstName: 'Henry',
    lastName: 'Pass',
    membershipTier: 'premium',
    verificationStatus: 'not_requested',
  }],
  ['test-seller-456', {
    id: 'test-seller-456',
    email: 'ray@fusionmining.com',
    role: 'seller',
    firstName: 'Ray',
    lastName: 'Pass',
    membershipTier: 'basic',
    verificationStatus: 'approved',
  }],
  ['test-admin-super', {
    id: 'test-admin-super',
    email: 'superadmin@fusionmining.com',
    role: 'admin',
    firstName: 'Super',
    lastName: 'Admin',
    membershipTier: 'premium',
    verificationStatus: 'approved',
  }],
  ['test-admin-verification', {
    id: 'test-admin-verification',
    email: 'verifyadmin@fusionmining.com',
    role: 'admin',
    firstName: 'Verification',
    lastName: 'Admin',
    membershipTier: 'basic',
    verificationStatus: 'approved',
  }],
  ['test-admin-content', {
    id: 'test-admin-content',
    email: 'contentadmin@fusionmining.com',
    role: 'admin',
    firstName: 'Content',
    lastName: 'Admin',
    membershipTier: 'basic',
    verificationStatus: 'approved',
  }],
  ['test-admin-support', {
    id: 'test-admin-support',
    email: 'supportadmin@fusionmining.com',
    role: 'admin',
    firstName: 'Support',
    lastName: 'Admin',
    membershipTier: 'basic',
    verificationStatus: 'approved',
  }],
  ['test-admin-analytics', {
    id: 'test-admin-analytics',
    email: 'analyticsadmin@fusionmining.com',
    role: 'admin',
    firstName: 'Analytics',
    lastName: 'Admin',
    membershipTier: 'basic',
    verificationStatus: 'approved',
  }],
]);

// In-memory storage for custom test credentials (username/password combinations)
interface TestCredential {
  username: string;
  password: string;
  userId: string;
  role: 'admin' | 'buyer' | 'seller';
  firstName: string;
  lastName: string;
  adminRole?: 'super_admin' | 'verification_admin' | 'content_admin' | 'support_admin' | 'analytics_admin';
}
const customTestCredentials: Map<string, TestCredential> = new Map([
  ['admin', { username: 'admin', password: 'admin123', userId: 'test-admin-123', role: 'admin', firstName: 'Admin', lastName: 'User', adminRole: 'super_admin' }],
  ['superadmin', { username: 'superadmin', password: 'super123', userId: 'test-admin-super', role: 'admin', firstName: 'Super', lastName: 'Admin', adminRole: 'super_admin' }],
  ['verifyadmin', { username: 'verifyadmin', password: 'verify123', userId: 'test-admin-verification', role: 'admin', firstName: 'Verification', lastName: 'Admin', adminRole: 'verification_admin' }],
  ['contentadmin', { username: 'contentadmin', password: 'content123', userId: 'test-admin-content', role: 'admin', firstName: 'Content', lastName: 'Admin', adminRole: 'content_admin' }],
  ['supportadmin', { username: 'supportadmin', password: 'support123', userId: 'test-admin-support', role: 'admin', firstName: 'Support', lastName: 'Admin', adminRole: 'support_admin' }],
  ['analyticsadmin', { username: 'analyticsadmin', password: 'analytics123', userId: 'test-admin-analytics', role: 'admin', firstName: 'Analytics', lastName: 'Admin', adminRole: 'analytics_admin' }],
  ['henry', { username: 'henry', password: 'henry123', userId: 'test-buyer-789', role: 'buyer', firstName: 'Henry', lastName: 'Pass' }],
  ['ray', { username: 'ray', password: 'ray123', userId: 'test-seller-456', role: 'seller', firstName: 'Ray', lastName: 'Pass' }],
]);

// In-memory storage for tier upgrade requests
const buyerUpgradeRequests: Map<string, BuyerUpgradeRequest> = new Map([
  ['upgrade-1', {
    id: 'upgrade-1',
    userId: 'test-buyer-789',
    buyerEmail: 'henry@fusionmining.com',
    buyerFirstName: 'Henry',
    buyerLastName: 'Brown',
    requestedTier: 'premium',
    status: 'approved',
    submittedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    reviewedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    documentCount: 4,
  }],
  ['upgrade-2', {
    id: 'upgrade-2',
    userId: 'buyer-2',
    buyerEmail: 'buyer2@example.com',
    buyerFirstName: 'John',
    buyerLastName: 'Doe',
    requestedTier: 'standard',
    status: 'approved',
    submittedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    reviewedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    documentCount: 3,
  }],
  ['upgrade-3', {
    id: 'upgrade-3',
    userId: 'buyer-3',
    buyerEmail: 'buyer3@example.com',
    buyerFirstName: 'Sarah',
    buyerLastName: 'Smith',
    requestedTier: 'premium',
    status: 'rejected',
    rejectionReason: 'Incomplete documentation. Missing Director ID and Tax Certificate.',
    submittedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    reviewedAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
    documentCount: 2,
  }],
]);

// Helper function to get all requests with user info
async function getAllBuyerUpgrades(): Promise<TierUpgradeRequest[]> {
  return await db.select({
    id: tierUpgradeRequests.id,
    userId: tierUpgradeRequests.userId,
    buyerEmail: users.email,
    buyerFirstName: users.firstName,
    buyerLastName: users.lastName,
    requestedTier: tierUpgradeRequests.requestedTier,
    status: tierUpgradeRequests.status,
    rejectionReason: tierUpgradeRequests.rejectionReason,
    submittedAt: tierUpgradeRequests.submittedAt,
    reviewedAt: tierUpgradeRequests.reviewedAt,
    documentCount: tierUpgradeRequests.documentCount,
    createdAt: tierUpgradeRequests.createdAt,
    updatedAt: tierUpgradeRequests.updatedAt,
  })
  .from(tierUpgradeRequests)
  .leftJoin(users, eq(tierUpgradeRequests.userId, users.id));
}

// Helper function to get pending requests with user info
async function getPendingBuyerUpgrades(): Promise<TierUpgradeRequest[]> {
  return await db.select({
    id: tierUpgradeRequests.id,
    userId: tierUpgradeRequests.userId,
    buyerEmail: users.email,
    buyerFirstName: users.firstName,
    buyerLastName: users.lastName,
    requestedTier: tierUpgradeRequests.requestedTier,
    status: tierUpgradeRequests.status,
    rejectionReason: tierUpgradeRequests.rejectionReason,
    submittedAt: tierUpgradeRequests.submittedAt,
    reviewedAt: tierUpgradeRequests.reviewedAt,
    documentCount: tierUpgradeRequests.documentCount,
    createdAt: tierUpgradeRequests.createdAt,
    updatedAt: tierUpgradeRequests.updatedAt,
  })
  .from(tierUpgradeRequests)
  .leftJoin(users, eq(tierUpgradeRequests.userId, users.id))
  .where(eq(tierUpgradeRequests.status, 'pending'));
}

// Helper function to sync user tiers from approved requests (runs on startup)
async function initializeUserTiersFromApprovedRequests(): Promise<void> {
  try {
    const approvedRequests = await db.select().from(tierUpgradeRequests).where(eq(tierUpgradeRequests.status, 'approved'));
    for (const request of approvedRequests) {
      await db.update(users)
        .set({ membershipTier: request.requestedTier })
        .where(eq(users.id, request.userId));
    }
  } catch (error) {
    console.error("Error initializing user tiers from approved requests:", error);
  }
}

// Helper function to approve a request and update user tier
async function approveBuyerUpgrade(id: string): Promise<TierUpgradeRequest | null> {
  try {
    const [request] = await db.select().from(tierUpgradeRequests).where(eq(tierUpgradeRequests.id, id)).limit(1);
    if (request) {
      await db.update(tierUpgradeRequests)
        .set({
          status: 'approved',
          reviewedAt: new Date(),
          updatedAt: new Date(),
        })
        .where(eq(tierUpgradeRequests.id, id));

      // Update user's membershipTier
      await db.update(users)
        .set({ membershipTier: request.requestedTier })
        .where(eq(users.id, request.userId));

      // Return updated request
      const [updatedRequest] = await db.select().from(tierUpgradeRequests).where(eq(tierUpgradeRequests.id, id)).limit(1);
      return updatedRequest;
    }
  } catch (error) {
    console.error("Error approving buyer upgrade:", error);
  }
  return null;
}

// Helper function to reject a request
async function rejectBuyerUpgrade(id: string, reason: string): Promise<TierUpgradeRequest | null> {
  try {
    await db.update(tierUpgradeRequests)
      .set({
        status: 'rejected',
        rejectionReason: reason,
        reviewedAt: new Date(),
        updatedAt: new Date(),
      })
      .where(eq(tierUpgradeRequests.id, id));

    const [updatedRequest] = await db.select().from(tierUpgradeRequests).where(eq(tierUpgradeRequests.id, id)).limit(1);
    return updatedRequest;
  } catch (error) {
    console.error("Error rejecting buyer upgrade:", error);
  }
  return null;
}

// Helper function to revert a request to draft
async function revertBuyerUpgrade(id: string): Promise<TierUpgradeRequest | null> {
  try {
    await db.update(tierUpgradeRequests)
      .set({
        status: 'draft',
        rejectionReason: null,
        reviewedAt: null,
        updatedAt: new Date(),
      })
      .where(eq(tierUpgradeRequests.id, id));

    const [updatedRequest] = await db.select().from(tierUpgradeRequests).where(eq(tierUpgradeRequests.id, id)).limit(1);
    return updatedRequest;
  } catch (error) {
    console.error("Error reverting buyer upgrade:", error);
  }
  return null;
}

// ============================================================================
// In-Memory State Management (continued)
// ============================================================================

async function requireAnalyticsAccess(req: any, res: any, next: any) {
  try {
    const userId = req.user?.claims?.sub || req.user?.id;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user = await storage.getUser(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const tier = user.membershipTier || 'basic';

    // Only Standard and Premium tiers have analytics access
    if (tier === 'basic') {
      return res.status(403).json({
        message: "Analytics access requires Standard or Premium membership",
        upgradeRequired: true,
        currentTier: tier
      });
    }

    next();
  } catch (error) {
    console.error("Error checking analytics access:", error);
    res.status(500).json({ message: "Failed to verify access" });
  }
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Initialize user tiers from approved requests on startup
  await initializeUserTiersFromApprovedRequests();

  // Middleware to convert Clerk auth to req.user for compatibility
  app.use(async (req: any, res, next) => {
    try {
      if (req.auth?.userId) {
        // Sync user with database and set req.user
        const user = await syncClerkUser(req.auth.userId);
        req.user = {
          id: user.id,
          clerkId: user.clerkId,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role || 'buyer', // Ensure role defaults to 'buyer' if not set
          claims: {
            sub: req.auth.userId
          }
        };
      }
    } catch (error) {
      console.error('Error in user sync middleware:', error);
      // Don't fail the request, just continue without user
    }
    next();
  });

  // ========================================================================
  // Health Check Endpoint (for monitoring services like Render, Vercel, etc.)
  // ========================================================================
  app.get('/api/health', (req, res) => {
    res.json({
      status: 'ok',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'development'
    });
  });

  // ========================================================================
  // Seed Demo Users (Important for database consistency)
  // ========================================================================
  try {
    const demoUsers = [
      {
        id: 'test-admin-123',
        email: 'admin@fusionmining.com',
        firstName: 'Admin',
        lastName: 'User',
        role: 'admin',
      },
      {
        id: 'test-seller-456',
        email: 'ray@fusionmining.com',
        firstName: 'Ray',
        lastName: 'Pass',
        role: 'seller',
      },
      {
        id: 'test-buyer-789',
        email: 'henry@fusionmining.com',
        firstName: 'Henry',
        lastName: 'Pass',
        role: 'buyer',
      },
    ];

    for (const demoUser of demoUsers) {
      try {
        const existing = await storage.getUser(demoUser.id);
        if (!existing) {
          console.log('[SEED] Creating demo user:', demoUser.id);
          await storage.upsertUser({
            id: demoUser.id,
            email: demoUser.email,
            firstName: demoUser.firstName,
            lastName: demoUser.lastName,
          });
          await storage.updateUserRole(demoUser.id, demoUser.role);
          console.log('[SEED] Demo user created:', demoUser.id);
        }
      } catch (error) {
        console.error('[SEED] Error creating demo user:', demoUser.id, error);
      }
    }
  } catch (error) {
    console.error('[SEED] Error during demo user seeding:', error);
  }

  // ========================================================================
  // Quick Login for DEMO/TESTING ONLY
  // ========================================================================
  // Create/Login Test User Endpoint
  app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;

    // Check custom credentials map
    const credential = customTestCredentials.get(username);
    if (credential && credential.password === password) {
      // Mock successful login
      // Ideally this would set a session, but without session middleware visible, 
      // we assume the client might be handling some state or this is just for verification.
      // However, to make it useful, we should probably try to login if passport is available.
      // Since we don't see passport setup here, we return the user info.
      // Set a cookie for the server to recognize this test user in requireAuth
      res.cookie('test_user_id', credential.userId, {
        httpOnly: true,
        path: '/',
        maxAge: 24 * 60 * 60 * 1000 // 1 day
      });

      return res.json({
        message: "Login successful",
        user: {
          id: credential.userId,
          username: credential.username,
          firstName: credential.firstName,
          lastName: credential.lastName,
          role: credential.role
        }
      });
    }

    return res.status(401).json({ message: "Invalid credentials" });
  });

  // Register Test Credential Endpoint (DEVELOPMENT ONLY)
  // ========================================================================
  app.post('/api/register-test-credential', async (req, res) => {
    const { username, password, firstName, lastName, role } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }

    // Check if username already exists
    if (customTestCredentials.has(username)) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    // Generate a unique user ID
    const userId = `test-${role}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    // Create the test credential
    const credential: TestCredential = {
      username,
      password,
      userId,
      role: (role as 'admin' | 'buyer' | 'seller') || 'buyer',
      firstName: firstName || 'Test',
      lastName: lastName || 'User'
    };

    customTestCredentials.set(username, credential);

    // Persist the user to the database so syncClerkUser can find it
    // This is critical for role persistence
    try {
      await storage.upsertUser({
        id: userId,
        email: `${username}@test.local`, // Mock email
        firstName: credential.firstName,
        lastName: credential.lastName,
        role: credential.role,
        clerkId: userId, // Use userId as clerkId for consistency in lookups
      });
      console.log('[REGISTER TEST CREDENTIAL] Persisted user to DB:', userId);
    } catch (dbError) {
      console.error('[REGISTER TEST CREDENTIAL] Failed to persist user:', dbError);
      // We continue anyway, as the in-memory map might save us for login, 
      // but role checks might fail later if DB record is missing.
    }

    console.log('[REGISTER TEST CREDENTIAL] Registered:', username, 'with role:', role);

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

  app.post('/api/messages/mark-read', requireAuth, async (req: any, res) => {
    try {
      const userId = getUserId(req);
      if (!userId) {
        return res.status(401).json({ message: 'User not authenticated' });
      }

      const { messageIds } = req.body;

      if (!Array.isArray(messageIds)) {
        return res.status(400).json({ message: "messageIds must be an array" });
      }

      // Only mark messages as read if the user is the receiver
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
  // Logout endpoint
  app.post('/api/logout', async (req: any, res) => {
    const userId = req.user?.id || req.user?.claims?.sub;

    req.logout(async () => {
      // Log logout activity
      if (userId) {
        try {
          const ipAddress = (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() ||
            (req.headers['x-real-ip'] as string) ||
            req.ip ||
            req.socket.remoteAddress ||
            null;
          await storage.createActivityLog({
            userId,
            activityType: 'logout',
            description: `User logged out`,
            ipAddress,
            userAgent: req.get('user-agent') || null,
          });
        } catch (logError) {
          console.error('[ACTIVITY LOG] Failed to log logout:', logError);
        }
      }

      res.json({ message: "Logout successful" });
    });
  });

  // Get current user endpoint
  app.get('/api/auth/user', requireAuth, async (req: any, res) => {
    try {
      // For JWT-authenticated users (development), use the user data from requireAuth
      if (req.user && process.env.NODE_ENV !== 'production') {
        const user = req.user;

        // Fetch admin permissions for admin users
        let adminPerms = null;
        if (user.role === 'admin') {
          // Set permissions based on adminRole from JWT or default
          const adminRole = (req.auth?.user?.publicMetadata?.adminRole) || 'super_admin';
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
            adminRole: adminRole
          };
          console.log('[AUTH/USER] Retrieved admin permissions for JWT user:', adminRole);
        }

        return res.json({ ...user, adminPermissions: adminPerms });
      }

      // For production/Clerk users, sync with Clerk
      const clerkUserId = req.auth.userId;
      const user = await syncClerkUser(clerkUserId);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Fetch admin permissions for admin users
      let adminPerms = undefined as any;
      if (user.role === 'admin') {
        try {
          adminPerms = await storage.getAdminPermissions(user.id);
          console.log('[AUTH/USER] Retrieved admin permissions for user:', adminPerms?.adminRole);
        } catch (e) {
          console.error('[AUTH/USER] Error getting admin permissions:', e);
        }
      }

      res.json({ ...user, adminPermissions: adminPerms || null });
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  app.get('/api/test-accounts', async (req, res) => {
    try {
      const testAccounts = [
        { id: 'test-admin-super', email: 'superadmin@fusionmining.com', role: 'admin', name: 'Super Admin', adminRole: 'super_admin', credentials: 'superadmin / super123' },
        { id: 'test-admin-verification', email: 'verifyadmin@fusionmining.com', role: 'admin', name: 'Verification Admin', adminRole: 'verification_admin', credentials: 'verifyadmin / verify123' },
        { id: 'test-admin-content', email: 'contentadmin@fusionmining.com', role: 'admin', name: 'Content Admin', adminRole: 'content_admin', credentials: 'contentadmin / content123' },
        { id: 'test-admin-support', email: 'supportadmin@fusionmining.com', role: 'admin', name: 'Support Admin', adminRole: 'support_admin', credentials: 'supportadmin / support123' },
        { id: 'test-admin-analytics', email: 'analyticsadmin@fusionmining.com', role: 'admin', name: 'Analytics Admin', adminRole: 'analytics_admin', credentials: 'analyticsadmin / analytics123' },
        { id: 'test-seller-456', email: 'ray@fusionmining.com', role: 'seller', name: 'Ray Pass', credentials: 'ray / ray123' },
        { id: 'test-buyer-789', email: 'henry@fusionmining.com', role: 'buyer', name: 'Henry Pass', credentials: 'henry / henry123' },
      ];
      res.json(testAccounts);
    } catch (error) {
      console.error("Error fetching test accounts:", error);
      res.status(500).json({ message: "Failed to fetch test accounts" });
    }
  });

  // Contact settings endpoint
  app.get('/api/contact-settings', async (req, res) => {
    try {
      const settings = await storage.getContactSettings();
      if (!settings) {
        return res.status(404).json({ message: 'Contact settings not found' });
      }
      res.json(settings);
    } catch (error) {
      console.error('Error fetching contact settings:', error);
      res.status(500).json({ message: 'Failed to fetch contact settings' });
    }
  });

  // Public endpoint to fetch a lightweight admin contact (id, name, email)
  // This allows the client to address in-app messages to the admin without
  // exposing the admin-only user listing endpoints.
  app.get('/api/admin/contact-user', async (req, res) => {
    try {
      const adminUser = await storage.getAdminUser();
      if (!adminUser) {
        return res.status(404).json({ message: 'Admin user not found' });
      }
      res.json({
        id: adminUser.id,
        email: adminUser.email,
        firstName: adminUser.firstName,
        lastName: adminUser.lastName,
        name: `${adminUser.firstName || ''} ${adminUser.lastName || ''}`.trim(),
      });
    } catch (error) {
      console.error('Error fetching admin contact user:', error);
      res.status(500).json({ message: 'Failed to fetch admin contact' });
    }
  });

  // Development-only: update contact settings quickly
  if (process.env.NODE_ENV === 'development') {
    app.post('/api/contact-settings', async (req, res) => {
      try {
        const payload = req.body || {};
        // Allow partial updates
        const updated = await storage.updateContactSettings(payload);
        res.json(updated);
      } catch (error) {
        console.error('Error updating contact settings:', error);
        res.status(500).json({ message: 'Failed to update contact settings' });
      }
    });
  }

  app.post('/api/seed-data', async (req, res) => {
    try {
      // Create test users with different membership tiers
      const testUsers = [
        {
          id: 'test-admin-123',
          email: 'admin@fusionmining.com',
          firstName: 'Admin',
          lastName: 'User',
          role: 'admin',
          membershipTier: 'premium'
        },
        {
          id: 'test-seller-456',
          email: 'ray@fusionmining.com',
          firstName: 'Ray',
          lastName: 'Pass',
          role: 'seller',
          membershipTier: 'premium'
        },
        {
          id: 'test-buyer-789',
          email: 'henry@fusionmining.com',
          firstName: 'Henry',
          lastName: 'Pass',
          role: 'buyer',
          membershipTier: 'standard'
        },
        {
          id: 'test-buyer-basic-001',
          email: 'alice@example.com',
          firstName: 'Alice',
          lastName: 'Johnson',
          role: 'buyer',
          membershipTier: 'basic'
        },
        {
          id: 'test-buyer-premium-002',
          email: 'bob@example.com',
          firstName: 'Bob',
          lastName: 'Williams',
          role: 'buyer',
          membershipTier: 'premium'
        },
        {
          id: 'test-seller-standard-003',
          email: 'carol@example.com',
          firstName: 'Carol',
          lastName: 'Davis',
          role: 'seller',
          membershipTier: 'standard'
        },
      ];

      for (const userData of testUsers) {
        try {
          let user = await storage.getUser(userData.id);
          if (!user) {
            user = await storage.upsertUser({
              id: userData.id,
              email: userData.email,
              firstName: userData.firstName,
              lastName: userData.lastName,
            });
            await storage.updateUserRole(userData.id, userData.role);
            // Set membership tier
            await db.update(users).set({ membershipTier: userData.membershipTier as any }).where(eq(users.id, userData.id));
          }
        } catch (error) {
          console.error(`Error creating user ${userData.id}:`, error);
        }
      }

      // Seed projects using storage interface
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
          estimatedValue: "$500M - $1B",
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
          estimatedValue: "$100M - $300M",
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
          estimatedValue: "$50M - $150M",
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
          estimatedValue: "$200M - $400M",
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
          estimatedValue: "$75M - $200M",
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
          estimatedValue: "$120M - $250M",
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
          estimatedValue: "$400M - $800M",
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
          estimatedValue: "$300M - $600M",
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
          estimatedValue: "$80M - $150M",
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
          estimatedValue: "$25M - $60M",
        },
      ];

      for (const project of projectsData) {
        try {
          await storage.createProject(project as any);
        } catch (error) {
          // Ignore duplicates
        }
      }

      // Seed marketplace listings - 10 total from different sellers
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
          status: "approved",
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
          status: "approved",
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
          status: "approved",
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
          status: "pending",
        },
        {
          sellerId: "test-seller-456",
          type: "partnership",
          title: "Joint Venture - Copper Mine Expansion",
          description: "Seeking strategic partner for expanding existing copper mining operations. Proven reserves, established infrastructure, and experienced team in place.",
          location: "Copperbelt",
          status: "approved",
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
          status: "approved",
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
          status: "approved",
        },
        {
          sellerId: "test-seller-standard-003",
          type: "service",
          title: "Mining Consulting Services",
          description: "Experienced mining consultants offering geological surveys, feasibility studies, and operational optimization services.",
          location: "Nationwide",
          status: "approved",
        },
        {
          sellerId: "test-seller-standard-003",
          type: "partnership",
          title: "Small-Scale Gold Mining Partnership",
          description: "Looking for investment partner for small-scale gold mining operation. Low entry cost with good potential returns.",
          location: "Northern Province",
          status: "pending",
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
          status: "approved",
        },
      ];

      for (const listing of listingsData) {
        try {
          await storage.createMarketplaceListing(listing as any);
        } catch (error) {
          // Ignore duplicates
        }
      }

      // Seed buyer requests - 8 total to demonstrate tier limits
      // 1 from basic (test-buyer-basic-001), 3 from standard (test-buyer-789), 4 from premium (test-buyer-premium-002)
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
          status: "active",
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
          status: "active",
        },
        {
          buyerId: "test-buyer-789",
          title: "High-Quality Emerald Procurement",
          description: "Luxury jewelry company seeks premium grade emeralds. Looking for certified stones with excellent clarity and color. Long-term partnership preferred.",
          mineralType: "Emerald",
          quantity: "1,000+ carats quarterly",
          budget: "$5-10M per quarter",
          location: "Copperbelt preferred",
          status: "active",
        },
        {
          buyerId: "test-buyer-789",
          title: "Cobalt for Battery Manufacturing",
          description: "Battery manufacturer requires sustainable cobalt supply chain. Looking for ethically sourced, battery-grade cobalt with full traceability.",
          mineralType: "Cobalt",
          quantity: "5,000 tonnes annually",
          budget: "$150-200M annually",
          location: "Any region with export capability",
          status: "active",
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
          status: "active",
        },
        {
          buyerId: "test-buyer-premium-002",
          title: "Rare Earth Elements Sourcing",
          description: "Technology company seeking rare earth elements for manufacturing. Looking for sustainable and ethical suppliers.",
          mineralType: "Rare Earth Elements",
          quantity: "1,000 tonnes",
          budget: "$50M",
          location: "Any region",
          status: "active",
        },
        {
          buyerId: "test-buyer-premium-002",
          title: "Gemstone Investment Portfolio",
          description: "Investment firm building gemstone portfolio. Interested in emeralds, amethysts, and other precious stones from certified sources.",
          mineralType: "Mixed Gemstones",
          quantity: "Various lots",
          budget: "$10-20M",
          location: "Nationwide",
          status: "active",
        },
        {
          buyerId: "test-buyer-premium-002",
          title: "Manganese Ore for Steel Production",
          description: "Steel manufacturer requires high-grade manganese ore. Looking for reliable supply chain with export capabilities.",
          mineralType: "Manganese",
          quantity: "20,000 tonnes annually",
          budget: "$15M annually",
          location: "Any major mining region",
          status: "active",
        },
      ];

      for (const request of requestsData) {
        try {
          await storage.createBuyerRequest(request as any);
        } catch (error) {
          // Ignore duplicates
        }
      }

      // Tier usage is tracked automatically when RFQs are created

      // Seed blog posts
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
          published: true,
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
          published: true,
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
          published: true,
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
          published: true,
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
          published: true,
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
          published: true,
        },
      ];

      for (const post of blogPostsData) {
        try {
          await storage.createBlogPost(post as any);
        } catch (error) {
          // Ignore duplicates
        }
      }

      res.json({
        message: "Sample data seeded successfully with membership tiers",
        results: {
          users: testUsers.length,
          projects: projectsData.length,
          marketplaceListings: listingsData.length,
          buyerRequests: requestsData.length,
          blogPosts: blogPostsData.length,
        }
      });
    } catch (error) {
      console.error("Error seeding data:", error);
      res.status(500).json({ message: "Failed to seed data" });
    }
  });

  app.post('/api/seed-message-templates', async (req, res) => {
    try {
      const templates = [
        {
          name: 'Buyer Interest Confirmation',
          type: 'buyer_interest_to_buyer',
          subject: 'Thank you for your interest in {project_name}',
          content: 'Hello {buyer_name},\n\nThank you for expressing interest in {project_name}. Our admin team has been notified and will review your request shortly. We will get back to you with more information soon.\n\nBest regards,\nFusion Mining Limited',
          active: true,
        },
        {
          name: 'Admin Interest Notification',
          type: 'buyer_interest_to_admin',
          subject: 'New buyer interest in {project_name}',
          content: 'A new buyer ({buyer_name}) has expressed interest in {project_name}. Please review and respond accordingly.\n\nYou can view the details in your admin panel.',
          active: true,
        },
        {
          name: 'Seller Interest Notification',
          type: 'buyer_interest_to_seller',
          subject: 'New buyer interest in {listing_title}',
          content: 'Good news! A buyer ({buyer_name}) has expressed interest in your listing: {listing_title}.\n\nThe admin team will coordinate with them and keep you informed about the next steps.\n\nBest regards,\nFusion Mining Limited',
          active: true,
        },
      ];

      for (const template of templates) {
        await storage.createMessageTemplate(template as any);
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

  app.post('/api/seed-membership-benefits', async (req, res) => {
    try {
      const benefits = [
        {
          tier: 'basic',
          maxActiveRFQs: 1,
          canAccessAnalytics: false,
          canDirectMessage: false,
          prioritySupport: false,
          visibilityRanking: 3,
          monthlyPrice: '0',
        },
        {
          tier: 'standard',
          maxActiveRFQs: 5,
          canAccessAnalytics: true,
          canDirectMessage: true,
          prioritySupport: false,
          visibilityRanking: 2,
          monthlyPrice: '50',
        },
        {
          tier: 'premium',
          maxActiveRFQs: -1, // unlimited
          canAccessAnalytics: true,
          canDirectMessage: true,
          prioritySupport: true,
          visibilityRanking: 1,
          monthlyPrice: '200',
        },
      ];

      for (const benefit of benefits) {
        try {
          await storage.createMembershipBenefit(benefit as any);
        } catch (error) {
          // Ignore duplicates
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
      await db.execute(sql`select 1 from "platform_settings" limit 1`);
    } catch (err: any) {
      if (err?.code !== '42P01') throw err;

      // Create enum if missing
      await db.execute(sql`
          DO $$
          BEGIN
            IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'setting_data_type') THEN
              CREATE TYPE setting_data_type AS ENUM ('boolean', 'number', 'string', 'json');
            END IF;
          END $$;
        `);

      // Create platform_settings table if missing
      await db.execute(sql`
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

      // Create settings_audit table if missing
      await db.execute(sql`
          CREATE TABLE IF NOT EXISTS "settings_audit" (
            "id" varchar PRIMARY KEY DEFAULT gen_random_uuid(),
            "setting_key" varchar(100) NOT NULL,
            "old_value" text,
            "new_value" text NOT NULL,
            "changed_by" varchar NOT NULL REFERENCES "users"("id"),
            "changed_at" timestamptz NOT NULL DEFAULT now()
          );
        `);

      await db.execute(sql`CREATE INDEX IF NOT EXISTS "IDX_settings_audit_key" ON "settings_audit" ("setting_key");`);
      await db.execute(sql`CREATE INDEX IF NOT EXISTS "IDX_settings_audit_changed_by" ON "settings_audit" ("changed_by");`);
      await db.execute(sql`CREATE INDEX IF NOT EXISTS "IDX_settings_audit_changed_at" ON "settings_audit" ("changed_at");`);
    }
  }

  app.post('/api/seed-platform-settings', async (req, res) => {
    try {
      await ensurePlatformSettingsTables();

      const settings = [
        {
          key: 'platform_name',
          value: 'Fusion Mining Limited',
          description: 'Name of the platform',
          category: 'general',
          dataType: 'string' as const,
          isPublic: true,
        },
        {
          key: 'platform_tagline',
          value: 'B2B Mining Marketplace & Investment Platform',
          description: 'Platform tagline and description',
          category: 'general',
          dataType: 'string' as const,
          isPublic: true,
        },
        {
          key: 'commission_rate',
          value: '5',
          description: 'Platform commission rate on transactions (percentage)',
          category: 'payment',
          dataType: 'number' as const,
          isPublic: false,
        },
        {
          key: 'support_email',
          value: 'support@fusionmining.com',
          description: 'Contact email for platform support',
          category: 'email',
          dataType: 'string' as const,
          isPublic: true,
        },
        {
          key: 'smtp_enabled',
          value: 'false',
          description: 'Enable SMTP email sending',
          category: 'email',
          dataType: 'boolean' as const,
          isPublic: false,
        },
        {
          key: 'maintenance_mode',
          value: 'false',
          description: 'Enable/disable maintenance mode',
          category: 'general',
          dataType: 'boolean' as const,
          isPublic: false,
        },
        {
          key: 'max_upload_size_mb',
          value: '10',
          description: 'Maximum file upload size in megabytes',
          category: 'general',
          dataType: 'number' as const,
          isPublic: false,
        },
        {
          key: 'auto_approve_listings',
          value: 'false',
          description: 'Automatically approve marketplace listings without admin review',
          category: 'general',
          dataType: 'boolean' as const,
          isPublic: false,
        },
        {
          key: 'session_timeout_hours',
          value: '24',
          description: 'User session timeout in hours',
          category: 'security',
          dataType: 'number' as const,
          isPublic: false,
        },
        {
          key: 'require_email_verification',
          value: 'true',
          description: 'Require users to verify their email address',
          category: 'security',
          dataType: 'boolean' as const,
          isPublic: false,
        },
        {
          key: 'stripe_enabled',
          value: 'false',
          description: 'Enable Stripe payment processing',
          category: 'payment',
          dataType: 'boolean' as const,
          isPublic: false,
        },
      ];

      for (const setting of settings) {
        try {
          await storage.createPlatformSetting(setting as any);
        } catch (error: any) {
          // Ignore duplicates and keep going
          if (error?.code !== '23505') {
            console.warn('Seed setting skipped:', setting.key, error?.message);
          }
        }
      }

      // Return the latest snapshot so the client can refresh immediately
      const allSettings = await storage.getAllPlatformSettings();

      res.json({
        message: "Platform settings seeded successfully",
        count: allSettings.length,
        settings: allSettings,
      });
    } catch (error) {
      console.error("Error seeding platform settings:", error);
      res.status(500).json({ message: "Failed to seed platform settings" });
    }
  });

  // ========================================================================
  // Platform Settings Routes (Admin Only)
  // ========================================================================
  app.get('/api/platform-settings', requireAuth, requireAdmin, async (req, res) => {
    try {
      const settings = await storage.getAllPlatformSettings();
      res.json(settings);
    } catch (error) {
      console.error("Error fetching platform settings:", error);
      res.status(500).json({ message: "Failed to fetch platform settings" });
    }
  });

  // ========================================================================
  // Membership Benefits Routes
  // ========================================================================
  app.get('/api/membership-benefits', async (req, res) => {
    try {
      const benefits = await storage.getAllMembershipBenefits();
      res.json(benefits);
    } catch (error) {
      console.error("Error fetching membership benefits:", error);
      res.status(500).json({ message: "Failed to fetch membership benefits" });
    }
  });

  app.put('/api/admin/membership-benefits/:tier', requireAuth, requireAdmin, async (req, res) => {
    try {
      const { tier } = req.params;
      const updated = await storage.updateMembershipBenefit(tier, req.body);
      res.json(updated);
    } catch (error) {
      console.error("Error updating membership benefit:", error);
      res.status(500).json({ message: "Failed to update membership benefit" });
    }
  });

  app.post('/api/admin/users/:userId/tier', requireAuth, requireAdmin, async (req, res) => {
    try {
      const { userId } = req.params;
      const { tier } = req.body;

      if (!tier || !['basic', 'standard', 'premium'].includes(tier)) {
        return res.status(400).json({ message: "Invalid tier" });
      }

      const updated = await storage.updateUserMembershipTier(userId, tier);
      res.json(updated);
    } catch (error) {
      console.error("Error updating user tier:", error);
      res.status(500).json({ message: "Failed to update user tier" });
    }
  });

  app.post('/api/admin/users/:userId/verification-status', requireAuth, requireAdmin, async (req, res) => {
    try {
      const { userId } = req.params;
      const { status } = req.body;

      if (!status || !['not_requested', 'pending', 'approved', 'rejected'].includes(status)) {
        return res.status(400).json({ message: "Invalid verification status" });
      }

      // Verify the user exists and is a seller
      const targetUser = await storage.getUserById(userId);
      if (!targetUser) {
        return res.status(404).json({ message: "User not found" });
      }

      if (targetUser.role !== 'seller') {
        return res.status(400).json({ message: "Verification status can only be updated for sellers" });
      }

      const updated = await storage.updateUserVerificationStatus(userId, status);
      res.json(updated);
    } catch (error) {
      console.error("Error updating user verification status:", error);
      res.status(500).json({ message: "Failed to update user verification status" });
    }
  });

  app.post('/api/admin/seed-sample-data', requireAuth, requireAdmin, async (req, res) => {
    try {
      // Seed comprehensive sample data for testing
      const results = {
        users: 0,
        projects: 0,
        listings: 0,
        buyerRequests: 0,
        blogPosts: 0,
      };

      // Create sample users with different tiers
      const sampleUsers = [
        {
          email: "basic.user@fusionmining.com",
          password: await bcrypt.hash("basic123", 10),
          firstName: "Basic",
          lastName: "User",
          role: "buyer" as const,
          membershipTier: "basic" as const,
        },
        {
          email: "standard.user@fusionmining.com",
          password: await bcrypt.hash("standard123", 10),
          firstName: "Standard",
          lastName: "User",
          role: "buyer" as const,
          membershipTier: "standard" as const,
        },
        {
          email: "premium.user@fusionmining.com",
          password: await bcrypt.hash("premium123", 10),
          firstName: "Premium",
          lastName: "User",
          role: "buyer" as const,
          membershipTier: "premium" as const,
        },
        {
          email: "seller.verified@fusionmining.com",
          password: await bcrypt.hash("seller123", 10),
          firstName: "Verified",
          lastName: "Seller",
          role: "seller" as const,
          membershipTier: "premium" as const,
        },
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

  // ========================================================================
  // Auth Routes
  // ========================================================================
  app.post('/api/register', async (req, res) => {
    try {
      const { email, password, firstName, lastName, role, membershipTier } = req.body;

      if (!email || !password || !firstName || !lastName || !role) {
        return res.status(400).json({ message: 'Missing required fields' });
      }

      // Check if user already exists
      const existingUser = await storage.getUserByEmail(email);
      if (existingUser) {
        return res.status(400).json({ message: 'User with this email already exists' });
      }

      // Hash the password with bcrypt (salt rounds = 10)
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create user with hashed password
      const user = await storage.upsertUser({
        email,
        password: hashedPassword,
        firstName,
        lastName,
      });

      // Update role and membership tier
      await storage.updateUserRole(user.id, role);

      // Update membership tier if provided
      if (membershipTier && ['basic', 'standard', 'premium'].includes(membershipTier)) {
        await db.update(users).set({ membershipTier: membershipTier as any }).where(eq(users.id, user.id));
      }

      // Create default profile
      await storage.createUserProfile({
        userId: user.id,
        profileType: 'individual',
        verified: false,
      });

      // Get updated user with tier
      const updatedUser = await storage.getUser(user.id);

      res.json({
        success: true,
        message: 'Registration successful',
        user: updatedUser
      });
    } catch (error) {
      console.error("Error during registration:", error);
      res.status(500).json({ message: "Registration failed" });
    }
  });

  // ========================================================================
  // Auth Routes
  // ========================================================================
  app.get('/api/auth/user', requireAuth, async (req: any, res) => {
    try {
      const clerkUserId = req.auth.userId;
      if (!clerkUserId) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      // Sync user with database
      const { syncClerkUser } = await import('./localAuth');
      const user = await syncClerkUser(clerkUserId);

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      let adminPerms = undefined;

      // Retrieve admin permissions for admin users
      if (user.role === 'admin') {
        try {
          adminPerms = await storage.getAdminPermissions(user.id);
          console.log('[AUTH/USER] Retrieved admin permissions:', adminPerms?.adminRole);
        } catch (e) {
          console.error('Error getting admin permissions:', e);
        }
      }

      res.json({
        user: {
          ...user,
          adminPermissions: adminPerms,
        },
      });
    } catch (error) {
      console.error('Error in /api/auth/user:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  // ========================================================================
  // Admin Permissions Routes
  // ========================================================================

  // Helper function to get permissions based on admin role
  function getPermissionsForRole(role: string) {
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
      canForceLogout: false,
    };

    switch (role) {
      case 'super_admin':
        return { ...basePerms, ...Object.keys(basePerms).reduce((acc, key) => ({ ...acc, [key]: true }), {}) };
      case 'verification_admin':
        return { ...basePerms, canManageVerification: true, canManageListings: true, canAccessAuditLogs: true, canManageUsers: true };
      case 'content_admin':
        return { ...basePerms, canManageBlog: true, canManageCMS: true, canManageSettings: true };
      case 'support_admin':
        return { ...basePerms, canManageMessages: true, canManageUsers: true, canAccessAuditLogs: true };
      case 'analytics_admin':
        return { ...basePerms, canViewAnalytics: true, canAccessAuditLogs: true };
      default:
        return basePerms;
    }
  }

  app.get('/api/admin/users/:id/permissions', requireAuth, requireAdmin, requireAdminPermission('canManageUsers'), async (req, res) => {
    try {
      const perms = await storage.getAdminPermissions(req.params.id);
      res.json(perms || null);
    } catch (error) {
      console.error('Error fetching admin permissions:', error);
      res.status(500).json({ message: 'Failed to fetch admin permissions' });
    }
  });

  app.patch('/api/admin/users/:id/permissions', requireAuth, requireAdmin, requireAdminPermission('canManageUsers'), async (req: any, res) => {
    try {
      const adminUserId = req.params.id;
      const adminRole = req.body?.adminRole || 'content_admin';
      const rolePerms = getPermissionsForRole(adminRole);

      const payload = {
        adminUserId,
        adminRole,
        ...rolePerms,
      };
      const updated = await storage.upsertAdminPermissions(payload as any);
      res.json(updated);
    } catch (error) {
      console.error('Error updating admin permissions:', error);
      res.status(500).json({ message: 'Failed to update admin permissions' });
    }
  });

  // Start a general conversation with any user (admin)
  app.post('/api/admin/messages/start', requireAuth, requireAdmin, requireAdminPermission('canManageMessages'), async (req: any, res) => {
    try {
      const adminId = req.user.claims?.sub || req.user.id;
      const { receiverId, subject, content } = req.body || {};
      if (!receiverId || !content) {
        return res.status(400).json({ message: 'receiverId and content are required' });
      }
      // Create a general thread (no project/listing)
      const thread = await storage.createMessageThread({
        title: subject || 'Admin message',
        type: 'general',
        buyerId: null,
        sellerId: null,
        adminId,
        createdBy: adminId,
        context: 'general',
        status: 'open',
      } as any);

      const message = await storage.createMessage({
        threadId: thread.id,
        senderId: adminId,
        receiverId,
        subject: subject || null,
        content,
        context: 'general',
        isAutoRelay: false,
      } as any);

      await storage.updateThreadLastMessage(thread.id);
      res.json({ thread, message });
    } catch (error) {
      console.error('Error starting admin conversation:', error);
      res.status(500).json({ message: 'Failed to start conversation' });
    }
  });

  // Start a context-specific thread (listing/project) with a target user
  app.post('/api/admin/threads/start', requireAuth, requireAdmin, requireAdminPermission('canManageMessages'), async (req: any, res) => {
    try {
      const adminId = req.user.claims?.sub || req.user.id;
      const { receiverId, subject, content, listingId, projectId } = req.body || {};
      if (!receiverId || !content || (!listingId && !projectId)) {
        return res.status(400).json({ message: 'receiverId, content and listingId/projectId are required' });
      }

      const thread = await storage.createMessageThread({
        title: subject || 'Admin message',
        type: listingId ? 'admin_to_seller' : (projectId ? 'admin_to_buyer' : 'general'),
        projectId: projectId || null,
        listingId: listingId || null,
        buyerId: projectId ? receiverId : null,
        sellerId: listingId ? receiverId : null,
        adminId,
        createdBy: adminId,
        context: listingId ? 'marketplace' : (projectId ? 'project_interest' : 'general'),
        status: 'open',
      } as any);

      const message = await storage.createMessage({
        threadId: thread.id,
        senderId: adminId,
        receiverId,
        subject: subject || null,
        content,
        relatedProjectId: projectId || null,
        relatedListingId: listingId || null,
        context: listingId ? 'marketplace' : (projectId ? 'project_interest' : 'general'),
        isAutoRelay: false,
      } as any);

      await storage.updateThreadLastMessage(thread.id);
      res.json({ thread, message });
    } catch (error) {
      console.error('Error starting context thread:', error);
      res.status(500).json({ message: 'Failed to start thread' });
    }
  });

  // ========================================================================
  // User Profile Routes
  // ========================================================================
  app.get('/api/profile', requireAuth, async (req: any, res) => {
    try {
      const userId = getUserId(req);
      if (!userId) {
        return res.status(401).json({ message: 'User not authenticated' });
      }
      const profile = await storage.getUserProfile(userId);
      res.json(profile);
    } catch (error) {
      console.error("Error fetching profile:", error);
      res.status(500).json({ message: "Failed to fetch profile" });
    }
  });

  app.post('/api/profile', requireAuth, async (req: any, res) => {
    try {
      const userId = req.user.claims?.sub || req.user.id;
      const validatedData = insertUserProfileSchema.parse({
        ...req.body,
        userId,
      });
      const profile = await storage.createUserProfile(validatedData);
      res.json(profile);
    } catch (error: any) {
      if (error instanceof ZodError) {
        console.error("Validation error creating profile:", formatZodError(error));
        return res.status(400).json({ message: formatZodError(error) });
      }
      console.error("Error creating profile:", error);
      res.status(500).json({ message: "Failed to create profile" });
    }
  });

  app.patch('/api/profile', requireAuth, async (req: any, res) => {
    try {
      const userId = req.user.claims?.sub || req.user.id;
      const validatedData = updateUserProfileSchema.parse({
        ...req.body,
        userId,
      });
      const profile = await storage.updateUserProfile(validatedData);

      // Log activity
      try {
        await storage.createActivityLog({
          userId,
          activityType: 'profile_updated',
          description: `Updated user profile`,
          ipAddress: (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() || (req.headers['x-real-ip'] as string) || req.ip || req.socket.remoteAddress || null,
          userAgent: req.get('user-agent') || null,
          metadata: { profileId: profile.id },
        });
      } catch (logError) {
        console.error('[ACTIVITY LOG] Failed to log profile update:', logError);
      }

      res.json(profile);
    } catch (error: any) {
      if (error instanceof ZodError) {
        console.error("Validation error updating profile:", formatZodError(error));
        return res.status(400).json({ message: formatZodError(error) });
      }
      console.error("Error updating profile:", error);
      res.status(500).json({ message: "Failed to update profile" });
    }
  });

  // ========================================================================
  // Project Routes
  // ========================================================================
  app.get('/api/projects', async (req: any, res) => {
    try {
      const projects = await storage.getProjects();
      const requireAdmin = req.user && req.user.role === 'admin';

      const filteredProjects = requireAdmin
        ? projects
        : projects.filter(p => p.status === 'active');

      res.json(filteredProjects);
    } catch (error) {
      console.error("Error fetching projects:", error);
      res.status(500).json({ message: "Failed to fetch projects" });
    }
  });

  app.get('/api/projects/:id', async (req, res) => {
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

  app.post('/api/projects', requireAuth, async (req: any, res) => {
    try {
      const userId = req.user.claims?.sub || req.user.id;
      // Defensive check: ensure we have a valid user ID
      if (!userId) {
        return res.status(401).json({ message: "Authentication required" });
      }
      const validatedData = insertProjectSchema.parse(req.body);
      // Always set ownerId from authenticated user to prevent spoofing
      const projectData = {
        ...validatedData,
        ownerId: userId,
      };
      const project = await storage.createProject(projectData);
      res.json(project);
    } catch (error: any) {
      if (error instanceof ZodError) {
        console.error("Validation error creating project:", formatZodError(error));
        return res.status(400).json({ message: formatZodError(error) });
      }
      console.error("Error creating project:", error);
      res.status(500).json({ message: "Failed to create project" });
    }
  });

  app.patch('/api/projects/:id', requireAuth, requireAdmin, async (req: any, res) => {
    try {
      const validatedData = insertProjectSchema.partial().parse(req.body);
      // Prevent changing ownerId via update - only admins should update projects anyway
      const { ownerId, ...updateData } = validatedData;
      const project = await storage.updateProject(req.params.id, updateData);
      res.json(project);
    } catch (error: any) {
      if (error instanceof ZodError) {
        console.error("Validation error updating project:", formatZodError(error));
        return res.status(400).json({ message: formatZodError(error) });
      }
      console.error("Error updating project:", error);
      res.status(500).json({ message: "Failed to update project" });
    }
  });

  app.delete('/api/projects/:id', requireAuth, requireAdmin, async (req, res) => {
    try {
      await storage.deleteProject(req.params.id);
      res.json({ success: true });
    } catch (error) {
      console.error("Error deleting project:", error);
      res.status(500).json({ message: "Failed to delete project" });
    }
  });

  app.patch('/api/projects/:id/close', requireAuth, async (req, res) => {
    try {
      const project = await storage.closeProject(req.params.id);
      res.json(project);
    } catch (error) {
      console.error("Error closing project:", error);
      res.status(500).json({ message: "Failed to close project" });
    }
  });

  app.post('/api/projects/interest', requireAuth, async (req: any, res) => {
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
        userId,
      });
      const interest = await storage.expressProjectInterest(validatedData);

      const buyer = await storage.getUserById(userId);

      if (projectId) {
        const project = await storage.getProjectById(projectId);

        if (project && buyer && project.ownerId) {
          const projectOwner = await storage.getUserById(project.ownerId);

          if (projectOwner) {
            // Create direct thread between buyer and project owner
            const thread = await storage.createMessageThread({
              title: `Inquiry about: ${project.name}`,
              type: 'project_interest',
              projectId,
              buyerId: userId,
              sellerId: project.ownerId,
              adminId: null,
              createdBy: userId,
              context: 'project_interest',
              status: 'open',
            });

            // Notify project owner of interest
            await storage.createNotification({
              userId: project.ownerId,
              type: 'interest_received',
              title: 'New Interest in Your Project',
              message: `${buyer.firstName} ${buyer.lastName} expressed interest in ${project.name}`,
              link: `/dashboard/messages`,
            });

            // Send welcome message from owner to buyer
            const ownerName = `${projectOwner.firstName || ''} ${projectOwner.lastName || ''}`.trim() || 'Project Owner';
            const buyerName = `${buyer.firstName || ''} ${buyer.lastName || ''}`.trim() || 'there';

            await storage.createMessage({
              threadId: thread.id,
              senderId: project.ownerId,
              receiverId: userId,
              subject: `Re: Inquiry about ${project.name}`,
              content: `Hello ${buyerName},\n\nThank you for your interest in ${project.name}. I'm ${ownerName}, the project owner. I'd be happy to discuss this opportunity with you.\n\nPlease feel free to ask any questions you may have.\n\nBest regards,\n${ownerName}`,
              context: 'project_interest',
              relatedProjectId: projectId,
              isAutoRelay: true,
            });
          }
        }
      } else if (listingId) {
        const listing = await storage.getMarketplaceListingById(listingId);
        const seller = listing ? await storage.getUserById(listing.sellerId) : null;

        if (listing && buyer && seller) {
          // Create direct thread between buyer and seller
          const thread = await storage.createMessageThread({
            title: `Inquiry about: ${listing.title}`,
            type: 'marketplace_inquiry',
            listingId,
            buyerId: userId,
            sellerId: listing.sellerId,
            adminId: null,
            createdBy: userId,
            context: 'marketplace',
            status: 'open',
          });

          // Notify seller of interest
          await storage.createNotification({
            userId: seller.id,
            type: 'interest_received',
            title: 'New Interest in Your Listing',
            message: `${buyer.firstName} ${buyer.lastName} expressed interest in ${listing.title}`,
            link: `/dashboard/messages`,
          });

          // Send welcome message from seller to buyer
          const sellerName = `${seller.firstName || ''} ${seller.lastName || ''}`.trim() || 'Seller';
          const buyerName = `${buyer.firstName || ''} ${buyer.lastName || ''}`.trim() || 'there';

          await storage.createMessage({
            threadId: thread.id,
            senderId: listing.sellerId,
            receiverId: userId,
            subject: `Re: Inquiry about ${listing.title}`,
            content: `Hello ${buyerName},\n\nThank you for your interest in ${listing.title}. I'm ${sellerName}, the seller. I'd be happy to provide more information and answer any questions you might have.\n\nFeel free to reach out with your questions.\n\nBest regards,\n${sellerName}`,
            context: 'marketplace',
            relatedListingId: listingId,
            isAutoRelay: true,
          });
        }
      }

      // Create activity log
      await storage.createActivityLog({
        userId,
        activityType: 'interest_expressed',
        description: projectId ? `User expressed interest in project ${projectId}` : `User expressed interest in listing ${listingId}`,
        ipAddress: req.ip,
        userAgent: req.get('user-agent'),
      });

      // Notify all admin users (use 'interest_received' notification type)
      const adminUsers = await storage.getUsersByRole('admin');
      // Resolve a short title for the target (project or listing)
      let titleText = '';
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
          type: 'interest_received',
          title: 'New Interest Expression',
          message: `${buyer?.firstName || ''} ${buyer?.lastName || ''} expressed interest in ${projectId ? 'project' : 'listing'}: ${titleText}`,
          link: projectId ? `/projects/${projectId}` : `/marketplace/${listingId}`,
        });
      }

      res.json(interest);
    } catch (error: any) {
      if (error instanceof ZodError) {
        console.error("Validation error expressing interest:", formatZodError(error));
        return res.status(400).json({ message: formatZodError(error) });
      }
      console.error("Error expressing interest:", error);
      res.status(500).json({ message: "Failed to express interest" });
    }
  });

  app.get('/api/projects/:id/has-interest', requireAuth, async (req: any, res) => {
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

  app.get('/api/admin/projects-interest', requireAuth, requireAdmin, async (req, res) => {
    try {
      const interests = await storage.getAllExpressedInterests();
      res.json(interests);
    } catch (error) {
      console.error("Error fetching expressed interests:", error);
      res.status(500).json({ message: "Failed to fetch expressed interests" });
    }
  });

  // ========================================================================
  // Marketplace Routes
  // ========================================================================
  app.get('/api/marketplace/listings', async (req: any, res) => {
    try {
      const { type, status } = req.query;
      const requireAdmin = req.user && req.user.role === 'admin';
      const listings = await storage.getMarketplaceListings({
        type: type as string,
        status: status as string,
      });

      const filteredListings = requireAdmin
        ? listings
        : listings.filter(l => l.status === 'approved');

      res.json(filteredListings);
    } catch (error) {
      console.error("Error fetching listings:", error);
      res.status(500).json({ message: "Failed to fetch listings" });
    }
  });

  // Dashboard: get current user's listings (sellers)
  app.get('/api/dashboard/listings', requireAuth, async (req: any, res) => {
    try {
      const userId = getUserId(req);
      if (!userId) {
        console.error('No user ID found in request - req.auth:', !!req.auth, 'req.user:', !!req.user);
        return res.status(401).json({ message: 'User not authenticated' });
      }

      // If user is seller, return their listings; otherwise return empty array
      const listings = await storage.getListingsBySellerId(userId);
      res.json(listings || []);
    } catch (error) {
      console.error('Error fetching dashboard listings:', error);
      res.status(500).json({ message: 'Failed to fetch dashboard listings' });
    }
  });

  // Return a single listing including basic seller info (used by client when messages
  // don't include the listing payload).
  app.get('/api/marketplace/listings/:id', async (req, res) => {
    try {
      const listingId = req.params.id;
      const listing = await storage.getMarketplaceListingById(listingId);
      if (!listing) return res.status(404).json({ message: 'Listing not found' });
      const seller = listing.sellerId ? await storage.getUserById(listing.sellerId) : null;
      res.json({
        ...listing,
        sellerName: seller ? `${seller.firstName || ''} ${seller.lastName || ''}`.trim() : undefined,
      });
    } catch (error) {
      console.error('Error fetching listing:', error);
      res.status(500).json({ message: 'Failed to fetch listing' });
    }
  });

  app.post('/api/marketplace/listings', requireAuth, requireSeller, async (req: any, res) => {
    try {
      const sellerId = req.user.claims?.sub || req.user.id;
      const validatedData = insertMarketplaceListingSchema.parse({
        ...req.body,
        sellerId,
      });
      const listing = await storage.createMarketplaceListing(validatedData);

      // Log activity
      try {
        await storage.createActivityLog({
          userId: sellerId,
          activityType: 'listing_created',
          description: `Created marketplace listing: "${listing.title || listing.id}"`,
          ipAddress: (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() || (req.headers['x-real-ip'] as string) || req.ip || req.socket.remoteAddress || null,
          userAgent: req.get('user-agent') || null,
          metadata: { listingId: listing.id, listingType: listing.listingType },
        });
      } catch (logError) {
        console.error('[ACTIVITY LOG] Failed to log listing creation:', logError);
      }

      res.json(listing);
    } catch (error: any) {
      if (error instanceof ZodError) {
        console.error("Validation error creating listing:", formatZodError(error));
        return res.status(400).json({ message: formatZodError(error) });
      }
      console.error("Error creating listing:", error);
      res.status(500).json({ message: "Failed to create listing" });
    }
  });

  app.get('/api/marketplace/buyer-requests', async (req, res) => {
    try {
      const requests = await storage.getBuyerRequests();
      res.json(requests);
    } catch (error) {
      console.error("Error fetching buyer requests:", error);
      res.status(500).json({ message: "Failed to fetch buyer requests" });
    }
  });

  app.get('/api/buyer-requests/latest', async (req, res) => {
    try {
      const requests = await storage.getBuyerRequests();
      // Get latest 6 active requests, sorted by creation date
      const latestRequests = requests
        .filter(r => r.status === 'active')
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, 6);
      res.json(latestRequests);
    } catch (error) {
      console.error("Error fetching latest buyer requests:", error);
      res.status(500).json({ message: "Failed to fetch latest requests" });
    }
  });

  app.post('/api/marketplace/buyer-requests', requireAuth, async (req: any, res) => {
    try {
      const buyerId = req.user.claims?.sub || req.user.id;

      // Check tier limits before allowing RFQ creation
      const tierCheck = await storage.checkUserCanCreateRFQ(buyerId);
      if (!tierCheck.allowed) {
        return res.status(403).json({
          message: tierCheck.reason || 'You have reached your tier limit for active RFQs',
          tierLimitReached: true
        });
      }

      const validatedData = insertBuyerRequestSchema.parse({
        ...req.body,
        buyerId,
      });
      const request = await storage.createBuyerRequest(validatedData);

      // Track usage for this month
      const currentMonth = new Date().toISOString().slice(0, 7); // YYYY-MM format
      await storage.incrementUserRFQCount(buyerId, currentMonth);

      res.json(request);
    } catch (error: any) {
      if (error instanceof ZodError) {
        console.error("Validation error creating buyer request:", formatZodError(error));
        return res.status(400).json({ message: formatZodError(error) });
      }
      console.error("Error creating buyer request:", error);
      res.status(500).json({ message: "Failed to create request" });
    }
  });

  // Allow buyers to close their own RFQs (buyer requests)
  app.patch('/api/marketplace/buyer-requests/:id/close', requireAuth, async (req: any, res) => {
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

  app.get('/api/dashboard/listings', requireAuth, async (req: any, res) => {
    try {
      const sellerId = req.user.claims?.sub || req.user.id;
      const listings = await storage.getListingsBySellerId(sellerId);
      res.json(listings);
    } catch (error) {
      console.error("Error fetching user listings:", error);
      res.status(500).json({ message: "Failed to fetch listings" });
    }
  });

  app.patch('/api/marketplace/listings/:id', requireAuth, requireAdmin, requireAdminPermission('canManageListings'), async (req, res) => {
    try {
      const validatedData = insertMarketplaceListingSchema.partial().parse(req.body);
      const listing = await storage.updateMarketplaceListing(req.params.id, validatedData);
      res.json(listing);
    } catch (error: any) {
      if (error instanceof ZodError) {
        console.error("Validation error updating listing:", formatZodError(error));
        return res.status(400).json({ message: formatZodError(error) });
      }
      console.error("Error updating listing:", error);
      res.status(500).json({ message: "Failed to update listing" });
    }
  });

  app.delete('/api/marketplace/listings/:id', requireAuth, requireAdmin, requireAdminPermission('canManageListings'), async (req, res) => {
    try {
      await storage.deleteMarketplaceListing(req.params.id);
      res.json({ success: true });
    } catch (error) {
      console.error("Error deleting listing:", error);
      res.status(500).json({ message: "Failed to delete listing" });
    }
  });

  app.patch('/api/marketplace/listings/:id/close', requireAuth, async (req: any, res) => {
    try {
      const userId = req.user.claims?.sub || req.user.id;
      const user = await storage.getUserById(userId);
      const listing = await storage.getMarketplaceListingById(req.params.id);

      if (!listing) {
        return res.status(404).json({ message: "Listing not found" });
      }

      if (user?.role !== 'admin' && listing.sellerId !== userId) {
        return res.status(403).json({ message: "Only the seller or admin can close this listing" });
      }

      const closedListing = await storage.closeMarketplaceListing(req.params.id);
      res.json(closedListing);
    } catch (error) {
      console.error("Error closing listing:", error);
      res.status(500).json({ message: "Failed to close listing" });
    }
  });

  // ========================================================================
  // Message Thread Routes
  // ========================================================================
  app.post('/api/threads', requireAuth, async (req: any, res) => {
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

      let buyerId: string | null = userId;
      let sellerId: string | null = null;
      let adminId: string | null = null;
      let threadTitle = title as string | undefined;

      const adminUser = await storage.getAdminUser();
      adminId = adminUser?.id || null;

      if (projectId) {
        const project = await storage.getProjectById(projectId);
        if (!project) {
          return res.status(404).json({ message: "Project not found" });
        }

        // Project interests should go to the project owner
        sellerId = project.ownerId;
        threadTitle = threadTitle || `Inquiry about: ${project.name}`;
      } else if (listingId) {
        const listing = await storage.getMarketplaceListingById(listingId);
        if (!listing) {
          return res.status(404).json({ message: "Listing not found" });
        }

        // Listing inquiries should go to the listing's seller
        sellerId = listing.sellerId;
        threadTitle = threadTitle || `Inquiry about: ${listing.title}`;
      }

      const thread = await storage.createMessageThread({
        title: threadTitle!,
        type: projectId ? 'project_interest' : 'marketplace_inquiry',
        projectId,
        listingId,
        buyerId,
        sellerId,
        adminId,
        createdBy: userId,
        status: 'open',
      });

      res.json(thread);
    } catch (error: any) {
      console.error("Error creating thread:", error);
      res.status(500).json({ message: "Failed to create thread" });
    }
  });

  app.get('/api/threads', requireAuth, async (req: any, res) => {
    try {
      // Ensure user is synced
      const user = await syncClerkUser(req.auth.userId);
      const userId = user.id;
      const threads = await storage.getThreadsByUserId(userId);
      res.json(threads);
    } catch (error) {
      console.error("Error fetching threads:", error);
      res.status(500).json({ message: "Failed to fetch threads" });
    }
  });

  // Admin endpoint to get support tickets (PRIVACY: only support tickets, never buyer-seller conversations)
  app.get('/api/threads/all', requireAuth, requireAdmin, async (req: any, res) => {
    try {
      // PRIVACY CONTROL: Admins ONLY see support tickets (requireAdminSupport=true)
      // They can NEVER see buyer-seller marketplace conversations
      const status = req.query.status as string | undefined;
      const priority = req.query.priority as string | undefined;
      const assignedAdminId = req.query.assignedAdminId as string | undefined;

      const tickets = await storage.getAdminSupportTickets({ status, priority, assignedAdminId });
      res.json(tickets);
    } catch (error) {
      console.error("Error fetching admin support tickets:", error);
      res.status(500).json({ message: "Failed to fetch support tickets" });
    }
  });

  // Admin endpoint to get categorized support tickets
  app.get('/api/admin/threads/categorized', requireAuth, requireAdmin, async (req: any, res) => {
    try {
      // PRIVACY CONTROL: Only support tickets
      const allTickets = await storage.getAdminSupportTickets();

      const open = allTickets.filter(t => t.ticketStatus === 'open');
      const inProgress = allTickets.filter(t => t.ticketStatus === 'in_progress');
      const waitingUser = allTickets.filter(t => t.ticketStatus === 'waiting_user');
      const resolved = allTickets.filter(t => t.ticketStatus === 'resolved');

      res.json({
        open,
        inProgress,
        waitingUser,
        resolved,
      });
    } catch (error) {
      console.error("Error fetching categorized support tickets:", error);
      res.status(500).json({ message: "Failed to fetch support tickets" });
    }
  });

  app.get('/api/threads/:id', requireAuth, async (req: any, res) => {
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

  // Return thread and participant (buyer/seller) details for UI header
  app.get('/api/threads/:id/details', requireAuth, async (req: any, res) => {
    try {
      const threadId = req.params.id;
      const details = await storage.getThreadWithParticipants(threadId);
      if (!details) return res.status(404).json({ message: 'Thread not found' });
      res.json(details);
    } catch (error) {
      console.error('Error fetching thread details:', error);
      res.status(500).json({ message: 'Failed to fetch thread details' });
    }
  });

  app.get('/api/threads/:id/messages', requireAuth, async (req: any, res) => {
    try {
      const messages = await storage.getMessagesByThreadId(req.params.id);
      res.json(messages);
    } catch (error) {
      console.error("Error fetching thread messages:", error);
      res.status(500).json({ message: "Failed to fetch messages" });
    }
  });

  app.post('/api/threads/:id/messages', requireAuth, async (req: any, res) => {
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
        relatedListingId: thread.listingId,
      });

      const message = await storage.createMessage(validatedData);
      await storage.updateThreadLastMessage(threadId);

      // Log activity
      try {
        await storage.createActivityLog({
          userId: senderId,
          activityType: 'message_sent',
          description: `Sent message in thread: "${thread.title || threadId}"`,
          ipAddress: (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() || (req.headers['x-real-ip'] as string) || req.ip || req.socket.remoteAddress || null,
          userAgent: req.get('user-agent') || null,
          metadata: { threadId, messageId: message.id, receiverId },
        });
      } catch (logError) {
        console.error('[ACTIVITY LOG] Failed to log message:', logError);
      }

      res.json(message);
    } catch (error: any) {
      if (error instanceof ZodError) {
        console.error("Validation error creating message:", formatZodError(error));
        return res.status(400).json({ message: formatZodError(error) });
      }
      console.error("Error creating message:", error);
      res.status(500).json({ message: "Failed to send message" });
    }
  });

  app.patch('/api/threads/:id/close', requireAuth, async (req: any, res) => {
    try {
      const thread = await storage.closeThread(req.params.id);
      res.json(thread);
    } catch (error) {
      console.error("Error closing thread:", error);
      res.status(500).json({ message: "Failed to close thread" });
    }
  });

  // ========================================================================
  // Support Ticket Routes (Privacy-Compliant Admin Support Only)
  // ========================================================================

  // User creates a support ticket
  app.post('/api/support/tickets', requireAuth, async (req: any, res) => {
    try {
      const userId = req.user.claims?.sub || req.user.id;
      const { title, description, priority } = req.body;

      if (!title || !description) {
        return res.status(400).json({ message: "Title and description are required" });
      }

      const ticket = await storage.createSupportTicket(userId, title, description, priority);

      // Create first message in the ticket thread
      await storage.createMessage({
        threadId: ticket.id,
        senderId: userId,
        receiverId: 'admin', // Will be matched to actual admin later
        subject: title,
        content: description,
        context: 'general',
      });

      res.json(ticket);
    } catch (error) {
      console.error("Error creating support ticket:", error);
      res.status(500).json({ message: "Failed to create support ticket" });
    }
  });

  // Admin claims a support ticket
  app.post('/api/admin/support/tickets/:id/claim', requireAuth, requireAdmin, async (req: any, res) => {
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

  // Admin resolves a support ticket
  app.patch('/api/admin/support/tickets/:id/resolve', requireAuth, requireAdmin, async (req: any, res) => {
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

  // Admin gets all support tickets (with filtering)
  app.get('/api/admin/support/tickets', requireAuth, requireAdmin, async (req: any, res) => {
    try {
      const status = req.query.status as string | undefined;
      const priority = req.query.priority as string | undefined;
      const assignedAdminId = req.query.assignedAdminId as string | undefined;

      const tickets = await storage.getAdminSupportTickets({ status, priority, assignedAdminId });
      res.json(tickets);
    } catch (error) {
      console.error("Error fetching support tickets:", error);
      res.status(500).json({ message: "Failed to fetch support tickets" });
    }
  });

  // Update a support ticket's status
  app.patch('/api/threads/:id/ticket-status', requireAuth, requireAdmin, async (req: any, res) => {
    try {
      const ticketId = req.params.id;
      const { status } = req.body;

      if (!status) {
        return res.status(400).json({ message: "Status is required" });
      }

      const validStatuses = ['open', 'in_progress', 'waiting_user', 'resolved'];
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

  // Update a support ticket's priority
  app.patch('/api/threads/:id/ticket-priority', requireAuth, requireAdmin, async (req: any, res) => {
    try {
      const ticketId = req.params.id;
      const { priority } = req.body;

      if (!priority) {
        return res.status(400).json({ message: "Priority is required" });
      }

      const validPriorities = ['low', 'normal', 'high', 'urgent'];
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

  // Update a support ticket's assignee
  app.patch('/api/threads/:id/ticket-assign', requireAuth, requireAdmin, async (req: any, res) => {
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

  // Admin analytics summary
  app.get('/api/admin/analytics', requireAuth, requireAdmin, async (req: any, res) => {
    try {
      const summary = await storage.getAnalyticsSummary();
      return res.json(summary);
    } catch (err) {
      console.error('Analytics error', err);
      return res.status(500).json({ error: 'Failed to fetch analytics' });
    }
  });

  // ========================================================================
  // AI Assistant Chat (Gemini 1.5 Flash)
  // ========================================================================
  app.post("/api/assistant/chat", async (req: any, res) => {
    try {
      const userId = req.user ? (req.user.claims?.sub || req.user.id) : null;
      const { message, history } = req.body as {
        message?: string;
        history?: ChatHistoryItem[];
      };

      if (!message || typeof message !== "string") {
        return res.status(400).json({ message: "message is required" });
      }

      const safeHistory: ChatHistoryItem[] = Array.isArray(history)
        ? history
          .filter((h: any) => h && typeof h.content === "string")
          .map((h: any) => ({
            role: h.role === "assistant" ? "assistant" : "user",
            content: h.content,
          }))
        : [];

      let reply = "";

      // Priority: HF Inference API (if configured)
      const hfApiKey = process.env.HF_API_KEY;
      const hfModel = process.env.HF_MODEL || "deepseek-ai/DeepSeek-V3.2:novita";

      // If the configured HF model looks like a modern/chat model (e.g. contains
      // "llama" or a provider slash), prefer the router endpoint which is
      // required by many newer models. Set HF_USE_ROUTER at runtime so
      // `askHuggingFace` will use the router path.
      try {
        const m = String(hfModel || "").toLowerCase();
        if (!process.env.HF_USE_ROUTER && (m.includes("llama") || hfModel.includes("/"))) {
          process.env.HF_USE_ROUTER = "1";
          console.debug("HF_USE_ROUTER enabled for model:", hfModel);
        }
      } catch (e) {
        /* ignore */
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
        // Fallback: Gemini or local
        reply = await askSupportBot(message, safeHistory);
      }

      // NOTE: For now we just return the reply.
      // Later, we can also persist this into message_threads/messages
      // so admins can review conversations.

      res.json({ reply, userId });
    } catch (error: any) {
      console.error("Assistant chat error:", error);

      // If the provider returned a quota / rate-limit error, surface a
      // clear 429 to the client and include a Retry-After header when
      // possible so clients/frontend can back off gracefully.
      try {
        if (error && (error.status === 429 || (error?.errorDetails && Array.isArray(error.errorDetails)))) {
          // Try to extract retry info from the provider error details
          let retryDelay: string | null = null;
          const details = error.errorDetails || [];
          for (const d of details) {
            if (d && typeof d === 'object' && d['@type'] && d['@type'].includes('RetryInfo')) {
              retryDelay = d.retryDelay || null;
              break;
            }
          }

          // If we have a retryDelay like "1s" or "30s" attempt to convert
          // it to seconds and set the standard Retry-After header.
          if (retryDelay && typeof retryDelay === 'string') {
            const m = /^\s*(\d+(?:\.\d+)?)(s|m|h)?\s*$/i.exec(retryDelay);
            if (m) {
              const val = Number(m[1]);
              const unit = (m[2] || 's').toLowerCase();
              let seconds = val;
              if (unit === 'm') seconds = val * 60;
              if (unit === 'h') seconds = val * 3600;
              res.setHeader('Retry-After', String(Math.ceil(seconds)));
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

  // ========================================================================
  // File Uploads: Message Attachments
  // ========================================================================
  const uploadsRoot = path.resolve(import.meta.dirname, "..", "attached_assets", "files", "uploads", "messages");
  fs.mkdirSync(uploadsRoot, { recursive: true });

  const storageEngine = multer.diskStorage({
    destination: (_req, _file, cb) => cb(null, uploadsRoot),
    filename: (_req, file, cb) => {
      const timestamp = Date.now();
      const sanitizedOriginal = file.originalname.replace(/[^a-zA-Z0-9._-]/g, "_");
      cb(null, `${timestamp}-${sanitizedOriginal}`);
    },
  });

  const upload = multer({
    storage: storageEngine,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB
    fileFilter: (_req, file, cb) => {
      const allowed = [
        "image/png",
        "image/jpeg",
        "image/gif",
        "application/pdf",
        "text/plain",
      ];
      if (allowed.includes(file.mimetype)) {
        return cb(null, true);
      }
      return cb(new Error("Unsupported file type"));
    },
  });

  app.post('/api/uploads/messages', requireAuth, upload.single('file'), async (req: any, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }
      const relativePath = `/attached_assets/files/uploads/messages/${req.file.filename}`;
      res.json({
        filename: req.file.originalname,
        url: relativePath,
        size: req.file.size,
        mimetype: req.file.mimetype,
      });
    } catch (error: any) {
      console.error("Error uploading file:", error);
      res.status(500).json({ message: "Failed to upload file" });
    }
  });

  // ========================================================================
  // Message Routes
  // ========================================================================
  app.get('/api/messages', requireAuth, async (req: any, res) => {
    try {
      // Ensure user is synced
      const user = await syncClerkUser(req.auth.userId);
      const userId = user.id;
      const messages = await storage.getMessagesByUserId(userId);
      res.json(messages);
    } catch (error) {
      console.error("Error fetching messages:", error);
      res.status(500).json({ message: "Failed to fetch messages" });
    }
  });

  app.post('/api/messages', requireAuth, async (req: any, res) => {
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

      // Allow cases:
      // - admin can send to anyone
      // - messages to admin are allowed
      // - buyers/sellers can message admin
      // Additionally allow buyer -> listing.seller when the message references a listing
      let isAllowed =
        sender.role === 'admin' ||
        receiver.role === 'admin' ||
        (sender.role === 'buyer' && receiverId === adminId) ||
        (sender.role === 'seller' && receiverId === adminId);

      // If this message is intended to contact a listing seller, allow buyer -> seller
      const relatedListingId = req.body?.relatedListingId;
      if (!isAllowed && relatedListingId) {
        try {
          const listing = await storage.getMarketplaceListingById(relatedListingId);
          if (listing && listing.sellerId === receiverId) {
            // Allow buyer to message the listing's seller
            isAllowed = true;
          }
        } catch (err) {
          // don't block on listing lookup errors here; validation will catch missing fields
          console.warn('Failed to lookup listing for message authorization', err);
        }
      }

      if (!isAllowed) {
        return res.status(403).json({
          message: "You are not authorized to send this message. For inquiries about listings or projects, contact the listing seller or admin."
        });
      }

      const validatedData = insertMessageSchema.parse({
        ...req.body,
        senderId,
      });
      const idempotencyKey = req.header('Idempotency-Key') || req.header('idempotency-key') || null;
      const message = await storage.createMessageWithIdempotency(idempotencyKey, validatedData);

      // Create notification for receiver (persisted to storage)
      await storage.createNotification({
        userId: receiverId,
        type: 'message',
        title: 'New Message',
        message: `${sender.firstName} ${sender.lastName} sent you a message`,
        link: '/messages',
      });

      res.json(message);
    } catch (error: any) {
      if (error instanceof ZodError) {
        console.error("Validation error creating message:", formatZodError(error));
        return res.status(400).json({ message: formatZodError(error) });
      }
      console.error("Error creating message:", error);
      res.status(500).json({ message: "Failed to send message" });
    }
  });

  // Admin endpoint to contact seller about a project or listing
  app.post('/api/messages/contact-seller', requireAuth, requireAdmin, async (req: any, res) => {
    try {
      const adminId = req.user.claims?.sub || req.user.id;
      const { projectId, listingId, sellerId } = req.body;

      if (!projectId && !listingId) {
        return res.status(400).json({ message: "Either projectId or listingId is required" });
      }

      if (!sellerId) {
        return res.status(400).json({ message: "sellerId is required" });
      }

      // Get admin user to verify
      const admin = await storage.getUserById(adminId);
      if (!admin || admin.role !== 'admin') {
        return res.status(403).json({ message: "Only admins can use this endpoint" });
      }

      // Check if thread already exists
      const existingThreads = await storage.getAllMessageThreads();
      let existingThread = existingThreads.find(t =>
        t.type === 'admin_to_seller' &&
        t.adminId === adminId &&
        t.sellerId === sellerId &&
        (projectId ? t.projectId === projectId : t.listingId === listingId)
      );

      if (existingThread) {
        // Thread exists, return it
        return res.json({ thread: existingThread, existed: true });
      }

      // Create new thread
      let threadTitle = '';
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
        type: 'admin_to_seller',
        projectId: projectId || null,
        listingId: listingId || null,
        buyerId: null,
        sellerId,
        adminId,
        createdBy: adminId,
        context: 'general',
        status: 'open',
      });

      res.json({ thread: newThread, existed: false });
    } catch (error: any) {
      console.error("Error creating admin-seller thread:", error);
      res.status(500).json({ message: "Failed to create thread" });
    }
  });

  app.get('/api/conversations/:userId', requireAuth, async (req: any, res) => {
    try {
      const currentUserId = req.user.claims?.sub || req.user.id;
      const otherUserId = req.params.userId;
      const messages = await storage.getConversation(currentUserId, otherUserId);
      res.json(messages);
    } catch (error) {
      console.error("Error fetching conversation:", error);
      res.status(500).json({ message: "Failed to fetch conversation" });
    }
  });

  app.get('/api/messages/:id/details', requireAuth, async (req, res) => {
    try {
      const messageId = req.params.id;
      const currentUserId = (req as any).user?.claims?.sub || (req as any).user?.id;
      console.log(`Fetching message details for id=${messageId} (user=${currentUserId})`);
      const messageDetails = await storage.getMessageWithSenderDetails(messageId);
      if (!messageDetails) {
        console.warn(`Message not found: id=${messageId}`);
        return res.status(404).json({ message: "Message not found" });
      }

      // Mark message as read for the current user if it's addressed to them
      try {
        if (messageDetails.message && messageDetails.message.receiverId === currentUserId) {
          await storage.markMessageAsRead(messageId);
        }
      } catch (err) {
        console.error(`Failed to mark message read for id=${messageId}:`, err);
      }

      // Log minimal details for debugging and return the payload the client expects
      console.log(`Returning message details for id=${messageId}: sender=${messageDetails.sender?.id}`);
      res.json(messageDetails);
    } catch (error) {
      console.error("Error fetching message details:", error);
      res.status(500).json({ message: "Failed to fetch message details" });
    }
  });

  // Close a conversation (mark all messages between the two participants as closed)
  app.patch('/api/messages/:id/close', requireAuth, async (req: any, res) => {
    try {
      const messageId = req.params.id;
      const currentUserId = req.user.claims?.sub || req.user.id;

      // Load message details to ensure user is participant or admin
      const messageDetails = await storage.getMessageWithSenderDetails(messageId);
      if (!messageDetails) return res.status(404).json({ message: 'Message not found' });

      const main = messageDetails.message;
      const isParticipant = [main.senderId, main.receiverId].includes(currentUserId);
      const user = await storage.getUser(currentUserId);
      const requireAdminUser = user?.role === 'admin';

      if (!isParticipant && !requireAdminUser) {
        return res.status(403).json({ message: 'Not authorized to close this conversation' });
      }

      await storage.closeConversationByMessageId(messageId);
      res.json({ success: true });
    } catch (error) {
      console.error('Error closing conversation:', error);
      res.status(500).json({ message: 'Failed to close conversation' });
    }
  });

  app.get('/api/messages/check-contact', requireAuth, async (req: any, res) => {
    try {
      const userId = req.user.claims?.sub || req.user.id;
      const { projectId, listingId } = req.query;

      if (!userId) {
        return res.status(400).json({ error: 'User ID is required' });
      }

      if (projectId) {
        const hasContacted = await storage.checkUserHasContactedAboutProject(userId, projectId as string);
        return res.json({ hasContacted });
      }

      if (listingId) {
        const hasContacted = await storage.checkUserHasContactedAboutListing(userId, listingId as string);
        return res.json({ hasContacted });
      }

      return res.status(400).json({ error: 'Either projectId or listingId is required' });
    } catch (error) {
      console.error("Error checking contact status:", error);
      return res.status(500).json({ error: 'Internal server error while checking contact status' });
      res.status(500).json({ message: "Failed to check contact status" });
    }
  });

  // Return a user's public details (admins can view any user; users can view themselves)
  app.get('/api/users/:id', requireAuth, async (req: any, res) => {
    try {
      const currentUserId = req.user?.claims?.sub || req.user?.id;
      const targetId = req.params.id;

      // Allow if requesting own profile or admin
      const requestingUser = await storage.getUser(currentUserId);
      const requireAdminUser = requestingUser?.role === 'admin';
      if (!requireAdminUser && currentUserId !== targetId) {
        return res.status(403).json({ message: 'Not authorized to view this user' });
      }

      const user = await storage.getUserById(targetId);
      if (!user) return res.status(404).json({ message: 'User not found' });
      const profile = await storage.getUserProfile(targetId);

      // Include listings and recent messages when admin or requesting own profile
      let listings = null;
      let recentMessages = null;
      try {
        listings = await storage.getListingsBySellerId(targetId);
      } catch (err) {
        listings = null;
      }

      // Only include message previews for admin users or the owner
      if (requireAdminUser || currentUserId === targetId) {
        try {
          const msgs = await storage.getMessagesByUserId(targetId);
          // provide a small preview: last 5 messages
          recentMessages = (msgs || []).slice(0, 5).map(m => ({ id: m.id, content: m.content, createdAt: m.createdAt, senderId: m.senderId, receiverId: m.receiverId }));
        } catch (err) {
          recentMessages = null;
        }
      }

      res.json({ user, profile, listings, recentMessages });
    } catch (error) {
      console.error('Error fetching user details:', error);
      res.status(500).json({ message: 'Failed to fetch user' });
    }
  });

  // Public profile endpoint (no authentication) with limited fields and public listings
  app.get('/api/public/users/:id', async (req: any, res) => {
    try {
      const targetId = req.params.id;
      const user = await storage.getUserById(targetId);
      if (!user) return res.status(404).json({ message: 'User not found' });
      const profile = await storage.getUserProfile(targetId);

      // Public listings: only return listings with status 'active' or published
      let publicListings: any[] = [];
      try {
        const allListings = await storage.getListingsBySellerId(targetId);
        publicListings = (allListings || []).filter(l => (l.status || '').toLowerCase() === 'active');
      } catch (err) {
        publicListings = [];
      }

      // Build public payload (exclude email/phone)
      const publicUser = { id: user.id, firstName: user.firstName, lastName: user.lastName, role: user.role };
      const publicProfile = { companyName: profile?.companyName, location: profile?.location, bio: profile?.bio };

      res.json({ user: publicUser, profile: publicProfile, listings: publicListings });
    } catch (error) {
      console.error('Error fetching public user profile:', error);
      res.status(500).json({ message: 'Failed to fetch public profile' });
    }
  });

  // ========================================================================
  // Blog Routes
  // ========================================================================
  app.get('/api/blog', async (req, res) => {
    try {
      const posts = await storage.getBlogPosts(true);
      res.json(posts);
    } catch (error) {
      console.error("Error fetching blog posts:", error);
      res.status(500).json({ message: "Failed to fetch blog posts" });
    }
  });

  app.get('/api/blog/:slug', async (req, res) => {
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

  app.post('/api/blog', requireAuth, requireAdmin, async (req: any, res) => {
    try {
      const authorId = req.user.claims?.sub || req.user.id;
      const validatedData = insertBlogPostSchema.parse({
        ...req.body,
        authorId,
      });
      const post = await storage.createBlogPost(validatedData);

      // Log activity
      try {
        await storage.createActivityLog({
          userId: authorId,
          activityType: 'blog_post_created',
          description: `Created blog post: "${post.title || post.id}"`,
          ipAddress: (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() || (req.headers['x-real-ip'] as string) || req.ip || req.socket.remoteAddress || null,
          userAgent: req.get('user-agent') || null,
          metadata: { postId: post.id, slug: post.slug },
        });
      } catch (logError) {
        console.error('[ACTIVITY LOG] Failed to log blog post creation:', logError);
      }

      res.json(post);
    } catch (error: any) {
      if (error instanceof ZodError) {
        console.error("Validation error creating blog post:", formatZodError(error));
        return res.status(400).json({ message: formatZodError(error) });
      }
      console.error("Error creating blog post:", error);
      res.status(500).json({ message: "Failed to create blog post" });
    }
  });

  app.patch('/api/blog/:id/publish', requireAuth, requireAdmin, async (req, res) => {
    try {
      const post = await storage.publishBlogPost(req.params.id);
      res.json(post);
    } catch (error) {
      console.error("Error publishing blog post:", error);
      res.status(500).json({ message: "Failed to publish blog post" });
    }
  });

  app.patch('/api/blog/:id', requireAuth, requireAdmin, async (req, res) => {
    try {
      const validatedData = insertBlogPostSchema.partial().parse(req.body);
      const post = await storage.updateBlogPost(req.params.id, validatedData);
      res.json(post);
    } catch (error: any) {
      if (error instanceof ZodError) {
        console.error("Validation error updating blog post:", formatZodError(error));
        return res.status(400).json({ message: formatZodError(error) });
      }
      console.error("Error updating blog post:", error);
      res.status(500).json({ message: "Failed to update blog post" });
    }
  });

  app.delete('/api/blog/:id', requireAuth, requireAdmin, async (req, res) => {
    try {
      await storage.deleteBlogPost(req.params.id);
      res.json({ message: "Blog post deleted successfully" });
    } catch (error) {
      console.error("Error deleting blog post:", error);
      res.status(500).json({ message: "Failed to delete blog post" });
    }
  });

  app.get('/api/blog/admin/all', requireAuth, requireAdmin, async (req, res) => {
    try {
      const posts = await storage.getBlogPosts(false);
      res.json(posts);
    } catch (error) {
      console.error("Error fetching all blog posts:", error);
      res.status(500).json({ message: "Failed to fetch blog posts" });
    }
  });

  // ========================================================================
  // Sustainability Routes
  // ========================================================================
  app.get('/api/sustainability', async (req, res) => {
    try {
      const items = await storage.getSustainabilityContent();
      res.json(items);
    } catch (error) {
      console.error("Error fetching sustainability content:", error);
      res.status(500).json({ message: "Failed to fetch sustainability content" });
    }
  });

  app.post('/api/sustainability', requireAuth, requireAdmin, async (req, res) => {
    try {
      const validatedData = insertSustainabilityContentSchema.parse(req.body);
      const item = await storage.createSustainabilityContent(validatedData);
      res.json(item);
    } catch (error: any) {
      if (error instanceof ZodError) {
        console.error("Validation error creating sustainability content:", formatZodError(error));
        return res.status(400).json({ message: formatZodError(error) });
      }
      console.error("Error creating sustainability content:", error);
      res.status(500).json({ message: "Failed to create sustainability content" });
    }
  });

  app.patch('/api/sustainability/:id', requireAuth, requireAdmin, async (req, res) => {
    try {
      const validatedData = insertSustainabilityContentSchema.partial().parse(req.body);
      const item = await storage.updateSustainabilityContent(req.params.id, validatedData);
      res.json(item);
    } catch (error: any) {
      if (error instanceof ZodError) {
        console.error("Validation error updating sustainability content:", formatZodError(error));
        return res.status(400).json({ message: formatZodError(error) });
      }
      console.error("Error updating sustainability content:", error);
      res.status(500).json({ message: "Failed to update sustainability content" });
    }
  });

  app.delete('/api/sustainability/:id', requireAuth, requireAdmin, async (req, res) => {
    try {
      await storage.deleteSustainabilityContent(req.params.id);
      res.json({ message: "Sustainability content deleted successfully" });
    } catch (error) {
      console.error("Error deleting sustainability content:", error);
      res.status(500).json({ message: "Failed to delete sustainability content" });
    }
  });

  // ========================================================================
  // Contact Routes
  // ========================================================================
  app.post('/api/contact', async (req, res) => {
    try {
      const validatedData = insertContactSubmissionSchema.parse(req.body);
      const submission = await storage.createContactSubmission(validatedData);

      // Also create an internal support thread so admins see the submission in Messages
      try {
        const adminUser = await storage.getAdminUser();
        let thread: any = null;
        if (adminUser) {
          // If the requester is authenticated, create a thread owned by them so
          // the conversation appears in their Messages view. Otherwise create
          // an internal admin-side thread for unauthenticated submissions.
          const requesterId = (req as any).user ? ((req as any).user.claims?.sub || (req as any).user.id) : null;

          if (requesterId) {
            thread = await storage.createMessageThread({
              title: submission.subject || 'Contact Admin',
              type: 'support',
              projectId: null,
              listingId: null,
              buyerId: requesterId,
              sellerId: null,
              adminId: adminUser.id,
              createdBy: requesterId,
              context: 'support',
              status: 'open',
              requireAdminSupport: true,
              assignedAdminId: adminUser.id,
              ticketStatus: 'open',
            } as any);

            const content = `Contact submission from ${submission.name || ''} <${submission.email || ''}>\nPhone: ${submission.phone || 'N/A'}\n\n${submission.message}\n\nView thread: /dashboard/messages?threadId=${thread.id}`;
            await storage.createMessage({
              threadId: thread.id,
              senderId: requesterId,
              receiverId: adminUser.id,
              subject: submission.subject,
              content,
              context: 'support',
              isAutoRelay: false,
            } as any);

            await storage.updateThreadLastMessage(thread.id);
          } else {
            // Unauthenticated submission: create an internal admin thread and a relay message
            thread = await storage.createMessageThread({
              title: submission.subject || 'Contact Form Submission',
              type: 'support',
              projectId: null,
              listingId: null,
              buyerId: null,
              sellerId: null,
              adminId: adminUser.id,
              createdBy: adminUser.id,
              context: 'support',
              status: 'open',
              requireAdminSupport: true,
              assignedAdminId: adminUser.id,
              ticketStatus: 'open',
            } as any);

            const content = `Contact submission from ${submission.name} <${submission.email}>\nPhone: ${submission.phone || 'N/A'}\n\n${submission.message}\n\nView thread: /dashboard/messages?threadId=${thread.id}`;
            await storage.createMessage({
              threadId: thread.id,
              senderId: adminUser.id,
              receiverId: adminUser.id,
              subject: submission.subject,
              content,
              context: 'support',
              isAutoRelay: true,
            } as any);

            await storage.updateThreadLastMessage(thread.id);
          }
        }
      } catch (err) {
        console.error('Failed to create support thread for contact submission:', err);
      }

      // Notify all admin users about the new contact submission
      try {
        const adminUsers = await storage.getUsersByRole('admin');
        for (const admin of adminUsers) {
          await storage.createNotification({
            userId: admin.id,
            type: 'message',
            title: 'New Contact Submission',
            message: `${submission.name || 'Visitor'} submitted a contact: ${submission.subject || 'No subject'}`,
            link: thread ? `/dashboard/messages?threadId=${thread.id}` : `/dashboard/messages`,
          });
        }
      } catch (err) {
        console.error('Failed to create admin notifications for contact submission:', err);
      }

      res.json(submission);
    } catch (error: any) {
      if (error instanceof ZodError) {
        console.error("Validation error submitting contact form:", formatZodError(error));
        return res.status(400).json({ message: formatZodError(error) });
      }
      console.error("Error submitting contact form:", error);
      res.status(500).json({ message: "Failed to submit contact form" });
    }
  });

  app.get('/api/contact/submissions', requireAuth, requireAdmin, async (req, res) => {
    try {
      const submissions = await storage.getContactSubmissions();
      res.json(submissions);
    } catch (error) {
      console.error("Error fetching contact submissions:", error);
      res.status(500).json({ message: "Failed to fetch submissions" });
    }
  });

  app.patch('/api/contact/submissions/:id', requireAuth, requireAdmin, async (req, res) => {
    try {
      const { status } = req.body;
      if (!status || !['new', 'contacted', 'resolved'].includes(status)) {
        return res.status(400).json({ message: "Invalid status value" });
      }
      const submission = await storage.updateContactSubmissionStatus(req.params.id, status);
      res.json(submission);
    } catch (error) {
      console.error("Error updating contact submission:", error);
      res.status(500).json({ message: "Failed to update submission" });
    }
  });

  app.get('/api/contact/settings', async (req, res) => {
    try {
      const settings = await storage.getContactSettings();
      res.json(settings);
    } catch (error) {
      console.error("Error fetching contact settings:", error);
      res.status(500).json({ message: "Failed to fetch contact settings" });
    }
  });

  app.patch('/api/contact/settings', requireAuth, requireAdmin, async (req, res) => {
    try {
      const settings = await storage.updateContactSettings(req.body);
      res.json(settings);
    } catch (error) {
      console.error("Error updating contact settings:", error);
      res.status(500).json({ message: "Failed to update contact settings" });
    }
  });

  // ========================================================================
  // Admin Routes
  // ========================================================================
  app.get('/api/admin/verification-queue', requireAuth, requireAdmin, async (req, res) => {
    try {
      const listings = await storage.getPendingListings();
      res.json(listings);
    } catch (error) {
      console.error("Error fetching verification queue:", error);
      res.status(500).json({ message: "Failed to fetch verification queue" });
    }
  });

  app.post('/api/admin/verify/:id', requireAuth, requireAdmin, async (req: any, res) => {
    try {
      const reviewerId = req.user.claims?.sub || req.user.id;
      const listingId = req.params.id;
      const listing = await storage.getListing(listingId);
      await storage.approveListing(listingId, reviewerId);

      // Log activity
      if (listing?.sellerId) {
        try {
          await storage.createActivityLog({
            userId: listing.sellerId,
            activityType: 'listing_approved',
            description: `Listing "${listing.title || listingId}" was approved by admin`,
            ipAddress: req.ip || (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() || null,
            userAgent: req.get('user-agent') || null,
            metadata: { listingId, reviewerId },
          });
        } catch (logError) {
          console.error('[ACTIVITY LOG] Failed to log listing approval:', logError);
        }
      }

      res.json({ message: "Listing approved successfully" });
    } catch (error) {
      console.error("Error approving listing:", error);
      res.status(500).json({ message: "Failed to approve listing" });
    }
  });

  app.post('/api/admin/reject/:id', requireAuth, requireAdmin, async (req: any, res) => {
    try {
      const reviewerId = req.user.claims?.sub || req.user.id;
      const listingId = req.params.id;
      const listing = await storage.getListing(listingId);
      await storage.rejectListing(listingId, reviewerId);

      // Log activity
      if (listing?.sellerId) {
        try {
          await storage.createActivityLog({
            userId: listing.sellerId,
            activityType: 'listing_rejected',
            description: `Listing "${listing.title || listingId}" was rejected by admin`,
            ipAddress: req.ip || (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() || null,
            userAgent: req.get('user-agent') || null,
            metadata: { listingId, reviewerId },
          });
        } catch (logError) {
          console.error('[ACTIVITY LOG] Failed to log listing rejection:', logError);
        }
      }

      res.json({ message: "Listing rejected successfully" });
    } catch (error) {
      console.error("Error rejecting listing:", error);
      res.status(500).json({ message: "Failed to reject listing" });
    }
  });

  app.get('/api/admin/users', requireAuth, requireAdmin, async (req, res) => {
    try {
      const users = await storage.getAllUsers();

      // Fetch user profiles for phone numbers and company names
      const profiles = await db.select().from(userProfiles);
      const profileMap = new Map(profiles.map(p => [p.userId, p]));

      // Fetch admin permissions for admin users
      const adminUsers = users.filter(u => u.role === 'admin');
      const adminPermissionsMap = new Map();

      for (const adminUser of adminUsers) {
        try {
          const permissions = await storage.getAdminPermissions(adminUser.id);
          if (permissions) {
            adminPermissionsMap.set(adminUser.id, permissions);
          }
        } catch (error) {
          // If getting permissions fails, continue without it
        }
      }

      // Merge test user data from testUsersStore and profile data
      const mergedUsers = users.map(user => {
        const profile = profileMap.get(user.id);
        const testUser = testUsersStore.get(user.id);
        const adminPermissions = adminPermissionsMap.get(user.id);

        return {
          ...user,
          phoneNumber: profile?.phoneNumber || '-',
          companyName: profile?.companyName || '-',
          // For admin user management, always trust the real database values
          // for membershipTier and verificationStatus, not any testUser overrides.
          ...(adminPermissions && {
            adminRole: adminPermissions.adminRole,
          }),
        };
      });

      res.json(mergedUsers);
    } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).json({ message: "Failed to fetch users" });
    }
  });

  app.post('/api/admin/users', requireAuth, requireAdmin, async (req: any, res) => {
    try {
      const { email, password, username, firstName, lastName, role } = req.body || {};
      if (!email || !role) {
        return res.status(400).json({ message: 'Email and role are required' });
      }

      // Hash password if provided
      let hashedPassword: string | undefined = undefined;
      if (password) {
        const saltRounds = 10;
        hashedPassword = await bcrypt.hash(password, saltRounds);
        console.log('[CREATE USER] Password hashed for user:', email);
      }

      const user = await storage.upsertUser({
        email,
        firstName,
        lastName,
        password: hashedPassword,
        username: username || undefined,
        // allow setting role on creation
        // @ts-ignore
        role: role,
      });

      // If admin, ensure a permissions row exists
      if (role === 'admin') {
        await storage.upsertAdminPermissions({ adminUserId: user.id } as any);
      }

      console.log('[CREATE USER] User created successfully:', { id: user.id, email, username, role });
      res.json(user);
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({ message: 'Failed to create user' });
    }
  });

  app.patch('/api/admin/users/:id/role', requireAuth, requireAdmin, async (req, res) => {
    try {
      const { role } = req.body;
      if (!role || !['admin', 'buyer', 'seller'].includes(role)) {
        return res.status(400).json({ message: "Invalid role" });
      }
      const user = await storage.updateUserRole(req.params.id, role);
      res.json(user);
    } catch (error) {
      console.error("Error updating user role:", error);
      res.status(500).json({ message: "Failed to update user role" });
    }
  });

  // Update user information (name, email, phone, company, password, username)
  app.patch('/api/admin/users/:id/info', requireAuth, requireAdmin, async (req, res) => {
    try {
      const { firstName, lastName, email, phoneNumber, companyName, password, username } = req.body;
      const userId = req.params.id;

      // Update user basic info
      if (firstName || lastName || email || password || username) {
        const updateData: any = {};
        if (firstName !== undefined) updateData.firstName = firstName;
        if (lastName !== undefined) updateData.lastName = lastName;
        if (email !== undefined) updateData.email = email;
        if (username !== undefined) updateData.username = username;

        // Hash password if provided
        if (password) {
          const saltRounds = 10;
          updateData.password = await bcrypt.hash(password, saltRounds);
          console.log('[UPDATE USER] Password updated and hashed for user:', userId);
        }

        await db.update(users).set(updateData).where(eq(users.id, userId));
      }

      // Update user profile info (phone, company)
      if (phoneNumber !== undefined || companyName !== undefined) {
        const profileUpdateData: any = {};
        if (phoneNumber !== undefined) profileUpdateData.phoneNumber = phoneNumber;
        if (companyName !== undefined) profileUpdateData.companyName = companyName;

        // Get or create user profile
        const existingProfile = await db.select().from(userProfiles).where(eq(userProfiles.userId, userId)).limit(1);

        if (existingProfile.length > 0) {
          await db.update(userProfiles).set(profileUpdateData).where(eq(userProfiles.userId, userId));
        } else {
          await db.insert(userProfiles).values({
            userId,
            ...profileUpdateData,
            profileType: 'individual'
          });
        }
      }

      // Return updated user
      const updatedUser = await storage.getUser(userId);
      res.json(updatedUser);
    } catch (error) {
      console.error("Error updating user information:", error);
      res.status(500).json({ message: "Failed to update user information" });
    }
  });

  app.delete('/api/admin/users/:id', requireAuth, requireAdmin, async (req, res) => {
    try {
      await storage.deleteUser(req.params.id);
      res.json({ message: "User deleted successfully" });
    } catch (error) {
      console.error("Error deleting user:", error);
      res.status(500).json({ message: "Failed to delete user" });
    }
  });

  // Return marketplace listings for a specific user (admin only)
  app.get('/api/admin/users/:id/listings', requireAuth, requireAdmin, async (req: any, res) => {
    try {
      const sellerId = req.params.id;
      const listings = await storage.getListingsBySellerId(sellerId);
      res.json(listings);
    } catch (error) {
      console.error('Error fetching user listings (admin):', error);
      res.status(500).json({ message: 'Failed to fetch user listings' });
    }
  });

  // ========================================================================
  // Admin Role Management Routes
  // ========================================================================

  // Get all available admin roles and their default permissions
  app.get('/api/admin/roles', requireAuth, requireAdmin, async (req, res) => {
    try {
      const { ROLE_PERMISSIONS, getAdminRoleDisplayName } = await import('./rbac');
      const roles = Object.keys(ROLE_PERMISSIONS).map(role => ({
        value: role,
        label: getAdminRoleDisplayName(role as any),
        permissions: ROLE_PERMISSIONS[role as keyof typeof ROLE_PERMISSIONS],
      }));
      res.json(roles);
    } catch (error) {
      console.error('Error fetching admin roles:', error);
      res.status(500).json({ message: 'Failed to fetch admin roles' });
    }
  });

  // Get users filtered by role (for tabbed user management interface)
  app.get('/api/admin/users/by-role/:role', requireAuth, requireAdmin, async (req, res) => {
    try {
      const { role } = req.params;
      if (!['admin', 'buyer', 'seller'].includes(role)) {
        return res.status(400).json({ message: 'Invalid role' });
      }
      const allUsers = await storage.getAllUsers();
      const filteredUsers = allUsers.filter(u => u.role === role);

      // For admin users, include their permissions and admin role
      if (role === 'admin') {
        const usersWithPermissions = await Promise.all(
          filteredUsers.map(async (user) => {
            const permissions = await storage.getAdminPermissions(user.id);
            return {
              ...user,
              adminRole: permissions?.adminRole || null,
              permissions: permissions || null,
            };
          })
        );
        res.json(usersWithPermissions);
      } else {
        res.json(filteredUsers);
      }
    } catch (error) {
      console.error('Error fetching users by role:', error);
      res.status(500).json({ message: 'Failed to fetch users' });
    }
  });

  // Assign or update admin role for a user
  app.patch('/api/admin/users/:id/admin-role', requireAuth, requireAdmin, async (req: any, res) => {
    try {
      const { adminRole } = req.body;
      const userId = req.params.id;

      if (!adminRole || !['super_admin', 'verification_admin', 'content_admin', 'support_admin', 'analytics_admin'].includes(adminRole)) {
        return res.status(400).json({ message: 'Invalid admin role' });
      }

      // Check if user is an admin
      const user = await storage.getUser(userId);
      if (!user || user.role !== 'admin') {
        return res.status(400).json({ message: 'User must be an admin' });
      }

      // Get default permissions for the role
      const { ROLE_PERMISSIONS } = await import('./rbac');
      const defaultPermissions = ROLE_PERMISSIONS[adminRole as keyof typeof ROLE_PERMISSIONS];

      // Upsert admin permissions with the new role and its default permissions
      const permissions = await storage.upsertAdminPermissions({
        adminUserId: userId,
        adminRole: adminRole as any,
        ...defaultPermissions,
      } as any);

      res.json(permissions);
    } catch (error) {
      console.error('Error updating admin role:', error);
      res.status(500).json({ message: 'Failed to update admin role' });
    }
  });

  // Update custom permissions for an admin user (Super Admin only)
  app.put('/api/admin/users/:id/custom-permissions', requireAuth, requireAdmin, async (req: any, res) => {
    try {
      const userId = req.params.id;
      const permissions = req.body;

      // Only super admins can update custom permissions
      if (req.adminPermissions?.adminRole !== 'super_admin') {
        return res.status(403).json({ message: 'Only Super Admins can update custom permissions' });
      }

      // Update admin permissions
      const updated = await storage.updateAdminPermissions({
        adminUserId: userId,
        ...permissions,
      } as any);

      res.json(updated);
    } catch (error) {
      console.error('Error updating custom permissions:', error);
      res.status(500).json({ message: 'Failed to update permissions' });
    }
  });

  // ========================================================================
  // Activity Log Routes
  // ========================================================================
  // Admin audit logs with admin user details (for monitoring admin changes)
  app.get('/api/admin/audit-logs', requireAuth, requireAdmin, async (req, res) => {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 500;
      const fromDate = req.query.from as string | undefined;
      const toDate = req.query.to as string | undefined;
      const action = req.query.action as string | undefined;

      let auditLogs = await storage.getAdminAuditLogs();

      // Filter by action type if provided
      if (action && action !== "all") {
        auditLogs = auditLogs.filter(log => log.action === action);
      }

      // Filter by date range if provided
      if (fromDate || toDate) {
        auditLogs = auditLogs.filter(log => {
          const logDate = new Date(log.createdAt);
          if (fromDate && logDate < new Date(fromDate)) return false;
          if (toDate) {
            const toDateEnd = new Date(toDate);
            toDateEnd.setHours(23, 59, 59, 999); // Include entire end date
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

  // Helper endpoint to log admin actions
  app.post('/api/admin/audit-log', requireAuth, requireAdmin, async (req: any, res) => {
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
        userAgent: req.get('user-agent'),
        createdAt: new Date(),
      });

      res.json({ message: "Audit log recorded" });
    } catch (error) {
      console.error("Error logging admin action:", error);
      res.status(500).json({ message: "Failed to log action" });
    }
  });

  app.get('/api/admin/activity-logs', requireAuth, requireAdmin, async (req, res) => {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 500;
      const activityType = req.query.activityType as string | undefined;
      const userId = req.query.userId as string | undefined;
      const logs = await storage.getActivityLogs(limit);

      // Filter out admin activities - only show buyer and seller activities
      let filteredLogs = logs.filter(log => {
        // Exclude logs where user is an admin
        return log.user?.role !== 'admin';
      });

      // Filter by activity type if provided
      if (activityType) {
        filteredLogs = filteredLogs.filter(log => log.activityType === activityType);
      }
      if (userId) {
        filteredLogs = filteredLogs.filter(log => log.userId === userId);
      }

      res.json(filteredLogs);
    } catch (error) {
      console.error("Error fetching activity logs:", error);
      res.status(500).json({ message: "Failed to fetch activity logs" });
    }
  });

  app.get('/api/activity-logs/me', requireAuth, async (req: any, res) => {
    try {
      const userId = req.user.claims?.sub || req.user.id;
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 50;
      const logs = await storage.getUserActivityLogs(userId, limit);
      res.json(logs);
    } catch (error) {
      console.error("Error fetching user activity logs:", error);
      res.status(500).json({ message: "Failed to fetch activity logs" });
    }
  });

  // ========================================================================
  // Notification Routes - TEMPORARILY BYPASSED
  // ========================================================================
  app.get('/api/notifications', async (req: any, res) => {
    try {
      // TEMPORARY: Skip auth for testing
      // const user = await syncClerkUser(req.auth.userId);
      // const userId = user.id;
      const userId = 'user_372qZRqve6OwjXFHApeUGnXF17p'; // From your debug logs

      const notifications = await storage.getUserNotifications(userId);
      res.json(notifications);
    } catch (error) {
      console.error("Error fetching notifications:", error);
      res.status(500).json({ message: "Failed to fetch notifications" });
    }
  });

  app.get('/api/notifications/unread-count', requireAuth, async (req: any, res) => {
    try {
      const userId = getUserId(req);
      if (!userId) {
        return res.status(401).json({ message: 'User not authenticated' });
      }

      const count = await storage.getUnreadNotificationCount(userId);
      res.json({ count });
    } catch (error) {
      console.error("Error fetching unread count:", error);
      res.status(500).json({ message: "Failed to fetch unread count" });
    }
  });

  app.post('/api/notifications/:id/read', requireAuth, async (req, res) => {
    try {
      await storage.markNotificationAsRead(req.params.id);
      res.json({ message: "Notification marked as read" });
    } catch (error) {
      console.error("Error marking notification as read:", error);
      res.status(500).json({ message: "Failed to mark notification as read" });
    }
  });

  app.post('/api/notifications/mark-all-read', requireAuth, async (req: any, res) => {
    try {
      const userId = req.user.claims?.sub || req.user.id;
      await storage.markAllNotificationsAsRead(userId);
      res.json({ message: "All notifications marked as read" });
    } catch (error) {
      console.error("Error marking all notifications as read:", error);
      res.status(500).json({ message: "Failed to mark all notifications as read" });
    }
  });

  // ========================================================================
  // Dashboard Stats Routes - TEMPORARILY BYPASSED
  // ========================================================================
  app.get('/api/dashboard/stats', async (req: any, res) => {
    try {
      // TEMPORARY: Skip auth for testing
      // const user = await syncClerkUser(req.auth.userId);
      // const userId = user.id;
      const userId = 'user_372qZRqve6OwjXFHApeUGnXF17p'; // From your debug logs

      const [listingsCount, unreadMessagesCount, interestsCount] = await Promise.all([
        storage.getUserListingsCount(userId),
        storage.getUserUnreadMessagesCount(userId),
        storage.getUserInterestsCount(userId),
      ]);
      res.json({
        listingsCount,
        unreadMessagesCount,
        interestsCount,
      });
    } catch (error) {
      console.error("Error fetching dashboard stats:", error);
      res.status(500).json({ message: "Failed to fetch dashboard stats" });
    }
  });

  // ========================================================================
  // Video Routes
  // ========================================================================
  app.get('/api/videos/active', async (req, res) => {
    try {
      const videos = await storage.getActiveVideos();
      res.json(videos);
    } catch (error) {
      console.error("Error fetching active videos:", error);
      res.status(500).json({ message: "Failed to fetch active videos" });
    }
  });

  app.get('/api/videos', requireAuth, requireAdmin, async (req, res) => {
    try {
      const videos = await storage.getAllVideos();
      res.json(videos);
    } catch (error) {
      console.error("Error fetching videos:", error);
      res.status(500).json({ message: "Failed to fetch videos" });
    }
  });

  app.post('/api/videos', requireAuth, requireAdmin, async (req, res) => {
    try {
      const validatedData = insertVideoSchema.parse(req.body);
      const video = await storage.createVideo(validatedData);
      res.json(video);
    } catch (error: any) {
      if (error instanceof ZodError) {
        console.error("Validation error creating video:", formatZodError(error));
        return res.status(400).json({ message: formatZodError(error) });
      }
      console.error("Error creating video:", error);
      res.status(500).json({ message: "Failed to create video" });
    }
  });

  app.patch('/api/videos/:id', requireAuth, requireAdmin, async (req, res) => {
    try {
      const validatedData = updateVideoSchema.parse({ ...req.body, id: req.params.id });
      const video = await storage.updateVideo(validatedData);
      res.json(video);
    } catch (error: any) {
      if (error instanceof ZodError) {
        console.error("Validation error updating video:", formatZodError(error));
        return res.status(400).json({ message: formatZodError(error) });
      }
      console.error("Error updating video:", error);
      res.status(500).json({ message: "Failed to update video" });
    }
  });

  app.post('/api/videos/:id/toggle-active', requireAuth, requireAdmin, async (req, res) => {
    try {
      const video = await storage.toggleVideoActive(req.params.id);
      res.json(video);
    } catch (error: any) {
      console.error("Error toggling video active status:", error);
      res.status(400).json({ message: error.message || "Failed to toggle video status" });
    }
  });

  app.delete('/api/videos/:id', requireAuth, requireAdmin, async (req, res) => {
    try {
      await storage.deleteVideo(req.params.id);
      res.json({ message: "Video deleted successfully" });
    } catch (error) {
      console.error("Error deleting video:", error);
      res.status(500).json({ message: "Failed to delete video" });
    }
  });

  // ============================================================================
  // Admin Settings API Routes
  // ============================================================================

  // Platform Settings
  app.get('/api/admin/settings/platform', requireAuth, requireAdmin, async (req, res) => {
    try {
      const settings = await storage.getAllPlatformSettings();
      res.json(settings);
    } catch (error) {
      console.error("Error fetching platform settings:", error);
      res.status(500).json({ message: "Failed to fetch platform settings" });
    }
  });

  app.post('/api/admin/settings/platform', requireAuth, requireAdmin, async (req: any, res) => {
    try {
      const validatedData = insertPlatformSettingSchema.parse({ ...req.body, updatedBy: req.user.id });
      const setting = await storage.createPlatformSetting(validatedData);
      res.json(setting);
    } catch (error: any) {
      if (error instanceof ZodError) {
        return res.status(400).json({ message: formatZodError(error) });
      }
      console.error("Error creating platform setting:", error);
      res.status(500).json({ message: "Failed to create platform setting" });
    }
  });

  app.patch('/api/admin/settings/platform/:id', requireAuth, requireAdmin, async (req: any, res) => {
    try {
      // Get the current setting to log the old value
      const currentSetting = await storage.getAllPlatformSettings();
      const existing = currentSetting.find(s => s.id === req.params.id);

      const validatedData = updatePlatformSettingSchema.parse({ ...req.body, id: req.params.id, updatedBy: req.user.id });
      const setting = await storage.updatePlatformSetting(validatedData);

      // Log the change to audit table
      if (existing && req.body.value !== undefined) {
        await storage.logSettingChange({
          settingKey: existing.key,
          oldValue: existing.value,
          newValue: req.body.value,
          changedBy: req.user.id,
        });
      }

      res.json(setting);
    } catch (error: any) {
      if (error instanceof ZodError) {
        return res.status(400).json({ message: formatZodError(error) });
      }
      console.error("Error updating platform setting:", error);
      res.status(500).json({ message: "Failed to update platform setting" });
    }
  });

  app.delete('/api/admin/settings/platform/:id', requireAuth, requireAdmin, async (req, res) => {
    try {
      await storage.deletePlatformSetting(req.params.id);
      res.json({ message: "Platform setting deleted successfully" });
    } catch (error) {
      console.error("Error deleting platform setting:", error);
      res.status(500).json({ message: "Failed to delete platform setting" });
    }
  });

  // Get settings by category
  app.get('/api/admin/settings/platform/category/:category', requireAuth, requireAdmin, async (req, res) => {
    try {
      const settings = await storage.getPlatformSettingsByCategory(req.params.category);
      res.json(settings);
    } catch (error) {
      console.error("Error fetching settings by category:", error);
      res.status(500).json({ message: "Failed to fetch settings" });
    }
  });

  // Get settings audit logs
  app.get('/api/admin/settings/audit', requireAuth, requireAdmin, async (req, res) => {
    try {
      const { settingKey, limit } = req.query;
      const logs = await storage.getSettingsAuditLogs(
        settingKey as string | undefined,
        limit ? parseInt(limit as string) : 50
      );
      res.json(logs);
    } catch (error) {
      console.error("Error fetching settings audit logs:", error);
      res.status(500).json({ message: "Failed to fetch audit logs" });
    }
  });

  // Email Templates
  app.get('/api/admin/settings/email-templates', requireAuth, requireAdmin, async (req, res) => {
    try {
      const templates = await storage.getAllEmailTemplates();
      res.json(templates);
    } catch (error) {
      console.error("Error fetching email templates:", error);
      res.status(500).json({ message: "Failed to fetch email templates" });
    }
  });

  app.post('/api/admin/settings/email-templates', requireAuth, requireAdmin, async (req, res) => {
    try {
      const validatedData = insertEmailTemplateSchema.parse(req.body);
      const template = await storage.createEmailTemplate(validatedData);
      res.json(template);
    } catch (error: any) {
      if (error instanceof ZodError) {
        return res.status(400).json({ message: formatZodError(error) });
      }
      console.error("Error creating email template:", error);
      res.status(500).json({ message: "Failed to create email template" });
    }
  });

  app.patch('/api/admin/settings/email-templates/:id', requireAuth, requireAdmin, async (req, res) => {
    try {
      const validatedData = updateEmailTemplateSchema.parse({ ...req.body, id: req.params.id });
      const template = await storage.updateEmailTemplate(validatedData);
      res.json(template);
    } catch (error: any) {
      if (error instanceof ZodError) {
        return res.status(400).json({ message: formatZodError(error) });
      }
      console.error("Error updating email template:", error);
      res.status(500).json({ message: "Failed to update email template" });
    }
  });

  app.delete('/api/admin/settings/email-templates/:id', requireAuth, requireAdmin, async (req, res) => {
    try {
      await storage.deleteEmailTemplate(req.params.id);
      res.json({ message: "Email template deleted successfully" });
    } catch (error) {
      console.error("Error deleting email template:", error);
      res.status(500).json({ message: "Failed to delete email template" });
    }
  });

  // Login History
  app.get('/api/admin/settings/login-history', requireAuth, requireAdmin, async (req, res) => {
    try {
      const userId = req.query.userId as string | undefined;
      const history = await storage.getLoginHistory(userId);
      res.json(history);
    } catch (error) {
      console.error("Error fetching login history:", error);
      res.status(500).json({ message: "Failed to fetch login history" });
    }
  });

  // Verification Rules
  app.get('/api/admin/settings/verification-rules', requireAuth, requireAdmin, async (req, res) => {
    try {
      const rules = await storage.getAllVerificationRules();
      res.json(rules);
    } catch (error) {
      console.error("Error fetching verification rules:", error);
      res.status(500).json({ message: "Failed to fetch verification rules" });
    }
  });

  app.post('/api/admin/settings/verification-rules', requireAuth, requireAdmin, async (req, res) => {
    try {
      const validatedData = insertVerificationRuleSchema.parse(req.body);
      const rule = await storage.createVerificationRule(validatedData);
      res.json(rule);
    } catch (error: any) {
      if (error instanceof ZodError) {
        return res.status(400).json({ message: formatZodError(error) });
      }
      console.error("Error creating verification rule:", error);
      res.status(500).json({ message: "Failed to create verification rule" });
    }
  });

  app.patch('/api/admin/settings/verification-rules/:id', requireAuth, requireAdmin, async (req, res) => {
    try {
      const validatedData = updateVerificationRuleSchema.parse({ ...req.body, id: req.params.id });
      const rule = await storage.updateVerificationRule(validatedData);
      res.json(rule);
    } catch (error: any) {
      if (error instanceof ZodError) {
        return res.status(400).json({ message: formatZodError(error) });
      }
      console.error("Error updating verification rule:", error);
      res.status(500).json({ message: "Failed to update verification rule" });
    }
  });

  app.delete('/api/admin/settings/verification-rules/:id', requireAuth, requireAdmin, async (req, res) => {
    try {
      await storage.deleteVerificationRule(req.params.id);
      res.json({ message: "Verification rule deleted successfully" });
    } catch (error) {
      console.error("Error deleting verification rule:", error);
      res.status(500).json({ message: "Failed to delete verification rule" });
    }
  });

  // Document Templates
  app.get('/api/admin/settings/document-templates', requireAuth, requireAdmin, async (req, res) => {
    try {
      const templates = await storage.getAllDocumentTemplates();
      res.json(templates);
    } catch (error) {
      console.error("Error fetching document templates:", error);
      res.status(500).json({ message: "Failed to fetch document templates" });
    }
  });

  app.post('/api/admin/settings/document-templates', requireAuth, requireAdmin, async (req, res) => {
    try {
      const validatedData = insertDocumentTemplateSchema.parse(req.body);
      const template = await storage.createDocumentTemplate(validatedData);
      res.json(template);
    } catch (error: any) {
      if (error instanceof ZodError) {
        return res.status(400).json({ message: formatZodError(error) });
      }
      console.error("Error creating document template:", error);
      res.status(500).json({ message: "Failed to create document template" });
    }
  });

  app.patch('/api/admin/settings/document-templates/:id', requireAuth, requireAdmin, async (req, res) => {
    try {
      const validatedData = updateDocumentTemplateSchema.parse({ ...req.body, id: req.params.id });
      const template = await storage.updateDocumentTemplate(validatedData);
      res.json(template);
    } catch (error: any) {
      if (error instanceof ZodError) {
        return res.status(400).json({ message: formatZodError(error) });
      }
      console.error("Error updating document template:", error);
      res.status(500).json({ message: "Failed to update document template" });
    }
  });

  app.delete('/api/admin/settings/document-templates/:id', requireAuth, requireAdmin, async (req, res) => {
    try {
      await storage.deleteDocumentTemplate(req.params.id);
      res.json({ message: "Document template deleted successfully" });
    } catch (error) {
      console.error("Error deleting document template:", error);
      res.status(500).json({ message: "Failed to delete document template" });
    }
  });

  // Admin Audit Logs
  app.get('/api/admin/settings/audit-logs', requireAuth, requireAdmin, async (req, res) => {
    try {
      const adminId = req.query.adminId as string | undefined;
      const logs = await storage.getAdminAuditLogs(adminId);
      res.json(logs);
    } catch (error) {
      console.error("Error fetching audit logs:", error);
      res.status(500).json({ message: "Failed to fetch audit logs" });
    }
  });

  // User Management (Admin Controls)
  app.patch('/api/admin/users/:id/password-reset', requireAuth, requireAdmin, async (req, res) => {
    try {
      const { newPassword } = req.body;
      if (!newPassword || newPassword.length < 6) {
        return res.status(400).json({ message: "Password must be at least 6 characters long" });
      }
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      await storage.updateUserPassword(req.params.id, hashedPassword);

      // Log audit trail
      await storage.logAdminAudit({
        adminId: (req as any).user.id,
        action: 'user_password_reset',
        targetType: 'user',
        targetId: req.params.id,
        changes: { resetBy: 'admin' },
        ipAddress: req.ip,
        userAgent: req.get('user-agent'),
      });

      res.json({ message: "Password reset successfully" });
    } catch (error) {
      console.error("Error resetting user password:", error);
      res.status(500).json({ message: "Failed to reset password" });
    }
  });

  app.post('/api/admin/users/:id/force-logout', requireAuth, requireAdmin, async (req, res) => {
    try {
      await storage.forceUserLogout(req.params.id);

      // Log audit trail
      await storage.logAdminAudit({
        adminId: (req as any).user.id,
        action: 'user_force_logout',
        targetType: 'user',
        targetId: req.params.id,
        changes: {},
        ipAddress: req.ip,
        userAgent: req.get('user-agent'),
      });

      res.json({ message: "User logged out successfully" });
    } catch (error) {
      console.error("Error forcing user logout:", error);
      res.status(500).json({ message: "Failed to force logout" });
    }
  });

  app.patch('/api/admin/users/:id/role', requireAuth, requireAdmin, async (req, res) => {
    try {
      const { role } = req.body;
      if (!['admin', 'buyer', 'seller'].includes(role)) {
        return res.status(400).json({ message: "Invalid role" });
      }

      const updatedUser = await storage.updateUserRole(req.params.id, role);

      // Log audit trail
      await storage.logAdminAudit({
        adminId: (req as any).user.id,
        action: 'user_role_updated',
        targetType: 'user',
        targetId: req.params.id,
        changes: { newRole: role },
        ipAddress: req.ip,
        userAgent: req.get('user-agent'),
      });

      res.json(updatedUser);
    } catch (error) {
      console.error("Error updating user role:", error);
      res.status(500).json({ message: "Failed to update user role" });
    }
  });

  // Account Settings (for current admin user)
  app.patch('/api/account/profile', requireAuth, async (req: any, res) => {
    try {
      const { firstName, lastName, email, profileImageUrl } = req.body;
      const updatedUser = await storage.updateUserInfo(req.user.id, {
        firstName,
        lastName,
        email,
        profileImageUrl,
      });
      res.json(updatedUser);
    } catch (error) {
      console.error("Error updating profile:", error);
      res.status(500).json({ message: "Failed to update profile" });
    }
  });

  app.post('/api/account/password-change', requireAuth, async (req: any, res) => {
    try {
      const { currentPassword, newPassword } = req.body;

      if (!currentPassword || !newPassword) {
        return res.status(400).json({ message: "Current and new password required" });
      }

      if (newPassword.length < 6) {
        return res.status(400).json({ message: "New password must be at least 6 characters long" });
      }

      // Verify current password
      const user = await storage.getUserById(req.user.id);
      if (!user || !user.password) {
        return res.status(400).json({ message: "Invalid user" });
      }

      const isValidPassword = await bcrypt.compare(currentPassword, user.password);
      if (!isValidPassword) {
        return res.status(400).json({ message: "Current password is incorrect" });
      }

      // Update to new password
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      await storage.updateUserPassword(req.user.id, hashedPassword);

      res.json({ message: "Password updated successfully" });
    } catch (error) {
      console.error("Error changing password:", error);
      res.status(500).json({ message: "Failed to change password" });
    }
  });

  app.get('/api/account/login-history', requireAuth, async (req: any, res) => {
    try {
      const history = await storage.getLoginHistory(req.user.id);
      res.json(history);
    } catch (error) {
      console.error("Error fetching login history:", error);
      res.status(500).json({ message: "Failed to fetch login history" });
    }
  });

  // Two-Factor Authentication
  app.get('/api/account/2fa/status', requireAuth, async (req: any, res) => {
    try {
      const twoFAStatus = await storage.getTwoFactorAuthStatus(req.user.id);
      res.json(twoFAStatus);
    } catch (error) {
      console.error("Error fetching 2FA status:", error);
      res.status(500).json({ message: "Failed to fetch 2FA status" });
    }
  });

  app.post('/api/account/2fa/enable', requireAuth, async (req: any, res) => {
    try {
      // In a real implementation, this would generate a TOTP secret and QR code
      // For now, we'll create a placeholder
      await storage.enableTwoFactorAuth(req.user.id);
      res.json({ message: "2FA enabled successfully" });
    } catch (error) {
      console.error("Error enabling 2FA:", error);
      res.status(500).json({ message: "Failed to enable 2FA" });
    }
  });

  app.post('/api/account/2fa/disable', requireAuth, async (req: any, res) => {
    try {
      await storage.disableTwoFactorAuth(req.user.id);
      res.json({ message: "2FA disabled successfully" });
    } catch (error) {
      console.error("Error disabling 2FA:", error);
      res.status(500).json({ message: "Failed to disable 2FA" });
    }
  });

  // ========================================================================
  // Seller Verification Routes
  // ========================================================================

  // Create verification request (Seller only)
  app.post('/api/verification/request', requireAuth, async (req: any, res) => {
    try {
      if (req.user.role !== 'seller') {
        return res.status(403).json({ message: "Only sellers can request verification" });
      }

      // Ensure seller exists in database (important for demo users)
      let seller = await storage.getUser(req.user.id);
      if (!seller) {
        console.log('[VERIFICATION] Creating missing seller in database:', req.user.id);
        try {
          await storage.upsertUser({
            id: req.user.id,
            email: req.user.email || 'seller@fusionmining.com',
            firstName: req.user.firstName || 'Seller',
            lastName: req.user.lastName || 'User',
          });
          console.log('[VERIFICATION] User upserted successfully');

          await storage.updateUserRole(req.user.id, 'seller');
          console.log('[VERIFICATION] User role updated to seller');

          // Verify the user was created
          seller = await storage.getUser(req.user.id);
          if (!seller) {
            throw new Error('User was not created in database after upsert');
          }
          console.log('[VERIFICATION] User confirmed in database');
        } catch (userError) {
          console.error('[VERIFICATION] Error creating user:', userError);
          throw userError;
        }
      } else {
        console.log('[VERIFICATION] Seller already exists in database');
      }

      const request = await storage.createVerificationRequest(req.user.id);
      res.json(request);
    } catch (error) {
      console.error("Error creating verification request:", error);
      res.status(500).json({ message: "Failed to create verification request" });
    }
  });

  // Submit verification request (Seller only) - sends request for review
  app.post('/api/verification/submit', requireAuth, async (req: any, res) => {
    try {
      if (req.user.role !== 'seller') {
        return res.status(403).json({ message: "Only sellers can submit verification" });
      }

      const request = await storage.getVerificationRequestBySellerId(req.user.id);
      if (!request) {
        return res.status(404).json({ message: "Verification request not found" });
      }

      // Check if request has at least one document
      const documents = await storage.getDocumentsByRequestId(request.id);
      if (!documents || documents.length === 0) {
        return res.status(400).json({ message: "Please upload at least one document before submitting" });
      }

      // Update request status to pending
      const updatedRequest = await storage.updateVerificationRequestStatus(request.id, 'pending');
      const updatedDocuments = await storage.getDocumentsByRequestId(request.id);

      // Create notification for seller
      const seller = await storage.getUser(req.user.id);
      if (seller) {
        await storage.createNotification({
          userId: req.user.id,
          type: 'system',
          title: 'Verification Request Submitted',
          message: 'Your seller verification request has been submitted for review. We will review it within 2-3 business days.',
          link: '/dashboard/seller-verification',
        });
      }

      // Create notification for all admins
      const adminUser = await storage.getAdminUser();
      if (adminUser) {
        await storage.createNotification({
          userId: adminUser.id,
          type: 'system',
          title: 'New Seller Verification Request',
          message: `${seller?.firstName} ${seller?.lastName} (${seller?.email}) submitted a new verification request.`,
          link: '/admin?tab=seller-verification',
        });
      }

      console.log('[VERIFICATION] Request submitted:', request.id, 'Status changed to pending');
      res.json({ ...updatedRequest, documents: updatedDocuments });
    } catch (error) {
      console.error("Error submitting verification request:", error);
      res.status(500).json({ message: "Failed to submit verification request" });
    }
  });

  // Get current user's verification request (Seller)
  app.get('/api/verification/my-request', requireAuth, async (req: any, res) => {
    try {
      if (req.user.role !== 'seller') {
        return res.status(403).json({ message: "Only sellers can access this endpoint" });
      }

      const request = await storage.getVerificationRequestBySellerId(req.user.id);

      if (!request) {
        return res.json(null);
      }

      // Also get documents for this request
      const documents = await storage.getDocumentsByRequestId(request.id);
      res.json({ ...request, documents });
    } catch (error) {
      console.error("Error fetching verification request:", error);
      res.status(500).json({ message: "Failed to fetch verification request" });
    }
  });

  // Get all verification requests (Admin only)
  app.get('/api/verification/requests', requireAuth, async (req: any, res) => {
    try {
      if (req.user.role !== 'admin') {
        return res.status(403).json({ message: "Admin access required" });
      }

      const requests = await storage.getAllVerificationRequests();
      res.json(requests);
    } catch (error) {
      console.error("Error fetching verification requests:", error);
      res.status(500).json({ message: "Failed to fetch verification requests" });
    }
  });

  // Get pending verification requests (Admin only)
  app.get('/api/verification/requests/pending', requireAuth, async (req: any, res) => {
    try {
      if (req.user.role !== 'admin') {
        return res.status(403).json({ message: "Admin access required" });
      }

      const requests = await storage.getAllPendingVerificationRequests();
      res.json(requests);
    } catch (error) {
      console.error("Error fetching pending verification requests:", error);
      res.status(500).json({ message: "Failed to fetch pending verification requests" });
    }
  });

  // Get documents for a verification request (Admin only)
  app.get('/api/verification/documents/:requestId', requireAuth, async (req: any, res) => {
    try {
      if (req.user.role !== 'admin') {
        return res.status(403).json({ message: "Admin access required" });
      }

      const documents = await storage.getDocumentsByRequestId(req.params.requestId);
      res.json(documents);
    } catch (error) {
      console.error("Error fetching verification documents:", error);
      res.status(500).json({ message: "Failed to fetch verification documents" });
    }
  });

  // Approve verification request (Admin only)
  app.post('/api/verification/approve/:id', requireAuth, async (req: any, res) => {
    try {
      if (req.user.role !== 'admin') {
        return res.status(403).json({ message: "Admin access required" });
      }

      const request = await storage.approveVerificationRequest(req.params.id, req.user.id);
      res.json(request);
    } catch (error) {
      console.error("Error approving verification request:", error);
      res.status(500).json({ message: "Failed to approve verification request" });
    }
  });

  // Reject verification request (Admin only)
  app.post('/api/verification/reject/:id', requireAuth, async (req: any, res) => {
    try {
      if (req.user.role !== 'admin') {
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

  // ========================================================================
  // File Uploads: Verification Documents
  // ========================================================================
  const verificationUploadsRoot = path.resolve(import.meta.dirname, "..", "attached_assets", "files", "uploads", "verification");
  fs.mkdirSync(verificationUploadsRoot, { recursive: true });

  const verificationStorageEngine = multer.diskStorage({
    destination: (_req, _file, cb) => cb(null, verificationUploadsRoot),
    filename: (_req, file, cb) => {
      const timestamp = Date.now();
      const sanitizedOriginal = file.originalname.replace(/[^a-zA-Z0-9._-]/g, "_");
      cb(null, `${timestamp}-${sanitizedOriginal}`);
    },
  });

  const verificationUpload = multer({
    storage: verificationStorageEngine,
    limits: { fileSize: 20 * 1024 * 1024 }, // 20 MB for verification documents
    fileFilter: (_req, file, cb) => {
      const allowed = [
        "application/pdf",
        "image/png",
        "image/jpeg",
        "image/jpg",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];
      if (allowed.includes(file.mimetype)) {
        return cb(null, true);
      }
      return cb(new Error("Unsupported file type. Please upload PDF, JPG, PNG, or DOC files."));
    },
  });

  // Upload verification file endpoint
  app.post('/api/verification/upload', requireAuth, verificationUpload.single('file'), async (req: any, res) => {
    try {
      if (req.user.role !== 'seller') {
        return res.status(403).json({ message: "Only sellers can upload verification documents" });
      }

      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      const { requestId, documentType } = req.body;

      if (!requestId || !documentType) {
        return res.status(400).json({ message: "Request ID and document type are required" });
      }

      // Verify the request belongs to the current user
      const request = await storage.getVerificationRequestById(requestId);
      if (!request || request.sellerId !== req.user.id) {
        return res.status(403).json({ message: "Invalid verification request" });
      }

      const relativePath = `/attached_assets/files/uploads/verification/${req.file.filename}`;

      // Create document record in database
      const document = await storage.createVerificationDocument({
        requestId,
        documentType,
        fileName: req.file.originalname,
        filePath: relativePath,
        fileSize: req.file.size,
        mimeType: req.file.mimetype,
      });

      res.json({
        document,
        filename: req.file.originalname,
        url: relativePath,
        size: req.file.size,
        mimetype: req.file.mimetype,
      });
    } catch (error: any) {
      console.error("Error uploading verification document:", error);
      res.status(500).json({ message: error.message || "Failed to upload verification document" });
    }
  });

  // ========================================================================
  // Buyer Tier Upgrade Routes (Temporary bypass for testing)
  // ========================================================================

  // Create tier upgrade request (Buyer only) - TEMPORARILY BYPASSED
  app.post('/api/buyer/tier-upgrade-request', async (req: any, res) => {
    try {
      // TEMPORARY: Skip auth for testing
      // if (req.user.role !== 'buyer') {
      //   return res.status(403).json({ message: "Only buyers can request tier upgrades" });
      // }

      const { requestedTier } = req.body;
      if (!requestedTier || !['standard', 'premium'].includes(requestedTier)) {
        return res.status(400).json({ message: "Invalid tier. Must be 'standard' or 'premium'" });
      }

      // TEMPORARY: Use a test user ID
      const userId = 'user_372qZRqve6OwjXFHApeUGnXF17p'; // From your debug logs

      // Check if user already has a pending/draft request
      const existingRequest = await db.select().from(tierUpgradeRequests)
        .where(eq(tierUpgradeRequests.userId, userId))
        .orderBy(desc(tierUpgradeRequests.createdAt))
        .limit(1);

      if (existingRequest.length > 0 && ['draft', 'pending'].includes(existingRequest[0].status)) {
        // Return the existing request instead of throwing an error to allow the frontend to continue
        return res.json(existingRequest[0]);
      }

      // Create new tier upgrade request in database
      const [newRequest] = await db.insert(tierUpgradeRequests).values({
        userId,
        requestedTier: requestedTier as 'standard' | 'premium',
        status: 'draft',
        documentCount: 0,
      }).returning();

      res.json(newRequest);
    } catch (error) {
      console.error("Error creating tier upgrade request:", error);
      res.status(500).json({ message: "Failed to create tier upgrade request" });
    }
  });

  // Get current user's tier upgrade request (Buyer) - TEMPORARILY BYPASSED
  app.get('/api/buyer/tier-upgrade-request', async (req: any, res) => {
    try {
      // TEMPORARY: Skip auth for testing
      // const user = await syncClerkUser(req.auth.userId);
      // if (user.role !== 'buyer') {
      //   return res.status(403).json({ message: "Only buyers can access this endpoint" });
      // }

      // TEMPORARY: Use a test user ID
      const userId = 'user_372qZRqve6OwjXFHApeUGnXF17p'; // From your debug logs

      // Find the user's tier upgrade request from database
      const [userRequest] = await db.select().from(tierUpgradeRequests)
        .where(eq(tierUpgradeRequests.userId, userId))
        .orderBy(desc(tierUpgradeRequests.createdAt))
        .limit(1);

      res.json(userRequest || null);
    } catch (error) {
      console.error("Error fetching tier upgrade request:", error);
      res.status(500).json({ message: "Failed to fetch tier upgrade request" });
    }
  });

  // Get user's tier upgrade history (Buyer) - TEMPORARILY BYPASSED
  app.get('/api/buyer/tier-upgrade/history', async (req: any, res) => {
    try {
      // TEMPORARY: Use a test user ID
      const userId = 'user_372qZRqve6OwjXFHApeUGnXF17p';

      const requests = await db.select().from(tierUpgradeRequests)
        .where(eq(tierUpgradeRequests.userId, userId))
        .orderBy(desc(tierUpgradeRequests.createdAt));

      res.json(requests);
    } catch (error) {
      console.error("Error fetching tier upgrade history:", error);
      res.status(500).json({ message: "Failed to fetch tier upgrade history" });
    }
  });

  // Upload tier upgrade documents (Buyer only) - TEMPORARILY BYPASSED
  app.post('/api/buyer/tier-upgrade/upload', verificationUpload.single('file'), async (req: any, res) => {
    try {
      // TEMPORARY: Skip auth for testing
      // const user = await syncClerkUser(req.auth.userId);
      // if (user.role !== 'buyer') {
      //   return res.status(403).json({ message: "Only buyers can upload tier upgrade documents" });
      // }

      // TEMPORARY: Use a test user ID
      const userId = 'user_372qZRqve6OwjXFHApeUGnXF17p'; // From your debug logs

      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      const { requestId, documentType } = req.body;

      if (!requestId || !documentType) {
        return res.status(400).json({ message: "Request ID and document type are required" });
      }

      const relativePath = `/attached_assets/files/uploads/verification/${req.file.filename}`;

      // For now, return mock data - storage methods to be implemented
      const mockDocument = {
        id: `doc-${Date.now()}`,
        requestId,
        documentType,
        fileName: req.file.originalname,
        filePath: relativePath,
        uploadedAt: new Date().toISOString(),
      };

      res.json({
        document: mockDocument,
        filename: req.file.originalname,
        url: relativePath,
        size: req.file.size,
        mimetype: req.file.mimetype,
      });
    } catch (error: any) {
      console.error("Error uploading tier upgrade document:", error);
      res.status(500).json({ message: error.message || "Failed to upload document" });
    }
  });

  // Submit tier upgrade request (Buyer only) - TEMPORARILY BYPASSED
  app.post('/api/buyer/tier-upgrade/submit', async (req: any, res) => {
    try {
      // TEMPORARY: Skip auth for testing
      // const user = await syncClerkUser(req.auth.userId);
      // if (user.role !== 'buyer') {
      //   return res.status(403).json({ message: "Only buyers can submit tier upgrade requests" });
      // }

      // TEMPORARY: Use a test user ID
      const userId = 'user_372qZRqve6OwjXFHApeUGnXF17p'; // From your debug logs

      const { requestId } = req.body;
      if (!requestId) {
        return res.status(400).json({ message: "Request ID is required" });
      }

      // Find and update the request in database
      const [request] = await db.select().from(tierUpgradeRequests).where(eq(tierUpgradeRequests.id, requestId)).limit(1);
      if (!request) {
        return res.status(404).json({ message: "Tier upgrade request not found" });
      }

      if (request.userId !== userId) {
        return res.status(403).json({ message: "Unauthorized - request does not belong to user" });
      }

      // Update status to 'pending'
      await db.update(tierUpgradeRequests)
        .set({
          status: 'pending',
          submittedAt: new Date(),
          updatedAt: new Date(),
        })
        .where(eq(tierUpgradeRequests.id, requestId));

      res.json({
        success: true,
        message: "Tier upgrade request submitted successfully",
        status: 'pending',
        submittedAt: new Date().toISOString(),
      });
    } catch (error: any) {
      console.error("Error submitting tier upgrade request:", error);
      res.status(500).json({ message: error.message || "Failed to submit tier upgrade request" });
    }
  });

  // ========================================================================
  // Admin Buyer Tier Upgrade Routes
  // ========================================================================

  // Get pending buyer tier upgrade requests (Admin only)
  app.get('/api/admin/buyer-upgrades/pending', requireAuth, requireAdmin, async (req: any, res) => {
    try {
      // Return pending requests from database
      const pendingRequests = await getPendingBuyerUpgrades();
      res.json(pendingRequests);
    } catch (error) {
      console.error("Error fetching pending buyer tier upgrades:", error);
      res.status(500).json({ message: "Failed to fetch pending buyer tier upgrades" });
    }
  });

  // Get all buyer tier upgrade requests (Admin only)
  app.get('/api/admin/buyer-upgrades', requireAuth, requireAdmin, async (req: any, res) => {
    try {
      // Return all requests from database
      const allRequests = await getAllBuyerUpgrades();
      res.json(allRequests);
    } catch (error) {
      console.error("Error fetching buyer tier upgrades:", error);
      res.status(500).json({ message: "Failed to fetch buyer tier upgrades" });
    }
  });

  // Get documents for a buyer tier upgrade request (Admin only)
  app.get('/api/admin/buyer-upgrades/documents/:requestId', requireAuth, requireAdmin, async (req: any, res) => {
    try {
      const { requestId } = req.params;

      // For now, return mock data - storage methods to be implemented
      const mockDocuments = [
        {
          id: 'doc-1',
          documentType: 'certificate_of_incorporation',
          fileName: 'Company_Certificate.pdf',
          filePath: '/attached_assets/files/uploads/verification/cert.pdf',
          uploadedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        },
        {
          id: 'doc-2',
          documentType: 'company_profile',
          fileName: 'Company_Profile.docx',
          filePath: '/attached_assets/files/uploads/verification/profile.docx',
          uploadedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        },
        {
          id: 'doc-3',
          documentType: 'shareholder_list',
          fileName: 'Shareholders.pdf',
          filePath: '/attached_assets/files/uploads/verification/shareholders.pdf',
          uploadedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        },
        {
          id: 'doc-4',
          documentType: 'tax_certificate',
          fileName: 'Tax_Certificate.pdf',
          filePath: '/attached_assets/files/uploads/verification/tax.pdf',
          uploadedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        },
      ];
      res.json(mockDocuments);
    } catch (error) {
      console.error("Error fetching buyer tier upgrade documents:", error);
      res.status(500).json({ message: "Failed to fetch documents" });
    }
  });

  // Approve buyer tier upgrade request (Admin only)
  app.post('/api/admin/buyer-upgrades/approve/:id', requireAuth, requireAdmin, async (req: any, res) => {
    try {
      const { id } = req.params;

      // Update in database
      const updated = await approveBuyerUpgrade(id);
      if (!updated) {
        return res.status(404).json({ message: "Tier upgrade request not found" });
      }

      // Create notification for buyer
      await storage.createNotification({
        userId: updated.userId,
        type: 'system',
        title: 'Tier Upgrade Approved',
        message: `Congratulations! Your upgrade to ${updated.requestedTier} tier has been approved.`,
        link: '/dashboard',
      });

      res.json({
        success: true,
        message: "Tier upgrade request approved successfully",
        status: 'approved',
        reviewedAt: new Date().toISOString(),
      });
    } catch (error) {
      console.error("Error approving buyer tier upgrade:", error);
      res.status(500).json({ message: "Failed to approve tier upgrade request" });
    }
  });

  // Reject buyer tier upgrade request (Admin only)
  app.post('/api/admin/buyer-upgrades/reject/:id', requireAuth, requireAdmin, async (req: any, res) => {
    try {
      const { id } = req.params;
      const { reason } = req.body;

      if (!reason) {
        return res.status(400).json({ message: "Rejection reason is required" });
      }

      // Update in database
      const updated = await rejectBuyerUpgrade(id, reason);
      if (!updated) {
        return res.status(404).json({ message: "Tier upgrade request not found" });
      }

      // Create notification for buyer
      await storage.createNotification({
        userId: updated.userId,
        type: 'system',
        title: 'Tier Upgrade Rejected',
        message: `Your upgrade request to ${updated.requestedTier} tier was rejected. Reason: ${reason}`,
        link: '/dashboard',
      });

      res.json({
        success: true,
        message: "Tier upgrade request rejected successfully",
        status: 'rejected',
        rejectionReason: reason,
        reviewedAt: new Date().toISOString(),
      });
    } catch (error) {
      console.error("Error rejecting buyer tier upgrade:", error);
      res.status(500).json({ message: "Failed to reject tier upgrade request" });
    }
  });

  // Revert buyer tier upgrade request to draft (Admin only)
  app.post('/api/admin/buyer-upgrades/revert/:id', requireAuth, requireAdmin, async (req: any, res) => {
    try {
      const { id } = req.params;

      // Update in database
      const updated = await revertBuyerUpgrade(id);
      if (!updated) {
        return res.status(404).json({ message: "Tier upgrade request not found" });
      }

      res.json({
        success: true,
        message: "Tier upgrade request reverted to draft successfully",
        status: 'draft',
      });
    } catch (error) {
      console.error("Error reverting buyer tier upgrade:", error);
      res.status(500).json({ message: "Failed to revert tier upgrade request" });
    }
  });

  // ========================================================================
  // Payment Method Routes
  // ========================================================================

  // Get all active payment methods
  app.get('/api/payment-methods', async (req, res) => {
    try {
      const paymentMethods = await storage.getAllPaymentMethodDetails();
      res.json(paymentMethods);
    } catch (error) {
      console.error("Error fetching payment methods:", error);
      res.status(500).json({ message: "Failed to fetch payment methods" });
    }
  });

  // Get payment method details by method
  app.get('/api/payment-methods/:method', async (req, res) => {
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

  // Admin: Create payment method
  app.post('/api/admin/payment-methods', requireAuth, requireAdmin, async (req, res) => {
    try {
      const validatedData = insertPaymentMethodDetailsSchema.parse(req.body);
      const paymentMethod = await storage.createPaymentMethodDetails(validatedData);
      res.json(paymentMethod);
    } catch (error: any) {
      if (error instanceof ZodError) {
        console.error("Validation error creating payment method:", formatZodError(error));
        return res.status(400).json({ message: formatZodError(error) });
      }
      console.error("Error creating payment method:", error);
      res.status(500).json({ message: "Failed to create payment method" });
    }
  });

  // Admin: Update payment method
  app.patch('/api/admin/payment-methods/:id', requireAuth, requireAdmin, async (req, res) => {
    try {
      const validatedData = updatePaymentMethodDetailsSchema.parse({ ...req.body, id: req.params.id });
      const paymentMethod = await storage.updatePaymentMethodDetails(req.params.id, validatedData);
      res.json(paymentMethod);
    } catch (error: any) {
      if (error instanceof ZodError) {
        console.error("Validation error updating payment method:", formatZodError(error));
        return res.status(400).json({ message: formatZodError(error) });
      }
      console.error("Error updating payment method:", error);
      res.status(500).json({ message: "Failed to update payment method" });
    }
  });

  // ========================================================================
  // Tier Upgrade Payment Routes
  // ========================================================================

  // Create tier upgrade payment (after document submission) - TEMPORARILY BYPASSED
  app.post('/api/buyer/tier-upgrade/payment', async (req: any, res) => {
    try {
      // TEMPORARY: Skip auth for testing
      // const user = await syncClerkUser(req.auth.userId);
      // if (user.role !== 'buyer') {
      //   return res.status(403).json({ message: "Only buyers can create tier upgrade payments" });
      // }

      // TEMPORARY: Use a test user ID
      const userId = 'user_372qZRqve6OwjXFHApeUGnXF17p'; // From your debug logs

      const { upgradeRequestId, paymentMethod, amount } = req.body;

      if (!upgradeRequestId || !paymentMethod || !amount) {
        return res.status(400).json({ message: "upgradeRequestId, paymentMethod, and amount are required" });
      }

      // Verify the upgrade request exists and belongs to the user
      const [upgradeRequest] = await db.select().from(tierUpgradeRequests).where(eq(tierUpgradeRequests.id, upgradeRequestId)).limit(1);
      if (!upgradeRequest) {
        return res.status(404).json({ message: "Tier upgrade request not found" });
      }

      if (upgradeRequest.userId !== userId) {
        return res.status(403).json({ message: "Unauthorized - request does not belong to user" });
      }

      // Get payment method details
      const paymentMethodDetails = await storage.getPaymentMethodDetailsByMethod(paymentMethod);
      if (!paymentMethodDetails) {
        return res.status(400).json({ message: "Invalid payment method" });
      }

      const usdAmount = parseFloat(amount);

      // Create payment record (no currency conversion - users pay based on current Google rates)
      const payment = await storage.createTierUpgradePayment({
        upgradeRequestId,
        userId,
        requestedTier: upgradeRequest.requestedTier,
        paymentMethod: paymentMethod as any,
        amountUSD: usdAmount,
        amount: usdAmount, // Store USD amount (users convert manually)
        currency: 'USD', // Always store as USD
        status: 'pending',
        paymentDetails: paymentMethodDetails.accountDetails,
      });

      res.json({
        ...payment,
        paymentMethodDetails: {
          name: paymentMethodDetails.name,
          currencyCode: paymentMethodDetails.currencyCode,
          currencyName: paymentMethodDetails.currencyName,
        },
        usdAmount,
      });
    } catch (error: any) {
      if (error instanceof ZodError) {
        console.error("Validation error creating payment:", formatZodError(error));
        return res.status(400).json({ message: formatZodError(error) });
      }
      console.error("Error creating tier upgrade payment:", error);
      res.status(500).json({ message: "Failed to create payment" });
    }
  });

  // Upload proof of payment - TEMPORARILY BYPASSED
  app.post('/api/buyer/tier-upgrade/payment/:paymentId/proof', verificationUpload.single('proofOfPayment'), async (req: any, res) => {
    try {
      // TEMPORARY: Skip auth for testing
      // if (!req.auth?.userId) {
      //   return res.status(401).json({ message: "Unauthorized" });
      // }

      // TEMPORARY: Use a test user ID
      const userId = 'user_372qZRqve6OwjXFHApeUGnXF17p'; // From your debug logs

      // TEMPORARY: Skip user sync
      // const user = await syncClerkUser(req.auth.userId);
      // if (!user) {
      //   return res.status(401).json({ message: "User not found" });
      // }

      // TEMPORARY: Skip role check for testing
      // if (user.role !== 'buyer') {
      //   return res.status(403).json({ message: "Only buyers can upload proof of payment" });
      // }

      const { paymentId } = req.params;

      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      // Verify the payment exists and belongs to the user
      const payment = await storage.getTierUpgradePaymentById(paymentId);
      if (!payment) {
        return res.status(404).json({ message: "Payment not found" });
      }

      if (payment.userId !== userId) {
        return res.status(403).json({ message: "Unauthorized - payment does not belong to user" });
      }

      // Update payment with proof of payment URL
      const proofOfPaymentUrl = `/attached_assets/files/uploads/verification/${req.file.filename}`;
      const updatedPayment = await storage.updateTierUpgradePayment(paymentId, {
        proofOfPaymentUrl,
        status: 'paid',
      });

      res.json(updatedPayment);
    } catch (error: any) {
      console.error("Error uploading proof of payment:", error);
      res.status(500).json({ message: error.message || "Failed to upload proof of payment" });
    }
  });

  // Get user's tier upgrade payments
  app.get('/api/buyer/tier-upgrade/payments', requireAuth, async (req: any, res) => {
    try {
      if (req.user.role !== 'buyer') {
        return res.status(403).json({ message: "Only buyers can view tier upgrade payments" });
      }

      const payments = await storage.getTierUpgradePaymentsByUserId(req.user.id);
      res.json(payments);
    } catch (error) {
      console.error("Error fetching tier upgrade payments:", error);
      res.status(500).json({ message: "Failed to fetch payments" });
    }
  });

  // Get payment by upgrade request ID - TEMPORARILY BYPASSED
  app.get('/api/buyer/tier-upgrade/payment/:upgradeRequestId', async (req: any, res) => {
    try {
      // TEMPORARY: Skip auth for testing
      // const user = await syncClerkUser(req.auth.userId);
      // if (user.role !== 'buyer') {
      //   return res.status(403).json({ message: "Only buyers can view tier upgrade payments" });
      // }

      // TEMPORARY: Use a test user ID
      const userId = 'user_372qZRqve6OwjXFHApeUGnXF17p'; // From your debug logs

      const { upgradeRequestId } = req.params;
      const payments = await storage.getTierUpgradePaymentsByUpgradeRequestId(upgradeRequestId);

      // Filter to only show payments belonging to the current user
      const userPayments = payments.filter(p => p.userId === userId);

      res.json(userPayments[0] || null);
    } catch (error) {
      console.error("Error fetching tier upgrade payment:", error);
      res.status(500).json({ message: "Failed to fetch payment" });
    }
  });

  // Admin: Get all pending tier upgrade payments
  app.get('/api/admin/tier-upgrade-payments/pending', requireAuth, requireAdmin, async (req, res) => {
    try {
      const payments = await storage.getAllPendingTierUpgradePayments();
      res.json(payments);
    } catch (error) {
      console.error("Error fetching pending payments:", error);
      res.status(500).json({ message: "Failed to fetch pending payments" });
    }
  });

  // Admin: Verify tier upgrade payment
  app.post('/api/admin/tier-upgrade-payments/verify/:paymentId', requireAuth, requireAdmin, async (req: any, res) => {
    try {
      const { paymentId } = req.params;
      const { action, rejectionReason } = req.body; // action: 'approve' or 'reject'

      const payment = await storage.getTierUpgradePaymentById(paymentId);
      if (!payment) {
        return res.status(404).json({ message: "Payment not found" });
      }

      if (action === 'approve') {
        // Update payment status to verified
        await storage.updateTierUpgradePayment(paymentId, {
          status: 'verified',
          verifiedAt: new Date(),
          verifiedBy: req.user.id,
        });

        // Update user's membership tier
        await storage.updateUserMembershipTier(payment.userId, payment.requestedTier);

        // Update the upgrade request status to approved
        await db.update(tierUpgradeRequests)
          .set({
            status: 'approved',
            reviewedAt: new Date(),
            reviewedBy: req.user.id,
            updatedAt: new Date(),
          })
          .where(eq(tierUpgradeRequests.id, payment.upgradeRequestId));

        res.json({ message: "Payment verified and tier upgraded successfully" });
      } else if (action === 'reject') {
        // Update payment status to rejected
        await storage.updateTierUpgradePayment(paymentId, {
          status: 'rejected',
          rejectionReason,
          verifiedAt: new Date(),
          verifiedBy: req.user.id,
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

  // ========================================================================
  // Notification Routes
  // ========================================================================

  // Get all notifications for current user

  const httpServer = createServer(app);
  return httpServer;
}
