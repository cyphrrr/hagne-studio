---
name: hagne-studio
description: HAGNE-Cartoons der LAN-Party ['ju:nien] bauen – Episoden als Drehbuch (JSON) schreiben, neue Orga-Figuren anlegen, Szenen aus eigenen Clips oder aus einer Textidee entwickeln, prüfen und als Player-Datei, Kontaktbogen oder MP4 abgeben. Benutzen, wenn jemand vom Media-Team eine HAGNE-Folge, Szene, Figur, Geste oder „junienTV“ erwähnt.
---

# HAGNE-Studio

Die HAGNE-Cartoons entstehen aus Drehbüchern (JSON) und einer gemeinsamen Bibliothek. Alles – Bibliothek, Format, Werkzeuge **und die Anleitung für dich** – liegt im öffentlichen Repo **https://github.com/cyphrrr/hagne-studio**. Dieser Skill holt nur das Repo. Er wird nie geändert.

## 1 · Repo holen oder aktualisieren

```bash
if [ -d /tmp/hagne-studio/.git ]; then git -C /tmp/hagne-studio pull --ff-only; else git clone --depth 1 https://github.com/cyphrrr/hagne-studio /tmp/hagne-studio; fi
cd /tmp/hagne-studio
```

Klappt das nicht (kein Netzwerk zu GitHub), die Person bitten, das Repo als ZIP herunterzuladen (`Code → Download ZIP`) und hochzuladen, dann daraus arbeiten. Nicht aus dem Gedächtnis nachbauen.

## 2 · Anleitung lesen und befolgen

Jetzt `docs/ARBEITSWEISE.md` im Repo vollständig lesen. Sie ist verbindlich: Arbeitsweise im Dialog, Workflows, Prüfen, Abgeben und Regeln stehen dort und gehen dieser Datei vor.

Gilt immer, auch wenn die Anleitung nicht lesbar ist: nur Spitznamen, und nie Rohvideos, Fotos echter Personen, Zugangsdaten oder Tokens ins Repo – es ist öffentlich.
