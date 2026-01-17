# TapOnce - Database Schema

> **Database:** Supabase (PostgreSQL)  
> **Owner:** Dev 1  
> **Last Updated:** January 17, 2026

---

## 📊 Entity Relationship Diagram

```
┌─────────────────┐       ┌─────────────────┐
│     profiles    │       │   card_designs  │
│  (extends auth) │       │                 │
├─────────────────┤       ├─────────────────┤
│ id (FK users)   │       │ id              │
│ role            │       │ name            │
│ full_name       │       │ base_msp        │
│ phone           │       │ description     │
│ avatar_url      │       │ preview_url     │
│ created_at      │       │ template_url    │
└────────┬────────┘       │ status          │
         │                └────────┬────────┘
         │                         │
    ┌────┴────┐              ┌─────┴─────┐
    │         │              │           │
    ▼         ▼              ▼           │
┌───────┐ ┌───────────┐ ┌────────────┐   │
│agents │ │ customers │ │agent_msps  │───┘
├───────┤ ├───────────┤ ├────────────┤
│id (PK)│ │ id (PK)   │ │ agent_id   │
│profile│ │ profile_id│ │ design_id  │
│ code  │ │ slug      │ │ msp_amount │
│ city  │ │ company   │ └────────────┘
│ upi_id│ │ job_title │
│ bank  │ │ bio       │
│ parent│ │ social    │
└───┬───┘ │ linkedin  │
    │     │ instagram │
    │     └─────┬─────┘
    │           │
    │           │
    ▼           ▼
┌───────────────────────────────────┐
│              orders               │
├───────────────────────────────────┤
│ id                                │
│ order_number (unique, auto)       │
│ customer_id (FK customers)        │
│ agent_id (FK agents, nullable)    │
│ card_design_id (FK card_designs)  │
│ status                            │
│ line1_text, line2_text            │
│ customer_photo_url                │
│ sale_price, msp_at_order          │
│ commission_amount                 │
│ payment_status                    │
│ notes, rejection_reason           │
│ is_direct_sale                    │
│ created_at, updated_at            │
└───────────────────────────────────┘
         │             │
         │             │
         ▼             ▼
┌─────────────┐  ┌──────────────┐
│   payouts   │  │   expenses   │
├─────────────┤  ├──────────────┤
│ id          │  │ id           │
│ agent_id    │  │ category     │
│ amount      │  │ amount       │
│ method      │  │ description  │
│ notes       │  │ date         │
│ created_at  │  │ created_at   │
└─────────────┘  └──────────────┘
```

---

## 📋 Table Definitions

### 1. profiles

Extends Supabase auth.users with additional profile data.

```sql
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('admin', 'agent', 'customer')),
  full_name TEXT NOT NULL,
  phone TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS Policies
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Users can read their own profile
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

-- Users can update their own profile
CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- Admins can view all profiles
CREATE POLICY "Admins can view all profiles" ON profiles
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );
```

---

### 2. agents

Agent-specific data extending profiles.

```sql
CREATE TABLE agents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  referral_code TEXT UNIQUE NOT NULL,
  city TEXT,
  upi_id TEXT,
  bank_account TEXT,
  bank_ifsc TEXT,
  bank_holder_name TEXT,
  base_commission DECIMAL(10,2) DEFAULT 100.00,
  parent_agent_id UUID REFERENCES agents(id), -- For MLM structure
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
  total_sales INTEGER DEFAULT 0,
  total_earnings DECIMAL(10,2) DEFAULT 0,
  available_balance DECIMAL(10,2) DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for referral code lookups
CREATE INDEX idx_agents_referral_code ON agents(referral_code);

-- RLS Policies
ALTER TABLE agents ENABLE ROW LEVEL SECURITY;

-- Agents can view their own data
CREATE POLICY "Agents view own data" ON agents
  FOR SELECT USING (
    profile_id = auth.uid()
  );

-- Agents can view their sub-agents
CREATE POLICY "Agents view sub-agents" ON agents
  FOR SELECT USING (
    parent_agent_id IN (SELECT id FROM agents WHERE profile_id = auth.uid())
  );

-- Admins can CRUD all agents
CREATE POLICY "Admins full access" ON agents
  FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );
```

---

### 3. customers

Customer profiles for cardholders.

```sql
CREATE TABLE customers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  slug TEXT UNIQUE NOT NULL, -- URL slug: taponce.in/[slug]
  company TEXT,
  job_title TEXT,
  bio TEXT,
  whatsapp TEXT,
  linkedin_url TEXT,
  instagram_url TEXT,
  facebook_url TEXT,
  twitter_url TEXT,
  website_url TEXT,
  custom_links JSONB DEFAULT '[]', -- Array of {label, url}
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'pending', 'suspended')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for slug lookups (critical for tap view performance)
CREATE INDEX idx_customers_slug ON customers(slug);

-- RLS Policies
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;

-- Public can read customer data (for tap view)
CREATE POLICY "Public read access" ON customers
  FOR SELECT USING (status = 'active');

-- Customers can update their own profile
CREATE POLICY "Customers update own profile" ON customers
  FOR UPDATE USING (profile_id = auth.uid());

-- Admins full access
CREATE POLICY "Admins full access" ON customers
  FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );
```

---

### 4. card_designs

Card design catalog.

```sql
CREATE TABLE card_designs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  base_msp DECIMAL(10,2) NOT NULL, -- Base minimum selling price
  preview_url TEXT NOT NULL, -- Image preview
  template_url TEXT, -- PDF template for Wekonnect
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
  total_sales INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS Policies
ALTER TABLE card_designs ENABLE ROW LEVEL SECURITY;

-- Anyone can view active designs
CREATE POLICY "Public read active designs" ON card_designs
  FOR SELECT USING (status = 'active');

-- Admins can CRUD
CREATE POLICY "Admins full access" ON card_designs
  FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );
```

---

### 5. agent_msps

Per-agent MSP customization.

```sql
CREATE TABLE agent_msps (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agent_id UUID NOT NULL REFERENCES agents(id) ON DELETE CASCADE,
  card_design_id UUID NOT NULL REFERENCES card_designs(id) ON DELETE CASCADE,
  msp_amount DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(agent_id, card_design_id)
);

-- RLS Policies
ALTER TABLE agent_msps ENABLE ROW LEVEL SECURITY;

-- Agents can view their own MSPs
CREATE POLICY "Agents view own MSPs" ON agent_msps
  FOR SELECT USING (
    agent_id IN (SELECT id FROM agents WHERE profile_id = auth.uid())
  );

-- Admins full access
CREATE POLICY "Admins full access" ON agent_msps
  FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );
```

---

### 6. orders

Main orders table with full order lifecycle.

```sql
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number SERIAL UNIQUE, -- Auto-incrementing order number
  
  -- Relations
  customer_id UUID REFERENCES customers(id),
  agent_id UUID REFERENCES agents(id), -- NULL for direct sales
  card_design_id UUID NOT NULL REFERENCES card_designs(id),
  
  -- Customer details (denormalized for history)
  customer_name TEXT NOT NULL,
  customer_company TEXT,
  customer_phone TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_whatsapp TEXT,
  customer_photo_url TEXT,
  
  -- Card customization
  line1_text TEXT, -- e.g., "RAHUL VERMA"
  line2_text TEXT, -- e.g., "Founder & CEO"
  
  -- Pricing
  msp_at_order DECIMAL(10,2) NOT NULL, -- MSP at time of order (snapshot)
  sale_price DECIMAL(10,2) NOT NULL,
  commission_amount DECIMAL(10,2) DEFAULT 0, -- Calculated commission
  override_commission DECIMAL(10,2) DEFAULT 0, -- Parent agent override
  
  -- Status tracking
  status TEXT DEFAULT 'pending_approval' CHECK (status IN (
    'pending_approval',
    'approved',
    'printing',
    'printed',
    'ready_to_ship',
    'shipped',
    'delivered',
    'paid',
    'rejected',
    'cancelled'
  )),
  payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN (
    'pending', 'advance_paid', 'paid', 'cod'
  )),
  
  -- Flags
  is_direct_sale BOOLEAN DEFAULT FALSE, -- True if ordered from website
  is_below_msp BOOLEAN DEFAULT FALSE, -- True if sale_price < MSP
  
  -- Portfolio URL (generated on approval)
  portfolio_slug TEXT,
  
  -- Shipping (for direct orders)
  shipping_address JSONB, -- {flat, building, street, city, state, pincode}
  tracking_number TEXT,
  
  -- Notes
  special_instructions TEXT, -- From agent/customer
  admin_notes TEXT, -- Private admin notes
  rejection_reason TEXT,
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  approved_at TIMESTAMPTZ,
  shipped_at TIMESTAMPTZ,
  delivered_at TIMESTAMPTZ,
  paid_at TIMESTAMPTZ
);

-- Indexes
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_agent ON orders(agent_id);
CREATE INDEX idx_orders_customer ON orders(customer_id);
CREATE INDEX idx_orders_created ON orders(created_at DESC);

-- RLS Policies
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Agents can view their own orders
CREATE POLICY "Agents view own orders" ON orders
  FOR SELECT USING (
    agent_id IN (SELECT id FROM agents WHERE profile_id = auth.uid())
  );

-- Agents can create orders
CREATE POLICY "Agents create orders" ON orders
  FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'agent')
  );

-- Customers can view their own orders
CREATE POLICY "Customers view own orders" ON orders
  FOR SELECT USING (
    customer_id IN (SELECT id FROM customers WHERE profile_id = auth.uid())
  );

-- Admins full access
CREATE POLICY "Admins full access" ON orders
  FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );
```

---

### 7. payouts

Agent payout history.

```sql
CREATE TABLE payouts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agent_id UUID NOT NULL REFERENCES agents(id) ON DELETE CASCADE,
  amount DECIMAL(10,2) NOT NULL,
  payment_method TEXT CHECK (payment_method IN ('upi', 'bank_transfer', 'cash')),
  admin_notes TEXT,
  status TEXT DEFAULT 'completed' CHECK (status IN ('pending', 'completed', 'failed')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS Policies
ALTER TABLE payouts ENABLE ROW LEVEL SECURITY;

-- Agents can view their own payouts
CREATE POLICY "Agents view own payouts" ON payouts
  FOR SELECT USING (
    agent_id IN (SELECT id FROM agents WHERE profile_id = auth.uid())
  );

-- Admins full access
CREATE POLICY "Admins full access" ON payouts
  FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );
```

---

### 8. expenses

Business expense tracking.

```sql
CREATE TABLE expenses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category TEXT NOT NULL CHECK (category IN (
    'printing', 'shipping', 'agent_commission', 'marketing', 'other'
  )),
  amount DECIMAL(10,2) NOT NULL,
  description TEXT,
  expense_date DATE NOT NULL,
  order_id UUID REFERENCES orders(id), -- Link to order if applicable
  agent_payout_id UUID REFERENCES payouts(id), -- Link to payout if commission
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS Policies
ALTER TABLE expenses ENABLE ROW LEVEL SECURITY;

-- Only admins can access expenses
CREATE POLICY "Admins only" ON expenses
  FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );
```

---

### 9. notifications

In-app notifications for all users.

```sql
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT NOT NULL, -- 'order_approved', 'commission_added', 'payout_processed', etc.
  action_url TEXT, -- Link to navigate to
  read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for user notifications
CREATE INDEX idx_notifications_user ON notifications(user_id, read, created_at DESC);

-- RLS Policies
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Users can view their own notifications
CREATE POLICY "Users view own notifications" ON notifications
  FOR SELECT USING (user_id = auth.uid());

-- Users can mark their notifications as read
CREATE POLICY "Users update own notifications" ON notifications
  FOR UPDATE USING (user_id = auth.uid());

-- System can create notifications (via service role)
```

---

## 🔧 Database Functions

### Generate Order Number

```sql
-- Trigger to format order number as #12001, #12002, etc.
CREATE OR REPLACE FUNCTION format_order_number()
RETURNS TRIGGER AS $$
BEGIN
  NEW.order_number := 12000 + NEW.order_number;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_format_order_number
  BEFORE INSERT ON orders
  FOR EACH ROW
  EXECUTE FUNCTION format_order_number();
```

### Calculate Commission

```sql
CREATE OR REPLACE FUNCTION calculate_commission(
  p_sale_price DECIMAL,
  p_msp DECIMAL,
  p_base_commission DECIMAL DEFAULT 100
)
RETURNS DECIMAL AS $$
DECLARE
  negotiation_bonus DECIMAL;
BEGIN
  -- Base commission + 50% of amount above MSP
  IF p_sale_price > p_msp THEN
    negotiation_bonus := (p_sale_price - p_msp) * 0.5;
  ELSE
    negotiation_bonus := 0;
  END IF;
  
  RETURN p_base_commission + negotiation_bonus;
END;
$$ LANGUAGE plpgsql;
```

### Update Agent Balance on Order Paid

```sql
CREATE OR REPLACE FUNCTION update_agent_balance_on_paid()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.status = 'paid' AND OLD.status != 'paid' THEN
    -- Update agent's balance
    IF NEW.agent_id IS NOT NULL THEN
      UPDATE agents
      SET 
        available_balance = available_balance + NEW.commission_amount,
        total_earnings = total_earnings + NEW.commission_amount,
        total_sales = total_sales + 1
      WHERE id = NEW.agent_id;
      
      -- If agent has parent, add override commission
      UPDATE agents parent
      SET available_balance = available_balance + (NEW.sale_price * 0.02)
      FROM agents child
      WHERE child.id = NEW.agent_id 
        AND parent.id = child.parent_agent_id;
    END IF;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_agent_balance
  AFTER UPDATE ON orders
  FOR EACH ROW
  EXECUTE FUNCTION update_agent_balance_on_paid();
```

---

## 📦 Storage Buckets

```sql
-- Customer photos bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('customer-photos', 'customer-photos', true);

-- Card design previews
INSERT INTO storage.buckets (id, name, public)
VALUES ('card-designs', 'card-designs', true);

-- Card design templates (PDFs - private)
INSERT INTO storage.buckets (id, name, public)
VALUES ('design-templates', 'design-templates', false);
```

---

## 🔐 RLS Summary

| Table | Public | Customer | Agent | Admin |
|-------|--------|----------|-------|-------|
| profiles | ❌ | Own only | Own only | All |
| customers | Active only | Own only | ❌ | All |
| agents | ❌ | ❌ | Own + sub-agents | All |
| card_designs | Active only | Active only | Active only | All |
| agent_msps | ❌ | ❌ | Own only | All |
| orders | ❌ | Own only | Own only | All |
| payouts | ❌ | ❌ | Own only | All |
| expenses | ❌ | ❌ | ❌ | All |
| notifications | ❌ | Own only | Own only | All |

---

## 🚀 Migration Order

Run migrations in this order:

1. profiles (depends on auth.users)
2. card_designs (no dependencies)
3. agents (depends on profiles)
4. customers (depends on profiles)
5. agent_msps (depends on agents, card_designs)
6. orders (depends on customers, agents, card_designs)
7. payouts (depends on agents)
8. expenses (depends on orders, payouts)
9. notifications (depends on profiles)
10. Functions & Triggers

---

## 📝 Notes for Developers

- **Always snapshot pricing:** Store `msp_at_order` and `sale_price` at order time
- **Denormalize customer data:** Store customer name/phone in order for history
- **Slug uniqueness:** Check slug availability before creating customer
- **Commission calculation:** Use the `calculate_commission` function
- **Realtime:** Subscribe to `orders` table for live Kanban updates

---

**Owner:** Dev 1  
**Last Updated:** January 17, 2026
