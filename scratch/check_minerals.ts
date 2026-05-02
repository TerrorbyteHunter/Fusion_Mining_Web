
import { db } from "../server/db";
import { projects, marketplaceListings, buyerRequests } from "../shared/schema";
import { sql } from "drizzle-orm";

async function checkMinerals() {
  try {
    const pM = await db.select({ minerals: projects.minerals }).from(projects);
    const mM = await db.select({ mineralType: marketplaceListings.mineralType, specificType: marketplaceListings.specificType }).from(marketplaceListings);
    const bM = await db.select({ mineralType: buyerRequests.mineralType, specificType: buyerRequests.specificType }).from(buyerRequests);
    
    const uniqueMinerals = new Set<string>();
    pM.forEach(p => p.minerals?.forEach(m => uniqueMinerals.add(m.trim().toLowerCase())));
    mM.forEach(m => {
      if (m.mineralType) uniqueMinerals.add(m.mineralType.trim().toLowerCase());
      if (m.specificType) uniqueMinerals.add(m.specificType.trim().toLowerCase());
    });
    bM.forEach(b => {
      if (b.mineralType) uniqueMinerals.add(b.mineralType.trim().toLowerCase());
      if (b.specificType) uniqueMinerals.add(b.specificType.trim().toLowerCase());
    });
    
    console.log(`Unique Minerals: ${uniqueMinerals.size}`);
    console.log([...uniqueMinerals]);
  } catch (err) {
    console.error(err);
  }
  process.exit(0);
}

checkMinerals();
