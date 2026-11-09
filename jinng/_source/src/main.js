import {loadFunctions} from './functional.js';
// Jining adaptation of the MIT Blender Web 3D template. Upstream quality and post
// components are retained. GIS building identities are deliberately not batched away.
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { MeshoptDecoder } from 'three/examples/jsm/libs/meshopt_decoder.module.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js';
import { NAN_SCRUB, FINISH } from './shaders/post.js';
import { createQualityGovernor } from './quality.js';

const $=id=>document.getElementById(id);
const asset=path=>import.meta.env.BASE_URL+path;
const debug=new URLSearchParams(location.search).has('debug');
const canvas=$('scene');
const failure=e=>{console.error(e);$('loading-text').textContent='模型暂时未能载入';$('loader').querySelector('small').textContent=String(e.message||e);};
try { await start(); } catch(e) { failure(e); }

async function start(){
  const response=await fetch(asset('block_metadata.json'));if(!response.ok)throw new Error('街区数据不可用');
  const data=await response.json(),meta=data.metadata;
  const contextMeta=await (await fetch(asset('context_metadata.json'))).json();
  const overlayText=await (await fetch(asset('reference_overlay.svg'))).text();
  $('reference-overlay').replaceChildren(new DOMParser().parseFromString(overlayText,'image/svg+xml').documentElement);
  $('overlay-buildings').onchange=e=>$('audit-building').style.display=e.target.checked?'':'none';
  $('overlay-water').onchange=e=>$('audit-water').style.display=e.target.checked?'':'none';
  let scope='full',isReference=true;
  const fullTarget=new THREE.Vector3(-280,0,-100);
  const viewTarget=()=>scope==='full'?fullTarget:new THREE.Vector3();
  const byId=new Map(data.buildings.map(b=>[b.id,b]));
  $('count').textContent=meta.building_count;
  const renderer=new THREE.WebGLRenderer({canvas,antialias:false,alpha:true,preserveDrawingBuffer:debug,powerPreference:'high-performance'});
  renderer.setPixelRatio(Math.min(devicePixelRatio,1.5));renderer.outputColorSpace=THREE.SRGBColorSpace;
  renderer.toneMapping=THREE.AgXToneMapping;renderer.toneMappingExposure=1.12;
  renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFShadowMap;
  const scene=new THREE.Scene();scene.background=new THREE.Color('#e8ece3');
  const camera=new THREE.OrthographicCamera(-170,170,170,-170,.1,8000);
  camera.position.set(270,300,330);
  const controls=new OrbitControls(camera,canvas);controls.target.set(0,0,0);controls.enableDamping=true;
  controls.minZoom=.6;controls.maxZoom=9;controls.maxPolarAngle=Math.PI*.485;controls.autoRotateSpeed=.5;
  controls.mouseButtons={LEFT:THREE.MOUSE.ROTATE,MIDDLE:THREE.MOUSE.DOLLY,RIGHT:THREE.MOUSE.PAN};
  scene.add(new THREE.HemisphereLight('#ecf3ff','#9b9875',2.1));
  const sun=new THREE.DirectionalLight('#fff2d6',3.1);scene.add(sun,sun.target);sun.castShadow=true;
  sun.shadow.mapSize.set(2048,2048);Object.assign(sun.shadow.camera,{left:-190,right:190,top:190,bottom:-190,near:1,far:1000});
  sun.shadow.bias=-.00008;sun.shadow.normalBias=.12;sun.shadow.autoUpdate=false;sun.shadow.needsUpdate=true;
  function sunlight(degrees){const a=THREE.MathUtils.degToRad(degrees),d=scope==='full'?1900:300;
    sun.target.position.copy(viewTarget());sun.position.copy(sun.target.position).add(new THREE.Vector3(Math.sin(a)*d,d*1.2,-Math.cos(a)*d));
    const extent=scope==='full'?1250:190;Object.assign(sun.shadow.camera,{left:-extent,right:extent,top:extent,bottom:-extent,far:scope==='full'?7000:1000});sun.shadow.camera.updateProjectionMatrix();sun.shadow.needsUpdate=true;}
  sunlight(225);
  const ground=new THREE.Mesh(new THREE.PlaneGeometry(6000,6000),new THREE.MeshStandardMaterial({color:'#e8ece3',roughness:1}));ground.rotation.x=-Math.PI/2;ground.position.y=-8.1;ground.receiveShadow=true;scene.add(ground);
  const target=new THREE.WebGLRenderTarget(1,1,{type:THREE.HalfFloatType,samples:2});
  const composer=new EffectComposer(renderer,target);composer.addPass(new RenderPass(scene,camera));composer.addPass(new ShaderPass(NAN_SCRUB));composer.addPass(new OutputPass());
  const finish=new ShaderPass(FINISH);finish.uniforms.uFade.value=0;finish.uniforms.uGrain.value=.004;finish.uniforms.uAberration.value=0;finish.uniforms.uVignette.value=.12;composer.addPass(finish);
  const gltfLoader=new GLTFLoader().setMeshoptDecoder(MeshoptDecoder);
  const [trialGltf,contextGltf]=await Promise.all([gltfLoader.loadAsync(asset('models/jining_block_v02.glb')),gltfLoader.loadAsync(asset('models/jining_context_v02.glb'))]);
  const model=trialGltf.scene,context=contextGltf.scene;scene.add(context);
  context.traverse(n=>{if(n.isMesh){n.castShadow=true;n.receiveShadow=true;}});
  const satelliteTexture=await new THREE.TextureLoader().loadAsync(asset('reference_1600m.png'));satelliteTexture.colorSpace=THREE.SRGBColorSpace;
  const satelliteBase=new THREE.Mesh(new THREE.PlaneGeometry(1600,1600),new THREE.MeshBasicMaterial({map:satelliteTexture}));
  satelliteBase.rotation.x=-Math.PI/2;satelliteBase.position.set(-280,-.10,-100);scene.add(satelliteBase);
  $('satellite-base').onchange=e=>satelliteBase.visible=scope==='full'&&e.target.checked;
  const trialBoundary=new THREE.LineLoop(new THREE.BufferGeometry().setFromPoints([[-120,-120],[120,-120],[120,120],[-120,120]].map(([x,z])=>new THREE.Vector3(x,20,z))),new THREE.LineBasicMaterial({color:0xf4ba4e,depthTest:false}));trialBoundary.renderOrder=10;scene.add(trialBoundary);
  scene.add(model);const groups={};for(const name of ['Architecture','Analysis','Baseline','Details']){groups[name]=model.getObjectByName(name);if(!groups[name])throw new Error(`模型缺少 ${name}`);}
  model.traverse(n=>{if(n.isMesh){
    n.castShadow=true;n.receiveShadow=true;
    if(!n.userData.building_id){let parent=n.parent;while(parent&&!parent.userData.building_id)parent=parent.parent;if(parent)n.userData={...parent.userData,...n.userData};}
  }});
  const bodies=[];groups.Architecture.traverse(n=>{if(n.isMesh&&n.userData.building_id)bodies.push(n);});
  const unique=new Set(bodies.map(n=>n.userData.building_id));if(unique.size!==meta.building_count)throw new Error('建筑 ID 在导出中丢失');
  const logicalBody=n=>{let body=n;while(body.parent&&body.parent.userData.building_id===n.userData.building_id)body=body.parent;return body;};
  const roots=new Map(bodies.map(n=>[n.userData.building_id,logicalBody(n)]));
  for(const [id,n] of roots){const option=document.createElement('option');option.value=id;option.textContent=`${n.userData.display_id} · ${Number(n.userData.height_m).toFixed(1)} m`;$('building-select').append(option);}
  const low=new THREE.Color('#bfd5a1'),high=new THREE.Color('#154647');
  groups.Analysis.traverse(n=>{if(n.isMesh&&n.userData.building_id){n.material=new THREE.MeshStandardMaterial({color:low.clone().lerp(high,(n.userData.height_m-meta.height_min_m)/(meta.height_max_m-meta.height_min_m)),roughness:.88});}});
  let functions=null,functionLayer=null,functionZones=null;
  try {
    functions=await loadFunctions(asset,$('function-host'),contextMeta.v01_building_count);
    functionLayer=functions.prisms([-280,-100]);functionZones=functions.zones([-280,-100]);scene.add(functionLayer,functionZones);
  } catch(e) { console.error(e);const button=document.querySelector('[data-mode="function"]');button.disabled=true;button.title=e.message; }
  let mode='detail',selection=null,animation=null,disposed=false;
  const highlight=new THREE.Box3Helper(new THREE.Box3(),0xb99554);highlight.visible=false;scene.add(highlight);
  function showSelection(node){
    node=node?logicalBody(node):null;selection=node;highlight.visible=!!node;$('selection').hidden=!node;
    $('building-select').value=node?.userData.building_id||'';
    if(!node)return;
    const b=byId.get(node.userData.building_id);if(!b)return;
    highlight.box.setFromObject(node);highlight.box.expandByScalar(.25);
    $('building-name').textContent=node.userData.display_id||'建筑';
    $('building-height').textContent=Number(b.height_m).toFixed(1);$('building-area').textContent=Math.round(b.area_m2);
    $('building-method').textContent=`GBA 3 m 栅格 · ${b.height_sample_count} 个像元 · 轮廓内中位数`;
    $('building-roof').textContent=mode==='baseline'?'当前对照体块显示 12 m；上方数值仍为 GBA 估计高度。':`屋顶：${b.roof_type==='gabled'?'坡屋顶':'平屋顶'}（示意假设）${b.clipped_at_sample_edge?' · 样方边缘已裁切':''}`;
  }
  function setMode(next){
    if(next==='function'&&!functions)return;
    if(next==='function'&&scope!=='full')setScope('full');
    const functional=next==='function';
    if(functionLayer){functionLayer.visible=functional;functionZones.visible=functional;functions.setVisible(functional&&!isReference);functions.select(null);}
    context.getObjectByName('Context_building').visible=!functional;
    $('building-select').disabled=functional;trialBoundary.visible=scope==='full'&&!functional;
    mode=next;groups.Architecture.visible=next==='detail';groups.Details.visible=next==='detail';groups.Analysis.visible=next==='height';groups.Baseline.visible=next==='baseline';
    document.querySelectorAll('[data-mode]').forEach(b=>{const active=b.dataset.mode===next;b.classList.toggle('active',active);b.setAttribute('aria-pressed',active);});
    $('view-label').textContent=isReference?'Google Earth 影像核对':{function:'功能线索 · 公开数据初判',detail:'空间展示',height:'36 个轮廓 · GBA 估计',baseline:'平面核对 · 统一 12 米'}[next];$('height-legend').hidden=next!=='height'||isReference;
    showSelection(null);sun.shadow.needsUpdate=true;
  }
  setMode('baseline');
  document.querySelectorAll('[data-mode]').forEach(b=>b.addEventListener('click',()=>{setReference(false);setMode(b.dataset.mode);}));
  $('close-selection').onclick=()=>showSelection(null);
  $('building-select').onchange=e=>{if(scope==='full')setScope('trial');const group=groups[{detail:'Architecture',height:'Analysis',baseline:'Baseline'}[mode]];let chosen=null;group.traverse(n=>{if(n.userData.building_id===e.target.value&&!chosen)chosen=n;});showSelection(chosen);};
  $('zoom-in').onclick=()=>{camera.zoom=Math.min(9,camera.zoom*1.4);camera.updateProjectionMatrix();};
  $('zoom-out').onclick=()=>{camera.zoom=Math.max(.6,camera.zoom/1.4);camera.updateProjectionMatrix();};
  function view(name){
    controls.autoRotate=false;$('tour').setAttribute('aria-pressed','false');
    const target=viewTarget();const offset=name==='top'?new THREE.Vector3(0,scope==='full'?3000:500,.01):(scope==='full'?new THREE.Vector3(1700,1900,2100):new THREE.Vector3(270,300,330));
    animation={from:camera.position.clone(),to:target.clone().add(offset),start:performance.now(),fromTarget:controls.target.clone(),toTarget:target.clone(),fromZoom:camera.zoom};
  }
  $('overview').onclick=()=>view('overview');$('top').onclick=()=>view('top');
  $('tour').onclick=()=>{controls.autoRotate=!controls.autoRotate;$('tour').setAttribute('aria-pressed',controls.autoRotate);};
  $('sun').oninput=e=>{const v=Number(e.target.value);sunlight(v);$('sun-label').textContent=['北','东北','东','东南','南','西南','西','西北'][Math.round(v/45)%8];};
  $('about').onclick=()=>$('about-dialog').showModal();$('close-about').onclick=()=>$('about-dialog').close();
  $('about-dialog').addEventListener('click',e=>{if(e.target===$('about-dialog')){const r=e.target.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)e.target.close();}});
  const raycaster=new THREE.Raycaster();let down=null;
  canvas.addEventListener('pointerdown',e=>{down=[e.clientX,e.clientY];animation=null;});
  canvas.addEventListener('pointerup',e=>{
    if(!down||Math.hypot(e.clientX-down[0],e.clientY-down[1])>5)return;
    const r=canvas.getBoundingClientRect();raycaster.setFromCamera(new THREE.Vector2((e.clientX-r.left)/r.width*2-1,-(e.clientY-r.top)/r.height*2+1),camera);
    if(mode==='function'){const hit=raycaster.intersectObject(functionLayer,true)[0];functions.select(hit?.object.userData.functionId);highlight.visible=!!hit;if(hit)highlight.box.setFromObject(hit.object);return;}
    const group=groups[{detail:'Architecture',height:'Analysis',baseline:'Baseline'}[mode]];
    const hit=raycaster.intersectObject(group,true).find(x=>x.object.userData.building_id);showSelection(hit?.object||null);
  });
  const resize=()=>{const width=canvas.clientWidth,height=canvas.clientHeight;if(!width||!height)return;const aspect=width/height;const half=scope==='full'?(aspect<1?1300/aspect:1120): (aspect<1?180/aspect:170);camera.left=-half*aspect;camera.right=half*aspect;camera.top=half;camera.bottom=-half;camera.updateProjectionMatrix();renderer.setSize(width,height,false);composer.setSize(width,height);};
  function setReference(show){
    if(functions)functions.setVisible(!show&&mode==='function');
    isReference=show;$('reference-panel').hidden=!show;document.querySelector('.stage').classList.toggle('reference-active',show);
    $('show-reference').setAttribute('aria-pressed',show);$('show-model').setAttribute('aria-pressed',!show);
    if(show&&scope!=='full')setScope('full');
    $('view-label').textContent=show?'Google Earth 影像核对':{function:'功能线索 · 公开数据初判',detail:'空间展示',height:'36 个轮廓 · GBA 估计',baseline:'平面核对 · 统一 12 米'}[mode];
    $('height-legend').hidden=show||mode!=='height';showSelection(null);
  }
  function setScope(next){
    if(next==='trial'&&mode==='function')setMode('baseline');
    scope=next;const full=next==='full';context.visible=full;trialBoundary.visible=full&&mode!=='function';model.getObjectByName('Base').visible=!full;satelliteBase.visible=full&&$('satellite-base').checked;
    $('count').textContent=full?contextMeta.v01_building_count:meta.building_count;$('sample-width').textContent=full?'1600':'240';
    $('scope-full').setAttribute('aria-pressed',full);$('scope-trial').setAttribute('aria-pressed',!full);
    $('scope-label').textContent=full?'1600 米全样方':'240 米试验区';
    $('scope-note').textContent=full?'完整样方已恢复。金框内 36 个轮廓为高度试验，其余为 12 米占位；平面轮廓均待影像核对。':'仅显示金框内 240 米街区，36 个轮廓。卫星对照将返回完整样方。';
    if(!full)setReference(false);showSelection(null);resize();view('overview');sunlight(Number($('sun').value));
  }
  $('scope-full').onclick=()=>setScope('full');$('scope-trial').onclick=()=>setScope('trial');
  $('show-reference').onclick=()=>setReference(true);$('show-model').onclick=()=>{if(mode==='function')setMode('baseline');setReference(false);};
  const observer=new ResizeObserver(resize);observer.observe(canvas);setScope('full');setReference(true);resize();
  const governor=createQualityGovernor({initial:1,locked:true,onChange:t=>{renderer.setPixelRatio(Math.min(devicePixelRatio,t.pixelRatio));renderer.shadowMap.enabled=t.shadows;sun.shadow.needsUpdate=true;resize();}});
  let last=performance.now();
  function frame(now=performance.now()){
    const dt=Math.min(.05,(now-last)/1000);governor.sample(now-last);last=now;
    if(animation){let t=Math.min(1,(now-animation.start)/750);t=t*t*(3-2*t);camera.position.lerpVectors(animation.from,animation.to,t);controls.target.lerpVectors(animation.fromTarget,animation.toTarget,t);camera.zoom=THREE.MathUtils.lerp(animation.fromZoom,1,t);camera.updateProjectionMatrix();if(t>=1)animation=null;}
    controls.update(dt);finish.uniforms.uTime.value=now/1000;if(!isReference)composer.render();
    $('north-arrow').style.transform=`rotate(${-controls.getAzimuthalAngle()*180/Math.PI}deg)`;
    const scaleLength=scope==='full'?200:50;$('scale-label').textContent=`${scaleLength} m`;const pixels=scaleLength*canvas.clientWidth/((camera.right-camera.left)/camera.zoom);document.querySelector('.scale i').style.width=`${pixels}px`;
  }
  function loop(now){if(disposed)return;frame(now);requestAnimationFrame(loop);}
  await renderer.compileAsync(scene,camera);frame();requestAnimationFrame(loop);$('loader').classList.add('done');$('loader').setAttribute('aria-hidden','true');
  window.__jining={ready:true,setMode,view,select:id=>showSelection(bodies.find(b=>b.userData.display_id===id)),
    getStats:()=>({mode,scope,isReference,fullBuildingRecords:contextMeta.v01_building_count,buildings:unique.size,drawCalls:renderer.info.render.calls,triangles:renderer.info.render.triangles,groups:Object.fromEntries(Object.entries(groups).map(([k,v])=>[k,v.visible])),selected:selection?.userData.display_id||null}),
    frame:(n=1)=>{for(let i=0;i<n;i++)frame(performance.now()+i*16.7);},
    dispose:()=>{disposed=true;observer.disconnect();controls.dispose();composer.dispose();renderer.dispose();}};
}
