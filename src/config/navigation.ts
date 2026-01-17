/**
 * @file Navigation Configuration
 * @description Sidebar navigation items per user role
 * 
 * @owner All Developers
 * @shared Used by layout components
 */

import type { UserRole } from '@/types'

export interface NavItem {
    label: string
    href: string
    icon: string // Icon name or emoji
    badge?: string // Optional badge (e.g., notification count)
}

/**
 * Admin sidebar navigation
 * @owner Dev 1
 */
export const ADMIN_NAV: NavItem[] = [
    { label: 'Dashboard', href: '/admin', icon: '📊' },
    { label: 'Orders', href: '/admin/orders', icon: '📋' },
    { label: 'Customers', href: '/admin/customers', icon: '👥' },
    { label: 'Agents', href: '/admin/agents', icon: '🤝' },
    { label: 'Finance', href: '/admin/finance', icon: '💰' },
    { label: 'Catalog', href: '/admin/catalog', icon: '🎨' },
    { label: 'Analytics', href: '/admin/analytics', icon: '📈' },
]

/**
 * Agent sidebar navigation
 * @owner Dev 2
 */
export const AGENT_NAV: NavItem[] = [
    { label: 'Dashboard', href: '/agent', icon: '📊' },
    { label: 'New Order', href: '/agent/orders/new', icon: '➕' },
    { label: 'My Orders', href: '/agent/orders', icon: '📋' },
    { label: 'Card Catalog', href: '/agent/catalog', icon: '🎨' },
    { label: 'My Network', href: '/agent/network', icon: '🌐' },
    { label: 'Payouts', href: '/agent/payouts', icon: '💵' },
    { label: 'Training', href: '/agent/training', icon: '📚' },
]

/**
 * Customer sidebar navigation
 * @owner Dev 3
 */
export const CUSTOMER_NAV: NavItem[] = [
    { label: 'Dashboard', href: '/dashboard', icon: '🏠' },
    { label: 'Edit Profile', href: '/dashboard/profile', icon: '✏️' },
    { label: 'Download Portfolio', href: '/dashboard/download', icon: '📥' },
    { label: 'Settings', href: '/dashboard/settings', icon: '⚙️' },
]

/**
 * Get navigation items by role
 */
export function getNavByRole(role: UserRole): NavItem[] {
    switch (role) {
        case 'admin':
            return ADMIN_NAV
        case 'agent':
            return AGENT_NAV
        case 'customer':
            return CUSTOMER_NAV
        default:
            return []
    }
}

/**
 * Get home route by role
 */
export function getHomeByRole(role: UserRole): string {
    switch (role) {
        case 'admin':
            return '/admin'
        case 'agent':
            return '/agent'
        case 'customer':
            return '/dashboard'
        default:
            return '/'
    }
}
