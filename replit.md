# Fusion Mining Limited - Platform Documentation

## Overview
Fusion Mining Limited is a full-stack mining investment and trading platform designed to connect investors, miners, and partners across Zambia. Its primary purpose is to facilitate mineral trading, investment opportunities, and partnership formation, providing a verified marketplace for mining activities. The platform aims to be a comprehensive hub for the Zambian mining sector, driving economic growth and transparency.

## Recent Changes (November 24, 2025)

### User Management Edit - Full User Information Editing & Profile Data Display
Enhanced User Management in Admin panel to allow editing complete user information with proper display of saved data:

**Features Added:**
- **Comprehensive Edit Dialog:** Single unified dialog for editing all user information and role
- **Editable Fields:**
  - First Name
  - Last Name
  - Email Address
  - Phone Number
  - Company Name
  - User Role (Admin/Seller/Buyer)
- **Admin Permissions:** Still accessible for admin users via "Manage Permissions" button
- **Separate Save Buttons:** Users can save user information and role changes independently
- **Error Handling:** Comprehensive error messages for failed updates
- **Persistent Display:** Phone number and company name now display correctly in Users table after saving

**Backend Implementation:**
- New API endpoint: `PATCH /api/admin/users/:id/info`
  - Updates user basic info (firstName, lastName, email) in users table
  - Updates user profile info (phoneNumber, companyName) in user_profiles table
  - Automatically creates user profile if it doesn't exist
  - Returns updated user after successful save
- Enhanced GET endpoint: `GET /api/admin/users`
  - Now fetches and merges user profile data (phoneNumber, companyName) from user_profiles table
  - Combines with test user data (membershipTier, verificationStatus) from in-memory store
  - Ensures all user information displays correctly in the Users table

**Frontend Implementation:**
- State management for user information form (firstName, lastName, email, phoneNumber, companyName)
- useEffect hook to populate form when editing a user
- New mutation (updateUserInfoMutation) for API calls with proper cache invalidation
- Organized dialog with sections for User Information and Role & Permissions
- Test IDs for all input fields (input-first-name, input-last-name, input-email, input-phone, input-company)

**Design:**
- Max-width dialog (max-w-2xl) with scrollable content for smaller screens
- Clear section separators and headings
- 2-column grid for first/last name and phone/company fields
- Responsive layout that adapts to screen size
- Phone and Company columns now display actual saved values (or "-" if not set)

### Complete Notification System Implementation
Implemented a fully-functional real-time notification system for 4 key events:

**Events Triggering Notifications:**
1. **Seller Verification Requests** - Notifies seller on submission, notifies admins of new requests
2. **Buyer Tier Upgrades** - Notifies buyer when tier upgrade approved (with tier name) or rejected (with reason)
3. **Messages** - Notifies message receiver with sender name
4. **Verification Queue Items** - Notifies admins of listings requiring verification review

**Backend Implementation:**
- In-memory notification storage with helper functions:
  - `createNotification()` - Creates new notifications for users
  - `getNotificationsForUser()` - Fetches user's notifications
  - `markNotificationAsRead()` - Mark individual notification as read
  - `markAllNotificationsAsRead()` - Batch mark all as read
- API Endpoints:
  - `GET /api/notifications` - Fetch all notifications
  - `POST /api/notifications/:notificationId/read` - Mark single as read
  - `POST /api/notifications/mark-all-read` - Mark all as read

**Frontend Component (NotificationBell):**
- Bell icon with unread count badge
- Notification list with type, title, and message
- Individual "Mark as read" buttons
- "Mark all as read" option
- Auto-refresh every 30 seconds
- Click-to-navigate to relevant pages (direct links embedded in notifications)

**Database Schema:**
- Notifications table includes: type, title, message, link, read status, timestamp, userId

**Services Page - Fixed Import Errors**
Fixed missing icon imports causing "Truck is not defined" and "AlertCircle is not defined" errors:
- Added missing icons: Truck, AlertCircle, Leaf, Users
- Services page now displays correctly with all 8 service categories
- Regulatory compliance cards display properly
- All icons render without errors

## Previous Changes (November 22, 2025)

### Admin Sidebar Navigation - Fixed Navigation Between Tab & Href Pages
Fixed critical navigation bug preventing movement between href-based pages and tab-based pages:
- **Problems Fixed:**
  1. Multiple items highlighted simultaneously on href-based pages
  2. Tab-based items (Dashboard, Users, Listings, etc.) unclickable when on href-based pages (Settings, Content CMS, Seller Verification, Buyer Tier Upgrades)
  3. Page reloads causing slow navigation
- **Solution:** Smart rendering based on page type
  - **On href-based pages:** Tab items render as Links to `/admin` (enables navigation back to tab pages)
  - **On Admin page:** Tab items use onTabChange handler for instant tab switching
  - **Href items:** Always use Link components for fast client-side navigation
  - **Active state:** Each item type checks its own condition independently
- **Impact:** Seamless navigation throughout admin panel with only ONE item highlighted at a time
- **Technical:** AdminSidebar checks if onTabChange prop is provided to determine rendering strategy

### Dark/Light Theme Toggle - App-Wide Support
Added complete dark/light theme toggle system:
- **Theme Toggle Button:** Located in header between language switcher and user menu
- **Icon:** Moon icon in light mode, Sun icon in dark mode
- **Persistence:** Theme preference saved to localStorage, survives page refresh
- **System Detection:** Auto-detects OS dark/light mode if no user preference saved
- **Implementation:** React Context (ThemeContext) + Tailwind CSS dark mode
- **Coverage:** All UI components automatically adapt with `dark:` CSS variants

### Tier Persistence Across Server Restarts
Fixed tier status resetting on server restart:
- **Problem:** Approved tier upgrades would reset to "pending" when server restarted
- **Solution:** 
  - Updated seed data to initialize Henry Pass with "premium" tier and approved status
  - Created `initializeUserTiersFromApprovedRequests()` function that runs on server startup
  - Function syncs user tiers from approved tier upgrade requests
- **Impact:** User's approved tier now persists across server restarts

### Admin Users Tab - Fixed Tier Display for Elevated Buyers
Fixed tier column showing incorrect tier for buyers who were elevated:
- **Problem:** Admin Users tab showed "Basic" tier for Henry even after tier upgrade was approved
- **Solution:** Updated `/api/admin/users` endpoint to merge test user data from `testUsersStore` 
- **Impact:** Tier column now correctly displays elevated tier (Premium/Standard) for affected users

### Buyer Tier Display - Navigation Bar & Dashboard
Added prominent tier indicator on buyer accounts visible in two locations:

**Navigation Bar (Header):**
- **Location:** Top navigation bar, positioned between language switcher and user menu
- **Visibility:** Only for buyer accounts (hidden for sellers and admins)
- **Badge Styling:** Color-coded with tier-specific icons
  - **Premium Tier:** Amber/gold badge with crown icon
  - **Standard Tier:** Blue badge with lightning bolt icon
  - **Basic Tier:** Gray badge with star icon
- **Responsive:** Label hidden on small screens, icon always visible
- **Test ID:** `badge-nav-tier` for testing

**Dashboard Header:**
- **Location:** Top-right of dashboard welcome section
- **Visibility:** Only for buyer accounts
- **Display:** Full tier name with matching icon and colors
- **Test ID:** `badge-membership-tier` for testing

### Buyer Tier Upgrade - Status Indication Implementation
Completed status indication feature for tier upgrade requests showing "Pending Review" and other statuses:

**Backend Endpoints - Fixed & Enhanced:**
- **GET `/api/buyer/tier-upgrade-request`:** Now returns actual tier upgrade request from in-memory store
  - Queries `buyerUpgradeRequests` Map and finds user's active request
  - Returns null if no active request exists
- **POST `/api/buyer/tier-upgrade-request`:** Now stores request in in-memory Map
  - Creates new request with 'draft' status
  - Stores in `buyerUpgradeRequests` Map for persistence during session
- **POST `/api/buyer/tier-upgrade/submit`:** Now updates status from 'draft' to 'pending'
  - Validates request ownership (user can only submit their own request)
  - Updates `submittedAt` timestamp
  - Triggers status display refresh on frontend

**Frontend - Status Display:**
- **Upgrade Status Card:** Shows badge with color-coded status
  - Approved: Green badge
  - Rejected: Red badge  
  - Pending Review: Yellow badge (when submitted)
  - In Progress: Secondary badge (draft status)
- **Status Alert Box:** Displays contextual message based on status
  - "Under Review" title for pending requests
  - Message: "Your upgrade request for [tier] tier is being reviewed by our team. This typically takes 1-2 business days."
- **Visual Flow:**
  1. User selects tier → request created with 'draft' status
  2. User uploads all 6 required documents
  3. User submits → status changes to 'pending' 
  4. Status display shows "Pending Review" badge and alert message

**In-Memory State Management:**
- `buyerUpgradeRequests` Map stores all tier upgrade requests during session
- Initial seed data: 3 sample requests (Henry - pending, John - approved, Sarah - rejected)
- State persists across browser refreshes and user interactions during session

## User Preferences
Clear and concise information. Prioritize core functionality and established design patterns. Always confirm before significant architectural changes or new external dependencies.

## System Architecture

### Technology Stack
- **Frontend:** React 18 (TypeScript), Wouter, TanStack Query v5, Shadcn UI (Radix UI), Tailwind CSS, React Hook Form (Zod), Lucide React.
- **Backend:** Node.js (Express, TypeScript), Replit Auth, PostgreSQL (Neon Serverless), Drizzle ORM, Passport.js.
- **Design System:** Professional and trustworthy aesthetic. Primary color: Deep mining blue; Accent color: Copper/earth tone. Typography: Inter (body), Archivo (headings). Responsive design with mobile-first approach.

### Key Features
1.  **Public Pages:** Landing page with category cards, Services, Marketplace, Projects, News & Insights Blog, Contact Form.
2.  **Authentication & Authorization:** Replit Auth (Google, GitHub, email), Role-based access (Admin, Seller, Buyer), Secure session management.
3.  **Marketplace Portal:** 
    - **Hierarchical Categories:** Minerals (6 subcategories), Mining Tools (9 subcategories), Mining Services (9 subcategories), Mining PPE (6 subcategories)
    - **Tabbed Navigation:** Minerals, Tools, Services, PPE, RFQs
    - **Advanced Filtering:** Main category → Subcategory → Specific type with deep linking support
    - **RFQ System:** Request for Quotation with country badges, verification status, and expiry dates
4.  **User Dashboard:** Real-time stats, Profile management, Listing creation, Tier upgrade requests, Thread-based messaging, Project interest tracking.
    - **Buyer Dashboard:** Shows current tier badge in header and on navigation bar
5.  **Admin Panel:** 
    - User Management (role-based tabs with appropriate columns)
    - Buyer Tier Upgrades (pending/all tabs with approve/reject/revert actions)
    - Seller Verification (verification status management)
    - Verification Queue for listings
    - Comprehensive CMS (Blog, Contact Submissions, Projects, Marketplace, Activity)
    - Activity logs, Platform analytics, Settings management
6.  **Messaging System:** Thread-based messaging with each listing/project interest creating separate conversation thread.

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
