import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

  // Environment
  environment: process.env.NODE_ENV,

  // Performance monitoring — sample 10% of transactions (performance traces)
  tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,

  // Error sample rate — always capture errors (100%)
  sampleRate: 1.0,

  // Enable debug mode in development
  debug: process.env.NODE_ENV === 'development',

  // Capture unhandled promise rejections
  attachStacktrace: true,

  // Denylist for URLs we don't want to capture (reduce noise)
  denyUrls: [
    // Browser extensions
    /extensions\//i,
    /^chrome:\/\//i,
    // Third-party scripts we don't control
    /graph\.facebook\.com/i,
    /connect\.facebook\.net/i,
  ],

  // Session replay disabled — saves ~70-100KB client JS, not useful at current traffic
  replaysSessionSampleRate: 0,

  // Replay on error disabled — not enough traffic to justify bundle cost
  replaysOnErrorSampleRate: 0,
});
