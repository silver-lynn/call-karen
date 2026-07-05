import { AgentArchiveCard } from '../components/AgentArchiveCard'
import { CreatorLinks } from '../components/CreatorLinks'
import { archiveCharacters } from '../data/characters'

export function Agents({ onBack }: { onBack: () => void }) {
  return <section className="agents-page">
    <div className="agents-banner"><div /><button className="back" onClick={onBack}>← 返回委员会</button><span className="micro-label">GCC · EARTH DIVISION / PERSONNEL ARCHIVE</span></div>
    <div className="agents-intro"><h1>银河系争气委员会<br /><em>地球分部人员档案</em></h1><p>她们不是来安慰你的。她们是来让事情结束的。</p></div>
    <div className="archive-grid">{archiveCharacters.map((character) => <AgentArchiveCard key={character.id} agent={character} />)}</div>
    <div className="content-container archive-bottom"><CreatorLinks /><div className="option-list"><button className="option-button" onClick={onBack}>返回委员会</button></div></div>
  </section>
}
