import { CREATOR_LINKS, CREATOR_NOTE } from '../data/creatorLinks'

export function CreatorLinks({ compact = false }: { compact?: boolean }) {
  return <section className={compact ? 'creator-links creator-links-compact' : 'creator-links'}>
    <div className="creator-copy">
      <span className="micro-label">PROJECT AUTHOR</span>
      <h2>关于这个项目</h2>
      <p>这是一个关于主体性、边界感和外星大妈的荒诞小项目。如果你也喜欢 AI、叙事网页、人格测试和奇怪但有用的工具，欢迎来看看我还在做什么。</p>
      <p className="creator-note">{CREATOR_NOTE}</p>
      <div className="creator-actions">
        <a href={CREATOR_LINKS.github} target="_blank" rel="noreferrer">关注我的 GitHub</a>
        <a href={CREATOR_LINKS.xiaohongshu} target="_blank" rel="noreferrer">去小红书找我</a>
      </div>
    </div>
    {!compact && <a className="creator-xhs-card" href={CREATOR_LINKS.xiaohongshu} target="_blank" rel="noreferrer" aria-label="打开小红书二维码">
      <img src={CREATOR_LINKS.xiaohongshu} alt="SilverLynn 银凌的小红书二维码" />
      <span>扫码去小红书找 SilverLynn 银凌</span>
    </a>}
  </section>
}
