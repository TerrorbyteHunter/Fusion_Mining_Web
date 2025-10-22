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
- **PostgreSQL** (Neon Serverless)
- **Drizzle ORM** for database operations
- **Replit Auth** (OpenID Connect)
- **Passport.js** for sessions

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
- `DATABASE_URL` - PostgreSQL connection string
- `SESSION_SECRET` - Session encryption secret
- `REPLIT_DOMAINS` - Allowed domains for auth
- `REPL_ID` - Replit app identifier

### Installation

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Setup Database**
   ```bash
   npm run db:push
   ```

3. **Start Development Server**
   ```bash
   npm run dev
   ```

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

## 👥 Test Credentials

For testing purposes, you can create accounts and assign roles through the admin panel. The first user to sign up can be manually promoted to admin via database query:

```sql
UPDATE users SET role = 'admin' WHERE email = 'your-email@example.com';
```

### Recommended Test Accounts

**Admin Account:**
- Email: admin@fusionmining.com
- Use Replit Auth to sign up, then promote via SQL

**Seller Account:**
- Email: seller@fusionmining.com
- Role: `seller`

**Buyer Account:**
- Email: buyer@fusionmining.com
- Role: `buyer` (default)

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
- `GET /api/login` - Initiate login
- `GET /api/logout` - Log out
- `GET /api/auth/user` - Get current user

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
- Authentication via Replit Auth
