import { requireAuth, requireAdmin, requireSeller, requireAdminPermission, getClerkUser } from './clerk';
import { storage } from './storage';

export { requireAuth, requireAdmin, requireSeller, requireAdminPermission };

// Helper function to sync Clerk user with database
export const syncClerkUser = async (clerkUserId: string) => {
  try {
    // Check if user exists in our database
    let dbUser = await storage.getUserByClerkId(clerkUserId);

    if (!dbUser) {
      // Get user from Clerk
      const clerkUser = await getClerkUser(clerkUserId);
      if (!clerkUser) {
        throw new Error('User not found in Clerk');
      }

      // Create user in our database
      const email = clerkUser.emailAddresses[0]?.emailAddress;
      const firstName = clerkUser.firstName || '';
      const lastName = clerkUser.lastName || '';

      if (!email) {
        throw new Error('User email not found');
      }

      // Set default role based on metadata (public or unsafe) or default to buyer
      const role = clerkUser.publicMetadata?.role || clerkUser.unsafeMetadata?.role || 'buyer';

      // Create user
      dbUser = await storage.upsertUser({
        clerkId: clerkUserId,
        email,
        firstName,
        lastName,
        role: role as any,
      });

      // Create default profile
      await storage.createUserProfile({
        userId: dbUser.id,
        profileType: 'individual',
        verified: false,
      });
    } else {
      // User exists, check if role needs to be updated from Clerk
      const clerkUser = await getClerkUser(clerkUserId);
      if (clerkUser) {
        const currentRole = clerkUser.publicMetadata?.role || clerkUser.unsafeMetadata?.role || 'buyer';
        if (dbUser.role !== currentRole) {
          // Update the role in database
          dbUser = await storage.updateUserRole(dbUser.id, currentRole);
        }
      }
    }

    return dbUser;
  } catch (error) {
    console.error('Error syncing Clerk user:', error);
    throw error;
  }
};
