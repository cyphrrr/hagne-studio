/* HAGNE-Studio · Bibliothek · Kulissen
   Jede Kulisse trägt sich in KULISSEN ein: Name -> Funktion, die das SVG liefert. */

/* ==== 2) KULISSEN ==== */
function bgHalleVoll01(){seed=9;let bg='';
bg+='<rect x="0" y="0" width="680" height="420" fill="#121016"/>';
for(let x=-60;x<740;x+=56){bg+=ln(x,0,x+56,170,'#26232C',1.2)+ln(x+56,0,x,170,'#26232C',1.2);}
[34,78,122,160].forEach(y=>{bg+=ln(0,y,680,y,'#26232C',1.2);});
seed=12;for(let i=0;i<22;i++){const x=R()*680,y=8+R()*150;bg+='<circle cx="'+x.toFixed(0)+'" cy="'+y.toFixed(0)+'" r="'+(1.4+R()*1.2).toFixed(1)+'" fill="#E8E2FF"/>';}
bg+=truss(-20,70,700,24,14,'#8E94AE')+truss(-20,22,520,118,12,'#7F859E')+truss(180,140,700,82,12,'#8E94AE');
[[60,62,'#E24B4A'],[180,55,'#4F7CFF'],[300,48,'#E24B4A'],[430,40,'#4F7CFF'],[560,32,'#E24B4A'],[260,116,'#4F7CFF'],[520,98,'#E24B4A']].forEach(p=>{bg+='<circle cx="'+p[0]+'" cy="'+p[1]+'" r="4.5" fill="'+p[2]+'"/><circle cx="'+p[0]+'" cy="'+p[1]+'" r="2" fill="#FFFFFF"/>';});
bg+=piece(rect(0,150,680,112),'#3E2B1A',1.5);
for(let x=3;x<680;x+=6)bg+=ln(x,152,x,260,'#2F2012',1.4);
for(let k=0;k<9;k++){const x=22+k*80;bg+=flat(rect(x,152,16,110),'#D63E2C',1)+flat(rect(x+5,152,6,110),'#FF8A66',0.8);}
bg+=piece(rect(0,236,680,28),'#1C231C',1.5);
bg+=piece(rect(8,146,176,62),'#5A4228',1.5);for(let x=14;x<184;x+=7)bg+=ln(x,150,x,206,'#46321C',1.6);bg+=piece(rect(8,206,176,10),'#1C231C',1);
bg+=piece(rect(200,160,74,46),'#C9D6EA',1)+flat(rect(204,164,66,38),'#1F3A2E',0.8)+flat([[204,202],[226,184],[240,192],[258,178],[270,190],[270,202]],'#3F6B4C',0.8)+flat(circ(244,176,5),'#E8D27A',0.6);
bg+=piece(rect(470,166,212,24),'#5E5A54',1.2);for(let x=480;x<680;x+=18)bg+='<circle cx="'+x+'" cy="196" r="2" fill="#FFF1C8"/>';
bg+=piece(rect(330,214,16,9),'#2E9E4F',0.8)+piece(rect(560,214,16,9),'#2E9E4F',0.8);
bg+=piece([[-10,258],[690,258],[690,430],[-10,430]],'#3A2213',2);
const PC=['#43271A','#3A2214','#4C2D1C','#40251A','#52321E'];
let y=259,row=0;seed=21;while(y<422){const hh=3+(y-258)*0.07,ww=hh*2.6,gap=0.8+hh*0.08;let x=-(row%2)*(ww/2);while(x<690){bg+='<rect x="'+x.toFixed(1)+'" y="'+y.toFixed(1)+'" width="'+(ww-gap).toFixed(1)+'" height="'+hh.toFixed(1)+'" fill="'+PC[Math.floor(R()*PC.length)]+'"/>';x+=ww;}y+=hh+gap;row++;}
bg+='<path d="M120 330 Q340 312 560 334 L580 360 Q340 340 100 356 Z" fill="rgba(90,130,255,0.12)"/>';
const SCR=['#E8F0FF','#7FB2FF','#9BE3B0','#FFB26B','#C9A2FF','#F4F4F4','#6FD3E0','#FFE08A'];
const SHIRTS=['#2A2630','#1E2A3A','#3A1E22','#22302A','#2E2A22','#3A3A44'];
const VP=[340,244];const rows=[{y:262,s:0.28},{y:270,s:0.4},{y:282,s:0.56},{y:298,s:0.78},{y:320,s:1.05}];
const aisles=[-250,0,250];seed=33;
rows.forEach((r,ri)=>{const s=r.s,th=7*s+1.5,cw=24*s+7,aw=34*s+6,mw=15*s+3,mh=10*s+3;
 const gaps=aisles.map(a=>VP[0]+a*s*1.25);let segs=[];let start=-20;gaps.forEach(g=>{segs.push([start,g-aw/2]);start=g+aw/2;});segs.push([start,700]);
 segs.forEach(sg=>{for(let x=sg[0]+cw*0.5;x<sg[1]-cw*0.4;x+=cw){if(R()<0.85){const hx=x+cw*0.25;bg+=flat(rect(hx-6*s-2,r.y-mh-5*s,12*s+4,8*s+3),SHIRTS[Math.floor(R()*SHIRTS.length)],0.5)+flat(circ(hx,r.y-mh-8*s-1,4.5*s+1.6),'#9C8478',0.4);}
  bg+=flat(rect(x+cw*0.25-mw/2,r.y-mh,mw,mh),'#1A181E',0.4);}});
 segs.forEach(sg=>{bg+=piece(rect(sg[0],r.y,sg[1]-sg[0],th),'#6E4A28',1)+flat(rect(sg[0],r.y+th,sg[1]-sg[0],2+s*1.5),'#4A3018',0.6);});
 segs.forEach(sg=>{for(let x=sg[0]+cw*0.5;x<sg[1]-cw*0.4;x+=cw){const mx=x-cw*0.2;bg+=flat(rect(mx-mw/2-1,r.y-mh*0.55-1,mw+2,mh+2),'#0E0C10',0.4)+flat(rect(mx-mw/2,r.y-mh*0.55,mw,mh),SCR[Math.floor(R()*SCR.length)],0.4);
  if(R()<0.85){const hr=5.5*s+2;bg+=flat(rect(mx-hr*1.6,r.y+th*0.3,hr*3.2,hr*1.8),SHIRTS[Math.floor(R()*SHIRTS.length)],0.6)+flat(circ(mx,r.y+th*0.3-hr*0.4,hr),'#1C1820',0.5);if(R()<0.45)bg+='<path d="M'+(mx-hr).toFixed(1)+' '+(r.y+th*0.3-hr*0.3).toFixed(1)+' A'+hr.toFixed(1)+' '+hr.toFixed(1)+' 0 0 1 '+(mx+hr).toFixed(1)+' '+(r.y+th*0.3-hr*0.3).toFixed(1)+'" fill="none" stroke="#5A5866" stroke-width="'+(1+s).toFixed(1)+'"/>';}}});
});
function tower(x,base,h,s){let o='';const w=12*s+3;o+=flat(rect(x-w/2-4,base-h-4,w+8,h+4),'rgba(80,120,255,0.28)',0.5);o+=ln(x-w/2,base,x-w/2,base-h,'#CFE0FF',2.6)+ln(x+w/2,base,x+w/2,base-h,'#CFE0FF',2.6);let d='M'+(x-w/2)+' '+base;const n=Math.round(h/w);for(let i=1;i<=n;i++){d+=' L'+(i%2?x+w/2:x-w/2)+' '+(base-h*i/n).toFixed(1);}o+='<path d="'+d+'" stroke="#FFFFFF" stroke-width="1.3" fill="none"/>';
 o+=flat(rect(x-w/2-2,base-h-3,w+4,4),'#CFE0FF',0.5);
 for(let k=0;k<4;k++){const tx=x+(k-1.5)*w*1.4;o+='<path d="M'+x+' '+(base-h+4)+' Q'+((x+tx)/2).toFixed(1)+' '+(base-h*0.3).toFixed(1)+' '+(tx+(k-1.5)*14).toFixed(1)+' '+(base-2)+'" fill="none" stroke="#4F7CFF" stroke-width="1.2"/>';}
 return o;}
bg+=tower(142,302,64,0.62)+tower(268,288,48,0.5)+tower(420,288,48,0.5)+tower(548,302,64,0.62);
return bg;}
const KULISSEN={
 'HALLE-VOLL-01':()=>'<rect x="-400" y="-300" width="1500" height="460" fill="#121016"/><rect x="-400" y="258" width="1500" height="400" fill="#3A2213"/>'+bgHalleVoll01()
};


/* ==== 4b) KULISSE HALLE-AUSSEN-01 (aus EPISODE-GUERTEL) ==== */
function stone(x,y,w,h,fill){const c=Math.min(w,h)*0.32;const p=[[x+c,y],[x+w-c,y],[x+w,y+c],[x+w,y+h-c],[x+w-c,y+h],[x+c,y+h],[x,y+h-c],[x,y+c]];return '<path d="M'+p.map(q=>(q[0]+(R()-.5)*1.2).toFixed(1)+' '+(q[1]+(R()-.5)*0.8).toFixed(1)).join('L')+'Z" fill="'+fill+'"/>';}
function bgHalleAussen01(){seed=3;let bg='';
bg+='<rect x="0" y="0" width="680" height="420" fill="#5F95DA"/>';
bg+=piece(ell(120,60,85,16),'#FBFAF5')+piece(ell(200,48,60,13),'#FBFAF5')+piece(ell(250,82,95,15),'#F2F4F7')+piece(ell(520,120,60,8),'#E8EEF6')+piece(ell(620,150,45,7),'#E8EEF6');
bg+=piece(circ(30,210,48),'#4C8538')+piece(circ(80,185,42),'#5E9A44')+piece(circ(15,160,36),'#6BA64C')+piece(circ(120,205,34),'#4C8538');
bg+=piece(circ(600,215,40),'#5E9A44')+piece(circ(650,190,46),'#4C8538')+piece(circ(560,240,30),'#6BA64C')+piece(circ(675,250,38),'#5E9A44');
bg+=piece(rect(440,270,172,32),'#5A5650');
[462,505,548,592].forEach(x=>{bg+=piece(rect(x,266,8,36),'#C2C0B8',1);});
bg+=piece(rect(440,216,172,54),'#6F9792');
for(let x=452;x<612;x+=14)bg+=ln(x,218,x,268,'#D3D6D8',1.4);
bg+=ln(440,240,612,240,'#D3D6D8',1.4)+piece(rect(436,211,180,7),'#C8CCCF',1);
bg+=piece(rect(298,214,150,78),'#5E837E');
for(let x=308;x<448;x+=13)bg+=ln(x,216,x,290,'#D3D6D8',1.2);
bg+=ln(298,250,448,250,'#D3D6D8',1.2);
bg+=piece([[296,216],[402,216],[384,158],[318,158]],'#3F7CC6',1.6);
for(let k=1;k<5;k++){const f=k/5;bg+=ln(296+22*f,216-58*f,402-18*f,216-58*f,'#A9CBEB',1);}
bg+=ln(349,158,349,216,'#A9CBEB',1)+ln(318,158,300,216,'#A9CBEB',1)+ln(384,158,398,216,'#A9CBEB',1);
bg+=piece([[396,218],[456,218],[446,180],[406,180]],'#4E8CCE',1.4);
bg+=ln(426,180,426,218,'#A9CBEB',1)+ln(401,199,451,199,'#A9CBEB',1);
bg+=piece(rect(42,216,262,76),'#5A7F77');
for(let x=54;x<304;x+=18)bg+=ln(x,220,x,290,'#D3D6D8',1.4);
bg+=ln(42,244,304,244,'#D3D6D8',1.4);
bg+=piece([[30,220],[318,220],[284,138],[118,138]],'#3E8A4D',2);
for(let k=1;k<24;k++){const f=k/24;const xb=30+288*f,xt=118+166*f;bg+=ln(xb,219,xt,139,'#2F7040',1);}
bg+=piece(rect(26,216,296,6),'#BFC4C7',1);
bg+=piece(rect(146,160,136,24),'#FBFAF5',1.5);
bg+='<text x="214" y="177" text-anchor="middle" font-size="14" font-weight="500" fill="#3A3530" '+F+'>Stadthalle Hagen</text>';
bg+=tape(138,156,22,8,-22)+tape(270,156,22,8,22);
bg+=piece(rect(452,224,148,34),'#141210',1.5);
bg+='<g data-logo="1" data-t="translate(526 248)" data-size="22" data-max="132"></g>';
bg+=tape(446,220,18,8,-30)+tape(588,220,18,8,30);
bg+=piece([[-10,292],[690,288],[690,430],[-10,430]],'#8A705E',2);
const SC=['#B39885','#A88C79','#BEA592','#9F8370','#B8A08C'];
let y=293,row=0;while(y<422){const hh=4.5+(y-292)*0.085,ww=hh*1.75,gap=1+hh*0.12;let x=-(row%2)*(ww/2)-R()*3;while(x<690){const w=ww*(0.85+R()*0.3);bg+=stone(x,y,w,hh,SC[Math.floor(R()*SC.length)]);x+=w+gap;}y+=hh+gap;row++;}
bg+=ln(-10,292,690,289,'#6F5848',2);
bg+=piece(rect(96,186,4,108),'#AEB2B5',0.6)+piece(circ(98,180,9),'#F4F6F8',1);
bg+=piece(circ(40,286,16),'#4F7F3A')+piece([[26,296],[54,296],[50,322],[30,322]],'#E0782E',1.2);
bg+=piece(circ(638,284,16),'#4F7F3A')+piece([[624,294],[652,294],[648,320],[628,320]],'#E0782E',1.2);
return bg;}
KULISSEN['HALLE-AUSSEN-01']=()=>'<rect x="-600" y="-400" width="1900" height="700" fill="#5F95DA"/><rect x="-600" y="290" width="1900" height="500" fill="#8A705E"/>'+bgHalleAussen01();


/* ==== Kulissen aus E03 „Werbunk“ (FELSHANG-01, FOYER-01, THEKE-01, HALLE-LEER-01) ====
   Unverändert übernommen. Jede Kulisse steckt in einem eigenen Block, damit Hilfsnamen (tower, truss, VP …) nicht kollidieren. */

/* ---- FELSHANG-01: Felshang unterhalb der Stadthalle, Blick hoch zur Halle ---- */
(()=>{
function boulder(cx,by,w,h,col,hi,moss){
 const p=[[cx-w*0.5,by],[cx-w*0.5,by-h*0.42],[cx-w*0.32,by-h*0.88],[cx-w*0.04,by-h],[cx+w*0.3,by-h*0.86],[cx+w*0.5,by-h*0.38],[cx+w*0.47,by]];
 let s=piece(roundPoly(p,7),col,1.8);
 s+=flat([[cx-w*0.3,by-h*0.82],[cx-w*0.04,by-h*0.94],[cx+w*0.12,by-h*0.62],[cx-w*0.22,by-h*0.46]],hi,1);
 s+=flat([[cx+w*0.14,by-h*0.6],[cx+w*0.42,by-h*0.36],[cx+w*0.4,by-h*0.06],[cx+w*0.1,by-h*0.12]],'rgba(20,20,18,0.22)',1);
 if(moss)s+=flat(ell(cx-w*0.12,by-h*0.9,w*0.2,h*0.07),moss,0.8)+flat(ell(cx-w*0.42,by-h*0.2,w*0.08,h*0.12),moss,0.6);
 return s;}
function bgFelshang01(){seed=4;let bg='';
/* bedeckter Himmel */
bg+='<rect x="0" y="0" width="680" height="420" fill="#DDE3E3"/>';
bg+=piece(ell(560,36,100,13),'#EEF1F0')+piece(ell(430,18,70,9),'#F4F6F5')+piece(ell(640,74,60,8),'#E9EDEC');
/* Felshang links bis Mitte */
bg+=piece([[-10,262],[-10,30],[70,24],[150,12],[220,34],[256,84],[292,140],[322,196],[332,262]],'#8E897C',2);
bg+=flat([[150,30],[205,48],[236,96],[214,104],[180,70]],'#76726A',1.4)+flat([[60,60],[110,52],[128,96],[80,110]],'#7A766C',1.4)+flat([[200,120],[250,124],[278,176],[236,184]],'#77736A',1.4);
seed=14;for(let i=0;i<34;i++){const x=10+R()*300,y=30+R()*200;if(x>40+y*1.2+80)continue;bg+=flat(ell(x,y,8+R()*12,4+R()*5),['#7FA055','#6E9446','#8FAE5E'][Math.floor(R()*3)],1);}
for(let k=0;k<6;k++){const y=50+k*30;bg+=ln(20+k*14,y,140+k*22,y+8,'#6E6A62',1.2);}
/* Hallenturm mit Lüftern */
seed=24;bg+=piece(rect(262,40,96,100),'#EDEDE8',1.5)+piece(rect(258,36,104,8),'#D6D6D0',1);
[[284,66],[310,66],[336,66],[284,94],[310,94],[336,94]].forEach(c=>{bg+=flat(circ(c[0],c[1],11),'#3A3A38',0.6)+'<circle cx="'+c[0]+'" cy="'+c[1]+'" r="7" fill="#55554F"/>'+ln(c[0]-7,c[1],c[0]+7,c[1],'#2A2A28',1.2)+ln(c[0],c[1]-7,c[0],c[1]+7,'#2A2A28',1.2)+'<circle cx="'+c[0]+'" cy="'+c[1]+'" r="2" fill="#2A2A28"/>';});
bg+=ln(272,118,350,118,'#C9C9C2',1.2)+ln(272,128,350,128,'#C9C9C2',1.2);
/* Gebäude mit grünem Dach */
bg+=piece([[328,124],[496,124],[478,96],[352,96]],'#8DC36A',1.6);
for(let k=1;k<9;k++){const f=k/9;bg+=ln(328+168*f,123,352+126*f,97,'#78AE56',1);}
bg+=piece(rect(334,124,154,46),'#F1F0EA',1.4)+piece(rect(342,132,138,9),'#B9D84E',1)+piece(rect(342,146,138,14),'#5E7F86',1);
for(let x=352;x<480;x+=12)bg+=ln(x,146,x,160,'#C9D2D3',1);
bg+='<path d="M374 108 l4 4 l6 -2 l-3 6 l4 5 l-6 0 l-3 6 l-2 -6 l-6 -1 l5 -4Z" fill="#2E7D45"/>';
/* Metallfassade rechts */
bg+=piece([[486,172],[540,172],[540,112],[512,94],[486,110]],'#5D6470',1.4);
for(let x=492;x<540;x+=7)bg+=ln(x,108,x,172,'#737A86',1);
/* Bäume rechts hinten + Laterne */
seed=31;[[600,60,40,'#5E9A44'],[650,40,46,'#4C8538'],[560,110,30,'#6BA64C'],[672,120,40,'#5E9A44'],[620,128,34,'#4C8538']].forEach(c=>{bg+=piece(circ(c[0],c[1],c[2]),c[3]);});
/* Hochstraße / Brücke */
bg+=piece(rect(-10,180,700,20),'#B9BDB4',1.4)+ln(-10,176,690,176,'#8E948C',2)+ln(-10,170,690,170,'#8E948C',1.2);
for(let x=0;x<690;x+=16)bg+=ln(x,170,x,176,'#8E948C',1);
[[300,'#7E8790'],[372,'#B8BCC0'],[430,'#4A4F58'],[488,'#9AA2A8']].forEach(c=>{bg+=piece(rr(c[0],164,34,12,4),c[1],0.8)+'<rect x="'+(c[0]+6)+'" y="165" width="20" height="4" fill="#2A2E34" opacity="0.6"/>';});
bg+=piece(rect(-10,200,700,92),'#3B3F3B',1.2);
[110,240,370,500,630].forEach(x=>{bg+=piece(rect(x,200,13,88),'#9EA39B',0.8);});
seed=36;for(let i=0;i<26;i++){const x=R()*680;bg+=flat(ell(x,204+R()*8,10+R()*14,5+R()*5),['#6E9446','#7FA055','#5E8A3E'][Math.floor(R()*3)],1);}
/* weißes Auto unter der Brücke */
bg+=piece(roundPoly([[520,256],[520,240],[534,232],[566,230],[584,240],[586,256]],5),'#F2F2EE',1)+flat([[536,236],[562,234],[570,242],[532,243]],'#2C3036',0.6);
bg+='<circle cx="534" cy="257" r="5" fill="#1F1F1F"/><circle cx="574" cy="257" r="5" fill="#1F1F1F"/>';
/* Laterne */
bg+=piece(rect(606,96,4,190),'#B4B8B6',0.6)+piece(rr(598,88,20,10,3),'#E4E7E8',0.8);
/* großer Baum links (Birke) */
seed=41;bg+=ln(118,90,104,262,'#E6E1D6',5)+ln(112,150,150,110,'#E6E1D6',2.5)+ln(108,190,60,150,'#E6E1D6',2.5);
for(let k=0;k<6;k++)bg+=ln(104+k*2,140+k*20,111+k*2,140+k*20,'#3A3A36',1.4);
[[30,40,44,'#5E9A44'],[90,22,40,'#6BA64C'],[150,50,42,'#4C8538'],[60,100,46,'#4C8538'],[130,110,40,'#5E9A44'],[20,150,40,'#6BA64C'],[180,90,30,'#8DBA6A'],[90,170,34,'#5E9A44'],[200,150,28,'#4C8538']].forEach(c=>{bg+=piece(circ(c[0],c[1],c[2]),c[3]);});
/* Büsche vor der Brücke */
seed=48;[[20,262,26],[160,256,22],[250,262,20],[470,258,24],[660,260,26],[400,266,18]].forEach(c=>{bg+=piece(circ(c[0],c[1],c[2]),['#5E9A44','#4C8538','#6BA64C'][c[2]%3]);});
/* Erdstreifen mit Laub */
bg+=piece([[-10,286],[690,282],[690,330],[-10,334]],'#7A6E52',1.6);
seed=52;for(let i=0;i<60;i++){bg+='<circle cx="'+(R()*680).toFixed(0)+'" cy="'+(290+R()*40).toFixed(0)+'" r="'+(1+R()*1.4).toFixed(1)+'" fill="'+(R()<0.5?'#9C8E5E':'#5E7A3E')+'"/>';}
/* Felsbrocken */
seed=57;
bg+=boulder(40,326,96,58,'#55554F','#6E6E66','#6E8A48')+boulder(150,322,104,78,'#3F403D','#57584F','#5E7A3E');
bg+=boulder(262,312,64,44,'#4E4E49','#64645C')+boulder(560,316,78,56,'#4A4A46','#616159','#6E8A48');
bg+=boulder(452,308,70,40,'#55554F','#6E6E66')+boulder(650,320,86,62,'#464642','#5C5C55','#5E7A3E');
/* Kopfsteinpflaster */
bg+=piece([[-10,330],[690,326],[690,430],[-10,430]],'#8E897E',2);
const SC=['#B5B0A4','#A9A496','#BDB8AC','#9F9A8D','#C3BEB2'];
let y=331,row=0;seed=61;while(y<422){const hh=5+(y-330)*0.09,ww=hh*1.5,gap=1.2+hh*0.12;let x=-(row%2)*(ww/2)-R()*3;while(x<690){const w=ww*(0.85+R()*0.3);bg+=stone(x,y,w,hh,SC[Math.floor(R()*SC.length)]);x+=w+gap;}y+=hh+gap;row++;}
seed=66;for(let i=0;i<22;i++){const x=R()*680,y=336+R()*80;bg+=flat(ell(x,y,4+R()*5,1.5),'#7FA055',0.4);}
return bg;}
KULISSEN['FELSHANG-01']=()=>bgFelshang01();
})();

/* ---- FOYER-01: Foyer mit Säulen, Deckenbildschirm, Klinkerboden ---- */
(()=>{
function column(x,top,bot,w,cap){let s=piece(rect(x-w/2,top,w,bot-top),'#E7E3DA',1.2);
 s+=flat(rect(x+w*0.12,top+2,w*0.32,bot-top-4),'#D2CDC2',0.6)+flat(rect(x-w*0.36,top+2,w*0.1,bot-top-4),'#F4F1EA',0.4);
 if(cap)s+=piece([[x-w/2,top+2],[x+w/2,top+2],[x+w*0.95,top-cap],[x-w*0.95,top-cap]],'#DCD6CA',1);
 s+=flat(ell(x,bot,w*0.7,2.5),'rgba(40,20,10,0.25)',0.4);return s;}
function bgFoyer01(){seed=6;let bg='';
/* Decke */
bg+='<rect x="0" y="0" width="680" height="420" fill="#D8D0C0"/>';
/* Rückwand: Fensterfront mit Licht */
bg+=piece(rect(-10,150,700,110),'#EEF2EA',1);
seed=8;for(let i=0;i<16;i++){bg+=flat(circ(R()*680,170+R()*60,10+R()*14),'#C9DDBE',1.2);}
for(let x=6;x<680;x+=26)bg+=ln(x,150,x,258,'#C2C8BF',2);
bg+=ln(0,186,680,186,'#C2C8BF',2);
/* Holzlamellen-Wand links */
bg+=piece(rect(-10,150,150,94),'#B98B4F',1.4);for(let x=-4;x<140;x+=6)bg+=ln(x,152,x,242,'#9A7038',1.6);
bg+=piece(rect(214,170,90,70),'#B98B4F',1.2);for(let x=218;x<304;x+=6)bg+=ln(x,172,x,238,'#9A7038',1.4);
/* niedrige grüne Brüstungen */
bg+=piece(rect(-10,230,260,26),'#3F7A5E',1.2)+flat(rect(-10,230,260,4),'#5C9A7C',0.6);
bg+=piece(rect(282,236,110,20),'#3F7A5E',1.2)+flat(rect(282,236,110,3),'#5C9A7C',0.6);
/* Treppe hinten rechts */
for(let k=0;k<5;k++){bg+=piece(rect(398+k*4,214+k*8,96-k*8,8),k%2?'#BDBAB2':'#A6A39A',0.6);}
bg+=ln(400,214,420,252,'#2F6E55',2)+ln(494,214,474,252,'#2F6E55',2)+ln(400,206,494,206,'#2F6E55',2);
/* rotes Plakat + Aufsteller */
bg+=piece(rect(560,166,24,46),'#C8382B',1)+'<circle cx="572" cy="182" r="5" fill="#E8B10A"/>'+flat(rect(564,194,16,3),'#F2E3C0',0.4)+flat(rect(564,200,12,2),'#F2E3C0',0.4);
bg+=piece(rect(500,192,16,52),'#2A2826',0.8)+flat(rect(503,196,10,14),'#5A6A78',0.4);
bg+=piece(rect(428,176,16,9),'#2E9E4F',0.8)+'<path d="M432 180.5 h8 M437 177.5 l3 3 l-3 3" stroke="#FFFFFF" stroke-width="1.4" fill="none"/>';
/* Deckenbalken (Kassetten, Fluchtpunkt rechts der Mitte) */
const VP=[420,150],BC='#C9C1B2';
[-760,-460,-200,40,300,560,900].forEach(dx=>{bg+=beam(VP[0]+dx*0.2,150,VP[0]+dx*1.4,-30,10,BC);});
[[150,8],[128,10],[96,12],[52,16],[0,20]].forEach((c,i)=>{const y=c[0];const sp=(150-y)/180;bg+=beam(VP[0]-480-sp*400,y,VP[0]+480+sp*400,y,c[1],'#CFC7B8');});
[[-20,40,300,150],[300,150,700,30],[100,0,420,150],[420,150,640,-10]].forEach(b=>{bg+=beam(b[0],b[1],b[2],b[3],7,'#BFB7A6');});
bg+=piece(rect(-10,144,700,10),'#C4BCAB',1);
bg+=ln(-10,108,690,124,'#A9A59C',2.2);
[[60,30],[180,90],[300,40],[470,24],[560,96],[640,40],[250,128],[520,132],[120,124]].forEach(p=>{bg+='<circle cx="'+p[0]+'" cy="'+p[1]+'" r="7" fill="#BDB6A8"/><circle cx="'+p[0]+'" cy="'+p[1]+'" r="4.8" fill="#FFFDF4"/>';});
/* Klinkerboden */
bg+=piece([[-10,256],[690,256],[690,430],[-10,430]],'#A4553A',2);
const PC=['#A9583B','#9A4D33','#B4623F','#A15138','#B86A47'];
let y=257,row=0;seed=21;while(y<422){const hh=2.6+(y-256)*0.06,ww=hh*2.2,gap=0.8+hh*0.1;let x=-(row%2)*(ww/2);while(x<690){bg+='<rect x="'+x.toFixed(1)+'" y="'+y.toFixed(1)+'" width="'+(ww-gap).toFixed(1)+'" height="'+hh.toFixed(1)+'" fill="'+PC[Math.floor(R()*PC.length)]+'"/>';x+=ww;}y+=hh+gap;row++;}
for(let k=1;k<6;k++){const rx=k*150;bg+='<path d="M'+(340-rx)+' 430 A'+rx+' '+Math.min(rx*0.34,160)+' 0 0 1 '+(340+rx)+' 430" fill="none" stroke="#8E4430" stroke-width="1.2" opacity="0.55"/>';}
bg+='<path d="M200 262 L470 262 L560 330 L120 330 Z" fill="rgba(255,236,210,0.09)"/>';
/* Säulen: hinten klein, vorne groß */
[[46,154,252,9],[176,154,256,10],[246,154,258,9],[330,154,258,9],[392,154,258,8],[540,152,262,12],[612,150,268,15]].forEach(c=>{bg+=column(c[0],c[1],c[2],c[3],0);});
bg+=column(108,128,296,24,8)+column(470,118,302,30,10);
bg+=piece(rect(458,170,22,46),'#F7F5F0',0.6)+'<text transform="translate(472 176) rotate(90)" font-size="9" font-weight="500" fill="#2C2C2A" '+F+'>Einlass</text>'+ln(462,210,476,210,'#2C2C2A',1.2);
bg+=column(660,96,330,36,12);
/* Deckenbildschirm (aus) */
bg+=ln(316,0,316,26,'#2A2A2A',3)+ln(346,0,346,24,'#2A2A2A',3);
bg+=piece([[256,24],[398,18],[404,96],[262,102]],'#1C1C1E',1.2)+flat([[262,30],[392,25],[397,90],[267,95]],'#2A2C30',0.8);
bg+='<path d="M290 34 L330 32 L280 90 L266 91 Z" fill="rgba(255,255,255,0.05)"/>';
return bg;}
KULISSEN['FOYER-01']=()=>bgFoyer01();
})();

/* ---- THEKE-01: Foyer mit Theken ---- */
(()=>{
function ellR(cx,cy){let p=[];for(let i=0;i<14;i++){const a=i/14*Math.PI*2;p.push([cx+Math.cos(a)*7,cy+Math.sin(a)*3]);}return p;}
function bgTheke01(){seed=5;let bg='';
bg+='<rect x="0" y="0" width="680" height="420" fill="#E4DFD3"/>';
bg+='<rect x="0" y="150" width="680" height="142" fill="#86AE66"/>';
[[20,200,30,'#5E9A44'],[90,180,36,'#4C8538'],[170,205,28,'#6BA64C'],[350,185,40,'#4C8538'],[430,210,30,'#8DBA6A'],[500,178,38,'#5E9A44'],[590,200,34,'#4C8538'],[660,185,30,'#6BA64C']].forEach(c=>{bg+=flat(circ(c[0],c[1],c[2]),c[3],2);});
for(let x=8;x<680;x+=34)bg+=ln(x,150,x,292,'#A3A9AC',3);
bg+=ln(0,182,680,182,'#A3A9AC',3)+ln(0,250,680,250,'#A3A9AC',2);
bg+=piece(rect(62,160,16,132),'#D2CEC4',1)+piece(rect(150,164,14,128),'#D2CEC4',1)+piece(rect(612,160,18,132),'#D2CEC4',1);
bg+=piece(rect(560,186,24,13),'#2E9E4F',1)+'<path d="M566 192.5 h11 M573 188.5 l4 4 l-4 4" stroke="#FFFFFF" stroke-width="1.8" fill="none"/>';
bg+=piece(rect(634,168,24,36),'#1F1F1F',1);
const BC='#D3CCBC';
bg+=beam(255,150,-20,70,16,BC)+beam(255,150,110,-20,16,BC)+beam(255,150,430,-20,16,BC)+beam(255,150,700,70,16,BC);
bg+=beam(430,-20,700,150,12,BC)+beam(110,-20,-20,120,12,BC);
bg+=piece(rect(-10,144,700,12),'#CBC4B3',1);
[[60,30],[175,95],[330,45],[475,22],[560,100],[645,38],[110,128],[410,112],[25,110]].forEach(p=>{bg+='<circle cx="'+p[0]+'" cy="'+p[1]+'" r="9" fill="#BDB6A8"/><circle cx="'+p[0]+'" cy="'+p[1]+'" r="6.5" fill="#FFFDF4"/>';});
bg+=piece([[-10,290],[690,290],[690,430],[-10,430]],'#7E9E86',2);
bg+=piece([[380,290],[606,290],[628,318],[368,318]],'#D9D2C6',1.5);
for(let x=392;x<606;x+=22)bg+=ln(x,291,x-6,317,'#C2BAAC',1);bg+=ln(374,304,616,304,'#C2BAAC',1);
seed=40;for(let i=0;i<90;i++){const x=R()*680,y=322+R()*96;bg+='<circle cx="'+x.toFixed(0)+'" cy="'+y.toFixed(0)+'" r="1.2" fill="#6E8E76"/>';}
bg+=piece(rect(4,262,64,14),'#378ADD',1)+piece(rect(2,258,68,5),'#E24B4A',1)+ln(12,276,10,300,'#EF9F27',3)+ln(60,276,62,300,'#EF9F27',3);
bg+=piece(rect(120,212,40,26),'#C8382B',1)+ln(120,225,160,225,'#8E2318',1.2)+ln(140,212,140,238,'#8E2318',1.2);
bg+=piece(rect(176,206,34,32),'#3A3A38',1)+piece(rect(180,210,26,24),'#6F9792',0.8);
bg+=piece(rect(66,234,158,7),'#9A9690',1)+piece(rect(70,240,150,54),'#F2F0EA',1.5)+piece(rect(70,286,150,8),'#2F6E3C',1);
bg+=ln(76,180,76,234,'#B9BEC2',4)+ln(214,180,214,234,'#B9BEC2',4);
bg+=piece(rect(72,176,146,24),'#ECEAE4',1.2)+'<text x="145" y="193" text-anchor="middle" font-size="14" font-weight="500" fill="#C8382B" '+F+'>Getränke</text>';
bg+=piece(rect(86,252,118,22),'#FFFFFF',1)+'<text x="145" y="268" text-anchor="middle" font-size="12" font-weight="500" fill="#2F6E3C" '+F+'>Theke</text>';
bg+=piece(rect(24,178,44,62),'#141210',1.2)+'<g data-logo="1" data-t="translate(46 196)" data-size="13" data-max="36"></g>';
bg+=flat([[30,206],[38,203],[42,206],[46,203],[54,206],[52,212],[48,211],[48,226],[34,226],[34,211],[30,212]],'#5F5E5A',0.6)+'<text x="46" y="236" text-anchor="middle" font-size="11" fill="#FBFAF5" '+F+'>Merch</text>';
bg+=tape(20,174,16,7,-30)+tape(56,174,16,7,30);
bg+=piece(rect(396,236,168,7),'#9A9690',1)+piece(rect(400,242,160,52),'#F2F0EA',1.5)+piece(rect(400,286,160,8),'#2F6E3C',1);
bg+=ln(406,182,406,236,'#B9BEC2',4)+ln(554,182,554,236,'#B9BEC2',4);
bg+=piece(rect(402,178,156,24),'#ECEAE4',1.2)+'<text x="480" y="195" text-anchor="middle" font-size="14" font-weight="500" fill="#C8382B" '+F+'>Imbiss</text>';
bg+=piece(rect(420,254,120,22),'#FFFFFF',1)+'<text x="480" y="270" text-anchor="middle" font-size="12" font-weight="500" fill="#2F6E3C" '+F+'>Süßwaren 0,50 €</text>';
bg+=piece(rect(226,148,58,156),'#D8D4CA',1.5)+piece(rect(222,292,66,14),'#C4BFB3',1);
bg+='<path d="M244 186 h-14 M234 182 l-4 4 l4 4" stroke="#2C2C2A" stroke-width="2" fill="none"/><text x="262" y="191" text-anchor="middle" font-size="12" font-weight="500" fill="#2C2C2A" '+F+'>WC</text>';
bg+='<text x="255" y="212" text-anchor="middle" font-size="11" fill="#2C2C2A" '+F+'>Ausgang</text>';
bg+='<path d="M216 304 L216 172 Q216 150 196 152 L192 160" stroke="#9DA2A5" stroke-width="4" fill="none" stroke-linecap="round"/>';
bg+='<path d="M294 304 L294 168 Q294 146 316 148 L320 158" stroke="#9DA2A5" stroke-width="4" fill="none" stroke-linecap="round"/>';
bg+=piece(circ(190,172,12),'#EEF3F5',1)+'<circle cx="186" cy="168" r="3" fill="#FFFFFF"/>'+piece(circ(321,170,12),'#EEF3F5',1)+'<circle cx="317" cy="166" r="3" fill="#FFFFFF"/>';
bg+=piece(rect(58,296,112,8),'#D9A55B',1.2)+ln(72,304,70,348,'#9DA2A5',3)+ln(156,304,158,348,'#9DA2A5',3)+ln(66,348,76,348,'#9DA2A5',3)+ln(152,348,162,348,'#9DA2A5',3);
bg+='<rect x="600" y="232" width="72" height="104" fill="none" stroke="#2F8A4A" stroke-width="3"/>'+ln(600,262,672,262,'#2F8A4A',2.5)+ln(600,296,672,296,'#2F8A4A',2.5);
for(let i=0;i<6;i++){bg+=piece(rect(604+i*11,238,9,22),'#FBFAF5',0.6);}
for(let i=0;i<4;i++){bg+=piece(ellR(612+i*16,288),'#FBFAF5',0.6);}
bg+=piece(rect(604,320,64,14),'#C8382B',1)+'<circle cx="606" cy="340" r="3" fill="#2A2624"/><circle cx="666" cy="340" r="3" fill="#2A2624"/>';
return bg;}

KULISSEN['THEKE-01']=()=>bgTheke01();
})();

/* ---- HALLE-LEER-01: Haupthalle ohne Gäste (eigener Schatten pieceL, eigene Traverse und Türme) ---- */
(()=>{
function pieceL(pts,fill,j){j=j===undefined?2.2:j;const d=poly(pts,j);return '<path d="'+d+'" transform="translate(2.5,2.5)" fill="rgba(20,12,6,0.3)"/><path d="'+d+'" fill="'+fill+'" stroke="'+fill+'" stroke-width="0.6" stroke-linejoin="round"/>';}
function truss(x1,y1,x2,y2,w,c){const dx=x2-x1,dy=y2-y1,l=Math.hypot(dx,dy),nx=-dy/l*w/2,ny=dx/l*w/2;let s=ln(x1+nx,y1+ny,x2+nx,y2+ny,c,2.2)+ln(x1-nx,y1-ny,x2-nx,y2-ny,c,2.2);const n=Math.round(l/(w*1.1));let d='M'+(x1+nx).toFixed(1)+' '+(y1+ny).toFixed(1);for(let i=1;i<=n;i++){const f=i/n,sg=i%2?-1:1;d+=' L'+(x1+dx*f+nx*sg).toFixed(1)+' '+(y1+dy*f+ny*sg).toFixed(1);}return s+'<path d="'+d+'" stroke="'+c+'" stroke-width="1.1" fill="none"/>';}
function bgHalleLeer01(){const piece=pieceL;seed=9;let bg='';
bg+='<rect x="0" y="0" width="680" height="420" fill="#24201C"/>';
for(let x=-60;x<740;x+=56){bg+=ln(x,0,x+56,170,'#3D3832',1.2)+ln(x+56,0,x,170,'#3D3832',1.2);}
[34,78,122,160].forEach(y=>{bg+=ln(0,y,680,y,'#3D3832',1.2);});
seed=12;for(let i=0;i<46;i++){const x=R()*680,y=8+R()*150;bg+='<circle cx="'+x.toFixed(0)+'" cy="'+y.toFixed(0)+'" r="'+(1.6+R()*1.6).toFixed(1)+'" fill="#FFF1C8"/>';}
bg+=truss(-20,70,700,24,14,'#C9CDD0')+truss(-20,22,520,118,12,'#BFC3C6')+truss(180,140,700,82,12,'#C9CDD0');
bg+=piece(rect(0,150,680,112),'#7E5A32',1.5);
for(let x=3;x<680;x+=6)bg+=ln(x,152,x,260,'#654624',1.4);
for(let k=0;k<9;k++){const x=22+k*80;bg+=flat(rect(x,152,16,110),'#C8402C',1)+flat(rect(x+5,152,6,110),'#EE7552',0.8);}
bg+=piece(rect(0,236,680,28),'#36423A',1.5);
bg+=piece(rect(8,146,176,62),'#A47B4B',1.5);for(let x=14;x<184;x+=7)bg+=ln(x,150,x,206,'#86613A',1.6);bg+=piece(rect(8,206,176,10),'#3E4A3A',1);
bg+=piece(rect(470,166,212,24),'#C3BDB0',1.2);for(let x=480;x<680;x+=18)bg+='<circle cx="'+x+'" cy="196" r="2" fill="#FFF1C8"/>';
bg+=piece(rect(330,214,16,9),'#2E9E4F',0.8)+piece(rect(560,214,16,9),'#2E9E4F',0.8);
bg+=piece([[-10,258],[690,258],[690,430],[-10,430]],'#8C4F25',2);
const PC=['#9C5C2C','#8A4E24','#A86634','#93552A','#B0703A'];
let y=259,row=0;seed=21;while(y<422){const hh=3+(y-258)*0.07,ww=hh*2.6,gap=0.8+hh*0.08;let x=-(row%2)*(ww/2);while(x<690){bg+='<rect x="'+x.toFixed(1)+'" y="'+y.toFixed(1)+'" width="'+(ww-gap).toFixed(1)+'" height="'+hh.toFixed(1)+'" fill="'+PC[Math.floor(R()*PC.length)]+'"/>';x+=ww;}y+=hh+gap;row++;}
bg+='<path d="M180 300 Q340 286 520 304 L540 330 Q340 312 160 326 Z" fill="rgba(255,214,160,0.14)"/>';
const VP=[340,244];const rows=[{y:262,s:0.28},{y:270,s:0.4},{y:282,s:0.56},{y:298,s:0.78},{y:320,s:1.05}];
const aisles=[-250,0,250];
rows.forEach((r,ri)=>{const th=7*r.s+1.5,ch=10*r.s+2,cw=9*r.s+3,aw=34*r.s+6;
 const gaps=aisles.map(a=>VP[0]+a*r.s*1.25);
 let segs=[];let start=-20;gaps.forEach(g=>{segs.push([start,g-aw/2]);start=g+aw/2;});segs.push([start,700]);
 segs.forEach(sg=>{for(let x=sg[0]+cw*0.3;x<sg[1]-cw*0.6;x+=cw*1.35){bg+=flat(rect(x,r.y-ch*0.85,cw,ch),ri%2?'#2F6B3E':'#2A6238',0.6);}});
 segs.forEach(sg=>{bg+=piece(rect(sg[0],r.y,sg[1]-sg[0],th),'#D69A52',1)+flat(rect(sg[0],r.y+th,sg[1]-sg[0],2+r.s*1.5),'#A8702F',0.6);});
 segs.forEach(sg=>{for(let x=sg[0]+cw*0.8;x<sg[1]-cw*0.6;x+=cw*1.35){bg+=flat(rect(x,r.y+th+1,cw,ch*0.95),ri%2?'#357A47':'#2F6E40',0.6);}});
 if(ri>=3){segs.forEach((sg,k)=>{if(sg[1]-sg[0]>60){const px=sg[0]+(sg[1]-sg[0])*(k%2?0.35:0.6);bg+=flat(rect(px,r.y+th*0.25,14*r.s+4,3*r.s+1.5),'#F4F4EE',0.4)+'<path d="M'+(px+14*r.s+4).toFixed(1)+' '+(r.y+th*0.4).toFixed(1)+' q6 -3 10 1 t10 -1" fill="none" stroke="#F4F4EE" stroke-width="1.2"/>';}});}
});
function tower(x,base,h,s){let o='';const w=12*s+3;o+=ln(x-w/2,base,x-w/2,base-h,'#D3D7DA',2.4)+ln(x+w/2,base,x+w/2,base-h,'#D3D7DA',2.4);let d='M'+(x-w/2)+' '+base;const n=Math.round(h/w);for(let i=1;i<=n;i++){d+=' L'+(i%2?x+w/2:x-w/2)+' '+(base-h*i/n).toFixed(1);}o+='<path d="'+d+'" stroke="#BFC3C6" stroke-width="1.2" fill="none"/>';
 o+=flat(rect(x-w/2-2,base-h-3,w+4,4),'#D3D7DA',0.5)+piece(circ(x,base-h-3-6*s-3,6*s+3),s>0.7?'#C8382B':'#2F8A4A',0.6)+'<circle cx="'+x+'" cy="'+(base-h-3-6*s-3).toFixed(1)+'" r="'+(2*s+1).toFixed(1)+'" fill="#2A2624"/>';return o;}
bg+=tower(142,302,64,0.62)+tower(268,288,48,0.5)+tower(420,288,48,0.5)+tower(548,302,64,0.62);
bg+=piece(rect(318,333,32,14),'#FBFAF5',0.8)+'<text x="334" y="344" text-anchor="middle" font-size="11" font-weight="500" fill="#2C2C2A" '+F+'>N14</text>';
bg+=piece([[452,334],[466,334],[470,356],[462,362],[450,356]],'#2E6FB0',1);
return bg;}

KULISSEN['HALLE-LEER-01']=()=>bgHalleLeer01();
})();
