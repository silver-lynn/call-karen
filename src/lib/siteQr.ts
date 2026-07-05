import QRCode from 'qrcode'

export const FALLBACK_SITE_URL = 'https://call-karen.vercel.app'

export function getSiteUrl() {
  if (typeof window === 'undefined') return FALLBACK_SITE_URL
  const origin = window.location.origin
  if (origin.includes('localhost') || origin.includes('127.0.0.1')) return FALLBACK_SITE_URL
  return new URL(import.meta.env.BASE_URL || '/', origin).href.replace(/\/$/, '')
}

export async function createSiteQrDataUrl(size = 132) {
  return QRCode.toDataURL(getSiteUrl(), {
    errorCorrectionLevel: 'M',
    margin: 0,
    width: size,
    color: {
      dark: '#111111',
      light: '#ffffff',
    },
  })
}
