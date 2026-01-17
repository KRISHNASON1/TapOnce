/**
 * @file Commission Calculator
 * @description Calculate agent commission based on sale price and MSP
 * 
 * @owner Dev 2 (primary), Dev 1 (for admin views)
 * @shared Used by Agent Dashboard and Admin Dashboard
 * 
 * @see ProductRequirementsDocument.txt Section 6.2.2 for commission rules
 * 
 * COMMISSION FORMULA:
 * - Base commission: ₹100 (configurable per agent)
 * - Negotiation bonus: 50% of (Sale Price - MSP)
 * - Total = Base + Bonus
 * 
 * OVERRIDE COMMISSION (MLM):
 * - Parent agent earns 2% of sub-agent's sale price
 */

import {
    DEFAULT_BASE_COMMISSION,
    NEGOTIATION_BONUS_PERCENTAGE,
    OVERRIDE_COMMISSION_PERCENTAGE,
} from '@/config/constants'

export interface CommissionResult {
    baseCommission: number
    negotiationBonus: number
    totalCommission: number
    isBelowMsp: boolean
}

/**
 * Calculate agent commission for an order
 * 
 * @param salePrice - Final selling price negotiated by agent
 * @param msp - Minimum Selling Price for the agent
 * @param baseCommission - Base commission amount (default: ₹100)
 * @returns Commission breakdown
 * 
 * @example
 * // Sale above MSP
 * calculateCommission(699, 600, 100)
 * // Returns: { baseCommission: 100, negotiationBonus: 49.5, totalCommission: 149.5, isBelowMsp: false }
 * 
 * // Sale at MSP
 * calculateCommission(600, 600, 100)
 * // Returns: { baseCommission: 100, negotiationBonus: 0, totalCommission: 100, isBelowMsp: false }
 * 
 * // Sale below MSP (requires approval)
 * calculateCommission(550, 600, 100)
 * // Returns: { baseCommission: 100, negotiationBonus: 0, totalCommission: 0, isBelowMsp: true }
 */
export function calculateCommission(
    salePrice: number,
    msp: number,
    baseCommission: number = DEFAULT_BASE_COMMISSION
): CommissionResult {
    // Check if below MSP
    if (salePrice < msp) {
        return {
            baseCommission,
            negotiationBonus: 0,
            totalCommission: 0, // No commission for below-MSP until approved
            isBelowMsp: true,
        }
    }

    // Calculate negotiation bonus (50% of amount above MSP)
    const amountAboveMsp = salePrice - msp
    const negotiationBonus = amountAboveMsp * NEGOTIATION_BONUS_PERCENTAGE

    return {
        baseCommission,
        negotiationBonus,
        totalCommission: baseCommission + negotiationBonus,
        isBelowMsp: false,
    }
}

/**
 * Calculate override commission for parent agent
 * 
 * @param subAgentSalePrice - Sale price from sub-agent's order
 * @returns Override commission amount (2% of sale price)
 * 
 * @example
 * calculateOverrideCommission(1000) // Returns: 20
 */
export function calculateOverrideCommission(subAgentSalePrice: number): number {
    return subAgentSalePrice * OVERRIDE_COMMISSION_PERCENTAGE
}

/**
 * Format commission for display
 * 
 * @example
 * formatCommissionBreakdown({ baseCommission: 100, negotiationBonus: 49.5, totalCommission: 149.5 })
 * // Returns: "₹100 (base) + ₹49.50 (bonus) = ₹149.50"
 */
export function formatCommissionBreakdown(result: CommissionResult): string {
    if (result.isBelowMsp) {
        return 'Below MSP - requires approval'
    }

    if (result.negotiationBonus === 0) {
        return `₹${result.baseCommission} (base commission)`
    }

    return `₹${result.baseCommission} (base) + ₹${result.negotiationBonus.toFixed(2)} (bonus) = ₹${result.totalCommission.toFixed(2)}`
}
