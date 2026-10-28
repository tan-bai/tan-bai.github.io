/*
 * All site copy lives here. Pages and components only lay it out.
 * Facts are drawn from src/content/projects/*.md and the CV (cv-private);
 * lines marked NOTE need the owner's confirmation.
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
  /** Short text shown in place of media when there is no footage or stats. */
  placard?: string;
}
export interface Pillar {
  id: string;
  no: string;
  name: string;
  thesis: string;
  feature?: Project;
  projects: Project[];
  layout?: 'cards' | 'compact';
}

export const profile = {
  name: 'Jiahui Fang',
  nameZh: '房家辉',
  headline: 'Robots and AI agents, built from the hardware up.',
  bio:
    'I started in electrical engineering, taught small vision models to run on edge devices, and now work on humanoid motion learning and autonomous research agents. I like problems that end on real hardware or in a merged pull request.',
  education: [
    { school: 'Southeast University', detail: 'Graduate study, Electronic Information', date: '2026 –' },
    { school: 'Shanghai Normal University', detail: 'B.Eng. Electronic Information Engineering · GPA 3.82/4.00 · Rank 1/425', date: '2022 – 2026' },
  ],
  status: 'Open to research & engineering internships',
  email: 'jiahui.fang@ieee.org',
  github: 'https://github.com/20bytes',
  blog: 'https://20bytes.top',
  photo: '/media/profile-photo.png',
};

/* ------------------------------------------------------------------ */
/* Featured work, ordered by impact                                    */
/* ------------------------------------------------------------------ */

const humanoid: Project = {
  id: 'humanoid-pipeline',
  title: 'End-to-End Humanoid Motion Pipeline',
  org: 'Shanghai Zhuluoshou · robotics startup',
  role: 'Algorithm Intern · Project Lead',
  date: 'Jul – Aug 2026',
  summary:
    'Led the full path from a human video to a policy running on a real humanoid — motion extraction, retargeting, reinforcement learning and Sim2Real deployment on AgiBot X2 — and owned it end to end.',
  pipeline: [
    { title: 'Motion extraction', detail: 'GVHMR / PromptHMR recover SMPL body motion from monocular human video.' },
    { title: 'Retargeting', detail: 'AMASS-format motion mapped onto X2 kinematics as Isaac / MuJoCo reference trajectories.' },
    { title: 'RL training', detail: 'Motion-tracking policies trained with HumanoidPolicyLab in MuJoCo, about 4.5 h per run.' },
    { title: 'Sim2Real', detail: 'ONNX policies deployed to the X2 controller via AIMDK; robot logs and fault bundles drive diagnosis.' },
  ],
  tags: ['AgiBot X2', 'GVHMR', 'PromptHMR', 'SMPL / AMASS', 'MuJoCo', 'Isaac', 'RL', 'ONNX', 'AIMDK'],
  media: [
    { video: '/media/x2-realrobot.mp4', caption: 'Real-robot walking and turning on AgiBot X2, recorded in the lab.' },
    { video: '/media/x2-internship.mp4', caption: 'MuJoCo playback: X2 tracking a retargeted reference motion.' },
    { video: '/media/x2-maiguai2.mp4', caption: 'PromptHMR pose extraction from video, the front end of the retargeting pipeline.' },
  ],
};

const robotics: Project[] = [
  {
    id: 'badminton',
    title: 'Humanoid Robot Badminton',
    org: 'ZJU FAST Lab',
    role: 'Research Intern',
    date: 'Aug 2025 – Jan 2026',
    // NOTE: the brief says "humanoid"; earlier site copy described a LimX wheeled-legged platform.
    summary:
      'Inspired by ETH Zürich’s badminton-playing legged robot, the team builds a robot that returns high-speed shuttles. I owned the motion-capture side: large-scale MoCap processing and motion mapping that feed trajectory prediction and strike control.',
    points: [
      'Validated MoCap trajectories and aligned multi-source time series with MOKKA and PlotJuggler.',
      'Turned captured motion into robot-ready references and diagnostic views for control tuning.',
    ],
    tags: ['Motion capture', 'Motion mapping', 'MOKKA', 'PlotJuggler', 'Trajectory prediction'],
    placard: 'Motion capture → motion mapping → trajectory prediction → strike',
  },
  {
    id: 'unitree',
    title: 'Unitree Humanoids, Simulation to Hardware',
    org: 'SHNU Robotics Lab · ROS Summer School',
    role: 'Lab member · Trainee',
    date: '2024 – 2025',
    summary:
      'Built the lab’s Unitree humanoid simulation environment from scratch on Isaac Gym and unitree_rl_gym, then debugged and operated a real Unitree G1 at summer school: ROS 2, SDK motion programming, RealSense + YOLO perception and Mid-360 + FAST-LIO mapping.',
    tags: ['Isaac Gym', 'unitree_rl_gym', 'PPO', 'ROS 2', 'Unitree G1', 'FAST-LIO'],
    outcome: 'Invention patent application on bipedal gait generation with adversarial motion priors (CN120595629A, 3rd inventor)',
    media: [{ video: '/media/bipedal.mp4', caption: 'Bipedal locomotion policy trained in simulation.' }],
  },
  {
    id: 'pi0',
    title: 'π0 Vision-Language-Action Reproduction',
    role: 'Independent study',
    date: 'May 2026 –',
    summary:
      'Re-implemented π0’s multimodal encoder, flow-matching action expert and π0-FAST action tokenization from the papers, then evaluated with openpi on LIBERO.',
    stats: [{ value: '9 / 10', label: 'LIBERO episodes solved' }],
    tags: ['VLA', 'π0', 'Flow matching', 'openpi', 'LIBERO'],
    media: [{ video: '/media/pi0-libero.mp4', caption: 'π0 rollout on LIBERO, seen from the model’s 224×224 camera.' }],
  },
];

const beatless: Project = {
  id: 'beatless',
  title: 'Beatless · Autonomous Research Agents',
  role: 'Co-author',
  date: 'Mar 2026 –',
  summary:
    'A self-running multi-agent research system. A resident scheduler wakes ten cron jobs that collect papers, run a seven-stage research loop and open pull requests against real open-source repositories.',
  points: [
    'Writing and reviewing are split across model families — Codex checks correctness, Gemini architecture, Sonnet argues the other side. Output scoring under 7/10 on an eight-item rubric is withdrawn automatically.',
    'The paper pipeline merges arXiv, OpenReview, CVF and ACL Anthology into Zotero and Obsidian.',
    'Upstream contributions include promptfoo (★21.6K) and CodeWhale (★35K).',
  ],
  stats: [
    { value: '34', label: 'PRs in 7 days, 53 repos' },
    { value: '41.5%', label: 'merge rate' },
    { value: '144', label: 'papers processed / day' },
  ],
  links: [
    { label: 'Beatless', url: 'https://github.com/CrepuscularIRIS/Beatless' },
    { label: 'Beatless-for-codex', url: 'https://github.com/20bytes/Beatless-for-codex' },
  ],
};

const agents: Project[] = [
  {
    id: 'polaris',
    title: 'Polaris · AI Paper Dataset',
    role: 'Author',
    date: 'May 2026 –',
    // NOTE: the brief says "accepted by a CCF venue"; existing copy only says it covers CCF venues.
    summary:
      '155K papers from eleven top AI venues (1982–2026), deduplicated across DBLP, CVF, ACL Anthology, OpenReview and PMLR, with semantic search, RAG and a method–dataset–task knowledge graph. It is also the data layer under Beatless.',
    stats: [
      { value: '155K', label: 'papers' },
      { value: '92.2%', label: 'abstract coverage' },
      { value: '59K', label: 'graph triples' },
    ],
    links: [
      { label: 'GitHub', url: 'https://github.com/20bytes/Polaris' },
      { label: 'Hugging Face', url: 'https://huggingface.co/datasets/beatless-ai/polaris-ccf' },
    ],
  },
  {
    id: 'mingjing',
    title: 'MingJing · Evidence-Auditable Research Agent',
    org: 'ByteDance AI Full-Stack Challenge',
    role: 'Core contributor',
    // NOTE: placement not recorded in the repo; add it here.
    summary:
      'A LangGraph multi-agent system where the LLM may only propose claims. A rule-based QA agent admits a claim only if its quote is a verbatim substring of the source; otherwise it triggers fresh collection.',
    stats: [{ value: '883', label: 'backend tests, no API key' }],
    links: [
      { label: 'GitHub', url: 'https://github.com/CrepuscularIRIS/mingjing' },
      { label: 'Demo', url: 'https://crepusculariris.github.io/mingjing' },
    ],
    media: [{ video: '/media/mingjing-clip.mp4', caption: 'MingJing release video (excerpt).' }],
  },
  {
    id: 'proma',
    title: 'Proma · AI Scientist Platform',
    org: 'Challenge Cup · Alibaba Cloud track (Qwen)',
    role: 'Core contributor',
    date: 'May – Sep 2026',
    // NOTE: placement not recorded in the repo; add it here.
    summary:
      'An Electron research-agent platform on a forked Pi Agent runtime, calling Qwen through DashScope. Research skills and MCP organize evidence chains and falsification experiments; the whole stack starts with one docker compose.',
    links: [{ label: 'GitHub', url: 'https://github.com/CrepuscularIRIS/crucible' }],
    media: [{ video: '/media/proma-clip.mp4', caption: 'Proma competition demo (excerpt).' }],
  },
];

const vision: Project[] = [
  {
    id: 'icing',
    title: 'UAV Power-Line Icing Detection',
    role: 'Project Lead',
    date: 'Oct 2024 – Oct 2025',
    summary:
      'Edge–cloud inspection. A pruned, PPQ-quantized YOLOv12-tiny on a drone’s Jetson AGX Xavier finds ice through rain, snow and haze; a QLoRA-tuned multimodal LLM with RAGFlow classifies the ice type and drafts de-icing plans.',
    stats: [
      { value: '98.4%', label: 'mAP50' },
      { value: '30M', label: 'quantized model' },
    ],
    outcome: 'Challenge Cup Shanghai, First Prize (first contributor) · software copyright granted',
    links: [{ label: 'detection-web', url: 'https://github.com/20bytes/detection-web' }],
    media: [{ image: '/media/powerline-icing.webp', caption: 'Edge–cloud icing detection system.' }],
  },
  {
    id: 'lcga-net',
    title: 'Infrared Small Target Detection',
    role: 'Core Contributor',
    date: 'Mar – Aug 2025',
    summary:
      'LCGA-Net: Hessian curvature features surface faint edges, a saliency module suppresses clutter, and a Gaussian radial alignment loss sharpens center localization.',
    stats: [
      { value: '86.5%', label: 'AP50 on IRSTD-1K, +5.5' },
      { value: '2.92M', label: 'parameters' },
      { value: '204', label: 'FPS' },
    ],
    outcome: 'First-author working paper',
    media: [{ image: '/media/lcga-net.webp', caption: 'LCGA-Net architecture.' }],
  },
  {
    id: 'safe-detr',
    title: 'Tiny-Object Detection for UAV Imagery',
    role: 'Undergraduate thesis',
    date: 'Feb – May 2026',
    summary:
      'SAFE-DETR, a real-time end-to-end detector: Haar-wavelet downsampling keeps small-object detail and scale-collaborative fusion runs through every CCFM node. Deployed INT8 on a Jetson Nano behind a Vue + FastAPI console.',
    stats: [
      { value: '+6.3', label: 'AP50 vs YOLOv8s' },
      { value: '+4.27%', label: 'APs' },
    ],
    outcome: 'Thesis graded A',
  },
  {
    id: 'posture',
    title: 'Human Pose for a Posture-Aware Lamp',
    org: 'Huawei Cup IoT Design Contest',
    role: 'Project Lead',
    date: 'Apr – Aug 2024',
    summary:
      'A self-trained YOLOv8 pose model watches a student through the lamp’s camera, measures the neck–back angle and speaks up about bad posture; OCR plus a local Qwen2-7B handles homework questions.',
    outcome: 'National Second Prize (first contributor)',
    media: [{ image: '/media/study-lamp.jpg', caption: 'ESP32-S3 study lamp prototype.' }],
  },
];

const hardware: Project[] = [
  {
    id: 'signal',
    title: 'Wireless Signal Simulator',
    org: 'Electronic Design Contest',
    summary: 'STM32F407 drives an AD9959 DDS carrier, AD835 amplitude modulation and an AGC stage. I soldered the boards, routed coax and wrote the DDS driver.',
    media: [{ image: '/media/signal-system.jpg', caption: 'Signal simulator boards.' }],
  },
  {
    id: 'smart-car',
    title: 'Magnetic Line-Following Car',
    org: 'Smart Car Contest',
    summary: 'A Hall-sensor array and PID differential steering on STM32; I redrew and extended the PCB from schematic to soldered board.',
    media: [{ image: '/media/smart-car.jpg', caption: 'Line-following car.' }],
  },
  {
    id: 'tw-msd',
    title: 'TW-MSD Adder on FPGA',
    org: 'Faculty research project',
    summary: 'A Verilog TW-MSD adder with a shorter carry chain — two clock edges faster than ripple-carry.',
    media: [{ image: '/media/tw-msd.jpg', caption: 'TW-MSD adder timing on FPGA.' }],
  },
  {
    id: 'visual-aid',
    title: 'Visual Aid for the Blind',
    org: 'Electronic systems course',
    summary: 'A Raspberry Pi camera streams to Qwen2.5-VL, which describes obstacles, signs and text aloud.',
    media: [{ image: '/media/accessibility-aid.webp', caption: 'Accessible visual aid.' }],
  },
];

export const pillars: Pillar[] = [
  {
    id: 'robotics',
    no: '01',
    name: 'Embodied AI & Robotics',
    thesis: 'Getting learned motion onto real humanoids.',
    feature: humanoid,
    projects: robotics,
  },
  {
    id: 'agents',
    no: '02',
    name: 'AI Agents & Auto-Research',
    thesis: 'Agents that do research, held to evidence.',
    feature: beatless,
    projects: agents,
  },
  {
    id: 'vision',
    no: '03',
    name: 'Computer Vision & Perception',
    thesis: 'Small models that see small things, on the edge.',
    projects: vision,
  },
  {
    id: 'hardware',
    no: '04',
    name: 'Hardware & Embedded Systems',
    thesis:
      'A B.Eng. in Electronic Information Engineering: circuit design, embedded firmware and contest deadlines. It is why edge deployment and real-robot debugging feel familiar.',
    projects: hardware,
    layout: 'compact',
  },
];

/** Detection paradigms worked through, oldest first. */
export const lineage = [
  { name: 'YOLOv5', note: 'anchor-based' },
  { name: 'YOLOv8', note: 'anchor-free' },
  { name: 'YOLOv11', note: 'anchor-free' },
  { name: 'DETR', note: 'end-to-end' },
  { name: 'D-FINE', note: 'end-to-end, refined boxes' },
];

/* ------------------------------------------------------------------ */
/* Timeline: the chronological story                                   */
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
    name: 'EE Hardware & Embedded',
    span: '2022 – 2024',
    line: 'Circuits, microcontrollers and contest deadlines.',
    items: [
      { date: 'Oct 2022', title: 'Shanghai Normal University', detail: 'B.Eng., Electronic Information Engineering' },
      { date: '2023 – 2024', title: 'Contest hardware', detail: 'Signal simulator, line-following car, FPGA adder', href: '#hardware' },
      { date: 'Aug 2023', title: 'Huawei Cup IoT Design Contest, East China', detail: 'Regional First Prize (first contributor)' },
      { date: 'Jul 2024', title: 'IC Innovation & Entrepreneurship Contest, East China', detail: 'Provincial Second Prize' },
    ],
  },
  {
    no: 'II',
    name: 'Visual Perception',
    span: '2024 – 2026',
    line: 'Models moved onto devices, then learned to find small targets.',
    items: [
      { date: 'Apr – Aug 2024', title: 'Posture-aware lamp', detail: 'YOLOv8 pose · Huawei Cup national Second Prize', href: '#posture' },
      { date: 'Oct 2024 – Oct 2025', title: 'UAV icing detection', detail: 'Edge–cloud system, project lead · Challenge Cup First Prize', href: '#icing' },
      { date: 'Mar – Aug 2025', title: 'LCGA-Net', detail: 'Infrared small target detection', href: '#lcga-net' },
      { date: 'Feb – May 2026', title: 'SAFE-DETR', detail: 'UAV tiny-object detection, undergraduate thesis', href: '#safe-detr' },
    ],
  },
  {
    no: 'III',
    name: 'Embodied Robotics',
    span: '2024 – 2026',
    line: 'From simulated legs to real humanoids.',
    items: [
      { date: 'Aug – Sep 2024', title: 'SHNU Robotics Lab', detail: 'Built the Unitree humanoid simulation environment', href: '#unitree' },
      { date: 'Jul 2025', title: 'ROS Summer School', detail: 'Hands-on Unitree G1 debugging and operation', href: '#unitree' },
      { date: 'Aug 2025 – Jan 2026', title: 'ZJU FAST Lab', detail: 'Humanoid badminton, MoCap processing and motion mapping', href: '#badminton' },
      { date: 'Jul – Aug 2026', title: 'Shanghai Zhuluoshou', detail: 'Led video-to-Sim2Real humanoid pipeline', href: '#humanoid-pipeline' },
    ],
  },
  {
    no: 'IV',
    name: 'Autonomous Agents',
    span: '2026 –',
    line: 'Agents that read, experiment and open pull requests.',
    items: [
      { date: 'Mar 2026', title: 'Beatless', detail: 'Autonomous research and PR agents', href: '#beatless' },
      { date: 'May 2026', title: 'Polaris', detail: '155K-paper dataset and knowledge graph', href: '#polaris' },
      { date: 'May – Sep 2026', title: 'Proma', detail: 'Challenge Cup, Alibaba Cloud track', href: '#proma' },
      { date: 'Sep 2026', title: 'Southeast University', detail: 'Graduate study in Electronic Information begins' },
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Recognition                                                         */
/* ------------------------------------------------------------------ */

export const honors = [
  { date: 'May 2026', name: 'Outstanding Graduate of Shanghai' },
  { date: 'Dec 2025', name: 'National Scholarship' },
  // NOTE: date conflicts between sources (CV: Dec 2026, old site: Dec 2025); left undated.
  { date: '', name: 'Shanghai Municipal Scholarship' },
];

export const awards = [
  { date: 'Nov 2025', name: 'Shanghai Undergraduate Innovation Program', result: 'Excellent completion, lead' },
  { date: 'Aug 2025', name: 'China Robotics & AI Competition, provincial', result: 'Third Prize, first contributor' },
  { date: 'Jun 2025', name: 'Shanghai Computer Application Contest', result: 'Second Prize, first contributor' },
  { date: 'May 2025', name: 'Challenge Cup, Shanghai', result: 'First Prize, first contributor' },
  { date: 'Aug 2024', name: 'Huawei Cup IoT Design Contest', result: 'National Second Prize, first contributor' },
];

export const patents = [
  { id: 'CN120595629A', name: 'Bipedal gait generation with enhanced adversarial motion priors' },
  { id: 'CN120747212A', name: '6-DoF object pose estimation with a pose-refinement network' },
  { id: 'CN120726591A', name: 'Door-frame recognition with an improved YOLOv7' },
  { id: 'CN120748020A', name: 'Multimodal assisted-feeding system for Parkinson’s patients' },
];
