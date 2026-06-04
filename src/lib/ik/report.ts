import { compressToEncodedURIComponent, decompressFromEncodedURIComponent } from "lz-string";
import { Cv, CV_LABELS, isValidDailyKm } from "./bareme";
import { fmtDate, fmtEur, fmtKm, MONTH_NAMES, MonthSummary } from "./compute";
import { DayEntry, MonthData, YearSettings } from "./storage";

// « Lien magique » : toutes les données du mois voyagent compressées dans le
// fragment d'URL (#ik=…). Le fragment n'est jamais envoyé au serveur — le site
// statique régénère le xlsx exact côté navigateur du destinataire.

export interface ReportPayload {
  v: 1;
  year: number;
  month: number;
  settings: YearSettings;
  days: Record<number, DayEntry>;
  /** Cumul annuel de km à la fin du mois PRÉCÉDENT (fige la tranche côté destinataire). */
  cumKmBefore: number;
}

export const REPORT_HASH_PREFIX = "#ik=";

export function encodeReport(payload: ReportPayload): string {
  return compressToEncodedURIComponent(JSON.stringify(payload));
}

/** Validation stricte : un lien altéré/tronqué doit donner « lien invalide »,
 *  jamais une page blanche ni des NaN (revue PR #1). */
function isValidPayload(p: unknown): p is ReportPayload {
  if (typeof p !== "object" || p === null) return false;
  const r = p as Record<string, unknown>;
  if (r.v !== 1) return false;
  if (!Number.isInteger(r.year) || (r.year as number) < 2020 || (r.year as number) > 2100) return false;
  if (!Number.isInteger(r.month) || (r.month as number) < 1 || (r.month as number) > 12) return false;
  if (!Number.isFinite(r.cumKmBefore) || (r.cumKmBefore as number) < 0) return false;

  const s = r.settings as Record<string, unknown> | undefined;
  if (
    !s || typeof s.name !== "string" ||
    ![3, 4, 5, 6, 7].includes(s.cv as number) ||
    typeof s.electric !== "boolean" ||
    typeof s.depart !== "string" || typeof s.destination !== "string" ||
    !isValidDailyKm(s.distanceKm)
  ) return false;

  if (typeof r.days !== "object" || r.days === null) return false;
  for (const [key, entry] of Object.entries(r.days as Record<string, unknown>)) {
    const day = Number(key);
    if (!Number.isInteger(day) || day < 1 || day > 31) return false;
    if (typeof entry !== "object" || entry === null) return false;
    const { km, dest } = entry as DayEntry;
    if (km !== undefined && !isValidDailyKm(km)) return false;
    if (dest !== undefined && typeof dest !== "string") return false;
  }
  return true;
}

export function decodeReport(encoded: string): ReportPayload | null {
  try {
    const json = decompressFromEncodedURIComponent(encoded);
    if (!json) return null;
    const parsed: unknown = JSON.parse(json);
    return isValidPayload(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

export function reportUrl(payload: ReportPayload): string {
  return `${window.location.origin}/outils/ik${REPORT_HASH_PREFIX}${encodeReport(payload)}`;
}

export function readReportFromHash(hash: string): ReportPayload | null {
  if (!hash.startsWith(REPORT_HASH_PREFIX)) return null;
  return decodeReport(hash.slice(REPORT_HASH_PREFIX.length));
}

export const vehicleLabel = (cv: Cv, electric: boolean): string =>
  `${CV_LABELS[cv]} — ${electric ? "100 % électrique (+20 %)" : "thermique"}`;

export const reportFileBase = (settings: YearSettings, year: number, month: number): string => {
  const name = settings.name.trim().replace(/\s+/g, "-") || "salarie";
  return `IK-${String(month).padStart(2, "0")}-${year}-${name}`;
};

/** Corps d'email texte envoyé via Web3Forms (lisible sans ouvrir le xlsx). */
export function buildEmailBody(
  payload: ReportPayload,
  summary: MonthSummary,
  link: string
): string {
  const { settings, year, month } = payload;
  const lines: string[] = [
    `INDEMNITÉS KILOMÉTRIQUES — ${MONTH_NAMES[month - 1]} ${year}`,
    ``,
    `Salarié : ${settings.name}`,
    `Véhicule : ${vehicleLabel(settings.cv, settings.electric)}`,
    `Trajet habituel : ${settings.depart} → ${settings.destination} (${fmtKm(settings.distanceKm)}/jour)`,
    ``,
    `Jours travaillés : ${summary.trips.length}`,
    ``,
  ];
  for (const trip of summary.trips) {
    // « → destination » seulement si elle diffère : le km figure déjà sur la ligne
    const override =
      trip.destination !== settings.destination ? ` → ${trip.destination}` : "";
    lines.push(`  ${fmtDate(year, month, trip.day)} — ${fmtKm(trip.km)}${override}`);
  }
  lines.push(
    ``,
    `TOTAL KM DU MOIS : ${fmtKm(summary.monthKm)}`,
    `Cumul annuel : ${fmtKm(summary.cumKm)} (tranche ${summary.bracket})`,
    `INDEMNITÉ DU MOIS À PAYER : ${fmtEur(summary.allowance)}`,
    `Cumul indemnités ${year} : ${fmtEur(summary.cumAllowance)}`,
    ``,
    `———`,
    `Télécharger le fichier Excel (le lien régénère le xlsx dans votre navigateur) :`,
    link,
  );
  return lines.join("\n");
}

export function buildEmailSubject(payload: ReportPayload, summary: MonthSummary): string {
  return `[IK] ${MONTH_NAMES[payload.month - 1]} ${payload.year} — ${payload.settings.name} — ${fmtEur(summary.allowance)}`;
}

export function buildPayload(
  settings: YearSettings,
  data: MonthData,
  year: number,
  month: number,
  cumKmBefore: number
): ReportPayload {
  return { v: 1, year, month, settings, days: data.days, cumKmBefore };
}
