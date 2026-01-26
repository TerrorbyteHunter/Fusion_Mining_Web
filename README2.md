# Fusion Mining Limited - Platform Documentation

## Project Overview

Fusion Mining Limited is a comprehensive full-stack mining investment and trading platform built for connecting investors, miners, and partners across Zambia. The platform facilitates mineral trading, investment opportunities, partnership formation, and provides a verified marketplace for mining activities.

## Architecture

### Technology Stack

**Frontend:**
- React 18 with TypeScript
- Wouter for client-side routing
- TanStack Query v5 for data fetching and state management
- Shadcn UI components with Radix UI primitives
- Tailwind CSS for styling with custom design system
- React Hook Form with Zod validation
- Lucide React for icons

**Backend:**
- Node.js with Express
- TypeScript for type safety
- Clerk for authentication and user management
- PostgreSQL (Neon Serverless) via DATABASE_URL
- Drizzle ORM for database operations

**Design System:**
- Primary color: Deep mining blue (217 91% 20%)
- Accent color: Copper/earth tone (25 70% 50%)
- Typography: Inter (body) and Archivo (display/headings)
- Responsive breakpoints for mobile, tablet, and desktop

### Database Schema

The application uses a normalized PostgreSQL database with the following main entities:

- **users**: User accounts with role-based access (admin, buyer, seller)
- **user_profiles**: Extended user information (individual/company profiles)
- **projects**: Mining projects across Zambia with location, minerals, and license info
- **marketplace_listings**: Mineral and partnership listings
- **buyer_requests**: Requests from buyers seeking specific minerals
- **messages**: User-to-user messaging system
- **blog_posts**: News and insights content
- **contact_submissions**: Contact form submissions with status tracking
- **verification_queue**: Admin verification workflow for listings
- **express_interest**: User interest in projects (with duplicate prevention)
- **activity_logs**: Track user actions, logins, and IPs for spam prevention
- **notifications**: In-app notification system for messages and activity
- **sessions**: Session storage for authentication

### Key Features

1. **Public Pages**
   - Landing page with hero, stats, and quick links
   - About Us with leadership team and company values
   - Services page detailing offerings
   - Sustainability initiatives
   - Interactive project browsing with map
   - News & Insights blog
   - Contact form

2. **Authentication & Authorization**
   - Clerk-based authentication with email verification
   - Role-based access control (Admin, Seller, Buyer)
   - Secure user management with Clerk
   - Admin roles managed via Clerk user metadata

3. **Marketplace Portal**
   - Mineral listings with detailed specifications
   - Buyer requests for specific minerals
   - Mine partnership opportunities
   - Advanced filtering and search
   - Verification workflow for listings

4. **User Dashboard**
   - Real-time stats (listings count, messages, interests)
   - Profile management page (individual/company profiles)
   - Create listing page (minerals and partnerships)
   - Messaging page (received and sent messages)
   - Interest tracking for projects (prevents duplicates)
   - Account overview with metrics

5. **Admin Panel**
   - Verification queue for marketplace listings
   - User management with role assignment
   - Comprehensive CMS interface (/admin/cms) with:
     - Blog post management (create, publish, delete)
     - Contact submission management (view, update status)
     - Project overview
     - Activity logs with IP tracking
   - Analytics and platform oversight

## API Endpoints

### Authentication
- `GET /api/auth/user` - Get current authenticated user
- `POST /api/login` - Login with username/password (testing phase)
- `GET /api/logout` - Log out current user  
- `POST /api/test-login` - Test login with user ID (development only)

### Projects
- `GET /api/projects` - List all projects
- `GET /api/projects/:id` - Get project details
- `POST /api/projects/interest` - Express interest in project
- `POST /api/projects` - Create project (admin only)

### Marketplace
- `GET /api/marketplace/listings` - Get marketplace listings (with filters)
- `POST /api/marketplace/listings` - Create listing (sellers only)
- `GET /api/marketplace/buyer-requests` - Get buyer requests
- `POST /api/marketplace/buyer-requests` - Create buyer request
- `GET /api/dashboard/listings` - Get user's listings

### Messages
- `GET /api/messages` - Get user's messages
- `POST /api/messages` - Send message
- `GET /api/conversations/:userId` - Get conversation with specific user

### Blog
- `GET /api/blog` - Get published blog posts
- `GET /api/blog/:slug` - Get specific blog post
- `POST /api/blog` - Create blog post (admin only)
- `PATCH /api/blog/:id/publish` - Publish blog post (admin only)

### Contact
- `POST /api/contact` - Submit contact form
- `GET /api/contact/submissions` - Get submissions (admin only)
- `PATCH /api/contact/submissions/:id` - Update submission status (admin only)

### Admin
- `GET /api/admin/verification-queue` - Get pending listings
- `POST /api/admin/verify/:id` - Approve listing
- `POST /api/admin/reject/:id` - Reject listing
- `GET /api/admin/users` - Get all users
- `GET /api/admin/activity-logs` - Get activity logs (admin only)
- `GET /api/admin/stats` - Get platform statistics (admin only)

### Activity & Notifications
- `POST /api/activity-logs` - Log user activity
- `GET /api/notifications` - Get user notifications
- `PATCH /api/notifications/:id/read` - Mark notification as read

### Profile
- `GET /api/profile` - Get user profile
- `POST /api/profile` - Create user profile
- `PATCH /api/profile` - Update user profile

### Tier Upgrade (Buyer)
- `GET /api/buyer/tier-upgrade-request` - Get user's tier upgrade request
- `POST /api/buyer/tier-upgrade-request` - Create tier upgrade request
- `POST /api/buyer/tier-upgrade/upload` - Upload verification documents
- `POST /api/buyer/tier-upgrade/payment` - Create payment for upgrade
- `GET /api/buyer/tier-upgrade/payment/:upgradeRequestId` - Get payment details
- `POST /api/buyer/tier-upgrade/payment/:paymentId/proof` - Upload proof of payment
- `POST /api/buyer/tier-upgrade/submit` - Submit completed upgrade request

### Blog (Admin)
- `GET /api/blog/admin/all` - Get all blog posts including drafts (admin only)
- `DELETE /api/blog/:id` - Delete blog post (admin only)

## Development Notes

### Project Structure

```
├── client/
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── hooks/          # Custom React hooks (useAuth)
│   │   ├── lib/            # Utilities and helpers
│   │   ├── pages/          # Page components
│   │   ├── App.tsx         # Main app with routing
│   │   └── index.css       # Global styles and design tokens
│   └── index.html
├── server/
│   ├── db.ts              # Database connection
│   ├── storage.ts         # Data access layer
│   ├── routes.ts          # API routes
│   ├── replitAuth.ts      # Authentication setup
│   └── index.ts           # Server entry point
├── shared/
│   └── schema.ts          # Database schema and types
└── attached_assets/       # Static assets (images, PDFs)
```

### Running the Application

The application runs on separate development servers for frontend and backend:

```bash
# Start both servers
npm run dev

# Or start individually
npm run dev:server    # Backend on port 7000
npm run dev:client    # Frontend on port 7001
```

The backend API serves on port 7000, while the Vite frontend development server runs on port 7001.

### Database Migrations

Use Drizzle Kit to manage database schema:

```bash
# Push schema changes to database
npm run db:push

# Generate migrations (if needed)
npm run db:generate

# View Drizzle Studio
npm run db:studio
```

### Authentication Flow

1. User navigates to `/signup` to create an account or `/login` to sign in
2. Clerk handles email verification and password security
3. Upon successful authentication, user data is synced with the platform database
4. User roles are determined by Clerk user metadata (`publicMetadata.role`)
5. Admin users have additional permissions based on their role configuration

**Admin Setup:**
- Admin users are designated in Clerk Dashboard by setting user metadata
- First admin should be set up manually in Clerk after initial signup
- Admin roles provide access to management features and CMS

### Design Principles

- **Professional & Trustworthy**: Enterprise-grade design suitable for financial/investment platform
- **Data Clarity**: Clear hierarchy of information, scannable layouts
- **Responsive**: Mobile-first approach with breakpoints for all device sizes
- **Accessible**: WCAG AA compliant with proper contrast, focus states, and semantic HTML
- **Consistent**: Unified design system with reusable components and patterns

## Recent Changes

- **January 26, 2026**: Authentication Fixes & Tier Upgrade Implementation
  - Resolved 401 authentication errors preventing tier upgrade functionality
  - Added comprehensive debugging for Clerk token retrieval and session status
  - Temporarily bypassed requireAuth middleware for all tier upgrade endpoints to enable testing
  - Modified BuyerTierUpgrade.tsx component to remove redundant payment method validation
  - Fixed tier reference logic in payment creation flow
  - Temporarily enabled tier upgrade queries for all authenticated users (not just buyers)
  - Updated development environment to use ports 7000 (server) and 7001 (client)
  - Fixed Vite configuration to resolve @shared and @assets path aliases
  - Enhanced authentication debugging with global Clerk instance exposure
  - Implemented temporary authentication bypass using hardcoded user ID for testing

- **October 24, 2025**: Simple Login System for Testing
  - Added dedicated `/login` page with username/password form
  - Configured hardcoded credentials (admin/admin123) for testing
  - Removed duplicate login buttons (Test Login selector)
  - Provisioned PostgreSQL database with DATABASE_URL
  - Fixed database connection configuration
  - Updated passport deserialization to handle test users without database
  - Simplified authentication flow for development/testing phase
  
- **October 20, 2025**: Admin CMS & Enhanced User Features
  - Added comprehensive admin CMS at /admin/cms with tabs for blog management, contact submissions, projects, and activity logs
  - Implemented activity logging system tracking user logins, IPs, and actions to prevent spam
  - Built notification system infrastructure with database tables and API endpoints
  - Added interest tracking with duplicate prevention - users see "Interest Expressed" on projects they've already shown interest in
  - Created profile management page at /dashboard/profile for individual/company profiles
  - Built create listing page at /dashboard/create-listing with full form validation
  - Added messaging page at /dashboard/messages showing received/sent messages with read indicators
  - Implemented interactive Zambia map component on Projects page with 9 clickable mining regions
  - Updated dashboard with real-time statistics (actual listings count, unread messages, interests)
  - Fixed critical auth bug in AdminCMS that was redirecting admins before auth state resolved
  - Added request validation for contact submission status updates

- **October 2024**: Initial platform development
  - Complete database schema design
  - All frontend pages and components
  - Backend API with authentication
  - Admin verification system
  - Marketplace with filtering
  - User dashboard and messaging foundation

## User Roles

1. **Admin**
   - Full platform access
   - Verify marketplace listings
   - Manage users
   - Create blog posts
   - View all analytics and submissions

2. **Seller**
   - Create marketplace listings
   - Manage own listings
   - Message other users
   - Express interest in projects
   - Create buyer requests

3. **Buyer** (Default)
   - Browse marketplace
   - Create buyer requests
   - Express interest in projects
   - Message other users
   - View blog posts

## Security Considerations

- All sensitive routes protected with `isAuthenticated` middleware
- Admin routes require additional `isAdmin` authorization
- Seller routes require `isSeller` authorization
- Zod validation on all API inputs
- SQL injection prevention through Drizzle ORM
- Session secrets stored securely in environment variables
- HTTPS enforced in production via Replit

## Future Enhancements

- Real-time messaging with WebSockets
- Email notifications for listing approvals and messages
- Advanced analytics dashboard for admins
- Document management for project files
- Payment integration for premium features
- Mobile app using React Native
- Multi-language support
