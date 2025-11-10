import 'dotenv/config';
import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic } from "./vite";
import session from "express-session";
import connectPgSimple from "connect-pg-simple";
import passport from "passport";
import pg from "pg";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// If running behind a proxy (Vite middleware or other), trust the first proxy
// so that secure cookie / sameSite behavior and req.protocol are correct.
app.set('trust proxy', 1);

// PostgreSQL session store setup
const PgStore = connectPgSimple(session);
const sessionStore = new PgStore({
  conString: process.env.DATABASE_URL,
  tableName: 'sessions',
  createTableIfMissing: true,
});

// Session setup with PostgreSQL store
app.use(session({
  store: sessionStore,
  secret: process.env.SESSION_SECRET || 'dev-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production', // use secure cookies in production
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

// Initialize passport
app.use(passport.initialize());
app.use(passport.session());

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

(async () => {
  const server = await registerRoutes(app);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    throw err;
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
    // This helps developers who haven't run migrations yet get a friendly
    // suggestion to run `npm run db:push` when the DB is out-of-sync.
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
      console.log(`Server running at http://localhost:${port}`);
    });
  } else {
    // Production: serve static files
    serveStatic(app);
    
    // Only listen on port if NOT on Vercel or Replit
    // Vercel and Replit don't need us to call server.listen()
    if (!process.env.VERCEL && !process.env.REPL_ID) {
      const port = parseInt(process.env.PORT || '5000', 10);
      server.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
      });
    }
  }
})();

// Export the app for Vercel serverless
export default app;
