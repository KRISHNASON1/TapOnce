/**
 * @file Supabase Admin Client
 * @description Service role client that bypasses RLS (use sparingly!)
 * 
 * @owner Dev 1 (database admin operations)
 * @shared Use only when RLS must be bypassed
 * 
 * ⚠️ WARNING: This client bypasses Row Level Security!
 * Only use for:
 * - Admin-only operations
 * - Background jobs
 * - System operations
 * 
 * NEVER expose to client-side code!
 */

import { createClient } from '@supabase/supabase-js'

// TODO: Generate types from Supabase
// import type { Database } from '@/types/database'

/**
 * Create a Supabase admin client (bypasses RLS)
 * 
 * ⚠️ Use sparingly! This bypasses all security policies.
 * 
 * @example
 * const supabase = createAdminClient()
 * // Can access any row in any table
 */
export function createAdminClient() {
    if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
        throw new Error('SUPABASE_SERVICE_ROLE_KEY is not set')
    }

    return createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY,
        {
            auth: {
                autoRefreshToken: false,
                persistSession: false,
            },
        }
    )
}
