import { useState } from 'react'
import type { Character } from '../types'
import { SmartImage } from './SmartImage'

export function AgentArchiveCard({ agent, priority = false }: { agent: Character; priority?: boolean }) {
  const [open, setOpen] = useState(false)
  return <article className={`archive-card ${agent.isChief ? 'chief-card' : ''} ${open ? 'open' : ''}`} style={{ '--agent': agent.color } as React.CSSProperties}>
    <button className="archive-summary" onClick={() => setOpen(!open)} aria-expanded={open}>
      <SmartImage className="archive-summary-image" src={agent.cardImage} fallbackSrc={agent.cropImage} alt={agent.name} placeholderLabel={agent.code} priority={priority || agent.isChief} />
      <span><small>{agent.code}</small><b>{agent.name}</b><em>{agent.title}</em><i>{open ? '收起档案 −' : '展开完整档案 +'}</i></span>
    </button>
    {open && (agent.isChief ? <div className="archive-detail chief-archive-detail">
      <dl>
        <div><dt>权限等级</dt><dd>{agent.secrecyLevel}</dd></div>
        <div><dt>所属</dt><dd>银河系争气委员会地球分部训练系统</dd></div>
      </dl>
      <section><h4>可公开职责</h4><ul>{agent.visibleInfo?.map((item) => <li key={item}>{item}</li>)}</ul></section>
      <section><h4>公开外观记录</h4><p>{agent.disguise}</p><p>{agent.style}</p><p>{agent.observation}</p></section>
      <div className="archive-source-shot"><SmartImage src={agent.cropImage} fallbackSrc={agent.cardImage} alt={`${agent.name}原始监测图`} placeholderLabel="SOURCE" /><span>原始监测图</span></div>
      <blockquote>“{agent.restrictedNote}”</blockquote>
      <p className="classified-note">总教官看得见你。你未必看得懂她。</p>
    </div> : <div className="archive-detail">
      <dl><div><dt>负责区域</dt><dd>{agent.areas}</dd></div><div><dt>常见任务</dt><dd>{agent.commonTasks}</dd></div></dl>
      <section><h4>地球伪装档案</h4><p>{agent.disguise}</p></section>
      <section><h4>任务风格</h4><p>{agent.style}</p></section>
      <section><h4>地球观察记录</h4><p>{agent.observation}</p></section>
      <section><h4>行动守则</h4><ul>{agent.rules.map((rule) => <li key={rule}>{rule}</li>)}</ul></section>
      <div className="archive-source-shot"><SmartImage src={agent.cropImage} fallbackSrc={agent.cardImage} alt={`${agent.name}原始监测图`} placeholderLabel="SOURCE" /><span>原始监测图</span></div>
      <blockquote>“{agent.line}”</blockquote>
    </div>)}
  </article>
}
