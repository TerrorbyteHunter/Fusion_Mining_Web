Deployment Readiness Checklist (Must Read Before Production)

Overview
- This codebase is configured for fast local development and evaluation. Several areas intentionally use relaxed security, in-memory assumptions, and development shortcuts to enable quick iteration.
- Before production deployment, review and address every item in this checklist.

Environments
- Local development: Express server + Vite middleware, PostgreSQL (local), optional Supabase for remote DB.
- Staging/Preview: Same server build, but run as a Node process or functions environment with a real Postgres.
- Production: Server process running Express API, static client build served from `dist/public`, PostgreSQL managed (e.g., Supabase), CDN in front.

Authentication and Sessions
- Current dev login endpoints:
  - POST /api/login (development only): hardcoded users and passwords for testing.
  - POST /api/test-login (development only): logs in one of the test accounts by ID.
- Assumptions:
  - Session-based auth via passport with express-session.
  - No CSRF protection enabled during development.
  - No brute-force protection/rate limits on login.
- Before production:
  - Replace dev login with a real identity provider (OIDC/SAML) or a proper password flow.
  - Enforce HTTPS-only cookies, secure, sameSite, and reasonable session TTL.
  - Add CSRF protection for any state-changing POST requests from the browser.
  - Add rate-limiting / login throttling (e.g., ip+user).
  - Remove /api/test-login and any test accounts.

API Hosting and Client Routing
- In development, the client assumes the API is available at the same origin (server middleware mode). On Vercel, a static-only deploy will not serve Express routes.
- Options for production:
  - Deploy the Express server to a host (Render, Fly, Railway, or Vercel Functions/Edge with adaptation) and set the client to call the deployed API base URL.
  - Or deploy a single Node service that serves both the static client and the API (using `serveStatic()` in `server/vite.ts`).
- Ensure CORS policy is correct if client and API are on different domains.

Database and Migrations (Drizzle)
- Use migrations as the source of truth. Do not manually edit production schemas.
- Commands:
  - Local: set DATABASE_URL to local Postgres and run migrations (e.g., drizzle-kit push / npm run db:push).
  - Remote (Supabase): set DATABASE_URL to Supabase connection string and run the same migrations.
- Checklist:
  - Verify all local schema changes are captured in migration files.
  - Apply migrations to Supabase before deploying a build that relies on them.
  - Consider a read-only service role for the public app and restrict DDL privileges.

Messaging and Attachments
- Attachments (development): `/api/uploads/messages` accepts limited file types and sizes (10MB) and stores under `/attached_assets/files/uploads/messages/`. Files are served statically under `/attached_assets`.
- Before production:
  - Tighten MIME/type restrictions and consider antivirus or media scanning.
  - Ensure uploads require an authenticated session and authorization (only participants).
  - Consider moving uploads to object storage (S3/GCS) with signed URLs and a CDN.
  - Add retention policies and limits per user/thread.

Authorization and Roles
- Roles: admin, buyer, seller.
- Known relaxed areas (to harden):
  - Admin routes: verify admin permissions (already scaffolded), remove any unsecured fallbacks.
  - Buyer/seller scoped data: verify list/detail endpoints always filter by the authenticated user when appropriate.
  - Message permissions: ensure only participants can view/send to a thread.

Input Validation and Sanitization
- Zod is used on server endpoints; ensure all new endpoints have Zod validation.
- Sanitize any user-generated HTML if you add rich text (currently plain text).
- Consider escaping/sanitizing file names beyond simple character replacement.

Security Headers and TLS
- Add common security headers (helmet or equivalent): HSTS, frameguard, noSniff, XSS protection where applicable.
- Enforce HTTPS across all environments.

Rate Limiting and Abuse Prevention
- Add global and per-route rate limits (login, messaging, uploads).
- Add basic spam controls for messaging (throttling, content checks).

Notifications and Emails
- If enabling emails/notifications, ensure you rotate secrets and use environment variables for all credentials.
- Add unsubscribe/opt-out mechanisms and audit logging for admin actions.

Logging and Observability
- Structured logs for API requests (already partially included).
- Add error reporting (Sentry, OpenTelemetry) and metrics (Prometheus/Grafana or a hosted equivalent).
- Scrub PII from logs before shipping to external providers.

Build and Deployment
- Client build: `npm run build` creates `dist/public`. The server bundle is `dist/index.js`.
- Production server startup: `npm start` (requires correct env vars).
- Ensure `serveStatic(app)` is used in production to serve `dist/public` and that `/attached_assets` is mounted for uploads if you keep local disk storage.

Environment Variables (examples)
- DATABASE_URL: Postgres connection string (distinct per env).
- SESSION_SECRET: strong, rotated secret for sessions.
- NODE_ENV: production in prod.
- PUBLIC_BASE_URL / API_BASE_URL: set if client and API are split.

Testing and QA
- End-to-end tests (Playwright) can be expanded to cover auth flows, messaging, uploads.
- Sanity checks for migrations: run against a staging clone before prod.
- Data backfill/migrations: ensure one-way, idempotent where possible.

Things Currently Relaxed or Placeholder (Intentional for Dev)
- Dev login endpoints: `/api/login`, `/api/test-login` (REMOVE before production).
- No CSRF protection in development.
- Minimal attachment validation; local disk storage for uploads.
- No advanced rate limiting/brute-force protection.
- Some admin endpoints assume cooperative clients; enforce strict server-side checks.

Minimal Local Dev Flow (for simple testing)
1) Start server: `npm run dev` (Express + Vite middleware).
2) Visit `/login` and use dev login (admin/admin123, henry/henry123, ray/ray123).
3) Use dashboard and messaging, including attachments.
4) For Supabase: export DATABASE_URL to your Supabase URL and run migrations with the same commands used locally.

Migration Sync Tips (Local -> Supabase)
- Make all schema changes via migration files.
- Apply locally, verify, then point DATABASE_URL to Supabase and push the same migrations.
- Avoid manual changes in Supabase; keep environments reproducible via migrations.

Go-Live Checklist
- Remove all dev-only auth endpoints and test accounts.
- Lock down CORS and cookies; enable CSRF for browser POSTs.
- Add rate limiting to auth and messaging endpoints.
- Move attachments to object storage and tighten validation.
- Ensure all env vars are set in production secrets.
- Run full migration set against production DB; backup before migration.
- Confirm monitoring and logging are active with alerting.

Contact
- Keep this document up to date as you iterate; treat it as the authoritative pre-flight for releases.


