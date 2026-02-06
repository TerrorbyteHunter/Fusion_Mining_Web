import 'dotenv/config';
import { db } from '../server/db';
import { users, userProfiles } from '../shared/schema';
import { eq } from 'drizzle-orm';

async function fixExistingUsers() {
    console.log('Starting comprehensive user profile fix...');

    try {
        // 1. Get all users
        const allUsers = await db.select().from(users);
        console.log(`Found ${allUsers.length} users in database.`);

        let profilesCreated = 0;
        let profilesUpdated = 0;

        for (const user of allUsers) {
            // 2. Check if profile exists
            const [profile] = await db.select()
                .from(userProfiles)
                .where(eq(userProfiles.userId, user.id))
                .limit(1);

            if (!profile) {
                // Create profile
                console.log(`Creating missing profile for user ${user.id} (${user.email})...`);
                await db.insert(userProfiles).values({
                    userId: user.id,
                    profileType: 'individual',
                    verified: false,
                });
                profilesCreated++;
            }
        }

        console.log(`Success! 
- Total Users: ${allUsers.length}
- New Profiles Created: ${profilesCreated}
- Existing Profiles Updated: ${profilesUpdated}
- All users have been "grandfathered" in.`);

        process.exit(0);
    } catch (error) {
        console.error('Error fixing users:', error);
        process.exit(1);
    }
}

fixExistingUsers();
