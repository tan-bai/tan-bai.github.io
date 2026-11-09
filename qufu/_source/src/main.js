import * as T from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';
import {EffectComposer} from 'three/examples/jsm/postprocessing/EffectComposer.js';
import {RenderPass} from 'three/examples/jsm/postprocessing/RenderPass.js';
import {ShaderPass} from 'three/examples/jsm/postprocessing/ShaderPass.js';
import {OutputPass} from 'three/examples/jsm/postprocessing/OutputPass.js';
import {NAN_SCRUB,FINISH} from './shaders/post.js';
import {createQualityGovernor} from './quality.js';
const $=id=>document.getElementById(id),canvas=$('scene');
const asset=path=>import.meta.env.BASE_URL+path;
const renderer=new T.WebGLRenderer({canvas,antialias:true});renderer.setPixelRatio(Math.min(devicePixelRatio,1.5));renderer.toneMapping=T.AgXToneMapping;renderer.toneMappingExposure=1.3;
const scene=new T.Scene();scene.background=new T.Color('#e3e8de');
const camera=new T.OrthographicCamera(-1200,1200,1200,-1200,.1,12000);const controls=new OrbitControls(camera,canvas);controls.enableDamping=true;controls.maxPolarAngle=Math.PI*.48;controls.minZoom=.3;controls.maxZoom=20;
scene.add(new T.HemisphereLight('#f3f5ff','#747d67',2.4));const sun=new T.DirectionalLight('#fff0db',2.5);sun.position.set(-1200,2200,1400);scene.add(sun);
const composer=new EffectComposer(renderer);composer.addPass(new RenderPass(scene,camera));composer.addPass(new ShaderPass(NAN_SCRUB));composer.addPass(new OutputPass());const finish=new ShaderPass(FINISH);finish.uniforms.uFade.value=0;finish.uniforms.uAberration.value=0;finish.uniforms.uGrain.value=.002;finish.uniforms.uVignette.value=.08;composer.addPass(finish);
function resize(){const r=canvas.parentElement.getBoundingClientRect();const aspect=r.width/r.height;camera.left=-1150*aspect;camera.right=1150*aspect;camera.top=1150;camera.bottom=-1150;camera.updateProjectionMatrix();renderer.setSize(r.width,r.height,false);composer.setSize(r.width,r.height)}new ResizeObserver(resize).observe(canvas.parentElement);resize();
function showModel(){ $('reference').hidden=true;$('model').classList.add('active');$('sat').classList.remove('active') }
function view(which){showModel();controls.autoRotate=false;controls.target.set(0,0,0);camera.zoom=1;camera.position.set(1700,2400,2200);if(which==='top')camera.position.set(0,3000,.01);if(which==='temple'){controls.target.set(-20,0,20);camera.position.set(450,700,850);camera.zoom=2.6}camera.updateProjectionMatrix();controls.update()}
$('model').onclick=showModel;$('sat').onclick=()=>{$('reference').hidden=false;$('sat').classList.add('active');$('model').classList.remove('active')};for(const v of ['overview','top','temple'])$(v).onclick=()=>view(v);$('orbit').onclick=()=>{showModel();controls.autoRotate=!controls.autoRotate};view('overview');
const governor=createQualityGovernor({initial:1,locked:true,onChange:()=>{}});let last=performance.now();renderer.setAnimationLoop(now=>{governor.sample(now-last);last=now;controls.update();finish.uniforms.uTime.value=now/1000;if($('reference').hidden)composer.render()});
try{const model=(await new GLTFLoader().loadAsync(asset('models/qufu_gba.glb'))).scene;scene.add(model);const bodies=[];model.traverse(n=>{if(n.isMesh){let p=n;while(p&&!p.userData.kind)p=p.parent;if(p?.userData.kind==='building'){n.userData={...p.userData};bodies.push(n)}n.userData.originalMaterial=n.material}});const ids=new Set(bodies.map(n=>n.userData.id));if(ids.size!==2658)throw Error('建筑数量核验失败');$('status').textContent='全样方已载入 · 2658 个建筑轮廓';
const plain=new T.MeshStandardMaterial({color:'#c0b9a4',roughness:1});$('plain').onchange=e=>{bodies.forEach(n=>n.material=e.target.checked?plain:n.userData.originalMaterial)};
const helper=new T.Box3Helper(new T.Box3(),0xe7a94a);helper.visible=false;scene.add(helper);const ray=new T.Raycaster();let down;
canvas.onpointerdown=e=>down=[e.clientX,e.clientY];canvas.onpointerup=e=>{if(!down||Math.hypot(e.clientX-down[0],e.clientY-down[1])>5)return;const r=canvas.getBoundingClientRect();ray.setFromCamera(new T.Vector2((e.clientX-r.left)/r.width*2-1,-(e.clientY-r.top)/r.height*2+1),camera);const hit=ray.intersectObjects(bodies,false)[0];helper.visible=!!hit;if(hit){helper.box.setFromObject(hit.object);const d=hit.object.userData;$('detail').textContent=`${d.name||'建筑轮廓'}\n高度：${d.height_m} m（${d.height_method?.startsWith('GBA.')?'GBA 估计':d.height_method?.includes('placeholder')?'占位':'来源值，未核验'}）${d.height_sample_count ? `\nGBA 采样：${d.height_sample_count} 个 3m 像元` : ''}${d.gba_height_m<2?'\n待复核：GBA 估计低于 2 米':''}${d.height_sample_count<3?'\n待复核：有效像元少于 3 个':''}${d.height_valid_pixel_fraction<.5?'\n待复核：有效像元覆盖不足一半':''}\n面积：${Math.round(d.area_m2)} m²\n来源：${d.source||'公开建筑数据'}\n屋顶：${d.roof_method||'示意'}`;$('detail').style.whiteSpace='pre-line'}};
}catch(e){$('status').textContent='加载失败：'+e.message;console.error(e)}

try {const report=await (await fetch(asset('height_summary.json'))).json();const h=report.statistics;$('height-stats').textContent=`楼高中位数 ${h.median_m.toFixed(1)} m · 范围 ${h.min_m.toFixed(1)}–${h.max_m.toFixed(1)} m。${h.below_2m_count} 栋估计低于 2 m，已标记复核。`;} catch(e) {$('height-stats').textContent='高度统计暂不可用';console.error(e)}
