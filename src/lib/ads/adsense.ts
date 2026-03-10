// AdSense helper
// Client ID is read from NEXT_PUBLIC_ADSENSE_ID environment variable at build time.
// Ad slots below use auto-sizing; update with specific slot IDs from AdSense dashboard
// once ads are approved and individual ad units are created.
export const ADSENSE_CLIENT_ID = process.env.NEXT_PUBLIC_ADSENSE_ID || ''

export const AD_SLOTS = {
  headerBanner: 'homepage-top',
  footerBanner: 'homepage-bottom',
  sidebarTop: 'sidebar-top',
  sidebarBottom: 'sidebar-bottom',
  toolTop: 'tool-top',
  toolBottom: 'tool-bottom',
  inContent: 'homepage-mid',
}

export function isAdsenseEnabled(): boolean {
  return !!ADSENSE_CLIENT_ID
}
