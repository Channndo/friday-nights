// ================= UI =================
const $=s=>document.querySelector(s);
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const LS={get(k){try{return localStorage.getItem(k)}catch(e){return null}},set(k,v){try{localStorage.setItem(k,v);return true}catch(e){return false}},del(k){try{localStorage.removeItem(k)}catch(e){}}};
const logoImgs={};
// Generated crest logos for fictional programs (generic:true): shield / circle / diamond with the school initial; Catholic schools get a cross.
function crestSVG(t){const c1=t.c1,c2=t.c2,ini=t.school.replace(/^St\.\s*|^Bishop\s+/,'').trim()[0],sh=t.crest||'shield';
 const shape=sh==='circle'?`<circle cx="100" cy="104" r="88" fill="${c1}" stroke="${c2}" stroke-width="12"/><circle cx="100" cy="104" r="72" fill="none" stroke="${c2}" stroke-width="3"/>`:
  sh==='diamond'?`<path d="M100 10 L190 104 L100 198 L10 104 Z" fill="${c1}" stroke="${c2}" stroke-width="12" stroke-linejoin="round"/>`:
  `<path d="M22 22 H178 V100 C178 156 136 186 100 200 C64 186 22 156 22 100 Z" fill="${c1}" stroke="${c2}" stroke-width="12" stroke-linejoin="round"/>`;
 const cross=t.catholic?`<path d="M100 24 V64 M84 38 H116" stroke="${c2}" stroke-width="8" stroke-linecap="round"/>`:'';
 const svg=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 210">${shape}${cross}<text x="100" y="${t.catholic?156:150}" text-anchor="middle" font-family="Georgia,Times New Roman,serif" font-weight="700" font-size="${t.catholic?96:110}" fill="${c2}" stroke="#000" stroke-opacity=".35" stroke-width="3" paint-order="stroke">${ini}</text></svg>`;
 return'data:image/svg+xml;base64,'+btoa(svg)}
function setupGeneric(){for(const t of TEAMS.filter(x=>x.generic)){const lg=crestSVG(t);t.logoBuiltIn=lg;t.mascot=lg;autoKit(t,lg)}}
// Default field + uniforms in team colors with the given logo at midfield/helmet (teams without custom stadium/uniform art).
function autoKit(t,lg){{
 if(!STADIUMS[t.id])STADIUMS[t.id]={ez:'fill',ezFill:t.c1,ezText:[t.school.toUpperCase(),t.name.toUpperCase()],ezColor:t.c2,ezStroke:'#000000',font:'Graduate',border:'#FFFFFF',mid:()=>lg,midW:6,track:'#2a2c31',backdrop:'grandstand',board:(t.school+' '+t.name).toUpperCase(),venue:t.school+' '+t.name+' home field'};
 if(!UNIFORMS[t.id]){const hl=()=>lg;UNIFORMS[t.id]={home:{jersey:t.c1,num:t.c2,numOut:'#111111',trim:t.c2,word:t.name.toUpperCase(),pants:t.c2==='#FFFFFF'?'#FFFFFF':t.c2,pstripe:t.c1,helmet:t.c1,hstripe:t.c2,hlogo:hl,socks:t.c1,belt:'#111111'},
  away:{jersey:'#FFFFFF',num:t.c1,numOut:t.c2,trim:t.c1,word:t.name.toUpperCase(),pants:t.c1,pstripe:t.c2,helmet:t.c1,hstripe:t.c2,hlogo:hl,socks:'#FFFFFF',belt:'#111111'}}}}}
function loadLogos(){setupGeneric();if(typeof setupFakeArt==='function')setupFakeArt();for(const [id,lg,m] of [['MEM',IMG_MEM_TIGER],['GIB',IMG_GIB_GS],['BS',IMG_BS_PANTHER],['NPAL',IMG_NPAL_DRAGON],['HH',IMG_HH_PATRIOT],['HMS',IMG_HMS_SPARTAN],['CG',IMG_CG_TRI],['SNID',IMG_SNID_PANTHER],['BRN',IMG_BRN_BRAVE],['REITZ',IMG_REITZ_R]]){const t=TEAMS.find(x=>x.id===id);if(t){t.logoBuiltIn=lg;t.mascot=lg;autoKit(t,lg)}}
 {const Cg=TEAMS.find(t=>t.id==='CG');if(Cg){Cg.mascot=IMG_CG_TROJAN;Cg.altLogo=IMG_CG_TROJAN}}
 {const Rz=TEAMS.find(t=>t.id==='REITZ');if(Rz){Rz.mascot=IMG_REITZ_PAW;Rz.altLogo=IMG_REITZ_WORD}}
 if(STADIUMS.LAP){STADIUMS.LAP.mid=()=>IMG_LAP_SLICERS;STADIUMS.LAP.midW=19}if(UNIFORMS.LAP)for(const k of['home','away'])if(UNIFORMS.LAP[k])UNIFORMS.LAP[k].hlogo=()=>IMG_LAP_SLICERS;
 {const Gb=TEAMS.find(t=>t.id==='GIB');if(Gb){Gb.logoBuiltIn=IMG_GIB_TITAN;Gb.mascot=IMG_GIB_TITAN;Gb.altLogo=IMG_GIB_GS;if(STADIUMS.GIB)STADIUMS.GIB.midW=10}}
 {const Ec=TEAMS.find(t=>t.id==='EC');if(Ec)Ec.mascot=IMG_EC_HORNET4}const M=TEAMS.find(t=>t.id==='MISH');M.logoBuiltIn=IMG_M;M.mascot=IMG_CAVEMAN;for(const [id,b] of [['ADAMS',IMG_ADAMS_EAGLE],['RILEY',IMG_RILEY_CAT],['CLAY',IMG_CLAY_HEAD],['WASH',IMG_WASH_PANTHER]])TEAMS.find(t=>t.id===id).logoBuiltIn=b;TEAMS.find(t=>t.id==='ADAMS').mascot=IMG_ADAMS_EAGLE;TEAMS.find(t=>t.id==='ADAMS').altLogo=IMG_BADGE_ADAMS;TEAMS.find(t=>t.id==='RILEY').mascot=IMG_RILEY_CAT;TEAMS.find(t=>t.id==='WASH').mascot=IMG_WASH_PANTHER;TEAMS.find(t=>t.id==='CLAY').mascot=IMG_CLAY_SOLDIER;TEAMS.find(t=>t.id==='CLAY').altLogo=IMG_BADGE_CLAY;TEAMS.find(t=>t.id==='WASH').altLogo=IMG_BADGE_WASH;TEAMS.find(t=>t.id==='RILEY').altLogo=IMG_BADGE_RILEY;{const Lp=TEAMS.find(t=>t.id==='LAP');Lp.logoBuiltIn=IMG_LAP_SLICERS;Lp.mascot=IMG_LAP_SLICERS;Lp.altLogo=IMG_BADGE_LAP;}{const W2=TEAMS.find(t=>t.id==='NW');W2.logoBuiltIn=IMG_NW_BADGE;W2.mascot=IMG_NW_PANTHER}{const Z=TEAMS.find(t=>t.id==='PLY');Z.logoBuiltIn=IMG_PLY_SHIP;Z.mascot=IMG_PLY_SHIP;Z.altLogo=IMG_PLY_P}{const Y=TEAMS.find(t=>t.id==='ELK');Y.logoBuiltIn=IMG_ELK_LION;Y.mascot=IMG_ELK_LION}{const X=TEAMS.find(t=>t.id==='NR');X.logoBuiltIn=IMG_NR_N;X.mascot=IMG_NR_KNIGHT}{const N=TEAMS.find(t=>t.id==='NP');N.logoBuiltIn=IMG_NP_COUGAR;N.mascot=IMG_NP_COUGAR}const CA=TEAMS.find(t=>t.id==='CARMEL');if(CA){CA.logoBuiltIn=IMG_CARMEL_C;CA.mascot=IMG_CARMEL_C;CA.altLogo=IMG_CARMEL_HELMET}{const Zt=TEAMS.find(t=>t.id==='ZION');if(Zt){Zt.logoBuiltIn=IMG_ZION_Z;Zt.mascot=IMG_ZION_EAGLE;Zt.altLogo=IMG_ZION_EAGLE}}{const Nb=TEAMS.find(t=>t.id==='NOB');if(Nb){Nb.logoBuiltIn=IMG_NOB_MILLER;Nb.mascot=IMG_NOB_MILLER}}{const Bd=TEAMS.find(t=>t.id==='BD');if(Bd){Bd.logoBuiltIn=IMG_BD_SHIELD;Bd.mascot=IMG_BD_GIANT}}{const Bc=TEAMS.find(t=>t.id==='BC');if(Bc){Bc.logoBuiltIn=IMG_BC_TROJAN;Bc.mascot=IMG_BC_TROJAN}}{const Ct=TEAMS.find(t=>t.id==='CATH');if(Ct){Ct.logoBuiltIn=IMG_CATH_C;Ct.mascot=IMG_CATH_C}}{const Wc=TEAMS.find(t=>t.id==='WC');if(Wc){Wc.logoBuiltIn=IMG_BADGE_WC;Wc.mascot=IMG_WC_W;Wc.altLogo=IMG_WC_WGOLD}}{const Cp=TEAMS.find(t=>t.id==='CP');if(Cp){Cp.logoBuiltIn=IMG_CP_DOG;Cp.mascot=IMG_CP_DOG}}{const Mr=TEAMS.find(t=>t.id==='MERR');if(Mr){Mr.logoBuiltIn=IMG_MERR_PIRATE;Mr.mascot=IMG_MERR_PIRATE;Mr.altLogo=IMG_MERR_M}}{const Wf=TEAMS.find(t=>t.id==='WEST');if(Wf){Wf.logoBuiltIn=IMG_WF_ROCKS;Wf.mascot=IMG_WF_ROCKS}}{const Wr=TEAMS.find(t=>t.id==='WAR');if(Wr){Wr.logoBuiltIn=IMG_WAR_TIGER;Wr.mascot=IMG_WAR_TIGER}}{const Po=TEAMS.find(t=>t.id==='PORT');if(Po){Po.logoBuiltIn=IMG_BADGE_PORT}}{const Va=TEAMS.find(t=>t.id==='VAL');if(Va){Va.logoBuiltIn=IMG_VAL_VIKING;Va.mascot=IMG_VAL_VIKING;Va.altLogo=IMG_VAL_V}}{const Lc=TEAMS.find(t=>t.id==='LC');if(Lc){Lc.logoBuiltIn=IMG_LC_LOGO;Lc.mascot=IMG_LC_LOGO}}{const Mc=TEAMS.find(t=>t.id==='MC');if(Mc){Mc.logoBuiltIn=IMG_MC_M;Mc.mascot=IMG_MC_WOLF;Mc.altLogo=IMG_MC_WOLF}}{const Rn=TEAMS.find(t=>t.id==='RONC');if(Rn){Rn.logoBuiltIn=IMG_RON_LION;Rn.mascot=IMG_RON_LION;Rn.altLogo=IMG_RON_R}}{const Ca=TEAMS.find(t=>t.id==='CARR');if(Ca){Ca.logoBuiltIn=IMG_CARR_C;Ca.mascot=IMG_CARR_C}}{const Bd=TEAMS.find(t=>t.id==='BDW');if(Bd){Bd.logoBuiltIn=IMG_BDW_ANGEL;Bd.mascot=IMG_BDW_ANGEL;Bd.altLogo=IMG_BDW_BD}}{const An=TEAMS.find(t=>t.id==='AND');if(An){An.logoBuiltIn=IMG_AND_RAPTOR;An.mascot=IMG_AND_RAPTOR;An.altLogo=IMG_AND_A}}{const Ec=TEAMS.find(t=>t.id==='EC');if(Ec){Ec.logoBuiltIn=IMG_EC_LOGO;Ec.mascot=IMG_EC_HORNET4;Ec.altLogo=IMG_EC_LOGO}}{const Hm=TEAMS.find(t=>t.id==='HMS');if(Hm){Hm.logoBuiltIn=IMG_HMS_SPARTAN;Hm.mascot=IMG_HMS_SPARTAN}}{const Cg=TEAMS.find(t=>t.id==='CG');if(Cg){Cg.logoBuiltIn=IMG_CG_TROJAN;Cg.mascot=IMG_CG_TROJAN}}{const F=TEAMS.find(t=>t.id==='FISH');if(F){F.logoBuiltIn=IMG_FISH_TIGER;F.mascot=IMG_FISH_TIGER;F.altLogo=IMG_BADGE_FISH}}const JI=TEAMS.find(t=>t.id==='JIM');JI.logoBuiltIn=IMG_JIM_J;JI.mascot=IMG_JIM_MINER;const CO=TEAMS.find(t=>t.id==='CON');CO.logoBuiltIn=IMG_CON_BADGE;CO.mascot=IMG_CON_BADGE;const SJt=TEAMS.find(t=>t.id==='SJ');SJt.logoBuiltIn=IMG_SJ_LOGO;SJt.mascot=IMG_SJ_HUSKY;SJt.altLogo=IMG_SJ_EMBLEM;const MA=TEAMS.find(t=>t.id==='MARIAN');MA.logoBuiltIn=IMG_MAR_SHIELD;MA.mascot=IMG_MAR_KNIGHT;MA.altLogo=IMG_MAR_M;const P=TEAMS.find(t=>t.id==='PENN');P.logoBuiltIn=IMG_PENN_SHIELD;P.mascot=IMG_PENN_KNIGHT;P.altLogo=IMG_PENN_HELMET;for(const t of TEAMS){const d=LS.get('gi_logo_'+t.id);if(d){t.logo=d;const im=new Image();im.src=d;logoImgs[t.id]=im}}}
function logo(t,size){const src=t.logo||t.logoBuiltIn;if(src)return`<img class="logo" src="${src}" style="width:${size}px;height:${size}px" alt="">`;
 return`<div class="badge" style="width:${size}px;height:${size}px;background:${t.c1};color:${t.c2};border-color:${t.c2};font-size:${Math.round(size*.32)}px">${t.abbr}</div>`}
function show(id){if(typeof setSeasonCtx==='function'){if(id==='season')setSeasonCtx(true);else if(id==='home'||id==='select')setSeasonCtx(false)}document.querySelectorAll('.screen').forEach(s=>s.classList.toggle('active',s.id===id));if(id==='game'){requestAnimationFrame(resize);if(typeof V3!=='undefined'&&v3Pref()&&!V3.on){V3.on=true;v3Apply()}else if(typeof V3!=='undefined'&&V3.on)aud3.init()}else if(typeof aud3!=='undefined')aud3.pause()}
document.addEventListener('click',e=>{const b=e.target.closest('[data-go]');if(b){const g=b.dataset.go;if(g==='select')renderSelect();if(g==='teams')renderTeams();show(g)}});

// ---------- SELECT ----------
let selU=0,selC=1;
const uShow=(t,k)=>clamp(t.u[k]+(t.ovrDelta||0),40,99);
function titleLine(id,short,noRec){const h=(typeof CANON!=='undefined'&&CANON.teams[id])||null;if(!h)return'';
 if(short)return h.st?`🏆 ${h.st}× State${h.sf-h.st?' · 🥈 '+(h.sf-h.st):''}`:(h.cf?`${h.cf} conf titles`:'');
 return`<div class="pk-titles">${noRec?`<button class="hist-btn" style="margin:0 4px 0 0" data-prog="${id}">History</button>`:''}🏆 <b>${h.st}</b> State · 🥈 <b>${h.sf-h.st}</b> Runner-up · ${noRec?'':`<b>${h.rg}</b> Regional · `}<b>${h.cf}</b> Conf ${noRec?'':`· ${h.w}-${h.l} all-time <button class="hist-btn" data-prog="${id}">History</button>`}</div>`}
function pickCol(i,label){const t=TEAMS[i];return`<div class="pk-label">${label} · tap logo for all teams</div>
 <div class="pk-row"><button class="arrow" data-pk="${label}" data-d="-1">‹</button><span data-tp="${label}">${logo(t,64)}</span><button class="arrow" data-pk="${label}" data-d="1">›</button></div>
 <div class="pk-name" style="color:${t.c1==='#111111'?t.c2:t.c1}">${esc(t.school)}</div><div class="pk-mascot">${esc(t.name)}${t.nickname?` · <i>"${esc(t.nickname)}"</i>`:''}</div>${t.coach?`<div class="pk-coach">Head coach: ${esc(t.coach)}</div>`:''}
 <div class="ratings"><span><b>${t.ovr}</b>OVR</span><span><b>${uShow(t,'OFF')}</b>OFF</span><span><b>${uShow(t,'DEF')}</b>DEF</span></div>${titleLine(t.id,0,1)}
 <div class="pk-desc">${esc(t.desc)}</div>${t.mascot?`<img class="mascot" src="${t.mascot}" alt="">`:''}`}
let userHome=true,venueSel=null,wxSel=null;
function homeOf(){return userHome?TEAMS[selU]:TEAMS[selC]}
function venueTeam(){return venueSel==null?homeOf():venueSel==='LUCAS'?STATE_VENUE:venueSel==='PRACTICE'?PRACTICE_VENUE:TEAMS[venueSel]}
function renderSelect(){if(selU===selC)selC=(selC+1)%TEAMS.length;$('#haBtn').textContent=userHome?'You: HOME':'You: AWAY';{const lab=t=>{const v=stadiumFor(t).venue||t.school,has=[t.school,t.name].some(w=>w&&v.toLowerCase().includes(w.toLowerCase()));return v+(has?'':' ('+t.school+')')};
  const opts=TEAMS.map((t,i)=>[i,lab(t)]).sort((a,b)=>a[1].localeCompare(b[1]));
  $('#venue').innerHTML=`Field: <select id="venueDD" style="background:#151a22;color:#ffcf3d;border:1px solid #39404c;border-radius:6px;font:600 12px Inter,sans-serif;padding:3px 4px;max-width:260px">
   <option value="">Home team · ${esc(lab(homeOf()))}</option><option value="LUCAS" ${venueSel==='LUCAS'?'selected':''}>Lucas Oil Stadium (State Finals)</option><option value="PRACTICE" ${venueSel==='PRACTICE'?'selected':''}>Practice Field (country)</option>
   ${opts.map(([i,l])=>`<option value="${i}" ${venueSel===i?'selected':''}>${esc(l)}</option>`).join('')}</select>`;
  $('#venue').insertAdjacentHTML('beforeend',` <span style="margin-left:8px">Weather: <select id="wxDD" style="background:#151a22;color:#ffcf3d;border:1px solid #39404c;border-radius:6px;font:600 12px Inter,sans-serif;padding:3px 4px">${[['','Random'],['clear','Clear'],['rain','Rain'],['hrain','Heavy rain'],['snow','Snow'],['hsnow','Heavy snow']].map(([v,l])=>`<option value="${v}" ${(wxSel||'')===v?'selected':''}>${l}</option>`).join('')}</select></span>`);{const w=$('#wxDD');w.onclick=e=>e.stopPropagation();w.onchange=()=>{wxSel=w.value||null}}
   const dd=$('#venueDD');dd.onclick=e=>e.stopPropagation();dd.onchange=()=>{const v=dd.value;venueSel=v===''?null:(v==='LUCAS'||v==='PRACTICE')?v:+v;renderSelect()}}$('#pickU').innerHTML=pickCol(selU,'YOU');$('#pickC').innerHTML=pickCol(selC,'CPU');
 const r=rivalry(TEAMS[selU].id,TEAMS[selC].id),fs=[TEAMS[selU].id,TEAMS[selC].id].sort().join()==='MISH,WAR';$('#rivalTag').innerHTML=(r?`<span class="rival">${r}</span>`:'')+(fs?' <span class="rival" style="background:#7B1E2B">FATHER vs SON</span>':'')}
document.addEventListener('click',e=>{const b=e.target.closest('[data-pk]');if(!b)return;const d=+b.dataset.d,n=TEAMS.length;
 if(b.dataset.pk==='YOU'){do{selU=(selU+d+n)%n}while(selU===selC)}else{do{selC=(selC+d+n)%n}while(selC===selU)}renderSelect()});

// ---------- TEAMS ----------
function renderTeams(){$('#teamGrid').innerHTML=[...TEAMS].sort((a,b)=>b.ovr-a.ovr).map(t=>`<button class="tcard" data-team="${t.id}" style="--c1:${t.c1};--c2:${t.c2}">
 ${logo(t,46)}<div class="tc-body"><div class="tc-name">${esc(t.school)} <span>${esc(t.name)}</span></div>
 <div class="tc-meta"><b>${t.ovr}</b> OVR · ${uShow(t,'OFF')} OFF · ${uShow(t,'DEF')} DEF ${titleLine(t.id,1)?`<em style="color:#ffcf3d">${titleLine(t.id,1)}</em>`:''} ${t.conf?`<em style="color:#93c5fd">${t.conf}${t.conf==='Midstate Conference'?' · The Gauntlet':''}</em>`:''}${({CARMEL:1,CATH:1,BD:1,WC:1})[t.id]?'<em style="color:#ffcf3d">BIG 4</em>':''}${t.realCount?`<em>${t.realCount} real players</em>`:''}${stadiumFor(t).generic?'<em>stadium TBD</em>':''}${t.colorsTBD?'<em>colors TBD</em>':''}</div></div>
 <div class="sw"><i style="background:${t.c1}"></i><i style="background:${t.c2}"></i><i style="background:${t.c3}"></i></div></button>`).join('')}
document.addEventListener('click',e=>{const b=e.target.closest('[data-team]');if(b){renderTeam(b.dataset.team);show('team')}});
let curTeam=null,curPos='ALL';
const POS_COLS={};for(const p of POS_ORDER)POS_COLS[p]=Object.entries(POS[p].k).sort((a,b)=>b[1]-a[1]).map(x=>x[0]).slice(0,5).concat(['SPR']);
function renderTeam(id){curTeam=TEAMS.find(t=>t.id===id);const t=curTeam;
 $('#teamHead').innerHTML=`${logo(t,40)}<div><div class="th-name">${esc(t.school)} ${esc(t.name)}</div><div class="th-sub">${t.coach?'Coach '+esc(t.coach.replace(/^Coach /,''))+' · ':''}${t.nickname?'"'+esc(t.nickname)+'" · ':''}${t.ovr} OVR · ${t.realCount?t.realCount+' real players + generated depth':'Generated roster'} · ${t.players.length} players</div>${titleLine(t.id).replace('pk-titles','pk-titles th')}</div>
 ${t.id==='MISH'?'<button class="upl" id="editRoster" style="margin-left:auto">Edit Roster</button>':''}<label class="upl" ${t.id==='MISH'?'style="margin-left:6px"':''}>Logo<input type="file" accept="image/*" id="logoIn"></label>`;
 if($('#editRoster'))$('#editRoster').onclick=()=>openBuilder('QB1');
 $('#logoIn').onchange=ev=>{const f=ev.target.files[0];if(!f)return;const fr=new FileReader();fr.onload=()=>{const im=new Image();im.onload=()=>{const c=document.createElement('canvas'),s=256;c.width=c.height=s;const x=c.getContext('2d');const r=Math.min(s/im.width,s/im.height);x.drawImage(im,(s-im.width*r)/2,(s-im.height*r)/2,im.width*r,im.height*r);
  const d=c.toDataURL('image/png');t.logo=d;const li=new Image();li.src=d;logoImgs[t.id]=li;LS.set('gi_logo_'+t.id,d);renderTeam(t.id)};im.src=fr.result};fr.readAsDataURL(f)};
 $('#posTabs').innerHTML=['ALL','DEPTH',...POS_ORDER,'UNIFORMS'].map(p=>`<button class="${p===curPos?'on':''}" data-pos="${p}">${p==='UNIFORMS'?'👕 Uniforms':p==='DEPTH'?'📋 Depth Chart':p}</button>`).join('');if(curPos==='UNIFORMS')renderUniforms();else if(curPos==='DEPTH')$('#roster').innerHTML=depthChartHTML(t);else renderRoster()}
// ---------- DEPTH CHART: starters + backups at every position; in a game it shows the live order (injuries, rotation) ----------
const DC_GROUPS=[['Offense',['QB','RB','WR','TE','OL']],['Defense',['DL','LB','CB','S']],['Special teams',['K','P']]];
function dcStyle(){if(document.getElementById('dcCss'))return;const st=document.createElement('style');st.id='dcCss';st.textContent='.dc-wrap{display:grid;gap:12px}.dc-grp h4{margin:4px 0 6px;font:700 12px Oswald,sans-serif;letter-spacing:.12em;color:#ffcf3d;text-transform:uppercase}.dc-row{display:flex;gap:8px;align-items:flex-start;padding:5px 0;border-top:1px solid rgba(255,255,255,.07)}.dc-pos{width:34px;flex:none;font:700 13px Oswald,sans-serif;color:#93c5fd;padding-top:4px}.dc-list{display:flex;flex-wrap:wrap;gap:5px}.dc{display:inline-flex;gap:5px;align-items:center;padding:3px 8px;border-radius:7px;background:rgba(255,255,255,.05);font-size:12.5px;color:#aeb7c4;cursor:pointer}.dc.st{background:rgba(255,207,61,.13);color:#fff;font-weight:600}.dc b{color:#ffcf3d;font-weight:700}.dc .n{opacity:.6;font-size:11px}.dc.out{text-decoration:line-through;opacity:.55}.dc .tag{font-size:10px;font-weight:700;color:#ff6b6b;letter-spacing:.06em}.dc-key{font-size:11.5px;color:#8b95a3;margin-top:4px}';document.head.appendChild(st)}
function depthChartHTML(t,g,s){dcStyle();const D=g&&typeof dpOf==='function'?dpOf(g,s):null;
 const chip=(p,pos,i,n,out)=>`<span class="dc ${i<n&&!out?'st':''} ${out?'out':''}" data-pl="${p.id}"><span class="n">#${p.numStr||(p.num??'—')}</span>${esc(p.first[0])}. ${esc(p.last)}${p.pos!==pos?'*':''} <b>${ovrAt(p,pos)}</b>${out?' <span class="tag">OUT</span>':''}</span>`;
 return `<div class="dc-wrap">${DC_GROUPS.map(([gn,ps])=>`<div class="dc-grp"><h4>${gn}</h4>${ps.map(pos=>{const d=(t.depth[pos]||[]).filter(Boolean),n=nOn(t,pos),L=D?lineup0(g,s,pos,t,D,d):d,show=L.filter(p=>!(D&&D.out.has(p))).slice(0,Math.max(n+2,pos==='OL'?n+3:n+2)),outs=D?d.filter(p=>D.out.has(p)):[];
  return `<div class="dc-row"><div class="dc-pos">${pos}</div><div class="dc-list">${show.map((p,i)=>chip(p,pos,i,n,false)).join('')}${outs.map(p=>chip(p,pos,99,n,true)).join('')}</div></div>`}).join('')}</div>`).join('')}<div class="dc-key">Highlighted = starters, in order. * = plays another position too. ${D?'Live: injured players are marked OUT and the order reflects tonight\'s rotation.':'Tap a player for full ratings.'}</div></div>`}
function openDepthModal(side){side=side||(U==='a'?'a':'h');const t=T(G,side),o=side==='h'?'a':'h';curTeam=t;
 modal(`<div class="pd" style="max-height:78vh;overflow:auto"><div style="display:flex;gap:8px;align-items:center;margin-bottom:8px">${['a','h'].map(x=>`<button class="${x===side?'st':''}" style="padding:6px 12px;border-radius:8px;${x===side?'background:#ffcf3d;color:#1a1300':''}" data-dcs="${x}">${esc(T(G,x).school)}</button>`).join('')}<button id="dcBack" style="margin-left:auto;padding:6px 12px">Back</button></div><div class="pd-name">${esc(t.school)} ${esc(t.name)} · Depth chart</div>${depthChartHTML(t,G,side)}</div>`);
 document.querySelectorAll('[data-dcs]').forEach(b=>b.onclick=()=>openDepthModal(b.dataset.dcs));$('#dcBack').onclick=()=>openMenu()}
document.addEventListener('click',e=>{const b=e.target.closest('[data-pos]');if(b){curPos=b.dataset.pos;renderTeam(curTeam.id)}});
function renderRoster(){const t=curTeam;let list,cols;
 if(curPos==='ALL'){list=POS_ORDER.flatMap(p=>t.depth[p].filter(q=>q.pos===p));cols=['SPD','STR','AGI','IQ','SPR']}else{list=t.depth[curPos];cols=POS_COLS[curPos]}
 $('#roster').innerHTML=`<table><thead><tr><th>#</th><th class="l">Name</th><th>Pos</th><th>Yr</th><th>Ht/Wt</th><th>OVR</th>${cols.map(c=>`<th title="${ATTR_NAMES[c]}">${c}</th>`).join('')}</tr></thead><tbody>${
 list.map(p=>`<tr data-pl="${p.id}" class="${p.real?'real':''}"><td>${p.numStr||(p.num??'—')}</td><td class="l">${p.photo?`<img class="thumb" src="${p.photo}">`:''}${esc(p.first)} ${esc(p.last)}${p.captain?' <span class="chip">C</span>':''}${p.leader?' <span class="chip l">L</span>':''}${p.star?' <span class="star">★</span>':''}</td><td>${p.label||p.pos}${p.pos!==curPos&&curPos!=='ALL'?'*':''}</td><td>${p.yr}</td><td>${fmtHt(p.ht)} ${p.wt}</td><td class="ovr ${ovrAt(p,curPos==='ALL'?p.pos:curPos)>=90?'hi':ovrAt(p,curPos==='ALL'?p.pos:curPos)<65?'lo':''}">${ovrAt(p,curPos==='ALL'?p.pos:curPos)}</td>${cols.map(c=>`<td class="${p.est&&p.est.includes(c)?'est':''}">${p.a[c]}</td>`).join('')}</tr>`).join('')}</tbody></table><p class="legend">Tap a player for full ratings. <span class="est">Dim italic</span> = my estimate, not your number yet. C = captain · L = team leader</p>`}
document.addEventListener('click',e=>{const r=e.target.closest('[data-pl]');if(!r||!curTeam)return;const p=curTeam.players.find(x=>x.id===r.dataset.pl);
 const grp=(t,ks)=>`<div class="pg"><h4>${t}</h4>${ks.map(k=>`<div class="pr ${p.est.includes(k)?'est':''}"><span>${ATTR_NAMES[k]}</span><b>${p.a[k]}</b></div>`).join('')}</div>`;
 modal(`<div class="pd"><div class="pd-head">${p.photo?`<img src="${p.photo}" class="ph">`:`<div class="ph none" style="background:${curTeam.c1};color:${curTeam.c2}">${p.numStr||(p.num??'—')}</div>`}<div><div class="pd-name">${esc(p.first)} ${esc(p.last)}</div><div class="pd-sub">#${p.numStr||(p.num??'—')} · ${p.label||p.pos} · ${fmtHt(p.ht)} ${p.wt} lbs · ${p.yr}${p.captain?' · Captain':''}</div>${p.bio?`<div class="pd-sub" style="margin-top:3px;font-style:italic">${esc(p.bio)}</div>`:''}<div class="pd-ovr">${p.ovr} <small>OVR</small>${p.ovr2?` · ${p.ovr2} <small>${p.pos2}</small>`:''}</div></div></div>
 ${(()=>{const r=typeof SEASON!=='undefined'&&SEASON&&SEASON.stats&&SEASON.stats.p[p.id];if(!r)return'';const parts=[];
  if(r.att)parts.push(`${r.cmp||0}/${r.att} · ${r.py||0} pass yds · ${r.ptd||0} TD · ${r.int||0} INT`);if(r.car)parts.push(`${r.car} car · ${r.ry||0} rush yds · ${r.rtd||0} TD`);
  if(r.rec)parts.push(`${r.rec} rec · ${r.recy||0} yds · ${r.rectd||0} TD`);if(r.tkl||r.sk||r.dint)parts.push(`${r.tkl||0} tkl · ${r.sk||0} sacks · ${r.dint||0} INT`);
  if(r.fga||r.xpa)parts.push(`FG ${r.fgm||0}/${r.fga||0} · XP ${r.xpm||0}/${r.xpa||0}`);
  return`<div class="pd-sub" style="margin:6px 0;color:#ffcf3d">${seasonYear(SEASON.num)} season (${r.gp} G): ${parts.join(' &nbsp;|&nbsp; ')}</div>`})()}
 <div class="pgs">${grp('Core',['STR','SPD','AGI','POW','TRK','IQ'])}${grp('Conditioning',['STA','END','SPR'])}${grp('Skills',['THP','THA','CTH','CAR','BLK','PRS','TAK','COV','KPW','KAC'])}</div>
 <div class="btns"><button onclick="closeModal()">Close</button></div></div>`)});

// ---------- GAME ----------
let AUTO=false,SPEED=1;let G=null,U='h',busy=false,lastRes=null,cv,ctx,dpr=1;
window.addEventListener('error',e=>{try{const m=(e.message||'error')+(e.lineno?' @'+e.lineno:'');if(typeof bToast==='function')bToast('⚠ '+m.slice(0,160))}catch(_){}});
window.addEventListener('unhandledrejection',e=>{try{if(typeof bToast==='function')bToast('⚠ '+String(e.reason&&e.reason.message||e.reason).slice(0,160))}catch(_){}});
function startGame(live){AUTO=!!live;if(pendingRebuild){pendingRebuild=false;buildAll()}if(typeof syncRoster==='function')syncRoster();const me=TEAMS[selU],cpu=TEAMS[selC];U=userHome?'h':'a';G=userHome?newGame(me,cpu):newGame(cpu,me);G.venue=venueTeam();setWeather(G,venueSel==='LUCAS'?rollWeather(0,true):wxSel?rollWeather(wxSel.includes('snow')?3:1,false,wxSel):rollWeather(ri(0,4),false));G.trash=trashTalk(G);lastRes=null;show('game');if(typeof annIntro==='function')annIntro(G);$('#playText').textContent=G.log[0];renderGame();cutscene('intro',G.h,()=>{if(AUTO)autoStep()})}
$('#kick').onclick=()=>startGame(false);$('#watch').onclick=()=>startGame(true);$('#haBtn').onclick=()=>{userHome=!userHome;renderSelect()};

function resize(){cv=$('#field');if(!cv)return;dpr=window.devicePixelRatio||1;const r=cv.parentElement.getBoundingClientRect();cv.width=r.width*dpr;cv.height=r.height*dpr;cv.style.width=r.width+'px';cv.style.height=r.height+'px';ctx=cv.getContext('2d');if(G&&!busy)drawState()}
window.addEventListener('resize',()=>setTimeout(resize,60));
const ord=n=>['','1st','2nd','3rd','4th'][n]||n+'th';
const clk=s=>Math.floor(s/60)+':'+String(Math.floor(s%60)).padStart(2,'0');
function spotText(g){if(g.ball===50)return'50';const o=T(g,g.poss),d=T(g,opp(g.poss));return g.ball<50?o.abbr+' '+g.ball:d.abbr+' '+(100-g.ball)}
function renderBug(){const g=G;const side=s=>{const t=T(g,s);return`<div class="bs ${g.poss===s&&!g.over?'poss':''}" style="--c1:${t.c1};--c2:${t.c2}">${logo(t,26)}<span class="ab">${t.abbr}</span><span class="sc">${g.score[s]}</span>${g.lodOn&&g.lodOn[s]?'<span class="lod">LOD 🔥</span>':''}</div>`};
 const r=rivalry(g.h.id,g.a.id);
 $('#bug').innerHTML=`<button id="menuBtn" class="mb">☰</button><button id="b3d" class="mb b3d ${V3.on?'on':''}">3D</button>${typeof annToggleVoice==='function'?`<button id="bAnn" class="mb b3d ${ANN_VOICE?'on':''}" title="Announcers">🎙</button><button id="bCC" class="mb b3d ${ANN_TEXT?'on':''}" title="Announcer captions">CC</button>`:''}${side('a')}${side('h')}<div class="bq">${g.over?'FINAL':g.ot?'OT':ord(g.q)+' · '+clk(g.clock)}</div>
 <div class="bd">${g.over?'':g.phase==='kickoff'?'KICKOFF · '+T(g,g.kicker).abbr+' kicking':g.phase==='pat'?'TRY · '+T(g,g.poss).abbr+' PAT or 2':ord(g.down)+' & '+(g.ball+g.togo>=100?'Goal':g.togo)+' · '+spotText(g)}</div>${r?`<div class="brv">${r}</div>`:''}${g.wx&&g.wx.k!=='clear'?`<div class="bwx">${g.wx.k==='dome'?'🏟':g.wx.k.includes('snow')?'❄️':'🌧'} ${esc(wxLabel(g.wx))}</div>`:''}`;
 $('#menuBtn').onclick=openMenu;$('#b3d').onclick=v3Toggle;if($('#bAnn')){$('#bAnn').onclick=annToggleVoice;$('#bCC').onclick=annToggleText}if(V3.ready)v3Refresh()}
function renderCalls(){const g=G,el=$('#calls');if(g.over){el.innerHTML='';return}
 if(AUTO){el.innerHTML=`<div class="role">LIVE SIM</div>${[1,2,4].map(s=>`<button class="call ${SPEED===s?'st':''}" data-speed="${s}">${s}×</button>`).join('')}<button class="call" id="liveQ">Sim Quarter</button>${U==='none'?'':'<button class="call def" id="takeCtl">Take Control</button>'}`;
  el.querySelectorAll('[data-speed]').forEach(b=>b.onclick=()=>{SPEED=+b.dataset.speed;renderCalls()});$('#liveQ').onclick=()=>simQ();if($('#takeCtl'))$('#takeCtl').onclick=()=>{AUTO=false;renderCalls()};return}
 if(g.phase==='pat'){const mine=g.poss===U;el.innerHTML='<div class="role">'+(mine?'TRY':'DEFENSE')+'</div>'+(mine?`<button class="call st" data-call="XP">Kick Extra Point</button><button class="call" data-call="TWO">Go for 2</button>`:`<button class="call def" data-call="DEFPAT">Defend the Try</button>`);return}
 if(g.phase==='kickoff'){const mine=g.kicker===U;el.innerHTML='<div class="role">'+(mine?'KICKOFF':'RECEIVE')+'</div>'+(mine?`<button class="call st" data-call="KO">Kick Off</button><button class="call" data-call="ONSIDE">Onside Kick</button>`:`<button class="call" data-call="RET">Return It</button><button class="call st" data-call="TB">Fair Catch / Touchback</button>`);return}
 const userOff=g.poss===U;let html='<div class="role">'+(userOff?'OFFENSE':'DEFENSE')+'</div>';
 if(userOff){let calls=T(g,U).option?['TO','IR','OR','QR','QP','MP','PA']:['IR','OR','QR','QP','MP','DP','PA'];if(T(g,U).jet)calls.splice(calls.indexOf('OR')+1,0,'JS');if(g.down===4){calls=calls.concat(g.ot?[]:['PUNT']);const K=st(T(g,U),'K');if(117-g.ball<=fgMax(K)+6)calls.push('FG')}
  html+=calls.map(c=>`<button class="call ${c==='PUNT'||c==='FG'?'st':''}" data-call="${c}">${OFF_CALLS[c]}</button>`).join('');if(typeof liveToggle==='function')html+=`<button class="call livetg${LIVE_ON?' on':''}" onclick="liveToggle()">🎮 Live ${LIVE_ON?'ON':'OFF'}</button>`}
 else html+=Object.keys(DEF_CALLS).map(c=>`<button class="call def" data-call="${c}">${DEF_CALLS[c]}</button>`).join('');
 el.innerHTML=html}
document.addEventListener('click',e=>{const b=e.target.closest('[data-call]');if(!b||busy||!G||G.over)return;const c=b.dataset.call;
 let oc,dc;if(G.phase==='pat'){oc=G.poss===U?c:cpuPat(G);dc=null}else if(G.phase==='kickoff'){if(G.kicker===U){oc=c;dc='RET'}else{oc=cpuKick(G);dc=c}}else{const userOff=G.poss===U;oc=userOff?c:cpuOff(G);dc=userOff?cpuDef(G):c;if(userOff&&typeof canLive==='function'&&canLive(oc)){liveStart(oc,dc);return}}play(oc,dc)});
function play(oc,dc,noAnim){busy=true;const before={los:absBall(G),dir:dirOf(G),poss:G.poss,ballFrom:G.ball,togo:G.togo};const phase0=G.phase;const res=stepGame(G,oc,dc);before.phase=phase0;G.log.unshift(res.text);lastRes=res;
 document.querySelectorAll('[data-call]').forEach(b=>b.disabled=true);
 const callTxt=`<span class="ct">${T(G,res.poss).abbr} ${OFF_CALLS[oc]}${DEF_CALLS[dc]?' vs '+DEF_CALLS[dc]:ST_DEF[dc]?' · '+ST_DEF[dc]:''}</span>`;
 if(G._keyed&&!G._keyNote){G._keyNote=1;try{const O=T(G,res.poss),D=T(G,opp(res.poss)),q=O.depth.QB[0];bToast(D.abbr+' defense is keying on '+(q.nick||q.last)+' — extra coverage and pressure. Make them pay with the run.')}catch(e){}}
 (noAnim?()=>0:v3PlayStart)();(noAnim?(r,b,cb)=>cb():animate)(res,before,()=>{v3PlayEnd(res);$('#playText').innerHTML=callTxt+esc(res.text);renderGame();if(typeof annPlay==='function')annPlay(res);
  const fin=()=>{busy=false;if(G.finalShown)return;if(G.over)cutscene('final',G.h,showFinal);else if(pendingQ)simQ();else if(AUTO)setTimeout(autoStep,(V3.on?1100/V3.speed:650)/SPEED)};
  const half=()=>res.halftime?cutscene('half',G.h,fin):fin();
  if(res.banner==='TOUCHDOWN')cutscene('td',T(G,res.scored),half,res.carrier&&res.carrier.team===T(G,res.scored).id?res.carrier:null);else{if(res.banner)flash(res.banner);half()}})}
function flash(t){const b=$('#banner');b.textContent=t;b.className='show '+(t==='TOUCHDOWN'||t==='FIELD GOAL'?'gold':t==='FIRST DOWN'?'blue':'red');clearTimeout(flash.t);flash.t=setTimeout(()=>b.className='',1300)}
function renderGame(){renderBug();renderCalls();drawState()}

// ---- field drawing ----
function geo(){const W=cv.width/dpr,H=cv.height/dpr,s=Math.min(W/127,H/59.5);return{W,H,s,ox:(W-120*s)/2,oy:(H-53.33*s)/2}}
let GE;const X=a=>GE.ox+(a+10)*GE.s,Y=y=>GE.oy+y*GE.s;
function drawField(los,dir,fd){if(V3.on)v3CapField(los,dir,fd);const g=G,c=ctx;c.setTransform(dpr,0,0,dpr,0,0);GE=geo();const {W,H,s}=GE;drawTopField(c,W,H,g.venue||g.h,X,Y,s);
 if(0){
 c.fillStyle='#0f3d1f';c.fillRect(0,0,W,H);
 for(let i=0;i<20;i++){c.fillStyle=i%2?'#2f7d3a':'#2a7335';c.fillRect(X(i*5),Y(0),5*s+.5,53.33*s)}
 const ez=(x0,t)=>{c.fillStyle=t.c1;c.fillRect(X(x0),Y(0),10*s,53.33*s);c.save();c.translate(X(x0+5),Y(26.66));c.rotate(x0<0?-Math.PI/2:Math.PI/2);
  c.fillStyle=t.c2;c.font=`700 ${s*5.2}px Oswald,sans-serif`;c.textAlign='center';c.textBaseline='middle';c.fillText(t.name.toUpperCase(),0,0);c.restore()};
 ez(-10,g.h);ez(100,g.a);
 c.strokeStyle='rgba(255,255,255,.85)';for(let y=0;y<=100;y+=5){c.lineWidth=y%50===0||y===0||y===100?2:1;c.beginPath();c.moveTo(X(y),Y(0));c.lineTo(X(y),Y(53.33));c.stroke()}
 c.lineWidth=1;c.strokeStyle='rgba(255,255,255,.6)';for(let y=1;y<100;y++){if(y%5===0)continue;for(const hy of[.6,22.9,29.9,52.1]){c.beginPath();c.moveTo(X(y),Y(hy));c.lineTo(X(y),Y(hy+.9));c.stroke()}}
 c.strokeStyle='#fff';c.lineWidth=2;c.strokeRect(X(-10),Y(0),120*s,53.33*s);
 c.fillStyle='rgba(255,255,255,.9)';c.font=`600 ${s*2.6}px Oswald,sans-serif`;c.textAlign='center';c.textBaseline='middle';
 for(let y=10;y<100;y+=10){const n=y<=50?y:100-y;c.fillText(n,X(y),Y(9));c.save();c.translate(X(y),Y(44.3));c.rotate(Math.PI);c.fillText(n,0,0);c.restore()}
 const li=logoImgs[g.h.id];if(li&&li.complete){const sz=s*11;c.globalAlpha=.55;c.drawImage(li,X(50)-sz/2,Y(26.66)-sz/2,sz,sz);c.globalAlpha=1}
 else{c.fillStyle='rgba(255,255,255,.18)';c.font=`700 ${s*6}px Oswald,sans-serif`;c.fillText(g.h.abbr,X(50),Y(26.66))}}
 if(los!=null){c.lineWidth=2.5;c.strokeStyle='#39a0ff';c.beginPath();c.moveTo(X(los),Y(0));c.lineTo(X(los),Y(53.33));c.stroke();
  if(fd!=null&&fd>0&&fd<100){c.strokeStyle='#ffd400';c.beginPath();c.moveTo(X(fd),Y(0));c.lineTo(X(fd),Y(53.33));c.stroke()}}}
const OFF_F=[[.5,-4],[.5,-2],[.5,0],[.5,2],[.5,4],[.7,6.2],[.7,-20],[.7,19],[1.5,-12],[5,0],[6.5,1.8]];
const DEF_F=[[1.1,-5],[1.1,-1.7],[1.1,1.7],[1.1,5],[5,-6],[5,0],[5,6],[6,-20],[6,19],[13,-8],[13,8]];
const DEF_34=[[1.1,-4],[1.1,0],[1.1,4],[3.5,-8],[5,-2.5],[5,2.5],[3.5,8],[6,-20],[6,19],[13,-8],[13,8]];
function formation(los,dir,dt){const cy=26.66,D=dt&&dt.front==='34'?DEF_34:DEF_F;return{o:OFF_F.map(([b,y])=>({x:los-dir*b,y:cy+y})),d:D.map(([b,y])=>({x:los+dir*b,y:cy+y}))}}
function hexRGB(h){const n=parseInt(h.slice(1),16);return[n>>16&255,n>>8&255,n&255]}
function colorDist(a,b){const x=hexRGB(a),y=hexRGB(b);return Math.hypot(x[0]-y[0],x[1]-y[1],x[2]-y[2])}
// Away team wears white when its primary color clashes with the home team's.
// Which jersey a team wears this game. Postseason championship games: everyone in home colors, except Mishawaka, who wear white.
// If the two jerseys would look alike, the visiting team switches to white.
function kitSide(t,g=G){const k=g&&g.season&&g.season.kind;if(!(k==='div'||k==='semi'||k==='final'))return g&&t===g.a?'away':'home';
 const PO=x=>UNIFORMS[x.id]&&UNIFORMS[x.id].playoff;if(PO(t)){const o2=t===g.h?g.a:g.h;if(!PO(o2)&&t===g.a&&colorDist(uniformOf(t,'playoff').jersey,uniformOf(o2,'home').jersey)<125)return 'away';return 'playoff'} // special playoff uniforms (road team changes if it clashes with the home colors)
 const o=t===g.h?g.a:g.h,oj=uniformOf(o,PO(o)?'playoff':'home').jersey;
 if(t===g.a&&colorDist(uniformOf(t,'home').jersey,oj)<125)return 'away';return 'home'}
// ---- TRASH TALK: the rest of the league thinks the Northern is a two-team conference ----
const TRASH=[(o,n,r)=>`${o}: "They play Washington and Clay every week. We play ${r}."`,(o,n)=>`${o} locker room: "The Northern Conference is a two-team league."`,
 (o,n)=>`Overheard at ${o}: "${n}'s record? Built on Riley and Adams."`,(o,n)=>`${o}: "Let's see how tough ${n} is when they see a real line."`,
 (o,n)=>`${o} student section: "Up north 7-0 is a schedule. Down here it's a warm-up."`,(o,n)=>`${o}: "${n}? Nice story. Stories end Friday."`];
function trashTalk(g){const NC=['PENN','MISH','SJ','MARIAN','ADAMS','RILEY','WASH','CLAY'],h=NC.includes(g.h.id),a=NC.includes(g.a.id);if(h===a)return null;
 const k=g.season&&g.season.kind;if(g.season&&!(k==='div'||k==='semi'||k==='final'||k==='scrim'))return null;const n=h?g.h:g.a,o=h?g.a:g.h;
 const conf=typeof confOf==='function'?confOf(o.id):null,mates=conf?(LEAGUE.confs.find(c=>c.id===conf)||{teams:[]}).teams.filter(id=>id!==o.id).map(id=>TEAMS.find(t=>t.id===id)).filter(Boolean).sort((x,y)=>(y.ovr+(y.elite||0))-(x.ovr+(x.elite||0))).slice(0,2).map(t=>t.school).join(' and '):'real teams';
 const i=Math.floor(Math.random()*TRASH.length);return{q:TRASH[i](o.school,n.school,mates||'real teams'),north:n.id,other:o.id}}
function uni(t){const x=uniformOf(t,kitSide(t));if(colorDist(x.jersey,'#2a7f35')<75)return{f:x.jersey,s:'#FFFFFF',thick:true};return{f:x.jersey,s:x.jersey.toUpperCase()==='#FFFFFF'?x.num:x.trim}}
function dot(p,t,r,hl){const c=ctx,u=uni(t);c.beginPath();c.arc(X(p.x),Y(p.y),r,0,7);c.fillStyle=u.f;c.fill();c.lineWidth=Math.max(1.2,r*(u.thick?.55:.35));c.strokeStyle=hl?'#ffd400':u.s;c.stroke()}
function ball(p,h=0){if(V3.on)v3CapBall(p,h);const c=ctx,s=GE.s,x=X(p.x),y=Y(p.y)-h*s*.5;if(h>0){c.fillStyle='rgba(0,0,0,.3)';c.beginPath();c.ellipse(X(p.x),Y(p.y),s*.5,s*.25,0,0,7);c.fill()}
 c.fillStyle='#8a4b1f';c.strokeStyle='#fff';c.lineWidth=1;c.beginPath();c.ellipse(x,y,s*(.55+h*.03),s*(.33+h*.02),0,0,7);c.fill();c.stroke()}
function drawPlayers(F,oT,dT,hlO=-1,hlD=-1){if(V3.on)v3Cap(F,oT,dT,hlO,hlD);const r=Math.max(3,GE.s*.95);F.d.forEach((p,i)=>dot(p,dT,r,i===hlD));F.o.forEach((p,i)=>dot(p,oT,r,i===hlO));drawWx()}
// rain or snow falling over the 2D field
function drawWx(){const g=G;if(!g||!g.wx||!ctx||V3.on)return;const k=g.wx.k;if(k==='clear'||k==='dome')return;const c=ctx,W=cv.width/dpr,H=cv.height/dpr,t=performance.now()/1000,snow=k==='snow'||k==='hsnow',heavy=k[0]==='h',n=snow?(heavy?170:90):(heavy?200:110);
 c.save();c.setTransform(dpr,0,0,dpr,0,0);c.fillStyle=snow?(heavy?'rgba(255,255,255,.16)':'rgba(255,255,255,.09)'):(heavy?'rgba(8,16,34,.24)':'rgba(8,16,34,.14)');c.fillRect(0,0,W,H);
 for(let i=0;i<n;i++){const fx=(i*.6180339)%1,fy=(i*.7548776)%1;
  if(snow){const x=((fx*W+Math.sin(t*.9+i)*10+t*10)%W+W)%W,y=(fy*H+t*(22+(i%5)*7))%H;c.fillStyle='rgba(255,255,255,.85)';c.beginPath();c.arc(x,y,1+(i%3)*.7,0,7);c.fill()}
  else{const x=(fx*W+t*45)%W,y=(fy*H+t*(300+(i%4)*45))%H;c.strokeStyle='rgba(185,205,235,.5)';c.lineWidth=1;c.beginPath();c.moveTo(x,y);c.lineTo(x-2.5,y+11);c.stroke()}}
 c.restore()}
function drawState(){if(!ctx||!G)return;const g=G,los=absBall(g),dir=dirOf(g);drawField(los,dir,g.ball+g.togo<100?los+dir*g.togo:null);
 if(g.over)return;if(g.phase==='kickoff'){const F=kickForm(los,dir,null);drawPlayers(F,T(g,g.poss),T(g,opp(g.poss)));ball({x:los,y:26.66});return}
 const F=formation(los,dir,T(g,opp(g.poss)));drawPlayers(F,T(g,g.poss),T(g,opp(g.poss)));ball({x:los-dir*.9,y:26.66})}
function kickForm(los,dir,land){const o=[],d=[];for(let i=0;i<11;i++){const y=4+i*4.53;o.push({x:los-dir*(i===5?6:1),y:i===5?26.66:y})}
 const L=land??(los+dir*62);d.push({x:L,y:26.66});for(let i=0;i<5;i++)d.push({x:los+dir*12,y:8+i*9.2});for(let i=0;i<4;i++)d.push({x:los+dir*28,y:12+i*9.5});d.push({x:L-dir*6,y:20});return{o,d}}
const lerp=(a,b,t)=>a+(b-a)*t,ease=t=>t<.5?2*t*t:1-Math.pow(-2*t+2,2)/2,L2=(a,b,t)=>({x:lerp(a.x,b.x,t),y:lerp(a.y,b.y,t)});
function animate(res,bf,done){const los=bf.los,dir=bf.dir,oT=T(G,bf.poss),dT=T(G,opp(bf.poss)),F0=formation(los,dir,T(G,opp(bf.poss))),fd=bf.ballFrom+bf.togo<100?los+dir*bf.togo:null;
 const k=res.kind;if(k==='none'){done();return}
 if(k==='kickoff'){const land=clamp(res.land,-9,109),end=clamp(res.end??land,-9,109),F0k=kickForm(los,dir,land),D=(res.noRet?1500:2300)/(AUTO?SPEED:1)*(V3.on?(AUTO?1.3:1.7)/V3.speed:1),t0k=performance.now(),dr=(Math.random()-.5)*16;
  function stepK(now){const t=Math.min(1,(now-t0k)/D);drawField(null,dir,null);const kt=res.noRet?1:.5,F={o:[],d:[]};
   const retPos=t<kt?F0k.d[0]:{x:lerp(land,end,ease((t-kt)/(1-kt))),y:26.66+Math.sin((t-kt)/(1-kt)*Math.PI)*dr};
   F0k.o.forEach((p,i)=>{const target=t<kt?{x:p.x+dir*ease(t/kt)*35,y:p.y}:L2({x:p.x+dir*35,y:p.y},retPos,ease((t-kt)/(1-kt))*.85);F.o.push(target)});
   F0k.d.forEach((p,i)=>{if(i===0){F.d.push(retPos);return}F.d.push(t<kt?{x:p.x-dir*ease(t/kt)*6,y:p.y}:{x:lerp(p.x-dir*6,retPos.x+dir*3,ease((t-kt)/(1-kt))*.6),y:p.y})});
   drawPlayers(F,oT,dT,-1,0);if(t<kt){const u=ease(t/kt);ball({x:lerp(los,land,u),y:26.66},Math.sin(u*Math.PI)*(res.onside?3:22))}else ball(retPos);
   if(t<1)requestAnimationFrame(stepK);else setTimeout(done,V3.on?(AUTO?500:700)/V3.speed:250)}requestAnimationFrame(stepK);return}
 const endX=clamp(res.end??los,-9,109),dur=(k==='kick'||k==='fg'||k==='xp'?1300:k==='inc'?1300:1700)/(AUTO?SPEED:1)*(V3.on?(AUTO?1.3:1.7)/V3.speed:1),t0=performance.now();
 const yDrift=(Math.random()-.5)*14,cy=26.66;
 const qr=!!res.qr,jet=!!res.jet&&(k==='run'||k==='fumble'),role=res.role??10,runI=jet?role:10,carrier0=k==='run'&&qr?F0.o[9]:k==='run'||k==='fumble'?F0.o[runI]:k==='sack'?F0.o[9]:F0.o[role];
 const catchP={x:res.catchX??los,y:clamp(carrier0.y+(Math.random()-.5)*6,3,50)};
 const qbDrop={x:los-dir*7,y:cy};
 function carrier(t){if(k==='run'&&qr){const u=ease(t);return{x:lerp(carrier0.x,endX,u),y:cy+Math.sin(u*Math.PI)*yDrift}}
  if(jet){const mesh={x:los-dir*1.5,y:cy+(carrier0.y>cy?-1:1)},edge={x:los+dir*2,y:carrier0.y>cy?cy-17:cy+17};if(t<.22)return L2(carrier0,mesh,t/.22);if(t<.45)return L2(mesh,edge,(t-.22)/.23);const u=ease((t-.45)/.55);return{x:lerp(edge.x,endX,u),y:lerp(edge.y,clamp(edge.y+yDrift*.5,3,50),u)}}
  if(k==='run'||k==='fumble'){if(t<.15)return L2(carrier0,{x:los-dir*4,y:cy+.5},t/.15);const u=ease((t-.15)/.85);return{x:lerp(los-dir*4,endX,u),y:cy+.5+Math.sin(u*Math.PI)*yDrift*.6+u*yDrift*.4}}
  if(k==='sack'){return L2(carrier0,{x:endX,y:cy},ease(t))}
  if(k==='pass'||k==='inc'||k==='int'){if(t<.6)return L2(carrier0,catchP,ease(t/.6));if(k==='inc')return catchP;if(k==='int')return catchP;const u=ease((t-.6)/.4);return{x:lerp(catchP.x,endX,u),y:lerp(catchP.y,clamp(catchP.y+yDrift*.4,3,50),u)}}
  return carrier0}
 function step(now){let t=Math.min(1,(now-t0)/dur);drawField(los,dir,fd);
  if(k==='kick'||k==='fg'||k==='xp'){drawPlayers(F0,oT,dT);const u=ease(t),h=Math.sin(u*Math.PI)*18;ball({x:lerp(los-dir*(k==='kick'?12:7),endX,u),y:cy},h)}
  else{const C=carrier(t),F={o:[],d:[]};const isPass=k==='pass'||k==='inc'||k==='int';
   let target=C;if(k==='int')target=t<.6?catchP:{x:lerp(catchP.x,endX,ease((t-.6)/.4)),y:catchP.y};
   choreo(F,F0,t,{k,qr,isPass,role,runI,C,dir,los,cy,qbDrop,catchP,target,oc:res.oc,dc:res.dc,gain:res.gain||0,endX});
   if(k==='int'&&t>=.6)F.d[7]={x:target.x,y:target.y};
   const hl=k==='sack'||qr?9:k==='run'||k==='fumble'?runI:isPass?role:-1;drawPlayers(F,oT,dT,hl,k==='int'?7:-1);
   if(isPass&&t>=.25&&t<.6){const u=(t-.25)/.35,qb=F.o[9];ball(L2(qb,catchP,u),Math.sin(u*Math.PI)*(res.oc==='DP'?14:6))}
   else if(isPass&&t<.25)ball(F.o[9]);else if(k==='inc'&&t>=.6){ball({x:catchP.x+dir*(t-.6)*6,y:catchP.y+1.5})}
   else if(k==='int'&&t>=.6)ball(target);else ball(F.o[hl>=0?hl:10]||C)}
  if(t<1)requestAnimationFrame(step);else setTimeout(done,V3.on?(AUTO?500:700)/V3.speed:250)}
 requestAnimationFrame(step)}


// ---- play choreography: what the other 20 players do on every snap (drives both the 2D view and the 3D players) ----
// Linemen fire out and engage, receivers run their real routes, corners and safeties mirror them, linebackers read
// then flow (or drop into zones on passes), and the defense pursues the ball carrier with angles before gang-tackling.
function routePos(p,pts,f){if(!pts||!pts.length)return{x:p.x,y:p.y};let tot=0,prev=p;const seg=[];for(const q of pts){const d=Math.hypot(q.x-prev.x,q.y-prev.y);seg.push([prev,q,d]);tot+=d;prev=q}
 let want=tot*clamp(f,0,1);for(const [a,b,d] of seg){if(want<=d)return L2(a,b,d?want/d:1);want-=d}return{x:prev.x,y:prev.y}}
function choreo(F,F0,t,P){const {k,qr,isPass,role,runI,C,dir,los,cy,qbDrop,catchP,target}=P,run=k==='run'||k==='fumble',sack=k==='sack';
 const call=isPass||sack?(['QP','MP','DP','PA'].includes(P.oc)?P.oc:'MP'):null,R=(typeof ROUTES!=='undefined'&&call)?ROUTES[call]:null;
 const routeOf=i=>{const o=F0.o[i],rt=R&&R[i];if(!rt)return null;const sg=Math.sign(o.y-cy)||1;return rt.map(([f,l])=>({x:o.x+dir*f,y:clamp(o.y+sg*l,1.5,51.8)}))};
 const rf=Math.min(1,t/.62); // route progress until the ball arrives
 // ---- offense ----
 F0.o.forEach((p,i)=>{
  if(run&&qr&&i===9||run&&!qr&&i===runI||sack&&i===9||isPass&&i===role){F.o.push(C);return}
  if(i<5){ // offensive line: drive block on runs, pass set on passes
   if(isPass||sack){const u=ease(Math.min(1,t/.25));F.o.push({x:p.x-dir*1.3*u,y:p.y+(p.y-cy)*.08*u});return}
   const push=clamp(1+P.gain*.12,.4,2.6);F.o.push({x:p.x+dir*push*ease(Math.min(1,t/.55)),y:p.y+(i-2)*.15*ease(t)});return}
  if(i===9){ // QB
   if(isPass||sack){F.o.push(L2(p,qbDrop,ease(Math.min(1,t/.3))));return}
   const hand={x:los-dir*4.5,y:cy+.4},boot={x:los-dir*5,y:cy-(C.y>cy?7:-7)};F.o.push(t<.18?L2(p,hand,t/.18):L2(hand,boot,ease((t-.18)/.82)));return}
  if(isPass||sack){const rt=routeOf(i);if(rt){F.o.push(routePos(p,rt,rf*(i===5||i===10?.85:1)));return}
   F.o.push(L2(p,{x:qbDrop.x+dir*1.2,y:cy+(i===10?2.2:-2.2)},ease(Math.min(1,t/.3))));return} // backs stay in to block
  // runs: receivers stalk-block the corners, the tight end and the off back lead the way
  if(i>=6&&i<=8){const u=ease(Math.min(1,t/.5));F.o.push({x:p.x+dir*5*u,y:p.y+(cy-p.y)*.08*u});return}
  F.o.push(L2(p,{x:C.x+dir*1.6,y:C.y+(i===5?1.6:-1.6)},ease(t)*.8))});
 // ---- defense ----
 const blitz=P.dc==='BLITZ',cov={7:6,8:7,9:8,10:null,4:10,5:5,6:5};
 F0.d.forEach((p,i)=>{const off=(i%3-1)*1.3,pile={x:target.x+dir*.8,y:target.y+off};
  if(run){ // shed, read, pursue with an angle, then pile on
   const hold=i<4?.42:i<7?.18:.28,u=clamp((t-hold)/(1-hold),0,1),lead={x:C.x+dir*(1-t)*2.5,y:C.y};
   const base=i<4?{x:F0.o[Math.min(4,i+(i>1?1:0))].x+dir*.9,y:p.y}:p;const pos=t<hold?L2(p,base,t/hold):L2(base,u>.8?pile:lead,ease(u)*.95);F.d.push(pos);return}
  if(i<4||blitz&&(i===4||i===6)){ // pass rush: engage, then squeeze the pocket (and get home on a sack)
   const qb=F.o[9],eng={x:los+dir*.2,y:p.y},u=clamp((t-.2)/.8,0,1);F.d.push(t<.2?L2(p,eng,t/.2):L2(eng,{x:qb.x+dir*.9,y:qb.y+off*.6},ease(u)*(sack?1:.62)));return}
  // coverage: mirror the assigned receiver, zone players drop, everyone breaks on the ball after the throw
  let pos;const ri=cov[i];if(ri!=null&&F.o[ri]){const r=F.o[ri];pos={x:lerp(p.x,r.x+dir*1.1,Math.min(1,t*1.6)),y:lerp(p.y,r.y,Math.min(1,t*1.4))}}
  else pos={x:p.x+dir*(i>=9?6:4)*ease(Math.min(1,t/.5)),y:p.y};
  if(t>.6&&k!=='inc'){const u=ease((t-.6)/.4);pos=L2(pos,pile,u*.92)}else if(t>.55&&k==='inc'&&(ri===role||i>=9)){pos=L2(pos,catchP,ease((t-.55)/.45)*.9)}
  F.d.push(pos)})}

// ---- menus ----
function modal(html){const m=$('#modal');m.innerHTML=`<div class="card">${html}</div>`;m.classList.remove('hidden')}
function closeModal(){$('#modal').classList.add('hidden')}
function autoStep(){if(!AUTO||busy||!G||G.over||!document.querySelector('#game.active')||!$('#modal').classList.contains('hidden')||$('#cut').style.display==='block')return;play(...cpuCalls(G))}
let pendingQ=false;
function simQ(){if(!G||G.over)return;if(busy){pendingQ=true;bToast('Simming quarter after this play…');return}pendingQ=false;const q=G.q,wasHalf=q===2;simQuarter(G);$('#playText').innerHTML='<span class="ct">QUARTER SIMMED</span>'+esc(G.log[0]);renderGame();
 if(G.over){cutscene('final',G.h,showFinal);return}bToast((q>4?'OT':'End of Q'+q)+' · '+G.a.abbr+' '+G.score.a+' – '+G.score.h+' '+G.h.abbr);if(wasHalf)cutscene('half',G.h,()=>{if(AUTO)autoStep()});else if(AUTO)setTimeout(autoStep,400)}
function openMenu(){modal(`<h3>Paused</h3><div class="btns"><button id="mRes">Resume</button><button id="mQ">Sim Quarter</button><button id="mLive">${AUTO?'Take Control':'Watch Live'}</button><button id="mDepth">📋 Depth Charts</button><button id="mSim">Sim to End</button><button id="mQuit">Quit Game</button></div>`);
 $('#mDepth').onclick=()=>openDepthModal();$('#mQ').onclick=()=>{closeModal();simQ()};$('#mLive').onclick=()=>{closeModal();AUTO=!AUTO;renderCalls();if(AUTO)autoStep()};
 $('#mRes').onclick=()=>{closeModal();if(AUTO)autoStep()};$('#mSim').onclick=()=>{closeModal();AUTO=false;simToEnd(G);renderGame();showFinal()};$('#mQuit').onclick=()=>{closeModal();if(typeof SUPER!=='undefined')superStop();if(G&&G.season)resumeSeason();else show('home')}}
function leaders(g,side){const t=T(g,side),L=Object.values(g.ps).filter(s=>s.p.team===t.id);const top=(f)=>L.filter(s=>s[f]>0).sort((a,b)=>b[f]-a[f])[0];
 const p=top('py'),r=top('ry'),w=top('recy');return[p&&`${nm(p.p)} ${p.cmp}/${p.att}, ${p.py} yds, ${p.ptd} TD${p.int?', '+p.int+' INT':''}`,r&&`${nm(r.p)} ${r.car} car, ${r.ry} yds${r.rtd?', '+r.rtd+' TD':''}`,w&&`${nm(w.p)} ${w.rec} rec, ${w.recy} yds${w.rectd?', '+w.rectd+' TD':''}`]}
function showFinal(){if(G.finalShown&&!$('#modal').classList.contains('hidden'))return;G.finalShown=true;if(typeof annFinal==='function')annFinal(G);AUTO=false;recordSeasonGame();if(G.trash){const nw=(G.score.h>G.score.a?G.h:G.a).id===G.trash.north;if(nw)setTimeout(()=>bToast('SO MUCH FOR THE WEAK CONFERENCE. '+TEAMS.find(t=>t.id===G.trash.north).school+' shuts '+TEAMS.find(t=>t.id===G.trash.other).school+' up.'),600)}if(typeof SUPER!=='undefined'&&SUPER&&G.season)setTimeout(()=>{if(!SUPER)return;closeModal();superNext()},4500);const g=G,h=g.h,a=g.a,sh=g.stats.h,sa=g.stats.a;const win=g.score.h>g.score.a?h:a;
 const row=(l,x,y)=>`<tr><td>${x}</td><th>${l}</th><td>${y}</td></tr>`;const lh=leaders(g,'h'),la=leaders(g,'a');
 modal(`<div class="fin"><div class="fsc">${logo(a,40)}<b>${g.score.a}</b><span>${g.season&&g.season.ccg?'CHAMPIONSHIP · ':''}FINAL${g.ot?' / OT':''}</span><b>${g.score.h}</b>${logo(h,40)}</div>
 <div class="fwin" style="color:${win.c1==='#111111'?win.c2:win.c1}">${esc(win.school)} ${esc(win.name)} win${g.season&&g.season.title?' the '+g.season.title+'!':''}</div>
 <div class="fcols"><table class="ft"><tr><td>${a.abbr}</td><th></th><td>${h.abbr}</td></tr>${row('Total yds',sa.py+sa.ry,sh.py+sh.ry)}${row('Passing',sa.py,sh.py)}${row('Rushing',sa.ry,sh.ry)}${row('First downs',sa.fd,sh.fd)}${row('Turnovers',sa.to,sh.to)}${row('Sacks',sa.sacks,sh.sacks)}</table>
 <div class="ld"><div><b>${a.abbr}</b>${la.filter(Boolean).map(x=>`<p>${esc(x)}</p>`).join('')}</div><div><b>${h.abbr}</b>${lh.filter(Boolean).map(x=>`<p>${esc(x)}</p>`).join('')}</div></div></div>
 ${g.season?'<div class="btns"><button id="fSea">Back to Season</button></div>':'<div class="btns"><button id="fRe">Rematch</button><button id="fNew">New Matchup</button><button id="fHome">Menu</button></div>'}</div>`);
 if(g.season){$('#fSea').onclick=()=>{closeModal();resumeSeason()};if(pendingRebuild){pendingRebuild=false;buildAll()}return}
 $('#fRe').onclick=()=>{closeModal();startGame()};$('#fNew').onclick=()=>{closeModal();renderSelect();show('select')};$('#fHome').onclick=()=>{closeModal();show('home')};if(pendingRebuild){pendingRebuild=false;buildAll()}}

// ---- boot ----
function cutscene(type,team,done,player){const cvs=$('#cut'),c=cvs.getContext('2d');const W=innerWidth,H=innerHeight,d=window.devicePixelRatio||1;cvs.width=W*d;cvs.height=H*d;cvs.style.display='block';
 const dur={intro:3600,td:2300,half:2200,final:1800}[type]/(AUTO?Math.min(SPEED,2):1),t0=performance.now();let over=false;
 const parts=type==='td'?Array.from({length:90},()=>({x:Math.random()*W,y:-Math.random()*H*.6,v:H*(.25+Math.random()*.35),r:Math.random()*6,c:Math.random()<.5?team.c1:team.c2,w:Math.random()*6+3})):[];
 const end=()=>{if(over)return;over=true;cvs.style.display='none';cvs.onclick=null;done&&done()};cvs.onclick=end;
 function fr(now){if(over)return;const el=now-t0,t=el/1000;c.setTransform(d,0,0,d,0,0);drawScene(c,W,H,G.h,G.a,t,[G.score.h,G.score.a],G.venue);
  const a=Math.min(1,el/350,(dur-el)/350);c.globalAlpha=Math.max(0,a);c.textAlign='center';c.textBaseline='middle';
  if(type==='intro'){c.fillStyle='rgba(0,0,0,.66)';c.fillRect(0,H*.26,W,H*.48);c.fillStyle='#ffcf3d';c.font=`600 ${H*.045}px Oswald,sans-serif`;c.fillText('FRIDAY NIGHT  ·  '+(G.season&&G.season.title?G.season.title:rivalry(G.h.id,G.a.id)||'CONFERENCE GAME').toUpperCase(),W/2,H*.34);
   const li=(tm,x)=>{const im=img(tm.logo||tm.logoBuiltIn);const sz=H*.16;if(im&&im.complete&&im.naturalWidth){const ar=im.naturalWidth/im.naturalHeight;c.drawImage(im,x-sz*ar/2,H*.5-sz/2,sz*ar,sz)}else{c.fillStyle=tm.c1;c.beginPath();c.arc(x,H*.5,sz/2,0,7);c.fill();c.fillStyle=tm.c2;c.font=`700 ${sz*.32}px Oswald`;c.fillText(tm.abbr,x,H*.5)}};
   li(G.a,W*.2);li(G.h,W*.8);c.fillStyle='#fff';c.font=`700 ${H*.07}px Oswald,sans-serif`;c.fillText(G.a.school.toUpperCase()+'  @  '+G.h.school.toUpperCase(),W/2,H*.5);
   c.font=`500 ${H*.04}px Oswald,sans-serif`;c.fillStyle='#cdd5e0';c.fillText(stadiumFor(G.venue||G.h).venue.toUpperCase(),W/2,H*.62);
   if(G.trash){c.font=`italic 500 ${H*.036}px Inter,sans-serif`;c.fillStyle='#ffb27a';let q=G.trash.q,fs=H*.036;while(c.measureText(q).width>W*.92&&fs>H*.022){fs*=.92;c.font=`italic 500 ${fs}px Inter,sans-serif`}c.fillText(q,W/2,H*.69)}}
  if(type==='td'){parts.forEach(p=>{p.y+=p.v/60;c.save();c.translate(p.x,p.y);c.rotate(t*3+p.r);c.fillStyle=p.c;c.fillRect(-p.w/2,-p.w/4,p.w,p.w/2);c.restore()});
   c.save();c.translate(W/2,H*.5);c.rotate(-.06);c.fillStyle=team.c1;c.fillRect(-W*.7,-H*.13,W*1.4,H*.26);c.fillStyle=team.c2;c.fillRect(-W*.7,-H*.13,W*1.4,H*.015);c.fillRect(-W*.7,H*.115,W*1.4,H*.015);
   const sc=1+Math.max(0,.3-el/1000);c.scale(sc,sc);c.fillStyle=team.c2;c.font=`700 ${H*.15}px Oswald,sans-serif`;c.fillText('TOUCHDOWN',0,-H*.01);c.font=`600 ${H*.05}px Oswald,sans-serif`;c.fillText(player?('#'+(player.num??'')+' '+player.first+' '+player.last).toUpperCase():team.school.toUpperCase()+' '+team.name.toUpperCase(),0,H*.085);c.restore();
   if(player&&player.photo){const im=img(player.photo);if(im.complete&&im.naturalWidth){const r=H*.17,x=W*.12,y=H*.5;c.save();c.beginPath();c.arc(x,y,r,0,7);c.closePath();c.fillStyle=team.c2;c.fill();c.beginPath();c.arc(x,y,r*.93,0,7);c.clip();const s=Math.max(2*r/im.naturalWidth,2*r/im.naturalHeight);c.drawImage(im,x-im.naturalWidth*s/2,y-im.naturalHeight*s/2,im.naturalWidth*s,im.naturalHeight*s);c.restore()}}}
  if(type==='half'||type==='final'){c.fillStyle='rgba(0,0,0,.5)';c.fillRect(0,H*.32,W,H*.36);c.fillStyle='#ffcf3d';c.font=`700 ${H*.1}px Oswald,sans-serif`;c.fillText(type==='half'?'HALFTIME':'FINAL',W/2,H*.42);
   c.fillStyle='#fff';c.font=`700 ${H*.08}px Oswald,sans-serif`;c.fillText(G.a.abbr+'  '+G.score.a+'   —   '+G.score.h+'  '+G.h.abbr,W/2,H*.57)}
  c.globalAlpha=1;c.fillStyle='rgba(255,255,255,.5)';c.font=`500 ${H*.032}px Inter,sans-serif`;c.textAlign='right';c.fillText('tap to skip',W-14,H-14);
  if(el<dur)requestAnimationFrame(fr);else end()}
 requestAnimationFrame(fr)}
// ---- MAIN MENU BACKGROUND: rotating home fields ----
// Mishawaka, then Penn, then every other school. Each host plays its rival if it has one, otherwise a conference opponent.
const HOME_ROT_MS=8000,HOME_FADE_MS=1200;let homeRot=null,homeT0=performance.now(),homeLast=0;
function homeOrder(){const ids=TEAMS.map(t=>t.id),first=['MISH','PENN'];return first.filter(id=>ids.includes(id)).concat(ids.filter(id=>!first.includes(id)))}
function homeOpp(id){const r=RIVALS.find(x=>x[0]===id||x[1]===id);if(r)return r[0]===id?r[1]:r[0];
 const c=(typeof LEAGUE!=='undefined')&&LEAGUE.confs.find(x=>x.teams.includes(id)),pool=c?c.teams.filter(x=>x!==id):TEAMS.map(t=>t.id).filter(x=>x!==id);return pool[(id.length*7)%pool.length]}
function homeScene(k){const ids=homeOrder(),id=ids[((k%ids.length)+ids.length)%ids.length];return{h:TEAMS.find(t=>t.id===id),a:TEAMS.find(t=>t.id===homeOpp(id))}}
function drawHomeBg(){const cv=$('#homeBg');if(!cv)return;const W=innerWidth,H=innerHeight,d=window.devicePixelRatio||1;if(cv.width!==Math.round(W*d)||cv.height!==Math.round(H*d)){cv.width=W*d;cv.height=H*d}
 const c=cv.getContext('2d');c.setTransform(d,0,0,d,0,0);const now=performance.now(),el=now-homeT0,k=Math.floor(el/HOME_ROT_MS),into=el%HOME_ROT_MS,t=el/1000;
 const cur=homeScene(k);drawScene(c,W,H,cur.h,cur.a,t,null);
 if(into<HOME_FADE_MS&&k>0){const prev=homeScene(k-1);c.save();c.globalAlpha=1-into/HOME_FADE_MS;drawScene(c,W,H,prev.h,prev.a,t,null);c.restore()}
 const cap=$('#homeCap');if(cap){const txt=`${cur.a.school} ${cur.a.name} at ${cur.h.school} ${cur.h.name} · ${stadiumFor(cur.h).venue}`;if(cap.textContent!==txt)cap.textContent=txt;cap.style.opacity=into<HOME_FADE_MS?String(into/HOME_FADE_MS):'1'}}
function homeLoop(now){requestAnimationFrame(homeLoop);if(!document.querySelector('#home.active')||document.hidden)return;if(now-homeLast<66)return;homeLast=now;drawHomeBg()}
requestAnimationFrame(homeLoop);
buildAll();loadLogos();
[IMG_PLY_SHIP,IMG_PLY_P,IMG_ELK_LION,IMG_NR_N,IMG_NR_KNIGHT,IMG_NW_BADGE,IMG_NW_PANTHER,IMG_NP_COUGAR,IMG_CARMEL_C,IMG_CARMEL_HELMET,IMG_CLAY_HEAD,IMG_CLAY_SOLDIER,IMG_WASH_PANTHER,IMG_RILEY_CAT,IMG_ADAMS_EAGLE,IMG_BADGE_ADAMS,IMG_BADGE_RILEY,IMG_BADGE_CLAY,IMG_BADGE_WASH,IMG_JIM_J,IMG_JIM_MINER,IMG_CON_BADGE,IMG_SJ_LOGO,IMG_SJ_HUSKY,IMG_SJ_EMBLEM,IMG_MAR_SHIELD,IMG_MAR_KNIGHT,IMG_MAR_M,IMG_M,IMG_CAVEMAN,IMG_PENN_SHIELD,IMG_PENN_SCRIPT,IMG_PENN_KNIGHT,IMG_PENN_HELMET].forEach(src=>{const i=img(src);i.onload=()=>{if(G&&!busy&&document.querySelector('#game.active'))drawState()}});setTimeout(drawHomeBg,300);window.addEventListener('resize',()=>setTimeout(drawHomeBg,100));if(document.fonts)document.fonts.ready.then(drawHomeBg);

document.addEventListener('click',e=>{const b=e.target.closest('[data-tp]');if(!b)return;const who=b.dataset.tp;$('#tpTitle').textContent=who==='YOU'?'Choose your team':'Choose opponent';
 $('#tpGrid').innerHTML=TEAMS.map((t,i)=>`<button data-tpi="${i}" data-who="${who}" >${logo(t,44)}<b>${esc(t.school)}</b><span>${t.ovr} OVR${titleLine(t.id,1)?' · '+titleLine(t.id,1):''}</span></button>`).join('');$('#teamPick').classList.remove('hidden')});
document.addEventListener('click',e=>{const b=e.target.closest('[data-tpi]');if(b){const i=+b.dataset.tpi;if(b.dataset.who==='YOU'){if(i===selC)selC=selU;selU=i}else{if(i===selU)selU=selC;selC=i}$('#teamPick').classList.add('hidden');renderSelect();return}
 if(e.target.id==='teamPick')$('#teamPick').classList.add('hidden')});
$('#goBuilder').onclick=()=>openBuilder('QB1');$('#goSeason').onclick=()=>openSeason();initSeasonStore();for(const c of LEAGUE.confs)for(const id of c.teams){const t=TEAMS.find(x=>x.id===id);if(t)t.conf=c.name}
initStore();

function renderUniforms(){const t=curTeam,W=Math.min(innerWidth-40,640),H=230;
 $('#roster').innerHTML=`<canvas id="uniCv" style="width:${W}px;height:${H}px;display:block;margin:6px auto"></canvas><p class="legend" style="text-align:center">${['home','away'].map(s=>uniformOf(t,s).generic?`${s==='home'?'Home':'Away'}: placeholder from team colors — send photos to make it real.`:`${s==='home'?'Home':'Away'}: from your photos.`).join(' · ')}</p>`;
 const cv=$('#uniCv'),d=window.devicePixelRatio||1;cv.width=W*d;cv.height=H*d;const c=cv.getContext('2d');c.scale(d,d);
 const g=c.createLinearGradient(0,0,0,H);g.addColorStop(0,'#1a2230');g.addColorStop(1,'#0e131b');c.fillStyle=g;c.fillRect(0,0,W,H);
 const star=(t.depth.QB[0]||{}).num??10;[['home',W*.3],['away',W*.7]].forEach(([s,x])=>{drawUniform(c,x,14,180,uniformOf(t,s),star);c.fillStyle='#aab3c0';c.font='600 12px Oswald,sans-serif';c.textAlign='center';c.fillText(s.toUpperCase(),x,H-14)})}
