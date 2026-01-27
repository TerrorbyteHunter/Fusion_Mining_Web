import 'dotenv/config';
import path from 'path';
import fs from 'fs';

// Load .env from parent directory if not found in current directory
if (!process.env.CLERK_SECRET_KEY) {
  require('dotenv').config({ path: path.resolve(__dirname, '..', '.env') });
}

import express, { type Request, Response, NextFunction } from "express";
import cors from "cors";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic } from "./vite";
import { requireAuth } from "./clerk";
import pg from "pg";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Basic startup info for debugging on platforms like Render
console.log('Starting server bootstrap', { NODE_ENV: process.env.NODE_ENV, PORT: process.env.PORT });

// Global handlers to capture uncaught errors and rejections (log them so Render shows details)
process.on('uncaughtException', (err) => {
  console.error('uncaughtException:', err instanceof Error ? err.stack || err.message : String(err));
});
process.on('unhandledRejection', (reason) => {
  console.error('unhandledRejection:', reason instanceof Error ? reason.stack || reason.message : String(reason));
});

// If running behind a proxy (Vite middleware or other), trust the first proxy
// so that secure cookie / sameSite behavior and req.protocol are correct.
app.set('trust proxy', 1);

// CORS for cross-origin API (e.g., client on vercel.app, API on render.com)
const corsOrigin = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(',').map(s => s.trim())
  : undefined;
app.use(cors({
  origin: corsOrigin || true,
  credentials: true,
}));

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      console.log(logLine);
    }
  });

  next();
});

// Boot the server and register routes
(async () => {
  try {
    console.log('Registering routes...');
    const server = await registerRoutes(app);
    console.log('Routes registered');

    // In development, mount API handlers from api/ directory
    if (app.get("env") === "development") {
      console.log('Mounting API handlers for development...');
      const loginHandler = (await import('../api/login')).default;
      const logoutHandler = (await import('../api/logout')).default;
      const authUserHandler = (await import('../api/auth_user')).default;

      app.post('/api/login', loginHandler);
      app.post('/api/logout', logoutHandler);
      app.get('/api/auth/user', requireAuth, authUserHandler);

      console.log('API handlers mounted');
    }

    // Central error handler: respond and log, but don't rethrow here to avoid crashing the process
    app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
      const status = err.status || err.statusCode || 500;
      const message = err.message || "Internal Server Error";

      res.status(status).json({ message });
      console.error('Unhandled error:', err);
    });

    // importantly only setup vite in development and after
    // setting up all the other routes so the catch-all route
    // doesn't interfere with the other routes
    if (app.get("env") === "development") {
      await setupVite(app, server);

      // ALWAYS serve the app on the port specified in the environment variable PORT
      // Other ports are firewalled. Default to 5000 if not specified.
      const port = parseInt(process.env.PORT || '5000', 10);

      // Development-time schema sanity check: verify important columns exist
      (async function schemaCheck() {
        try {
          const requiredColumns = ['related_project_id', 'related_listing_id'];
          const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
          const res = await pool.query(
            `select column_name from information_schema.columns where table_name = 'messages' and column_name = ANY($1)`,
            [requiredColumns]
          );
          await pool.end();

          const present = (res.rows || []).map((r: any) => r.column_name);
          const missing = requiredColumns.filter(c => !present.includes(c));
          if (missing.length) {
            console.log(`WARNING: Database schema appears out of date. Missing columns on 'messages' table: ${missing.join(', ')}`);
            console.log(`Run 'npm run db:push' to synchronize your local database schema with the application schema.`);
          }
        } catch (err) {
          // Don't block server start for this check; just log the error.
          console.log(`Schema check failed: ${(err as Error).message}`);
        }
      })();

      server.listen(port, () => {
        console.log(`Server running at http://localhost:${port} (development)`);
      });
    } else {
      // Production: serve static files
      console.log('Production mode: serving static files');
        try {
          const checkPath = path.resolve(process.cwd(), 'build', 'public');
          console.log('Resolved build public path for production:', checkPath);
          console.log('Exists:', fs.existsSync(checkPath));
          try {
            console.log('Files at build/public:', fs.readdirSync(checkPath).slice(0, 20));
          } catch (e) {
            console.log('Could not list files at build/public:', e instanceof Error ? e.message : String(e));
          }
        } catch (e) {
          console.log('Error while checking build/public path:', e instanceof Error ? e.message : String(e));
        }
        serveStatic(app);

      // Only listen on port if NOT on Vercel or Replit
      // Vercel and Replit don't need us to call server.listen()
      // Always listen in production so Render (and similar platforms) can bind to the provided PORT
      const port = parseInt(process.env.PORT || '5000', 10);
      server.listen(port, () => {
        console.log(`Server running at http://localhost:${port} (production)`);
      });
    }
  } catch (err) {
    console.error('Fatal error during server startup:', (err as Error).message || err);
    // don't re-throw so the process doesn't crash silently on Render; keep process alive for logs
  }
})();

// Export the app for Vercel serverless
export default app;
