import type { Character } from '../types'

export function AgentCard({ agent, index }: { agent: Character; index: number }) {
  return <article className="agent-card" style={{ '--agent': agent.color, '--delay': `${index * 130}ms` } as React.CSSProperties}>
    <div className="agent-card-image"><img src={agent.cardImage} alt={`${agent.name}｜${agent.title}`} /></div>
    <div className="agent-card-copy"><span>{agent.code} · {agent.title}</span><h3>{agent.name}</h3><p>{agent.mission}</p><p className="summon-reason">{agent.reasonForSummon}</p><blockquote>“{agent.line}”</blockquote></div>
  </article>
}
