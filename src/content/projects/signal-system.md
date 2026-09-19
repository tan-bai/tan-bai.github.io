---
title: 无线传输信号模拟系统
titleEn: Wireless Signal Transmission Simulator
group: hardware
role: 参赛作品
org: 电子设计大赛（电赛）
date: ""
brief: 面向电赛的信号源与调制系统：STM32F407 主控，AD9959 直接数字合成生成载波信号，AD835 完成调幅，AGC 环节稳幅输出。
tags: [STM32F407, AD9959, AD835, AGC, DDS, 电路焊接, 同轴线走线]
---

- **系统链路**：STM32F407 主控 → AD9959（DDS）生成载波信号 → AD835 模拟乘法器完成调幅 → AGC 自动增益控制稳幅输出；
- **个人贡献**：电路板焊接与同轴线走线设计；编写 AD9959 驱动代码。
