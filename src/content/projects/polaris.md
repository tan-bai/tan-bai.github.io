---
kind: opensource
name: Polaris
tagline: CCF AI 顶会论文知识基础设施
role: Author
date: 2026.5 – 至今
links:
  - { label: 20bytes/Polaris, url: https://github.com/20bytes/Polaris }
  - { label: HF · polaris-ccf, url: https://huggingface.co/datasets/beatless-ai/polaris-ccf }
paras:
  - '针对单一学术数据库难以覆盖 CCF 顶会全谱、跨源元数据需手工拼接、缺乏本地化 RAG 与知识图谱接口的痛点，构建覆盖 CCF-A 严格 7 会议（AAAI、NeurIPS、ACL、CVPR、ICCV、ICML、IJCAI）与高价值扩展 4 会议（ICLR、ECCV、EMNLP、CHI）、跨度 1982–2026 共 <b>15.5 万篇</b>论文的知识基础设施。'
  - '以 DBLP 为身份锚点，跨 CVF、ACL Anthology、OpenReview、PMLR 采集元数据，融合 Semantic Scholar 引用与 TLDR、OpenAlex 摘要与 arXiv 链接，多级匹配规则与置信度门槛自动去重后入库 PostgreSQL；上层基于 all-MiniLM-L6-v2 构建 15.5 万 × 384 维语义向量索引，聚类与模板匹配产出 50 主题趋势分析与 method–dataset–task 三元组知识图谱。'
  - '本地 FastAPI Dashboard 提供语义检索、RAG、推荐、相关工作生成、趋势与知识图谱查询等 7 个 JSON 接口，同时作为 Beatless 多智能体系统的结构化数据底座。'
stats:
  - { label: 论文总量, value: 155K }
  - { label: 摘要覆盖率, value: 92.2% }
  - { label: 知识图谱三元组, value: 59K }
---

代码以 **MIT** 协议开源，数据集以 **CC-BY-4.0** 发布于 HuggingFace；知识图谱三元组覆盖 51.9% 论文。
