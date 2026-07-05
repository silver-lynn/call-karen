import { useEffect, useState } from 'react'
import { createSiteQrDataUrl } from '../lib/siteQr'

type StyledSiteQRCodeProps = {
  className?: string
  size?: number
  caption?: string
}

export function StyledSiteQRCode({ className = '', size = 132, caption = '扫码检测你的窝囊值' }: StyledSiteQRCodeProps) {
  const [dataUrl, setDataUrl] = useState('')

  useEffect(() => {
    let alive = true
    createSiteQrDataUrl(size).then((url) => { if (alive) setDataUrl(url) }).catch(() => { if (alive) setDataUrl('') })
    return () => { alive = false }
  }, [size])

  return <div className={`site-qr-card ${className}`}>
    <div className="site-qr-title">地球分部通行码</div>
    <div className="site-qr-inner">
      {dataUrl ? <img src={dataUrl} width={size} height={size} alt="扫码打开 KAREN 检测站" /> : <span>QR</span>}
    </div>
    <div className="site-qr-caption">{caption}</div>
  </div>
}
