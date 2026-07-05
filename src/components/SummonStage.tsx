import type { Character, ResultTier } from '../types'
import { chiefInstructor } from '../data/characters'

export function SummonStage({ agents, tier }: { agents: Character[]; tier: ResultTier }) {
  if (tier.id === 'candidate') return <div className="candidate-stage">
    <div className="candidate-bg" />
    <div className="candidate-instructor-card">
      <img src={chiefInstructor.cardImage} alt="总教官韩金枝" />
      <span>GCC-00 · TOP SECRET</span>
    </div>
    <div className="candidate-badge"><b>K</b><span>EARTH DIVISION</span></div>
    <small>总教官已注意到你。</small>
  </div>
  return <div className={`summon-stage summon-${agents.length}`}>
    {tier.id === 'tier4' && <div className="full-team-bg" />}
    <div className="stage-beam" />
    <div className="summoned-lineup">{agents.map((agent, index) => <figure key={agent.id} style={{ '--agent': agent.color, '--delay': `${index * 190}ms` } as React.CSSProperties}><span>{agent.code} LOCKED</span><img src={agent.cardImage} alt={agent.name} /><figcaption><b>{agent.name}</b><small>{agent.title}</small></figcaption></figure>)}</div>
  </div>
}
