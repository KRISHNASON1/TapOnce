/**
 * @file Card Design Type Definitions
 * @description Types for card catalog management
 * 
 * @owner Dev 1 (admin view), Dev 2 (agent view)
 * @shared Used by Admin, Agent, and Landing Page
 * 
 * @see docs/DATABASE_SCHEMA.md - card_designs table
 * @see docs/API_CONTRACTS.md - Card Designs API
 * @see ProductRequirementsDocument.txt Section 6.1.8 for catalog requirements
 */

/**
 * Card design status
 */
export type CardDesignStatus = 'active' | 'inactive'

/**
 * Card design entity
 */
export interface CardDesign {
    id: string
    name: string
    description?: string
    baseMsp: number
    previewUrl: string
    templateUrl?: string
    status: CardDesignStatus
    totalSales: number
    createdAt: string
    updatedAt: string
}

/**
 * Card design for agent view (with personalized MSP)
 */
export interface AgentCardDesign extends CardDesign {
    yourMsp: number // Agent's personalized MSP
}

/**
 * Card design creation payload
 */
export interface CreateCardDesignPayload {
    name: string
    description?: string
    baseMsp: number
    previewUrl: string
    templateUrl?: string
    status?: CardDesignStatus
}

/**
 * Card design update payload
 */
export interface UpdateCardDesignPayload {
    name?: string
    description?: string
    baseMsp?: number
    previewUrl?: string
    templateUrl?: string
    status?: CardDesignStatus
}

/**
 * MSP update payload
 */
export interface UpdateMspPayload {
    cardDesignId: string
    mspAmount: number
}
