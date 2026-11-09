/* HAGNE-Studio · Bibliothek · Figuren Version 2
   Baukasten V2 (Ei-Kopf, Schultergelenk) – die einzige Version; alle Figuren bauen darauf auf.
   Hier: PoBi, cypheR, DrBier-Riese, Spock, Bierdiebe. Orga-Figuren in figuren-orga.js.
   FIGUREN: Name -> {build, rig, apply, spricht, lippen}. */

/* ==== 4) FIGUREN – Baukasten Version 2 (aus HALLE-AUSSEN-01) + Sonderkörper ==== */
const HEAD_V2=roundPoly([[-33,-238],[33,-238],[39,-205],[30,-167],[11,-155],[-11,-155],[-30,-167],[-39,-205]],[13,13,14,14,10,10,14,14]);
const NOSE_V2=()=>flat([[0,-197],[6,-184],[0,-184]],'rgba(140,70,40,0.42)',0.5);
const TORSO_V2=roundPoly([[-34,-155],[34,-155],[42,-66],[-42,-66]],[13,13,4,4]);
const box=(x,y,w,h)=>rr(x,y,w,h,4.5);
const shoe=(x,y,w,h)=>roundPoly(rect(x,y,w,h),[x<0?6:2,x<0?2:6,1,1]);
const SHOULDER={x:40,y:-145,r:7};
function sleevePts(r,len){const p=[];for(let a=180;a<=360;a+=15){const t=a*Math.PI/180;p.push([Math.cos(t)*r,Math.sin(t)*r]);}
 p.push([r,len-4],[r-1,len],[-r+1,len],[-r,len-4]);return p;}
/* Arm lokal um die Schulter. q (optional): langer Ärmel bis zum Handgelenk (q.aermel, q.manschette) und Muster auf dem Ärmel (q.deko) */
function armV2(shirt,sk,vorHand,q){q=q||{};let s=piece(sleevePts(SHOULDER.r,35),shirt)+(q.deko||'');
 if(q.aermel)s+=piece(rr(-7,31,14,23,3),q.aermel)+flat(rect(-7,51,14,3),q.manschette||'#3A3638',0.5)+piece(rr(-6,53,12,5,2),sk,0.5);
 else s+=piece(rr(-6,33,12,24,4.5),sk);
 return s+(vorHand||'')+piece(circ(0,61,9),sk);}
function armAt(id,side,shirt,sk,extra,vorHand,q){return '<g transform="translate('+(side*SHOULDER.x)+' '+SHOULDER.y+')"><g id="'+id+'">'+armV2(shirt,sk,vorHand,q)+(extra||'')+'</g></g>';}
/* Langer, schmaler V2-Arm (DrBier, DrBier-Riese): lokal um das Schultergelenk, ext = Verlängerung des Unterarms */
function armLang(id,side,shirt,sk,shY,ext,vorHand,extra){ext=ext||0;
 return '<g transform="translate('+(side*35.5)+' '+(shY+11.5)+')"><g id="'+id+'">'+piece(sleevePts(6.5,37.5),shirt)+piece(rr(-5.5,35.5,11,56+ext,4.5),sk)+(vorHand||'')+piece(circ(0,94.5+ext,8.5),sk)+(extra||'')+'</g></g>';}
/* Teil, das an der Hand hängt und gegengedreht wird (z. B. Spocks Gürtel): Gruppe <id>-<k> mit Drehgruppe <id>-<k>-r */
function anDerHand(id,k,inhalt){return '<g id="'+id+'-'+k+'" style="display:none"><g transform="translate(0 61)"><g id="'+id+'-'+k+'-r">'+inhalt+'</g></g></g>';}
/* Gegenstand in der rechten Hand ("hand_rechts"): liegt unter der Faust und bleibt aufrecht (Gegendrehung in poseV2) */
function handItem(id,name,y){return name&&GEGENSTAENDE[name]?'<g id="'+id+'-hr" transform="translate(0 '+(y||61)+')"><g id="'+id+'-hrc">'+GEGENSTAENDE[name]()+'</g></g>':'';}
/* Mundformen für alle V2-Figuren: m = 's' schief, 'g' grinsen, 'y' lachen (offen). Eine Zahl = normaler Mund mit dieser Öffnung. */
function mundformen(id){return '<g id="'+id+'-mfs" style="display:none"><path d="M-11 -173 Q0 -169 9 -174 Q12 -176 14 -180" stroke="#2A0E0B" stroke-width="2.4" fill="none" stroke-linecap="round"/><path d="M15 -175 l2.5 2" stroke="#8A4A30" stroke-width="1.3" stroke-linecap="round"/></g>'+
 '<g id="'+id+'-mfg" style="display:none"><path d="M-16 -178 Q0 -168 17 -180 Q15 -166 1 -161 Q-13 -164 -16 -178Z" fill="#2A0E0B"/><path d="M-14 -177 Q0 -170 15 -179 L14 -174 Q0 -168 -13 -173Z" fill="#FFFDF6"/></g>'+
 '<g id="'+id+'-mfy" style="display:none"><ellipse cx="1" cy="-170" rx="8" ry="7" fill="#2A0E0B"/><path d="M-6 -175 Q1 -178 8 -175" stroke="#FFFDF6" stroke-width="2" fill="none"/><ellipse cx="1" cy="-166" rx="4" ry="2" fill="#C2504A"/></g>';}
function shrugArm(side,shirt,sk){const a1=-35*side,a2=-115*side;
 let s='<g transform="translate('+(side*SHOULDER.x)+' '+SHOULDER.y+') rotate('+a1+')">'+piece(sleevePts(SHOULDER.r,35),shirt)+piece(rr(-6,31,12,16,4.5),sk);
 s+='<g transform="translate(0 44) rotate('+a2+')">'+piece(sleevePts(6,24),sk)+piece(ell(0,29,8,9.5),sk,1);
 s+=flat(seg(-5,34,-6,42,3.4),sk,0.3)+flat(seg(-1.5,36,-1.5,45,3.4),sk,0.3)+flat(seg(2.5,36,3.5,44,3.4),sk,0.3)+flat(seg(6,32,9,38,3.4),sk,0.3);
 return s+'</g></g>';}
/* Optionale Teile: shoe (Schuhfarbe), legExtra(side) (Muster auf dem Bein), sleeve/cuff (Jacke mit langen Ärmeln),
   armDeko(side) (Muster auf dem Ärmel), armHand(side,id) (Teil an der Hand), overTorso() (Jacke), collar() (Kragen),
   noLogo bzw. logoY/logoSize/logoMax, mouth(id) (eigener Mund), keineMundformen (Mund ist verdeckt oder sitzt in einem Loch) */
function makeChar(p){seed=p.seed;let s='';const sk=p.skin,SH=p.shoe||'#2A2624';
const legX=side=>p.legExtra?p.legExtra(side):'';
if(!p.seated){
 s+='<g id="'+p.id+'-ll">'+piece(box(-22,-72,17,66),p.pants)+legX(-1)+piece(shoe(-30,-10,28,11),SH)+'</g>';
 s+='<g id="'+p.id+'-lr">'+piece(box(5,-72,17,66),p.pants)+legX(1)+piece(shoe(2,-10,28,11),SH)+'</g>';}
const armShirt=p.sleeve||p.shirt,armQ=side=>(p.sleeve||p.armDeko)?{aermel:p.sleeve,manschette:p.cuff,deko:p.armDeko?p.armDeko(side):''}:undefined;
const hand=side=>p.armHand?p.armHand(side,p.id):'';
s+=armAt(p.id+'-al',-1,armShirt,sk,'',hand(-1),armQ(-1));
s+='<g id="'+p.id+'-sl" style="display:none">'+shrugArm(-1,armShirt,sk)+'</g>';
s+=piece(TORSO_V2,p.shirt);
if(!p.noLogo)s+='<g data-logo="1" data-t="translate(0 '+(p.logoY||-102)+')" data-size="'+(p.logoSize||15)+'" data-max="'+(p.logoMax||64)+'"></g>';
if(p.overTorso)s+=p.overTorso();
s+=armAt(p.id+'-ar',1,armShirt,sk,p.thumb?'<g id="'+p.id+'-th" style="display:none">'+piece(rr(-3.2,60,6.4,15,3),sk,0.4)+'</g>':'',hand(1)+handItem(p.id,p.handR),armQ(1));
s+='<g id="'+p.id+'-sr" style="display:none">'+shrugArm(1,armShirt,sk)+'</g>';
s+=piece(box(-8,-168,16,16),sk);
if(p.collar)s+=p.collar();
s+='<g id="'+p.id+'-h">';
s+=piece(HEAD_V2,sk,2.6);
if(p.under)s+=p.under(p.id);
s+='<g id="'+p.id+'-e">'+piece(circ(-14,-204,7.5),'#FFFDF6',1.2)+piece(circ(14,-204,7.5),'#FFFDF6',1.2)+'<g id="'+p.id+'-p"><circle cx="-13" cy="-203" r="3" fill="#1F1B18"/><circle cx="15" cy="-203" r="3" fill="#1F1B18"/></g></g>';
s+='<g id="'+p.id+'-bl">'+flat(rect(-8.5,-2.3,17,4.6),p.browC,1)+'</g><g id="'+p.id+'-br">'+flat(rect(-8.5,-2.3,17,4.6),p.browC,1)+'</g>';
s+=NOSE_V2();
if(p.beard)s+=p.beard();
s+=p.mouth?p.mouth(p.id):'<ellipse id="'+p.id+'-m" cx="0" cy="-172" rx="9" ry="1.6" fill="#2A0E0B" stroke="#E9C7A8" stroke-width="1.2"/>';
if(!p.keineMundformen)s+=mundformen(p.id);
if(p.over)s+=p.over();
s+=p.hair(p.id);
if(p.acc)s+=p.acc(p.id);
s+='</g>';
/* Facepalm-Arm (Pose-Feld fp = Winkel): zweiter rechter Arm über dem Kopf, gleiches Schultergelenk. Eigener Zufall, damit sich nichts anderes verschiebt. */
if(!p.seated){const sv=seed;seed=p.seed+91;s+='<g id="'+p.id+'-fpw" style="display:none">'+armAt(p.id+'-fp',1,armShirt,sk,'','',armQ(1))+'</g>';seed=sv;}
return s;}
function beardFull(base,light,dark){return ()=>{let s=piece(roundPoly([[-37,-192],[-30,-189],[-20,-180],[20,-180],[30,-189],[37,-192],[33,-166],[17,-150],[0,-145],[-17,-150],[-33,-166]],[2,3,3,3,3,2,9,9,8,9,9]),base,2);
s+=flat(circ(-22,-166,3),light)+flat(circ(14,-156,2.5),light)+flat(circ(25,-172,2.5),dark)+flat(circ(-8,-152,2.5),dark)+flat(circ(4,-162,2),light)+flat(circ(-28,-178,2),light);return s;};}

const CY={seed:37,thumb:true,skin:'#F2C9A0',shirt:'#262624',pants:'#3A4A62',browC:'#4A2F1C',
 under:()=>piece(rect(-37,-232,7,28),'#5A3A22',1)+piece(rect(30,-232,7,28),'#5A3A22',1),
 beard:beardFull('#5A3A22','#9A9890','#3E2716'),
 hair:()=>piece([[-41,-224],[-37,-244],[-12,-254],[22,-253],[42,-242],[46,-229]],'#6B6259',1.4)+piece([[-6,-230],[48,-232],[54,-225],[-2,-223]],'#4E4741',1)+'<path d="M-30 -240 Q6 -250 38 -238" fill="none" stroke="#7E756B" stroke-width="1.5" stroke-dasharray="3 3"/>',
 acc:()=>'<rect x="-26" y="-213" width="23" height="17" rx="2" fill="none" stroke="#141210" stroke-width="4.5"/><rect x="3" y="-213" width="23" height="17" rx="2" fill="none" stroke="#141210" stroke-width="4.5"/><path d="M-3 -206 h6" stroke="#141210" stroke-width="4"/>'};

const PHAIR='#A3A19C',PHAIR_D='#7C7A75',PHAIR_L='#C6C4BE',PBEARD='#8E8C87';
const PB={seed:61,skin:'#F3CDB0',shirt:'#2F855A',pants:'#3A4A62',browC:'#6E6C67',
 under:()=>piece(rect(-37,-230,7,34),PHAIR_D,1)+piece(rect(30,-230,7,34),PHAIR_D,1),
 beard:()=>{let s=piece(roundPoly([[-37,-196],[-31,-194],[-27,-182],[-15,-179],[15,-179],[27,-183],[31,-196],[37,-198],[33,-166],[17,-150],[0,-145],[-17,-150],[-33,-166]],[2,3,3,3,3,3,3,2,9,9,8,9,9]),PBEARD,1.2);
  s+='<path d="M-28 -170 Q-18 -158 0 -154 Q18 -158 28 -170" fill="none" stroke="'+PHAIR_D+'" stroke-width="1.2" opacity="0.7"/>';
  s+=flat(circ(-21,-167,1.8),PHAIR_L,0.4)+flat(circ(19,-164,1.8),PHAIR_L,0.4)+flat(circ(-6,-152,1.6),PHAIR_D,0.4)+flat(circ(8,-155,1.6),PHAIR_L,0.4);return s;},
 over:()=>piece([[-15,-182],[15,-182],[17,-175.5],[6,-177],[0,-176],[-6,-177],[-17,-175.5]],PHAIR_D,0.7),
 hair:()=>{let s=piece([[-37,-222],[-37,-241],[-28,-250],[-16,-253],[-12,-246],[-6,-253],[12,-256],[30,-251],[40,-240],[40,-222],[34,-230],[24,-235],[12,-238],[0,-239],[-10,-238]],PHAIR,1.2);
  s+=piece([[-37,-222],[-37,-241],[-28,-250],[-17,-252],[-15,-238],[-26,-234],[-33,-228]],PHAIR_D,0.8);
  s+='<path d="M-14 -251 L-13 -239" stroke="#E4C2A6" stroke-width="1.8" stroke-linecap="round"/>';
  s+='<path d="M-8 -248 Q12 -254 34 -244 M-6 -243 Q14 -248 37 -236 M-28 -244 Q-24 -246 -19 -248" fill="none" stroke="'+PHAIR_L+'" stroke-width="1.4" stroke-linecap="round"/>';return s;},
 acc:()=>'<g>'+
  '<rect x="-26" y="-213" width="22" height="17" rx="5" fill="rgba(220,235,245,0.18)" stroke="#9EA4A9" stroke-width="1.3"/>'+
  '<rect x="4" y="-213" width="22" height="17" rx="5" fill="rgba(220,235,245,0.18)" stroke="#9EA4A9" stroke-width="1.3"/>'+
  '<path d="M-27 -208 Q-27 -214 -20 -214 L-10 -214 Q-3 -214 -3 -208 M3 -208 Q3 -214 10 -214 L20 -214 Q27 -214 27 -208" fill="none" stroke="#2A2624" stroke-width="4.2" stroke-linecap="round"/>'+
  '<path d="M-3 -207 Q0 -210 3 -207" fill="none" stroke="#9EA4A9" stroke-width="1.6"/>'+
  '<path d="M-27 -209 L-36 -211 M27 -209 L36 -211" stroke="#2A2624" stroke-width="2.4"/></g>'};

/* Sonderkörper DrBier-Riese (V2-Körper, Kopf nie im Bild): Schultergelenk, runder Körper, linker Arm trinkt oben */
const RLEG=126,RTOR=136,RAX=80,RUP=RLEG+RTOR,RSH=-155-RUP,RHIP=-66-RLEG;
function makeRiese(id){seed=61;let s='';const sk='#F4CFAE',shirt='#2F7A3E',pants='#3A4A62';
s+='<g id="'+id+'-ll">'+piece(box(-17,-72-RLEG,13,66+RLEG),pants)+piece(shoe(-27,-10,25,11),'#2A2624')+'</g>';
s+='<g id="'+id+'-lr">'+piece(box(4,-72-RLEG,13,66+RLEG),pants)+piece(shoe(2,-10,25,11),'#2A2624')+'</g>';
s+=armLang(id+'-al',-1,shirt,sk,RSH,RAX,'<g id="'+id+'-hb" transform="translate(0 '+(108.5+RAX)+')">'+rBottle()+'</g>');
s+=piece(roundPoly([[-27,RSH],[27,RSH],[33,RHIP],[-33,RHIP]],[11,11,4,4]),shirt);
s+='<g data-logo="1" data-t="translate(0 '+(RSH+58)+')" data-size="14" data-max="50"></g>';
s+=armLang(id+'-ar',1,shirt,sk,RSH,RAX);
return s;}

function show(el,on){if(el)el.style.display=on?'':'none';}
function rigV2(id,browY){const g=k=>$(id+'-'+k);return {browY:browY||-218,btl:g('btl'),btr:g('btr'),btlr:g('btl-r'),btrr:g('btr-r'),g:$(id),h:g('h'),e:g('e'),p:g('p'),bl:g('bl'),br:g('br'),m:g('m'),al:g('al'),ar:g('ar'),sl:g('sl'),sr:g('sr'),ll:g('ll'),lr:g('lr'),th:g('th'),
 mfs:g('mfs'),mfg:g('mfg'),mfy:g('mfy'),hr:g('hr'),hrc:g('hrc'),gt:g('gt'),hat:g('hat'),fpw:g('fpw'),fp:g('fp')};}
/* Pose für alle V2-Figuren. Felder: x, y, rot (Körper kippt um die Füße), head, hy, aL, aR, lL, lR, px, py,
   es (Augen zukneifen, <1), ew (Augen weiten, >1), m (Zahl = Mundöffnung, 's'/'g'/'y' = Mundform), br, shrug, thumb,
   handLeer (Gegenstand in der Hand weg), swH (Gegenstand in der Hand schwingt, Grad), fp (Facepalm, Armwinkel), glint (Brillenblitz), hat (Hut hebt sich um diesen Wert) */
function poseV2(c,o,baseY){
 c.g.setAttribute('transform','translate('+o.x.toFixed(1)+','+(baseY+(o.y||0)).toFixed(1)+') scale(0.92)'+(o.rot?' rotate('+o.rot.toFixed(1)+')':''));
 c.h.setAttribute('transform','translate(0 '+(o.hy||0)+') rotate('+(o.head||0).toFixed(1)+' 0 -195)');
 const sh=!!o.shrug;show(c.al,!sh);show(c.ar,!sh);show(c.sl,sh);show(c.sr,sh);
 if(c.fpw){show(c.fpw,!!o.fp);if(o.fp){show(c.ar,false);c.fp.setAttribute('transform','rotate('+o.fp.toFixed(1)+')');}}
 if(c.al)c.al.setAttribute('transform','rotate('+(o.aL||0).toFixed(1)+')');
 if(c.ar)c.ar.setAttribute('transform','rotate('+(o.aR||0).toFixed(1)+')');
 if(c.ll)c.ll.setAttribute('transform','rotate('+(o.lL||0).toFixed(1)+' -13 -70)');
 if(c.lr)c.lr.setAttribute('transform','rotate('+(o.lR||0).toFixed(1)+' 13 -70)');
 show(c.th,!!o.thumb);
 c.p.setAttribute('transform','translate('+(o.px||0)+' '+(o.py||0)+')');
 const es=o.es||1,ew=o.ew||1;c.e.setAttribute('transform',(es!==1||ew!==1)?'translate(0 -204) scale('+ew+' '+(es*ew).toFixed(2)+') translate(0 204)':'');
 const mf=typeof o.m==='string'&&c.mfs?o.m:null;
 if(c.mfs){show(c.mfs,mf==='s');show(c.mfg,mf==='g');show(c.mfy,mf==='y');
  c.mfy.setAttribute('transform',mf==='y'&&o.sy?'translate(1 -170) scale(1 '+o.sy.toFixed(2)+') translate(-1 170)':'');}
 if(c.btl){show(c.btl,!!o.belts);show(c.btr,!!o.belts);   /* Teile an der Hand hängen nach unten und schwingen um swL/swR */
  c.btlr.setAttribute('transform','rotate('+(-(o.aL||0)+(o.swL||0)).toFixed(1)+')');c.btrr.setAttribute('transform','rotate('+(-(o.aR||0)+(o.swR||0)).toFixed(1)+')');}
 if(c.m){show(c.m,!mf);if(!mf)c.m.setAttribute('ry',typeof o.m==='number'?o.m:1.6);}
 if(c.hr){show(c.hr,!o.handLeer);c.hrc.setAttribute('transform','rotate('+(-(o.aR||0)+(o.swH||0)).toFixed(1)+')');}
 if(c.gt)show(c.gt,!!o.glint);
 if(c.hat)c.hat.setAttribute('transform','translate(0 '+(o.hat||0).toFixed(1)+')');
 const b=o.br||[0,0,0,0];const by=c.browY||-218;c.bl.setAttribute('transform','translate(-15 '+(by+b[0])+') rotate('+b[1]+')');c.br.setAttribute('transform','translate(15 '+(by+b[2])+') rotate('+(-b[3])+')');}

const LIPPEN_V2=(o,k)=>{o.m=k>0.15?1.6+k*6:1.6;};
const FIGUREN={
 'PoBi':   {build:(a)=>makeChar(Object.assign({},PB,{id:a.id,seated:a.haltung==='sitzt',handR:a.hand_rechts})),rig:rigV2,apply:(r,o,a)=>poseV2(r,o,a.boden),spricht:true,lippen:LIPPEN_V2},
 'cypheR': {build:(a)=>makeChar(Object.assign({},CY,{id:a.id,seated:a.haltung==='sitzt',handR:a.hand_rechts})),rig:rigV2,apply:(r,o,a)=>poseV2(r,o,a.boden),spricht:true,lippen:LIPPEN_V2},
 'DrBier-Riese':{build:(a)=>makeRiese(a.id),
   rig:(id)=>({g:$(id),al:$(id+'-al'),ar:$(id+'-ar'),ll:$(id+'-ll'),lr:$(id+'-lr'),hb:$(id+'-hb')}),
   apply:(r,o,a)=>{r.g.setAttribute('transform','translate('+o.x.toFixed(1)+','+a.boden+') scale(0.92)');
     r.al.setAttribute('transform','rotate('+(a.pose==='trinkt-oben'?168:(o.aL||0))+')');
     r.ar.setAttribute('transform','rotate('+(o.aR||0).toFixed(1)+')');
     r.ll.setAttribute('transform','rotate('+(o.lL||0).toFixed(1)+' -10.5 '+(-72-RLEG)+')');
     r.lr.setAttribute('transform','rotate('+(o.lR||0).toFixed(1)+' 10.5 '+(-72-RLEG)+')');
     show(r.hb,!o.handLeer);}}
};

/* ----- Spock (aus FIGUR-SPOCK.html), Version 2: Ei-Kopf, Schultergelenk, Jacke mit langen Ärmeln, Gürtel an beiden Händen ----- */
const HAIR='#15151A',HAIR_S='#4E5562',JK='#1E1C20',JK_L='#2E2B31',JK_S='#56515C',BELT='#5A3420',BELT_L='#8A5A3A',BUCKLE='#C9CDD2';
function belt(){const d='M0 2 C9 18 -8 34 1 50 C9 62 -4 72 0 82';
 return '<path d="'+d+'" transform="translate(2.5,2.5)" stroke="rgba(60,40,20,0.22)" stroke-width="6.5" fill="none"/>'+
 '<path d="'+d+'" stroke="'+BELT+'" stroke-width="6.5" fill="none" stroke-linecap="round"/>'+
 '<path d="'+d+'" stroke="'+BELT_L+'" stroke-width="1" fill="none" stroke-dasharray="2.5 3"/>'+
 '<rect x="-7.5" y="80" width="15" height="12" rx="2.5" fill="none" stroke="'+BUCKLE+'" stroke-width="2.8"/>'+
 '<path d="M0 81 L0 91" stroke="'+BUCKLE+'" stroke-width="1.8"/>';}
const SP={seed:71,skin:'#EFC3A0',shirt:'#2F855A',pants:'#1F2026',shoe:'#151416',browC:'#15151A',
 sleeve:JK,cuff:'#3A3638',logoY:-103,logoSize:12,logoMax:36,
 armHand:(sx,id)=>anDerHand(id,sx<0?'btl':'btr',belt()),
 overTorso:()=>{let s=piece(roundPoly([[-36,-157],[-18,-157],[-25,-58],[-46,-58]],[12,2,2,3]),JK,1.6)+piece(roundPoly([[36,-157],[18,-157],[25,-58],[46,-58]],[12,2,2,3]),JK,1.6);
  s+=piece([[-19,-159],[-7,-160],[-23,-126]],JK_L,0.8)+piece([[19,-159],[7,-160],[23,-126]],JK_L,0.8);
  s+='<path d="M-20 -150 L-25 -62 M20 -150 L25 -62" stroke="#8C8F96" stroke-width="1.2" stroke-dasharray="2 2" fill="none"/>';
  s+='<path d="M-39 -146 Q-37 -112 -41 -80 M38 -146 Q36 -112 40 -80" stroke="'+JK_S+'" stroke-width="2" fill="none" opacity="0.8"/>';
  s+=ln(-42,-86,-29,-88,'#3A3638',1.8)+ln(29,-88,42,-86,'#3A3638',1.8);return s;},
 collar:()=>piece([[-22,-158],[-10,-170],[-6,-158]],JK_L,0.6)+piece([[22,-158],[10,-170],[6,-158]],JK_L,0.6),
 under:()=>piece(rect(-37,-228,5,15),HAIR,0.8)+piece(rect(32,-228,5,15),HAIR,0.8),
 hair:()=>{let s=piece([[-38,-214],[-38,-236],[-32,-248],[-18,-255],[0,-257],[18,-255],[32,-249],[39,-237],[39,-214],[34,-224],[26,-232],[12,-235],[0,-236],[-12,-235],[-26,-232],[-34,-224]],HAIR,1.1);
  s+='<path d="M-22 -234 Q-22 -246 -12 -253 M-10 -236 Q-8 -248 0 -255 M4 -236 Q6 -248 14 -254 M18 -234 Q22 -244 28 -249" fill="none" stroke="'+HAIR_S+'" stroke-width="1.5" stroke-linecap="round"/>';
  s+='<path d="M-30 -230 Q-33 -238 -29 -245 M31 -230 Q34 -238 30 -245" fill="none" stroke="'+HAIR_S+'" stroke-width="1.2" stroke-linecap="round" opacity="0.8"/>';return s;},
 acc:id=>'<g>'+
  '<path d="M-28 -212 L-4 -212 L-5 -202 Q-8 -196 -16 -196 Q-26 -196 -27 -203Z" fill="#121214" stroke="#2A2A2E" stroke-width="1.4"/>'+
  '<path d="M4 -212 L28 -212 L27 -203 Q26 -196 16 -196 Q8 -196 5 -202Z" fill="#121214" stroke="#2A2A2E" stroke-width="1.4"/>'+
  '<path d="M-4 -210 Q0 -213 4 -210" stroke="#2A2A2E" stroke-width="2" fill="none"/>'+
  '<path d="M-28 -210 L-37 -213 M28 -210 L37 -213" stroke="#2A2A2E" stroke-width="2.4"/>'+
  '<path d="M-21 -210 L-25 -201 M-16 -210 L-19 -204 M11 -210 L7 -201 M16 -210 L13 -204" stroke="rgba(255,255,255,0.32)" stroke-width="1.6" stroke-linecap="round"/>'+
  '<g id="'+id+'-gt" style="display:none"><path d="M20 -216 l1.8 4.6 4.6 1.8 -4.6 1.8 -1.8 4.6 -1.8 -4.6 -4.6 -1.8 4.6 -1.8Z" fill="#FFFDF6"/></g></g>'};

FIGUREN['Spock']={build:a=>makeChar(Object.assign({},SP,{id:a.id,seated:a.haltung==='sitzt',handR:a.hand_rechts})),rig:id=>rigV2(id,-221),apply:(r,o,a)=>poseV2(r,o,a.boden),
 spricht:true,lippen:(o,k)=>{if(k>=0.18){o.m='y';o.sy=0.35+0.9*k;}}};

/* ----- Bierdiebe (aus FIGUR-BIERDIEBE.html), Version 2: Ei-Kopf, Schultergelenk, Tarnmuster auf Ärmeln, Beinen und Hemd ----- */
const CAMO=['#4E5A34','#5E4A32','#2F3524','#9AA070'];
function camo(x,y,w,h,n,rmax){let s='';for(let i=0;i<n;i++){const rx=2+R()*(rmax-2),ry=1.5+R()*(rmax*0.6);const cx=x+rx+R()*Math.max(0,w-2*rx),cy=y+ry+R()*Math.max(0,h-2*ry);s+=flat(ell(cx,cy,rx,ry),CAMO[Math.floor(R()*4)],2);}return s;}
const CAMO_BASE='#7C8358';
const camoKit={shirt:CAMO_BASE,pants:CAMO_BASE,shoe:'#2A2624',noLogo:true,
 overTorso:()=>camo(-30,-150,60,80,26,7)+piece(rr(-41,-74,82,8,3),'#3A3326',1),
 legExtra:sx=>camo(sx<0?-21:6,-70,15,56,9,4),
 armDeko:()=>camo(-6,3,12,30,5,4)};
const BAL='#1C1C1E';
/* Sturmhaube folgt dem Ei-Kopf; die Rippen werden auf die Haube zugeschnitten */
const HOOD_V2=roundPoly([[-41,-205],[-37,-241],[-21,-257],[0,-261],[21,-257],[37,-241],[42,-205],[33,-164],[13,-151],[-13,-151],[-33,-164]],[14,12,10,8,10,12,14,14,8,8,14]);
const D1={seed:81,skin:'#F2C9A6',browC:BAL,...camoKit,keineMundformen:true,
 under:id=>{let s=piece(rect(-13,-172,26,22),BAL,0.8)+piece(HOOD_V2,BAL,1.6);
  s+='<clipPath id="'+id+'-hk"><path d="M'+HOOD_V2.map(q=>q[0].toFixed(1)+' '+q[1].toFixed(1)).join(' L')+'Z"/></clipPath><g clip-path="url(#'+id+'-hk)">';
  for(let x=-30;x<=30;x+=7.5)s+='<path d="M'+x+' -252 L'+(x*1.06).toFixed(1)+' -150" stroke="#2A2A2E" stroke-width="1.1"/>';
  s+='</g>'+piece(ell(-14,-204,11.5,10),'#F2C9A6',1)+piece(ell(14,-204,11.5,10),'#F2C9A6',1)+piece(ell(1,-172,11,8),'#F2C9A6',1);return s;},
 mouth:id=>'<ellipse id="'+id+'-m" cx="1" cy="-172" rx="7.5" ry="1.8" fill="#2A0E0B" stroke="#D9767A" stroke-width="2.6"/>',
 hair:()=>piece(circ(0,-262,5),BAL,0.6)};
const D2={seed:93,skin:'#E8BD98',browC:'#6A4A30',...camoKit,
 over:()=>piece(roundPoly([[-40,-194],[40,-196],[37,-178],[30,-165],[12,-152],[-12,-152],[-30,-165],[-37,-178]],[2,2,6,8,8,8,8,6]),'#2E3228',1.4)+'<path d="M-30 -180 Q0 -174 30 -181 M-26 -166 Q0 -161 27 -167" stroke="#3E4436" stroke-width="1.4" fill="none"/>',
 hair:id=>{seed=95;let s='<g id="'+id+'-hat">'+piece([[-30,-226],[-27,-252],[-14,-262],[14,-262],[28,-252],[31,-226]],CAMO_BASE,1.4)+camo(-24,-258,48,28,9,6);
  s+=piece([[-56,-222],[-34,-232],[34,-233],[57,-222],[40,-216],[-40,-215]],'#6E7650',1.4)+camo(-44,-229,88,10,7,4)+ln(-30,-232,31,-233,'#3A3326',2.4)+'</g>';return s;}};
const DIEB=def=>({build:a=>makeChar(Object.assign({},def,{id:a.id,seated:a.haltung==='sitzt',handR:a.hand_rechts})),rig:id=>rigV2(id),apply:(r,o,a)=>poseV2(r,o,a.boden)});
FIGUREN['Bierdieb-Sturmhaube']=Object.assign(DIEB(D1),{spricht:true,lippen:(o,k)=>{o.m=3+9*k;}});
FIGUREN['Bierdieb-Tarnhut']=DIEB(D2);
