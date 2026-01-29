/**
 * @file Customer Orders API
 * @description API endpoint for fetching customer's orders
 * 
 * @owner Dev 2
 * @module customer
 */

import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: NextRequest) {
    try {
        const supabase = await createClient()

        // Get authenticated user
        const { data: { user }, error: authError } = await supabase.auth.getUser()
        if (authError || !user) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            )
        }

        // Get customer from profile
        const { data: customer, error: customerError } = await supabase
            .from('customers')
            .select('id, email, phone')
            .eq('profile_id', user.id)
            .single()

        if (customerError || !customer) {
            return NextResponse.json({
                orders: [],
                total: 0
            })
        }

        // Fetch orders for this customer using customer_id, email, or phone
        const { data: orders, error: ordersError } = await supabase
            .from('orders')
            .select(`
                id,
                order_number,
                customer_name,
                customer_company,
                customer_phone,
                customer_email,
                status,
                payment_status,
                sale_price,
                tracking_number,
                portfolio_slug,
                special_instructions,
                created_at,
                updated_at,
                approved_at,
                shipped_at,
                delivered_at,
                card_design:card_designs (
                    id,
                    name,
                    preview_url
                )
            `)
            .or(`customer_id.eq.${customer.id},customer_email.eq.${customer.email},customer_phone.eq.${customer.phone}`)
            .order('created_at', { ascending: false })

        if (ordersError) {
            console.error('Failed to fetch orders:', ordersError)
            return NextResponse.json({
                orders: [],
                total: 0
            })
        }

        // Format the orders
        const formattedOrders = (orders || []).map(order => ({
            id: order.id,
            orderNumber: order.order_number,
            customerName: order.customer_name,
            customerCompany: order.customer_company,
            status: order.status,
            paymentStatus: order.payment_status,
            salePrice: order.sale_price,
            trackingNumber: order.tracking_number,
            portfolioSlug: order.portfolio_slug,
            specialInstructions: order.special_instructions,
            cardDesign: order.card_design,
            createdAt: order.created_at,
            updatedAt: order.updated_at,
            approvedAt: order.approved_at,
            shippedAt: order.shipped_at,
            deliveredAt: order.delivered_at
        }))

        return NextResponse.json({
            orders: formattedOrders,
            total: formattedOrders.length
        })
    } catch (error) {
        console.error('Customer orders API error:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}
