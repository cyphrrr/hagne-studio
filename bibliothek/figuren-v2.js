/* HAGNE-Studio · Bibliothek · Figuren Version 2
   Baukasten V2 (Ei-Kopf, Schultergelenk). FIGUREN: Name -> {build, rig, apply, spricht, lippen}. */

/* ==== 4) FIGUREN – Baukasten Version 2 (aus HALLE-AUSSEN-01) + Sonderkörper ==== */
const HEAD_V2=roundPoly([[-33,-238],[33,-238],[39,-205],[30,-167],[11,-155],[-11,-155],[-30,-167],[-39,-205]],[13,13,14,14,10,10,14,14]);
const NOSE_V2=()=>flat([[0,-197],[6,-184],[0,-184]],'rgba(140,70,40,0.42)',0.5);
const TORSO_V2=roundPoly([[-34,-155],[34,-155],[42,-66],[-42,-66]],[13,13,4,4]);
const box=(x,y,w,h)=>rr(x,y,w,h,4.5);
const shoe=(x,y,w,h)=>roundPoly(rect(x,y,w,h),[x<0?6:2,x<0?2:6,1,1]);
const SHOULDER={x:40,y:-145,r:7};
function sleevePts(r,len){const p=[];for(let a=180;a<=360;a+=15){const t=a*Math.PI/180;p.push([Math.cos(t)*r,Math.sin(t)*r]);}
 p.push([r,len-4],[r-1,len],[-r+1,len],[-r,len-4]);return p;}
function armV2(shirt,sk){return piece(sleevePts(SHOULDER.r,35),shirt)+piece(rr(-6,33,12,24,4.5),sk)+piece(circ(0,61,9),sk);}
function armAt(id,side,shirt,sk,extra){return '<g transform="translate('+(side*SHOULDER.x)+' '+SHOULDER.y+')"><g id="'+id+'">'+armV2(shirt,sk)+(extra||'')+'</g></g>';}
function shrugArm(side,shirt,sk){const a1=-35*side,a2=-115*side;
 let s='<g transform="translate('+(side*SHOULDER.x)+' '+SHOULDER.y+') rotate('+a1+')">'+piece(sleevePts(SHOULDER.r,35),shirt)+piece(rr(-6,31,12,16,4.5),sk);
 s+='<g transform="translate(0 44) rotate('+a2+')">'+piece(sleevePts(6,24),sk)+piece(ell(0,29,8,9.5),sk,1);
 s+=flat(seg(-5,34,-6,42,3.4),sk,0.3)+flat(seg(-1.5,36,-1.5,45,3.4),sk,0.3)+flat(seg(2.5,36,3.5,44,3.4),sk,0.3)+flat(seg(6,32,9,38,3.4),sk,0.3);
 return s+'</g></g>';}
function makeChar(p){seed=p.seed;let s='';const sk=p.skin;
if(!p.seated){
 s+='<g id="'+p.id+'-ll">'+piece(box(-22,-72,17,66),p.pants)+piece(shoe(-30,-10,28,11),'#2A2624')+'</g>';
 s+='<g id="'+p.id+'-lr">'+piece(box(5,-72,17,66),p.pants)+piece(shoe(2,-10,28,11),'#2A2624')+'</g>';}
s+=armAt(p.id+'-al',-1,p.shirt,sk);
s+='<g id="'+p.id+'-sl" style="display:none">'+shrugArm(-1,p.shirt,sk)+'</g>';
s+=piece(TORSO_V2,p.shirt);
s+='<g data-logo="1" data-t="translate(0 -102)" data-size="15" data-max="64"></g>';
s+=armAt(p.id+'-ar',1,p.shirt,sk,p.thumb?'<g id="'+p.id+'-th" style="display:none">'+piece(rr(-3.2,60,6.4,15,3),sk,0.4)+'</g>':'');
s+='<g id="'+p.id+'-sr" style="display:none">'+shrugArm(1,p.shirt,sk)+'</g>';
s+=piece(box(-8,-168,16,16),sk);
s+='<g id="'+p.id+'-h">';
s+=piece(HEAD_V2,sk,2.6);
if(p.under)s+=p.under();
s+='<g id="'+p.id+'-e">'+piece(circ(-14,-204,7.5),'#FFFDF6',1.2)+piece(circ(14,-204,7.5),'#FFFDF6',1.2)+'<g id="'+p.id+'-p"><circle cx="-13" cy="-203" r="3" fill="#1F1B18"/><circle cx="15" cy="-203" r="3" fill="#1F1B18"/></g></g>';
s+='<g id="'+p.id+'-bl">'+flat(rect(-8.5,-2.3,17,4.6),p.browC,1)+'</g><g id="'+p.id+'-br">'+flat(rect(-8.5,-2.3,17,4.6),p.browC,1)+'</g>';
s+=NOSE_V2();
if(p.beard)s+=p.beard();
s+='<ellipse id="'+p.id+'-m" cx="0" cy="-172" rx="9" ry="1.6" fill="#2A0E0B" stroke="#E9C7A8" stroke-width="1.2"/>';
if(p.over)s+=p.over();
s+=p.hair();
if(p.acc)s+=p.acc();
s+='</g>';
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

/* Sonderkörper DrBier-Riese (V1): Kopf nie im Bild, linker Arm trinkt oben */
const RLEG=126,RTOR=136,RAX=80,RUP=RLEG+RTOR,RSH=-155-RUP,RHIP=-66-RLEG;
function makeRiese(id){seed=61;let s='';const sk='#F4CFAE',shirt='#2F7A3E',pants='#3A4A62';
s+='<g id="'+id+'-ll">'+piece(rect(-17,-72-RLEG,13,66+RLEG),pants)+piece(rect(-27,-10,25,11),'#2A2624')+'</g>';
s+='<g id="'+id+'-lr">'+piece(rect(4,-72-RLEG,13,66+RLEG),pants)+piece(rect(2,-10,25,11),'#2A2624')+'</g>';
s+='<g id="'+id+'-al">'+piece(rect(-42,RSH+5,13,44),shirt)+piece(rect(-41,RSH+47,11,56+RAX),sk)+'<g id="'+id+'-hb" transform="translate(-35.5 '+(RSH+120+RAX)+')">'+rBottle()+'</g>'+piece(circ(-35.5,RSH+106+RAX,8.5),sk)+'</g>';
s+=piece([[-27,RSH],[27,RSH],[33,RHIP],[-33,RHIP]],shirt);
s+='<g data-logo="1" data-t="translate(0 '+(RSH+58)+')" data-size="14" data-max="50"></g>';
s+='<g id="'+id+'-ar">'+piece(rect(29,RSH+5,13,44),shirt)+piece(rect(30,RSH+47,11,56+RAX),sk)+piece(circ(35.5,RSH+106+RAX,8.5),sk)+'</g>';
return s;}

function show(el,on){if(el)el.style.display=on?'':'none';}
function rigV2(id){const g=k=>$(id+'-'+k);return {g:$(id),h:g('h'),e:g('e'),p:g('p'),bl:g('bl'),br:g('br'),m:g('m'),al:g('al'),ar:g('ar'),sl:g('sl'),sr:g('sr'),ll:g('ll'),lr:g('lr'),th:g('th')};}
function poseV2(c,o,baseY){
 c.g.setAttribute('transform','translate('+o.x.toFixed(1)+','+(baseY+(o.y||0)).toFixed(1)+') scale(0.92)');
 c.h.setAttribute('transform','translate(0 '+(o.hy||0)+') rotate('+(o.head||0).toFixed(1)+' 0 -195)');
 const sh=!!o.shrug;show(c.al,!sh);show(c.ar,!sh);show(c.sl,sh);show(c.sr,sh);
 if(c.al)c.al.setAttribute('transform','rotate('+(o.aL||0).toFixed(1)+')');
 if(c.ar)c.ar.setAttribute('transform','rotate('+(o.aR||0).toFixed(1)+')');
 if(c.ll)c.ll.setAttribute('transform','rotate('+(o.lL||0).toFixed(1)+' -13 -70)');
 if(c.lr)c.lr.setAttribute('transform','rotate('+(o.lR||0).toFixed(1)+' 13 -70)');
 show(c.th,!!o.thumb);
 c.p.setAttribute('transform','translate('+(o.px||0)+' '+(o.py||0)+')');
 const es=o.es||1,ew=o.ew||1;c.e.setAttribute('transform',(es!==1||ew!==1)?'translate(0 -204) scale('+ew+' '+(es*ew).toFixed(2)+') translate(0 204)':'');
 c.m.setAttribute('ry',o.m||1.6);
 const b=o.br||[0,0,0,0];c.bl.setAttribute('transform','translate(-15 '+(-218+b[0])+') rotate('+b[1]+')');c.br.setAttribute('transform','translate(15 '+(-218+b[2])+') rotate('+(-b[3])+')');}

const LIPPEN_V2=(o,k)=>{o.m=k>0.15?1.6+k*6:1.6;};
const FIGUREN={
 'PoBi':   {build:(a)=>makeChar(Object.assign({},PB,{id:a.id,seated:a.haltung==='sitzt'})),rig:rigV2,apply:(r,o,a)=>poseV2(r,o,a.boden),spricht:true,lippen:LIPPEN_V2},
 'cypheR': {build:(a)=>makeChar(Object.assign({},CY,{id:a.id,seated:a.haltung==='sitzt'})),rig:rigV2,apply:(r,o,a)=>poseV2(r,o,a.boden),spricht:true,lippen:LIPPEN_V2},
 'DrBier-Riese':{build:(a)=>makeRiese(a.id),
   rig:(id)=>({g:$(id),al:$(id+'-al'),ar:$(id+'-ar'),ll:$(id+'-ll'),lr:$(id+'-lr'),hb:$(id+'-hb')}),
   apply:(r,o,a)=>{r.g.setAttribute('transform','translate('+o.x.toFixed(1)+','+a.boden+') scale(0.92)');
     r.al.setAttribute('transform','rotate('+(a.pose==='trinkt-oben'?168:(o.aL||0))+' -35.5 '+(RSH+5)+')');
     r.ar.setAttribute('transform','rotate('+(o.aR||0).toFixed(1)+' 35.5 '+(RSH+5)+')');
     r.ll.setAttribute('transform','rotate('+(o.lL||0).toFixed(1)+' -10.5 '+(-72-RLEG)+')');
     r.lr.setAttribute('transform','rotate('+(o.lR||0).toFixed(1)+' 10.5 '+(-72-RLEG)+')');
     show(r.hb,!o.handLeer);}}
};
