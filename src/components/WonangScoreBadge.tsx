export function WonangScoreBadge({ score, subtitle }: { score: number; subtitle: string }) {
  return <div className="wonang-score-card" aria-label={`窝囊值 ${score}%`}>
    <div className="score-label">窝囊值</div>
    <div className="score-number">{score}%</div>
    <div className="score-subtitle">{subtitle}</div>
  </div>
}
