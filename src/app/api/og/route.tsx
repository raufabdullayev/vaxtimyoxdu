import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'

export const runtime = 'edge'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const title = searchParams.get('title') || 'Vaxtim Yoxdu'
  const subtitle =
    searchParams.get('subtitle') || 'Qısa xəbərlər və pulsuz onlayn alətlər'
  const type = searchParams.get('type') || 'default' // default, tool, blog, news

  // Choose colors based on type
  const gradients: Record<string, [string, string]> = {
    default: ['#3b82f6', '#1d4ed8'],
    tool: ['#8b5cf6', '#6d28d9'],
    blog: ['#10b981', '#059669'],
    news: ['#f59e0b', '#d97706'],
  }
  const [color1, color2] = gradients[type] || gradients.default

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: `linear-gradient(135deg, ${color1} 0%, ${color2} 100%)`,
          fontFamily: 'Inter, system-ui, sans-serif',
        }}
      >
        {/* Logo/brand area */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '20px',
          }}
        >
          <div
            style={{
              width: '60px',
              height: '60px',
              background: 'rgba(255,255,255,0.2)',
              borderRadius: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '32px',
              fontWeight: 'bold',
              color: 'white',
            }}
          >
            V
          </div>
        </div>
        {/* Title */}
        <div
          style={{
            fontSize: title.length > 40 ? '42px' : '52px',
            fontWeight: 'bold',
            color: 'white',
            textAlign: 'center',
            maxWidth: '900px',
            lineHeight: 1.2,
            padding: '0 40px',
          }}
        >
          {title}
        </div>
        {/* Subtitle */}
        <div
          style={{
            fontSize: '24px',
            color: 'rgba(255,255,255,0.8)',
            textAlign: 'center',
            maxWidth: '700px',
            marginTop: '16px',
            padding: '0 40px',
          }}
        >
          {subtitle}
        </div>
        {/* Footer */}
        <div
          style={{
            position: 'absolute',
            bottom: '30px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            color: 'rgba(255,255,255,0.6)',
            fontSize: '18px',
          }}
        >
          vaxtimyoxdu.com
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}
