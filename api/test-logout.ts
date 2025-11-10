import { serialize } from 'cookie';

export default function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).end('Method Not Allowed');
  }

  const cookie = serialize('fm_auth', '', { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax', path: '/', maxAge: 0 });
  res.setHeader('Set-Cookie', cookie);
  res.status(200).json({ message: 'Test logout successful' });
}
