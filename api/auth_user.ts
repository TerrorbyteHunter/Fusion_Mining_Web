import jwt from 'jsonwebtoken';
import { parse } from 'cookie';
import { storage } from '../server/storage';
import { syncClerkUser } from '../server/localAuth';

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-change-me';

export default async function handler(req: any, res: any) {
  try {
    console.log('Auth handler called, method:', req.method, 'auth:', !!req.auth);
    if (req.method !== 'GET') {
      res.setHeader('Allow', 'GET');
      return res.status(405).end('Method Not Allowed');
    }

    // Check if we have Clerk authentication (req.auth will be set by middleware)
    if (req.auth?.userId) {
      console.log('Auth handler: Clerk userId found:', req.auth.userId);
      const clerkUserId = req.auth.userId;
      let dbUser = await storage.getUserByClerkId(clerkUserId);
      console.log('Auth handler: DB user lookup result:', dbUser ? 'FOUND' : 'NOT FOUND');

      // Always sync user data from Clerk to ensure DB is up-to-date (roles, etc.)
      console.log('Auth handler: Attempting to sync user from Clerk...');
      try {
        await syncClerkUser(clerkUserId);
        console.log('Auth handler: Sync completed, looking up user again...');
        dbUser = await storage.getUserByClerkId(clerkUserId);
      } catch (syncError) {
        console.error('Auth handler: Error syncing Clerk user:', syncError);
        // If sync fails but we have a user in DB, we can proceed, but log it
        if (!dbUser) {
          return res.status(500).json({ message: 'Failed to sync user data' });
        }
      }

      if (!dbUser) {
        console.log('Auth handler: User not found after sync attempt');
        return res.status(404).json({ message: 'User not found' });
      }

      console.log('Auth handler: Returning user data for:', dbUser.email);

      // Get admin permissions if user is admin
      let adminPermissions = null;
      if (dbUser.role === 'admin') {
        try {
          adminPermissions = await storage.getAdminPermissions(dbUser.id);
        } catch (permError) {
          console.error('Error fetching admin permissions:', permError);
        }
      }

      return res.json({
        ...dbUser,
        adminPermissions,
      });
    }

    // Fall back to JWT authentication for legacy support
    const cookieHeader = req.headers?.cookie || '';
    const cookies = parse(cookieHeader || '');
    const token = cookies['fm_auth'];
    if (!token) return res.status(401).json({ message: 'Unauthorized' });

    try {
      const payload: any = jwt.verify(token, JWT_SECRET);
      const userId = payload.sub;
      const role = payload.role;

      // Fetch user from database to get permissions
      let dbUser = null;
      try {
        dbUser = await storage.getUser(userId) || await storage.getUserByClerkId(userId);
      } catch (e) {
        console.error('Error fetching user from DB:', e);
      }

      // Default permissions based on role
      let adminPermissions = null;
      if (role === 'admin') {
        // Determine admin role from token or default to super_admin
        const adminRole = payload.adminRole || 'super_admin';

        // Set permissions based on admin role
        switch (adminRole) {
          case 'super_admin':
            adminPermissions = {
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
            };
            break;
          case 'verification_admin':
            adminPermissions = {
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
              adminRole: 'verification_admin'
            };
            break;
          case 'content_admin':
            adminPermissions = {
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
              adminRole: 'content_admin'
            };
            break;
          case 'analytics_admin':
            adminPermissions = {
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
              adminRole: 'analytics_admin'
            };
            break;
          default:
            adminPermissions = {
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
              adminRole: 'super_admin'
            };
        }
      }

      console.log('[AUTH/USER] Retrieved admin permissions for user:', userId, adminPermissions ? 'admin' : 'non-admin');

      // Return the user payload in the same shape as the client expects
      return res.status(200).json({
        id: userId,
        role,
        email: payload.email,
        firstName: payload.firstName,
        lastName: payload.lastName,
        adminPermissions
      });
    } catch (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }
  } catch (error) {
    console.error('Auth handler error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
