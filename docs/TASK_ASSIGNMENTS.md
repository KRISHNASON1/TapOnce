# TapOnce - Task Assignments

> **Purpose:** Clear module ownership to avoid conflicts  
> **Last Updated:** January 17, 2026

---

## 🎯 Development Phases

### Phase 1: Shared Foundation (All Developers Together)

**Timeline:** First 2-3 days

| Task | Owner | Status |
|------|-------|--------|
| Project setup (Next.js, Tailwind, shadcn/ui) | Dev 1 | ⬜ Not Started |
| Supabase project setup | Dev 1 | ⬜ Not Started |
| Database schema creation | Dev 1 | ⬜ Not Started |
| Auth configuration (Supabase Auth) | Dev 1 | ⬜ Not Started |
| Base UI components setup | All | ⬜ Not Started |
| Layout components (sidebar, header) | All | ⬜ Not Started |
| Type definitions | All | ⬜ Not Started |
| Environment variables setup | Dev 1 | ⬜ Not Started |

### Phase 2: Parallel Development

After foundation is complete, each developer works independently.

---

## 👤 Dev 1 - Admin Dashboard

### Primary Responsibilities

```
📁 Owned Directories:
├── src/app/admin/           # All admin pages
├── src/app/api/orders/      # Order API routes
├── src/app/api/agents/      # Agent API routes
├── src/app/api/finance/     # Finance API routes
├── src/lib/supabase/queries/orders.ts
├── src/lib/supabase/queries/agents.ts
└── docs/DATABASE_SCHEMA.md
```

### Feature Breakdown

| Feature | Priority | Complexity | Status |
|---------|----------|------------|--------|
| **Order Management (Kanban)** | P0 | High | ⬜ Not Started |
| - Kanban board layout | | | ⬜ |
| - Drag-and-drop functionality | | | ⬜ |
| - Order detail modal | | | ⬜ |
| - Status transitions | | | ⬜ |
| - Approval flow | | | ⬜ |
| - Wekonnect message generator | | | ⬜ |
| **Customer Management** | P0 | Medium | ⬜ Not Started |
| - Customer list with filters | | | ⬜ |
| - Customer detail view | | | ⬜ |
| - Edit customer profile | | | ⬜ |
| - Deactivate customer | | | ⬜ |
| **Agent Management** | P0 | Medium | ⬜ Not Started |
| - Agent list view | | | ⬜ |
| - Create agent form | | | ⬜ |
| - Edit agent (MSP, commission) | | | ⬜ |
| - Agent performance view | | | ⬜ |
| **Financial Dashboard** | P1 | High | ⬜ Not Started |
| - Revenue overview cards | | | ⬜ |
| - Expense tracking | | | ⬜ |
| - Commission liabilities | | | ⬜ |
| - Payout processing | | | ⬜ |
| - Profit calculation | | | ⬜ |
| **Card Catalog** | P1 | Low | ⬜ Not Started |
| - Card design list | | | ⬜ |
| - Add new design | | | ⬜ |
| - Set agent-specific MSP | | | ⬜ |
| **Analytics & Reports** | P2 | Medium | ⬜ Not Started |
| - Sales performance graphs | | | ⬜ |
| - Agent leaderboard | | | ⬜ |
| - Operational metrics | | | ⬜ |
| **Notifications** | P2 | Low | ⬜ Not Started |
| - Notification bell | | | ⬜ |
| - Notification types | | | ⬜ |

### Dependencies

- **Depends on:** Auth system (Phase 1)
- **Blocks:** Nothing (can develop with mock data)
- **Shared with Dev 2:** Order types, order card component

---

## 👤 Dev 2 - Agent Dashboard + Landing Page

### Primary Responsibilities

```
📁 Owned Directories:
├── src/app/agent/           # All agent pages
├── src/app/(marketing)/     # Landing page
├── src/app/api/orders/      # Order creation (share with Dev 1)
├── src/lib/utils/commission.ts
└── src/lib/validations/order.ts
```

### Feature Breakdown

| Feature | Priority | Complexity | Status |
|---------|----------|------------|--------|
| **Agent Dashboard Home** | P0 | Low | ⬜ Not Started |
| - Overview cards (stats) | | | ⬜ |
| - Quick actions | | | ⬜ |
| **Order Submission** | P0 | High | ⬜ Not Started |
| - Order form with validation | | | ⬜ |
| - Card design selector | | | ⬜ |
| - Photo upload | | | ⬜ |
| - Commission calculator | | | ⬜ |
| - Below-MSP handling | | | ⬜ |
| **Order Tracking** | P0 | Medium | ⬜ Not Started |
| - Order cards list | | | ⬜ |
| - Status badges | | | ⬜ |
| - Order detail view | | | ⬜ |
| - Filters and search | | | ⬜ |
| **Card Catalog (Agent View)** | P1 | Low | ⬜ Not Started |
| - Card grid with personalized MSP | | | ⬜ |
| - "Use This Card" flow | | | ⬜ |
| **Sub-Agent Network** | P1 | Medium | ⬜ Not Started |
| - Recruitment link/QR | | | ⬜ |
| - Sub-agent list | | | ⬜ |
| - Override earnings display | | | ⬜ |
| **Payout Management** | P1 | Low | ⬜ Not Started |
| - Available balance display | | | ⬜ |
| - Request payout button | | | ⬜ |
| - Payout history | | | ⬜ |
| **Agent Notifications** | P2 | Low | ⬜ Not Started |
| - Notification bell | | | ⬜ |
| - Real-time updates | | | ⬜ |
| **Training Resources** | P3 | Low | ⬜ Not Started |
| - PDF downloads | | | ⬜ |
| - Video embeds | | | ⬜ |

---

### Landing Page

| Feature | Priority | Complexity | Status |
|---------|----------|------------|--------|
| **Hero Section** | P0 | Medium | ⬜ Not Started |
| - Headline + CTA | | | ⬜ |
| - Demo video/animation | | | ⬜ |
| **Direct Order Form** | P0 | High | ⬜ Not Started |
| - Customer details | | | ⬜ |
| - Photo upload | | | ⬜ |
| - Card design selection | | | ⬜ |
| - Shipping address | | | ⬜ |
| - Order confirmation | | | ⬜ |
| **Card Design Gallery** | P1 | Low | ⬜ Not Started |
| **How It Works** | P1 | Low | ⬜ Not Started |
| **Become an Agent Section** | P2 | Medium | ⬜ Not Started |
| - Benefits display | | | ⬜ |
| - Signup form | | | ⬜ |
| **FAQ Section** | P2 | Low | ⬜ Not Started |
| **Footer** | P1 | Low | ⬜ Not Started |

### Dependencies

- **Depends on:** Auth system, Card designs API
- **Blocks:** Nothing
- **Shared with Dev 1:** Order types, status badges

---

## 👤 Dev 3 - Customer Dashboard + Public Tap View

### Primary Responsibilities

```
📁 Owned Directories:
├── src/app/dashboard/       # Customer dashboard
├── src/app/(public)/        # Public tap view
├── src/app/api/customers/   # Customer API
├── src/lib/utils/vcard.ts   # vCard generation
├── src/lib/utils/pdf.ts     # PDF generation
└── src/lib/utils/image.ts   # Portfolio image generation
```

### Feature Breakdown

| Feature | Priority | Complexity | Status |
|---------|----------|------------|--------|
| **Public Tap View Page** | P0 | High | ⬜ Not Started |
| - Profile photo display | | | ⬜ |
| - Name, title, company | | | ⬜ |
| - Bio section | | | ⬜ |
| - Contact info (clickable) | | | ⬜ |
| - Social links row | | | ⬜ |
| - Save to Contact button | | | ⬜ |
| - Download portfolio | | | ⬜ |
| - "Get Your Card" CTA | | | ⬜ |
| - Footer with login link | | | ⬜ |
| **Performance Optimization** | P0 | High | ⬜ Not Started |
| - Image compression | | | ⬜ |
| - Static generation (ISR) | | | ⬜ |
| - CDN caching | | | ⬜ |
| - Minimal JS bundle | | | ⬜ |
| **vCard Generation** | P0 | Medium | ⬜ Not Started |
| - VCF file generation | | | ⬜ |
| - iOS/Android compatibility | | | ⬜ |
| **Customer Dashboard Home** | P0 | Low | ⬜ Not Started |
| - Welcome message | | | ⬜ |
| - Profile URL display | | | ⬜ |
| - Quick actions | | | ⬜ |
| **Profile Editor** | P0 | High | ⬜ Not Started |
| - Personal info fields | | | ⬜ |
| - Contact info fields | | | ⬜ |
| - Social links | | | ⬜ |
| - Image upload + crop | | | ⬜ |
| - Validation | | | ⬜ |
| **Preview Mode** | P1 | Medium | ⬜ Not Started |
| - Mobile preview frame | | | ⬜ |
| - Real-time preview | | | ⬜ |
| **Portfolio Downloads** | P1 | High | ⬜ Not Started |
| - PDF generation | | | ⬜ |
| - Image generation | | | ⬜ |
| - Size options | | | ⬜ |
| **Login Modal** | P1 | Low | ⬜ Not Started |
| - Modal overlay on tap view | | | ⬜ |
| - Login form | | | ⬜ |

### Dependencies

- **Depends on:** Auth system, Customer API
- **Blocks:** Nothing
- **Shared with Dev 1:** Customer types

---

## 🔄 Shared Components

These components are used across multiple dashboards. **Notify team before modifying.**

| Component | Used By | Owner |
|-----------|---------|-------|
| `OrderCard` | Admin, Agent | Dev 1 (primary), Dev 2 (co-owner) |
| `StatusBadge` | Admin, Agent, Customer | Dev 1 |
| `NotificationBell` | Admin, Agent | Dev 1 (primary), Dev 2 (co-owner) |
| `ImageUpload` | Agent, Customer, Landing | Dev 2 (primary), Dev 3 (co-owner) |
| `CardDesignPreview` | Admin, Agent, Landing | Dev 2 |
| `PhoneInput` | All forms | Dev 2 |
| `SocialLinksEditor` | Customer | Dev 3 |

---

## 📊 Priority Legend

| Priority | Meaning | Timeline |
|----------|---------|----------|
| **P0** | Critical for MVP | Week 1-2 |
| **P1** | Important for MVP | Week 2-3 |
| **P2** | Nice to have for MVP | Week 3-4 |
| **P3** | Post-MVP | After launch |

---

## 📅 Suggested Timeline

### Week 1
- **All:** Phase 1 foundation (days 1-2)
- **Dev 1:** Order Kanban + Customer list
- **Dev 2:** Agent order form + Landing hero
- **Dev 3:** Public tap view + vCard

### Week 2
- **Dev 1:** Agent management + Order details
- **Dev 2:** Order tracking + Landing order form
- **Dev 3:** Profile editor + Preview mode

### Week 3
- **Dev 1:** Financial dashboard
- **Dev 2:** Sub-agent network + Card catalog
- **Dev 3:** Portfolio downloads

### Week 4
- **All:** Integration testing
- **All:** Bug fixes
- **All:** Performance optimization

---

## ✅ Definition of Done

A feature is complete when:

- [ ] Code reviewed by another developer
- [ ] Works on mobile viewport
- [ ] Works on desktop viewport
- [ ] No console errors
- [ ] Loading states implemented
- [ ] Error states handled
- [ ] TypeScript types complete (no `any`)
- [ ] File header comments added
- [ ] Tested with real/mock data

---

## 🚨 Conflict Resolution

If two developers need to modify the same file:

1. **Communicate first** - Agree on who makes the change
2. **Small PRs** - Merge frequently to avoid conflicts
3. **Shared files** - Coordinate timing of changes
4. **Branch from latest** - Always pull before starting work

---

**Last Updated:** January 17, 2026
