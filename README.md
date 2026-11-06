# HAGNE-Studio

Cartoons der LAN-Party **['ju:nien]** – „junienTV präsentiert“. Jede Folge ist ein **Drehbuch** (JSON), gezeichnet wird mit einer **gemeinsamen Bibliothek** aus Figuren, Kulissen, Requisiten und Gesten. Dieses Repo ist die einzige Quelle der Wahrheit für das Media-Team.

**Online ansehen:** über GitHub Pages (`index.html`), Folge oben links auswählen.

## Aufbau

| Ordner | Inhalt |
|---|---|
| `drehbuecher/` | alle Folgen als JSON, `index.json` listet sie für den Player |
| `bibliothek/` | Bausteine: `basis`, `kulissen`, `requisiten`, `figuren-v2`, `figuren-v1`, `gegenstaende`, `gesten` |
| `player/` | Engine: liest ein Drehbuch und zeichnet jedes Bild |
| `index.html` | der Player (lädt Bibliothek und Drehbücher) |
| `werkzeuge/` | `buendeln.py` (Einzeldatei, offline), `pruefen.py` (Prüfung + Kontaktbogen), `rendern.py` (MP4) |
| `docs/` | `FORMAT.md` (Drehbuch-Format, Gesten-Katalog), `STECKBRIEF.md`, `VERSION-2.md` |
| `skill/hagne-studio/` | Claude-Skill fürs Media-Team |
| `ton/` | Tonspuren der Folgen (siehe `ton/README.md`) |

## Benutzen

```bash
python3 -m http.server            # Player lokal: http://localhost:8000
python3 werkzeuge/buendeln.py     # dist/HAGNE-PLAYER.html – eine Datei mit allen Folgen, läuft offline
python3 werkzeuge/pruefen.py drehbuecher/guertel.json --bilder
python3 werkzeuge/rendern.py drehbuecher/guertel.json --ton ton/guertel.mp3
```

`pruefen.py` braucht Node.js, Kontaktbogen und MP4 brauchen Playwright mit Chromium (`pip install playwright pillow && playwright install chromium`), MP4 zusätzlich ffmpeg.

## Mitmachen

1. Mit Claude und dem Skill `hagne-studio` eine Folge, Figur oder Geste bauen – oder von Hand nach `docs/FORMAT.md`.
2. Neue Dateien als Pull Request einreichen (auf GitHub: `Add file → Upload files → Create a new branch`).
3. Julian prüft und übernimmt.

**Nie ins Repo:** Rohvideos, Fotos echter Personen, Zugangsdaten. Nur Spitznamen, keine Klarnamen. Nur eigenes Material.

## Claude-Skill einrichten

Den Ordner `skill/hagne-studio` als ZIP packen und in Claude unter **Customize → Skills** hochladen. Code-Ausführung muss aktiviert sein (Einstellungen → Fähigkeiten). Der Skill holt sich die Bibliothek jedes Mal frisch aus diesem Repo.
