import { NextRequest, NextResponse } from 'next/server'
import { callAI } from '@/lib/ai/openai-client'
import { checkRateLimit } from '@/lib/ai/rate-limiter'
import { sanitizeInput } from '@/lib/ai/sanitize'

interface AIRouteConfig {
  /** System prompt for the AI model */
  systemPrompt: string | ((body: Record<string, unknown>) => string)
  /** Temperature for AI generation */
  temperature: number
  /** Maximum input characters allowed */
  maxChars: number
  /** Max tokens for AI response. Can be static or derived from body. */
  maxTokens: number | ((body: Record<string, unknown>) => number)
  /** Description used in error logging */
  taskDescription: string
}

export function withAIRoute(config: AIRouteConfig) {
  return async function POST(req: NextRequest) {
    try {
      const ip = req.headers.get('x-real-ip') || req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'anonymous'
      const { allowed, remaining, retryAfter } = await checkRateLimit(ip)

      if (!allowed) {
        const headers: Record<string, string> = { 'X-RateLimit-Remaining': '0' }
        if (retryAfter) headers['Retry-After'] = String(retryAfter)
        return NextResponse.json(
          { error: 'Rate limit exceeded. Please try again later.' },
          { status: 429, headers }
        )
      }

      let body: Record<string, unknown>
      try {
        body = await req.json()
      } catch {
        return NextResponse.json({ error: 'Invalid JSON in request body' }, { status: 400 })
      }

      const { text } = body

      if (!text || typeof text !== 'string') {
        return NextResponse.json({ error: 'Text is required' }, { status: 400 })
      }

      if (text.length > config.maxChars) {
        return NextResponse.json(
          { error: `Text too long (max ${config.maxChars} characters)` },
          { status: 400 }
        )
      }

      const sanitizedText = sanitizeInput(text)

      const systemPrompt =
        typeof config.systemPrompt === 'function'
          ? config.systemPrompt(body)
          : config.systemPrompt

      const maxTokens =
        typeof config.maxTokens === 'function'
          ? config.maxTokens(body)
          : config.maxTokens

      const result = await callAI(
        [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: sanitizedText },
        ],
        maxTokens,
        config.temperature
      )

      return NextResponse.json(
        { result },
        { headers: { 'X-RateLimit-Remaining': String(remaining) } }
      )
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Unknown error'
      console.error(`AI ${config.taskDescription} error:`, error)

      // Return user-friendly error messages instead of generic 500
      const isTimeoutError =
        errorMsg.includes('timeout') || errorMsg.includes('unavailable')

      if (isTimeoutError) {
        return NextResponse.json(
          {
            error:
              'AI service is responding slowly. Please try again in a moment.',
          },
          { status: 503 } // 503 Service Unavailable is more accurate than 500
        )
      }

      return NextResponse.json(
        { error: 'Service temporarily unavailable. Please try again later.' },
        { status: 500 }
      )
    }
  }
}
