import * as THREE from 'three';

// Functional labels are hypotheses from public tags, not measured building uses.
export async function loadFunctions(asset, host, expectedCount) {
  const response = await fetch(asset('functions.json'));
  if (!response.ok) throw new Error('功能分类数据暂不可用');
  const data = await response.json();
  const byId = new Map(data.buildings.map(b => [b.id, b]));
  if (byId.size !== expectedCount) throw new Error('功能分类建筑数量不匹配');
  const materials = Object.fromEntries(Object.entries(data.categories).map(([key,c]) => [key,
    new THREE.MeshBasicMaterial({color:c.color, side:THREE.DoubleSide})]));
  const panel = document.createElement('section');
  panel.className = 'function-panel'; panel.hidden = true; panel.setAttribute('aria-label','功能分类图例与依据');
  const title = document.createElement('h3'); title.textContent = '功能线索 · 公开数据初判'; panel.append(title);
  const summary = document.createElement('p'); const m = data.metadata;
  summary.textContent = `${m.classified_count} / ${m.building_count} 栋有线索（${(m.classified_count/m.building_count*100).toFixed(1)}%），其余待核验。这是覆盖率，不是准确率。`; panel.append(summary);
  const list = document.createElement('div'); list.className = 'function-key';
  for (const [key,c] of Object.entries(data.categories)) {
    const row = document.createElement('div'), swatch = document.createElement('i'), label = document.createElement('span'), count = document.createElement('b');
    swatch.style.background = c.color; label.textContent = c.label; count.textContent = m.counts[key] || 0;
    row.append(swatch,label,count); list.append(row);
  }
  panel.append(list);
  const note = document.createElement('p'); note.textContent = '建筑着色表示功能线索；淡色地面为 OSM 已标注范围。区域归属不等于逐栋用途，酒店与餐饮归入商业服务。'; panel.append(note);
  const detail = document.createElement('div'); detail.className = 'function-detail'; detail.textContent = '点击建筑查看分类依据。'; panel.append(detail);
  const links = document.createElement('p'); links.className = 'function-links';
  for (const [label,url] of [['分类数据 ↓',asset('functions.geojson')],['方法与来源',asset('FUNCTIONS.md')]]) {
    const a = document.createElement('a'); a.textContent = label; a.href = url; a.target = '_blank'; a.rel = 'noopener'; links.append(a);
  }
  panel.append(links); host.append(panel);
  const floating=document.createElement('section');floating.className='function-floating';floating.hidden=true;floating.setAttribute('aria-hidden','true');
  const floatingTitle=document.createElement('b');floatingTitle.textContent='功能线索 / 非核验结果';floating.append(floatingTitle,list.cloneNode(true));document.querySelector('main').append(floating);
  function describe(id) {
    const b = byId.get(id); if (!b) return '';
    const lines = [`${b.name || '建筑轮廓'} · ${data.categories[b.category].label}`,`依据级别：${b.evidence_level}`];
    if (!b.evidence.length) lines.push('公开数据没有足够依据，保留灰色。');
    for (const e of b.evidence.slice(0,5)) lines.push(`${e.method} · ${e.name || data.categories[e.category].label} · ${e.source}${e.overlap !== undefined ? `（重叠 ${Math.round(e.overlap*100)}%）` : ''}${e.distance_m !== undefined ? `（距离 ${e.distance_m} m）` : ''}`);
    return lines.join('\n');
  }
  function select(id) { detail.textContent = id ? describe(id) : '点击建筑查看分类依据。'; }
  function zones(offset=[0,0]) {
    const group = new THREE.Group(); group.name='Functional evidence areas'; group.visible=false;
    for (const z of data.zones) {
      const shape = new THREE.Shape(z.rings[0].map(([x,y])=>new THREE.Vector2(x,y)));
      for (const hole of z.rings.slice(1)) shape.holes.push(new THREE.Path(hole.map(([x,y])=>new THREE.Vector2(x,y))));
      const geometry = new THREE.ShapeGeometry(shape); geometry.rotateX(-Math.PI/2);
      const mesh = new THREE.Mesh(geometry,new THREE.MeshBasicMaterial({color:data.categories[z.category].color,transparent:true,opacity:.16,depthWrite:false,side:THREE.DoubleSide,polygonOffset:true,polygonOffsetFactor:-1}));
      mesh.position.set(offset[0],.3,offset[1]); mesh.renderOrder=1; group.add(mesh);
    }
    return group;
  }
  // Jining's existing context is batched, so use the same source footprint triangles.
  function prisms(offset=[0,0]) {
    const group = new THREE.Group(); group.name='Functional buildings'; group.visible=false;
    for (const b of data.geometry || []) {
      const vertices=[];
      const add=(x,y,h)=>vertices.push(x+offset[0],h,-y+offset[1]);
      for (const triangle of b.triangles) for (const [x,y] of triangle) add(x,y,b.height_m);
      for (const ring of b.rings) for (let i=0;i<ring.length;i++) {
        const a=ring[i],c=ring[(i+1)%ring.length];
        add(...a,0);add(...c,0);add(...c,b.height_m);add(...a,0);add(...c,b.height_m);add(...a,b.height_m);
      }
      const geometry=new THREE.BufferGeometry(); geometry.setAttribute('position',new THREE.Float32BufferAttribute(vertices,3)); geometry.computeVertexNormals();
      const mesh=new THREE.Mesh(geometry,materials[byId.get(b.id).category]); mesh.userData.functionId=b.id; group.add(mesh);
    }
    return group;
  }
  return {data,byId,materials,panel,describe,select,zones,prisms,setVisible:show=>{panel.hidden=!show;floating.hidden=!show;}};
}
