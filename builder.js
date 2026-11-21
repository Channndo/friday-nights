// ================= ROSTER BUILDER (Mishawaka) =================
const POS_SKILLS={QB:['THP','THA'],RB:['CAR','CTH'],FB:['BLK','CAR','CTH'],WR:['CTH'],TE:['CTH','BLK'],OL:['BLK'],DL:['PRS','TAK'],LB:['TAK','COV'],CB:['COV','TAK'],S:['COV','TAK'],K:['KPW','KAC'],P:['KPW','KAC']};
const CORE=['STR','SPD','AGI','POW','TRK','IQ','STA','END','SPR'];
const POS_NAMES={QB:'Quarterbacks',RB:'Halfbacks',WR:'Wide Receivers',TE:'Tight Ends',OL:'Offensive Line',DL:'Defensive Line',LB:'Linebackers',CB:'Cornerbacks',S:'Safeties',K:'Kicker',P:'Punter'};
let DBH=null,storeMode='local',curSlot='QB1',draft=null,pendingRebuild=false;
const LSK='fn_mish_slots_v1';
function slotRec(k){return k in SAVED_SLOTS?shiftRec(SAVED_SLOTS[k]):DEFAULT_SLOTS[k]}
function filled(k){const r=slotRec(k);return !!(r&&!r.cleared&&(r.first||r.last))}
function applySlots(){if(document.querySelector('#game.active')){pendingRebuild=true;return}
 buildAll();const a=document.querySelector('.screen.active');if(!a)return;
 if(a.id==='teams')renderTeams();if(a.id==='team'&&curTeam)renderTeam(curTeam.id);if(a.id==='select')renderSelect();if(a.id==='builder')renderBuilderList()}
async function initStore(){try{SAVED_SLOTS=JSON.parse(LS.get(LSK)||'{}')}catch(e){SAVED_SLOTS={}}applySlots();
 let db=null;try{db=window.claude&&claude.use?await claude.use('db'):null}catch(e){db=null}
 if(!db){storeMode='local';updStatus();return}
 DBH=db;storeMode='loading';updStatus();const timer=setTimeout(()=>{if(storeMode==='loading'){storeMode='slow';updStatus()}},10000);
 try{db.collection('mish_roster').onSnapshot(snap=>{const o={};snap.docs.forEach(d=>{if(d.exists)o[d.id]=d.data()});
   if(!snap.metadata.fromCache){clearTimeout(timer);storeMode='db'}SAVED_SLOTS=o;applySlots();updStatus()},
  err=>{clearTimeout(timer);storeMode='local';DBH=null;updStatus()})}catch(e){clearTimeout(timer);storeMode='local';DBH=null;updStatus()}}
function updStatus(){const el=$('#bStatus');if(!el)return;const n=Object.keys(SLOT_POS).filter(filled).length;
 el.innerHTML=`<b>${n}</b>/54 filled · `+({db:'saved to the game',loading:'loading saved roster…',slow:"can't reach saved roster yet",local:'saving on this device only',readonly:'view only — you can\'t save here'}[storeMode])}
async function saveSlot(k,rec){if(rec&&typeof rec==='object'&&!rec.cleared)rec=Object.assign({},rec,{shifted:1});if(DBH&&storeMode!=='readonly'){try{await DBH.doc('mish_roster/'+k).set(rec);SAVED_SLOTS={...SAVED_SLOTS,[k]:rec};applySlots();return true}
  catch(e){if(e&&e.code==='invalid_argument'){storeMode='readonly';updStatus();return false}if(e&&e.code==='quota_exceeded'){bToast('Storage is full — remove some photos.');return false}
   try{await new Promise(r=>setTimeout(r,600+Math.random()*600));await DBH.doc('mish_roster/'+k).set(rec);SAVED_SLOTS={...SAVED_SLOTS,[k]:rec};applySlots();return true}catch(e2){bToast("Couldn't save. Try again.");return false}}}
 SAVED_SLOTS={...SAVED_SLOTS,[k]:rec};if(!LS.set(LSK,JSON.stringify(SAVED_SLOTS)))bToast('Device storage is full — photo may be too big.');applySlots();return true}
function bToast(t){const b=$('#bToast');b.textContent=t;b.classList.add('show');clearTimeout(bToast.t);bToast.t=setTimeout(()=>b.classList.remove('show'),2200)}

function openBuilder(slot){curSlot=slot||curSlot;show('builder');renderBuilderList();loadDraft(curSlot)}
function renderBuilderList(){const M=TEAMS.find(t=>t.id==='MISH');
 $('#bList').innerHTML=SLOT_DEFS.map(([pos,arr])=>`<div class="bg-h">${POS_NAMES[pos]} <span>${arr.filter(filled).length}/${arr.length}</span></div>`+arr.map(k=>{const r=slotRec(k),f=filled(k);
  return`<button class="bs-row ${k===curSlot?'on':''} ${f?'f':''}" data-slot="${k}"><span class="bs-k">${k}</span>${f?(r.photo?`<img src="${r.photo}">`:'')+`<span class="bs-n">${esc((r.first||'')+' '+(r.last||''))}</span>`:'<span class="bs-e">empty · auto</span>'}</button>`}).join('')).join('');updStatus()}
document.addEventListener('click',e=>{const b=e.target.closest('[data-slot]');if(b){curSlot=b.dataset.slot;renderBuilderList();loadDraft(curSlot)}});
function loadDraft(k){const r=slotRec(k);draft=r&&!r.cleared?JSON.parse(JSON.stringify(r)):{attrs:{}};draft.attrs=draft.attrs||{};renderForm()}
function htParts(h){const i=parseHt(h);return i?[Math.floor(i/12),i%12]:['','']}
function renderForm(){const k=curSlot,pos=SLOT_POS[k],d=draft,est=d.est||{};const [hf,hi]=htParts(d.ht);
 const skills=[...new Set([...(POS_SKILLS[pos]||[]),...(d.pos2?POS_SKILLS[d.pos2]||[]:[])])];const other=ATTRS.filter(a=>!CORE.includes(a)&&!skills.includes(a));
 const box=a=>`<label class="rt ${a in est&&!(a in d.attrs)?'guess':''}"><span>${ATTR_NAMES[a]}</span><input inputmode="numeric" type="number" min="1" max="99" data-at="${a}" value="${d.attrs[a]??''}" placeholder="${est[a]??'—'}"></label>`;
 const sel=(id,opts,v)=>`<select data-f="${id}">${opts.map(o=>`<option value="${o[0]}" ${String(v??'')===String(o[0])?'selected':''}>${o[1]}</option>`).join('')}</select>`;
 $('#bForm').innerHTML=`<div class="bf-top">
  <label class="bphoto">${d.photo?`<img src="${d.photo}">`:'<span>＋<br>Photo</span>'}<input type="file" accept="image/*" id="bPhoto"></label>
  <div class="bf-id">
   <div class="bf-slot">${k} · ${POS_NAMES[pos].replace(/s$/,'')}</div>
   <div class="row"><input data-f="first" placeholder="First name" value="${esc(d.first||'')}"><input data-f="last" placeholder="Last name" value="${esc(d.last||'')}"><input data-f="num" class="sm" inputmode="numeric" type="number" placeholder="#" value="${d.num??''}"></div>
   <div class="row">${sel('hf',[['','ft'],[5,"5'"],[6,"6'"],[7,"7'"]],hf)}${sel('hi',[['','in'],...Array.from({length:12},(_,i)=>[i,i+'"'])],hi)}
    <input data-f="wt" class="sm" inputmode="numeric" type="number" placeholder="lbs" value="${d.wt??''}">${sel('yr',[['','Year'],['FR','FR'],['SO','SO'],['JR','JR'],['SR','SR']],d.yr)}
    <input data-f="label" class="md" placeholder="${slotLabel(k)}" value="${esc(d.label||'')}" title="Position label shown on roster"></div>
   <div class="row chk">${sel('pos2',[['','Two-way: none'],['QB','also QB'],['RB','also HB'],['FB','also FB'],['WR','also WR'],['TE','also TE'],['DL','also DL'],['LB','also LB'],['CB','also CB'],['S','also S'],['K','also K'],['P','also P']],d.pos2)}
    <label><input type="checkbox" data-f="captain" ${d.captain?'checked':''}> Captain</label><label><input type="checkbox" data-f="leader" ${d.leader?'checked':''}> Leader</label></div>
  </div><div class="bf-ovr" id="bOvr"></div></div>
  <h4>Core ratings</h4><div class="rgrid">${CORE.map(box).join('')}</div>
  <h4>${pos==='K'||pos==='P'?'Kicking':'Position skills'}</h4><div class="rgrid">${skills.map(box).join('')}</div>
  <details><summary>Other skills (optional)</summary><div class="rgrid">${other.map(box).join('')}</div></details>
  <div class="bf-note" id="bNote"></div>
  <div class="bf-btns"><button id="bSave" class="pri">Save player</button><button id="bNext">Next empty slot ›</button><button id="bClear" class="dang">Clear slot</button></div>`;
 $('#bPhoto').onchange=ev=>{const f=ev.target.files[0];if(!f)return;const fr=new FileReader();fr.onload=()=>{const im=new Image();im.onload=()=>{const m=360,r=Math.min(1,m/Math.max(im.width,im.height)),c=document.createElement('canvas');c.width=Math.round(im.width*r);c.height=Math.round(im.height*r);c.getContext('2d').drawImage(im,0,0,c.width,c.height);draft.photo=c.toDataURL('image/jpeg',.82);renderForm()};im.src=fr.result};fr.readAsDataURL(f)};
 $('#bForm').oninput=$('#bForm').onchange=ev=>{const t=ev.target;if(t.id==='bPhoto')return;readForm();if(t.dataset.f==='pos2')renderForm();else preview()};
 $('#bSave').onclick=async()=>{readForm();if(!draft.first&&!draft.last){bToast('Add a name first.');return}const rec=cleanRec(draft);const ok=await saveSlot(curSlot,rec);if(ok){bToast('Saved '+(rec.first||'')+' '+(rec.last||''));renderBuilderList()}};
 $('#bNext').onclick=()=>{const all=Object.keys(SLOT_POS),i=all.indexOf(curSlot);const n=all.slice(i+1).concat(all.slice(0,i)).find(s=>!filled(s));if(n){curSlot=n;renderBuilderList();loadDraft(n);const el=document.querySelector(`[data-slot="${n}"]`);el&&el.scrollIntoView({block:'nearest'})}else bToast('Every slot is filled!')};
 $('#bClear').onclick=async()=>{const ok=await saveSlot(curSlot,{cleared:true});if(ok){loadDraft(curSlot);renderBuilderList();bToast(curSlot+' cleared — game will auto-fill it')}};
 preview()}
function readForm(){const f=$('#bForm');f.querySelectorAll('[data-f]').forEach(el=>{const k=el.dataset.f;if(k==='hf'||k==='hi')return;if(el.type==='checkbox')draft[k]=el.checked;else draft[k]=el.value===''?undefined:(el.type==='number'?+el.value:el.value)});
 const hf=f.querySelector('[data-f=hf]').value,hi=f.querySelector('[data-f=hi]').value;draft.ht=hf!==''?hf+'-'+(hi||0):undefined;
 f.querySelectorAll('[data-at]').forEach(el=>{const a=el.dataset.at;if(el.value==='')delete draft.attrs[a];else draft.attrs[a]=clamp(Math.round(+el.value),1,99)})}
function cleanRec(d){const r={};for(const k of['kr','start2','nick','bio','first','last','num','ht','wt','yr','label','pos2','captain','leader','photo'])if(d[k]!==undefined&&d[k]!==''&&d[k]!==false)r[k]=d[k];
 r.attrs={...d.attrs};const est={};for(const [a,v] of Object.entries(d.est||{}))if(!(a in r.attrs))est[a]=v;if(Object.keys(est).length)r.est=est;return r}
function preview(){const pos=SLOT_POS[curSlot],d=draft;const need=[...CORE,...(POS_SKILLS[pos]||[])].filter(a=>!(a in d.attrs)&&!((d.est||{})[a]));
 let o='—';if(Object.keys(d.attrs).length){const p=customPlayer(slotToCustom(curSlot,cleanRec(d)));o=p.ovr+(p.ovr2?` <small>· ${p.ovr2} ${p.pos2}</small>`:'')}
 $('#bOvr').innerHTML=`<div class="big-ovr">${o}</div><small>OVR</small>`;
 const sp=d.attrs.SPR;$('#bNote').innerHTML=(need.length?`Still blank: ${need.map(a=>ATTR_NAMES[a]).join(', ')}. Blanks get auto-filled (dim = my current guess).`:'All key ratings filled.')+(sp!=null&&sp<91?` <b>Spirit under 91 lowers every other team's Spirit cap.</b>`:'');}
