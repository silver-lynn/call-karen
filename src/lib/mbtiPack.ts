import type { QuestionPackId } from '../types'

export function getPackId(mbti: string): QuestionPackId {
  if (['INFP', 'ISFP', 'INFJ', 'ISFJ'].includes(mbti)) return 'quiet'
  if (['ENFP', 'ESFP', 'ENFJ', 'ESFJ'].includes(mbti)) return 'harmony'
  if (['INTP', 'ISTP', 'INTJ', 'ISTJ'].includes(mbti)) return 'structure'
  return 'action'
}
