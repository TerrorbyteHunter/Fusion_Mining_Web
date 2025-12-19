import { Clerk } from '@clerk/clerk-sdk-node';
import type { Request, Response, NextFunction } from 'express';
import { db } from './db';
import { adminPermissions } from '@shared/schema';
import { eq } from 'drizzle-orm';

// Initialize Clerk with your secret key
export const clerk = Clerk({
  secretKey: process.env.CLERK_SECRET_KEY!,
});

// Middleware to require authentication
export const requireAuth = clerk.expressRequireAuth({
  onError: (error) => {
    console.error('Clerk auth error:', error);
  }
});

// Middleware to require admin role
export const requireAdmin = (req: any, res: Response, next: NextFunction) => {
  if (!req.auth?.userId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  // Check if user has admin role in public metadata
  const role = req.auth.user?.publicMetadata?.role;
  if (role !== 'admin') {
    return res.status(403).json({ message: 'Admin access required' });
  }

  next();
};

// Middleware to require seller role
export const requireSeller = (req: any, res: Response, next: NextFunction) => {
  if (!req.auth?.userId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  // Check if user has seller role in public metadata
  const role = req.auth.user?.publicMetadata?.role;
  if (role !== 'seller') {
    return res.status(403).json({ message: 'Seller access required' });
  }

  next();
};

// Middleware to require specific admin permission
export const requireAdminPermission = (permission: keyof typeof adminPermissions.$inferSelect) => {
  return async (req: any, res: Response, next: NextFunction) => {
    if (!req.auth?.userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Check if user has admin role in public metadata
    const role = req.auth.user?.publicMetadata?.role;
    if (role !== 'admin') {
      return res.status(403).json({ message: 'Admin access required' });
    }

    try {
      // Get user from database to get admin permissions
      const userPerms = await db.select().from(adminPermissions).where(eq(adminPermissions.adminUserId, req.auth.userId)).limit(1);
      
      if (!userPerms.length || !userPerms[0][permission as keyof typeof userPerms[0]]) {
        return res.status(403).json({ message: `Permission '${permission}' required` });
      }

      next();
    } catch (error) {
      console.error('Error checking admin permissions:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };
};

// Helper to get user from Clerk
export const getClerkUser = async (userId: string) => {
  try {
    return await clerk.users.getUser(userId);
  } catch (error) {
    console.error('Error fetching Clerk user:', error);
    return null;
  }
};