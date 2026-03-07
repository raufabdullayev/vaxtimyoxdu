import { NextRequest, NextResponse } from 'next/server'
import { callAI } from '@/lib/ai/openai-client'
import { checkRateLimit } from '@/lib/ai/rate-limiter'

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
    const { allowed, remaining } = checkRateLimit(ip)

    if (!allowed) {
      return NextResponse.json(
        { error: 'Daily limit reached (20 requests/day). Try again tomorrow.' },
        { status: 429, headers: { 'X-RateLimit-Remaining': '0' } }
      )
    }

    const { text } = await req.json()

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
