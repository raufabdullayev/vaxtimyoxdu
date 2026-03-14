import * as Sentry from "@sentry/nextjs";

export function initSentryClient() {
  if (Sentry.isInitialized()) return;

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

    // Integration settings — Replay is lazy-loaded to avoid ~100KB upfront cost
    integrations: [
      Sentry.breadcrumbsIntegration({
        console: true,
        dom: true,
        fetch: true,
        history: true,
        http: true,
        xhr: true,
      }),
    ],

    // Session replay — sample 10% of sessions to reduce storage costs
    replaysSessionSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,

    // Capture replay for errors — 100%
    replaysOnErrorSampleRate: 1.0,
  });

  // Lazy-load Replay integration to keep initial bundle small
  Sentry.lazyLoadIntegration('replayIntegration').then((replay) => {
    Sentry.addIntegration(replay({
      maskAllText: true,
      blockAllMedia: true,
      maskAllInputs: true,
    }));
  });
}
