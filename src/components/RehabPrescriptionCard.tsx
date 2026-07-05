import type { Character } from '../types'
import type { RehabPrescription } from '../data/rehabPrescriptions'

export function RehabPrescriptionCard({ prescription, rxNumber, agents }: { prescription: RehabPrescription; rxNumber: string; agents: Character[] }) {
  const executorText = agents.length > 1
    ? `联合训练建议：本次处方由 ${agents[0].name} 主开，${agents.slice(1, 3).map((agent) => agent.name).join(' 与 ')} 协助执行。`
    : agents.length === 1
      ? `本次处方由 ${agents[0].name} 主开。`
      : '候补 Karen 专属热身：总教官韩金枝已完成签发。'

  return <section className="rehab-card" aria-label="主体性与边界感运动康复处方">
    <div className="rehab-card-head">
      <span>银河系争气委员会康复处</span>
      <span>处方编号：GCC-RX-{rxNumber}</span>
    </div>
    <div className="rehab-title-block">
      <span className="micro-label">AGENCY & BOUNDARY REHAB</span>
      <h2>主体性与边界感运动康复处方</h2>
      <p>本处方不是医疗建议。它只负责训练你少解释一点、拒绝快一点、留证早一点、止损狠一点。</p>
    </div>
    <div className="rehab-diagnosis">
      <b>{prescription.title}</b>
      {prescription.diagnosis.split('\n').map((line) => <p key={line}>{line}</p>)}
    </div>
    <div className="rehab-exercises">
      {prescription.exercises.map((exercise, index) => <article key={exercise.name}>
        <span>训练 {String(index + 1).padStart(2, '0')}</span>
        <h3>{exercise.name}</h3>
        <dl>
          <div><dt>剂量</dt><dd>{exercise.dose}</dd></div>
          <div><dt>指令</dt><dd>{exercise.instruction}</dd></div>
          <div><dt>示例</dt><dd>{exercise.example}</dd></div>
        </dl>
      </article>)}
    </div>
    <div className="rehab-warning">
      <b>警示语</b>
      <p>{prescription.warning}</p>
    </div>
    <p className="rehab-executor">{executorText}</p>
  </section>
}
