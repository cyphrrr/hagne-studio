/* HAGNE-Studio · Bibliothek · Figuren Version 1
   Älterer Baukasten (eckiger Kopf). Spock und Bierdiebe, bis sie auf V2 umgebaut sind. */

/* ==== 4d) FIGUREN – Baukasten Version 1 (eckiger Kopf, Klebestreifen am Kinn) ==== */
function makeCharV1(p){seed=p.seed;let s='';const sk=p.skin;const SH=p.shoe||'#2A2624';const id=p.id;
s+='<g id="'+id+'-ll">'+piece(rect(-22,-72,17,66),p.pants)+(p.legExtra?p.legExtra(-1):'')+piece(rect(-30,-10,28,11),SH)+'</g>';
s+='<g id="'+id+'-lr">'+piece(rect(5,-72,17,66),p.pants)+(p.legExtra?p.legExtra(1):'')+piece(rect(2,-10,28,11),SH)+'</g>';
function arm(sx){const x0=sx<0?-50:36;let a=piece(rect(x0,-150,14,40),p.sleeve||p.shirt);
 if(p.sleeve)a+=piece(rect(x0,-112,14,20),p.sleeve)+flat(rect(x0,-95,14,3),p.cuff||'#3A3638',0.5)+piece(rect(x0+1,-93,12,4),sk,0.5);
 else a+=piece(rect(x0+1,-112,12,24),sk);
 if(p.armExtra)a+=p.armExtra(sx,id);
 if(sx>0&&p.handR&&GEGENSTAENDE[p.handR])a+='<g id="'+id+'-hr"><g transform="translate(43 -84)">'+GEGENSTAENDE[p.handR]()+'</g></g>';
 return a+piece(circ(sx*43,-84,9),sk);}
s+='<g id="'+id+'-al">'+arm(-1)+'</g>';
s+=piece([[-34,-155],[34,-155],[42,-66],[-42,-66]],p.shirt);
if(!p.noLogo)s+='<g data-logo="1" data-t="translate(0 '+(p.logoY||-102)+')" data-size="'+(p.logoSize||15)+'" data-max="'+(p.logoMax||64)+'"></g>';
if(p.overTorso)s+=p.overTorso();
s+='<g id="'+id+'-ar">'+arm(1)+'</g>';
s+=piece(rect(-8,-168,16,16),sk);
if(p.collar)s+=p.collar();
s+='<g id="'+id+'-h">';
s+=piece([[-34,-236],[34,-238],[38,-160],[-36,-158]],sk,2.6);
if(p.under)s+=p.under();
s+='<g id="'+id+'-e">'+piece(circ(-14,-204,7.5),'#FFFDF6',1.2)+piece(circ(14,-204,7.5),'#FFFDF6',1.2)+'<g id="'+id+'-p"><circle cx="-13" cy="-203" r="3" fill="#1F1B18"/><circle cx="15" cy="-203" r="3" fill="#1F1B18"/></g></g>';
s+='<g id="'+id+'-bl">'+flat(rect(-8.5,-2.3,17,4.6),p.browC,1)+'</g><g id="'+id+'-br">'+flat(rect(-8.5,-2.3,17,4.6),p.browC,1)+'</g>';
s+=flat([[0,-197],[6,-184],[-5,-184]],'rgba(140,70,40,0.35)',0.5);
if(p.beard)s+=p.beard();
s+=p.mouth?p.mouth(id):'<ellipse id="'+id+'-m" cx="0" cy="-172" rx="9" ry="1.6" fill="#2A0E0B" stroke="#E9C7A8" stroke-width="1.2"/>';
if(p.over)s+=p.over();
s+=p.hair(id);
if(p.acc)s+=p.acc(id);
s+='</g>';
s+=tape(-40,-160,30,9,-28);
return s;}

/* ----- Spock (aus FIGUR-SPOCK.html) ----- */
const HAIR='#15151A',HAIR_S='#4E5562',JK='#1E1C20',JK_L='#2E2B31',JK_S='#56515C',BELT='#5A3420',BELT_L='#8A5A3A',BUCKLE='#C9CDD2';
function belt(){const d='M0 2 C9 18 -8 34 1 50 C9 62 -4 72 0 82';
 return '<path d="'+d+'" transform="translate(2.5,2.5)" stroke="rgba(60,40,20,0.22)" stroke-width="6.5" fill="none"/>'+
 '<path d="'+d+'" stroke="'+BELT+'" stroke-width="6.5" fill="none" stroke-linecap="round"/>'+
 '<path d="'+d+'" stroke="'+BELT_L+'" stroke-width="1" fill="none" stroke-dasharray="2.5 3"/>'+
 '<rect x="-7.5" y="80" width="15" height="12" rx="2.5" fill="none" stroke="'+BUCKLE+'" stroke-width="2.8"/>'+
 '<path d="M0 81 L0 91" stroke="'+BUCKLE+'" stroke-width="1.8"/>';}
const SP={seed:71,skin:'#EFC3A0',shirt:'#2F855A',pants:'#1F2026',shoe:'#151416',browC:'#15151A',
 sleeve:JK,cuff:'#3A3638',logoY:-103,logoSize:12,logoMax:36,
 armExtra:(sx,id)=>{const k=sx<0?'l':'r';return '<g id="'+id+'-bt'+k+'" style="display:none"><g transform="translate('+(sx*43)+' -84)"><g id="'+id+'-bt'+k+'-r">'+belt()+'</g></g></g>';},
 overTorso:()=>{let s=piece([[-37,-158],[-18,-158],[-25,-58],[-46,-58]],JK,1.6)+piece([[37,-158],[18,-158],[25,-58],[46,-58]],JK,1.6);
  s+=piece([[-19,-159],[-7,-160],[-23,-126]],JK_L,0.8)+piece([[19,-159],[7,-160],[23,-126]],JK_L,0.8);
  s+='<path d="M-20 -150 L-25 -62 M20 -150 L25 -62" stroke="#8C8F96" stroke-width="1.2" stroke-dasharray="2 2" fill="none"/>';
  s+='<path d="M-39 -146 Q-37 -112 -41 -80 M38 -146 Q36 -112 40 -80" stroke="'+JK_S+'" stroke-width="2" fill="none" opacity="0.8"/>';
  s+=ln(-42,-86,-29,-88,'#3A3638',1.8)+ln(29,-88,42,-86,'#3A3638',1.8);return s;},
 collar:()=>piece([[-22,-158],[-10,-170],[-6,-158]],JK_L,0.6)+piece([[22,-158],[10,-170],[6,-158]],JK_L,0.6),
 under:()=>piece(rect(-37,-228,5,15),HAIR,0.8)+piece(rect(32,-228,5,15),HAIR,0.8),
 hair:()=>{let s=piece([[-38,-214],[-38,-236],[-32,-248],[-18,-255],[0,-257],[18,-255],[32,-249],[39,-237],[39,-214],[34,-224],[26,-232],[12,-235],[0,-236],[-12,-235],[-26,-232],[-34,-224]],HAIR,1.1);
  s+='<path d="M-22 -234 Q-22 -246 -12 -253 M-10 -236 Q-8 -248 0 -255 M4 -236 Q6 -248 14 -254 M18 -234 Q22 -244 28 -249" fill="none" stroke="'+HAIR_S+'" stroke-width="1.5" stroke-linecap="round"/>';
  s+='<path d="M-30 -230 Q-33 -238 -29 -245 M31 -230 Q34 -238 30 -245" fill="none" stroke="'+HAIR_S+'" stroke-width="1.2" stroke-linecap="round" opacity="0.8"/>';return s;},
 mouth:id=>'<g id="'+id+'-ms"><path d="M-11 -173 Q0 -169 9 -174 Q12 -176 14 -180" stroke="#2A0E0B" stroke-width="2.4" fill="none" stroke-linecap="round"/><path d="M15 -175 l2.5 2" stroke="#8A4A30" stroke-width="1.3" stroke-linecap="round"/></g>'+
  '<g id="'+id+'-mg" style="display:none"><path d="M-16 -178 Q0 -168 17 -180 Q15 -166 1 -161 Q-13 -164 -16 -178Z" fill="#2A0E0B"/><path d="M-14 -177 Q0 -170 15 -179 L14 -174 Q0 -168 -13 -173Z" fill="#FFFDF6"/></g>'+
  '<g id="'+id+'-my" style="display:none"><ellipse cx="2" cy="-171" rx="8" ry="7" fill="#2A0E0B"/><path d="M-5 -176 Q2 -179 9 -176" stroke="#FFFDF6" stroke-width="2" fill="none"/><ellipse cx="2" cy="-167" rx="4" ry="2" fill="#C2504A"/></g>',
 acc:id=>'<g>'+
  '<path d="M-28 -212 L-4 -212 L-5 -202 Q-8 -196 -16 -196 Q-26 -196 -27 -203Z" fill="#121214" stroke="#2A2A2E" stroke-width="1.4"/>'+
  '<path d="M4 -212 L28 -212 L27 -203 Q26 -196 16 -196 Q8 -196 5 -202Z" fill="#121214" stroke="#2A2A2E" stroke-width="1.4"/>'+
  '<path d="M-4 -210 Q0 -213 4 -210" stroke="#2A2A2E" stroke-width="2" fill="none"/>'+
  '<path d="M-28 -210 L-37 -213 M28 -210 L37 -213" stroke="#2A2A2E" stroke-width="2.4"/>'+
  '<path d="M-21 -210 L-25 -201 M-16 -210 L-19 -204 M11 -210 L7 -201 M16 -210 L13 -204" stroke="rgba(255,255,255,0.32)" stroke-width="1.6" stroke-linecap="round"/>'+
  '<g id="'+id+'-gt" style="display:none"><path d="M20 -216 l1.8 4.6 4.6 1.8 -4.6 1.8 -1.8 4.6 -1.8 -4.6 -4.6 -1.8 4.6 -1.8Z" fill="#FFFDF6"/></g></g>'};

/* ----- Bierdiebe (aus FIGUR-BIERDIEBE.html) ----- */
const CAMO=['#4E5A34','#5E4A32','#2F3524','#9AA070'];
function camo(x,y,w,h,n,rmax){let s='';for(let i=0;i<n;i++){const rx=2+R()*(rmax-2),ry=1.5+R()*(rmax*0.6);const cx=x+rx+R()*Math.max(0,w-2*rx),cy=y+ry+R()*Math.max(0,h-2*ry);s+=flat(ell(cx,cy,rx,ry),CAMO[Math.floor(R()*4)],2);}return s;}
const CAMO_BASE='#7C8358';
const camoKit={shirt:CAMO_BASE,pants:CAMO_BASE,shoe:'#2A2624',noLogo:true,
 overTorso:()=>camo(-30,-150,60,80,26,7)+piece(rect(-42,-74,84,8),'#3A3326',1),
 legExtra:sx=>camo(sx<0?-21:6,-70,15,56,9,4)};
function camoArm(sx){const x0=sx<0?-50:36;return camo(x0+1,-148,12,36,5,4);}
function camoArms(id,sd){seed=sd;[['al',-1],['ar',1]].forEach(([k,sx])=>{const g=$(id+'-'+k);const tmp=document.createElementNS('http://www.w3.org/2000/svg','g');tmp.innerHTML=camoArm(sx);g.insertBefore(tmp,g.children[2]);});}
const BAL='#1C1C1E';
const D1={seed:81,skin:'#F2C9A6',browC:BAL,...camoKit,
 under:()=>{let s=piece(rect(-13,-172,26,22),BAL,0.8)+piece([[-38,-158],[-38,-234],[-31,-251],[-13,-259],[13,-259],[31,-251],[39,-234],[40,-157]],BAL,1.6);
  for(let x=-30;x<=30;x+=7.5)s+='<path d="M'+x+' -250 L'+(x*1.06).toFixed(1)+' -160" stroke="#2A2A2E" stroke-width="1.1"/>';
  s+=piece(ell(-14,-204,11.5,10),'#F2C9A6',1)+piece(ell(14,-204,11.5,10),'#F2C9A6',1)+piece(ell(1,-172,11,8),'#F2C9A6',1);return s;},
 mouth:id=>'<ellipse id="'+id+'-m" cx="1" cy="-172" rx="7.5" ry="1.8" fill="#2A0E0B" stroke="#D9767A" stroke-width="2.6"/>',
 hair:()=>piece(circ(0,-259,5),BAL,0.6)};
const D2={seed:93,skin:'#E8BD98',browC:'#6A4A30',...camoKit,
 over:()=>piece([[-37,-194],[37,-196],[39,-161],[20,-152],[0,-150],[-20,-152],[-37,-160]],'#2E3228',1.4)+'<path d="M-30 -180 Q0 -174 30 -181 M-26 -166 Q0 -161 27 -167" stroke="#3E4436" stroke-width="1.4" fill="none"/>',
 hair:id=>{seed=95;let s='<g id="'+id+'-hat">'+piece([[-30,-226],[-27,-252],[-14,-262],[14,-262],[28,-252],[31,-226]],CAMO_BASE,1.4)+camo(-24,-258,48,28,9,6);
  s+=piece([[-56,-222],[-34,-232],[34,-233],[57,-222],[40,-216],[-40,-215]],'#6E7650',1.4)+camo(-44,-229,88,10,7,4)+ln(-30,-232,31,-233,'#3A3326',2.4)+'</g>';return s;}};

/* ----- Rig und Pose für V1 ----- */
function rigV1(id,browY){const g=k=>$(id+'-'+k);
 return {g:$(id),h:g('h'),e:g('e'),p:g('p'),bl:g('bl'),br:g('br'),al:g('al'),ar:g('ar'),ll:g('ll'),lr:g('lr'),m:g('m'),browY,
  ms:g('ms'),mg:g('mg'),my:g('my'),gt:g('gt'),btl:g('btl'),btr:g('btr'),btlr:g('btl-r'),btrr:g('btr-r'),hat:g('hat'),hr:g('hr')};}
function poseV1(c,o,a){
 c.g.setAttribute('transform','translate('+o.x.toFixed(1)+','+(a.boden+(o.y||0)).toFixed(1)+') rotate('+(o.rot||0).toFixed(1)+') scale(0.92)');
 c.h.setAttribute('transform','translate(0 '+(o.hy||0)+') rotate('+(o.head||0).toFixed(1)+' 0 -195)');
 c.al.setAttribute('transform','rotate('+(o.aL||0).toFixed(1)+' -43 -150)');c.ar.setAttribute('transform','rotate('+(o.aR||0).toFixed(1)+' 43 -150)');
 c.ll.setAttribute('transform','rotate('+(o.lL||0).toFixed(1)+' -13 -70)');c.lr.setAttribute('transform','rotate('+(o.lR||0).toFixed(1)+' 13 -70)');
 c.p.setAttribute('transform','translate('+(o.px||0)+' '+(o.py||0)+')');
 const es=o.eye||1;c.e.setAttribute('transform',es!==1?'translate(0 -204) scale('+es+') translate(0 204)':'');
 if(c.m)c.m.setAttribute('ry',typeof o.m==='number'?o.m:1.8);
 const b=o.br||[0,0,0,0];c.bl.setAttribute('transform','translate(-15 '+(c.browY+b[0])+') rotate('+b[1]+')');c.br.setAttribute('transform','translate(15 '+(c.browY+b[2])+') rotate('+(-b[3])+')');
 if(c.ms){const m=typeof o.m==='string'?o.m:'s';show(c.ms,m==='s');show(c.mg,m==='g');show(c.my,m==='y');
  c.my.setAttribute('transform',m==='y'&&o.sy?'translate(2 -171) scale(1 '+o.sy.toFixed(2)+') translate(-2 171)':'');}
 if(c.gt)show(c.gt,!!o.glint);
 if(c.btl){show(c.btl,!!o.belts);show(c.btr,!!o.belts);
  c.btlr.setAttribute('transform','rotate('+(-(o.aL||0)+(o.swL||0)).toFixed(1)+')');c.btrr.setAttribute('transform','rotate('+(-(o.aR||0)+(o.swR||0)).toFixed(1)+')');}
 if(c.hat)c.hat.setAttribute('transform','translate(0 '+(o.hat||0).toFixed(1)+')');
 if(c.hr)show(c.hr,!o.handLeer);}

FIGUREN['Spock']={build:a=>makeCharV1(Object.assign({},SP,{id:a.id,handR:a.hand_rechts})),rig:id=>rigV1(id,-221),apply:poseV1,
 spricht:true,lippen:(o,k)=>{if(k>=0.18){o.m='y';o.sy=0.35+0.9*k;}}};
FIGUREN['Bierdieb-Sturmhaube']={build:a=>makeCharV1(Object.assign({},D1,{id:a.id,handR:a.hand_rechts})),post:id=>camoArms(id,200),rig:id=>rigV1(id,-218),apply:poseV1,
 spricht:true,lippen:(o,k)=>{o.m=3+9*k;}};
FIGUREN['Bierdieb-Tarnhut']={build:a=>makeCharV1(Object.assign({},D2,{id:a.id,handR:a.hand_rechts})),post:id=>camoArms(id,201),rig:id=>rigV1(id,-218),apply:poseV1};
