# Beiträge zu micro-tools

Fehler in der Berechnungslogik gefunden? Bitte ein Issue öffnen.

## Was zählt als meldenswerter Fehler

- Logikfehler, die zu falschen Ergebnissen führen
- Nicht behandelte Grenzfälle
- Veraltete Rechtsgrundlagen (Gesetz geändert, Code nicht)
- Fehlende Validierung, die ungültige Eingaben durchlässt

## Was nicht zählt

- Tippfehler in der Dokumentation
- Code-Stil-Vorschläge
- Feature-Anfragen
- Fehler in Testdateien (außer sie verdecken echte Bugs)

## Wie ein Issue erstellt wird

1. Issue öffnen mit:
   - Verwendeten Eingabewerten
   - Erhaltenem Ergebnis
   - Erwartetem Ergebnis
   - Rechtsgrundlage für das erwartete Ergebnis

2. Wir prüfen das Issue (in der Regel innerhalb von 48 Stunden)

## Reguläre Beiträge

Für Dokumentation, neue Rechner oder Verbesserungen:

1. Repo forken
2. Branch anlegen (`feature/mein-feature` oder `fix/mein-fix`)
3. Tests für Logikänderungen hinzufügen
4. PR mit klarer Beschreibung öffnen

## Code-Standards

- TypeScript Strict Mode
- Keine Laufzeit-Abhängigkeiten
- Jede Berechnung braucht eine `RECHTSGRUNDLAGEN.md` mit offiziellen Quellen
- Mindestens 5 Testfälle pro Rechner

## Fragen?

Discussion auf GitHub öffnen oder über die Live-Tools melden.
