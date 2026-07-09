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
      <p><b>GCC-RX 系列训练计划</b><br />用于恢复地球个体边界系统、拒绝能力和行动反射。</p>
    </div>
    <div className="rehab-diagnosis-grid">
      <div className="rehab-diagnosis">
        <span>检测诊断</span>
        <b>{prescription.title}</b>
        {prescription.diagnosis.split('\n').map((line) => <p key={line}>{line}</p>)}
      </div>
      <div className="rehab-target">
        <span>弱点扫描</span>
        <p>{prescription.weakPoint}</p>
        <span>恢复目标</span>
        <p>{prescription.recoveryGoal}</p>
      </div>
    </div>
    <div className="rehab-section-label"><span>DAILY TRAINING LOAD</span><b>每日训练量</b></div>
    <div className="rehab-exercises">
      {prescription.dailyExercises.map((exercise, index) => <article key={exercise.name}>
        <span>训练 {String(index + 1).padStart(2, '0')}</span>
        <h3>{exercise.name}</h3>
        <dl>
          <div><dt>训练量</dt><dd>{exercise.load}</dd></div>
          <div><dt>指令</dt><dd>{exercise.instruction}</dd></div>
          <div><dt>示例</dt><dd>{exercise.example}</dd></div>
        </dl>
      </article>)}
    </div>
    <div className="rehab-emergency">
      <span>EMERGENCY MOVE</span>
      <h3>{prescription.emergencyMove.skill}</h3>
      <dl>
        <div><dt>冷却时间</dt><dd>{prescription.emergencyMove.cooldown}</dd></div>
        <div><dt>使用方式</dt><dd>{prescription.emergencyMove.usage}</dd></div>
        <div><dt>效果</dt><dd>{prescription.emergencyMove.effect}</dd></div>
      </dl>
    </div>
    <div className="rehab-warning">
      <b>禁止行为</b>
      <p>{prescription.forbiddenBehavior}</p>
      <b>警示语</b>
      <p>{prescription.warning}</p>
    </div>
    <div className="rehab-badge"><span>训练完成奖励</span><b>{prescription.completionBadge}</b><small>银河系争气委员会认证</small></div>
    <p className="rehab-executor">{executorText}</p>
  </section>
}
