import { ImageResponse } from 'next/og'

// Brand favicon: bold "V" for "Vaxtım Yoxdu" rendered via Satori built-in font
// Note: Satori/ImageResponse does NOT bundle emoji fonts — only plain text characters work
// Background #E68A00 = warm amber = globals.css --primary variable in light mode
// Keep in sync with apple-icon.tsx
export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: '#E68A00',
          borderRadius: 6,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div style={{
          fontSize: 24,
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
