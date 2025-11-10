export default function handler(req: any, res: any) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).end('Method Not Allowed');
  }

  const testAccounts = [
    { id: 'test-admin-123', email: 'admin@fusionmining.com', role: 'admin', name: 'Admin User' },
    { id: 'test-seller-456', email: 'ray@fusionmining.com', role: 'seller', name: 'Ray Pass' },
    { id: 'test-buyer-789', email: 'henry@fusionmining.com', role: 'buyer', name: 'Henry Pass' },
  ];

  res.status(200).json(testAccounts);
}
