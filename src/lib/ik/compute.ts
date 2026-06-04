import { bracketLabel, Cv, entitlement, monthlyAllowance, round2 } from "./bareme";
import { MonthData, YearSettings } from "./storage";

export const MONTH_NAMES = [
  "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
  "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre",
] as const;

export const WEEKDAY_SHORT = ["dim.", "lun.", "mar.", "mer.", "jeu.", "ven.", "sam."] as const;

export interface Trip {
  day: number;
  dateISO: string;
  depart: string;
  destination: string;
  km: number;
}

export interface MonthSummary {
  trips: Trip[];
  monthKm: number;
  cumKmBefore: number;
  cumKm: number;
  bracket: string;
  allowance: number;
  cumAllowance: number;
}

export interface DashboardRow {
  month: number;
  label: string;
  days: number;
  km: number;
  cumKm: number;
  bracket: string;
  allowance: number;
  cumAllowance: number;
}

export const daysInMonth = (year: number, month: number): number =>
  new Date(year, month, 0).getDate();

export const isWeekend = (year: number, month: number, day: number): boolean => {
  const dow = new Date(year, month - 1, day).getDay();
  return dow === 0 || dow === 6;
};

/** Jours ouvrés (lun-ven) du mois — pour le remplissage en un clic. */
export const workweekDays = (year: number, month: number): number[] =>
  Array.from({ length: daysInMonth(year, month) }, (_, i) => i + 1).filter(
    (d) => !isWeekend(year, month, d)
  );

const pad2 = (n: number) => String(n).padStart(2, "0");

/** Trajets du mois : jours cochés triés, défaut du véhicule + overrides ponctuels. */
export function monthTrips(
  settings: YearSettings,
  data: MonthData,
  year: number,
  month: number
): Trip[] {
  return Object.entries(data.days)
    .map(([d, entry]) => ({ day: Number(d), entry }))
    .sort((a, b) => a.day - b.day)
    .map(({ day, entry }) => ({
      day,
      dateISO: `${year}-${pad2(month)}-${pad2(day)}`,
      depart: settings.depart,
      destination: entry.dest?.trim() || settings.destination,
      km: entry.km ?? settings.distanceKm,
    }));
}

export const monthKm = (
  settings: YearSettings,
  data: MonthData,
  year: number,
  month: number
): number => round2(monthTrips(settings, data, year, month).reduce((s, t) => s + t.km, 0));

/**
 * Lignes du tableau de bord annuel. La tranche et l'indemnité de chaque mois
 * découlent du CUMUL annuel : indemnité(m) = droits(cumul à fin m) − droits(cumul à fin m−1).
 */
export function dashboardRows(
  settings: YearSettings,
  months: MonthData[],
  year: number
): DashboardRow[] {
  let cumKm = 0;
  let prevCumKm = 0;
  return months.map((data, i) => {
    const month = i + 1;
    const km = monthKm(settings, data, year, month);
    prevCumKm = cumKm;
    cumKm = round2(cumKm + km);
    return {
      month,
      label: MONTH_NAMES[i],
      days: Object.keys(data.days).length,
      km,
      cumKm,
      bracket: bracketLabel(cumKm),
      allowance: monthlyAllowance(cumKm, prevCumKm, settings.cv, settings.electric),
      cumAllowance: entitlement(cumKm, settings.cv, settings.electric),
    };
  });
}

/** Résumé complet d'un mois, calculé à partir du cumul des mois précédents. */
export function monthSummary(
  settings: YearSettings,
  months: MonthData[],
  year: number,
  month: number
): MonthSummary {
  const trips = monthTrips(settings, months[month - 1], year, month);
  const km = round2(trips.reduce((s, t) => s + t.km, 0));
  let cumKmBefore = 0;
  for (let m = 1; m < month; m++) {
    cumKmBefore = round2(cumKmBefore + monthKm(settings, months[m - 1], year, m));
  }
  const cumKm = round2(cumKmBefore + km);
  return {
    trips,
    monthKm: km,
    cumKmBefore,
    cumKm,
    bracket: bracketLabel(cumKm),
    allowance: monthlyAllowance(cumKm, cumKmBefore, settings.cv, settings.electric),
    cumAllowance: entitlement(cumKm, settings.cv, settings.electric),
  };
}

/** Résumé d'un mois isolé quand on ne connaît que le cumul antérieur (lien reçu par email). */
export function monthSummaryFromCumul(
  settings: YearSettings,
  data: MonthData,
  year: number,
  month: number,
  cumKmBefore: number
): MonthSummary {
  const trips = monthTrips(settings, data, year, month);
  const km = round2(trips.reduce((s, t) => s + t.km, 0));
  const cumKm = round2(cumKmBefore + km);
  return {
    trips,
    monthKm: km,
    cumKmBefore,
    cumKm,
    bracket: bracketLabel(cumKm),
    allowance: monthlyAllowance(cumKm, cumKmBefore, settings.cv, settings.electric),
    cumAllowance: entitlement(cumKm, settings.cv, settings.electric),
  };
}

// --- Formatage français ---

export const fmtEur = (n: number): string =>
  n.toLocaleString("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " €";

export const fmtKm = (n: number): string =>
  n.toLocaleString("fr-FR", { maximumFractionDigits: 2 }) + " km";

export const fmtDate = (year: number, month: number, day: number): string =>
  `${WEEKDAY_SHORT[new Date(year, month - 1, day).getDay()]} ${pad2(day)}/${pad2(month)}/${year}`;
