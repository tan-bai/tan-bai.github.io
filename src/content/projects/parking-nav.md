---
title: 优化 A* 新型停车场导航方案
titleEn: Optimized A* Parking Navigation
group: hardware
role: 复现与改进
org: 学长项目
date: ""
brief: 停车场室内导航方案：YOLO11 + SEAM 注意力做车牌识别，PP-OCR 文字提取，动态权重 A* 完成寻位与路径规划。
tags: [YOLO11, SEAM, PP-OCR, A* 算法, 路径规划, 车牌识别]
image: /media/parking-nav.webp
---

- **感知**：YOLO11 检测车牌并引入 SEAM 注意力增强小目标与遮挡场景的识别；
- **识别**：PP-OCR 完成车牌与车位编号文字提取；
- **规划**：为 A* 引入动态权重（拥堵、距离），实现停车场内寻位与引导路径规划。
