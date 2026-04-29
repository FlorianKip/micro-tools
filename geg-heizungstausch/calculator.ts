/**
 * GEG §72 Heizungstausch-Pflicht Calculator
 *
 * Implements the logic for determining whether a heating system must be
 * replaced under §72 of the German Building Energy Act (GEG).
 *
 * Legal basis:
 * - §72 GEG: https://www.gesetze-im-internet.de/geg/__72.html
 * - §73 GEG (exceptions): https://www.gesetze-im-internet.de/geg/__73.html
 *
 * Last verified: 2026-04-29
 */

import type { CalculatorInput, CalculatorResult, ResultStatus } from './types';

const LEGAL_REFS = {
  main: 'https://www.gesetze-im-internet.de/geg/__72.html',
  exceptions: 'https://www.gesetze-im-internet.de/geg/__73.html',
  enforcement: 'https://www.gesetze-im-internet.de/geg/__97.html',
};

const MAX_BOILER_AGE = 30;
const MAX_FINE = '50.000 EUR';
const DEADLINE_LARGE_CITY = '2026-06-30';
const DEADLINE_SMALL_CITY = '2028-06-30';
const EXCEPTION_CUTOFF_DATE = new Date('2002-02-01');

/**
 * Calculate whether a boiler must be replaced under §72 GEG.
 *
 * Decision tree:
 * 1. Check boiler type — only constant-temperature boilers are affected
 * 2. Check age — must be 30+ years old
 * 3. Check §73 exception — owner-occupied since before Feb 2002
 * 4. Determine deadline based on city size
 */
export function calculate(input: CalculatorInput): CalculatorResult {
  const referenceYear = input.referenceYear ?? new Date().getFullYear();
  const boilerAge = referenceYear - input.installationYear;

  // Step 1: Boiler type check
  // Only Konstanttemperaturkessel fall under §72 GEG
  if (input.boilerType === 'low-temperature' || input.boilerType === 'condensing') {
    return {
      status: 'not-affected',
      deadline: null,
      reason: 'Nur Konstanttemperaturkessel fallen unter §72 GEG. Niedertemperatur- und Brennwertkessel sind nicht betroffen.',
      legalRef: LEGAL_REFS.main,
      maxFine: null,
      boilerAge,
      hasUncertainty: false,
      uncertaintyNote: null,
    };
  }

  // Step 2: Age check (30-year rule)
  if (boilerAge < MAX_BOILER_AGE) {
    const yearsRemaining = MAX_BOILER_AGE - boilerAge;
    return {
      status: 'not-affected',
      deadline: null,
      reason: `Deine Heizung ist ${boilerAge} Jahre alt. Die 30-Jahre-Regel greift erst in ${yearsRemaining} Jahren (ab ${input.installationYear + MAX_BOILER_AGE}).`,
      legalRef: LEGAL_REFS.main,
      maxFine: null,
      boilerAge,
      hasUncertainty: input.boilerType === 'unknown',
      uncertaintyNote: input.boilerType === 'unknown'
        ? 'Kesseltyp unbekannt — Ergebnis gilt nur falls es sich um einen Konstanttemperaturkessel handelt.'
        : null,
    };
  }

  // Step 3: §73 Exception check
  // Owner-occupied properties where owner has lived there since before Feb 1, 2002
  if (input.ownerOccupiedSince2002) {
    return {
      status: 'exempt',
      deadline: null,
      reason: 'Du bist nach §73 GEG befreit: Selbstnutzende Eigentümer, die vor dem 01.02.2002 eingezogen sind, müssen nicht tauschen.',
      legalRef: LEGAL_REFS.exceptions,
      maxFine: null,
      boilerAge,
      hasUncertainty: false,
      uncertaintyNote: null,
    };
  }

  // Step 4: Determine deadline based on city size
  let deadline: string;
  let deadlineNote: string;
  let hasUncertainty = input.boilerType === 'unknown' || input.largeCity === 'unknown';

  if (input.largeCity === 'unknown') {
    // Conservative assumption: earlier deadline
    deadline = DEADLINE_LARGE_CITY;
    deadlineNote = `Frist: ${formatDate(DEADLINE_LARGE_CITY)} (konservative Annahme — prüfe ob deine Stadt >100.000 Einwohner hat)`;
  } else if (input.largeCity) {
    deadline = DEADLINE_LARGE_CITY;
    deadlineNote = `Frist: ${formatDate(DEADLINE_LARGE_CITY)} (Großstadt >100.000 Einwohner)`;
  } else {
    deadline = DEADLINE_SMALL_CITY;
    deadlineNote = `Frist: ${formatDate(DEADLINE_SMALL_CITY)} (Gemeinde <100.000 Einwohner)`;
  }

  const uncertaintyNote = buildUncertaintyNote(input);

  return {
    status: 'affected',
    deadline,
    reason: `Dein Konstanttemperaturkessel ist ${boilerAge} Jahre alt und muss ersetzt werden. ${deadlineNote}. Bei Verstoß droht ein Bußgeld bis ${MAX_FINE}.`,
    legalRef: LEGAL_REFS.main,
    maxFine: MAX_FINE,
    boilerAge,
    hasUncertainty,
    uncertaintyNote,
  };
}

function formatDate(isoDate: string): string {
  const [year, month, day] = isoDate.split('-');
  return `${day}.${month}.${year}`;
}

function buildUncertaintyNote(input: CalculatorInput): string | null {
  const notes: string[] = [];

  if (input.boilerType === 'unknown') {
    notes.push('Kesseltyp unbekannt — prüfe das Typenschild oder frag deinen Schornsteinfeger.');
  }

  if (input.largeCity === 'unknown') {
    notes.push('Stadtgröße unbekannt — die Frist hängt davon ab, ob deine Stadt >100.000 Einwohner hat.');
  }

  return notes.length > 0 ? notes.join(' ') : null;
}

export { LEGAL_REFS };
