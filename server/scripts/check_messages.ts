import 'dotenv/config';
import { db } from '../db';
import { messages } from '@shared/schema';
import { messageThreads } from '@shared/schema';
import { eq, sql } from 'drizzle-orm';

async function run() {
  const userId = process.argv[2] || 'test-buyer-789';
  console.log('Checking messages for user:', userId);
  const rows = await db.select().from(messages).where(eq(messages.receiverId, userId)).orderBy(messages.createdAt);
  console.log('Messages where user is receiver:', rows.length);
  console.dir(rows, { depth: 3 });

  const rows2 = await db.select().from(messages).where(eq(messages.senderId, userId)).orderBy(messages.createdAt);
  console.log('Messages where user is sender:', rows2.length);
  console.dir(rows2, { depth: 3 });

  const rows3 = await db.select().from(messages).where(sql`${messages.receiverId} = ${userId} OR ${messages.senderId} = ${userId}`).orderBy(messages.createdAt);
  console.log('Messages where user is sender OR receiver:', rows3.length);
  console.dir(rows3, { depth: 3 });

  process.exit(0);
}

run().catch(err => { console.error(err); process.exit(1); });
