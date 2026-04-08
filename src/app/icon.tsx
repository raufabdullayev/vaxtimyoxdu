import { ImageResponse } from 'next/og'

// Brand favicon: lucide-react Zap icon (matches Header symbol next to "Vaxtım Yoxdu" text)
// Background #2563eb = Tailwind blue-600 = globals.css --primary variable in light mode
// Keep in sync with apple-icon.tsx and src/components/layout/Header.tsx
export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: '#2563eb',
          borderRadius: 6,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="#ffffff">
          <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" />
        </svg>
      </div>
    ),
    { ...size }
  )
}
