import { useMemo, useState } from 'react'
import { AgentCard } from '../components/AgentCard'
import { CandidateBadgePoster, downloadCandidateBadgePoster } from '../components/CandidateBadgePoster'
import { CreatorLinks } from '../components/CreatorLinks'
import { RehabPrescriptionCard } from '../components/RehabPrescriptionCard'
import { StyledSiteQRCode } from '../components/StyledSiteQRCode'
import { SummonStage } from '../components/SummonStage'
import { TextModal } from '../components/TextModal'
import { chiefInstructor } from '../data/characters'
import { generateKarenPrompt } from '../data/promptGenerator'
import { buildRxNumber, formatRehabPrescription, selectRehabPrescription } from '../data/rehabPrescriptions'
import { generateSoul } from '../data/soulGenerator'
import type { Character, Dimension, ResultTier } from '../types'

async function copyText(text: string) {
  try { await navigator.clipboard.writeText(text) } catch {
    const textarea = document.createElement('textarea'); textarea.value = text; textarea.style.cssText = 'position:fixed;opacity:0'; document.body.appendChild(textarea); textarea.select(); document.execCommand('copy'); textarea.remove()
  }
}

function scoreDiagnosis(score: number) {
  if (score === 0) return '主体性稳定。边界系统运行正常。委员会建议：考虑加入维护地球行动。'
  if (score <= 24) return '轻微边界波动。偶尔会在关键三秒钟内犹豫。'
  if (score <= 49) return '检测到部分场景存在自动让步倾向。'
  if (score <= 74) return '检测到持续性内耗风险。建议立即开始主体性训练。'
  return '警报。地球分部检测到严重边界漏洞。已启动多人干预程序。'
}

function tierDossier(tier: ResultTier) {
  if (tier.id === 'candidate') return { label: '候补 Karen', title: '银河系争气委员会候选成员', status: 'CANDIDATE ACCESS', code: 'KAREN-CANDIDATE' }
  if (tier.id === 'tier4') return { label: '全员降落协议启动', title: '六个降落舱同时开启', status: 'CRITICAL SUPPORT', code: 'GCC-ALL-HANDS' }
  const level = tier.id === 'tier1' ? '一级' : tier.id === 'tier2' ? '二级' : '三级'
  return { label: `争气特派员支援等级：${level}`, title: tier.title, status: 'AGENT SUPPORT', code: `SUPPORT-${level}` }
}

function buildReportId(seed: string) {
  let hash = 17
  for (const char of seed) hash = (hash * 37 + char.charCodeAt(0)) % 99991
  return `GCC-${String(hash).padStart(5, '0')}`
}

export function Result({ userName, mbti, score, tier, agents, weaknesses, dimensionScores, onAgents, onRestart }: { userName: string; mbti: string; score: number; tier: ResultTier; agents: Character[]; weaknesses: string; dimensionScores: Record<Dimension, number>; onAgents: () => void; onRestart: () => void }) {
  const [modal, setModal] = useState<'prompt' | 'soul' | 'poster' | null>(null)
  const [toast, setToast] = useState('')
  const { topDimensionLabel, prescription } = useMemo(() => selectRehabPrescription(score, dimensionScores), [score, dimensionScores])
  const rxNumber = useMemo(() => buildRxNumber(mbti, score, agents), [mbti, score, agents])
  const reportId = useMemo(() => buildReportId(`${userName}-${mbti}-${score}-${rxNumber}`), [userName, mbti, score, rxNumber])
  const tierInfo = useMemo(() => tierDossier(tier), [tier])
  const prompt = generateKarenPrompt(userName, score, weaknesses, agents, tier.id === 'candidate', prescription)
  const soul = generateSoul(userName, mbti, score, weaknesses, agents, tier.id === 'candidate', prescription)
  const rehabText = formatRehabPrescription({ userName, score, rxNumber, topDimensionLabel, prescription })
  const notify = (message: string) => { setToast(message); window.setTimeout(() => setToast(''), 2400) }
  const downloadSoul = () => { const url = URL.createObjectURL(new Blob([soul], { type: 'text/markdown;charset=utf-8' })); const a = document.createElement('a'); a.href = url; a.download = `KAREN-SOUL-${userName}-${mbti}.md`; a.click(); URL.revokeObjectURL(url); notify('Agent Soul 已导出') }
  const downloadBadge = async () => { await downloadCandidateBadgePoster(userName, mbti); notify('候补 Karen 徽章海报已生成') }

  return <section className="result-page content-container result-dossier-page">
    <section className="result-report-cover result-section">
      <div>
        <span className="micro-label">GALACTIC COMMITTEE REPORT</span>
        <h1>银河系争气委员会<br />地球分部个人检测报告</h1>
      </div>
      <dl>
        <div><dt>检测对象</dt><dd>{userName}</dd></div>
        <div><dt>地球伪装人格</dt><dd>{mbti}</dd></div>
        <div><dt>检测编号</dt><dd>{reportId}</dd></div>
      </dl>
    </section>

    <section className="result-score-core result-section">
      <p className="result-score-name">{userName}</p>
      <p className="result-score-connector">的</p>
      <h2>窝囊值</h2>
      <strong>{score}%</strong>
      <p className="result-score-diagnosis">{scoreDiagnosis(score)}</p>
    </section>

    <section className="result-tier-dossier result-section">
      <div className="tier-badge"><span>{tierInfo.code}</span><b>{tierInfo.label}</b><i>{tierInfo.status}</i></div>
      <div className="tier-copy">
        <span>{tier.id.toUpperCase()} · MBTI / {mbti}</span>
        <h2>{tierInfo.title}</h2>
        {tier.copy.map((line) => <p key={line}>{line}</p>)}
      </div>
      <div className="tier-status-lights" aria-hidden="true"><i /><i /><i /></div>
    </section>

    <section className="result-summon-ritual result-section">
      <div className="result-section-heading">
        <span className="micro-label">KAREN ARRIVAL PROTOCOL</span>
        <h2>Karen 降临仪式</h2>
        <p>正在扫描用户弱项，确认边界漏洞、利益风险、自证倾向与止损延迟。系统正在匹配争气特派员。</p>
      </div>
      <div className="result-hero-visual">
        <SummonStage agents={agents} tier={tier} />
      </div>
    </section>

    {tier.id === 'candidate'
      ? <section className="candidate-offer result-section">
        <span>GALACTIC COMMITTEE OFFER</span>
        <h3>候补 Karen<br />地球守护席位</h3>
        <p>{chiefInstructor.whyArrived}</p>
        <div className="candidate-offer-grid">
          <div><b>总教官任务说明</b><span>{chiefInstructor.mission}</span></div>
          <div><b>核心技能</b><span>{chiefInstructor.ability} {chiefInstructor.abilityDescription}</span></div>
          <div><b>行动原则</b><span>{chiefInstructor.battleRule}</span></div>
        </div>
        <b>总教官韩金枝已注意到你。</b>
      </section>
      : <section className="deployed-section result-section">
        <div className="result-section-heading">
          <span className="micro-label">DEPLOYED AGENTS / {agents.length}</span>
          <h2>争气特派员任务档案</h2>
          <p>以下角色不是装饰。她们分别接管你的高频掉线场景。</p>
        </div>
        <div className="result-agent-list">{agents.map((agent, index) => <AgentCard key={agent.id} agent={agent} index={index} />)}</div>
      </section>}

    <RehabPrescriptionCard prescription={prescription} rxNumber={rxNumber} agents={agents} />

    <section className="result-share-dossier result-section">
      <div className="result-section-heading">
        <span className="micro-label">EXPORT KIT / SHARE REPORT</span>
        <h2>Prompt / Soul / 二维码 / 分享</h2>
        <p>把这份行动档案带走，或者转发给下一个需要恢复主体性的地球人。</p>
      </div>
      <div className="result-share-pass">
        <p><b>转发给下一个地球人</b><span>紫白通行码已生成，可直接扫码进入检测站。</span></p>
        <StyledSiteQRCode className="result-qr-card" size={88} />
      </div>
      <div className="export-help-card">
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
    </section>

    <CreatorLinks compact />
    {modal === 'poster' && <CandidateBadgePoster userName={userName} mbti={mbti} onDownload={downloadBadge} onClose={() => setModal(null)} />}
    {modal === 'prompt' && <TextModal title="我的 Karen 提示词" text={prompt} actionLabel="复制提示词" onAction={async () => { await copyText(prompt); notify('提示词已复制'); setModal(null) }} onClose={() => setModal(null)} />}
    {modal === 'soul' && <TextModal title="Agent Soul" text={soul} actionLabel="导出 .md 文件" onAction={() => { downloadSoul(); setModal(null) }} onClose={() => setModal(null)} />}
    {toast && <div className="toast">✓ {toast}</div>}
  </section>
}
