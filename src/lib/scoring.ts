import type { Dimension, OptionId, Question } from '../types'

export function calculateScore(questions: Question[], answers: OptionId[]) {
  const points = answers.reduce((sum, answerId, index) => sum + (questions[index]?.options.find((option) => option.id === answerId)?.score ?? 0), 0)
  return Math.round((points / 20) * 100)
}

export function calculateDimensionScores(questions: Question[], answers: OptionId[]) {
  return questions.reduce<Record<Dimension, number>>((scores, question, index) => {
    scores[question.dimension] += question.options.find((option) => option.id === answers[index])?.score ?? 0
    return scores
  }, { public_order: 0, facts: 0, interest: 0, boundary: 0, exit: 0, rhetoric: 0 })
}
