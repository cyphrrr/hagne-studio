# HAGNE – Steckbrief für neue Figuren

Vorlage zum Kopieren für jede neue Orga-Figur. Gibt es ein Foto, füllt der **Hagnomat** sie aus (`docs/HAGNOMAT.md`): Foto in den Chat laden und „Hagnomat: Steckbrief für <Spitzname>“ schreiben.

```
Spitzname:
Frisur:
Haarfarbe:
Bart (ja/nein, welcher):
Hautton (hell / mittel / dunkel):
Shirtfarbe:
Accessoire (z. B. Headset, Brille, Kaffeetasse, Energy-Can):
Typischer Spruch oder Macke:
```

## Feste Regeln (müssen nicht mehr angegeben werden)

- Shirt-Aufdruck ist bei allen Figuren immer `['ju:nien]` und sitzt immer auf Brusthöhe (V2-Rumpf: y −127).
- Es wird nur der Spitzname verwendet, kein Klarname.
- Figuren werden im Baukasten Version 2 gebaut (`docs/VERSION-2.md`), ohne Klebestreifen am Kinn.

## Hinweise

- Frisur so beschreiben, wie man sie einem Freund beschreiben würde („kurze Locken“, „Zopf“). Fehlt das Teil im Baukasten, wird es neu gebaut.
- Pro Figur ein Accessoire, höchstens zwei, sonst wird die Figur unruhig.
- Die letzte Zeile liefert die Geste oder den Running Gag für die Figurenprobe (Schleife ca. 10 s).
- Sonderkörper (sehr groß, sehr dünn …) einfach unter „Accessoire“ oder „Macke“ mit dazuschreiben.

## Im Studio

Eine neue Figur landet als Eintrag in `FIGUREN` und kann danach in jedem Drehbuch über ihren Namen besetzt werden. Wohin sie gehört:

- **`bibliothek/figuren-v2.js`** – einfache V2-Figur aus dem Grundbaukasten, Definition wie `PB` oder `CY`.
- **`bibliothek/figuren-orga.js`** – Figur mit Ellbogengelenk, eigenen Händen (Mikro, Flasche …) oder Sonderkörper (sehr dünn, Hüfte, eigene Beine). Vorlage: `V2X({…})` wie KickASS oder m0og; ganz eigene Bauweise wie Deichshaf oder Spallter in einem eigenen Block `(()=>{ … })();`, damit Hilfsnamen nicht kollidieren.
