import type { Character } from '../types'
import { SmartImage } from './SmartImage'

export function AgentCard({ agent, index }: { agent: Character; index: number }) {
  return <article className="agent-card" style={{ '--agent': agent.color, '--delay': `${index * 130}ms` } as React.CSSProperties}>
    <SmartImage className="agent-card-image" src={agent.cardImage} fallbackSrc={agent.cropImage} alt={`${agent.name}｜${agent.title}`} placeholderLabel={agent.code} />
    <div className="agent-card-copy">
      <span>{agent.code} · {agent.title}</span>
      <h3>{agent.name}</h3>
      <p className="summon-reason"><b>为什么降临：</b>{agent.whyArrived}</p>
      <div className="agent-mission-list"><b>任务：</b>{agent.resultTasks.map((task) => <i key={task}>{task}</i>)}</div>
      <p><b>核心技能：</b>{agent.ability}<br />{agent.abilityDescription}</p>
      <p><b>行动原则：</b>{agent.battleRule}</p>
      <blockquote>“{agent.line}”</blockquote>
    </div>
  </article>
}
