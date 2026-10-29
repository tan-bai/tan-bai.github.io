/*
 * 全站文案集中在此，页面与组件只负责排版。
 * 事实依据 src/content/projects/*.md 与简历仓库（cv-private）；
 * 标注 NOTE 的条目需本人确认。
 * 中英文之间手动留半角空格；日期统一写作 2026.07。
 */

export interface MediaItem {
  video?: string;
  image?: string;
  caption?: string;
}
export interface Stat {
  value: string;
  label: string;
}
export interface Link {
  label: string;
  url: string;
}
export interface Step {
  title: string;
  detail: string;
}
export interface Project {
  id: string;
  title: string;
  org?: string;
  role?: string;
  date?: string;
  summary: string;
  points?: string[];
  pipeline?: Step[];
  stats?: Stat[];
  tags?: string[];
  outcome?: string;
  links?: Link[];
  media?: MediaItem[];
  /** 没有影像也没有数字时，用一句话占位，保证同排卡片对齐 */
  placard?: string;
  /** 竞赛 / 合作方徽标，显示在标题上方 */
  brand?: { name: string; logo: string };
}
export interface Pillar {
  id: string;
  no: string;
  name: string;
  thesis: string;
  /** 大图并排的重点项目；多个时左右交替 */
  features?: Project[];
  /** 次要项目上方的小标题；设置后次要项目以纯文字卡片呈现 */
  moreLabel?: string;
  projects: Project[];
  layout?: 'cards' | 'compact';
}

export const profile = {
  siteTitle: '项目集',
  name: '房家辉',
  nameEn: 'Jiahui Fang',
  // 每项一段；[文字](#id) 渲染为指向下方项目的链接，**文字** 渲染为加粗
  bio: [
    '我目前在探索两个方向：**具身智能**，包括视\u2060觉\u2060语\u2060言\u2060导\u2060航\u2060（VLN）与世\u2060界\u2060模\u2060型\u2060（World\u00A0Model）；以及 **AI for AI**，涵盖自动化科研与递\u2060归\u2060自\u2060我\u2060改\u2060进\u2060（RSI）。本科期间加入机器人与智能制造实验室；此后在[浙江大学 FAST Lab](#badminton) 科研实习，2026 年夏在上海侏罗兽科技担任算法实习生。',
    '在机器人方向，我在[宇树 G1](#unitree) 与[智元灵犀 X2](#humanoid-pipeline) 人形机器人真机上做过开发与部署；在 AI for AI 方向，参与了[明镜](#mingjing)\u2060（字节跳动 AI 全栈挑战赛）与 [Proma](#proma)\u2060（挑战杯 · 阿里云榜题）。视觉感知是我更早的主线，代表工作是~[复杂场景下**无人机架空输电线路覆冰检测**](#icing)\u2060（项目负责人）与~[基于曲率感知和高斯对齐的**红外小目标检测网络** LCGA-Net](#lcga-net)\u2060（主要负责人）。',
  ],
  education: [
    {
      school: '东南大学',
      schoolEn: 'Southeast University',
      logo: '/icons/seu.png',
      detail: '电子信息 · 硕士研究生 · 推免',
      date: '',
    },
  ],
  status: '正在寻找科研与工程实习',
  email: 'jiahui.fang@ieee.org',
  github: 'https://github.com/20bytes',
  blog: 'https://20bytes.top',
  photo: '/media/profile-photo.png',
};

/* ------------------------------------------------------------------ */
/* 代表项目：按影响力排序                                                */
/* ------------------------------------------------------------------ */

const humanoid: Project = {
  id: 'humanoid-pipeline',
  title: '端到端人形机器人运动链路',
  org: '上海侏罗兽 · 机器人初创公司',
  role: '算法实习生 · 项目负责人',
  date: '2026.07 – 2026.08',
  summary:
    '独立牵头打通从人体视频到真机策略的完整链路：动作提取、动作重定向、强化学习训练与 Sim2Real 部署，在智元 X2 人形机器人上端到端落地。',
  pipeline: [
    { title: '动作提取', detail: 'GVHMR / PromptHMR 从单目人体视频中恢复 SMPL 人体动作。' },
    { title: '动作重定向', detail: 'AMASS 格式动作映射到 X2 运动学结构，生成 Isaac / MuJoCo 参考轨迹。' },
    { title: '强化学习训练', detail: '基于 HumanoidPolicyLab 在 MuJoCo 中训练动作跟踪策略，单次约 4.5 小时；在 32 卡 H200 集群上完成多卡训练与任务调度。' },
    { title: 'Sim2Real 部署', detail: '导出 ONNX 策略，经 AIMDK 部署至 X2 控制器；以真机日志与故障信息驱动诊断。' },
  ],
  tags: ['智元 X2', 'GVHMR', 'PromptHMR', 'SMPL / AMASS', 'MuJoCo', 'Isaac', '强化学习', 'ONNX', 'AIMDK', '32×H200'],
  media: [
    { video: '/media/x2-realrobot.mp4', caption: '智元 X2 真机行走与转向，实验室部署现场实录。' },
    { video: '/media/x2-internship.mp4', caption: 'MuJoCo 回放：X2 跟踪重定向后的参考动作。' },
    { video: '/media/x2-maiguai2.mp4', caption: 'PromptHMR 从视频中提取人体姿态，是重定向链路的前端。' },
  ],
};

const robotics: Project[] = [
  {
    id: 'badminton',
    title: '羽毛球轮足机器人',
    org: '浙江大学 FAST Lab',
    role: '科研实习生',
    date: '2025.08 – 2026.01',
    summary:
      '受 ETH Zürich 羽毛球足式机器人启发，团队研发能回击高速来球的轮足机器人，与人真实对打。我负责动捕数据一侧：大规模动捕数据处理与动作映射，为来球轨迹预测与击球控制提供数据支撑。',
    points: [
      '使用 MOKKA 与 PlotJuggler 完成动捕轨迹校验与多源时序数据对齐。',
      '把采集到的动作转为机器人可用的参考数据，并产出供控制调试的可视化视图。',
    ],
    tags: ['动作捕捉', '动作映射', 'MOKKA', 'PlotJuggler', '轨迹预测'],
    placard: '动作捕捉 → 动作映射 → 轨迹预测 → 击球',
  },
  {
    id: 'unitree',
    title: '宇树人形机器人：从仿真到真机',
    org: '上师大机器人实验室 · ROS 暑期学校',
    role: '实验室成员 · 学员',
    date: '2024 – 2025',
    summary:
      '为实验室从零搭建宇树人形机器人仿真环境（Isaac Gym、unitree_rl_gym）；暑期学校中在宇树 G1 真机上完成调试与操作：ROS 2、SDK 动作编程、RealSense + YOLO 视觉感知、Mid-360 + FAST-LIO 建图。',
    tags: ['Isaac Gym', 'unitree_rl_gym', 'PPO', 'ROS 2', '宇树 G1', 'FAST-LIO'],
    outcome: '发明专利申请：基于增强型对抗运动先验的双足机器人步态生成方法（CN120595629A，排名 3）',
    media: [{ video: '/media/bipedal.mp4', caption: '仿真中训练的双足行走策略。' }],
  },
  {
    id: 'pi0',
    title: 'π0 视觉-语言-动作模型复现',
    role: '独立复现',
    date: '2026.05 –',
    summary:
      '依据论文独立实现 π0 的多模态编码器、流匹配动作专家与 π0-FAST 动作分词，并基于 openpi 在 LIBERO 上完成评测。',
    stats: [{ value: '9 / 10', label: 'LIBERO 回合成功' }],
    tags: ['VLA', 'π0', '流匹配', 'openpi', 'LIBERO'],
    media: [{ video: '/media/pi0-libero.mp4', caption: 'π0 在 LIBERO 上的执行过程（模型 224×224 视角）。' }],
  },
];

const beatless: Project = {
  id: 'beatless',
  title: 'Beatless · 自治科研 Agent 系统',
  role: '共同作者',
  date: '2026.03 –',
  summary:
    '自主运行的多智能体科研系统：常驻调度器按计划唤醒 10 个定时任务，完成论文采集、七阶段研究循环，并向真实开源仓库提交 PR。',
  points: [
    '“写”与“审”拆给不同模型族：Codex 查正确性，Gemini 看架构，Sonnet 做对抗；评分低于 7 分的产出自动撤回。',
  ],
  stats: [
    { value: '34', label: '7 天内提交 PR，覆盖 53 个仓库' },
    { value: '41.5%', label: 'PR 合并率' },
    { value: '144', label: '每日处理论文篇数' },
  ],
  links: [
    { label: 'Beatless', url: 'https://github.com/CrepuscularIRIS/Beatless' },
    { label: 'Beatless-for-codex', url: 'https://github.com/20bytes/Beatless-for-codex' },
  ],
};

const mingjing: Project = {
  id: 'mingjing',
  title: '明镜 · 证据可审计的研究 Agent',
  brand: { name: '字节跳动 AI 全栈挑战赛', logo: '/icons/bytedance-color.svg' },
  role: '核心成员',
  // NOTE: 仓库中没有名次与参赛时间记录，确认后补充。
  summary:
    '基于 LangGraph 的竞品分析多智能体系统。LLM 只负责提出声明，独立的 QA Agent 用确定性规则裁决：引用必须是来源原文的逐字子串，否则打回并触发新一轮真实采集，证据等级由 weak 逐轮升至 strong。报告里每条结论都能点回原文出处与采纳理由。',
  pipeline: [
    { title: 'Collector 采集', detail: '搜索、robots 检查与带 SSRF 防护的抓取，来源上限随修订轮次递增。' },
    { title: 'Analyst 分析', detail: '每个字段只调用一次 LLM，网页文本装入 UNTRUSTED 信封隔离。' },
    { title: 'QA 门禁', detail: '只看证据、不看推理；七项确定性检查全程无 LLM，提示注入无法改判。' },
    { title: 'Writer 成文', detail: '只投影过审声明，没有依据的结论进不了报告。' },
  ],
  stats: [
    { value: '883', label: '后端测试，无需 API Key' },
    { value: '7', label: '项确定性 QA 规则' },
    { value: '+42%', label: '旗舰跑批修复增益' },
  ],
  tags: ['LangGraph', 'FastAPI', 'React 19', 'Pydantic v2', 'SearXNG', '豆包', 'MiniMax', 'Docker'],
  links: [
    { label: 'GitHub', url: 'https://github.com/CrepuscularIRIS/mingjing' },
    { label: '在线演示', url: 'https://crepusculariris.github.io/mingjing' },
  ],
  media: [{ video: '/media/mingjing-clip.mp4', caption: '明镜发布视频（节选）。' }],
};

const proma: Project = {
  id: 'proma',
  title: 'Proma · AI Scientist 平台',
  brand: { name: '挑战杯揭榜挂帅 · 阿里云榜题', logo: '/icons/qwen-color.svg' },
  role: '核心成员',
  date: '2026.05 – 2026.09',
  // NOTE: 仓库中没有名次记录，确认后补充。
  summary:
    '榜题「基于国产开源大模型的 AI Scientist 的研发与应用」的参赛作品。Electron 桌面端负责会话，Prime Agent（Pi Agent 分支）负责执行，按赛题要求经百炼 DashScope 调用 Qwen；整套系统 docker compose 一键启动。',
  pipeline: [
    { title: '数据源编排', detail: 'MCP 统一接入检索与数据源，为研究提供可追溯的证据。' },
    { title: '任务定义', detail: 'Research Skills 把研究问题拆成可执行、可校验的步骤。' },
    { title: '判伪实验', detail: '先跑能推翻假设的实验，再迭代结论。' },
    { title: '可复现交付', detail: '产出可复现的研究产物，对应评分中的校验迭代与可复现性。' },
  ],
  points: [
    '将 Proma 迁移到 Prime Agent 运行时：浏览器与桌面窗口共用渲染层，preload IPC 改为 WebSocket 桥，差异收敛在一个适配层。',
    '容器内以 Xvfb 提供无头显示，真实 Electron 主进程可在 Docker 中运行；monorepo 六个工作区全部通过类型检查。',
  ],
  tags: ['Electron', 'React', 'TypeScript', 'Qwen', 'DashScope', 'MCP', 'Docker'],
  links: [{ label: 'GitHub', url: 'https://github.com/CrepuscularIRIS/crucible' }],
  media: [{ video: '/media/proma-clip.mp4', caption: 'Proma 参赛演示（节选）。' }],
};

const agents: Project[] = [
  beatless,
  {
    id: 'polaris',
    title: 'Polaris · AI 论文数据集',
    role: '作者',
    date: '2026.05 –',
    // NOTE: 需求写的是“被 CCF 会议接收”；现有材料只说明覆盖 CCF 会议。
    summary:
      '覆盖 11 个 AI 顶会（1982–2026）共 15.5 万篇论文，跨 DBLP、CVF、ACL Anthology、OpenReview 与 PMLR 去重融合，提供语义检索、RAG 与“方法–数据集–任务”知识图谱，同时是 Beatless 的数据底座。',
    stats: [
      { value: '155K', label: '论文总量' },
      { value: '92.2%', label: '摘要覆盖率' },
      { value: '59K', label: '知识图谱三元组' },
    ],
    links: [
      { label: 'GitHub', url: 'https://github.com/20bytes/Polaris' },
      { label: 'Hugging Face', url: 'https://huggingface.co/datasets/beatless-ai/polaris-ccf' },
    ],
  },
];

const vision: Project[] = [
  {
    id: 'icing',
    title: '无人机输电线路覆冰检测',
    role: '项目负责人',
    date: '2024.10 – 2025.10',
    summary:
      '端云协同巡检：无人机端 Jetson AGX Xavier 部署剪枝与 PPQ 量化后的 YOLOv12-tiny，在雨雪雾霾中定位覆冰；云端以 QLoRA 微调的多模态大模型结合 RAGFlow，判别覆冰类型并生成除冰方案。',
    stats: [
      { value: '98.4%', label: 'mAP50' },
      { value: '30M', label: '量化后模型' },
    ],
    outcome: '“挑战杯”上海市一等奖（第一完成人）· 软件著作权授权',
    links: [{ label: 'detection-web', url: 'https://github.com/20bytes/detection-web' }],
    media: [{ image: '/media/powerline-icing.webp', caption: '端云协同覆冰检测系统。' }],
  },
  {
    id: 'posture',
    title: '人体姿态估计 · 坐姿矫正台灯',
    org: '全国大学生物联网设计竞赛（华为杯）',
    role: '项目负责人',
    date: '2024.04 – 2024.08',
    summary:
      '自主训练 YOLOv8 姿态模型，通过台灯摄像头实时计算颈背夹角并语音提醒不良坐姿；OCR 结合本地 Qwen2-7B 实现拍照答疑。',
    outcome: '全国二等奖（第一完成人）',
    media: [{ image: '/media/study-lamp.jpg', caption: 'ESP32-S3 学习台灯原型。' }],
  },
  {
    id: 'lcga-net',
    title: '红外小目标检测',
    role: '核心成员',
    date: '2025.03 – 2025.08',
    summary:
      'LCGA-Net：Hessian 曲率感知突出微弱边缘，显著性聚焦模块抑制背景杂波，高斯径向对齐损失提升中心定位精度。',
    stats: [
      { value: '86.5%', label: 'IRSTD-1K AP50（+5.5）' },
      { value: '2.92M', label: '参数量' },
      { value: '204', label: 'FPS' },
    ],
    outcome: '第一作者工作论文',
    media: [{ image: '/media/lcga-net.webp', caption: 'LCGA-Net 网络结构。' }],
  },
  {
    id: 'safe-detr',
    title: '无人机航拍小目标检测',
    role: '本科毕业设计',
    date: '2026.02 – 2026.05',
    summary:
      'SAFE-DETR 端到端实时检测框架：Haar 小波下采样保留小目标细节，尺度协同融合贯穿 CCFM 全部融合节点；以 TensorRT INT8 部署至 Jetson Nano，并搭建 Vue + FastAPI 可视化平台。',
    stats: [
      { value: '+6.3', label: 'AP50，对比 YOLOv8s' },
      { value: '+4.27%', label: 'APs 相对提升' },
    ],
    outcome: '毕业论文获评 A',
  },
];

const hardware: Project[] = [
  {
    id: 'signal',
    title: '无线传输信号模拟系统',
    org: '全国大学生电子设计竞赛',
    summary: 'STM32F407 主控，AD9959 直接数字合成载波，AD835 完成调幅，AGC 稳幅输出；负责电路焊接、同轴走线与 AD9959 驱动。',
    media: [{ image: '/media/signal-system.jpg', caption: '信号模拟系统电路板。' }],
  },
  {
    id: 'smart-car',
    title: '电磁循迹小车',
    org: '智能车竞赛',
    summary: '霍尔传感器阵列识别磁条，PID 闭环差速转向，STM32 主控；从原理图到焊接，复现并拓展了电路板。',
    media: [{ image: '/media/smart-car.jpg', caption: '电磁循迹小车。' }],
  },
  {
    id: 'tw-msd',
    title: 'TW-MSD 加法器 · FPGA',
    org: '教师科研课题',
    summary: 'Verilog 实现 TW-MSD 加法器，进位链更短，比行波进位加法器快两个时钟沿。',
    media: [{ image: '/media/tw-msd.jpg', caption: 'TW-MSD 加法器 FPGA 时序。' }],
  },
  {
    id: 'visual-aid',
    title: '无障碍视觉辅助系统',
    org: '电子系统设计课程',
    summary: '树莓派摄像头采集画面，Qwen2.5-VL 理解障碍、标识与文字，并语音播报给视障用户。',
    media: [{ image: '/media/accessibility-aid.webp', caption: '无障碍视觉辅助设备。' }],
  },
];

export const pillars: Pillar[] = [
  {
    id: 'robotics',
    no: '01',
    name: '具身智能与机器人',
    thesis: '让学到的动作，在真实的人形机器人上跑起来。',
    features: [humanoid],
    projects: robotics,
  },
  {
    id: 'agents',
    no: '02',
    name: 'AI for AI · 自动化科研',
    thesis: '做科研的 Agent，每个结论都要有证据。',
    features: [mingjing, proma],
    moreLabel: '更多 Agent 项目',
    projects: agents,
  },
  {
    id: 'vision',
    no: '03',
    name: '计算机视觉与感知',
    thesis: '小模型、小目标、跑在边缘端。',
    projects: vision,
  },
  {
    id: 'hardware',
    no: '04',
    name: '硬件与嵌入式系统',
    thesis:
      '电子信息工程本科：电路设计、嵌入式开发与工程竞赛。这份底子，让边缘部署与真机调试都不陌生。',
    projects: hardware,
    layout: 'compact',
  },
];

/** 实践过的检测范式，从早到晚 */
export const lineage = [
  { name: 'YOLOv5', note: '基于锚框' },
  { name: 'YOLOv8', note: '无锚框' },
  { name: 'YOLOv11', note: '无锚框' },
  { name: 'DETR', note: '端到端' },
  { name: 'D-FINE', note: '端到端 · 精细回归' },
];

/* ------------------------------------------------------------------ */
/* 成长路径：按时间顺序                                                  */
/* ------------------------------------------------------------------ */

export interface Milestone {
  date: string;
  title: string;
  detail?: string;
  href?: string;
}
export interface Stage {
  no: string;
  name: string;
  span: string;
  line: string;
  items: Milestone[];
}

export const timeline: Stage[] = [
  {
    no: 'I',
    name: '电子硬件与嵌入式',
    span: '2022 – 2024',
    line: '电路、单片机，还有一场接一场的竞赛。',
    items: [
      { date: '2023 – 2024', title: '竞赛硬件作品', detail: '信号模拟系统、电磁循迹小车、FPGA 加法器', href: '#hardware' },
      { date: '2023.08', title: '全国大学生物联网设计竞赛（华为杯）华东赛区', detail: '赛区一等奖（第一完成人）' },
      { date: '2024.07', title: '全国大学生集成电路创新创业大赛华东赛区', detail: '省级二等奖' },
    ],
  },
  {
    no: 'II',
    name: '视觉感知',
    span: '2024 – 2026',
    line: '先把模型装进设备，再让它看清小目标。',
    items: [
      { date: '2024.04 – 2024.08', title: '坐姿矫正台灯', detail: 'YOLOv8 姿态估计 · 华为杯全国二等奖', href: '#posture' },
      { date: '2024.10 – 2025.10', title: '无人机覆冰检测', detail: '端云协同系统，项目负责人 · 挑战杯上海市一等奖', href: '#icing' },
      { date: '2025.03 – 2025.08', title: 'LCGA-Net', detail: '红外小目标检测', href: '#lcga-net' },
      { date: '2026.02 – 2026.05', title: 'SAFE-DETR', detail: '无人机航拍小目标检测，本科毕业设计', href: '#safe-detr' },
    ],
  },
  {
    no: 'III',
    name: '具身机器人',
    span: '2024 – 2026',
    line: '从仿真里的双足，到真实的人形机器人。',
    items: [
      { date: '2024.08 – 2024.09', title: '上师大机器人实验室', detail: '从零搭建宇树人形机器人仿真环境', href: '#unitree' },
      { date: '2025.07', title: 'ROS 暑期学校', detail: '宇树 G1 真机调试与操作', href: '#unitree' },
      { date: '2025.08 – 2026.01', title: '浙江大学 FAST Lab', detail: '羽毛球轮足机器人：动捕数据处理与动作映射', href: '#badminton' },
      { date: '2026.07 – 2026.08', title: '上海侏罗兽', detail: '牵头打通从视频到 Sim2Real 的人形机器人链路', href: '#humanoid-pipeline' },
    ],
  },
  {
    no: 'IV',
    name: 'AI for AI',
    span: '2026 –',
    line: '会读论文、做实验、提 PR 的 Agent。',
    items: [
      { date: '2026.03', title: 'Beatless', detail: '自治科研与自动 PR Agent 系统', href: '#beatless' },
      { date: '2026.05', title: 'Polaris', detail: '15.5 万篇论文数据集与知识图谱', href: '#polaris' },
      { date: '2026.05 – 2026.09', title: 'Proma', detail: '挑战杯揭榜挂帅 · 阿里云榜题', href: '#proma' },
      { date: '2026.09', title: '东南大学', detail: '电子信息硕士研究生入学' },
    ],
  },
];

/* ------------------------------------------------------------------ */
/* 荣誉与成果                                                           */
/* ------------------------------------------------------------------ */

export const honors = [
  { date: '2026.05', name: '上海市优秀毕业生' },
  { date: '2025.12', name: '国家奖学金' },
  // NOTE: 各来源日期不一致（简历 2026.12，旧站 2025.12），暂不标日期。
  { date: '', name: '上海市奖学金' },
];

export const awards = [
  { medal: '🏅', date: '2025.11', name: '上海市级大学生创新创业训练计划', note: '优秀结项 · 第一完成人' },
  { medal: '🥉', date: '2025.08', name: '中国机器人与人工智能大赛省级选拔赛', note: '省级三等奖 · 第一完成人' },
  { medal: '🥈', date: '2025.06', name: '上海市大学生计算机应用能力大赛', note: '省级二等奖 · 第一完成人' },
  { medal: '🥇', date: '2025.05', name: '“挑战杯”上海市大学生课外学术科技作品竞赛', note: '省级一等奖 · 第一完成人' },
  { medal: '🥈', date: '2024.08', name: '全国大学生物联网设计竞赛（华为杯）', note: '全国二等奖 · 第一完成人' },
  { medal: '🥉', date: '2023.08', name: '全国大学生节能减排社会实践与科技竞赛', note: '全国三等奖 · 第二完成人' },
];

export const patents = [
  { kind: '发明', name: '一种基于增强型对抗运动先验的双足机器人步态生成方法', no: 'CN120595629A · 实审' },
  { kind: '发明', name: '一种基于改进 YOLOv7 的门框识别方法', no: 'CN120726591A · 实审' },
  { kind: '发明', name: '一种基于位姿优化网络的 6-DoF 目标位姿估计方法', no: 'CN120747212A · 实审' },
  { kind: '发明', name: '基于多模态深度学习的帕金森病患智能辅助进食系统', no: 'CN120748020A · 实审' },
  { kind: '实用新型', name: '一种带有热交换通风孔的摄像头加热防护罩', no: '2025204530867 · 已受理' },
  { kind: '软著', name: '输电线路覆冰类型检测系统', no: '2025SR0789268 · 已授权' },
];
