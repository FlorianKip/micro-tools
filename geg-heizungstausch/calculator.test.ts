/**
 * Tests for GEG §72 Heizungstausch Calculator
 *
 * Run with: npx tsx --test calculator.test.ts
 * Or with any test runner that supports TypeScript
 */

import { calculate } from './calculator';
import type { CalculatorInput } from './types';

const REFERENCE_YEAR = 2026;

function test(name: string, fn: () => void) {
  try {
    fn();
    console.log(`✓ ${name}`);
  } catch (e) {
    console.error(`✗ ${name}`);
    console.error(e);
    process.exitCode = 1;
  }
}

function assertEquals<T>(actual: T, expected: T, message?: string) {
  if (actual !== expected) {
    throw new Error(message || `Expected ${expected}, got ${actual}`);
  }
}

// === Boiler Type Tests ===

test('Low-temperature boiler is never affected', () => {
  const result = calculate({
    installationYear: 1980,
    boilerType: 'low-temperature',
    largeCity: true,
    ownerOccupiedSince2002: false,
    referenceYear: REFERENCE_YEAR,
  });
  assertEquals(result.status, 'not-affected');
  assertEquals(result.deadline, null);
});

test('Condensing boiler is never affected', () => {
  const result = calculate({
    installationYear: 1980,
    boilerType: 'condensing',
    largeCity: true,
    ownerOccupiedSince2002: false,
    referenceYear: REFERENCE_YEAR,
  });
  assertEquals(result.status, 'not-affected');
});

// === Age Tests ===

test('Boiler under 30 years is not affected', () => {
  const result = calculate({
    installationYear: 2000,
    boilerType: 'constant-temperature',
    largeCity: true,
    ownerOccupiedSince2002: false,
    referenceYear: REFERENCE_YEAR,
  });
  assertEquals(result.status, 'not-affected');
  assertEquals(result.boilerAge, 26);
});

test('Boiler exactly 30 years old is affected', () => {
  const result = calculate({
    installationYear: 1996,
    boilerType: 'constant-temperature',
    largeCity: true,
    ownerOccupiedSince2002: false,
    referenceYear: REFERENCE_YEAR,
  });
  assertEquals(result.status, 'affected');
  assertEquals(result.boilerAge, 30);
});

test('Boiler 31 years old is affected', () => {
  const result = calculate({
    installationYear: 1995,
    boilerType: 'constant-temperature',
    largeCity: true,
    ownerOccupiedSince2002: false,
    referenceYear: REFERENCE_YEAR,
  });
  assertEquals(result.status, 'affected');
});

// === §73 Exception Tests ===

test('Owner-occupied since before 2002 is exempt', () => {
  const result = calculate({
    installationYear: 1990,
    boilerType: 'constant-temperature',
    largeCity: true,
    ownerOccupiedSince2002: true,
    referenceYear: REFERENCE_YEAR,
  });
  assertEquals(result.status, 'exempt');
  assertEquals(result.deadline, null);
  assertEquals(result.maxFine, null);
});

test('Not owner-occupied since 2002 is not exempt', () => {
  const result = calculate({
    installationYear: 1990,
    boilerType: 'constant-temperature',
    largeCity: true,
    ownerOccupiedSince2002: false,
    referenceYear: REFERENCE_YEAR,
  });
  assertEquals(result.status, 'affected');
});

// === Deadline Tests ===

test('Large city gets 2026 deadline', () => {
  const result = calculate({
    installationYear: 1990,
    boilerType: 'constant-temperature',
    largeCity: true,
    ownerOccupiedSince2002: false,
    referenceYear: REFERENCE_YEAR,
  });
  assertEquals(result.deadline, '2026-06-30');
});

test('Small city gets 2028 deadline', () => {
  const result = calculate({
    installationYear: 1990,
    boilerType: 'constant-temperature',
    largeCity: false,
    ownerOccupiedSince2002: false,
    referenceYear: REFERENCE_YEAR,
  });
  assertEquals(result.deadline, '2028-06-30');
});

test('Unknown city size defaults to 2026 (conservative)', () => {
  const result = calculate({
    installationYear: 1990,
    boilerType: 'constant-temperature',
    largeCity: 'unknown',
    ownerOccupiedSince2002: false,
    referenceYear: REFERENCE_YEAR,
  });
  assertEquals(result.deadline, '2026-06-30');
  assertEquals(result.hasUncertainty, true);
});

// === Uncertainty Tests ===

test('Unknown boiler type flags uncertainty', () => {
  const result = calculate({
    installationYear: 1990,
    boilerType: 'unknown',
    largeCity: true,
    ownerOccupiedSince2002: false,
    referenceYear: REFERENCE_YEAR,
  });
  assertEquals(result.status, 'affected');
  assertEquals(result.hasUncertainty, true);
});

test('Known inputs have no uncertainty', () => {
  const result = calculate({
    installationYear: 1990,
    boilerType: 'constant-temperature',
    largeCity: true,
    ownerOccupiedSince2002: false,
    referenceYear: REFERENCE_YEAR,
  });
  assertEquals(result.hasUncertainty, false);
  assertEquals(result.uncertaintyNote, null);
});

// === Edge Cases ===

test('Very old boiler (50+ years) is affected', () => {
  const result = calculate({
    installationYear: 1970,
    boilerType: 'constant-temperature',
    largeCity: true,
    ownerOccupiedSince2002: false,
    referenceYear: REFERENCE_YEAR,
  });
  assertEquals(result.status, 'affected');
  assertEquals(result.boilerAge, 56);
});

test('Brand new boiler is not affected', () => {
  const result = calculate({
    installationYear: 2025,
    boilerType: 'constant-temperature',
    largeCity: true,
    ownerOccupiedSince2002: false,
    referenceYear: REFERENCE_YEAR,
  });
  assertEquals(result.status, 'not-affected');
  assertEquals(result.boilerAge, 1);
});

console.log('\nAll tests completed.');
