import { NextRequest, NextResponse } from 'next/server'
import { callAI } from '@/lib/ai/openai-client'
import { checkRateLimit } from '@/lib/ai/rate-limiter'

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
    const { allowed, remaining, retryAfter } = await checkRateLimit(ip)

    if (!allowed) {
      const headers: Record<string, string> = { 'X-RateLimit-Remaining': '0' }
      if (retryAfter) headers['Retry-After'] = String(retryAfter)
      return NextResponse.json(
        { error: 'Rate limit exceeded. Please try again later.' },
        { status: 429, headers }
      )
    }

    let body
    try {
      body = await req.json()
    } catch {
      return NextResponse.json({ error: 'Invalid JSON in request body' }, { status: 400 })
    }

    const { text } = body

    if (!text || typeof text !== 'string') {
      return NextResponse.json({ error: 'Text is required' }, { status: 400 })
    }

    if (text.length > 5000) {
      return NextResponse.json({ error: 'Text too long (max 5000 characters)' }, { status: 400 })
    }

    const result = await callAI([
      {
        role: 'system',
        content:
          'You are a professional grammar checker. Fix all grammar, spelling, and punctuation errors in the text. Only output the corrected text, nothing else. If the text is already correct, return it unchanged.',
      },
      { role: 'user', content: text },
    ])

    return NextResponse.json(
      { result },
      { headers: { 'X-RateLimit-Remaining': String(remaining) } }
    )
  } catch (error) {
    console.error('AI Grammar error:', error)
    return NextResponse.json(
      { error: 'Service temporarily unavailable. Please try again later.' },
      { status: 500 }
    )
  }
}
