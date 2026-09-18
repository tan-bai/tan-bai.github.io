---
title: 面向无人机航拍的小目标端到端实时检测网络研究与应用
titleEn: SAFE-DETR · Real-time Tiny Object Detection for UAV Imagery
group: detection
role: 本科毕设
date: 2026.2 – 2026.5
brief: 提出轻量化端到端实时检测框架 SAFE-DETR：HWD 小波下采样保留小目标高频细节、MPCA/MPCA-Down 尺度协同融合，完成从算法设计、VisDrone 验证到 Jetson Nano 边缘部署与可视化平台的完整闭环。
stats:
  - { label: AP 相对增益, value: +3.90% }
  - { label: APs 相对增益, value: +4.27% }
  - { label: vs YOLOv8s AP50, value: +6.3pt }
tags: [DETR, HGNetV2, HWD 小波, MPCA, CCFM, VisDrone, TensorRT INT8, Jetson Nano, Vue3, FastAPI]
outcome: 通过首批本科毕业设计答辩，毕业论文获评 A；部分实现代码开源于 detection-web
outcomeLabel: 成果
links:
  - { label: detection-web, url: https://github.com/20bytes/detection-web }
reverse: true
---

- **频率感知轻量化主干**：针对 HGNetV2 步长卷积下采样易丢失微小目标边缘与纹理细节的问题，在关键下采样阶段引入 HWD 小波下采样算子，以离散 Haar 小波分解替代传统步长卷积；
- **尺度协同增强混合编码器**：以 MPCA 为基础扩展适用于自底向上路径的对称变体 MPCA-Down，集成至 CCFM 双向融合路径全部 4 个融合节点，实现相邻尺度特征的差异化对齐与融合。

在 VisDrone 2019 上完成消融、横向对比与可视化分析；完成 TensorRT INT8 量化部署至 Jetson Nano，基于 Vue3 + FastAPI 搭建低空视觉感知平台。
