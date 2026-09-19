---
title: 自动化科研助手
titleEn: Personal Research Automation Stack
group: agent
role: 独立开发
org: ""
date: 2026.1 – 至今
brief: 围绕个人科研工作流搭建的自动化助手：Cron 驱动的多源论文追踪与双语摘要、LLM 博客中英对译、自动化研究报告写入与大厂研究博客监测——覆盖「文献 → 笔记 → 发布 → 归档」全链路。
tags: [Hermes Agent, Codex CLI, GitHub Actions, DeepSeek API, LLM 翻译, Markdown 管线, Cron]
links:
  - { label: vlm-arxiv-daily, url: https://github.com/20bytes/vlm-arxiv-daily }
  - { label: Aerial-VLN-Arxiv-Daily, url: https://github.com/20bytes/Aerial-VLN-Arxiv-Daily }
  - { label: 博客 · 20bytes.top, url: https://20bytes.top }
---

<!-- 与开源区的 Beatless（合作项目）互补：这里是个人工作流的自动化实现 -->

- **论文追踪**：vlm-arxiv-daily / Aerial-VLN-Arxiv-Daily——GitHub Actions 定时抓取 arXiv 新论文，DeepSeek API 翻译标题与摘要，自动生成中英摘要页与 PDF / HJFY 快速阅读入口；
- **博客自动化**：translate.mjs 完成 LLM 中英对译；auto-research 研究报告由自动化管线直接写入博客仓库；sync-awesome 将 Awesome 清单同步成站点页面；
- **动态监测**：blog-tracking 管线追踪 DeepMind、DeepSeek、Kimi、Physical Intelligence、World Labs 等大厂研究博客更新，vln-digest 定期产出 VLN 方向文摘；
- 与 Beatless 多智能体系统互通，作为其论文采集源与内容发布端。
