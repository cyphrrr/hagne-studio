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
