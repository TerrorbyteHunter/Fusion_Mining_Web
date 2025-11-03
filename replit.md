# Fusion Mining Limited - Platform Documentation

## Overview
Fusion Mining Limited is a full-stack mining investment and trading platform designed to connect investors, miners, and partners across Zambia. Its primary purpose is to facilitate mineral trading, investment opportunities, and partnership formation, providing a verified marketplace for mining activities. The platform aims to be a comprehensive hub for the Zambian mining sector, driving economic growth and transparency.

## Recent Changes (November 2025)

### Compact Layout Redesign (November 3, 2025)
The platform has been redesigned with a more compact, professional layout inspired by b2bmineral.com:

**Navigation & Layout:**
- Removed About Us and Sustainability pages for streamlined navigation
- Added LME Price Ticker sidebar showing real-time prices for top 10 metals (Copper, Gold, Silver, etc.)
- Reduced homepage hero section from 600px to 400px for more compact design
- Simplified header navigation with fewer top-level links
- LME ticker appears on all public pages, hidden on dashboard/admin pages

**Homepage Quick Actions:**
- Added "Buy Minerals" button (links to marketplace) with shopping cart icon
- Added "Sell Minerals" button (links to login for sellers) with package icon
- Replaced generic "Get Started" and "Explore Projects" with focused CTAs
- Improved user flow for buyers and sellers

**Dashboard Redesign:**
- Implemented clean left sidebar navigation (similar to B2B Mineral reference)
- Role-aware menu items (different for sellers vs buyers)
- Compact card-based layout for stats and quick actions
- Sticky sidebar navigation for easy access to all sections
- Professional gradient header for visual hierarchy

**Create Listing Functionality:**
- Fully functional listing creation form at /dashboard/create-listing
- Hierarchical category selection (Main Category → Subcategory → Specific Type)
- Support for minerals, mining tools, services, and PPE listings
- Image upload integration with ImageSelector component
- Proper validation and seller authentication enforcement
- Automatic submission to verification queue

**Footer Updates:**
- Removed links to deleted pages (About, Sustainability)
- Reorganized sections for better clarity
- Consolidated legal links into dedicated section

### B2B Mineral-Inspired Redesign (Previous)
The platform matches core concepts from b2bmineral.com while maintaining Fusion Mining's unique branding:

**Database Schema Updates:**
- Added hierarchical category fields to `marketplace_listings`: `main_category`, `sub_category`, `specific_type`
- Added RFQ fields to `buyer_requests`: `country`, `verified`, `expiry_date`
- Created comprehensive category taxonomy in `shared/categories.ts`

**Homepage Redesign:**
- Replaced quick links with 4 main category cards (Minerals, Mining Tools, Services, PPE)
- Added Latest RFQs section displaying 6 most recent active requests with country flags and verification badges
- Category cards link directly to marketplace tabs with proper URL parameter synchronization

**Marketplace Enhancements:**
- 5 tabbed navigation: Minerals, Tools, Services, PPE, RFQs
- Hierarchical filtering: Main Category → Subcategory → Specific Type
- Deep linking support from homepage to specific marketplace categories
- URL parameter synchronization for bookmark-friendly navigation

**Category Taxonomy:**
- **Minerals:** Metallic, Non-metallic, Marble/Natural Stone, Gravel/Sand, Coal/Peat, Other (150+ specific types)
- **Mining Tools:** Drilling Equipment, Energy Machines, Heavy Equipment, Crushing/Screening, Mineral Processing, Conveying, Exploration, Mining Vehicles, Other Tools (100+ specific types)
- **Mining Services:** Analysis, Consulting, Exploration, Freight, Installation, Maintenance, Safety, Training, Other Services (50+ specific types)
- **Mining PPE:** Head/Face Protection, Respiratory, Hand/Foot Protection, Body Protection, Eye Protection, Other PPE (40+ specific types)

**Next Steps:**
- Update listing creation form with hierarchical category selection
- Implement RFQ submission form and dedicated RFQ page
- Update admin CMS for category and RFQ management
- Backfill legacy listings with new category data

## User Preferences
I prefer clear and concise information. When making changes, prioritize core functionality and established design patterns. Always ask for confirmation before implementing significant architectural changes or adding new external dependencies.

## System Architecture

### Technology Stack
- **Frontend:** React 18 (TypeScript), Wouter, TanStack Query v5, Shadcn UI (Radix UI), Tailwind CSS, React Hook Form (Zod), Lucide React.
- **Backend:** Node.js (Express, TypeScript), Replit Auth, PostgreSQL (Neon Serverless), Drizzle ORM, Passport.js.
- **Design System:** Professional and trustworthy aesthetic. Primary color: Deep mining blue; Accent color: Copper/earth tone. Typography: Inter (body), Archivo (headings). Responsive design with mobile-first approach.

### Key Features
1.  **Public Pages:** Landing page with category cards, About Us, Services, Sustainability, Interactive Project Map, News & Insights Blog, Contact Form.
2.  **Authentication & Authorization:** Replit Auth (Google, GitHub, email), Role-based access (Admin, Seller, Buyer), Secure session management.
3.  **Marketplace Portal:** 
    - **Hierarchical Categories:** Minerals (6 subcategories), Mining Tools (9 subcategories), Mining Services (9 subcategories), Mining PPE (6 subcategories)
    - **Tabbed Navigation:** Minerals, Tools, Services, PPE, RFQs
    - **Advanced Filtering:** Main category → Subcategory → Specific type with deep linking support
    - **RFQ System:** Request for Quotation with country badges, verification status, and expiry dates
    - **Latest RFQs:** Homepage display of 6 most recent active RFQs
4.  **User Dashboard:** Real-time stats, Profile management, Listing creation (minerals, partnerships, projects), Thread-based messaging, Project interest tracking.
5.  **Admin Panel:** Verification queue for listings, User management, Comprehensive CMS (Blog, Contact Submissions, Projects, Marketplace, Activity), Activity logs, Platform analytics.
6.  **Messaging System:** Thread-based messaging, with each interest in a project/listing creating a separate conversation thread.

### Database Schema
A normalized PostgreSQL database with Drizzle ORM, including entities for users, user_profiles, projects, marketplace_listings, buyer_requests, message_threads, messages, blog_posts, contact_submissions, verification_queue, express_interest, activity_logs, notifications, and sessions.

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