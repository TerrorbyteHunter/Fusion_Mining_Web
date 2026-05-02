
import { db } from "../server/db";
import { users } from "../shared/schema";
import { sql } from "drizzle-orm";

async function checkUsers() {
  try {
    const allUsers = await db.select().from(users);
    console.log(`Total users: ${allUsers.length}`);
    allUsers.forEach(u => {
      console.log(`User: ${u.username || u.email}, Role: ${u.role}, Verification: ${u.verificationStatus}`);
    });
    
    const approved = allUsers.filter(u => u.verificationStatus === 'approved');
    console.log(`Approved users: ${approved.length}`);
  } catch (err) {
    console.error(err);
  }
  process.exit(0);
}

checkUsers();
