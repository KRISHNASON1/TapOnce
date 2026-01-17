/**
 * @file Application Constants
 * @description Central place for all app constants
 * 
 * @owner All Developers
 * @shared Used across all modules
 * 
 * IMPORTANT: Never hardcode values in components.
 * Always add them here and import.
 */

// App info
export const APP_NAME = 'TapOnce'
export const APP_DESCRIPTION = 'NFC Smart Card Platform - Digital business cards for professionals'
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

// File upload limits
export const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
export const MIN_IMAGE_RESOLUTION = 800 // 800x800px minimum
export const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp']

// Text limits
export const MAX_LINE1_LENGTH = 30
export const MAX_LINE2_LENGTH = 30
export const MAX_BIO_LENGTH = 500
export const MAX_CUSTOM_LINKS = 5

// Pagination
export const DEFAULT_PAGE_SIZE = 20
export const MAX_PAGE_SIZE = 100

// Commission settings
export const DEFAULT_BASE_COMMISSION = 100 // ₹100 base commission
export const NEGOTIATION_BONUS_PERCENTAGE = 0.5 // 50% of amount above MSP
export const OVERRIDE_COMMISSION_PERCENTAGE = 0.02 // 2% for parent agent

// Order number prefix (orders start from #12001)
export const ORDER_NUMBER_PREFIX = 12000

// Cache durations (in seconds)
export const CACHE_DURATION = {
    PUBLIC_PROFILE: 60 * 60, // 1 hour for tap view pages
    CARD_DESIGNS: 60 * 60 * 24, // 24 hours for card catalog
    STATIC_ASSETS: 60 * 60 * 24 * 30, // 30 days for static assets
}

// Date formats
export const DATE_FORMAT = 'dd MMM yyyy' // 17 Jan 2026
export const DATETIME_FORMAT = 'dd MMM yyyy, HH:mm' // 17 Jan 2026, 14:30

// Phone validation (India)
export const PHONE_REGEX = /^(\+91)?[6-9]\d{9}$/

// URL validation
export const URL_REGEX = /^https?:\/\/.+/
