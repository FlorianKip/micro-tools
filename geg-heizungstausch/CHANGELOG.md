# Changelog

All notable changes to the GEG §72 Heizungstausch calculator.

## [1.0.0] - 2026-04-29

### Added
- Initial implementation of §72 GEG logic
- Support for all boiler types (constant-temperature, low-temperature, condensing)
- §73 exception handling (owner-occupied since before Feb 2002)
- Deadline calculation based on city size (>100k inhabitants)
- Uncertainty handling for unknown inputs
- 14 test cases covering all edge cases

### Legal Basis
- Verified against §72 GEG: https://www.gesetze-im-internet.de/geg/__72.html
- Verified against §73 GEG: https://www.gesetze-im-internet.de/geg/__73.html
- Last legal review: 2026-04-29

---

## Versioning Policy

This calculator follows the law. Version bumps mean:

- **MAJOR** (2.0.0): Law fundamentally changed, old logic deprecated
- **MINOR** (1.1.0): New provisions added, existing logic still valid  
- **PATCH** (1.0.1): Bug fix or clarification, no legal change

We monitor:
- [BGBl](https://www.bgbl.de/) for GEG amendments
- [BMWK](https://www.bmwk.de/) for official interpretations
