// Placeholder index for /api root. We avoid importing the full Express server in Vercel.
// Individual serverless functions live under /api/*. If you expect an Express app,
// deploy it to a separate Node host instead.
export default function handler(_req: any, res: any) {
	res.status(404).json({ message: 'Use individual /api/* functions; full Express app not supported in this deployment.' });
}
