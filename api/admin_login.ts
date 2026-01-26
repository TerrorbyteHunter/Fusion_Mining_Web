import jwt from 'jsonwebtoken';
import { serialize } from 'cookie';

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-change-me';
const MAX_AGE = 60 * 60 * 24 * 7; // 7 days

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).end('Method Not Allowed');
  }

  const { username, password } = req.body || {};

  const adminUsers: Record<string, any> = {
    superadmin: {
      id: 'admin-super-123',
      username: 'superadmin',
      password: 'super123',
      role: 'admin',
      adminRole: 'super_admin',
      email: 'superadmin@fusionmining.com',
      firstName: 'Super',
      lastName: 'Admin'
    },
    verifyadmin: {
      id: 'admin-verification-456',
      username: 'verifyadmin',
      password: 'verify123',
      role: 'admin',
      adminRole: 'verification_admin',
      email: 'verifyadmin@fusionmining.com',
      firstName: 'Verification',
      lastName: 'Admin'
    },
    contentadmin: {
      id: 'admin-content-789',
      username: 'contentadmin',
      password: 'content123',
      role: 'admin',
      adminRole: 'content_admin',
      email: 'contentadmin@fusionmining.com',
      firstName: 'Content',
      lastName: 'Admin'
    },
    analyticsadmin: {
      id: 'admin-analytics-101',
      username: 'analyticsadmin',
      password: 'analytics123',
      role: 'admin',
      adminRole: 'analytics_admin',
      email: 'analyticsadmin@fusionmining.com',
      firstName: 'Analytics',
      lastName: 'Admin'
    },
  };

  const user = Object.values(adminUsers).find((u) => u.username === username && u.password === password);
  if (!user) {
    return res.status(401).json({ message: 'Invalid admin credentials' });
  }

  const token = jwt.sign(
    {
      sub: user.id,
      role: user.role,
      adminRole: user.adminRole,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName
    },
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