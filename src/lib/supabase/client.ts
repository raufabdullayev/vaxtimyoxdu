/**
 * Supabase client for Vaxtim Yoxdu.
 *
 * SETUP INSTRUCTIONS
 * ------------------
 * 1. Create a Supabase project at https://supabase.com
 * 2. Run the SQL migration in supabase/migrations/001_initial_schema.sql
 *    against your project (Dashboard -> SQL Editor -> paste & run).
 * 3. Add the following environment variables to Vercel (or .env.local):
 *      NEXT_PUBLIC_SUPABASE_URL=https://<your-project-ref>.supabase.co
 *      SUPABASE_SERVICE_ROLE_KEY=<your-service-role-key>
 * 4. Run `npm install` to install @supabase/supabase-js.
 *
 * IMPORTANT: The service role key bypasses Row Level Security.  It must
 * ONLY be used in server-side code (API routes, server components).
 * Never expose it to the browser.
 *
 * If the environment variables are not configured, all Supabase operations
 * degrade gracefully -- the app continues to work without a database.
 */

import { createClient, SupabaseClient } from '@supabase/supabase-js'
import type { Database } from './types'

// ---------------------------------------------------------------------------
// Configuration
// ---------------------------------------------------------------------------

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? ''
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? ''

/** True when all required env vars are present. */
export const isSupabaseConfigured: boolean =
  supabaseUrl.length > 0 && supabaseServiceKey.length > 0

// ---------------------------------------------------------------------------
// Server client (service role -- for API routes only)
// ---------------------------------------------------------------------------

let _serverClient: SupabaseClient<Database> | null = null

/**
 * Returns a Supabase client authenticated with the service role key.
 *
 * Use this exclusively in server-side code (API route handlers, server
 * actions, etc.).  Returns `null` when Supabase is not configured so
 * callers can implement a graceful fallback.
 */
export function getSupabaseServer(): SupabaseClient<Database> | null {
  if (!isSupabaseConfigured) {
    return null
  }

  if (!_serverClient) {
    _serverClient = createClient<Database>(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    })
  }

  return _serverClient
}

// ---------------------------------------------------------------------------
// Public (anon) client -- available if needed in the future
// ---------------------------------------------------------------------------

let _publicClient: SupabaseClient<Database> | null = null

/**
 * Returns a Supabase client using the public anon key.
 *
 * Safe for use in client components.  Returns `null` when the anon key
 * is not configured.
 *
 * NOTE: Currently unused.  Provided as a foundation for future features
 * that need client-side Supabase access (e.g. realtime subscriptions).
 */
export function getSupabasePublic(): SupabaseClient<Database> | null {
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ''

  if (!supabaseUrl || !anonKey) {
    return null
  }

  if (!_publicClient) {
    _publicClient = createClient<Database>(supabaseUrl, anonKey)
  }

  return _publicClient
}
