import type { Request, Response, NextFunction } from 'express';
import { db } from './db';
import { adminPermissions, type AdminPermissions } from '@shared/schema';
import { eq } from 'drizzle-orm';

// Extend Express Request type to include admin permissions
declare global {
  namespace Express {
    interface Request {
      adminPermissions?: AdminPermissions;
    }
  }
}

// Permission type definitions
export type Permission = keyof Omit<
  AdminPermissions,
  'id' | 'adminUserId' | 'adminRole' | 'createdAt' | 'updatedAt'
>;

export type AdminRole = 'super_admin' | 'verification_admin' | 'content_admin' | 'analytics_admin';

// Default permissions for each admin role
export const ROLE_PERMISSIONS: Record<AdminRole, Partial<Record<Permission, boolean>>> = {
  super_admin: {
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
  },
  // Combined Verification & Support Admin:
  // Handles compliance/KYC, listing approvals, and user support operations
  verification_admin: {
    canManageVerification: true,
    canManageListings: true,
    canViewAnalytics: true,
    canAccessAuditLogs: true,
    canManageMessages: true,
    canResetPasswords: true,
    canForceLogout: true,
  },
  content_admin: {
    canManageBlog: true,
    canManageCMS: true,
    canManageDocuments: true,
  },
  analytics_admin: {
    canViewAnalytics: true,
    canAccessAuditLogs: true,
  },
};

// Load admin permissions for a user
export async function loadAdminPermissions(req: any, res: Response, next: NextFunction) {
  try {
    if (!req.user || req.user.role !== 'admin') {
      return next();
    }

    const permissions = await db.query.adminPermissions.findFirst({
      where: eq(adminPermissions.adminUserId, req.user.id),
    });

    if (permissions) {
      req.adminPermissions = permissions;
    }

    next();
  } catch (error) {
    console.error('Error loading admin permissions:', error);
    next();
  }
}

// Check if user has a specific permission
export function requirePermission(permission: Permission) {
  return (req: any, res: Response, next: NextFunction) => {
    if (!req.user || req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Admin access required' });
    }

    if (!req.adminPermissions) {
      return res.status(403).json({ message: 'Admin permissions not loaded' });
    }

    if (!req.adminPermissions[permission]) {
      return res.status(403).json({
        message: `Permission denied: ${permission} is required`,
      });
    }

    next();
  };
}

// Check if user has a specific admin role
export function requireRole(...roles: AdminRole[]) {
  return (req: any, res: Response, next: NextFunction) => {
    if (!req.user || req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Admin access required' });
    }

    if (!req.adminPermissions) {
      return res.status(403).json({ message: 'Admin permissions not loaded' });
    }

    if (!roles.includes(req.adminPermissions.adminRole as AdminRole)) {
      return res.status(403).json({
        message: `Role denied: One of ${roles.join(', ')} is required`,
      });
    }

    next();
  };
}

// Check if user is a super admin
export function requireSuperAdmin(req: any, res: Response, next: NextFunction) {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Admin access required' });
  }

  if (!req.adminPermissions || req.adminPermissions.adminRole !== 'super_admin') {
    return res.status(403).json({ message: 'Super Admin access required' });
  }

  next();
}

// Log admin actions to audit log
export async function logAdminAction(
  adminId: string,
  action: string,
  targetType: string | null,
  targetId: string | null,
  changes: any,
  req: any
) {
  try {
    const ipAddress = (req.headers['x-forwarded-for'] as string)?.split(',')[0].trim() ||
      req.socket.remoteAddress ||
      null;
    const userAgent = req.headers['user-agent'] || null;

    await db.insert(require('@shared/schema').adminAuditLogs).values({
      adminId,
      action,
      targetType,
      targetId,
      changes,
      ipAddress,
      userAgent,
    });
  } catch (error) {
    console.error('Error logging admin action:', error);
  }
}

// Helper to get admin role display name
export function getAdminRoleDisplayName(role: AdminRole): string {
  const roleNames: Record<AdminRole, string> = {
    super_admin: 'Super Admin',
    verification_admin: 'Verification & Support Admin',
    content_admin: 'Content Admin',
    analytics_admin: 'Analytics Admin',
  };
  return roleNames[role] || role;
}

// Helper to get permission display name
export function getPermissionDisplayName(permission: Permission): string {
  const permissionNames: Record<Permission, string> = {
    canManageUsers: 'Manage Users',
    canManageListings: 'Manage Listings',
    canManageProjects: 'Manage Projects',
    canManageBlog: 'Manage Blog',
    canManageCMS: 'Manage CMS',
    canViewAnalytics: 'View Analytics',
    canManageMessages: 'Manage Messages',
    canManageVerification: 'Manage Verification',
    canManageSettings: 'Manage Settings',
    canManageAdmins: 'Manage Admins',
    canAccessAuditLogs: 'Access Audit Logs',
    canManageDocuments: 'Manage Documents',
    canResetPasswords: 'Reset Passwords',
    canForceLogout: 'Force Logout',
  };
  return permissionNames[permission] || permission;
}
