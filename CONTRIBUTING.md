# Contributing to micro-tools

Found a bug in the calculation logic? You might earn a bounty.

## Bug Bounty Program

We offer **50€** for verified bugs in the calculation logic that would lead to incorrect results for users.

### What qualifies:

- Logic errors that produce wrong results
- Edge cases not handled correctly
- Outdated legal references (law changed but code did not)
- Missing validation that allows invalid inputs

### What does NOT qualify:

- Typos in documentation
- Code style suggestions
- Feature requests
- Bugs in test files (unless they mask real bugs)

### How to claim:

1. Open an issue with:
   - Input values you used
   - Result you got
   - Result you expected
   - Legal reference proving the expected result

2. Wait for verification (usually within 48h)

3. If confirmed, you will be credited in the fix commit and receive 50€ via PayPal

### Examples of past bounties:

*None yet — be the first!*

## Regular Contributions

For non-bounty contributions (docs, new calculators, improvements):

1. Fork the repo
2. Create a branch (`feat/your-feature` or `fix/your-fix`)
3. Add tests for any logic changes
4. Open a PR with a clear description

## Code Standards

- TypeScript strict mode
- Zero runtime dependencies
- Every calculation must have a `LEGAL_REFS.md` with official sources
- Minimum 5 test cases per calculator

## Questions?

Open a Discussion on GitHub or reach out via the live tools.
