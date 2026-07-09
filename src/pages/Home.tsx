import { CreatorLinks } from '../components/CreatorLinks'
import { assetPath } from '../lib/assets'

const earthFailureScenes = [
  '被冒犯后不敢当场说话',
  '被占便宜后先怀疑自己是不是太计较',
  '明明利益受损，却不好意思谈钱',
  '被话术绕晕后开始疯狂自证',
  '明知一段关系或合作已经不值得，却还在反复复盘',
  '想拒绝别人，却先替对方安排好了自己的退让',
]

const karenIs = [
  '在你被冒犯时敢开口的人',
  '在你被占便宜时敢谈条件的人',
  '在你想自证八百字时，把你从被告席上拽下来的人',
  '在你还在替对方找借口时，已经帮你把证据、边界、退款、止损和投诉路径都摆到桌上的人',
]

const agentReminders = [
  '公共空间有人违规，你可以开口。',
  '别人拖欠你的钱，你可以要求结算。',
  '对方质疑你的贡献，你可以回到记录。',
  '别人把责任塞给你，你可以拒绝。',
  '一段关系反复消耗你，你可以撤。',
  '你不需要先证明自己是一个好人，才有资格维护自己的边界。',
]

const testQuestions = [
  '你会忍下去吗？',
  '你会暗示一下然后等对方自觉吗？',
  '你能不能明确表达边界？',
  '你敢不敢在必要时进入流程？',
]

const positiveKaren = [
  '一个敢于维护公共秩序的人。',
  '一个敢于维护自身利益的人。',
  '一个不被话术牵着走的人。',
  '一个不怕合理升级、不怕书面确认、不怕把事情讲清楚的人。',
  '一个清醒、利落、具体、能让念头通达的人。',
]

export function Home({ onStart, onAgents }: { onStart: () => void; onAgents: () => void }) {
  return <>
    <section className="hero">
      <div className="hero-art" aria-label="六位争气特派员站在委员会舞台上">
        <img
          src={assetPath('assets/committee-hero.v2.webp')}
          alt=""
          width={1672}
          height={941}
          loading="eager"
          fetchPriority="high"
          decoding="async"
        />
        <div className="scanline" />
      </div>
      <div className="hero-copy">
        <div className="eyebrow"><span>⚠</span> INCOMING SIGNAL / 002</div>
        <h1>银河系争气委员会<br /><em>已检测到你的信号。</em></h1>
        <p>请选择你的地球伪装人格。<br />争气特派员将根据你的行动习惯准备降落。</p>
        <div className="home-actions"><button className="primary" onClick={onStart}>开始检测 <span>→</span></button><button className="archive-link" onClick={onAgents}>查看特派员档案 ↗</button></div>
        <div className="hero-note"><b>5</b> 道现场题 <i /> <b>90</b> 秒完成 <i /> 无需登录</div>
      </div>
      <div className="slogan">你负责委屈，<strong>她们负责处理。</strong></div>
    </section>

    <section className="worldview" id="worldview">
      <div className="worldview-heading">
        <span className="micro-label">COMMITTEE BRIEFING / EARTH DIVISION</span>
        <h2>什么是 Karen？</h2>
        <p>在英文互联网里，“Karen”常被用来指一种爱投诉、爱找茬、总是要求“叫经理出来”的刻板形象。这个词原本不完全正面，甚至有点嘲讽意味。但我们想把它拿回来，重新赋予一个更有用、更痛快的意思。</p>
      </div>

      <div className="worldview-grid">
        <article className="lore-card lore-card-large">
          <span>01 / RECLAIM THE WORD</span>
          <h3>在这个项目里，Karen 不是无理取闹的人。</h3>
          <ul>
            {karenIs.map((item) => <li key={item}>Karen 是那个{item}。</li>)}
          </ul>
          <p className="lore-punchline">Karen 不是来让你变坏。<strong>Karen 是来帮你恢复主体性。</strong></p>
        </article>

        <article className="lore-card">
          <span>02 / GALACTIC OBSERVATION</span>
          <h3>银河系争气委员会</h3>
          <p>根据银河系争气委员会的长期观测，地球人的内耗水平已经严重影响宇宙运行效率。大量地球人在以下场景中持续掉线：</p>
          <ul className="signal-list">
            {earthFailureScenes.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </article>

        <article className="lore-card">
          <span>03 / SPECIAL UNITS</span>
          <h3>争气特派员</h3>
          <p>为了控制银河系整体熵增速度，委员会决定向地球派遣一批特殊执行单位。她们来自高维文明，拥有极强的事实识别、边界执行、流程推进和止损能力。</p>
          <p>但为了更好地适应地球社会，她们选择了一种最具本土执行力、最能快刀斩乱麻、最不怕把事情摆到台面上的伪装形态：<strong>地球大妈。</strong></p>
        </article>
      </div>

      <div className="worldview-split">
        <article>
          <span className="micro-label">WHY THEY LANDED</span>
          <h3>外星大妈为什么降临地球？</h3>
          <p>因为有些问题，温柔建议解决不了。因为有些委屈，越分析越内耗。因为有些人，听不懂你的体谅，只听得懂边界、证据和流程。</p>
          <p>争气特派员不会鼓励你无端挑事，也不会教你占别人便宜。她们的任务不是制造冲突，而是结束无效消耗。</p>
        </article>
        <div className="reminder-panel">
          {agentReminders.map((item, index) => <p key={item}><b>{String(index + 1).padStart(2, '0')}</b>{item}</p>)}
        </div>
      </div>

      <div className="test-brief">
        <div>
          <span className="micro-label">TEST PROTOCOL</span>
          <h3>这个测试会做什么？</h3>
          <p>你会先选择自己的 MBTI 作为地球伪装人格。它不会决定你强不强，只会决定委员会向你投放哪一组更贴近你的高发场景。</p>
          <p>然后，系统会通过几个具体场景检测你的<strong>窝囊值</strong>。</p>
        </div>
        <div className="question-chips">
          {testQuestions.map((item) => <span key={item}>{item}</span>)}
        </div>
        <p className="deployment-note">检测结束后，委员会会派出对应的争气特派员。有的人只需要一位 Karen 驻点协助，有的人需要三位 Karen 联合作战，也有的人情况紧急，六个降落舱同时打开。若你的窝囊值为 0%，委员会会发出另一种结果：<strong>你很强，要不要成为 Karen 一起守护地球？</strong></p>
      </div>

      <article className="redefine-card">
        <span className="micro-label">NOT A VILLAIN ARC</span>
        <h3>这不是让你变成讨厌的人</h3>
        <p>真正的 Karen，不是无理取闹。真正的 Karen，是不再把自己的边界无限让出去；是不再为了显得懂事而吞下所有不舒服；是不再用“我是不是太敏感”来替别人开脱；是不再把善良、体面和礼貌变成被拿捏的入口。</p>
        <div className="positive-list">
          {positiveKaren.map((item) => <p key={item}>{item}</p>)}
        </div>
      </article>

      <section className="final-briefing">
        <div>
          <span className="micro-label">FINAL CALL</span>
          <h3>你负责委屈，她们负责处理</h3>
          <p>Karen 是一个荒诞人格测试，也是一个主体性训练装置。它会给你一份检测结果，告诉你最容易在哪里掉线；它会召唤你的争气特派员，告诉你谁来接管这类场面；它还会开出一份“主体性与边界感运动康复处方”。</p>
          <p>你不需要从今天开始变成一个很凶的人。你只需要在该开口的时候，不再自动静音；在该拒绝的时候，不再写一篇道歉声明；在该撤的时候，不再把沉没成本当爱情、友情或责任。</p>
        </div>
        <div className="landing-card">
          <b>银河系争气委员会已经检测到你的信号。</b>
          <span>现在，请选择你的地球伪装人格。</span>
          <strong>你的 Karen 正在降落。</strong>
          <button className="primary" onClick={onStart}>开始检测 <span>→</span></button>
        </div>
      </section>
      <CreatorLinks />
    </section>
  </>
}
