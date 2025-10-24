# Fusion Mining Limited - Design Guidelines

## Design Approach

**Selected Approach**: Professional SaaS Platform with Enterprise Credibility

Drawing inspiration from Stripe's clean professionalism, Linear's typography excellence, and enterprise dashboard patterns. This platform prioritizes trust, data clarity, and efficient workflows over visual experimentation.

**Core Principles**:
- Professional credibility and institutional trust
- Data clarity and scannable information hierarchy
- Efficient task completion and navigation
- Balanced visual richness where appropriate (projects, homepage)

---

## Color Palette

### Light Mode
- **Primary**: 217 91% 20% (Deep mining blue - trust, stability)
- **Primary Hover**: 217 91% 25%
- **Secondary**: 25 70% 50% (Copper/earth tone accent)
- **Background**: 0 0% 100% (Pure white)
- **Surface**: 220 14% 96% (Light gray for cards)
- **Border**: 220 13% 91%
- **Text Primary**: 222 47% 11%
- **Text Secondary**: 215 16% 47%

### Dark Mode
- **Primary**: 217 91% 60%
- **Primary Hover**: 217 91% 65%
- **Secondary**: 25 70% 55%
- **Background**: 222 47% 11%
- **Surface**: 217 19% 18%
- **Border**: 217 19% 27%
- **Text Primary**: 0 0% 98%
- **Text Secondary**: 215 20% 65%

### Semantic Colors
- **Success**: 142 71% 45% (Verified listings, approved status)
- **Warning**: 38 92% 50% (Pending verification)
- **Error**: 0 72% 51% (Rejected, errors)
- **Info**: 199 89% 48% (Notifications, hints)

---

## Typography

**Font Families**:
- **Primary**: Inter (via Google Fonts CDN) - UI, body, data tables
- **Display**: Archivo (via Google Fonts CDN) - Headlines, hero sections

**Type Scale**:
- **Hero**: text-6xl font-bold (Archivo) - Homepage hero
- **H1**: text-4xl font-bold tracking-tight - Page titles
- **H2**: text-3xl font-semibold - Section headers
- **H3**: text-2xl font-semibold - Subsections
- **H4**: text-xl font-medium - Card titles
- **Body Large**: text-lg - Important descriptions
- **Body**: text-base - Standard content
- **Body Small**: text-sm - Helper text, metadata
- **Caption**: text-xs - Labels, timestamps

---

## Layout System

**Spacing Primitives**: Consistently use tailwind units of **2, 4, 6, 8, 12, 16, 24** (e.g., p-4, m-8, gap-6, space-y-12)

**Container Strategy**:
- **Max Width**: max-w-7xl for main content
- **Narrow Content**: max-w-4xl for forms, articles
- **Full Width**: Tables, maps, dashboards use full container

**Grid Systems**:
- **Project Cards**: grid-cols-1 md:grid-cols-2 lg:grid-cols-3
- **Marketplace Listings**: grid-cols-1 lg:grid-cols-2 xl:grid-cols-3
- **Dashboard Metrics**: grid-cols-2 md:grid-cols-4
- **Services/Features**: grid-cols-1 md:grid-cols-2

---

## Component Library

### Navigation
- **Primary Nav**: Horizontal with dropdown menus, sticky on scroll
- **Dashboard Sidebar**: Collapsible with icons, grouped sections
- **Breadcrumbs**: For deep navigation (Projects > Zambia > Copper)

### Buttons
- **Primary**: Filled with primary color, medium rounded corners (rounded-lg)
- **Secondary**: Outlined with border, transparent background
- **Ghost**: Text-only for tertiary actions
- **Sizes**: Small (px-3 py-1.5), Medium (px-4 py-2), Large (px-6 py-3)

### Cards
- **Project Cards**: Image thumbnail, title, metadata grid, status badge, CTA button
- **Listing Cards**: Vertical layout with image, specification table, pricing, action buttons
- **Info Cards**: Icon, heading, description (About, Services pages)
- **Borders**: border rounded-xl with subtle shadow

### Forms
- **Input Fields**: Consistent height (h-11), rounded-lg, clear labels above
- **Select Menus**: Custom styled with chevron icons
- **Text Areas**: Minimum height with resize capability
- **Validation**: Inline error messages in red, success in green

### Data Display
- **Tables**: Striped rows, sortable headers, fixed header on scroll for long lists
- **Badges**: Rounded-full with semantic colors for status (Verified, Pending, Active)
- **Metrics Cards**: Large number, label, trend indicator (dashboard)
- **Filters**: Sidebar or horizontal bar with chips for active filters

### Interactive Elements
- **Interactive Map**: SVG-based Zambia map with hover states, clickable regions
- **Messaging**: Chat-style interface with timestamp, sender avatar
- **File Upload**: Drag-and-drop zone with file preview

---

## Page-Specific Design

### Homepage
- **Hero**: Full-width with mining imagery background (miners at work, mineral samples, Zambian landscape), overlay gradient (dark to transparent), centered headline + CTA buttons with backdrop-blur
- **Quick Links**: 4-column grid of icon cards linking to main sections
- **Project Highlights**: Horizontal scrollable cards or 3-column grid
- **Embedded Video**: 16:9 aspect ratio with custom play button overlay
- **Company Stats**: 4-column metrics showcase (projects, partners, minerals)

### Projects Page
- **Map Section**: Large interactive Zambia map (60% width) + filters sidebar (40%)
- **Project Grid**: Below map, filterable cards with image, license type badge, mineral type, location, status indicator

### Marketplace Portal
- **Layout**: Filters sidebar (20%) + Listings grid (80%)
- **Listing Card**: Image, title, specification table (2-column), price badge, Express Interest button
- **Tabs**: Mineral Listings | Buyer Requests | Mine Partnerships

### User Dashboard
- **Layout**: Persistent sidebar navigation + main content area
- **Sections**: Overview (metrics), My Listings, Messages, Profile, Verification Status
- **Messaging**: Split view - conversation list (30%) + message thread (70%)

### Admin Panel
- **Table-Heavy**: Data tables with actions (Approve/Reject), filter controls, bulk actions
- **Verification Queue**: Cards with listing preview, verification checklist, action buttons

---

## Images

**Hero Image**: Full-width mining operation photograph - active mining site in Zambia with workers, equipment, or aerial view of mineral deposits. High contrast with overlay gradient (from rgba(0,0,0,0.6) to transparent).

**Project Cards**: Thumbnail images (aspect-ratio-4/3) of mining sites, mineral samples, or project locations.

**About Page**: Leadership team professional headshots (circular crop), company facility photos.

**Sustainability Page**: Community engagement photos, environmental initiatives imagery.

---

## Animation & Interactions

**Minimal Animation Philosophy** - use sparingly:
- **Hover States**: Subtle scale (scale-105) on cards, color transitions on buttons
- **Loading States**: Skeleton screens for data tables, spinner for form submissions
- **Page Transitions**: None - instant navigation for professional feel
- **Map Interactions**: Smooth region highlighting on hover

---

## Accessibility

- **Contrast**: WCAG AA minimum for all text
- **Dark Mode**: Consistent implementation across all components including form inputs
- **Focus States**: Visible outline (ring-2 ring-primary) on all interactive elements
- **Screen Readers**: Semantic HTML, aria-labels for icons, table headers