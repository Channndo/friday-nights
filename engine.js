// ================= GRIDIRON ENGINE (no DOM) =================
const QLEN = 300; // seconds per quarter

// ---- TEAMS ----
// ovr = target overall. Rosters are generated and calibrated to hit it.
// colorsTBD = placeholder colors until confirmed.
const TEAMS = [
  {id:'MISH', coach:'Bart Curtis', jet:true,option:true, lod:true, nickname:'Crazed Dawgs', ovrShow:94, elite:-4, luck:1, clutchLuck:true, luckLine:'CAVEMAN MAGIC!', front:'34', school:'Mishawaka', name:'Cavemen', abbr:'MSH', c1:'#7B1E2B', c2:'#FFFFFF', c3:'#3A0D14', ovr:85, star:.06,
   desc:"The swing program of the conference. Good enough to beat anyone, not always consistent enough to do it every week. Never misses a chance to remind Penn it ain't all that."},
  {id:'PENN', coach:'Coach Yeoman', nickname:'The Wild Bunch', size:{min:72,ht:[2,3],wt:[21,33]}, elite:7, big:true, deep:true, school:'Penn', name:'Kingsmen', abbr:'PEN', c1:'#DDC75F', c2:'#111111', c3:'#111111', ovr:99, star:.10,
   desc:"The conference standard. Deep, polished and used to winning, and never lets anyone forget it. Still can't figure out why the Big 4 stops at four."},
  {id:'MARIAN', school:'Marian', name:'Knights', abbr:'MAR', c1:'#00339F', c2:'#FFFFFF', c3:'#9AA3AE', ovr:84, star:.05,
   desc:"Disciplined and well coached. Usually a step behind the top tier, and dangerous the week you forget it."},
  {id:'SJ', school:'Saint Joseph', name:'Huskies', abbr:'SJ', c1:'#6FA3D0', c2:'#111111', c3:'#FFFFFF', ovr:87, star:.05,
   desc:"Marian's arch-rival. Physical, well drilled, and never short on motivation."},
  {id:'JIM', school:'Jimtown', name:'Jimmies', abbr:'JIM', c1:'#6B1E2E', c2:'#C2A869', c3:'#FFFFFF', ovr:86, star:.04,
   desc:"Blue-collar program with a whole community behind it. Rarely flashy, almost always good."},
  {id:'CON', school:'Concord', name:'Minutemen', abbr:'CON', c1:'#1E9E50', c2:'#FFFFFF', c3:'#111111', ovr:93, star:.05,
   desc:"Jimtown's rival and Mishawaka's mirror image. Right there, every single year."},
  {id:'ADAMS', school:'Adams', name:'Eagles', abbr:'ADM', c1:'#C8102E', c2:'#FFFFFF', c3:'#1D4ED8', ovr:80, star:.11,
   desc:"The most dangerous of the up-and-comers. More star power than its record suggests."},
  {id:'RILEY', school:'Riley', name:'Wildcats', abbr:'RIL', c1:'#1E3A8A', c2:'#F2C230', c3:'#FFFFFF', ovr:75, star:.09,
   desc:"Explosive talent at the skill spots. Has never quite broken through against the top of the conference."},
  {id:'CLAY', school:'Clay', name:'Colonials', abbr:'CLY', c1:'#5B2A86', c2:'#F5C518', c3:'#2E1446', ovr:72, star:.07,
   desc:"Rebuilding. A few real playmakers, not much depth behind them."},
  {id:'WASH', school:'Washington', name:'Panthers', abbr:'WSH', c1:'#22552A', c2:'#FFFFFF', c3:'#D4A72C', ovr:69, star:.08,
   desc:"Undermanned and scrappy, with a breakout star every few years who can take over a game."},
  {id:'WAR', coach:'Michael Curtis', option:true, optHeavy:true, elite:8, school:'Warsaw', name:'Tigers', abbr:'WAR', c1:'#F26B1D', c2:'#111111', c3:'#FFFFFF', ovr:98, star:.05, farm:true,
   desc:"The dominant farm-boy program. Big, tough country kids who wear you down. A notch above Mishawaka, a notch below Penn."},
  {id:'LAP', elite:5, big:true, conf:'Western Conference', school:'LaPorte', name:'Slicers', abbr:'LAP', c1:'#F26A1B', c2:'#111111', c3:'#FFFFFF', ovr:97, star:.08,
   desc:"Mishawaka's equal on paper, with a slight edge. Tough, physical, and never an easy Friday night."},
  {id:'NP', school:'New Prairie', name:'Cougars', abbr:'NP', c1:'#1B2A57', c2:'#C9A75A', c3:'#FFFFFF', ovr:84, star:.05,
   desc:"Solid and well organized. Rarely flashy, but a tough out on any Friday night."},
  {id:'NW', school:'Northwood', name:'Panthers', abbr:'NW', c1:'#111111', c2:'#D2232A', c3:'#FFFFFF', ovr:83, star:.06, upset:true,
   desc:"On paper a middle-of-the-pack team. On the field, the conference's most dangerous spoiler."},
  {id:'NR', school:'NorthRidge', name:'Raiders', abbr:'NR', c1:'#1E9447', c2:'#FDBB2F', c3:'#141414', ovr:83, star:.06,
   desc:"Northwood's rival and mirror image. When these two meet, flip a coin."},
  {id:'ELK', school:'Elkhart', name:'Lions', abbr:'ELK', c1:'#1F4FB4', c2:'#C9B26B', c3:'#FFFFFF', ovr:88, star:.10, upset:true,
   desc:"The new disruptor. Not as steady as the top programs, but loaded with athletes and capable of beating anyone."},
  {id:'PLY', school:'Plymouth', name:'Rockies', abbr:'PLY', c1:'#D21F2B', c2:'#FFFFFF', c3:'#141414', ovr:82, star:.03, farm:true,
   desc:"Farm-strong in the trenches. Not flashy, but they'll push you around for four quarters."},
];
// Teams built but not yet in the game (Midstate Conference). Move into TEAMS to enable.
const LATER_TEAMS=[{id:'CARMEL', deepest:true, size:{min:73,ht:[2,4],wt:[24,36]}, conf:'Midstate Conference', elite:16, big:true, deep:true, school:'Carmel', name:'Greyhounds', abbr:'CAR', c1:'#1F5BB8', c2:'#F7B718', c3:'#FFFFFF', ovr:99, star:.12,
   desc:"The perennial championship favorite. Bigger, deeper and faster than everyone, with no known weakness, and never shy about mentioning it."},
  {id:'FISH', conf:'Midstate Conference', elite:2, big:true, school:'Fishers', name:'Tigers', abbr:'FIS', c1:'#C8102E', c2:'#FFFFFF', c3:'#111111', ovr:94, star:.08,
   desc:"The Midstate's floor is everyone else's ceiling. Bottom of the toughest conference, but as talented as most contenders anywhere."},
  {id:'ZION', conf:'Midstate Conference', elite:3, big:true, school:'Zionsville', name:'Eagles', abbr:'ZVL', c1:'#14532D', c2:'#B8BEC6', c3:'#FFFFFF', ovr:95, star:.08,
   desc:"A great program that never takes a week off. A notch above Fishers in the toughest conference around."},
  {id:'NOB', conf:'Midstate Conference', elite:2, big:true, superstar:true, upset:true, school:'Noblesville', name:'Millers', abbr:'NOB', c1:'#141414', c2:'#C2A869', c3:'#FFFFFF', ovr:93, star:.06,
   desc:"Right there with Fishers, and carried by a superstar who can flip any game by himself."},
  {id:'BD', size:{ht:[1,3],wt:[14,26]}, luckVs:{CARMEL:.5}, luckLine:'THE GIANTS RISE UP!', conf:'Midstate Conference', elite:12, big:true, deep:true, school:'Ben Davis', name:'Giants', abbr:'BD', c1:'#4B2683', c2:'#FFFFFF', c3:'#B9A8D6', ovr:99, star:.13,
   desc:"The west side's giant. More bodies, more talent and a louder crowd than anyone, and the one program that goes toe to toe with Carmel. One of the Big 4."},
  {id:'BC', conf:'Midstate Conference', elite:7, big:true, school:'Bishop Chatard', name:'Trojans', abbr:'BC', c1:'#1F5FD1', c2:'#FFFFFF', c3:'#0E2A5C', ovr:96, star:.07,
   desc:"A Catholic-school power. Polished, physical and well coached: a tier below Ben Davis, a step above Zionsville."},
  {id:'CATH', conf:'Midstate Conference', size:{min:73,ht:[2,4],wt:[24,36]}, elite:14, big:true, deep:true, school:'Cathedral', name:'Irish', abbr:'CTH', c1:'#14254F', c2:'#C9A75A', c3:'#FFFFFF', ovr:99, star:.10,
   desc:"A dominant Catholic powerhouse and Bishop Chatard's rival. Right there with Carmel and Ben Davis at the top. One of the Big 4."},
  {id:'WC', conf:'Midstate Conference', elite:10, big:true, deep:true, school:'Warren Central', name:'Warriors', abbr:'WC', c1:'#111111', c2:'#C5A862', c3:'#FFFFFF', ovr:99, star:.13,
   desc:"The east side's pride. Old-school, physical, and convinced the state still owes it respect. Ben Davis's rival, neck and neck for the city every year. One of the Big 4."},
  {id:'CP', conf:'Western Conference', elite:7, big:true, deep:true, school:'Crown Point', name:'Bulldogs', abbr:'CP', c1:'#C8102E', c2:'#FFFFFF', c3:'#111111', ovr:97, star:.10,
   desc:"The Western powerhouse. Region champions year after year, built to go blow for blow with Penn."},
  {id:'MERR', conf:'Western Conference', school:'Merrillville', name:'Pirates', abbr:'MRV', c1:'#4B2E83', c2:'#FFFFFF', c3:'#111111', ovr:93, star:.06,
   desc:"Crown Point's inner-city counterpart. Less money, plenty of fight. Right there with Concord, and always dangerous."},
  {id:'WEST', conf:'Western Conference', elite:4, big:true, deep:true, school:'Westfield', name:'Shamrocks', abbr:'WFD', c1:'#0F5132', c2:'#D4B556', c3:'#FFFFFF', ovr:97, star:.10,
   desc:"The rich kids of the division. Best facilities, best gear, deep roster: dead even with Crown Point."},
  {id:'PORT', conf:'Western Conference', school:'Portage', name:'Indians', abbr:'POR', c1:'#C8102E', c2:'#FFFFFF', c3:'#8A8D91', ovr:75, star:.04,
   desc:"The bottom of the Western. Big crowd, big tunnel, but outmatched most Fridays."},
  {id:'VAL', conf:'Western Conference', school:'Valparaiso', name:'Vikings', abbr:'VAL', c1:'#00843D', c2:'#111111', c3:'#FFFFFF', ovr:85, star:.05,
   desc:"A solid, respectable program. Never a pushover, rarely the favorite."},
  {id:'LC', conf:'Western Conference', school:'Lake Central', name:'Indians', abbr:'LC', c1:'#1F4FD1', c2:'#FFFFFF', c3:'#111111', ovr:85, star:.05,
   desc:"Big school, big stadium, solid team. Right there with Valparaiso in the middle of the Western."},
  {id:'MC', conf:'Western Conference', school:'Michigan City', name:'Wolves', abbr:'MC', c1:'#1B365D', c2:'#FFFFFF', c3:'#B9BEC6', ovr:69, star:.04,
   desc:"The bottom of the Western. Lakefront program still hunting for its breakthrough."},
  {id:'RONC', conf:'Eastern Conference', elite:7, big:true, school:'Roncalli', name:'Royals', abbr:'RON', c1:'#D22630', c2:'#1F4FBF', c3:'#FFFFFF', ovr:96, star:.07,
   desc:"The Midstate's Catholic power on the south side. Right there with Bishop Chatard every year."},
  {id:'BDW', conf:'Eastern Conference', elite:8, big:true, deep:true, star:.09, school:'Bishop Dwenger', name:'Saints', abbr:'BDW', c1:'#14254F', c2:'#C9A75A', c3:'#FFFFFF', ovr:99,
   desc:"A Catholic powerhouse of the east. Dominant year in and year out, just a notch below Cathedral. Lets the scoreboard do the talking."},
  {id:'CARR', conf:'Eastern Conference', elite:6, big:true, deep:true, star:.09, size:{ht:[1,3],wt:[18,32]}, school:'Carroll', name:'Chargers', abbr:'CRL', c1:'#1F4FBF', c2:'#B8BEC6', c3:'#FFFFFF', ovr:99,
   desc:"An east powerhouse with some huge bodies up front. Right there with Penn."},
  {id:'CG', conf:'Eastern Conference', star:.05, school:'Center Grove', name:'Trojans', abbr:'CG', c1:'#C8102E', c2:'#FFFFFF', c3:'#111111', ovr:91,
   desc:"Solid and physical. About Concord's level, a hair behind."},
  {id:'HMS', conf:'Eastern Conference', star:.05, school:'Homestead', name:'Spartans', abbr:'HMS', c1:'#1F4FBF', c2:'#F2C200', c3:'#FFFFFF', ovr:84,
   desc:"Carroll's rival. Decent most years, rarely the story."},
  {id:'AND', elite:7, speed:true, luck:.8, clutchLuck:true, luckLine:'RAPTOR STRIKE!', conf:'Eastern Conference', star:.08, school:'Anderson', name:'Raptors', abbr:'AND', c1:'#CC1F2D', c2:'#111111', c3:'#FFFFFF', ovr:96,
   desc:"Not the biggest team on the field, but the fastest. Speed everywhere, and a habit of hitting the big play right when it matters."},
  {id:'SNID', conf:'Eastern Conference', star:.05, school:'Snider', name:'Panthers', abbr:'SND', c1:'#111111', c2:'#C9A227', c3:'#FFFFFF', ovr:86,
   desc:"Middle of the pack. Can beat anyone on a good night."},
  {id:'EC', conf:'Eastern Conference', star:.04, school:'East Central', name:'Hornets', abbr:'ECH', c1:'#111111', c2:'#F2C200', c3:'#FFFFFF', ovr:69,
   desc:"The bottom of the east, still hunting for a breakthrough."},
  {id:'MEM', conf:'Southern Conference', elite:8, big:true, deep:true, star:.08, school:'Memorial', name:'Tigers', abbr:'MEM', c1:'#1F4FBF', c2:'#FFFFFF', c3:'#111111', ovr:97,
   desc:"A dominant Catholic program that measures itself against the best in the state."},
  {id:'BS', conf:'Southern Conference', elite:7, big:true, deep:true, star:.08, school:'Bloomington South', name:'Panthers', abbr:'BSP', c1:'#4B2E83', c2:'#FFFFFF', c3:'#111111', ovr:97,
   desc:"The powerhouse of its area. Crown Point-level talent."},
  {id:'GIB', conf:'Southern Conference', elite:6, big:true, star:.07, school:'Gibson Southern', name:'Titans', abbr:'GIB', c1:'#7A1E2E', c2:'#C9A227', c3:'#FFFFFF', ovr:97,
   desc:"Memorial's rival. One of the tightest Catholic rivalries anywhere."},
  {id:'HH', conf:'Southern Conference', upset:true, star:.06, school:'Heritage Hills', name:'Patriots', abbr:'HH', c1:'#14254F', c2:'#FFFFFF', c3:'#C8102E', ovr:90,
   desc:"Not a powerhouse, but gives every powerhouse a fight."},
  {id:'BRN', conf:'Southern Conference', star:.04, school:'Brownstown Central', name:'Braves', abbr:'BRN', c1:'#F26B1D', c2:'#111111', c3:'#FFFFFF', ovr:72,
   desc:"Small and scrappy. Reitz's rival, usually the underdog."},
  {id:'REITZ', conf:'Southern Conference', star:.05, school:'Reitz', name:'Panthers', abbr:'RTZ', c1:'#14254F', c2:'#9AA0A6', c3:'#FFFFFF', ovr:84,
   desc:"Brownstown's rival and the stronger side of it."},
  {id:'NPAL', conf:'Southern Conference', elite:6, big:true, deep:true, star:.12, school:'New Palestine', name:'Dragons', abbr:'NPL', c1:'#C8102E', c2:'#FFFFFF', c3:'#111111', ovr:99,
   desc:"The powerhouse of the south. Warren Central-level talent."},
  {id:'RDG', conf:'Prairie Conference', generic:true, catholic:false, crest:'shield', elite:4, big:true, deep:true, star:.08, school:"Ridgeview", name:'Rams', abbr:'RDG', c1:'#1E6B3A', c2:'#E3B935', c3:'#FFFFFF', ovr:97,
   desc:"The class of the Prairie. Big, deep and used to winning."},
  {id:'MLB', conf:'Prairie Conference', generic:true, catholic:false, crest:'circle', star:.06, school:"Millbrook", name:'Mustangs', abbr:'MLB', c1:'#7A1E2E', c2:'#FFFFFF', c3:'#FFFFFF', ovr:88,
   desc:"Ridgeview's chaser most years. Physical up front."},
  {id:'CVY', conf:'Prairie Conference', generic:true, catholic:false, crest:'diamond', star:.05, school:"Cedar Valley", name:'Cougars', abbr:'CVY', c1:'#14254F', c2:'#F26B1D', c3:'#FFFFFF', ovr:84,
   desc:"Middle of the Prairie, with the occasional big year."},
  {id:'HCK', conf:'Prairie Conference', generic:true, catholic:false, crest:'shield', star:.05, school:"Harper Creek", name:'Hawks', abbr:'HCK', c1:'#C8102E', c2:'#111111', c3:'#FFFFFF', ovr:79,
   desc:"Scrappy small-town program."},
  {id:'FXR', conf:'Prairie Conference', generic:true, catholic:false, crest:'circle', star:.04, school:"Fox Run", name:'Falcons', abbr:'FXR', c1:'#4B2E83', c2:'#E3B935', c3:'#FFFFFF', ovr:74,
   desc:"Rebuilding, but rarely an easy out at home."},
  {id:'STB', conf:'Prairie Conference', generic:true, catholic:false, crest:'diamond', star:.04, school:"Stonebridge", name:'Storm', abbr:'STB', c1:'#0F7C80', c2:'#111111', c3:'#FFFFFF', ovr:68,
   desc:"The Prairie's long-suffering bottom feeder."},
  {id:'SBR', conf:'Prairie Conference', generic:true, catholic:true, crest:'shield', elite:3, big:true, star:.07, school:"St. Brendan", name:'Crusaders', abbr:'SBR', c1:'#1F4FBF', c2:'#E3B935', c3:'#FFFFFF', ovr:95,
   desc:"A Catholic power that measures itself against Ridgeview every fall."},
  {id:'SAM', conf:'Prairie Conference', generic:true, catholic:true, crest:'circle', star:.05, school:"St. Ambrose", name:'Friars', abbr:'SAM', c1:'#5A3A1E', c2:'#E3B935', c3:'#FFFFFF', ovr:86,
   desc:"St. Brendan's Catholic rival. Usually the underdog, always motivated."},
  {id:'OKM', conf:'River Valley Conference', generic:true, catholic:false, crest:'shield', elite:3, big:true, deep:true, star:.08, school:"Oakmont", name:'Ospreys', abbr:'OKM', c1:'#14254F', c2:'#B8BEC6', c3:'#FFFFFF', ovr:96,
   desc:"The River Valley's public powerhouse."},
  {id:'PNR', conf:'River Valley Conference', generic:true, catholic:false, crest:'diamond', star:.06, school:"Pine Ridge", name:'Pioneers', abbr:'PNR', c1:'#1E5B33', c2:'#FFFFFF', c3:'#FFFFFF', ovr:90,
   desc:"Tough, disciplined, always in the hunt."},
  {id:'LKV', conf:'River Valley Conference', generic:true, catholic:false, crest:'circle', star:.05, school:"Lakeview", name:'Lancers', abbr:'LKV', c1:'#1F4FBF', c2:'#FFFFFF', c3:'#FFFFFF', ovr:85,
   desc:"Solid program that can surprise a contender."},
  {id:'GRF', conf:'River Valley Conference', generic:true, catholic:false, crest:'shield', star:.05, school:"Granite Falls", name:'Grizzlies', abbr:'GRF', c1:'#5A3A1E', c2:'#F26B1D', c3:'#FFFFFF', ovr:81,
   desc:"Hard-nosed river town team."},
  {id:'MPG', conf:'River Valley Conference', generic:true, catholic:false, crest:'diamond', star:.04, school:"Maple Grove", name:'Mavericks', abbr:'MPG', c1:'#111111', c2:'#C8102E', c3:'#FFFFFF', ovr:76,
   desc:"Up and down from year to year."},
  {id:'WLC', conf:'River Valley Conference', generic:true, catholic:false, crest:'circle', star:.04, school:"Willow Creek", name:'Wolverines', abbr:'WLC', c1:'#7A1E2E', c2:'#E3B935', c3:'#FFFFFF', ovr:70,
   desc:"The River Valley's underdog."},
  {id:'BKL', conf:'River Valley Conference', generic:true, catholic:true, crest:'shield', elite:4, big:true, deep:true, star:.08, school:"Bishop Kellan", name:'Knights', abbr:'BKL', c1:'#14254F', c2:'#FFFFFF', c3:'#FFFFFF', ovr:96,
   desc:"The top Catholic program of the river country."},
  {id:'SGR', conf:'River Valley Conference', generic:true, catholic:true, crest:'diamond', star:.05, school:"St. Gregory", name:'Gaels', abbr:'SGR', c1:'#1E6B3A', c2:'#E3B935', c3:'#FFFFFF', ovr:83,
   desc:"Bishop Kellan's Catholic rival, punching above its weight."}
];
// Midstate and Western are live; other LATER_TEAMS stay hidden until their conference is built.
// Every added team is playable in Play Now; Season mode uses only the conferences listed in LEAGUE (season.js).
for(const t of LATER_TEAMS)TEAMS.push(t);
const RIVALS = [['MISH','PENN','Classic Rivalry'],['MARIAN','SJ','Rivalry Game'],['JIM','CON','Rivalry Game'],['ADAMS','RILEY','Rivalry Game'],['WASH','CLAY','Rivalry Game'],['WASH','RILEY','Crosstown Rivalry'],['NW','NR','Rivalry Game'],['CARMEL','BD','Rivalry Game'],['CATH','BC','Rivalry Game'],['BD','WC','Rivalry Game'],['CP','MERR','Rivalry Game'],['BDW','RONC','Rivalry Game'],['CARR','HMS','Rivalry Game'],['CARR','BDW','Fort Wayne Rivalry'],['MEM','GIB','Rivalry Game'],['BRN','REITZ','Rivalry Game'],['SBR','SAM','Rivalry Game'],['BKL','SGR','Rivalry Game']];
function rivalry(a,b){const r=RIVALS.find(r=>(r[0]===a&&r[1]===b)||(r[0]===b&&r[1]===a));return r?r[2]:null}

// Custom rosters go here. Format per player:
// {first,last,num,pos,yr:'SR',ht:'6-2',wt:205, ovr:84}  or add attrs:{SPD:90,...}
// ---- Depth-chart slots (fill-in template). Slot order = depth order. ----
const SLOT_DEFS=[['QB',['QB1','QB2','QB3']],['RB',['HB1','HB2','HB3','HB4']],['WR',['WR1','WR2','WR3','WR4','WR5','WR6','WR7']],['TE',['TE1','TE2','TE3']],
 ['OL',['LT','LG','C','RG','RT','OL6','OL7','OL8','OL9','OL10']],['DL',['LDE','LDT','RDT','RDE','DL5','DL6','DL7','DL8']],['LB',['LOLB','MLB','ROLB','LB4','LB5','LB6','LB7','LB8','LB9','LB10','LB11']],
 ['CB',['CB1','CB2','CB3','CB4','CB5','CB6']],['S',['FS','SS','S3','S4']],['K',['K']],['P',['P']]];
const SLOT_POS={},SLOT_RANK={};for(const [pos,arr] of SLOT_DEFS)arr.forEach((s,i)=>{SLOT_POS[s]=pos;SLOT_RANK[s]=i});
function slotLabel(s){if(/^(LDE|RDE)$/.test(s))return'DE';if(/^(LDT|RDT)$/.test(s))return'DT';const m=s.match(/^([A-Z]+)\d+$/);return m?m[1]:s}
// Baked-in Mishawaka players (anything saved in the Roster Builder overrides these by slot).
const DEFAULT_SLOTS={
 QB1:{clutch:'O',cw:1,first:'Sam',last:'Schrader',num:11,label:'QB',ht:'5-10',wt:210,yr:'JR',captain:true,
  attrs:{STR:89,SPD:97,STA:92,END:95,AGI:94,POW:93,TRK:98,SPR:99,THP:97,THA:97,IQ:99}, est:{CAR:88}},
 QB2:{first:'Evan',last:'Fras',num:14,label:'QB',yr:'SO',ovr:80,bio:'Solid backup. Gets the job done, but not at Schrader\'s level.',
  attrs:{SPR:92}, est:{THP:80,THA:79,SPD:82,AGI:80,IQ:79,STR:76,STA:84,END:83,POW:76,TRK:77,CAR:80}},
 QB3:{from:2027,first:'Darian',last:'Phillips',num:24,label:'QB',yr:'FR',ovr:83,bio:'Bigger arm and more accurate than Fras, but not as quick or as sharp with decisions as Schrader.',
  attrs:{SPR:92}, est:{THP:89,THA:86,SPD:80,AGI:78,IQ:80,STR:80,STA:84,END:84,POW:79,TRK:78,CAR:80}},
 HB1:{clutch:'O',cw:.3,first:'Matt',last:'Carver',num:26,label:'HB',ht:'6-2',wt:200,yr:'JR',
  attrs:{STR:85,SPD:97,STA:94,END:92,AGI:94,POW:91,TRK:96,SPR:99,IQ:94}, est:{CAR:90,CTH:85}},
 TE1:{from:2027,first:'JJ',last:'Schmatz',nick:'JJ',bio:"Jacob's younger brother. Bigger and stronger, not quite the athlete. Moved from right tackle to tight end, and turns out he can catch: a 300-lb receiving lineman who lives in the end zone. Everybody just calls him JJ.",recTE:true,num:77,label:'TE/OL',ht:'6-7',wt:300,yr:'FR',
  attrs:{STR:98,SPD:88,STA:90,END:93,AGI:88,POW:93,TRK:89,IQ:88,SPR:91}, est:{BLK:93,CTH:88,CAR:82}},
 LT:{first:'Zach',last:'Lytle',num:70,label:'LT/RT',ht:'6-4',wt:275,yr:'JR',
  attrs:{STR:94,SPD:90,STA:90,END:91,AGI:89,POW:92,TRK:90,IQ:90,SPR:92}, est:{BLK:92}},
 LG:{first:'Austin',last:'Kisrow',num:76,label:'LG/RG',ht:'6-3',wt:310,yr:'FR',
  attrs:{STR:98,SPD:89,STA:89,END:89,AGI:90,POW:94,TRK:94,IQ:88,SPR:91}, est:{BLK:93}},
 C:{first:'KJ',last:'Karczewski',nick:'KJ',num:69,label:'C',ht:'6-0',wt:265,yr:'JR',
  attrs:{STR:90,SPD:88,STA:88,END:88,AGI:88,POW:89,TRK:89,IQ:96,SPR:96}, est:{BLK:92}},
 RG:{first:'Christian',last:'Mestach',num:66,label:'RG/LG',ht:'6-3',wt:290,yr:'FR',
  attrs:{STR:92,SPD:85,STA:88,END:86,AGI:85,POW:89,TRK:85,IQ:89,SPR:92}, est:{BLK:90}},
 HB2:{first:'Tyler',last:'McDaniel',num:42,label:'FB/HB',ht:'6-1',wt:225,yr:'JR',bio:'Starting fullback. Great at running the ball.',
  attrs:{STR:92,SPD:94,STA:94,END:90,AGI:92,POW:93,TRK:95,IQ:95,SPR:95}, est:{CAR:94,CTH:84,BLK:92}},
 HB3:{first:'Angelo',last:'Multari',num:8,label:'HB/KR',kr:true,ht:'5-6',wt:190,yr:'—',bio:'Incredibly quick. Can be very arrogant. Kick returner.',
  attrs:{STR:85,SPD:99,STA:97,END:96,AGI:98,POW:92,TRK:91,IQ:94,SPR:91}, est:{CAR:90,CTH:84}},
 CB1:{first:'James',last:'Alexander',num:15,label:'CB/QB',pos2:'QB',ht:'5-11',wt:215,yr:'FR',
  attrs:{STR:90,SPD:96,STA:96,END:96,AGI:96,POW:93,TRK:96,SPR:99}, est:{IQ:90,COV:92,TAK:88,CTH:88,THP:86,THA:82}},
 LDE:{first:'Chandler',last:'Hill',num:62,label:'DE',ht:'6-0',wt:250,yr:'FR',mean:1,bio:'One of the meanest defenders in the league (only Duell Bailey, Braxton Eby and Macko are nastier). Plays every snap angry.',
  attrs:{STR:96,SPD:90,STA:88,END:96,AGI:90,POW:93,TRK:92,IQ:90,SPR:99}, est:{PRS:92,TAK:92}},
 LDT:{first:'Alejandro',last:'Hernandez',num:90,label:'NT',ht:'5-9',wt:270,yr:'JR',bio:'Very strong, but quick to anger.',
  attrs:{STR:99,SPD:88,STA:89,END:96,AGI:92,POW:93,TRK:90,IQ:85,SPR:96}, est:{PRS:91,TAK:92}},
 RDT:{first:'Eric',last:'Escobedo',num:51,label:'DE',ht:'6-1',wt:250,yr:'—',
  attrs:{STR:97,SPD:89,STA:93,END:95,AGI:92,POW:93,TRK:91,IQ:96,SPR:92}, est:{PRS:91,TAK:95}},
 RDE:{clutch:'D',cw:.5,first:'Jacob',last:'Schmatz',nick:'Schmatz',bio:'Team captain. Also called Schmatzy. Older brother of JJ, a year younger, who joins the team at tight end.',num:85,label:'DE',ht:'6-6',wt:275,yr:'FR',captain:true,
  attrs:{STR:97,SPD:91,STA:94,END:92,AGI:94,POW:94,TRK:94,SPR:99,IQ:95}, est:{PRS:93,TAK:92,CTH:86,BLK:90}},
 MLB:{clutch:'D',cw:1,first:'Isaiah',last:'Freet',num:25,label:'ILB',ht:'5-11',wt:215,yr:'FR',leader:true,
  attrs:{STR:90,SPD:96,STA:90,END:96,AGI:92,TRK:90,POW:93,IQ:96,SPR:99}, est:{TAK:93,COV:88}},
 LB4:{clutch:'D',cw:1,first:'Tanner',last:'Bradley',num:32,label:'ILB/FB',pos2:'FB',ht:'6-1',wt:225,yr:'FR',captain:true,
  attrs:{STR:93,SPD:95,STA:94,END:97,AGI:92,TRK:96,POW:94,IQ:96,SPR:99}, est:{TAK:93,COV:88,BLK:88,CTH:82,CAR:88}},
 ROLB:{first:'Keegan',last:'Hood',num:57,label:'OLB',ht:'6-3',wt:250,yr:'JR',
  attrs:{STR:93,SPD:95,STA:94,END:95,AGI:92,POW:94,TRK:92,IQ:92,SPR:91}, est:{PRS:94,TAK:93}},
 LB6:{first:'Zach',last:'Walker',num:47,label:'OLB',ht:'5-10',wt:225,yr:'—',ovr:88,bio:'Loves to hit people.',est:{}},
 LB7:{first:'Nate',last:'Oswalt',num:21,label:'OLB',ht:'5-11',wt:220,yr:'—',ovr:88,bio:'Loves to hit people. (Number 21 unconfirmed.)',est:{}},
 LB8:{first:'Cameron',last:'Thomas',num:48,label:'LB/CB',pos2:'CB',ht:'6-0',wt:225,yr:'—',ovr:84,bio:'Backup linebacker who also fills in at corner.',est:{}},
 CB3:{first:'Braedon',last:'Lewis',num:10,label:'NB',ht:'6-0',wt:210,yr:'—',ovr:86,bio:'Nickel back.',est:{}},
 FS:{first:'DJ',last:'Morrow',nick:'DJ Morrow',num:29,label:'FS',ht:'5-8',wt:175,yr:'—',ovr:88,est:{}},
 SS:{first:'Gabe',last:'Helmus',num:93,label:'SS',ht:'5-8',wt:180,yr:'—',ovr:88,est:{}},
 LOLB:{first:'Jared',last:'Mackowicz',nick:'Macko',hitter:true,num:13,label:'OLB',ht:'6-1',wt:225,yr:'FR',ovr:95,mean:1.5,bio:'Hits hard. Every play. Meaner than Chandler Hill; only Duell Bailey and Braxton Eby are nastier.',attrs:{TAK:98,POW:97,STR:93}},
 LB5:{first:'Kirk',last:'Standridge',num:40,label:'LB',ht:'5-10',wt:210,yr:'FR',ovr:90},
 LB10:{first:'Sean',last:'Imus',num:0,numStr:'00',label:'ST',wild:true,ht:'5-8',wt:185,yr:'FR',ovr:66,bio:'Special teams. Strong as an ox, fast, and totally unpredictable. Sometimes wears his street clothes under the uniform. Isaiah Freet can always get him dancing. Keep running, Sean!',attrs:{STR:97,SPD:93,STA:95,END:97,AGI:70,POW:94,TRK:90,IQ:35,SPR:99,TAK:84}},
 LB9:{first:'Devin',last:'Conley',num:52,label:'LB/DL',ht:'5-8',wt:225,yr:'—',ovr:80,bio:'Not the greatest, but tough as nails.',attrs:{END:96,STA:94,TAK:86}},
 DL5:{first:'Braxton',last:'Eby',num:56,label:'DL',ht:'6-1',wt:245,yr:'JR',ovr:90,mean:2,bio:'One of the two meanest players in the league (only Duell Bailey might be worse). Plays through the whistle and wants everybody to know it. Even Macko and Chandler Hill are nicer.',attrs:{TAK:95,POW:95,PRS:93}},
 LB11:{first:'Duell',last:'Bailey',num:88,label:'LB',ht:'5-9',wt:190,yr:'FR',ovr:82,mean:3,expel:true,bio:'Known troublemaker. Academically ineligible to start, already expelled once, and maybe the nastiest hitter in the league. Nobody knows if he makes it to graduation.',attrs:{TAK:96,POW:94,SPD:88,IQ:55}},
 DL6:{first:'Tristan',last:'McDonald',num:45,label:'DL',ht:'6-0',wt:250,yr:'FR',ovr:80,bio:'Very strong, but hard to motivate. Can be a liability.',attrs:{STR:97,POW:93,IQ:60,END:66,STA:68}},
 S3:{first:'Daegan',last:'Bolinger',num:31,label:'S',ht:'6-0',wt:215,yr:'—',ovr:80},
 WR1:{first:'Kyle',last:'Carlson',num:22,label:'WR',ht:'6-0',wt:180,yr:'—',ovr:89},
 WR2:{first:'Devin',last:'Shaw',num:18,label:'WR',yr:'—',ovr:85,bio:'Ratings coming later.'},
 WR3:{first:'Preston',last:'Maxfield',num:20,label:'WR',ht:'6-5',yr:'—',ovr:85,bio:'Ratings coming later.'},
 WR4:{first:'Marcus',last:'Newton',num:9,label:'WR',yr:'—',ovr:78,bio:'Ratings coming later.'},
 WR5:{first:'Zach',last:'Marshman',num:45,label:'WR',yr:'—',ovr:78,bio:'Ratings coming later.'},
 WR6:{first:'Jared',last:'Campbell',num:2,label:'WR',ht:'5-7',wt:165,yr:'—',ovr:75,bio:'Not the greatest, but quick.',attrs:{SPD:94,AGI:92}},
 WR7:{first:'David',last:'Carlos',num:6,label:'WR',yr:'—',ovr:78,bio:'Ratings coming later.'},
 TE2:{first:'Aaron',last:'Hensley',num:87,label:'TE',yr:'—',ovr:78,bio:'Ratings coming later.'},
 HB4:{first:'Andrew',last:'Beck',num:28,label:'HB',yr:'—',ovr:78,bio:'Ratings coming later.'},
 RT:{first:'Dylan',last:'Stone',num:72,label:'RT/RG',ht:'6-3',wt:300,yr:'FR',ovr:80},
 OL6:{first:'Treigh',last:'Seiler',num:58,label:'OL',yr:'—',ovr:78,bio:'Ratings coming later.'},
 OL7:{first:'Nick',last:'Shride',num:67,label:'OL',yr:'—',ovr:78,bio:'Ratings coming later.'},
 CB2:{first:'Wes',last:'Lafluer',num:27,label:'CB',yr:'—',ovr:78,bio:'Ratings coming later.'},
 CB4:{first:'Zach',last:'Chovanec',num:12,label:'CB',yr:'FR',ovr:78,bio:'Ratings coming later.'},
 K:{first:'Cody',last:'Childress',num:0,label:'K',ht:'6-8',wt:220,yr:'—',ovr:99,bio:'Best kicker in the game. A 6\'8" leg with range for days.',
  attrs:{KPW:99,KAC:99,SPR:95}, est:{STR:80,SPD:70,STA:85,END:85,AGI:68,POW:82,TRK:70,IQ:92,TAK:60}},
};
let SAVED_SLOTS={}; // filled from the Roster Builder (db/local)
// Mishawaka moved back one class (Nov 2026): saved Roster Builder players keep the old class, so shift them too.
const CLS_BACK={SR:'JR',JR:'SO',SO:'FR',FR:'FR'};function shiftRec(v){return v&&!v.shifted&&CLS_BACK[v.yr]?Object.assign({},v,{yr:CLS_BACK[v.yr],shifted:1}):v}
function mergedSlots(){const m={},nm=v=>((v.first||'')+' '+(v.last||'')).toLowerCase().trim(),saved=new Set(Object.values(SAVED_SLOTS).filter(v=>v&&!v.cleared).map(nm));
 for(const k of Object.keys(SLOT_POS)){const fromSaved=k in SAVED_SLOTS,v=fromSaved?shiftRec(SAVED_SLOTS[k]):DEFAULT_SLOTS[k];if(!v||v.cleared||!(v.first||v.last))continue;if(!fromSaved&&saved.has(nm(v)))continue;m[k]=v}return m}
function slotToCustom(slot,r){return Object.assign({},r,{slot,pos:SLOT_POS[slot],label:r.label||slotLabel(slot)})}
const CUSTOM_ROSTERS={get MISH(){const m=mergedSlots();return Object.keys(m).map(k=>slotToCustom(k,m[k]))}};

// ---- RNG ----
function mulberry32(a){return function(){a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
function hashStr(s){let h=2166136261;for(const c of s){h^=c.charCodeAt(0);h=Math.imul(h,16777619)}return h>>>0}
let R = Math.random;
const rnd=()=>R();
const ri=(a,b)=>Math.floor(rnd()*(b-a+1))+a;
const pick=a=>a[Math.floor(rnd()*a.length)];
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
function gauss(m,s){let u=0,v=0;while(!u)u=rnd();while(!v)v=rnd();return m+s*Math.sqrt(-2*Math.log(u))*Math.cos(2*Math.PI*v)}
function wpick(pairs){let t=pairs.reduce((s,p)=>s+p[1],0),r=rnd()*t;for(const p of pairs){if((r-=p[1])<=0)return p[0]}return pairs[pairs.length-1][0]}

// ---- PLAYERS ----
const ATTRS=['STR','SPD','STA','END','AGI','POW','TRK','IQ','SPR','THP','THA','CTH','CAR','BLK','PRS','TAK','COV','KPW','KAC'];
const ATTR_NAMES={STR:'Strength',SPD:'Speed',STA:'Stamina',END:'Endurance',AGI:'Agility',POW:'Power',TRK:'Trucking',IQ:'Football IQ',SPR:'Spirit',THP:'Throw Power',THA:'Throw Accuracy',CTH:'Catching',CAR:'Ball Security',BLK:'Blocking',PRS:'Pass Rush',TAK:'Tackling',COV:'Coverage',KPW:'Kick Power',KAC:'Kick Accuracy'};
const POS={
 QB:{n:3,s:1,k:{THA:.32,THP:.24,IQ:.24,SPD:.08,AGI:.06,STR:.06},ht:[72,77],wt:[190,230],nums:[[1,19]]},
 RB:{n:4,s:1,k:{SPD:.22,AGI:.18,CAR:.14,TRK:.14,POW:.10,STR:.08,CTH:.08,IQ:.06},ht:[67,73],wt:[180,225],nums:[[1,49]]},
 WR:{n:7,s:3,k:{SPD:.26,CTH:.32,AGI:.18,IQ:.14,STR:.05,POW:.05},ht:[69,76],wt:[170,210],nums:[[1,19],[80,89]]},
 TE:{n:3,s:1,k:{CTH:.26,BLK:.26,STR:.16,SPD:.12,POW:.10,IQ:.10},ht:[74,78],wt:[225,255],nums:[[80,89],[40,49]]},
 OL:{n:10,s:5,k:{BLK:.42,STR:.28,POW:.15,IQ:.15},ht:[74,79],wt:[270,320],nums:[[50,79]]},
 DL:{n:8,s:4,k:{STR:.22,POW:.18,PRS:.20,TAK:.18,AGI:.10,SPD:.12},ht:[73,78],wt:[240,300],nums:[[90,99],[50,79]]},
 LB:{n:7,s:3,k:{TAK:.28,IQ:.20,SPD:.16,STR:.12,POW:.10,COV:.14},ht:[71,75],wt:[205,240],nums:[[40,59]]},
 CB:{n:6,s:2,k:{COV:.36,SPD:.30,AGI:.16,IQ:.12,TAK:.06},ht:[68,73],wt:[170,195],nums:[[1,39]]},
 S:{n:4,s:2,k:{COV:.26,TAK:.22,SPD:.22,IQ:.18,POW:.06,AGI:.06},ht:[70,74],wt:[185,210],nums:[[1,49]]},
 K:{n:1,s:1,k:{KPW:.5,KAC:.5},ht:[69,74],wt:[165,195],nums:[[1,19],[90,99]]},
 P:{n:1,s:1,k:{KPW:.6,KAC:.4},ht:[70,75],wt:[170,200],nums:[[1,19],[90,99]]}};
const POS_ORDER=Object.keys(POS);
const FIRST=['Jalen','Marcus','Tyler','Devon','Caleb','Jaylen','Isaiah','Ethan','Malik','Cole','Brandon','Trey','Darius','Logan','Xavier','Mason','Andre','Cameron','Jordan','Elijah','Tristan','Nate','Javion','Gavin','Dominic','Kobe','Owen','Terrell','Bryce','Lucas','Jamal','Hunter','Micah','Quinton','Austin','Deshawn','Carter','Zion','Wyatt','Tre','Kendrick','Blake','Amari','Cooper','Jace','Damon','Landon','Rashad','Grant','Mekhi','Aidan','Keon','Brody','Jaden','Reggie','Colton','Davion','Luke','Tavion','Ryder'];
const LAST=['Johnson','Williams','Carter','Brooks','Miller','Davis','Thompson','Harris','Walker','Coleman','Bennett','Hayes','Reed','Foster','Simmons','Price','Barnes','Russell','Griffin','Hughes','Wallace','Porter','Hunter','Jenkins','Perry','Powell','Long','Patterson','Bryant','Alexander','Sanders','Ross','Mitchell','Ward','Turner','Parker','Collins','Stewart','Morris','Rogers','Cook','Bell','Murphy','Bailey','Cooper','Howard','Kelly','Sullivan','Fisher','Grant','Hamilton','Graham','Kowalski','Novak','Schultz','Wagner','Becker','Hoffman','Lindqvist','Ramirez','Ortiz','Delgado','Navarro','Okafor','Mensah','Dawson','Vaughn','Lawson','Holt','McCoy','Banks','Fleming','Tate','Pruitt','Whitfield','Haskins','Strickland','Bowman','Kirby','Marsh'];

function makePlayer(pos,off,star){const P=POS[pos],noise={};for(const a of ATTRS)noise[a]=gauss(0,a in P.k?3.5:6);
 return{pos,off,star,noise,first:pick(FIRST),last:pick(LAST),ht:ri(P.ht[0],P.ht[1]),wt:Math.round(ri(P.wt[0],P.wt[1])/5)*5,yr:'JR'}}
function rate(p,base){const k=POS[p.pos].k,isK=p.pos==='K'||p.pos==='P';p.a={};
 for(const a of ATTRS){let v;if(a in k)v=base+p.noise[a];
  else if(a==='SPR'){p.a.SPR=p.spr??70;continue}
  else if(a==='STA'||a==='END')v=base-6+p.noise[a];
  else if(isK)v=base-38+p.noise[a];
  else if(a==='KPW'||a==='KAC')v=25+Math.abs(p.noise[a])*2;
  else{v=base-20+p.noise[a];if(a==='SPD'&&p.pos==='OL')v-=12}
  p.a[a]=clamp(Math.round(v),20,99)}
 p.ovr=posOvr(p,p.pos)}
const XPOS={FB:{k:{BLK:.3,STR:.2,POW:.15,TRK:.15,CAR:.1,CTH:.1}}};
function posOvr(p,pos){return clamp(Math.round(Object.entries((POS[pos]||XPOS[pos]).k).reduce((s,[a,w])=>s+w*p.a[a],0)),25,99)}
function ovrAt(p,pos){return pos===p.pos?p.ovr:(p.ovr2||posOvr(p,pos))}
function pickYr(st){return st?wpick([['SR',45],['JR',35],['SO',15],['FR',5]]):wpick([['FR',35],['SO',35],['JR',20],['SR',10]])}
// In a 3-4 the three down linemen are both ends plus the nose (LDT); RDT rotates in.
const RANK34={LDE:0,LDT:1,RDE:2,RDT:3};
function depthOf(pl,front){const rk=p=>front==='34'&&p.pos==='DL'&&p.slot in RANK34?RANK34[p.slot]:p.rank;const d={};for(const pos of POS_ORDER)d[pos]=pl.filter(p=>p.pos===pos).sort((a,b)=>(rk(a)!=null&&rk(b)!=null)?rk(a)-rk(b):b.ovr-a.ovr);
 for(const p of pl)if(p.pos2&&d[p.pos2]){const arr=d[p.pos2];const i=arr.findIndex(q=>ovrAt(q,p.pos2)<ovrAt(p,p.pos2));{let lr=-1;arr.forEach((q,j)=>{if(q.real)lr=j});arr.splice(p.start2?0:Math.max(1,lr+1,i<0?arr.length:i),0,p)}}return d}
function sN(t,pos){return (t&&t.front==='34'?{DL:3,LB:4}:{})[pos]??POS[pos].s}
function calcOvrRaw(pl,t){const u=units({depth:depthOf(pl,t&&t.front),front:t&&t.front},true);const x=((u.pass+u.run)/2+(u.rdef+u.pdef+u.rush)/3)/2;return x+.35*(x-70)}
function parseHt(h){if(typeof h==='number')return h;if(!h)return 0;const m=String(h).match(/(\d)\D+(\d+)/);return m?(+m[1])*12+(+m[2]):0}
function fmtHt(i){return Math.floor(i/12)+"'"+(i%12)+'"'}
function customPlayer(c){const p=makePlayer(c.pos,0,!!c.star);
 Object.assign(p,{hitter:c.hitter,mean:c.mean,expel:c.expel,from:c.from,recTE:c.recTE,wild:c.wild,numStr:c.numStr,kr:c.kr,start2:c.start2,nick:c.nick,bio:c.bio,slot:c.slot,rank:c.slot!=null?SLOT_RANK[c.slot]:undefined,first:c.first||'',last:c.last||'',yr:c.yr||'—',ht:parseHt(c.ht)||p.ht,wt:c.wt||p.wt,fixedNum:c.num,pos2:c.pos2,label:c.label,captain:c.captain,leader:c.leader,clutch:c.clutch,cw:c.cw,real:true,est:ATTRS.filter(a=>!(c.attrs&&a in c.attrs)),photo:c.photo,spr:(c.attrs&&c.attrs.SPR)||95});
 rate(p,c.ovr||85);if(c.bio&&/hit people/.test(c.bio)){p.a.TAK=Math.min(99,p.a.TAK+4);p.a.POW=Math.min(99,p.a.POW+4)}if(!c.attrs)p.a.SPR=95;Object.assign(p.a,c.est||{},c.attrs||{});p.ovr=c.ovr||posOvr(p,p.pos);if(p.pos2)p.ovr2=posOvr(p,p.pos2);return p}
function assignNumbers(pl){const used=new Set(pl.filter(p=>p.fixedNum!=null).map(p=>p.fixedNum));
 for(const p of pl){if(p.real){p.num=p.fixedNum??null;continue}const c=[];for(const [a,b] of POS[p.pos].nums)for(let n=a;n<=b;n++)if(!used.has(n))c.push(n);
  let n=c.length?pick(c):0;if(!n){for(let i=1;i<100;i++)if(!used.has(i)){n=i;break}}p.num=n;used.add(n)}}
function units(t,raw){const d=t.depth,s=(pos,i)=>ovrAt(d[pos][Math.min(i,d[pos].length-1)],pos),av=a=>a.reduce((x,y)=>x+y,0)/a.length;
 const qb=s('QB',0),rb=s('RB',0),wr=av([0,1,2].map(i=>s('WR',i))),te=s('TE',0),ol=av([0,1,2,3,4].map(i=>s('OL',i))),
  dl=av([...Array(sN(t,'DL')).keys()].map(i=>s('DL',i))),lb=av([...Array(sN(t,'LB')).keys()].map(i=>s('LB',i))),cb=av([0,1].map(i=>s('CB',i))),sf=av([0,1].map(i=>s('S',i)));
 const u={pass:(qb*2.2+wr*1.5+te*.5+ol*1.2)/5.4,run:(rb*1.6+ol*2+te*.6+qb*.3)/4.5,rush:(dl*2+lb*.8)/2.8,rdef:(dl*1.6+lb*1.8+sf*.6)/4,pdef:(cb*2+sf*1.4+lb*.6+dl*.6)/4.6};
 const cv=x=>clamp(Math.round(x+.35*(x-70)),40,99);if(raw)return u;u.OFF=cv((u.pass+u.run)/2);u.DEF=cv((u.rdef+u.pdef+u.rush)/3);
 const sts=starters(t);u.cond=av(sts.map(p=>(p.a.STA+p.a.END)/2));u.spirit=av(sts.map(p=>p.a.SPR));return u}
function starters(t){const out=[];for(const pos of POS_ORDER){if(pos==='K'||pos==='P')continue;for(const p of t.depth[pos].slice(0,sN(t,pos)))if(!out.includes(p))out.push(p)}return out}

// One generated player for a roster slot. Same formula every season, so talent and size spreads never drift.
function genFill(t,pos,i,stt,genSpr){const P=POS[pos];
 let off=stt?gauss(0,3):-(5+(i-P.s)*2.5+rnd()*5)*(t.deep?.45:1)+(t.deepest&&!stt?8:0)+gauss(0,2.5),star=false;
 if(pos!=='K'&&pos!=='P'&&rnd()<t.star*(stt?1.6:.45)){star=true;off+=ri(8,13)}
 if(t.farm)off+=({OL:5,DL:5,TE:3,LB:2,RB:1,QB:-4,WR:-5,CB:-5,S:-3}[pos]||0);if(t.speed)off+=({WR:5,RB:5,CB:5,S:3,LB:1,QB:1,OL:-3,DL:-3,TE:-1}[pos]||0);const p=makePlayer(pos,off,star);if(t.farm){p.noise.STR+=7;p.noise.POW+=5;p.noise.SPD-=3;p.wt+=ri(8,18)}if(t.speed){p.noise.SPD+=7;p.noise.AGI+=5;p.noise.STR-=3;p.noise.POW-=2;p.wt-=ri(8,18)}/* speed program: faster, quicker, lighter */if(t.size){const z=t.size;p.ht+=ri(z.ht[0],z.ht[1]);p.wt+=Math.round(ri(z.wt[0],z.wt[1])/5)*5;if(z.min&&p.ht<z.min)p.ht=z.min+ri(0,2)}else if(t.big){p.ht+=ri(1,2);p.wt+=ri(12,25)}p.spr=genSpr();return p}
// ---- GRADUATION / NEW CLASSES ----
// The 2026 roster is the base. Every season after, seniors graduate and their spot goes to a new player (seeded by team, spot
// and the year he arrived, so a save always shows the same people). Returning players keep their name, number and size and
// move up a class. Team strength is re-calibrated to the same rating each year, so results and stats spreads stay the same.
// class a new player arrives on varsity in (starters usually as sophomores/juniors, backups as freshmen/sophomores)
const entryYr=st=>st?wpick([['FR',12],['SO',38],['JR',38],['SR',12]]):wpick([['FR',50],['SO',35],['JR',12],['SR',3]]);
let ROSTER_YEAR=2026,EXPEL_YEAR=0;const ROSTER_BASE=2026,YRI={FR:0,SO:1,JR:2,SR:3},YRN=['FR','SO','JR','SR'];
function turnover(t,fill,genSpr){const Y=ROSTER_YEAR;if(Y<=ROSTER_BASE)return fill;const mainR=R;
 // walk forward year by year so jersey numbers are chosen once, when a player arrives, and never change
 const S=fill.map(p=>{const c=YRI[p.yr]??(t.id==='MISH'?1:2),real=!!p.real,pos=p.pos,i=real?(p.rank??0):+p._key.split(':')[1];
  return{orig:p,real,pos,i,key:real?'R:'+(p.slot||p.last):p._key,stt:real?i<POS[pos].s:p._stt,grad:p._late?ROSTER_BASE+4:(real&&p.expel&&EXPEL_YEAR)?Math.min(ROSTER_BASE+(3-c),EXPEL_YEAR-1):(real&&p.from)?p.from+3:ROSTER_BASE+(3-c),entry:ROSTER_BASE,num:p.num,slot:p.slot,rank:p.rank}});
 const numsFor=pos=>{const c=[];for(const [a,b] of POS[pos].nums)for(let n=a;n<=b;n++)c.push(n);return c};
 for(let y=ROSTER_BASE+1;y<=Y;y++){const leaving=S.filter(o=>y>o.grad);for(const o of leaving){o.orig=null;o.num=null;o.entry=y;R=mulberry32(hashStr(t.id+':'+o.key+':'+y));o.grad=y+(3-YRI[entryYr(o.stt)])}
  const used=new Set(S.filter(o=>o.num!=null).map(o=>o.num));
  for(const o of leaving){const pos=o.pos,c=numsFor(pos);R=mulberry32(hashStr(t.id+':num:'+o.key+':'+o.entry));let k=Math.floor(rnd()*c.length),n=0;
   for(let q=0;q<c.length;q++){const v=c[(k+q)%c.length];if(!used.has(v)){n=v;break}}if(!n)for(let q=1;q<100;q++)if(!used.has(q)){n=q;break}o.num=n;used.add(n)}}
 const out=S.map(o=>{let p;if(o.orig){p=o.orig;p.yr=YRN[3-(o.grad-Y)]}else{R=mulberry32(hashStr(t.id+':'+o.key+':'+o.entry));entryYr(o.stt);
   p=genFill(t,o.pos,o.i,o.stt,genSpr);p._stt=o.stt;p._key=o.key;p.slot=o.real?undefined:o.slot;p.rank=o.real?100+o.i:o.rank;p.yr=YRN[3-(o.grad-Y)];p._new=true}
  p.num=o.num;if(!p.real)p.off+=Math.max(0,Y-Math.max(o.entry,ROSTER_BASE))*1.0;return p});R=mainR;return out}
// The rich programs carry huge rosters: 80 players, so their backups (and backups' backups) keep coming at you
const ROSTER80={CARMEL:1,CATH:1,PENN:1,BD:1,WC:1},EXTRA80={QB:1,RB:2,WR:4,TE:2,OL:6,DL:4,LB:3,CB:2,S:2};
function isX80(p){const k=p&&p._key;if(!k||p.real)return false;const [ps,ix]=k.split(':');return !!POS[ps]&&+ix>=POS[ps].n}
const coreOf=pl=>pl.filter(p=>!isX80(p));
function buildTeam(t){R=mulberry32(hashStr(t.id+':s1'));const cr=CUSTOM_ROSTERS[t.id];
 const real=cr&&cr.length?cr.map(customPlayer).filter(p=>!(p.from>ROSTER_YEAR)):[];t.realCount=real.length;t.fullCustom=real.length>=8;
 const isMish=t.id==='MISH',genSpr=()=>isMish?ri(95,98):clamp(Math.round(gauss(72,8)),45,90);
 const fill=[];for(const pos of POS_ORDER){const P=POS[pos],have=real.filter(p=>p.pos===pos).length;const slotsFree=real.length?SLOT_DEFS.find(x=>x[0]===pos)[1].filter(sl=>!real.some(p=>p.slot===sl)):null;
   for(let j=0;j<P.n-have;j++){const i=slotsFree?SLOT_RANK[slotsFree[j]]:have+j,stt=i<P.s;
   const p=genFill(t,pos,i,stt,genSpr);p.yr=pickYr(stt);p._stt=stt;p._key=pos+':'+i;if(slotsFree){p.slot=slotsFree[j];p.rank=i}fill.push(p)}}
 if(ROSTER80[t.id]){const mainR=R;R=mulberry32(hashStr(t.id+':x80'));for(const pos of POS_ORDER){const P=POS[pos];for(let j=0;j<(EXTRA80[pos]||0);j++){const i=P.n+j;const p=genFill(t,pos,i,false,genSpr);p.yr=pickYr(false);p._stt=false;p._key=pos+':'+i;p.star=false;fill.push(p)}}R=mainR}
 {const cap=Math.max(1,Math.round(t.star*50))-real.length;let stars=fill.filter(p=>p.star).sort((a,b)=>a.off-b.off);while(stars.length>Math.max(0,cap)){const p=stars.shift();p.star=false;p.off-=10}}
 if(t.superstar){const s=fill.find(p=>p.pos==='RB')||fill.find(p=>p.pos==='QB');s.star=true;s.superstar=true;s.off+=14}
 if(!real.length&&t.star>=.07&&!fill.some(p=>p.star)){const c=fill.filter(p=>['QB','RB','WR','CB','LB'].includes(p.pos));const p=pick(c);p.star=true;p.off+=11}
 const pl=real.concat(fill);
 if(t.fullCustom){fill.forEach(p=>rate(p,(t.fillBase||76)+p.off));t._raw26=calcOvrRaw(pl,t);t.ovr=clamp(Math.round(t._raw26),40,99)}if(t.ovrShow){t.ovrDelta=t.ovrShow-t.ovr;t.ovr=t.ovrShow}
 else{let base=t.ovr;for(let k=0;k<18;k++){fill.forEach(p=>rate(p,base+p.off));base+=(t.ovr-calcOvrRaw(coreOf(pl),t))*.85}}
 assignNumbers(pl);pl.forEach((p,i)=>{p.id=t.id+'-'+i;p.team=t.id});
 pl.forEach(p=>{if((!isMish||!p.real)&&p.yr in CLS_BACK){if(p.yr==='FR')p._late=1;p.yr=CLS_BACK[p.yr]}}); // every school moved back one class with Mishawaka
 // the old freshmen aren't in the league yet: in 2026 a senior holds the spot (same ability), then the kid arrives as a freshman in 2027
 if(ROSTER_YEAR<=ROSTER_BASE)for(const p of pl)if(p._late){const R0=R;R=mulberry32(hashStr(t.id+':late:'+p.id));p.first=pick(FIRST);p.last=pick(LAST);p.yr='SR';R=R0}
 if(ROSTER_YEAR>ROSTER_BASE){const pl2=turnover(t,pl,genSpr),gen=pl2.filter(p=>!p.real);
  // keep the team exactly as strong as before: generated players are re-rated until the roster matches its usual rating
  const target=t.fullCustom?t._raw26:(t.ovrDelta!=null?t.ovr-t.ovrDelta:t.ovr);let base=t.fullCustom?(t.fillBase||76):target;for(let k=0;k<18;k++){gen.forEach(p=>rate(p,base+p.off));base+=(target-calcOvrRaw(coreOf(pl2),t))*.85}
  pl2.forEach((p,i)=>{p.id=t.id+'-'+i;p.team=t.id});pl.length=0;pl.push(...pl2)}
 t.players=pl;t.depth=depthOf(pl,t.front);
 if(ROSTER80[t.id]){const xt=isX80;for(const pos in t.depth){const L=t.depth[pos];const core=L.filter(p=>!xt(p)),X=L.filter(xt).sort((a,b)=>ovrAt(b,pos)-ovrAt(a,pos)),out=[];let i=0;for(const p of core){while(i<X.length&&ovrAt(X[i],pos)>ovrAt(p,pos))out.push(X[i++]);out.push(p)}t.depth[pos]=out.concat(X.slice(i))}} // extras slot in by rating: a good one earns snaps, the rest are deep reserves
 // Mishawaka's luck lives in its clutch players. When they graduate, the next leaders inherit the role so the program keeps its magic.
 if(ROSTER_YEAR>ROSTER_BASE&&t.clutchLuck){const q=t.depth.QB[0];if(q&&!pl.some(p=>p.clutch==='O'&&p.cw>=1&&p===q)){for(const p of pl)if(p.clutch==='O'&&p.pos==='QB')p.clutch=null;q.clutch='O';q.cw=1}
  const nd=pl.filter(p=>p.clutch==='D').length;if(nd<3){const cand=pl.filter(p=>!p.clutch&&['LB','DL','S','CB'].includes(p.pos)).sort((a,b)=>b.ovr-a.ovr);for(let k=0;k<3-nd&&k<cand.length;k++){cand[k].clutch='D';cand[k].cw=1}}}t.u=units(t);t.rosterOvr=Math.round(calcOvrRaw(pl,t));R=Math.random}
// THE #1 PLAYER IN THE STATE: Warren Central's tailback. Team strength is unchanged; he just breaks more long runs.
const SUPERSTARS=[{team:'WAR',pos:'OL',idx:4,named:true,first:'Levi',last:'Hostetler',nick:'The Silo',wall:true,bio:'7-foot farm kid and the strongest man in the league. Never touched a weight room; tosses hay bales for fun. Slow off the ball, but nobody moves him.',num:79,ht:84,wt:365,yr:'SO',ovr:94,a:{STR:99,SPD:48,STA:80,END:88,AGI:55,POW:99,TRK:85,IQ:84,SPR:70,THP:30,THA:30,CTH:40,CAR:45,BLK:99,PRS:72,TAK:70,COV:30,KPW:25,KAC:25}},{team:'JIM',pos:'QB',named:true,chem:true,first:'Gage',last:'Newcomer',num:14,ht:68,wt:180,yr:'SR',ovr:93,a:{STR:76,SPD:91,STA:92,END:94,AGI:95,POW:74,TRK:80,IQ:96,SPR:99,THP:89,THA:93,CTH:72,CAR:86,BLK:55,PRS:50,TAK:55,COV:55,KPW:30,KAC:30}},{team:'JIM',pos:'OL',named:true,chem:true,first:'Eric',last:'Brown',nick:'Big E',num:67,ht:75,wt:275,yr:'SR',ovr:88,a:{STR:93,SPD:70,STA:90,END:92,AGI:74,POW:91,TRK:80,IQ:87,SPR:96,THP:30,THA:30,CTH:55,CAR:50,BLK:92,PRS:70,TAK:68,COV:40,KPW:25,KAC:25}},{team:'JIM',pos:'DL',idx:1,named:true,chem:true,first:'Justin',last:'Nowak',num:57,ht:76,wt:245,yr:'SR',ovr:89,a:{STR:86,SPD:95,STA:88,END:92,AGI:94,POW:85,TRK:86,IQ:88,SPR:97,THP:62,THA:65,CTH:70,CAR:72,BLK:58,PRS:90,TAK:89,COV:66,KPW:25,KAC:27}},{team:'JIM',pos:'DL',named:true,chem:true,first:'Chad',last:'Housman',num:52,ht:73,wt:260,yr:'SR',ovr:93,a:{STR:96,SPD:90,STA:88,END:96,AGI:90,POW:93,TRK:92,IQ:90,SPR:99,THP:69,THA:73,CTH:72,CAR:73,BLK:59,PRS:92,TAK:92,COV:62,KPW:25,KAC:27}},{team:'MARIAN',pos:'QB',first:'Devin',last:'Cannady',num:14,ht:74,wt:200,yr:'SO',a:{STR:84,SPD:93,STA:95,END:94,AGI:96,POW:82,TRK:86,IQ:99,SPR:99,THP:98,THA:99,CAR:92,CTH:80}},{team:'WC',pos:'RB',inherit:true,first:'Marcus',last:'Hale',num:2,ht:72,wt:215,yr:'SR',a:{STR:93,SPD:99,STA:97,END:96,AGI:99,POW:96,TRK:98,IQ:96,SPR:99,CTH:94,CAR:99,BLK:80}}];
// 2026: Marcus Hale. After he graduates, Warren Central's top tailback each year inherits the role (his own name and size).
function addSuperstars(){for(const t of TEAMS)t.chem=0;{const core=SUPERSTARS.filter(s=>s.chem&&s.team==='JIM');if(core.every(s=>ROSTER_YEAR<=ROSTER_BASE+(3-YRI[CLS_BACK[s.yr]||s.yr]))){const t=TEAMS.find(x=>x.id==='JIM');if(t)t.chem=1.5}}
 for(const s of SUPERSTARS){const t=TEAMS.find(x=>x.id===s.team);if(!t||!t.depth||!t.depth[s.pos])continue;
 const grad=ROSTER_BASE+(3-YRI[CLS_BACK[s.yr]||s.yr]),mine=ROSTER_YEAR<=grad;if(!mine&&!s.inherit)continue;const p=t.depth[s.pos][s.idx||0];if(!p)continue;
 // the named star plays out his own career (moving up a class each year); after that, only an 'inherit' team passes the role on
 if(mine){const clash=t.players.find(x=>x!==p&&x.num===s.num);if(clash)clash.num=p.num;Object.assign(p,{first:s.first,last:s.last,num:s.num,ht:s.ht,wt:s.wt,yr:YRN[YRI[CLS_BACK[s.yr]||s.yr]+(ROSTER_YEAR-ROSTER_BASE)]})}
 if(s.named){Object.assign(p,{ovr:s.ovr,spr:s.a.SPR,named:true});if(s.nick)p.nick=s.nick;if(s.bio)p.bio=s.bio;if(s.wall)p.wall=1;Object.assign(p.a,s.a);continue}
 Object.assign(p,{star:true,superstar:true,ovr:99,spr:s.a.SPR});Object.assign(p.a,s.a)}
 // Penn's stars rotate by era (4-year classes), two classes apart so there is always one arriving:
 //  offense: QB 2024-27, offensive line 2028-31, running back 2032-35, then repeat (Braxton Cave-style centers get their turn)
 //  defense: defensive line 2026-29, linebacker 2030-33, then repeat
 // The star is re-rated to 97 each season; the other spots in each rotation are kept at least solid (92 / QB 90).
 {const t=TEAMS.find(x=>x.id==='PENN'),bump=(pos,to,star)=>{const p=t.depth[pos]&&t.depth[pos][0];if(!p||p.ovr>=to)return;const keep={SPR:p.a.SPR};rate(p,to);Object.assign(p.a,keep);if(pos==='OL'||pos==='DL')p.a.STR=Math.max(p.a.STR,to);p.ovr=posOvr(p,p.pos);if(star)p.star=true};
  if(t){const eO=Math.floor((ROSTER_YEAR-2024)/4),eD=Math.floor((ROSTER_YEAR-2026)/4),off=['QB','OL','RB'][((eO%3)+3)%3],def=['DL','LB'][((eD%2)+2)%2];
   for(const pos of['QB','OL','RB'])bump(pos,pos===off?97:pos==='QB'?90:92,pos===off);for(const pos of['DL','LB'])bump(pos,pos===def?97:92,pos===def)}}}
function buildAll(){const order=[...TEAMS].sort((a,b)=>(a.linkedTo?1:0)-(b.linkedTo?1:0));
 for(const t of order){if(t.linkedTo){t.ovr=clamp(TEAMS.find(x=>x.id===t.linkedTo).ovr+(t.linkDelta??-1),40,99)}buildTeam(t)}
 addSuperstars();
 // RULE: nobody in the division has as much Spirit as any Caveman.
 const M=TEAMS.find(t=>t.id==='MISH'),floor=Math.min(...M.players.map(p=>p.a.SPR)),cap=Math.min(90,floor-1);
 for(const t of TEAMS)if(t!==M){for(const p of t.players)p.a.SPR=Math.min(p.a.SPR,cap);t.u=units(t)}}

// ---- GAME ----
const opp=s=>s==='h'?'a':'h';
const nm=p=>p.nick||(p.first[0]+'. '+p.last);
function st(t,pos,i=0){const g=ACTIVE_G,sd=g?(g.h===t?'h':g.a===t?'a':null):null;const d=sd?lineup(g,sd,pos):t.depth[pos];return d[Math.min(i,d.length-1)]}
// ---- DEPTH: fatigue, rotation and one-game injuries ----
// Players tire while on the field (running backs and linemen fastest) and recover on the sideline and at halftime.
// A tired starter rotates out when a fresh backup is close enough in skill, so deep teams keep their edge late.
// Injuries are rare and last only the rest of that game; nothing carries over.
let ACTIVE_G=null;
const FAT_RATE={QB:.003,RB:.022,WR:.009,TE:.010,OL:.007,DL:.014,LB:.009,CB:.007,S:.006},OFF_POS=['QB','RB','WR','TE','OL'],DEF_POS=['DL','LB','CB','S'],NUM_ON={QB:1,RB:1,WR:3,TE:1,OL:5,CB:2,S:2},INJ_P=.00026;
function nOn(t,pos){return NUM_ON[pos]??sN(t,pos)}
function dpOf(g,s){return(g.dp||(g.dp={h:{fat:new Map(),out:new Set()},a:{fat:new Map(),out:new Set()}}))[s]}
function lineup(g,s,pos){const t=T(g,s),D=dpOf(g,s),d=t.depth[pos]||[],L=lineup0(g,s,pos,t,D,d);
 // a mean reserve (Braxton Eby) rotates in on every third snap for the weakest starter at his spot
 if((pos==='DL'||pos==='LB')&&L.length){const n=nOn(t,pos),mbs=L.slice(n).filter(p=>p&&p.mean&&!D.out.has(p)),mb=mbs[Math.floor((g.stats.h.plays+g.stats.a.plays)/3)%Math.max(1,mbs.length)];if(mb&&((g.stats.h.plays+g.stats.a.plays)%3===0)){const on=L.slice(0,n);let wi=0;on.forEach((p,i)=>{if(p&&ovrAt(p,pos)<ovrAt(on[wi],pos))wi=i});const bench=L.slice(n).filter(p=>p!==mb);on[wi]&&bench.unshift(on[wi]);on[wi]=mb;return on.concat(bench)}}
 return L}
function lineup0(g,s,pos,t,D,d){if(!D.fat.size&&!D.out.size)return d;const n=nOn(t,pos);
 const av=d.filter(p=>p&&!D.out.has(p));if(!av.length)return d;const on=av.slice(0,n),bench=av.slice(n);
 for(let i=0;i<on.length;i++){const p=on[i];if((D.fat.get(p)||0)<.45)continue;const bi=bench.findIndex(b=>(D.fat.get(b)||0)<.3&&ovrAt(b,pos)>=ovrAt(p,pos)-14&&!on.includes(b));if(bi>=0){on[i]=bench[bi];bench[bi]=p}}
 return on.concat(bench)}
function liveAdj(g,s){const t=T(g,s),D=dpOf(g,s);if(!D.fat.size&&!D.out.size)return null;const dep={};
 for(const pos in t.depth){const L=lineup(g,s,pos);dep[pos]=L.map(p=>({pos,ovr:ovrAt(p,pos)-12*Math.max(0,(D.fat.get(p)||0)-.35)}))}
 const a=units({depth:dep,front:t.front},true),b=units(t,true),o={};for(const k of['pass','run','rush','rdef','pdef'])o[k]=a[k]-b[k];return o}
function dpTick(g,o,r){if(g.q>=3&&!g._htRest){g._htRest=1;for(const s of['h','a'])for(const [p,f] of dpOf(g,s).fat)dpOf(g,s).fat.set(p,f*.4)}
 for(const s of['h','a']){const t=T(g,s),D=dpOf(g,s),P=s===o?OFF_POS:DEF_POS,on=new Set();
  for(const pos of P)for(const p of lineup(g,s,pos).slice(0,nOn(t,pos)))if(p&&!on.has(p)){on.add(p);const sta=((p.a.STA||75)+(p.a.END||75))/2;D.fat.set(p,Math.min(1,(D.fat.get(p)||0)+FAT_RATE[pos]*(1.6-sta/100)*2.4))}
  for(const [p,f] of D.fat)if(!on.has(p))D.fat.set(p,Math.max(0,f-.012));
  if(r&&!r.injury)for(const p of on){if(rnd()<INJ_P*(p.pos==='RB'||p.pos==='LB'?1.6:1)){D.out.add(p);r.injury={s,p};r.text+=' '+nm(p)+' ('+t.abbr+') is shaken up and will not return.';if(!r.banner||r.banner==='FIRST DOWN')r.banner='INJURY';break}}}}
// ---- WEATHER ----
// Rain and snow make passing, ball security and kicking harder and push play-callers toward the run.
// Snow shows up late in the season and most of all in the playoffs; the State final at Lucas Oil is always indoors.
const WX={clear:{name:'Clear',pass:0,deep:0,fum:0,int:0,kick:0,xp:0,run:0},
 rain:{name:'Rain',pass:.04,deep:.03,fum:.005,int:.004,kick:3,xp:.03,run:.15},
 hrain:{name:'Heavy rain',pass:.08,deep:.05,fum:.009,int:.008,kick:6,xp:.06,run:.3},
 snow:{name:'Snow',pass:.07,deep:.05,fum:.007,int:.006,kick:6,xp:.05,run:.3},
 hsnow:{name:'Heavy snow',pass:.12,deep:.07,fum:.011,int:.01,kick:10,xp:.09,run:.45},
 dome:{name:'Indoors',pass:0,deep:0,fum:0,int:0,kick:0,xp:0,run:0}};
// stage: 0 early season, 1 midseason, 2 late conference games, 3 Regionals, 4 Sectionals
function rollWeather(stage,indoor,force){if(indoor)return{k:'dome',temp:72};stage=clamp(stage|0,0,4);
 const P=[[.13,0],[.17,.02],[.18,.10],[.15,.20],[.12,.28]][stage],T=[[68,86],[50,68],[36,52],[28,44],[22,40]][stage];
 let k='clear';if(force)k=force;else{const r=rnd();if(r<P[1])k=rnd()<.3?'hsnow':'snow';else if(r<P[0]+P[1])k=rnd()<.3?'hrain':'rain'}
 let temp=ri(T[0],T[1]);if(k==='snow'||k==='hsnow')temp=Math.min(temp,ri(17,31));if(k==='rain'||k==='hrain')temp=Math.max(temp,ri(36,48));return{k,temp}}
function wxOf(g){return WX[(g&&g.wx&&g.wx.k)||'clear']||WX.clear}
function wxLabel(w){return !w?'':w.k==='dome'?'Indoors':WX[w.k].name+' · '+w.temp+'°F'}
function setWeather(g,w){g.wx=w;if(w&&w.k!=='clear')g.log.push('Weather: '+wxLabel(w)+'.');return g}
function newGame(home,away){ACTIVE_G=null;const g={h:home,a:away,score:{h:0,a:0},q:1,clock:QLEN,poss:'h',ball:25,down:1,togo:10,over:false,ot:false,
  otCount:{h:0,a:0},stats:{h:tsInit(),a:tsInit()},ps:{},log:[]};
 g.boost={h:0,a:0};for(const s of['h','a']){const me=T(g,s),them=T(g,opp(s));if(me.upset&&them.ovr>me.ovr&&rnd()<.3)g.boost[s]=Math.min(12,them.ovr-me.ovr+5)}
 ACTIVE_G=g;g.firstRecv=rnd()<.5?'h':'a';g.phase='play';setKick(g,opp(g.firstRecv));g.log.unshift(T(g,opp(g.firstRecv)).school+' will kick off. '+T(g,g.firstRecv).school+' receives.');return g}
function tsInit(){return{plays:0,py:0,ry:0,fd:0,to:0,sacks:0}}
function T(g,s){return s==='h'?g.h:g.a}
function ps(g,p){return g.ps[p.id]||(g.ps[p.id]={p,cmp:0,att:0,py:0,ptd:0,int:0,car:0,ry:0,rtd:0,rec:0,recy:0,rectd:0,tkl:0,sk:0,dint:0,fgm:0,fga:0,xpm:0,xpa:0})}
function absBall(g){return g.poss==='h'?g.ball:100-g.ball}
function dirOf(g){return g.poss==='h'?1:-1}
function fgMax(K){return 42+(K.a.KPW-60)*.4-(ACTIVE_G?wxOf(ACTIVE_G).kick:0)}

function setKick(g,kicker,res,free){if(g.ot){otEnd(g);return}g.phase='kickoff';g.kicker=kicker;g.poss=kicker;g.free=!!free;g.ball=free?20:35;g.down=1;g.togo=10}
function changePoss(g,np,nb){if(g.ot){otEnd(g);return}g.poss=np;g.ball=clamp(Math.round(nb),1,99);g.down=1;g.togo=Math.min(10,100-g.ball)}
function startOT(g){g.ot=true;g.q=5;g.phase='play';g.otFirst=rnd()<.5?'h':'a';g.poss=g.otFirst;g.ball=75;g.down=1;g.togo=10;g.otCount={h:0,a:0}}
function otEnd(g){g.phase='play';const s=g.poss;g.otCount[s]++;if(g.otCount.h===g.otCount.a&&g.score.h!==g.score.a){g.over=true;return}
 g.poss=opp(s);g.ball=75;g.down=1;g.togo=10}
function td(g,s,res){g.score[s]+=6;res.banner='TOUCHDOWN';res.text+=' TOUCHDOWN '+T(g,s).name.toUpperCase()+'!';{const t=T(g,s),se=(t.players||[]).find(p=>p.wild);if(se&&rnd()<.2)res.text+=' On the sideline, Isaiah Freet has Sean Imus dancing!'}res.scored=s;g.phase='pat';g.poss=s;g.ball=97;g.down=1;g.togo=3}
function endQuarter(g,res){
 if(g.q===1||g.q===3){g.q++;g.clock=QLEN;res.text+=' End of Q'+(g.q-1)+'.'}
 else if(g.q===2){g.q=3;g.clock=QLEN;res.halftime=true;setKick(g,g.firstRecv);res.text+=' — HALFTIME. '+T(g,g.firstRecv).school+' will kick off to start the second half.'}
 else if(g.q===4){if(g.score.h===g.score.a){startOT(g);res.text+=' End of regulation — OVERTIME!'}else g.over=true}}
function tick(g,res){if(g.over||g.ot)return;g.clock-=res.clock;if(g.clock<=0){g.clock=0;if(g.phase==='pat'){g.qEndPending=true;return}endQuarter(g,res)}}

function advance(g,res,y){const os=g.poss,s=g.stats[os];g.ball+=y;
 if(g.ball>=100){g.ball=100;s.fd++;td(g,os,res);return}
 if(g.ball<=0){const ds=opp(os);g.score[ds]+=2;res.banner='SAFETY';res.text+=' SAFETY!';if(g.ot){otEnd(g);return}setKick(g,os,res,true);res.text+=' '+T(g,os).school+' must free kick from the 20.';return}
 if(y>=g.togo){g.down=1;g.togo=Math.min(10,100-g.ball);s.fd++;res.first=true;if(!res.banner)res.banner='FIRST DOWN'}
 else{g.down++;g.togo-=y;if(g.down>4){res.text+=' Turnover on downs.';res.banner='TURNOVER ON DOWNS';s.to+=0;changePoss(g,opp(os),100-g.ball)}}}

const OFF_CALLS={XP:'Extra Point',TWO:'2-Pt Try',KO:'Kickoff',ONSIDE:'Onside Kick',TO:'Triple Option',JS:'Jet Sweep',IR:'Inside Run',OR:'Outside Run',QR:'QB Keeper',QP:'Quick Pass',MP:'Mid Pass',DP:'Deep Shot',PA:'Play Action',PUNT:'Punt',FG:'Field Goal'};
const DEF_CALLS={RUNSTOP:'Run Stop',BAL:'Balanced',COVER:'Cover Deep',BLITZ:'Blitz'};const ST_DEF={RET:'Return',TB:'Fair Catch'};
const RUN_MOD={JS:{RUNSTOP:-.3,BAL:.2,COVER:1.3,BLITZ:1.1},IR:{RUNSTOP:-1.8,BAL:0,COVER:1.4,BLITZ:.4},OR:{RUNSTOP:-1.0,BAL:0,COVER:1.8,BLITZ:-.6}};
const PASS_MOD={QP:{RUNSTOP:.05,BAL:0,COVER:-.04,BLITZ:.05},MP:{RUNSTOP:.08,BAL:0,COVER:-.08,BLITZ:-.03},DP:{RUNSTOP:.10,BAL:0,COVER:-.13,BLITZ:.05},PA:{RUNSTOP:.15,BAL:.02,COVER:-.08,BLITZ:-.06}};

// FORM: every game each team draws a random good-night/off-night swing (offense and defense separately). This is what makes upsets possible.
const FORM_SD=12;
function rollForm(){const f=()=>clamp(gauss(0,FORM_SD),-2.2*FORM_SD,2.2*FORM_SD);return{h:{o:f(),d:f()},a:{o:f(),d:f()}}}
// HALFTIME: at the half each team may come out of the locker room with an adjustment for the 2nd half.
// More likely when trailing (bigger deficit = more likely) and with high Spirit. Teams up big can suffer a letdown.
function rollHalf(g){const o={};for(const s of['h','a']){const t=T(g,s),d=g.score[opp(s)]-g.score[s],sp=(t.u&&t.u.spirit)||80;
  let p=.2+(d>0?Math.min(d,21)/21*.35:0)+(sp-80)/300;p=clamp(p,.05,.6);
  if(rnd()<p)o[s]={v:clamp(gauss(d>=14?7:5.5,1.8),2,10),kind:'up'};
  else if(d<=-14&&rnd()<.12)o[s]={v:-clamp(gauss(3,1),1,5),kind:'down'};
  else o[s]={v:0}}return o}
function eff(g,s){const t=T(g,s),u=t.u;if(g.q>=3&&!g.ht)g.ht=rollHalf(g);let adj=(t.elite||0)+(t.chem||0)+((g.boost&&g.boost[s])||0)+(g.ht?g.ht[s].v:0)+((g.yearAdj&&g.yearAdj[s])||0)+(g.edge3d&&g.edge3d.on&&g.edge3d.s===s?g.edge3d.v:0);if(!g.form)g.form=rollForm();const fo=g.form[s].o,fd=g.form[s].d;
 const prog=g.ot?1:g.q>=3?((g.q-3)*QLEN+(QLEN-g.clock))/(2*QLEN):0;adj-=prog*(100-u.cond)/12;   // fatigue (Stamina/Endurance)
 const diff=g.score[s]-g.score[opp(s)];if((g.q>=3&&diff<0)||(g.q===4&&Math.abs(diff)<=8)||g.ot)adj+=Math.max(0,u.spirit-75)/11; // Spirit = clutch
 const L=liveAdj(g,s)||{pass:0,run:0,rush:0,rdef:0,pdef:0};return{pass:u.pass+adj+fo+L.pass,run:u.run+adj+fo+L.run,rush:u.rush+adj+fd+L.rush,rdef:u.rdef+adj+fd+L.rdef,pdef:u.pdef+adj+fd+L.pdef}}
function qbRunScore(q){return(q.a.SPD+q.a.AGI+q.a.TRK+q.a.POW)/4}
function tackler(D,kind){const pos=kind==='run'?wpick([['LB',5],['DL',3],['S',2],['CB',1]]):kind==='deep'?wpick([['S',5],['CB',4]]):wpick([['CB',4],['LB',3],['S',2]]);
 return st(D,pos,ri(0,sN(D,pos)-1))}

// TENDENCIES: defenses adjust to what an offense keeps calling. Over the last 8 snaps, every repeat of the same call beyond 2
// (and heavy leaning on runs or passes overall) makes that call less effective. Applies to everyone, user and CPU alike.
const PLAY_FAM={TO:'run',JS:'run',IR:'run',OR:'run',QR:'run',QP:'pass',MP:'pass',DP:'pass',PA:'pass'};
function tendPen(g,s,oc){if(!PLAY_FAM[oc])return 0;const opt=T(g,s).option,h=(g.tend||(g.tend={h:[],a:[]}))[s],last=h.slice(-8),same=last.filter(x=>x===oc).length,fam=last.filter(x=>PLAY_FAM[x]===PLAY_FAM[oc]).length;
 h.push(oc);if(h.length>12)h.shift();if(opt)return oc==='TO'?Math.max(0,same-5)*2:Math.max(0,same-2)*3;return Math.max(0,same-2)*3+Math.max(0,fam-6)*1.5}
// TRIPLE OPTION: the QB reads the defense and gives (dive), keeps, or pitches. Reading it right gives a small edge.
function optRead(dc){return dc==='RUNSTOP'?wpick([['OR',.6],['QR',.4]]):dc==='BLITZ'?wpick([['OR',.7],['QR',.3]]):dc==='COVER'?wpick([['IR',.6],['QR',.4]]):wpick([['IR',.45],['QR',.3],['OR',.25]])}
function runPlay(g,oc,dc){let optSub=null;if(oc==='TO'){optSub=optRead(dc)}const os=g.poss,ds=opp(os),O=T(g,os),D=T(g,ds),ou=eff(g,os),du=eff(g,ds),S=g.stats[os];
 const tp=tendPen(g,os,oc);if(tp){ou.pass-=tp;ou.run-=tp}if(optSub){oc=optSub;ou.run+=2.4}
 const res={oc,dc,poss:os,los:absBall(g),dir:dirOf(g),down:g.down,togo:g.togo,kind:'none',text:'',banner:null,clock:30};
 const QB=st(O,'QB');S.plays++;
 if(oc==='PUNT'){const P=st(O,'P');const d=Math.round(gauss(37+(P.a.KPW-70)*.22,6));const spot=g.ball+d;res.kind='kick';res.clock=8;
  if(spot>=100){res.end=res.los+res.dir*(100-g.ball+5);res.text=nm(P)+' punts into the end zone. Touchback.';changePoss(g,ds,20)}
  else{const ret=rnd()<.35?0:Math.max(0,Math.round(gauss(7,6)));res.end=res.los+res.dir*d;
   res.text=nm(P)+' punts '+d+' yds.'+(ret?' Returned '+ret+' yds.':' Fair catch.');changePoss(g,ds,100-spot+ret)}
  tick(g,res);return res}
 if(oc==='FG'){const K=st(O,'K'),dist=117-g.ball,mx=fgMax(K);res.kind='fg';res.clock=6;res.end=res.los+res.dir*(100-g.ball+10);
  const p=dist>mx+6?.02:clamp(1-Math.max(0,dist-22)*.021+(K.a.KAC-75)*.004-(dist>mx?.25:0)-wxOf(g).xp*1.5,.03,.99);
  const kps=ps(g,K);kps.fga++;if(rnd()<p){kps.fgm++;g.score[os]+=3;res.banner='FIELD GOAL';res.text=nm(K)+' '+dist+'-yd field goal is GOOD!';res.scored=os;setKick(g,os,res)}
  else{res.banner='NO GOOD';res.text=nm(K)+' '+dist+'-yd field goal is no good.';changePoss(g,ds,Math.max(20,100-(g.ball-7)))}
  tick(g,res);return res}
 if(oc==='IR'||oc==='OR'||oc==='QR'||oc==='JS'){const qr=oc==='QR',jet=oc==='JS';
  // jet sweep: the fastest receiver comes in motion, takes the handoff at full speed and races for the edge
  let wi=0;if(jet){const W=[0,1,2].map(i=>st(O,'WR',i));wi=W.reduce((b,p,i)=>p&&p.a.SPD>W[b].a.SPD?i:b,0);res.jet=1;res.role=6+wi}
  const RB=qr?QB:jet?st(O,'WR',wi):rnd()<.72?st(O,'RB',0):st(O,'RB',1);
  const e=clamp(((qr?(qbRunScore(QB)*.55+ou.run*.45):jet?(ou.run*.75+(RB.a.SPD||85)*.25):ou.run)-du.rdef)/8,-3,3);
  const dTak=(st(D,'LB',0).a.TAK+st(D,'LB',1).a.TAK+st(D,'S',0).a.TAK)/3,truck=(((RB.a.TRK||65)+(RB.a.POW||65))/2-dTak)*.0012;
  let y=gauss((jet?4.6:4.0)+e*1.1+RUN_MOD[qr?'OR':oc][dc]+(qr?-.3:0),oc==='IR'?3.4:jet?4.3:4.6);if(dc==='BLITZ'&&!jet&&rnd()<.12)y-=ri(2,4);if(jet&&dc==='RUNSTOP'&&rnd()<.07)y-=ri(2,4);
  // THE WALL (Levi Hostetler): short yardage and goal line, run behind the 7-footer
  const wall=(!jet&&!qr&&(g.togo<=2||g.ball>=95))?lineup(g,os,'OL').slice(0,5).find(p=>p&&p.wall):null;let wallHit=0;if(wall&&g._spk!=='D'){const need=g.ball>=95?100-g.ball:g.togo;if(y<need&&rnd()<(g.ball>=95?.45:.6)){y=need+ri(0,1);wallHit=1}}
  if(g._spk==='D'){y=-ri(0,4);g._used=1}
  if(g._spk==='O'){y+=ri(10,45);g._used=1}else if(rnd()<.035+e*.012+truck+(RB.superstar?.045:0)+(jet?.018+((RB.a.SPD||85)-88)*.002:0)+(dc==='COVER'?-.01:0)+(dc==='BLITZ'?.03:0))y+=RB.superstar?ri(18,70):ri(12,55);
  y=Math.round(clamp(y,-6,100-g.ball));res.kind='run';res.qr=qr;res.gain=y;res.carrier=RB;res.clock=ri(20,27);
  const ps1=ps(g,RB);ps1.car++;ps1.ry+=y;S.ry+=y;
  if(g._spk!=='O'&&((g._spk==='D'&&rnd()<.3)||rnd()<clamp(.012-e*.002-((RB.a.CAR||72)-75)*.0002+wxOf(g).fum+(jet?.003:0),.003,.036))&&g.ball+y<100){const tk=(g._spk==='D'&&g._cd)||tackler(D,'run');res.kind='fumble';res.banner='FUMBLE';
   res.text=nm(RB)+' runs for '+y+'... FUMBLE! Recovered by '+nm(tk)+'.';S.to++;res.end=res.los+res.dir*y;changePoss(g,ds,100-(g.ball+y));tick(g,res);return res}
  res.end=res.los+res.dir*y;
  if(g.ball+y>=100){ps1.rtd++;res.text=nm(RB)+(qr?' keeps it':jet?' on the jet sweep':oc==='IR'?' up the middle':' around the edge')+', '+y+' yds.'+(wallHit?' Walked in behind '+(wall.nick||nm(wall))+'!':'')}
  else{const tk=((g._spk==='D'&&g._cd)||tackler(D,'run'));ps(g,tk).tkl++;res.text=nm(RB)+(qr?' keeps it':jet?' on the jet sweep':oc==='IR'?' up the middle':' to the outside')+' for '+(y>=0?y:'a loss of '+(-y))+(Math.abs(y)===1?' yd':' yds')+'. Tackle '+nm(tk)+'.'+(wallHit?' Right behind '+(wall.nick||nm(wall))+'!':'')}
  advance(g,res,y);tick(g,res);return res}
 // passes
 const pe=clamp((ou.pass-(du.pdef*.75+du.rush*.25))/8,-3,3),qbs=ps(g,QB);
 const sackP=Math.max(.01,.05-pe*.012+(dc==='BLITZ'?(oc==='QP'?.025:.08):0)+(oc==='DP'||oc==='PA'?.02:0)+(dc==='COVER'?-.015:0));
 const spD=g._spk==='D',spO=g._spk==='O',spSack=spD&&rnd()<.4;
 if(!spD&&!spO&&rnd()<sackP&&rnd()<(QB.a.SPD+QB.a.AGI-150)/100){const y=Math.min(ri(2,13),100-g.ball);const q=ps(g,QB);q.car++;q.ry+=y;S.ry+=y;res.kind='run';res.qr=true;res.carrier=QB;res.gain=y;res.clock=ri(20,26);res.end=res.los+res.dir*y;
  if(g.ball+y>=100)q.rtd++;res.text=nm(QB)+' escapes the pressure and scrambles for '+y+' yds!';qbs.att--;advance(g,res,y);tick(g,res);return res}
 if(spSack||(!spO&&rnd()<sackP)){if(spSack)g._used=1;const sk=(spSack&&g._cd)||st(D,rnd()<.7?'DL':'LB',ri(0,2));const y=-ri(3,9);ps(g,sk).sk++;g.stats[ds].sacks++;res.kind='sack';res.gain=y;res.banner='SACK';res.clock=ri(20,25);
  res.end=res.los+res.dir*y;res.text=nm(QB)+' SACKED by '+nm(sk)+' for a loss of '+(-y)+'.';advance(g,res,y);tick(g,res);return res}
 const tgtKind=oc==='DP'?'deep':oc==='QP'?'quick':'mid';
 const tg=wpick([[[st(O,'WR',0),6],tgtKind==='deep'?.38:.30],[[st(O,'WR',1),7],.25],[[st(O,'WR',2),8],.17],[[st(O,'TE',0),5],(st(O,'TE',0)||{}).recTE?(tgtKind==='deep'?.12:g.ball>=80?.42:.26):(tgtKind==='deep'?.08:.16)],[[st(O,'RB',0),10],tgtKind==='quick'?.14:.06]]);
 const [WR,role]=tg;res.role=role;
 let air={QP:ri(2,7),MP:ri(8,16),DP:ri(20,45),PA:ri(10,28)}[oc];air=Math.min(air,100-g.ball);res.catchX=res.los+res.dir*air;qbs.att++;
 const intP=Math.max(.005,{QP:.018,MP:.028,DP:.05,PA:.035}[oc]-pe*.006-(QB.a.IQ-75)*.0004+(dc==='COVER'?.012:0)+wxOf(g).int);
 if((spD&&rnd()<.35)||(!spO&&!spD&&rnd()<intP)){if(spD)g._used=1;const db=(spD&&g._cd)||st(D,rnd()<.6?'CB':'S',ri(0,1));qbs.int++;ps(g,db).dint++;S.to++;res.kind='int';res.banner='INTERCEPTED';res.clock=ri(10,20);
  const spot=Math.min(99,g.ball+air);if(rnd()<(spD?.18:.05)){res.end=res.los+res.dir*(-g.ball-3);res.text=nm(QB)+' picked off by '+nm(db)+'... PICK SIX!';if(g.ot){g.score[ds]+=6;res.scored=ds;res.banner='TOUCHDOWN';g.over=true}else td(g,ds,res)}
  else{const ret=ri(0,22);res.end=res.catchX-res.dir*ret;res.text=nm(QB)+' pass intended for '+nm(WR)+' INTERCEPTED by '+nm(db)+', returned '+ret+' yds.';changePoss(g,ds,100-spot+ret)}
  tick(g,res);return res}
 const WXg=wxOf(g),cp=clamp({QP:.70,MP:.58,DP:.38,PA:.52}[oc]+pe*.055+PASS_MOD[oc][dc]-WXg.pass-(oc==='DP'?WXg.deep:0),.08,.93);
 if(spD)g._used=1;
 if(spO||(!spD&&rnd()<cp)){let yac=Math.max(0,Math.round({QP:gauss(4+pe,3),MP:gauss(3,3),DP:gauss(4,6),PA:gauss(4,4)}[oc]+(dc==='BLITZ'?2:0)));
  yac+=Math.round((WR.a.TRK-75)/25);if(spO){yac+=ri(8,35);g._used=1}else if(rnd()<.03+pe*.01+(QB.superstar?.035:0))yac+=ri(10,40);const y=Math.min(air+yac,100-g.ball);res.kind='pass';res.carrier=WR;res.passer=QB;res.gain=y;res.clock=ri(18,25);
  qbs.cmp++;qbs.py+=y;const r=ps(g,WR);r.rec++;r.recy+=y;S.py+=y;res.end=res.los+res.dir*y;
  if(g.ball+y>=100){qbs.ptd++;r.rectd++;res.text=nm(QB)+' finds '+nm(WR)+' — '+y+' yds.'}
  else{const tk=tackler(D,tgtKind);ps(g,tk).tkl++;res.text=nm(QB)+' '+(oc==='DP'?'deep ':'')+'to '+nm(WR)+' for '+y+' yds. Tackle '+nm(tk)+'.'}
  advance(g,res,y);tick(g,res);return res}
 res.kind='inc';res.clock=6;res.gain=0;res.end=res.los;res.text=nm(QB)+' pass '+(oc==='DP'?'deep ':'')+'for '+nm(WR)+' — incomplete.';
 advance(g,res,0);tick(g,res);return res}

function runPAT(g,call){const s=g.poss,O=T(g,s),res={poss:s,los:absBall(g),dir:dirOf(g),kind:'xp',text:'',banner:null,clock:0,oc:call,down:0,togo:0};
 if(call==='TWO'){const ou=eff(g,s),du=eff(g,opp(s)),e=clamp(((ou.pass+ou.run)/2-(du.pdef+du.rdef)/2)/8,-3,3),ok=rnd()<clamp(.45+e*.06,.2,.78),run=rnd()<.5,QB=st(O,'QB'),RB=st(O,'RB');
  const wi=ri(0,2),WR=st(O,'WR',wi);res.two=true;res.carrier=run?RB:WR;res.gain=ok?3:ri(0,2);res.end=res.los+res.dir*res.gain;
  if(run)res.kind='run';else{res.kind=ok?'pass':'inc';res.role=6+wi;res.catchX=res.los+res.dir*3}
  if(ok){g.score[s]+=2;res.banner='TWO-POINT GOOD';res.text=(run?nm(RB)+' powers in':nm(QB)+' finds '+nm(WR))+' — two-point conversion GOOD!'}else{res.banner='NO GOOD';res.text=(run?nm(RB)+' is stopped short':nm(QB)+"'s pass falls incomplete")+'. Two-point try fails.'}}
 else{const K=st(O,'K'),p=clamp(.93+(K.a.KAC-75)*.003-wxOf(g).xp,.7,.995);res.end=res.los+res.dir*14;const kx=ps(g,K);kx.xpa++;if(rnd()<p){kx.xpm++;g.score[s]+=1;res.text=nm(K)+"'s extra point is GOOD.";res.banner='PAT GOOD'}else{res.text=nm(K)+"'s extra point is NO GOOD!";res.banner='NO GOOD'}}
 setKick(g,s,res);if(g.qEndPending&&!g.over){g.qEndPending=false;endQuarter(g,res)}return res}
function runKickoff(g,kc,rc){const k=g.kicker,r=opp(k),KT=T(g,k),RT=T(g,r),free=g.free,from=free?20:35;g.free=false;
 const absK=y=>k==='h'?y:100-y,absR=y=>r==='h'?y:100-y,K=st(KT,free?'P':'K');
 const res={poss:k,kind:'kickoff',dir:k==='h'?1:-1,los:absK(from),clock:0,text:'',banner:null,oc:kc,down:0,togo:0};g.phase='play';
 if(kc==='ONSIDE'){const spot=from+ri(10,13),rec=rnd()<.18;res.land=absK(spot);res.end=res.land;res.onside=true;res.clock=3;
  if(rec){g.poss=k;g.ball=spot;res.text=nm(K)+' onside kick... RECOVERED by '+KT.school+'!';res.banner='ONSIDE RECOVERED'}else{g.poss=r;g.ball=100-spot;res.text=nm(K)+' tries the onside kick — '+RT.school+' recovers.'}
  g.down=1;g.togo=Math.min(10,100-g.ball);tick(g,res);return res}
 const land=from+Math.round(gauss((free?48:60)+(K.a.KPW-70)*.35,5)),ret=RT.players.find(p=>p.kr)||st(RT,pick(['RB','WR','CB']));res.land=absK(Math.min(land,108));res.carrier=ret;
 if(land>=100&&(rc==='TB'||land>=104||rnd()<.6)){g.poss=r;g.ball=25;res.end=res.land;res.noRet=true;res.text=nm(K)+' boots it into the end zone. Touchback.';res.banner='TOUCHBACK'}
 else if(rc==='TB'){const at=Math.max(1,100-Math.min(land,99));g.poss=r;g.ball=at;res.end=res.land;res.noRet=true;res.text=nm(ret)+' signals for a fair catch at the '+(at<50?RT.abbr+' '+at:at===50?'50':KT.abbr+' '+(100-at))+'.'}
 else{const c0=100-Math.min(land,99);let y=Math.round(clamp(gauss(22+(ret.a.SPD-75)*.25,8),0,60));if(rnd()<.03)y+=ri(15,45);if(rnd()<.008)y=100;
  // SEAN IMUS on kickoff coverage: running as fast as he can. Usually that means a wipeout of the returner... sometimes he keeps going.
  const sean=(KT.players||[]).find(p=>p.wild&&!g.seanOut);let seanEv=null;if(sean&&y<100){const r0=rnd();if(r0<.16){seanEv='boom';y=Math.min(y,ri(0,7))}else if(r0<.23){seanEv='past';y+=ri(8,20)}else if(r0<.265){seanEv='self';g.seanOut=1}else if(r0<.295){seanEv='hurt';y=Math.min(y,ri(0,5))}else if(r0<.315){seanEv='friendly';y+=ri(4,12)}}
  const nb=c0+y;res.clock=ri(5,8);
  if(nb>=100){res.end=absR(103);g.poss=r;res.text=nm(ret)+' fields it and TAKES IT ALL THE WAY! Kick return touchdown!';td(g,r,res)}
  else if(rnd()<.01){res.end=absR(nb);g.poss=k;g.ball=100-nb;res.text=nm(ret)+' returns it and FUMBLES! '+KT.school+' recovers!';res.banner='FUMBLE';g.stats[r].to++}
  else{res.end=absR(nb);g.poss=r;g.ball=nb;const tk=seanEv==='boom'?sean:tackler(KT,'run');const spotTxt=(nb<50?RT.abbr+' '+nb:nb===50?'50':KT.abbr+' '+(100-nb));
   const goGet=()=>{const h=(KT.players||[]).find(p=>p.first==='Chandler'&&p.last==='Hill');const c=(KT.coach||'Bart Curtis').split(' ').pop();return h?' Coach '+c+': "HILL, GO GET HIM!"':''};
   if(seanEv==='boom'){ps(g,sean).tkl++;res.text=nm(ret)+' gets '+y+' yds before SEAN IMUS comes flying down the field and flattens him at the '+spotTxt+'! Keep running, Sean!';res.banner='BIG HIT';res.bigHit=1}
   else if(seanEv==='self'){res.text='Sean Imus is running as fast as he can and goes down hard on his own. Shaken up; he is done for the night.'+goGet()+' '+nm(ret)+' returns it '+y+' yds to the '+spotTxt+'. Tackle '+nm(tk)+'.'}
   else if(seanEv==='hurt'){ps(g,sean).tkl++;dpOf(g,r).out.add(ret);res.text='SEAN IMUS launches himself at '+nm(ret)+' at the '+spotTxt+'! The returner has to be helped off the field.';res.banner='BIG HIT';res.bigHit=1}
   else if(seanEv==='friendly'){res.text='Sean Imus flattens... his own teammate?!'+goGet()+' '+nm(ret)+' slips through and returns it '+y+' yds to the '+spotTxt+'. Tackle '+nm(tk)+'.'}
   else if(seanEv==='past'){res.text='Sean Imus is FLYING down the field... and keeps right on running past the returner!'+goGet()+' '+nm(ret)+' returns it '+y+' yds to the '+spotTxt+'. Tackle '+nm(tk)+'.'}
   else res.text=nm(ret)+' returns it '+y+' yds to the '+spotTxt+'. Tackle '+nm(tk)+'.'}}
 if(g.phase==='play'){g.down=1;g.togo=Math.min(10,100-g.ball)}tick(g,res);return res}
// ---- LUCK ("Caveman magic") ----
// Teams with a luck trait get a random chance each snap to make a game-changing play on offense or defense.
// The chance is not flat: it rises when the team is behind, late in games, on money downs, in red-zone defense,
// and with higher Spirit. A spark lights a hot streak (momentum) that decays play by play. A short cooldown and
// diminishing returns keep it rare: usually 1-4 per game, more in close, late, desperate moments.
// luck: always-on strength (Mishawaka 1). luckVs: luck that only switches on against specific opponents.
const luckOf=(t,o)=>t.luck||(t.luckVs&&t.luckVs[o.id])||0;
// Clutch players (clutch:'O' QB, clutch:'D' defenders). For clutchLuck teams the luck lives in them: no clutch QB under center = no offensive magic,
// no clutch defender on the field = no defensive magic, and the offense's magic shows up almost only in key moments.
// clutch:'O' offense, 'D' defense, 'OD' both ways; cw = how often (Schrader/Freet/Bradley 1, Schmatz .5, Carver .3).
function clutchOn(t,side){const out=[],P=side==='O'?['QB','RB','TE','WR']:['LB','DL','S','CB'];for(const pos of P)for(const p of (ACTIVE_G&&(ACTIVE_G.h===t||ACTIVE_G.a===t)?lineup(ACTIVE_G,ACTIVE_G.h===t?'h':'a',pos):(t.depth[pos]||[])).slice(0,sN(t,pos)))if(p.clutch&&p.clutch.includes(side)&&!out.includes(p))out.push(p);return out}
const clutchW=L=>Math.min(1,L.reduce((a,p)=>a+(p.cw||1),0));
function clutchPick(L,oc){const run=['IR','OR','QR'].includes(oc),fit=L.filter(p=>p.pos==='QB'||(run?p.pos==='RB':p.pos!=='RB'));const C=fit.length?fit:L;if(!C.length)return null;let r=rnd()*C.reduce((a,p)=>a+(p.cw||1),0);for(const p of C){r-=(p.cw||1);if(r<=0)return p}return C[0]}
function clutchDefs(t){return clutchOn(t,'D')}
function keyMoment(g,side){const d=g.score[side]-g.score[opp(side)];return g.down>=3||((g.q>=4||g.ot)&&Math.abs(d)<=8)||(d<0&&g.q>=3)||g.ball>=80}
function sparkChance(g,side,role){const t=T(g,side),lk=luckOf(t,T(g,opp(side)));if(!lk)return 0;
 let cwm=1;if(t.clutchLuck){cwm=clutchW(clutchOn(t,role));if(!cwm)return 0}const L=g.luck||(g.luck={h:{mo:0,cd:0,n:0},a:{mo:0,cd:0,n:0}}),s=L[side];
 if(s.cd>0)return 0;const def=g.score[side]-g.score[opp(side)];
 let p=.011;
 if(def<0)p+=.01*Math.min(-def/7,2.5);                       // fight when behind
 if(g.q>=4||g.ot)p*=1.5;else if(g.q===3)p*=1.15;              // big moments come late
 if(Math.abs(def)<=8&&(g.q>=4||g.ot))p+=.012;                  // one-score game, crunch time
 if(g.down>=3)p+=.006;                                        // money downs
 if(role==='D'&&g.ball>=80)p+=.012;                            // goal-line stand
 if(role==='O'&&g.ball>=60&&g.ball<80)p+=.008;                // fringe of the red zone
 if(def>=21)p*=.35;                                           // luck doesn't run up the score
 p+=Math.max(0,((t.u&&t.u.spirit)||85)-85)/1000;              // Spirit feeds it
 p+=.025*s.mo;                                                 // hot streak
 p*=Math.pow(.62,s.n);                                        // diminishing returns per game
 if(t.clutchLuck&&role==='O'&&!keyMoment(g,side))p*=.15;return clamp(p*lk*cwm,0,.12)}
function rollSpark(g){const os=g.poss,ds=opp(os);
 const po=sparkChance(g,os,'O'),pd=sparkChance(g,ds,'D'),r=rnd();
 return r<po?'O':r<po+pd?'D':null}
const FLUKE_P=.024,FLUKE_O=['Busted coverage!','He breaks a tackle and he is gone!','Nobody touched him!'],FLUKE_D=['Tipped at the line!','Bad snap!','The ball just squirts loose!'];
function luckTick(g,res){if(g._flk){if(g._used&&res){res.fluke=1;res.text+=' '+(g._spk==='O'?FLUKE_O:FLUKE_D)[ri(0,2)];if(!res.banner||res.banner==='FIRST DOWN')res.banner=g._spk==='O'?'BIG PLAY':'DEFENSE!'}g._used=0}
 if(!g.luck)return;for(const k of['h','a']){const s=g.luck[k];s.mo*=.8;if(s.cd>0)s.cd--}
 if(g._used&&res){const side=g._spk==='O'?res.poss:opp(res.poss),s=g.luck[side];s.mo=1;s.cd=5;s.n++;res.luck=side;
  const t=T(g,side),who=g._spk==='O'?g._co:g._cd;res.text+=' '+(who?(g._spk==='O'?(who.pos==='QB'?nm(who)+' reads it perfectly!':nm(who)+' makes the clutch play!'):nm(who)+' comes up huge!'):(t.luckLine||'The '+t.name+' make something out of nothing!'));if(!res.banner||res.banner==='FIRST DOWN')res.banner=g._spk==='O'?'BIG PLAY':'DEFENSE!'}}
const HIT_P=.02,MEAN_P=.0055;
// ---- LIVE PLAYS ----
// When the user runs the ball or reads the pass himself, the UI plays the snap out in real time and hands the engine the
// result (g._force). The engine then books it exactly like any other play: stats, clock, downs, scoring, turnovers.
function runForced(g,oc,dc,F){const os=g.poss,ds=opp(os),O=T(g,os),D=T(g,ds),S=g.stats[os];
 const res={oc,dc,poss:os,los:absBall(g),dir:dirOf(g),down:g.down,togo:g.togo,kind:'none',text:'',banner:null,clock:clamp(Math.round(F.secs||6),3,12),live:1};
 const QB=st(O,'QB'),yMax=100-g.ball,qbs=ps(g,QB);S.plays++;
 if(F.kind==='run'){const R=F.carrier||st(O,'RB');const y=Math.round(clamp(F.y,-15,yMax));const p1=ps(g,R);p1.car++;p1.ry+=y;S.ry+=y;
  res.kind='run';res.qr=R===QB;res.jet=oc==='JS'?1:0;res.gain=y;res.carrier=R;res.end=res.los+res.dir*y;
  if(g.ball+y>=100){p1.rtd++;res.text=nm(R)+' takes it in from '+y+' yds out!'}
  else{const tk=F.tackler||tackler(D,'run');if(!F.oob)ps(g,tk).tkl++;res.text=nm(R)+(oc==='JS'?' on the jet sweep':'')+' for '+(y>=0?y:'a loss of '+(-y))+(Math.abs(y)===1?' yd':' yds')+(F.oob?', out of bounds.':'. Tackle '+nm(tk)+'.')}
  advance(g,res,y);tick(g,res);return res}
 if(F.kind==='sack'){const sk=F.tackler||st(D,'DL',ri(0,2)),y=Math.round(clamp(F.y,-12,-1));ps(g,sk).sk++;g.stats[ds].sacks++;res.kind='sack';res.gain=y;res.banner='SACK';
  res.end=res.los+res.dir*y;res.text=nm(QB)+' SACKED by '+nm(sk)+' for a loss of '+(-y)+'.';advance(g,res,y);tick(g,res);return res}
 if(F.kind==='away'){qbs.att++;res.kind='inc';res.gain=0;res.end=res.los;res.text=nm(QB)+' throws it away.';advance(g,res,0);tick(g,res);return res}
 const WR=F.target||st(O,'WR',0),air=Math.round(clamp(F.air||0,-5,yMax));res.role=F.role??6;res.catchX=res.los+res.dir*air;qbs.att++;
 if(F.kind==='int'){const db=F.defender||st(D,'CB',0);qbs.int++;ps(g,db).dint++;S.to++;res.kind='int';res.banner='INTERCEPTED';
  const spot=clamp(g.ball+air,1,99),ret=Math.max(0,Math.round(F.ret||0));res.end=res.catchX-res.dir*ret;res.text=nm(QB)+' pass intended for '+nm(WR)+' INTERCEPTED by '+nm(db)+(ret?', returned '+ret+' yds.':'.');changePoss(g,ds,Math.max(1,100-spot+ret));tick(g,res);return res}
 if(F.kind==='inc'){res.kind='inc';res.gain=0;res.end=res.los;res.text=nm(QB)+' pass for '+nm(WR)+' — incomplete'+(F.brokeUp?', broken up by '+nm(F.brokeUp):'')+'.';advance(g,res,0);tick(g,res);return res}
 const y=Math.round(clamp(F.y,-5,yMax));res.kind='pass';res.carrier=WR;res.passer=QB;res.gain=y;qbs.cmp++;qbs.py+=y;const r=ps(g,WR);r.rec++;r.recy+=y;S.py+=y;res.end=res.los+res.dir*y;
 if(g.ball+y>=100){qbs.ptd++;r.rectd++;res.text=nm(QB)+' finds '+nm(WR)+' — '+y+' yds. TOUCHDOWN!'}
 else{const tk=F.tackler||tackler(D,'mid');if(!F.oob)ps(g,tk).tkl++;res.text=nm(QB)+' to '+nm(WR)+' for '+y+' yds'+(F.oob?', out of bounds.':'. Tackle '+nm(tk)+'.')}
 advance(g,res,y);tick(g,res);return res}
function stepGame(g,oc,dc){ACTIVE_G=g;if(g.phase==='pat')return runPAT(g,oc);if(g.phase==='kickoff')return runKickoff(g,oc,dc);
 g._spk=(oc==='PUNT'||oc==='FG')?null:rollSpark(g);g._used=0;g._flk=0;
 // FLUKE PLAYS: a small, talent-blind chance each snap of a break for either side (tipped pick, bad snap, busted coverage, broken tackle).
 if(!g._spk&&oc!=='PUNT'&&oc!=='FG'&&rnd()<FLUKE_P){g._spk=rnd()<.5?'O':'D';g._flk=1}g._cd=null;g._co=null;if(g._spk==='D')g._cd=clutchPick(clutchDefs(T(g,opp(g.poss))),'');if(g._spk==='O')g._co=clutchPick(clutchOn(T(g,g.poss),'O'),oc);// BIG HITTER (Macko): any snap, a small chance he lays someone out: a run stuffed for a loss, a sack or a jarring pick.
 g._hit=0;if(!g._spk&&oc!=='PUNT'&&oc!=='FG'){const D=T(g,opp(g.poss)),h=lineup(g,opp(g.poss),'LB').slice(0,sN(D,'LB')).find(p=>p.hitter);if(h&&rnd()<HIT_P){g._spk='D';g._cd=h;g._hit=1}
  // the meanest men in the league (Chandler Hill, Braxton Eby): when they are on the field they hunt for the kill shot
  if(!g._hit)for(const pos of['DL','LB'])for(const p of lineup(g,opp(g.poss),pos).slice(0,sN(D,pos)))if(p.mean&&!g._hit&&rnd()<MEAN_P*(p.mean===3?2.8:p.mean===2?2.6:p.mean===1.5?1.8:1)){g._spk='D';g._cd=p;g._hit=2}}
 const o0=g.poss,FRC=g._force;g._force=null;if(FRC){g._spk=null;g._hit=0;g._flk=0}const r=FRC?runForced(g,oc,dc,FRC):runPlay(g,oc,dc);dpTick(g,o0,r);if(g._hit&&g._used&&r){const h=g._cd;const NM=(h.nick||h.last).toUpperCase(),FULL=(h.first+' '+h.last).toUpperCase();r.text+=' '+(g._hit===2?[FULL+' buries him!',NM+' with a NASTY shot!','Nobody wants to see #'+h.num+' coming!',NM+' is in a mean mood tonight!',NM+' finishes him and lets him hear about it!'][ri(0,4)]:['MACKO! What a hit!','MACKO lays the boom!','Did you hear that? MACKO!'][ri(0,2)].replace(/MACKO/g,NM));if(!r.banner||r.banner==='FIRST DOWN')r.banner='BIG HIT';r.bigHit=1;g._hit=0;g._used=0}luckTick(g,r);g._spk=null;g._used=0;
 if(r&&oc==='TO')r.text='Triple option: '+r.text;
 // LOD: a lights-out defense (lod teams) after 3 straight stops, or on a defensive magic play.
 if(r&&g.phase!=='kickoff'){const st=g.stops||(g.stops={h:0,a:0});if(r.scored){st[opp(r.scored)]=0}else if(g.poss!==r.poss&&r.poss)st[g.poss]++;
  for(const s of['h','a']){const t=T(g,s),on=t.lod&&(st[s]>=3||(r.luck===s&&r.poss!==s));if(on&&!g.lodOn)g.lodOn={};if(t.lod){if(on&&!g.lodOn[s]){g.lodOn[s]=1;r.banner='LOD';r.text+=' LIGHTS OUT DEFENSE!'}else if(!on&&g.lodOn&&g.lodOn[s]&&st[s]===0&&r.luck!==s)g.lodOn[s]=0}}}
 if(g.ht&&!g.htSaid&&r){g.htSaid=1;const m=[];for(const s of['h','a']){const x=g.ht[s];if(x.kind==='up')m.push(T(g,s).school+' came out of the locker room fired up');if(x.kind==='down')m.push(T(g,s).school+' looks flat after the break')}if(m.length)r.text='HALFTIME: '+m.join('; ')+'. '+r.text}
 return r}
function cpuPat(g){const s=g.poss,d=g.score[s]-g.score[opp(s)],late=g.q>=4&&g.clock<480;return late&&[-2,-5,-9,-10,1,-12].includes(d)?'TWO':'XP'}
function cpuKick(g){const k=g.kicker,d=g.score[k]-g.score[opp(k)];return g.q===4&&g.clock<150&&d<0&&d>=-16?'ONSIDE':'KO'}
function cpuCalls(g){if(g.phase==='pat')return[cpuPat(g),null];if(g.phase==='kickoff')return[cpuKick(g),'RET'];return[cpuOff(g),cpuDef(g)]}
// ---- CPU AI ----
function cpuOff(g){const c=cpuOff0(g),W=wxOf(g);if(!W.run||!['QP','MP','DP','PA'].includes(c))return c;
 const s=g.poss,d=g.score[s]-g.score[opp(s)];if((g.q>=4&&d<-8)||(g.down>=3&&g.togo>=8)||(g.q>=4&&g.clock<120&&d<0))return c;
 return rnd()<W.run*(c==='DP'?1.3:1)?(T(g,s).option&&rnd()<.4?'TO':rnd()<.5?'IR':'OR'):c}
function cpuOff0(g){const s=g.poss,lead=g.score[s]-g.score[opp(s)],late=g.q===4&&g.clock<240,{down,togo,ball}=g;
 if(down===4){const K=st(T(g,s),'K'),dist=117-ball,mx=fgMax(K);
  const needTD=(late&&lead<-3)||(g.ot&&(g.score[opp(s)]-g.score[s])>3);
  const short=togo<=2&&ball>=45;
  if(!needTD){if(short&&ball<80&&rnd()<.5){}else if(dist<=mx)return'FG';else if(!g.ot&&!(late&&lead<0)&&!short)return'PUNT';else if(!g.ot&&!late&&!short)return'PUNT'}}
 let pp=togo>=7?.72:togo<=2?.32:.5;if(late&&lead<0)pp+=.2;if(late&&lead>0)pp-=.25;if(T(g,s).optHeavy){pp*=.45;if(rnd()>=pp)return rnd()<.62?'TO':wpick([['IR',.45],['QR',.3],['OR',.25]])}if(T(g,s).jet&&rnd()>=pp){const th=((g.tend||{})[s]||[]).slice(-3),inside=th.filter(x=>x==='IR'||x==='TO'||x==='QR').length;
   const jp=(ball>=92||togo>=11||down>=4?.02:down<=2&&togo>=3?.13:.07)+(inside>=2?.12:0)+(ball>=35&&ball<=65?.03:0);if(rnd()<jp)return'JS'}
 if(T(g,s).option&&rnd()>=pp){const toP=togo<=3?.55:(late&&lead>0)?.5:ball>=95?.45:down===1?.28:.15;if(rnd()<toP)return'TO'}
 if(rnd()<pp)return togo>=12?wpick([['DP',.35],['MP',.45],['QP',.2]]):wpick([['QP',.4],['MP',.35],['DP',.12],['PA',.13]]);
 const q=st(T(g,s),'QB');if(qbRunScore(q)>85&&rnd()<.3)return'QR';return rnd()<.55?'IR':'OR'}
// Defenses know about clutch quarterbacks (Schrader): late in a close game they key on him with extra coverage and
// pressure, which leaves them lighter against the run and the option.
function keyingQB(g){const O=T(g,g.poss),q=O.depth&&O.depth.QB&&O.depth.QB[0];if(!q||q.clutch!=='O'||!O.clutchLuck)return false;const d=g.score[g.poss]-g.score[opp(g.poss)];return (g.q>=4||g.ot)&&Math.abs(d)<=8}
function cpuDef(g){const t=g.togo;if(keyingQB(g)){g._keyed=(g._keyed||0)+1;return wpick(t>=6?[['COVER',.5],['BLITZ',.35],['BAL',.15]]:[['BLITZ',.4],['COVER',.3],['BAL',.25],['RUNSTOP',.05]])}if(t>=8)return wpick([['COVER',.45],['BAL',.35],['BLITZ',.15],['RUNSTOP',.05]]);
 if(t<=3)return wpick([['RUNSTOP',.5],['BAL',.3],['BLITZ',.15],['COVER',.05]]);return wpick([['BAL',.45],['RUNSTOP',.2],['COVER',.2],['BLITZ',.15]])}
function simQuarter(g){const q=g.q;let n=0;while(!g.over&&(g.q===q||g.phase==='pat')&&n++<300){const r=stepGame(g,...cpuCalls(g));g.log.unshift(r.text)}}
function simToEnd(g){let n=0;while(!g.over&&n++<500){const r=stepGame(g,...cpuCalls(g));g.log.unshift(r.text)}}

if(typeof module!=='undefined')module.exports={runForced,eff,optRead,formationN:null,WX,rollWeather,setWeather,wxLabel,wxOf,setRosterYear:y=>{ROSTER_YEAR=y},stepGame,cpuCalls,SLOT_DEFS,DEFAULT_SLOTS,mergedSlots,ATTR_NAMES,TEAMS,buildAll,newGame,simToEnd,runPlay,cpuOff,cpuDef,CUSTOM_ROSTERS};
