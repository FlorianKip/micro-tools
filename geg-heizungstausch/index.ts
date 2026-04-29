/**
 * GEG §72 Heizungstausch-Pflicht Calculator
 *
 * Determines whether a heating system must be replaced under German law.
 *
 * @example
 * import { calculate } from '@btf/geg-heizungstausch';
 *
 * const result = calculate({
 *   installationYear: 1994,
 *   boilerType: 'constant-temperature',
 *   largeCity: true,
 *   ownerOccupiedSince2002: false
 * });
 *
 * @see https://www.gesetze-im-internet.de/geg/__72.html
 */

export { calculate, LEGAL_REFS } from './calculator';
export type {
  CalculatorInput,
  CalculatorResult,
  BoilerType,
  ResultStatus,
} from './types';
