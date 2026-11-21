// Original mascot art for the 16 fictional schools (Prairie + River Valley). All drawn here; no outside artwork.
// Each returns an SVG data URI in the team's colors. Style: bold outline sports-logo look.
const FAKE_ART=(()=>{
 const O='#111',W='#ffffff',SKIN='#e2a77c',SKIN2='#c98d66',BONE='#efe6cf',GOLD='#f2b705';
 const wrap=b=>'data:image/svg+xml;charset=utf-8,'+encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><g stroke="${O}" stroke-width="5" stroke-linejoin="round" stroke-linecap="round">${b}</g></svg>`);
 const eye=(x,y,r=7,brow=1,c=W)=>`<ellipse cx="${x}" cy="${y}" rx="${r}" ry="${r*.75}" fill="${c}"/><circle cx="${x+r*.25}" cy="${y}" r="${r*.38}" fill="${O}" stroke="none"/>${brow?`<path d="M${x-r*1.6},${y-r*1.3} L${x+r*1.4},${y-r*.55}" stroke-width="6" fill="none"/>`:''}`;
 const A={
 // RAMS: profile with a big curled horn
 Rams:(c1,c2)=>wrap(`<path d="M62,66 C88,44 128,46 146,66 L178,108 C186,120 180,136 166,138 L144,141 C134,160 112,172 96,166 L80,152 C62,130 56,98 62,66Z" fill="${BONE}"/>
  <path d="M150,118 L176,112" fill="none" stroke-width="3"/><ellipse cx="168" cy="123" rx="4" ry="3" fill="${O}" stroke="none"/><path d="M148,138 C156,134 164,134 170,136" fill="none" stroke-width="3"/>
  <path d="M90,60 C56,36 18,64 28,104 C38,146 96,148 104,110 C110,82 80,72 68,88 C60,100 70,114 82,108" fill="none" stroke="${O}" stroke-width="34"/>
  <path d="M90,60 C56,36 18,64 28,104 C38,146 96,148 104,110 C110,82 80,72 68,88 C60,100 70,114 82,108" fill="none" stroke="${c2}" stroke-width="24"/>
  <path d="M46,62 L56,74 M32,92 L46,96 M40,124 L52,116 M70,138 L72,124 M96,124 L86,118" fill="none" stroke-width="3"/>
  ${eye(126,88,8)}<path d="M96,166 L104,184 L118,170 L126,186 L134,160" fill="${c1}"/>`),
 // MUSTANGS: horse head with flowing mane
 Mustangs:(c1,c2)=>wrap(`<path d="M86,34 C70,40 56,70 52,100 C44,130 34,160 30,186 L92,186 C96,168 106,154 124,148 L158,152 C174,154 188,144 186,130 C184,116 170,104 156,96 L120,52 C112,40 100,30 86,34Z" fill="${c1}"/>
  <path d="M96,40 L98,14 L114,44Z" fill="${c1}"/><path d="M128,64 L176,126 C170,134 162,134 156,128 L120,82Z" fill="${W}" stroke-width="3"/>
  <path d="M86,34 C64,30 50,46 44,60 C58,56 60,60 52,74 C40,88 36,96 38,108 C46,102 50,106 44,120 C34,140 28,150 18,160 C34,160 30,176 22,188 L42,186 C46,150 58,110 72,80 C80,62 86,48 86,34Z" fill="${c2}"/>
  <ellipse cx="172" cy="132" rx="5" ry="4" fill="${O}" stroke="none"/><path d="M150,150 C160,146 170,146 180,140" fill="none" stroke-width="3"/>${eye(116,78,8)}`),
 // COUGARS: front-facing snarl
 Cougars:(c1,c2)=>wrap(`<path d="M46,58 L40,16 L84,40Z M154,58 L160,16 L116,40Z" fill="${c2}"/><path d="M50,44 L48,26 L70,40Z M150,44 L152,26 L130,40Z" fill="${SKIN}" stroke-width="3"/>
  <path d="M100,30 C140,30 172,56 172,96 C172,128 150,160 124,176 L100,184 L76,176 C50,160 28,128 28,96 C28,56 60,30 100,30Z" fill="${c2}"/>
  <path d="M100,96 C126,96 142,116 140,138 C138,160 120,174 100,174 C80,174 62,160 60,138 C58,116 74,96 100,96Z" fill="${BONE}"/>
  <path d="M86,112 L114,112 L100,128Z" fill="${O}"/><path d="M76,142 C88,152 112,152 124,142 L118,164 C108,170 92,170 82,164Z" fill="#8b0d12"/>
  <path d="M82,146 L86,162 L90,148 M118,146 L114,162 L110,148" fill="${W}" stroke-width="3"/>
  <path d="M48,84 L84,92 L80,100 L54,98Z M152,84 L116,92 L120,100 L146,98Z" fill="${GOLD}"/><circle cx="72" cy="94" r="4" fill="${O}" stroke="none"/><circle cx="128" cy="94" r="4" fill="${O}" stroke="none"/>
  <path d="M60,70 C76,62 90,70 100,78 C110,70 124,62 140,70" fill="none" stroke="${c1}" stroke-width="8"/>`),
 // HAWKS: fierce profile, hooked beak
 Hawks:(c1,c2)=>wrap(`<path d="M40,170 C30,120 40,70 80,48 C110,32 148,38 162,62 L150,84 C140,120 120,150 96,176Z" fill="${c1}"/>
  <path d="M28,74 L58,62 L30,98 L56,92 L26,124 L54,116 L34,150 L58,138" fill="${c1}" stroke-linejoin="miter"/>
  <path d="M120,86 C140,70 164,64 184,76 C194,84 194,104 182,118 C176,110 168,106 160,108 L150,120 C136,112 126,100 120,86Z" fill="${GOLD}"/><path d="M160,108 C168,104 178,108 182,118" fill="none" stroke-width="3"/>
  <path d="M88,66 C108,56 132,58 146,70 C130,74 114,80 104,92 C96,84 90,76 88,66Z" fill="${W}" stroke-width="3"/>${eye(126,78,7)}<path d="M100,60 L148,72" stroke-width="7" fill="none" stroke="${c2==='#FFFFFF'?O:c2}"/>`),
 // FALCONS: sleek head with tear-drop mark
 Falcons:(c1,c2)=>wrap(`<path d="M30,180 C26,130 40,80 76,54 C106,32 146,34 164,56 L176,72 C164,72 152,80 148,94 L130,130 C112,160 84,178 60,186Z" fill="${c1}"/>
  <path d="M136,64 C156,58 178,64 190,80 C194,90 190,102 180,108 C176,100 168,96 160,98 L150,100Z" fill="${c2}"/><path d="M160,98 C168,96 176,100 180,108" fill="none" stroke-width="3"/>
  <path d="M100,70 C116,62 136,62 150,70 L148,96 C140,112 130,122 116,128 C108,116 104,100 100,70Z" fill="${W}" stroke-width="3"/>
  <path d="M118,90 C114,104 112,118 116,132 C124,124 128,110 128,96Z" fill="${O}" stroke="none"/>${eye(130,80,7)}
  <path d="M40,120 L70,108 M36,146 L66,134 M44,168 L72,156" stroke="${c2}" stroke-width="5" fill="none"/>`),
 // STORM: cloud and lightning
 Storm:(c1,c2)=>wrap(`<path d="M44,118 C24,118 18,92 36,84 C34,62 58,50 74,62 C82,38 116,32 130,56 C150,46 176,60 172,84 C192,88 190,118 168,118Z" fill="${c1}"/>
  <path d="M62,80 C70,72 80,72 88,78 M110,64 C120,58 132,60 138,70" fill="none" stroke="${W}" stroke-width="4" opacity=".55"/>
  <path d="M104,96 L76,150 L100,146 L84,192 L138,124 L112,128 L130,96Z" fill="${GOLD}"/>
  <path d="M54,130 L44,152 M150,130 L140,152 M164,138 L156,156" stroke="${c1}" stroke-width="6" fill="none"/>`),
 // CRUSADERS: great helm with cross
 Crusaders:(c1,c2)=>wrap(`<path d="M36,190 C40,168 56,156 70,150 L130,150 C144,156 160,168 164,190Z" fill="${c1}"/>
  <path d="M52,40 C52,26 64,18 100,18 C136,18 148,26 148,40 L150,128 C150,144 134,158 100,162 C66,158 50,144 50,128Z" fill="#c9ced6"/>
  <path d="M60,42 C60,32 70,28 100,28 L100,154 C76,152 60,142 60,128Z" fill="#e8ebef" stroke="none"/>
  <path d="M88,30 L112,30 L112,72 L144,72 L144,94 L112,94 L112,158 L88,158 L88,94 L56,94 L56,72 L88,72Z" fill="${c2}"/>
  <path d="M60,82 L86,82 M114,82 L140,82" stroke="${O}" stroke-width="7"/>
  <circle cx="74" cy="118" r="3" fill="${O}" stroke="none"/><circle cx="74" cy="132" r="3" fill="${O}" stroke="none"/><circle cx="126" cy="118" r="3" fill="${O}" stroke="none"/><circle cx="126" cy="132" r="3" fill="${O}" stroke="none"/>`),
 // FRIARS: hooded friar
 Friars:(c1,c2)=>wrap(`<path d="M100,14 C150,16 178,60 176,110 C174,150 160,180 150,192 L50,192 C40,180 26,150 24,110 C22,60 50,16 100,14Z" fill="${c1}"/>
  <path d="M100,48 C130,48 146,72 146,104 C146,138 126,164 100,164 C74,164 54,138 54,104 C54,72 70,48 100,48Z" fill="${SKIN}"/>
  <path d="M60,96 C70,74 130,74 140,96 C130,86 70,86 60,96Z" fill="${SKIN2}" stroke="none"/>
  ${eye(82,104,7,0)}${eye(118,104,7,0)}<path d="M70,92 L92,96 M130,92 L108,96" stroke-width="6" fill="none"/>
  <path d="M100,108 L94,128 L106,128" fill="none" stroke-width="4"/><path d="M84,142 C94,150 108,150 118,142" fill="none" stroke-width="4"/>
  <path d="M62,150 C76,170 124,170 138,150 L134,176 C120,184 80,184 66,176Z" fill="#7a5a3a"/>
  <path d="M100,170 L100,196 M90,182 L110,182" stroke="${c2}" stroke-width="7"/>`),
 // OSPREYS: white head, dark eye stripe
 Ospreys:(c1,c2)=>wrap(`<path d="M34,182 C26,132 40,82 78,56 C108,36 146,38 164,60 L176,78 C164,78 152,86 148,100 L132,134 C114,162 86,180 62,188Z" fill="${W}"/>
  <path d="M34,182 C30,150 34,124 44,104 C60,120 72,150 74,186Z" fill="${c1}"/><path d="M74,58 L52,38 L84,50 L72,28 L98,44 L96,24 L112,42" fill="${c1}"/>
  <path d="M136,68 C156,62 178,68 190,84 C194,94 190,106 180,112 C176,104 168,100 160,102 L150,104Z" fill="#3b3f46"/><path d="M160,102 C168,100 176,104 180,112" fill="none" stroke-width="3"/>
  <path d="M84,90 C104,76 128,72 146,80 C130,86 116,92 108,104 C98,98 90,96 84,90Z" fill="${c1}" stroke-width="3"/>${eye(132,82,7,1,GOLD)}`),
 // PIONEERS: frontier cap and rugged face
 Pioneers:(c1,c2)=>wrap(`<path d="M146,62 C170,70 182,96 176,130 L164,128 C168,104 160,84 146,78Z" fill="#8a5a2b"/><path d="M168,88 L178,86 M168,104 L180,104 M166,118 L178,120" stroke-width="4"/>
  <path d="M100,46 C134,46 150,70 150,102 C150,140 128,170 100,172 C72,170 50,140 50,102 C50,70 66,46 100,46Z" fill="${SKIN}"/>
  <path d="M44,74 C44,36 70,20 100,20 C130,20 156,36 156,74 C140,66 120,62 100,62 C80,62 60,66 44,74Z" fill="#8a5a2b"/><path d="M42,74 C64,62 136,62 158,74 L156,84 C134,74 66,74 44,84Z" fill="#5e3b1a"/>
  ${eye(82,104,7)}${eye(118,104,7)}<path d="M100,110 L92,132 L108,132" fill="none" stroke-width="4"/>
  <path d="M64,136 C70,162 130,162 136,136 C126,150 74,150 64,136Z" fill="#6b4a2b"/><path d="M84,146 C94,152 106,152 116,146" fill="none" stroke-width="4"/>
  <path d="M60,166 L100,190 L140,166 L132,196 L68,196Z" fill="${c1}"/><path d="M100,190 L100,198" stroke="${c2}" stroke-width="5"/>`),
 // LANCERS: plumed helm with a lance
 Lancers:(c1,c2)=>wrap(`<path d="M18,186 L170,22" stroke="${O}" stroke-width="16"/><path d="M18,186 L170,22" stroke="#d9b36b" stroke-width="9"/><path d="M164,14 L188,8 L182,32Z" fill="#c9ced6"/>
  <path d="M150,42 L196,30 L170,62 L190,72 L150,66Z" fill="${c1}"/>
  <path d="M96,30 C112,8 146,10 150,36 C134,28 120,32 110,44Z" fill="${c1}"/>
  <path d="M60,64 C60,46 76,36 100,36 C124,36 140,46 140,64 L142,134 C142,152 124,166 100,168 C76,166 58,152 58,134Z" fill="#c9ced6"/>
  <path d="M58,92 L142,92 L142,112 L58,112Z" fill="#9aa2ad"/><path d="M66,102 L134,102" stroke="${O}" stroke-width="6"/>
  <path d="M100,40 L100,166" stroke="${c1}" stroke-width="6"/><path d="M70,138 L90,138 M110,138 L130,138" stroke-width="4"/><path d="M78,186 L122,186 L132,168 L68,168Z" fill="${c1}"/>`),
 // GRIZZLIES: roaring bear
 Grizzlies:(c1,c2)=>wrap(`<circle cx="44" cy="52" r="22" fill="#6b4423"/><circle cx="156" cy="52" r="22" fill="#6b4423"/><circle cx="44" cy="52" r="10" fill="#a8754a" stroke-width="3"/><circle cx="156" cy="52" r="10" fill="#a8754a" stroke-width="3"/>
  <path d="M100,32 C146,32 178,62 176,104 C174,144 144,176 100,180 C56,176 26,144 24,104 C22,62 54,32 100,32Z" fill="#6b4423"/>
  <path d="M100,92 C130,92 146,114 144,138 C140,166 122,182 100,182 C78,182 60,166 56,138 C54,114 70,92 100,92Z" fill="#c29466"/>
  <path d="M84,100 C84,90 116,90 116,100 C116,110 106,116 100,116 C94,116 84,110 84,100Z" fill="${O}"/>
  <path d="M70,132 C82,124 118,124 130,132 L124,166 C112,176 88,176 76,166Z" fill="#8b0d12"/><path d="M78,134 L84,150 L90,132 M122,134 L116,150 L110,132 M86,168 L92,156 L98,170 M114,168 L108,156 L102,170" fill="${W}" stroke-width="3"/>
  <path d="M52,72 L88,84 L84,94 L58,90Z M148,72 L112,84 L116,94 L142,90Z" fill="${c2}"/><circle cx="74" cy="86" r="4" fill="${O}" stroke="none"/><circle cx="126" cy="86" r="4" fill="${O}" stroke="none"/>`),
 // MAVERICKS: wild steer
 Mavericks:(c1,c2)=>wrap(`<path d="M62,70 C40,72 18,60 8,34 C26,46 44,48 64,46Z M138,70 C160,72 182,60 192,34 C174,46 156,48 136,46Z" fill="${BONE}"/>
  <path d="M60,46 C70,34 130,34 140,46 L150,90 C152,120 138,140 126,150 L74,150 C62,140 48,120 50,90Z" fill="${c1==='#111111'?'#2a2a2a':c1}"/>
  <path d="M100,40 L92,58 L100,74 L108,58Z" fill="${W}" stroke-width="3"/>
  <path d="M68,130 C68,118 132,118 132,130 L134,162 C134,180 66,180 66,162Z" fill="#9b8b80"/><ellipse cx="86" cy="152" rx="7" ry="9" fill="${O}" stroke="none"/><ellipse cx="114" cy="152" rx="7" ry="9" fill="${O}" stroke="none"/>
  <path d="M84,174 C84,192 116,192 116,174" fill="none" stroke="${GOLD}" stroke-width="7"/>
  <path d="M58,86 L90,96 L86,106 L62,102Z M142,86 L110,96 L114,106 L138,102Z" fill="${c2}"/><circle cx="76" cy="99" r="4" fill="${O}" stroke="none"/><circle cx="124" cy="99" r="4" fill="${O}" stroke="none"/>
  <path d="M64,40 L56,24 L76,36 M136,40 L144,24 L124,36" fill="${c1==='#111111'?'#2a2a2a':c1}"/>`),
 // WOLVERINES: snarling with claws
 Wolverines:(c1,c2)=>wrap(`<path d="M40,60 L46,26 L76,44Z M160,60 L154,26 L124,44Z" fill="#4a2f1c"/>
  <path d="M100,34 C146,34 178,64 176,104 C174,140 146,168 100,172 C54,168 26,140 24,104 C22,64 54,34 100,34Z" fill="#4a2f1c"/>
  <path d="M28,110 C46,92 70,86 90,90 L84,102 C66,100 46,106 30,124Z M172,110 C154,92 130,86 110,90 L116,102 C134,100 154,106 170,124Z" fill="${c2}"/>
  <path d="M100,96 C126,96 140,114 138,134 C136,156 120,170 100,170 C80,170 64,156 62,134 C60,114 74,96 100,96Z" fill="#7a5233"/>
  <path d="M88,104 L112,104 L100,118Z" fill="${O}"/><path d="M72,134 C84,126 116,126 128,134 L122,156 C110,164 90,164 78,156Z" fill="#8b0d12"/><path d="M80,136 L86,150 L92,134 M120,136 L114,150 L108,134" fill="${W}" stroke-width="3"/>
  <path d="M58,72 L90,82 L86,92 L62,88Z M142,72 L110,82 L114,92 L138,88Z" fill="${GOLD}"/><circle cx="76" cy="84" r="4" fill="${O}" stroke="none"/><circle cx="124" cy="84" r="4" fill="${O}" stroke="none"/>
  <path d="M60,176 L50,198 M74,180 L68,198 M88,182 L86,198 M140,176 L150,198 M126,180 L132,198 M112,182 L114,198" stroke="${BONE}" stroke-width="7"/>`),
 // KNIGHTS: sallet helm with plume, profile
 Knights:(c1,c2)=>wrap(`<path d="M92,40 C80,10 120,0 140,18 C160,36 170,70 160,96 C150,70 128,52 104,50Z" fill="${c1}"/><path d="M104,24 C120,22 134,32 142,46 M100,36 C118,36 136,48 146,66" fill="none" stroke="${W}" stroke-width="4" opacity=".6"/>
  <path d="M40,96 C40,62 66,42 100,42 C136,42 166,64 172,100 L176,132 C150,136 130,140 114,150 L112,172 C80,176 56,166 46,150 C38,138 40,116 40,96Z" fill="#c9ced6"/>
  <path d="M48,96 C70,90 130,90 172,100 L174,116 C130,108 70,108 48,114Z" fill="#9aa2ad"/><path d="M60,104 L164,106" stroke="${O}" stroke-width="6"/>
  <path d="M120,124 L132,124 M120,134 L136,134 M120,144 L130,144" stroke-width="4"/><path d="M50,150 L114,150 L112,190 L44,190Z" fill="${c1}"/><path d="M60,170 L104,170" stroke="${c2==='#FFFFFF'?W:c2}" stroke-width="6"/>`),
 // GAELS: Celtic warrior profile
 Gaels:(c1,c2)=>wrap(`<path d="M72,40 C48,52 36,90 40,130 C44,160 38,180 30,194 L80,194 C76,176 78,160 84,146Z" fill="#b5531c"/>
  <path d="M96,40 C132,36 160,58 164,92 L170,118 C172,124 166,128 160,126 L158,140 C156,156 142,166 128,166 L96,170 C80,160 72,134 74,104 C74,72 80,46 96,40Z" fill="${SKIN}"/>
  <path d="M74,58 C92,30 140,26 164,60 C140,48 110,46 84,64Z" fill="#b5531c"/>
  <path d="M72,70 C100,58 140,58 166,74 L164,86 C136,72 100,72 74,84Z" fill="${c1}"/><circle cx="118" cy="74" r="6" fill="${c2}" stroke-width="3"/>
  <path d="M96,130 C112,140 140,142 158,134 C160,160 144,186 116,188 C98,186 90,160 96,130Z" fill="#b5531c"/><path d="M128,146 L150,146" stroke-width="4"/>
  ${eye(134,100,7)}<path d="M154,104 L166,122 L156,124" fill="none" stroke-width="4"/>
  <path d="M60,96 L56,170" stroke="${c2}" stroke-width="5"/><circle cx="57" cy="120" r="5" fill="${c2}" stroke-width="3"/><circle cx="56" cy="146" r="5" fill="${c2}" stroke-width="3"/>`)
 };
 return A})();
// Varsity-style letter mark drawn with the page's own font (canvas -> PNG), used on helmets and at midfield.
function fakeLetterMark(t){const ini=t.mark||t.school.replace(/^St\.\s*/,'S').replace(/^Bishop\s+/,'B').split(/\s+/).map(w=>w[0]).join('').slice(0,2).toUpperCase();
 const c=document.createElement('canvas');c.width=c.height=256;const x=c.getContext('2d');x.textAlign='center';x.textBaseline='middle';x.lineJoin='round';
 const fs=ini.length>1?150:200;x.font=`700 ${fs}px Oswald,"Arial Black",Impact,sans-serif`;
 const light=t.c2&&t.c2.toUpperCase()!=='#FFFFFF'?t.c2:'#ffffff';
 x.lineWidth=34;x.strokeStyle='#111';x.strokeText(ini,128,138);x.lineWidth=22;x.strokeStyle=light;x.strokeText(ini,128,138);x.lineWidth=8;x.strokeStyle='#111';x.strokeText(ini,128,138);x.fillStyle=t.c1;x.fillText(ini,128,138);
 return c.toDataURL('image/png')}
// Mascot = main logo, sideline mascot and midfield; letter mark = helmets.
function setupFakeArt(){for(const t of TEAMS.filter(x=>x.generic)){const f=FAKE_ART[t.name];if(!f)continue;const art=f(t.c1,t.c2);t.logoBuiltIn=art;t.mascot=art;
 try{t.altLogo=fakeLetterMark(t)}catch(e){t.altLogo=art}delete STADIUMS[t.id];delete UNIFORMS[t.id];autoKit(t,art);
 const U=UNIFORMS[t.id];for(const k of['home','away'])U[k].hlogo=()=>t.altLogo;STADIUMS[t.id].midW=11}
 // redraw the letter marks once the game font has loaded
 try{document.fonts&&document.fonts.ready.then(()=>{for(const t of TEAMS.filter(x=>x.generic&&FAKE_ART[x.name]))try{t.altLogo=fakeLetterMark(t)}catch(e){}})}catch(e){}}
