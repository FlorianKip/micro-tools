/**
 * GEG §72 Heizungstausch-Pflicht Calculator
 * Types for input and output
 *
 * Legal basis: https://www.gesetze-im-internet.de/geg/__72.html
 */

export type BoilerType =
  | 'constant-temperature' // Konstanttemperaturkessel — affected
  | 'low-temperature'      // Niedertemperaturkessel — not affected
  | 'condensing'           // Brennwertkessel — not affected
  | 'unknown';             // User does not know — assume worst case

export interface CalculatorInput {
  /** Year the boiler was installed (e.g., 1994) */
  installationYear: number;

  /** Type of boiler */
  boilerType: BoilerType;

  /** Is the property in a city with >100,000 inhabitants? */
  largeCity: boolean | 'unknown';

  /** Has the owner lived in the property since before Feb 1, 2002? */
  ownerOccupiedSince2002: boolean;

  /** Reference year for calculation (default: current year) */
  referenceYear?: number;
}

export type ResultStatus =
  | 'affected'      // Must replace boiler
  | 'not-affected'  // No obligation
  | 'exempt';       // Exempt under §73 GEG

export interface CalculatorResult {
  /** The determination */
  status: ResultStatus;

  /** Deadline for replacement (ISO date string), null if not affected */
  deadline: string | null;

  /** Human-readable explanation in German */
  reason: string;

  /** URL to the relevant law section */
  legalRef: string;

  /** Maximum fine if non-compliant */
  maxFine: string | null;

  /** Age of the boiler in years */
  boilerAge: number;

  /** Whether the result has uncertainty (e.g., unknown boiler type) */
  hasUncertainty: boolean;

  /** Additional notes about uncertainty */
  uncertaintyNote: string | null;
}
