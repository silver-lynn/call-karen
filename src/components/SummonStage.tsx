import type { Character, ResultTier } from '../types'
import { chiefInstructor } from '../data/characters'
import { SmartImage } from './SmartImage'

export function SummonStage({ agents, tier }: { agents: Character[]; tier: ResultTier }) {
  if (tier.id === 'candidate') return <div className="candidate-stage">
    <div className="candidate-bg" />
    <div className="summon-protocol">
      <span>GCC SYSTEM</span>
      <b>候补权限校验完成</b>
      <small>总教官已匹配</small>
    </div>
    <div className="candidate-instructor-card">
      <SmartImage src={chiefInstructor.cardImage} fallbackSrc={chiefInstructor.cropImage} alt="总教官韩金枝" priority placeholderLabel="GCC-00" />
      <span>GCC-00 · TOP SECRET</span>
    </div>
    <div className="candidate-badge"><b>K</b><span>EARTH DIVISION</span></div>
    <small>总教官已注意到你。</small>
  </div>
  return <div className={`summon-stage summon-${agents.length}`}>
    {tier.id === 'tier4' && <div className="full-team-bg" />}
    <div className="stage-beam" />
    <div className="summon-protocol">
      <span>正在扫描用户弱项...</span>
      <b>GCC SYSTEM · 特派员已匹配</b>
      <small>边界漏洞 / 利益风险 / 自证倾向 / 止损延迟</small>
    </div>
    <div className="summoned-lineup">{agents.map((agent, index) => <figure key={agent.id} style={{ '--agent': agent.color, '--delay': `${index * 190}ms` } as React.CSSProperties}>
      <span>{agent.code} LOCKED</span>
      <SmartImage src={agent.cardImage} fallbackSrc={agent.cropImage} alt={agent.name} priority={index < 3} placeholderLabel={agent.code} />
      <figcaption><b>{agent.name}</b><small>{agent.title}</small></figcaption>
    </figure>)}</div>
  </div>
}
