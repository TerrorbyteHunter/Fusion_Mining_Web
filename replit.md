# Fusion Mining Limited - Platform Documentation

## Overview
Fusion Mining Limited is a full-stack mining investment and trading platform designed to connect investors, miners, and partners across Zambia. Its primary purpose is to facilitate mineral trading, investment opportunities, and partnership formation, providing a verified marketplace for mining activities. The platform aims to be a comprehensive hub for the Zambian mining sector, driving economic growth and transparency.

## Recent Changes (November 24, 2025)

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
-   **Frontend:** React 18 (TypeScript), Wouter, TanStack Query v5, Shadcn UI (Radix UI), Tailwind CSS, React Hook Form (Zod), Lucide React.
-   **Backend:** Node.js (Express, TypeScript), Replit Auth, PostgreSQL (Neon Serverless), Drizzle ORM, Passport.js.
-   **Design System:** Professional and trustworthy aesthetic. Primary color: Deep mining blue; Accent color: Copper/earth tone. Typography: Inter (body), Archivo (headings). Responsive design with mobile-first approach.

### Key Features
1.  **Public Pages:** Landing page with category cards, Services, Marketplace, Projects, News & Insights Blog, Contact Form.
2.  **Authentication & Authorization:** Replit Auth (Google, GitHub, email), Role-based access (Admin, Seller, Buyer), Secure session management.
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
-   **Replit Auth:** For user authentication (OpenID Connect).
-   **PostgreSQL (Neon Serverless):** Primary database.
-   **TanStack Query:** Data fetching and state management.
-   **Shadcn UI / Radix UI:** UI component library.
-   **Tailwind CSS:** Styling framework.
-   **Wouter:** Client-side routing.
-   **Zod:** Schema validation.
-   **Lucide React:** Icons.
-   **Passport.js:** Session management.
-   **Drizzle ORM:** Object-relational mapper for database operations.
-   **Recharts:** Data visualization library.