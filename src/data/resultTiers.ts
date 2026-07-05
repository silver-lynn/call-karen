import type { ResultTier } from '../types'

export const resultTiers: ResultTier[] = [
  { id: 'candidate', min: 0, max: 0, count: 0, title: '你很强，要不要成为 Karen 一起守护地球？', copy: ['检测完成。', '你的行动记录暂不符合救助标准。', '你能够维护公共秩序、表达个人边界、确认现实利益，也能在事情失去意义时及时撤离。', '银河系争气委员会现向你发出候补 Karen Offer。'] },
  { id: 'tier1', min: 1, max: 24, count: 1, title: '一级支援：单兵驻点', copy: ['委员会检测到一处高频掉线区域。', '已安排一名争气特派员就近落地。', '她将负责守住你最容易把话咽回去的那一秒。'] },
  { id: 'tier2', min: 25, max: 49, count: 2, title: '二级支援：双人同步降落', copy: ['你的边界系统与利益系统正在不同方向报警。', '委员会已派遣两名特派员进入地球轨道。', '一位负责挡住，一位负责收尾。'] },
  { id: 'tier3', min: 50, max: 74, count: 3, title: '三级支援：联合接管', copy: ['委员会判断，单兵处理已无法覆盖全部现场。', '事后复盘、利益让渡与边界漏风正在轮流报警。', '三名特派员已完成战术分工。'] },
  { id: 'tier4', min: 75, max: 100, count: 6, title: '全员降落程序启动', copy: ['地球分部已跳过常规分诊。', '你的窝囊值持续高于委员会安全阈值。', '六个降落舱同时开启。', '请原地等待，先别替任何人找借口。'] },
]

export const getResultTier = (score: number) => resultTiers.find((tier) => score >= tier.min && score <= tier.max) ?? resultTiers[4]
