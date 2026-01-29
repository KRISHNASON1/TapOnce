/**
 * @file Notification Types
 * @description TypeScript types for customer notifications
 * 
 * @owner Dev 2
 * @module customer
 */

export type NotificationType = 'order_update' | 'system' | 'promotion'

export interface CustomerNotification {
    id: string
    customerId: string
    title: string
    message: string
    type: NotificationType
    orderId?: string
    isRead: boolean
    createdAt: string
}

export interface NotificationResponse {
    notifications: CustomerNotification[]
    total: number
    unreadCount: number
}
