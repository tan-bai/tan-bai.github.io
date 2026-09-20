---
title: Proma · 自动化研究 Agent 平台
titleEn: Proma · Research Agent Platform
group: agent
role: 参赛作品
org: Qwen Agent 比赛
date: ""
brief: Qwen 比赛的参赛平台。Proma 做 Electron 桌面端和会话层，Prime Agent（Pi Agent 0.84.2 的 fork）做执行运行时，模型走 DashScope 调 Qwen；上层用 Research Skills 和 MCP 组织证据链、跑判伪实验，docker compose 一键起。
tags: [Proma, Prime Agent, Electron, React, TypeScript, Qwen, DashScope, MCP, Docker]
video: /media/proma-clip.mp4
links:
  - { label: CrepuscularIRIS/crucible, url: https://github.com/CrepuscularIRIS/crucible }
---

<!-- 视频是比赛 1B 阶段的演示：Agent 在真实手机 App 里完成任务指令，带倒计时和计分 -->
<!-- 待补：比赛全称、年份、团队与个人角色、名次 -->

- 把 Proma 从原来的运行时迁到 Prime Agent 上，浏览器和桌面窗口共用一套渲染层，preload IPC 改成 WebSocket 桥，两端的差异全部收在一个 prime-compat 适配文件里；
- 模型侧接 DashScope 的 Qwen 通道，从 registerProvider 到 getModel 再到 getAuth 逐步调通，thinkingFormat 按 qwen 的格式处理；
- 研究流程围绕证据链：MCP 编排数据源，Research Skills 定义任务，先跑判伪实验再迭代结论，最后交付可复现的产物；
- 容器里用 Xvfb 起了一个无头显示器，让真实的 Electron 主进程能在 Docker 里运行；monorepo 六个工作区全部过 typecheck；
- Race 目录是比赛材料，包含赛题分析、1A 和 1B 两个阶段的提交模板以及参考文献。
