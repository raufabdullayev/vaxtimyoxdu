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

    const { text, length } = await req.json()

    if (!text || typeof text !== 'string') {
      return NextResponse.json({ error: 'Text is required' }, { status: 400 })
    }

    if (text.length > 10000) {
      return NextResponse.json({ error: 'Text too long (max 10000 characters)' }, { status: 400 })
    }

    const lengthInstructions: Record<string, string> = {
      short: 'Provide a very brief summary in 1-2 sentences.',
      medium: 'Provide a concise summary in 3-5 sentences.',
      long: 'Provide a detailed summary with key points in bullet format.',
    }

    const instruction = lengthInstructions[length] || lengthInstructions.medium

    const result = await callAI(
      [
        {
          role: 'system',
          content: `You are a professional text summarizer. ${instruction} Only output the summary, nothing else.`,
        },
        { role: 'user', content: text },
      ],
      length === 'long' ? 1024 : 512
    )

    return NextResponse.json(
      { result },
      { headers: { 'X-RateLimit-Remaining': String(remaining) } }
    )
  } catch (error) {
    console.error('AI Summarize error:', error)
    return NextResponse.json(
      { error: 'Service temporarily unavailable. Please try again later.' },
      { status: 500 }
    )
  }
}
