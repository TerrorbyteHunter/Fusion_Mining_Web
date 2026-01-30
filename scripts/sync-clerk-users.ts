import 'dotenv/config';
import { clerk } from '../server/clerk';
import { storage } from '../server/storage';

async function syncAllUsers() {
    console.log('Starting full sync from Clerk to Supabase...');

    try {
        // Fetch all users from Clerk
        // Note: getUserList has a limit of 500 by default, if you have more users
        // you would need to implement pagination.
        const clerkUsers = await clerk.users.getUserList();
        console.log(`Found ${clerkUsers.length} users in Clerk.`);

        for (const clerkUser of clerkUsers) {
            const email = clerkUser.emailAddresses[0]?.emailAddress;
            const role = (clerkUser.publicMetadata?.role || clerkUser.unsafeMetadata?.role || 'buyer') as any;

            console.log(`Syncing user: ${clerkUser.id} (${email})`);

            try {
                const dbUser = await storage.upsertUser({
                    clerkId: clerkUser.id,
                    email: email || '',
                    firstName: clerkUser.firstName || '',
                    lastName: clerkUser.lastName || '',
                    profileImageUrl: clerkUser.imageUrl || null,
                    role: role,
                });

                // Ensure profile exists
                const existingProfile = await storage.getUserProfile(dbUser.id);
                if (!existingProfile) {
                    console.log(`  - Creating profile for user: ${dbUser.id}`);
                    await storage.createUserProfile({
                        userId: dbUser.id,
                        profileType: 'individual',
                        verified: false,
                        onboardingCompleted: true,
                    });
                }
                console.log(`  - Done.`);
            } catch (err) {
                console.error(`  - Error syncing user ${clerkUser.id}:`, err);
            }
        }

        console.log('Full sync completed successfully!');
        process.exit(0);
    } catch (error) {
        console.error('Fatal error during sync:', error);
        process.exit(1);
    }
}

syncAllUsers();
