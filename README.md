# micro-tools

Open-Source-Berechnungslogik für deutsche Rechts- und Compliance-Tools.

[![Lizenz: MIT](https://img.shields.io/badge/Lizenz-MIT-green.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)](https://www.typescriptlang.org/)

## Warum Open Source?

Diese Rechner setzen deutsches Recht um. Die Logik sollte:
- **Nachvollziehbar** sein — jeder kann die Berechnung selbst prüfen
- **Prüfbar** sein — Rechtsgrundlagen sind im Code verlinkt
- **Vertrauenswürdig** sein — keine Blackbox, keine KI-Halluzinationen

## Verfügbare Rechner

| Rechner | Gesetz | Live-Tool | Status |
|---------|--------|-----------|--------|
| *Demnächst verfügbar* | — | — | — |

Rechner werden hier veröffentlicht, sobald das zugehörige Tool mit eigener Domain live ist.

**Regel:** Nur Tools mit eigener Domain werden hier veröffentlicht. Kein Platzhalter-Code, kein Pre-Launch-Code.

## Verwendung

Jeder Rechner ist ein eigenständiges TypeScript-Modul ohne externe Abhängigkeiten.

```typescript
import { berechne } from './geg-heizungstausch/rechner';

const ergebnis = berechne({
  einbaujahr: 1994,
  kesseltyp: 'konstanttemperatur',
  grossstadt: true,
  selbstbewohntSeit2002: false
});

// ergebnis.status: 'betroffen' | 'nicht-betroffen' | 'ausgenommen'
// ergebnis.frist: '2026-06-30' | '2028-06-30' | null
// ergebnis.begruendung: string
// ergebnis.rechtsgrundlage: string (URL zur Gesetzesquelle)
```

## Struktur

Jeder Rechner folgt demselben Aufbau:

```
rechner-name/
├── rechner.ts         # Reine Logik, keine Abhängigkeiten
├── rechner.test.ts    # Tests für Grenzfälle
├── typen.ts           # Ein- und Ausgabe-Typen
├── README.md          # Rechtlicher Kontext + Beispiele
└── RECHTSGRUNDLAGEN.md # Links zu offiziellen Quellen
```

## Rechtlicher Hinweis

Dieser Code setzt unsere Interpretation des deutschen Rechts zu Informationszwecken um. Er stellt keine Rechtsberatung dar. Bei verbindlichen Rechtsfragen immer einen Fachmann hinzuziehen.

Die Berechnungen sind gegen offizielle Quellen verifiziert (in jedem Modul verlinkt), aber Gesetze ändern sich. Das `letzteVerifizierung`-Datum im jeweiligen Modul beachten.

## Beitragen

Fehler in der Logik gefunden? Bitte ein Issue öffnen mit:
1. Den verwendeten Eingabewerten
2. Dem erwarteten Ergebnis (mit Rechtsgrundlage)
3. Dem tatsächlichen Ergebnis

## Lizenz

MIT — verwenden, forken, einbetten. Namensnennung erwünscht, aber nicht verpflichtend.

---

Von [Florian Kiptschuk](https://github.com/FlorianKip)
