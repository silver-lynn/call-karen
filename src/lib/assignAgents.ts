import { characterById, characters } from '../data/characters'
import type { Character, CharacterId, Dimension, QuestionPackId } from '../types'

const primaryByDimension: Record<Dimension, CharacterId> = {
  public_order: 'bao_yulan', facts: 'tong_yuzhi', interest: 'wang_fengying', boundary: 'chen_yuzhen', exit: 'zhao_meilan', rhetoric: 'tong_yuzhi',
}

export function assignAgents(scores: Record<Dimension, number>, count: number, packId: QuestionPackId): Character[] {
  if (count === 6) return characters
  if (count === 0) return []
  const ranked = (Object.entries(scores) as [Dimension, number][]).sort((a, b) => b[1] - a[1])
  const selected: CharacterId[] = []
  for (const [dimension] of ranked) {
    const id = dimension === 'facts' && packId === 'structure' ? 'ma_dali' : primaryByDimension[dimension]
    if (!selected.includes(id)) selected.push(id)
    if (selected.length === count) break
  }
  if (selected.length < count && !selected.includes('ma_dali')) selected.push('ma_dali')
  return selected.slice(0, count).map((id) => characterById[id])
}
