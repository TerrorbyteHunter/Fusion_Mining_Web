import { Pool } from 'pg';
import { config } from 'dotenv';
import { readFileSync } from 'fs';
import { join } from 'path';

config({ path: '.env' });

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

async function runMigration() {
    try {
        console.log('Running migration: Add buyer_request_id to verification_queue...');

        const migrationSQL = readFileSync(
            join(process.cwd(), 'migrations', '0018_add_buyer_request_to_verification_queue.sql'),
            'utf-8'
        );

        // Split by statement breakpoint and execute each statement
        const statements = migrationSQL
            .split('-->statement-breakpoint')
            .map(s => s.trim())
            .filter(s => s.length > 0);

        for (const statement of statements) {
            console.log('Executing:', statement.substring(0, 100) + '...');
            await pool.query(statement);
        }

        console.log('Migration completed successfully!');
    } catch (error) {
        console.error('Migration failed:', error);
        throw error;
    } finally {
        await pool.end();
    }
}

runMigration();
