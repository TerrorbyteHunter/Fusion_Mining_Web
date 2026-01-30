import { requireAuth, requireAdmin, requireSeller, requireAdminPermission, requireAdminRole, getClerkUser } from './clerk';
import { storage } from './storage';
import { ROLE_PERMISSIONS } from './rbac';

export { requireAuth, requireAdmin, requireSeller, requireAdminPermission, requireAdminRole };

// Helper function to sync Clerk user with database
export const syncClerkUser = async (clerkUserId: string) => {
  console.log('syncClerkUser: Starting sync for userId:', clerkUserId);
  try {
    // Check if user exists in our database
    let dbUser = await storage.getUserByClerkId(clerkUserId);
    console.log('syncClerkUser: Existing user check result:', dbUser ? 'FOUND' : 'NOT FOUND');

    if (!dbUser) {
      console.log('syncClerkUser: User not found, fetching from Clerk...');
      // Get user from Clerk
      const clerkUser = await getClerkUser(clerkUserId);
      console.log('syncClerkUser: Clerk user fetch result:', clerkUser ? 'SUCCESS' : 'FAILED');
      if (!clerkUser) {
        throw new Error('User not found in Clerk');
      }

      const email = clerkUser.emailAddresses[0]?.emailAddress;
      const firstName = clerkUser.firstName || '';
      const lastName = clerkUser.lastName || '';

      console.log('syncClerkUser: Extracted user data:', { email, firstName, lastName });

      if (!email) {
        throw new Error('User email not found');
      }

      // Get role and admin role from Clerk metadata
      const clerkRole = clerkUser.publicMetadata?.role || clerkUser.unsafeMetadata?.role;
      const role = clerkRole || 'buyer';
      const adminRole = clerkUser.publicMetadata?.adminRole || clerkUser.unsafeMetadata?.adminRole;

      console.log('syncClerkUser: User role and adminRole:', { role, adminRole });

      // Create user in our database
      console.log('syncClerkUser: Creating user in database...');
      dbUser = await storage.upsertUser({
        clerkId: clerkUserId,
        email,
        firstName,
        lastName,
        role: role as any,
      });
      console.log('syncClerkUser: User creation result:', dbUser ? 'SUCCESS' : 'FAILED', 'user:', dbUser);

      // Create default profile
      console.log('syncClerkUser: Creating user profile...');
      await storage.createUserProfile({
        userId: dbUser.id,
        profileType: 'individual',
        verified: false,
        onboardingCompleted: !!clerkRole || role === 'admin',
      });
      console.log('syncClerkUser: Profile creation completed');

      // If user is admin, create admin permissions
      if (role === 'admin' && adminRole) {
        console.log('syncClerkUser: Creating admin permissions...');
        const permissions = ROLE_PERMISSIONS[adminRole as keyof typeof ROLE_PERMISSIONS] || ROLE_PERMISSIONS.super_admin;
        await storage.upsertAdminPermissions({
          adminUserId: dbUser.id,
          adminRole: adminRole as any,
          ...permissions,
        });
      }
    } else {
      // User exists, check if role needs to be updated from Clerk
      const clerkUser = await getClerkUser(clerkUserId);
      if (clerkUser) {
        const currentRole = (clerkUser.publicMetadata?.role || clerkUser.unsafeMetadata?.role || 'buyer') as string;
        const currentAdminRole = clerkUser.publicMetadata?.adminRole || clerkUser.unsafeMetadata?.adminRole;

        if (dbUser.role !== currentRole) {
          // Update the role in database
          dbUser = await storage.updateUserRole(dbUser.id, currentRole);

          // If user became admin, create admin permissions
          if (currentRole === 'admin' && currentAdminRole) {
            const permissions = ROLE_PERMISSIONS[currentAdminRole as keyof typeof ROLE_PERMISSIONS] || ROLE_PERMISSIONS.super_admin;
            await storage.upsertAdminPermissions({
              adminUserId: dbUser.id,
              adminRole: currentAdminRole as any,
              ...permissions,
            });
          }
        }
      }
    }

    console.log('syncClerkUser: Final dbUser:', dbUser);
    return dbUser;
  } catch (error) {
    console.error('Error syncing Clerk user:', error);
    throw error;
  }
};
