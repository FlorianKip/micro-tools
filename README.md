# micro-tools

Open-source calculation logic for German regulatory compliance tools.

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)](https://www.typescriptlang.org/)

## Why Open Source?

These calculators implement German law. The logic should be:
- **Transparent** — you can verify the calculation yourself
- **Auditable** — legal references are linked in the code
- **Trustworthy** — no black-box magic, no AI hallucinations

## Available Calculators

| Calculator | Law | Status |
|------------|-----|--------|
| [geg-heizungstausch](./geg-heizungstausch/) | §72 GEG | ✅ Production |
| [verpackg-ruecknahme](./verpackg-ruecknahme/) | §31 VerpackG | 🚧 Coming soon |
| [aml-bargeldobergrenze](./aml-bargeldobergrenze/) | §2 GwG | 🚧 Coming soon |

## Usage

Each calculator is a standalone TypeScript module with zero dependencies.

```typescript
import { calculate } from './geg-heizungstausch/calculator';

const result = calculate({
  installationYear: 1994,
  boilerType: 'constant-temperature',
  largeCity: true,
  ownerOccupiedSince2002: false
});

// result.status: 'affected' | 'not-affected' | 'exempt'
// result.deadline: '2026-06-30' | '2028-06-30' | null
// result.reason: string (German)
// result.legalRef: string (URL to law)
```

## Structure

Each calculator follows the same pattern:

```
calculator-name/
├── calculator.ts      # Pure logic, no dependencies
├── calculator.test.ts # Edge case tests
├── types.ts           # Input/output types
├── README.md          # Legal context + examples
└── LEGAL_REFS.md      # Links to official sources
```

## Legal Disclaimer

This code implements our interpretation of German law for educational purposes. It is not legal advice. Always consult a professional for binding legal questions.

The calculations are verified against official sources (linked in each calculator), but laws change. Check the `lastVerified` date in each module.

## Contributing

Found a bug in the logic? Please open an issue with:
1. Your input values
2. Expected result (with legal reference)
3. Actual result

## License

MIT — use it, fork it, embed it. Attribution appreciated but not required.

---

Made with ❤️ and open source by [Florian Kiptschuk](https://github.com/FlorianKip)
