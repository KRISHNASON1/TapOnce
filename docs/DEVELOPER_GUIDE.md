# TapOnce - Developer Guide

> **For:** All developers working on TapOnce  
> **Last Updated:** January 17, 2026

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18.17+ 
- npm 9+ or pnpm 8+
- Git
- VS Code (recommended)

### Setup Steps

```bash
# 1. Clone the repository
git clone [repository-url]
cd taponce

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env.local
# Edit .env.local with your Supabase credentials

# 4. Start development server
npm run dev

# 5. Open http://localhost:3000
```

### VS Code Extensions (Recommended)

- **Tailwind CSS IntelliSense** - Autocomplete for Tailwind classes
- **ES7+ React Snippets** - React boilerplate shortcuts
- **Prettier** - Code formatting
- **ESLint** - Code linting
- **GitLens** - Git blame inline

---

## 👥 Team Structure

| Developer | Primary Modules | Secondary Responsibilities |
|-----------|-----------------|---------------------------|
| **Dev 1** | Admin Dashboard, Finance | Database schema, RLS policies |
| **Dev 2** | Agent Dashboard, Landing Page | Order flow, Commission logic |
| **Dev 3** | Customer Dashboard, Public Tap View | Profile editor, vCard generation |

### Communication

- **Daily Sync:** Brief async update in team chat
- **Blockers:** Raise immediately, don't wait
- **PRs:** Tag relevant dev for review

---

## 📁 Where to Work

### Dev 1 - Admin Dashboard

```
src/app/admin/           # All admin pages
src/components/shared/   # Shared components (notify others before changing)
src/lib/supabase/queries/orders.ts
src/lib/supabase/queries/agents.ts
docs/DATABASE_SCHEMA.md  # You own this
```

### Dev 2 - Agent Dashboard + Landing

```
src/app/agent/           # Agent dashboard pages
src/app/(marketing)/     # Landing page
src/components/shared/   # Shared components
src/lib/supabase/queries/orders.ts  # Share with Dev 1
```

### Dev 3 - Customer Dashboard + Public View

```
src/app/dashboard/       # Customer dashboard
src/app/(public)/        # Public tap view pages
src/lib/utils/vcard.ts   # vCard generation
src/lib/utils/pdf.ts     # PDF generation
```

---

## 🔄 Git Workflow

### Branch Naming

```
feature/[module]-[description]
bugfix/[module]-[description]
hotfix/[description]

Examples:
feature/admin-kanban-board
feature/agent-order-form
bugfix/public-vcard-ios
```

### Commit Messages

Follow conventional commits:

```
feat(admin): add kanban board drag-drop
fix(agent): commission calculation for below-MSP
docs: update database schema
refactor(shared): extract status badge component
```

### PR Process

1. Create PR against `main`
2. Add description of changes
3. Tag relevant developer for review
4. Wait for CI checks to pass
5. Squash and merge

---

## 🧩 Component Guidelines

### Using shadcn/ui

Components live in `src/components/ui/`. Add new ones via:

```bash
npx shadcn-ui@latest add button
npx shadcn-ui@latest add card
npx shadcn-ui@latest add input
```

### Creating Shared Components

If a component is used across multiple dashboards:

1. Create in `src/components/shared/`
2. Add JSDoc comment explaining usage
3. Notify team in chat

Example:

```tsx
/**
 * @component OrderCard
 * @description Displays order summary. Used in Admin Kanban & Agent Orders.
 * @owner Dev 1 (created), Dev 2 (co-owner for agent usage)
 * 
 * @example
 * <OrderCard order={order} onStatusChange={handleChange} />
 */
export function OrderCard({ order, onStatusChange }: OrderCardProps) {
  // ...
}
```

### File Header Comments

Every significant file should have a header:

```tsx
/**
 * @file Admin Orders Page - Kanban Board
 * @description Drag-and-drop order management across fulfillment pipeline
 * @owner Dev 1
 * @module admin
 * 
 * @see docs/ARCHITECTURE.md for system overview
 * @see ProductRequirementsDocument.txt Section 6.1.1 for requirements
 */
```

---

## 🗄️ Database Access

### Client-Side (Browser)

```typescript
import { createClient } from '@/lib/supabase/client'

const supabase = createClient()
const { data, error } = await supabase.from('orders').select('*')
```

### Server-Side (API Routes, Server Components)

```typescript
import { createServerClient } from '@/lib/supabase/server'

const supabase = createServerClient()
const { data, error } = await supabase.from('orders').select('*')
```

### Admin Operations (Bypass RLS)

```typescript
import { createAdminClient } from '@/lib/supabase/admin'

// ⚠️ Use sparingly - bypasses all security
const supabase = createAdminClient()
```

---

## 🎨 Styling Conventions

### Tailwind Classes Order

1. Layout (display, position)
2. Sizing (w, h, p, m)
3. Typography (text, font)
4. Colors (bg, text color)
5. Borders & shadows
6. Transitions & animations

```tsx
// ✅ Good
<div className="flex items-center gap-4 p-4 text-lg font-semibold text-gray-900 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">

// ❌ Bad (random order)
<div className="shadow-sm text-gray-900 flex p-4 bg-white rounded-lg font-semibold gap-4 items-center">
```

### Responsive Design

Mobile-first approach:

```tsx
// Base = mobile, then scale up
<div className="p-4 md:p-6 lg:p-8">
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
```

---

## 🧪 Testing

### Manual Testing Checklist

Before marking a feature complete:

- [ ] Works on mobile viewport (320px - 480px)
- [ ] Works on tablet viewport (768px - 1024px)
- [ ] Works on desktop (1280px+)
- [ ] No console errors
- [ ] Loading states work correctly
- [ ] Error states handled gracefully
- [ ] Form validation works

### Test Accounts

```
Admin: admin@taponce.in / TestAdmin123
Agent: agent@taponce.in / TestAgent123
Customer: customer@taponce.in / TestCustomer123
```

---

## 🔧 Common Tasks

### Add a New Page

```bash
# Example: Add agent training resources page
mkdir -p src/app/agent/training
touch src/app/agent/training/page.tsx
```

```tsx
// src/app/agent/training/page.tsx
/**
 * @file Agent Training Resources
 * @owner Dev 2
 * @module agent
 */

export default function TrainingPage() {
  return (
    <div>
      <h1>Training Resources</h1>
    </div>
  )
}
```

### Add a New API Route

```bash
mkdir -p src/app/api/orders
touch src/app/api/orders/route.ts
```

```typescript
// src/app/api/orders/route.ts
/**
 * @file Orders API
 * @owner Dev 1
 * @see API_CONTRACTS.md for endpoint specifications
 */

import { NextResponse } from 'next/server'

export async function GET() {
  // Implementation
  return NextResponse.json({ orders: [] })
}
```

### Add a New Type

```typescript
// src/types/order.ts
/**
 * @file Order type definitions
 * @shared Used by Admin (Dev 1) and Agent (Dev 2) modules
 */

export interface Order {
  id: string
  customerId: string
  agentId: string | null
  // ...
}
```

---

## 🚨 Important Rules

### DO ✅

- Add file header comments to every new file
- Use TypeScript strictly (no `any` types)
- Handle loading and error states
- Test on mobile before marking complete
- Update docs when making structural changes

### DON'T ❌

- Don't modify shared components without notifying team
- Don't push directly to `main` (always use PRs)
- Don't hardcode values (use constants/config)
- Don't skip TypeScript errors (fix them)

---

## 📞 Getting Help

1. **Check documentation first** - Most answers are in docs/
2. **Search codebase** - Similar patterns may exist
3. **Ask in team chat** - Tag relevant developer
4. **AI assistance** - Use AI tools with file context comments

---

## 🔗 Quick Links

- [Architecture Overview](./ARCHITECTURE.md)
- [Database Schema](./DATABASE_SCHEMA.md)
- [API Contracts](./API_CONTRACTS.md)
- [Task Assignments](./TASK_ASSIGNMENTS.md)
- [Coding Standards](./CODING_STANDARDS.md)
- [Product Requirements](../ProductRequirementsDocument.txt)

---

**Welcome to TapOnce! Let's build something amazing. 🚀**
