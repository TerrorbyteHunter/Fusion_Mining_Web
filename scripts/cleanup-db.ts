import 'dotenv/config';
import { db } from '../server/db';
import { sql } from 'drizzle-orm';

async function cleanupOrphanRecords() {
    console.log('Cleaning up orphan database records...');

    try {
        // Delete payments that refer to non-existent upgrade requests
        await db.execute(sql`
            DELETE FROM tier_upgrade_payments 
            WHERE upgrade_request_id NOT IN (SELECT id FROM tier_upgrade_requests)
        `);

        // Delete payments that refer to non-existent users
        await db.execute(sql`
            DELETE FROM tier_upgrade_payments 
            WHERE user_id NOT IN (SELECT id FROM users)
        `);

        // Delete upgrade requests that refer to non-existent users
        await db.execute(sql`
            DELETE FROM tier_upgrade_requests 
            WHERE user_id NOT IN (SELECT id FROM users)
        `);

        // Delete marketplace listings that refer to non-existent sellers
        await db.execute(sql`
            DELETE FROM marketplace_listings 
            WHERE seller_id NOT IN (SELECT id FROM users)
        `);

        // Delete projects that refer to non-existent owners
        await db.execute(sql`
            DELETE FROM projects 
            WHERE owner_id NOT IN (SELECT id FROM users)
        `);

        console.log('Success! Orphan records removed.');
        process.exit(0);
    } catch (error) {
        console.error('Error cleaning up records:', error);
        process.exit(1);
    }
}

cleanupOrphanRecords();
