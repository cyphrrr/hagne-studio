# HAGNE-Drehbuch – Format 0.2

Ein Drehbuch beschreibt eine Szene vollständig als Daten. Gezeichnet wird immer mit der gemeinsamen Bibliothek (`bibliothek/`), abgespielt mit dem Player (`index.html`). Wer eine Folge baut, schreibt also nur JSON – Code entsteht nur, wenn ein Baustein in der Bibliothek fehlt.

Referenzen: `drehbuecher/e02-turnierbuero.json` (ruhig, Sprechblasen, V2-Figuren), `drehbuecher/guertel.json` (viel Choreografie, Blenden, Spock und Bierdiebe) und `drehbuecher/e03-werbunk.json` (fünf Szenen mit harten Schnitten, eine Figur, Abläufe aus Bausteinen).

## Grundregeln

- **Zeiten** in Sekunden ab Szenenbeginn. Der Player rastet auf **12 fps** ein (Legetrick).
- **Bühne:** 680 × 420 Weltkoordinaten. x nach rechts, y nach unten. Der Boden der Figuren liegt meist bei y 390 (vorne 420).
- **Später gewinnt:** Überlappen sich Aktionen einer Figur, setzt die weiter unten stehende ihre Werte zuletzt.
- **Spitznamen** statt Klarnamen, Shirt-Aufdruck immer `['ju:nien]`.
- Alles ist deterministisch – gleiche Zeit, gleiches Bild. Kein `Math.random()` in der Bibliothek, sondern `R()` (mit `seed`) oder `hs(n)`.

## Aufbau

```json
{
  "format": "hagne-drehbuch/0.2",
  "episode":   { "id": "E02", "titel": "Das Turnierbüro", "dauer": 29.9, "fps": 12, "bild": "16:9" },
  "kulisse":   { "id": "HALLE-VOLL-01", "licht": "nacht", "requisiten": [ … ] },
  "szenen":    [ … ],
  "gegenstaende": [ … ],
  "besetzung": [ … ],
  "ton":       { "mix": "e02.mp3", "lippen": "aus_ton" },
  "blenden":   [ … ],
  "dialog":    [ … ],
  "aktionen":  [ … ],
  "effekte":   [ … ],
  "kamera":    [ … ],
  "schilder":  [ … ],
  "analyse":   { "pegel": { … } }
}
```

### kulisse

| Feld | Bedeutung |
|---|---|
| `id` | Kulisse aus `bibliothek/kulissen.js`: `HALLE-VOLL-01` (Halle mit Gästen), `HALLE-LEER-01` (Halle ohne Gäste), `HALLE-AUSSEN-01` (Vorplatz), `FOYER-01` (Säulen, Klinker), `THEKE-01` (Foyer mit Theken), `FELSHANG-01` (Hang unterhalb der Halle) |
| `licht` | `nacht` (dunkle Schatten, Halle) oder `tag` (warme, helle Schatten) |
| `requisiten` | Liste: `{ "id", "x", "z", … }`. Vorhanden: `gaming-stuhl`, `tisch-turnierbuero` (`bebt`: hüpft beim Stampfen), `busch` (`x`, `boden`, `breite`, `seed`), `tresen` (Theke „Bier kalt“, zu THEKE-01), `tisch-pc` (Spieltisch mit PC, zu HALLE-LEER-01), `stuhl-gruen` (`x`, `boden`: Lehne hinter einer sitzenden Figur, `z` −1), `tischmikro` (`x`, `y`: Mikrofonkopf, z. B. auf einer Flasche) |

### szenen (mehrere Schauplätze)

Ohne `szenen` gilt `kulisse` für die ganze Folge. Mit `szenen` wird bei jedem Wechsel **hart geschnitten**: neue Kulisse, neue Requisiten, Figuren an neuen Plätzen.

```json
{ "id": "S4-HALLE", "von": 23.76, "bis": 30.96,
  "kulisse": { "id": "HALLE-LEER-01", "licht": "tag", "requisiten": [ { "id": "tisch-pc", "z": -2 } ] },
  "besetzung": { "ds": { "x": 420, "haltung": "sitzt" } } }
```

- Szenen schließen lückenlos aneinander an (`bis` = `von` der nächsten), die erste beginnt bei 0.
- `besetzung` in der Szene überschreibt Felder der Figur nur für diese Szene (`x`, `boden`, `haltung`, `z`, Grundpose …).
- Aktionen, Dialog und Kamera bleiben in den Listen der Folge (Zeiten ab Folgenbeginn). Eine Kamera-Einstellung je Szene ist üblich. Aktionen sollten nicht über einen Schnitt reichen – `pruefen.py` warnt.

### episode

`id`, `titel`, `dauer` (s), `fps` (12), `bild` (`16:9`). Optional `schleife: true` – der Player fängt am Ende wieder von vorn an (für Figurenproben, nur ohne Ton).

**Figurenproben** haben eine ID mit `PROBE-` vorn (Datei `drehbuecher/probe-<name>.json`). Der Player zeigt sie im Menü unter „Figuren“ statt unter „Folgen“, ohne das „Figurenprobe:“ im Titel. Üblich: 10 s, `schleife: true`, eine Figur mit `namensschild` vor HALLE-AUSSEN-01, Kamera ruhig auf `[340, 229, 1.1]`. Beispiele: `probe-spallter.json`, `probe-bierdiebe.json`.

### besetzung

| Feld | Bedeutung |
|---|---|
| `id` | kurze ID für dieses Drehbuch (`pb`, `cy`, …) |
| `figur` | Name in der Bibliothek, alle Version 2: `PoBi`, `cypheR`, `KickASS`, `m0og`, `Deichshaf` (mit Ellbogen), `DocEvel` (mit Ellbogen, Geldscheine), `Spallter` (dünn), `DrBier` (einen Kopf größer), `DrBier-Riese` (Kopf nie im Bild), `Spock`, `Bierdieb-Sturmhaube`, `Bierdieb-Tarnhut` |
| `x`, `boden` | Standplatz (Füße) |
| `z` | Ebene, größer = weiter vorn. Gilt auch für Requisiten und Gegenstände |
| `start` | `draussen`: unsichtbar bis zur ersten Auftritts-Geste (`reinlaufen`, `stapfen`, `auftauchen`, `schleichen`) |
| `haltung` | `sitzt` (keine Beine; Deichshaf: von vorn sitzend mit Oberschenkeln, dazu `stuhl-gruen`) |
| Grundpose | `arme` [links, rechts] in Grad, `blick` [x, y] Pupillen, `kopf` Neigung, `brauen` Vorlage oder [4 Zahlen], `mund` (`schief`, `grinsen`, `lachen`), `bebt` (wackelt beim Stampfen) |
| `hand_rechts` | Gegenstand in der rechten Hand, bleibt aufrecht, z. B. `bierflasche-klein`, `bierflasche`, `lan-kabel` (hängt nach unten, Schwung über `schwingen` auf Feld `swH`) |
| `namensschild` | `true` = Papierschild mit dem Namen unten am Bildrand unter der Figur; oder `{ "text", "x" }` für eigenen Text bzw. festen Platz |

**Armwinkel:** 0 = hängend. Links positiv = nach außen/oben, rechts negativ = nach außen/oben. 150 bzw. −150 ≈ über dem Kopf.

**Brauen-Vorlagen:** `neutral`, `muede`, `locker`, `genervt`, `wach`, `aufmerksam`, `hoch`, `staunen`, `schief`.

### gegenstaende (tragbar)

`{ "id": "kasten", "art": "orga-bierkasten", "x": 270, "y": 361, "z": 4 }` – liegt an (x, y), bis eine `tragen`-Aktion ihn aufnimmt. Nach dem Loslassen fällt er in 0,3 s zurück an seinen Platz.

### ton

`mix` ist die fertige Tonspur (neben der Player-Datei bzw. in `ton/`). `lippen: "aus_ton"` heißt: Münder folgen den Pegeln unter `analyse`.

### dialog

`{ "von", "bis", "wer", "text" }` → Sprechblase + Lippen. Optional `"blase": [von, bis]`, wenn die Blase anders stehen soll als gesprochen wird (z. B. kurz nach dem Satz stehen bleiben). Ohne `text` (z. B. `"laut": "lachen"`) bewegen sich nur die Lippen. Gibt es keine Pegeldaten unter `analyse` (Folge ohne Ton), plappern die Münder gleichmäßig.

### aktionen

`{ "von", "bis", "wer", "geste", …Parameter }`. `wer` ist eine ID oder eine Liste von IDs. Jede Aktion darf zusätzlich `"pose": { … }` enthalten – feste Werte, die nach der Geste gesetzt werden (Feinschliff, z. B. `{ "head": 3 }`).

Bei Gesten mit mehreren Figuren ergibt sich die **Seite** automatisch: Jede Figur schaut/zappelt in Richtung der anderen.

### effekte

`{ "typ": "stampf", "t": [Zeitpunkte], "staerke": 5, "schild": { "text", "pos": [[x,y],…], "winkel": […], "dauer" } }` – Kamera wackelt, Requisiten mit `bebt` hüpfen, optional ein Geräusch-Schild pro Schritt.

### kamera

`{ "von", "bis", "start": [cx, cy, zoom], "ende": [cx, cy, zoom] }`, dazwischen weich interpoliert. Optional: `wackeln` (Stärke), `wackeln_steigt: true` (Wackeln wächst bis zum Ende), `neigung: [Grad, Tempo]`, `zoom_puls: [Stärke, Tempo]`.

### schilder

Geräusch-Schilder in Bildschirm-Koordinaten (746 × 420): `{ "von", "bis", "text": "*KLONK!*", "pos": [x, y], "winkel" }`.

### blenden

- `{ "typ": "schwarz", "verlauf": [[t, deckkraft], …] }` – lineare Kurve, gleiche Zeit zweimal = harter Sprung.
- `{ "typ": "texttafel", "von", "bis", "text": ["Zeile 1", "Zeile 2"], "text_ein": [t0, t1], "aus": [t0, t1] }`
- `{ "typ": "weiss", "von", "dauer" }` – Weißblende zum Schluss.

### analyse

Wird vom Studio aus dem Ton erzeugt, nicht von Hand geschrieben. `pegel` je Figur-ID oder als `mix` für die ganze Spur: `{ "o": erstes Bild, "v": [dB je Bild], "null_db": Pegel für geschlossenen Mund, "spanne": dB bis ganz offen }`.

## Gesten-Katalog

Alle Gesten stehen in `bibliothek/gesten.js`. „Alle“ = funktioniert mit jeder Figur.

### Bewegung

| Geste | Parameter | Wirkung |
|---|---|---|
| `reinlaufen` | `von_x`, `rampe` (Dauer des Wegs), `tempo`, `armschwung`, `armbasis`, `px` | geht von `von_x` zum eigenen Platz |
| `schleichen` | `von_x`, `von_y` (aus der Tiefe, z. B. hinter Busch), `rampe`, `hoch`, `neigung`, `kopf`, `px`, `py`, `armschwung` | geduckt anschleichen |
| `stapfen` | `von_x`, `schritte` | schwere Schritte (mit `effekte` → stampf) |
| `fliehen` | `nach_x`, `rampe`, `von_x` | rennt panisch weg |
| `ausrutschen` | `von_x`, `nach_x`, `hoch` | fliegt hin, landet auf dem Rücken (Kopf entgegen der Laufrichtung) |
| `liegen-glotzen` | `x`, `hoch`, `kopf_nach` (`links` Vorgabe / `rechts`) | liegt und glotzt, blinzelt ab und zu. Nach `ausrutschen` nach links: `kopf_nach` `rechts` |
| `auftauchen` | `x`, `tiefe` [von, nach], `rampe`, `blickfolge` [[t, px], …], `brauen` | taucht hinter etwas auf und lauert |

### Blick und Mimik

| Geste | Parameter | Wirkung |
|---|---|---|
| `blick` | `ziel` (`oben`, `links`, `rechts` oder Figur-ID), `staerke`, `px` (bei oben) | schaut hin |
| `umherschauen` | `tempo`, `muster` [px, …] | Blick springt zufällig |
| `hin-und-her` | `tempo`, `weite` | Blick pendelt links/rechts |
| `kopf-neigen` | `von_grad`, `nach_grad`, `rampe` | neigt den Kopf langsam |
| `brauen` | `wert` (Vorlage oder [4 Zahlen]) | setzt die Brauen |
| `mund` | `wert` (`schief`, `grinsen`, `lachen`), `brauen` | setzt den Mund (alle Figuren; die Sturmhaube hat nur den normalen Mund) |
| `augen-auf` | – | weit aufgerissen |
| `zucken` | `brauen` | zuckt bei jedem Stampfer |
| `glotzen` | – | erstarrt, zittert, Augen weit (zu den anderen hin) |
| `kichern` | – | Augen zu, wackeln, Mund flackert |
| `hehehe` | – | fieses Kichern |
| `nummer:reaktion-fall` | – | Nummer: Fall verfolgen, starren, hochschauen, anschauen, blinzeln, in die Kamera, Achselzucken |

### Arme und Aktionen

| Geste | Parameter | Wirkung |
|---|---|---|
| `tippen` | – | tippt am Rechner |
| `winken` | `arm` (`rechts`/`links`) | winkt |
| `daumen-hoch` | – | Daumen hoch (Figuren mit Daumen, z. B. cypheR) |
| `facepalm` | `rampe` (Vorgabe 0.35), `kopf` (Neigung, Vorgabe 6), `brauen` (Vorgabe `genervt`) | Hand vors Gesicht, Augen zu (alle stehenden V2-Figuren aus dem Baukasten: cypheR, PoBi, Spock …) |
| `arme-heben` | `rampe` | Arme gehen langsam hoch |
| `huzzah` | – | Arme hoch, Hüpfer, wieder runter |
| `arme-reissen` | `ziel` (Grad), `rampe` | reißt beide Arme hoch |
| `jubel` | – | Arme oben, hüpft |
| `ausholen` | `rampe` | holt Schwung |
| `schreck-sprung` | `hoehe`, `hut_hoch`, `px` | springt vor Schreck, Hut fliegt (Tarnhut) |
| `tragen` | `gegenstand` (ID aus `gegenstaende`) | trägt den Gegenstand vor dem Bauch |
| `fallen-lassen` | `gegenstand`, `art` (`von-oben` / `aus-der-hand`), `vorlauf`, `z` und je nach Art: `x`, `landet`, `boden`, `rollt_bis` bzw. `start` [x,y], `boden`, `rollt`, `drehung` | Gegenstand fällt, Hand ist ab dann leer |
| `kratzen-mund` | `runter_ab` | Arm zum Mund, kratzen, runter (DrBier-Riese) |

### Bausteine für frei gebaute Abläufe

Damit lassen sich die meisten Bewegungen ohne neue Geste beschreiben (Beispiel: `e03-werbunk.json`).

| Geste | Parameter | Wirkung |
|---|---|---|
| `pose` | nur `pose` | setzt feste Werte, z. B. `{ "mikro": true, "m": "n" }` für die Dauer der Aktion |
| `uebergang` | `ab` {Feld: Wert}, `ziel` {Feld: Wert}, `rampe` (Vorgabe: ganze Aktion) | führt Zahlenfelder weich von `ab` nach `ziel` (fehlt `ab`, vom aktuellen Wert). Typisch: `aL`, `aLf`, `aR`, `aRf`, `head`, `px`, `flasche_kipp`. Für einen Rückweg einfach `ab` und `ziel` tauschen |
| `wippen` | `tempo`, `weite`, `art` (`welle` oder `takt`) | Körper wippt leicht (Gewicht verlagern) bzw. im Takt (beim Trinken) |
| `kopf-wiegen` | `tempo`, `weite`, `hoch` | Kopf wiegt beim Reden; mit `hoch` hüpft er dabei leicht |
| `schwingen` | `feld`, `mitte`, `weite`, `tempo` | ein beliebiges Zahlenfeld pendelt (z. B. Flasche beim Schluck) |

Bewährte Armwinkel für DocEvel [Schulter, Ellbogen]: links Scheine vor dem Bauch [−8, −50], rechts zählen [8, 50] (mit `schwingen` auf `aRf`, Mitte 48, Weite 10, Tempo 10); sein Aufdruck sitzt auf Brusthöhe. Augen rollen: `uebergang` nach `py` −4.5, `px` 3, `lid` 0.3. Beispiel: `probe-docevel.json`.

Bewährte Armwinkel für Deichshaf [Schulter, Ellbogen]: links Mikro am Kinn [−24.3, −130.5], Mikro tiefer [−18.8, −118.5], Hand zeigt hin [38, 44], Zeigefinger zur Seite [82, 6], Hand auf dem Tisch [13.8, 96.5], im Schoß [10, −30]; rechts Zettel lesen [−17.6, 107.5], hoch zeigen [−158, −6], Flasche greifen [−29.7, −52.5], trinken [−169.6, −79], Daumen hoch [−46.5, −142.5], im Schoß [−10, 30].

### Figuren mit eigenen Teilen

| Geste | Parameter | Wirkung |
|---|---|---|
| `arm-pose` | `arm` (`rechts`/`links`), `schulter`, `ellbogen`, `rampe` | dreht einen Arm in eine feste Pose; mit Ellbogengelenk (Deichshaf) knickt der Unterarm. Bewährt rechts: Prost [−60, −60], Tasse zum Mund [96, 94], Funk am Ohr [−172, 0]; links Daumen-Pose [50, 70] |
| `faust-schuetteln` | – | Faust schütteln beim Ausraster (m0og) |
| `rot-werden` | `von`, `wert` (0–1), `rampe` | Wangen werden rot (m0og) |
| `trinken` | – | setzt die Flasche an, Augen zu (DrBier) |
| `flasche-schuetteln` | – | leere Flasche schütteln (DrBier) |
| `zeigefinger` | – | erhobener Zeigefinger beim Reden (DrBier) |
| `hintern-kratzen` | – | Kratz-Arm hinten (Spallter) |
| `finger-riechen` | – | Finger unter die Nase (Spallter) |

### Spock (Gürtel, Brille)

`brillenblitz`, `guertel-zeigen` (Gürtel ab jetzt in den Händen), `guertel-reissen`, `ninja-arme` (`posen` [[links, rechts], …], `bilder_je_pose`), `kranich` (`schleudern`: Zeitpunkt, `mund`), `lachen`, `wirbeln`, `triumph`.

## Eine neue Geste bauen

Eine Geste ist eine Funktion `(o, c) => { … }` in `bibliothek/gesten.js`. Sie verändert die Pose `o` und liest den Kontext `c`:

- `c.T` Zeit, `c.f` Bildnummer, `c.t` Zeit seit Beginn der Aktion, `c.d` Dauer der Aktion
- `c.a` die Aktion selbst (alle Parameter), `c.self` die Figur aus der Besetzung, `c.seite` ±1 Richtung zu den anderen, `c.world` Posen aller Figuren

**Pose-Felder:** `x`, `y`, Deichshaf: `mikro`, `mikro_kipp` (Handmikro links), `zettel` (rechts), `zeigefinger` (links), `thumb`/`thumbL` (Daumen hoch rechts/links), `flasche` (`"hand"` oder [x, y] im Bild), `flasche_kipp`, `m` auch `n` (gerade) und `o` (Schlürfen), `es` 0.12 = Augen zu, 0.45 = fröhlich;  DocEvel: `geld` (Fächer Scheine links), `geldR` (ein Schein rechts), `fallen` 0–1 (drei Scheine fallen zu Boden), `lid` 0–1 (Oberlid senkt sich, genervt), `m` auch `n` (neutral, Grundmund) und `p` (Mund zusammengezogen);  `rot` (Körper kippt um die Füße), `aLf`, `aRf` (Unterarm bei Ellbogen), `wangen` (m0og), `trinkt`, `schuetteln`, `zeigefinger` (DrBier), `spezial` (Spallter: `kratzen`/`riechen`), `head`, `hy`, `aL`, `aR`, `lL`, `lR` (Beine), `px`, `py` (Pupillen), `br` [4], `m` (Mund: Zahl = Öffnung, `s` schief, `g` grinsen, `y` lachen), `sy` (Höhe des offenen Lachmunds), `es` (Augen zukneifen, < 1), `ew` (Augen weiten, > 1), `shrug`, `thumb`, `handLeer` (Gegenstand in der Hand weg), `swH` (Gegenstand in der Hand schwingt, Grad), `fp` (Facepalm-Arm, Winkel; 0 = aus), `glint` (Brillenblitz), `belts`, `swL`, `swR` (Spock), `hat` (Tarnhut), `mFix` (Lippen nicht vom Ton steuern lassen).

Regeln: Parameter mit sinnvollen Vorgaben, Richtung aus `c.seite` oder Start/Ziel ableiten statt fest verdrahten, und die neue Geste hier im Katalog eintragen.
