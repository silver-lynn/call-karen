import type { ReactNode } from 'react'
import { Logo } from './Logo'

export function SiteShell({ children, compact = false, onHome, onAgents }: { children: ReactNode; compact?: boolean; onHome: () => void; onAgents: () => void }) {
  return <main className={compact ? 'shell compact' : 'shell'}>
    <header><button className="brand-button" onClick={onHome}><Logo /></button><nav><button onClick={onAgents}>特派员档案</button><span><i /> EARTH DIVISION · ONLINE</span></nav></header>
    {children}
  </main>
}
