import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import createIntlMiddleware from 'next-intl/middleware'
import { routing } from './i18n/routing'

const ALLOWED_ORIGINS = [
  'https://vaxtimyoxdu.com',
  'https://www.vaxtimyoxdu.com',
  'https://vaxtimyoxdur.com',
  'https://www.vaxtimyoxdur.com',
]

// Create the next-intl middleware instance once.
const intlMiddleware = createIntlMiddleware(routing)

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // ─── API routes: keep existing CORS / CSRF logic, skip i18n ───
  if (pathname.startsWith('/api/')) {
    const origin = request.headers.get('origin')
    const referer = request.headers.get('referer')

    // For non-GET requests, validate origin (CSRF + CORS protection)
    if (request.method !== 'GET') {
      const isAllowedOrigin = origin && ALLOWED_ORIGINS.some(o => origin.startsWith(o))
      const isAllowedReferer = referer && ALLOWED_ORIGINS.some(o => referer.startsWith(o))

      if (process.env.NODE_ENV === 'production' && !isAllowedOrigin && !isAllowedReferer) {
        return NextResponse.json(
          { error: 'Forbidden: Invalid origin' },
          { status: 403 }
        )
      }
    }

    const response = NextResponse.next()

    if (origin && ALLOWED_ORIGINS.some(o => origin.startsWith(o))) {
      response.headers.set('Access-Control-Allow-Origin', origin)
      response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
      response.headers.set('Access-Control-Allow-Headers', 'Content-Type')
      response.headers.set('Access-Control-Max-Age', '86400')
    }

    return response
  }

  // ─── All other routes: delegate to next-intl for locale detection ───
  return intlMiddleware(request)
}

export const config = {
  // Match all paths except Next.js internals, static files, and Vercel assets.
  // API routes are handled inside the middleware function above.
  matcher: ['/((?!_next|_vercel|.*\\..*).*)'],
}
