/**
 * Content readiness flags. While a flag is false the section is hidden in PRODUCTION
 * builds but still shown on Vercel previews / local dev (with a "Gambar sebenar akan datang" note)
 * so Fazlee can review the layout. Flip to true once the matching data file has real entries.
 */
export const TEAM_READY = false; // src/data/team.ts
export const OPERATORS_READY = false; // src/data/operators.ts
export const FOUNDER_READY = false; // src/data/founder.ts

export const IS_PRODUCTION = __VERCEL_ENV__ === 'production';

export function showSection(ready: boolean) {
  return ready || !IS_PRODUCTION;
}
