/**
 * @file Order Type Definitions
 * @description Types for order management across Admin and Agent dashboards
 * 
 * @owner Dev 1 (primary), Dev 2 (co-owner)
 * @shared Used by Admin Dashboard and Agent Dashboard
 * 
 * @see docs/DATABASE_SCHEMA.md - orders table
 * @see docs/API_CONTRACTS.md - Orders API
 * @see ProductRequirementsDocument.txt Section 6.1.1 for order requirements
 */

/**
 * Order status throughout the fulfillment pipeline
 * Maps to Kanban columns in Admin dashboard
 */
export type OrderStatus =
    | 'pending_approval'
    | 'approved'
    | 'printing'
    | 'printed'
    | 'ready_to_ship'
    | 'shipped'
    | 'delivered'
    | 'paid'
    | 'rejected'
    | 'cancelled'

/**
 * Payment status for orders
 */
export type PaymentStatus = 'pending' | 'advance_paid' | 'paid' | 'cod'

/**
 * Shipping address for direct orders
 */
export interface ShippingAddress {
    flat: string
    building: string
    street: string
    landmark?: string
    city: string
    state: string
    pincode: string
}

/**
 * Card design reference in orders
 */
export interface OrderCardDesign {
    id: string
    name: string
    previewUrl: string
}

/**
 * Agent reference in orders
 */
export interface OrderAgent {
    id: string
    fullName: string
    referralCode: string
}

/**
 * Main Order interface
 * Represents a card order in the system
 */
export interface Order {
    id: string
    orderNumber: number

    // Customer details (denormalized)
    customerId?: string
    customerName: string
    customerCompany?: string
    customerPhone: string
    customerEmail: string
    customerWhatsapp?: string
    customerPhotoUrl?: string

    // Card & customization
    cardDesign: OrderCardDesign
    cardDesignId: string
    line1Text?: string
    line2Text?: string

    // Pricing
    mspAtOrder: number
    salePrice: number
    commissionAmount: number
    overrideCommission: number

    // Status
    status: OrderStatus
    paymentStatus: PaymentStatus

    // Flags
    isDirectSale: boolean
    isBelowMsp: boolean

    // Agent (null for direct sales)
    agent?: OrderAgent
    agentId?: string

    // Portfolio
    portfolioSlug?: string

    // Shipping (for direct orders)
    shippingAddress?: ShippingAddress
    trackingNumber?: string

    // Notes
    specialInstructions?: string
    adminNotes?: string
    rejectionReason?: string

    // Timestamps
    createdAt: string
    updatedAt: string
    approvedAt?: string
    shippedAt?: string
    deliveredAt?: string
    paidAt?: string
}

/**
 * Order creation payload (from Agent)
 */
export interface CreateOrderPayload {
    customerName: string
    customerCompany?: string
    customerPhone: string
    customerEmail: string
    customerWhatsapp?: string
    customerPhotoUrl?: string
    cardDesignId: string
    line1Text?: string
    line2Text?: string
    salePrice: number
    paymentStatus: PaymentStatus
    specialInstructions?: string
}

/**
 * Order creation payload (Direct/Website)
 */
export interface CreateDirectOrderPayload extends CreateOrderPayload {
    shippingAddress: ShippingAddress
}

/**
 * Order status update payload
 */
export interface UpdateOrderStatusPayload {
    status: OrderStatus
    portfolioSlug?: string
    adminNotes?: string
    trackingNumber?: string
    rejectionReason?: string
}

/**
 * Order list query parameters
 */
export interface OrderListParams {
    status?: OrderStatus
    agentId?: string
    page?: number
    limit?: number
    search?: string
}

/**
 * Order list response
 */
export interface OrderListResponse {
    orders: Order[]
    total: number
    page: number
    limit: number
}

/**
 * Order approval response with customer credentials
 */
export interface OrderApprovalResponse {
    id: string
    status: 'approved'
    portfolioSlug: string
    customerCredentials: {
        username: string
        password: string
        profileUrl: string
    }
    wekonnectMessage: string
}
