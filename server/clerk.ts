import { Clerk } from '@clerk/clerk-sdk-node';
import type { Request, Response, NextFunction } from 'express';

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

// Helper to get user from Clerk
export const getClerkUser = async (userId: string) => {
  try {
    return await clerk.users.getUser(userId);
  } catch (error) {
    console.error('Error fetching Clerk user:', error);
    return null;
  }
};