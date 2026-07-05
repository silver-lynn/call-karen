export function WonangScoreBadge({ userName, score, subtitle }: { userName: string; score: number; subtitle: string }) {
  return <div className="wonang-score-card" aria-label={`${userName} 的窝囊值是 ${score}%`}>
    <div className="score-label">{userName} 的窝囊值是</div>
    <div className="score-number">{score}%</div>
    <div className="score-subtitle">{subtitle}</div>
  </div>
}
