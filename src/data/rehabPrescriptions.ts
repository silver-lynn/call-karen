import type { Character, Dimension } from '../types'

export type RehabDimension = Dimension | 'candidate'

export type RehabPrescription = {
  id: string
  dimension: RehabDimension
  title: string
  diagnosis: string
  exercises: {
    name: string
    dose: string
    instruction: string
    example: string
  }[]
  weakPoint: string
  recoveryGoal: string
  dailyExercises: {
    name: string
    load: string
    instruction: string
    example: string
  }[]
  emergencyMove: {
    skill: string
    cooldown: string
    usage: string
    effect: string
  }
  forbiddenBehavior: string
  completionBadge: string
  warning: string
}

export const dimensionLabels: Record<Dimension, string> = {
  public_order: '公共秩序 / 当场表达',
  facts: '记录 / 流程 / 事实回收',
  interest: '利益维护',
  boundary: '拒绝 / 讨好 / 兜底',
  exit: '止损',
  rhetoric: 'PUA / 自证 / 话术',
}

export const candidateKarenPrescription: RehabPrescription = {
  id: 'candidate-warmup',
  dimension: 'candidate',
  title: '候补 Karen 上岗前热身处方',
  diagnosis: '委员会确认：你目前不需要救助。\n但所有候补 Karen 在上岗前仍需保持核心肌群稳定。',
  exercises: [
    { name: '公共秩序巡逻训练', dose: '遇到就练', instruction: '看到明确违规和越界行为时，保持清楚表达。', example: '这里不能抽烟，请停止。' },
    { name: '不自证保养训练', dose: '每周 3 组', instruction: '不把自己放进被告席。', example: '请回到事实本身。' },
    { name: '边界维护拉伸', dose: '每日 1 组', instruction: '拒绝时不写长篇说明。', example: '不方便，这次不接。' },
  ],
  weakPoint: '候补者常见退化风险：为了显得讲道理，又开始解释太多。',
  recoveryGoal: '保持主体性稳定，把“能出手”训练成长期肌肉记忆。',
  dailyExercises: [
    { name: '公共秩序巡逻训练', load: '遇到就练', instruction: '看到明确违规和越界行为时，保持清楚表达。', example: '这里不能抽烟，请停止。' },
    { name: '不自证保养训练', load: '每周 3 组', instruction: '不把自己放进被告席。', example: '请回到事实本身。' },
    { name: '边界维护拉伸', load: '每日 1 组', instruction: '拒绝时不写长篇说明。', example: '不方便，这次不接。' },
  ],
  emergencyMove: { skill: '【候补 Karen 站稳】', cooldown: '0 秒', usage: '遇到需要出手的场面，先回到事实和边界。', effect: '防止从候补 Karen 退化成过度解释型地球人。' },
  forbiddenBehavior: '禁止把所有合理维护都包装成“抱歉打扰”。',
  completionBadge: '候补 Karen 预备役 Lv.1',
  warning: '候补 Karen 禁止过度解释，防止退化为普通地球人。',
}

export const rehabPrescriptions: Record<Dimension, RehabPrescription> = {
  public_order: {
    id: 'public-order',
    dimension: 'public_order',
    title: '现场发声康复处方',
    diagnosis: '检测到你在公共秩序场景中容易出现短暂静音。\n委员会建议进行“当场开口肌群”恢复训练。',
    exercises: [
      { name: '一句话制止训练', dose: '每日 1 组', instruction: '把要求压缩成一句话，不铺垫，不道歉。', example: '这里是禁烟区域，请把烟灭掉。' },
      { name: '不解释站姿训练', dose: '高危场景必练', instruction: '说完要求后停止补充理由，不用证明自己有资格开口。', example: '我已经说明要求了。' },
      { name: '工作人员召唤训练', dose: '当场使用', instruction: '对方继续越界时，不进入争吵，直接找现场管理人员。', example: '麻烦工作人员过来处理一下。' },
    ],
    weakPoint: '公共秩序系统：██████░░░░，关键三秒钟内容易自动静音。',
    recoveryGoal: '恢复当场表达反射，把“我是不是太多事”改写成“事实需要被处理”。',
    dailyExercises: [
      { name: '一句话制止训练', load: '3 次 / 周', instruction: '把要求压缩成一句话，不铺垫，不道歉。', example: '这里是禁烟区域，请把烟灭掉。' },
      { name: '不解释站姿训练', load: '每次开口后 1 次', instruction: '说完要求后停止补充理由。', example: '我已经说明要求了。' },
      { name: '工作人员召唤训练', load: '对方继续越界时立即执行', instruction: '不进入争吵，直接找现场管理人员。', example: '麻烦工作人员过来处理一下。' },
    ],
    emergencyMove: { skill: '【现场接管】', cooldown: '0 秒', usage: '“这里不可以，请停止。”', effect: '立即中断公共空间越界输入。' },
    forbiddenBehavior: '禁止为了不扫兴，把明确违规注册成“我忍一下”。',
    completionBadge: '当场开口肌群修复 Lv.1',
    warning: '禁止把“我不想扫兴”误认为“这事不该管”。',
  },
  facts: {
    id: 'facts',
    dimension: 'facts',
    title: '证据链肌群康复处方',
    diagnosis: '检测到你容易记住委屈，但忘记保存委屈出现过的证据。\n委员会建议加强截图、时间线与书面确认训练。',
    exercises: [
      { name: '三秒截图反射', dose: '每次争议发生时', instruction: '不要先气，先截图。', example: '聊天记录、付款记录、承诺时间、对方原话。' },
      { name: '时间线整理训练', dose: '每次纠纷 1 组', instruction: '把事情写成“时间—对方行为—我的回应—当前结果”。', example: '6月1日确认退款，6月5日逾期，对方仍要求等待。' },
      { name: '口头变书面训练', dose: '高危合作必练', instruction: '所有口头承诺都转成文字确认。', example: '我确认一下，我们刚才说的是 X，对吗？' },
    ],
    weakPoint: '证据链系统：█████░░░░░，容易先进入情绪，再想起记录。',
    recoveryGoal: '把委屈转化成可被平台、流程和对方承认的事实链。',
    dailyExercises: [
      { name: '三秒截图反射', load: '争议发生时立即 1 次', instruction: '不要先气，先截图。', example: '聊天记录、付款记录、承诺时间、对方原话。' },
      { name: '时间线整理训练', load: '每次纠纷 1 组', instruction: '写成“时间—行为—回应—结果”。', example: '6月1日确认退款，6月5日逾期。' },
      { name: '口头变书面训练', load: '高危合作必练', instruction: '所有口头承诺都转成文字确认。', example: '我确认一下，我们刚才说的是 X，对吗？' },
    ],
    emergencyMove: { skill: '【证据链展开】', cooldown: '3 秒', usage: '先截图，再说话。', effect: '把模糊委屈转换为可执行材料。' },
    forbiddenBehavior: '禁止用“我记得很清楚”代替证据。',
    completionBadge: '证据链肌群修复 Lv.1',
    warning: '禁止用“我记得很清楚”代替证据。',
  },
  interest: {
    id: 'interest',
    dimension: 'interest',
    title: '谈钱羞耻脱敏处方',
    diagnosis: '检测到你在报酬、退款、垫付和条件确认场景中容易替对方先心虚。\n委员会建议进行利益表达脱敏训练。',
    exercises: [
      { name: '金额直视训练', dose: '每日 1 组', instruction: '把钱、日期、条件直接说出来。', example: '这笔费用是 320 元，请在周五前转给我。' },
      { name: '条件前置训练', dose: '每次合作前', instruction: '先确认范围和报酬，再投入工作。', example: '报酬和范围确认前，我不会继续增加工作量。' },
      { name: '停止代付训练', dose: '拖欠发生后立即使用', instruction: '一旦对方拖延，停止下一次垫付。', example: '之前的费用结清前，我不再代付新的部分。' },
    ],
    weakPoint: '利益结算系统：████░░░░░░，谈钱时容易替对方先心虚。',
    recoveryGoal: '恢复金额、范围、时间和责任的清晰表达。',
    dailyExercises: [
      { name: '金额直视训练', load: '1 次 / 天', instruction: '把钱、日期、条件直接说出来。', example: '这笔费用是 320 元，请在周五前转给我。' },
      { name: '条件前置训练', load: '每次合作前', instruction: '先确认范围和报酬，再投入工作。', example: '报酬和范围确认前，我不会继续增加工作量。' },
      { name: '停止代付训练', load: '拖欠发生后立即使用', instruction: '一旦拖延，停止下一次垫付。', example: '之前的费用结清前，我不再代付新的部分。' },
    ],
    emergencyMove: { skill: '【利益结算】', cooldown: '0 秒', usage: '“我们先确认费用和范围。”', effect: '把模糊情分切回明确条件。' },
    forbiddenBehavior: '禁止把“我怕显得计较”当作付款方式。',
    completionBadge: '利益系统结算 Lv.1',
    warning: '禁止把“我怕显得计较”当作付款方式。',
  },
  rhetoric: {
    id: 'rhetoric',
    dimension: 'rhetoric',
    title: '不自证核心稳定处方',
    diagnosis: '检测到你容易被对方一句话送上被告席。\n委员会建议强化“不解释动机、不证明清白、只回事实”的核心稳定性。',
    exercises: [
      { name: '被告席跳出训练', dose: '被质疑时立即使用', instruction: '不回答“你是不是……”，改问具体事实。', example: '请具体说明你指的是哪件事。' },
      { name: '话术拆弹训练', dose: '每次被绕晕时', instruction: '把对方的话翻译成行为。', example: '你现在是在转移问题，不是在解决问题。' },
      { name: '停止长文训练', dose: '睡前严禁', instruction: '不写 800 字自证小作文。', example: '我只回应事实，不回应揣测。' },
    ],
    weakPoint: '自证核心：█████░░░░░，被质疑时容易自动坐上被告席。',
    recoveryGoal: '停止证明自己是好人，训练只回应事实和要求。',
    dailyExercises: [
      { name: '被告席跳出训练', load: '被质疑时立即使用', instruction: '不回答“你是不是……”，改问具体事实。', example: '请具体说明你指的是哪件事。' },
      { name: '话术拆弹训练', load: '每次被绕晕时', instruction: '把对方的话翻译成行为。', example: '你现在是在转移问题，不是在解决问题。' },
      { name: '停止长文训练', load: '睡前严禁', instruction: '不写 800 字自证小作文。', example: '我只回应事实，不回应揣测。' },
    ],
    emergencyMove: { skill: '【话术拆解】', cooldown: '0 秒', usage: '“请回到具体事实。”', effect: '立即切断 PUA、激将和责任转移。' },
    forbiddenBehavior: '禁止为了证明自己是好人，把方向盘交给胡搅蛮缠的人。',
    completionBadge: '不自证核心稳定 Lv.1',
    warning: '禁止为了证明自己是好人，把方向盘交给胡搅蛮缠的人。',
  },
  exit: {
    id: 'exit',
    dimension: 'exit',
    title: '撤退神经康复处方',
    diagnosis: '检测到你的退出按钮存在延迟响应。\n委员会建议进行“停止投入、停止解释、停止回头”训练。',
    exercises: [
      { name: '最后一次识别训练', dose: '每段关系最多 1 次', instruction: '不要无限发放最后一次机会。', example: '这次之后，如果再次发生，我就退出。' },
      { name: '沉没成本切断训练', dose: '每次不甘心时', instruction: '已投入不等于必须继续投入。', example: '我已经损失了时间，不能继续损失更多时间。' },
      { name: '撤离后闭嘴训练', dose: '退出后 72 小时', instruction: '不写长文，不复盘给对方看，不重新谈判。', example: '我已经决定不继续了，之后不再讨论。' },
    ],
    weakPoint: '退出按钮：████░░░░░░，容易把不甘心误判成还值得。',
    recoveryGoal: '建立及时止损反射，停止把沉没成本当未来投资。',
    dailyExercises: [
      { name: '最后一次识别训练', load: '每段关系最多 1 次', instruction: '不要无限发放最后一次机会。', example: '这次之后，如果再次发生，我就退出。' },
      { name: '沉没成本切断训练', load: '每次不甘心时', instruction: '已投入不等于必须继续投入。', example: '我已经损失了时间，不能继续损失更多时间。' },
      { name: '撤离后闭嘴训练', load: '退出后 72 小时', instruction: '不写长文，不复盘给对方看。', example: '我已经决定不继续了，之后不再讨论。' },
    ],
    emergencyMove: { skill: '【沉没成本切断】', cooldown: '1 次判断', usage: '“继续投入不会让之前的损失变小。”', effect: '停止循环复盘，启动撤离程序。' },
    forbiddenBehavior: '禁止把“不甘心”伪装成“我还想再努力一下”。',
    completionBadge: '撤退神经修复 Lv.1',
    warning: '禁止把“不甘心”伪装成“我还想再努力一下”。',
  },
  boundary: {
    id: 'boundary',
    dimension: 'boundary',
    title: '边界闭合康复处方',
    diagnosis: '检测到你的边界门禁系统经常自动放行。\n委员会建议进行拒绝、句号和责任归还训练。',
    exercises: [
      { name: '三字拒绝训练', dose: '每日 1 组', instruction: '不用解释完整人生，只说结果。', example: '不方便。' },
      { name: '责任归还训练', dose: '别人甩锅时立即使用', instruction: '把对方的任务还给对方。', example: '这部分本来属于你的职责，我不接。' },
      { name: '句号训练', dose: '每次想补充解释时', instruction: '少用“因为”，多用句号。', example: '这次我不参加。' },
    ],
    weakPoint: '边界系统：██████░░░░，请求靠近时门禁容易自动放行。',
    recoveryGoal: '建立清晰边界，降低无效责任摄入。',
    dailyExercises: [
      { name: '三字拒绝训练', load: '3 次 / 天', instruction: '不用解释完整人生，只说结果。', example: '不方便。' },
      { name: '责任归还训练', load: '遇到甩锅立即执行', instruction: '把对方的任务还给对方。', example: '这部分本来属于你的职责，我不接。' },
      { name: '句号训练', load: '每次想解释时 1 次', instruction: '少用“因为”，多用句号。', example: '这次我不参加。' },
    ],
    emergencyMove: { skill: '【边界展开】', cooldown: '0 秒', usage: '“不方便。”', effect: '立即停止无效请求输入。' },
    forbiddenBehavior: '禁止把别人的失望自动登记成你的责任。',
    completionBadge: '边界系统修复 Lv.1',
    warning: '禁止把别人的失望自动登记成你的责任。',
  },
}

export function getTopDimension(scores: Record<Dimension, number>) {
  return (Object.entries(scores) as [Dimension, number][])
    .sort((a, b) => b[1] - a[1])[0][0]
}

export function selectRehabPrescription(score: number, scores: Record<Dimension, number>) {
  if (score === 0) return { topDimension: 'candidate' as const, topDimensionLabel: '候补 Karen 上岗热身', prescription: candidateKarenPrescription }
  const topDimension = getTopDimension(scores)
  return { topDimension, topDimensionLabel: dimensionLabels[topDimension], prescription: rehabPrescriptions[topDimension] }
}

export function buildRxNumber(mbti: string, score: number, agents: Character[]) {
  const seed = `${mbti}-${score}-${agents.map((agent) => agent.code).join('-') || 'candidate'}`
  let hash = 0
  for (const char of seed) hash = (hash * 31 + char.charCodeAt(0)) % 100000
  return String(hash).padStart(5, '0')
}

export function rehabExerciseNames(prescription: RehabPrescription) {
  return prescription.dailyExercises.map((exercise) => exercise.name).join('、')
}

export function formatRehabPrescription({ userName, score, rxNumber, topDimensionLabel, prescription }: { userName: string; score: number; rxNumber: string; topDimensionLabel: string; prescription: RehabPrescription }) {
  return `银河系争气委员会康复处
处方编号：GCC-RX-${rxNumber}

登记名：${userName}
窝囊值：${score}%
最高弱项：${topDimensionLabel}
处方名称：${prescription.title}

诊断：
${prescription.diagnosis}

弱点：
${prescription.weakPoint}

恢复目标：
${prescription.recoveryGoal}

训练项目：
${prescription.dailyExercises.map((exercise, index) => `${index + 1}. ${exercise.name}
训练量：${exercise.load}
指令：${exercise.instruction}
示例：${exercise.example}`).join('\n\n')}

紧急技能：
${prescription.emergencyMove.skill}
冷却时间：${prescription.emergencyMove.cooldown}
使用方式：${prescription.emergencyMove.usage}
效果：${prescription.emergencyMove.effect}

禁止行为：
${prescription.forbiddenBehavior}

训练完成奖励：
${prescription.completionBadge}
银河系争气委员会认证

警示语：
${prescription.warning}`
}
