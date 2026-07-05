import { useState } from 'react'
import { DEFAULT_USER_NAME, limitUserNameInput, normalizeUserName } from '../lib/userName'

export function NameEntry({ initialName, onBack, onContinue }: { initialName: string; onBack: () => void; onContinue: (name: string) => void }) {
  const [draft, setDraft] = useState(initialName === DEFAULT_USER_NAME ? '' : initialName)

  const submit = () => onContinue(normalizeUserName(draft))

  return <section className="content-container name-entry-page">
    <button className="back" onClick={onBack}>← 返回委员会首页</button>
    <span className="micro-label">EARTH REGISTRY / REQUIRED</span>
    <h1>请输入你的地球登记名</h1>
    <p>委员会需要知道本次被检测对象是谁。</p>
    <label className="name-input-card">
      <span>登记名</span>
      <input
        value={draft}
        maxLength={24}
        placeholder="例如：小王 / Tiange / 银河路过人员"
        onChange={(event) => setDraft(limitUserNameInput(event.target.value))}
        onKeyDown={(event) => { if (event.key === 'Enter') submit() }}
        autoFocus
      />
      <small>仅用于本次结果、Prompt、Soul、康复处方和分享卡展示。最多 12 个中文 / 英文 / 数字字符。</small>
    </label>
    <div className="option-list">
      <button className="option-button primary-option" onClick={submit}>继续检测</button>
      <button className="option-button subtle-option" onClick={() => onContinue(DEFAULT_USER_NAME)}>我先匿名降落</button>
    </div>
  </section>
}
