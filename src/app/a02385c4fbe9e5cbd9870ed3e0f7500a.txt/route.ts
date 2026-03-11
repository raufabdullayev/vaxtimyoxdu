import { NextResponse } from 'next/server'

// Serve the IndexNow API key verification file.
// IndexNow requires a text file at /{key}.txt containing the key itself
// to prove domain ownership. Using a route handler (like ads.txt) to
// ensure reliable delivery across all deployment environments.
export function GET() {
  const key = process.env.INDEXNOW_API_KEY || 'a02385c4fbe9e5cbd9870ed3e0f7500a'

  return new NextResponse(key + '\n', {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, stale-while-revalidate=43200',
    },
  })
}
