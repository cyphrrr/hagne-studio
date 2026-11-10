# HAGNE – Figuren-Baukasten Version 2

> **Hinweis fürs Studio-Repo:** Diese Regeln stammen aus dem Claude-Projekt „JUNIEN“ (dort `cartoon/VERSION-2.md`). Die Pfade unten (`cartoon/…`) beziehen sich auf die Projekt-Dokumente. Im Repo liegt der V2-Baukasten in `bibliothek/figuren-v2.js`. Seit November 2026 sind alle Figuren der Bibliothek Version 2; den alten V1-Baukasten gibt es nicht mehr. Kippen (`rot`), Augen weiten/zukneifen (`ew`/`es`), Mundformen (`s`/`g`/`y`) und `hand_rechts` kann jede V2-Figur. Das Ellbogengelenk (Baustein 9) ist dort noch nicht eingebaut. „Zurückschreiben“ heißt im Repo: als Datei liefern bzw. per Pull Request einreichen.

**Stichwort:** `Bau den Char in Version 2!`

Wenn dieses Stichwort in einem Figuren-Chat fällt, wird die Figur dieses Chats auf Version 2 umgebaut, und zwar nach dieser Anleitung. Die verbindliche Referenz ist der Baukasten in `cartoon/HALLE-AUSSEN-01.html` mit KickASS, m0og und cypheR. Der Code wird von dort übernommen und nicht neu erfunden.

Beschlossen im Nov. 2026, durchgespielt an m0og.

---

## Ablauf im Figuren-Chat

Schritt für Schritt vorgehen und nach jedem Schritt kurz zeigen und fragen.

1. **Lesen:** die eigene Figurendatei (z. B. `cartoon/FIGUR-SPALLTER.html`) und `cartoon/HALLE-AUSSEN-01.html`. Beide stehen als Projekt-Dokumente bereit.
2. **Umbauen:** die Bausteine unten übernehmen. Bei Sonderkörpern gilt der Abschnitt „Sonderkörper“.
3. **Prüfen:** rendern und dabei die Arme in mehreren Winkeln ansehen (0°, ±80°, ±150°), dazu alle Sonder-Posen der Figur und das Kinn mit dem Bart.
4. **Zeigen:** Julian die Figur vorher/nachher zeigen und sein Feedback einarbeiten.
5. **Zurückschreiben:** nach seinem OK unter **demselben Pfad** ins Projekt schreiben, keine Kopie anlegen. Im Kopfkommentar der Datei „Version 2“ vermerken.

---

## Was sich ändert

| # | Baustein | Version 1 | Version 2 |
|---|---|---|---|
| 1 | Hilfsfunktion | – | `roundPoly()` und `rr()` rundet Ecken ab |
| 2 | Kopf | Viereck, klobiges Kinn | **B · Ei**: verjüngt sich zum runden Kinn |
| 3 | Nase | ganzes Dreieck, flach | **N1**: nur die rechte Hälfte als Schatten, **kein Nasenloch** |
| 4 | Körper | harte Rechtecke | Rumpf mit weichen Schultern, Arme, Beine und Schuhe abgerundet |
| 5 | Arme | Rechteck, Drehpunkt an der Oberkante, nur rechter Arm beweglich | **Schultergelenk**: Ärmel oben als Halbkreis um den Drehpunkt, beide Arme beweglich |
| 6 | Vollbart | eckig, breiter als das Kinn | folgt der Ei-Form, Unterkante gerundet |
| 7 | Animation | `rotate(w 43 -150)` | `rotate(w)` auf der inneren Arm-Gruppe |
| 8 | Klebestreifen am Kinn | `tape(-40,-160,30,9,-28)` am Ende von `makeChar` | **entfällt ersatzlos** |
| 9 | Ellbogen | Arm immer gestreckt | **Ellbogengelenk** (`armJ`): Unterarm dreht um den Ellbogen, Arm kann einknicken |

**Unverändert bleiben:** ROUGH = 0.2, der Collage-Schatten in `piece()`, Mund, Farben, Frisuren, Accessoires, Logo (immer auf Brusthöhe, y −127) und das Klebeband in Kulissen und Sprechblasen. Frisuren, Bärte und Accessoires werden nur darauf geprüft, ob sie zur schmaleren Kinnpartie passen.

---

## Bausteine (1:1 aus HALLE-AUSSEN-01)

### 1 · Ecken abrunden

```js
function roundPoly(pts,r,n){n=n||5;const o=[];const L=pts.length;
for(let i=0;i<L;i++){const p0=pts[(i-1+L)%L],p1=pts[i],p2=pts[(i+1)%L];const rr=Array.isArray(r)?r[i]:r;
const d1=Math.hypot(p1[0]-p0[0],p1[1]-p0[1]),d2=Math.hypot(p2[0]-p1[0],p2[1]-p1[1]);const k=Math.min(rr,d1/2,d2/2);
if(k<=0){o.push(p1);continue;}
const a=[p1[0]+(p0[0]-p1[0])*k/d1,p1[1]+(p0[1]-p1[1])*k/d1],b=[p1[0]+(p2[0]-p1[0])*k/d2,p1[1]+(p2[1]-p1[1])*k/d2];
for(let j=0;j<=n;j++){const t=j/n,u=1-t;o.push([u*u*a[0]+2*u*t*p1[0]+t*t*b[0],u*u*a[1]+2*u*t*p1[1]+t*t*b[1]]);}}return o;}
function rr(x,y,w,h,r){return roundPoly(rect(x,y,w,h),r);}
```

`r` ist entweder eine Zahl oder ein Array mit einem Radius pro Ecke, in derselben Reihenfolge wie `pts`.

### 2 · Kopf B · Ei

```js
const HEAD_V2=roundPoly([[-33,-238],[33,-238],[39,-205],[30,-167],[11,-155],[-11,-155],[-30,-167],[-39,-205]],[13,13,14,14,10,10,14,14]);
// im Kopf: s+=piece(HEAD_V2,sk,2.6);   (ersetzt das alte Viereck [[-34,-236],[34,-238],[38,-160],[-36,-158]])
```

### 3 · Nase N1

```js
const NOSE_V2=()=>flat([[0,-197],[6,-184],[0,-184]],'rgba(140,70,40,0.42)',0.5);
// ersetzt: flat([[0,-197],[6,-184],[-5,-184]],'rgba(140,70,40,0.35)',0.5)
```

Kein Nasenloch und keine Kerbe: Das wurde ausprobiert und verworfen.

### 4 · Körper

```js
const TORSO_V2=roundPoly([[-34,-155],[34,-155],[42,-66],[-42,-66]],[13,13,4,4]);
const box=(x,y,w,h)=>rr(x,y,w,h,4.5);                                   // Beine, Shorts, Hals
const shoe=(x,y,w,h)=>roundPoly(rect(x,y,w,h),[x<0?6:2,x<0?2:6,1,1]);   // Schuhspitze außen rund
```

### 5 · Schultergelenk

```js
const SHOULDER={x:40,y:-145,r:7};
function sleevePts(r,len){const p=[];for(let a=180;a<=360;a+=15){const t=a*Math.PI/180;p.push([Math.cos(t)*r,Math.sin(t)*r]);}
 p.push([r,len-4],[r-1,len],[-r+1,len],[-r,len-4]);return p;}
function armV2(shirt,sk){return piece(sleevePts(SHOULDER.r,35),shirt)+piece(rr(-6,33,12,24,4.5),sk)+piece(circ(0,61,9),sk);}
function armAt(id,side,shirt,sk){return '<g transform="translate('+(side*SHOULDER.x)+' '+SHOULDER.y+')"><g id="'+id+'">'+armV2(shirt,sk)+'</g></g>';}
// Reihenfolge in makeChar: Beine, Schuhe, armAt(id+'-al',-1,…), Rumpf, Logo, armAt(id+'-ar',1,…), Hals, Kopf
```

**Prinzip:** Der Arm wird lokal um (0,0) gebaut und hängt bei 0° nach unten. Oben endet der Ärmel in einem Halbkreis, dessen Radius der halben Ärmelbreite entspricht und dessen Mittelpunkt der Drehpunkt ist. So bleibt der Umriss bei jedem Winkel geschlossen. Das Gelenk sitzt 3 px innerhalb der alten Armkante und überlappt den Rumpf. Der linke Arm liegt hinter dem Rumpf, der rechte davor.

### 6 · Vollbart

```js
function beardFull(base,light,dark){return ()=>{let s=piece(roundPoly([[-37,-192],[-30,-189],[-20,-180],[20,-180],[30,-189],[37,-192],[33,-166],[17,-150],[0,-145],[-17,-150],[-33,-166]],[2,3,3,3,3,2,9,9,8,9,9]),base,2);
s+=flat(circ(-22,-166,3),light)+flat(circ(14,-156,2.5),light)+flat(circ(25,-172,2.5),dark)+flat(circ(-8,-152,2.5),dark)+flat(circ(4,-162,2),light)+flat(circ(-28,-178,2),light);return s;};}
```

Für andere Bartformen wie Goatee oder Kinnbart gilt: Seitlich darf der Bart nicht über die Ei-Kontur hinausstehen. Zur Orientierung liegt die Kontur bei y −167 etwa bei ±30 und bei y −155 etwa bei ±11. Nach unten darf der Bart über das Kinn hängen.

### 7 · Animation

```js
// refs: zusätzlich al:$(c.id+'-al')
r.ar.setAttribute('transform','rotate('+arm+')');    // rechts: 0 = hängend, negativ = nach außen/oben
r.al.setAttribute('transform','rotate('+armL+')');   // links:  0 = hängend, positiv = nach außen/oben
```

Vorhandene Winkelwerte aus Version 1 können bleiben, weil die Richtung gleich ist.

### 8 · Kein Klebestreifen am Kinn

Beschlossen am 6. Nov. 2026: Der Tesafilm-Streifen am Kinn bzw. Hals der Figuren fällt weg und spielt künftig keine Rolle mehr.

```js
// diese Zeile am Ende von makeChar ersatzlos löschen:
s+=tape(-40,-160,30,9,-28);
```

- Gilt für **alle** Figuren: Baukasten-Figuren, Sonderkörper und jede neue Figur. Auch keine Varianten davon an Kinn, Hals oder Kopf.
- Die Funktion `tape()` selbst bleibt erhalten. Sie wird weiter für Kulissen (Schilder, Logo-Tafel) und Sprechblasen gebraucht.

### 9 · Ellbogengelenk

Beschlossen am 6. Nov. 2026, erstmals gebaut an Deichshaf (`cartoon/FIGUR-DEICHSHAF.html`: Kaffee trinken, Daumen hoch, Prost).

Wird gebraucht, sobald eine Figur den Arm einknickt, z. B. etwas zum Gesicht führt, Daumen hoch zeigt oder winkt. `armJ` ersetzt `armAt` 1:1: Bei Ellbogen 0° sieht der Arm genauso aus wie vorher, Maße und Handposition (0,61) bleiben gleich.

```js
/* Ellbogen sitzt bei (0,33) im Arm, Unterarm lokal um den Ellbogen gebaut, Hand bei (0,28) → zusammen wieder 61 */
const ELBOW=33,FORE=28;let EDGE=null;   // EDGE: optionale Ärmelkante, nur für dunkle Shirts
function armJ(id,side,shirt,sk,extra){
 return '<g transform="translate('+(side*SHOULDER.x)+' '+SHOULDER.y+')"><g id="'+id+'">'+
  '<g transform="translate(0 '+ELBOW+')"><g id="'+id+'-f">'+piece(sleevePts(6,24),sk)+piece(circ(0,FORE,9),sk)+(extra||'')+'</g></g>'+
  piece(sleevePts(SHOULDER.r,35),shirt)+(EDGE?'<path d="'+poly(sleevePts(SHOULDER.r,35),0.4)+'" fill="none" stroke="'+EDGE+'" stroke-width="1.3"/>':'')+'</g></g>';}
/* Handposition im Figurenraum: für Teile, die vor dem Kopf liegen müssen (Tasse, Dose …) */
function handPos(side,th,e){const a=th*Math.PI/180,b=(th+e)*Math.PI/180;
 return [side*SHOULDER.x-ELBOW*Math.sin(a)-FORE*Math.sin(b),SHOULDER.y+ELBOW*Math.cos(a)+FORE*Math.cos(b)];}
// in makeChar: armJ(p.id+'-al',-1,p.shirt,sk,extraL) / armJ(p.id+'-ar',1,p.shirt,sk,extraR) statt armAt(…)
```

```js
// Animation: Arm-Pose = [Schulter, Ellbogen]
r.ar.setAttribute('transform','rotate('+aR[0]+')');  r.arf.setAttribute('transform','rotate('+aR[1]+')');   // arf = $(id+'-ar-f')
r.al.setAttribute('transform','rotate('+aL[0]+')');  r.alf.setAttribute('transform','rotate('+aL[1]+')');   // alf = $(id+'-al-f')
```

**Prinzip:** wie beim Schultergelenk. Der Unterarm wird lokal um den Ellbogen (0,0) gebaut und endet oben in einem Halbkreis um den Drehpunkt (Radius = halbe Unterarmbreite, 6). Zusammen mit dem Rechteck darunter deckt er bei jedem Winkel eine volle Scheibe um das Gelenk ab, es entsteht also nie eine Lücke. Der Unterarm liegt **unter** dem Ärmel, der Ärmelsaum verdeckt das Gelenk.

**Richtung:** Der Ellbogenwinkel dreht in derselben Richtung wie die Schulter. Gesamtrichtung des Unterarms = Schulter + Ellbogen.

**Bewährte Posen (Deichshaf):**

| Pose | Arm | Schulter | Ellbogen |
|---|---|---|---|
| Tasse zum Mund | rechts | 96 | 94 |
| Prost / Tasse seitlich hoch | rechts | −60 | −60 |
| Daumen hoch | links | 50 | 70 |

**Teile in der Hand:**
- **Muss nach oben zeigen** (Daumen, Dose, Schild): über `extra` in die Unterarm-Gruppe bei (0,28) hängen und mit `rotate(-(Schulter+Ellbogen))` gegendrehen.
- **Muss vor dem Gesicht liegen** (Tasse beim Trinken): Der Arm liegt hinter dem Kopf, also das Teil als eigene Lage ganz am Ende von `makeChar` zeichnen und per `handPos()` an die Hand setzen.

**Ärmelkante `EDGE`:** nur setzen, wenn Shirt und Ärmel dunkel sind und der Arm vor dem Rumpf einknickt, z. B. `EDGE='#45453F'` bei Schwarz. Sonst verschwindet der Arm optisch im Shirt.

---

## Sonderkörper

Version 2 heißt bei Sonderkörpern, die Prinzipien anzuwenden, nicht die Maße zu übernehmen.

- **Kopf:** Wenn die Figur den Baukasten-Kopf nutzt, wie z. B. Spallter, wird `HEAD_V2` und `NOSE_V2` 1:1 übernommen. Hat die Figur einen eigenen Kopf, werden die Ecken mit `roundPoly` gerundet, und das Kinn bekommt die größten Radien.
- **Körper:** Die eigenen Proportionen bleiben, also sehr dünn, sehr groß usw. Nur die Ecken werden mit `roundPoly` und `rr` weicher.
- **Arme:** Das Schultergelenk-Prinzip gilt für jede Armbreite. Der Halbkreis-Radius ist die halbe Ärmelbreite, der Drehpunkt liegt in dessen Mitte, knapp innerhalb der Rumpfkante. Der Arm wird lokal um (0,0) gebaut und mit `translate` an die Schulter gesetzt.
- **Sonder-Posen** wie Kratz-Arm oder Riech-Arm: Die Pose behält ihre Form. Ihr oberes Segment muss aber am Schultergelenk beginnen, also am selben Drehpunkt mit Halbkreis-Ende. Weitere Gelenke wie Ellbogen werden nach Baustein 9 gebaut: Segmentende als Halbkreis um den Drehpunkt. Bei anderen Armlängen `ELBOW` und `FORE` anpassen.
- **Kopf nie im Bild** (DrBier-Riese): Nur Körper und Arme werden umgebaut. Der Klebestreifen am Kinn fällt auch hier weg.

---

## Abnahme-Checkliste

- [ ] Kinn rund, kein Viereck mehr
- [ ] Nase nur als rechte Schattenhälfte, ohne Nasenloch
- [ ] Bart steht seitlich nicht über die Kopfkontur
- [ ] kein Klebestreifen am Kinn
- [ ] Arme bei 0°, ±80° und ±150° ohne Lücke an der Schulter
- [ ] beide Arme beweglich
- [ ] falls Ellbogen genutzt: Unterarm bei 0°, ±90° und ±150° ohne Lücke am Ellbogen
- [ ] Sonder-Posen starten am Schultergelenk
- [ ] keine JS-Fehler, 12 fps unverändert
- [ ] unter demselben Pfad zurück ins Projekt geschrieben, Kopfkommentar mit „Version 2“

## Augen und Brillen (seit November 2026)

Alle Figuren haben denselben Augensatz, so wie sie dieselben Mundbilder haben. Er steht einmal in `bibliothek/figuren-v2.js`:

- **Augen:** `augen(id)` zeichnet zwei hochovale, leicht zueinander geneigte Augen ohne Collage-Schatten mit kleiner Pupille. Die Maße stehen in `AUGE` (Mitte, Halbachsen, Neigung, Pupille, Brauenposition). Wer die Augen ändern will, ändert nur `AUGE`.
- **Brauen** sitzen auf `AUGE.braue` / `AUGE.braueY`.
- **Brillen:** `brille('dick')` und `brille('duenn')` sind die beiden schwarzen Rahmen. Zwei Gläser mit abgerundeten Ecken, Steg, Bügel. Die Brille rechnet ihre Größe aus `AUGE` und sitzt damit immer um die Augen. Andere Farbe: `brille('duenn',{farbe:'#C9A04A'})` (m0og).
- **Eigene Brillenformen** (PoBi Halbrand, Spock Sonnenbrille) bleiben erlaubt, brauchen aber Steg und Bügel und müssen die Augen ganz umschließen. Maße dafür liefert `brilleMasse()`.
- **Regel:** Passt eine Brille oder Maske nicht zu den Augen, wird sie angepasst – nicht die Augen.

Wer trägt was: dick – cypheR, Marlec. Dünn – RamShadow, Spallter (dunkelbraun), m0og (gold).
