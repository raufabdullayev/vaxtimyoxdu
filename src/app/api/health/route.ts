import { NextResponse } from 'next/server'
import { Redis } from '@upstash/redis'
import { getSupabaseServer, isSupabaseConfigured } from '@/lib/supabase/client'

// Read version once at module load
const APP_VERSION = process.env.npm_package_version || '1.0.0'

// In-memory cache for health check results (avoids external calls on every poll)
const CACHE_TTL_MS = 60_000
let cachedResult: { data: HealthCheckResult; statusCode: number; expiresAt: number } | null = null

// Initialize Redis client for health checks
const redisUrl = process.env.UPSTASH_REDIS_REST_URL?.trim()
const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN?.trim()
const redis =
  redisUrl && redisToken
    ? new Redis({ url: redisUrl, token: redisToken })
    : null

interface HealthCheckResult {
  status: 'healthy' | 'degraded' | 'unhealthy'
  timestamp: string
  version: string
  checks: {
    supabase: { status: 'ok' | 'missing' | 'error'; responseTime?: number }
    redis: { status: 'ok' | 'missing' | 'error'; responseTime?: number }
  }
}

async function checkSupabase(): Promise<{
  status: 'ok' | 'missing' | 'error'
  responseTime?: number
}> {
  if (!isSupabaseConfigured) {
    return { status: 'missing' }
  }

  const supabase = getSupabaseServer()
  if (!supabase) {
    return { status: 'missing' }
  }

  const startTime = Date.now()
  try {
    // Simple health check query - check if auth endpoint responds
    const result = await Promise.race([
      supabase.auth.getSession(),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Timeout')), 5000)
      ),
    ]) as { error?: unknown }
    const error = result?.error

    const responseTime = Date.now() - startTime
    return error ? { status: 'error', responseTime } : { status: 'ok', responseTime }
  } catch {
    const responseTime = Date.now() - startTime
    return { status: 'error', responseTime }
  }
}

async function checkRedis(): Promise<{
  status: 'ok' | 'missing' | 'error'
  responseTime?: number
}> {
  if (!redis) {
    return { status: 'missing' }
  }

  const startTime = Date.now()
  try {
    // Simple PING command to check connectivity
    const result = await Promise.race([
      redis.ping(),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Timeout')), 5000)
      ),
    ])

    const responseTime = Date.now() - startTime
    return result === 'PONG' ? { status: 'ok', responseTime } : { status: 'error', responseTime }
  } catch {
    const responseTime = Date.now() - startTime
    return { status: 'error', responseTime }
  }
}

export async function GET() {
  // Return cached result if still valid
  if (cachedResult && Date.now() < cachedResult.expiresAt) {
    return NextResponse.json(cachedResult.data, {
      status: cachedResult.statusCode,
      headers: {
        'Cache-Control': 'public, max-age=30, s-maxage=30',
      },
    })
  }

  const [supabaseCheck, redisCheck] = await Promise.all([
    checkSupabase(),
    checkRedis(),
  ])

  // Determine overall health status
  const allOk = supabaseCheck.status === 'ok' && redisCheck.status === 'ok'
  const hasErrors = supabaseCheck.status === 'error' || redisCheck.status === 'error'
  const overallStatus: 'healthy' | 'degraded' | 'unhealthy' = allOk
    ? 'healthy'
    : hasErrors
      ? 'unhealthy'
      : 'degraded' // one or more missing but no errors

  const result: HealthCheckResult = {
    status: overallStatus,
    timestamp: new Date().toISOString(),
    version: APP_VERSION,
    checks: {
      supabase: supabaseCheck,
      redis: redisCheck,
    },
  }

  const statusCode = overallStatus === 'healthy' ? 200 : overallStatus === 'degraded' ? 200 : 503

  // Cache the result in memory for 60s
  cachedResult = { data: result, statusCode, expiresAt: Date.now() + CACHE_TTL_MS }

  return NextResponse.json(result, {
    status: statusCode,
    headers: {
      'Cache-Control': 'public, max-age=30, s-maxage=30',
    },
  })
}
