# TapOnce - API Contracts

> **Purpose:** Define all API endpoints so frontend and backend work on same contracts  
> **Last Updated:** January 17, 2026

---

## 🌐 Base URL

| Environment | Base URL |
|-------------|----------|
| Development | `http://localhost:3000/api` |
| Production | `https://taponce.in/api` |

---

## 🔐 Authentication

All protected endpoints require Bearer token in header:

```
Authorization: Bearer <supabase_access_token>
```

Public endpoints are marked with 🌍.

---

## 📋 Orders API

### List Orders

```
GET /api/orders
```

**Query Parameters:**
| Param | Type | Description |
|-------|------|-------------|
| status | string | Filter by status |
| agent_id | uuid | Filter by agent |
| page | number | Page number (default: 1) |
| limit | number | Items per page (default: 20) |

**Response:**
```json
{
  "orders": [
    {
      "id": "uuid",
      "order_number": 12050,
      "customer_name": "Rahul Verma",
      "customer_company": "Tech Solutions",
      "card_design": {
        "id": "uuid",
        "name": "Vertical Blue Premium"
      },
      "agent": {
        "id": "uuid",
        "full_name": "Prince"
      },
      "sale_price": 699,
      "commission_amount": 200,
      "status": "pending_approval",
      "payment_status": "cod",
      "created_at": "2026-01-17T12:00:00Z"
    }
  ],
  "total": 100,
  "page": 1,
  "limit": 20
}
```

**Access:** Admin, Agent (own orders only)

---

### Get Single Order

```
GET /api/orders/:id
```

**Response:**
```json
{
  "id": "uuid",
  "order_number": 12050,
  "customer_name": "Rahul Verma",
  "customer_company": "Tech Solutions Pvt Ltd",
  "customer_phone": "+919876543210",
  "customer_email": "rahul@techsolutions.in",
  "customer_whatsapp": "+919876543210",
  "customer_photo_url": "https://...",
  "card_design": {
    "id": "uuid",
    "name": "Vertical Blue Premium",
    "preview_url": "https://..."
  },
  "line1_text": "RAHUL VERMA",
  "line2_text": "Founder & CEO",
  "msp_at_order": 600,
  "sale_price": 699,
  "commission_amount": 149.50,
  "status": "pending_approval",
  "payment_status": "cod",
  "is_direct_sale": false,
  "is_below_msp": false,
  "portfolio_slug": null,
  "special_instructions": "Need by 25-Jan for conference",
  "admin_notes": null,
  "agent": {
    "id": "uuid",
    "full_name": "Prince",
    "referral_code": "PRINCE10"
  },
  "created_at": "2026-01-17T12:00:00Z",
  "updated_at": "2026-01-17T12:00:00Z"
}
```

**Access:** Admin, Agent (own orders), Customer (own orders)

---

### Create Order (Agent)

```
POST /api/orders
```

**Request Body:**
```json
{
  "customer_name": "Rahul Verma",
  "customer_company": "Tech Solutions Pvt Ltd",
  "customer_phone": "+919876543210",
  "customer_email": "rahul@techsolutions.in",
  "customer_whatsapp": "+919876543210",
  "customer_photo_url": "https://...",
  "card_design_id": "uuid",
  "line1_text": "RAHUL VERMA",
  "line2_text": "Founder & CEO",
  "sale_price": 699,
  "payment_status": "cod",
  "special_instructions": "Need by 25-Jan for conference"
}
```

**Response:**
```json
{
  "id": "uuid",
  "order_number": 12050,
  "status": "pending_approval",
  "commission_amount": 149.50,
  "message": "Order submitted successfully"
}
```

**Access:** Agent

---

### Create Order (Direct/Website) 🌍

```
POST /api/orders/direct
```

**Request Body:**
```json
{
  "customer_name": "Rahul Verma",
  "customer_company": "Tech Solutions Pvt Ltd",
  "customer_phone": "+919876543210",
  "customer_email": "rahul@techsolutions.in",
  "customer_photo_url": "https://...",
  "card_design_id": "uuid",
  "line1_text": "RAHUL VERMA",
  "line2_text": "Founder & CEO",
  "shipping_address": {
    "flat": "402",
    "building": "Sunrise Apartments",
    "street": "MG Road",
    "landmark": "Near City Mall",
    "city": "Indore",
    "state": "Madhya Pradesh",
    "pincode": "452001"
  }
}
```

**Response:**
```json
{
  "id": "uuid",
  "order_number": 12051,
  "status": "pending_approval",
  "message": "Order placed successfully! You will receive confirmation via email."
}
```

**Access:** Public

---

### Update Order Status (Admin)

```
PATCH /api/orders/:id/status
```

**Request Body:**
```json
{
  "status": "approved",
  "portfolio_slug": "rahul-verma",
  "admin_notes": "Approved. Sending to Wekonnect."
}
```

**Response:**
```json
{
  "id": "uuid",
  "status": "approved",
  "portfolio_slug": "rahul-verma",
  "customer_credentials": {
    "username": "rahul@techsolutions.in",
    "password": "Rahul@Tech2026",
    "profile_url": "https://taponce.in/rahul-verma"
  },
  "wekonnect_message": "──────────────────────────\nNEW ORDER #12050\n..."
}
```

**Access:** Admin only

**Valid Status Transitions:**
- `pending_approval` → `approved` | `rejected`
- `approved` → `printing`
- `printing` → `printed`
- `printed` → `ready_to_ship`
- `ready_to_ship` → `shipped`
- `shipped` → `delivered`
- `delivered` → `paid`

---

### Reject Order (Admin)

```
PATCH /api/orders/:id/reject
```

**Request Body:**
```json
{
  "rejection_reason": "Photo resolution too low. Please upload 800x800px minimum."
}
```

**Response:**
```json
{
  "id": "uuid",
  "status": "rejected",
  "message": "Order rejected. Agent notified."
}
```

**Access:** Admin only

---

### Cancel Order (Agent)

```
DELETE /api/orders/:id
```

**Response:**
```json
{
  "message": "Order cancelled successfully"
}
```

**Access:** Agent (only for `pending_approval` orders)

---

## 👥 Customers API

### List Customers (Admin)

```
GET /api/customers
```

**Query Parameters:**
| Param | Type | Description |
|-------|------|-------------|
| status | string | Filter by status |
| agent_id | uuid | Filter by agent |
| search | string | Search by name, email, phone |
| page | number | Page number |
| limit | number | Items per page |

**Response:**
```json
{
  "customers": [
    {
      "id": "uuid",
      "slug": "rahul-verma",
      "full_name": "Rahul Verma",
      "company": "Tech Solutions",
      "phone": "+919876543210",
      "email": "rahul@techsolutions.in",
      "status": "active",
      "created_at": "2026-01-17T12:00:00Z"
    }
  ],
  "total": 50,
  "page": 1,
  "limit": 20
}
```

**Access:** Admin

---

### Get Customer Profile (for Tap View) 🌍

```
GET /api/customers/slug/:slug
```

**Response:**
```json
{
  "full_name": "Rahul Verma",
  "job_title": "Founder & CEO",
  "company": "Tech Solutions Pvt Ltd",
  "bio": "Building the future of digital networking...",
  "phone": "+919876543210",
  "email": "rahul@techsolutions.in",
  "whatsapp": "+919876543210",
  "avatar_url": "https://...",
  "linkedin_url": "https://linkedin.com/in/rahul-verma",
  "instagram_url": "https://instagram.com/rahulverma",
  "website_url": "https://techsolutions.in",
  "custom_links": [
    { "label": "Portfolio", "url": "https://..." }
  ]
}
```

**Access:** Public (only active profiles)

---

### Update Customer Profile

```
PATCH /api/customers/:id
```

**Request Body:**
```json
{
  "job_title": "CEO & Co-Founder",
  "bio": "Updated bio...",
  "linkedin_url": "https://linkedin.com/in/rahul-verma"
}
```

**Response:**
```json
{
  "id": "uuid",
  "updated_at": "2026-01-17T14:00:00Z",
  "message": "Profile updated successfully"
}
```

**Access:** Customer (own profile), Admin (any)

---

### Generate vCard 🌍

```
GET /api/customers/slug/:slug/vcard
```

**Response:** `.vcf` file download

**Access:** Public

---

### Generate Portfolio PDF 🌍

```
GET /api/customers/slug/:slug/portfolio.pdf
```

**Response:** PDF file download

**Access:** Public

---

## 🤝 Agents API

### List Agents (Admin)

```
GET /api/agents
```

**Response:**
```json
{
  "agents": [
    {
      "id": "uuid",
      "full_name": "Prince",
      "referral_code": "PRINCE10",
      "city": "Indore",
      "total_sales": 45,
      "total_earnings": 15000,
      "available_balance": 3500,
      "status": "active",
      "created_at": "2026-01-10T12:00:00Z"
    }
  ],
  "total": 10
}
```

**Access:** Admin

---

### Get Agent Details

```
GET /api/agents/:id
```

**Response:**
```json
{
  "id": "uuid",
  "profile_id": "uuid",
  "full_name": "Prince",
  "email": "prince@example.com",
  "phone": "+919876543210",
  "referral_code": "PRINCE10",
  "city": "Indore",
  "upi_id": "prince@oksbi",
  "bank_account": "1234567890",
  "bank_ifsc": "SBIN0001234",
  "bank_holder_name": "Prince Yadav",
  "base_commission": 100,
  "total_sales": 45,
  "total_earnings": 15000,
  "available_balance": 3500,
  "status": "active",
  "sub_agents": [
    {
      "id": "uuid",
      "full_name": "Rahul Kumar",
      "total_sales": 12,
      "override_earnings": 240
    }
  ],
  "msps": [
    {
      "card_design_id": "uuid",
      "card_design_name": "Vertical Blue Premium",
      "msp_amount": 600
    }
  ]
}
```

**Access:** Admin, Agent (own data)

---

### Create Agent (Admin)

```
POST /api/agents
```

**Request Body:**
```json
{
  "full_name": "Rahul Kumar",
  "email": "rahul@example.com",
  "phone": "+919876543210",
  "city": "Mumbai",
  "upi_id": "rahul@paytm",
  "base_commission": 100,
  "parent_agent_id": "uuid"
}
```

**Response:**
```json
{
  "id": "uuid",
  "referral_code": "RAHUL22",
  "credentials": {
    "username": "rahul@example.com",
    "password": "Rahul@Agent2026"
  },
  "message": "Agent created successfully"
}
```

**Access:** Admin

---

### Agent Self-Signup (via Referral) 🌍

```
POST /api/agents/signup
```

**Request Body:**
```json
{
  "full_name": "Rahul Kumar",
  "email": "rahul@example.com",
  "phone": "+919876543210",
  "city": "Mumbai",
  "experience": "2 years in sales",
  "referral_code": "PRINCE10"
}
```

**Response:**
```json
{
  "message": "Application submitted! You will receive login credentials via email once approved."
}
```

**Access:** Public

---

### Update Agent MSP

```
PATCH /api/agents/:id/msp
```

**Request Body:**
```json
{
  "card_design_id": "uuid",
  "msp_amount": 550
}
```

**Response:**
```json
{
  "message": "MSP updated successfully"
}
```

**Access:** Admin

---

### Request Payout (Agent)

```
POST /api/agents/:id/payout-request
```

**Response:**
```json
{
  "message": "Payout request sent to admin"
}
```

**Access:** Agent (own)

---

### Process Payout (Admin)

```
POST /api/agents/:id/payout
```

**Request Body:**
```json
{
  "amount": 3500,
  "payment_method": "upi",
  "admin_notes": "Paid via UPI to prince@oksbi on 17-Jan"
}
```

**Response:**
```json
{
  "payout_id": "uuid",
  "new_balance": 0,
  "message": "Payout processed successfully"
}
```

**Access:** Admin

---

## 🎨 Card Designs API

### List Card Designs 🌍

```
GET /api/card-designs
```

**Response:**
```json
{
  "designs": [
    {
      "id": "uuid",
      "name": "Vertical Blue Premium",
      "description": "Professional vertical design with blue accents",
      "base_msp": 600,
      "preview_url": "https://...",
      "status": "active"
    }
  ]
}
```

**Access:** Public (active only), Admin (all)

---

### Get Agent-Specific Catalog

```
GET /api/card-designs/agent-catalog
```

**Response:**
```json
{
  "designs": [
    {
      "id": "uuid",
      "name": "Vertical Blue Premium",
      "description": "Professional vertical design",
      "your_msp": 550,
      "preview_url": "https://...",
      "status": "active"
    }
  ]
}
```

**Access:** Agent (returns personalized MSPs)

---

### Create Card Design (Admin)

```
POST /api/card-designs
```

**Request Body:**
```json
{
  "name": "Horizontal Gold Elite",
  "description": "Premium horizontal card with gold foil",
  "base_msp": 800,
  "preview_url": "https://...",
  "template_url": "https://..."
}
```

**Response:**
```json
{
  "id": "uuid",
  "message": "Card design created successfully"
}
```

**Access:** Admin

---

## 💰 Finance API

### Get Revenue Overview (Admin)

```
GET /api/finance/revenue
```

**Query Parameters:**
| Param | Type | Description |
|-------|------|-------------|
| period | string | `today`, `week`, `month`, `year`, `all` |

**Response:**
```json
{
  "total_revenue": 150000,
  "period_revenue": 25000,
  "agent_sales_revenue": 120000,
  "direct_sales_revenue": 30000,
  "orders_count": 200
}
```

**Access:** Admin

---

### Get Expenses (Admin)

```
GET /api/finance/expenses
```

**Response:**
```json
{
  "total_expenses": 80000,
  "by_category": {
    "printing": 40000,
    "shipping": 15000,
    "agent_commission": 20000,
    "marketing": 5000
  },
  "recent": [
    {
      "id": "uuid",
      "category": "printing",
      "amount": 500,
      "description": "Order #12050",
      "date": "2026-01-17"
    }
  ]
}
```

**Access:** Admin

---

### Add Expense (Admin)

```
POST /api/finance/expenses
```

**Request Body:**
```json
{
  "category": "marketing",
  "amount": 5000,
  "description": "Facebook Ads - January",
  "date": "2026-01-15"
}
```

**Access:** Admin

---

### Get Commission Liabilities (Admin)

```
GET /api/finance/commission-liabilities
```

**Response:**
```json
{
  "total_payable": 25000,
  "agents": [
    {
      "id": "uuid",
      "full_name": "Prince",
      "available_balance": 3500,
      "last_payout_date": "2026-01-10"
    }
  ]
}
```

**Access:** Admin

---

## 🔔 Notifications API

### Get Notifications

```
GET /api/notifications
```

**Query Parameters:**
| Param | Type | Description |
|-------|------|-------------|
| unread_only | boolean | Only unread notifications |
| limit | number | Items per page |

**Response:**
```json
{
  "notifications": [
    {
      "id": "uuid",
      "title": "Order Approved",
      "message": "Order #12044 (Priya Sharma) has been approved",
      "type": "order_approved",
      "action_url": "/agent/orders/uuid",
      "read": false,
      "created_at": "2026-01-17T14:00:00Z"
    }
  ],
  "unread_count": 5
}
```

**Access:** Authenticated users

---

### Mark Notification as Read

```
PATCH /api/notifications/:id/read
```

**Response:**
```json
{
  "message": "Notification marked as read"
}
```

**Access:** Owner only

---

### Mark All as Read

```
POST /api/notifications/read-all
```

**Response:**
```json
{
  "message": "All notifications marked as read"
}
```

**Access:** Authenticated users

---

## 📤 Upload API

### Upload Image

```
POST /api/upload
```

**Content-Type:** `multipart/form-data`

**Form Fields:**
| Field | Type | Description |
|-------|------|-------------|
| file | File | Image file (JPG, PNG, WebP) |
| bucket | string | `customer-photos` or `card-designs` |

**Response:**
```json
{
  "url": "https://supabase.co/.../customer-photos/abc123.webp",
  "path": "customer-photos/abc123.webp"
}
```

**Access:** Authenticated users

---

## 🔍 Search API

### Global Search (Admin)

```
GET /api/search
```

**Query Parameters:**
| Param | Type | Description |
|-------|------|-------------|
| q | string | Search query |
| type | string | `orders`, `customers`, `agents`, `all` |

**Response:**
```json
{
  "results": {
    "orders": [...],
    "customers": [...],
    "agents": [...]
  },
  "total": 15
}
```

**Access:** Admin

---

## 📝 Error Responses

All errors follow this format:

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid phone number format",
    "details": {
      "field": "customer_phone",
      "expected": "+91XXXXXXXXXX"
    }
  }
}
```

**Error Codes:**
| Code | HTTP Status | Description |
|------|-------------|-------------|
| VALIDATION_ERROR | 400 | Invalid input data |
| UNAUTHORIZED | 401 | Missing or invalid auth |
| FORBIDDEN | 403 | Insufficient permissions |
| NOT_FOUND | 404 | Resource not found |
| CONFLICT | 409 | Duplicate resource (e.g., slug) |
| RATE_LIMITED | 429 | Too many requests |
| SERVER_ERROR | 500 | Internal server error |

---

**Last Updated:** January 17, 2026
