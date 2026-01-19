# TapOnce - Task Assignments

> **Purpose:** Clear module ownership to avoid conflicts  
> **Last Updated:** January 19, 2026

---

## 🎯 Development Progress Overview

| Module | Owner | Status |
|--------|-------|--------|
| **Admin Dashboard** | Dev 1 | ✅ Complete |
| **Agent Dashboard** | Dev 2 | ✅ Complete |
| **Customer Dashboard** | Dev 2 | ✅ Complete |
| **Public Tap View** | Dev 2 | ✅ Complete |
| **Landing Page** | Dev 2 | 🔲 Pending |

---

## 👤 Dev 1 - Admin Dashboard

### Primary Responsibilities

```
📁 Owned Directories:
├── src/app/admin/           # All admin pages
├── src/app/api/orders/      # Order API routes
├── src/app/api/agents/      # Agent API routes
├── src/app/api/finance/     # Finance API routes
├── src/lib/services/        # Data services
└── docs/DATABASE_SCHEMA.md
```

### Feature Status

| Feature | Priority | Status |
|---------|----------|--------|
| **Order Management (Kanban)** | P0 | ✅ Complete |
| - Kanban board layout | | ✅ |
| - Drag-and-drop functionality | | ✅ |
| - Order detail modal | | ✅ |
| - Status transitions | | ✅ |
| - Approval flow | | ✅ |
| **Customer Management** | P0 | ✅ Complete |
| - Customer list with filters | | ✅ |
| - Customer detail view | | ✅ |
| - Edit customer profile | | ✅ |
| - Deactivate customer | | ✅ |
| **Agent Management** | P0 | ✅ Complete |
| - Agent list view | | ✅ |
| - Create agent form | | ✅ |
| - Edit agent (MSP, commission) | | ✅ |
| - Agent performance view | | ✅ |
| **Financial Dashboard** | P1 | ✅ Complete |
| - Revenue overview cards | | ✅ |
| - Expense tracking | | ✅ |
| - Commission liabilities | | ✅ |
| - Payout processing | | ✅ |
| - Profit calculation | | ✅ |
| **Card Catalog** | P1 | ✅ Complete |
| - Card design list | | ✅ |
| - Add new design | | ✅ |
| - Set agent-specific MSP | | ✅ |
| **Analytics & Reports** | P2 | 🔲 Pending |
| **Notifications** | P2 | 🔲 Pending |

---

## 👤 Dev 2 - Agent Dashboard + Customer Dashboard + Public View

### Primary Responsibilities

```
📁 Owned Directories:
├── src/app/agent/           # All agent pages
├── src/app/dashboard/       # Customer dashboard
├── src/app/(public)/        # Public tap view
├── src/app/(marketing)/     # Landing page
└── Agent-specific components
```

### Feature Status

#### Agent Dashboard

| Feature | Priority | Status |
|---------|----------|--------|
| **Dashboard Home** | P0 | ✅ Complete |
| - Overview cards (sales, earnings, balance) | | ✅ |
| - Quick actions | | ✅ |
| - Referral code display | | ✅ |
| - Recent orders | | ✅ |
| **Order Submission** | P0 | ✅ Complete |
| - Customer details form | | ✅ |
| - Card selection with MSP | | ✅ |
| - Photo upload | | ✅ |
| - Commission calculator | | ✅ |
| - Below-MSP handling | | ✅ |
| **Order Tracking** | P0 | ✅ Complete |
| - Order cards list | | ✅ |
| - Status badges | | ✅ |
| - Filters (search, status, date) | | ✅ |
| - Action buttons | | ✅ |
| **Card Catalog** | P1 | ✅ Complete |
| - Card grid with MSP | | ✅ |
| - Search, filter, sort | | ✅ |
| - "Use This Card" flow | | ✅ |
| **Sub-Agent Network** | P1 | ✅ Complete |
| - Recruitment link & QR | | ✅ |
| - Override earnings display | | ✅ |
| - Sub-agents list | | ✅ |
| **Payout Management** | P1 | ✅ Complete |
| - Available balance | | ✅ |
| - Request payout modal | | ✅ |
| - Payout history | | ✅ |

#### Customer Dashboard

| Feature | Priority | Status |
|---------|----------|--------|
| **Dashboard Home** | P0 | ✅ Complete |
| - Welcome card | | ✅ |
| - Profile URL with copy | | ✅ |
| - Quick actions | | ✅ |
| **Profile Editor** | P0 | ✅ Complete |
| - Photo upload | | ✅ |
| - Personal info | | ✅ |
| - Contact info | | ✅ |
| - Social links | | ✅ |
| **Preview Mode** | P1 | ✅ Complete |
| - Mobile phone frame | | ✅ |
| - Live preview | | ✅ |
| **Download Portfolio** | P1 | ✅ Complete |
| - PDF export | | ✅ |
| - Image export | | ✅ |

#### Public Tap View

| Feature | Priority | Status |
|---------|----------|--------|
| **Profile Page** | P0 | ✅ Complete |
| - SEO metadata | | ✅ |
| - Profile display | | ✅ |
| - Bio expand/collapse | | ✅ |
| - Contact actions | | ✅ |
| - Save Contact (vCard) | | ✅ |
| - Social links | | ✅ |
| - Download portfolio | | ✅ |
| - Get Your Card CTA | | ✅ |
| - 404 Not Found page | | ✅ |

#### Landing Page

| Feature | Priority | Status |
|---------|----------|--------|
| **Hero Section** | P0 | 🔲 Pending |
| **Features Section** | P0 | 🔲 Pending |
| **Pricing** | P0 | 🔲 Pending |
| **Order Form** | P0 | 🔲 Pending |
| **Become Agent** | P1 | 🔲 Pending |

---

## 👤 Dev 3 - Supporting Role

### Responsibilities
- Testing and QA
- Supabase integration
- Bug fixes
- Performance optimization

---

## 📊 Overall Completion

```
Admin Dashboard:     ████████████████████ 100%
Agent Dashboard:     ████████████████████ 100%
Customer Dashboard:  ████████████████████ 100%
Public Tap View:     ████████████████████ 100%
Landing Page:        ░░░░░░░░░░░░░░░░░░░░   0%
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
OVERALL:             ████████████████░░░░  80%
```

---

## 🔗 Related Documentation

- [ARCHITECTURE.md](./ARCHITECTURE.md) - System overview
- [FEATURES_COMPLETED.md](./FEATURES_COMPLETED.md) - Implemented features
- [ROUTES_OVERVIEW.md](./ROUTES_OVERVIEW.md) - All routes
- [COMPONENTS_GUIDE.md](./COMPONENTS_GUIDE.md) - Reusable components
