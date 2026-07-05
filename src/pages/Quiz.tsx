import { SingleColumnOptionList } from '../components/SingleColumnOptionList'
import type { OptionId, QuestionPack } from '../types'

export function Quiz({ pack, current, answers, onBack, onAnswer }: { pack: QuestionPack; current: number; answers: OptionId[]; onBack: () => void; onAnswer: (id: OptionId) => void }) {
  const question = pack.questions[current]
  return <section className="content-container quiz-page">
    <div className="quiz-top"><button className="back" onClick={onBack}>← 上一项</button><div><b>{String(current + 1).padStart(2, '0')} / 05</b><span>{question.label}</span></div></div>
    <div className="quiz-progress"><i style={{ width: `${(current + 1) * 20}%` }} /></div>
    <span className="micro-label">CASE #{String(current + 1).padStart(3, '0')} · {pack.name}</span>
    <h2>{question.prompt}</h2>
    <SingleColumnOptionList options={question.options.map((option) => ({ id: option.id, content: <><span className="option-letter">{option.id}</span><span>{option.text}</span></> }))} value={answers[current]} onSelect={onAnswer} className="quiz-options" />
    <p className="page-note">委员会不奖励无端挑事，只奖励正当维护。</p>
  </section>
}
