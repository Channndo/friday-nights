// ================= STADIUMS & CUTSCENES =================
const imgCache={};function img(src){if(!src)return null;if(!imgCache[src]){const i=new Image();i.src=src;imgCache[src]=i}return imgCache[src]}
const STADIUMS={
 MISH:{ez:'turf',ezText:['MISHAWAKA','CAVEMEN'],ezColor:'#7B1E2B',ezStroke:'#FFFFFF',font:'Graduate',border:'#7B1E2B',mid:()=>IMG_M,
  track:'#c4675a',backdrop:'clocktower',board:'MISHAWAKA CAVEMEN',venue:'Steele Stadium'},
 MARIAN:{ez:'turf',ezText:['MARIAN','KNIGHTS'],ezColor:'#FFFFFF',ezStroke:'#00339F',font:'Graduate',border:null,mid:()=>IMG_MAR_SHIELD,midW:6.5,
  track:'#3b3e44',backdrop:'marian',board:'MARIAN KNIGHTS',venue:'Marian Knights home field'},
 SJ:{ez:'fill',ezFill:'#17191d',ezText:['SAINT JOSEPH','SAINT JOSEPH'],ezColor:'#6FA3D0',ezStroke:'#FFFFFF',font:'Cinzel',border:'#d6d9d3',borderInner:null,mid:()=>IMG_SJ_LOGO,midW:5.5,
  track:'#222429',backdrop:'sj',board:'SAINT JOSEPH HUSKIES',venue:'Father Bly Field at Leighton Stadium'},
 CON:{ez:'fill',ezFill:'#2b2d31',ezText:['CONCORD','MINUTEMEN'],ezColor:'#e4e6e3',ezStroke:'#6b7076',font:'Graduate',border:'#c9ccc8',borderInner:null,mid:()=>IMG_CON_BADGE,midW:7,
  track:'#8f969d',backdrop:'concord',board:'CONCORD MINUTEMEN',venue:'Concord Minutemen home field'},
 JIM:{ez:'fill',ezFill:'#6B1E2E',ezText:['JIMTOWN','JIMMIES'],ezColor:'#FFFFFF',ezStroke:null,font:'Graduate',border:'#6B1E2E',borderInner:null,mid:()=>IMG_JIM_J,midW:7,
  track:'#2b2d31',backdrop:'jimtown',board:'JIMTOWN JIMMIES',venue:'Sharpe Stadium at Knepp Field'},
 ADAMS:{ez:'turf',plain:true,ezText:['',''],ezColor:'#fff',ezStroke:null,font:'Oswald',border:null,mid:()=>null,noMid:true,track:null,backdrop:'grandstand',board:'ADAMS EAGLES',venue:'TCU School Field'},
 WASH:{ez:'turf',plain:true,ezText:['',''],ezColor:'#fff',ezStroke:null,font:'Oswald',border:null,mid:()=>null,noMid:true,track:null,backdrop:'grandstand',board:'WASHINGTON PANTHERS',venue:'TCU School Field'},
 RILEY:{ez:'turf',plain:true,ezText:['',''],ezColor:'#fff',ezStroke:null,font:'Oswald',border:null,mid:()=>null,noMid:true,track:null,backdrop:'grandstand',board:'RILEY WILDCATS',venue:'Jackson Field'},
 CLAY:{ez:'turf',plain:true,ezText:['',''],ezColor:'#fff',ezStroke:null,font:'Oswald',border:null,mid:()=>null,noMid:true,track:null,backdrop:'grandstand',board:'CLAY COLONIALS',venue:'Clay Field'},
 CARMEL:{ez:'fill',ezFill:'#1F4FA8',ezText:['CARMEL','CARMEL'],ezColor:'#F7B718',ezStroke:'#FFFFFF',font:'Graduate',border:'#1F4FA8',borderInner:null,mid:()=>IMG_CARMEL_C,midW:9,
  track:'#b84a3a',backdrop:'carmel',board:'CARMEL GREYHOUNDS',venue:'Murray Stadium'},
 LAP:{ez:'fill',ezFill:'#F26A1B',ezText:['LAPORTE','SLICERS'],ezColor:'#111111',ezStroke:'#FFFFFF',font:'Graduate',border:'#F26A1B',borderInner:null,mid:()=>IMG_BADGE_LAP,midW:7,
  track:'#3a3c40',backdrop:'grandstand',board:'LAPORTE SLICERS',venue:'LaPorte Slicers home field'},
 NP:{ez:'fill',ezFill:'#1B2A57',ezText:['NEW PRAIRIE','COUGARS'],ezColor:'#C9A75A',ezStroke:'#FFFFFF',font:'Graduate',border:null,mid:()=>IMG_NP_COUGAR,midW:6,
  track:'#2f5fb3',backdrop:'grandstand',board:'NEW PRAIRIE COUGARS',venue:'Arnie Miller Field'},
 NW:{ez:'fill',ezFill:'#26272b',ezText:['PANTHERS','NORTHWOOD'],ezColor:'#D2232A',ezStroke:'#FFFFFF',font:'Graduate',border:null,mid:()=>IMG_NW_BADGE,midW:7,
  track:'#2b2d31',backdrop:'grandstand',board:'NORTHWOOD PANTHERS',venue:'Northwood Panthers home field'},
 NR:{ez:'fill',ezFill:'#FDBB2F',ezText:['RAIDERS','NORTHRIDGE'],ezColor:'#1E9447',ezStroke:'#FFFFFF',font:'Graduate',border:null,mid:()=>IMG_NR_N,midW:7,
  track:'#2b2d31',backdrop:'grandstand',board:'NORTHRIDGE RAIDERS',venue:'NorthRidge Raiders home field'},
 ELK:{ez:'fill',ezFill:'#1F4FB4',ezText:['ELKHART','ELKHART'],ezColor:'#FFFFFF',ezStroke:'#C9B26B',font:'Graduate',border:'#3a7bd5',borderInner:null,mid:()=>IMG_ELK_LION,midW:6,
  track:'#2b2d31',backdrop:'grandstand',board:'ELKHART LIONS',venue:'Rice Field'},
 PLY:{ez:'fill',ezFill:'#D21F2B',ezText:['PLYMOUTH','ROCKIES'],ezColor:'#FFFFFF',ezStroke:null,font:'Graduate',border:'#FFFFFF',borderInner:null,mid:()=>IMG_PLY_P,midW:4.5,
  track:'#3a3c40',backdrop:'grandstand',board:'PLYMOUTH ROCKIES',venue:'Plymouth Rockies home field'},
 FISH:{ez:'fill',ezFill:'#C8102E',ezText:['FISHERS','FISHERS'],ezColor:'#FFFFFF',ezStroke:null,font:'Graduate',border:'#FFFFFF',borderInner:null,mid:()=>IMG_FISH_TIGER,midW:12,
  track:'#2b2d31',backdrop:'grandstand',board:'FISHERS TIGERS',venue:'Fishers Tigers home field'},
 ZION:{ez:'fill',ezFill:'#9aa1a9',ezText:['EAGLES','ZIONSVILLE'],ezColor:'#14532D',ezStroke:'#FFFFFF',font:'Graduate',border:'#FFFFFF',borderInner:null,mid:()=>IMG_ZION_EAGLE,midW:8,
  track:'#3a3c40',backdrop:'grandstand',board:'ZIONSVILLE EAGLES',venue:'Zionsville Eagles home field'},
 NOB:{ez:'fill',ezFill:'#141414',ezText:['NOBLESVILLE','NOBLESVILLE'],ezColor:'#C2A869',ezStroke:'#FFFFFF',font:'Graduate',border:'#141414',borderInner:null,mid:()=>IMG_NOB_MILLER,midW:6,
  track:'#3a3c40',backdrop:'grandstand',board:'NOBLESVILLE MILLERS',venue:'Noblesville Millers home field'},
 BD:{ez:'fill',ezFill:'#3a2a78',ezText:['BEN DAVIS','BEN DAVIS'],ezColor:'#FFFFFF',ezStroke:null,font:'Graduate',border:'#3a2a78',borderInner:null,mid:()=>IMG_BD_SHIELD,midW:6,
  track:'#b84a3a',backdrop:'grandstand',board:'BEN DAVIS GIANTS',venue:'Ben Davis Giants home field'},
 BC:{ez:'fill',ezFill:'#1F5FD1',ezText:['BISHOP CHATARD','TROJANS'],ezColor:'#FFFFFF',ezStroke:null,font:'Graduate',border:null,mid:()=>IMG_BC_TROJAN,midW:6,
  track:'#3a3c40',backdrop:'grandstand',board:'BISHOP CHATARD TROJANS',venue:'Bishop Chatard Trojans home field'},
 CATH:{ez:'fill',ezFill:'#1F3F9A',ezText:['CATHEDRAL','CATHEDRAL'],ezColor:'#C9A75A',ezStroke:'#0E1E4A',font:'Graduate',border:'#FFFFFF',mid:()=>IMG_CATH_C,midW:7,
  track:'#B4483C',backdrop:'cathedral',board:'CATHEDRAL IRISH',venue:'Cathedral Irish home field'},
 WC:{ez:'fill',ezFill:'#111111',ezText:['WARREN','WARREN'],ezColor:'#C5A862',ezStroke:'#FFFFFF',font:'Graduate',border:'#111111',borderInner:null,mid:()=>IMG_WC_WGOLD,midW:6,
  track:'#3a3c40',backdrop:'grandstand',board:'WARREN WARRIORS',venue:'Warren Central Warriors home field'},
 CP:{ez:'fill',ezFill:'#C8102E',ezText:['CROWN POINT','BULLDOGS'],ezColor:'#FFFFFF',ezStroke:'#111111',font:'Graduate',border:'#FFFFFF',borderInner:null,mid:()=>IMG_CP_DOG,midW:8,
  track:'#B8322C',backdrop:'grandstand',board:'CROWN POINT BULLDOGS',venue:'Crown Point Bulldogs home field'},
 MERR:{ez:'fill',ezFill:'#4B2E83',ezText:['MERRILLVILLE','PIRATES'],ezColor:'#FFFFFF',ezStroke:'#111111',font:'Graduate',border:'#FFFFFF',borderInner:null,mid:()=>IMG_MERR_PIRATE,midW:7,
  track:null,backdrop:'grandstand',board:'MERRILLVILLE PIRATES',venue:'Merrillville Pirates home field'},
 WEST:{ez:'fill',ezFill:'#111111',ezText:['WESTFIELD','SHAMROCKS'],ezColor:'#D4B556',ezStroke:'#FFFFFF',font:'Graduate',border:'#D4B556',borderInner:null,mid:()=>IMG_WF_ROCKS,midW:8,
  track:'#B8322C',backdrop:'grandstand',board:'WESTFIELD SHAMROCKS',venue:'Westfield Shamrocks home field'},
 WAR:{ez:'fill',ezFill:'#111111',ezText:['WARSAW','TIGERS'],ezColor:'#FFFFFF',ezStroke:'#F26B1D',font:'Graduate',border:'#F26B1D',borderInner:null,mid:()=>IMG_WAR_TIGER,midW:7,
  track:'#B8322C',backdrop:'grandstand',board:'WARSAW TIGERS',venue:'Warsaw Tigers home field'},
 PORT:{ez:'fill',ezFill:'#C8102E',ezText:['PORTAGE','INDIANS'],ezColor:'#FFFFFF',ezStroke:null,font:'Graduate',border:'#FFFFFF',borderInner:null,mid:()=>IMG_BADGE_PORT,midW:6,
  track:'#C9655A',backdrop:'grandstand',board:'PORTAGE INDIANS',venue:'Portage Indians home field'},
 VAL:{ez:'fill',ezFill:'#111111',ezText:['VIKINGS','VIKINGS'],ezColor:'#2E9E6B',ezStroke:'#FFFFFF',font:'Graduate',border:'#FFFFFF',borderInner:null,mid:()=>IMG_VAL_V,midW:6,
  track:'#B8655A',backdrop:'grandstand',board:'VALPARAISO VIKINGS',venue:'Valparaiso Vikings home field'},
 LC:{ez:'fill',ezFill:'#1F4FD1',ezText:['LAKE CENTRAL','INDIANS'],ezColor:'#FFFFFF',ezStroke:'#111111',font:'Graduate',border:'#FFFFFF',borderInner:null,mid:()=>IMG_LC_LOGO,midW:6,
  track:'#2a2c31',backdrop:'grandstand',board:'LAKE CENTRAL INDIANS',venue:'Lake Central Indians home field'},
 MC:{ez:'fill',ezFill:'#1B365D',ezText:['MICHIGAN CITY','WOLVES'],ezColor:'#FFFFFF',ezStroke:'#B9BEC6',font:'Graduate',border:'#FFFFFF',borderInner:null,mid:()=>IMG_MC_M,midW:7,
  track:null,backdrop:'grandstand',board:'MICHIGAN CITY WOLVES',venue:'Michigan City Wolves home field'},
 LUCAS:{ez:'fill',ezFill:'#0B2A5B',ezText:['CONGRATS','CHAMP'],ezColor:'#F5C542',ezStroke:'#FFFFFF',font:'Graduate',border:'#F5C542',mid:()=>IMG_TROPHY,midW:9,
  track:null,backdrop:'dome',board:'STATE CHAMPIONSHIP',venue:'Lucas Oil Stadium'},
 RONC:{ez:'fill',ezFill:'#1F4FBF',ezText:['RONCALLI','RONCALLI'],ezColor:'#D22630',ezStroke:'#FFFFFF',font:'Graduate',border:'#FFFFFF',mid:()=>IMG_RON_R,midW:6,
  track:'#2a2c31',backdrop:'grandstand',board:'RONCALLI ROYALS',venue:'Roncalli Royals home field'},
 CARR:{ez:'fill',ezFill:'#1F4FBF',ezText:['CARROLL','CHARGERS'],ezColor:'#FFFFFF',ezStroke:'#0E2A6B',font:'Graduate',border:'#FFFFFF',mid:()=>IMG_CARR_C,midW:6,
  track:'#2a2c31',backdrop:'grandstand',board:'CARROLL CHARGERS',venue:'Carroll Chargers home field'},
 BDW:{ez:'fill',ezFill:'#1F4FBF',ezText:['SAINTS','SAINTS'],ezColor:'#C9A75A',ezStroke:'#0E1E4A',font:'Graduate',border:'#FFFFFF',mid:()=>IMG_BDW_BD,midW:6,
  track:'#2a2c31',backdrop:'grandstand',board:'BISHOP DWENGER SAINTS',venue:'Bishop Dwenger Saints home field'},
 AND:{ez:'fill',ezFill:'#CC1F2D',ezText:['ANDERSON','RAPTORS'],ezColor:'#FFFFFF',ezStroke:'#111111',font:'Graduate',border:'#FFFFFF',mid:()=>IMG_AND_A,midW:7,
  track:'#2a2c31',backdrop:'grandstand',board:'ANDERSON RAPTORS',venue:'Anderson Raptors home field'},
 EC:{ez:'fill',ezFill:'#111111',ezText:['EAST CENTRAL','HORNETS'],ezColor:'#F2C200',ezStroke:'#FFFFFF',font:'Graduate',border:'#F2C200',mid:()=>IMG_EC_LOGO,midW:6,
  track:'#2a2c31',backdrop:'grandstand',board:'EAST CENTRAL HORNETS',venue:'East Central Hornets home field'},
 PENN:{ez:'fill',ezFill:'#a3a69f',ezText:['KINGSMEN','KINGSMEN'],ezColor:'#1b2130',ezStroke:null,font:'Graduate',border:'#b9bbb5',borderInner:null,mid:()=>IMG_PENN_SCRIPT,midW:16,
  track:'#bf5641',backdrop:'fieldhouse',board:'PENN KINGSMEN',venue:'TCU Freed Field'},
};
// Neutral site for the State Championship game.
// Country practice field: no stands, no end zone names, corn on every side, tractor tires and hay bales.
const PRACTICE_VENUE={id:'PRACTICE',school:'Practice Field',name:'Practice',abbr:'PRC',c1:'#2a7f35',c2:'#FFFFFF',logoBuiltIn:null};
// Warsaw's farm field: the Gibson Southern scrimmage is played here every year
const WARFARM_VENUE={id:'WARFARM',school:'Warsaw Farm Field',name:'Farm Field',abbr:'WAR',c1:'#F26B1D',c2:'#111111',logoBuiltIn:null};
STADIUMS.WARFARM={plain:true,noMid:true,farm:true,ez:'turf',ezText:['',''],ezColor:'#fff',font:'Oswald',border:null,track:null,backdrop:'cornfield',board:'WARSAW TIGERS',venue:'The Warsaw farm field'};
STADIUMS.PRACTICE={plain:true,noMid:true,farm:true,ez:'turf',ezText:['',''],ezColor:'#fff',font:'Oswald',border:null,track:null,backdrop:'cornfield',board:'',venue:'Practice Field (country)'};
function drawFarmTop(c,W,H,X,Y,s){
 // dirt + pasture around the field, then corn rows on all four sides
 c.fillStyle='#4f6b2a';c.fillRect(0,0,W,H);c.fillStyle='#6b5a3a';c.fillRect(X(-16),Y(-6),132*s,65.33*s);c.fillStyle='#3f7a2e';c.fillRect(X(-14),Y(-4),128*s,61.33*s);
 const corn=(x0,y0,x1,y1,vert)=>{for(let i=0;;i++){const p=(vert?x0:y0)+i*1.6*s;if(p>(vert?x1:y1))break;c.fillStyle=i%2?'#c9b24a':'#a99633';
   if(vert)c.fillRect(p,y0,1.1*s,y1-y0);else c.fillRect(x0,p,x1-x0,1.1*s);
   c.fillStyle='rgba(60,90,30,.55)';for(let k=0;k<(vert?(y1-y0):(x1-x0))/(1.2*s);k++){const q=(vert?y0:x0)+k*1.2*s+((i*7)%5)*.2*s;if(vert)c.fillRect(p+.2*s,q,.7*s,.6*s);else c.fillRect(q,p+.2*s,.6*s,.7*s)}}};
 corn(0,0,W,Y(-6),false);corn(0,Y(59.33),W,H,false);corn(0,Y(-6),X(-16),Y(59.33),true);corn(X(116),Y(-6),W,Y(59.33),true);
 // tractor tires along the home sideline, hay bales on the far side
 const tire=(x,y,r)=>{c.fillStyle='#151515';c.beginPath();c.arc(X(x),Y(y),r*s,0,7);c.fill();c.fillStyle='#3f7a2e';c.beginPath();c.arc(X(x),Y(y),r*.45*s,0,7);c.fill();c.strokeStyle='#2b2b2b';c.lineWidth=Math.max(1,s*.25);c.beginPath();c.arc(X(x),Y(y),r*.75*s,0,7);c.stroke()};
 for(const [x,y,r] of [[18,-2.4,1.3],[21,-2.6,1.6],[24.5,-2.3,1.2],[78,-2.5,1.5],[81.5,-2.4,1.3],[104,-2.7,1.7]])tire(x,y,r);
 for(const [x,y] of [[30,56],[33,56.2],[64,55.8],[67,56.1],[70,55.9]]){c.fillStyle='#d9b85c';c.fillRect(X(x),Y(y),2.4*s,1.6*s);c.strokeStyle='#a8873a';c.lineWidth=Math.max(1,s*.2);c.strokeRect(X(x),Y(y),2.4*s,1.6*s)}}
function drawCornfield(c,cx,hz,W,H){ // menu / cutscene backdrop: red barn, silo and corn to the horizon
 c.fillStyle='#8b1e1e';c.fillRect(cx-W*.09,hz-H*.16,W*.18,H*.16);c.fillStyle='#5a1212';c.beginPath();c.moveTo(cx-W*.1,hz-H*.16);c.lineTo(cx,hz-H*.26);c.lineTo(cx+W*.1,hz-H*.16);c.closePath();c.fill();
 c.strokeStyle='#f2efe6';c.lineWidth=Math.max(2,W*.003);c.strokeRect(cx-W*.03,hz-H*.11,W*.06,H*.11);c.beginPath();c.moveTo(cx-W*.03,hz-H*.11);c.lineTo(cx+W*.03,hz);c.moveTo(cx+W*.03,hz-H*.11);c.lineTo(cx-W*.03,hz);c.stroke();
 c.fillStyle='#9aa3ad';c.fillRect(cx+W*.11,hz-H*.3,W*.045,H*.3);c.beginPath();c.arc(cx+W*.1325,hz-H*.3,W*.0225,Math.PI,0);c.fill();
 for(let i=0;i<140;i++){const x=(i/140)*W,h=H*(.05+((i*37)%11)/180);c.strokeStyle=i%2?'#8f9a35':'#6f7d2a';c.lineWidth=Math.max(1.5,W*.004);c.beginPath();c.moveTo(x,hz);c.lineTo(x+W*.002,hz-h);c.stroke();
  c.fillStyle='#c9b24a';c.fillRect(x-1,hz-h-H*.008,3,H*.012)}}
const STATE_VENUE={id:'LUCAS',school:'Lucas Oil Stadium',name:'State Finals',abbr:'IND',c1:'#0B2A5B',c2:'#F5C542',get logoBuiltIn(){return IMG_TROPHY}};
function stadiumFor(t){return STADIUMS[t.id]||{ez:'color',ezText:[t.school.toUpperCase(),t.name.toUpperCase()],ezColor:t.c2,ezStroke:null,font:'Oswald',border:null,
 mid:null,track:null,backdrop:'grandstand',board:(t.school+' '+t.name).toUpperCase(),venue:t.school+' '+t.name+' home field',generic:true}}

// ---------- top-down field (gameplay) ----------
function drawTopField(c,W,H,home,X,Y,s){const S=stadiumFor(home);
 c.fillStyle='#164a24';c.fillRect(0,0,W,H);if(S.farm)drawFarmTop(c,W,H,X,Y,s);
 if(S.track){const r=26.66+13,cx=X(50),cy=Y(26.66);
  const shape=(rr)=>{c.beginPath();c.moveTo(X(0),cy-rr*s);c.lineTo(X(100),cy-rr*s);c.arc(X(100),cy,rr*s,-Math.PI/2,Math.PI/2);c.lineTo(X(0),cy+rr*s);c.arc(X(0),cy,rr*s,Math.PI/2,Math.PI*1.5);c.closePath()};
  c.fillStyle='#8f8f8f';c.fillRect(0,0,W,H);c.fillStyle=S.track;shape(r+9);c.fill();
  c.strokeStyle='rgba(255,255,255,.55)';c.lineWidth=1;for(let i=1;i<8;i++){shape(r+i*1.15);c.stroke()}
  c.fillStyle='#1f6b2c';shape(r);c.fill()}
 if(S.border){c.fillStyle=S.border;c.fillRect(X(-12.5),Y(-2.5),125*s,58.33*s);if(S.borderInner!==null){c.fillStyle='#fff';c.fillRect(X(-11),Y(-1),122*s,55.33*s)}}
 for(let i=0;i<20;i++){c.fillStyle=i%2?'#2f8a3a':'#287a33';c.fillRect(X(i*5),Y(0),5*s+.5,53.33*s)}
 const ez=(x0,txt,rot)=>{c.fillStyle=S.ez==='turf'?'#2a7f35':S.ez==='fill'?S.ezFill:home.c1;c.fillRect(X(x0),Y(0),10*s,53.33*s);c.save();c.translate(X(x0+5),Y(26.66));c.rotate(rot);
  const fs=S.font==='Graduate'?s*4.6:S.font==='Cinzel'?s*4.4:s*5.2;c.font=`700 ${fs}px ${S.font},Oswald,sans-serif`;c.textAlign='center';c.textBaseline='middle';
  let w=c.measureText(txt).width;if(w>48*s){c.font=`700 ${fs*48*s/w}px ${S.font},Oswald,sans-serif`}
  if(S.ezStroke){c.lineJoin='round';c.lineWidth=Math.max(2,s*.55);c.strokeStyle=S.ezStroke;c.strokeText(txt,0,0)}c.fillStyle=S.ezColor;c.fillText(txt,0,0);c.restore()};
 if(S.plain){c.fillStyle='#2a7f35';c.fillRect(X(-10),Y(0),10*s,53.33*s);c.fillRect(X(100),Y(0),10*s,53.33*s)}else{ez(-10,S.ezText[0],-Math.PI/2);ez(100,S.ezText[1],Math.PI/2);}
 c.strokeStyle='rgba(255,255,255,.88)';for(let y=0;y<=100;y+=5){c.lineWidth=y===0||y===100?2.2:1;c.beginPath();c.moveTo(X(y),Y(0));c.lineTo(X(y),Y(53.33));c.stroke()}
 c.lineWidth=1;c.strokeStyle='rgba(255,255,255,.6)';for(let y=1;y<100;y++){if(y%5===0)continue;for(const hy of[.6,22.9,29.9,52.1]){c.beginPath();c.moveTo(X(y),Y(hy));c.lineTo(X(y),Y(hy+.9));c.stroke()}}
 c.strokeStyle='#fff';c.lineWidth=2;c.strokeRect(X(-10),Y(0),120*s,53.33*s);
 for(const gx of[-10,110]){c.strokeStyle='#f5d90a';c.lineWidth=Math.max(2,s*.45);c.beginPath();c.moveTo(X(gx),Y(23.58));c.lineTo(X(gx),Y(29.75));c.stroke();c.beginPath();c.moveTo(X(gx),Y(26.66));c.lineTo(X(gx+(gx<0?-1.6:1.6)),Y(26.66));c.stroke();c.fillStyle='#f5d90a';for(const yy of[23.58,29.75]){c.beginPath();c.arc(X(gx),Y(yy),Math.max(1.5,s*.35),0,7);c.fill()}}
 c.fillStyle='rgba(255,255,255,.92)';c.font=`600 ${s*2.6}px ${S.font==='Graduate'?'Graduate,':''}Oswald,sans-serif`;c.textAlign='center';c.textBaseline='middle';
 for(let y=10;y<100;y+=10){const n=y<=50?y:100-y;c.fillText(n,X(y),Y(9));c.save();c.translate(X(y),Y(44.3));c.rotate(Math.PI);c.fillText(n,0,0);c.restore()}
 if(S.noMid)return;
 const up=home.logo&&img(home.logo),mi=up||(S.mid&&img(S.mid()))||(home.logoBuiltIn&&img(home.logoBuiltIn));
 if(mi&&mi.complete&&mi.naturalWidth){const sz=s*(S.midW?S.midW/(mi.naturalWidth/mi.naturalHeight):10),ar=mi.naturalWidth/mi.naturalHeight;c.globalAlpha=S.mid?1:.6;c.drawImage(mi,X(50)-sz*ar/2,Y(26.66)-sz/2,sz*ar,sz);c.globalAlpha=1}
 else{c.fillStyle='rgba(255,255,255,.18)';c.font=`700 ${s*6}px Oswald,sans-serif`;c.fillText(home.abbr,X(50),Y(26.66))}}

// ---------- night stadium scene (cutscenes / menus) ----------
function drawScene(c,W,H,home,away,t,score,venue){venue=venue||home;const S=stadiumFor(venue),pan=Math.sin(t*.6)*W*.02,hz=H*.6;
 const sky=c.createLinearGradient(0,0,0,hz);sky.addColorStop(0,'#060b1c');sky.addColorStop(1,'#22345e');c.fillStyle=sky;c.fillRect(0,0,W,H);
 for(let i=0;i<40;i++){const x=(i*97.3%1)*W,y=(i*53.7%1)*hz*.6;c.fillStyle=`rgba(255,255,255,${.25+.25*Math.sin(t*2+i)})`;c.fillRect((x+i*37)%W,(y+i*11)%(hz*.55),1.3,1.3)}
 const glow=(x,y,r)=>{const g=c.createRadialGradient(x,y,0,x,y,r);g.addColorStop(0,'rgba(255,246,214,.55)');g.addColorStop(1,'rgba(255,246,214,0)');c.fillStyle=g;c.fillRect(x-r,y-r,2*r,2*r)};
 const tower=(x,top)=>{c.strokeStyle='#3a4256';c.lineWidth=Math.max(2,W*.004);c.beginPath();c.moveTo(x,hz);c.lineTo(x,top);c.stroke();c.fillStyle='#fff8dc';c.fillRect(x-W*.025,top-H*.03,W*.05,H*.03);glow(x,top-H*.015,H*.22)};
 tower(W*.07+pan*.5,H*.1);tower(W*.93+pan*.5,H*.1);
 if(S.backdrop==='clocktower')drawClockTower(c,W*.6+pan,hz,W,H,t);else if(S.backdrop==='fieldhouse')drawFieldHouse(c,W*.6+pan,hz,W,H,venue);else if(S.backdrop==='marian')drawMarian(c,W*.6+pan,hz,W,H);else if(S.backdrop==='carmel')drawCarmel(c,W*.6+pan,hz,W,H);else if(S.backdrop==='dome')drawDome(c,W,hz,H,t);else if(S.backdrop==='cathedral')drawCathedral(c,W*.6+pan,hz,W,H);else if(S.backdrop==='jimtown')drawJimtown(c,W*.6+pan,hz,W,H);else if(S.backdrop==='concord')drawConcord(c,W*.6+pan,hz,W,H);else if(S.backdrop==='sj')drawSJ(c,W*.58+pan,hz,W,H,pan);else if(S.backdrop==='cornfield')drawCornfield(c,W*.55+pan,hz,W,H);else drawGrandstand(c,W*.55+pan,hz,W,H,venue);
 if(!S.farm)drawScoreboard(c,W*.2+pan*.8,hz,W,H,S.board,venue,score);
 // field
 const g=c.createLinearGradient(0,hz,0,H);g.addColorStop(0,'#1d5a2a');g.addColorStop(1,'#2f8a3a');c.fillStyle=g;c.fillRect(0,hz,W,H-hz);
 if(S.track){c.fillStyle=S.track;c.fillRect(0,hz,W,H*.035);c.strokeStyle='rgba(255,255,255,.5)';c.lineWidth=1;for(let i=1;i<4;i++){c.beginPath();c.moveTo(0,hz+H*.035*i/4);c.lineTo(W,hz+H*.035*i/4);c.stroke()}}
 const vpx=W*.5+pan*1.4;c.strokeStyle='rgba(255,255,255,.55)';c.lineWidth=1.2;
 for(let i=1;i<14;i++){const y=hz+(H-hz)*Math.pow(i/14,1.8);c.beginPath();c.moveTo(0,y);c.lineTo(W,y);c.stroke()}
 c.fillStyle='rgba(255,255,255,.9)';c.beginPath();c.moveTo(vpx-W*.01,hz);c.lineTo(vpx+W*.01,hz);c.lineTo(vpx+W*.2,H);c.lineTo(vpx+W*.08,H);c.closePath();c.fill();
 // sideline players
 for(let i=0;i<26;i++){const x=W*.62+i*W*.014+pan*1.2,y=hz+H*.02+(i%3)*2;const tm=i<16?home:away,u=uniformOf(tm,i<16?'home':'away');c.fillStyle=u.pants;c.fillRect(x,y+H*.02,W*.008,H*.016);c.fillStyle=u.jersey;c.fillRect(x-W*.001,y,W*.01,H*.022);c.fillStyle=u.helmet;c.beginPath();c.arc(x+W*.004,y-H*.006,W*.0055,0,7);c.fill()}
 c.fillStyle='rgba(0,0,0,.25)';c.fillRect(0,0,W,H)}
function drawClockTower(c,cx,hz,W,H,t){const bw=W*.66,bh=H*.17,bx=cx-bw/2,by=hz-bh;
 c.fillStyle='#7d3a2c';c.fillRect(bx,by,bw,bh);c.fillStyle='#c9a77c';c.fillRect(bx,by,bw,bh*.07);c.fillRect(bx,by+bh*.46,bw,bh*.04);
 for(const ry of[.17,.58])for(let i=0;i<26;i++){const x=bx+bw*.03+i*bw*.037;if(Math.abs(x-cx)<W*.05)continue;c.fillStyle=(i*7+ry*10)%5<2?'#ffd98a':'#2a2f3a';c.fillRect(x,by+bh*ry,bw*.022,bh*.24)}
 c.fillStyle='#9a4636';for(const s of[-1,1]){const ex=cx+s*bw*.5;c.beginPath();c.moveTo(ex,by+bh*.25);c.lineTo(ex-s*bw*.09,by-bh*.3);c.lineTo(ex-s*bw*.18,by+bh*.25);c.closePath();c.fill();c.fillStyle='#7d3a2c';c.fillRect(ex-s*bw*.18-(s>0?0:0),by+bh*.25,s*bw*.18,bh*.75);c.fillStyle='#9a4636'}
 const tw=W*.075,th=H*.43,tx=cx-tw/2,ty=hz-th;c.fillStyle='#86402f';c.fillRect(tx,ty+th*.42,tw,th*.58);c.fillStyle='#d7b98d';c.fillRect(tx,ty,tw,th*.42);
 for(let i=0;i<5;i++)c.fillRect(tx+i*tw/4.5-tw*.02,ty-th*.04,tw*.12,th*.05);
 c.fillStyle='#1c2130';for(const s of[-1,1]){const wx=cx+s*tw*.2-tw*.08;c.fillRect(wx,ty+th*.24,tw*.16,th*.13);c.beginPath();c.arc(wx+tw*.08,ty+th*.24,tw*.08,Math.PI,0);c.fill()}
 c.fillStyle='#f3efe4';c.beginPath();c.arc(cx,ty+th*.12,tw*.2,0,7);c.fill();c.strokeStyle='#222';c.lineWidth=1.5;c.beginPath();c.moveTo(cx,ty+th*.12);c.lineTo(cx,ty+th*.12-tw*.14);c.moveTo(cx,ty+th*.12);c.lineTo(cx+tw*.1,ty+th*.12+tw*.05);c.stroke();
 c.fillStyle='#ffd98a';for(let r=0;r<3;r++)for(const s of[-1,1])c.fillRect(cx+s*tw*.22-tw*.07,ty+th*(.5+r*.15),tw*.14,th*.08);
 const px=cx+tw*.9;c.strokeStyle='#cfd3da';c.lineWidth=2;c.beginPath();c.moveTo(px,hz);c.lineTo(px,ty+th*.15);c.stroke();
 const fw=W*.045,fh=fw*.55,fy=ty+th*.16;for(let i=0;i<7;i++){c.fillStyle=i%2?'#fff':'#b22234';c.beginPath();for(let k=0;k<=8;k++){const x=px+fw*k/8,w=Math.sin(t*4+k*.8)*fh*.08;k?c.lineTo(x,fy+i*fh/7+w):c.moveTo(x,fy+i*fh/7+w)}for(let k=8;k>=0;k--){const x=px+fw*k/8,w=Math.sin(t*4+k*.8)*fh*.08;c.lineTo(x,fy+(i+1)*fh/7+w)}c.fill()}
 c.fillStyle='#3c3b6e';c.fillRect(px,fy,fw*.4,fh*.54)}
function drawGrandstand(c,cx,hz,W,H,t){const bw=W*.62,bh=H*.2,bx=cx-bw/2;c.fillStyle='#5b6070';c.beginPath();c.moveTo(bx,hz);c.lineTo(bx+bw*.06,hz-bh);c.lineTo(bx+bw*.94,hz-bh);c.lineTo(bx+bw,hz);c.closePath();c.fill();
 c.strokeStyle='rgba(255,255,255,.12)';for(let i=1;i<10;i++){const y=hz-bh*i/10;c.beginPath();c.moveTo(bx+bw*.006*i,y);c.lineTo(bx+bw-bw*.006*i,y);c.stroke()}
 for(let i=0;i<120;i++){c.fillStyle=i%3?t.c1:t.c2;c.fillRect(bx+bw*.08+(i*37%100)/100*bw*.84,hz-bh*.08-(i*13%9)/10*bh*.8,2,2)}
 const pw=bw*.3,ph=bh*.35;c.fillStyle='#3b4050';c.fillRect(cx-pw/2,hz-bh-ph,pw,ph);c.fillStyle=t.c1;c.fillRect(cx-pw/2,hz-bh-ph*.42,pw,ph*.42);
 c.fillStyle='#ffd98a';for(let i=0;i<8;i++)c.fillRect(cx-pw/2+pw*.05+i*pw*.115,hz-bh-ph*.85,pw*.08,ph*.3);
 c.fillStyle=t.c2;c.font=`700 ${ph*.3}px Oswald,sans-serif`;c.textAlign='center';c.textBaseline='middle';c.fillText(t.school.toUpperCase(),cx,hz-bh-ph*.21)}
function drawScoreboard(c,x,hz,W,H,label,home,score){const bw=W*.2,bh=H*.24,top=hz-H*.06-bh;c.fillStyle='#2a2f3a';c.fillRect(x-bw*.3,top+bh,W*.006,H*.06);c.fillRect(x+bw*.3,top+bh,W*.006,H*.06);
 c.fillStyle='#111';c.fillRect(x-bw/2,top,bw,bh);c.fillStyle=home.c1;c.fillRect(x-bw/2,top,bw,bh*.17);
 c.fillStyle=home.c2;c.font=`700 ${bh*.11}px Graduate,Oswald,sans-serif`;c.textAlign='center';c.textBaseline='middle';
 let fs=bh*.11;while(c.measureText(label).width>bw*.94&&fs>6){fs-=1;c.font=`700 ${fs}px Graduate,Oswald,sans-serif`}c.fillText(label,x,top+bh*.09);
 const sg=c.createLinearGradient(0,top+bh*.2,0,top+bh*.62);sg.addColorStop(0,'#1d6f8f');sg.addColorStop(1,'#123b52');c.fillStyle=sg;c.fillRect(x-bw*.45,top+bh*.21,bw*.9,bh*.42);
 const li=home.logo?img(home.logo):home.logoBuiltIn?img(home.logoBuiltIn):null;if(li&&li.complete&&li.naturalWidth){const h=bh*.34,ar=li.naturalWidth/li.naturalHeight;c.drawImage(li,x-h*ar/2,top+bh*.25,h*ar,h)}
 c.fillStyle='#ffb020';c.font=`700 ${bh*.16}px Oswald,sans-serif`;c.fillText((score?score[0]:0)+'',x-bw*.25,top+bh*.8);c.fillText((score?score[1]:0)+'',x+bw*.25,top+bh*.8);
 c.font=`600 ${bh*.07}px Oswald,sans-serif`;c.fillStyle='#ccc';c.fillText('HOME',x-bw*.25,top+bh*.68);c.fillText('GUEST',x+bw*.25,top+bh*.68)}

function drawFieldHouse(c,cx,hz,W,H,t){const bw=W*.78,bh=H*.15,bx=cx-bw/2,by=hz-bh;
 c.fillStyle='#5f5650';c.fillRect(bx,by,bw,bh);c.fillStyle='#d9d4c8';c.fillRect(bx,by,bw,bh*.09);c.fillRect(bx,by+bh*.78,bw,bh*.05);
 for(let i=0;i<=12;i++){const x=bx+i*bw/12-W*.006;c.fillStyle='#4f4741';c.fillRect(x,by-bh*.12,W*.012,bh*1.12);c.fillStyle='#d9d4c8';c.fillRect(x,by-bh*.12,W*.012,bh*.06);
  c.fillStyle='#fff3c4';c.fillRect(x+W*.002,by+bh*.25,W*.008,bh*.08)}
 for(let i=0;i<12;i++){if(i===5||i===6)continue;const x=bx+i*bw/12+bw*.025;c.fillStyle=i%3?'#2a2f3a':'#ffd98a';c.fillRect(x,by+bh*.38,bw*.03,bh*.32);c.fillRect(x+bw*.037,by+bh*.38,bw*.012,bh*.32)}
 const aw=bw*.22,ah=bh*.75,ax=cx-aw/2,ay=by-ah*.55;c.fillStyle='#4f4741';c.fillRect(ax-W*.008,ay+ah*.2,W*.016,bh+ah*.4);c.fillRect(ax+aw-W*.008,ay+ah*.2,W*.016,bh+ah*.4);
 c.fillStyle='#d9d1bd';c.beginPath();c.moveTo(ax,by+bh*.05);c.lineTo(ax,ay+ah*.35);c.quadraticCurveTo(cx,ay-ah*.15,ax+aw,ay+ah*.35);c.lineTo(ax+aw,by+bh*.05);c.closePath();c.fill();
 c.fillStyle='#232733';c.font=`700 ${ah*.32}px Graduate,Oswald,sans-serif`;c.textAlign='center';c.textBaseline='middle';let fs=ah*.32;while(c.measureText('PENN KINGSMEN').width>aw*.9){fs--;c.font=`700 ${fs}px Graduate,Oswald,sans-serif`}c.fillText('PENN KINGSMEN',cx,ay+ah*.6);
 c.fillStyle='#ffe7a8';c.fillRect(cx-aw*.42,by+bh*.4,aw*.38,bh*.38);c.fillRect(cx+aw*.04,by+bh*.4,aw*.38,bh*.38);c.strokeStyle='#3a3f4a';c.lineWidth=1;for(let i=1;i<6;i++){c.beginPath();c.moveTo(cx-aw*.42+i*aw*.076,by+bh*.4);c.lineTo(cx-aw*.42+i*aw*.076,by+bh*.78);c.stroke();c.beginPath();c.moveTo(cx+aw*.04+i*aw*.076,by+bh*.4);c.lineTo(cx+aw*.04+i*aw*.076,by+bh*.78);c.stroke()}
 const sh=img(IMG_PENN_SHIELD);if(sh&&sh.complete&&sh.naturalWidth){const h=bh*.6,ar=sh.naturalWidth/sh.naturalHeight;c.drawImage(sh,bx+bw*.12-h*ar/2,by+bh*.12,h*ar,h);c.drawImage(sh,bx+bw*.88-h*ar/2,by+bh*.12,h*ar,h)}
 c.fillStyle='#e8e4da';c.fillRect(bx-W*.01,hz-bh*.12,bw+W*.02,bh*.12);c.strokeStyle='#8a8f96';for(let x=bx;x<bx+bw;x+=W*.01){c.beginPath();c.moveTo(x,hz-bh*.12);c.lineTo(x,hz);c.stroke()}}

function drawMarian(c,cx,hz,W,H){const bw=W*.72,bh=H*.17,bx=cx-bw/2,by=hz-bh;
 c.fillStyle='#a8957a';c.fillRect(bx,by,bw,bh);c.strokeStyle='rgba(0,0,0,.12)';c.lineWidth=1;for(let y=by+4;y<hz;y+=4){c.beginPath();c.moveTo(bx,y);c.lineTo(bx+bw,y);c.stroke()}
 c.fillStyle='#1d55c4';c.fillRect(bx+bw*.55,by-bh*.08,bw*.45,bh*.2);c.fillStyle='#e9edf2';c.fillRect(bx+bw*.55,by-bh*.12,bw*.45,bh*.05);
 for(let i=0;i<7;i++){const x=bx+bw*.58+i*bw*.06;c.fillStyle=i%2?'#2a2f3a':'#ffd98a';c.fillRect(x,by+bh*.25,bw*.045,bh*.22)}
 const pw=bw*.16,px=bx+bw*.3,ph=bh*1.35;c.fillStyle='#2a63d4';c.fillRect(px,hz-ph,pw,ph*.78);c.fillStyle='#e9edf2';c.fillRect(px-W*.004,hz-ph-H*.01,pw+W*.008,H*.012);
 c.fillStyle='#fff';c.fillRect(px+pw/2-pw*.03,hz-ph+ph*.12,pw*.06,ph*.48);c.fillRect(px+pw/2-pw*.2,hz-ph+ph*.25,pw*.4,pw*.06);
 c.fillStyle='#cfd6de';c.fillRect(px+pw*.12,hz-ph*.2,pw*.76,ph*.2);c.strokeStyle='#59616c';for(let i=1;i<4;i++){c.beginPath();c.moveTo(px+pw*.12+i*pw*.19,hz-ph*.2);c.lineTo(px+pw*.12+i*pw*.19,hz);c.stroke()}
 for(let i=0;i<3;i++){const x=bx+bw*.04+i*bw*.08;c.fillStyle='#2a2f3a';c.fillRect(x,by+bh*.3,bw*.05,bh*.25)}
 // aluminum bleachers in front
 c.fillStyle='#b9c0c8';c.beginPath();c.moveTo(bx+bw*.05,hz);c.lineTo(bx+bw*.12,hz-bh*.45);c.lineTo(bx+bw*.88,hz-bh*.45);c.lineTo(bx+bw*.95,hz);c.closePath();c.fill();
 c.strokeStyle='rgba(60,70,80,.5)';for(let i=1;i<6;i++){const y=hz-bh*.45*i/6;c.beginPath();c.moveTo(bx+bw*.06+i*bw*.01,y);c.lineTo(bx+bw*.94-i*bw*.01,y);c.stroke()}
 for(let i=0;i<70;i++){c.fillStyle=i%3?'#1d55c4':'#ffffff';c.fillRect(bx+bw*.14+(i*37%100)/100*bw*.72,hz-bh*.05-(i*13%9)/10*bh*.38,2,2)}
 const sh=img(IMG_MAR_SHIELD);if(sh&&sh.complete&&sh.naturalWidth){const h=bh*.5,ar=sh.naturalWidth/sh.naturalHeight;c.drawImage(sh,bx+bw*.47-h*ar/2,by+bh*.02,h*ar,h)}}

function drawSJ(c,cx,hz,W,H,pan){// South Bend skyline behind, brick buildings with blue roofs, blue bleachers
 const sk=[[.30,.10,.30],[.38,.06,.2],[.45,.08,.26],[.53,.05,.44],[.585,.035,.16],[.63,.09,.22],[.74,.05,.18],[.80,.07,.24],[.9,.06,.15]];
 for(const [x,w,h] of sk){const bx=x*W+pan*.3,bh=H*h;c.fillStyle='#1b2236';c.fillRect(bx,hz-H*.12-bh,w*W,bh+H*.12);c.fillStyle='rgba(255,217,138,.55)';
  for(let yy=hz-H*.12-bh+6;yy<hz-H*.12;yy+=7)for(let xx=bx+4;xx<bx+w*W-4;xx+=7)if((xx*7+yy*3)%11<4)c.fillRect(xx,yy,2.5,3)}
 c.strokeStyle='#cfd3da';c.lineWidth=1.5;c.beginPath();c.moveTo(.555*W+pan*.3,hz-H*.12-H*.44);c.lineTo(.555*W+pan*.3,hz-H*.12-H*.5);c.stroke();
 const bld=(x,w,h)=>{const bx=x*W+pan,bw=w*W,bh=H*h;c.fillStyle='#8a4334';c.fillRect(bx,hz-bh,bw,bh);c.fillStyle='#2f7fe0';c.beginPath();c.moveTo(bx-bw*.04,hz-bh);c.lineTo(bx+bw*.5,hz-bh-bh*.45);c.lineTo(bx+bw*1.04,hz-bh);c.closePath();c.fill();
  c.fillStyle='#d9d4c8';c.fillRect(bx+bw*.2,hz-bh*.55,bw*.22,bh*.55);c.fillRect(bx+bw*.58,hz-bh*.55,bw*.22,bh*.55)};
 bld(.36,.11,.08);bld(.52,.12,.09);bld(.70,.11,.08);
 const bx=W*.06+pan,bw=W*.22,bh=H*.09;c.fillStyle='#4a7fc0';c.beginPath();c.moveTo(bx,hz);c.lineTo(bx+bw*.08,hz-bh);c.lineTo(bx+bw,hz-bh);c.lineTo(bx+bw,hz);c.closePath();c.fill();
 c.strokeStyle='rgba(255,255,255,.35)';for(let i=1;i<5;i++){const y=hz-bh*i/5;c.beginPath();c.moveTo(bx+bw*.016*i,y);c.lineTo(bx+bw,y);c.stroke()}
 const lg=img(IMG_SJ_LOGO);if(lg&&lg.complete&&lg.naturalWidth){const h=H*.1,ar=lg.naturalWidth/lg.naturalHeight;c.drawImage(lg,W*.885+pan-h*ar/2,hz-h-H*.02,h*ar,h)}}

function drawConcord(c,cx,hz,W,H){// brick field house with dark gable roof, round Minuteman badge, CONCORD MINUTEMEN lettering; aluminum stands
 const sb=W*.2,sh=H*.08,sx=cx-W*.42;c.fillStyle='#c4cad1';c.beginPath();c.moveTo(sx,hz);c.lineTo(sx+sb*.1,hz-sh);c.lineTo(sx+sb,hz-sh);c.lineTo(sx+sb,hz);c.closePath();c.fill();
 c.fillStyle='#1E9E50';c.fillRect(sx+sb*.1,hz-sh-H*.012,sb*.9,H*.012);
 const bw=W*.46,bh=H*.13,bx=cx-bw/2+W*.06,by=hz-bh;c.fillStyle='#5a3a2e';c.fillRect(bx,by,bw,bh);
 c.strokeStyle='rgba(0,0,0,.15)';c.lineWidth=1;for(let y=by+4;y<hz;y+=4){c.beginPath();c.moveTo(bx,y);c.lineTo(bx+bw,y);c.stroke()}
 c.fillStyle='#3a3433';c.beginPath();c.moveTo(bx-bw*.03,by);c.lineTo(bx+bw*.25,by-bh*.55);c.lineTo(bx+bw*.75,by-bh*.55);c.lineTo(bx+bw*1.03,by);c.closePath();c.fill();
 c.fillStyle='#5a3a2e';c.beginPath();c.moveTo(bx+bw*.32,by);c.lineTo(bx+bw*.5,by-bh*.78);c.lineTo(bx+bw*.68,by);c.closePath();c.fill();
 c.strokeStyle='#3a3433';c.lineWidth=W*.006;c.beginPath();c.moveTo(bx+bw*.3,by+2);c.lineTo(bx+bw*.5,by-bh*.82);c.lineTo(bx+bw*.7,by+2);c.stroke();
 const b=img(IMG_CON_BADGE);if(b&&b.complete&&b.naturalWidth){const h=bh*.6;c.drawImage(b,bx+bw*.5-h/2,by-bh*.42,h,h)}
 c.fillStyle='#f2f2f2';c.font=`700 ${bh*.2}px Oswald,sans-serif`;c.textAlign='center';c.textBaseline='middle';let fs=bh*.2;while(c.measureText('CONCORD MINUTEMEN').width>bw*.6){fs--;c.font=`700 ${fs}px Oswald,sans-serif`}c.fillText('CONCORD MINUTEMEN',bx+bw*.5,by+bh*.45);
 c.fillStyle='#2a2f3a';for(let i=0;i<4;i++){c.fillRect(bx+bw*.06+i*bw*.06,by+bh*.62,bw*.04,bh*.3);c.fillRect(bx+bw*.72+i*bw*.06,by+bh*.62,bw*.04,bh*.3)}
 c.strokeStyle='rgba(200,205,210,.5)';c.lineWidth=1;for(let x=bx-W*.05;x<bx+bw+W*.05;x+=W*.012){c.beginPath();c.moveTo(x,hz-H*.03);c.lineTo(x,hz);c.stroke()}c.beginPath();c.moveTo(bx-W*.05,hz-H*.03);c.lineTo(bx+bw+W*.05,hz-H*.03);c.stroke()}

// ---------- UNIFORMS ----------
const UNIFORMS={
 MISH:{home:{jersey:'#6E1F2E',num:'#FFFFFF',trim:'#FFFFFF',word:'CAVEMEN',pants:'#FFFFFF',pstripe:'#6E1F2E',helmet:'#FFFFFF',hstripe:'#6E1F2E',hlogo:()=>IMG_M,socks:'#141414',belt:'#141414'},
       away:{jersey:'#FFFFFF',num:'#6E1F2E',trim:'#6E1F2E',word:'MISHAWAKA',pants:'#FFFFFF',pstripe:'#6E1F2E',helmet:'#FFFFFF',hstripe:'#6E1F2E',hlogo:()=>IMG_M,socks:'#141414',belt:'#141414'},
       // playoffs: all white, white numbers outlined in maroon (the 2012 look)
       playoff:{jersey:'#FFFFFF',num:'#FFFFFF',numOut:'#6E1F2E',trim:'#6E1F2E',word:'MISHAWAKA',pants:'#FFFFFF',pstripe:'#6E1F2E',helmet:'#FFFFFF',hstripe:'#6E1F2E',hlogo:()=>IMG_M,socks:'#FFFFFF',belt:'#6E1F2E'}},
 JIM:{home:{jersey:'#6B1E2E',num:'#FFFFFF',numOut:'#C2A869',trim:'#C2A869',word:'',pants:'#C9B27A',pstripe:'#6B1E2E',pstripe2:'#FFFFFF',helmet:'#B8985A',hstripe:null,hlogo:()=>IMG_JIM_J,socks:'#6B1E2E',belt:'#141414'},
      away:{jersey:'#FFFFFF',num:'#6B1E2E',numOut:'#C2A869',trim:'#6B1E2E',word:'JIMTOWN',pants:'#FFFFFF',pstripe:'#6B1E2E',helmet:'#B8985A',hstripe:null,hlogo:()=>IMG_JIM_J,socks:'#FFFFFF',belt:'#C2A869'}},
 CARMEL:{home:{jersey:'#1F5BB8',num:'#F7B718',numOut:'#FFFFFF',trim:'#F7B718',word:'CARMEL',pants:'#F7B718',pstripe:'#1F5BB8',helmet:'#F7B718',hstripe:null,hlogo:()=>IMG_CARMEL_C,socks:'#1F5BB8',belt:'#1F5BB8'},
        away:{jersey:'#FFFFFF',num:'#1F5BB8',numOut:'#F7B718',trim:'#1F5BB8',word:'CARMEL',pants:'#FFFFFF',pstripe:'#1F5BB8',pstripe2:'#F7B718',helmet:'#F7B718',hstripe:null,hlogo:()=>IMG_CARMEL_C,socks:'#FFFFFF',belt:'#1F5BB8'}},
 LAP:{home:{jersey:'#F26A1B',num:'#111111',numOut:'#FFFFFF',trim:'#FFFFFF',word:'SLICERS',pants:'#111111',pstripe:'#F26A1B',helmet:'#F26A1B',hstripe:'#111111',hlogo:()=>null,socks:'#111111',belt:'#F26A1B'},
     away:{jersey:'#111111',num:'#F26A1B',numOut:'#FFFFFF',trim:'#FFFFFF',word:'SLICERS',pants:'#111111',pstripe:'#F26A1B',helmet:'#F26A1B',hstripe:'#111111',hlogo:()=>null,socks:'#111111',belt:'#F26A1B'}},
 NP:{home:{jersey:'#1B2A57',num:'#C9A75A',numOut:'#FFFFFF',trim:'#C9A75A',word:'NEW PRAIRIE',pants:'#1B2A57',pstripe:'#C9A75A',helmet:'#B8985A',hstripe:null,hlogo:()=>IMG_NP_COUGAR,socks:'#FFFFFF',belt:'#1B2A57'},
    away:{jersey:'#FFFFFF',num:'#1B2A57',numOut:'#C9A75A',trim:'#1B2A57',word:'NEW PRAIRIE',pants:'#FFFFFF',pstripe:'#1B2A57',pstripe2:'#C9A75A',helmet:'#B8985A',hstripe:null,hlogo:()=>IMG_NP_COUGAR,socks:'#1B2A57',belt:'#1B2A57'}},
 NW:{home:{jersey:'#141414',num:'#D2232A',numOut:'#FFFFFF',trim:'#FFFFFF',word:'NORTHWOOD',pants:'#FFFFFF',pstripe:'#141414',helmet:'#141414',hstripe:'#D2232A',hlogo:()=>IMG_NW_PANTHER,socks:'#141414',belt:'#141414'},
    away:{jersey:'#FFFFFF',num:'#141414',numOut:'#D2232A',trim:'#141414',word:'NORTHWOOD',pants:'#FFFFFF',pstripe:'#141414',helmet:'#141414',hstripe:'#D2232A',hlogo:()=>IMG_NW_PANTHER,socks:'#FFFFFF',belt:'#141414'}},
 NR:{home:{jersey:'#FDBB2F',num:'#1E9447',trim:'#1E9447',word:'RAIDERS',pants:'#FDBB2F',pstripe:'#1E9447',helmet:'#141414',hstripe:'#FDBB2F',hlogo:()=>IMG_NR_N,socks:'#141414',belt:'#141414'},
    away:{jersey:'#FFFFFF',num:'#1E9447',numOut:'#FDBB2F',trim:'#1E9447',word:'RAIDERS',pants:'#FFFFFF',pstripe:'#1E9447',pstripe2:'#FDBB2F',helmet:'#141414',hstripe:'#FDBB2F',hlogo:()=>IMG_NR_N,socks:'#FFFFFF',belt:'#141414'},
    alt:{jersey:'#141414',num:'#1E9447',numOut:'#FDBB2F',trim:'#1E9447',word:'RAIDERS',pants:'#141414',pstripe:'#1E9447',helmet:'#141414',hstripe:'#FDBB2F',hlogo:()=>IMG_NR_N,socks:'#141414',belt:'#141414'}},
 ELK:{home:{jersey:'#1F4FB4',num:'#FFFFFF',numOut:'#C9B26B',trim:'#C9B26B',word:'ELKHART',pants:'#1F4FB4',pstripe:'#C9B26B',helmet:'#C2A869',hstripe:null,hlogo:()=>IMG_ELK_LION,socks:'#1F4FB4',belt:'#1F4FB4'},
     away:{jersey:'#FFFFFF',num:'#1F4FB4',numOut:'#C9B26B',trim:'#1F4FB4',word:'ELKHART',pants:'#FFFFFF',pstripe:'#1F4FB4',helmet:'#1F4FB4',hstripe:null,hlogo:()=>IMG_ELK_LION,socks:'#FFFFFF',belt:'#1F4FB4'}},
 PLY:{home:{jersey:'#D21F2B',num:'#FFFFFF',trim:'#FFFFFF',word:'PLYMOUTH',pants:'#D21F2B',pstripe:'#FFFFFF',helmet:'#FFFFFF',hstripe:'#D21F2B',hlogo:()=>IMG_PLY_P,socks:'#141414',belt:'#FFFFFF'},
     away:{jersey:'#FFFFFF',num:'#D21F2B',trim:'#D21F2B',word:'PLYMOUTH',pants:'#FFFFFF',pstripe:'#D21F2B',helmet:'#FFFFFF',hstripe:'#D21F2B',hlogo:()=>IMG_PLY_P,socks:'#141414',belt:'#D21F2B'}},
 ZION:{home:{jersey:'#14532D',num:'#FFFFFF',numOut:'#B8BEC6',trim:'#FFFFFF',word:'EAGLES',pants:'#141414',pstripe:'#14532D',helmet:'#B8BEC6',hstripe:'#14532D',hlogo:()=>IMG_ZION_EAGLE,socks:'#141414',belt:'#141414'},
      away:{jersey:'#FFFFFF',num:'#14532D',numOut:'#B8BEC6',trim:'#14532D',word:'EAGLES',pants:'#FFFFFF',pstripe:'#14532D',helmet:'#B8BEC6',hstripe:'#14532D',hlogo:()=>IMG_ZION_EAGLE,socks:'#FFFFFF',belt:'#14532D'}},
 NOB:{home:{jersey:'#141414',num:'#FFFFFF',numOut:'#C2A869',trim:'#C2A869',word:'MILLERS',pants:'#141414',pstripe:'#C2A869',helmet:'#B8985A',hstripe:null,hlogo:()=>IMG_NOB_MILLER,socks:'#141414',belt:'#C2A869'},
     away:{jersey:'#FFFFFF',num:'#141414',numOut:'#C2A869',trim:'#141414',word:'MILLERS',pants:'#C2A869',pstripe:'#141414',helmet:'#B8985A',hstripe:null,hlogo:()=>IMG_NOB_MILLER,socks:'#FFFFFF',belt:'#141414'}},
 BD:{home:{jersey:'#4B2683',num:'#FFFFFF',trim:'#FFFFFF',word:'GIANTS',pants:'#FFFFFF',pstripe:'#4B2683',helmet:'#FFFFFF',hstripe:'#4B2683',hlogo:()=>IMG_BD_SHIELD,socks:'#4B2683',belt:'#4B2683'},
    away:{jersey:'#FFFFFF',num:'#4B2683',trim:'#4B2683',word:'GIANTS',pants:'#FFFFFF',pstripe:'#4B2683',helmet:'#FFFFFF',hstripe:'#4B2683',hlogo:()=>IMG_BD_SHIELD,socks:'#FFFFFF',belt:'#4B2683'}},
 BC:{home:{jersey:'#1F5FD1',num:'#FFFFFF',numOut:'#0E2A5C',trim:'#FFFFFF',word:'BISHOP CHATARD',pants:'#FFFFFF',pstripe:'#1F5FD1',helmet:'#FFFFFF',hstripe:'#1F5FD1',hlogo:()=>IMG_BC_TROJAN,socks:'#FFFFFF',belt:'#141414'},
    away:{jersey:'#FFFFFF',num:'#1F5FD1',numOut:'#0E2A5C',trim:'#1F5FD1',word:'BISHOP CHATARD',pants:'#FFFFFF',pstripe:'#1F5FD1',helmet:'#FFFFFF',hstripe:'#1F5FD1',hlogo:()=>IMG_BC_TROJAN,socks:'#FFFFFF',belt:'#141414'}},
 CATH:{home:{jersey:'#14254F',num:'#C9A75A',numOut:'#FFFFFF',trim:'#C9A75A',word:'IRISH',pants:'#C9A75A',pstripe:'#14254F',helmet:'#C2A869',hstripe:'#14254F',hlogo:()=>IMG_CATH_C,socks:'#14254F',belt:'#14254F'},
      away:{jersey:'#FFFFFF',num:'#14254F',numOut:'#C9A75A',trim:'#14254F',word:'IRISH',pants:'#C9A75A',pstripe:'#14254F',helmet:'#C2A869',hstripe:'#14254F',hlogo:()=>IMG_CATH_C,socks:'#FFFFFF',belt:'#14254F'}},
 WC:{home:{jersey:'#111111',num:'#C5A862',numOut:'#FFFFFF',trim:'#C5A862',word:'WARREN',pants:'#111111',pstripe:'#C5A862',helmet:'#111111',hstripe:'#C5A862',hlogo:()=>IMG_WC_WGOLD,socks:'#111111',belt:'#C5A862'},
      away:{jersey:'#C5A862',num:'#111111',numOut:'#FFFFFF',trim:'#111111',word:'WARREN',pants:'#111111',pstripe:'#C5A862',helmet:'#111111',hstripe:'#C5A862',hlogo:()=>IMG_WC_WGOLD,socks:'#111111',belt:'#111111'}},
 CP:{home:{jersey:'#C8102E',num:'#FFFFFF',numOut:'#111111',trim:'#FFFFFF',word:'BULLDOGS',pants:'#FFFFFF',pstripe:'#C8102E',pstripe2:'#111111',helmet:'#C8102E',hstripe:'#FFFFFF',hlogo:()=>IMG_CP_DOG,socks:'#C8102E',belt:'#111111'},
      away:{jersey:'#FFFFFF',num:'#C8102E',numOut:'#111111',trim:'#C8102E',word:'BULLDOGS',pants:'#C8102E',pstripe:'#FFFFFF',pstripe2:'#111111',helmet:'#C8102E',hstripe:'#FFFFFF',hlogo:()=>IMG_CP_DOG,socks:'#FFFFFF',belt:'#111111'}},
 MERR:{home:{jersey:'#4B2E83',num:'#FFFFFF',numOut:'#111111',trim:'#FFFFFF',word:'PIRATES',pants:'#FFFFFF',pstripe:'#4B2E83',helmet:'#4B2E83',hstripe:'#FFFFFF',hlogo:()=>IMG_MERR_M,socks:'#4B2E83',belt:'#111111'},
      away:{jersey:'#FFFFFF',num:'#4B2E83',numOut:'#111111',trim:'#4B2E83',word:'PIRATES',pants:'#4B2E83',pstripe:'#FFFFFF',helmet:'#4B2E83',hstripe:'#FFFFFF',hlogo:()=>IMG_MERR_M,socks:'#FFFFFF',belt:'#111111'}},
 WEST:{home:{jersey:'#0F5132',num:'#D4B556',numOut:'#FFFFFF',trim:'#D4B556',word:'ROCKS',pants:'#FFFFFF',pstripe:'#0F5132',pstripe2:'#D4B556',helmet:'#C9A94E',hstripe:'#0F5132',hlogo:()=>IMG_WF_ROCKS,socks:'#0F5132',belt:'#0F5132'},
      away:{jersey:'#FFFFFF',num:'#0F5132',numOut:'#D4B556',trim:'#0F5132',word:'WESTFIELD',pants:'#111111',pstripe:'#D4B556',helmet:'#C9A94E',hstripe:'#0F5132',hlogo:()=>IMG_WF_ROCKS,socks:'#111111',belt:'#111111'}},
 WAR:{home:{jersey:'#111111',num:'#F26B1D',numOut:'#FFFFFF',trim:'#F26B1D',word:'TIGERS',pants:'#111111',pstripe:'#F26B1D',pstripe2:'#FFFFFF',helmet:'#111111',hstripe:null,hlogo:()=>IMG_WAR_TIGER,socks:'#111111',belt:'#111111'},
      // away: the real white set (orange numbers outlined in black, black-and-orange stripes)
      away:{jersey:'#FFFFFF',num:'#F26B1D',numOut:'#111111',trim:'#111111',word:'TIGERS',pants:'#FFFFFF',pstripe:'#F26B1D',pstripe2:'#111111',helmet:'#111111',hstripe:'#F26B1D',hlogo:()=>IMG_WAR_TIGER,socks:'#111111',belt:'#111111'},
      // playoffs: head-to-toe blaze orange with clean black striping
      playoff:{jersey:'#F26B1D',num:'#111111',numOut:'#FFFFFF',trim:'#111111',word:'WARSAW',pants:'#F26B1D',pstripe:'#111111',pstripe2:'#FFFFFF',helmet:'#F26B1D',hstripe:'#111111',hlogo:()=>IMG_WAR_TIGER,socks:'#F26B1D',belt:'#111111'}},
 PORT:{home:{jersey:'#C8102E',num:'#FFFFFF',numOut:null,trim:'#FFFFFF',word:'PORTAGE',pants:'#8A8D91',pstripe:'#C8102E',helmet:'#FFFFFF',hstripe:'#C8102E',hlogo:()=>IMG_BADGE_PORT,socks:'#C8102E',belt:'#C8102E'},
      away:{jersey:'#FFFFFF',num:'#C8102E',numOut:null,trim:'#C8102E',word:'PORTAGE',pants:'#FFFFFF',pstripe:'#C8102E',helmet:'#FFFFFF',hstripe:'#C8102E',hlogo:()=>IMG_BADGE_PORT,socks:'#FFFFFF',belt:'#C8102E'}},
 VAL:{home:{jersey:'#00843D',num:'#FFFFFF',numOut:'#111111',trim:'#111111',word:'VIKINGS',pants:'#111111',pstripe:'#00843D',helmet:'#00843D',hstripe:'#FFFFFF',hlogo:()=>IMG_VAL_VIKING,socks:'#111111',belt:'#111111'},
      away:{jersey:'#111111',num:'#00843D',numOut:'#FFFFFF',trim:'#00843D',word:'VALPARAISO',pants:'#111111',pstripe:'#00843D',helmet:'#00843D',hstripe:'#FFFFFF',hlogo:()=>IMG_VAL_VIKING,socks:'#111111',belt:'#111111'}},
 LC:{home:{jersey:'#1F4FD1',num:'#FFFFFF',numOut:'#111111',trim:'#FFFFFF',word:'INDIANS',pants:'#FFFFFF',pstripe:'#1F4FD1',helmet:'#1F4FD1',hstripe:'#FFFFFF',hlogo:()=>IMG_LC_LOGO,socks:'#1F4FD1',belt:'#111111'},
      away:{jersey:'#FFFFFF',num:'#1F4FD1',numOut:'#111111',trim:'#1F4FD1',word:'INDIANS',pants:'#1F4FD1',pstripe:'#FFFFFF',helmet:'#1F4FD1',hstripe:'#FFFFFF',hlogo:()=>IMG_LC_LOGO,socks:'#FFFFFF',belt:'#111111'}},
 MC:{home:{jersey:'#1B365D',num:'#FFFFFF',numOut:'#B9BEC6',trim:'#FFFFFF',word:'WOLVES',pants:'#FFFFFF',pstripe:'#1B365D',helmet:'#FFFFFF',hstripe:'#1B365D',hlogo:()=>IMG_MC_WOLF,socks:'#1B365D',belt:'#1B365D'},
      away:{jersey:'#FFFFFF',num:'#1B365D',numOut:'#B9BEC6',trim:'#1B365D',word:'WOLVES',pants:'#1B365D',pstripe:'#FFFFFF',helmet:'#FFFFFF',hstripe:'#1B365D',hlogo:()=>IMG_MC_WOLF,socks:'#FFFFFF',belt:'#1B365D'}},
 RONC:{home:{jersey:'#D22630',num:'#FFFFFF',numOut:'#1F4FBF',trim:'#1F4FBF',word:'ROYALS',pants:'#1F4FBF',pstripe:'#D22630',pstripe2:'#FFFFFF',helmet:'#D9DCE1',hstripe:'#D22630',hlogo:()=>IMG_RON_R,socks:'#1F4FBF',belt:'#111111'},
      away:{jersey:'#1F4FBF',num:'#FFFFFF',numOut:'#D22630',trim:'#D22630',word:'ROYALS',pants:'#FFFFFF',pstripe:'#D22630',pstripe2:'#1F4FBF',helmet:'#D9DCE1',hstripe:'#D22630',hlogo:()=>IMG_RON_R,socks:'#1F4FBF',belt:'#111111'}},
 CARR:{home:{jersey:'#1F4FBF',num:'#FFFFFF',numOut:'#0E2A6B',trim:'#B8BEC6',word:'CHARGERS',pants:'#B8BEC6',pstripe:'#1F4FBF',helmet:'#B8BEC6',hstripe:'#1F4FBF',hlogo:()=>IMG_CARR_C,socks:'#1F4FBF',belt:'#111111'},
      away:{jersey:'#FFFFFF',num:'#1F4FBF',numOut:'#0E2A6B',trim:'#1F4FBF',word:'CARROLL',pants:'#B8BEC6',pstripe:'#1F4FBF',helmet:'#B8BEC6',hstripe:'#1F4FBF',hlogo:()=>IMG_CARR_C,socks:'#FFFFFF',belt:'#111111'}},
 BDW:{home:{jersey:'#14254F',num:'#C9A75A',numOut:'#FFFFFF',trim:'#C9A75A',word:'SAINTS',pants:'#C9A75A',pstripe:'#14254F',helmet:'#C9A75A',hstripe:'#14254F',hlogo:()=>IMG_BDW_BD,socks:'#14254F',belt:'#14254F'},
      away:{jersey:'#FFFFFF',num:'#14254F',numOut:'#C9A75A',trim:'#14254F',word:'SAINTS',pants:'#C9A75A',pstripe:'#14254F',helmet:'#C9A75A',hstripe:'#14254F',hlogo:()=>IMG_BDW_BD,socks:'#FFFFFF',belt:'#14254F'}},
 AND:{// home: the scarlet claw set
      home:{jersey:'#CC1F2D',num:'#111111',numOut:'#FFFFFF',trim:'#111111',word:'RAPTORS',pants:'#CC1F2D',pstripe:'#111111',pstripe2:'#FFFFFF',helmet:'#111111',hstripe:'#CC1F2D',hlogo:()=>IMG_AND_A,socks:'#111111',belt:'#111111'},
      // away: white with scarlet numbers outlined in black, worn with scarlet pants
      away:{jersey:'#FFFFFF',num:'#CC1F2D',numOut:'#111111',trim:'#111111',word:'RAPTORS',pants:'#CC1F2D',pstripe:'#111111',pstripe2:'#FFFFFF',helmet:'#111111',hstripe:'#CC1F2D',hlogo:()=>IMG_AND_A,socks:'#111111',belt:'#111111'},
      // playoffs: black claw set, scarlet V-neck, white numbers outlined in scarlet, scarlet claw stripes down the leg
      playoff:{jersey:'#141414',num:'#FFFFFF',numOut:'#CC1F2D',trim:'#CC1F2D',word:'RAPTORS',pants:'#141414',pstripe:'#CC1F2D',pstripe2:'#FFFFFF',helmet:'#111111',hstripe:'#CC1F2D',hlogo:()=>IMG_AND_A,socks:'#141414',belt:'#CC1F2D'}},
 EC:{home:{jersey:'#111111',num:'#F2C200',numOut:'#FFFFFF',trim:'#F2C200',word:'HORNETS',pants:'#F2C200',pstripe:'#111111',helmet:'#111111',hstripe:'#F2C200',hlogo:()=>IMG_EC_LOGO,socks:'#111111',belt:'#111111'},
      away:{jersey:'#FFFFFF',num:'#111111',numOut:'#F2C200',trim:'#111111',word:'HORNETS',pants:'#111111',pstripe:'#F2C200',helmet:'#111111',hstripe:'#F2C200',hlogo:()=>IMG_EC_LOGO,socks:'#FFFFFF',belt:'#111111'}},
 PENN:{home:{jersey:'#141414',num:'#C9B262',numOut:'#FFFFFF',trim:'#C9B262',word:'',pants:'#CDBB82',pstripe:'#141414',pstripe2:'#FFFFFF',helmet:'#B89D57',hstripe:null,hlogo:()=>IMG_PENN_SCRIPT,socks:'#141414',belt:'#141414'},
       away:{jersey:'#FFFFFF',num:'#141414',numOut:'#C9B262',trim:'#141414',word:'KINGSMEN',pants:'#CDBB82',pstripe:'#141414',pstripe2:'#FFFFFF',helmet:'#B89D57',hstripe:null,hlogo:()=>IMG_PENN_SCRIPT,socks:'#141414',belt:'#141414'}},
};
function uniformOf(t,side){const u=UNIFORMS[t.id]&&UNIFORMS[t.id][side];if(u)return u;
 return side==='home'?{jersey:t.c1,num:t.c2,trim:t.c2,word:t.name.toUpperCase(),pants:t.c2==='#FFFFFF'?'#FFFFFF':t.c1,pstripe:t.c1,helmet:t.c1,hstripe:t.c2,hlogo:()=>t.logoBuiltIn,socks:t.c1,belt:'#141414',generic:true}
  :{jersey:'#FFFFFF',num:t.c1,trim:t.c1,word:t.school.toUpperCase(),pants:'#FFFFFF',pstripe:t.c1,helmet:t.c1,hstripe:t.c2,hlogo:()=>t.logoBuiltIn,socks:t.c1,belt:'#141414',generic:true}}
function drawUniform(c,cx,top,h,u,num){const s=h/100;c.save();c.translate(cx,top);c.scale(s,s);c.lineJoin='round';
 // legs + socks + shoes
 c.fillStyle=u.socks;c.fillRect(-15,80,10,14);c.fillRect(5,80,10,14);c.fillStyle='#e9e9e9';c.fillRect(-16,93,12,4);c.fillRect(4,93,12,4);
 // pants
 c.fillStyle=u.pants;c.beginPath();c.moveTo(-19,54);c.lineTo(19,54);c.lineTo(17,82);c.lineTo(3,82);c.lineTo(0,64);c.lineTo(-3,82);c.lineTo(-17,82);c.closePath();c.fill();c.strokeStyle='rgba(0,0,0,.25)';c.lineWidth=.8;c.stroke();
 if(u.pstripe2){c.strokeStyle=u.pstripe2;c.lineWidth=4.2;c.beginPath();c.moveTo(-18.5,56);c.lineTo(-16.5,81);c.stroke();c.beginPath();c.moveTo(18.5,56);c.lineTo(16.5,81);c.stroke()}
 if(u.pstripe){c.strokeStyle=u.pstripe;c.lineWidth=1.6;for(const d of(u.pstripe2?[0]:[-1.3,1.3])){c.beginPath();c.moveTo(-18.5+d,56);c.lineTo(-16.5+d,81);c.stroke();c.beginPath();c.moveTo(18.5+d,56);c.lineTo(16.5+d,81);c.stroke()}}
 c.fillStyle=u.belt;c.fillRect(-19,53,38,3);
 // jersey body + sleeves
 c.fillStyle=u.jersey;c.beginPath();c.moveTo(-14,20);c.lineTo(-28,24);c.lineTo(-31,40);c.lineTo(-21,42);c.lineTo(-19,55);c.lineTo(19,55);c.lineTo(21,42);c.lineTo(31,40);c.lineTo(28,24);c.lineTo(14,20);c.quadraticCurveTo(0,27,-14,20);c.closePath();c.fill();c.strokeStyle='rgba(0,0,0,.3)';c.lineWidth=.8;c.stroke();
 c.strokeStyle=u.trim;c.lineWidth=1.5;for(const sx of[-1,1]){c.beginPath();c.moveTo(sx*26,25);c.lineTo(sx*29,39);c.stroke();c.beginPath();c.moveTo(sx*23,24);c.lineTo(sx*26,40);c.stroke()}
 c.fillStyle=u.trim;c.beginPath();c.moveTo(-8,21.5);c.quadraticCurveTo(0,27,8,21.5);c.lineTo(5,21);c.quadraticCurveTo(0,24.5,-5,21);c.closePath();c.fill();
 // arms
 c.fillStyle='#c99a7a';c.fillRect(-31,40,8,12);c.fillRect(23,40,8,12);
 // wordmark + number
 c.fillStyle=u.num;c.textAlign='center';c.textBaseline='middle';c.font='700 4.6px Oswald,"Arial Narrow",sans-serif';c.fillText(u.word,0,29.5);
 c.font='700 19px Oswald,"Arial Narrow",sans-serif';if(u.numOut){c.lineWidth=1.6;c.strokeStyle=u.numOut;c.strokeText(String(num??10),0,42.5)}c.fillText(String(num??10),0,42.5);
 // helmet
 c.fillStyle=u.helmet;c.beginPath();c.ellipse(0,9,11,11.5,0,0,7);c.fill();c.strokeStyle='rgba(0,0,0,.35)';c.lineWidth=.8;c.stroke();
 if(u.hstripe){c.fillStyle=u.hstripe;c.fillRect(-2.2,-2.4,4.4,8)}
 c.strokeStyle='#8d949c';c.lineWidth=1.4;c.beginPath();c.moveTo(-8,12);c.lineTo(8,12);c.moveTo(-7,15.5);c.lineTo(7,15.5);c.moveTo(0,12);c.lineTo(0,19);c.stroke();
 const li=u.hlogo&&img(u.hlogo());if(li&&li.complete&&li.naturalWidth){const lh=6.5,ar=li.naturalWidth/li.naturalHeight,lw=Math.min(12,lh*ar);c.drawImage(li,-lw/2,3.2,lw,lw/ar)}
 c.restore()}

function drawJimtown(c,cx,hz,W,H){// white press box over maroon/gray grandstand, tan brick 'Big J' building, Sharpe Stadium sign
 const gw=W*.5,gh=H*.12,gx=cx-gw/2-W*.05;c.fillStyle='#8a8f96';c.beginPath();c.moveTo(gx,hz);c.lineTo(gx+gw*.05,hz-gh);c.lineTo(gx+gw*.95,hz-gh);c.lineTo(gx+gw,hz);c.closePath();c.fill();
 for(let i=1;i<9;i++){const y=hz-gh*i/9;c.strokeStyle=i%2?'#6B1E2E':'#b4b8bd';c.lineWidth=2;c.beginPath();c.moveTo(gx+gw*.006*i,y);c.lineTo(gx+gw-gw*.006*i,y);c.stroke()}
 for(let i=0;i<90;i++){c.fillStyle=i%3?'#6B1E2E':'#C2A869';c.fillRect(gx+gw*.08+(i*37%100)/100*gw*.84,hz-gh*.1-(i*13%9)/10*gh*.8,2,2)}
 const pw=gw*.62,ph=gh*.62,px=gx+gw*.19,py=hz-gh-ph;c.fillStyle='#eef0f2';c.fillRect(px,py,pw,ph);c.fillStyle='#6B1E2E';c.fillRect(px,py,pw,ph*.1);c.fillRect(px,py+ph*.95,pw,ph*.05);
 c.fillStyle='#6B1E2E';c.font=`700 ${ph*.26}px Oswald,sans-serif`;c.textAlign='center';c.textBaseline='middle';c.fillText('JIMTOWN JIMMIES',px+pw/2,py+ph*.33);
 c.fillStyle='#ffe7a8';for(let i=0;i<6;i++)c.fillRect(px+pw*.05+i*pw*.155,py+ph*.55,pw*.13,ph*.3);
 const bw=W*.22,bh=H*.16,bx=cx+W*.2,by=hz-bh;c.fillStyle='#c9ab82';c.fillRect(bx,by,bw,bh);c.fillStyle='#6b6a6e';c.fillRect(bx-W*.005,by-H*.015,bw+W*.01,H*.018);
 const jj=img(IMG_JIM_J);if(jj&&jj.complete&&jj.naturalWidth){const h=bh*.66,ar=jj.naturalWidth/jj.naturalHeight;c.drawImage(jj,bx+bw/2-h*ar/2,by+bh*.06,h*ar,h)}
 const sx=cx-W*.42,sw=W*.075,sh=H*.1;c.fillStyle='#4a4d52';c.fillRect(sx+sw*.2,hz-sh*.5,W*.004,sh*.5);c.fillRect(sx+sw*.75,hz-sh*.5,W*.004,sh*.5);
 c.fillStyle='#6B1E2E';c.fillRect(sx,hz-sh*1.25,sw,sh*.8);c.strokeStyle='#fff';c.lineWidth=1.5;c.strokeRect(sx+2,hz-sh*1.25+2,sw-4,sh*.8-4);
 c.fillStyle='#fff';c.font=`700 ${sh*.16}px Oswald,sans-serif`;c.fillText('SHARPE',sx+sw/2,hz-sh*1.05);c.fillText('STADIUM',sx+sw/2,hz-sh*.85);c.font=`600 ${sh*.1}px Oswald,sans-serif`;c.fillText('KNEPP FIELD',sx+sw/2,hz-sh*.6)}

// Lucas Oil Stadium (State finals): indoor dome, steel roof trusses, huge window wall with downtown lights, packed seating bowl.
function drawDome(c,W,hz,H,t){c.fillStyle='#0d1320';c.fillRect(0,0,W,hz);
 c.strokeStyle='#39465c';c.lineWidth=Math.max(1,W*.002);for(let i=0;i<=12;i++){const x=i/12*W;c.beginPath();c.moveTo(x,0);c.lineTo(W/2+(x-W/2)*.55,hz*.28);c.stroke()}
 for(let r=1;r<4;r++){c.beginPath();c.moveTo(0,hz*.07*r);c.quadraticCurveTo(W/2,hz*.07*r+hz*.08,W,hz*.07*r);c.stroke()}
 const wx=W*.28,ww=W*.44,wy=hz*.2,wh=hz*.42;c.fillStyle='#16233d';c.fillRect(wx,wy,ww,wh);
 for(let i=0;i<46;i++){const bx=wx+(i*53%100)/100*ww,bh=wh*(.2+(i*37%60)/100);c.fillStyle='#0a1222';c.fillRect(bx,wy+wh-bh,ww*.03,bh);c.fillStyle='rgba(255,214,120,.55)';for(let k=0;k<4;k++)c.fillRect(bx+ww*.006,wy+wh-bh*(.2+k*.2),ww*.008,wh*.012)}
 c.strokeStyle='#5c6b84';c.lineWidth=Math.max(1,W*.0025);for(let i=0;i<=8;i++){c.beginPath();c.moveTo(wx+ww*i/8,wy);c.lineTo(wx+ww*i/8,wy+wh);c.stroke()}for(let i=0;i<=4;i++){c.beginPath();c.moveTo(wx,wy+wh*i/4);c.lineTo(wx+ww,wy+wh*i/4);c.stroke()}
 const tiers=[[.62,.12,'#1b2333'],[.76,.12,'#202a3d'],[.9,.1,'#263146']];for(const [y,h,col] of tiers){c.fillStyle=col;c.fillRect(0,hz*y,W,hz*h)}
 for(let i=0;i<520;i++){const tr=i%3,y=hz*(.63+tr*.14)+((i*13)%9)/9*hz*.09,x=(i*97.37%W);const cols=['#e8eef7','#f5c542','#c9343a','#3b6fd8','#ffffff'];c.fillStyle=cols[i%5];c.globalAlpha=.55+.35*Math.sin(t*3+i);c.fillRect(x,y,2,2)}c.globalAlpha=1;
 c.fillStyle='#0b2a5b';c.fillRect(0,hz*.6,W,hz*.025);c.fillStyle='#f5c542';c.font=`700 ${hz*.03}px Graduate,Oswald,sans-serif`;c.textAlign='center';c.fillText('STATE CHAMPIONSHIP · LUCAS OIL STADIUM',W/2,hz*.62)}
// Cathedral: hilltop brick campus in the trees, tall white smokestack, flagpole, wooded ridge behind.
function drawCathedral(c,cx,hz,W,H){
 c.fillStyle='#173622';for(let i=0;i<34;i++){const x=(i/33)*W*1.1-W*.05,r=H*(.05+((i*37)%7)/100);c.beginPath();c.arc(x,hz-H*.07-((i*13)%5)*H*.006,r,0,Math.PI*2);c.fill()}
 c.fillStyle='#1f4a2c';for(let i=0;i<26;i++){const x=(i/25)*W*1.1-W*.04,r=H*(.04+((i*29)%6)/100);c.beginPath();c.arc(x,hz-H*.025,r,0,Math.PI*2);c.fill()}
 const bx=cx-W*.26,bw=W*.5,bh=H*.13,by=hz-bh;
 c.fillStyle='#b4704f';c.fillRect(bx,by,bw*.55,bh);c.fillStyle='#c27c5a';c.fillRect(bx+bw*.18,by-bh*.45,bw*.2,bh*.45);
 c.fillStyle='#c98a66';c.fillRect(bx+bw*.55,by+bh*.12,bw*.45,bh*.88);c.fillStyle='#e9edf1';c.fillRect(bx+bw*.52,by+bh*.02,bw*.3,bh*.14);
 c.fillStyle='#7da2c4';c.fillRect(bx+bw*.5,by+bh*.2,bw*.08,bh*.75);
 c.fillStyle='#f2d9a0';for(let r=0;r<3;r++)for(let i=0;i<12;i++){if(i===5)continue;c.fillRect(bx+bw*.02+i*bw*.045,by+bh*(.12+r*.28),bw*.022,bh*.12)}
 for(let r=0;r<2;r++)for(let i=0;i<9;i++)c.fillRect(bx+bw*.6+i*bw*.043,by+bh*(.35+r*.3),bw*.022,bh*.13);
 const sx=bx+bw*.42;c.fillStyle='#eef0f2';c.fillRect(sx,by-bh*1.55,W*.008,bh*1.55);c.fillStyle='#c9ccd0';c.fillRect(sx,by-bh*1.55,W*.008,bh*.08);
 const fx=bx+bw*.98;c.strokeStyle='#d9dde2';c.lineWidth=Math.max(1,W*.002);c.beginPath();c.moveTo(fx,hz);c.lineTo(fx,by-bh*1.2);c.stroke();c.fillStyle='#1F3F9A';c.fillRect(fx,by-bh*1.2,W*.022,H*.022);
 c.fillStyle='#1f4a2c';for(let i=0;i<6;i++){c.beginPath();c.arc(bx-W*.02+i*W*.012,hz-H*.02,H*.045,0,Math.PI*2);c.fill()}
 const lg=img(IMG_CATH_C);if(lg&&lg.complete&&lg.naturalWidth){const h=bh*.42,ar=lg.naturalWidth/lg.naturalHeight;c.drawImage(lg,bx+bw*.62,by+bh*.02-h*.05,h*ar,h)}}
function drawCarmel(c,cx,hz,W,H){
 const gw=W*.46,gh=H*.15,gx=cx-W*.48;c.fillStyle='#8f9399';c.beginPath();c.moveTo(gx,hz);c.lineTo(gx+gw*.06,hz-gh);c.lineTo(gx+gw,hz-gh);c.lineTo(gx+gw,hz);c.closePath();c.fill();
 for(let i=1;i<10;i++){const y=hz-gh*i/10;c.strokeStyle='rgba(255,255,255,.18)';c.beginPath();c.moveTo(gx+gw*.006*i,y);c.lineTo(gx+gw,y);c.stroke()}
 for(let i=0;i<140;i++){c.fillStyle=i%3?'#1F5BB8':'#F7B718';c.fillRect(gx+gw*.08+(i*37%100)/100*gw*.9,hz-gh*.08-(i*13%9)/10*gh*.82,2,2)}
 c.fillStyle='#1F5BB8';c.fillRect(gx+gw*.06,hz-gh*.03,gw*.94,gh*.06);
 const pw=gw*.42,ph=gh*.5,px=gx+gw*.35;c.fillStyle='#d9dde2';c.fillRect(px,hz-gh-ph,pw,ph);c.fillStyle='#ffe7a8';for(let i=0;i<6;i++)c.fillRect(px+pw*.05+i*pw*.155,hz-gh-ph*.75,pw*.12,ph*.4);
 const bw=W*.34,bh=H*.15,bx=cx+W*.04,by=hz-bh;c.fillStyle='#9c4a33';c.fillRect(bx,by,bw,bh);
 c.fillStyle='#4f7fa8';for(let r=0;r<2;r++)for(let i=0;i<8;i++){if(i===3||i===4)continue;c.fillRect(bx+bw*.04+i*bw*.12,by+bh*(.15+r*.42),bw*.09,bh*.3)}
 const aw=bw*.3,ax=bx+bw*.35,ah=bh*1.45;c.fillStyle='#6f9cc4';c.fillRect(ax,hz-ah,aw,ah);c.strokeStyle='rgba(255,255,255,.5)';c.lineWidth=1;for(let i=1;i<6;i++){c.beginPath();c.moveTo(ax+aw*i/6,hz-ah);c.lineTo(ax+aw*i/6,hz);c.stroke();c.beginPath();c.moveTo(ax,hz-ah*i/6);c.lineTo(ax+aw,hz-ah*i/6);c.stroke()}
 c.fillStyle='#c07a52';c.beginPath();c.moveTo(ax-aw*.08,hz-ah);c.quadraticCurveTo(ax+aw/2,hz-ah*1.18,ax+aw*1.08,hz-ah);c.lineTo(ax+aw*1.08,hz-ah*.96);c.quadraticCurveTo(ax+aw/2,hz-ah*1.12,ax-aw*.08,hz-ah*.96);c.closePath();c.fill();
 const lg=img(IMG_CARMEL_C);if(lg&&lg.complete&&lg.naturalWidth){const h=bh*.5,ar=lg.naturalWidth/lg.naturalHeight;c.drawImage(lg,bx+bw*.82-h*ar/2,by+bh*.08,h*ar,h)}}
