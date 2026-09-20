---
title: 明镜 · 证据可审计的研究 Agent
titleEn: MingJing · Evidence-Admissible Research Runtime
group: agent
role: 参赛作品
brand: 字节跳动
orgLogo: /icons/bytedance-color.svg
org: 字节跳动 AI 全栈挑战赛
date: ""
brief: 字节跳动 AI 全栈挑战赛的参赛作品。明镜是基于 LangGraph 的竞品分析多智能体系统：LLM 只负责提出声明，独立的 QA Agent 用七项确定性规则裁决，引用片段必须是来源原文的逐字子串，否则声明打回、重新采集，证据等级从 weak 一路升到 strong；报告里每条结论都能点回原文出处和 QA 的采纳理由。
tags: [明镜 MingJing, LangGraph, FastAPI, React 19, QA 门禁, 证据链, SearXNG, MiniMax, Doubao, Docker]
video: /media/mingjing-clip.mp4
links:
  - { label: CrepuscularIRIS/mingjing, url: https://github.com/CrepuscularIRIS/mingjing }
  - { label: 在线演示, url: https://crepusculariris.github.io/mingjing }
---

<!-- 视频剪自 Remotion 制作的发布视频（原片 5 分 38 秒，1080p，完整版见 repo 的 v0.1.0 release） -->
<!-- 待补：参赛年份起止、团队与个人角色、名次 -->

- 四个打分 Agent 分工明确：Collector 做搜索、robots 检查和带 SSRF 防护的抓取；Analyst 每个字段只调一次 LLM，网页文本装进 UNTRUSTED 信封隔离；QA 只看证据、不看分析推理，七项确定性检查输出六种 IssueCode，全程无 LLM，提示注入翻不了判定；Writer 只投影过审声明，没有依据的结论到不了报告；
- 硬规则是引用必须逐字命中原文，否则拒绝该声明并触发真实的新一轮采集，来源上限随修订轮次递增，补的是新数据不是演戏；
- 旗舰跑批 4fff4227（Notion × Linear，中文）：一条用户情绪声明首轮只有单个弱源，QA 判 weak 生成修订任务，补采后来源 2→4，等级 weak→moderate，同轮另一条 moderate→strong，可信度面板给出 repair_delta +42%，准入漏斗 10 条提议 6 条准入 4 条保留；
- 反诚实不变量：零条声明准入时，闭环徽章和加速 UI 自动熄灭，系统拒绝在自己不行的时候装好；
- 883 个后端测试不依赖 API key（DI 假件）全部通过；LLM 侧拿 MiniMax-M2.7 当高幻觉压力测试源，同一套门禁也在豆包上验证过；
- 技术栈：Python 3.12 + FastAPI + LangGraph + Pydantic v2 + sqlite3，前端 React 19 + Vite + Tailwind + shadcn/ui + reactflow，搜索自托管 SearXNG，docker compose 一键起，cache_first 模式零 key 可复现。
