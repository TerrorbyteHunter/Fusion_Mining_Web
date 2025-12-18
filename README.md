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
- **User Management**: View all users, manage roles and per-admin permissions
- **Messages**: Categorized admin messaging; start conversations with any user
- **Content CMS**: Manage blog posts, videos, and content
- **Analytics**: Platform overview and statistics

## 🚀 Tech Stack

### Frontend
- **React 18** with TypeScript
- **Clerk** for authentication and user management
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
- **Clerk** for authentication middleware

### Design System
- **Primary Color**: Deep mining blue (#0A2463)
- **Accent Color**: Copper/earth tone (#C06014)
- **Typography**: Inter (body), Archivo (display)
- **Responsive**: Mobile-first with breakpoints

## 📦 Setup Instructions

### Prerequisites
- Node.js 20+
- PostgreSQL database
- Clerk account (free tier available)

### Environment Variables
Create a `.env` file in the root directory with the following variables:

```env
# Database
DATABASE_URL=postgresql://user:password@host:port/database

# Clerk Authentication (Get these from https://clerk.com)
CLERK_SECRET_KEY=sk_test_your_secret_key_here
VITE_CLERK_PUBLISHABLE_KEY=pk_test_your_publishable_key_here

# Development
NODE_ENV=development
```

### Clerk Setup
1. **Create a Clerk Application**
   - Go to [clerk.com](https://clerk.com) and create a free account
   - Create a new application
   - Copy the `CLERK_SECRET_KEY` and `VITE_CLERK_PUBLISHABLE_KEY`

2. **Configure Sign-in/Sign-up Options**
   - In Clerk Dashboard → User & Authentication → Email, Phone, etc.
   - Enable email-based authentication
   - Configure redirect URLs for your domain

3. **User Roles Setup**
   - In Clerk Dashboard, you can set user metadata for roles
   - Admin users should have `publicMetadata.role = "admin"`

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
   - Create `.env` file with the variables above

4. **Setup Database**
   ```bash
   npm run db:push
   ```
   This will create all necessary tables in your PostgreSQL database.

5. **Start Development Server**
   ```bash
   npm run dev
   ```
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

## � Authentication

This platform uses **Clerk** for secure authentication and user management.

### User Registration & Login
- **Sign Up**: Users can create accounts at `/signup`
- **Sign In**: Users login at `/login`
- **Email Verification**: Required for account activation
- **Password Reset**: Built-in password recovery

### Admin Access
- Admin users are designated in Clerk by setting `publicMetadata.role = "admin"`
- Admin login uses the same Clerk authentication flow
- Admin panel access is controlled by role metadata

### First Admin Setup
To create the first admin user:
1. Sign up as a regular user at `/signup`
2. In Clerk Dashboard, find the user and set their public metadata:
   ```json
   {
     "role": "admin"
   }
   ```
3. The user can now access admin features

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

### Role-Based Admin Permissions

- Admin permissions are stored in `admin_permissions`:
  - `can_manage_users`, `can_manage_listings`, `can_manage_projects`, `can_manage_blog`, `can_manage_cms`, `can_view_analytics`, `can_manage_messages`.
- Super Admins without a permissions row default to full access.
- CMS access is gated by `can_manage_cms`.

Apply these SQL migrations in pgAdmin (if not using the ORM push):
- `migrations/0010_add_admin_permissions.sql`
- `migrations/0011_add_cms_permission.sql`

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
- `POST /api/admin/users` - Create user (auto-seeds admin permissions if role=admin)
- `GET /api/admin/users/:id/permissions` - Get admin permissions
- `PATCH /api/admin/users/:id/permissions` - Update admin permissions
- `POST /api/admin/messages/start` - Start general conversation with any user

### Currency

- App standardized to ZMW and USD (replace any ZAR values in sample data with ZMW).

## 🔄 Handover Notes (Important for Company Transfer)

This project was developed using personal accounts and services. When transferring to Fusion Mining Limited, please update the following:

### Accounts & Services to Transfer/Change

#### 1. **Clerk Authentication**
- **Current**: Personal Clerk account used for development
- **Action Required**: 
  - Create a company Clerk account at [clerk.com](https://clerk.com)
  - Transfer the application to the company account
  - Update `CLERK_SECRET_KEY` and `VITE_CLERK_PUBLISHABLE_KEY` in production
  - Reconfigure redirect URLs for the company domain
  - Transfer any existing user data if needed

#### 2. **Database (Neon PostgreSQL)**
- **Current**: Personal Neon account
- **Action Required**:
  - Create a company Neon account
  - Migrate the database to the company account
  - Update `DATABASE_URL` in production environment
  - Ensure database backups are transferred

#### 3. **Domain & Hosting**
- **Current**: Development URLs (localhost, Replit, etc.)
- **Action Required**:
  - Register company domain (e.g., fusionmining.com)
  - Set up production hosting (Vercel, Render, AWS, etc.)
  - Update Clerk redirect URLs to production domain
  - Configure SSL certificates

#### 4. **Email Services**
- **Current**: Clerk handles email verification with default templates
- **Action Required**:
  - Customize email templates with company branding
  - Set up custom SMTP if needed
  - Update sender email addresses

#### 5. **Third-party Services**
- **Current**: None actively integrated
- **Future**: When adding services like payment processors, file storage, etc., use company accounts

### Environment Variables to Update

Create new `.env.production` file with company credentials:

```env
# Company Clerk Keys
CLERK_SECRET_KEY=sk_live_your_company_key
VITE_CLERK_PUBLISHABLE_KEY=pk_live_your_company_key

# Company Database
DATABASE_URL=postgresql://company_db_url

# Production Settings
NODE_ENV=production
```

### Security Considerations

- **API Keys**: Never commit real API keys to version control
- **Environment Variables**: Use secure secret management in production
- **User Data**: Ensure GDPR/CCPA compliance for user data handling
- **Access Control**: Set up proper admin role assignments in Clerk

### Development vs Production

- **Development**: Uses free Clerk tier, local database
- **Production**: Upgrade to appropriate paid plans based on usage
- **Testing**: Set up staging environment with separate Clerk app

## 🤝 Contributing

This is a production platform for Fusion Mining Limited. For feature requests or bug reports, contact the development team.

## 📄 License

Proprietary - © 2024 Fusion Mining Limited

## 🔗 Links

- **Platform**: https://fusionmining.repl.co
- **Support**: info@fusionmining.com
- **Documentation**: See `replit.md` for detailed technical docs

## 🙏 Acknowledgments

- Built on Replit platform
- UI components from Shadcn
- Icons from Lucide React
- Database hosted on Neon
- Clerk for secure authentication
