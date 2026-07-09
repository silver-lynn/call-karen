import { useEffect, useMemo, useState } from 'react'
import { SiteShell } from './components/SiteShell'
import { chiefInstructor } from './data/characters'
import { getResultTier } from './data/resultTiers'
import { questionPacks } from './data/questionPacks'
import { assetPath } from './lib/assets'
import { assignAgents } from './lib/assignAgents'
import { getPackId } from './lib/mbtiPack'
import { preloadImagesWithTimeout, uniqueImageUrls } from './lib/preloadImages'
import { calculateDimensionScores, calculateScore } from './lib/scoring'
import { Agents } from './pages/Agents'
import { Home } from './pages/Home'
import { MbtiFlow } from './pages/MbtiFlow'
import { NameEntry } from './pages/NameEntry'
import { Quiz } from './pages/Quiz'
import { Result } from './pages/Result'
import { readStoredUserName, storeUserName } from './lib/userName'
import type { Dimension, OptionId } from './types'

type Screen = 'home' | 'name' | 'mbti' | 'quiz' | 'result'

const weaknessLabels: Record<Dimension, string> = {
  public_order: '公共秩序与当场表达', facts: '不自证、记录与事实回收', interest: '利益维护与条件确认', boundary: '拒绝、分工与责任边界', exit: '及时止损与退出', rhetoric: '话术拆弹与停止自证',
}

export default function App() {
  const [path, setPath] = useState(window.location.pathname)
  const [screen, setScreen] = useState<Screen>('home')
  const [userName, setUserName] = useState(readStoredUserName)
  const [mbtiParts, setMbtiParts] = useState<string[]>(['', '', '', ''])
  const [mbtiStep, setMbtiStep] = useState(0)
  const [questionIndex, setQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<OptionId[]>([])

  useEffect(() => {
    const onPopState = () => setPath(window.location.pathname)
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])

  const navigate = (nextPath: string) => { window.history.pushState({}, '', nextPath); setPath(nextPath); window.scrollTo({ top: 0 }) }
  const mbti = mbtiParts.join('')
  const packId = getPackId(mbti)
  const pack = questionPacks[packId]
  const score = useMemo(() => calculateScore(pack.questions, answers), [pack, answers])
  const dimensionScores = useMemo(() => calculateDimensionScores(pack.questions, answers), [pack, answers])
  const tier = useMemo(() => getResultTier(score), [score])
  const agents = useMemo(() => assignAgents(dimensionScores, tier.count, packId), [dimensionScores, tier.count, packId])
  const weaknesses = useMemo(() => (Object.entries(dimensionScores) as [Dimension, number][]).sort((a, b) => b[1] - a[1]).slice(0, 2).map(([dimension]) => weaknessLabels[dimension]).join('、'), [dimensionScores])

  useEffect(() => {
    if (screen !== 'result') return
    localStorage.setItem('karen-last-result', JSON.stringify({ userName, mbti, score, tier: tier.id, characterIds: agents.map((agent) => agent.id), createdAt: new Date().toISOString() }))
  }, [screen, userName, mbti, score, tier.id, agents])

  const start = () => { setUserName(readStoredUserName()); setMbtiParts(['', '', '', '']); setMbtiStep(0); setAnswers([]); setQuestionIndex(0); setScreen('name'); window.scrollTo({ top: 0 }) }
  const continueWithName = (name: string) => { setUserName(storeUserName(name)); setMbtiStep(0); setScreen('mbti'); window.scrollTo({ top: 0 }) }
  const selectMbti = (value: string) => { const next = [...mbtiParts]; next[mbtiStep] = value; setMbtiParts(next); window.setTimeout(() => setMbtiStep((step) => Math.min(4, step + 1)), 150) }
  const backMbti = () => { if (mbtiStep > 0) setMbtiStep((step) => step - 1); else setScreen('name') }
  const answerQuestion = (id: OptionId) => {
    const next = [...answers]
    next[questionIndex] = id
    setAnswers(next)
    if (questionIndex < 4) window.setTimeout(() => setQuestionIndex((index) => index + 1), 170)
    else window.setTimeout(async () => {
      const nextScore = calculateScore(pack.questions, next)
      const nextDimensionScores = calculateDimensionScores(pack.questions, next)
      const nextTier = getResultTier(nextScore)
      const nextAgents = assignAgents(nextDimensionScores, nextTier.count, packId)
      const imageUrls = uniqueImageUrls([
        assetPath('assets/committee-hero.v2.webp'),
        ...nextAgents.flatMap((agent) => [agent.cardImage, agent.cropImage]),
        ...(nextTier.id === 'candidate' ? [chiefInstructor.cardImage, chiefInstructor.cropImage, assetPath('assets/badges/candidate-karen-badge.webp')] : []),
      ])
      await preloadImagesWithTimeout(imageUrls, 800)
      setScreen('result')
      window.scrollTo({ top: 0 })
    }, 220)
  }
  const backQuestion = () => { if (questionIndex > 0) setQuestionIndex((index) => index - 1); else { setMbtiStep(4); setScreen('mbti') } }
  const home = () => { if (path !== '/') navigate('/'); setScreen('home') }

  if (path === '/agents') return <SiteShell compact onHome={home} onAgents={() => navigate('/agents')}><Agents onBack={home} /></SiteShell>
  if (screen === 'home') return <SiteShell onHome={home} onAgents={() => navigate('/agents')}><Home onStart={start} onAgents={() => navigate('/agents')} /></SiteShell>
  if (screen === 'name') return <SiteShell compact onHome={home} onAgents={() => navigate('/agents')}><NameEntry initialName={userName} onBack={() => setScreen('home')} onContinue={continueWithName} /></SiteShell>
  if (screen === 'mbti') return <SiteShell compact onHome={home} onAgents={() => navigate('/agents')}><MbtiFlow parts={mbtiParts} step={mbtiStep} onBack={backMbti} onSelect={selectMbti} onContinue={() => { setQuestionIndex(0); setAnswers([]); setScreen('quiz') }} /></SiteShell>
  if (screen === 'quiz') return <SiteShell compact onHome={home} onAgents={() => navigate('/agents')}><Quiz pack={pack} current={questionIndex} answers={answers} onBack={backQuestion} onAnswer={answerQuestion} /></SiteShell>
  return <SiteShell compact onHome={home} onAgents={() => navigate('/agents')}><Result userName={userName} mbti={mbti} score={score} tier={tier} agents={agents} weaknesses={weaknesses} dimensionScores={dimensionScores} onAgents={() => navigate('/agents')} onRestart={start} /></SiteShell>
}
