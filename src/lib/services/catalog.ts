/**
 * @file Catalog Service
 * @description Data service for card design catalog operations
 * 
 * @owner Dev 1
 */

import { createClient } from '@/lib/supabase/client'
import { CardDesign, CardDesignStatus, CreateCardDesignPayload, UpdateCardDesignPayload } from '@/types/card-design'

export interface CardDesignsResponse {
    designs: CardDesign[]
    total: number
}

/**
 * Fetch all card designs
 */
export async function getCardDesigns(filters?: {
    status?: CardDesignStatus
}): Promise<CardDesignsResponse> {
    const supabase = createClient()

    let query = supabase
        .from('card_designs')
        .select('*', { count: 'exact' })
        .order('created_at', { ascending: false })

    if (filters?.status) {
        query = query.eq('status', filters.status)
    }

    const { data, error, count } = await query

    if (error) {
        console.error('Error fetching card designs:', error)
        return { designs: [], total: 0 }
    }

    const designs: CardDesign[] = (data || []).map((design: any) => ({
        id: design.id,
        name: design.name,
        description: design.description,
        baseMsp: design.base_msp,
        previewUrl: design.preview_url,
        templateUrl: design.template_url,
        status: design.status,
        totalSales: design.total_sales,
        createdAt: design.created_at,
        updatedAt: design.updated_at
    }))

    return { designs, total: count || 0 }
}

/**
 * Get single card design by ID
 */
export async function getCardDesignById(id: string): Promise<CardDesign | null> {
    const supabase = createClient()

    const { data, error } = await supabase
        .from('card_designs')
        .select('*')
        .eq('id', id)
        .single()

    if (error || !data) {
        console.error('Error fetching card design:', error)
        return null
    }

    return {
        id: data.id,
        name: data.name,
        description: data.description,
        baseMsp: data.base_msp,
        previewUrl: data.preview_url,
        templateUrl: data.template_url,
        status: data.status,
        totalSales: data.total_sales,
        createdAt: data.created_at,
        updatedAt: data.updated_at
    }
}

/**
 * Create new card design
 */
export async function createCardDesign(
    payload: CreateCardDesignPayload
): Promise<{ success: boolean; id?: string; error?: string }> {
    const supabase = createClient()

    const { data, error } = await supabase
        .from('card_designs')
        .insert({
            name: payload.name,
            description: payload.description,
            base_msp: payload.baseMsp,
            preview_url: payload.previewUrl,
            template_url: payload.templateUrl,
            status: payload.status || 'active'
        })
        .select('id')
        .single()

    if (error) {
        console.error('Error creating card design:', error)
        return { success: false, error: error.message }
    }

    return { success: true, id: data.id }
}

/**
 * Update card design
 */
export async function updateCardDesign(
    id: string,
    payload: UpdateCardDesignPayload
): Promise<{ success: boolean; error?: string }> {
    const supabase = createClient()

    const updateData: any = { updated_at: new Date().toISOString() }

    if (payload.name !== undefined) updateData.name = payload.name
    if (payload.description !== undefined) updateData.description = payload.description
    if (payload.baseMsp !== undefined) updateData.base_msp = payload.baseMsp
    if (payload.previewUrl !== undefined) updateData.preview_url = payload.previewUrl
    if (payload.templateUrl !== undefined) updateData.template_url = payload.templateUrl
    if (payload.status !== undefined) updateData.status = payload.status

    const { error } = await supabase
        .from('card_designs')
        .update(updateData)
        .eq('id', id)

    if (error) {
        console.error('Error updating card design:', error)
        return { success: false, error: error.message }
    }

    return { success: true }
}

/**
 * Get agent MSPs for a card design
 */
export async function getAgentMsps(cardDesignId: string): Promise<{
    agentId: string
    agentName: string
    mspAmount: number | null
}[]> {
    const supabase = createClient()

    // Get all agents with their MSP for this card design
    const { data: agents, error: agentsError } = await supabase
        .from('agents')
        .select(`
            id,
            profiles (full_name),
            agent_msps!left (
                msp_amount
            )
        `)
        .eq('status', 'active')

    if (agentsError) {
        console.error('Error fetching agent MSPs:', agentsError)
        return []
    }

    // Get MSPs for this specific card design
    const { data: msps } = await supabase
        .from('agent_msps')
        .select('agent_id, msp_amount')
        .eq('card_design_id', cardDesignId)

    const mspMap = new Map((msps || []).map(m => [m.agent_id, m.msp_amount]))

    return (agents || []).map((agent: any) => ({
        agentId: agent.id,
        agentName: agent.profiles?.full_name || 'Unknown',
        mspAmount: mspMap.get(agent.id) || null
    }))
}

/**
 * Update agent MSP for a card design
 */
export async function updateAgentMsp(
    cardDesignId: string,
    agentId: string,
    mspAmount: number
): Promise<{ success: boolean; error?: string }> {
    const supabase = createClient()

    // Upsert MSP
    const { error } = await supabase
        .from('agent_msps')
        .upsert({
            card_design_id: cardDesignId,
            agent_id: agentId,
            msp_amount: mspAmount,
            updated_at: new Date().toISOString()
        }, {
            onConflict: 'agent_id,card_design_id'
        })

    if (error) {
        console.error('Error updating agent MSP:', error)
        return { success: false, error: error.message }
    }

    return { success: true }
}
