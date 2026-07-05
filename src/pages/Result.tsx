import { useMemo, useState } from 'react'
import { AgentCard } from '../components/AgentCard'
import { CandidateBadgePoster, downloadCandidateBadgePoster } from '../components/CandidateBadgePoster'
import { CreatorLinks } from '../components/CreatorLinks'
import { RehabPrescriptionCard } from '../components/RehabPrescriptionCard'
import { StyledSiteQRCode } from '../components/StyledSiteQRCode'
import { SummonStage } from '../components/SummonStage'
import { TextModal } from '../components/TextModal'
import { WonangScoreBadge } from '../components/WonangScoreBadge'
import { generateKarenPrompt } from '../data/promptGenerator'
import { buildRxNumber, formatRehabPrescription, selectRehabPrescription } from '../data/rehabPrescriptions'
import { generateSoul } from '../data/soulGenerator'
import type { Character, Dimension, ResultTier } from '../types'

async function copyText(text: string) {
  try { await navigator.clipboard.writeText(text) } catch {
    const textarea = document.createElement('textarea'); textarea.value = text; textarea.style.cssText = 'position:fixed;opacity:0'; document.body.appendChild(textarea); textarea.select(); document.execCommand('copy'); textarea.remove()
  }
}

export function Result({ userName, mbti, score, tier, agents, weaknesses, dimensionScores, onAgents, onRestart }: { userName: string; mbti: string; score: number; tier: ResultTier; agents: Character[]; weaknesses: string; dimensionScores: Record<Dimension, number>; onAgents: () => void; onRestart: () => void }) {
  const [modal, setModal] = useState<'prompt' | 'soul' | 'poster' | null>(null)
  const [toast, setToast] = useState('')
  const { topDimensionLabel, prescription } = useMemo(() => selectRehabPrescription(score, dimensionScores), [score, dimensionScores])
  const rxNumber = useMemo(() => buildRxNumber(mbti, score, agents), [mbti, score, agents])
  const prompt = generateKarenPrompt(userName, score, weaknesses, agents, tier.id === 'candidate', prescription)
  const soul = generateSoul(userName, mbti, score, weaknesses, agents, tier.id === 'candidate', prescription)
  const rehabText = formatRehabPrescription({ userName, score, rxNumber, topDimensionLabel, prescription })
  const notify = (message: string) => { setToast(message); window.setTimeout(() => setToast(''), 2400) }
  const downloadSoul = () => { const url = URL.createObjectURL(new Blob([soul], { type: 'text/markdown;charset=utf-8' })); const a = document.createElement('a'); a.href = url; a.download = `KAREN-SOUL-${userName}-${mbti}.md`; a.click(); URL.revokeObjectURL(url); notify('Agent Soul 已导出') }
  const downloadBadge = async () => { await downloadCandidateBadgePoster(userName, mbti); notify('候补 Karen 徽章海报已生成') }

  return <section className="result-page content-container">
    <span className="micro-label">GALACTIC COMMITTEE · DETECTION REPORT</span>
    <h1>银河系争气委员会检测结果</h1>
    <div className="result-hero-share">
      <div className="result-hero-copy">
        <WonangScoreBadge userName={userName} score={score} subtitle={tier.title} />
        <div className="tier-copy"><span>{tier.id.toUpperCase()} · MBTI / {mbti}</span><h2>{tier.title}</h2>{tier.copy.map((line) => <p key={line}>{line}</p>)}</div>
      </div>
      <div className="result-hero-visual">
        <SummonStage agents={agents} tier={tier} />
        <StyledSiteQRCode className="result-qr-card" size={126} />
      </div>
    </div>
    {tier.id === 'candidate'
      ? <div className="candidate-offer">
        <span>GALACTIC COMMITTEE OFFER</span>
        <h3>候补 Karen<br />地球守护席位</h3>
        <p>地球分部 · 试用期特派员</p>
        <b>总教官韩金枝已注意到你。</b>
      </div>
      : <div className="deployed-section"><span className="micro-label">DEPLOYED AGENTS / {agents.length}</span><h2>已召唤角色档案</h2><div className="result-agent-list">{agents.map((agent, index) => <AgentCard key={agent.id} agent={agent} index={index} />)}</div></div>}
    <RehabPrescriptionCard prescription={prescription} rxNumber={rxNumber} agents={agents} />
    <div className="export-help-card">
      <span className="micro-label">EXPORT KIT</span>
      <h2>把这次检测结果带走</h2>
      <p><b>复制 Karen 提示词</b>：粘贴给 ChatGPT / 其他 AI 后，它会按本次特派员和处方风格帮你处理现实场景。</p>
      <p><b>导出 Agent Soul</b>：下载一份 Markdown 人设档案，适合长期保存，之后创建自定义助手或角色设定时直接使用。</p>
    </div>
    <div className="result-actions option-list">
      {tier.id === 'candidate' && <button className="option-button gold-option" onClick={() => setModal('poster')}>领取 Karen 徽章</button>}
      <button className="option-button primary-option" onClick={() => setModal('prompt')}>复制我的 Karen 提示词</button>
      <button className="option-button" onClick={() => setModal('soul')}>导出 Agent Soul</button>
      <button className="option-button" onClick={async () => { await copyText(rehabText); notify('康复处方已复制。请按量服用，不要擅自加班内耗。') }}>复制我的康复处方</button>
      <button className="option-button" onClick={onAgents}>查看特派员档案</button>
      <button className="option-button subtle-option" onClick={onRestart}>重新检测</button>
    </div>
    <CreatorLinks compact />
    {modal === 'poster' && <CandidateBadgePoster userName={userName} mbti={mbti} onDownload={downloadBadge} onClose={() => setModal(null)} />}
    {modal === 'prompt' && <TextModal title="我的 Karen 提示词" text={prompt} actionLabel="复制提示词" onAction={async () => { await copyText(prompt); notify('提示词已复制'); setModal(null) }} onClose={() => setModal(null)} />}
    {modal === 'soul' && <TextModal title="Agent Soul" text={soul} actionLabel="导出 .md 文件" onAction={() => { downloadSoul(); setModal(null) }} onClose={() => setModal(null)} />}
    {toast && <div className="toast">✓ {toast}</div>}
  </section>
}
