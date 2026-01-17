# TapOnce - Architecture Documentation

> **Last Updated:** January 17, 2026  
> **Version:** 1.0.0  
> **Status:** Active Development

---

## 🎯 Project Overview

**TapOnce** is an NFC Smart Card Platform that enables professionals to share digital business cards via physical NFC cards. When someone taps the card with their smartphone, it opens the cardholder's personalized digital profile.

### Business Model
- **Target Market:** India (initially Indore and Mumbai)
- **Customer Segment:** B2C - Individual professionals, entrepreneurs, corporate employees
- **Revenue Streams:** Direct card sales + Agent-driven sales with commission structure

---

## 🏗️ Development Approach

### Hybrid (Parallel with Shared Foundation)

We are following a **Hybrid development approach** where:

1. **Phase 1 (Together):** All developers work on shared foundation
   - Supabase schema + RLS policies
   - Shared UI components
   - Authentication system
   - Type definitions

2. **Phase 2 (Parallel):** Developers work on assigned modules independently
   - Dev 1: Admin Dashboard + Financial Dashboard
   - Dev 2: Agent Dashboard + Landing Page
   - Dev 3: Customer Dashboard + Public Tap View

### Why This Approach?
- ✅ Consistent UI/UX across all dashboards
- ✅ No duplicate code for common features
- ✅ DB schema defined upfront prevents conflicts
- ✅ Shared types catch integration issues early

---

## 🛠️ Technology Stack

| Layer | Technology | Purpose |
|-------|------------|---------|
| **Frontend** | Next.js 14 (App Router) | React framework with SSR/SSG |
| **Styling** | Tailwind CSS | Utility-first CSS framework |
| **UI Components** | shadcn/ui | Customizable component library |
| **Backend/DB** | Supabase | PostgreSQL + Auth + Storage + Realtime |
| **Hosting** | Vercel | Edge deployment with CDN |
| **Email** | Resend (planned) | Transactional emails |
| **Payments** | Razorpay (future) | Payment gateway for India |

### Why These Choices?

**Next.js + Vercel:**
- Edge CDN ensures <3s load times on 3G (critical for tap view pages)
- SSG for public profiles = instant loading
- API routes for serverless functions

**Supabase:**
- PostgreSQL with Row Level Security (RLS) for multi-role auth
- Built-in auth with magic links/passwords
- Realtime subscriptions for live order updates
- Storage for images with auto-optimization

**shadcn/ui + Tailwind:**
- Consistent design system across 4 dashboards
- Fully customizable (not locked into library styles)
- Great DX with autocomplete

---

## 📁 Folder Structure

```
taponce/
├── docs/                          # 📚 Documentation (you are here)
│   ├── ARCHITECTURE.md            # This file - system overview
│   ├── DEVELOPER_GUIDE.md         # Onboarding for new developers
│   ├── DATABASE_SCHEMA.md         # Supabase tables & relationships
│   ├── API_CONTRACTS.md           # API route definitions
│   ├── TASK_ASSIGNMENTS.md        # Who owns what module
│   └── CODING_STANDARDS.md        # Code conventions
│
├── public/                        # Static assets (served at /)
│   └── assets/
│       ├── images/                # Card designs, hero images
│       ├── icons/                 # Favicon, app icons
│       └── fonts/                 # Custom fonts (if any)
│
├── src/
│   ├── app/                       # Next.js App Router
│   │   ├── (public)/              # 🌐 PUBLIC TAP VIEW (Dev 3)
│   │   │   └── [slug]/            # Dynamic profile pages
│   │   │       └── page.tsx       # yourplatform.com/rahul-verma
│   │   │
│   │   ├── (marketing)/           # 🎨 LANDING PAGE (Dev 2)
│   │   │   ├── page.tsx           # Home page
│   │   │   ├── order/             # Direct order form
│   │   │   └── become-agent/      # Agent signup
│   │   │
│   │   ├── admin/                 # 👑 ADMIN DASHBOARD (Dev 1)
│   │   │   ├── layout.tsx         # Admin layout with sidebar
│   │   │   ├── page.tsx           # Dashboard home
│   │   │   ├── orders/            # Kanban board
│   │   │   ├── customers/         # Customer management
│   │   │   ├── agents/            # Agent management
│   │   │   ├── finance/           # Revenue, expenses, payouts
│   │   │   ├── catalog/           # Card designs
│   │   │   └── analytics/         # Reports & insights
│   │   │
│   │   ├── agent/                 # 🤝 AGENT DASHBOARD (Dev 2)
│   │   │   ├── layout.tsx         # Agent layout
│   │   │   ├── page.tsx           # Dashboard home
│   │   │   ├── orders/            # Submit & track orders
│   │   │   ├── catalog/           # Browse card designs
│   │   │   ├── network/           # Sub-agent management
│   │   │   └── payouts/           # Commission & withdrawals
│   │   │
│   │   ├── dashboard/             # 👤 CUSTOMER DASHBOARD (Dev 3)
│   │   │   ├── layout.tsx         # Customer layout
│   │   │   ├── page.tsx           # Dashboard home
│   │   │   ├── profile/           # Edit profile
│   │   │   └── settings/          # Account settings
│   │   │
│   │   ├── api/                   # API Routes
│   │   │   ├── orders/            # Order CRUD
│   │   │   ├── customers/         # Customer CRUD
│   │   │   ├── agents/            # Agent CRUD
│   │   │   ├── auth/              # Auth webhooks
│   │   │   └── webhooks/          # External integrations
│   │   │
│   │   ├── layout.tsx             # Root layout
│   │   ├── globals.css            # Global styles
│   │   └── providers.tsx          # Context providers
│   │
│   ├── components/
│   │   ├── ui/                    # shadcn/ui components
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── input.tsx
│   │   │   └── ...
│   │   │
│   │   ├── shared/                # Shared business components
│   │   │   ├── order-card.tsx     # Used in admin + agent
│   │   │   ├── status-badge.tsx   # Order status badges
│   │   │   ├── notification-bell.tsx
│   │   │   ├── image-upload.tsx   # Photo upload component
│   │   │   └── ...
│   │   │
│   │   └── layouts/               # Layout components
│   │       ├── admin-sidebar.tsx
│   │       ├── agent-sidebar.tsx
│   │       ├── customer-sidebar.tsx
│   │       └── header.tsx
│   │
│   ├── lib/
│   │   ├── supabase/              # Supabase utilities
│   │   │   ├── client.ts          # Browser client
│   │   │   ├── server.ts          # Server client
│   │   │   ├── admin.ts           # Service role client
│   │   │   └── queries/           # Typed queries
│   │   │       ├── orders.ts
│   │   │       ├── customers.ts
│   │   │       └── agents.ts
│   │   │
│   │   ├── utils/                 # Utility functions
│   │   │   ├── format.ts          # Date, currency formatting
│   │   │   ├── validation.ts      # Form validation helpers
│   │   │   └── vcard.ts           # VCF generation
│   │   │
│   │   ├── hooks/                 # Custom React hooks
│   │   │   ├── use-auth.ts        # Auth state hook
│   │   │   ├── use-realtime.ts    # Supabase realtime
│   │   │   └── use-orders.ts      # Order data hook
│   │   │
│   │   └── validations/           # Zod schemas
│   │       ├── order.ts
│   │       ├── customer.ts
│   │       └── agent.ts
│   │
│   ├── types/                     # TypeScript types
│   │   ├── database.ts            # Supabase generated types
│   │   ├── order.ts               # Order types
│   │   ├── customer.ts            # Customer types
│   │   ├── agent.ts               # Agent types
│   │   └── index.ts               # Re-exports
│   │
│   ├── styles/                    # Additional styles
│   │   └── components.css         # Component-specific CSS
│   │
│   └── config/                    # Configuration
│       ├── constants.ts           # App constants
│       ├── navigation.ts          # Nav items per role
│       └── order-statuses.ts      # Status definitions
│
├── .env.local                     # Environment variables (gitignored)
├── .env.example                   # Example env file
├── package.json
├── tailwind.config.ts
├── next.config.js
└── tsconfig.json
```

---

## 🔐 Authentication & Authorization

### User Roles

| Role | Access | Auth Method |
|------|--------|-------------|
| **Admin** | Full system access | Email + Password |
| **Agent** | Agent dashboard only | Email/Phone + Password |
| **Customer** | Customer dashboard only | Email/Phone + Password |
| **Public** | Tap view pages only | No auth required |

### Row Level Security (RLS)

Each table has RLS policies ensuring:
- Admins can CRUD all records
- Agents can only see/edit their own orders and sub-agents
- Customers can only see/edit their own profile

See `DATABASE_SCHEMA.md` for detailed RLS policies.

---

## 🌐 URL Structure

| URL Pattern | Page | Owner |
|-------------|------|-------|
| `/` | Landing page | Dev 2 |
| `/order` | Direct order form | Dev 2 |
| `/become-agent` | Agent signup | Dev 2 |
| `/[slug]` | Public tap view | Dev 3 |
| `/admin/*` | Admin dashboard | Dev 1 |
| `/agent/*` | Agent dashboard | Dev 2 |
| `/dashboard/*` | Customer dashboard | Dev 3 |
| `/login` | Login page | Shared |

---

## 📊 Core Data Entities

See `DATABASE_SCHEMA.md` for complete schema. Key entities:

1. **Users** - All user accounts (admin, agent, customer)
2. **Orders** - Card orders with status tracking
3. **Customers** - Customer profiles (extends users)
4. **Agents** - Agent profiles with commission settings
5. **CardDesigns** - Card catalog with pricing
6. **Payouts** - Agent payout history
7. **Expenses** - Business expense tracking

---

## 🚀 Deployment Strategy

### Environments

| Environment | URL | Purpose |
|-------------|-----|---------|
| Development | `localhost:3000` | Local development |
| Preview | `*.vercel.app` | PR previews |
| Production | `taponce.in` (TBD) | Live site |

### CI/CD Pipeline

1. Push to `main` → Auto-deploy to production
2. Push to PR → Deploy preview environment
3. All deploys run: Lint → Type check → Build → Deploy

---

## 📝 Important Decisions Log

| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-01-17 | Chose Next.js + Supabase + Vercel | Best fit for multi-dashboard PWA with real-time features |
| 2026-01-17 | Hybrid development approach | Balance between parallel work and code consistency |
| 2026-01-17 | shadcn/ui + Tailwind | Customizable components + utility-first CSS |
| 2026-01-17 | App Router (not Pages Router) | Modern Next.js patterns, better layouts |

---

## 🔗 Related Documentation

- [DEVELOPER_GUIDE.md](./DEVELOPER_GUIDE.md) - Getting started guide
- [DATABASE_SCHEMA.md](./DATABASE_SCHEMA.md) - Complete DB schema
- [API_CONTRACTS.md](./API_CONTRACTS.md) - API definitions
- [TASK_ASSIGNMENTS.md](./TASK_ASSIGNMENTS.md) - Module ownership
- [CODING_STANDARDS.md](./CODING_STANDARDS.md) - Code conventions
- [ProductRequirementsDocument.txt](../ProductRequirementsDocument.txt) - Full PRD

---

**🤖 This project uses AI-assisted development. Each file contains context comments for AI continuity.**
