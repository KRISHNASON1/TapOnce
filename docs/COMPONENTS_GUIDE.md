# TapOnce - Components Guide

> **Purpose:** Reference for all reusable components  
> **Last Updated:** January 19, 2026

---

## 📦 Component Libraries

### shadcn/ui Components (`src/components/ui/`)

These are standard shadcn/ui components. Use them directly.

| Component | Import | Usage |
|-----------|--------|-------|
| `Button` | `@/components/ui/button` | Primary actions, CTAs |
| `Input` | `@/components/ui/input` | Text inputs |
| `Label` | `@/components/ui/label` | Form labels |
| `Badge` | `@/components/ui/badge` | Status badges |
| `Dialog` | `@/components/ui/dialog` | Modals |
| `Select` | `@/components/ui/select` | Dropdowns |
| `Textarea` | `@/components/ui/textarea` | Multi-line text |
| `Switch` | `@/components/ui/switch` | Toggle switches |
| `Tabs` | `@/components/ui/tabs` | Tab navigation |

**Example:**
```tsx
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

<Button variant="outline" size="sm">Click Me</Button>
<Badge variant="secondary">Active</Badge>
```

---

## 🏢 Admin Components (`src/components/admin/`)

### Card Catalog Components

#### `CardDesignCard`
**File:** `src/components/admin/catalog/CardDesignCard.tsx`

Displays a single card design in a grid.

```tsx
import { CardDesignCard } from '@/components/admin/catalog/CardDesignCard'

<CardDesignCard
  card={cardDesign}
  onEdit={(card) => handleEdit(card)}
  onSetMsp={(card) => handleSetMsp(card)}
/>
```

**Props:**
| Prop | Type | Description |
|------|------|-------------|
| `card` | `CardDesign` | Card design object |
| `onEdit` | `(card) => void` | Edit button callback |
| `onSetMsp` | `(card) => void` | Set MSP button callback |

---

#### `CardDesignModal`
**File:** `src/components/admin/catalog/CardDesignModal.tsx`

Modal for creating/editing card designs.

```tsx
import { CardDesignModal } from '@/components/admin/catalog/CardDesignModal'

<CardDesignModal
  isOpen={showModal}
  onClose={() => setShowModal(false)}
  card={selectedCard} // null for new
  onSave={handleSave}
/>
```

---

#### `AgentMspModal`
**File:** `src/components/admin/catalog/AgentMspModal.tsx`

Modal for setting agent-specific MSPs.

```tsx
import { AgentMspModal } from '@/components/admin/catalog/AgentMspModal'

<AgentMspModal
  isOpen={showMspModal}
  onClose={() => setShowMspModal(false)}
  card={selectedCard}
  onSave={handleSaveMsp}
/>
```

---

## 📊 Data Services (`src/lib/services/`)

These services handle Supabase data operations.

### Orders Service
**File:** `src/lib/services/orders.ts`

```tsx
import { ordersService } from '@/lib/services'

// Get all orders
const orders = await ordersService.getOrders()

// Get orders for Kanban
const kanbanOrders = await ordersService.getOrdersForKanban()

// Update order status
await ordersService.updateOrderStatus(orderId, 'approved')
```

### Customers Service
**File:** `src/lib/services/customers.ts`

```tsx
import { customersService } from '@/lib/services'

// Get all customers
const customers = await customersService.getCustomers()

// Get single customer
const customer = await customersService.getCustomer(id)

// Update customer status
await customersService.updateCustomerStatus(id, 'inactive')
```

### Agents Service
**File:** `src/lib/services/agents.ts`

```tsx
import { agentsService } from '@/lib/services'

// Get all agents
const agents = await agentsService.getAgents()

// Get commission liabilities
const liabilities = await agentsService.getCommissionLiabilities()

// Process payout
await agentsService.processPayout({
  agentId,
  amount,
  paymentMethod: 'upi',
  adminNotes: 'Paid via UPI'
})
```

### Finance Service
**File:** `src/lib/services/finance.ts`

```tsx
import { financeService } from '@/lib/services'

// Get revenue stats
const stats = await financeService.getRevenueStats()

// Get expenses
const expenses = await financeService.getExpenses()

// Add expense
await financeService.addExpense({
  description,
  amount,
  category: 'printing',
  date
})
```

### Catalog Service
**File:** `src/lib/services/catalog.ts`

```tsx
import { catalogService } from '@/lib/services'

// Get all card designs
const cards = await catalogService.getCardDesigns()

// Get agent-specific cards with MSP
const agentCards = await catalogService.getAgentCardDesigns(agentId)

// Create card design
await catalogService.createCardDesign(cardData)

// Set agent MSP
await catalogService.setAgentMsp({
  agentId,
  cardDesignId,
  mspAmount
})
```

---

## 🪝 Custom Hooks (`src/hooks/`)

### `useDataService`
**File:** `src/hooks/useDataService.ts`

Generic hook for data fetching with loading/error states.

```tsx
import { useDataService } from '@/hooks/useDataService'
import { ordersService } from '@/lib/services'

function OrdersList() {
  const { data: orders, loading, error, refetch } = useDataService(
    () => ordersService.getOrders()
  )

  if (loading) return <Spinner />
  if (error) return <Error message={error} />

  return orders.map(order => <OrderCard key={order.id} order={order} />)
}
```

---

## 🎨 Common UI Patterns

### Status Badge
Use consistent status colors throughout the app:

```tsx
const statusColors = {
  pending: 'bg-yellow-100 text-yellow-800',
  approved: 'bg-blue-100 text-blue-800',
  printing: 'bg-purple-100 text-purple-800',
  shipped: 'bg-cyan-100 text-cyan-800',
  delivered: 'bg-green-100 text-green-800',
  paid: 'bg-emerald-100 text-emerald-800',
  rejected: 'bg-red-100 text-red-800',
}

<Badge className={statusColors[status]}>{status}</Badge>
```

### Stats Card
```tsx
<div className="p-5 bg-white rounded-xl border">
  <div className="flex items-center gap-3 mb-2">
    <div className="p-2 rounded-lg bg-blue-100">
      <DollarSign className="w-5 h-5 text-blue-600" />
    </div>
    <span className="text-sm text-muted-foreground">Total Revenue</span>
  </div>
  <p className="text-2xl font-bold">₹1,25,000</p>
</div>
```

### Modal Pattern
```tsx
<Dialog open={isOpen} onOpenChange={onClose}>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Modal Title</DialogTitle>
    </DialogHeader>
    <div className="py-4">
      {/* Content */}
    </div>
    <DialogFooter>
      <Button variant="outline" onClick={onClose}>Cancel</Button>
      <Button onClick={handleSave}>Save</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

---

## 📝 TypeScript Types (`src/types/`)

### Order Types
```tsx
import { Order, OrderStatus, CreateOrderPayload } from '@/types/order'
```

### Customer Types
```tsx
import { Customer, CustomerStatus } from '@/types/customer'
```

### Agent Types
```tsx
import { Agent, AgentMsp, Payout, PayoutPayload } from '@/types/agent'
```

### Card Design Types
```tsx
import { CardDesign, AgentCardDesign, CreateCardDesignPayload } from '@/types/card-design'
```

---

## ⚡ Icon Library

We use **Lucide React** for icons.

```tsx
import { 
  Home, User, Settings, Phone, Mail, 
  DollarSign, Package, Users, CreditCard,
  CheckCircle, XCircle, Clock, AlertTriangle
} from 'lucide-react'

<Phone className="w-5 h-5 text-green-600" />
```

**Common Icons:**
| Use Case | Icon |
|----------|------|
| Home/Dashboard | `Home` |
| User/Profile | `User` |
| Orders | `Package` |
| Money/Finance | `DollarSign` |
| Phone | `Phone` |
| Email | `Mail` |
| Success | `CheckCircle` |
| Error | `XCircle` |
| Warning | `AlertTriangle` |
| Loading/Pending | `Clock` |

---

## 🔗 Related Docs

- [CODING_STANDARDS.md](./CODING_STANDARDS.md) - Code conventions
- [FEATURES_COMPLETED.md](./FEATURES_COMPLETED.md) - What's built
- [API_CONTRACTS.md](./API_CONTRACTS.md) - API endpoints
