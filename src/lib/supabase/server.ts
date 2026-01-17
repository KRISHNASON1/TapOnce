/**
 * @file Supabase Server Client
 * @description Server-side Supabase client for API routes and Server Components
 * 
 * @owner All Developers
 * @shared Core infrastructure
 * 
 * @see docs/DATABASE_SCHEMA.md for table definitions
 * 
 * USAGE:
 * - Use in Server Components, API routes, and server actions
 * - Respects RLS policies
 * - Handles cookie-based auth automatically
 */

import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'

// TODO: Generate types from Supabase
// import type { Database } from '@/types/database'

/**
 * Create a Supabase client for server-side usage
 * 
 * @example
 * const supabase = createServerSupabaseClient()
 * const { data, error } = await supabase.from('orders').select('*')
 */
export function createServerSupabaseClient() {
    const cookieStore = cookies()

    return createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                get(name: string) {
                    return cookieStore.get(name)?.value
                },
                set(name: string, value: string, options: CookieOptions) {
                    try {
                        cookieStore.set({ name, value, ...options })
                    } catch (error) {
                        // Handle cookies in Server Components
                    }
                },
                remove(name: string, options: CookieOptions) {
                    try {
                        cookieStore.set({ name, value: '', ...options })
                    } catch (error) {
                        // Handle cookies in Server Components
                    }
                },
            },
        }
    )
}
