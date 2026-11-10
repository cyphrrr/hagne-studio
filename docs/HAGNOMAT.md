# Hagnomat – aus einem Foto wird ein HAGNE-Steckbrief

Der Hagnomat ist ein Ablauf für Claude, kein Programm. Jemand vom Media-Team lädt ein bis drei Fotos einer Person in den Chat hoch. Claude liefert dann den ausgefüllten Steckbrief nach `docs/STECKBRIEF.md`, so übersetzt, dass daraus eine HAGNE-Figur im Baukasten Version 2 gebaut werden kann.

**So startet man ihn:** im Chat mit dem hagne-studio-Skill ein Foto hochladen und z. B. schreiben: „Hagnomat: Steckbrief für <Spitzname>“.

Farben und vorhandene Teile in den Tabellen unten haben den Stand 2026-11. Bei Zweifeln gilt immer `bibliothek/`.

## Feste Regeln

- **Fotos bleiben im Chat.** Sie kommen nie ins Repo, auch nicht als Ausschnitt oder Vorschaubild. Ins Repo geht nur der Text-Steckbrief.
- **Fotos sofort löschen.** Sobald der Steckbrief steht, werden alle Kopien des Fotos gelöscht, die Claude anlegen oder sehen kann: hochgeladene Dateien, Zwischenbilder, Ausschnitte. Danach kurz bestätigen, was gelöscht wurde. Den Chatverlauf selbst kann Claude nicht löschen. Darauf hinweisen, damit die Person den Chat bei Bedarf selbst löscht.
- **Fotos nie weitergeben**, auch nicht an andere Chats oder Sessions. Weiter wandert nur der Text-Steckbrief.
- **Die Person auf dem Foto muss einverstanden sein.** Vor der Analyse einmal kurz nachfragen, falls es nicht klar ist.
- **Nur Spitznamen.** Claude rät keinen Namen und erkennt niemanden. Auch Namen auf Shirts, Badges oder Namensschildern im Foto werden ignoriert.
- **Liebevoll übertreiben, nie bloßstellen.** Gewicht, Alter, Hautbild oder Zähne werden nicht zum Gag gemacht, außer die Person wünscht es ausdrücklich.
- Spitzname und Spruch/Macke kann man nicht vom Foto ablesen. Die werden immer **nachgefragt**, nie erfunden.

## Ablauf

1. **Foto ansehen.** Licht, Filter und Weißabgleich gedanklich herausrechnen. Bei mehreren Fotos gilt, was auf allen gleich ist.
2. **Vereinfachen.** Eine HAGNE-Figur besteht aus wenigen Collage-Schnipseln. Pro Teil also nur die Grundform, keine Details wie Strähnen, Falten oder Muster.
3. **Das eine Merkmal finden.** Woran erkennt man die Person auf den ersten Blick, auch von hinten quer durch die Halle? Genau das wird im Cartoon übertrieben, alles andere bleibt Standard.
4. **Mit dem Baukasten abgleichen** (Tabelle unten). Gibt es das Teil schon, wird es wiederverwendet. Sonst ist es ein neues Teil.
5. **Verwechslungs-Check.** Welcher vorhandenen Figur sähe der Cartoon ähnlich, wenn man nur die Steckbrief-Zeilen nimmt? Brille, Bart und Shirtfarbe ergeben schnell eine Doppelgängerin. Gibt es eine Ähnlichkeit, wird festgelegt, was die neue Figur abhebt: das eine Merkmal und/oder eine andere Shirtfarbe.
6. **Steckbrief ausgeben** (Format unten) und Spitzname und Spruch/Macke nachfragen.
7. **Macke übersetzen.** Sobald die Macke da ist, wird sie auf vorhandene Gesten, Mundformen und Requisiten abgebildet (Tabelle unten). Daraus entsteht ein Vorschlag für die Figurenprobe (Schleife ca. 10 s).
8. **Foto löschen.** Steht der Steckbrief, werden alle erreichbaren Kopien des Fotos gelöscht (siehe Regeln), und Claude bestätigt das.

## Übersetzung in den Baukasten

**Frisur:** so beschreiben, wie man sie einem Freund beschreibt, also Länge, Form und Besonderheit: „kurz, oben stachelig“, „Glatze mit Haarkranz“, „Zopf“. Bei Kappe oder Mütze gilt die als Frisur.

**Farben:** immer den mittleren Ton der Fläche nehmen, nicht Glanzlicht und nicht Schatten. Lieber etwas satter und klarer als auf dem Foto, denn Cartoon-Farben sind sauberer.

| Hautton | Werte im Baukasten | Beispiel |
|---|---|---|
| hell | `#F6D2B0`, `#F4CFAE`, `#F3CDB0`, `#F2C9A0`, `#F0C4A0` | m0og, PoBi, cypheR, DocEvel, KickASS |
| hell, etwas wärmer | `#EFC3A0`, `#E8BD98` | Spock, Bierdieb |
| mittel | `#D9A47A`, `#C68A5E` | Deichshaf |
| dunkel | noch keine Figur, Vorschlag `#8D5A3B` oder `#6B4129` | – |

| Haar / Bart | Werte im Baukasten | Beispiel |
|---|---|---|
| schwarz | `#15151A` | Spock |
| dunkelbraun | `#6A4426` | DrBier |
| hellbraun / dunkelblond | `#B08A5E` | Spallter |
| blond | Brauen `#B8943E` | m0og |
| grau-braun | `#6B6259` | cypheR |
| grau | `#A3A19C` | PoBi |
| hell silbergrau | `#D2D1CB`, Brauen `#98948A` | DocEvel |

Brauen sind meist etwas dunkler als das Haar, Bart oft auch.

**Shirt:** Der Aufdruck ist immer `['ju:nien]`. Muster, Logos und Ärmel-Aufdrucke wie „ORGA“ vom Foto fallen weg. **Das Orga-Shirt zählt nicht als Lieblingsfarbe:** Auf LAN-Fotos tragen fast alle das schwarze Orga-Polo. Nur wenn die Person privat typischerweise eine bestimmte Farbe trägt, wird die genommen. Sonst wird eine freie Farbe gewählt, die sich von den anderen Figuren absetzt.

| Shirtfarbe | vergeben an |
|---|---|
| schwarz | cypheR, Deichshaf, DocEvel, RamShadow |
| grün | PoBi, Spallter, DrBier |
| oliv | KickASS |
| rot | m0og |
| petrol `#2A6F7A` | Marlec |

Noch frei sind zum Beispiel orange, gelb, lila, weiß und bordeaux. **Blau besser meiden:** Es verschwimmt mit der Standardhose `#3A4A62`. Ein Polokragen ist ein neues Teil, kein Muss.

**Accessoire:** höchstens zwei. Brille, Headset, Kappe, Tasse oder Dose gehören dazu, Ohrringe oder Uhr nur, wenn sie wirklich auffallen.

**Körperbau:** nur angeben, wenn er stark vom Standard abweicht, etwa sehr groß, sehr dünn oder sehr breit. Das ist dann ein Sonderkörper und kommt nach `bibliothek/figuren-orga.js`.

**Unten herum:** Hose (Standard `#3A4A62`) und Schuhe (Standard `#2A2624`) nur angeben, wenn etwas auffällt, z. B. Shorts, riesige Stiefel oder Socken in Badelatschen. So etwas eignet sich gut als Bonus-Gag. Ob es typisch ist oder nur auf diesem Foto so war, wird nachgefragt.

## Baukasten-Abgleich (vorhandene Teile)

| Teil | gibt es schon bei |
|---|---|
| Brille, dicker schwarzer Rahmen | cypheR, Marlec |
| Brille, dünner schwarzer Rahmen | RamShadow |
| eckige Goldbrille | m0og |
| schmale rechteckige Metallbrille (silber) | DocEvel |
| Brille, dünner dunkelbrauner Rahmen | Spallter |
| Vollbart | cypheR, PoBi, Spallter (kurz) |
| Dreitagebart / Stoppeln | Deichshaf |
| Kappe | DrBier („MAKE HAGNE GREAT AGAIN“) |
| Tarnhut, Sturmhaube | Bierdiebe |
| Funk am Ohr | KickASS |
| Brust-Rig mit Funkgerät, Antenne, Lampe, Handsprecher am Spiralkabel | RamShadow (Pose-Feld `funkarm`) |
| Polokragen | Marlec, RamShadow |
| Cargo-Hose mit Kniepolstern, Arbeitsschutzschuhe | RamShadow |
| Linien-Tattoo am Unterarm | RamShadow |
| Badelatschen mit Socken | Marlec |
| sehr kurz, oben leicht aufgestellt | DocEvel |
| Glatze | Bierdieb-Sturmhaube (darunter) |
| Irokese (flach, Kopf stoppelig rasiert) | RamShadow |
| Kippe mit Rauch | m0og |
| Bierflasche, Handmikro, Zettel, Geldscheine | Requisiten in `figuren-orga.js` |
| Bierkasten „ORGA-BIER“ (tragbar) | `orga-bierkasten` in `gegenstaende.js`, Geste `tragen` |
| Shorts, große Stiefel | KickASS |
| Locken | Marlec |

## Macke → Gesten (Auswahl aus `docs/FORMAT.md`)

Immer im aktuellen Katalog in `docs/FORMAT.md` nachsehen, diese Liste ist nur ein Einstieg.

| Macke klingt nach … | vorhandene Bausteine |
|---|---|
| lacht laut, überzeichnet | Mund `lachen` (`m: 'y'`, Höhe `sy`), Augen zukneifen (`es`), Kamera `wackeln`, Geste `kichern` |
| fies, hinterhältig | Geste `hehehe`, Mund `schief`, Brauen |
| verpeilt, glotzt | Gesten `glotzen`, `augen-auf`, `umherschauen`, Pupillen `px`/`py`, Mund `schief` |
| genervt, gelassen | Oberlid `lid` (DocEvel), Mund `n`/`p` |
| cholerisch | `faust-schuetteln`, `rot-werden` (m0og), `stapfen` |
| trinkt, Bier | `trinken`, `flasche-schuetteln`, `schwingen`, Requisit Bierflasche |
| schleppt Zeug | `tragen`, `fallen-lassen`, `orga-bierkasten` |
| freut sich | `jubel`, `huzzah`, `arme-reissen`, `daumen-hoch` |
| redet viel, belehrt | `kopf-wiegen`, `zeigefinger`, Handmikro, Zettel |
| zockt, am Rechner | `tippen` |

Fehlt etwas, gilt es im Steckbrief als „neu zu bauen“.

## Ausgabe

```
HAGNOMAT · Steckbrief-Vorschlag

Spitzname:            ← bitte nachtragen
Frisur:
Haarfarbe:            (Hex)
Bart (ja/nein, welcher):        (Hex)
Brauen:               (Hex)
Hautton (hell / mittel / dunkel):    (Hex)
Shirtfarbe:           (Hex)
Accessoire:
Typischer Spruch oder Macke:   ← bitte nachtragen

Das eine Merkmal:     (was übertrieben wird und wie)
Körper:               Standard / Sonderkörper (welcher)
Unten herum:          Standard / (was auffällt)
Verwechslung:         keine / ähnelt <Figur>, abgehoben durch …
Baukasten:            vorhanden: … · neu zu bauen: …
Figurenprobe:         (sobald die Macke da ist: 10-s-Ablauf aus vorhandenen Gesten)
Unsicher:             (was auf dem Foto nicht klar zu sehen war)
```

## Gelernt aus Tests

- **RamShadow (2026-11-10):** Das Media-Team wollte trotz Orga-Polo Schwarz. Weil das sehr nah an DocEvel und cypheR liegt, tragen das Merkmal (Brust-Rig mit Funk über die ganze Brust) und der Irokese die Abgrenzung, dazu kein Bart. Gut zu wissen: Ein dunkles Rig auf schwarzem Shirt braucht ein mittleres Grau und helle Nähte, sonst verschwindet es.
- **Marlec (2026-11-09):** Brille, Vollbart und schwarzes Orga-Polo ergaben fast cypheR. Abhilfe waren Locken als Merkmal und ein freies Petrol. Die Badelatschen mit Socken wären im alten Steckbrief untergegangen. Die Macke ließ sich fast komplett mit vorhandenen Bausteinen abbilden.
