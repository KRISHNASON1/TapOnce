# TapOnce - Coding Standards

> **Purpose:** Ensure consistent code across all developers  
> **Last Updated:** January 17, 2026

---

## 📝 File Headers

Every significant file MUST have a header comment:

### React Components

```tsx
/**
 * @file Order Kanban Board
 * @description Drag-and-drop order management across fulfillment pipeline
 * 
 * @owner Dev 1
 * @module admin
 * 
 * @see docs/ARCHITECTURE.md for system overview
 * @see ProductRequirementsDocument.txt Section 6.1.1 for requirements
 */

'use client'

import { useState } from 'react'
// ...
```

### API Routes

```typescript
/**
 * @file Orders API - Create and List
 * @description Handle order CRUD operations
 * 
 * @owner Dev 1
 * @module api/orders
 * 
 * @see docs/API_CONTRACTS.md for endpoint specifications
 */

import { NextRequest, NextResponse } from 'next/server'
// ...
```

### Utility Functions

```typescript
/**
 * @file Commission Calculator
 * @description Calculate agent commission based on sale price and MSP
 * 
 * @owner Dev 2
 * @shared Used by Admin (Dev 1) and Agent (Dev 2) modules
 * 
 * @example
 * const commission = calculateCommission(699, 600, 100)
 * // Returns: 149.50 (100 base + 49.50 bonus)
 */

export function calculateCommission(
  salePrice: number,
  msp: number,
  baseCommission: number = 100
): number {
  // Implementation
}
```

---

## 🏷️ Naming Conventions

### Files and Folders

```
✅ Good:
src/components/order-card.tsx       # kebab-case for components
src/lib/utils/format-date.ts        # kebab-case for utilities
src/app/admin/orders/page.tsx       # Next.js conventions
src/types/order.ts                  # lowercase for types

❌ Bad:
src/components/OrderCard.tsx        # PascalCase for files
src/lib/utils/formatDate.ts         # camelCase for files
```

### Variables and Functions

```typescript
// ✅ Good
const orderStatus = 'pending_approval'
const customerName = 'Rahul Verma'

function calculateCommission() {}
function formatPhoneNumber() {}

const handleSubmit = () => {}
const handleStatusChange = () => {}

// ❌ Bad
const order_status = 'pending_approval'  // snake_case
const CustomerName = 'Rahul Verma'       // PascalCase
```

### React Components

```typescript
// ✅ Good
export function OrderCard() {}
export function StatusBadge() {}
export function AdminLayout() {}

// ❌ Bad
export function orderCard() {}   // lowercase
export function Order_Card() {}  // snake_case
```

### Types and Interfaces

```typescript
// ✅ Good
interface OrderData {}
type OrderStatus = 'pending' | 'approved'
enum PaymentMethod {
  UPI = 'upi',
  BANK = 'bank_transfer',
  CASH = 'cash'
}

// ❌ Bad
interface orderData {}        // lowercase
type order_status = string    // snake_case
```

### Constants

```typescript
// ✅ Good
const MAX_FILE_SIZE = 5 * 1024 * 1024  // SCREAMING_SNAKE_CASE
const ORDER_STATUSES = ['pending', 'approved'] as const
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL

// ❌ Bad
const maxFileSize = 5 * 1024 * 1024    // camelCase for constants
```

---

## 📂 Import Order

Imports should be ordered in this sequence:

```typescript
// 1. React/Next.js imports
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

// 2. Third-party libraries
import { format } from 'date-fns'
import { z } from 'zod'

// 3. UI components (shadcn/ui)
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

// 4. Shared components
import { OrderCard } from '@/components/shared/order-card'
import { StatusBadge } from '@/components/shared/status-badge'

// 5. Local components (same module)
import { OrderFilters } from './order-filters'

// 6. Hooks
import { useOrders } from '@/lib/hooks/use-orders'
import { useAuth } from '@/lib/hooks/use-auth'

// 7. Utilities and helpers
import { formatCurrency } from '@/lib/utils/format'
import { cn } from '@/lib/utils'

// 8. Types
import type { Order, OrderStatus } from '@/types'

// 9. Constants/Config
import { ORDER_STATUSES } from '@/config/order-statuses'
```

---

## 🎨 Tailwind CSS Conventions

### Class Order

```tsx
// Order: Layout → Sizing → Spacing → Typography → Colors → Effects → States

// ✅ Good
<div className="flex items-center gap-4 w-full p-4 text-lg font-semibold text-gray-900 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">

// ❌ Bad (random order)
<div className="shadow-sm text-gray-900 flex p-4 bg-white rounded-lg font-semibold gap-4 items-center">
```

### Responsive Design

```tsx
// Mobile-first approach: base styles for mobile, then add breakpoints

// ✅ Good
<div className="p-4 md:p-6 lg:p-8">
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
<div className="text-sm md:text-base lg:text-lg">

// ❌ Bad (desktop-first)
<div className="lg:p-8 md:p-6 p-4">
```

### Using cn() for Conditional Classes

```tsx
import { cn } from '@/lib/utils'

// ✅ Good
<div className={cn(
  'p-4 rounded-lg',
  isActive && 'bg-blue-500 text-white',
  isDisabled && 'opacity-50 cursor-not-allowed'
)}>

// ❌ Bad
<div className={`p-4 rounded-lg ${isActive ? 'bg-blue-500 text-white' : ''} ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}>
```

---

## 📦 Component Structure

### Standard Component Template

```tsx
/**
 * @file Component Name
 * @description What this component does
 * @owner Dev X
 * @module module-name
 */

'use client' // Only if needed

import { useState } from 'react'
// ... imports

// Types
interface ComponentProps {
  prop1: string
  prop2?: number
  onAction?: (value: string) => void
}

// Component
export function ComponentName({ 
  prop1, 
  prop2 = 0, 
  onAction 
}: ComponentProps) {
  // State
  const [state, setState] = useState(null)
  
  // Derived state
  const derivedValue = useMemo(() => {
    // calculation
  }, [dependency])
  
  // Effects
  useEffect(() => {
    // side effects
  }, [dependencies])
  
  // Handlers
  const handleClick = () => {
    // logic
    onAction?.(value)
  }
  
  // Early returns for loading/error states
  if (loading) return <LoadingSpinner />
  if (error) return <ErrorMessage error={error} />
  
  // Main render
  return (
    <div className="...">
      {/* JSX */}
    </div>
  )
}
```

---

## 🔒 TypeScript Rules

### Strict Mode

We use strict TypeScript. These rules are enforced:

```typescript
// ❌ NEVER use 'any'
const data: any = response  // Bad

// ✅ Use proper types or 'unknown'
const data: unknown = response  // Okay for unknown data
const data: OrderResponse = response  // Best

// ❌ NEVER ignore TypeScript errors
// @ts-ignore  // Bad
// @ts-expect-error  // Only if absolutely necessary with comment

// ✅ Fix the type error properly
```

### Type Definitions

```typescript
// ✅ Prefer interfaces for objects
interface Order {
  id: string
  customerName: string
  status: OrderStatus
}

// ✅ Use type for unions/primitives
type OrderStatus = 'pending' | 'approved' | 'rejected'

// ✅ Export types from dedicated files
// src/types/order.ts
export interface Order { ... }
export type OrderStatus = ...

// ✅ Use type imports
import type { Order, OrderStatus } from '@/types'
```

### Avoid Type Assertions

```typescript
// ❌ Avoid type assertions
const order = data as Order

// ✅ Use type guards instead
function isOrder(data: unknown): data is Order {
  return (
    typeof data === 'object' &&
    data !== null &&
    'id' in data &&
    'status' in data
  )
}

if (isOrder(data)) {
  // data is now typed as Order
}
```

---

## 🧪 Error Handling

### API Routes

```typescript
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate input
    const validatedData = orderSchema.parse(body)
    
    // Process
    const result = await createOrder(validatedData)
    
    return NextResponse.json(result, { status: 201 })
    
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: { code: 'VALIDATION_ERROR', message: error.message } },
        { status: 400 }
      )
    }
    
    console.error('Order creation failed:', error)
    
    return NextResponse.json(
      { error: { code: 'SERVER_ERROR', message: 'Failed to create order' } },
      { status: 500 }
    )
  }
}
```

### Client Components

```tsx
export function OrderForm() {
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  
  const handleSubmit = async (data: OrderData) => {
    setLoading(true)
    setError(null)
    
    try {
      const response = await createOrder(data)
      // Handle success
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }
  
  return (
    <form>
      {error && <ErrorAlert message={error} />}
      {/* form fields */}
      <Button disabled={loading}>
        {loading ? 'Submitting...' : 'Submit Order'}
      </Button>
    </form>
  )
}
```

---

## 📝 Comments

### When to Comment

```typescript
// ✅ Good: Explain WHY, not WHAT
// Commission = base + 50% of amount above MSP
// This incentivizes agents to negotiate higher prices
const commission = baseCommission + (salePrice - msp) * 0.5

// ✅ Good: Document complex business logic
// Orders below MSP require special admin approval
// because they reduce agent commission to zero
if (salePrice < msp) {
  order.requiresApproval = true
}

// ❌ Bad: Obvious comments
// Set loading to true
setLoading(true)

// ❌ Bad: Commenting out code (delete it instead)
// const oldFunction = () => {}
```

### JSDoc for Functions

```typescript
/**
 * Calculate agent commission based on sale price and MSP
 * 
 * @param salePrice - The final selling price
 * @param msp - Minimum Selling Price for the agent
 * @param baseCommission - Base commission amount (default: 100)
 * @returns Calculated commission amount
 * 
 * @example
 * calculateCommission(699, 600, 100) // Returns 149.50
 */
export function calculateCommission(
  salePrice: number,
  msp: number,
  baseCommission: number = 100
): number {
  // Implementation
}
```

---

## 🔀 Git Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```bash
# Format
<type>(<scope>): <description>

# Types
feat     # New feature
fix      # Bug fix
docs     # Documentation changes
style    # Code style (formatting, semicolons, etc.)
refactor # Code refactoring
perf     # Performance improvement
test     # Adding/updating tests
chore    # Maintenance tasks

# Examples
feat(admin): add kanban board drag-drop functionality
fix(agent): correct commission calculation for below-MSP orders
docs: update database schema with RLS policies
refactor(shared): extract StatusBadge into reusable component
style: format all files with prettier
perf(public): optimize tap view page load time
```

---

## 📁 File Size Limits

- **Components:** Max 200 lines (split if larger)
- **Pages:** Max 150 lines (extract components)
- **Utilities:** Max 100 lines per function
- **API Routes:** Max 100 lines (extract to service layer)

If a file exceeds these limits, consider splitting it.

---

## ✅ Checklist Before Committing

- [ ] No TypeScript errors (`npm run type-check`)
- [ ] No linting errors (`npm run lint`)
- [ ] Code is formatted (`npm run format`)
- [ ] File headers are present
- [ ] No `console.log` in production code
- [ ] No hardcoded values (use constants/config)
- [ ] Loading and error states handled
- [ ] Mobile responsive
- [ ] Tested locally

---

## 🚫 Anti-Patterns to Avoid

```typescript
// ❌ Don't use magic numbers
if (status === 1) {}  // What does 1 mean?

// ✅ Use named constants
if (status === ORDER_STATUS.PENDING) {}


// ❌ Don't mutate props
function Component({ items }) {
  items.push(newItem)  // Bad!
}

// ✅ Use immutable updates
function Component({ items, onAdd }) {
  onAdd?.([...items, newItem])
}


// ❌ Don't use index as key
{items.map((item, index) => (
  <Item key={index} {...item} />  // Bad for dynamic lists
))}

// ✅ Use unique identifiers
{items.map((item) => (
  <Item key={item.id} {...item} />
))}


// ❌ Don't put business logic in components
function OrderCard({ order }) {
  const commission = order.salePrice - order.msp > 0 
    ? 100 + (order.salePrice - order.msp) * 0.5 
    : 100
}

// ✅ Extract to utility functions
import { calculateCommission } from '@/lib/utils/commission'

function OrderCard({ order }) {
  const commission = calculateCommission(order.salePrice, order.msp)
}
```

---

**Last Updated:** January 17, 2026
