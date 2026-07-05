import { assetPath } from '../lib/assets'

const BADGE_IMAGE = assetPath('assets/badges/candidate-karen-badge.webp')

function loadImage(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image()
    image.onload = () => resolve(image)
    image.onerror = reject
    image.src = src
  })
}

function drawRoundedRect(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, radius: number) {
  ctx.beginPath()
  ctx.moveTo(x + radius, y)
  ctx.arcTo(x + width, y, x + width, y + height, radius)
  ctx.arcTo(x + width, y + height, x, y + height, radius)
  ctx.arcTo(x, y + height, x, y, radius)
  ctx.arcTo(x, y, x + width, y, radius)
  ctx.closePath()
}

function drawBadgeFallback(ctx: CanvasRenderingContext2D, x: number, y: number, size: number) {
  const cx = x + size / 2
  const cy = y + size / 2
  const gradient = ctx.createRadialGradient(cx - 120, cy - 140, 40, cx, cy, size / 2)
  gradient.addColorStop(0, '#fff1b8')
  gradient.addColorStop(.42, '#d8ae62')
  gradient.addColorStop(1, '#2b1c0b')
  ctx.fillStyle = gradient
  ctx.beginPath()
  ctx.arc(cx, cy, size * .44, 0, Math.PI * 2)
  ctx.fill()
  ctx.strokeStyle = '#fff0b1'
  ctx.lineWidth = 10
  ctx.stroke()
  ctx.fillStyle = '#07111d'
  ctx.beginPath()
  ctx.arc(cx, cy, size * .31, 0, Math.PI * 2)
  ctx.fill()
  ctx.fillStyle = '#fff7df'
  ctx.font = '900 76px Arial, sans-serif'
  ctx.textAlign = 'center'
  ctx.fillText('KAREN', cx, cy - 8)
  ctx.fillStyle = '#67e8f9'
  ctx.font = '800 25px Arial, sans-serif'
  ctx.fillText('CANDIDATE', cx, cy + 52)
}

export async function renderCandidateBadgePoster(mbti: string) {
  await document.fonts?.ready
  const canvas = document.createElement('canvas')
  canvas.width = 1200
  canvas.height = 1500
  const ctx = canvas.getContext('2d')!

  const bg = ctx.createRadialGradient(600, 180, 20, 600, 600, 950)
  bg.addColorStop(0, '#213a5b')
  bg.addColorStop(.32, '#081521')
  bg.addColorStop(1, '#03070d')
  ctx.fillStyle = bg
  ctx.fillRect(0, 0, 1200, 1500)

  ctx.fillStyle = 'rgba(103,232,249,.45)'
  for (let i = 0; i < 120; i++) {
    const x = (i * 149) % 1140 + 30
    const y = (i * 211) % 1320 + 40
    ctx.globalAlpha = .12 + ((i % 5) * .035)
    ctx.fillRect(x, y, i % 3 === 0 ? 3 : 2, i % 4 === 0 ? 3 : 2)
  }
  ctx.globalAlpha = 1

  const beam = ctx.createLinearGradient(0, 0, 1200, 1500)
  beam.addColorStop(0, 'rgba(216,174,98,.18)')
  beam.addColorStop(.5, 'rgba(255,255,255,.04)')
  beam.addColorStop(1, 'rgba(139,92,246,.2)')
  ctx.fillStyle = beam
  ctx.beginPath()
  ctx.moveTo(455, 0)
  ctx.lineTo(745, 0)
  ctx.lineTo(1010, 1500)
  ctx.lineTo(190, 1500)
  ctx.closePath()
  ctx.fill()

  drawRoundedRect(ctx, 62, 62, 1076, 1376, 34)
  ctx.strokeStyle = '#d8ae62'
  ctx.lineWidth = 5
  ctx.stroke()
  drawRoundedRect(ctx, 88, 88, 1024, 1324, 26)
  ctx.strokeStyle = 'rgba(103,232,249,.28)'
  ctx.lineWidth = 2
  ctx.stroke()

  ctx.textAlign = 'center'
  ctx.fillStyle = '#d8ae62'
  ctx.font = '800 42px "Noto Sans SC", Arial, sans-serif'
  ctx.fillText('银河系争气委员会', 600, 148)
  ctx.fillStyle = '#fff7df'
  ctx.font = '900 78px "Noto Sans SC", Arial, sans-serif'
  ctx.fillText('候补 Karen 徽章', 600, 238)

  try {
    const badge = await loadImage(BADGE_IMAGE)
    ctx.shadowColor = 'rgba(103,232,249,.44)'
    ctx.shadowBlur = 46
    ctx.drawImage(badge, 287, 306, 626, 626)
    ctx.shadowBlur = 0
  } catch {
    drawBadgeFallback(ctx, 287, 306, 626)
  }

  ctx.fillStyle = '#ffffff'
  ctx.font = '900 72px "Noto Sans SC", Arial, sans-serif'
  ctx.fillText(`${mbti} 里最争气的`, 600, 1012)

  ctx.fillStyle = '#b7c7d4'
  ctx.font = '600 33px "Noto Sans SC", Arial, sans-serif'
  const body = ['你的窝囊值为 0%。', '委员会确认：你暂不需要救助。', '现向你发出候补 Karen 邀请。']
  body.forEach((line, index) => ctx.fillText(line, 600, 1082 + index * 46))

  drawRoundedRect(ctx, 250, 1234, 700, 118, 22)
  ctx.fillStyle = 'rgba(4,9,15,.72)'
  ctx.fill()
  ctx.strokeStyle = 'rgba(216,174,98,.55)'
  ctx.lineWidth = 2
  ctx.stroke()
  ctx.fillStyle = '#d8ae62'
  ctx.font = '800 27px "Noto Sans SC", Arial, sans-serif'
  ctx.fillText('地球分部签发', 600, 1282)
  ctx.fillStyle = '#fff7df'
  ctx.font = '900 35px "Noto Sans SC", Arial, sans-serif'
  ctx.fillText('总教官 韩金枝', 600, 1327)

  ctx.fillStyle = '#7f94a7'
  ctx.font = '700 24px "Noto Sans SC", Arial, sans-serif'
  ctx.fillText('总教官已注意到你。', 600, 1396)
  ctx.fillStyle = 'rgba(216,174,98,.72)'
  ctx.font = '700 19px Arial, sans-serif'
  ctx.fillText('KEEP YOUR BACKBONE · DO NOT OVER-EXPLAIN', 600, 1428)

  return canvas.toDataURL('image/png')
}

export async function downloadCandidateBadgePoster(mbti: string) {
  const dataUrl = await renderCandidateBadgePoster(mbti)
  const blob = await (await fetch(dataUrl)).blob()
  const objectUrl = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href = objectUrl
  anchor.download = `候补-Karen-徽章-${mbti}.png`
  anchor.style.display = 'none'
  document.body.appendChild(anchor)
  anchor.click()
  anchor.remove()
  window.setTimeout(() => URL.revokeObjectURL(objectUrl), 1000)
}

export function CandidateBadgePoster({ mbti, onDownload, onClose }: { mbti: string; onDownload: () => void; onClose: () => void }) {
  return <div className="poster-modal-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
    <section className="poster-modal" role="dialog" aria-modal="true" aria-label="候补 Karen 徽章海报">
      <button className="modal-close" onClick={onClose}>关闭 ×</button>
      <div className="poster-root">
        <div className="poster-brand">银河系争气委员会</div>
        <div className="poster-title">候补 Karen 徽章</div>
        <div className="poster-badge-area"><img src={BADGE_IMAGE} alt="候补 Karen 徽章" /></div>
        <div className="poster-dynamic-line">{mbti} 里最争气的</div>
        <div className="poster-copy">
          <p>你的窝囊值为 0%。</p>
          <p>委员会确认：你暂不需要救助。</p>
          <p>现向你发出候补 Karen 邀请。</p>
        </div>
        <div className="poster-signature"><p>地球分部签发</p><p>总教官 韩金枝</p></div>
        <div className="poster-footer">总教官已注意到你。</div>
      </div>
      <div className="option-list poster-actions">
        <button className="option-button gold-option" onClick={onDownload}>下载高清徽章海报</button>
        <button className="option-button" onClick={onClose}>返回结果</button>
      </div>
    </section>
  </div>
}
