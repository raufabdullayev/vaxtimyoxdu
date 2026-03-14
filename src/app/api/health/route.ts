import { NextResponse } from 'next/server'

// Read version once at module load
const APP_VERSION = process.env.npm_package_version || '1.0.0'

export async function GET() {
  return NextResponse.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    version: APP_VERSION,
  })
}
