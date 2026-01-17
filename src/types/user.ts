/**
 * @file User Type Definitions
 * @description Base user types and authentication
 * 
 * @owner All Developers
 * @shared Core auth types used across all modules
 * 
 * @see docs/DATABASE_SCHEMA.md - profiles table
 * @see docs/ARCHITECTURE.md - Authentication section
 */

/**
 * User role enum
 */
export type UserRole = 'admin' | 'agent' | 'customer'

/**
 * Base user profile (extends Supabase auth.users)
 */
export interface UserProfile {
    id: string
    role: UserRole
    fullName: string
    phone?: string
    avatarUrl?: string
    createdAt: string
    updatedAt: string
}

/**
 * Session user (returned from auth)
 */
export interface SessionUser {
    id: string
    email: string
    role: UserRole
    fullName: string
    avatarUrl?: string
}

/**
 * Login credentials
 */
export interface LoginCredentials {
    email: string
    password: string
}

/**
 * Auth state for useAuth hook
 */
export interface AuthState {
    user: SessionUser | null
    loading: boolean
    error: Error | null
}
