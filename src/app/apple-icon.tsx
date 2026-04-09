import { ImageResponse } from 'next/og'

// iOS home screen icon (180x180). iOS applies its own rounded-corner mask,
// but we still set a 36px border-radius for consistent preview in metadata/crawlers.
// Note: Satori/ImageResponse does NOT bundle emoji fonts — only plain text characters work
// Keep in sync with icon.tsx
export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: '#E68A00',
          borderRadius: 36,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div style={{
          fontSize: 120,
          fontWeight: 700,
          color: '#ffffff',
          letterSpacing: '-0.02em'
        }}>
          V
        </div>
      </div>
    ),
    { ...size }
  )
}
