import sharp from 'sharp'
import { mkdir } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'

const source = fileURLToPath(new URL('../public/assets/committee-hero.png', import.meta.url))
const hanSource = fileURLToPath(new URL('./source/han-jinzhi-generated.png', import.meta.url))
const cropDir = new URL('../public/assets/agents/crops/', import.meta.url)
const cardDir = new URL('../public/assets/agents/cards/', import.meta.url)
const badgeDir = new URL('../public/assets/badges/', import.meta.url)

const agents = [
  { slug: 'bao-yulan', code: 'GCC-01', name: '包玉兰', title: '场面镇压官', color: '#ff9567', crop: { left: 640, top: 90, width: 370, height: 851 } },
  { slug: 'ma-dali', code: 'GCC-02', name: '马大丽', title: '证据与流程专员', color: '#67e8f9', crop: { left: 50, top: 115, width: 360, height: 826 } },
  { slug: 'wang-fengying', code: 'GCC-03', name: '王凤英', title: '利益谈判官', color: '#e5bd70', crop: { left: 350, top: 110, width: 350, height: 831 } },
  { slug: 'tong-yuzhi', code: 'GCC-04', name: '佟玉芝', title: '话术拆弹员', color: '#b89cff', crop: { left: 915, top: 110, width: 335, height: 831 } },
  { slug: 'zhao-meilan', code: 'GCC-05', name: '赵美兰', title: '止损总指挥', color: '#7dd3fc', crop: { left: 1110, top: 80, width: 375, height: 861 } },
  { slug: 'chen-yuzhen', code: 'GCC-06', name: '陈玉珍', title: '边界监察员', color: '#a7f3d0', crop: { left: 1360, top: 115, width: 312, height: 826 } },
]

const escapeXml = (value) => value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')

function cardBackdrop({ code, name, title, color, chief = false }) {
  return Buffer.from(`
  <svg width="1200" height="1600" viewBox="0 0 1200 1600" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="spot" cx="50%" cy="8%" r="76%">
        <stop offset="0%" stop-color="${chief ? '#fff2cc' : '#dff8ff'}" stop-opacity=".58"/>
        <stop offset="37%" stop-color="#1d3552" stop-opacity=".5"/>
        <stop offset="100%" stop-color="#050911" stop-opacity="1"/>
      </radialGradient>
      <linearGradient id="beam" x1="0" x2="1" y1="0" y2="1">
        <stop offset="0" stop-color="${color}" stop-opacity=".12"/>
        <stop offset=".48" stop-color="#ffffff" stop-opacity=".04"/>
        <stop offset="1" stop-color="#8b5cf6" stop-opacity=".18"/>
      </linearGradient>
      <filter id="glow">
        <feGaussianBlur stdDeviation="8" result="blur"/>
        <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
      </filter>
    </defs>
    <rect width="1200" height="1600" fill="#050911"/>
    <rect width="1200" height="1600" fill="url(#spot)"/>
    <path d="M458 0h284l238 1600H220z" fill="url(#beam)"/>
    <g opacity=".24">
      ${Array.from({ length: 18 }, (_, index) => `<line x1="${80 + index * 62}" x2="${80 + index * 62}" y1="0" y2="1600" stroke="#6de8ff" stroke-width="1" opacity=".18"/>`).join('')}
      ${Array.from({ length: 22 }, (_, index) => `<line x1="0" x2="1200" y1="${90 + index * 65}" y2="${90 + index * 65}" stroke="#ffffff" stroke-width="1" opacity=".08"/>`).join('')}
    </g>
    <ellipse cx="600" cy="1362" rx="360" ry="72" fill="none" stroke="${color}" stroke-width="4" opacity=".58" filter="url(#glow)"/>
    <ellipse cx="600" cy="1362" rx="250" ry="44" fill="none" stroke="#d8ae62" stroke-width="3" opacity=".5"/>
    <rect x="42" y="42" width="1116" height="1516" rx="40" fill="none" stroke="${chief ? '#d8ae62' : color}" stroke-width="5" opacity=".74"/>
    <rect x="68" y="68" width="1064" height="1464" rx="30" fill="none" stroke="#ffffff" stroke-width="1" opacity=".16"/>
    <text x="92" y="128" fill="#d8ae62" font-family="Arial, Noto Sans SC, sans-serif" font-size="34" font-weight="800" letter-spacing="7">${escapeXml(code)}</text>
    <text x="92" y="178" fill="#d9e7f2" font-family="Arial, Noto Sans SC, sans-serif" font-size="31" font-weight="700">${escapeXml(title)}</text>
    <text x="1108" y="128" text-anchor="end" fill="${color}" font-family="Arial, Noto Sans SC, sans-serif" font-size="22" font-weight="700" letter-spacing="4">${chief ? 'TOP SECRET' : 'AGENT CARD'}</text>
    <g opacity=".34" filter="url(#glow)">
      <circle cx="1034" cy="236" r="54" fill="none" stroke="#8b5cf6" stroke-width="3"/>
      <circle cx="1034" cy="236" r="18" fill="${color}" opacity=".46"/>
      <path d="M982 236h104M1034 184v104" stroke="#67e8f9" stroke-width="2"/>
    </g>
    <rect x="84" y="1378" width="1032" height="150" rx="26" fill="#04080f" opacity=".72"/>
    <text x="600" y="1452" text-anchor="middle" fill="#fff8e6" font-family="Arial, Noto Sans SC, sans-serif" font-size="58" font-weight="900" letter-spacing="6">${escapeXml(name)}</text>
    <text x="600" y="1500" text-anchor="middle" fill="${color}" font-family="Arial, Noto Sans SC, sans-serif" font-size="25" font-weight="800" letter-spacing="5">${chief ? 'GALACTIC CHIEF INSTRUCTOR' : 'GALACTIC COMMITTEE SPECIAL AGENT'}</text>
  </svg>`)
}

function cardOverlay(color) {
  return Buffer.from(`
  <svg width="1200" height="1600" viewBox="0 0 1200 1600" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="shade" x1="0" x2="0" y1="0" y2="1">
        <stop offset="0" stop-color="#050911" stop-opacity=".04"/>
        <stop offset=".62" stop-color="#050911" stop-opacity=".05"/>
        <stop offset=".88" stop-color="#050911" stop-opacity=".74"/>
        <stop offset="1" stop-color="#050911" stop-opacity=".96"/>
      </linearGradient>
      <pattern id="scan" width="12" height="12" patternUnits="userSpaceOnUse">
        <rect width="12" height="1" fill="#ffffff" opacity=".075"/>
      </pattern>
      <filter id="glow"><feGaussianBlur stdDeviation="7" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
    </defs>
    <rect width="1200" height="1600" fill="url(#shade)"/>
    <rect width="1200" height="1600" fill="url(#scan)"/>
    <path d="M90 1310C232 1244 338 1222 516 1222c218 0 351 52 588 4" fill="none" stroke="${color}" stroke-width="4" opacity=".42" filter="url(#glow)"/>
    <text x="600" y="103" text-anchor="middle" fill="#ffffff" font-family="Arial, Noto Sans SC, sans-serif" font-size="16" font-weight="700" letter-spacing="8" opacity=".42">GALACTIC BACKBONE COMMITTEE</text>
  </svg>`)
}

function badgeSvg() {
  return Buffer.from(`
  <svg width="900" height="900" viewBox="0 0 900 900" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="metal" cx="35%" cy="24%" r="78%">
        <stop offset="0%" stop-color="#fff0b7"/>
        <stop offset="36%" stop-color="#d8ae62"/>
        <stop offset="70%" stop-color="#79551e"/>
        <stop offset="100%" stop-color="#2b1c0b"/>
      </radialGradient>
      <radialGradient id="core" cx="50%" cy="42%" r="60%">
        <stop offset="0%" stop-color="#17263b"/>
        <stop offset="60%" stop-color="#070d16"/>
        <stop offset="100%" stop-color="#02050a"/>
      </radialGradient>
      <filter id="glow"><feGaussianBlur stdDeviation="12" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
    </defs>
    <rect width="900" height="900" fill="none"/>
    <circle cx="450" cy="450" r="374" fill="none" stroke="#67e8f9" stroke-width="5" opacity=".32" filter="url(#glow)"/>
    <circle cx="450" cy="450" r="320" fill="url(#metal)" stroke="#ffe5a0" stroke-width="12"/>
    <circle cx="450" cy="450" r="246" fill="url(#core)" stroke="#d8ae62" stroke-width="8"/>
    <path d="M450 150l52 132 142-8-112 88 52 134-134-76-134 76 52-134-112-88 142 8z" fill="#d8ae62" opacity=".3"/>
    <path d="M266 450a184 184 0 1 0 368 0a184 184 0 1 0 -368 0" fill="none" stroke="#8b5cf6" stroke-width="3" opacity=".62"/>
    <path d="M248 450h404M450 248v404" stroke="#67e8f9" stroke-width="3" opacity=".24"/>
    <text x="450" y="416" text-anchor="middle" fill="#fff7df" font-family="Arial, Noto Sans SC, sans-serif" font-size="98" font-weight="900" letter-spacing="10">KAREN</text>
    <text x="450" y="494" text-anchor="middle" fill="#67e8f9" font-family="Arial, Noto Sans SC, sans-serif" font-size="30" font-weight="800" letter-spacing="8">CANDIDATE</text>
    <text x="450" y="560" text-anchor="middle" fill="#d8ae62" font-family="Arial, Noto Sans SC, sans-serif" font-size="24" font-weight="800" letter-spacing="7">EARTH DIVISION</text>
    <circle cx="450" cy="450" r="344" fill="none" stroke="#fff2c6" stroke-width="2" opacity=".45"/>
    <circle cx="450" cy="450" r="286" fill="none" stroke="#2ff2ff" stroke-width="2" opacity=".28"/>
  </svg>`)
}

await mkdir(cropDir, { recursive: true })
await mkdir(cardDir, { recursive: true })
await mkdir(badgeDir, { recursive: true })

for (const agent of agents) {
  const cropPath = fileURLToPath(new URL(`${agent.slug}-crop.webp`, cropDir))
  const cardPath = fileURLToPath(new URL(`${agent.slug}-card.webp`, cardDir))
  const legacyPath = fileURLToPath(new URL(`../public/assets/agents/${agent.slug}.webp`, import.meta.url))

  await sharp(source)
    .extract(agent.crop)
    .resize({ width: 700, height: 1000, fit: 'cover', position: 'north' })
    .webp({ quality: 90 })
    .toFile(cropPath)

  await sharp(cropPath).clone().toFile(legacyPath)

  const characterLayer = await sharp(cropPath)
    .resize({ width: 930, height: 1280, fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer()

  await sharp(cardBackdrop(agent))
    .composite([
      { input: characterLayer, left: 135, top: 220 },
      { input: cardOverlay(agent.color), left: 0, top: 0 },
    ])
    .webp({ quality: 92 })
    .toFile(cardPath)

  console.log(`generated ${agent.slug}`)
}

const hanCropPath = fileURLToPath(new URL('han-jinzhi-crop.webp', cropDir))
const hanCardPath = fileURLToPath(new URL('han-jinzhi-card.webp', cardDir))

await sharp(hanSource)
  .resize({ width: 760, height: 1000, fit: 'cover', position: 'top' })
  .webp({ quality: 92 })
  .toFile(hanCropPath)

const hanLayer = await sharp(hanSource)
  .resize({ width: 980, height: 1320, fit: 'cover', position: 'top' })
  .png()
  .toBuffer()

await sharp(cardBackdrop({ code: 'GCC-00', name: '韩金枝', title: '总教官', color: '#d8ae62', chief: true }))
  .composite([
    { input: hanLayer, left: 110, top: 210 },
    { input: cardOverlay('#d8ae62'), left: 0, top: 0 },
  ])
  .webp({ quality: 92 })
  .toFile(hanCardPath)

await sharp(badgeSvg()).webp({ quality: 96 }).toFile(fileURLToPath(new URL('candidate-karen-badge.webp', badgeDir)))

console.log('generated han-jinzhi and candidate badge')
