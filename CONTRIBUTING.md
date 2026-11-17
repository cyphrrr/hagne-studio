# Spielregeln für hagne-tunier & hagne-studio

**Board:** https://github.com/users/cyphrrr/projects/1

## Die eine Grundregel

Niemand arbeitet direkt auf `main`.
Alles läuft über **Issue → Branch → Pull Request**. Nur so zeigt das Board, wer gerade woran sitzt.

## Ablauf einer Aufgabe

1. **Issue anlegen.** In hagne-studio über die Vorlage „Aufgabe“. Neue Issues landen automatisch auf dem Board.
2. **Übernehmen.** Dich selbst unter *Assignees* eintragen und die Karte auf **In progress** ziehen.
3. **Branch aus dem Issue erstellen.** Rechts im Issue unter *Development* → *Create a branch*.
   Lokal: `git fetch` und dann `git checkout <branchname>`.
4. **Früh einen Draft-PR öffnen.** Gleich nach dem ersten Push. In die Beschreibung `Closes #<Issue-Nr>` schreiben.
5. **Fertig?** Im PR *Ready for review* klicken und die Karte auf **In review** ziehen. Einer der anderen schaut drüber.
6. **Mergen.** Das Issue schließt sich von selbst, und die Karte springt auf **Done**.

## Die Spalten

| Spalte | Bedeutung |
|---|---|
| Backlog | Idee oder Wunsch, noch nicht geplant |
| Ready | Ist klar beschrieben und kann losgehen |
| In progress | Jemand arbeitet dran |
| In review | Wartet auf Durchsicht |
| Done | Gemergt und erledigt |

## Absprachen

- **Höchstens 2 Karten pro Person in „In progress“.** Erst fertig machen, dann Neues anfangen.
- **Gemeinsame Dateien ansagen.** Bevor du etwas anfasst, an dem oft mehrere arbeiten (Map, Figuren-JSONs, zentrale Configs), kurz im Chat Bescheid geben.
- **Branch aktuell halten.** Vor dem Weiterarbeiten `main` in deinen Branch holen: `git pull origin main`
- **Commit-Nachrichten** kurz und mit Issue-Nummer, z. B. `Bierkanone: Sound lauter gemacht #12`
- **Reviews nicht liegen lassen.** Wer zuerst Zeit hat, schaut drüber, spätestens nach 2 Tagen.
- **Einmal pro Woche kurzer Abgleich** (15 Minuten): Board durchgehen und klären, was als Nächstes kommt.
