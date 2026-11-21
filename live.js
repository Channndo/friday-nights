// ===================== LIVE PLAYS =====================
// When you call your own offensive play (not auto / Super Sim), the snap is played out in real time:
//  - Runs (and every catch): you steer the ball carrier left/right with the joystick, arrow keys or A/D. Defenders shed
//    blocks and chase; when one reaches you he tries to tackle (you can break it with strength and a well-timed Juke).
//  - Passes: receivers run their routes and light up green / yellow / red by how open they are. Tap one to throw before
//    the rush gets home, or throw it away. Catch it and you are steering again.
// Ratings drive everything: blocking time (line vs line), pursuit speed, coverage cushion, rush time, catch chance.
// The result goes to the engine (runForced) so stats, clock, downs and scoring work exactly as usual.

let LIVE_ON=(()=>{try{return localStorage.getItem('fn_live')!=='0'}catch(e){return true}})(),LIVE=null;
const LIVE_TS=.8; // game time runs a touch slower than real time so it is playable on a phone
const LIVE_CALLS=['IR','OR','QR','JS','TO','QP','MP','DP','PA'];
function liveToggle(){LIVE_ON=!LIVE_ON;try{localStorage.setItem('fn_live',LIVE_ON?'1':'0')}catch(e){}renderCalls()}
function canLive(oc){return LIVE_ON&&!AUTO&&!SUPER_ON()&&G&&G.phase==='play'&&G.poss===U&&LIVE_CALLS.includes(oc)}
function SUPER_ON(){try{return typeof SUPER!=='undefined'&&SUPER&&SUPER.on}catch(e){return false}}

const lv={
 spd:(p,base,k)=>base+((p&&p.a&&p.a.SPD)||80-0)*0+((((p&&p.a&&p.a.SPD)||80)-80)*k),
 dist:(a,b)=>Math.hypot(a.x-b.x,a.y-b.y),
 g:(m,s)=>m+s*(Math.random()+Math.random()+Math.random()-1.5)*1.15
};

function liveStart(oc,dc){if(busy||!G)return;busy=true;document.querySelectorAll('[data-call]').forEach(b=>b.disabled=true);
 const g=G,os=g.poss,ds=opp(os),O=T(g,os),D=T(g,ds),los=absBall(g),dir=dirOf(g),fd=g.ball+g.togo<100?los+dir*g.togo:null;
 const F0=formation(los,dir,D),ou=eff(g,os),du=eff(g,ds),eRun=clamp((ou.run-du.rdef)/8,-3,3),ePass=clamp((ou.pass-(du.pdef*.75+du.rush*.25))/8,-3,3);
 let call=oc,runner=null,runI=10;
 if(oc==='TO'){call=optRead(dc)} // the option read happens at the mesh, same as the sim
 const isPass=['QP','MP','DP','PA'].includes(call);
 const off=F0.o.map((p,i)=>({x:p.x,y:p.y,i})),def=F0.d.map((p,i)=>({x:p.x,y:p.y,i,blk:0,stun:0,p:null}));
 // who is on the field for the defense, by formation slot
 const dPos=i=>i<=3?['DL',i]:i<=6?['LB',i-4]:i<=8?['CB',i-7]:['S',i-9];
 def.forEach(d=>{const [pos,k]=dPos(d.i);d.p=st(D,pos,Math.min(k,Math.max(0,(D.depth[pos]||[1]).length-1)))||st(D,'LB',0);d.pos=pos;
  const S=(d.p&&d.p.a&&d.p.a.SPD)||80;d.v=(pos==='DL'?4.0:pos==='LB'?4.65:5.15)+(S-80)*.05});
 LIVE={oc,dc,call,g,os,ds,O,D,los,dir,fd,off,def,t:0,lat:0,juke:0,jukes:2,phase:isPass?'pass':'run',ePass,eRun,ball:null,done:false,keys:{},
  tag:null,secs:0};
 if(!isPass){
  if(call==='QR'){runner=st(O,'QB');runI=9}else if(call==='JS'){const W=[0,1,2].map(i=>st(O,'WR',i));const wi=W.reduce((b,p,i)=>p&&p.a.SPD>W[b].a.SPD?i:b,0);runner=W[wi];runI=6+wi}
  else runner=Math.random()<.72?st(O,'RB',0):st(O,'RB',1);
  liveSetupRun(runner,runI,eRun,dc,call)}
 else liveSetupPass(call,dc,ePass);
 liveHud();v3PlayStart();LIVE.last=performance.now();requestAnimationFrame(liveFrame)}

function liveSetupRun(runner,runI,e,dc,call){const L=LIVE,dir=L.dir;L.runner={x:runI===10?L.los-dir*4:L.off[runI].x,y:runI===10?26.66+.5:L.off[runI].y,p:runner,i:runI};
 const S=(runner.a&&runner.a.SPD)||80;L.rv=5.3+(S-80)*.07+(call==='JS'?.35:0);
 if(call==='JS'){L.runner.x=L.los-dir*1.5;L.runner.y=26.66+(L.off[runI].y>26.66?-1:1);L.lat=L.off[runI].y>26.66?.9:-.9;L.autoLat=.5} // takes the handoff already moving to the edge
 if(call==='OR'){L.autoLat=.35;L.lat=Math.random()<.5?.8:-.8}
 for(const d of L.def){const r=Math.random();
  if(d.pos==='DL')d.blk=clamp(lv.g(1.25+e*.32-(dc==='RUNSTOP'?.25:0)+(call==='OR'||call==='JS'?.25:0),.45),.15,3.2);
  else if(d.pos==='LB')d.blk=r<(dc==='RUNSTOP'?.45:.72)?clamp(lv.g(.95+e*.22,.35),.15,2.4):0;
  else d.blk=r<.4?clamp(lv.g(.9,.3),.1,2):0;
  if(dc==='BLITZ'&&d.pos==='LB'&&d.i!==5){d.x=L.los+dir*1.2}}
}

const ROUTES={ // [forward, lateral] waypoints; lateral sign + means "toward his own sideline"
 QP:{6:[[5,0],[8,-5]],7:[[6,0],[5,0]],8:[[5,0],[8,-5]],5:[[2,0],[3,7]],10:[[1,4],[2,9]]},
 MP:{6:[[12,0],[12,7]],7:[[13,0],[11,-1]],8:[[11,0],[12,-9]],5:[[10,0]],10:[[3,3]]},
 DP:{6:[[45,0]],7:[[12,0],[32,-9]],8:[[12,0],[26,8]],5:[[12,0]],10:[[3,3]]},
 PA:{6:[[12,0],[30,-8]],7:[[8,0],[14,-18]],8:[[40,0]],5:[[3,0],[5,-12]],10:null}};
function liveSetupPass(call,dc,pe){const L=LIVE,dir=L.dir,O=L.O,cy=26.66;L.qb={x:L.off[9].x,y:L.off[9].y,p:st(O,'QB'),i:9};
 const who={6:st(O,'WR',0),7:st(O,'WR',1),8:st(O,'WR',2),5:st(O,'TE',0),10:st(O,'RB',0)};
 L.recv=[];for(const i of [6,7,8,5,10]){const rt=ROUTES[call][i];if(!rt)continue;const o=L.off[i],sg=Math.sign(o.y-cy)||1,p=who[i];
  const pts=rt.map(([f,l])=>({x:o.x+dir*f,y:clamp(o.y+sg*l,1.5,51.8)}));L.recv.push({i,p,x:o.x,y:o.y,pts,k:0,v:(4.9+(((p.a&&p.a.SPD)||80)-80)*.06)*(i===5||i===10?.92:1),hist:[],sep:9,cov:null})}
 // coverage: corners on the outside receivers, safeties/linebackers on the rest; blitzers rush
 const rush=[0,1,2,3];if(dc==='BLITZ'){rush.push(4,6)}
 const want={6:7,7:8,8:9,5:dc==='BLITZ'?10:6,10:5};
 for(const r of L.recv){const d=L.def[want[r.i]];if(!d||rush.includes(d.i)){r.cov=null;continue}r.cov=d;
  const rr=r.p.ovr||80,cr=(d.p&&d.p.ovr)||80,deep=call==='DP'||(call==='PA'&&r.i!==5);
  r.lag=clamp(.2+(rr-cr)*.011-pe*-.035+(dc==='COVER'?(deep?-.12:.08):0)+(dc==='BLITZ'?.12:0)+(dc==='RUNSTOP'?(call==='PA'?.18:.07):0)+lv.g(0,.13),0,.95)}
 L.rushers=rush.map(i=>L.def[i]);
 const W=(typeof wxOf==='function')?wxOf(L.g):{pass:0};L.wx=W;
 L.tSack=clamp(lv.g(2.75+pe*.22-(dc==='BLITZ'?.7:0)+(call==='QP'?.35:0)-(call==='DP'?.15:0),.4),1.3,4.6);L.fake=call==='PA'?.55:0;
 // linemen and the backs not in a route hold the pocket
}

function liveInputLat(){const L=LIVE,k=L.keys;let jx=L.jx||0,jy=L.jy||0;if(k.ArrowLeft||k.a)jx=-1;if(k.ArrowRight||k.d)jx=1;if(k.ArrowUp||k.w)jy=-1;if(k.ArrowDown||k.s)jy=1;
 if(V3.on&&(V3.cam==='bc'||V3.cam==='high'))return clamp(jx*L.dir,-1,1);if(V3.on&&V3.cam==='side')return clamp(-jy,-1,1);return clamp(jy,-1,1)}

function liveFrame(now){const L=LIVE;if(!L||L.done)return;let dt=Math.min(.05,(now-L.last)/1000)*LIVE_TS;L.last=now;L.t+=dt;
 if(L.phase==='pass')livePass(dt);else if(L.phase==='air')liveAir(dt);else liveRun(dt);
 if(L.done)return;liveDraw();requestAnimationFrame(liveFrame)}

function liveRun(dt){const L=LIVE,R=L.runner,dir=L.dir;
 let lat=liveInputLat();if(!lat&&L.autoLat&&L.t<.6)lat=L.lat;else if(lat)L.autoLat=0;
 if(L.juke>0)L.juke-=dt;const sp=L.rv*(L.slow>0?.6:1);if(L.slow>0)L.slow-=dt;
 const vy=lat*sp*.85,vx=dir*sp*Math.sqrt(Math.max(.25,1-.55*lat*lat));R.x+=vx*dt;R.y+=vy*dt;L.vel={x:vx,y:vy};
 // blockers drift with the play
 for(const o of L.off){if(o.i===R.i)continue;o.x+=dir*.9*dt*(L.t<1.2?1:.2)}
 for(const d of L.def){if(d.stun>0){d.stun-=dt;continue}
  if(d.blk>0){d.blk-=dt;const a=Math.atan2(R.y-d.y,R.x-d.x);d.x+=Math.cos(a)*.35*dt;d.y+=Math.sin(a)*.35*dt;continue}
  const tx=R.x+vx*.35,ty=R.y+vy*.35,a=Math.atan2(ty-d.y,tx-d.x);d.x+=Math.cos(a)*d.v*dt;d.y+=Math.sin(a)*d.v*dt;
  if(lv.dist(d,R)<.95){const tak=(d.p&&d.p.a&&d.p.a.TAK)||78,brk=(((R.p.a&&R.p.a.TRK)||70)+((R.p.a&&R.p.a.AGI)||80))/2;
   let pT=clamp(.64+(tak-brk)*.01,.38,.9);if(L.juke>0)pT*=.4;if(L.tagged===d)pT=Math.min(.98,pT+.2);
   if(Math.random()<pT){L.fall=(vx*dir>2?1+Math.round(Math.random()*1.4):0);return liveEnd('tackle',d)}d.stun=.85;d.x-=dir*1.2;L.slow=.25;L.tagged=d;liveTag(L.juke>0?'JUKE!':'BROKEN TACKLE!')}}
 const prog=(R.x-L.los)*dir;
 if(L.g.ball+prog>=100)return liveEnd('td');
 if(R.y<.3||R.y>53.03)return liveEnd('oob');
 if(L.t>11)return liveEnd('tackle',null)}

function livePass(dt){const L=LIVE,dir=L.dir,cy=26.66,qb=L.qb;
 // QB drop (with play fake)
 const dropTo={x:L.los-dir*6,y:cy};if(L.t<.8+L.fake){const u=Math.min(1,L.t/(.8+L.fake));qb.x=lerp(L.off[9].x,dropTo.x,u);qb.y=lerp(L.off[9].y,dropTo.y,u)}
 for(const r of L.recv){if(L.t<L.fake){continue}const tg=r.pts[r.k];if(tg){const a=Math.atan2(tg.y-r.y,tg.x-r.x),d=Math.hypot(tg.x-r.x,tg.y-r.y),m=Math.min(d,r.v*dt);r.x+=Math.cos(a)*m;r.y+=Math.sin(a)*m;if(d<.3)r.k++}
  else{r.x+=dir*.6*dt}
  r.hist.push({t:L.t,x:r.x,y:r.y});if(r.hist.length>200)r.hist.shift();
  if(r.cov){const c=r.cov,tt=L.t-r.lag;let h=r.hist[0];for(const q of r.hist){if(q.t<=tt)h=q;else break}
   const gx=h.x+dir*.9,gy=h.y;const a=Math.atan2(gy-c.y,gx-c.x),d=Math.hypot(gx-c.x,gy-c.y);const m=Math.min(d,c.v*1.05*dt);c.x+=Math.cos(a)*m;c.y+=Math.sin(a)*m}
  r.sep=r.cov?lv.dist(r,r.cov):9}
 // rush closes on the QB until the sack clock runs out
 const u=clamp(L.t/L.tSack,0,1);for(const d of L.rushers){d.x=lerp(d.x,qb.x+dir*.8,Math.min(1,dt*1.2*u*u+.002));d.y=lerp(d.y,qb.y,Math.min(1,dt*.9*u*u))}
 for(const d of L.def){if(L.rushers.includes(d)||L.recv.some(r=>r.cov===d))continue;d.x=lerp(d.x,qb.x+dir*9,dt*.25)}
 L.press=u;if(L.t>=L.tSack)return liveEnd('sack',L.rushers[Math.floor(Math.random()*L.rushers.length)]);
 liveHudPass()}

function liveThrow(idx){const L=LIVE;if(!L||L.phase!=='pass')return;const r=L.recv.find(x=>x.i===idx);if(!r)return;
 const qb=L.qb,d=lv.dist(qb,r),fl=.32+d/24;
 // where he will be when the ball arrives
 const fut={x:r.x,y:r.y},tg=r.pts[r.k];if(tg){const a=Math.atan2(tg.y-r.y,tg.x-r.x);fut.x+=Math.cos(a)*r.v*fl;fut.y+=Math.sin(a)*r.v*fl}else fut.x+=L.dir*.6*fl;
 L.phase='air';L.air={r,from:{x:qb.x,y:qb.y},to:fut,t0:L.t,fl,press:L.press,sep0:r.sep};liveHud()}

function liveAir(dt){const L=LIVE,A=L.air,u=clamp((L.t-A.t0)/A.fl,0,1);
 const r=A.r;r.x=lerp(r.x,A.to.x,Math.min(1,dt*3));r.y=lerp(r.y,A.to.y,Math.min(1,dt*3));
 if(r.cov){const c=r.cov;c.x=lerp(c.x,r.x+L.dir*.6,Math.min(1,dt*2.2));c.y=lerp(c.y,r.y,Math.min(1,dt*2.2))}
 for(const d of L.rushers){d.x=lerp(d.x,L.qb.x,dt*.8);d.y=lerp(d.y,L.qb.y,dt*.8)}
 L.ball={x:lerp(A.from.x,A.to.x,u),y:lerp(A.from.y,A.to.y,u),h:Math.sin(u*Math.PI)*(A.fl>1.1?9:4)};
 if(u<1)return;
 const sep=r.cov?lv.dist(r,r.cov):6,QB=L.qb.p,qa=((QB.a&&(QB.a.ACC||QB.a.THA))||QB.ovr||80),distY=Math.abs((A.to.x-L.los)*L.dir);
 let pc=clamp(.27+Math.min(sep,4)*.17+(qa-80)*.007-(L.wx.pass||0)-(distY>25?.08:0)-(A.press>.85?.1:0)+(r.p.a&&r.p.a.CTH?(r.p.a.CTH-80)*.004:0),.05,.95);
 if(Math.random()<pc){L.phase='run';L.catch={x:r.x};L.runner={x:r.x,y:r.y,p:r.p,i:r.i};L.rv=5.1+(((r.p.a&&r.p.a.SPD)||80)-80)*.07;L.ball=null;L.air.cmp=1;
  for(const d of L.def){d.blk=0;if(d===r.cov)d.stun=sep>2.2?.5:sep>1.1?.2:0}L.t0run=L.t;liveTag(sep>2.2?'WIDE OPEN':'CAUGHT');liveHud();return}
 const pInt=sep<1.1?.24:sep<2.2?.08:.02;
 if(r.cov&&Math.random()<pInt)return liveEnd('int',r.cov);
 liveEnd('inc',r.cov&&sep<1.6?r.cov:null)}

function liveDraw(){const L=LIVE,oT=L.O,dT=L.D;drawField(L.los,L.dir,L.fd);const F={o:L.off.map(o=>({x:o.x,y:o.y})),d:L.def.map(d=>({x:d.x,y:d.y}))};let hl=-1;
 if(L.recv)for(const r of L.recv)F.o[r.i]={x:r.x,y:r.y};if(L.qb)F.o[9]={x:L.qb.x,y:L.qb.y};
 if(L.phase==='run'&&L.runner){F.o[L.runner.i]={x:L.runner.x,y:L.runner.y};hl=L.runner.i}
 drawPlayers(F,oT,dT,hl,-1);
 // pass reads: colored rings by how open each receiver is
 if(L.phase==='pass'&&L.recv){const c=ctx,s=GE.s;c.save();for(const r of L.recv){const col=r.sep>2.2?'#2ee66b':r.sep>1.1?'#ffd23d':'#ff4d4d';c.strokeStyle=col;c.lineWidth=2.5;c.beginPath();c.arc(X(r.x),Y(r.y),s*1.25,0,7);c.stroke();
   c.fillStyle=col;c.font=`700 ${Math.max(10,s*1.1)}px Oswald,sans-serif`;c.textAlign='center';c.fillText(r.p.last,X(r.x),Y(r.y)-s*1.6)}
  const q=L.qb;c.strokeStyle=`rgba(255,80,80,${.25+.6*L.press})`;c.lineWidth=3;c.beginPath();c.arc(X(q.x),Y(q.y),s*(3.2-2.2*L.press),0,7);c.stroke();c.restore()}
 if(L.phase==='air'&&L.ball)ball(L.ball,L.ball.h);else if(L.phase==='run'&&L.runner)ball(L.runner);else if(L.qb)ball(L.qb)}

// ---- finishing: hand the result to the engine and let the normal post-play flow run ----
function liveEnd(how,d){const L=LIVE;if(!L||L.done)return;L.done=true;const dir=L.dir;let F;const secs=Math.max(4,L.t/LIVE_TS+1.5);
 if(how==='sack'){F={kind:'sack',y:-clamp(Math.round(Math.abs((L.qb.x-L.los))+Math.random()*2),2,11),tackler:d&&d.p,secs}}
 else if(how==='int'){F={kind:'int',target:L.air.r.p,role:L.air.r.i,air:(L.air.to.x-L.los)*dir,defender:d&&d.p,ret:Math.random()<.6?0:Math.round(Math.random()*18),secs}}
 else if(how==='inc'){F={kind:'inc',target:L.air.r.p,role:L.air.r.i,air:(L.air.to.x-L.los)*dir,brokeUp:d&&d.p,secs}}
 else if(how==='away'){F={kind:'away',secs}}
 else{const R=L.runner,y=how==='td'?100-L.g.ball:Math.min(100-L.g.ball,Math.round((R.x-L.los)*dir)+(how==='tackle'?(L.fall||0):0));
  F=L.air&&L.air.cmp?{kind:'cmp',target:R.p,role:R.i,air:(L.catch.x-L.los)*dir,y,tackler:d&&d.p,oob:how==='oob',secs}:{kind:'run',carrier:R.p,y,tackler:d&&d.p,oob:how==='oob',secs}}
 liveHudOff();const oc=L.oc,dc=L.dc;L.g._force=F;LIVE=null;busy=false;setTimeout(()=>play(oc,dc,true),how==='td'?150:450)}

// ---- touch / keyboard controls ----
function liveTag(t){const b=$('#banner');if(!b)return;b.textContent=t;b.className='show blue';clearTimeout(liveTag.t);liveTag.t=setTimeout(()=>b.className='',650)}
function liveHud(){let h=$('#liveHud');if(!h){h=document.createElement('div');h.id='liveHud';$('#fieldWrap').appendChild(h)}
 const L=LIVE;if(!L)return;
 if(L.phase==='pass'){h.innerHTML=`<div class="lhTip">Tap an open receiver · green = open</div><div class="lhRecv">${L.recv.map(r=>`<button class="lhR" data-r="${r.i}"><b>${esc(r.p.last)}</b><span>${r.i===5?'TE':r.i===10?'RB':'WR'}</span></button>`).join('')}<button class="lhR away" data-away="1"><b>Throw it away</b></button></div>`;
  h.querySelectorAll('[data-r]').forEach(b=>b.onpointerdown=e=>{e.preventDefault();liveThrow(+b.dataset.r)});h.querySelector('[data-away]').onpointerdown=e=>{e.preventDefault();if(LIVE&&LIVE.phase==='pass')liveEnd('away')};return}
 if(L.phase==='air'){h.innerHTML='';return}
 h.innerHTML=`<div class="lhTip">${V3.on&&V3.cam!=='side'?'Drag left / right to steer':'Drag up / down to steer'} · Juke to dodge a tackle</div><div class="lhStick" id="lhStick"><div class="lhKnob" id="lhKnob"></div></div><button class="lhJuke" id="lhJuke">JUKE <span>${L.jukes}</span></button>`;
 const st0=$('#lhStick'),kn=$('#lhKnob');let id=null,cx=0,cy=0;
 const mv=e=>{if(e.pointerId!==id||!LIVE)return;const dx=clamp((e.clientX-cx)/48,-1,1),dy=clamp((e.clientY-cy)/48,-1,1);LIVE.jx=dx;LIVE.jy=dy;kn.style.transform=`translate(${dx*36}px,${dy*36}px)`};
 st0.onpointerdown=e=>{e.preventDefault();id=e.pointerId;const r=st0.getBoundingClientRect();cx=r.left+r.width/2;cy=r.top+r.height/2;st0.setPointerCapture(id);mv(e)};
 st0.onpointermove=mv;st0.onpointerup=st0.onpointercancel=e=>{if(e.pointerId!==id)return;id=null;if(LIVE){LIVE.jx=0;LIVE.jy=0}kn.style.transform=''};
 $('#lhJuke').onpointerdown=e=>{e.preventDefault();liveJuke()}}
function liveJuke(){const L=LIVE;if(!L||L.phase!=='run'||L.jukes<=0||L.juke>0)return;L.jukes--;L.juke=.45;const s=$('#lhJuke span');if(s)s.textContent=L.jukes}
function liveHudPass(){const L=LIVE,h=$('#liveHud');if(!h)return;for(const r of L.recv){const b=h.querySelector(`[data-r="${r.i}"]`);if(b)b.style.background=r.sep>2.2?'#1e8a45':r.sep>1.1?'#9a7a12':'#8a2323'}}
function liveHudOff(){const h=$('#liveHud');if(h)h.remove()}
document.addEventListener('keydown',e=>{if(!LIVE)return;LIVE.keys[e.key.length===1?e.key.toLowerCase():e.key]=1;if(e.key===' '){e.preventDefault();if(LIVE.phase==='run')liveJuke()}
 if(LIVE.phase==='pass'&&/^[1-5]$/.test(e.key)){const r=LIVE.recv[+e.key-1];if(r)liveThrow(r.i)}if(e.key.startsWith('Arrow'))e.preventDefault()});
document.addEventListener('keyup',e=>{if(!LIVE)return;LIVE.keys[e.key.length===1?e.key.toLowerCase():e.key]=0});
