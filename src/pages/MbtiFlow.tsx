import { SingleColumnOptionList } from '../components/SingleColumnOptionList'

const steps = [
  { label: '能量来源', options: [{ id: 'E', title: 'E｜先和世界交手', copy: '边走边想，在互动里获得能量。' }, { id: 'I', title: 'I｜先在心里过一遍', copy: '先整理自己，再决定怎么回应。' }] },
  { label: '信息方式', options: [{ id: 'S', title: 'S｜先看眼前发生了什么', copy: '相信具体事实、细节与经验。' }, { id: 'N', title: 'N｜先看事情意味着什么', copy: '迅速捕捉模式、意图与可能性。' }] },
  { label: '决策方式', options: [{ id: 'T', title: 'T｜先把逻辑摆清楚', copy: '从规则、一致性和结果出发。' }, { id: 'F', title: 'F｜先看谁会被影响', copy: '从关系、感受和价值出发。' }] },
  { label: '生活节奏', options: [{ id: 'J', title: 'J｜先把事情定下来', copy: '偏好计划、确认与可控节奏。' }, { id: 'P', title: 'P｜先保留一点空间', copy: '偏好灵活、探索与随时调整。' }] },
] as const

export function MbtiFlow({ parts, step, onBack, onSelect, onContinue }: { parts: string[]; step: number; onBack: () => void; onSelect: (value: string) => void; onContinue: () => void }) {
  const complete = step >= 4
  const mbti = parts.join('')
  return <section className="content-container flow-page">
    <button className="back" onClick={onBack}>← 返回上一项</button>
    {!complete ? <>
      <div className="flow-progress"><span>STEP {String(step + 1).padStart(2, '0')} / 04</span><i><b style={{ width: `${(step + 1) * 25}%` }} /></i></div>
      <span className="micro-label">地球伪装人格 · {steps[step].label}</span>
      <h2>哪一种更像你？</h2>
      <SingleColumnOptionList options={steps[step].options.map((option) => ({ id: option.id, content: <><b>{option.title}</b><small>{option.copy}</small></> }))} value={parts[step] as never} onSelect={onSelect} className="mbti-options" />
      <p className="page-note">MBTI 只匹配高发场景，不参与窝囊值评分。</p>
    </> : <div className="mbti-confirm">
      <span className="micro-label">IDENTITY READ COMPLETE</span><strong>{mbti}</strong><h2>委员会已读取你的<br />地球伪装人格。</h2>
      <p>接下来将投放更贴近你高发现场的题目。<br />该选择不会影响你的最高或最低评级。</p>
      <div className="option-list"><button className="option-button primary-option" onClick={onContinue}>进入现场检测 →</button></div>
    </div>}
  </section>
}
