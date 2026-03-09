import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const ALLOWED_ORIGINS = [
  'https://vaxtimyoxdu.com',
  'https://www.vaxtimyoxdu.com',
  'https://vaxtimyoxdur.com',
  'https://www.vaxtimyoxdur.com',
]

export function middleware(request: NextRequest) {
  if (!request.nextUrl.pathname.startsWith('/api/')) {
    return NextResponse.next()
  }

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

export const config = {
  matcher: '/api/:path*',
}
