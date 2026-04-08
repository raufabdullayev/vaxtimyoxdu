import { ImageResponse } from 'next/og'

// iOS home screen icon (180x180). iOS applies its own rounded-corner mask,
// but we still set a 36px border-radius for consistent preview in metadata/crawlers.
// Keep in sync with icon.tsx and src/components/layout/Header.tsx
export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: '#2563eb',
          borderRadius: 36,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <svg width="120" height="120" viewBox="0 0 24 24" fill="#ffffff">
          <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" />
        </svg>
      </div>
    ),
    { ...size }
  )
}
