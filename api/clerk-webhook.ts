import { Webhook } from 'svix';
import { storage } from '../server/storage';

export default async function clerkWebhookHandler(req: any, res: any) {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    console.error('CLERK_WEBHOOK_SECRET is not set');
    return res.status(500).json({ message: 'Webhook secret not configured' });
  }

  // Get the headers
  const svix_id = req.headers["svix-id"] as string;
  const svix_timestamp = req.headers["svix-timestamp"] as string;
  const svix_signature = req.headers["svix-signature"] as string;

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    console.error('Missing svix headers');
    return res.status(400).json({ message: 'Error occured -- no svix headers' });
  }

  // Get the body
  // We need the raw body for verification.
  const body = req.rawBody || JSON.stringify(req.body);

  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: any;

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    });
  } catch (err) {
    console.error('Error verifying webhook:', err);
    return res.status(400).json({ message: 'Error occured' });
  }

  // Handle the webhooks
  const eventType = evt.type;
  console.log(`Clerk Webhook received: ${eventType}`);

  if (eventType === 'user.created' || eventType === 'user.updated') {
    const { id, email_addresses, first_name, last_name, image_url, public_metadata, unsafe_metadata } = evt.data;

    const email = email_addresses?.[0]?.email_address;
    const role = (public_metadata?.role || unsafe_metadata?.role || 'buyer') as any;

    try {
      console.log(`Upserting user: ${id} (${email})`);
      const user = await storage.upsertUser({
        clerkId: id,
        email: email || '',
        firstName: first_name || '',
        lastName: last_name || '',
        profileImageUrl: image_url || null,
        role: role,
      });

      // Ensure profile exists
      const existingProfile = await storage.getUserProfile(user.id);
      if (!existingProfile) {
        console.log(`Creating profile for user: ${user.id}`);
        await storage.createUserProfile({
          userId: user.id,
          profileType: 'individual',
          verified: false,
        });
      }

      return res.status(200).json({ message: 'User updated in database' });
    } catch (error) {
      console.error('Error updating user from Clerk webhook:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  if (eventType === 'user.deleted') {
    const { id } = evt.data;
    try {
      console.log(`Deleting user: ${id}`);
      const user = await storage.getUserByClerkId(id);
      if (user) {
        await storage.deleteUser(user.id);
      }
      return res.status(200).json({ message: 'User deleted from database' });
    } catch (error) {
      console.error('Error deleting user from Clerk webhook:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  return res.status(200).json({ message: 'Webhook received' });
}
