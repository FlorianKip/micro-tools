# GEG §72 Heizungstausch-Pflicht Calculator

Determines whether a heating system must be replaced under the German Building Energy Act (GEG).

## Legal Background

Since 2024, the GEG requires replacement of old constant-temperature boilers (Konstanttemperaturkessel) that are 30+ years old. The deadline depends on city size:

- **Large cities (>100,000 inhabitants):** June 30, 2026
- **Smaller municipalities:** June 30, 2028

Non-compliance can result in fines up to **50,000 EUR**.

## Decision Logic

```
1. Is it a constant-temperature boiler?
   └─ No → NOT AFFECTED (low-temp and condensing boilers are fine)

2. Is the boiler 30+ years old?
   └─ No → NOT AFFECTED (wait until it turns 30)

3. Has the owner lived in the property since before Feb 1, 2002?
   └─ Yes → EXEMPT under §73 GEG

4. Is the property in a city with >100,000 inhabitants?
   ├─ Yes → Deadline: June 30, 2026
   └─ No  → Deadline: June 30, 2028
```

## Usage

```typescript
import { calculate } from './calculator';

const result = calculate({
  installationYear: 1994,
  boilerType: 'constant-temperature',
  largeCity: true,
  ownerOccupiedSince2002: false
});

console.log(result.status);   // 'affected'
console.log(result.deadline); // '2026-06-30'
console.log(result.reason);   // German explanation
console.log(result.maxFine);  // '50.000 EUR'
```

## Input Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `installationYear` | number | Year the boiler was installed |
| `boilerType` | string | `'constant-temperature'`, `'low-temperature'`, `'condensing'`, or `'unknown'` |
| `largeCity` | boolean \| 'unknown' | Whether the city has >100,000 inhabitants |
| `ownerOccupiedSince2002` | boolean | Owner has lived there since before Feb 1, 2002 |
| `referenceYear` | number? | Optional, defaults to current year |

## Output

| Field | Type | Description |
|-------|------|-------------|
| `status` | string | `'affected'`, `'not-affected'`, or `'exempt'` |
| `deadline` | string \| null | ISO date (e.g., `'2026-06-30'`) or null |
| `reason` | string | Human-readable explanation (German) |
| `legalRef` | string | URL to the law |
| `maxFine` | string \| null | Maximum fine if applicable |
| `boilerAge` | number | Calculated age of the boiler |
| `hasUncertainty` | boolean | Whether input had unknowns |
| `uncertaintyNote` | string \| null | Explanation of uncertainty |

## Legal References

- [§72 GEG](https://www.gesetze-im-internet.de/geg/__72.html) — Main replacement obligation
- [§73 GEG](https://www.gesetze-im-internet.de/geg/__73.html) — Exceptions (owner-occupied)
- [§97 GEG](https://www.gesetze-im-internet.de/geg/__97.html) — Enforcement by chimney sweep

## Verification

Last verified against official legal text: **2026-04-29**

Run tests:
```bash
npx tsx --test calculator.test.ts
```

## Live Tool

This calculator powers [heizungstausch-pflicht-rechner.de](https://heizungstausch-pflicht-rechner.de)
