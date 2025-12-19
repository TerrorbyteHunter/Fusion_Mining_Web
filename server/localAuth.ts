import { requireAuth, requireAdmin, requireSeller, requireAdminPermission } from './clerk';
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

      // Create user
      dbUser = await storage.upsertUser({
        clerkId: clerkUserId,
        email,
        firstName,
        lastName,
      });

      // Set default role based on metadata or default to buyer
      const role = clerkUser.publicMetadata?.role || 'buyer';
      await storage.updateUserRole(dbUser.id, role);

      // Create default profile
      await storage.createUserProfile({
        userId: dbUser.id,
        profileType: 'individual',
        verified: false,
      });
    }

    return dbUser;
  } catch (error) {
    console.error('Error syncing Clerk user:', error);
    throw error;
  }
};