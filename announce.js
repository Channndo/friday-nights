// ---------- BROADCAST BOOTH: a play-by-play voice and a color analyst ----------
// Spoken with the device's built-in text-to-speech (generic voices). On-screen captions are optional (CC button).
let ANN_VOICE=(()=>{try{return localStorage.getItem('fn_annv')!=='0'}catch(e){return true}})();
let ANN_TEXT=(()=>{try{return localStorage.getItem('fn_annt')==='1'}catch(e){return false}})();
const ANN={pbp:null,col:null,quiet:0,lastLore:-9,said:{}};
const ANN_OK=typeof window!=='undefined'&&'speechSynthesis' in window;
// Prefer the natural-sounding voices (Apple's Enhanced/Premium downloads, Google/Microsoft neural); never the novelty voices.
const ANN_BAD=/Eddy|Reed|Rocko|Grandma|Grandpa|Flo|Sandy|Shelley|Fred|Ralph|Albert|Bad News|Bahh|Bells|Boing|Bubbles|Cellos|Good News|Jester|Organ|Superstar|Trinoids|Whisper|Wobble|Zarvox|Junior|Kathy|Hysterical|Deranged/i;
const ANN_MALE=/Evan|Nathan|Tom|Aaron|Alex|Daniel|Arthur|Oliver|Gordon|Lee|James|Guy|Christopher|Eric|Roger|Andrew|Brian|Davis|Jason|Tony|Steffan|Ryan|Thomas|David|Mark/i;
function annScore(v){let s=0;const n=v.name+' '+(v.voiceURI||'');if(ANN_BAD.test(n))return -99;if(/premium/i.test(n))s+=6;if(/enhanced/i.test(n))s+=5;if(/neural|natural|online|google/i.test(n))s+=4;if(ANN_MALE.test(v.name))s+=3;if(/en[-_]US/i.test(v.lang))s+=1;if(v.localService===false)s+=1;return s}
function annVoices(){if(!ANN_OK)return;const vs=speechSynthesis.getVoices().filter(v=>/^en/i.test(v.lang)&&annScore(v)>-99);if(!vs.length)return;
 const r=vs.slice().sort((a,b)=>annScore(b)-annScore(a));ANN.pbp=r[0];
 const base=n=>n.replace(/\s*\(.*\)/,'').trim();ANN.col=r.find(v=>base(v.name)!==base(ANN.pbp.name)&&ANN_MALE.test(v.name))||r.find(v=>base(v.name)!==base(ANN.pbp.name))||ANN.pbp;
 ANN.natural=/premium|enhanced|neural|natural|online|google/i.test(ANN.pbp.name+' '+(ANN.pbp.voiceURI||''))}
if(ANN_OK){annVoices();try{speechSynthesis.addEventListener('voiceschanged',annVoices)}catch(e){speechSynthesis.onvoiceschanged=annVoices}}
function annToggleVoice(){ANN_VOICE=!ANN_VOICE;try{localStorage.setItem('fn_annv',ANN_VOICE?'1':'0')}catch(e){}if(!ANN_VOICE&&ANN_OK)speechSynthesis.cancel();else{annSay('pbp','Booth is live.',3);if(!ANN.natural&&typeof bToast==='function')bToast('For a more human booth: Settings › Accessibility › Spoken Content › Voices › English, download an Enhanced or Premium voice (Evan, Nathan or Tom), then reopen the game.')}renderBug()}
function annToggleText(){ANN_TEXT=!ANN_TEXT;try{localStorage.setItem('fn_annt',ANN_TEXT?'1':'0')}catch(e){}if(!ANN_TEXT){const b=document.getElementById('annBar');if(b)b.style.opacity=0}renderBug()}
function annShow(who,text){let b=document.getElementById('annBar');if(!b){b=document.createElement('div');b.id='annBar';b.style.cssText='position:fixed;left:50%;bottom:calc(env(safe-area-inset-bottom) + 120px);transform:translateX(-50%);max-width:min(640px,86vw);background:rgba(8,10,14,.82);color:#e8edf3;font:600 14px/1.35 system-ui,sans-serif;padding:8px 14px;border-radius:10px;border-left:4px solid #ffcf3d;z-index:60;pointer-events:none;transition:opacity .4s;opacity:0';document.body.appendChild(b)}
 b.innerHTML=`<span style="color:${who==='col'?'#93c5fd':'#ffcf3d'};font-size:11px;letter-spacing:.12em">${who==='col'?'ANALYST':'PLAY-BY-PLAY'}</span><br>${esc(text)}`;b.style.opacity=1;clearTimeout(ANN.hide);ANN.hide=setTimeout(()=>{b.style.opacity=0},4200)}
// pri: 1 filler, 2 notable, 3 big moment (cuts off anything still talking)
function annSay(who,text,pri){if(!text)return;if(typeof G!=='undefined'&&G&&G.venue&&G.venue.id==='WARFARM')return; // no booth at the farm field
 if(ANN_TEXT)annShow(who,text);if(!ANN_VOICE||!ANN_OK)return;
 if(typeof SPEED!=='undefined'&&SPEED>2&&pri<3)return;if(typeof SPEED!=='undefined'&&SPEED>1&&pri<2)return;
 if((speechSynthesis.speaking||speechSynthesis.pending)&&who==='pbp'){if(pri<3)return;speechSynthesis.cancel()}
 try{const u=new SpeechSynthesisUtterance(text),v=who==='col'?ANN.col:ANN.pbp;if(v)u.voice=v;u.lang=(v&&v.lang)||'en-US';u.rate=who==='col'?.98:1.06;u.pitch=1;u.volume=1;speechSynthesis.speak(u)}catch(e){}}
function annPair(a,b,pri){annSay('pbp',a,pri);if(b)setTimeout(()=>annSay('col',b,pri),ANN_TEXT&&!ANN_VOICE?2200:0)}
const pk=a=>a[Math.floor(Math.random()*a.length)];
const full=p=>p?((p.first?p.first+' ':'')+(p.last||'')).trim():'';
const BIG4_A={CARMEL:1,CATH:1,BD:1,WC:1};
function annPairKey(a,b){return[a,b].sort().join('-')}
// ---- lore the analyst knows ----
const ANN_RIV={'MISH-PENN':['Penn and Mishawaka. Throw out the records, this one is personal.','Mishawaka has spent all week telling Penn they ain\'t all that. Tonight they get to prove it.','The biggest game in the North, every single year.'],
 'BD-WC':['Ben Davis and Warren Central. City rivals, and you can feel it in this crowd.','Two Big 4 programs from the same city. Neither one is backing down.'],
 'BDW-CARR':['The Fort Wayne Rivalry. Same town, a lot of history, not a lot of love.','Carroll is as big as anybody in the state, and they would love nothing more than to knock off Dwenger.'],
 'CARMEL-CATH':['Carmel and Cathedral. Two of the Big 4, and neither one thinks it is second.','Cathedral has the trophies. Carmel has the depth. Something has to give.'],
 'JIM-MISH':['Jimtown and Mishawaka, right next door to each other.'],
 'CARMEL-PENN':['Carmel and Penn. Two programs that are not shy about how good they are.','Penn thinks it belongs with the Big 4. Carmel would like a word.']};
const ANN_TEAM={PENN:['Penn plays like a team that expects to win, and it lets you know it.','The Kingsmen are deep, they are polished, and they are not humble about it.'],
 CARMEL:['Carmel just comes at you in waves. The depth is unreal.','Carmel\'s third string would start for most of the teams in this state.'],
 CATH:['Cathedral doesn\'t say much. They don\'t have to.','All those state titles, and Cathedral still plays like it has something to prove.'],
 BDW:['Dwenger lets the scoreboard do the talking.'],BD:['The Giants are big, they are fast, and they are everywhere.'],WC:['Warren Central has the talent to beat anybody in this state.'],
 MISH:['Mishawaka\'s defense plays angry. Every snap.','The Cavemen aren\'t the biggest team out here, but nobody wants to line up across from that defense.'],
 WAR:['Those Warsaw boys are farm strong.','Keep an eye on number seventy nine for Warsaw. Seven feet tall. They call him The Silo.'],
 BS:['Bloomington South keeps knocking on the door. One of these years.'],EC:['East Central is going to play hard. You have to give them that.'],
 JIM:['Jimtown always plays with a chip on its shoulder.'],LAP:['LaPorte is a tough, blue collar football team.']};
function annIntro(g){if(ANN_OK&&ANN_VOICE){try{speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(' ');u.volume=0;speechSynthesis.speak(u)}catch(e){}} // unlocks speech on iPad: must happen inside the tap that starts the game
 ANN.said={};ANN.quiet=0;ANN.lastLore=-9;const h=g.h,a=g.a,k=annPairKey(h.id,a.id),ms=h.conf==='Midstate Conference'&&a.conf==='Midstate Conference';
 const wx=g.wx&&g.wx.k&&g.wx.k!=='clear'&&!/indoor/.test(g.wx.k)?' '+pk(['A little weather tonight, too.','Conditions are going to be a factor.']):'';
 const open=pk([`Good evening and welcome to Friday night football. The ${a.school} ${a.name} visit the ${h.school} ${h.name}.`,`It's Friday night, and we are set for ${a.school} at ${h.school}.`,`Welcome in, everybody. ${a.school} and ${h.school}, and we're about ready to kick it off.`])+wx;
 let col=ANN_RIV[k]?pk(ANN_RIV[k]):ms?pk(['Welcome to the Gauntlet. There are no easy Fridays in this conference.','Midstate football. Nobody gets out of this conference unbruised.']):(BIG4_A[h.id]||BIG4_A[a.id])&&(h.id==='PENN'||a.id==='PENN')?'Penn has been waiting for this one. They think they belong with the Big 4. Tonight they find out.':(ANN_TEAM[h.id]||ANN_TEAM[a.id])?pk(ANN_TEAM[h.id]||ANN_TEAM[a.id]):pk(['Should be a good one tonight.','Two teams that want this one badly.']);
 setTimeout(()=>annPair(open,col,3),900)}
function annScoreLine(g,s){const me=s,them=s==='h'?'a':'h',d=g.score[me]-g.score[them],t=T(g,me),o=T(g,them);
 if(t.id==='MISH'&&o.id==='PENN'&&d>=14)return pk(['Somebody tell Penn. They ain\'t all that.','Penn is not used to this. Mishawaka is in total control.']);
 if(t.id==='PENN'&&BIG4_A[o.id]&&d>0)return pk(['Penn is going to be talking about this one for a long time.','The Big 5? Penn is making its case.']);
 if(d>=28)return pk(['This one is getting out of hand.','That is a beatdown.']);if(d===0)return pk(['And we are all square.','Tied ball game.']);
 if(d>0&&d<=3)return pk(['Back on top.','A one score game.']);if(d<0)return pk(['That keeps them in it.','Still some work to do, but that helps.']);
 if((t.ovr||0)+3<(o.ovr||0)&&d>=10)return pk(['We might be watching an upset.','Nobody saw this coming.']);return null}
function annPlay(res){try{if(!G||!res||!res.text)return;const g=G,s=res.poss,t=T(g,s),o=T(g,opp(s)),tx=res.text,c=res.carrier,bn=res.banner;ANN.quiet++;
 const scorer=res.scored||(bn==='TOUCHDOWN'?s:null);
 if(/HILL, GO GET HIM/.test(tx))return annPair(pk(['Oh no. Oh no, what is happening?','Well. That is not in the playbook.']),pk(['You can hear Coach Curtis from up here! Hill, go get him!','And there goes Chandler Hill after him.']),3);
 if(/The Silo/.test(tx))return annPair(pk(['Right up the middle, behind the big fella.','They just ran behind number seventy nine.']),pk(['Nobody is moving that man.','Seven feet of Warsaw farm boy. Good luck.']),2);
 if(bn==='TOUCHDOWN'){ANN.quiet=0;const who=c?full(c):t.school;const big=res.gain>=30;
  const a=pk(big?[`${who}, he is gone! Touchdown, ${t.school}!`,`Nobody is catching ${who}! Touchdown!`]:[`Touchdown, ${t.school}! ${who} gets in.`,`${who} into the end zone! Touchdown ${t.name}!`,`And ${who} scores!`]);
  let b=c&&c.first==='JJ'?pk(['The big man catches another one! Three hundred pounds of tight end.','You cannot cover JJ down there. He is a lineman who catches touchdowns.']):annScoreLine(g,s);return annPair(a,b,3)}
 if(bn==='INTERCEPTED'){ANN.quiet=0;return annPair(pk(['Picked off!','Intercepted!','And it is picked!']),pk([`Big mistake. ${o.school} takes it away.`,'You cannot throw that ball in there.','That could change this game.']),3)}
 if(bn==='FUMBLE'){ANN.quiet=0;return annPair(pk(['Fumble! And it is loose!','Ball is out!']),pk([`${o.school} comes up with it.`,'You have to protect the football.']),3)}
 if(bn==='SAFETY')return annPair('Tackled in the end zone. That is a safety!','Two points, and they get the ball back.',3);
 if(bn==='TURNOVER ON DOWNS')return annPair(pk(['Stopped short! Turnover on downs!','They are stuffed!']),pk(['What a stand by that defense.','Gamble did not pay off.']),2);
 if(bn==='BIG HIT'){const m=/(Bailey|Eby|Hill|Mackowicz|MACKO|Macko)/i.exec(tx);const nmx=m?m[1]:'';
  const col=/Bailey/i.test(nmx)?pk(['That is Duell Bailey. He does not even start, and he is the scariest man on the field.','Bailey came in off the bench just to hit somebody.']):/Eby/i.test(nmx)?pk(['Braxton Eby. Meanest player in the state, and he wants you to know it.','Eby finishes him and lets him hear about it.']):/Hill/i.test(nmx)?pk(['Chandler Hill. Number sixty two plays every snap angry.','Hill was in a bad mood before the game even started.']):/Mack/i.test(nmx)?pk(['Macko! You could hear that one up here.','Nobody hits harder than Macko.']):pk(['Whew. That one is going to leave a mark.','You felt that one in the stands.']);
  return annPair(pk(['Oh, what a hit!','Boom!','He got popped!']),col,2)}
 if(bn==='SACK')return annPair(pk([`Sacked!`,`Down goes the quarterback!`,`He is buried!`]),Math.random()<.5?pk(['Nowhere to go.','That pressure was there all night.']):null,2);
 if(bn==='FIELD GOAL')return annPair(pk(['The kick is good.','Through the uprights.','And it is good.']),null,2);
 if(bn==='NO GOOD')return annPair(pk(['No good!','Wide! He misses it.']),pk(['Those points could matter.','He will want that one back.']),2);
 if(res.gain>=20&&c){ANN.quiet=0;return annPair(pk([`${full(c)} breaks free!`,`And ${full(c)} is loose!`,`Big play, ${full(c)}!`]),Math.random()<.4?pk(['That is a big chunk.','He just found a crease.']):null,2)}
 // a little lore when it has been quiet for a while
 if(ANN.quiet>=7&&(g.stats.h.plays+g.stats.a.plays)-ANN.lastLore>12){ANN.quiet=0;ANN.lastLore=g.stats.h.plays+g.stats.a.plays;const pool=(ANN_TEAM[t.id]||[]).concat(ANN_TEAM[o.id]||[]).filter(x=>!ANN.said[x]);if(pool.length){const x=pk(pool);ANN.said[x]=1;annSay('col',x,1)}}
}catch(e){}}
function annFinal(g){try{const w=g.score.h>g.score.a?'h':'a',l=w==='h'?'a':'h',W=T(g,w),L=T(g,l),ws=g.score[w],ls=g.score[l];
 const a=`And that is the ball game. ${W.school} ${ws}, ${L.school} ${ls}.`;let b;
 if(W.id==='MISH'&&L.id==='PENN')b=pk(['Mishawaka told them all week. Penn ain\'t all that.','The Cavemen take down Penn, and they are going to enjoy this one.']);
 else if(W.id==='PENN'&&L.id==='MISH')b=pk(['Penn holds serve. And they will make sure Mishawaka hears about it.','The Kingsmen get this one. Mishawaka will be waiting next year.']);
 else if(W.id==='PENN'&&BIG4_A[L.id])b='Penn takes down a Big 4 program. They are going to be insufferable.';
 else if(ws-ls>=28)b='That was never close.';else if(ws-ls<=3)b='What a finish. That one came right down to the end.';
 else b=pk([`Good win for ${W.school}.`,`${W.school} gets it done tonight.`]);
 annPair(a,b,3)}catch(e){}}
