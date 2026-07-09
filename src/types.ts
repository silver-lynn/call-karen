export type CharacterId = 'bao_yulan' | 'ma_dali' | 'wang_fengying' | 'tong_yuzhi' | 'zhao_meilan' | 'chen_yuzhen' | 'han_jinzhi'

export type Dimension = 'public_order' | 'facts' | 'interest' | 'boundary' | 'exit' | 'rhetoric'
export type QuestionPackId = 'quiet' | 'harmony' | 'structure' | 'action'
export type OptionId = 'A' | 'B' | 'C' | 'D'

export type AnswerOption = { id: OptionId; text: string; score: number }
export type Question = { id: string; dimension: Dimension; label: string; prompt: string; options: AnswerOption[] }
export type QuestionPack = { id: QuestionPackId; name: string; description: string; mbtis: string[]; questions: Question[] }

export type CropBox = { left: number; top: number; width: number; height: number }

export type Character = {
  id: CharacterId
  code: string
  name: string
  title: string
  sourceImage: string
  image: string
  cropImage: string
  cardImage: string
  crop: CropBox
  color: string
  isChief?: boolean
  areas: string
  commonTasks: string
  disguise: string
  style: string
  observation: string
  rules: string[]
  line: string
  mission: string
  reasonForSummon: string
  whyArrived: string
  resultTasks: string[]
  ability: string
  abilityDescription: string
  battleRule: string
  dimensions: Dimension[]
  secrecyLevel?: string
  visibleInfo?: string[]
  restrictedNote?: string
}

export type ResultTier = {
  id: 'candidate' | 'tier1' | 'tier2' | 'tier3' | 'tier4'
  min: number
  max: number
  count: 0 | 1 | 2 | 3 | 6
  title: string
  copy: string[]
}
