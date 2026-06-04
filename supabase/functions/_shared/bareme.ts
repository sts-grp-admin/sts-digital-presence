// SOURCE UNIQUE du barème kilométrique — partagée entre le site (Vite) et
// l'Edge Function (Deno). Aucune dépendance : TS pur.
//
// Barème VOITURE, taux DGFiP gelés depuis 2023 (inchangés 2024-2026).
// Le barème est ANNUEL, à 3 tranches déterminées par le CUMUL de km depuis
// le 1er janvier (jamais par les km du mois) :
//   d ≤ 5 000          → d × c1
//   5 001 ≤ d ≤ 20 000 → d × c2 + forfait
//   d > 20 000         → d × c3
// Véhicule 100 % électrique : majoration +20 %.

/** Puissance fiscale : 3 = "3 CV et moins", 7 = "7 CV et plus" */
export type Cv = 3 | 4 | 5 | 6 | 7;

export interface BaremeRow {
  c1: number;
  c2: number;
  fixed: number;
  c3: number;
}

export const BAREME: Record<Cv, BaremeRow> = {
  3: { c1: 0.529, c2: 0.316, fixed: 1065, c3: 0.37 },
  4: { c1: 0.606, c2: 0.34, fixed: 1330, c3: 0.407 },
  5: { c1: 0.636, c2: 0.357, fixed: 1395, c3: 0.427 },
  6: { c1: 0.665, c2: 0.374, fixed: 1457, c3: 0.447 },
  7: { c1: 0.697, c2: 0.394, fixed: 1515, c3: 0.47 },
};

export const CV_LABELS: Record<Cv, string> = {
  3: "3 CV et moins",
  4: "4 CV",
  5: "5 CV",
  6: "6 CV",
  7: "7 CV et plus",
};

export const ELECTRIC_FACTOR = 1.2;

/** Plafond de vraisemblance d'une distance quotidienne (km) — borne anti-données aberrantes. */
export const MAX_DAILY_KM = 2000;

export const round2 = (n: number): number =>
  Math.round((n + Number.EPSILON) * 100) / 100;

/** Indemnité totale due pour un cumul annuel de `km`, arrondie à 2 décimales. */
export function entitlement(km: number, cv: Cv, electric: boolean): number {
  const b = BAREME[cv];
  let e: number;
  if (km <= 5000) e = km * b.c1;
  else if (km <= 20000) e = km * b.c2 + b.fixed;
  else e = km * b.c3;
  if (electric) e *= ELECTRIC_FACTOR;
  return round2(e);
}

/**
 * Indemnité du mois : différence des droits cumulés. Gère automatiquement
 * les passages de tranche.
 */
export function monthlyAllowance(
  cumKmThroughMonth: number,
  cumKmThroughPrevMonth: number,
  cv: Cv,
  electric: boolean
): number {
  return round2(
    entitlement(cumKmThroughMonth, cv, electric) -
      entitlement(cumKmThroughPrevMonth, cv, electric)
  );
}

export function bracketLabel(cumKm: number): string {
  if (cumKm <= 5000) return "≤ 5 000 km";
  if (cumKm <= 20000) return "5 001 – 20 000 km";
  return "> 20 000 km";
}

/** Une distance quotidienne est-elle plausible ? (finie, > 0, ≤ plafond) */
export const isValidDailyKm = (km: unknown): km is number =>
  typeof km === "number" && Number.isFinite(km) && km > 0 && km <= MAX_DAILY_KM;
