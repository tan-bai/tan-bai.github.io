---
# 媒体：把图片放到 public/media/powerline-icing.jpg、视频 public/media/powerline-icing.mp4 即自动展示
title: 复杂场景下无人机架空输电线路覆冰检测研究
titleEn: Powerline Icing Detection in Complex Scenes via UAV
group: sensing
role: 负责人
date: 2024.10 – 2025.10
brief: 面向冬季覆冰频发、人工巡检高危低效的痛点，构建「端–云协同」智能覆冰检测系统：无人机端 Jetson 部署轻量化检测模型实时定位覆冰，云端微调电力领域多模态大模型完成分析决策，实现「检测–分析–决策」闭环。
stats:
  - { label: 覆冰检测 mAP50, value: 98.4% }
  - { label: 量化后模型, value: 30M }
  - { label: QLoRA 微调 Loss, value: 0.7 }
tags: [YOLOv12-tiny, PPQ 量化, Jetson AGX Xavier, HTB, DehazeFormer, R1-OneVision, QLoRA, RAGFlow, Docker]
outcome: 第十九届「挑战杯」上海市一等奖（排名 1）；主持上海市大创项目「优秀」结项（排名 1）；受理实用新型专利一项、授权软件著作权一项；孵化作品获「揭榜挂帅」擂台赛全国二等奖
outcomeLabel: 成果
links:
  - { label: detection-web, url: https://github.com/20bytes/detection-web }
image: /media/powerline-icing.webp
---

针对我国中西部输电线路冬季覆冰频发、人工巡检高危低效、固定传感器成本高且难覆盖复杂弱网区域的问题，构建端云协同的智能覆冰检测系统。

**端侧**在无人机搭载的 Jetson AGX Xavier 上部署经剪枝量化的 YOLOv12-tiny，融合 HTB 与 DehazeFormer 图像退化修复模块，有效应对雨雪雾霾干扰，PPQ 量化后模型仅 30M，mAP50 达 98.4%。

**云侧**通过自建多模态数据集采用 QLoRA 微调 R1-OneVision，将覆冰物理特性与气象关联知识注入模型参数空间，提升雨凇、雾凇等复杂覆冰类型的判别精度；同步构建融合设备拓扑参数、历史除冰案例与工具力学属性的电力运维知识引擎，基于 Docker 部署的 RAGFlow 实现多模态检测数据与知识库的动态语义匹配，输出含冰情评估、工具选型与施工优先级建议的除冰决策报告。
