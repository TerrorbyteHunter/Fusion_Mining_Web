# Fusion Mining Limited - Platform Documentation

## Overview
Fusion Mining Limited is a full-stack mining investment and trading platform designed to connect investors, miners, and partners across Zambia. Its primary purpose is to facilitate mineral trading, investment opportunities, and partnership formation, providing a verified marketplace for mining activities. The platform aims to be a comprehensive hub for the Zambian mining sector, driving economic growth and transparency.

## Recent Changes (December 18, 2025)

### Clerk Authentication Integration
Migrated from custom authentication to Clerk for production-ready user management:

**Authentication Updates:**
- Replaced Passport.js and custom login with Clerk SDK
- Implemented SignIn and SignUp components from Clerk React
- Added Clerk user ID mapping in database schema
- Updated middleware to use Clerk authentication tokens
- Removed hardcoded test credentials and fallback auth

**Security Improvements:**
- Enterprise-grade authentication with Clerk
- Email verification for user registration
- Secure password handling and reset functionality
- Role-based access control via Clerk user metadata
- SOC 2 compliant user management

**Admin Setup:**
- Admin users designated via Clerk metadata (`publicMetadata.role = "admin"`)
- Removed separate admin login endpoint - unified authentication
- Admin permissions still managed in platform database
- First admin setup requires manual metadata configuration in Clerk

**Database Changes:**
- Added `clerk_id` column to users table for Clerk integration
- User sync mechanism between Clerk and platform database
- Backward compatibility maintained for existing user data

## Previous Changes (December 12, 2025)

### Mobile Optimization - iPhone SE Minimum Support
Implemented comprehensive mobile responsiveness across the entire platform:

**Sidebar Components Refactored:**
- AdminSidebar.tsx - Uses external state control via props (mobileOpen, onMobileOpenChange)
- Exported AdminMobileMenuTrigger component for header integration
- DashboardSidebar.tsx - Similar refactor with DashboardMobileMenuTrigger export
- Removed fixed-position triggers that caused overlay issues on small screens

**Layout Updates:**
- Admin.tsx - Mobile menu trigger integrated into header, responsive padding and typography
- DashboardLayout.tsx - Added mobile header with integrated menu trigger
- Tables use overflow-x-auto for horizontal scrolling on mobile
- Responsive text sizes and spacing throughout

**Technical Improvements:**
- Sheet components accept external state for better parent control
- Hamburger menu triggers placed in headers (not fixed position)
- Proper responsive breakpoints using md: and lg: prefixes
- Fixed LSP errors in Projects.tsx with void statements for unused variables

## Previous Changes (December 2, 2025)

### Admin Permissions Backend Fix
Fixed critical issue where admin permissions were not being returned from the `/api/auth/user` endpoint:

**Issues Fixed:**
- Development mode `/api/auth/user` endpoint now properly fetches `adminPermissions` from database
- Auto-creates admin permissions on login based on role type if they don't exist
- Backward compatibility maintained for legacy 'admin/admin123' credentials

**Technical Implementation:**
- `/api/auth/user` calls `storage.getAdminPermissions()` for admin users
- Login handler seeds permissions when absent using `ROLE_PERMISSIONS` mapping
- Permission creation only occurs once per admin, stored in `admin_permissions` table

**Database Testing Script:**
- Added `database_setup.sql` for local pgAdmin4 testing
- Includes all enum types, table creation, and test admin/user data
- Contains verification queries for inspecting users and permissions

## Previous Changes (December 1, 2025)

### Role-Based Admin Permissions System
Implemented a comprehensive role-based permissions system for admin users:

**Admin Role Types:**
- **Super Admin** (`superadmin` / `super123`) - Full platform control with all permissions (founder-level access)
- **Verification Admin** (`verifyadmin` / `verify123`) - Handle compliance, KYC/AML, and listing approvals
- **Content Admin** (`contentadmin` / `content123`) - Manage platform content, branding, and CMS
- **Support Admin** (`supportadmin` / `support123`) - Handle user communication and issue resolution
- **Analytics Admin** (`analyticsadmin` / `analytics123`) - Monitor platform performance and fraud detection

**Features:**
- Dedicated admin login page at `/admin/login` with Quick Login (Demo) and Manual Login tabs
- Role-specific sidebar navigation - admins only see menu items they have permission to access
- Role badge display in sidebar showing the logged-in admin's role type
- Permission-enforced tab content - unauthorized tabs redirect to overview
- Automatic permission creation on login based on admin role type

**Permission Mapping:**
- `canManageUsers`: User management, role changes, tier upgrades
- `canManageListings`: Marketplace listing management
- `canManageVerification`: Verification queue, seller verification
- `canManageCMS`: Content management system
- `canViewAnalytics`: Platform analytics and reporting
- `canManageMessages`: Message system access
- `canAccessAuditLogs`: Activity logs and audit trail
- `canManageSettings`: Platform settings

**Technical Implementation:**
- Admin permissions stored in `adminPermissions` table linked to users via `adminUserId`
- `/api/admin/login` endpoint authenticates admins and creates role-specific permissions
- RBAC middleware in `server/rbac.ts` provides role permission templates
- AdminSidebar filters menu items based on logged-in admin's permissions

## Previous Changes (November 24, 2025)

### Simple Test Login Page (Development Only) - IMPROVED
Added a dedicated test login page for easy credential entry during development:

**Test Login Features:**
- **Manual Entry** - Type username and password directly into clearly visible input fields
- **Preset Test Accounts** - Three quick-fill buttons for common test credentials:
  - Admin: `admin` / `admin123`
  - Buyer: `henry` / `henry123`
  - Seller: `ray` / `ray123`
- **Custom Test Users** - Create any custom username/password combinations on-the-fly for testing
  - Add new test credentials instantly
  - Delete custom users as needed
  - Your custom users appear in a list below the creation form
- **No Security** - For development testing only (Firebase will be used for production)
- **Automatic Redirect** - Routes to admin panel for admins, dashboard for regular users
- **Clear Visual Layout** - All form fields and options are prominently displayed and easy to find

**How to Use:**
1. Navigate to `/test-login`
2. Choose one of three ways to log in:
   - **Option A:** Type credentials manually and click "Sign In"
   - **Option B:** Click a preset account button to auto-fill credentials, then click "Sign In"
   - **Option C:** Create a custom test user, then use those credentials to log in
3. You'll be redirected to the admin panel (if admin) or dashboard (if buyer/seller)

**Backend Integration:**
- Uses existing `/api/login` endpoint
- Supports both database auth and hardcoded test credentials
- Creates secure session for authenticated user
- Works with existing role-based access control

### Comprehensive Admin Audit Logging System
Implemented full audit tracking for all admin actions on the platform:

**Admin Audit Logs Features:**
- **Admin Identification:** Shows admin name (not ID) for every recorded action
- **Action Tracking:** Logs each admin action with timestamp, action type, and target
- **Change History:** Records what was modified (role, tier, verification status, etc.)
- **Searchable Logs:** View 100+ audit log entries with filtering by admin and action
- **Security Audit:** IP address and user agent captured for each admin action
- **Compliance Ready:** Full audit trail for monitoring and compliance requirements

**Tracked Admin Actions:**
- User edits (role changes, tier changes, verification status)
- Listing approvals and rejections
- Seller verification updates
- Buyer tier upgrade decisions
- Admin permission changes
- Any other admin operations on the platform

**Technical Implementation:**
- New `/api/admin/audit-logs` endpoint with admin user details (joined with users table)
- New `/api/admin/audit-log` POST endpoint for logging admin actions
- Audit logs stored in `adminAuditLogs` table with: adminId, action, targetType, targetId, changes, ipAddress, userAgent, timestamp
- Enhanced Activity Logs tab now displays admin audit trail instead of generic activity logs
- Beautiful table view showing: Admin Name, Action, Target Type, Details, Date & Time
- Responsive design with proper data formatting and truncation

**Benefits for Founding Admin:**
- ✅ See who made what changes and when
- ✅ Monitor other admin activities on the platform  
- ✅ Track user edits, approvals, rejections, and tier changes
- ✅ Compliance audit trail for records and investigations
- ✅ Security monitoring with IP addresses and timestamps
- ✅ Full transparency across all admin operations

### Comprehensive Analytics Implementation - Admin Panel
Added detailed analytics visualizations to the Admin Panel Analytics tab:

**Admin Analytics Tab Features:**
- **KPI Cards (4 Cards):** Total Users, Total Listings, Active Projects, Platform Messages with icons and descriptive metrics
- **User Role Distribution Pie Chart:** Visual breakdown of Buyers, Sellers, and Admins across the platform
- **Listing Status Bar Chart:** Distribution showing Approved, Pending, and Total listings
- **Platform Activity Trends Area Chart:** Stacked area visualization showing Users, Listings, and Messages growth over 4 weeks
- **Detailed Metrics Cards (3 Cards):**
  - Verification Queue: Shows pending listings count with progress bar and percentage of total
  - Approval Rate: Displays overall approval percentage with progress bar and numerical breakdown
  - Buyer Requests: Shows total RFQs and average requests per buyer engagement metric

**Technical Implementation:**
- Recharts library with ResponsiveContainer for all visualizations
- Real platform data from database stats (users, listings, messages, projects, RFQs)
- Dynamic calculations for percentages, averages, and trend data
- Responsive grid layout (1 column mobile → 2-4 columns desktop)
- Color-coded visualizations (Blue for users, Green for listings, Amber for messages/engagement)
- Progress bars for visual metric representation
- Interactive tooltips for data inspection on all charts
- Professional styling consistent with platform design system

## User Preferences
Clear and concise information. Prioritize core functionality and established design patterns. Always confirm before significant architectural changes or new external dependencies.

## System Architecture

### Technology Stack
-   **Frontend:** React 18 (TypeScript), Clerk React, Wouter, TanStack Query v5, Shadcn UI (Radix UI), Tailwind CSS, React Hook Form (Zod), Lucide React.
-   **Backend:** Node.js (Express, TypeScript), Clerk SDK, PostgreSQL (Neon Serverless), Drizzle ORM.
-   **Design System:** Professional and trustworthy aesthetic. Primary color: Deep mining blue; Accent color: Copper/earth tone. Typography: Inter (body), Archivo (headings). Responsive design with mobile-first approach.

### Key Features
1.  **Public Pages:** Landing page with category cards, Services, Marketplace, Projects, News & Insights Blog, Contact Form.
2.  **Authentication & Authorization:** Clerk authentication (email/password), Role-based access (Admin, Seller, Buyer), Secure user management with metadata.
3.  **Marketplace Portal:** Hierarchical categories (Minerals, Mining Tools, Mining Services, Mining PPE), Tabbed navigation, Advanced filtering, RFQ System with country badges, verification status, and expiry dates.
4.  **User Dashboard:** Real-time stats, Profile management, Listing creation, Tier upgrade requests, Thread-based messaging, Project interest tracking, Prominent tier display for buyers.
5.  **Admin Panel:** User Management (role-based tabs, comprehensive editing of user info), Buyer Tier Upgrades (management of pending/approved/rejected requests), Seller Verification, Verification Queue for listings, Comprehensive CMS, Activity logs, Platform analytics (KPIs, charts), Settings.
6.  **Messaging System:** Thread-based messaging with unique conversations for each listing/project interest.
7.  **Notification System:** Real-time notifications for key events: Seller Verification Requests, Buyer Tier Upgrades, New Messages, and Verification Queue Items.
8.  **Theme Toggle:** App-wide dark/light mode with persistence and system detection.

### Database Schema
A normalized PostgreSQL database with Drizzle ORM, including entities for users, user_profiles, projects, marketplace_listings, buyer_requests, message_threads, messages, blog_posts, contact_submissions, verification_queue, express_interest, activity_logs, notifications, sessions, and tier_upgrade_requests.

### Core Design Principles
-   **Professional & Trustworthy:** Enterprise-grade design for a financial/investment platform.
-   **Data Clarity:** Clear information hierarchy and scannable layouts.
-   **Responsive:** Mobile-first approach with breakpoints for all device sizes.
-   **Accessible:** WCAG AA compliant.
-   **Consistent:** Unified design system.

## External Dependencies
-   **Clerk:** For user authentication and management (SOC 2 compliant).
-   **PostgreSQL (Neon Serverless):** Primary database.
-   **TanStack Query:** Data fetching and state management.
-   **Shadcn UI / Radix UI:** UI component library.
-   **Tailwind CSS:** Styling framework.
-   **Wouter:** Client-side routing.
-   **Zod:** Schema validation.
-   **Lucide React:** Icons.
-   **Drizzle ORM:** Object-relational mapper for database operations.
-   **Recharts:** Data visualization library.