import 'dotenv/config';
import { db } from '../server/db';
import { projects, users } from '../shared/schema';
import { isNull, sql } from 'drizzle-orm';

async function fixProjectOwners() {
    console.log('Fixing projects with missing owner_id...');

    try {
        // 1. Find a default user to assign ownerless projects to.
        // We'll try to find an admin user first.
        const [adminUser] = await db.select().from(users).where(sql`role = 'admin'`).limit(1);

        let fallbackId: string;

        if (adminUser) {
            fallbackId = adminUser.id;
            console.log(`Using existing admin user: ${adminUser.email} (${fallbackId})`);
        } else {
            // Create a temporary "System" user if no admin exists
            console.log('No admin user found. Creating a system user...');
            const [systemUser] = await db.insert(users).values({
                id: 'system-fallback-user',
                email: 'system@fusionmining.com',
                firstName: 'System',
                lastName: 'Admin',
                role: 'admin',
            }).onConflictDoNothing().returning();

            fallbackId = systemUser?.id || 'system-fallback-user';
            console.log(`Using system user: ${fallbackId}`);
        }

        // 2. Update projects where owner_id is null
        // We use a raw SQL approach if the schema tool is blocked, 
        // but db.update should work if the runtime schema allows it.
        // If ownerId is NOT NULL in the current TS schema, drizzle might complain 
        // when trying to query for nulls if we use the ORM directly.
        // So raw SQL is safer here.

        const result = await db.execute(sql`
      UPDATE projects 
      SET owner_id = ${fallbackId} 
      WHERE owner_id IS NULL
    `);

        console.log('Success! All projects now have an owner_id.');
        process.exit(0);
    } catch (error) {
        console.error('Error fixing project owners:', error);
        process.exit(1);
    }
}

fixProjectOwners();
