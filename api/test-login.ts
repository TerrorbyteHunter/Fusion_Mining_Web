import jwt from 'jsonwebtoken';
import { serialize } from 'cookie';

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-change-me';
const MAX_AGE = 60 * 60 * 24 * 7; // 7 days

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).end('Method Not Allowed');
  }

  const { userId } = req.body || {};
  if (!userId) return res.status(400).json({ message: 'userId is required' });

  const testUsers: Record<string, any> = {
    'test-admin-123': { id: 'test-admin-123', role: 'admin', email: 'admin@fusionmining.com', firstName: 'Admin', lastName: 'User' },
    'test-seller-456': { id: 'test-seller-456', role: 'seller', email: 'ray@fusionmining.com', firstName: 'Ray', lastName: 'Pass' },
    'test-buyer-789': { id: 'test-buyer-789', role: 'buyer', email: 'henry@fusionmining.com', firstName: 'Henry', lastName: 'Pass' },
  };

  const user = testUsers[userId];
  if (!user) return res.status(404).json({ message: 'User not found' });

  const token = jwt.sign({ sub: user.id, role: user.role, email: user.email, firstName: user.firstName, lastName: user.lastName }, JWT_SECRET, { expiresIn: MAX_AGE });
  const cookie = serialize('fm_auth', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax', path: '/', maxAge: MAX_AGE });

  res.setHeader('Set-Cookie', cookie);
  res.status(200).json({ message: 'Test login successful', user });
}
