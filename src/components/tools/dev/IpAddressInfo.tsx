'use client'

import { useState, useEffect } from 'react'

interface BrowserInfo {
  userAgent: string
  platform: string
  language: string
  languages: string[]
  cookiesEnabled: boolean
  doNotTrack: string | null
  onLine: boolean
  screenWidth: number
  screenHeight: number
  screenColorDepth: number
  windowWidth: number
  windowHeight: number
  devicePixelRatio: number
  timezone: string
  timezoneOffset: number
  connectionType: string
}

export default function IpAddressInfo() {
  const [ip, setIp] = useState<string | null>(null)
  const [browserInfo, setBrowserInfo] = useState<BrowserInfo | null>(null)
  const [loading, setLoading] = useState(true)
  const [copied, setCopied] = useState<string | null>(null)

  useEffect(() => {
    // Fetch public IP
    fetch('https://api.ipify.org?format=json')
      .then((res) => res.json())
      .then((data) => setIp(data.ip))
      .catch(() => setIp('Unable to detect'))
      .finally(() => setLoading(false))

    // Gather browser info
    const nav = navigator as Navigator & { connection?: { effectiveType?: string } }
    setBrowserInfo({
      userAgent: navigator.userAgent,
      platform: navigator.platform,
      language: navigator.language,
      languages: Array.from(navigator.languages),
      cookiesEnabled: navigator.cookieEnabled,
      doNotTrack: navigator.doNotTrack,
      onLine: navigator.onLine,
      screenWidth: screen.width,
      screenHeight: screen.height,
      screenColorDepth: screen.colorDepth,
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight,
      devicePixelRatio: window.devicePixelRatio,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      timezoneOffset: new Date().getTimezoneOffset(),
      connectionType: nav.connection?.effectiveType || 'Unknown',
    })
  }, [])

  const copyValue = async (key: string, value: string) => {
    await navigator.clipboard.writeText(value)
    setCopied(key)
    setTimeout(() => setCopied(null), 2000)
  }

  const InfoRow = ({
    label,
    value,
    copyKey,
  }: {
    label: string
    value: string
    copyKey: string
  }) => (
    <div className="flex items-center justify-between py-2.5 border-b last:border-0">
      <span className="text-sm text-muted-foreground">{label}</span>
      <div className="flex items-center gap-2">
        <span className="text-sm font-mono text-right max-w-[300px] truncate">{value}</span>
        <button
          onClick={() => copyValue(copyKey, value)}
          className="text-xs text-primary hover:underline shrink-0"
          aria-label={`Copy ${label}`}
        >
          {copied === copyKey ? 'Copied!' : 'Copy'}
        </button>
      </div>
    </div>
  )

  return (
    <div className="space-y-6">
      {/* IP Address */}
      <div className="rounded-lg border p-6 text-center">
        <p className="text-sm text-muted-foreground mb-2">Your Public IP Address</p>
        {loading ? (
          <p className="text-2xl font-mono text-muted-foreground">Loading...</p>
        ) : (
          <div className="flex items-center justify-center gap-3">
            <p className="text-3xl font-bold font-mono text-primary">{ip}</p>
            {ip && ip !== 'Unable to detect' && (
              <button
                onClick={() => copyValue('ip', ip)}
                className="px-3 py-1.5 text-xs font-medium rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                {copied === 'ip' ? 'Copied!' : 'Copy'}
              </button>
            )}
          </div>
        )}
      </div>

      {/* Browser Info */}
      {browserInfo && (
        <div className="space-y-4">
          <h3 className="text-sm font-medium">Browser & Device Information</h3>
          <div className="rounded-lg border divide-y-0 px-4">
            <InfoRow label="User Agent" value={browserInfo.userAgent} copyKey="ua" />
            <InfoRow label="Platform" value={browserInfo.platform} copyKey="platform" />
            <InfoRow label="Language" value={browserInfo.language} copyKey="lang" />
            <InfoRow
              label="All Languages"
              value={browserInfo.languages.join(', ')}
              copyKey="langs"
            />
            <InfoRow
              label="Cookies Enabled"
              value={browserInfo.cookiesEnabled ? 'Yes' : 'No'}
              copyKey="cookies"
            />
            <InfoRow
              label="Do Not Track"
              value={browserInfo.doNotTrack || 'Not set'}
              copyKey="dnt"
            />
            <InfoRow
              label="Online Status"
              value={browserInfo.onLine ? 'Online' : 'Offline'}
              copyKey="online"
            />
            <InfoRow
              label="Screen Resolution"
              value={`${browserInfo.screenWidth} x ${browserInfo.screenHeight}`}
              copyKey="screen"
            />
            <InfoRow
              label="Color Depth"
              value={`${browserInfo.screenColorDepth}-bit`}
              copyKey="color"
            />
            <InfoRow
              label="Window Size"
              value={`${browserInfo.windowWidth} x ${browserInfo.windowHeight}`}
              copyKey="window"
            />
            <InfoRow
              label="Device Pixel Ratio"
              value={`${browserInfo.devicePixelRatio}x`}
              copyKey="dpr"
            />
            <InfoRow label="Timezone" value={browserInfo.timezone} copyKey="tz" />
            <InfoRow
              label="UTC Offset"
              value={`UTC${browserInfo.timezoneOffset <= 0 ? '+' : '-'}${Math.abs(Math.floor(browserInfo.timezoneOffset / 60))}:${String(Math.abs(browserInfo.timezoneOffset % 60)).padStart(2, '0')}`}
              copyKey="utc"
            />
            <InfoRow
              label="Connection Type"
              value={browserInfo.connectionType}
              copyKey="conn"
            />
          </div>
        </div>
      )}

      <div className="p-4 rounded-lg bg-muted/50 text-sm text-muted-foreground">
        <p>
          Your IP address is fetched from a public API. All other information is collected
          directly from your browser and never sent to any server.
        </p>
      </div>
    </div>
  )
}
