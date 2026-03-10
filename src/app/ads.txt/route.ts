import { NextResponse } from 'next/server'

// Serve ads.txt for Google AdSense publisher verification.
// Using a route handler instead of public/ to ensure reliable delivery
// across all deployment environments.
export function GET() {
  const content = 'google.com, pub-5432458375347943, DIRECT, f08c47fec0942fa0\n'

  return new NextResponse(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, stale-while-revalidate=43200',
    },
  })
}
