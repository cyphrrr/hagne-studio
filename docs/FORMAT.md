# HAGNE-Drehbuch – Format 0.2

Ein Drehbuch beschreibt eine Szene vollständig als Daten. Gezeichnet wird immer mit der gemeinsamen Bibliothek (`bibliothek/`), abgespielt mit dem Player (`index.html`). Wer eine Folge baut, schreibt also nur JSON – Code entsteht nur, wenn ein Baustein in der Bibliothek fehlt.

Referenzen: `drehbuecher/e02-turnierbuero.json` (ruhig, Sprechblasen, V2-Figuren) und `drehbuecher/guertel.json` (viel Choreografie, Blenden, V1-Figuren).

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
| `id` | Kulisse aus `bibliothek/kulissen.js`: `HALLE-VOLL-01`, `HALLE-AUSSEN-01` |
| `licht` | `nacht` (dunkle Schatten, Halle) oder `tag` (warme, helle Schatten) |
| `requisiten` | Liste: `{ "id", "x", "z", … }`. Vorhanden: `gaming-stuhl`, `tisch-turnierbuero` (`bebt`: hüpft beim Stampfen), `busch` (`x`, `boden`, `breite`, `seed`) |

### besetzung

| Feld | Bedeutung |
|---|---|
| `id` | kurze ID für dieses Drehbuch (`pb`, `cy`, …) |
| `figur` | Name in der Bibliothek: `PoBi`, `cypheR`, `DrBier-Riese`, `Spock`, `Bierdieb-Sturmhaube`, `Bierdieb-Tarnhut` |
| `x`, `boden` | Standplatz (Füße) |
| `z` | Ebene, größer = weiter vorn. Gilt auch für Requisiten und Gegenstände |
| `start` | `draussen`: unsichtbar bis zur ersten Auftritts-Geste (`reinlaufen`, `stapfen`, `auftauchen`, `schleichen`) |
| `haltung` | `sitzt` (V2: keine Beine) |
| Grundpose | `arme` [links, rechts] in Grad, `blick` [x, y] Pupillen, `kopf` Neigung, `brauen` Vorlage oder [4 Zahlen], `mund` (`schief`, `grinsen`, `lachen`), `bebt` (wackelt beim Stampfen) |
| `hand_rechts` | Gegenstand in der rechten Hand (V1), z. B. `bierflasche-klein` |

**Armwinkel:** 0 = hängend. Links positiv = nach außen/oben, rechts negativ = nach außen/oben. 150 bzw. −150 ≈ über dem Kopf.

**Brauen-Vorlagen:** `neutral`, `muede`, `locker`, `genervt`, `wach`, `aufmerksam`, `hoch`, `staunen`, `schief`.

### gegenstaende (tragbar)

`{ "id": "kasten", "art": "orga-bierkasten", "x": 270, "y": 361, "z": 4 }` – liegt an (x, y), bis eine `tragen`-Aktion ihn aufnimmt. Nach dem Loslassen fällt er in 0,3 s zurück an seinen Platz.

### ton

`mix` ist die fertige Tonspur (neben der Player-Datei bzw. in `ton/`). `lippen: "aus_ton"` heißt: Münder folgen den Pegeln unter `analyse`.

### dialog

`{ "von", "bis", "wer", "text" }` → Sprechblase + Lippen. Ohne `text` (z. B. `"laut": "lachen"`) bewegen sich nur die Lippen.

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
| `ausrutschen` | `von_x`, `nach_x`, `hoch` | fliegt hin, landet auf der Seite (V1) |
| `liegen-glotzen` | `x`, `hoch` | liegt und glotzt, blinzelt ab und zu (V1) |
| `auftauchen` | `x`, `tiefe` [von, nach], `rampe`, `blickfolge` [[t, px], …], `brauen` | taucht hinter etwas auf und lauert |

### Blick und Mimik

| Geste | Parameter | Wirkung |
|---|---|---|
| `blick` | `ziel` (`oben`, `links`, `rechts` oder Figur-ID), `staerke`, `px` (bei oben) | schaut hin |
| `umherschauen` | `tempo`, `muster` [px, …] | Blick springt zufällig |
| `hin-und-her` | `tempo`, `weite` | Blick pendelt links/rechts |
| `kopf-neigen` | `von_grad`, `nach_grad`, `rampe` | neigt den Kopf langsam |
| `brauen` | `wert` (Vorlage oder [4 Zahlen]) | setzt die Brauen |
| `mund` | `wert` (`schief`, `grinsen`, `lachen`), `brauen` | setzt den Mund (V1/Spock) |
| `augen-auf` | – | weit aufgerissen |
| `zucken` | `brauen` | zuckt bei jedem Stampfer |
| `glotzen` | – | erstarrt, zittert, Augen weit (zu den anderen hin) |
| `kichern` | – | Augen zu, wackeln, Mund flackert (V2) |
| `hehehe` | – | fieses Kichern (V1) |
| `nummer:reaktion-fall` | – | Nummer: Fall verfolgen, starren, hochschauen, anschauen, blinzeln, in die Kamera, Achselzucken (V2) |

### Arme und Aktionen

| Geste | Parameter | Wirkung |
|---|---|---|
| `tippen` | – | tippt am Rechner |
| `winken` | `arm` (`rechts`/`links`) | winkt |
| `daumen-hoch` | – | Daumen hoch (V2 mit Daumen, z. B. cypheR) |
| `arme-heben` | `rampe` | Arme gehen langsam hoch (V2) |
| `huzzah` | – | Arme hoch, Hüpfer, wieder runter (V2) |
| `arme-reissen` | `ziel` (Grad), `rampe` | reißt beide Arme hoch |
| `jubel` | – | Arme oben, hüpft |
| `ausholen` | `rampe` | holt Schwung |
| `schreck-sprung` | `hoehe`, `hut_hoch`, `px` | springt vor Schreck, Hut fliegt (Tarnhut) |
| `tragen` | `gegenstand` (ID aus `gegenstaende`) | trägt den Gegenstand vor dem Bauch |
| `fallen-lassen` | `gegenstand`, `art` (`von-oben` / `aus-der-hand`), `vorlauf`, `z` und je nach Art: `x`, `landet`, `boden`, `rollt_bis` bzw. `start` [x,y], `boden`, `rollt`, `drehung` | Gegenstand fällt, Hand ist ab dann leer |
| `kratzen-mund` | `runter_ab` | Arm zum Mund, kratzen, runter (DrBier-Riese) |

### Spock (Gürtel, Brille)

`brillenblitz`, `guertel-zeigen` (Gürtel ab jetzt in den Händen), `guertel-reissen`, `ninja-arme` (`posen` [[links, rechts], …], `bilder_je_pose`), `kranich` (`schleudern`: Zeitpunkt, `mund`), `lachen`, `wirbeln`, `triumph`.

## Eine neue Geste bauen

Eine Geste ist eine Funktion `(o, c) => { … }` in `bibliothek/gesten.js`. Sie verändert die Pose `o` und liest den Kontext `c`:

- `c.T` Zeit, `c.f` Bildnummer, `c.t` Zeit seit Beginn der Aktion, `c.d` Dauer der Aktion
- `c.a` die Aktion selbst (alle Parameter), `c.self` die Figur aus der Besetzung, `c.seite` ±1 Richtung zu den anderen, `c.world` Posen aller Figuren

**Pose-Felder:** `x`, `y`, `rot` (V1), `head`, `hy`, `aL`, `aR`, `lL`, `lR` (Beine), `px`, `py` (Pupillen), `br` [4], `m` (Mund: Zahl = Öffnung, bei Spock `s`/`g`/`y`), `eye` (V1) bzw. `es`/`ew` (V2), `shrug`, `thumb` (V2), `glint`, `belts`, `swL`, `swR` (Spock), `hat` (Tarnhut), `mFix` (Lippen nicht vom Ton steuern lassen).

Regeln: Parameter mit sinnvollen Vorgaben, Richtung aus `c.seite` oder Start/Ziel ableiten statt fest verdrahten, und die neue Geste hier im Katalog eintragen.
