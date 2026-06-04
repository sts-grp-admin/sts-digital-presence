import { compressToEncodedURIComponent, decompressFromEncodedURIComponent } from "lz-string";
import { Cv, CV_LABELS } from "./bareme";
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

export function decodeReport(encoded: string): ReportPayload | null {
  try {
    const json = decompressFromEncodedURIComponent(encoded);
    if (!json) return null;
    const parsed = JSON.parse(json) as ReportPayload;
    if (parsed.v !== 1 || !parsed.settings || !parsed.days) return null;
    return parsed;
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
    const override =
      trip.km !== settings.distanceKm || trip.destination !== settings.destination
        ? ` → ${trip.destination}`
        : "";
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
