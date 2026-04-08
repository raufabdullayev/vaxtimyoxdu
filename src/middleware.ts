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

/**
 * Check whether the given origin/referer is in the allow-list using exact
 * origin comparison. Parsing with `new URL()` prevents prefix-based bypasses
 * such as `https://vaxtimyoxdu.com.evil.com`.
 *
 * Also rejects origins with embedded authentication info (e.g.,
 * `https://attacker.com@vaxtimyoxdu.com`) to prevent URL parsing bypasses.
 */
function isAllowedOrigin(value: string): boolean {
  try {
    const url = new URL(value)
    // Reject if origin contains authentication (username/password)
    if (url.username || url.password) {
      return false
    }
    return ALLOWED_ORIGINS.includes(url.origin)
  } catch {
    return false
  }
}

/** Hostnames that must be 301-redirected to the canonical domain. */
const REDIRECT_HOSTS = ['www.vaxtimyoxdu.com', 'vaxtimyoxdur.com', 'www.vaxtimyoxdur.com']
const CANONICAL_ORIGIN = 'https://vaxtimyoxdu.com'

// Create the next-intl middleware instance once.
const intlMiddleware = createIntlMiddleware(routing)

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // ─── Domain redirect: vaxtimyoxdur.com -> vaxtimyoxdu.com (301) ───
  // This must run FIRST, before any other logic, to ensure all requests
  // to the non-canonical domain are permanently redirected.
  const host = request.headers.get('host')?.split(':')[0] // strip port if present
  if (host && REDIRECT_HOSTS.includes(host)) {
    const url = new URL(`${CANONICAL_ORIGIN}${pathname}${request.nextUrl.search}`)
    return NextResponse.redirect(url, 301)
  }

  // ─── /news and /xeberler -> /info redirect (301) ───
  // Neither /news nor /xeberler exist; the correct route is /info.
  // Handles bare paths and locale-prefixed variants (/en/news, /tr/xeberler, etc.).
  const newsRedirectMatch = pathname.match(/^(?:\/(en|tr|ru))?\/(?:news|xeberler)(\/.*)?$/)
  if (newsRedirectMatch) {
    const localePrefix = newsRedirectMatch[1] ? `/${newsRedirectMatch[1]}` : ''
    const trailing = newsRedirectMatch[2] || ''
    const destination = `${request.nextUrl.origin}${localePrefix}/info${trailing}${request.nextUrl.search}`
    return NextResponse.redirect(destination, 301)
  }

  // ─── Health Day slug typo fix (301) ───
  // Old AZ slug had typo 'uzumlunya' (nonsense); correct is 'umumdunya' (ümumdünya).
  // Renamed in news-articles.ts; this preserves the old URL's SEO value.
  if (pathname === '/az/info/uzumlunya-saglamliq-gunu-2026-elm-ile-birge') {
    const destination = `${request.nextUrl.origin}/az/info/umumdunya-saglamliq-gunu-2026-elm-ile-birge${request.nextUrl.search}`
    return NextResponse.redirect(destination, 301)
  }

  // ─── API routes: keep existing CORS / CSRF logic, skip i18n ───
  if (pathname.startsWith('/api/')) {
    const origin = request.headers.get('origin')
    const referer = request.headers.get('referer')

    // For non-GET requests, validate origin (CSRF + CORS protection)
    if (request.method !== 'GET') {
      const originAllowed = origin && isAllowedOrigin(origin)
      const refererAllowed = referer && isAllowedOrigin(referer)

      if (process.env.NODE_ENV === 'production' && !originAllowed && !refererAllowed) {
        return NextResponse.json(
          { error: 'Forbidden: Invalid origin' },
          { status: 403 }
        )
      }
    }

    const response = NextResponse.next()

    if (origin && isAllowedOrigin(origin)) {
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
