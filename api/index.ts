// Vercel serverless entry that reuses the existing Express app
// This allows deploying the same API under /api on Vercel.
import app from "../server/index";
export default app;
