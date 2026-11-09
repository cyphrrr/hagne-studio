/* HAGNE-Studio · Bibliothek · Basis
   Zufall, Collage-Teile, Formen, Logo. Wird von allen anderen Dateien gebraucht. */

/* ==== 1) BAUKASTEN – Grundwerkzeuge (unverändert aus E02) ==== */
const $=id=>document.getElementById(id);
let seed=7;const ROUGH=0.2;const LOGO='#E8B10A';
let SHADOW='rgba(0,0,0,0.35)';
function R(){seed=(seed*16807)%2147483647;return (seed-1)/2147483646;}
function poly(pts,j){j=j*ROUGH;const seg=9+(1-ROUGH)*12;let o=[];for(let i=0;i<pts.length;i++){const a=pts[i],b=pts[(i+1)%pts.length];const d=Math.hypot(b[0]-a[0],b[1]-a[1]);const n=Math.max(1,Math.round(d/seg));for(let k=0;k<n;k++){const t=k/n;o.push([a[0]+(b[0]-a[0])*t+(R()-.5)*j,a[1]+(b[1]-a[1])*t+(R()-.5)*j]);}}return 'M'+o.map(p=>p[0].toFixed(1)+' '+p[1].toFixed(1)).join('L')+'Z';}
function rect(x,y,w,h){return [[x,y],[x+w,y],[x+w,y+h],[x,y+h]];}
function circ(cx,cy,r){const n=Math.max(12,Math.round(r*1.6));let p=[];for(let i=0;i<n;i++){const a=i/n*Math.PI*2;p.push([cx+Math.cos(a)*r,cy+Math.sin(a)*r]);}return p;}
function ell(cx,cy,rx,ry){let p=[];for(let i=0;i<18;i++){const a=i/18*Math.PI*2;p.push([cx+Math.cos(a)*rx,cy+Math.sin(a)*ry]);}return p;}
function seg(x1,y1,x2,y2,w){const dx=x2-x1,dy=y2-y1,L=Math.hypot(dx,dy),nx=-dy/L*w/2,ny=dx/L*w/2;return [[x1+nx,y1+ny],[x2+nx,y2+ny],[x2-nx,y2-ny],[x1-nx,y1-ny]];}
function piece(pts,fill,j){j=j===undefined?2.2:j;const d=poly(pts,j);return '<path d="'+d+'" transform="translate(2.5,2.5)" fill="'+SHADOW+'"/><path d="'+d+'" fill="'+fill+'" stroke="'+fill+'" stroke-width="0.6" stroke-linejoin="round"/>';}
function flat(pts,fill,j){return '<path d="'+poly(pts,j===undefined?1.5:j)+'" fill="'+fill+'"/>';}
function tape(x,y,w,h,a){return '<rect x="'+x+'" y="'+y+'" width="'+w+'" height="'+h+'" fill="rgba(245,236,200,0.72)" transform="rotate('+a+' '+(x+w/2)+' '+(y+h/2)+')"/>';}
function ln(x1,y1,x2,y2,c,w){return '<path d="M'+(+x1).toFixed(1)+' '+(+y1).toFixed(1)+' L'+(+x2).toFixed(1)+' '+(+y2).toFixed(1)+'" stroke="'+c+'" stroke-width="'+(w||1)+'" fill="none"/>';}
function truss(x1,y1,x2,y2,w,c){const dx=x2-x1,dy=y2-y1,l=Math.hypot(dx,dy),nx=-dy/l*w/2,ny=dx/l*w/2;let s=ln(x1+nx,y1+ny,x2+nx,y2+ny,c,2.2)+ln(x1-nx,y1-ny,x2-nx,y2-ny,c,2.2);const n=Math.round(l/(w*1.1));let d='M'+(x1+nx).toFixed(1)+' '+(y1+ny).toFixed(1);for(let i=1;i<=n;i++){const f=i/n,sg=i%2?-1:1;d+=' L'+(x1+dx*f+nx*sg).toFixed(1)+' '+(y1+dy*f+ny*sg).toFixed(1);}return s+'<path d="'+d+'" stroke="'+c+'" stroke-width="1.1" fill="none"/>';}
function beam(x1,y1,x2,y2,w,fill){const dx=x2-x1,dy=y2-y1,l=Math.hypot(dx,dy),nx=-dy/l*w/2,ny=dx/l*w/2;return piece([[x1+nx,y1+ny],[x2+nx,y2+ny],[x2-nx,y2-ny],[x1-nx,y1-ny]],fill,1.5);}
const F='style="font-family:var(--font-sans)"';
function roundPoly(pts,r,n){n=n||5;const o=[];const L=pts.length;
for(let i=0;i<L;i++){const p0=pts[(i-1+L)%L],p1=pts[i],p2=pts[(i+1)%L];const rr=Array.isArray(r)?r[i]:r;
const d1=Math.hypot(p1[0]-p0[0],p1[1]-p0[1]),d2=Math.hypot(p2[0]-p1[0],p2[1]-p1[1]);const k=Math.min(rr,d1/2,d2/2);
if(k<=0){o.push(p1);continue;}
const a=[p1[0]+(p0[0]-p1[0])*k/d1,p1[1]+(p0[1]-p1[1])*k/d1],b=[p1[0]+(p2[0]-p1[0])*k/d2,p1[1]+(p2[1]-p1[1])*k/d2];
for(let j=0;j<=n;j++){const t=j/n,u=1-t;o.push([u*u*a[0]+2*u*t*p1[0]+t*t*b[0],u*u*a[1]+2*u*t*p1[1]+t*t*b[1]]);}}return o;}
function rr(x,y,w,h,r){return roundPoly(rect(x,y,w,h),r);}
function drawLogo(g,size,maxW){const NS='http://www.w3.org/2000/svg';g.innerHTML='';
const items=[{t:'['},{bar:1},{t:'ju'},{len:1},{t:'ni'},{t:'e',rot:1},{t:'n'},{t:']'}];let x=0;const L=[];
items.forEach(it=>{if(it.t){const e=document.createElementNS(NS,'text');e.textContent=it.t;e.setAttribute('font-size',size);e.setAttribute('fill',LOGO);e.setAttribute('style','font-family:Saira, var(--font-sans);font-weight:700');g.appendChild(e);const w=e.getComputedTextLength();L.push([e,x,w,it]);x+=w;}else{const w=size*(it.bar?0.2:0.34);L.push([null,x,w,it]);x+=w;}});
const off=-x/2;let extra='';
L.forEach(([e,x0,w,it])=>{const X=x0+off;if(e){e.setAttribute('x',X.toFixed(1));e.setAttribute('y',0);if(it.rot)e.setAttribute('transform','rotate(180 '+(X+w/2).toFixed(1)+' '+(-size*0.26).toFixed(1)+')');}
else if(it.bar){extra+='<rect x="'+(X+w*0.3).toFixed(1)+'" y="'+(-size*0.8).toFixed(1)+'" width="'+(size*0.09).toFixed(1)+'" height="'+(size*0.28).toFixed(1)+'" fill="'+LOGO+'"/>';}
else{const a=X+w*0.2,b=X+w*0.8,m=X+w*0.5;extra+='<path d="M'+a+' '+(-size*0.52)+' L'+b+' '+(-size*0.52)+' L'+m+' '+(-size*0.37)+'Z M'+a+' 0 L'+b+' 0 L'+m+' '+(-size*0.15)+'Z" fill="'+LOGO+'"/>';}});
g.insertAdjacentHTML('beforeend',extra);const s=x>maxW?maxW/x:1;g.setAttribute('transform',g.dataset.t+' scale('+s.toFixed(3)+')');}
function drawLogos(){document.querySelectorAll('[data-logo]').forEach(g=>drawLogo(g,parseFloat(g.dataset.size),parseFloat(g.dataset.max)));}
