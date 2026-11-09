/* HAGNE-Studio · Player-Engine (Drehbuch-Format 0.2) */

/* ==== 6) ENGINE – liest das Drehbuch und baut daraus jedes Bild ==== */
const W=746.67,H=420;
const LICHT={nacht:'rgba(0,0,0,0.35)',tag:'rgba(60,40,20,0.22)'};
const AUFTRITT=['reinlaufen','stapfen','auftauchen','schleichen'];
let DB,ACT,AKT,RIGS,OBJ,GEG,DUR,FEHLT,SIGNS;
function stompAmp(T){let a=0;(DB.effekte||[]).forEach(e=>{if(e.typ!=='stampf')return;e.t.forEach(t=>{if(T>=t)a+=e.staerke*Math.exp(-(T-t)*10);});});return a;}
function entry(actor){const a=AKT.filter(a=>a.wer.includes(actor.id)&&AUFTRITT.includes(a.geste));return a.length?Math.min(...a.map(a=>a.von)):0;}

function build(){
 DUR=DB.episode.dauer;FEHLT=new Set();
 SHADOW=LICHT[DB.kulisse.licht||'nacht']||LICHT.nacht;
 ACT={};DB.besetzung.forEach(a=>{ACT[a.id]=a;if(!FIGUREN[a.figur])FEHLT.add('Figur '+a.figur);});
 AKT=DB.aktionen.map(a=>Object.assign({},a,{wer:Array.isArray(a.wer)?a.wer:[a.wer]}));
 AKT.forEach(a=>{if(!GESTEN[a.geste])FEHLT.add('Geste '+a.geste);});
 const K=KULISSEN[DB.kulisse.id];if(!K)FEHLT.add('Kulisse '+DB.kulisse.id);
 $('bg').innerHTML=K?K():'';
 const items=[];
 (DB.kulisse.requisiten||[]).forEach((r,i)=>{const R_=REQUISITEN[r.id];if(!R_){FEHLT.add('Requisite '+r.id);return;}
   const dx=R_.absolut?0:(r.x||R_.x0)-R_.x0;items.push({z:r.z||0,svg:'<g id="rq-'+i+'" transform="translate('+dx+' 0)">'+R_.build(r)+'</g>'});});
 DB.besetzung.forEach(a=>{const Fg=FIGUREN[a.figur];if(Fg)items.push({z:a.z||0,svg:'<g id="'+a.id+'">'+Fg.build(a)+'</g>'});});
 GEG=[];(DB.gegenstaende||[]).forEach((g,i)=>{const A=GEGENSTAND_ARTEN[g.art];if(!A){FEHLT.add('Gegenstand '+g.art);return;}
   items.push({z:g.z||0,svg:'<g id="gg-'+i+'">'+A.build()+'</g>'});GEG.push(Object.assign({},g,{i,art_:A}));});
 OBJ=[];AKT.forEach((a,i)=>{if(a.geste!=='fallen-lassen')return;const G=GEGENSTAENDE[a.gegenstand];if(!G){FEHLT.add('Gegenstand '+a.gegenstand);return;}
   seed=77;items.push({z:a.z!==undefined?a.z:100,svg:'<g id="obj-'+i+'" style="display:none">'+G()+'</g>'});OBJ.push(Object.assign(a,{idx:i}));});
 items.sort((p,q)=>p.z-q.z);
 $('chars').innerHTML=items.map(i=>i.svg).join('');
 DB.besetzung.forEach(a=>{const Fg=FIGUREN[a.figur];if(Fg&&Fg.post)Fg.post(a.id);});
 OBJ.forEach(a=>{a.el=$('obj-'+a.idx);});GEG.forEach(g=>{g.el=$('gg-'+g.i);});
 RIGS={};DB.besetzung.forEach(a=>{const Fg=FIGUREN[a.figur];if(Fg)RIGS[a.id]=Fg.rig(a.id);});
 buildBlenden();
 SIGNS=allSigns();
 drawLogos();
 sl.max=DUR;lastF=-1;renderAt(Math.min(+sl.value||0,DUR));
 setStatus();}

function poseAt(actor,T,f,world){
 if(actor.start==='draussen'&&T<entry(actor))return {x:-3000,off:true};
 const bl=actor.blick||[0,0];
 const o={x:actor.x,y:-stompAmp(T)*(actor.bebt||0),px:bl[0],py:bl[1],head:actor.kopf||0,br:brauen(actor.brauen||'neutral'),
   aL:actor.arme?actor.arme[0]:0,aR:actor.arme?actor.arme[1]:0};
 if(actor.mund)o.m=MUND[actor.mund]||actor.mund;
 AKT.forEach(a=>{if(!a.wer.includes(actor.id)||T<a.von||T>=a.bis)return;const fn=GESTEN[a.geste];if(!fn)return;
   const others=a.wer.filter(w=>w!==actor.id);
   const seite=others.length?(Math.sign(others.reduce((s,w)=>s+ACT[w].x,0)/others.length-actor.x)||1):1;
   fn(o,{T,f,t:T-a.von,d:a.bis-a.von,a,self:actor,world,seite});
   if(a.pose)Object.assign(o,a.pose);});
 if(AKT.some(a=>a.geste==='fallen-lassen'&&a.wer.includes(actor.id)&&T>=a.von-(a.vorlauf||0)))o.handLeer=true;
 return o;}

/* Lippen: Pegel je Bild aus dem Abschnitt "analyse" (je Figur oder für den ganzen Mix) */
function talking(id,T){return DB.dialog.some(d=>d.wer===id&&T>=d.von&&T<d.bis);}
function openAt(id,f){const P=(DB.analyse&&DB.analyse.pegel)||{},e=P[id]||P.mix;if(!e){const h=hs(f*1.7+id.length*13);return h<0.25?0:0.3+h*0.7;}
 const v=e.v[f-(e.o||0)];return clamp(((v===undefined?-999:v)-(e.null_db!==undefined?e.null_db:-40))/(e.spanne||22));}

/* Fallende Gegenstände: "von-oben" (E02) oder "aus-der-hand" (Gürtel) */
function objAt(a,T){if(T<a.von)return null;
 if(a.art==='aus-der-hand'){const fd=a.fall||0.3,t=T-a.von,k=clamp(t/fd),r=clamp((t-fd)/(a.roll||0.9));
   return {x:a.start[0]+r*(a.rollt||0),y:lerp(a.start[1],a.boden,k*k),r:90*k+r*(a.drehung||0)};}
 const d=a.landet-a.von,y0=-40,yb=a.boden;
 if(T<a.landet){const k=(T-a.von)/d;return {x:a.x,y:lerp(y0,yb,Math.pow(k,1.35)),r:450*k};}
 if(T<a.landet+0.25){const j=Math.sin(clamp((T-a.landet)/0.25)*Math.PI);return {x:a.x,y:yb-12*j,r:90+j*18};}
 const k=ease((T-a.landet-0.25)/0.8);return {x:lerp(a.x,a.rollt_bis!==undefined?a.rollt_bis:a.x,k),y:yb,r:90};}

/* Tragbare Gegenstände: liegen, werden getragen, fallen nach dem Loslassen zurück */
function gegAt(g,T,world){let x=g.x,y=g.y,r=0;const tr=AKT.find(a=>a.geste==='tragen'&&a.gegenstand===g.id&&T>=a.von&&T<a.bis+0.3);
 if(tr){const act=ACT[tr.wer[0]],h=g.art_.trage_hoehe||77.3;
  if(T<tr.bis){const o=world[tr.wer[0]];x=o.x;y=act.boden+(o.y||0)-h;r=o.rot||0;}
  else{const k=(T-tr.bis)/0.3;y=lerp(act.boden-h,g.y,k*k);}}
 return {x,y,r};}

function camAt(T){const f=Math.floor(T*12);const S=DB.kamera;let sh=S[S.length-1];for(const q of S){if(T>=q.von&&T<q.bis){sh=q;break;}}
 const k=ease((T-sh.von)/(sh.bis-sh.von));let cx=lerp(sh.start[0],sh.ende[0],k),cy=lerp(sh.start[1],sh.ende[1],k),s=lerp(sh.start[2],sh.ende[2],k);
 if(sh.zoom_puls)s+=Math.sin(T*sh.zoom_puls[1])*sh.zoom_puls[0];
 const hw=W/2/s,hh=H/2/s;cx=Math.max(hw-8,Math.min(688-hw,cx));cy=Math.max(hh,Math.min(420-hh+4,cy));
 const amp=(sh.wackeln||0)*(sh.wackeln_steigt?k:1)+stompAmp(T);cx+=(hs(f*3.1)-.5)*amp*2/s*1.5;cy+=(hs(f*7.7)-.5)*amp*2/s*1.5;
 const rot=sh.neigung?Math.sin(T*sh.neigung[1])*sh.neigung[0]:0;
 return {cx,cy,s,str:'translate('+(W/2).toFixed(1)+' '+(H/2).toFixed(1)+') rotate('+rot.toFixed(2)+') scale('+s.toFixed(3)+') translate('+(-cx).toFixed(1)+' '+(-cy).toFixed(1)+')'};}
function toScreen(c,x,y){return [(x-c.cx)*c.s+W/2,(y-c.cy)*c.s+H/2];}

function signSvg(txt,x,y,a,key){seed=700+key*13;const w=Math.round(txt.length*8.2+26);
 return '<g transform="rotate('+a+' '+(x+w/2)+' '+(y+10)+')">'+piece(rect(x,y,w,22),'#FBFAF5',1.2)+
 '<text x="'+(x+w/2)+'" y="'+(y+16)+'" text-anchor="middle" font-size="14" font-weight="800" fill="#2C2C2A" '+F+'>'+txt+'</text>'+tape(x-7,y-4,20,8,-30)+'</g>';}
function allSigns(){const L=(DB.schilder||[]).map(s=>[s.von,s.bis,s.text,s.pos[0],s.pos[1],s.winkel||0]);
 (DB.effekte||[]).forEach(e=>{if(!e.schild)return;const S=e.schild;e.t.forEach((t,i)=>{const p=S.pos[i%S.pos.length];L.push([t,t+(S.dauer||0.36),S.text,p[0],p[1],S.winkel[i%S.winkel.length]]);});});
 return L;}
function bubbleSvg(c,d,key){const a=ACT[d.wer],kh=(FIGUREN[a.figur]&&FIGUREN[a.figur].kopfhoehe)||252;const [tx,ty]=toScreen(c,a.x,a.boden-kh*0.92);const L=[d.text];seed=500+key*17;
 const w=Math.round(Math.max(...L.map(t=>t.length))*7.6+34),h=18+L.length*18;
 const x=Math.min(Math.max(tx-w/2,10),W-10-w),y=Math.max(8,ty-h-26);
 const bx=Math.min(Math.max(tx,x+18),x+w-18);
 let s=piece([[bx-10,y+h-2],[bx+10,y+h-2],[tx+2,Math.max(y+h+12,ty-6)]],'#FBFAF5',1.2)+piece(rect(x,y,w,h),'#FBFAF5',2);
 L.forEach((t,i)=>{s+='<text x="'+(x+w/2).toFixed(1)+'" y="'+(y+23+i*18).toFixed(1)+'" text-anchor="middle" font-size="14" fill="#2C2C2A" '+F+'>'+t+'</text>';});
 return s+tape(x-6,y-4,22,8,-35);}

/* Blenden: Schwarz-/Weißblende und Texttafeln über dem Bild */
function buildBlenden(){let s='';(DB.blenden||[]).forEach((b,i)=>{
 if(b.typ==='texttafel'){const n=b.text.length;s+='<g id="bl-'+i+'" style="display:none"><rect width="'+W+'" height="'+H+'" fill="#000"/><g id="bl-'+i+'-t" opacity="0">'+
   b.text.map((t,j)=>'<text x="373.3" y="'+(218+(j-(n-1)/2)*56)+'" text-anchor="middle" font-size="44" font-weight="800" fill="#FFFFFF" '+F+'>'+t+'</text>').join('')+'</g></g>';}
 else s+='<rect id="bl-'+i+'" width="'+W+'" height="'+H+'" fill="'+(b.typ==='weiss'?'#FFFFFF':'#000')+'" opacity="0"/>';});
 $('blenden').innerHTML=s;}
function kurve(V,T){if(T<=V[0][0])return V[0][1];for(let i=1;i<V.length;i++){if(T<V[i][0]){const a=V[i-1],b=V[i];return lerp(a[1],b[1],(T-a[0])/(b[0]-a[0]));}}return V[V.length-1][1];}
function blendenAt(T){(DB.blenden||[]).forEach((b,i)=>{const el=$('bl-'+i);
 if(b.typ==='texttafel'){const on=T>=b.von&&T<b.bis;el.style.display=on?'':'none';if(!on)return;
   el.setAttribute('opacity',(b.aus&&T>=b.aus[0]?lerp(1,0,(T-b.aus[0])/(b.aus[1]-b.aus[0])):1).toFixed(2));
   const e=b.text_ein||[b.von,b.von];$('bl-'+i+'-t').setAttribute('opacity',lerp(0,1,(T-e[0])/Math.max(0.01,e[1]-e[0])).toFixed(2));}
 else if(b.verlauf)el.setAttribute('opacity',kurve(b.verlauf,T).toFixed(2));
 else el.setAttribute('opacity',(T>=b.von?lerp(0,1,(T-b.von)/(b.dauer||0.3)):0).toFixed(2));});}

/* Ein Bild zum Zeitpunkt T (12 fps Legetrick) */
function renderAt(Tin){const fps=DB.episode.fps||12,f=Math.floor(Tin*fps),T=f/fps;
 let world={};DB.besetzung.forEach(a=>{world[a.id]=poseAt(a,T,f,{});});
 const pass1=world;world={};DB.besetzung.forEach(a=>{world[a.id]=poseAt(a,T,f,pass1);});
 DB.besetzung.forEach(a=>{const Fg=FIGUREN[a.figur];if(!Fg)return;const o=world[a.id];o._f=f;
   if(Fg.spricht&&!o.mFix&&!o.off&&talking(a.id,T))Fg.lippen(o,openAt(a.id,f));
   Fg.apply(RIGS[a.id],o,a);});
 const amp=stompAmp(T);
 (DB.kulisse.requisiten||[]).forEach((r,i)=>{const g=document.querySelector('#rq-'+i+' [data-bebt]');if(g)g.setAttribute('transform','translate(0 '+(-amp*(r.bebt||0)).toFixed(1)+')');});
 GEG.forEach(g=>{const p=gegAt(g,T,world);g.el.setAttribute('transform','translate('+p.x.toFixed(1)+','+p.y.toFixed(1)+') rotate('+p.r+') scale(0.92)');});
 OBJ.forEach(a=>{const b=objAt(a,T);show(a.el,!!b);if(b)a.el.setAttribute('transform','translate('+b.x.toFixed(1)+','+b.y.toFixed(1)+') rotate('+b.r.toFixed(1)+') scale(0.92)');});
 const cm=camAt(T);$('cam').setAttribute('transform',cm.str);
 let sg='';SIGNS.forEach((q,i)=>{if(T>=q[0]&&T<q[1])sg+=signSvg(q[2],q[3],q[4],q[5],i);});$('signs').innerHTML=sg;
 let bb='';DB.dialog.forEach((d,i)=>{if(d.text&&T>=d.von&&T<d.bis)bb+=bubbleSvg(cm,d,i);});$('bubble').innerHTML=bb;
 blendenAt(T);}
window.renderAt=renderAt;

/* ==== 7) PLAYER – Ton führt die Zeit, ohne Ton läuft eine Uhr ==== */
const au=$('au'),btn=$('play'),sl=$('seek'),tl=$('time');let lastF=-1,audioOK=false,playing=false,clock0=0,clockT=0;
function setStatus(){const st=$('status');let msg='Drehbuch '+DB.episode.id+' „'+DB.episode.titel+'“ · '+DB.besetzung.length+' Figuren · '+AKT.length+' Aktionen · ';
 msg+=audioOK?'Ton: geladen':'ohne Ton (Uhr läuft) – '+(DB.ton&&DB.ton.mix?DB.ton.mix+' neben die Datei legen oder ':'')+'„Ton laden“';
 if(FEHLT.size)msg+=' · Fehlt in der Bibliothek: '+[...FEHLT].join(', ');
 st.textContent=msg;st.className=FEHLT.size?'warn':'';}
function fmt(x){return Math.floor(x/60)+':'+String(Math.floor(x%60)).padStart(2,'0')+'.'+Math.floor((x%1)*10);}
function now(){return audioOK?au.currentTime:(playing?clockT+(performance.now()-clock0)/1000:clockT);}
function frame(){let T=now();if(T>=DUR&&playing){stop();T=DUR;}T=Math.min(T,DUR);const f=Math.floor(T*12);
 if(f!==lastF){renderAt(T);lastF=f;sl.value=T;tl.textContent=fmt(T)+' / '+fmt(DUR);}if(playing)requestAnimationFrame(frame);}
function stop(){playing=false;if(audioOK)au.pause();else clockT=Math.min(now(),DUR);btn.textContent='Abspielen';}
btn.onclick=()=>{if(playing){stop();return;}if(now()>=DUR)seekTo(0);playing=true;btn.textContent='Pause';
 if(audioOK)au.play();else clock0=performance.now();requestAnimationFrame(frame);};
function seekTo(T){if(audioOK)au.currentTime=T;clockT=T;clock0=performance.now();lastF=-1;}
sl.oninput=()=>{seekTo(parseFloat(sl.value));frame();};
au.oncanplay=()=>{audioOK=true;setStatus();};au.onerror=()=>{audioOK=false;setStatus();};au.onended=()=>stop();
function ladeFolge(db){stop();audioOK=false;DB=db;seekTo(0);sl.value=0;build();tl.textContent=fmt(0)+' / '+fmt(DUR);
 if(DB.ton&&DB.ton.mix){au.src=DB.ton.mix;au.load();}else au.removeAttribute('src');
 if(document.fonts&&document.fonts.ready)document.fonts.ready.then(()=>{drawLogos();lastF=-1;frame();});}
$('loadAudio').onchange=e=>{const fl=e.target.files[0];if(!fl)return;stop();au.src=URL.createObjectURL(fl);au.load();};
$('loadJson').onchange=e=>{const fl=e.target.files[0];if(!fl)return;const rd=new FileReader();
 rd.onload=()=>{try{ladeFolge(JSON.parse(rd.result));}catch(err){$('status').textContent='Drehbuch nicht lesbar: '+err.message;$('status').className='warn';}};rd.readAsText(fl);};
/* Folgen: im gebündelten Player als <script class="drehbuch"> eingebettet,
   auf GitHub Pages bzw. über einen Webserver aus drehbuecher/index.json geladen (Ton dann aus ton/). */
async function ladeFolgen(){const eing=[...document.querySelectorAll('script.drehbuch')].map(s=>JSON.parse(s.textContent));
 if(eing.length)return eing;
 const idx=await (await fetch('drehbuecher/index.json')).json();
 return Promise.all(idx.folgen.map(async f=>{const d=await (await fetch('drehbuecher/'+f.datei)).json();if(d.ton&&d.ton.mix)d.ton.mix='ton/'+d.ton.mix;return d;}));}
let FOLGEN=[];
ladeFolgen().then(F=>{FOLGEN=F;const sel=$('folge');
 FOLGEN.forEach((d,i)=>{const o=document.createElement('option');o.value=i;o.textContent=d.episode.id+' – '+d.episode.titel;sel.appendChild(o);});
 sel.onchange=()=>ladeFolge(FOLGEN[+sel.value]);
 const wahl=new URLSearchParams(location.search).get('folge');
 const start=Math.max(0,FOLGEN.findIndex(d=>d.episode.id===wahl));sel.value=start;
 ladeFolge(FOLGEN[start]);window.HAGNE_BEREIT=true;})
 .catch(err=>{$('status').textContent='Drehbücher nicht ladbar ('+err.message+'). Über einen Webserver öffnen oder den gebündelten Player nutzen.';$('status').className='warn';});
if(location.search.includes('render')){document.body.classList.add('render');}
