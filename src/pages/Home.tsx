export function Home({ onStart, onAgents }: { onStart: () => void; onAgents: () => void }) {
  return <section className="hero">
    <div className="hero-art" aria-label="六位争气特派员站在委员会舞台上"><div className="scanline" /></div>
    <div className="hero-copy">
      <div className="eyebrow"><span>⚠</span> INCOMING SIGNAL / 002</div>
      <h1>银河系争气委员会<br /><em>已检测到你的信号。</em></h1>
      <p>请选择你的地球伪装人格。<br />争气特派员将根据你的行动习惯准备降落。</p>
      <div className="home-actions"><button className="primary" onClick={onStart}>开始检测 <span>→</span></button><button className="archive-link" onClick={onAgents}>查看特派员档案 ↗</button></div>
      <div className="hero-note"><b>5</b> 道现场题 <i /> <b>90</b> 秒完成 <i /> 无需登录</div>
    </div>
    <div className="slogan">你负责委屈，<strong>她们负责处理。</strong></div>
  </section>
}
