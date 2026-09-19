---
title: 优秀学习习惯训练助手
titleEn: Smart Study-Habit Training Lamp
group: sensing
role: 负责人
date: 2024.4 – 2024.8
brief: 以 ESP32-S3-Box 为主控、智能台灯为载体的儿童学习习惯训练系统，集成视觉感知、语音交互与灯光联动：实时检测坐姿、拍照搜题、语音问答与环境光自适应，营造专注学习环境。
tags: [ESP32-S3-Box, YOLOv8, OV5640, OCR, Qwen2-7B, ESP-SR, TTS, WS2812, RainMaker]
outcome: 2024 年全国大学生物联网设计竞赛（华为杯）全国总决赛二等奖（排名 1）
outcomeLabel: 获奖
reverse: true
image: /media/study-lamp.jpg
---

针对电子产品过度使用导致儿童专注力下降、不良坐姿影响脊柱与视力健康等问题，构建以 ESP32-S3-Box 为主控、智能台灯为载体的学习习惯训练助手。

- **视觉感知**：部署基于 YOLOv8 自主训练的人体姿态检测模型，OV5640 摄像头实时捕捉学习姿态，计算颈背夹角并对不良坐姿触发语音提醒；
- **拍照搜题**：OCR 结合本地部署的轻量 Qwen2-7B，减少对手机屏幕的依赖；
- **语音交互**：双麦克风 + ESP-SR 框架接入云端大模型，支持语音问答与指令交互，TTS 播报并屏幕同步显示；
- **灯光联动**：光敏与红外传感器联动 WS2812 灯环自适应调节照明，支持 RainMaker 远程控制。
