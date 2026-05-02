
import { db } from "../server/db";
import { projects, marketplaceListings, buyerRequests } from "../shared/schema";
import { eq, sql } from "drizzle-orm";

async function checkCounts() {
  try {
    const pCount = await db.select({ count: sql<number>`count(*)` }).from(projects).where(eq(projects.status, 'active'));
    const mCount = await db.select({ count: sql<number>`count(*)` }).from(marketplaceListings).where(eq(marketplaceListings.status, 'approved'));
    const bCount = await db.select({ count: sql<number>`count(*)` }).from(buyerRequests).where(eq(buyerRequests.status, 'active'));
    
    console.log(`Active Projects: ${pCount[0].count}`);
    console.log(`Approved Listings: ${mCount[0].count}`);
    console.log(`Active Buyer Requests: ${bCount[0].count}`);
  } catch (err) {
    console.error(err);
  }
  process.exit(0);
}

checkCounts();
