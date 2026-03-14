import * as Sentry from "@sentry/nextjs";

export function initSentryServer() {
  Sentry.init({
    dsn: process.env.SENTRY_DSN,

    // Environment
    environment: process.env.NODE_ENV,

    // Performance monitoring — sample 10% of transactions
    tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,

    // Error sample rate — always capture server errors (100%)
    sampleRate: 1.0,

    // Enable debug mode in development
    debug: process.env.NODE_ENV === 'development',

    // Capture stack traces for all messages
    attachStacktrace: true,

    // Server-specific integrations
    integrations: [
      Sentry.httpIntegration({
        tracing: true,
        breadcrumbs: true,
      }),
      Sentry.onUncaughtExceptionIntegration(),
      Sentry.onUnhandledRejectionIntegration(),
    ],

    // Allowlist for endpoints we want to capture (reduce noise from health checks)
    allowUrls: [
      /^https:\/\/vaxtimyoxdu\.com\//,
      /localhost/,
    ],
  });
}
