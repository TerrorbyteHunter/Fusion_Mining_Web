import express from 'express';
import { db } from '../server/db';
import { users } from '../shared/schema';

const router = express.Router();

// Clerk webhook endpoint for user.created and user.updated

router.post('/api/clerk-webhook', async (req, res) => {
  const event = req.body;
  if (!event || !event.type || !event.data) {
    return res.status(400).json({ message: 'Invalid webhook payload' });
  }

  if (event.type === 'user.created' || event.type === 'user.updated') {
    const user = event.data;
    // Upsert user in Supabase (Postgres)
    try {
      await db
        .insert(users)
        .values({
          clerkId: user.id,
          email: user.email_addresses?.[0]?.email_address || null,
          first_name: user.first_name || null,
          last_name: user.last_name || null,
          role: 'user', // or 'admin' if you want to auto-promote
          // Add other fields as needed
        })
        .onConflictDoUpdate({
          target: users.clerkId,
          set: {
            email: user.email_addresses?.[0]?.email_address || null,
            first_name: user.first_name || null,
            last_name: user.last_name || null,
            // Add other fields as needed
          },
        });
      return res.status(200).json({ message: 'User upserted' });
    } catch (error) {
      console.error('Error upserting user from Clerk webhook:', error);
      return res.status(500).json({ message: 'Failed to upsert user' });
    }
  }

  if (event.type === 'user.deleted') {
    const user = event.data;
    try {
      await db.delete(users).where(eq(users.clerkId, user.id));
      return res.status(200).json({ message: 'User deleted' });
    } catch (error) {
      console.error('Error deleting user from Clerk webhook:', error);
      return res.status(500).json({ message: 'Failed to delete user' });
    }
  }

  res.status(200).json({ message: 'Event ignored' });
});

export default router;
