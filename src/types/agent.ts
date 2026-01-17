/**
 * @file Agent Type Definitions
 * @description Types for marketing agents and MLM structure
 * 
 * @owner Dev 2 (primary), Dev 1 (for admin agent management)
 * @shared Used by Admin Dashboard and Agent Dashboard
 * 
 * @see docs/DATABASE_SCHEMA.md - agents table
 * @see docs/API_CONTRACTS.md - Agents API
 * @see ProductRequirementsDocument.txt Section 3.3 & 6.2 for agent requirements
 */

/**
 * Agent account status
 */
export type AgentStatus = 'active' | 'inactive'

/**
 * Payment method for payouts
 */
export type PaymentMethod = 'upi' | 'bank_transfer' | 'cash'

/**
 * Agent MSP (Minimum Selling Price) for a card design
 */
export interface AgentMsp {
    cardDesignId: string
    cardDesignName: string
    mspAmount: number
}

/**
 * Sub-agent summary (for parent agent view)
 */
export interface SubAgentSummary {
    id: string
    fullName: string
    totalSales: number
    overrideEarnings: number
    joinedAt: string
    status: AgentStatus
}

/**
 * Full agent profile
 */
export interface Agent {
    id: string
    profileId: string

    // Basic info
    fullName: string
    email: string
    phone: string
    referralCode: string
    city?: string

    // Banking details
    upiId?: string
    bankAccount?: string
    bankIfsc?: string
    bankHolderName?: string

    // Commission settings
    baseCommission: number

    // MLM structure
    parentAgentId?: string

    // Stats
    totalSales: number
    totalEarnings: number
    availableBalance: number

    // Status
    status: AgentStatus

    // Timestamps
    createdAt: string
    updatedAt: string

    // Related data (populated on detail view)
    msps?: AgentMsp[]
    subAgents?: SubAgentSummary[]
}

/**
 * Agent overview stats (for dashboard home)
 */
export interface AgentStats {
    totalSales: number
    totalEarnings: number
    availableBalance: number
    amountReceived: number
}

/**
 * Agent creation payload (Admin)
 */
export interface CreateAgentPayload {
    fullName: string
    email: string
    phone: string
    city?: string
    upiId?: string
    bankAccount?: string
    bankIfsc?: string
    bankHolderName?: string
    baseCommission?: number
    parentAgentId?: string
}

/**
 * Agent creation response
 */
export interface CreateAgentResponse {
    id: string
    referralCode: string
    credentials: {
        username: string
        password: string
    }
}

/**
 * Agent self-signup payload (via referral link)
 */
export interface AgentSignupPayload {
    fullName: string
    email: string
    phone: string
    city?: string
    experience?: string
    referralCode: string
}

/**
 * Payout record
 */
export interface Payout {
    id: string
    agentId: string
    amount: number
    paymentMethod: PaymentMethod
    adminNotes?: string
    status: 'pending' | 'completed' | 'failed'
    createdAt: string
}

/**
 * Payout request payload
 */
export interface PayoutPayload {
    amount: number
    paymentMethod: PaymentMethod
    adminNotes?: string
}

/**
 * Commission liability (for admin finance view)
 */
export interface CommissionLiability {
    agentId: string
    fullName: string
    availableBalance: number
    lastPayoutDate?: string
}
