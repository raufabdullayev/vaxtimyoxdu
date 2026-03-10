/// <reference lib="webworker" />

/**
 * Service Worker for Vaxtim Yoxdu PWA
 *
 * Strategies:
 * - Cache-first for static assets (JS, CSS, images, fonts)
 * - Network-first for HTML pages and API calls
 * - Offline fallback page when network is unavailable
 */

const CACHE_NAME = 'vaxtimyoxdu-v1'
const OFFLINE_URL = '/offline'

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

// ── Fetch ────────────────────────────────────────────────────────────

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

/**
 * Cache-first strategy: try the cache, fall back to network.
 * If the network response is successful, update the cache for next time.
 */
async function cacheFirst(request) {
  const cached = await caches.match(request)
  if (cached) {
    return cached
  }

  try {
    const response = await fetch(request)
    if (response.ok) {
      const cache = await caches.open(CACHE_NAME)
      cache.put(request, response.clone())
    }
    return response
  } catch {
    // For static assets with no cache and no network, return a basic error
    return new Response('Offline', { status: 503, statusText: 'Service Unavailable' })
  }
}

/**
 * Network-first strategy: try the network, fall back to cache.
 * Successful network responses are cached for future offline access.
 */
async function networkFirst(request) {
  try {
    const response = await fetch(request)
    if (response.ok) {
      const cache = await caches.open(CACHE_NAME)
      cache.put(request, response.clone())
    }
    return response
  } catch {
    const cached = await caches.match(request)
    if (cached) {
      return cached
    }
    // For navigation requests, return the offline page
    if (isNavigationRequest(request)) {
      const offlinePage = await caches.match(OFFLINE_URL)
      if (offlinePage) {
        return offlinePage
      }
    }
    return new Response('Offline', { status: 503, statusText: 'Service Unavailable' })
  }
}

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url)

  // Only handle same-origin requests
  if (url.origin !== self.location.origin) {
    return
  }

  // Skip non-GET requests
  if (event.request.method !== 'GET') {
    return
  }

  // API requests: network-first (data should be fresh)
  if (isApiRequest(url)) {
    event.respondWith(networkFirst(event.request))
    return
  }

  // Static assets: cache-first (immutable content)
  if (isStaticAsset(url)) {
    event.respondWith(cacheFirst(event.request))
    return
  }

  // Navigation / HTML pages: network-first with offline fallback
  event.respondWith(networkFirst(event.request))
})

// ── Push notification placeholder ────────────────────────────────────
// Uncomment and implement when push notifications are needed:
// self.addEventListener('push', (event) => { ... })
// self.addEventListener('notificationclick', (event) => { ... })
