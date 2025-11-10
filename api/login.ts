import jwt from 'jsonwebtoken';
import { serialize } from 'cookie';

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-change-me';
const MAX_AGE = 60 * 60 * 24 * 7; // 7 days in seconds

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).end('Method Not Allowed');
  }

  const { username, password } = req.body || {};

  const users: Record<string, any> = {
    admin: { id: 'test-admin-123', username: 'admin', password: 'admin123', role: 'admin', email: 'admin@fusionmining.com', firstName: 'Admin', lastName: 'User' },
    henry: { id: 'test-buyer-789', username: 'henry', password: 'henry123', role: 'buyer', email: 'henry@fusionmining.com', firstName: 'Henry', lastName: 'Pass' },
    ray: { id: 'test-seller-456', username: 'ray', password: 'ray123', role: 'seller', email: 'ray@fusionmining.com', firstName: 'Ray', lastName: 'Pass' },
  };

  const user = Object.values(users).find((u) => u.username === username && u.password === password);
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign(
    { sub: user.id, role: user.role, email: user.email, firstName: user.firstName, lastName: user.lastName },
    JWT_SECRET,
    { expiresIn: MAX_AGE }
  );

  const cookie = serialize('fm_auth', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: MAX_AGE,
  });

  res.setHeader('Set-Cookie', cookie);
  res.status(200).json({ success: true, user });
}
