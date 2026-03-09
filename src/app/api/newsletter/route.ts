import { NextRequest, NextResponse } from 'next/server'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// In-memory store for newsletter emails (will be replaced with Supabase later)
// In production, this resets on each cold start, so it's for deduplication within a session only
const subscribedEmails = new Set<string>()

export async function POST(req: NextRequest) {
  try {
    let body
    try {
      body = await req.json()
    } catch {
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
    }

    const { email } = body

    if (!email || typeof email !== 'string') {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }

    const trimmed = email.trim().toLowerCase()

    if (!EMAIL_REGEX.test(trimmed)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 })
    }

    // Check if already subscribed in this session
    if (subscribedEmails.has(trimmed)) {
      return NextResponse.json({ error: 'Already subscribed' }, { status: 409 })
    }

    subscribedEmails.add(trimmed)

    // Log for now (will be replaced with Supabase insert later)
    console.log(`[Newsletter] New subscriber: ${trimmed}`)

    return NextResponse.json({ success: true, message: 'Successfully subscribed' })
  } catch (error) {
    console.error('Newsletter error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
