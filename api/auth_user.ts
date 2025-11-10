import jwt from 'jsonwebtoken';
import { parse } from 'cookie';

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-change-me';

export default async function handler(req: any, res: any) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).end('Method Not Allowed');
  }

  const cookieHeader = req.headers?.cookie || '';
  const cookies = parse(cookieHeader || '');
  const token = cookies['fm_auth'];
  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  try {
    const payload: any = jwt.verify(token, JWT_SECRET);
    // Return the user payload in the same shape as the client expects
    return res.status(200).json({ id: payload.sub, role: payload.role, email: payload.email, firstName: payload.firstName, lastName: payload.lastName });
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
}
