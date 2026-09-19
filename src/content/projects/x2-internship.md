---
title: 智元 X2 人形机器人 RL 策略训练
titleEn: AgiBot X2 · RL Policy Training & Deployment
group: embodied
role: 算法实习
org: 智元机器人 · 上海
date: 2026.7 – 2026.8
brief: 在智元 X2 人形机器人上打通「人体动作视频 → 骨骼提取与重定向 → RL 策略训练 → 真机部署诊断」的完整链路。
tags: [智元 X2, 人形机器人, GVHMR, PromptHMR, SMPL/AMASS, 动作重定向, HumanoidPolicyLab, MuJoCo, Isaac, 强化学习, ONNX, 真机部署, AIMDK]
media:
  - { video: /media/x2-internship.mp4, caption: MuJoCo 中 person00 参考动作在 X2 模型上的跟踪回放 }
  - { video: /media/x2-maiguai2.mp4, caption: PromptHMR 骨骼提取——《卖拐》片段 2D 姿态跟踪，重定向管线前端 }
---

- **动作重定向**：GVHMR / PromptHMR 从人体视频提取 SMPL 动作，经 AMASS 格式重定向到 AgiBot X2 机器人模型，产出 Isaac / MuJoCo 参考轨迹；
- **RL 训练**：基于 HumanoidPolicyLab 在 MuJoCo 中做参考动作跟踪训练（单次训练约 4.5 小时），导出 ONNX 策略与 policy bundle；
- **真机部署**：经 AIMDK 将策略部署至 X2（aarch64）控制器，采集真机参数与故障 bundle 做部署诊断；
- **工程沉淀**：H200 集群盘点、X2 训练管线拆解、部署物料清单；另有语音 TTS 环节。
