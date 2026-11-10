/* HAGNE-Studio · Bibliothek · Orga-Figuren
   KickASS, m0og, Deichshaf (V2), DocEvel (V2, Ellbogen), Spallter (V2-Sonderkörper), DrBier (V2-Sonderkörper, einen Kopf größer).
   Übernommen aus den Projekt-Dateien FIGUR-KICKASS, FIGUR-M0OG, FOYER-01 und EPISODE-WERBUNK (Deichshaf), FIGUR-SPALLTER, FIGUR-DRBIER.
   Jede Figur steckt in einem eigenen Block, damit sich Hilfsnamen nicht in die Quere kommen. */

/* ==== Ellbogengelenk (VERSION-2, Baustein 9) ==== */
const ELBOW=33,FORE=28;
function armJ(id,side,shirt,sk,extra,edge){
 return '<g transform="translate('+(side*SHOULDER.x)+' '+SHOULDER.y+')"><g id="'+id+'">'+
  '<g transform="translate(0 '+ELBOW+')"><g id="'+id+'-f">'+piece(sleevePts(6,24),sk)+piece(circ(0,FORE,9),sk)+(extra||'')+'</g></g>'+
  piece(sleevePts(SHOULDER.r,35),shirt)+(edge?'<path d="'+poly(sleevePts(SHOULDER.r,35),0.4)+'" fill="none" stroke="'+edge+'" stroke-width="1.3"/>':'')+'</g></g>';}

/* ==== Erweiterter V2-Baukasten: Shorts, Stiefel mit Hüftgelenk, Ellbogen, rote Wangen, eigener Mund ==== */
function makeCharV2x(p){seed=p.seed;let s='';const sk=p.skin,id=p.id;
 if(p.legAt){s+=p.legAt(id+'-ll',-1,p)+p.legAt(id+'-lr',1,p);}
 else if(!p.seated){
  const leg=(sx)=>p.shorts?piece(box(sx<0?-19:6,-46,13,40),sk)+piece(box(sx<0?-24:4,-72,20,30),p.pants):piece(box(sx<0?-22:5,-72,17,66),p.pants);
  s+='<g id="'+id+'-ll">'+leg(-1)+piece(shoe(-30,-10,28,11),'#2A2624')+'</g>';
  s+='<g id="'+id+'-lr">'+leg(1)+piece(shoe(2,-10,28,11),'#2A2624')+'</g>';}
 const arm=(aid,side)=>p.ellbogen?armJ(aid,side,p.shirt,sk,'',p.edge):armAt(aid,side,p.shirt,sk,'',side>0?handItem(id,p.handR):'');
 s+=arm(id+'-al',-1);
 s+=piece(TORSO_V2,p.shirt);
 s+='<g data-logo="1" data-t="translate(0 -127)" data-size="15" data-max="64"></g>';
 s+=arm(id+'-ar',1);
 s+=piece(box(-8,-168,16,16),sk);
 s+='<g id="'+id+'-h">';
 s+=piece(HEAD_V2,sk,2.6);
 if(p.under)s+=p.under(id);
 s+=augen(id);
 s+='<g id="'+id+'-bl">'+flat(rect(-8.5,-2.3,17,4.6),p.browC,1)+'</g><g id="'+id+'-br">'+flat(rect(-8.5,-2.3,17,4.6),p.browC,1)+'</g>';
 s+=NOSE_V2();
 if(p.flush)s+='<g id="'+id+'-fl" opacity="0"><ellipse cx="-21" cy="-184" rx="7" ry="4" fill="#E24B4A"/><ellipse cx="21" cy="-184" rx="7" ry="4" fill="#E24B4A"/></g>';
 if(p.beard)s+=p.beard(id);
 if(p.mouth)s+=p.mouth(id)+'<ellipse id="'+id+'-m" cx="0" cy="-172" rx="9" ry="1.6" fill="#2A0E0B" stroke="#E9C7A8" stroke-width="1.2" style="display:none"/>';
 else s+='<ellipse id="'+id+'-m" cx="0" cy="-172" rx="9" ry="1.6" fill="#2A0E0B" stroke="#E9C7A8" stroke-width="1.2"/>';
 s+=mundformen(id);
 if(p.over)s+=p.over(id);
 s+=p.hair(id);
 if(p.acc)s+=p.acc(id);
 s+='</g>';
 return s;}
function rigV2x(id){const r=rigV2(id),g=k=>$(id+'-'+k);
 return Object.assign(r,{alf:g('al-f'),arf:g('ar-f'),fl:g('fl'),ms:g('ms'),smoke:g('smoke'),hip:!!g('ll')&&!!g('ll').closest('[data-huefte]')});}
function poseV2x(c,o,a){poseV2(c,o,a.boden);
 if(c.hip){c.ll.setAttribute('transform','rotate('+(o.lL||0).toFixed(1)+')');c.lr.setAttribute('transform','rotate('+(o.lR||0).toFixed(1)+')');}
 if(c.alf)c.alf.setAttribute('transform','rotate('+(o.aLf||0).toFixed(1)+')');
 if(c.arf)c.arf.setAttribute('transform','rotate('+(o.aRf||0).toFixed(1)+')');
 if(c.fl)c.fl.setAttribute('opacity',(o.wangen||0).toFixed(2));
 if(c.ms){const mf=typeof o.m==='string',offen=!mf&&(o.m||1.6)>1.8;show(c.ms,!mf&&!offen);show(c.m,offen);}
 if(c.smoke){const f=o._f||0;c.smoke.setAttribute('transform','translate('+(Math.floor(f/3)%2?1.5:-1.5)+' '+(-(Math.floor(f/2)%4))+')');}}
const V2X=def=>({build:a=>makeCharV2x(Object.assign({},def,{id:a.id,seated:a.haltung==='sitzt',handR:a.hand_rechts})),rig:rigV2x,apply:poseV2x,spricht:true,lippen:LIPPEN_V2});

/* ==== KickASS: olivgrünes Shirt, Shorts, extra große Stiefel mit Hüftgelenk, Funk am Ohr ==== */
(()=>{
const HIP={x:14,y:-66,r:10};
const BOOT='#8A5A2E',BOOT_D='#5C3A1C',BOOT_L='#B57E48',SOLE='#2E2018',LACE='#E6D3A8';
function bootV2(s,cx){let o='';
 o+=piece(rr(Math.min(cx-s*10,cx+s*16),36,26,22,6),BOOT);
 o+=piece(roundPoly([[cx-s*10,44],[cx+s*12,44],[cx+s*34,48],[cx+s*43,60],[cx-s*11,61]],[5,8,13,5,4]),BOOT);
 o+=flat(ell(cx+s*31,52,8,3.8),BOOT_L,0.6);
 o+=piece(rr(Math.min(cx-s*11,cx+s*17),33,28,7,3),BOOT_D,1);
 o+=piece(rr(Math.min(cx-s*11,cx+s*45),59,56,8,3),SOLE,1);
 o+='<path d="M'+(cx-s*9)+' 58 L'+(cx+s*40)+' 58" stroke="'+BOOT_L+'" stroke-width="0.9" stroke-dasharray="2 2" fill="none"/>';
 const lx=cx+s*3;let l='';[39,44,49].forEach(y=>{l+='M'+(lx-5)+' '+y+' L'+(lx+5)+' '+(y+4)+' M'+(lx+5)+' '+y+' L'+(lx-5)+' '+(y+4)+' ';});
 o+='<path d="'+l+'" stroke="'+LACE+'" stroke-width="1.3" stroke-linecap="round" fill="none"/>';
 return o;}
function legAt(id,side,p){const cx=-side*1.5;
 return '<g transform="translate('+(side*HIP.x)+' '+HIP.y+')" data-huefte="1"><g id="'+id+'">'+piece(box(cx-6.5,18,13,26),p.skin)+piece(sleevePts(HIP.r,24),p.pants)+bootV2(side,cx)+'</g></g>';}
FIGUREN['KickASS']=V2X({seed:11,skin:'#F0C4A0',shirt:'#5E6640',pants:'#22201E',browC:'#3E2A1E',legAt,
 beard:beardFull('#8E8A84','#B9B5AD','#5F5B56'),
 hair:()=>{let s=piece([[-37,-226],[-35,-247],[-16,-258],[14,-260],[34,-251],[38,-226]],'#3E2A1E',1.6);s+='<path d="M-22 -250 Q-4 -262 26 -250 M-26 -242 Q-2 -254 30 -242" fill="none" stroke="#5E4332" stroke-width="2"/>';s+=piece(rect(-38,-232,6,24),'#AAA69E',1)+piece(rect(32,-232,6,24),'#AAA69E',1);return s;},
 acc:()=>piece(rect(35,-207,7,11),'#2A2624',0.8)+'<path d="M39 -196 l-4 4 l5 3 l-5 3 l5 3 l-5 3 l5 3 l-5 3 l5 3 L32 -162" fill="none" stroke="#2A2624" stroke-width="1.6" stroke-linejoin="round"/>'});
})();

/* ==== m0og: blond, eckige Goldbrille mit Bügeln, Kippe mit Rauch, rotes Shirt, wird beim Schimpfen rot ==== */
const M0OG=V2X({seed:23,skin:'#F6D2B0',shirt:'#C8382B',pants:'#3A4A62',flush:true,browC:'#B8943E',
 over:id=>flat(rect(-10,-182,20,3),'rgba(214,180,96,0.75)',0.6)+'<g id="'+id+'-cig"><path d="M7 -174 L7 -171 L30 -163 L31 -168 Z" fill="#FBFAF5" stroke="#D3D1C7" stroke-width="0.6"/><circle id="'+id+'-glow" cx="31" cy="-165.5" r="2.4" fill="#E24B4A"/><path id="'+id+'-smoke" d="M32 -170 q-5 -8 1 -14 q6 -6 0 -14" fill="none" stroke="#E8E6E0" stroke-width="2" stroke-linecap="round" opacity="0.8"/></g>',
 hair:()=>piece([[-37,-225],[-36,-244],[-18,-252],[0,-254],[18,-252],[36,-244],[37,-225],[28,-230],[18,-226],[6,-231],[-6,-226],[-18,-231],[-28,-226]],'#D9B85C',1.4),
 acc:()=>brille('duenn',{farbe:'#C9A04A',glas:null})});
/* Erweiterung aus FIGUR-M0OG: glut 0–1 (tiefer Zug, Glut hell und flackernd), kippe_y (Kippe wippt), rauch false (Rauchfaden aus),
   wolke 0–1 (Rauchwolke steigt vom Mund nach rechts oben und verblasst), mrx (Mundbreite) */
FIGUREN['m0og']=Object.assign({},M0OG,{
 build:a=>{let s=M0OG.build(a);const sv=seed;seed=32;
  s+='<g id="'+a.id+'-puff" opacity="0">'+flat(circ(0,0,7),'rgba(232,230,224,0.9)',1)+flat(circ(9,-4,6),'rgba(232,230,224,0.85)',1)+flat(circ(-6,-7,5),'rgba(232,230,224,0.85)',1)+flat(circ(4,-12,6.5),'rgba(232,230,224,0.8)',1)+'</g>';
  seed=sv;return s;},
 rig:id=>Object.assign(M0OG.rig(id),{cig:$(id+'-cig'),glow:$(id+'-glow'),puff:$(id+'-puff')}),
 apply:(c,o,a)=>{M0OG.apply(c,o,a);const f=o._f||0,g=o.glut||0;
  /* Attribute nur anfassen, wenn sie vom Grundzustand abweichen – so bleiben Folgen ohne diese Felder bildgleich */
  const set=(el,k,v,grund)=>{if(v===grund)el.removeAttribute(k);else el.setAttribute(k,v);};
  if(g>0){c.glow.setAttribute('r',(2.4+1.6*g).toFixed(1));c.glow.setAttribute('fill',Math.floor(f/2)%2?'#FF7A3D':'#FFB347');c._glut=true;}
  else if(c._glut){c.glow.setAttribute('r','2.4');c.glow.setAttribute('fill','#E24B4A');c._glut=false;}
  set(c.cig,'transform',o.kippe_y?'translate(0 '+o.kippe_y.toFixed(1)+')':'','');
  c.smoke.setAttribute('opacity',o.rauch===false?0:0.8);
  c.m.setAttribute('rx',o.mrx||9);
  const w=o.wolke;if(w===undefined||w>=1){c.puff.setAttribute('opacity',0);}
  else{c.puff.setAttribute('opacity',(0.9*(1-w)).toFixed(2));c.puff.setAttribute('transform','translate('+(8+38*w).toFixed(1)+' '+(-174-46*w).toFixed(1)+') scale('+(0.35+1.25*w).toFixed(2)+')');}}});

/* ==== Deichshaf: grau-braune Haare, Dreitagebart, schwarzes Shirt, Ellbogengelenk ====
   Fassung aus E03 „Werbunk“ (Grundlage FOYER-01). Kann stehen oder von vorn sitzen (haltung "sitzt", Oberkörper sinkt um 32),
   hat ein Ansteckmikro und in den Händen: Handmikro links (mikro, mikro_kipp), Zeigefinger links (zeigefinger),
   Zettel rechts (zettel), Daumen hoch rechts (thumb) und links (thumbL). Die Teile in der Hand bleiben aufrecht.
   Grüne Bierflasche: flasche "hand" (rechte Hand) oder [x,y] als fester Platz im Bild, Neigung flasche_kipp.
   Kaffeetasse (FIGUR-DEICHSHAF): tasse true = in der rechten Hand, tasse_kipp, dampf false = kein Dampf; funkeln = Sternchen am linken Daumen.
   Münder: m = 's' Lächeln (Grund), 'g' Grinsen, 'o' Schlürfen, 'n' gerade; eine Zahl ab 2 = Sprechmund mit dieser Öffnung. */
(()=>{
const SKIN='#D9A47A',HAIR_N='#7D7064',HAIR_G='#A39A90',HAIR_D='#5C5248';
const BOT='#3F7A3A',DY=32,EDGE='#45453F',SH='#1E1E1C',PANTS='#3A4A62',BROW='#4E4237';
function stubble(){let s=flat([[-35,-194],[-26,-185],[-14,-180],[14,-180],[26,-185],[35,-194],[31,-176],[27,-166],[11,-157],[-11,-157],[-27,-166],[-31,-176]],'rgba(70,56,44,0.26)',0.8);
 const wl=y=>y<=-176?35-(y+194)*0.222:(y<=-166?31-(y+176)*0.4:27-(y+166)*1.78);
 let n=0,guard=0;while(n<140&&guard<3000){guard++;const x=(R()-.5)*66,y=-193+R()*35;const ax=Math.abs(x);
  const top=ax>14?-180-(ax-14)*0.667:-180;if(y<top+1||y>-158||ax>wl(y)-2)continue;if(ax<12&&y>-178&&y<-166)continue;
  s+='<circle cx="'+x.toFixed(1)+'" cy="'+y.toFixed(1)+'" r="'+(0.4+R()*0.25).toFixed(2)+'" fill="'+(R()<0.35?'#8E857B':'#4A3E34')+'" opacity="0.55"/>';n++;}
 return s;}
/* Bierflasche grün. Ursprung = Griffpunkt (Mitte Bauch), Hals nach oben (-y), Boden bei +12 */
function bottle(id){let s='<g id="'+id+'">';
 s+=piece(rr(-6,-12,12,24,2.5),BOT,1);
 s+=piece([[-6,-11],[6,-11],[2.6,-21],[-2.6,-21]],BOT,0.8);
 s+=piece(rect(-2.6,-30,5.2,10),BOT,0.6);
 s+=flat(rect(-3.2,-32.5,6.4,3),'#C9CDD0',0.4);
 s+=flat(rect(-5.6,-6,11.2,10),'#F3F0E6',0.6)+flat(rect(-5.6,-3,11.2,2),'#C8302A',0.3)+flat(rect(-3.4,-16,6.8,3.5),'#F3F0E6',0.3);
 s+=flat(rect(-4,-10,1.6,20),'rgba(220,255,210,0.35)',0.3);
 s+='</g>';return s;}
/* Handmikro: Ursprung = Faust, Kopf oben */
function micHand(){return piece(rr(-2.2,-8,4.4,16,1.8),'#1A1A1A',0.4)+piece(circ(0,-12,5),'#2E2E30',0.5)+
 '<path d="M-3.5 -13.5 h7 M-3.8 -11 h7.6 M-1.5 -16 v8 M1.5 -16 v8" stroke="#555558" stroke-width="0.6"/>'+
 piece(rr(-6,-3,12,7,3),SKIN,0.5)+'<path d="M-5 0.5 h10" stroke="rgba(120,60,30,0.5)" stroke-width="0.8"/>';}
/* Zettel (Moderationskarte), Ursprung = Faust, Daumen liegt vorne drauf */
function paperHand(){return piece(rr(-11,-26,22,28,1.5),'#FBFAF5',0.6)+'<path d="M-7 -20 h14 M-7 -15 h12 M-7 -10 h14 M-7 -5 h9" stroke="#8A8A86" stroke-width="1"/>'+
 piece(rr(-4,-4,8,9,3.5),SKIN,0.4);}
function thumbUp(id,spk){return '<g id="'+id+'" style="display:none">'+piece(rr(-5,-20,7.5,15,3.6),SKIN,0.7)+'<path d="M-5 -1 h11 M-5 3 h11" stroke="rgba(120,60,30,0.5)" stroke-width="1" stroke-linecap="round"/>'+
 (spk?'<g id="'+spk+'" style="display:none"><path d="M9 -28 l1.6 4 4 1.6 -4 1.6 -1.6 4 -1.6 -4 -4 -1.6 4 -1.6Z" fill="#FFF3B0"/><path d="M-14 -24 l1 2.5 2.5 1 -2.5 1 -1 2.5 -1 -2.5 -2.5 -1 2.5 -1Z" fill="#FFF3B0"/></g>':'')+'</g>';}
/* Kaffeetasse (FIGUR-DEICHSHAF): Ursprung = Hand am Henkel, Tassenkörper zur Körpermitte, Dampf darüber */
function mug(id){const MUG='#161618',MUG_E='#55555C';let s='';
 s+=flat(rr(-23,-13,22,25,4),MUG_E,0.6)+piece(rr(-22,-12,20,23,3.5),MUG,1);
 s+='<path d="M-2.5 -7 C7 -8 7 5 -2.5 4.5" fill="none" stroke="'+MUG_E+'" stroke-width="5"/><path d="M-2.5 -7 C7 -8 7 5 -2.5 4.5" fill="none" stroke="'+MUG+'" stroke-width="3.2"/>';
 s+=flat(ell(-12,-12,10,2.4),'#3A3A40',0.3)+flat(ell(-12,-12,7.5,1.5),'#4A2C1A',0.2);
 s+='<path d="M-19 -8 L-19 7" stroke="rgba(255,255,255,0.18)" stroke-width="1.6" stroke-linecap="round"/>';
 s+='<g data-logo="1" data-t="translate(-12 3)" data-size="7" data-max="16"></g>';
 s+=piece(rr(-3,-5,9,10,3.5),SKIN,0.6)+'<path d="M-2 -1.5 h6 M-2 1.8 h6" stroke="rgba(120,60,30,0.45)" stroke-width="0.8"/>';
 s+='<g id="'+id+'-st"><path d="M-16 -17 q-4 -5 0 -10 q4 -5 0 -10" fill="none" stroke="#F4F2EC" stroke-width="2" stroke-linecap="round" opacity="0.75"/><path d="M-8 -16 q-4 -5 0 -9 q4 -5 0 -9" fill="none" stroke="#F4F2EC" stroke-width="1.6" stroke-linecap="round" opacity="0.6"/></g>';
 return s;}
function handPos(th,e){const a=th*Math.PI/180,b=(th+e)*Math.PI/180;
 return [SHOULDER.x-ELBOW*Math.sin(a)-FORE*Math.sin(b),SHOULDER.y+ELBOW*Math.cos(a)+FORE*Math.cos(b)];}
function armExtra(id,sx){return '<g transform="translate(0 '+FORE+')">'+
 (sx<0?'<g id="'+id+'-ptL" style="display:none">'+piece(rr(-2.6,4,5.2,15,2.6),SKIN,0.5)+'</g><g id="'+id+'-cL"><g id="'+id+'-mic" style="display:none">'+micHand()+'</g>'+thumbUp(id+'-thL',id+'-spk')+'</g>'
      :'<g id="'+id+'-cR"><g id="'+id+'-paper" style="display:none">'+paperHand()+'</g>'+thumbUp(id+'-thR')+'</g>')+'</g>';}
function hair(){let s=piece(roundPoly([[-40,-214],[-40,-232],[-34,-246],[-20,-254],[0,-257],[20,-254],[34,-246],[40,-232],[40,-214],[36,-222],[30,-229],[20,-233],[8,-231],[-2,-234],[-14,-231],[-26,-232],[-34,-224]],3),HAIR_N,1.1);
 s+='<path d="M-28 -241 l3 -5 M-16 -247 l3 -5 M-4 -250 l3 -5 M8 -249 l3 -5 M20 -245 l3 -5 M-22 -236 l2 -4 M2 -239 l2 -4 M14 -237 l2 -4 M30 -237 l2 -4" stroke="'+HAIR_G+'" stroke-width="1.5" stroke-linecap="round"/>';
 s+='<path d="M-10 -243 l2 -4 M26 -241 l2 -4 M-32 -232 l2 -4" stroke="'+HAIR_D+'" stroke-width="1.3" stroke-linecap="round"/>';return s;}
function mouth(id){return '<g id="'+id+'-ms"><path d="M-10 -174 Q0 -166 10 -174" stroke="#2A0E0B" stroke-width="2.4" fill="none" stroke-linecap="round"/><path d="M-11 -175.5 l-1.5 -1.5 M11 -175.5 l1.5 -1.5" stroke="#8A4A30" stroke-width="1.2" stroke-linecap="round"/></g>'+
 '<g id="'+id+'-mg" style="display:none"><path d="M-15 -177 Q0 -172.5 15 -177 Q11 -160 0 -160 Q-11 -160 -15 -177Z" fill="#2A0E0B"/><path d="M-13.5 -176.2 Q0 -172.2 13.5 -176.2 L12.6 -172.6 Q0 -169.2 -12.6 -172.6Z" fill="#FFFDF6"/><ellipse cx="0" cy="-163.5" rx="5" ry="2" fill="#C2504A"/></g>'+
 '<g id="'+id+'-mo" style="display:none"><ellipse cx="0" cy="-172" rx="3.6" ry="2.6" fill="#2A0E0B"/></g>'+
 '<g id="'+id+'-mn" style="display:none"><path d="M-9 -172 L9 -172" stroke="#2A0E0B" stroke-width="2.4" stroke-linecap="round"/></g>'+
 '<ellipse id="'+id+'-mt" style="display:none" cx="0" cy="-171" rx="8" ry="3" fill="#2A0E0B" stroke="#C98A68" stroke-width="1"/>';}
function build(a){const id=a.id,seated=a.haltung==='sitzt',sk=SKIN;seed=53;let s='';
 if(seated){
  s+=piece(box(-23,-36,17,30),PANTS)+piece(box(6,-36,17,30),PANTS);
  s+=piece(shoe(-31,-10,28,11),'#2A2624')+piece(shoe(3,-10,28,11),'#2A2624');
  s+=piece(rr(-26,-50,22,20,7),PANTS)+piece(rr(4,-50,22,20,7),PANTS);
  s+=flat(ell(-15,-38,8,4),'rgba(255,255,255,0.08)',0.4)+flat(ell(15,-38,8,4),'rgba(255,255,255,0.08)',0.4);
 }else{
  s+=piece(box(-22,-72,17,66),PANTS)+piece(box(5,-72,17,66),PANTS);
  s+=piece(shoe(-30,-10,28,11),'#2A2624')+piece(shoe(2,-10,28,11),'#2A2624');}
 s+='<g transform="translate(0 '+(seated?DY:0)+')">';
 s+=piece(seated?roundPoly([[-34,-155],[34,-155],[42,-82],[-42,-82]],[13,13,4,4]):TORSO_V2,SH);
 s+='<g data-logo="1" data-t="translate(0 -127)" data-size="15" data-max="64"></g>';
 s+='<circle cx="12" cy="-140" r="2.6" fill="#0E0E0E" stroke="#3A3A3A" stroke-width="0.8"/>';
 /* beide Arme liegen vor dem Rumpf, damit Mikro und Zeigefinger vor dem Shirt lesbar bleiben */
 s+=armJ(id+'-al',-1,SH,sk,armExtra(id,-1),EDGE);
 s+=armJ(id+'-ar',1,SH,sk,armExtra(id,1),EDGE);
 s+=piece(box(-8,-168,16,16),sk);
 s+='<g id="'+id+'-h">';
 s+=piece(HEAD_V2,sk,2.6);
 s+=piece(rect(-39,-226,5,15),'#958B80',0.8)+piece(rect(34,-226,5,15),'#958B80',0.8);
 s+=augen(id);
 s+='<g id="'+id+'-bl">'+flat(rect(-8.5,-2.3,17,4.6),BROW,1)+'</g><g id="'+id+'-br">'+flat(rect(-8.5,-2.3,17,4.6),BROW,1)+'</g>';
 s+=NOSE_V2();
 s+=stubble();
 s+=mouth(id);
 s+=hair();
 s+='</g>';
 s+='<g id="'+id+'-front"><g id="'+id+'-bot">'+bottle(id+'-botg')+'<g id="'+id+'-grip">'+piece(rr(-7.5,-5,15,10,4),SKIN,0.5)+'<path d="M-6.5 -1.6 h13 M-6.5 1.8 h13" stroke="rgba(120,60,30,0.45)" stroke-width="0.8"/></g></g>';
 /* Tasse mit eigenem Zufall, damit sich an den übrigen Teilen nichts verschiebt */
 {const sv=seed;seed=60;s+='<g id="'+id+'-mug">'+mug(id)+'</g>';seed=sv;}
 s+='</g></g>';
 return s;}
function rig(id){const g=k=>$(id+'-'+k);
 return {g:$(id),h:g('h'),e:g('e'),p:g('p'),bl:g('bl'),br:g('br'),al:g('al'),ar:g('ar'),alf:g('al-f'),arf:g('ar-f'),
  ms:g('ms'),mg:g('mg'),mo:g('mo'),mt:g('mt'),mn:g('mn'),paper:g('paper'),thL:g('thL'),thR:g('thR'),cL:g('cL'),cR:g('cR'),mic:g('mic'),ptL:g('ptL'),
  bot:g('bot'),grip:g('grip'),mug:g('mug'),st:g('st'),spk:g('spk')};}
function apply(r,o,a){const aL=o.aL||0,aLf=o.aLf||0,aR=o.aR||0,aRf=o.aRf||0,f=o._f||0,seated=a.haltung==='sitzt';
 r.g.setAttribute('transform','translate('+o.x.toFixed(1)+','+(a.boden+(o.y||0)).toFixed(1)+') scale(0.92)'+(o.rot?' rotate('+o.rot.toFixed(1)+')':''));
 r.h.setAttribute('transform','translate(0 '+(o.hy||0)+') rotate('+(o.head||0).toFixed(1)+' 0 -195)');
 r.al.setAttribute('transform','rotate('+aL.toFixed(1)+')');r.alf.setAttribute('transform','rotate('+aLf.toFixed(1)+')');
 r.ar.setAttribute('transform','rotate('+aR.toFixed(1)+')');r.arf.setAttribute('transform','rotate('+aRf.toFixed(1)+')');
 r.cL.setAttribute('transform','rotate('+(-(aL+aLf)+(o.mikro_kipp||0)).toFixed(1)+')');r.cR.setAttribute('transform','rotate('+(-(aR+aRf)).toFixed(1)+')');
 show(r.thL,!!o.thumbL);show(r.thR,!!o.thumb);show(r.mic,!!o.mikro);show(r.ptL,!!o.zeigefinger);show(r.paper,!!o.zettel);
 const b=o.br||[0,0,0,0];
 /* Ruhemund ist das schiefe Grinsen. Mit tief gesenkten Brauen (genervt, wütend) sähe das bösartig aus:
    gibt das Drehbuch keinen Mund vor, wird er dann neutral. */
 let m=o.m===undefined?(Math.max(b[1],b[3])>=10?'n':'s'):o.m;if(typeof m==='number')m=m>=2?'t':'s';else if(m==='y')m='g';
 show(r.ms,m==='s');show(r.mg,m==='g');show(r.mo,m==='o');show(r.mt,m==='t');show(r.mn,m==='n');if(m==='t')r.mt.setAttribute('ry',o.m.toFixed(1));
 r.bl.setAttribute('transform','translate('+(-AUGE.braue)+' '+(AUGE.braueY+b[0])+') rotate('+b[1]+')');r.br.setAttribute('transform','translate('+AUGE.braue+' '+(AUGE.braueY+b[2])+') rotate('+(-b[3])+')');
 r.p.setAttribute('transform','translate('+(o.px||0)+' '+(o.py||0)+')');
 /* Blinzeln deterministisch aus der Bildnummer, nur bei offenen Augen */
 let es=o.es===undefined?1:o.es;const ew=o.ew||1;if(es===1&&ew===1&&((f*7919)%61)<2)es=0.12;
 r.e.setAttribute('transform',(es!==1||ew!==1)?'translate(0 -204) scale('+ew+' '+(es*ew).toFixed(2)+') translate(0 204)':'');
 if(!o.flasche){show(r.bot,false);}else{show(r.bot,true);let x,y;
  if(o.flasche==='hand'){const hp=handPos(aR,aRf);x=hp[0];y=hp[1];show(r.grip,true);}
  else{x=(o.flasche[0]-o.x)/0.92;y=(o.flasche[1]-a.boden)/0.92-(seated?DY:0);show(r.grip,false);}
  r.bot.setAttribute('transform','translate('+x.toFixed(1)+' '+y.toFixed(1)+') rotate('+(o.flasche_kipp||0).toFixed(1)+')');}
 show(r.mug,!!o.tasse);show(r.spk,!!o.funkeln);
 if(o.tasse){const hp=handPos(aR,aRf);r.mug.setAttribute('transform','translate('+hp[0].toFixed(1)+' '+hp[1].toFixed(1)+') rotate('+(o.tasse_kipp||0).toFixed(1)+')');
  show(r.st,o.dampf!==false);r.st.setAttribute('transform','translate('+(Math.floor(f/3)%2?1.2:-1.2)+' '+(-(Math.floor(f/2)%3))+')');}}
FIGUREN['Deichshaf']={build,rig,apply,spricht:true,lippen:(o,k)=>{if(k>0.12)o.m=1.5+6*k;},kopfhoehe:a=>a.haltung==='sitzt'?262-DY:262};
})();

/* ==== Spallter: Rumpf so dünn wie die Arme, Kopf in Normalgröße, Brille, kurzer Vollbart ==== */
(()=>{
const P={seed:53,skin:'#F4CCA8',shirt:'#3E9A4A',pants:'#3A4A62',hairC:'#B08A5E',browC:'#8A6440',beardC:'#8A6440'};
const SH_T={x:10,y:-148,r:5};
function armT(id,side,shirt,sk){return '<g transform="translate('+(side*SH_T.x)+' '+SH_T.y+')"><g id="'+id+'">'+piece(sleevePts(SH_T.r,17),shirt,1.4)+piece(rr(-4,15,8,46,3),sk,1.4)+piece(circ(0,62,6),sk,1)+'</g></g>';}
function bentArm(id,shirt,sk,L1,L2,extra){
 const upper=piece(roundPoly(rect(-4,11,8,L1-11+4),[0,0,4,4]),sk,1)+piece(sleevePts(SH_T.r,15),shirt,1);
 const fore=piece(sleevePts(4,L2),sk,1)+piece(circ(0,L2+1,6),sk,0.8)+(extra||'');
 return '<g transform="translate('+SH_T.x+' '+SH_T.y+')"><g id="'+id+'-u">'+upper+'<g transform="translate(0 '+L1+')"><g id="'+id+'-f">'+fore+'</g></g></g></g>';}
function build(id){const p=P;seed=p.seed;let s='';const sk=p.skin;
 s+='<g id="'+id+'-ab" style="display:none">'+bentArm(id+'-ab',p.shirt,sk,42.5,52)+'</g>';
 s+=piece(rr(-7,-72,6,66,2.5),p.pants,1.2)+piece(rr(1,-72,6,66,2.5),p.pants,1.2);
 s+=piece(shoe(-27,-10,25,11),'#2A2624')+piece(shoe(2,-10,25,11),'#2A2624');
 s+=armT(id+'-al',-1,p.shirt,sk);
 s+=piece(roundPoly([[-8,-157],[8,-157],[7,-66],[-7,-66]],[5,5,2,2]),p.shirt,1.4);
 s+='<g data-logo="1" data-t="translate(3.6 -111) rotate(-90)" data-size="11" data-max="84"></g>';
 s+=armT(id+'-ar',1,p.shirt,sk);
 s+=piece(rr(-5,-169,10,15,3),sk,1);
 s+='<g id="'+id+'-h">'+piece(HEAD_V2,sk,2.6);
 s+=augen(id);
 s+='<g id="'+id+'-bl">'+flat(rect(-8.5,-2.3,17,4.6),p.browC,1)+'</g><g id="'+id+'-br">'+flat(rect(-8.5,-2.3,17,4.6),p.browC,1)+'</g>';
 s+=NOSE_V2();
 s+=piece(roundPoly([[-35,-185],[-29,-182],[-19,-179],[19,-179],[29,-182],[35,-185],[30,-167],[14,-154],[0,-150],[-14,-154],[-30,-167]],[2,3,3,3,3,2,9,8,7,8,9]),p.beardC,1.6);
 s+=flat(circ(-21,-167,2.2),'#A6805A')+flat(circ(13,-158,2),'#A6805A')+flat(circ(24,-174,2),'#6E4E30')+flat(circ(-7,-155,2),'#6E4E30')+flat(circ(4,-163,1.6),'#A6805A')+flat(circ(-26,-175,1.6),'#A6805A');
 s+='<ellipse id="'+id+'-m" cx="0" cy="-172" rx="8" ry="1.6" fill="#2A0E0B" stroke="#E9C7A8" stroke-width="1.2"/>';
 s+=mundformen(id);
 s+=piece([[-36,-224],[-35,-240],[-22,-249],[0,-252],[22,-250],[35,-241],[37,-224],[30,-229],[20,-226],[10,-230],[0,-227],[-10,-230],[-20,-226],[-29,-229]],p.hairC,1.2);
 s+='<path d="M-24 -242 l3 -4 M-10 -246 l2 -4 M6 -247 l2 -4 M20 -244 l3 -4" stroke="#8E6C46" stroke-width="1.4" fill="none"/>';
 s+=brille('duenn',{farbe:'#3A3530',rahmen:1.8,glas:null});
 s+='</g>';
 s+='<g id="'+id+'-as" style="display:none">'+bentArm(id+'-as',p.shirt,sk,30.5,53.7,flat(rr(-1.7,57,3.4,9,1.7),sk,0.3))+'</g>';
 return s;}
const POSE={kratzen:[-26.6,54],riechen:[-41,-163]};
FIGUREN['Spallter']={build:a=>build(a.id),spricht:true,lippen:LIPPEN_V2,
 rig:id=>{const g=k=>$(id+'-'+k);return Object.assign(rigV2(id),{ab:g('ab'),abU:g('ab-u'),abF:g('ab-f'),as:g('as'),asU:g('as-u'),asF:g('as-f')});},
 apply:(c,o,a)=>{poseV2(c,o,a.boden);
  c.g.setAttribute('transform','translate('+o.x.toFixed(1)+','+(a.boden+(o.y||0)).toFixed(1)+') scale(0.92) rotate('+(o.rot||0).toFixed(1)+')');
  const sp=o.spezial;show(c.ar,!sp&&!o.shrug);show(c.ab,sp==='kratzen');show(c.as,sp==='riechen');
  if(sp==='kratzen'){const alt=Math.floor((o._f||0)*8/12)%2;c.abU.setAttribute('transform','rotate('+(POSE.kratzen[0]+(alt?-2:2))+')');c.abF.setAttribute('transform','rotate('+(POSE.kratzen[1]+(alt?-6:5))+')');}
  if(sp==='riechen'){c.asU.setAttribute('transform','rotate('+POSE.riechen[0]+')');c.asF.setAttribute('transform','rotate('+POSE.riechen[1]+')');}}};
})();

/* ==== DrBier (V2, einen Kopf größer als die anderen): Cap „MAKE HAGNE GREAT AGAIN“, Bierflasche links ==== */
(()=>{
const P={seed:61,skin:'#F4CFAE',shirt:'#2F7A3E',pants:'#3A4A62',hairC:'#6A4426',browC:'#55361C',beardC:'#55361C',capC:'#C8302A',capL:'#D6433A',capD:'#9A231E'};
const LEG=40,UP=75,SH=-155-UP,HIPY=-66-LEG;
function build(id,handR){const p=P;seed=p.seed;let s='';const sk=p.skin;
 /* Beine in eigenen Gruppen, damit Lauf- und Fallgesten gehen; Drehpunkt an der Hüfte */
 s+='<g id="'+id+'-ll">'+piece(box(-17,-72-LEG,13,66+LEG),p.pants)+piece(shoe(-27,-10,25,11),'#2A2624')+'</g>';
 s+='<g id="'+id+'-lr">'+piece(box(4,-72-LEG,13,66+LEG),p.pants)+piece(shoe(2,-10,25,11),'#2A2624')+'</g>';
 s+=armLang(id+'-al',-1,p.shirt,sk,SH,0,'<g transform="translate(0 108.5)">'+rBottle()+'</g>');
 s+=piece(roundPoly([[-27,SH],[27,SH],[33,HIPY],[-33,HIPY]],[11,11,4,4]),p.shirt);
 s+='<g data-logo="1" data-t="translate(0 '+(SH+38)+')" data-size="14" data-max="50"></g>';
 s+=armLang(id+'-ar',1,p.shirt,sk,SH,0,handItem(id,handR,94.5),'<g id="'+id+'-fi" style="display:none">'+piece(seg(0,98.5,0,111.5,4.4),sk,0.4)+'</g>');
 s+='<g transform="translate(0 '+(-UP)+')">';
 s+=piece(box(-7,-168,14,16),sk);
 s+='<g id="'+id+'-h">';
 s+=piece(HEAD_V2,sk,2.6);
 s+=piece(rect(-36,-232,6,16),p.hairC,1)+piece(rect(30,-232,6,16),p.hairC,1);
 s+=augen(id);
 s+='<g id="'+id+'-bl">'+flat(rect(-8.5,-2.3,17,4.6),p.browC,1)+'</g><g id="'+id+'-br">'+flat(rect(-8.5,-2.3,17,4.6),p.browC,1)+'</g>';
 s+=NOSE_V2();
 s+='<ellipse cx="-22" cy="-186" rx="6" ry="3.5" fill="#E24B4A" opacity="0.28"/><ellipse cx="22" cy="-186" rx="6" ry="3.5" fill="#E24B4A" opacity="0.28"/>';
 /* Bart passt sich den Mundbildern an: Seiten und Kinnbart liegen hinter dem Mund und lassen ihm Platz (bis x ±13, y −159),
    der Schnurrbart sitzt schmal zwischen Nase (−184) und Oberlippe (−178) */
 s+=flat(seg(-17.5,-181,-14.5,-160,4.6),p.beardC,0.5)+flat(seg(17.5,-181,14.5,-160,4.6),p.beardC,0.5);
 s+=piece(roundPoly([[-14,-162],[14,-162],[10,-150],[0,-145],[-10,-150]],[3,3,3,4,3]),p.beardC,0.9);
 s+='<path d="M-6 -155 l1.5 4 M2 -153 l1 4 M7 -156 l-1 4" stroke="#3E2814" stroke-width="1.1" fill="none"/>';
 s+='<ellipse id="'+id+'-m" cx="0" cy="-172" rx="8.5" ry="1.6" fill="#2A0E0B" stroke="#E9C7A8" stroke-width="1.2"/>';
 s+=mundformen(id);
 s+=piece([[-16,-184.5],[16,-184.5],[18,-180],[6,-181.2],[-6,-181.2],[-18,-180]],p.beardC,0.6);
 s+=piece([[-38,-231],[-37,-248],[-25,-261],[0,-266],[25,-261],[37,-248],[38,-231]],p.capC,1.4);
 s+=flat([[-23,-232],[-21,-254],[0,-259],[21,-254],[23,-232]],p.capL,0.8);
 s+='<path d="M-30 -236 Q-34 -250 -22 -258 M30 -236 Q34 -250 22 -258" stroke="'+p.capD+'" stroke-width="1" fill="none"/>';
 s+=piece(circ(0,-266,3),p.capD,0.4);
 s+='<text x="0" y="-247" text-anchor="middle" font-size="7" font-weight="800" fill="#FBFAF5" textLength="35" lengthAdjust="spacingAndGlyphs" '+F+'>MAKE HAGNE</text>';
 s+='<text x="0" y="-238.5" text-anchor="middle" font-size="7" font-weight="800" fill="#FBFAF5" textLength="38" lengthAdjust="spacingAndGlyphs" '+F+'>GREAT AGAIN</text>';
 s+=piece([[-42,-233],[42,-233],[46,-227],[22,-222],[-22,-222],[-46,-227]],p.capD,1.2);
 s+='</g>';
 /* Trinkarm (geste trinken): Flasche am Mund */
 s+='<g id="'+id+'-ad" style="display:none">'+piece(seg(-34,-150,-53,-128,13),p.shirt,1)+piece(circ(-53,-129,6.5),p.shirt,0.6)+piece(seg(-53,-130,-27,-185,10),sk,1)+'<g transform="translate(-38 -193) rotate(117)">'+rBottle()+'</g>'+piece(circ(-27,-187,8.5),sk,0.8)+'</g>';
 s+='</g>';
 return s;}
FIGUREN['DrBier']={build:a=>build(a.id,a.hand_rechts),spricht:true,lippen:LIPPEN_V2,kopfhoehe:252+UP+8,
 rig:id=>Object.assign(rigV2(id),{ad:$(id+'-ad'),fi:$(id+'-fi')}),
 apply:(c,o,a)=>{poseV2(c,o,a.boden);
  /* Beine drehen an DrBiers Hüfte, nicht an der normalen */
  c.ll.setAttribute('transform','rotate('+(o.lL||0).toFixed(1)+' -10.5 '+(-72-LEG)+')');c.lr.setAttribute('transform','rotate('+(o.lR||0).toFixed(1)+' 10.5 '+(-72-LEG)+')');
  const dr=!!o.trinkt;show(c.al,!dr);show(c.ad,dr);
  c.ad.setAttribute('transform',dr&&o.schuetteln?'translate('+((o._f||0)%2?2:-2)+' '+((o._f||0)%2?-2:1)+')':(dr?'translate(0 '+(Math.floor((o._f||0)/2)%2?-1:0)+')':''));
  show(c.fi,!!o.zeigefinger);}};
})();

/* ==== DocEvel (Version 2): sehr kurze Haare hell silberblond, oben leicht aufgestellt, glatt rasiert, heller Hautton,
   schmale rechteckige Metallbrille (silber), schwarzes Shirt, Ellbogengelenk, Geldscheine in der Hand.
   Wirkt gelassen (Grundmund 'n' = leichtes, verschmitztes Lächeln), regt er sich auf: Mund zusammenziehen ('p') und Augen rollen (py −4.5, lid).
   Pose-Felder: geld (Fächer Scheine in der linken Hand), geldR (ein Schein rechts), fallen 0–1 (drei Scheine fallen aus der linken Hand zu Boden),
   lid 0–1 (Oberlid senkt sich, genervt), aLf/aRf (Unterarme). Münder: 'n' leichtes Lächeln, 'p' zusammengezogen, 's' schief, 'g' Grinsen, Zahl ab 2 = Sprechmund.
   Bewährte Armwinkel [Schulter, Ellbogen]: Scheine vor dem Bauch links [−8, −50], zählen rechts [8, 50] (Ellbogen schwingt 38–58); der Aufdruck sitzt auf Brusthöhe (y −127) und bleibt frei. */
(()=>{
const SKIN='#F2C9A0',SH='#1E1E1C',EDGE='#45453F',PANTS='#3A4A62',BROW='#A8987A';
const HAIR_S='#DDD3B8',HAIR_L='#F0EAD8',HAIR_D='#BDB196',HAIR_T='#C8BDA2';
const NOTES=['#D98E4A','#6F9CC4','#7FA86E','#C9726A'];
function note(col){return piece(rr(-12,-6,24,12,1.5),col,0.4)+'<rect x="-10" y="-4" width="20" height="8" rx="1" fill="none" stroke="rgba(255,255,255,0.45)" stroke-width="0.9"/>'+
 '<circle cx="5" cy="0" r="2.6" fill="rgba(255,255,255,0.4)"/><path d="M-8 -1.5 h7 M-8 1.5 h5" stroke="rgba(40,30,20,0.4)" stroke-width="0.8"/>';}
/* Fächer aus Scheinen über der Faust; Ursprung = Faust */
function fan(){let s='';[-24,-9,6,20].forEach((w,i)=>{s+='<g transform="rotate('+w+' 0 4) translate(0 -9)">'+note(NOTES[i])+'</g>';});
 return s+piece(rr(-7,-4,14,10,4),SKIN,0.5)+'<path d="M-6 0 h12 M-6 3 h12" stroke="rgba(90,45,20,0.45)" stroke-width="0.8"/>';}
function single(){return '<g transform="rotate(-12) translate(4 -9)">'+note(NOTES[0])+'</g>'+piece(rr(-5,-4,9,8,3.5),SKIN,0.4);}
function armExtra(id,sx){return '<g transform="translate(0 '+FORE+')">'+(sx<0?'<g id="'+id+'-cL"><g id="'+id+'-fan" style="display:none">'+fan()+'</g></g>'
 :'<g id="'+id+'-cR"><g id="'+id+'-one" style="display:none">'+single()+'</g></g>')+'</g>';}
function handPos(sx,th,e){const a=th*Math.PI/180,b=(th+e)*Math.PI/180;return [sx*SHOULDER.x-ELBOW*Math.sin(a)-FORE*Math.sin(b),SHOULDER.y+ELBOW*Math.cos(a)+FORE*Math.cos(b)];}
/* sehr kurz, oben nur leicht aufgestellt: flache, weiche Wellen, Ansatz flach */
function hair(){const top=[];for(let i=0;i<=10;i++){const x=-32+i*6.4;top.push([x,(i%2?-247:-250)-Math.round(2*Math.cos(x/40*Math.PI/2))]);}
 let s=piece(roundPoly([[-39,-214],[-39.5,-231],[-36,-241],...top,[36,-241],[39.5,-231],[39,-214],[35,-221],[28,-226],[16,-228],[4,-226.5],[-8,-228],[-20,-227],[-30,-225],[-35,-220]],2.4),HAIR_S,1);
 s+='<path d="M-24 -238 l-1 -6 M-12 -240 l0 -7 M0 -241 l0.5 -7 M12 -240 l1 -7 M24 -238 l1.5 -6" stroke="'+HAIR_L+'" stroke-width="1.4" stroke-linecap="round"/>';
 s+='<path d="M-18 -236 l-0.5 -5 M6 -238 l0.5 -6 M30 -233 l1.5 -5 M-30 -232 l-1 -5" stroke="'+HAIR_D+'" stroke-width="1.3" stroke-linecap="round" opacity="0.8"/>';return s;}
/* schmale, rechteckige Metallbrille in Silber */
function glasses(){return brille('duenn',{farbe:'#8E959C',rahmen:1.4,steg:1.3,buegel:1.4,ecke:2});}
function mouth(id){return '<g id="'+id+'-mn"><path d="M-9 -173 Q0 -168.6 9.5 -174.4" stroke="#2A0E0B" stroke-width="2.2" fill="none" stroke-linecap="round"/><path d="M10.5 -175.6 l1.2 -1.4" stroke="#B57A5A" stroke-width="1.1" stroke-linecap="round"/></g>'+
 '<g id="'+id+'-mp" style="display:none"><path d="M-6 -172 Q0 -171 6 -172" stroke="#2A0E0B" stroke-width="2.4" fill="none" stroke-linecap="round"/>'+
  '<path d="M-8.5 -174.5 l-0.8 4.5 M8.5 -174.5 l0.8 4.5 M-3.5 -166.8 q3.5 1.4 7 0" stroke="#8A4A30" stroke-width="1.1" fill="none" stroke-linecap="round"/></g>'+
 '<g id="'+id+'-msc" style="display:none"><path d="M-9 -172 Q2 -170 9 -175" stroke="#2A0E0B" stroke-width="2.3" fill="none" stroke-linecap="round"/></g>'+
 '<g id="'+id+'-mg" style="display:none"><path d="M-13 -176 Q0 -172 13 -176 Q10 -162 0 -162 Q-10 -162 -13 -176Z" fill="#2A0E0B"/><path d="M-11.5 -175.3 Q0 -171.8 11.5 -175.3 L10.7 -172.2 Q0 -169.4 -10.7 -172.2Z" fill="#FFFDF6"/></g>'+
 '<ellipse id="'+id+'-mt" style="display:none" cx="0" cy="-171.5" rx="7.5" ry="3" fill="#2A0E0B" stroke="#9C6444" stroke-width="1"/>';}
function build(a){const id=a.id,sk=SKIN;seed=131;let s='';
 if(a.haltung!=='sitzt'){s+=piece(box(-22,-72,17,66),PANTS)+piece(box(5,-72,17,66),PANTS);
  s+=piece(shoe(-30,-10,28,11),'#2A2624')+piece(shoe(2,-10,28,11),'#2A2624');}
 s+=piece(TORSO_V2,SH);
 s+='<g data-logo="1" data-t="translate(0 -127)" data-size="15" data-max="64"></g>';
 /* beide Arme vor dem Rumpf, damit die Scheine vor dem Shirt lesbar bleiben */
 s+=armJ(id+'-al',-1,SH,sk,armExtra(id,-1),EDGE);
 s+=armJ(id+'-ar',1,SH,sk,armExtra(id,1),EDGE);
 s+=piece(box(-8,-168,16,16),sk);
 s+='<g id="'+id+'-h">'+piece(HEAD_V2,sk,2.6);
 s+=piece(rect(-39,-226,5,15),HAIR_T,0.8)+piece(rect(34,-226,5,15),HAIR_T,0.8);
 s+='<clipPath id="'+id+'-ec">'+augeForm(-1)+augeForm(1)+'</clipPath>';
 s+=augen(id,'<g clip-path="url(#'+id+'-ec)"><rect id="'+id+'-lid" x="-24" y="'+(AUGE.y-AUGE.ry-0.4)+'" width="48" height="0" fill="'+sk+'"/></g>');
 s+='<g id="'+id+'-bl">'+flat(rect(-8.5,-2.3,17,4.6),BROW,1)+'</g><g id="'+id+'-br">'+flat(rect(-8.5,-2.3,17,4.6),BROW,1)+'</g>';
 s+=NOSE_V2()+mouth(id)+hair()+glasses();
 s+='</g>';
 /* lose Scheine, die aus der linken Hand fallen: eigene Lage vor allem */
 s+='<g id="'+id+'-fall" style="display:none">'+[0,1,2].map(i=>'<g id="'+id+'-fall'+i+'">'+note(NOTES[(i+1)%4])+'</g>').join('')+'</g>';
 return s;}
function rig(id){const g=k=>$(id+'-'+k);
 return {g:$(id),h:g('h'),e:g('e'),p:g('p'),lid:g('lid'),bl:g('bl'),br:g('br'),al:g('al'),ar:g('ar'),alf:g('al-f'),arf:g('ar-f'),cL:g('cL'),cR:g('cR'),fan:g('fan'),one:g('one'),
  mn:g('mn'),mp:g('mp'),msc:g('msc'),mg:g('mg'),mt:g('mt'),fall:g('fall'),fi:[0,1,2].map(i=>g('fall'+i))};}
function apply(r,o,a){const aL=o.aL||0,aLf=o.aLf||0,aR=o.aR||0,aRf=o.aRf||0,f=o._f||0;
 r.g.setAttribute('transform','translate('+o.x.toFixed(1)+','+(a.boden+(o.y||0)).toFixed(1)+') scale(0.92)'+(o.rot?' rotate('+o.rot.toFixed(1)+')':''));
 r.h.setAttribute('transform','translate(0 '+(o.hy||0)+') rotate('+(o.head||0).toFixed(1)+' 0 -195)');
 r.al.setAttribute('transform','rotate('+aL.toFixed(1)+')');r.alf.setAttribute('transform','rotate('+aLf.toFixed(1)+')');
 r.ar.setAttribute('transform','rotate('+aR.toFixed(1)+')');r.arf.setAttribute('transform','rotate('+aRf.toFixed(1)+')');
 r.cL.setAttribute('transform','rotate('+(-(aL+aLf)).toFixed(1)+')');r.cR.setAttribute('transform','rotate('+(-(aR+aRf)).toFixed(1)+')');
 show(r.fan,!!o.geld);show(r.one,!!o.geldR);
 let m=o.m===undefined?'n':o.m;if(typeof m==='number')m=m>=2?'t':'n';else if(m==='y')m='g';
 show(r.mn,m==='n');show(r.mp,m==='p');show(r.msc,m==='s');show(r.mg,m==='g');show(r.mt,m==='t');if(m==='t')r.mt.setAttribute('ry',o.m.toFixed(1));
 const b=o.br||[0,0,0,0];r.bl.setAttribute('transform','translate('+(-AUGE.braue)+' '+(AUGE.braueY+b[0])+') rotate('+b[1]+')');r.br.setAttribute('transform','translate('+AUGE.braue+' '+(AUGE.braueY+b[2])+') rotate('+(-b[3])+')');
 r.p.setAttribute('transform','translate('+(o.px||0)+' '+(o.py||0)+')');
 r.lid.setAttribute('height',((2*AUGE.ry+0.8)*clamp(o.lid||0)).toFixed(1));
 let es=o.es===undefined?1:o.es;const ew=o.ew||1;if(es===1&&ew===1&&!o.lid&&((f*7919)%67)<2)es=0.12;
 r.e.setAttribute('transform',(es!==1||ew!==1)?'translate(0 -204) scale('+ew+' '+(es*ew).toFixed(2)+') translate(0 204)':'');
 const k0=o.fallen||0;show(r.fall,k0>0);
 if(k0>0){const hp=handPos(-1,aL,aLf);r.fi.forEach((el,i)=>{const k=clamp((k0-i*0.12)/0.76),kk=k*k;
   const x=hp[0]+[-14,10,26][i]*k+Math.sin(k*Math.PI*3+i*2)*7*(1-k),y=lerp(hp[1]-6,-4-i*1.5,kk);
   const w=lerp(Math.sin(k*11+i)*40,[8,-6,14][i],k),sy=lerp(1,0.4,clamp((k-0.85)/0.15));
   el.setAttribute('transform','translate('+x.toFixed(1)+' '+y.toFixed(1)+') rotate('+w.toFixed(1)+') scale(1 '+sy.toFixed(2)+')');});}}
FIGUREN['DocEvel']={build,rig,apply,spricht:true,lippen:(o,k)=>{if(k>0.12)o.m=2+5*k;},kopfhoehe:262};
})();
