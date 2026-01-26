import jwt from 'jsonwebtoken';
import { parse } from 'cookie';
import { storage } from '../server/storage';

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-change-me';

export default async function handler(req: any, res: any) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).end('Method Not Allowed');
  }

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
}
