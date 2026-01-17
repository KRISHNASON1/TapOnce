/**
 * @file Utility Functions
 * @description Common utility functions used across the app
 * 
 * @owner All Developers
 * @shared Core utilities
 */

import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Merge Tailwind CSS classes with clsx
 * Use this for conditional class names
 * 
 * @example
 * cn('p-4', isActive && 'bg-blue-500', 'rounded-lg')
 */
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

/**
 * Format currency for Indian Rupees
 * 
 * @example
 * formatCurrency(699) // "₹699"
 * formatCurrency(1500) // "₹1,500"
 */
export function formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(amount)
}

/**
 * Format phone number for display
 * 
 * @example
 * formatPhone('+919876543210') // "+91 98765 43210"
 */
export function formatPhone(phone: string): string {
    const cleaned = phone.replace(/\D/g, '')
    if (cleaned.length === 10) {
        return `+91 ${cleaned.slice(0, 5)} ${cleaned.slice(5)}`
    }
    if (cleaned.length === 12 && cleaned.startsWith('91')) {
        return `+91 ${cleaned.slice(2, 7)} ${cleaned.slice(7)}`
    }
    return phone
}

/**
 * Format date for display
 * 
 * @example
 * formatDate('2026-01-17') // "17 Jan 2026"
 */
export function formatDate(date: string | Date): string {
    const d = typeof date === 'string' ? new Date(date) : date
    return d.toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
    })
}

/**
 * Format datetime for display
 * 
 * @example
 * formatDateTime('2026-01-17T14:30:00') // "17 Jan 2026, 2:30 PM"
 */
export function formatDateTime(date: string | Date): string {
    const d = typeof date === 'string' ? new Date(date) : date
    return d.toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
    })
}

/**
 * Generate a slug from text
 * 
 * @example
 * slugify('Rahul Verma') // "rahul-verma"
 * slugify('Tech Solutions Pvt Ltd') // "tech-solutions-pvt-ltd"
 */
export function slugify(text: string): string {
    return text
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '')
}

/**
 * Truncate text with ellipsis
 * 
 * @example
 * truncate('Long text here', 10) // "Long te..."
 */
export function truncate(text: string, length: number): string {
    if (text.length <= length) return text
    return text.slice(0, length - 3) + '...'
}

/**
 * Delay execution (for loading states, etc.)
 */
export function delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms))
}

/**
 * Check if running on server
 */
export const isServer = typeof window === 'undefined'

/**
 * Check if running on client
 */
export const isClient = !isServer
