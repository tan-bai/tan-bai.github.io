---
title: Proma · 自动化研究 Agent 平台
titleEn: Proma · Research Agent Platform
group: agent
role: 参赛作品
orgLogo: /icons/qwen.svg
org: 挑战杯「揭榜挂帅」· 阿里云榜题
date: 2026.5 – 2026.9
brief: 挑战杯 2026 揭榜挂帅阿里云榜题「基于国产开源大模型的 AI Scientist 的研发与应用」的参赛作品。Proma 做 Electron 桌面端和会话层，Prime Agent（Pi Agent 0.84.2 的 fork）做执行运行时，模型按赛题要求走 DashScope 调 Qwen；上层用 Research Skills 和 MCP 组织证据链、跑判伪实验，docker compose 一键起。
tags: [Proma, Prime Agent, Electron, React, TypeScript, Qwen, DashScope, MCP, Docker, AI Scientist]
video: /media/proma-clip.mp4
links:
  - { label: CrepuscularIRIS/crucible, url: https://github.com/CrepuscularIRIS/crucible }
---

<!-- 视频是比赛演示片段：Agent 在手机 App 环境中执行任务指令，带倒计时和计分 -->
<!-- 待补：初审结果（9 月 20 日前公布）、决赛（11 月）、团队与个人角色、名次 -->

- 榜题要求基座用千问系列并通过百炼平台调用，所以模型侧接的是 DashScope 的 Qwen 通道，从 registerProvider 到 getModel 再到 getAuth 逐步调通，thinkingFormat 按 qwen 的格式处理；
- 把 Proma 从原来的运行时迁到 Prime Agent 上，浏览器和桌面窗口共用一套渲染层，preload IPC 改成 WebSocket 桥，两端的差异全部收在一个 prime-compat 适配文件里；
- 研究流程围绕证据链：MCP 编排数据源，Research Skills 定义任务，先跑判伪实验再迭代结论，最后交付可复现的产物，对应评分标准里的校验迭代与可复现性两项；
- 容器里用 Xvfb 起了一个无头显示器，让真实的 Electron 主进程能在 Docker 里运行；monorepo 六个工作区全部过 typecheck；
- Race 目录是比赛材料，包含赛题分析、分阶段提交模板以及参考文献。
