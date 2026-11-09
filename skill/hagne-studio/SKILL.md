---
name: hagne-studio
description: HAGNE-Cartoons der LAN-Party ['ju:nien] bauen – Episoden als Drehbuch (JSON) schreiben, neue Orga-Figuren anlegen, Szenen aus eigenen Clips oder aus einer Textidee entwickeln, prüfen und als Player-Datei, Kontaktbogen oder MP4 abgeben. Benutzen, wenn jemand vom Media-Team eine HAGNE-Folge, Szene, Figur, Geste oder „junienTV“ erwähnt.
---

# HAGNE-Studio

Die HAGNE-Cartoons entstehen aus **Drehbüchern** (JSON) und einer **gemeinsamen Bibliothek** (Figuren, Kulissen, Requisiten, Gesten). Die einzige Quelle der Wahrheit ist das öffentliche Repo **https://github.com/cyphrrr/hagne-studio**. Dieser Skill enthält bewusst keine Kopie der Bibliothek – immer den aktuellen Stand aus dem Repo holen.

## 1 · Repo holen

```bash
git clone --depth 1 https://github.com/cyphrrr/hagne-studio /tmp/hagne-studio
cd /tmp/hagne-studio
```

Klappt das nicht (kein Netzwerk zu GitHub), die Person bitten, das Repo als ZIP herunterzuladen (`Code → Download ZIP`) und hochzuladen. Nicht aus dem Gedächtnis nachbauen.

Danach lesen: `docs/FORMAT.md` (Drehbuch-Format und Gesten-Katalog). Für Figuren zusätzlich `docs/STECKBRIEF.md` und `docs/VERSION-2.md`. Als Vorlage für Drehbücher dienen `drehbuecher/e02-turnierbuero.json`, `drehbuecher/guertel.json` und `drehbuecher/e03-werbunk.json` (mehrere Szenen mit harten Schnitten, Abläufe aus den Bausteinen `pose`/`uebergang`).

## 2 · Arbeitsweise

Mit dem Media-Team **im Dialog, Schritt für Schritt**: erst grob die Idee bzw. den Plan zeigen, dann bauen, nach jedem Teil zeigen und fragen. Keine langen Listen.

**A · Folge aus einer Idee (Text)**
1. Idee klären: Wer spielt mit (nur Figuren aus der Bibliothek oder neue nach Steckbrief), welche Kulisse, welcher Gag, wie lang (meist 20–60 s).
2. Kurzes Szenenbuch in Worten zeigen (Takte mit Zeiten). Erst nach OK das JSON schreiben.
3. Nur Gesten, Figuren und Requisiten verwenden, die es gibt. Fehlt etwas, sagen und vorschlagen, es zu bauen (siehe D).
4. Ohne Ton: Dialog mit `text` schreiben, die Münder plappern dann gleichmäßig. Mit Ton: Tonspur als `ton.mix`, Pegel unter `analyse` berechnen (siehe B).

**B · Folge aus einem eigenen Clip**
1. Schnitte und Standbilder ziehen: `ffmpeg -i clip.mp4 -vf "select='gt(scene,0.3)',showinfo" -fps_mode vfr bild_%03d.png`, Bilder ansehen.
2. Ton: Zeiten der Sätze und Geräusche bestimmen (Transkript, falls die Person eins hat oder Whisper verfügbar ist). Lippen-Pegel je Bild in dB für `analyse` berechnen (Sprachband 250–3000 Hz, 12 Bilder pro Sekunde).
3. Szenen in Takte zerlegen, Figuren zuordnen, dann wie A weiter. Hat der Clip Schnitte, je Schauplatz einen Eintrag unter `szenen` anlegen (harte Schnitte wie im Video).

**C · Neue Figur**
Steckbrief ausfüllen lassen, Figur nach `docs/VERSION-2.md` in `bibliothek/figuren-v2.js` bauen (Definition wie `PB`/`CY`, Eintrag in `FIGUREN`), mit einem kleinen Probe-Drehbuch zeigen.

**D · Neue Geste, Kulisse, Requisite**
In der passenden Datei unter `bibliothek/` ergänzen, wiederverwendbar mit Parametern (siehe „Eine neue Geste bauen“ in `docs/FORMAT.md`) und im Katalog in `docs/FORMAT.md` eintragen.

## 3 · Prüfen

```bash
python3 werkzeuge/pruefen.py drehbuecher/NEU.json            # fehlende Bausteine, IDs, Zeiten, Kamera
python3 werkzeuge/pruefen.py drehbuecher/NEU.json --bilder   # zusätzlich Kontaktbogen (dist/<ID>-kontaktbogen.png)
```

Den Kontaktbogen selbst ansehen, bevor er gezeigt wird. Der Kontaktbogen braucht Playwright + Chromium (`pip install playwright pillow && playwright install chromium`). Geht das nicht, reicht die Prüfung ohne Bilder, und die Person sieht sich die Folge im Player an.

## 4 · Abgeben

- **Zum Anschauen:** `python3 werkzeuge/buendeln.py drehbuecher/NEU.json -o dist/NEU-player.html` – eine Datei, läuft per Doppelklick. Tonspur daneben legen.
- **Als Video:** `python3 werkzeuge/rendern.py drehbuecher/NEU.json --ton ton.mp3` (braucht ffmpeg).
- **Ins Repo:** Alle neuen und geänderten Dateien als **eine ZIP mit den Repo-Pfaden** abgeben (z. B. `drehbuecher/e04-kabelsalat.json`, `drehbuecher/index.json`, ggf. `bibliothek/gesten.js`, `docs/FORMAT.md`, `ton/e04.mp3`). Dateinamen für Folgen: `<id>-<kurztitel>.json` in Kleinbuchstaben. Neue Folge in `drehbuecher/index.json` eintragen. Dann auf `docs/MITMACHEN.md` verweisen (Upload über GitHub, Pull Request). Julian prüft und übernimmt.
- Bei geänderter Bibliothek vorher alle Drehbücher in `drehbuecher/` mit `pruefen.py` prüfen – bestehende Folgen dürfen nicht kaputtgehen.

## Regeln

- Nur Spitznamen, nie Klarnamen. Shirt-Aufdruck immer `['ju:nien]`.
- Neue Figuren immer Version 2, ohne Klebestreifen am Kinn.
- **Nie ins Repo:** Rohvideos, Fotos echter Personen, Zugangsdaten oder Tokens. Das Repo ist öffentlich.
- Nur eigenes Material der ['ju:nien] verwenden, keine fremde Musik oder Filmausschnitte.
- Deterministisch bleiben: kein `Math.random()`, sondern `R()`/`hs()` aus `bibliothek/basis.js`.
