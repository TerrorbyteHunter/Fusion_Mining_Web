
import "dotenv/config";
import { db } from "../server/db";
import { tierUpgradeRequests, users, userProfiles, tierUpgradePayments } from "@shared/schema";
import { eq, desc } from "drizzle-orm";

async function main() {
    console.log(`DB URL: ${process.env.DATABASE_URL ? process.env.DATABASE_URL.substring(0, 30) : 'MISSING'}`);
    console.log("Running getAllTierUpgradeRequests query...");

    const results = await db
        .select({
            id: tierUpgradeRequests.id,
            documentCount: tierUpgradeRequests.documentCount,
            proofOfPaymentUrl: tierUpgradePayments.proofOfPaymentUrl,
            paymentId: tierUpgradePayments.id,
        })
        .from(tierUpgradeRequests)
        .leftJoin(users, eq(tierUpgradeRequests.userId, users.id))
        .leftJoin(userProfiles, eq(tierUpgradeRequests.userId, userProfiles.userId))
        .leftJoin(tierUpgradePayments, eq(tierUpgradeRequests.id, tierUpgradePayments.upgradeRequestId))
        .orderBy(desc(tierUpgradeRequests.submittedAt));

    console.log(`[getAllTierUpgradeRequests] Found ${results.length} rows`);

    results.forEach(r => {
        console.log(`  Row: id=${r.id}, docCount=${r.documentCount}, proof=${r.proofOfPaymentUrl}, payID=${r.paymentId}`);
    });
}

main().catch(console.error).then(() => process.exit(0));
