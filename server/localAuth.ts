import { requireAuth, requireAdmin, requireSeller, requireAdminPermission, getClerkUser } from './clerk';
import { storage } from './storage';

export { requireAuth, requireAdmin, requireSeller, requireAdminPermission };

// Helper function to sync Clerk user with database
export const syncClerkUser = async (clerkUserId: string) => {
  try {
    // Check if user exists in our database
    // Optimization: If ID starts with 'test-' or 'admin-', it's a test user, bypass Clerk API
    if (clerkUserId.startsWith('test-') || clerkUserId.startsWith('admin-')) {
      const dbUser = await storage.getUserByClerkId(clerkUserId) || await storage.getUser(clerkUserId);
      if (dbUser) {
        return dbUser;
      }
      // For test/admin users, create them in DB if they don't exist
      // This handles the case where JWT auth creates users that aren't in Clerk
      const testUsers: Record<string, any> = {
        'admin-super-123': {
          clerkId: 'admin-super-123',
          email: 'superadmin@fusionmining.com',
          firstName: 'Super',
          lastName: 'Admin',
          role: 'admin'
        },
        'admin-verification-456': {
          clerkId: 'admin-verification-456',
          email: 'verifyadmin@fusionmining.com',
          firstName: 'Verification',
          lastName: 'Admin',
          role: 'admin'
        },
        'admin-content-789': {
          clerkId: 'admin-content-789',
          email: 'contentadmin@fusionmining.com',
          firstName: 'Content',
          lastName: 'Admin',
          role: 'admin'
        },
        'admin-analytics-101': {
          clerkId: 'admin-analytics-101',
          email: 'analyticsadmin@fusionmining.com',
          firstName: 'Analytics',
          lastName: 'Admin',
          role: 'admin'
        }
      };

      const testUserData = testUsers[clerkUserId];
      if (testUserData) {
        const newUser = await storage.upsertUser(testUserData);
        return newUser;
      }

      // If not in our test users list, fall through to standard logic
    }

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
        const currentRole = (clerkUser.publicMetadata?.role || clerkUser.unsafeMetadata?.role || 'buyer') as string;
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
