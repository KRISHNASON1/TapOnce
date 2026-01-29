/**
 * @file Notification Button
 * @description Bell icon with dropdown for customer notifications
 * 
 * @owner Dev 2
 * @module customer
 */

'use client'

import { useState, useEffect, useRef } from 'react'
import { Bell, Package, Check, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { createClient } from '@/lib/supabase/client'

interface Notification {
    id: string
    title: string
    message: string
    type: 'order_update' | 'system' | 'promotion'
    orderId?: string
    isRead: boolean
    createdAt: string
}

export default function NotificationButton() {
    const [isOpen, setIsOpen] = useState(false)
    const [notifications, setNotifications] = useState<Notification[]>([])
    const [loading, setLoading] = useState(true)
    const dropdownRef = useRef<HTMLDivElement>(null)

    // Fetch notifications
    useEffect(() => {
        async function fetchNotifications() {
            try {
                const res = await fetch('/api/customer/notifications')
                if (res.ok) {
                    const data = await res.json()
                    setNotifications(data.notifications || [])
                }
            } catch (error) {
                console.error('Failed to fetch notifications:', error)
            } finally {
                setLoading(false)
            }
        }
        fetchNotifications()
    }, [])

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    const unreadCount = notifications.filter(n => !n.isRead).length

    const markAsRead = async (id: string) => {
        try {
            await fetch('/api/customer/notifications', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id, isRead: true })
            })
            setNotifications(prev =>
                prev.map(n => n.id === id ? { ...n, isRead: true } : n)
            )
        } catch (error) {
            console.error('Failed to mark notification as read:', error)
        }
    }

    const markAllAsRead = async () => {
        try {
            await fetch('/api/customer/notifications', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ markAllRead: true })
            })
            setNotifications(prev => prev.map(n => ({ ...n, isRead: true })))
        } catch (error) {
            console.error('Failed to mark all as read:', error)
        }
    }

    const formatTime = (dateString: string) => {
        const date = new Date(dateString)
        const now = new Date()
        const diff = now.getTime() - date.getTime()
        const minutes = Math.floor(diff / 60000)
        const hours = Math.floor(diff / 3600000)
        const days = Math.floor(diff / 86400000)

        if (minutes < 1) return 'Just now'
        if (minutes < 60) return `${minutes}m ago`
        if (hours < 24) return `${hours}h ago`
        return `${days}d ago`
    }

    const getIcon = (type: string) => {
        switch (type) {
            case 'order_update':
                return <Package className="w-4 h-4 text-blue-500" />
            default:
                return <Bell className="w-4 h-4 text-gray-500" />
        }
    }

    return (
        <div className="relative" ref={dropdownRef}>
            <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(!isOpen)}
                className="relative p-2"
            >
                <Bell className="w-5 h-5 text-gray-600" />
                {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                        {unreadCount > 9 ? '9+' : unreadCount}
                    </span>
                )}
            </Button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                    {/* Header */}
                    <div className="flex items-center justify-between px-4 py-3 border-b">
                        <h3 className="font-semibold text-gray-900">Notifications</h3>
                        {unreadCount > 0 && (
                            <button
                                onClick={markAllAsRead}
                                className="text-xs text-blue-600 hover:text-blue-700"
                            >
                                Mark all as read
                            </button>
                        )}
                    </div>

                    {/* Notifications List */}
                    <div className="max-h-80 overflow-y-auto">
                        {loading ? (
                            <div className="px-4 py-8 text-center text-gray-500">
                                Loading...
                            </div>
                        ) : notifications.length === 0 ? (
                            <div className="px-4 py-8 text-center text-gray-500">
                                <Bell className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                                <p className="text-sm">No notifications yet</p>
                                <p className="text-xs text-gray-400 mt-1">
                                    We'll notify you about your orders here
                                </p>
                            </div>
                        ) : (
                            notifications.map(notification => (
                                <div
                                    key={notification.id}
                                    className={`px-4 py-3 border-b last:border-0 hover:bg-gray-50 cursor-pointer transition-colors ${!notification.isRead ? 'bg-blue-50/50' : ''
                                        }`}
                                    onClick={() => !notification.isRead && markAsRead(notification.id)}
                                >
                                    <div className="flex items-start gap-3">
                                        <div className="mt-0.5">
                                            {getIcon(notification.type)}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2">
                                                <p className={`text-sm ${!notification.isRead ? 'font-semibold' : 'font-medium'} text-gray-900 truncate`}>
                                                    {notification.title}
                                                </p>
                                                {!notification.isRead && (
                                                    <span className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0" />
                                                )}
                                            </div>
                                            <p className="text-xs text-gray-600 mt-0.5 line-clamp-2">
                                                {notification.message}
                                            </p>
                                            <p className="text-xs text-gray-400 mt-1">
                                                {formatTime(notification.createdAt)}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Footer */}
                    {notifications.length > 0 && (
                        <div className="px-4 py-2 border-t bg-gray-50 rounded-b-lg">
                            <a
                                href="/dashboard/track-orders"
                                className="text-xs text-blue-600 hover:text-blue-700 font-medium"
                            >
                                View all order updates →
                            </a>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}
