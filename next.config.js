const createNextIntlPlugin = require('next-intl/plugin')
const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts')

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

const { withSentryConfig } = require('@sentry/nextjs')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
  },
  async redirects() {
    return [
      // 301 redirect: vaxtimyoxdur.com -> vaxtimyoxdu.com (all paths).
      // This catches paths with file extensions (e.g. /sitemap.xml, /robots.txt)
      // that the middleware matcher excludes. Pages and API routes are handled
      // by the middleware redirect above for better performance.
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: '(www\\.)?vaxtimyoxdur\\.com',
          },
        ],
        destination: 'https://vaxtimyoxdu.com/:path*',
        permanent: true,
      },
      // Fix wrong tool slugs that were manually submitted to Google Search Console.
      // These URLs were shared/indexed with incorrect names; redirect to the real slugs.
      {
        source: '/tools/image-compressor',
        destination: '/tools/image-compress',
        permanent: true,
      },
      {
        source: '/tools/base64-encoder',
        destination: '/tools/base64-encode-decode',
        permanent: true,
      },
      // Locale-prefixed variants of the same wrong slugs
      {
        source: '/:locale(en|tr|ru)/tools/image-compressor',
        destination: '/:locale/tools/image-compress',
        permanent: true,
      },
      {
        source: '/:locale(en|tr|ru)/tools/base64-encoder',
        destination: '/:locale/tools/base64-encode-decode',
        permanent: true,
      },
    ]
  },
  async headers() {
    return [
      {
        // Cache Next.js static chunks aggressively.
        // These filenames contain content hashes, so they are safe to cache forever.
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // Cache static assets (JS, CSS, fonts) for 1 year
        source: '/:path*.(js|css|woff|woff2|ttf|otf|eot)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // Cache images for 30 days with stale-while-revalidate fallback
        source: '/:path*.(jpg|jpeg|png|gif|svg|ico|webp|avif)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=2592000, stale-while-revalidate=86400',
          },
        ],
      },
      {
        // Service worker must never be cached by the browser.
        // MDN and Chromium both require max-age=0 so the browser always
        // re-validates and picks up updated SW scripts promptly.
        source: '/sw.js',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=0, must-revalidate',
          },
          {
            key: 'Service-Worker-Allowed',
            value: '/',
          },
        ],
      },
      {
        // Manifest should be cached moderately (1 day) with revalidation
        source: '/manifest.json',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, stale-while-revalidate=43200',
          },
        ],
      },
      {
        // Security and performance headers for all routes
        source: '/:path*',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'Content-Security-Policy',
            // SECURITY NOTE (last reviewed: 2026-04-06):
            //
            // CSP HARDENING (SSG-compatible):
            //
            //   Nonce-based CSP requires dynamic rendering — incompatible with this
            //   project's 700+ SSG pages. 'strict-dynamic' is also incompatible
            //   because it causes 'unsafe-inline' to be ignored in CSP3 browsers,
            //   which would block Next.js RSC hydration inline scripts
            //   (<script>self.__next_f.push(...)</script>) that have dynamic
            //   per-page content and cannot be pre-hashed.
            //
            //   Track SRI support: https://github.com/vercel/next.js/issues/61694
            //
            // APPROACH:
            //   - 'unsafe-inline' in script-src: required for RSC hydration
            //   - SHA-256 hash for theme script: documents intent, ready for
            //     when 'unsafe-inline' can be removed (no-op while unsafe-inline present)
            //   - 'unsafe-eval' is NOT included
            //   - Inline GA config script eliminated — merged into /analytics.js
            //   - style-src 'unsafe-inline': required for Next.js/Tailwind
            //   - base-uri 'self': prevents <base> tag hijacking
            //   - form-action 'self': prevents form submission to external origins
            //   - object-src 'none': blocks Flash/Java plugins
            //   - upgrade-insecure-requests: forces HTTPS for all subresources
            //   - JSON-LD scripts (application/ld+json) are data, not executable
            //
            // HASHED SCRIPTS (ready for future unsafe-inline removal):
            //   sha256-H1c0n0aYlOGsOcmXhv/OOLCwL4Fcw3Hkj/NEAMmvWrE=  → theme FOUC prevention
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'sha256-H1c0n0aYlOGsOcmXhv/OOLCwL4Fcw3Hkj/NEAMmvWrE=' https://www.googletagmanager.com https://pagead2.googlesyndication.com https://www.google-analytics.com",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: https:",
              "font-src 'self' https://fonts.gstatic.com",
              "connect-src 'self' https://www.google-analytics.com https://pagead2.googlesyndication.com https://*.ingest.sentry.io",
              "frame-src https://googleads.g.doubleclick.net https://tpc.googlesyndication.com",
              "base-uri 'self'",
              "form-action 'self'",
              "object-src 'none'",
              "upgrade-insecure-requests",
            ].join('; ') + ';',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
    ]
  },
}

// Wrap with Sentry for error tracking and performance monitoring
const sentryConfig = {
  // Sentry options
  org: process.env.SENTRY_ORG || 'vaxtim-yoxdu',
  project: process.env.SENTRY_PROJECT || 'vaxtim-yoxdu',

  // Only enable Sentry if DSN is set
  dryRun: !process.env.SENTRY_DSN,

  // Silently fail if there's an error (don't crash build)
  silent: true,

  // Define which files to instrument for tracing
  widenClientFileUpload: true,

  // Release tracking
  release: process.env.VERCEL_GIT_COMMIT_SHA || '0.0.0',
}

module.exports = withSentryConfig(
  withNextIntl(withBundleAnalyzer(nextConfig)),
  sentryConfig
)
