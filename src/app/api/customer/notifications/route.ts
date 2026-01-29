/**
 * @file Customer Notifications API
 * @description API endpoint for customer notifications
 * 
 * @owner Dev 2
 * @module customer
 */

import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

// GET: Fetch notifications for authenticated customer
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

        // Get customer ID from profile
        const { data: customer, error: customerError } = await supabase
            .from('customers')
            .select('id')
            .eq('profile_id', user.id)
            .single()

        if (customerError || !customer) {
            // Return empty notifications if customer not found
            return NextResponse.json({
                notifications: [],
                total: 0,
                unreadCount: 0
            })
        }

        // Fetch notifications - check if table exists first
        const { data: notifications, error: notifError } = await supabase
            .from('customer_notifications')
            .select('*')
            .eq('customer_id', customer.id)
            .order('created_at', { ascending: false })
            .limit(20)

        if (notifError) {
            // If table doesn't exist, return empty array
            if (notifError.code === '42P01') {
                return NextResponse.json({
                    notifications: [],
                    total: 0,
                    unreadCount: 0
                })
            }
            console.error('Failed to fetch notifications:', notifError)
            return NextResponse.json({
                notifications: [],
                total: 0,
                unreadCount: 0
            })
        }

        const formattedNotifications = (notifications || []).map(n => ({
            id: n.id,
            customerId: n.customer_id,
            title: n.title,
            message: n.message,
            type: n.type,
            orderId: n.order_id,
            isRead: n.is_read,
            createdAt: n.created_at
        }))

        const unreadCount = formattedNotifications.filter(n => !n.isRead).length

        return NextResponse.json({
            notifications: formattedNotifications,
            total: formattedNotifications.length,
            unreadCount
        })
    } catch (error) {
        console.error('Notifications API error:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}

// PATCH: Mark notification(s) as read
export async function PATCH(request: NextRequest) {
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

        const body = await request.json()
        const { id, markAllRead } = body

        // Get customer ID
        const { data: customer } = await supabase
            .from('customers')
            .select('id')
            .eq('profile_id', user.id)
            .single()

        if (!customer) {
            return NextResponse.json(
                { error: 'Customer not found' },
                { status: 404 }
            )
        }

        if (markAllRead) {
            // Mark all notifications as read
            const { error } = await supabase
                .from('customer_notifications')
                .update({ is_read: true })
                .eq('customer_id', customer.id)

            if (error) throw error
        } else if (id) {
            // Mark single notification as read
            const { error } = await supabase
                .from('customer_notifications')
                .update({ is_read: true })
                .eq('id', id)
                .eq('customer_id', customer.id)

            if (error) throw error
        }

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error('Mark notification read error:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}
