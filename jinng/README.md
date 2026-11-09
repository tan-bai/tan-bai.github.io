# 济宁 1600m 样方 / 240m GBA 试验区

目标地址：https://tan-bai.github.io/jinng/

本目录是可直接部署的静态成品。原模型与卫星地面、屋顶贴图保持原样。GitHub Pages 已启用，新增功能分类切换、图例与逐栋依据。

换电脑预览：在仓库根目录运行 `python3 -m http.server 8000`，打开 `http://127.0.0.1:8000/jinng/`。

修改和重建：进入 `jinng/_source`，执行 `npm ci`，然后 `npm run build`。源代码会复用父目录中的模型、图片和数据；无需重新获取地图数据。

本展示用于个人非商业研究。GBA 是估计楼高，非实测高度；原有占位高度仍明确标注。Google Earth / Airbus 等影像归原权利人，未声明转授权。公开轮廓经 Overture Maps 提供（原始来源包括 Qian Shi 等，DOI 10.5281/zenodo.8174931，CC BY 4.0）与 © OpenStreetMap contributors（ODbL）。GBA.Height：GlobalBuildingAtlas / CC BY-NC 4.0。Blosm 生成部分示意屋顶；Blender Web 3D 和 Three.js 的 MIT 许可随附。

代码：https://github.com/czlonkowski/blender-web-3d-skill · https://github.com/vvoovv/blosm
数据：https://github.com/zhu-xlab/GlobalBuildingAtlas · https://www.openstreetmap.org/copyright · https://zenodo.org/records/8174931

新增功能分类：点击“功能分类”查看颜色与依据；点击卫星对照返回原影像。[方法与来源](FUNCTIONS.md)。
