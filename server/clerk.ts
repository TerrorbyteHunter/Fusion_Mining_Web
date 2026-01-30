import { Clerk } from '@clerk/clerk-sdk-node';
import type { Request, Response, NextFunction } from 'express';
import { db } from './db';
import { adminPermissions } from '@shared/schema';
import { eq } from 'drizzle-orm';
import { storage } from './storage';

// Initialize Clerk with your secret key
// console.log('Initializing Clerk with secret key:', process.env.CLERK_SECRET_KEY ? 'PRESENT' : 'MISSING');
export const clerk = Clerk({
  secretKey: process.env.CLERK_SECRET_KEY!,
});

// Middleware to require authentication
export const requireAuth = async (req: any, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  // console.log('Auth header received:', authHeader ? authHeader.substring(0, 20) + '...' : 'NONE');
  return clerk.expressRequireAuth({
    onError: (error) => {
      console.error('Clerk auth error:', error);
      res.status(401).json({ message: 'Unauthorized' });
    }
  })(req, res, async () => {
    // console.log('Clerk auth successful, req.auth:', req.auth);
    if (req.auth?.userId) {
      req.user = await storage.getUserByClerkId(req.auth.userId);
    }
    next();
  });
};

// Middleware to require admin role (includes authentication)
export const requireAdmin = async (req: any, res: Response, next: NextFunction) => {
  console.log('requireAdmin: Using Clerk auth');
  return clerk.expressRequireAuth({
    onError: (error) => {
      console.error('requireAdmin: Clerk auth failed:', error);
      res.status(401).json({ message: 'Authentication required' });
    }
  })(req, res, async () => {
    await checkAdminRole(req, res, next);
  });
};

// Helper function to check admin role after authentication
async function checkAdminRole(req: any, res: Response, next: NextFunction) {
  try {
    // Check if user is authenticated
    if (!req.auth?.userId) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    // Check database role
    const dbUser = await storage.getUserByClerkId(req.auth.userId);
    if (!dbUser || dbUser.role !== 'admin') {
      return res.status(403).json({ message: 'Admin access required' });
    }

    req.user = dbUser;
    next();
  } catch (error) {
    console.error('Error checking admin role:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

// Middleware to require specific admin role (super_admin, verification_admin, content_admin, analytics_admin)
export const requireAdminRole = (requiredRole: string) => {
  return async (req: any, res: Response, next: NextFunction) => {
    try {
      if (!req.auth?.userId) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      // Get admin permissions from database
      const adminPerms = await storage.getAdminPermissions(req.auth.userId);
      if (!adminPerms || adminPerms.adminRole !== requiredRole) {
        return res.status(403).json({ message: `${requiredRole} role required` });
      }

      next();
    } catch (error) {
      console.error('Error in requireAdminRole:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
};

// Middleware to require seller role
export const requireSeller = async (req: any, res: Response, next: NextFunction) => {
  try {
    if (!req.auth?.userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Check database role for seller access
    const dbUser = await storage.getUserByClerkId(req.auth.userId);
    if (!dbUser || dbUser.role !== 'seller') {
      return res.status(403).json({ message: 'Seller access required' });
    }

    req.user = dbUser;
    next();
  } catch (error) {
    console.error('Error in requireSeller:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Middleware to require specific admin permission (for backward compatibility)
export const requireAdminPermission = (permission: keyof typeof adminPermissions.$inferSelect) => {
  return async (req: any, res: Response, next: NextFunction) => {
    try {
      if (!req.auth?.userId) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      // Get admin permissions from database
      let adminPerms = await storage.getAdminPermissions(req.auth.userId);

      // If no permissions in DB, check if user is admin and provide default super_admin permissions
      if (!adminPerms) {
        const dbUser = await storage.getUserByClerkId(req.auth.userId);
        if (!dbUser || dbUser.role !== 'admin') {
          return res.status(403).json({ message: 'Admin access required' });
        }

        // Default to super_admin with all permissions
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
          adminRole: 'super_admin'
        } as any;
      }

      // Check if the user has the required permission
      if (!adminPerms?.[permission]) {
        return res.status(403).json({ message: `Permission '${permission}' required` });
      }

      next();
    } catch (error) {
      console.error('Error in requireAdminPermission:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
};

// Helper to get user from Clerk
export const getClerkUser = async (userId: string) => {
  console.log('getClerkUser: Fetching user from Clerk:', userId);
  try {
    const user = await clerk.users.getUser(userId);
    console.log('getClerkUser: Clerk user fetch successful:', !!user);
    return user;
  } catch (error) {
    console.error('getClerkUser: Error fetching Clerk user:', error);
    return null;
  }
};