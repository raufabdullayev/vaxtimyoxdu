import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseServer } from '@/lib/supabase/client'
import { createRateLimiter } from '@/lib/rate-limiter'
import { verifyUnsubscribeToken } from '@/lib/newsletter/token'

const checkRateLimit = createRateLimiter({
  limit: 10,
  window: '1 h',
  prefix: 'rl:unsubscribe',
})

export async function GET(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
  const { allowed } = await checkRateLimit(ip)

  if (!allowed) {
    return new NextResponse(renderHtml('error', 'Too many requests. Please try again later.'), {
      status: 429,
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
    })
  }

  const token = req.nextUrl.searchParams.get('token')

  if (!token) {
    return new NextResponse(renderHtml('error', 'Invalid unsubscribe link.'), {
      status: 400,
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
    })
  }

  const email = verifyUnsubscribeToken(token)

  if (!email) {
    return new NextResponse(renderHtml('error', 'Invalid or expired unsubscribe link.'), {
      status: 400,
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
    })
  }

  const supabase = getSupabaseServer()

  if (supabase) {
    const { error } = await supabase
      .from('newsletter_subscribers')
      .delete()
      .eq('email', email.toLowerCase())

    if (error) {
      console.error('[Newsletter] Unsubscribe error:', error.message)
      return new NextResponse(
        renderHtml('error', 'Something went wrong. Please try again later.'),
        { status: 500, headers: { 'Content-Type': 'text/html; charset=utf-8' } }
      )
    }
  }

  console.log(`[Newsletter] Unsubscribed: ${email}`)

  return new NextResponse(
    renderHtml('success', 'You have been successfully unsubscribed.'),
    { status: 200, headers: { 'Content-Type': 'text/html; charset=utf-8' } }
  )
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function renderHtml(type: 'success' | 'error', message: string): string {
  const color = type === 'success' ? '#22c55e' : '#ef4444'
  const title = type === 'success' ? 'Unsubscribed' : 'Error'
  const safeMessage = escapeHtml(message)

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} - Vaxtim Yoxdu</title>
</head>
<body style="margin:0;padding:0;min-height:100vh;display:flex;align-items:center;justify-content:center;background-color:#f4f4f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <div style="text-align:center;padding:32px;max-width:400px;">
    <h1 style="color:${color};font-size:24px;margin:0 0 16px;">${title}</h1>
    <p style="color:#3f3f46;font-size:16px;line-height:1.6;margin:0 0 24px;">${safeMessage}</p>
    <a href="https://vaxtimyoxdu.com" style="color:#6366f1;text-decoration:none;font-size:14px;">vaxtimyoxdu.com</a>
  </div>
</body>
</html>`
}
