/* HAGNE-Studio · Bibliothek · Gegenstände
   GEGENSTAENDE: kleine Dinge in der Hand oder zum Fallenlassen. GEGENSTAND_ARTEN: tragbare Objekte mit Tragehöhe. */

/* Bierflasche des DrBier-Riesen (E02) */
function rBottle(){let s='';
s+=piece(rect(-6,-24,12,24),'#6B3A12',1);
s+=piece([[-6,-24],[6,-24],[2.6,-33],[-2.6,-33]],'#6B3A12',0.8);
s+=piece(rect(-2.6,-41,5.2,9),'#6B3A12',0.6);
s+=flat(rect(-3.2,-43.5,6.4,3),'#D9B13A',0.4);
s+=flat(rect(-5.5,-18,11,9),'#F3E6C4',0.6)+flat(rect(-5.5,-14.6,11,2),'#C8302A',0.3);
s+=flat(rect(-3.8,-22,1.6,18),'rgba(255,240,210,0.35)',0.3);
return s;}

function bottle(){return piece(rect(-2.6,-16,5.2,12),'#5B3A1A',0.4)+piece(rect(-3,-19,6,4),'#E8B10A',0.3)+piece([[-6,-3],[6,-3],[7,3],[7,28],[-7,28],[-7,3]],'#5B3A1A',0.8)+flat(rect(-6,8,12,9),'#FBFAF5',0.4);}
function crate(){seed=901;let s='';
 for(let i=0;i<5;i++){const x=-38+i*19;s+=piece(rect(x-4,-22,8,16),'#5B3A1A',0.6)+piece(rect(x-3.5,-27,7,6),'#E8B10A',0.4);}
 s+=piece(rect(-50,-8,100,42),'#C23A2E',1.6)+flat(rect(-26,-3,52,7),'#8E2620',0.6);
 s+=piece(rect(-36,9,72,20),'#FBFAF5',1)+'<text x="0" y="21" text-anchor="middle" font-size="11" font-weight="800" fill="#C23A2E" '+F+'>ORGA-BIER</text>';
 s+='<text x="0" y="27.5" text-anchor="middle" font-size="5.5" font-weight="700" fill="#2C2C2A" '+F+'>Finger weg!</text>'+tape(-44,6,14,6,-30);return s;}
const GEGENSTAND_ARTEN={'orga-bierkasten':{build:crate,trage_hoehe:77.3}};

const GEGENSTAENDE={'bierflasche':rBottle,'bierflasche-klein':bottle};
