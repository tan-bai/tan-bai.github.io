---
title: 基于曲率感知和高斯对齐的红外小目标检测网络
titleEn: LCGA-Net · Infrared Small Target Detection
group: detection
role: 主要参与者
date: 2025.3 – 2025.8
brief: 针对红外目标微弱、背景杂波干扰、定位精度要求高的难题，提出轻量网络 LCGA-Net：Hessian 曲率感知突出微弱边缘、显著性聚焦抑制杂波、多尺度高斯径向对齐项聚焦中心定位，精度与效率俱佳。
stats:
  - { label: IRSTD-1K AP50（+5.5pt）, value: 86.5% }
  - { label: F1（+5.5pt）, value: 85.3% }
  - { label: 参数量, value: 2.92M }
  - { label: 推理速度, value: 204 FPS }
tags: [红外小目标检测, Hessian 曲率, 显著性聚焦, 高斯径向对齐, IRSTD-1K, NUDT-SIRST]
outcome: '第一作者工作论文《LCGA-Net: Enhanced Infrared Small Target Perception with Curvature-Guided Features and Gaussian Alignment Loss》（Working Paper）'
outcomeLabel: 论文
---

三个核心设计：

- **曲率边缘感知模块**——骨干浅层引入 Hessian 曲率感知，通过高斯平滑与特征调制突出微弱边缘信息；
- **目标显著性聚焦模块**——颈部引入，抑制背景杂波；
- **多尺度高斯径向对齐损失**——在 CIoU 基础上增加径向对齐项，聚焦中心点精确定位。

在 IRSTD-1K 上 AP50 达 86.5%、F1 达 85.3%，均较基线提升 5.5 个百分点；参数量仅 2.92M、推理速度 204 FPS；在 NUDT-SIRST 与 SIRST-UAVB 上进一步验证泛化能力。
