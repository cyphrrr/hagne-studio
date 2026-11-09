/* HAGNE-Studio · Bibliothek · Gesten
   GESTEN: Name -> (o,c)=>{…}. o ist die Pose, c der Kontext. Neue Gesten unten anhängen. */

/* ==== 5) GESTEN-BIBLIOTHEK  –  jede Geste verändert die Pose o – c = {T: Zeit, f: Bild, t: Zeit seit Beginn, d: Dauer, a: Aktion, self: Figur, world, seite} ==== */
function clamp(k){return Math.max(0,Math.min(1,k));}
function lerp(a,b,k){return a+(b-a)*clamp(k);}
function ease(k){k=clamp(k);return k*k*(3-2*k);}
function hs(n){const x=Math.sin(n*127.1+311.7)*43758.5453;return x-Math.floor(x);}
const BRAUEN={neutral:[0,0,0,0],muede:[1,6,1,6],locker:[-1,0,-1,0],genervt:[3,14,3,14],wach:[-4,0,-4,0],
 aufmerksam:[-3,0,-3,0],hoch:[-5,0,-5,0],staunen:[-8,0,-8,0],schief:[-3,-4,-3,-4]};
function brauen(w){return Array.isArray(w)?w.slice():(BRAUEN[w]||BRAUEN.neutral).slice();}

const GESTEN={
 'tippen':(o,c)=>{o.aR+=(c.f%2?-6:0);o.aL+=(c.f%2?0:4);},
 'winken':(o,c)=>{const up=ease(c.t/0.25),j=(c.f%3===0?12:c.f%3===1?-12:0)*up;
   if(c.a.arm==='links'){o.aL=150*up-j;o.aR=-4;}else{o.aR=-150*up+j;o.aL=4;}o.head=-2;o.br=[-6,0,-6,0];},
 'daumen-hoch':(o,c)=>{o.aL=4;o.aR=-125+(Math.floor(c.T*4)%2?-8:0);o.thumb=true;o.head=-1+Math.sin(c.T*3)*2;o.br=[-7,0,-7,0];},
 'arme-heben':(o,c)=>{const k=ease(c.t/(c.a.rampe||c.d));o.aR=-15-95*k;o.aL=15+95*k;o.hy=-2*k;o.br=[-4-5*k,0,-4-5*k,0];o.head=Math.sin(c.T*2)*1.5;},
 'huzzah':(o,c)=>{const hold=c.t<c.d-0.35,dn=hold?1:1-ease((c.t-(c.d-0.35))/0.35),up=ease(c.t/0.12);
   o.aR=(-110-55*up)*dn;o.aL=(110+55*up)*dn;const s=Math.sin(clamp(c.t/0.5)*Math.PI);
   o.y=(o.y||0)-14*s;o.lL=8*s;o.lR=-8*s;o.br=[-10,0,-10,0];o.ew=1.12;o.hy=-2;},
 'brauen':(o,c)=>{o.br=brauen(c.a.wert);},
 'kichern':(o,c)=>{const b=Math.floor(c.T*8)%2;o.es=0.45;o.y=(o.y||0)+(b?-2:0);o.head=b?2:-1;
   o.m=Math.floor(c.T*6)%2?4.5:2.2;o.mFix=true;o.br=[-3,-4,-3,-4];},
 'zucken':(o,c)=>{if(c.a.brauen)o.br=brauen(c.a.brauen);if(stompAmp(c.T)>1.5){o.ew=1.15;if(!c.a.brauen)o.br=[-4,0,-4,0];}},
 'blick':(o,c)=>{const z=c.a.ziel;
   if(z==='oben'){o.px=c.a.px||0;o.py=-3.5;o.hy=-2;o.ew=1.08;o.br=[-5,0,-5,0];return;}
   let dir;if(z==='rechts')dir=1;else if(z==='links')dir=-1;
   else{const w=c.world[z],tx=w&&!w.off?w.x:(ACT[z]?ACT[z].x:o.x);dir=Math.sign(tx-o.x)||1;}
   o.px=dir*(c.a.staerke||4);o.py=0;o.br=[-3,0,-3,0];},
 'augen-auf':(o)=>{o.ew=1.22;o.br=[-8,0,-8,0];},
 'stapfen':(o,c)=>{const k=c.t/c.d,w=Math.sin(c.t/(c.d/(c.a.schritte||6))*Math.PI);
   o.x=lerp(c.a.von_x,c.self.x,k);o.lL=w*10;o.lR=-w*10;o.aR=-w*8;},
 'kratzen-mund':(o,c)=>{const r=c.a.runter_ab;
   if(c.t<0.4)o.aR=-195*ease(c.t/0.4);else if(c.T<r)o.aR=-195+(c.f%2?7:-7);else o.aR=-195*(1-ease((c.T-r)/(c.a.bis-r)));},
 'fallen-lassen':()=>{},
 /* Nummer: gemeinsames Reagieren auf etwas, das herunterfällt */
 'nummer:reaktion-fall':(o,c)=>{const t=c.t,side=c.seite;
   if(t<0.6){const k=ease(t/0.5);o.py=lerp(-3.5,3.5,k);o.px=side*lerp(2,4,k);o.br=[-5,0,-5,0];return;}
   if(t<1.4){o.px=side*4;o.py=3.5;o.ew=1.2;o.br=[-5,0,-5,0];return;}
   if(t<2.2){o.px=side*2;o.py=-3.5;o.hy=-2;o.ew=1.1;o.br=[-6,0,-6,0];return;}
   if(t<3.0){o.px=side*4;o.py=0;o.head=side*3;o.br=[-2,0,-2,0];return;}
   if(t<3.6){o.px=side*4;o.head=side*3;const q=Math.floor((t-3.0)*12+1e-6);if(q===1||q===2||q===5||q===6)o.es=0.12;return;}
   if(t<4.2){o.px=0;o.py=0;o.head=0;o.br=[0,0,0,0];return;}
   o.shrug=true;o.px=0;o.py=0;o.hy=3;o.head=4*(side>0?1:-1);o.br=[-8,0,-8,0];o.es=0.6;}
};


/* ==== 5b) GESTEN aus „Götter der Selbstverteidigung“ – wiederverwendbar gehalten ==== */
const MUND={schief:'s',grinsen:'g',lachen:'y'};
const sgn=v=>v<0?-1:1;
Object.assign(GESTEN,{
 /* Gehen (überschreibt die E02-Fassung, gleiche Werte als Vorgabe) */
 'reinlaufen':(o,c)=>{const a=c.a,k=c.t/(a.rampe||c.d),w=Math.sin(c.T*(a.tempo||7.5)),sw=a.armschwung!==undefined?a.armschwung:7,ab=a.armbasis!==undefined?a.armbasis:4;
   o.x=lerp(a.von_x,c.self.x,k);if(k<1){o.y=(o.y||0)-Math.abs(w)*3;o.lL=w*16;o.lR=-w*16;o.aL=ab-w*sw;o.aR=-ab-w*sw;}o.px=a.px!==undefined?a.px:-2;},
 'schleichen':(o,c)=>{const a=c.a,k=c.t/(a.rampe||c.d),w=Math.sin(c.T*4.2),dir=sgn(c.self.x-a.von_x);
   o.x=lerp(a.von_x,c.self.x,k);o.y=(a.von_y!==undefined?lerp(a.von_y,0,c.t/0.5):0)-Math.abs(w)*4+(a.hoch||0);
   o.rot=a.neigung||0;o.lL=-dir*w*22;o.lR=dir*w*22;if(a.armschwung)o.aL=-10+w*a.armschwung;
   o.head=a.kopf||0;o.px=a.px||0;o.py=a.py||0;o.br=[2,8,2,8];},
 'fliehen':(o,c)=>{const a=c.a,k=c.t/(a.rampe||c.d),rw=Math.sin(c.T*14),dir=sgn(a.nach_x-(a.von_x!==undefined?a.von_x:c.self.x));
   o.x=lerp(a.von_x!==undefined?a.von_x:c.self.x,a.nach_x,k);o.y=-Math.abs(rw)*5;o.rot=10*dir;o.lL=-dir*rw*32;o.lR=dir*rw*32;o.aL=dir*rw*40;o.aR=-dir*rw*40;
   o.ew=1.4;o.m=7;o.px=4*dir;o.br=[-8,0,-8,0];},
 'ausrutschen':(o,c)=>{const a=c.a,k=clamp(c.t/c.d);o.x=lerp(a.von_x,a.nach_x,k);o.y=lerp(0,a.hoch||-36,k)-Math.sin(k*Math.PI)*22;
   o.rot=lerp(10,-90,k*k);o.lL=40*k;o.lR=55*k;o.aL=110*k;o.aR=-90*k;o.ew=1.4;o.m=8;o.br=[-8,0,-8,0];},
 'liegen-glotzen':(o,c)=>{o.x=c.a.x;o.y=c.a.hoch||-36;o.rot=-90+Math.sin(c.T*3)*2;o.lL=30;o.lR=45;o.aL=95;o.aR=-70;
   if(c.f%17===0)o.es=0.15;else o.ew=1.45;o.m=8.5;o.py=-3;o.head=6;o.br=[-9,0,-9,0];},
 /* Blicke und Mimik */
 'umherschauen':(o,c)=>{const M=c.a.muster||[-2,0,0,2];o.px=M[Math.floor(hs(Math.floor(c.T*(c.a.tempo||1.3)))*M.length)];},
 'hin-und-her':(o,c)=>{o.px=Math.floor(c.T*(c.a.tempo||1.6))%2?(c.a.weite||3):-(c.a.weite||3);},
 'kopf-neigen':(o,c)=>{o.head=lerp(c.a.von_grad||0,c.a.nach_grad||0,c.t/(c.a.rampe||c.d));},
 'mund':(o,c)=>{o.m=MUND[c.a.wert]||c.a.wert;if(c.a.brauen)o.br=brauen(c.a.brauen);},
 'brillenblitz':o=>{o.glint=true;},
 'auftauchen':(o,c)=>{const a=c.a,T=a.tiefe||[120,0];o.x=a.x;o.y=lerp(T[0],T[1],c.t/(a.rampe||1));
   let px=0;(a.blickfolge||[]).forEach(b=>{if(c.T>b[0])px=b[1];});o.px=px;if(a.brauen)o.br=brauen(a.brauen);},
 'hehehe':(o,c)=>{const f=c.f;o.es=0.45;o.br=[-2,-6,-2,-6];o.head=f%2?3:-2;o.y=(o.y||0)-(f%2)*2;
   o.m=[3,6,2.5,5.5,3.5][Math.floor(hs(f)*5)];o.aL=12;},
 'glotzen':(o,c)=>{o.x+=(c.f%2?1.2:-1.2)*c.seite;o.ew=1.35;o.m=6;o.px=3*c.seite;o.br=[-8,0,-8,0];},
 'schreck-sprung':(o,c)=>{const h=c.a.hoehe||16,j=Math.sin(clamp(c.t/c.d)*Math.PI);o.y=-h*j;o.ew=1.4;o.m=7;
   o.aL=h*3.5;o.aR=-h*3.5;o.lL=-h*0.85;o.lR=h*0.85;o.px=4*c.seite;o.br=[-8,0,-8,0];if(c.a.hut_hoch)o.hat=-c.a.hut_hoch*j;},
 'tragen':()=>{},
 /* Spocks Kampfkunst (Gürtel: swL/swR drehen die Gürtel an den Händen) */
 'ausholen':(o,c)=>{const k=clamp(c.t/(c.a.rampe||0.4));o.aL=4+22*k;o.aR=-o.aL;o.br=[2,12,2,12];o.head=-3;},
 'guertel-zeigen':o=>{o.belts=true;},
 'guertel-reissen':(o,c)=>{const k=clamp(c.t/0.2);o.aL=26+84*k;o.aR=-o.aL;o.swL=20-80*(1-k);o.swR=-o.swL;o.y=-4;o.m='g';o.br=[-4,0,-4,0];},
 'ninja-arme':(o,c)=>{const P=c.a.posen,n=c.a.bilder_je_pose||3,q=Math.floor(c.f/n),p=P[q%P.length];
   o.aL=p[0];o.aR=p[1];o.swL=Math.sin(c.T*9)*25;o.swR=-o.swL;o.y=-(q%2?5:0);o.br=[2,12,2,12];o.head=q%2?-4:4;},
 'kranich':(o,c)=>{const T=c.T,w=Math.sin(T*5),s=c.a.schleudern;o.aL=92+w*8;o.aR=-(92-w*8);o.lL=36+w*5;o.y=-6+w*1.5;o.head=-3+w*3;o.br=[-2,10,-2,10];
   if(c.a.mund)o.m=MUND[c.a.mund]||c.a.mund;
   if(s!==undefined&&T>=s&&T<s+0.4){o.swL=(T-s)*900;o.swR=-o.swL;o.m='g';}else{o.swL=Math.sin(T*3)*12;o.swR=-o.swL;}},
 'lachen':(o,c)=>{o.m='g';o.head=Math.sin(c.T*3)*3;o.br=[-5,0,-5,0];},
 'arme-reissen':(o,c)=>{const k=clamp(c.t/(c.a.rampe||0.3));o.aL=4+((c.a.ziel||158)-4)*k;o.aR=-o.aL;},
 'jubel':(o,c)=>{const T=c.T;o.aL=158;o.aR=-158;o.m='g';o.y=-Math.abs(Math.sin(T*6))*4;o.head=Math.sin(T*4)*4;o.swL=Math.sin(T*4)*10;o.swR=-o.swL;o.br=[-6,0,-6,0];},
 'wirbeln':(o,c)=>{const f=c.f,q=Math.floor(f/2),T=c.T;o.aL=60+hs(q)*110;o.aR=-(60+hs(q+77)*110);o.swL=f*67;o.swR=-f*76;
   o.y=-Math.abs(Math.sin(T*8))*5;o.head=Math.sin(T*9)*6;o.br=[4,14,4,14];o.m='g';},
 'triumph':(o,c)=>{const w=Math.sin(c.T*3);o.aL=135+w*4;o.aR=-135+w*4;o.swL=w*8;o.swR=-w*8;o.m='g';o.br=[-5,0,-5,0];}
});

/* ==== 5c) GESTEN für die Orga-Figuren (KickASS, m0og, Deichshaf, Spallter, DrBier) ==== */
Object.assign(GESTEN,{
 /* Arm in eine feste Pose drehen; mit Ellbogengelenk (Deichshaf) auch den Unterarm.
    Bewährt: Prost [-60,-60] rechts, Tasse zum Mund [96,94] rechts, Funk am Ohr [-172,0] rechts */
 'arm-pose':(o,c)=>{const a=c.a,r=a.rampe!==undefined?a.rampe:0.3,k=r>0?ease(c.t/r):1,L=a.arm==='links';
   if(L){o.aL=lerp(o.aL||0,a.schulter||0,k);o.aLf=lerp(o.aLf||0,a.ellbogen||0,k);}else{o.aR=lerp(o.aR||0,a.schulter||0,k);o.aRf=lerp(o.aRf||0,a.ellbogen||0,k);}},
 'faust-schuetteln':(o,c)=>{const f=c.f;o.aR=-60+(hs(f)-0.5)*30;o.aL=8;o.head=(o.head||0)+(hs(f+3)-0.5)*4;const j=(hs(f+7)-0.5)*6;o.br=[4,28+j,4,28-j];},
 'rot-werden':(o,c)=>{o.wangen=lerp(c.a.von||0,c.a.wert!==undefined?c.a.wert:0.6,c.t/(c.a.rampe||c.d));},
 'trinken':(o,c)=>{o.trinkt=true;o.es=0.12;o.head=-4;o.br=[-5,-6,-5,-6];o.mFix=true;o.m=1.6;},
 'flasche-schuetteln':(o,c)=>{o.trinkt=true;o.schuetteln=true;o.px=-3;o.py=-2;o.br=[-7,-14,-7,-14];o.m=3;o.mFix=true;},
 'zeigefinger':(o,c)=>{o.zeigefinger=true;o.aR=-65+Math.sin(c.T*5)*6;o.head=Math.sin(c.T*3)*4;o.br=[-3,10,-3,10];},
 'hintern-kratzen':(o,c)=>{o.spezial='kratzen';o.head=3;o.px=2;o.py=-2;o.br=[-6,-6,2,6];},
 'finger-riechen':(o,c)=>{o.spezial='riechen';o.head=Math.floor(c.T*4)%2?-2:0;o.es=0.12;o.br=[-8,-12,-8,-12];o.m=1;o.mFix=true;}
});

/* ==== 5d) Bausteine für frei gebaute Abläufe (aus E03 „Werbunk“) ====
   Damit lässt sich fast jede Bewegung ohne neue Geste beschreiben:
   pose = feste Werte (über "pose"), uebergang = weicher Wechsel von "ab" nach "ziel",
   wippen / kopf-wiegen / schwingen = gleichmäßige Bewegung über die ganze Aktion. */
Object.assign(GESTEN,{
 /* Nur das Feld "pose" der Aktion zählt (z. B. Mikro in die Hand, Mund, Augen, Flasche) */
 'pose':()=>{},
 /* Zahlenfelder weich von "ab" (fehlt: aktueller Wert) nach "ziel" führen, Dauer "rampe" (Vorgabe: ganze Aktion).
    Felder z. B. aL, aLf, aR, aRf (Arme mit Ellbogen), head, hy, px, py, y, flasche_kipp */
 'uebergang':(o,c)=>{const a=c.a,ab=a.ab||{},z=a.ziel||{},r=a.rampe!==undefined?a.rampe:c.d,k=r>0?ease(c.t/r):1;
   Object.keys(z).forEach(n=>{const v0=ab[n]!==undefined?ab[n]:(o[n]||0);o[n]=v0+(z[n]-v0)*k;});},
 /* Körper wippt: "welle" = gerundeter Sinus (Vorgabe), "takt" = abwechselnd 0 und weite */
 'wippen':(o,c)=>{const a=c.a,w=a.weite!==undefined?a.weite:1,tp=a.tempo||1.3;
   o.y=(o.y||0)+(a.art==='takt'?(Math.floor(c.T*tp)%2)*w:Math.round(Math.sin(c.T*tp)*w));},
 /* Kopf wiegt hin und her; "hoch" lässt ihn dabei leicht hüpfen */
 'kopf-wiegen':(o,c)=>{const a=c.a,s=Math.sin(c.T*(a.tempo||3));o.head=s*(a.weite!==undefined?a.weite:2);if(a.hoch)o.hy=-Math.round(Math.abs(s)*a.hoch);},
 /* Ein beliebiges Zahlenfeld pendelt um "mitte" */
 'schwingen':(o,c)=>{const a=c.a;o[a.feld]=(a.mitte||0)+Math.sin(c.T*(a.tempo||3))*(a.weite!==undefined?a.weite:1);}
});
