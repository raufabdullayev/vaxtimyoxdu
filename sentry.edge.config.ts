import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.SENTRY_DSN,

  // Environment
  environment: process.env.NODE_ENV,

  // Performance monitoring — sample 10% of edge function calls
  tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,

  // Error sample rate — capture all edge errors
  sampleRate: 1.0,

  // Enable debug mode in development
  debug: process.env.NODE_ENV === 'development',

  // Capture stack traces
  attachStacktrace: true,
});
