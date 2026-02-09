
import "dotenv/config";
import { db } from "../server/db";
import { tierUpgradeRequests } from "@shared/schema";
import { desc } from "drizzle-orm";

async function main() {
    console.log(`DB URL: ${process.env.DATABASE_URL ? process.env.DATABASE_URL.substring(0, 30) : 'MISSING'}`);
    const requests = await db.select().from(tierUpgradeRequests).orderBy(desc(tierUpgradeRequests.submittedAt));

    console.log(`Found ${requests.length} requests in DB.`);
    for (const req of requests) {
        console.log(`REQ: ${req.id}`);
        console.log(`  DocCount: ${req.documentCount}`);
    }
}

main().catch(console.error).then(() => process.exit(0));
