import * as Sentry from '@sentry/nextjs'
import { NextRequest, NextResponse } from 'next/server'

/**
 * Wraps API route handlers with Sentry error tracking.
 * Automatically captures exceptions and passes them to Sentry.
 *
 * Usage:
 * ```typescript
 * export const POST = withErrorTracking(async (req) => {
 *   // Your route logic
 * })
 * ```
 */
export function withErrorTracking<T extends (req: NextRequest) => Promise<NextResponse>>(
  handler: T
): T {
  return (async (req: NextRequest) => {
    try {
      return await handler(req)
    } catch (error) {
      // Capture the error in Sentry with request context
      Sentry.captureException(error, {
        tags: {
          component: 'api-route',
          method: req.method,
          url: req.url,
        },
        level: 'error',
      })

      // Log the error
      const errorMessage = error instanceof Error ? error.message : String(error)
      console.error(`[API Error] ${req.method} ${new URL(req.url).pathname}:`, errorMessage)

      // Return generic error response
      return NextResponse.json(
        { error: 'Internal server error' },
        { status: 500 }
      )
    }
  }) as T
}

/**
 * Adds custom breadcrumb for API operations.
 * Useful for debugging request flow.
 */
export function addBreadcrumb(
  message: string,
  data?: Record<string, unknown>
): void {
  Sentry.addBreadcrumb({
    category: 'api',
    message,
    level: 'info',
    data,
  })
}
