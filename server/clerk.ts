import { Clerk } from '@clerk/clerk-sdk-node';
import type { Request, Response, NextFunction } from 'express';
import { db } from './db';
import { adminPermissions } from '@shared/schema';
import { eq } from 'drizzle-orm';
import { storage } from './storage';
import jwt from 'jsonwebtoken';

// Initialize Clerk with your secret key
console.log('Initializing Clerk with secret key:', process.env.CLERK_SECRET_KEY ? 'PRESENT' : 'MISSING');
export const clerk = Clerk({
  secretKey: process.env.CLERK_SECRET_KEY!,
});

// Middleware to require authentication
export const requireAuth = async (req: any, res: Response, next: NextFunction) => {
  // DEVELOPMENT ONLY: Try Clerk auth first, fall back to JWT/test users
  if (process.env.NODE_ENV !== 'production') {
    const authHeader = req.headers.authorization;

    // Try Clerk authentication first if there's an auth header
    if (authHeader) {
      console.log('Trying Clerk auth first in development mode');
      try {
        return clerk.expressRequireAuth({
          onError: (error) => {
            console.error('Clerk auth failed in development, falling back to JWT');
            // Continue to JWT check
            throw error;
          }
        })(req, res, next);
      } catch (error) {
        // Clerk failed, continue to JWT fallback
      }
    }

    const cookieHeader = req.headers.cookie;
    if (cookieHeader) {
      // First check for JWT auth (fm_auth cookie)
      const jwtMatch = cookieHeader.match(/fm_auth=([^;]+)/);
      if (jwtMatch && jwtMatch[1]) {
        try {
          const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-change-me';
          const payload: any = jwt.verify(jwtMatch[1], JWT_SECRET);

          // Set req.auth for JWT user
          req.auth = {
            userId: payload.sub,
            sessionId: 'jwt-session',
            user: {
              publicMetadata: {
                role: payload.role,
                ...(payload.adminRole && { adminRole: payload.adminRole })
              }
            }
          };

          // Also set req.user for compatibility
          req.user = {
            id: payload.sub,
            role: payload.role,
            email: payload.email,
            firstName: payload.firstName,
            lastName: payload.lastName
          };

          console.log('JWT auth fallback for user:', payload.sub, 'role:', payload.role);
          return next();
        } catch (err) {
          console.error('Invalid JWT in requireAuth:', err);
          // Fall through to Clerk auth
        }
      }

      // Fall back to test user bypass if no JWT
      const testMatch = cookieHeader.match(/test_user_id=([^;]+)/);
      if (testMatch && testMatch[1]) {
        const testUserId = testMatch[1];
        console.log('Allowing test user bypass:', testUserId);

        // Mock the structure that requireAuth normally provides (via Clerk)
        req.auth = {
          userId: testUserId,
          sessionId: 'test-session',
        };

        // We also need to populate req.user for downstream handlers that use it directly
        // (This is normally done by your app.use middleware in routes.ts, which calls syncClerkUser)
        // Since that middleware also checks req.auth.userId, it should pick this up!

        // Hydrate req.auth.user to satisfy requireAdmin/requireSeller checks
        try {
          const dbUser = await storage.getUserByClerkId(testUserId) || await storage.getUser(testUserId);
          if (dbUser) {
            req.auth.user = {
              publicMetadata: {
                role: dbUser.role
              }
            };
            req.user = dbUser;
          }
        } catch (e) {
          console.error('Error hydrating test user auth:', e);
        }

        return next();
      }
    }
  }

  const authHeader = req.headers.authorization;
  console.log('Auth header received:', authHeader ? authHeader.substring(0, 20) + '...' : 'NONE');
  return clerk.expressRequireAuth({
    onError: (error) => {
      console.error('Clerk auth error:', error);
      res.status(401).json({ message: 'Unauthorized' });
    }
  })(req, res, next);
};

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