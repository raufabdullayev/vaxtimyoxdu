// AdSense helper - activate when approved
export const ADSENSE_CLIENT_ID = '' // ca-pub-XXXXXXX
export const AD_SLOTS = {
  headerBanner: '',
  footerBanner: '',
  sidebarTop: '',
  sidebarBottom: '',
  toolTop: '',
  toolBottom: '',
  inContent: '',
}

export function isAdsenseEnabled(): boolean {
  return !!ADSENSE_CLIENT_ID
}
