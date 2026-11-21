// ===================== 3D MODE =====================
// A broadcast-style 3D view of the same game. It does NOT decide anything: every frame it reads the positions the
// 2D play animation computes (drawPlayers / ball / drawField hooks), so scores, stats and history are identical.
const V3={speed:1,on:false,ready:false,cam:'bc',snd:true,playing:false,tgt:null,ball:null,los:null,fd:null,dir:1,game:null,excite:0,celebrate:null,fallT:0,tagUntil:0};
let R3=null,S3=null,C3=null,SUN3=null;
const v3Pref=()=>LS.get('fn_3d')==='1';
function v3Toggle(){V3.on=!V3.on;LS.set('fn_3d',V3.on?'1':'0');v3Apply()}
function v3Apply(){const c=$('#v3c'),ui=$('#v3ui');if(!c)return;
 // Season perk: your team gets a small edge while you play/watch your season game in 3D (never in Play Now).
 if(G&&G.edge3d)G.edge3d.on=V3.on;
 if(V3.on){if(!V3.ready){try{v3Init()}catch(e){console.error(e);V3.on=false;bToast&&bToast('3D not supported on this device');return}}aud3.init();c.style.display='block';ui.style.display='flex';V3.game=null;if(!v3raf)v3raf=requestAnimationFrame(v3Frame);try{if(G&&!busy&&typeof drawState==='function')drawState()}catch(e){}}
 else{c.style.display='none';ui.style.display='none';$('#v3tag').style.display='none';aud3.pause()}
 const b=$('#b3d');if(b)b.classList.toggle('on',V3.on)}

// ---------- helpers ----------
const v3Tex={};
function v3TexFrom(src,key){if(!src)return null;key=key||src.slice(0,64)+src.length;if(v3Tex[key])return v3Tex[key];const t=new THREE.TextureLoader().load(src);t.encoding=THREE.sRGBEncoding;t.anisotropy=4;v3Tex[key]=t;return t}
function v3Canvas(w,h,draw){const c=document.createElement('canvas');c.width=w;c.height=h;draw(c.getContext('2d'),w,h);const t=new THREE.CanvasTexture(c);t.encoding=THREE.sRGBEncoding;t.anisotropy=4;return t}
function v3Rng(seed){let h=2166136261;for(const ch of String(seed))h=Math.imul(h^ch.charCodeAt(0),16777619);return()=>{h+=0x6D2B79F5;let t=h;t=Math.imul(t^t>>>15,t|1);t^=t+Math.imul(t^t>>>7,t|61);return((t^t>>>14)>>>0)/4294967296}}
const v3Mat=(c,o={})=>new THREE.MeshLambertMaterial({color:c,...o});

// ---------- scene ----------
let v3Field=null,v3Stands=null,v3Crowd=null,v3Board=null,v3BoardTex=null,v3Lines={},v3Players=[],v3Refs=[],v3Ball=null,v3Masc=[];
function v3Init(){const cv=$('#v3c');if(THREE.ColorManagement)THREE.ColorManagement.legacyMode=false;
 R3=new THREE.WebGLRenderer({canvas:cv,antialias:true,powerPreference:'high-performance'});R3.setPixelRatio(Math.min(window.devicePixelRatio||1,1.75));
 R3.outputEncoding=THREE.sRGBEncoding;R3.shadowMap.enabled=true;R3.shadowMap.type=THREE.PCFSoftShadowMap;
 S3=new THREE.Scene();S3.background=new THREE.Color('#04060c');S3.fog=new THREE.Fog('#04060c',110,260);
 C3=new THREE.PerspectiveCamera(50,1,.3,600);C3.position.set(30,8,26);
 S3.add(new THREE.HemisphereLight('#a9bcff','#1d3a1f',.6));
 SUN3=new THREE.DirectionalLight('#fff4dc',1.05);SUN3.castShadow=true;SUN3.shadow.mapSize.set(2048,2048);SUN3.shadow.radius=3;
 const sc=SUN3.shadow.camera;sc.left=-32;sc.right=32;sc.top=32;sc.bottom=-32;sc.near=5;sc.far=160;SUN3.shadow.bias=-.0008;S3.add(SUN3,SUN3.target);
 const fill=new THREE.DirectionalLight('#d8e4ff',.42);fill.position.set(60,45,110);S3.add(fill);
 v3Env();v3Sky();
 // sky stars
 {const n=500,p=new Float32Array(n*3);for(let i=0;i<n;i++){const a=Math.random()*Math.PI*2,e=.15+Math.random()*.8,r=420;p[i*3]=50+Math.cos(a)*Math.cos(e)*r;p[i*3+1]=Math.sin(e)*r;p[i*3+2]=26+Math.sin(a)*Math.cos(e)*r}
  const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.BufferAttribute(p,3));S3.add(new THREE.Points(g,new THREE.PointsMaterial({color:'#cfd8ff',size:1.3,sizeAttenuation:false,fog:false})))}
 // outer ground
 const gr=new THREE.Mesh(new THREE.PlaneGeometry(700,700),v3Mat('#0c2412'));gr.rotation.x=-Math.PI/2;gr.position.set(50,-.05,26.66);gr.receiveShadow=true;S3.add(gr);
 // LOS / first-down lines
 for(const [k,c] of [['los','#39a0ff'],['fd','#ffd400']]){const m=new THREE.Mesh(new THREE.PlaneGeometry(.22,53.33),new THREE.MeshBasicMaterial({color:c,transparent:true,opacity:.9}));m.rotation.x=-Math.PI/2;m.position.set(0,.03,26.66);m.visible=false;S3.add(m);v3Lines[k]=m}
 v3Goalposts();v3LightTowers();
 // ball
 {const g=new THREE.Group(),m=new THREE.Mesh(new THREE.SphereGeometry(1,14,10),new THREE.MeshPhongMaterial({color:'#7a3f17',shininess:30}));m.scale.set(.11,.11,.19);m.castShadow=true;
  const lace=new THREE.Mesh(new THREE.BoxGeometry(.02,.015,.09),new THREE.MeshBasicMaterial({color:'#fff'}));lace.position.y=.11;m.add(lace);lace.scale.set(1/.11,1/.11,1/.19);
  g.add(m);g.userData.m=m;S3.add(g);v3Ball=g}
 for(let i=0;i<22;i++){const p=v3Man();S3.add(p.g);v3Players.push(p)}
 v3MakeRefs();
 v3BoardTex=v3Canvas(512,256,()=>{});
 V3.ready=true}

function v3Goalposts(){const y=new THREE.MeshPhongMaterial({color:'#ffd21f',shininess:60}),pad=v3Mat('#c8102e');
 for(const x of[-10,110]){const g=new THREE.Group();const base=new THREE.Mesh(new THREE.CylinderGeometry(.13,.13,3.33,10),y);base.position.y=1.66;
  const p2=new THREE.Mesh(new THREE.CylinderGeometry(.33,.33,2,10),pad);p2.position.y=1;const arm=new THREE.Mesh(new THREE.CylinderGeometry(.09,.09,1.6,8),y);arm.rotation.z=Math.PI/2;arm.position.set(x<0?-.8:.8,3.33,0);
  const bar=new THREE.Mesh(new THREE.CylinderGeometry(.08,.08,7.83,8),y);bar.rotation.x=Math.PI/2;bar.position.set(x<0?-1.6:1.6,3.33,0);g.add(base,p2,arm,bar);
  for(const z of[-3.9,3.9]){const u=new THREE.Mesh(new THREE.CylinderGeometry(.06,.06,6.7,8),y);u.position.set(x<0?-1.6:1.6,3.33+3.35,z);g.add(u)}
  g.position.set(x+(x<0?-.8:.8),0,26.66);g.traverse(o=>{if(o.isMesh)o.castShadow=true});S3.add(g)}}
function v3Glow(){return v3Canvas(64,64,(c)=>{const gr=c.createRadialGradient(32,32,0,32,32,32);gr.addColorStop(0,'rgba(255,255,240,1)');gr.addColorStop(.25,'rgba(255,248,220,.6)');gr.addColorStop(1,'rgba(255,240,200,0)');c.fillStyle=gr;c.fillRect(0,0,64,64)})}
function v3LightTowers(){const glow=v3Glow(),pole=v3Mat('#2b2f36'),lamp=new THREE.MeshBasicMaterial({color:'#fffbe6'});
 for(const [x,z] of [[8,-34],[92,-34],[8,87.3],[92,87.3]]){const g=new THREE.Group();const p=new THREE.Mesh(new THREE.CylinderGeometry(.35,.6,34,8),pole);p.position.y=17;g.add(p);
  const head=new THREE.Mesh(new THREE.BoxGeometry(7,3.2,.5),pole);head.position.y=35;g.add(head);
  for(let i=0;i<4;i++)for(let j=0;j<2;j++){const l=new THREE.Mesh(new THREE.PlaneGeometry(1.3,1.1),lamp);l.position.set(-2.4+i*1.6,34.2+j*1.5,z<0?.3:-.3);if(z>0)l.rotation.y=Math.PI;g.add(l)}
  const sp=new THREE.Sprite(new THREE.SpriteMaterial({map:glow,color:'#fff6dc',transparent:true,depthWrite:false,blending:THREE.AdditiveBlending,fog:false}));sp.scale.set(22,14,1);sp.position.set(0,35,z<0?1:-1);g.add(sp);
  g.position.set(x,0,z);S3.add(g);v3Beam(new THREE.Vector3(x,35,z),new THREE.Vector3(x<50?30:70,0,26.66))}}

// stadium for the current home team: field texture, bleachers, crowd, scoreboard, mascots
function v3BuildVenue(g){const home=g.venue||g.h,S=stadiumFor(home);
 if(v3Field){S3.remove(v3Field);v3Field.material.map.dispose()}
 // field texture covers x -30..130, z -24..77 (yards)
 const X0=-30,Z0=-24,WY=160,HY=101,s=16,W=WY*s,H=HY*s;
 const tex=v3Canvas(W,H,()=>{});const cvs=tex.image,ctx2=cvs.getContext('2d');
 const paint=()=>{try{drawTopField(ctx2,W,H,home,a=>(a-X0)*s,y=>(y-Z0)*s,s);v3GrassDetail(ctx2,W,H,a=>(a-X0)*s,y=>(y-Z0)*s,s,S)}catch(e){console.error(e)}tex.needsUpdate=true};paint();setTimeout(paint,500);setTimeout(paint,1500);
 tex.anisotropy=R3.capabilities.getMaxAnisotropy();
 v3Field=new THREE.Mesh(new THREE.PlaneGeometry(WY,HY),new THREE.MeshLambertMaterial({map:tex}));v3Field.rotation.x=-Math.PI/2;v3Field.position.set(X0+WY/2,0,Z0+HY/2);v3Field.receiveShadow=true;S3.add(v3Field);
 // bleachers + crowd
 if(v3Stands)S3.remove(v3Stands);if(v3Crowd){S3.remove(v3Crowd.body);S3.remove(v3Crowd.head)}
 if(S.farm){V3.hype=0;aud3.base=0;if(aud3.crowd)aud3.crowd.gain.value=aud3.base;try{v3Stands=v3Farm()}catch(e){console.error('farm field',e);v3Stands=new THREE.Group()}S3.add(v3Stands);v3Crowd={body:new THREE.Group(),head:new THREE.Group(),seats:[]};
  if(v3Board)S3.remove(v3Board);v3Board=null;for(const m of v3Masc)S3.remove(m.sp);v3Masc=[];v3SidelineAndProps(g);v3Refresh();return}
 // Crowd size follows the stakes: Penn vs Mishawaka and big playoff nights pack the place.
 const hype=v3Hype(g);V3.hype=hype;aud3.base=.04+.09*hype;if(aud3.crowd)aud3.crowd.gain.value=aud3.base;
 v3Stands=new THREE.Group();const front=S.track?24:9,rows=8+Math.round(hype*8),skipP=.42-hype*.4,steel=v3Mat('#5d636c'),dark=v3Mat('#23272e');
 const seats=[];const hc=home.c1||'#444',ac=(g.h===home?g.a:g.h).c1;
 for(const side of[-1,1]){const zf=side<0?-front:53.33+front;
  for(let i=0;i<rows;i++){const b=new THREE.Mesh(new THREE.BoxGeometry(118,.5*(i+1),.95),i%2?steel:dark);b.position.set(50,.25*(i+1),zf+side*(i*.95+.47));b.receiveShadow=true;v3Stands.add(b);
   for(let x=-7;x<=107;x+=.78){if(Math.random()<skipP)continue;seats.push({x:x+(Math.random()-.5)*.25,y:.5*(i+1),z:zf+side*(i*.95+.47),side,row:i})}}
  const wall=new THREE.Mesh(new THREE.BoxGeometry(118,1.2,.3),new THREE.MeshLambertMaterial({color:side<0?hc:ac}));wall.position.set(50,.6,zf-side*.2);v3Stands.add(wall);
  const back=new THREE.Mesh(new THREE.BoxGeometry(118,3,.4),dark);back.position.set(50,.5*rows+1.5,zf+side*(rows*.95+.2));v3Stands.add(back)}
 // press box on home side
 {const pb=new THREE.Mesh(new THREE.BoxGeometry(26,4,4),v3Mat('#2a2e35'));pb.position.set(50,.5*rows+4.5,-front-rows*.95-1.5);v3Stands.add(pb);
  const glass=new THREE.Mesh(new THREE.PlaneGeometry(24,1.6),new THREE.MeshBasicMaterial({color:'#ffe8a8'}));glass.position.set(50,.5*rows+5,-front-rows*.95+.52);v3Stands.add(glass);
  const sign=new THREE.Mesh(new THREE.PlaneGeometry(24,1.4),new THREE.MeshBasicMaterial({map:v3Canvas(1024,64,(c,w,h)=>{c.fillStyle=home.c1;c.fillRect(0,0,w,h);c.fillStyle=home.c2||'#fff';c.font='700 46px Oswald,Arial Narrow,sans-serif';c.textAlign='center';c.textBaseline='middle';c.fillText((S.board||home.school+' '+home.name).toUpperCase(),w/2,h/2+2)})}));sign.position.set(50,.5*rows+3.3,-front-rows*.95+.52);v3Stands.add(sign)}
 // standing-room crowd behind both end zones on the biggest nights
 if(hype>=.6){const zr=Math.round(4+hype*5);for(const ex of[-1,1]){const x0=ex<0?-22-(S.track?8:0):122+(S.track?8:0);
   for(let i=0;i<zr;i++){const b=new THREE.Mesh(new THREE.BoxGeometry(.95,.5*(i+1),40),i%2?steel:dark);b.position.set(x0+ex*(i*.95),.25*(i+1),26.66);v3Stands.add(b);
    for(let z=8;z<=45;z+=.8){if(Math.random()<skipP+.05)continue;seats.push({x:x0+ex*(i*.95),y:.5*(i+1),z:z+(Math.random()-.5)*.25,side:ex<0?-1:1,row:i})}}}}
 S3.add(v3Stands);
 // crowd: instanced bodies + heads, colored by side
 const n=seats.length,bodyG=new THREE.BoxGeometry(.44,.62,.3),headG=new THREE.BoxGeometry(.24,.24,.24);
 const body=new THREE.InstancedMesh(bodyG,new THREE.MeshLambertMaterial(),n),head=new THREE.InstancedMesh(headG,new THREE.MeshLambertMaterial(),n);
 const awayT=g.h===home?g.a:g.h,pal=(t,fan)=>fan?[t.c1,t.c1,t.c2,'#ffffff',t.c3||t.c1]:['#3a3f47','#5b4a3a','#22324a','#6b6b6b','#8a2b2b','#2e5a3a'];
 const skins=['#f1c7a3','#d9a47a','#b97c53','#8d5a3b','#5e3b26'],m4=new THREE.Matrix4(),col=new THREE.Color();
 seats.forEach((p,i)=>{const fan=Math.random()<.78,P=pal(p.side<0?home:awayT,fan);col.set(P[Math.floor(Math.random()*P.length)]);body.setColorAt(i,col);col.set(skins[Math.floor(Math.random()*5)]);head.setColorAt(i,col);
  p.ph=Math.random()*6.28;p.hype=.5+Math.random();m4.makeTranslation(p.x,p.y+.36,p.z);body.setMatrixAt(i,m4);m4.makeTranslation(p.x,p.y+.82,p.z);head.setMatrixAt(i,m4)});
 body.instanceMatrix.setUsage(THREE.DynamicDrawUsage);head.instanceMatrix.setUsage(THREE.DynamicDrawUsage);S3.add(body,head);v3Crowd={body,head,seats};
 // scoreboard behind the end zone the home team defends at x<0
 if(v3Board)S3.remove(v3Board);v3Board=new THREE.Group();const bm=new THREE.Mesh(new THREE.PlaneGeometry(20,10),new THREE.MeshBasicMaterial({map:v3BoardTex,fog:false}));bm.position.y=13;bm.rotation.y=Math.PI/2;
 const frame=new THREE.Mesh(new THREE.BoxGeometry(.6,11,21),dark);frame.position.set(-.35,13,0);const leg=new THREE.Mesh(new THREE.BoxGeometry(.6,8,.8),dark);leg.position.set(-.35,4,-6);const leg2=leg.clone();leg2.position.z=6;
 v3Board.add(frame,bm,leg,leg2);v3Board.position.set(-24-(S.track?8:0)-(V3.hype>=.6?11:0),0,26.66);S3.add(v3Board);v3DrawBoard();
 // mascots on each sideline
 for(const m of v3Masc)S3.remove(m.sp);v3Masc=[];
 for(const [t,z] of [[g.h,-4.2],[g.a,57.5]]){const src=t.mascot||t.logo||t.logoBuiltIn;if(!src)continue;const sp=new THREE.Sprite(new THREE.SpriteMaterial({map:v3TexFrom(src),transparent:true,alphaTest:.05}));sp.scale.set(3,3,1);sp.position.set(45+Math.random()*10,1.6,z);S3.add(sp);v3Masc.push({sp,t,x:sp.position.x,z,ph:Math.random()*6})}
 v3SidelineAndProps(g);v3Refresh()}
function v3DrawBoard(){if(!v3BoardTex||!G)return;const c=v3BoardTex.image.getContext('2d'),g=G,w=512,h=256,home=g.venue&&g.venue.id?g.venue:g.h,S=stadiumFor(home);
 c.fillStyle='#0a0a0a';c.fillRect(0,0,w,h);c.fillStyle=home.c1;c.fillRect(0,0,w,42);c.fillStyle=home.c2||'#fff';c.font='700 30px Oswald,Arial Narrow,sans-serif';c.textAlign='center';c.textBaseline='middle';c.fillText((S.board||home.school).toUpperCase().slice(0,30),w/2,22);
 const side=(t,sc,x)=>{c.fillStyle='#ddd';c.font='600 30px Oswald,Arial Narrow,sans-serif';c.fillText(t.abbr,x,78);c.fillStyle='#ff5a1f';c.font='700 86px "Courier New",monospace';c.fillText(String(sc).padStart(2,' '),x,150)};
 side(g.a,g.score.a,110);side(g.h,g.score.h,402);
 c.fillStyle='#ffd400';c.font='700 44px "Courier New",monospace';c.fillText(g.over?'FINAL':g.ot?'OT':clk(g.clock),w/2,120);c.fillStyle='#ddd';c.font='600 26px Oswald,sans-serif';c.fillText(g.over?'':g.ot?'':'QTR '+g.q,w/2,165);
 if(!g.over&&g.phase!=='kickoff'){c.font='600 26px Oswald,sans-serif';c.fillText('DOWN '+g.down+'   TO GO '+(g.ball+g.togo>=100?'G':g.togo)+'   BALL ON '+(g.ball<=50?g.ball:100-g.ball),w/2,222)}
 const poss=g.poss==='h'?402:110;if(!g.over){c.fillStyle='#ffd400';c.beginPath();c.arc(poss,196,7,0,7);c.fill()}
 v3BoardTex.needsUpdate=true}

// ---------- people ----------
const v3G={};
function v3Lathe(prof,len){const n=prof.length,pts=[];for(let i=n-1;i>=0;i--)pts.push(new THREE.Vector2(prof[i],-len*i/(n-1)));return new THREE.LatheGeometry(pts,12)}
function v3Geos(){if(v3G.th)return v3G;Object.assign(v3G,{th:new THREE.CylinderGeometry(.11,.09,.52,8),sh:new THREE.CylinderGeometry(.08,.065,.46,8),shoe:new THREE.BoxGeometry(.13,.08,.28),
 torso:new THREE.BoxGeometry(.56,.6,.32),pads:new THREE.SphereGeometry(.3,16,10),neck:new THREE.CylinderGeometry(.07,.08,.12,8),helm:new THREE.SphereGeometry(.18,14,12),
 ua:new THREE.CylinderGeometry(.09,.075,.34,10),fa:new THREE.CylinderGeometry(.06,.05,.3,8),hand:new THREE.SphereGeometry(.055,8,6),bar:new THREE.BoxGeometry(.24,.025,.025),
 stripe:new THREE.BoxGeometry(.05,.03,.38),ps:new THREE.BoxGeometry(.02,.5,.06),knee:new THREE.SphereGeometry(.1,8,6),band:new THREE.CylinderGeometry(.065,.065,.05,8),face:new THREE.SphereGeometry(.13,12,10),
 cage:new THREE.TorusGeometry(.17,.011,5,16,Math.PI),torsoC:new THREE.CylinderGeometry(.3,.235,.62,18),numF:new THREE.CylinderGeometry(.307,.241,.5,10,1,true,-.95,1.9),numB:new THREE.CylinderGeometry(.307,.241,.5,10,1,true,Math.PI-.95,1.9),thighM:v3Lathe([.118,.134,.13,.116,.098,.088],.5),calfM:v3Lathe([.08,.094,.09,.074,.06,.054],.45),
 uarmM:v3Lathe([.094,.104,.098,.084,.072],.32),farmM:v3Lathe([.07,.074,.066,.056,.05],.28),sleeve:new THREE.CylinderGeometry(.112,.104,.15,12),kpad:new THREE.SphereGeometry(.096,10,8),vbar:new THREE.BoxGeometry(.018,.15,.018),chin:new THREE.BoxGeometry(.12,.03,.04),decal:new THREE.PlaneGeometry(.17,.17),cap:new THREE.CylinderGeometry(.15,.16,.12,12),brim:new THREE.BoxGeometry(.2,.02,.14)});return v3G}
function v3Man(ref){const G3=v3Geos(),g=new THREE.Group(),body=new THREE.Group();g.add(body);
 const P=(c,r=.75,mt=0)=>new THREE.MeshStandardMaterial({color:c,roughness:r,metalness:mt});
 const m={jersey:P('#888',.78),pants:P('#ddd',.55),helmet:P('#555',.22,.35),skin:P('#c58c5c',.65),sock:P('#222',.85),shoe:P('#111',.45),mask:P('#c9c9c9',.35,.6),stripe:P('#fff',.3,.2),front:P('#888',.78),back:P('#888',.78),glove:P('#222',.6),pstripe:P('#fff',.55)};
 const mk=(geo,mat,x,y,z,par)=>{const o=new THREE.Mesh(geo,mat);o.position.set(x,y,z);o.castShadow=true;(par||body).add(o);return o};
 const leg=sx=>{const hip=new THREE.Group();hip.position.set(sx*.12,1.0,0);body.add(hip);mk(G3.thighM,m.pants,0,0,0,hip);if(!ref){const st=mk(G3.ps,m.pstripe,sx*.124,-.22,0,hip);st.scale.set(.8,.82,.55)}
  const knee=new THREE.Group();knee.position.set(0,-.5,0);hip.add(knee);mk(G3.kpad,m.pants,0,0,.025,knee);mk(G3.calfM,ref?m.sock:m.sock,0,-.02,0,knee);mk(G3.shoe,m.shoe,0,-.48,.05,knee);hip.userData.knee=knee;return hip};
 const arm=sx=>{const sh=new THREE.Group();sh.position.set(sx*.36,1.56,0);body.add(sh);mk(G3.sleeve,m.jersey,0,-.06,0,sh);mk(G3.uarmM,ref?m.jersey:m.skin,0,-.04,0,sh);
  const el=new THREE.Group();el.position.set(0,-.34,0);sh.add(el);mk(G3.farmM,m.skin,0,0,0,el);if(!ref)mk(G3.band,m.stripe,0,-.2,0,el);mk(G3.hand,ref?m.skin:m.glove,0,-.31,0,el);sh.userData.el=el;return sh};
 const legL=leg(-1),legR=leg(1),armL=arm(-1),armR=arm(1);
 // rounded V-taper torso with the numbers wrapped on the front and back
 const torso=mk(G3.torsoC,m.jersey,0,1.31,0);torso.scale.set(1,1,.6);for(const [geo,mat] of [[G3.numF,m.front],[G3.numB,m.back]]){mat.polygonOffset=true;mat.polygonOffsetFactor=-2;const d=mk(geo,mat,0,1.33,0);d.scale.set(1,1,.6)}
 const pads=ref?null:mk(G3.pads,m.jersey,0,1.57,0);if(pads)pads.scale.set(1.24,.42,.74);mk(G3.neck,m.skin,0,1.68,0);
 let helm,deco=[];
 if(ref){helm=mk(new THREE.SphereGeometry(.14,12,10),m.skin,0,1.84,0);const cap=mk(G3.cap,m.helmet,0,1.95,0);mk(G3.brim,m.helmet,0,1.9,.14)}
 else{mk(G3.face,m.skin,0,1.83,.06);helm=mk(G3.helm,m.helmet,0,1.87,-.01);helm.scale.set(1,1.02,1.12);mk(G3.stripe,m.stripe,0,2.05,-.01);
  for(const [y,r] of [[1.85,.17],[1.79,.165],[1.73,.15]]){const b=mk(G3.cage,m.mask,0,y,.0);b.scale.set(r/.17,1,r/.17*1.05);b.rotation.set(Math.PI/2,0,0)}mk(G3.vbar,m.mask,0,1.79,.2);mk(G3.chin,m.mask,0,1.7,.1);
  for(const sx of[-1,1]){const d=new THREE.Mesh(G3.decal,new THREE.MeshBasicMaterial({transparent:true,alphaTest:.25,depthWrite:false}));d.position.set(sx*.183,1.88,0);d.rotation.y=sx*Math.PI/2;body.add(d);deco.push(d)}}
 g.traverse(o=>{if(o.isMesh)o.castShadow=true});
 return{g,body,legL,legR,armL,armR,kneeL:legL.userData.knee,kneeR:legR.userData.knee,elL:armL.userData.el,elR:armR.userData.el,m,deco,torso,pos:new THREE.Vector3(),vel:new THREE.Vector3(),ph:Math.random()*6,yaw:0,fall:0,fallOn:false,key:'',lean:0,pose:null}}
// jersey number textures
const v3NumC={};
function v3NumTex(jersey,num,col,out,back,name){const k=[jersey,num,col,out,back,name].join('|');if(v3NumC[k])return v3NumC[k];
 const t=v3Canvas(128,128,(c,w,h)=>{c.fillStyle=jersey;c.fillRect(0,0,w,h);c.textAlign='center';c.textBaseline='middle';
  if(back&&name){c.fillStyle=col;c.font='700 17px Oswald,Arial Narrow,sans-serif';c.fillText(String(name).toUpperCase().slice(0,11),w/2,16)}
  c.font=`700 ${back?74:66}px Oswald,Arial Narrow,sans-serif`;c.lineWidth=7;c.strokeStyle=out||'#000';c.strokeText(String(num??''),w/2,back?76:70);c.fillStyle=col;c.fillText(String(num??''),w/2,back?76:70)});
 return v3NumC[k]=t}
function v3Dress(p,t,pl){const side=kitSide(t),u=uniformOf(t,side),key=t.id+side+(pl?pl.num+pl.last:'');if(p.key===key)return;p.key=key;
 // body size from the real roster: height sets how tall, weight (for that height) sets how wide
 {const hv=pl&&pl.ht,m=typeof hv==='string'&&hv.match(/(\d)\D+(\d+)/),inch=typeof hv==='number'&&hv>50?hv:m?(+m[1])*12+(+m[2]):73,wt=pl&&+pl.wt||210,rh=inch/74,hs=1+(rh-1)*1.6,exp=205*rh*rh,ws=Math.max(.78,Math.min(1.45,Math.pow(wt/exp,.85)));p.g.scale.set(ws,hs,Math.max(.85,Math.min(1.3,ws)))}
 const m=p.m;m.jersey.color.set(u.jersey);m.pants.color.set(u.pants||'#ddd');m.helmet.color.set(u.helmet||t.c1);m.sock.color.set(u.socks||t.c1);if(pl&&pl.wild)m.sock.color.set('#3d5f8f')/* Sean's jeans showing under the uniform */;m.stripe.color.set(u.hstripe||u.trim||'#fff');m.pstripe.color.set(u.pstripe||u.trim||u.jersey);m.glove.color.set(u.trim&&u.trim!==u.jersey?u.trim:'#1a1a1a');
 const nc=u.num||'#fff',no=u.numOut||(nc.toUpperCase()==='#FFFFFF'?'#000':'#111');
 m.front.map=v3NumTex(u.jersey,pl&&(pl.numStr||pl.num),nc,no,false);m.back.map=v3NumTex(u.jersey,pl&&(pl.numStr||pl.num),nc,no,true,pl&&pl.last);m.front.color.set('#fff');m.back.color.set('#fff');m.front.needsUpdate=m.back.needsUpdate=true;
 const r=v3Rng(key),sk=['#f1c7a3','#d9a47a','#b97c53','#8d5a3b','#5e3b26'];m.skin.color.set(sk[Math.floor(r()*5)]);{const tp=V3_TEAMSKIN[t.id];if(tp){let x=r(),acc=0;for(const [w,tones] of tp){acc+=w;if(x<acc){m.skin.color.set(tones[Math.floor(r()*tones.length)]);break}}}const o=pl&&v3SkinOf(t.id,pl);if(o)m.skin.color.set(o)}
 const lg=u.hlogo&&u.hlogo();const tx=lg?v3TexFrom(lg):null;for(const d of p.deco){d.material.map=tx;d.visible=!!tx;d.material.needsUpdate=true}}
function v3MakeRefs(){const stripes=v3Canvas(64,64,(c)=>{for(let i=0;i<8;i++){c.fillStyle=i%2?'#111':'#f4f4f4';c.fillRect(i*8,0,8,64)}});
 for(let i=0;i<5;i++){const r=v3Man(true);r.m.jersey.map=stripes;r.m.front.map=stripes;r.m.back.map=stripes;r.m.jersey.color.set('#fff');r.m.front.color.set('#fff');r.m.back.color.set('#fff');
  r.m.pants.color.set('#f0f0f0');r.m.sock.color.set('#111');r.m.helmet.color.set(i===0?'#ffffff':'#111111');r.m.skin.color.set(['#e8b996','#b97c53','#d9a47a','#8d5a3b','#f1c7a3'][i]);
  S3.add(r.g);r.role=['R','U','HL','LJ','BJ'][i];v3Refs.push(r)}}
// which real players are in each slot
function v3Slots(t,off){const d=t.depth,g=(k,i)=>d[k]&&d[k].length?d[k][Math.min(i,d[k].length-1)]:null;
 if(off)return[g('OL',0),g('OL',1),g('OL',2),g('OL',3),g('OL',4),g('TE',0),g('WR',0),g('WR',1),g('WR',2),g('QB',0),g('RB',0)];
 return t.front==='34'?[g('DL',0),g('DL',1),g('DL',2),g('LB',0),g('LB',1),g('LB',2),g('LB',3),g('CB',0),g('CB',1),g('S',0),g('S',1)]
  :[g('DL',0),g('DL',1),g('DL',2),g('DL',3),g('LB',0),g('LB',1),g('LB',2),g('CB',0),g('CB',1),g('S',0),g('S',1)]}

// ---------- hooks called by the 2D renderer ----------
// Guard: the 2D animation can produce a stray NaN for a frame (it just draws nothing there); never let one into the 3D scene.
const v3Ok=v=>typeof v==='number'&&isFinite(v);
function v3Cap(F,oT,dT,hlO,hlD){const prev=V3.tgt,fix=(arr,pa)=>arr.map((p,i)=>v3Ok(p.x)&&v3Ok(p.y)?{x:p.x,y:p.y}:(pa&&pa[i])||{x:50,y:26.66});
 V3.tgt={o:fix(F.o,prev&&prev.o),d:fix(F.d,prev&&prev.d),oT,dT,hlO,hlD}}
function v3CapBall(p,h){if(!p||!v3Ok(p.x)||!v3Ok(p.y))return;V3.ball={x:p.x,y:p.y,h:v3Ok(h)?h:0}}
function v3CapField(los,dir,fd){V3.dir=dir===-1?-1:1;V3.los=v3Ok(los)?los:null;V3.fd=v3Ok(fd)?fd:null}
function v3Refresh(){if(!V3.ready||!G)return;v3DrawBoard()}
function v3PlayStart(){V3.playing=true;V3.fallT=0;for(const p of v3Players){p.fallOn=false}}
function v3PlayEnd(res){V3.playing=false;if(!V3.on||!V3.ready)return;const k=res.kind,now=performance.now()/1000;
 const big=res.bigHit||res.banner==='TOUCHDOWN'||k==='int'||k==='fumble'&&res.turnover||k==='sack'||((res.yds||0)>=15);
 if(res.banner==='TOUCHDOWN'){aud3.whistle(2);aud3.swell(1);V3.excite=1;const sc=T(G,res.scored);V3.celebrate={t:now,team:sc};setTimeout(()=>aud3.song(sc,8),700)}
 else if(res.banner==='FIELD GOAL'){aud3.whistle(1);aud3.swell(.8);V3.excite=.8;V3.celebrate={t:now,team:T(G,res.poss),fg:true}}
 else{aud3.whistle(1);if(big){aud3.swell(.75);V3.excite=.75}else aud3.swell(.2)}
 // tackle: ball carrier and the closest defender go down
 if(['run','pass','sack','fumble'].includes(k)&&res.banner!=='TOUCHDOWN'&&V3.tgt){const hl=V3.tgt.hlO;if(hl>=0){const c=v3Players[hl];let best=null,bd=9;for(let i=11;i<22;i++){const d=v3Players[i].pos.distanceTo(c.pos);if(d<bd){bd=d;best=v3Players[i]}}
  c.fallOn=true;c.fallT=now;if(best&&bd<3.5){best.fallOn=true;best.fallT=now+.05}}}
 if(k==='inc'){V3.ballBounce={t:now}}
 V3.tagUntil=now+1.2}
function v3GameStart(){if(!V3.on)return;aud3.song(G.h,8);aud3.swell(.6);V3.excite=.6}

// ---------- frame loop ----------
let v3raf=0,v3last=0;const _v=new THREE.Vector3(),_w=new THREE.Vector3();
function v3Frame(now){v3raf=requestAnimationFrame(v3Frame);if(!V3.on||!V3.ready||!G||!document.querySelector('#game.active')||document.hidden){v3last=0;return}
 const dt=Math.min(.05,v3last?(now-v3last)/1000:.016);v3last=now;const t=now/1000;v3WxTick(dt,t);
 if(V3.game!==G){V3.game=G;V3.speed=1;v3SpeedBtn();V3.camSnap=true;v3BuildVenue(G);for(const p of v3Players)p.key='';if((G.log||[]).length<=2)v3GameStart()}
 const cv=R3.domElement,w=cv.clientWidth,h=cv.clientHeight;if(w&&h&&(cv.width!==Math.floor(w*R3.getPixelRatio())||cv.height!==Math.floor(h*R3.getPixelRatio()))){R3.setSize(w,h,false);C3.aspect=w/h;C3.updateProjectionMatrix()}
 const T0=V3.tgt;if(T0){const oS=v3Slots(T0.oT,true),dS=v3Slots(T0.dT,false);
  for(let i=0;i<22;i++){const p=v3Players[i],off=i<11,tp=off?T0.o[i]:T0.d[i-11];if(!tp)continue;v3Dress(p,off?T0.oT:T0.dT,off?oS[i]:dS[i-11]);
   _v.set(tp.x,0,tp.y);if(!v3Ok(p.pos.x)||!v3Ok(p.pos.z)||!v3Ok(p.vel.x))p.pos.copy(_v),p.vel.set(0,0,0);const d=_v.distanceTo(p.pos);if(d>4){p.pos.copy(_v);p.vel.set(0,0,0);p.fallOn=false;p.fall=0}
   else{_w.copy(p.pos);p.pos.lerp(_v,Math.min(1,dt*16));const v=_w.subVectors(p.pos,_w).divideScalar(dt);p.vel.lerp(v,.25)}
   v3Animate(p,dt,t,off?V3.dir:-V3.dir,i)}}
 // ball
 const B=V3.ball;if(B&&v3Ball){let carrier=null;if(V3.playing&&B.h===0){let bd=.7;for(const p of v3Players){const d=Math.hypot(p.pos.x-B.x,p.pos.z-B.y);if(d<bd){bd=d;carrier=p}}}
  const m=v3Ball.userData.m;
  if(carrier){const f=_v.set(Math.sin(carrier.yaw),0,Math.cos(carrier.yaw));v3Ball.position.set(carrier.pos.x+f.x*.22+f.z*.18,1.15-carrier.fall*.9,carrier.pos.z+f.z*.22-f.x*.18);v3Ball.rotation.set(0,carrier.yaw,0);m.rotation.z=0}
  else{const prev=_w.copy(v3Ball.position),y=B.h>0?1.3+B.h*.55:(V3.playing?1.2:.13);v3Ball.position.set(B.x,y,B.y);
   if(B.h>0){const dir=_v.subVectors(v3Ball.position,prev);if(dir.lengthSq()>1e-5)v3Ball.lookAt(_v.addVectors(v3Ball.position,dir));m.rotation.z+=dt*24}
   else if(!V3.playing){v3Ball.rotation.set(0,V3.dir>0?0:Math.PI,0);v3Ball.rotation.y=Math.PI/2;m.rotation.z=0}}}
 // lines
 const ko=G.phase==='kickoff'||G.phase==='pat';v3Lines.los.visible=V3.los!=null&&!V3.playing&&G.phase!=='kickoff';if(V3.los!=null)v3Lines.los.position.x=V3.los;v3Lines.fd.visible=V3.fd!=null&&!V3.playing&&!ko;if(V3.fd!=null)v3Lines.fd.position.x=V3.fd;
 v3UpdateRefs(dt,t);v3UpdateCrowd(dt,t);v3UpdateMascots(t);v3UpdateCam(dt);v3UpdateTag(t);v3UpdateProps(t);
 if(SUN3){const b=v3Ball?v3Ball.position:_v.set(50,0,26);SUN3.position.set(b.x-25,60,b.z-35);SUN3.target.position.set(b.x,0,b.z);SUN3.target.updateMatrixWorld()}
 V3.excite=Math.max(0,V3.excite-dt*.25);R3.render(S3,C3)}
// leg / arm geometry (body-local, metres before scaling): hip at 1.0, thigh .5, shin+shoe .52; shoulder at 1.56, upper arm .34, forearm+hand .36
function v3Foot(h,k,lean){const y=1.0-Math.cos(h)*.5-Math.cos(h+k)*.52,z=-Math.sin(h)*.5-Math.sin(h+k)*.52;return y*Math.cos(lean)-z*Math.sin(lean)}
function v3Hand(a,e,lean){const y=1.56-Math.cos(a)*.34-Math.cos(a+e)*.36,z=-Math.sin(a)*.34-Math.sin(a+e)*.36;return y*Math.cos(lean)-z*Math.sin(lean)}
function v3Animate(p,dt,t,face,i){const sp=Math.hypot(p.vel.x,p.vel.z),fwdYaw=Math.atan2(face,0),lineman0=i<5||(i>=11&&i<15);let yaw;
 // face the play: backpedalling DBs and pass-setting linemen keep their eyes upfield instead of turning around
 if(sp>.6){const along=p.vel.x*face/sp;yaw=(along<-.3&&sp<6)||(lineman0&&Math.abs(along)<.5&&sp<3.4)?fwdYaw:Math.atan2(p.vel.x,p.vel.z)}else yaw=V3.playing?p.yaw:fwdYaw;
 let dy=yaw-p.yaw;while(dy>Math.PI)dy-=Math.PI*2;while(dy<-Math.PI)dy+=Math.PI*2;p.yaw+=dy*Math.min(1,dt*10);p.g.rotation.y=p.yaw;p.g.position.copy(p.pos);
 const back=sp>.6&&p.vel.x*face<-.3*sp;p.ph+=dt*(1.8+sp*1.45)*(back?-1:1);const run=Math.min(1,sp/5.5),s=Math.sin(p.ph);
 const lineman=i<5||(i>=11&&i<15),pre=!V3.playing&&sp<.5&&G&&G.phase!=='kickoff',ref=i>=22;
 let T;
 if(pre&&lineman&&!ref)T=i<5?[-1.42,-1.2,.58,.42,-.6,-.45,-1.2,0,.86,0]:[-1.38,-1.18,.55,.4,-.55,-.4,-1.2,0,.84,0]; // three-point stance: one hand in the dirt
 else if(pre&&!ref)T=i===9?[-.15,-.15,.28,.28,-.45,-1.5,-.45,-1.5,.1,0]:[-.55,-.55,.62,.62,-.32,-.85,-.32,-.85,.3,0]; // ready stance / QB hands set
 else if(V3.playing&&lineman&&sp<2.4&&!ref)T=[-.62+s*.16,-.62-s*.16,.52,.52,-1.3,-.3,-1.3,-.3,.42,0]; // engaged: low, hands inside, driving the feet
 else{ // run cycle: the knee folds while the leg swings through (heel toward the hip), extends to reach, and stays soft
  // through the plant; thighs drive further forward than back; arms pump opposite with the elbows near 90 degrees
  const c=Math.cos(p.ph),kL=Math.max(0,-c),kR=Math.max(0,c),bias=.26*run;
  T=[s*.66*run-bias,-s*.66*run-bias,(.24+kL*kL*1.7)*run,(.24+kR*kR*1.7)*run,-s*.8*run-.12*run,-(.5+.95*run)+s*.25*run,s*.8*run-.12*run,-(.5+.95*run)-s*.25*run,Math.min(.3,sp*.045),Math.abs(Math.sin(p.ph))*.05*run]}
 if(!p.pose)p.pose=T.slice();const k=Math.min(1,dt*(pre?6:14));for(let n=0;n<10;n++)p.pose[n]+=(T[n]-p.pose[n])*k;const q=p.pose;
 p.legL.rotation.x=q[0];p.legR.rotation.x=q[1];if(p.kneeL){p.kneeL.rotation.x=q[2];p.kneeR.rotation.x=q[3]}
 p.armL.rotation.x=q[4];p.armR.rotation.x=q[6];if(p.elL){p.elL.rotation.x=q[5];p.elR.rotation.x=q[7]}p.armL.rotation.z=p.armR.rotation.z=0;p.lean=q[8];
 // celebration: scoring team throws arms up
 const cel=V3.celebrate;if(cel&&t-cel.t<3&&((i<11?V3.tgt.oT:V3.tgt.dT)===cel.team)&&!cel.fg){p.armL.rotation.x=p.armR.rotation.x=-2.9+Math.sin(t*9+i)*.25;if(p.elL)p.elL.rotation.x=p.elR.rotation.x=-.2;p.body.position.y=Math.abs(Math.sin(t*7+i))*.25}
 else{ // keep the planted foot on the turf whatever the pose (no sinking into the field, no floating)
  const ground=Math.min(v3Foot(q[0],q[2],q[8]),v3Foot(q[1],q[3],q[8]));p.body.position.y=-ground+.52-.52+q[9]+(ground<0||!V3.playing?0:0);p.body.position.y=q[9]-ground+.0;
  if(pre&&lineman&&!ref&&p.elR){ // reach the down hand to the ground
   let best=q[6],bd=9;for(let a=-.4;a>=-2.6;a-=.06){const h=v3Hand(a,0,q[8])-ground;const d=Math.abs(h-.06);if(d<bd){bd=d;best=a}}p.armR.rotation.x=best;p.elR.rotation.x=0}}
 if(p.fallOn){const kf=Math.min(1,(t-p.fallT)/.38);p.fall=kf*kf}else p.fall=Math.max(0,p.fall-dt*3);
 p.body.rotation.x=p.lean+p.fall*1.35}
function v3UpdateRefs(dt,t){if(!v3Refs.length||V3.los==null&&!V3.ball)return;const los=V3.los??(V3.ball?V3.ball.x:50),dir=V3.dir,b=V3.ball||{x:los,y:26.66};
 const goal={R:{x:los-dir*11,z:31},U:{x:los+dir*5.5,z:24},HL:{x:los,z:-1.6},LJ:{x:los,z:54.9},BJ:{x:los+dir*20,z:26.66}};
 const cel=V3.celebrate&&t-V3.celebrate.t<2.6;
 for(const r of v3Refs){let g=goal[r.role];if(V3.playing){if(r.role==='HL'||r.role==='LJ')g={x:b.x,z:g.z};else if(r.role==='BJ')g={x:dir>0?Math.max(g.x,b.x+6):Math.min(g.x,b.x-6),z:26.66+(b.y-26.66)*.5};else if(r.role==='U')g={x:b.x+dir*3,z:b.y+3}}
  _v.set(g.x,0,g.z);const d=_v.distanceTo(r.pos);if(d>25||r.pos.lengthSq()===0)r.pos.copy(_v);else{const step=Math.min(d,dt*(V3.playing?7:4));if(d>.05)r.pos.add(_w.subVectors(_v,r.pos).normalize().multiplyScalar(step))}
  r.vel.set(0,0,0);r.g.position.copy(r.pos);const yaw=Math.atan2(b.x-r.pos.x,b.y-r.pos.z);r.g.rotation.y=yaw;r.yaw=yaw;
  const mv=d>.15?1:0;r.ph+=dt*6*mv;r.legL.rotation.x=Math.sin(r.ph)*.5*mv;r.legR.rotation.x=-Math.sin(r.ph)*.5*mv;
  if(cel&&!V3.celebrate.fg){r.armL.rotation.x=r.armR.rotation.x=-Math.PI;r.armL.rotation.z=r.armR.rotation.z=0}
  else if(cel&&V3.celebrate.fg&&(r.role==='BJ'||r.role==='U')){r.armL.rotation.x=r.armR.rotation.x=-Math.PI}
  else{r.armL.rotation.x=-Math.sin(r.ph)*.4*mv;r.armR.rotation.x=Math.sin(r.ph)*.4*mv}}}
let v3CrowdTick=0;
function v3UpdateCrowd(dt,t){if(!v3Crowd||!v3Crowd.seats.length)return;v3CrowdTick+=dt;if(v3CrowdTick<.05)return;v3CrowdTick=0;const {body,head,seats}=v3Crowd,m4=new THREE.Matrix4(),e=V3.excite;
 const cel=V3.celebrate&&t-V3.celebrate.t<3?V3.celebrate.team:null,homeSide=G&&cel?(cel===((G.venue&&G.venue.id)?G.venue:G.h)?-1:1):0;
 for(let i=0;i<seats.length;i++){const s=seats[i],hype=e*(cel?(s.side===homeSide?1.3:.25):1);const j=Math.max(0,Math.sin(t*(4+s.hype*3)+s.ph))*.35*hype*s.hype+Math.sin(t*1.3+s.ph)*.02;
  m4.makeTranslation(s.x,s.y+.36+j,s.z);body.setMatrixAt(i,m4);m4.makeTranslation(s.x,s.y+.82+j,s.z);head.setMatrixAt(i,m4)}
 body.instanceMatrix.needsUpdate=head.instanceMatrix.needsUpdate=true}
function v3UpdateMascots(t){const cel=V3.celebrate&&t-V3.celebrate.t<3.5?V3.celebrate.team:null;
 for(const m of v3Masc){const c=cel===m.t,bx=V3.ball?V3.ball.x:50;m.x+=(Math.max(5,Math.min(95,bx))-m.x)*.004;
  m.sp.position.set(m.x+Math.sin(t*.7+m.ph)*1.5,1.6+(c?Math.abs(Math.sin(t*8))*1.6:Math.abs(Math.sin(t*2.4+m.ph))*.25),m.z);m.sp.material.rotation=c?Math.sin(t*10)*.35:Math.sin(t*1.7+m.ph)*.06}}
const v3CamP=new THREE.Vector3(30,9,26),v3CamL=new THREE.Vector3(50,0,26);
function v3UpdateCam(dt){const b=V3.ball||{x:V3.los??50,y:26.66,h:0},dir=V3.dir;let p,l;
 if(V3.cam==='side'){p=_v.set(b.x,15,-15);l=_w.set(b.x,0,26.66+(b.y-26.66)*.5)}
 else if(V3.cam==='high'){p=_v.set(b.x-dir*26,30,26.66+(b.y-26.66)*.3);l=_w.set(b.x+dir*12,0,26.66+(b.y-26.66)*.5)}
 else{p=_v.set(b.x-dir*15,7.8+b.h*.12,26.66+(b.y-26.66)*.4);l=_w.set(b.x+dir*8,.6+b.h*.1,26.66+(b.y-26.66)*.6)}
 if(![p.x,p.y,p.z,l.x,l.y,l.z].every(v3Ok))return;if(![v3CamP.x,v3CamP.y,v3CamP.z,v3CamL.x,v3CamL.y,v3CamL.z].every(v3Ok))V3.camSnap=true;const k=V3.camSnap?1:Math.min(1,dt*(V3.playing?1.6:1.2));V3.camSnap=false;v3CamP.lerp(p,k);v3CamL.lerp(l,k);C3.position.copy(v3CamP);C3.lookAt(v3CamL)}
function v3UpdateTag(t){const el=$('#v3tag'),T0=V3.tgt;if(!el)return;const show=T0&&T0.hlO>=0&&(V3.playing||t<V3.tagUntil);if(!show){el.style.display='none';return}
 const p=v3Players[T0.hlO],pl=v3Slots(T0.oT,true)[T0.hlO];if(!p||!pl){el.style.display='none';return}
 _v.set(p.pos.x,2.5,p.pos.z).project(C3);if(_v.z>1){el.style.display='none';return}const cv=R3.domElement;
 el.style.display='flex';el.style.left=((_v.x+1)/2*cv.clientWidth)+'px';el.style.top=((1-_v.y)/2*cv.clientHeight)+'px';
 const key=pl.num+pl.last;if(el.dataset.k!==key){el.dataset.k=key;el.innerHTML=`${pl.photo?`<img src="${pl.photo}">`:''}<span>#${esc(pl.num)} ${esc(pl.last.toUpperCase())}</span>`}}

// ---------- sound: whistle, crowd, original fight songs (synthesized; no recordings) ----------
const aud3={ctx:null,master:null,crowd:null,songNodes:[],
 init(){if(this.ctx){this.ctx.resume&&this.ctx.resume();this.setMute(!V3.snd);return}try{const C=new(window.AudioContext||window.webkitAudioContext)();this.ctx=C;
  this.master=C.createGain();this.master.gain.value=V3.snd?.85:0;this.master.connect(C.destination);
  const len=C.sampleRate*3,b=C.createBuffer(1,len,C.sampleRate),d=b.getChannelData(0);let l=0;for(let i=0;i<len;i++){const w=Math.random()*2-1;l=l*.985+w*.015;d[i]=l*5+w*.12}this.noise=b;
  const src=C.createBufferSource();src.buffer=b;src.loop=true;const bp=C.createBiquadFilter();bp.type='bandpass';bp.frequency.value=650;bp.Q.value=.5;
  this.crowd=C.createGain();this.crowd.gain.value=this.base||.06;src.connect(bp);bp.connect(this.crowd);this.crowd.connect(this.master);src.start()}catch(e){this.ctx=null}},
 pause(){this.stopSong();if(this.ctx&&this.ctx.suspend)this.ctx.suspend()},
 setMute(m){if(this.master)this.master.gain.value=m?0:.85},
 swell(a){if(!this.ctx)return;const g=this.crowd.gain,t=this.ctx.currentTime;const b=this.base||.06;g.cancelScheduledValues(t);g.setValueAtTime(Math.max(.02,g.value),t);g.linearRampToValueAtTime(b+(.3+.15*(V3.hype||0))*a,t+.3);g.linearRampToValueAtTime(b,t+3.2)},
 whistle(n){if(!this.ctx)return;const C=this.ctx;for(let k=0;k<n;k++){const t0=C.currentTime+k*.42,dur=k===n-1?.42:.28;
  const o=C.createOscillator(),lfo=C.createOscillator(),lg=C.createGain(),g=C.createGain();o.type='sine';o.frequency.value=2950;lfo.frequency.value=38;lg.gain.value=180;lfo.connect(lg);lg.connect(o.frequency);
  g.gain.setValueAtTime(0,t0);g.gain.linearRampToValueAtTime(.16,t0+.02);g.gain.setValueAtTime(.16,t0+dur-.05);g.gain.linearRampToValueAtTime(0,t0+dur);o.connect(g);g.connect(this.master);o.start(t0);lfo.start(t0);o.stop(t0+dur+.02);lfo.stop(t0+dur+.02)}},
 stopSong(){for(const n of this.songNodes){try{n.stop()}catch(e){}}this.songNodes=[]},
 // Each team gets its own original march, generated from its id, so it always sounds the same for that school.
 song(team,bars){if(!this.ctx||!team)return;this.stopSong();const C=this.ctx,r=v3Rng('fight'+team.id),bpm=124+Math.floor(r()*16),bt=60/bpm,t0=C.currentTime+.08,key=53+Math.floor(r()*7);
  const sc=[0,2,4,5,7,9,11],f=n=>{const o=Math.floor(n/7),i=((n%7)+7)%7;return 440*Math.pow(2,(key+12+o*12+sc[i]-69)/12)};
  const prog=[0,0,3,4,0,3,4,0],RH=[[1,1,1,1],[1.5,.5,1,1],[.5,.5,1,1,1],[1,.5,.5,2],[1,1,2],[.5,.5,.5,.5,1,1]];
  const ph=[];let cur=4;const near=(c,ch)=>ch.flatMap(x=>[x-7,x,x+7]).filter(x=>x>=0&&x<=11).sort((a,b)=>Math.abs(a-c)-Math.abs(b-c))[0];
  for(let b=0;b<8;b++){if(b===4||b===5){ph.push(ph[b-4]);continue}const rh=(b===3||b===7)?[1,1,2]:RH[Math.floor(r()*RH.length)],ch=[prog[b],prog[b]+2,prog[b]+4],ns=[];
   rh.forEach((d,i)=>{let n=i===0?near(cur,ch):cur+[-2,-1,-1,1,1,2][Math.floor(r()*6)];if(b===7&&i===rh.length-1)n=7;if(b===3&&i===rh.length-1)n=near(cur,[4,6,8]);n=Math.max(0,Math.min(11,n));cur=n;ns.push([n,d])});ph.push(ns)}
  const out=this.master,nodes=this.songNodes,bus=C.createGain();bus.gain.value=.55;bus.connect(out);
  const brass=(fr,t,d,v)=>{const lp=C.createBiquadFilter();lp.type='lowpass';lp.frequency.setValueAtTime(900,t);lp.frequency.linearRampToValueAtTime(2600,t+.05);const g=C.createGain();g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(v,t+.03);g.gain.setValueAtTime(v*.8,t+Math.max(.05,d-.06));g.gain.linearRampToValueAtTime(0,t+d);
   for(const det of[-7,7]){const o=C.createOscillator();o.type='sawtooth';o.frequency.value=fr;o.detune.value=det;o.connect(lp);o.start(t);o.stop(t+d+.02);nodes.push(o)}lp.connect(g);g.connect(bus)};
  const tuba=(fr,t,d)=>{const o=C.createOscillator(),g=C.createGain();o.type='triangle';o.frequency.value=fr;g.gain.setValueAtTime(.32,t);g.gain.exponentialRampToValueAtTime(.01,t+d);o.connect(g);g.connect(bus);o.start(t);o.stop(t+d);nodes.push(o)};
  const drum=(t,snare,v)=>{if(snare){const s=C.createBufferSource();s.buffer=this.noise;const hp=C.createBiquadFilter();hp.type='highpass';hp.frequency.value=1800;const g=C.createGain();g.gain.setValueAtTime(v,t);g.gain.exponentialRampToValueAtTime(.001,t+.13);s.connect(hp);hp.connect(g);g.connect(bus);s.start(t,Math.random()*2);s.stop(t+.15);nodes.push(s)}
   else{const o=C.createOscillator(),g=C.createGain();o.frequency.setValueAtTime(110,t);o.frequency.exponentialRampToValueAtTime(45,t+.18);g.gain.setValueAtTime(.6,t);g.gain.exponentialRampToValueAtTime(.001,t+.22);o.connect(g);g.connect(bus);o.start(t);o.stop(t+.24);nodes.push(o)}};
  const N=Math.min(bars||8,8);
  for(let b=0;b<N;b++){const tb=t0+b*4*bt;let x=0;for(const [n,d] of ph[b]){const tt=tb+x*bt;brass(f(n),tt,d*bt*.92,.075);brass(f(n-2),tt,d*bt*.92,.035);x+=d}
   const root=f(prog[b]-14),fifth=f(prog[b]-10);for(let q=0;q<4;q++){tuba(q%2?fifth:root,tb+q*bt,bt*.5);drum(tb+q*bt,q%2===1,.32);if(q%2===0)drum(tb+q*bt,false)}
   drum(tb+3.5*bt,true,.18)}}};

// ---------- UI ----------
function v3CycleCam(){V3.camSnap=true;V3.cam=V3.cam==='bc'?'side':V3.cam==='side'?'high':'bc';const b=$('#v3cam');if(b)b.textContent={bc:'CAM: BEHIND',side:'CAM: SIDELINE',high:'CAM: HIGH'}[V3.cam]}
function v3Sound(){V3.snd=!V3.snd;aud3.setMute(!V3.snd);const b=$('#v3snd');if(b)b.textContent=V3.snd?'🔊':'🔇'}

// Fast forward: every game starts at normal 3D speed; tap to cycle 1x → 2x → 3x.
function v3SpeedBtn(){const b=$('#v3spd');if(b)b.textContent=V3.speed===1?'▶ 1x':V3.speed===2?'▶▶ 2x':'▶▶▶ 3x'}
function v3Speed(){V3.speed=V3.speed===1?2:V3.speed===2?3:1;v3SpeedBtn()}

// ---------- graphics extras ----------
// Image-based lighting: a tiny night-stadium scene baked into an environment map gives helmets/pads real reflections.
function v3Env(){try{const pm=new THREE.PMREMGenerator(R3),es=new THREE.Scene();es.background=new THREE.Color('#0b1020');
 const lm=new THREE.MeshBasicMaterial({color:'#fff6e0'});for(const [x,z] of [[-30,-40],[30,-40],[-30,40],[30,40]]){const l=new THREE.Mesh(new THREE.PlaneGeometry(14,5),lm);l.position.set(x,30,z);l.lookAt(0,0,0);es.add(l)}
 const fl=new THREE.Mesh(new THREE.PlaneGeometry(200,200),new THREE.MeshBasicMaterial({color:'#1f5a2a'}));fl.rotation.x=-Math.PI/2;fl.position.y=-5;es.add(fl);
 S3.environment=pm.fromScene(es,.04).texture;pm.dispose()}catch(e){}}
function v3Sky(){const t=v3Canvas(16,512,(c,w,h)=>{const g=c.createLinearGradient(0,0,0,h);g.addColorStop(0,'#01030a');g.addColorStop(.55,'#070c1c');g.addColorStop(.8,'#16203a');g.addColorStop(.9,'#3b3448');g.addColorStop(1,'#0a0c12');c.fillStyle=g;c.fillRect(0,0,w,h)});
 const sky=new THREE.Mesh(new THREE.SphereGeometry(480,24,16),new THREE.MeshBasicMaterial({map:t,side:THREE.BackSide,fog:false,depthWrite:false}));sky.position.set(50,-40,26.66);S3.add(sky)}
// Light beams from each tower toward the field: what makes it feel like Friday night.
function v3Beam(from,to){const len=from.distanceTo(to),geo=new THREE.ConeGeometry(8,len,20,1,true);geo.translate(0,-len/2,0);
 const mat=new THREE.MeshBasicMaterial({color:'#fff2cc',transparent:true,opacity:.022,blending:THREE.AdditiveBlending,depthWrite:false,side:THREE.DoubleSide,fog:false});
 const m=new THREE.Mesh(geo,mat);m.position.copy(from);m.lookAt(to);m.rotateX(-Math.PI/2);S3.add(m);return m}
let v3Side=[],v3Chain=null,v3Flash=null;
function v3SidelineAndProps(g){for(const o of v3Side)S3.remove(o);v3Side=[];
 // pylons
 const py=new THREE.MeshStandardMaterial({color:'#ff6a00',roughness:.6});for(const x of[-10,0,100,110])for(const z of[-.05,53.38]){const p=new THREE.Mesh(new THREE.BoxGeometry(.11,.5,.11),py);p.position.set(x,.25,z);p.castShadow=true;S3.add(p);v3Side.push(p)}
 // team benches + players standing on each sideline
 for(const [t,z] of [[g.h,-6.2],[g.a,59.6]]){const side=kitSide(t,g);const u=uniformOf(t,side),n=26;
  const bench=new THREE.Mesh(new THREE.BoxGeometry(34,.5,.6),new THREE.MeshStandardMaterial({color:'#3a3f47',roughness:.7}));bench.position.set(50,.25,z+(z<0?-1.6:1.6));S3.add(bench);v3Side.push(bench);
  const bodyM=new THREE.MeshStandardMaterial({color:u.jersey,roughness:.8}),pantM=new THREE.MeshStandardMaterial({color:u.pants||'#ddd',roughness:.6}),helmM=new THREE.MeshStandardMaterial({color:u.helmet||t.c1,roughness:.25,metalness:.3});
  const B=new THREE.InstancedMesh(new THREE.CylinderGeometry(.34,.25,.75,10),bodyM,n),Pn=new THREE.InstancedMesh(new THREE.CylinderGeometry(.24,.17,.9,8),pantM,n),H=new THREE.InstancedMesh(new THREE.SphereGeometry(.19,10,8),helmM,n),m4=new THREE.Matrix4(),q=new THREE.Quaternion(),e=new THREE.Euler();
  const spots=[];for(let i=0;i<n;i++){const x=32+i*1.4+Math.random()*.6,zz=z+(Math.random()-.5)*1.4,yaw=(z<0?0:Math.PI)+(Math.random()-.5)*.8;spots.push({x,z:zz,yaw,ph:Math.random()*6});
   q.setFromEuler(e.set(0,yaw,0));m4.compose(new THREE.Vector3(x,.45,zz),q,new THREE.Vector3(1,1,1));Pn.setMatrixAt(i,m4);m4.compose(new THREE.Vector3(x,1.25,zz),q,new THREE.Vector3(1,1,1));B.setMatrixAt(i,m4);m4.compose(new THREE.Vector3(x,1.8,zz),q,new THREE.Vector3(1,1.05,1.1));H.setMatrixAt(i,m4)}
  for(const o of[B,Pn,H]){o.castShadow=true;o.instanceMatrix.setUsage(THREE.DynamicDrawUsage);S3.add(o);v3Side.push(o)}
  v3Side.push({isSL:true,B,Pn,H,spots,t})}
 // chain crew: down marker + first-down sticks on the far sideline
 if(!v3Chain){const pole=new THREE.MeshStandardMaterial({color:'#222',roughness:.5}),top=new THREE.MeshStandardMaterial({color:'#ff7a00',roughness:.5,emissive:'#331400'});
  const mkS=()=>{const gg=new THREE.Group(),p=new THREE.Mesh(new THREE.CylinderGeometry(.035,.035,2.2,6),pole);p.position.y=1.1;const tp=new THREE.Mesh(new THREE.BoxGeometry(.3,.3,.06),top);tp.position.y=2.3;gg.add(p,tp);S3.add(gg);return gg};
  const dm=mkS(),dt=v3Canvas(64,64,(c)=>{});dm.children[1].material=new THREE.MeshBasicMaterial({map:dt});v3Chain={a:mkS(),b:mkS(),dm,dt,last:''};
  const chain=new THREE.Mesh(new THREE.BoxGeometry(1,.02,.02),new THREE.MeshBasicMaterial({color:'#888'}));S3.add(chain);v3Chain.ch=chain}
 // camera flashes in the stands
 if(v3Flash)S3.remove(v3Flash);v3Flash=null;if(!v3Crowd||!v3Crowd.seats.length)return; // no crowd (farm field): no stands, no camera flashes
 const fs=v3Crowd.seats.filter(()=>Math.random()<.06),fp=new Float32Array(fs.length*3),fc=new Float32Array(fs.length*3);fs.forEach((p,i)=>{fp[i*3]=p.x;fp[i*3+1]=p.y+1;fp[i*3+2]=p.z});
 const fg=new THREE.BufferGeometry();fg.setAttribute('position',new THREE.BufferAttribute(fp,3));fg.setAttribute('color',new THREE.BufferAttribute(fc,3));
 v3Flash=new THREE.Points(fg,new THREE.PointsMaterial({size:5,sizeAttenuation:false,vertexColors:true,transparent:true,blending:THREE.AdditiveBlending,depthWrite:false}));S3.add(v3Flash)}
function v3UpdateProps(t){if(v3Chain&&G){const ok=V3.los!=null&&G.phase!=='kickoff'&&G.phase!=='pat';for(const k of['a','b','dm','ch'])v3Chain[k].visible=ok&&V3.fd!=null;
  if(ok&&V3.fd!=null){const z=55.4;v3Chain.dm.position.set(V3.los,0,z);v3Chain.a.position.set(V3.fd,0,z);v3Chain.b.position.set(V3.fd-V3.dir*10,0,z);v3Chain.ch.position.set(V3.fd-V3.dir*5,.6,z);v3Chain.ch.scale.x=10;
   const lab=String(G.down);if(v3Chain.last!==lab){v3Chain.last=lab;const c=v3Chain.dt.image.getContext('2d');c.fillStyle='#ff7a00';c.fillRect(0,0,64,64);c.fillStyle='#111';c.font='700 50px Oswald,Arial,sans-serif';c.textAlign='center';c.textBaseline='middle';c.fillText(lab,32,35);v3Chain.dt.needsUpdate=true}}}
 for(const s of v3Side){if(!s.isSL)continue;const cel=V3.celebrate&&t-V3.celebrate.t<3&&V3.celebrate.team===s.t,e=cel?1:V3.excite*.3,m4=new THREE.Matrix4(),q=new THREE.Quaternion(),eu=new THREE.Euler(),one=new THREE.Vector3(1,1,1);
  if(e<.02&&!s.dirty)continue;s.dirty=e>=.02;s.spots.forEach((p,i)=>{const j=Math.max(0,Math.sin(t*8+p.ph))*.35*e;q.setFromEuler(eu.set(0,p.yaw,0));m4.compose(_v.set(p.x,.45+j,p.z),q,one);s.Pn.setMatrixAt(i,m4);m4.compose(_v.set(p.x,1.25+j,p.z),q,one);s.B.setMatrixAt(i,m4);m4.compose(_v.set(p.x,1.8+j,p.z),q,_w.set(1,1.05,1.1));s.H.setMatrixAt(i,m4)});
  s.B.instanceMatrix.needsUpdate=s.Pn.instanceMatrix.needsUpdate=s.H.instanceMatrix.needsUpdate=true}
 if(v3Flash){const c=v3Flash.geometry.attributes.color,e=V3.excite,n=c.count;for(let i=0;i<n;i++){const on=Math.random()<.004+e*.05;const v=on?1:Math.max(0,c.array[i*3]-.25);c.array[i*3]=c.array[i*3+1]=c.array[i*3+2]=v}c.needsUpdate=true}}

// Fan draw: Penn & Mishawaka are the fan favorites; Carmel & Cathedral are the big-name powerhouses everyone comes to see.
const V3_DRAW={PENN:1,MISH:1,CARMEL:.8,CATH:.8,BD:.8,WC:.8,WAR:.6};
function v3Hype(g){const ids=[g.h.id,g.a.id],k=g.season&&g.season.kind,d=Math.max(...ids.map(i=>V3_DRAW[i]||0)),both=ids.every(i=>V3_DRAW[i]);
 if(ids.includes('PENN')&&ids.includes('MISH'))return 1;
 if(both)return k==='scrim'?.85:1;
 if(k==='final')return d?1:.85;if(k==='semi')return d?.95:.7;if(k==='div')return d?.75+.1*d:.55;
 const rv=typeof rivalry==='function'&&rivalry(g.h.id,g.a.id);if(k==='scrim')return d?.4:.2;return Math.max(rv?.5:.25,d*.6)}

// ---------- country practice field ----------
function v3Farm(){const g=new THREE.Group(),r=v3Rng('farm');
 // corn: solid cornfield blocks with a painted corn texture (a handful of meshes, so iPads load it instantly)
 const cc=document.createElement('canvas');cc.width=256;cc.height=128;const cx=cc.getContext('2d');const gr=cx.createLinearGradient(0,0,0,128);gr.addColorStop(0,'#8a9a34');gr.addColorStop(.35,'#6c7d26');gr.addColorStop(1,'#3d4a17');cx.fillStyle=gr;cx.fillRect(0,0,256,128);
 for(let k=0;k<70;k++){const x=r()*256,w=2+r()*3,top=10+r()*22;cx.fillStyle=r()<.5?'#5f6f20':'#7a8b2c';cx.fillRect(x,top,w,128-top);cx.fillStyle='#93a33a';cx.beginPath();cx.moveTo(x,top+20+r()*30);cx.lineTo(x-10-r()*8,top+34+r()*30);cx.lineTo(x,top+28+r()*30);cx.fill();cx.beginPath();cx.moveTo(x+w,top+40+r()*30);cx.lineTo(x+w+12,top+52+r()*30);cx.lineTo(x+w,top+48+r()*30);cx.fill();cx.fillStyle='#c9b24a';cx.fillRect(x-1,top-8,w+2,9)}
 const tex=new THREE.CanvasTexture(cc);tex.wrapS=THREE.RepeatWrapping;tex.wrapT=THREE.ClampToEdgeWrapping;if(THREE.sRGBEncoding)tex.encoding=THREE.sRGBEncoding;
 const topM=v3Mat('#7c8c2e');const block=(x0,x1,z0,z1)=>{const w=x1-x0,d=z1-z0,h=2.7;const tS=tex.clone();tS.needsUpdate=true;tS.repeat.set(Math.max(1,w/9),1);const tD=tex.clone();tD.needsUpdate=true;tD.repeat.set(Math.max(1,d/9),1);
  const mS=new THREE.MeshLambertMaterial({map:tS}),mD=new THREE.MeshLambertMaterial({map:tD});const m=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),[mD,mD,topM,topM,mS,mS]);m.position.set((x0+x1)/2,h/2,(z0+z1)/2);g.add(m)};
 block(-40,140,-50,-9);block(-40,140,62,102);block(-40,-18,-9,62);block(118,140,-9,62);
 // dirt edge around the practice field
 const dirt=new THREE.Mesh(new THREE.PlaneGeometry(150,3),v3Mat('#6b5a3a'));dirt.rotation.x=-Math.PI/2;dirt.position.set(50,.02,-8);g.add(dirt);const d2=dirt.clone();d2.position.z=61.3;g.add(d2);
 // tractor tires (some stacked), hay bales, a barn and silo off in the corn
 const tireM=new THREE.MeshStandardMaterial({color:'#161616',roughness:.9});const tire=(x,z,rad,y=0,lay=true)=>{const t=new THREE.Mesh(new THREE.TorusGeometry(rad,rad*.42,10,22),tireM);t.position.set(x,y+rad*.42,z);if(lay)t.rotation.x=Math.PI/2;else{t.position.y=y+rad*1.42;}t.castShadow=true;g.add(t)};
 tire(18,-3.5,1.1);tire(18,-3.5,1.1,.9);tire(22,-4,1.4);tire(26,-3.2,1.0,0,false);tire(78,-3.6,1.3);tire(82,-4.1,1.1);tire(82,-4.1,1.1,.9);tire(104,-3.8,1.6,0,false);
 const hayM=v3Mat('#d9b85c');for(const [x,z] of [[30,57.5],[33,57.8],[64,57.2],[67,57.6],[70,57.3],[67,57.6,1]]){const hb=new THREE.Mesh(new THREE.CylinderGeometry(.8,.8,1.3,16),hayM);hb.rotation.z=Math.PI/2;hb.position.set(x,.8,z);hb.castShadow=true;g.add(hb)}
 const barn=new THREE.Group(),bm=v3Mat('#8b1e1e'),rm=v3Mat('#4a1010');const bx=new THREE.Mesh(new THREE.BoxGeometry(14,8,10),bm);bx.position.y=4;barn.add(bx);
 const roof=new THREE.Mesh(new THREE.CylinderGeometry(7.4,7.4,10.4,3,1,false),rm);roof.rotation.x=Math.PI/2;roof.rotation.z=Math.PI/2;roof.scale.set(1,1,.6);roof.position.y=10.2;barn.add(roof);
 const door=new THREE.Mesh(new THREE.PlaneGeometry(4,5),v3Mat('#f2efe6'));door.position.set(0,2.5,5.01);barn.add(door);
 const silo=new THREE.Mesh(new THREE.CylinderGeometry(2.4,2.4,16,18),v3Mat('#9aa3ad'));silo.position.set(10,8,0);barn.add(silo);const cap=new THREE.Mesh(new THREE.SphereGeometry(2.4,16,8,0,6.29,0,1.57),v3Mat('#7b838c'));cap.position.set(10,16,0);barn.add(cap);
 barn.position.set(-60,0,-30);barn.rotation.y=.6;g.add(barn);
 // split-rail fence along the far sideline
 const wood=v3Mat('#7a5a3a');for(let x=-12;x<=112;x+=4){const post=new THREE.Mesh(new THREE.BoxGeometry(.18,1.3,.18),wood);post.position.set(x,.65,60);g.add(post)}for(const y of[.5,1.05]){const rail=new THREE.Mesh(new THREE.BoxGeometry(124,.1,.08),wood);rail.position.set(50,y,60);g.add(rail)}
 return g}

// ---------- weather: falling rain or snow, a darker or whiter sky, and a dusting of snow on the field ----------
let v3WxObj=null,v3WxKey=null,v3WxFog=null;
function v3WxClear(){if(v3WxObj){for(const o of v3WxObj.objs){S3.remove(o);o.geometry&&o.geometry.dispose();o.material&&o.material.dispose()}v3WxObj=null}
 if(v3WxFog){S3.fog.color.copy(v3WxFog.c);S3.fog.near=v3WxFog.n;S3.fog.far=v3WxFog.f;S3.background.copy(v3WxFog.b);v3WxFog=null}}
function v3WxBuild(){v3WxClear();const w=G&&G.wx,k=w&&w.k;if(!k||k==='clear'||k==='dome')return;
 const snow=k==='snow'||k==='hsnow',heavy=k[0]==='h',n=snow?(heavy?4200:2400):(heavy?3200:1700),X0=-25,XW=150,Z0=-20,ZW=95,YH=38;
 v3WxFog={c:S3.fog.color.clone(),n:S3.fog.near,f:S3.fog.far,b:S3.background.clone()};
 S3.fog.color.set(snow?'#3a414c':'#10161f');S3.fog.near=snow?(heavy?40:70):(heavy?60:85);S3.fog.far=snow?(heavy?150:200):(heavy?180:220);S3.background.set(snow?'#1c2128':'#070a10');
 const objs=[];let geo,mat,obj;
 if(snow){const p=new Float32Array(n*3);for(let i=0;i<n;i++){p[i*3]=X0+Math.random()*XW;p[i*3+1]=Math.random()*YH;p[i*3+2]=Z0+Math.random()*ZW}
  geo=new THREE.BufferGeometry();geo.setAttribute('position',new THREE.BufferAttribute(p,3));const cv=document.createElement('canvas');cv.width=cv.height=32;const cx=cv.getContext('2d'),gr=cx.createRadialGradient(16,16,0,16,16,16);gr.addColorStop(0,'rgba(255,255,255,1)');gr.addColorStop(.45,'rgba(255,255,255,.8)');gr.addColorStop(1,'rgba(255,255,255,0)');cx.fillStyle=gr;cx.fillRect(0,0,32,32);const tx=new THREE.CanvasTexture(cv);
  mat=new THREE.PointsMaterial({color:'#ffffff',map:tx,size:heavy?.55:.45,transparent:true,opacity:.95,depthWrite:false});obj=new THREE.Points(geo,mat)}
 else{const p=new Float32Array(n*6);for(let i=0;i<n;i++){const x=X0+Math.random()*XW,y=Math.random()*YH,z=Z0+Math.random()*ZW;p.set([x,y,z,x-.15,y-1.1,z],i*6)}
  geo=new THREE.BufferGeometry();geo.setAttribute('position',new THREE.BufferAttribute(p,3));mat=new THREE.LineBasicMaterial({color:'#9fb6d8',transparent:true,opacity:heavy?.5:.38,depthWrite:false});obj=new THREE.LineSegments(geo,mat)}
 obj.frustumCulled=false;S3.add(obj);objs.push(obj);
 if(snow){const g2=new THREE.PlaneGeometry(150,95),m2=new THREE.MeshBasicMaterial({color:'#ffffff',transparent:true,opacity:heavy?.3:.17,depthWrite:false});const pl=new THREE.Mesh(g2,m2);pl.rotation.x=-Math.PI/2;pl.position.set(50,.03,26.66);S3.add(pl);objs.push(pl)}
 v3WxObj={objs,snow,heavy,n,YH}}
function v3WxTick(dt,t){const key=G?(G.wx?G.wx.k:'clear')+'|'+(G.log&&G.log.length?1:0)+'|'+(G._wxid||(G._wxid=Math.random())):null;if(key!==v3WxKey){v3WxKey=key;try{v3WxBuild()}catch(e){console.error(e)}}
 if(!v3WxObj)return;const o=v3WxObj.objs[0],a=o.geometry.attributes.position,p=a.array,YH=v3WxObj.YH;
 if(v3WxObj.snow){const v=(v3WxObj.heavy?4.2:3)*dt;for(let i=0;i<v3WxObj.n;i++){const j=i*3;p[j+1]-=v*(.7+(i%5)*.12);p[j]+=Math.sin(t*.8+i)*.02;if(p[j+1]<0)p[j+1]+=YH}}
 else{const v=(v3WxObj.heavy?34:28)*dt;for(let i=0;i<v3WxObj.n;i++){const j=i*6;p[j+1]-=v;p[j+4]-=v;p[j]-=v*.13;p[j+3]-=v*.13;if(p[j+4]<0){p[j+1]+=YH;p[j+4]+=YH;p[j]+=YH*.13;p[j+3]+=YH*.13}}}
 a.needsUpdate=true}

// ---------- grass detail: fine blade texture, mowing-pattern sheen and worn patches where the game is played ----------
let v3GrassPat=null;
function v3GrassDetail(c,W,H,X,Y,s,S){
 if(!v3GrassPat){const n=document.createElement('canvas');n.width=n.height=128;const x=n.getContext('2d'),im=x.createImageData(128,128);
  for(let i=0;i<im.data.length;i+=4){const v=128+(Math.random()-.5)*90;im.data[i]=im.data[i+1]=im.data[i+2]=v;im.data[i+3]=255}x.putImageData(im,0,0);
  x.globalAlpha=.25;for(let k=0;k<900;k++){x.strokeStyle=Math.random()<.5?'#000':'#fff';x.beginPath();const px=Math.random()*128,py=Math.random()*128;x.moveTo(px,py);x.lineTo(px+(Math.random()-.5)*2,py-2-Math.random()*3);x.stroke()}
  v3GrassPat=n}
 c.save();
 // blade grain over everything (paint included, like real painted grass)
 c.globalCompositeOperation='multiply';c.globalAlpha=.35;c.fillStyle='#c9dcc0';c.fillRect(0,0,W,H);
 c.globalCompositeOperation='overlay';c.globalAlpha=.26;c.fillStyle=c.createPattern(v3GrassPat,'repeat');c.fillRect(0,0,W,H);
 c.globalCompositeOperation='source-over';c.globalAlpha=1;
 if(!S||!S.farm){
  // soft sheen across the mowing stripes (every 5 yards) so the field catches the lights
  for(let yd=-10;yd<110;yd+=5){const a=X(yd),b=X(yd+5),gr=c.createLinearGradient(0,Y(0),0,Y(53.33));const lite=Math.floor((yd+10)/5)%2;
   gr.addColorStop(0,lite?'rgba(255,255,255,.035)':'rgba(0,0,0,.04)');gr.addColorStop(.5,lite?'rgba(255,255,255,.06)':'rgba(0,0,0,.02)');gr.addColorStop(1,lite?'rgba(255,255,255,.035)':'rgba(0,0,0,.04)');c.fillStyle=gr;c.fillRect(a,Y(0),b-a,Y(53.33)-Y(0))}
  // worn grass: between the hashes, heaviest at midfield and in front of each goal line
  const wear=(cx,cy,rx,ry,al)=>{const g=c.createRadialGradient(X(cx),Y(cy),0,X(cx),Y(cy),rx*s);g.addColorStop(0,`rgba(96,84,52,${al})`);g.addColorStop(1,'rgba(96,84,52,0)');c.save();c.translate(X(cx),Y(cy));c.scale(1,ry/rx);c.translate(-X(cx),-Y(cy));c.fillStyle=g;c.beginPath();c.arc(X(cx),Y(cy),rx*s,0,7);c.fill();c.restore()};
  wear(50,26.66,22,7,.24);wear(30,26.66,12,5,.14);wear(70,26.66,12,5,.14);wear(4,26.66,6,6,.2);wear(96,26.66,6,6,.2)}
 c.restore()}

// ---------- real players' skin tones (set by the user) ----------
const V3_LIGHT=['#f1c7a3','#ecbd96','#f3cdb0'],V3_SKIN={MISH:{'Duell Bailey':'L','Evan Fras':'L','Devin Shaw':'#b07a52','Tanner Bradley':'L','Chandler Hill':'L','Isaiah Freet':'L','Sam Schrader':'L','Matt Carver':'L','Angelo Multari':'L','Jacob Schmatz':'L','JJ Schmatz':'L',
 'Tyler McDaniel':'#b07a52','James Alexander':'#b07a52','Alejandro Hernandez':'#c99467','Kyle Carlson':'L','Sean Imus':'L','Gabe Helmus':'L','Preston Maxfield':'#b07a52'},MARIAN:{'Devin Cannady':'#b07a52'}};
function v3SkinOf(tid,pl){const T=V3_SKIN[tid];if(!T)return null;const nm=pl.first+' '+pl.last;let v=T[nm];
 if(!v&&tid==='MISH'&&(pl.pos==='OL'||pl.pos==='DL'))v='L'; // the rest of the Mishawaka linemen
 if(!v)return null;if(v==='L'){let h=0;for(const ch of nm)h=(h*31+ch.charCodeAt(0))|0;return V3_LIGHT[Math.abs(h)%V3_LIGHT.length]}return v}

// team-wide skin tone mix for schools the user described: [share, tones]
const V3_TONE={light:['#f1c7a3','#ecbd96','#e3b48c'],tan:['#d9a47a','#c99467'],mixed:['#b07a52','#a06a45','#9a6b47'],brown:['#8d5a3b','#7a4a30','#6b4128'],dark:['#5e3b26','#4a2c1d','#3f2618']};
const V3_TEAMSKIN={WAR:[[.95,V3_TONE.light],[.05,V3_TONE.tan]],WASH:[[.55,V3_TONE.dark],[.45,V3_TONE.brown]],
 CLAY:[[.35,V3_TONE.dark],[.3,V3_TONE.brown],[.2,V3_TONE.mixed],[.15,V3_TONE.light.concat(V3_TONE.tan)]],
 RILEY:[[.35,V3_TONE.dark],[.3,V3_TONE.brown],[.2,V3_TONE.mixed],[.15,V3_TONE.light.concat(V3_TONE.tan)]],
 ADAMS:[[.25,V3_TONE.light],[.15,V3_TONE.tan],[.2,V3_TONE.mixed],[.2,V3_TONE.brown],[.2,V3_TONE.dark]]};
