/// <reference lib="webworker" />

/**
 * Service Worker for Vaxtim Yoxdu PWA
 *
 * Cache versioning: Bump CACHE_VERSION when deploying breaking changes.
 * The activate handler automatically purges stale caches.
 *
 * Strategies:
 * - Cache-first for static assets (JS, CSS, images, fonts)
 *   with background refresh (stale-while-revalidate)
 * - Network-first for HTML pages and API calls
 * - Offline fallback page when network is unavailable
 */

// Bump this version whenever static assets in PRECACHE_ASSETS change (icons, logo, etc.)
// v4 (2026-04-09): Explicit favicon metadata + warm amber color palette (#E68A00)
const CACHE_VERSION = 4
const CACHE_NAME = `vaxtimyoxdu-v${CACHE_VERSION}`
const OFFLINE_URL = '/offline'

/**
 * Maximum age (in ms) for cached navigation responses.
 * After this threshold the SW will prefer the network.
 */
const MAX_NAV_CACHE_AGE_MS = 5 * 60 * 1000 // 5 minutes

/**
 * Static assets to pre-cache during installation.
 * These form the "app shell" and are available offline immediately.
 */
const PRECACHE_ASSETS = [
  '/',
  '/offline',
  '/manifest.json',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
  '/logo.png',
]

// ── Install ──────────────────────────────────────────────────────────
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(PRECACHE_ASSETS))
      .then(() => self.skipWaiting())
  )
})

// ── Activate ─────────────────────────────────────────────────────────
// Delete every cache whose name does not match the current version.
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key !== CACHE_NAME)
            .map((key) => caches.delete(key))
        )
      )
      .then(() => self.clients.claim())
  )
})

// ── Helpers ──────────────────────────────────────────────────────────

/**
 * Determine whether a request should use cache-first strategy.
 * Static assets (JS, CSS, images, fonts) change infrequently and
 * benefit from being served from cache.
 */
function isStaticAsset(url) {
  const pathname = url.pathname
  return (
    pathname.startsWith('/_next/static/') ||
    pathname.match(/\.(js|css|woff|woff2|ttf|otf|eot|png|jpg|jpeg|gif|svg|ico|webp|avif)$/)
  )
}

/**
 * Determine whether a request is a navigation (HTML page) request.
 */
function isNavigationRequest(request) {
  return request.mode === 'navigate'
}

/**
 * Determine whether a request is an API or data-fetching request.
 */
function isApiRequest(url) {
  return url.pathname.startsWith('/api/')
}

// ── Strategies ───────────────────────────────────────────────────────

/**
 * Stale-while-revalidate for static assets.
 *
 * Returns a cached response immediately (if available) while fetching
 * a fresh copy in the background. This gives instant loads for repeat
 * visits while still keeping the cache up to date.
 */
async function staleWhileRevalidate(request) {
  const cache = await caches.open(CACHE_NAME)
  const cached = await cache.match(request)

  // Kick off a background fetch regardless of cache state
  const fetchPromise = fetch(request)
    .then((response) => {
      if (response.ok) {
        cache.put(request, response.clone())
      }
      return response
    })
    .catch(() => cached || new Response('Offline', { status: 503, statusText: 'Service Unavailable' }))

  // Return the cached version immediately, or wait for the network
  return cached || fetchPromise
}

/**
 * Network-first strategy: try the network, fall back to cache.
 * Successful network responses are cached for future offline access.
 */
async function networkFirst(request) {
  const cache = await caches.open(CACHE_NAME)

  try {
    const response = await fetch(request)
    if (response.ok) {
      cache.put(request, response.clone())
    }
    return response
  } catch {
    const cached = await cache.match(request)
    if (cached) {
      return cached
    }
    // For navigation requests, return the offline page
    if (isNavigationRequest(request)) {
      const offlinePage = await cache.match(OFFLINE_URL)
      if (offlinePage) {
        return offlinePage
      }
    }
    return new Response('Offline', { status: 503, statusText: 'Service Unavailable' })
  }
}

// ── Fetch ────────────────────────────────────────────────────────────

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url)

  // Only handle same-origin requests
  if (url.origin !== self.location.origin) {
    return
  }

  // Skip non-GET requests (POST, PUT, etc. should always go to the network)
  if (event.request.method !== 'GET') {
    return
  }

  // API requests: network-first (data should be fresh)
  if (isApiRequest(url)) {
    event.respondWith(networkFirst(event.request))
    return
  }

  // Static assets: stale-while-revalidate (instant response + background update)
  if (isStaticAsset(url)) {
    event.respondWith(staleWhileRevalidate(event.request))
    return
  }

  // Navigation / HTML pages: network-first with offline fallback
  event.respondWith(networkFirst(event.request))
})

// ── Push notification placeholder ────────────────────────────────────
// Uncomment and implement when push notifications are needed:
// self.addEventListener('push', (event) => { ... })
// self.addEventListener('notificationclick', (event) => { ... })
