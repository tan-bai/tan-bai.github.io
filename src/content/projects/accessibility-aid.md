---
title: 无障碍视觉辅助系统
titleEn: Accessible Visual Aid System
group: hardware
role: 课程作品
org: 电子系统设计课程
date: ""
brief: 面向视障人士的语音与图像辅助设备：树莓派采集画面，Qwen2.5VL 理解场景并生成描述，FastAPI 提供服务，语音播报周围环境。
tags: [树莓派, Qwen2.5VL, FastAPI, 语音交互, 无障碍]
image: /media/accessibility-aid.webp
reverse: true
---

- **端**：树莓派 + 摄像头实时采集前方画面；
- **云**：Qwen2.5VL 多模态模型理解场景（障碍物、标识、文字），生成自然语言描述；
- **交互**：FastAPI 服务串联链路，TTS 语音播报，辅助视障用户感知周围环境。
