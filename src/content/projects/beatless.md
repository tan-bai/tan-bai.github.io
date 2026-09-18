---
kind: opensource
name: Beatless
tagline: 自治式多智能体科研系统
role: Co-author
date: 2026.3 – 至今
links:
  - { label: CrepuscularIRIS/Beatless, url: https://github.com/CrepuscularIRIS/Beatless }
  - { label: 20bytes/Beatless-for-codex, url: https://github.com/20bytes/Beatless-for-codex }
paras:
  - '针对个人科研中文献追踪、研究迭代等长周期任务高度依赖人工维护、单一模型自评易陷同源偏见的痛点，构建自治式多智能体科研系统 <b>Hermes Constellation</b>：以 Hermes Agent（Kimi K2.6 为大脑）做常驻调度，按 Cron 唤醒 10 个定时任务，覆盖多源论文采集、六阶段自治研究循环、博客中英对译与自动开源 PR 提交。'
  - '论文管线整合 arXiv、OpenReview、CVF 与 ACL Anthology 四源，去重后入库 Zotero 并同步 Obsidian；自治研究循环按 init → survey → axiom → propose → dispatch → loop → review 七阶段运行实验 workspace，直到 SOTA、budget 或 BLOCK 条件触发停止。核心方法学是把「写」和「审」严格拆给不同模型族（Codex 看正确性、Gemini 看架构、Sonnet 做对抗），所有产出过 8 项打分卡 + 三方独立评审，均值不足 7 分自动撤回。'
stats:
  - { label: 近 7 天提交 PR, value: 34 }
  - { label: 合并率, value: 41.5% }
  - { label: 论文提取吞吐, value: 144 篇/天 }
---

**近期数据**：7 天内向 53 个开源仓库（Python / Rust / Go / TypeScript）提交 34 个 PR、合并 10 个；论文摩擦点提取吞吐 144 篇/天。所有规约、Skills、Pipelines 与 Commands 以 MIT 开源，可被其他 Agent 项目直接复用。
