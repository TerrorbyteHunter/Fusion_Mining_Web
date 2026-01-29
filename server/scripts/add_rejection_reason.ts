import 'dotenv/config';
import { db } from "../db";
import { sql } from "drizzle-orm";

async function main() {
    console.log("Adding rejectionReason column...");
    try {
        await db.execute(sql`ALTER TABLE marketplace_listings ADD COLUMN IF NOT EXISTS rejection_reason TEXT;`);
        console.log("SUCCESS: validation_reason column added (if not existed).");
    } catch (err) {
        console.error("FAILED to add column:", err);
        process.exit(1);
    }
    process.exit(0);
}

main();
