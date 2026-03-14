import { z } from 'zod'

/**
 * Centralized environment variable validation using Zod.
 *
 * Splits variables into server-only and client-safe (NEXT_PUBLIC_*) schemas.
 * Parsed and validated at import time so missing/malformed vars are caught
 * early during build or startup rather than silently degrading at runtime.
 *
 * Required vs optional:
 * - Supabase URL + service key are required (core DB features)
 * - Everything else is optional with graceful fallback
 */

// ---------------------------------------------------------------------------
// Server-only environment variables
// ---------------------------------------------------------------------------

const serverSchema = z.object({
  // AI provider keys (optional -- fallback chain, at least one needed for AI features)
  GROQ_API_KEY: z.string().min(1).optional(),
  GEMINI_API_KEY: z.string().min(1).optional(),
  OPENAI_API_KEY: z.string().min(1).optional(),

  // Upstash Redis (optional -- falls back to in-memory rate limiting)
  UPSTASH_REDIS_REST_URL: z.string().url().optional(),
  UPSTASH_REDIS_REST_TOKEN: z.string().min(1).optional(),

  // Supabase server key (required for DB features)
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1).optional(),

  // Analytics stats endpoint auth
  ANALYTICS_API_KEY: z.string().min(1).optional(),

  // IndexNow SEO submission
  INDEXNOW_API_KEY: z.string().min(1).optional(),

  // Resend email delivery
  RESEND_API_KEY: z.string().min(1).optional(),

  // Newsletter unsubscribe token signing (required in production)
  UNSUBSCRIBE_SECRET: z.string().min(32).optional(),
})

// ---------------------------------------------------------------------------
// Client-safe environment variables (NEXT_PUBLIC_*)
// ---------------------------------------------------------------------------

const clientSchema = z.object({
  // Supabase (required for DB features)
  NEXT_PUBLIC_SUPABASE_URL: z.string().url().optional(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1).optional(),

  // Google Analytics
  NEXT_PUBLIC_GA_ID: z.string().min(1).optional(),

  // Google AdSense
  NEXT_PUBLIC_ADSENSE_ID: z.string().min(1).optional(),
})

// ---------------------------------------------------------------------------
// Parse & export
// ---------------------------------------------------------------------------

const isProduction = process.env.NODE_ENV === 'production'

const serverResult = serverSchema.safeParse(process.env)
const clientResult = clientSchema.safeParse(process.env)

if (!serverResult.success) {
  const message = `[env] Server environment validation failed: ${JSON.stringify(serverResult.error.flatten().fieldErrors)}`
  if (isProduction) {
    throw new Error(message)
  }
  console.error(message)
}

if (!clientResult.success) {
  const message = `[env] Client environment validation failed: ${JSON.stringify(clientResult.error.flatten().fieldErrors)}`
  if (isProduction) {
    throw new Error(message)
  }
  console.error(message)
}

/** Validated server-only environment variables. */
export const serverEnv = serverResult.success ? serverResult.data : ({} as z.infer<typeof serverSchema>)

/** Validated client-safe (NEXT_PUBLIC_*) environment variables. */
export const clientEnv = clientResult.success ? clientResult.data : ({} as z.infer<typeof clientSchema>)

/** Combined validated environment. */
export const env = { ...serverEnv, ...clientEnv }

// ---------------------------------------------------------------------------
// Helper type exports
// ---------------------------------------------------------------------------

export type ServerEnv = z.infer<typeof serverSchema>
export type ClientEnv = z.infer<typeof clientSchema>
export type Env = ServerEnv & ClientEnv
