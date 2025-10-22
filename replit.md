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
- Replit Auth (OpenID Connect) for authentication
- PostgreSQL (Neon Serverless) for database
- Drizzle ORM for database operations
- Passport.js for session management

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
   - Replit Auth integration with Google, GitHub, and email
   - Role-based access control (Admin, Seller, Buyer)
   - Secure session management with PostgreSQL storage

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
- `GET /api/auth/user` - Get current user
- `GET /api/login` - Initiate login flow
- `GET /api/logout` - Log out user
- `GET /api/callback` - OAuth callback

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

The application runs on a single workflow that starts both the Express backend and Vite frontend:

```bash
npm run dev
```

The backend serves the API on the same port as the frontend (5000), with Vite handling the development proxy.

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

1. User clicks "Log In" button
2. Redirected to Replit Auth provider
3. User authenticates with Google, GitHub, or email
4. Callback to `/api/callback` creates/updates user in database
5. Session stored in PostgreSQL
6. User redirected to dashboard or original page

### Design Principles

- **Professional & Trustworthy**: Enterprise-grade design suitable for financial/investment platform
- **Data Clarity**: Clear hierarchy of information, scannable layouts
- **Responsive**: Mobile-first approach with breakpoints for all device sizes
- **Accessible**: WCAG AA compliant with proper contrast, focus states, and semantic HTML
- **Consistent**: Unified design system with reusable components and patterns

## Recent Changes

- **October 22, 2025**: Admin Panel Enhancements & Sample Data
  - Added DELETE endpoint for projects (`DELETE /api/projects/:id`)
  - Added marketplace listing management endpoints for admin:
    - `PATCH /api/marketplace/listings/:id` - Update listing status
    - `DELETE /api/marketplace/listings/:id` - Delete listing
  - Enhanced AdminCMS with marketplace management tab (6 tabs total: Blog, Videos, Contacts, Projects, Marketplace, Activity)
  - Added persistent sample data to demonstrate platform features:
    - 8 mining projects across Zambia (copper, emerald, cobalt, gold)
    - 8 marketplace listings (minerals and partnerships)
    - 8 published blog posts/news articles (industry news, sustainability, market analysis)
  - Fixed critical TypeScript error in updateContactSettingsSchema that was blocking compilation
  - All sample data is persistent and manageable through admin panel

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
