# Fusion Mining Limited - Mining Investment & Trading Platform

A comprehensive full-stack platform for mining investments, mineral trading, and partnership connections in Zambia.

## 🌟 Features

### Public Features
- **Landing Page**: Hero banner, company stats, project highlights, and embedded video
- **About Us**: Company overview, leadership team, mission/vision statements
- **Services**: Investment facilitation, mineral brokerage, licensing support, consulting
- **Sustainability**: Community and environmental initiatives with impact metrics
- **Projects**: Interactive Zambia map with filterable project cards
- **Marketplace**: Browse minerals, partnerships, and buyer requests
- **News & Insights**: Industry blog with categorized articles
- **Contact**: Form submission with company information

### User Features (Authenticated)
- **Dashboard**: Overview with metrics, quick actions, and navigation
- **Profile Management**: Individual or company profile setup
- **Marketplace Listings**: Create and manage mineral/partnership listings (Sellers)
- **Buyer Requests**: Post requirements for specific minerals
- **Messaging**: Direct communication with other platform users
- **Project Interest**: Express interest in mining projects
- **Verification Status**: Track listing approval status

### Admin Features
- **Verification Queue**: Review and approve/reject marketplace listings
- **User Management**: View all users, manage roles
- **Contact Submissions**: Review messages from contact form
- **Blog Management**: Create and publish news articles
- **Analytics**: Platform overview and statistics

## 🚀 Tech Stack

### Frontend
- **React 18** with TypeScript
- **Wouter** for routing
- **TanStack Query v5** for data fetching
- **Shadcn UI** with Radix UI primitives
- **Tailwind CSS** for styling
- **React Hook Form** with Zod validation
- **Lucide React** icons

### Backend
- **Node.js** with Express
- **TypeScript** for type safety
- **PostgreSQL** (Neon) via DATABASE_URL
- **Drizzle ORM** for database operations
- **Simple Login** (testing phase - admin/admin123)
- **Passport.js** for session management

### Design System
- **Primary Color**: Deep mining blue (#0A2463)
- **Accent Color**: Copper/earth tone (#C06014)
- **Typography**: Inter (body), Archivo (display)
- **Responsive**: Mobile-first with breakpoints

## 📦 Setup Instructions

### Prerequisites
- Node.js 20+
- PostgreSQL database (provided by Replit)
- Replit account for authentication

### Environment Variables
The following environment variables are automatically configured:
- `DATABASE_URL` - PostgreSQL connection string (required)
- `PGHOST`, `PGPORT`, `PGUSER`, `PGPASSWORD`, `PGDATABASE` - Database credentials
- `SESSION_SECRET` - Session encryption secret (auto-generated)

### Local Development Setup

1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd fusion-mining-platform
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   Create a `.env` file in the root directory:
   ```env
   DATABASE_URL=postgresql://user:password@host:port/database
   NODE_ENV=development
   SESSION_SECRET=your-secret-key-here
   ```

4. **Setup Database**
   ```bash
   npm run db:push
   ```
   This will create all necessary tables in your PostgreSQL database.

5. **Start Development Server**
   ```bash
   npm run dev
   ```
   The application will start on `http://localhost:5000`

6. **Access the Application**
   - Frontend: `http://localhost:5000`
   - Login: `http://localhost:5000/login`
   - Admin Panel: `http://localhost:5000/admin/cms` (after logging in as admin)

### Quick Start with Replit
On Replit, the setup is automatic:
1. Fork or clone the project
2. Click "Run" - dependencies install automatically
3. Database is auto-provisioned
4. Application starts at your Replit URL

The application will be available at `https://<your-repl-url>.replit.dev`

### Database Schema
The database includes:
- User accounts and profiles
- Mining projects
- Marketplace listings
- Buyer requests
- Messages
- Blog posts
- Contact submissions
- Verification queue

## 👥 Login Credentials (Testing Only - NO SECURITY)

### Simple Test Accounts
For local development and testing, use these hardcoded credentials:

**Admin Account (Full Access):**
- Username: `admin`
- Password: `admin123`
- Access: Admin panel at `/admin/cms`

**Buyer Account:**
- Username: `james`
- Password: `james123`
- Access: Buyer dashboard, create buyer requests

**Seller Account:**
- Username: `jane`
- Password: `jane123`
- Access: Seller dashboard, create marketplace listings

**How to Login:**
1. Navigate to `/login` or click "Log In" in the header
2. Enter username and password
3. Click "Login" button

**⚠️ IMPORTANT:** These are hardcoded credentials with NO SECURITY for testing purposes only. Do not use in production!

## 📁 Project Structure

```
fusion-mining-platform/
├── client/                  # Frontend React application
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   │   ├── ui/          # Shadcn components
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── StatusBadge.tsx
│   │   ├── hooks/           # Custom React hooks
│   │   │   └── useAuth.ts
│   │   ├── lib/             # Utilities
│   │   │   ├── queryClient.ts
│   │   │   └── authUtils.ts
│   │   ├── pages/           # Page components
│   │   │   ├── Landing.tsx
│   │   │   ├── About.tsx
│   │   │   ├── Services.tsx
│   │   │   ├── Sustainability.tsx
│   │   │   ├── Projects.tsx
│   │   │   ├── Marketplace.tsx
│   │   │   ├── News.tsx
│   │   │   ├── Contact.tsx
│   │   │   ├── Dashboard.tsx
│   │   │   ├── Admin.tsx
│   │   │   └── Legal*.tsx
│   │   ├── App.tsx          # Main app with routing
│   │   └── index.css        # Global styles
│   └── index.html
├── server/                  # Backend Express application
│   ├── db.ts               # Database connection
│   ├── storage.ts          # Data access layer
│   ├── routes.ts           # API endpoints
│   ├── replitAuth.ts       # Authentication
│   └── index.ts            # Server entry point
├── shared/                 # Shared types and schemas
│   └── schema.ts           # Drizzle schema & Zod types
├── attached_assets/        # Static assets
│   └── generated_images/   # Generated hero images
├── design_guidelines.md    # Design system documentation
├── replit.md              # Project documentation
└── README.md              # This file
```

## 🔒 Security Features

- **Authentication**: Secure Replit Auth with OpenID Connect
- **Authorization**: Role-based access control (Admin, Seller, Buyer)
- **Session Management**: PostgreSQL-backed sessions
- **Input Validation**: Zod schemas on all API inputs
- **SQL Injection Prevention**: Drizzle ORM parameterized queries
- **HTTPS Only**: Enforced in production
- **Environment Secrets**: Secure storage of sensitive data

## 🎨 Design Philosophy

- **Professional**: Enterprise-grade design for investment platform
- **Clean**: Uncluttered layouts with clear information hierarchy
- **Responsive**: Optimized for mobile, tablet, and desktop
- **Accessible**: WCAG AA compliant with proper contrast and focus states
- **Consistent**: Unified design system with reusable patterns

## 🛠️ Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run db:push      # Push schema to database
npm run db:studio    # Open Drizzle Studio
npm run db:generate  # Generate migrations
```

### Code Organization

- **Components**: Reusable UI elements in `client/src/components/`
- **Pages**: Full page components in `client/src/pages/`
- **API Routes**: Backend endpoints in `server/routes.ts`
- **Database**: Schema in `shared/schema.ts`, queries in `server/storage.ts`
- **Types**: Shared TypeScript types from Drizzle schema

### Adding New Features

1. **Database**: Update `shared/schema.ts` with new tables/columns
2. **Backend**: Add storage methods in `server/storage.ts`
3. **API**: Create routes in `server/routes.ts`
4. **Frontend**: Build components in `client/src/`
5. **Migration**: Run `npm run db:push`

## 📝 API Documentation

### Authentication Endpoints
- `POST /api/login` - Login with username/password (testing phase)
- `GET /api/logout` - Log out current user
- `GET /api/auth/user` - Get current authenticated user
- `POST /api/test-login` - Test login with user ID (development only)

### Public Endpoints
- `GET /api/projects` - List projects
- `GET /api/marketplace/listings` - Browse listings
- `GET /api/marketplace/buyer-requests` - View requests
- `GET /api/blog` - Get blog posts
- `POST /api/contact` - Submit contact form

### Protected Endpoints (Authenticated)
- `GET /api/profile` - Get user profile
- `POST /api/projects/interest` - Express project interest
- `POST /api/marketplace/listings` - Create listing (sellers)
- `POST /api/messages` - Send message

### Message creation idempotency

To prevent duplicate messages from being created when a client retries requests (for example due to network timeouts or accidental double-clicks), the server implements idempotency for message creation.

- Clients should send an `Idempotency-Key` header with `POST /api/messages`. The server will create the message only once for a given key and return the existing message on subsequent requests with the same key.
- The codebase includes a Drizzle schema/table called `message_idempotency` and server-side helpers to atomically create a message and map the idempotency key to the created message.

If you need to add the table manually (for example before running `npm run db:push`), here's the SQL used to create the mapping table:

```sql
-- SQL migration: add message_idempotency table
CREATE TABLE IF NOT EXISTS message_idempotency (
   id BIGSERIAL PRIMARY KEY,
   key VARCHAR(255) NOT NULL UNIQUE,
   message_id BIGINT REFERENCES messages(id) ON DELETE CASCADE,
   created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);
```

After adding the table, the existing message creation endpoint will accept `Idempotency-Key` headers and perform idempotent creation.

### Admin Endpoints
- `GET /api/admin/verification-queue` - Pending listings
- `POST /api/admin/verify/:id` - Approve listing
- `POST /api/admin/reject/:id` - Reject listing
- `GET /api/admin/users` - All users

## 🤝 Contributing

This is a production platform for Fusion Mining Limited. For feature requests or bug reports, contact the development team.

## 📄 License

Proprietary - © 2024 Fusion Mining Limited

## 🔗 Links

- **Platform**: [https://fusionmining.repl.co](https://fusionmining.repl.co)
- **Support**: info@fusionmining.com
- **Documentation**: See `replit.md` for detailed technical docs

## 🙏 Acknowledgments

- Built on Replit platform
- UI components from Shadcn
- Icons from Lucide React
- Database hosted on Neon
- Simple credential-based login for testing
