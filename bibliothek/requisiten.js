/* HAGNE-Studio · Bibliothek · Requisiten
   REQUISITEN: Name -> {x0 (Bezugspunkt) oder absolut:true, build(r)}. Teile mit data-bebt hüpfen beim Stampfen. */

/* ==== 3) REQUISITEN   (x0 = Bezugspunkt, data-bebt = Teile, die beim Stampfen hüpfen) ==== */
function chair(){seed=33;return piece(rr(142,250,116,96,18),'#1F2126',1.2)+flat(rect(162,256,10,84),'#C8382B',0.8)+flat(rect(228,256,10,84),'#C8382B',0.8);}
function deskFront(){seed=41;let s='';
s+=piece(rect(56,326,400,9),'#BFA888',1.2);
s+=piece(rect(62,333,388,64),'#22304A',1.4);
s+='<path d="M112 336 L110 396 M212 336 L214 396 M312 336 L310 396 M412 336 L415 396" stroke="#1B2740" stroke-width="2" fill="none"/>';
s+=piece(rect(130,342,204,38),'#FBFAF5',1.2)+'<text x="232" y="368" text-anchor="middle" font-size="22" font-weight="800" fill="#2C2C2A" '+F+'>TURNIERBÜRO</text>';
s+=tape(122,338,22,8,-30)+tape(320,338,22,8,30);
s+=piece(rect(360,340,70,46),'#FBFAF5',1)+'<text x="395" y="350" text-anchor="middle" font-size="6.5" font-weight="800" fill="#2C2C2A" '+F+'>TURNIERBAUM</text>';
[356,364,372,380].forEach(y=>{s+=ln(366,y,380,y,'#2C2C2A',1);});
s+=ln(380,356,380,364,'#2C2C2A',1)+ln(380,372,380,380,'#2C2C2A',1)+ln(380,360,394,360,'#2C2C2A',1)+ln(380,376,394,376,'#2C2C2A',1)+ln(394,360,394,376,'#2C2C2A',1)+ln(394,368,408,368,'#2C2C2A',1);
s+='<text x="416" y="372" text-anchor="middle" font-size="10" font-weight="800" fill="#C8382B" '+F+'>?</text>'+tape(354,336,14,6,-30);
return s;}
function deskProps(){seed=45;let s='';
s+=piece(rr(258,280,88,48,3),'#3A3D44',1)+'<g data-logo="1" data-t="translate(302 309)" data-size="12" data-max="58"></g>';
s+=piece(rr(84,306,18,21,3),'#FBFAF5',0.8)+'<path d="M102 311 q7 0 7 6 q0 6 -7 6" stroke="#FBFAF5" stroke-width="2.6" fill="none"/>';
s+=piece(rect(112,320,42,7),'#EDE8DC',0.6)+piece(rect(115,316,40,5),'#F7F3EA',0.5);
s+=piece(rr(396,300,12,27,2),'#2B6CB0',0.6)+flat(rect(396,307,12,4),'#E8B10A',0.3);
return s;}
const REQUISITEN={
 'gaming-stuhl':{x0:200,build:chair},
 'tisch-turnierbuero':{x0:256,build:()=>deskFront()+'<g data-bebt="1">'+deskProps()+'</g>'}
};


function bush(cx,by,w,sd){seed=sd;const G=['#3F7A30','#4C8538','#5E9A44','#6BA64C'];let s=piece(ell(cx,by-14,w/2+12,40),'#3F7A30',2);
 for(let i=0;i<16;i++){const x=cx-w/2+R()*w;const dx=Math.abs(x-cx)/(w/2);const y=by-24-R()*56*(1-dx*0.55);s+=piece(circ(x,y,18+R()*14),G[Math.floor(R()*4)],2.4);}
 for(let i=0;i<10;i++){const x=cx-w/2+R()*w,y=by-30-R()*60;s+=flat(ell(x,y,3,1.6),'#86BE5E',0.4);}return s;}
REQUISITEN['busch']={absolut:true,build:r=>bush(r.x,r.boden||402,r.breite||150,r.seed||410)};
