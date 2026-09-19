# tan-bai.github.io · 个人项目集合（作品集）

用 Astro 构建的静态作品集站点，展示本科至今的项目实践、开源系统与竞赛专利成果。
设计语言延续 intern-cv 简历：纸白底、墨黑正文、深蓝 `#173F7A` 链接、衬线标题、编辑式细线分隔。

## 开发

```bash
pnpm install
pnpm dev       # http://localhost:4321
pnpm build     # 产物在 dist/
pnpm preview   # 本地预览构建产物
```

## 如何添加 / 修改项目

所有项目数据在 `src/content/projects/*.md`，frontmatter 即结构化数据：

```yaml
---
title: 项目名称
group: sensing          # sensing | detection(计算机视觉) | embodied | llm | agent | hardware（项目分组）
role: 负责人
date: 2024.10 – 2025.10
brief: 一两句话简介（卡片摘要）
stats:                  # 指标芯片（可选）
  - { label: mAP50, value: 98.4% }
tags: [YOLOv12, Jetson]  # 技术标签
outcome: 获奖成果         # 成果行（可选）
links:                  # 相关链接（可选）
  - { label: GitHub, url: https://github.com/... }
image: /media/xxx.jpg    # 单图（可选）
video: /media/xxx.mp4    # 单视频（可选，优先于图片）
media:                   # 多媒体画廊（可选，多于一项时启用）
  - { video: /media/a.mp4, caption: 图注文字 }
  - { image: /media/b.jpg, caption: 真机部署现场 }
---
正文写在 frontmatter 之后，渲染进「展开详情」。
---
```

- **新项目**：复制任一 md 改内容，再到 `src/pages/index.astro` 的 `groups[].ids` 登记文件 id
- **开源项目**：frontmatter 用 `kind: opensource`（见 `beatless.md`），在 `osIds` 登记并配 `paras` 段落
- **分组顺序 / 章节描述 / 荣誉竞赛专利数据**：都在 `src/pages/index.astro` 顶部

注意：frontmatter 值里含英文冒号+空格（如论文标题 `LCGA-Net: ...`）时必须加引号。

## 放入图片与视频（重要）

媒体文件放 `public/media/`，文件名与项目 md 的 `image` / `video` 字段对应：

```
public/media/powerline-icing.jpg     # 封面图
public/media/powerline-icing.mp4     # 视频（有视频则用播放器替代图片）
```

- 没有媒体的项目显示优雅占位（渐变 + 首字 + 网格纹理），不影响观感
- 视频默认静音自动循环播放（进入视口才播放、滚出暂停）；多媒体项目点击任意媒体可在灯箱中放大查看
- 仓库内视频建议 mp4 (H.264) ≤ 5MB；更大的视频放 R2 图床外链（零流量费 + CDN，见 log-picture）
- 也可用外链：`image` / `video` 字段直接填完整 https:// URL（如 log-picture 的 R2 图床）

## 部署到 GitHub Pages

本仓库对应 https://tan-bai.github.io（简历中已引用该域名）：

```bash
git remote add origin git@github.com:20bytes/tan-bai.github.io.git
git push -u origin main
```

推荐 GitHub Actions 自动部署：在仓库 **Settings → Pages → Source 选 GitHub Actions**，
push 时自动构建发布。也可本地 `pnpm build` 后把 `dist/` 推到 `gh-pages` 分支。

部署后简历里的「项目详情」「证明材料」链接（tan-bai.github.io）即激活；
后续可在此仓库新增 `/proofs/` 页面放成绩单、获奖证书扫描件。

## 目录结构

```
src/
├── styles/global.css      # 设计系统（颜色/字体/组件样式）
├── layouts/Base.astro     # HTML 骨架 + 滚动显现/导航高亮脚本
├── components/            # ProjectCard / OsRow / MediaFrame / Icons
├── content/projects/      # ★ 全部项目数据（19 个 md）
└── pages/index.astro      # 首页编排（分组/顺序/荣誉/专利）
public/media/              # 图片与视频投放目录
```
