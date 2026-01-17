/**
 * @file Supabase Browser Client
 * @description Client-side Supabase client for browser usage
 * 
 * @owner All Developers
 * @shared Core infrastructure
 * 
 * @see docs/DATABASE_SCHEMA.md for table definitions
 * 
 * USAGE:
 * - Use in client components ('use client')
 * - Respects RLS policies
 * - User authentication context automatically included
 */

import { createBrowserClient } from '@supabase/ssr'

// TODO: Generate types from Supabase
// import type { Database } from '@/types/database'

/**
 * Create a Supabase client for browser usage
 * 
 * @example
 * const supabase = createClient()
 * const { data, error } = await supabase.from('orders').select('*')
 */
export function createClient() {
    return createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
}
