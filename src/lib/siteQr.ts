import QRCode from 'qrcode'

export const GITHUB_PAGES_SITE_URL = 'https://silver-lynn.github.io/call-karen/'
export const FALLBACK_SITE_URL = GITHUB_PAGES_SITE_URL

export function getSiteUrl() {
  return GITHUB_PAGES_SITE_URL
}

export async function createSiteQrDataUrl(size = 104) {
  return QRCode.toDataURL(getSiteUrl(), {
    errorCorrectionLevel: 'Q',
    margin: 2,
    width: size,
    color: {
      dark: '#4c1d95',
      light: '#ffffff',
    },
  })
}
