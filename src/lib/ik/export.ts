import { BAREME, Cv, CV_LABELS } from "./bareme";
import { DashboardRow, fmtDate, MONTH_NAMES, MonthSummary } from "./compute";
import { reportFileBase, vehicleLabel } from "./report";
import { YearSettings } from "./storage";

// Exports générés 100 % côté navigateur (aucune donnée envoyée à un serveur).
// exceljs (~lourd) est importé dynamiquement pour ne pas alourdir le site public.

const EUR_FMT = '#,##0.00 "€"';
const HEADER_FILL = { type: "pattern", pattern: "solid", fgColor: { argb: "FFE8EEF4" } } as const;
const TITLE_FILL = { type: "pattern", pattern: "solid", fgColor: { argb: "FF1B3A5C" } } as const;

function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

function bufferToBase64(buf: ArrayBuffer): string {
  const bytes = new Uint8Array(buf);
  let bin = "";
  const chunk = 0x8000;
  for (let i = 0; i < bytes.length; i += chunk) {
    bin += String.fromCharCode(...bytes.subarray(i, i + chunk));
  }
  return btoa(bin);
}

async function buildMonthXlsxBuffer(
  settings: YearSettings,
  summary: MonthSummary,
  year: number,
  month: number,
  dashboard?: DashboardRow[]
): Promise<ArrayBuffer> {
  const ExcelJS = await import("exceljs");
  const wb = new ExcelJS.Workbook();
  const monthLabel = `${MONTH_NAMES[month - 1]} ${year}`;

  // --- Feuille du mois ---
  const ws = wb.addWorksheet(`IK ${monthLabel}`);
  ws.columns = [
    { width: 18 }, { width: 44 }, { width: 44 }, { width: 14 },
  ];

  ws.mergeCells("A1:D1");
  const title = ws.getCell("A1");
  title.value = `Indemnités kilométriques — ${monthLabel}`;
  title.font = { name: "Arial", bold: true, size: 14, color: { argb: "FFFFFFFF" } };
  title.fill = TITLE_FILL;
  title.alignment = { vertical: "middle" };
  ws.getRow(1).height = 26;

  const info: [string, string | number][] = [
    ["Nom & Prénom", settings.name],
    ["Véhicule", vehicleLabel(settings.cv, settings.electric)],
    ["Trajet habituel", `${settings.depart} → ${settings.destination}`],
    ["Distance habituelle (km/jour)", settings.distanceKm],
  ];
  info.forEach(([label, value], i) => {
    const row = ws.getRow(3 + i);
    row.getCell(1).value = label;
    row.getCell(1).font = { name: "Arial", bold: true };
    row.getCell(2).value = value;
  });

  const tableHeaderRowIdx = 8;
  const header = ws.getRow(tableHeaderRowIdx);
  ["Date", "Départ", "Destination / Client", "Distance (km)"].forEach((h, i) => {
    const cell = header.getCell(i + 1);
    cell.value = h;
    cell.font = { name: "Arial", bold: true };
    cell.fill = HEADER_FILL;
    cell.border = { bottom: { style: "thin" } };
  });

  summary.trips.forEach((trip, i) => {
    const row = ws.getRow(tableHeaderRowIdx + 1 + i);
    const dateCell = row.getCell(1);
    dateCell.value = new Date(Date.UTC(year, month - 1, trip.day));
    dateCell.numFmt = "ddd dd/mm/yyyy";
    row.getCell(2).value = trip.depart;
    row.getCell(3).value = trip.destination;
    row.getCell(4).value = trip.km;
  });

  const firstDataRow = tableHeaderRowIdx + 1;
  const lastDataRow = tableHeaderRowIdx + summary.trips.length;
  const totalRow = ws.getRow(lastDataRow + 1);
  totalRow.getCell(3).value = "TOTAL";
  totalRow.getCell(3).font = { name: "Arial", bold: true };
  totalRow.getCell(4).value =
    summary.trips.length > 0
      ? { formula: `SUM(D${firstDataRow}:D${lastDataRow})`, result: summary.monthKm }
      : 0;
  totalRow.getCell(4).font = { name: "Arial", bold: true };
  totalRow.getCell(4).border = { top: { style: "thin" } };

  const recap: [string, string | number, string?][] = [
    [`Cumul annuel à fin ${MONTH_NAMES[month - 1].toLowerCase()} (km)`, summary.cumKm],
    ["Tranche du barème (selon cumul annuel)", summary.bracket],
    ["INDEMNITÉ DU MOIS — À PAYER", summary.allowance, EUR_FMT],
    [`Cumul indemnités ${year}`, summary.cumAllowance, EUR_FMT],
  ];
  recap.forEach(([label, value, numFmt], i) => {
    const row = ws.getRow(lastDataRow + 3 + i);
    row.getCell(1).value = label as string;
    row.getCell(1).font = { name: "Arial", bold: i === 2 };
    const cell = row.getCell(4);
    cell.value = value as string | number;
    if (numFmt) cell.numFmt = numFmt;
    if (i === 2) {
      cell.font = { name: "Arial", bold: true };
      cell.fill = HEADER_FILL;
    }
  });

  const noteRow = ws.getRow(lastDataRow + 8);
  noteRow.getCell(1).value =
    "Calcul : barème annuel progressif — indemnité(cumul à fin de mois) − indemnité(cumul à fin du mois précédent). " +
    "La tranche dépend du cumul annuel, jamais du mois seul.";
  noteRow.getCell(1).font = { name: "Arial", italic: true, size: 9 };
  ws.mergeCells(lastDataRow + 8, 1, lastDataRow + 8, 4);

  // --- Feuille récap annuel (export local uniquement) ---
  if (dashboard) {
    const wsYear = wb.addWorksheet(`Récap ${year}`);
    wsYear.columns = [
      { width: 14 }, { width: 10 }, { width: 12 }, { width: 12 },
      { width: 20 }, { width: 16 }, { width: 18 },
    ];
    wsYear.mergeCells("A1:G1");
    const yTitle = wsYear.getCell("A1");
    yTitle.value = `Indemnités kilométriques ${year} — suivi annuel — ${settings.name}`;
    yTitle.font = { name: "Arial", bold: true, size: 13, color: { argb: "FFFFFFFF" } };
    yTitle.fill = TITLE_FILL;
    wsYear.getRow(1).height = 24;

    const yHeader = wsYear.getRow(3);
    ["Mois", "Jours", "Km", "Cumul km", "Tranche", "Indemnité", "Cumul indemnité"].forEach((h, i) => {
      const cell = yHeader.getCell(i + 1);
      cell.value = h;
      cell.font = { name: "Arial", bold: true };
      cell.fill = HEADER_FILL;
      cell.border = { bottom: { style: "thin" } };
    });
    dashboard.forEach((r, i) => {
      const row = wsYear.getRow(4 + i);
      row.getCell(1).value = r.label;
      row.getCell(2).value = r.days;
      row.getCell(3).value = r.km;
      row.getCell(4).value = r.cumKm;
      row.getCell(5).value = r.bracket;
      row.getCell(6).value = r.allowance;
      row.getCell(6).numFmt = EUR_FMT;
      row.getCell(7).value = r.cumAllowance;
      row.getCell(7).numFmt = EUR_FMT;
    });
    const last = dashboard[dashboard.length - 1];
    const totalY = wsYear.getRow(4 + dashboard.length);
    totalY.getCell(1).value = "TOTAL ANNÉE";
    totalY.getCell(2).value = { formula: "SUM(B4:B15)", result: dashboard.reduce((s, r) => s + r.days, 0) };
    totalY.getCell(3).value = { formula: "SUM(C4:C15)", result: last?.cumKm ?? 0 };
    totalY.getCell(6).value = { formula: "SUM(F4:F15)", result: last?.cumAllowance ?? 0 };
    totalY.getCell(6).numFmt = EUR_FMT;
    totalY.eachCell((cell) => {
      cell.font = { name: "Arial", bold: true };
      cell.border = { top: { style: "thin" } };
    });
  }

  // --- Feuille barème ---
  const wsBareme = wb.addWorksheet("Barème");
  wsBareme.columns = [{ width: 16 }, { width: 18 }, { width: 18 }, { width: 22 }, { width: 18 }];
  wsBareme.mergeCells("A1:E1");
  const bTitle = wsBareme.getCell("A1");
  bTitle.value = "Barème kilométrique VOITURE — taux gelés depuis 2023";
  bTitle.font = { name: "Arial", bold: true };
  bTitle.fill = HEADER_FILL;
  const bHeader = wsBareme.getRow(3);
  ["Puissance fiscale", "≤ 5 000 km (× d)", "5 001–20 000 (× d)", "5 001–20 000 (+ forfait €)", "> 20 000 km (× d)"].forEach(
    (h, i) => {
      bHeader.getCell(i + 1).value = h;
      bHeader.getCell(i + 1).font = { name: "Arial", bold: true };
    }
  );
  ([3, 4, 5, 6, 7] as Cv[]).forEach((cv, i) => {
    const b = BAREME[cv];
    const row = wsBareme.getRow(4 + i);
    row.getCell(1).value = CV_LABELS[cv];
    row.getCell(2).value = b.c1;
    row.getCell(3).value = b.c2;
    row.getCell(4).value = b.fixed;
    row.getCell(5).value = b.c3;
  });
  wsBareme.getCell("A10").value =
    "Source : barème forfaitaire DGFiP (inchangé 2023-2026). Véhicule 100 % électrique : majoration +20 %.";
  wsBareme.getCell("A10").font = { name: "Arial", italic: true, size: 9 };
  wsBareme.mergeCells("A10:E10");

  // Police par défaut sur toutes les cellules restantes
  wb.eachSheet((sheet) =>
    sheet.eachRow((row) =>
      row.eachCell((cell) => {
        if (!cell.font?.name) cell.font = { ...cell.font, name: "Arial" };
      })
    )
  );

  return (await wb.xlsx.writeBuffer()) as ArrayBuffer;
}

export async function exportMonthXlsx(
  settings: YearSettings,
  summary: MonthSummary,
  year: number,
  month: number,
  dashboard?: DashboardRow[]
): Promise<void> {
  const buffer = await buildMonthXlsxBuffer(settings, summary, year, month, dashboard);
  downloadBlob(
    new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" }),
    `${reportFileBase(settings, year, month)}.xlsx`
  );
}

/** xlsx encodé base64, pour l'envoi en pièce jointe via l'Edge Function. */
export async function buildMonthXlsxBase64(
  settings: YearSettings,
  summary: MonthSummary,
  year: number,
  month: number,
  dashboard?: DashboardRow[]
): Promise<{ base64: string; filename: string }> {
  const buffer = await buildMonthXlsxBuffer(settings, summary, year, month, dashboard);
  return {
    base64: bufferToBase64(buffer),
    filename: `${reportFileBase(settings, year, month)}.xlsx`,
  };
}

// --- CSV (séparateur ; et virgule décimale, pour Excel français) ---

const csvNum = (n: number): string => n.toFixed(2).replace(".", ",");
const csvField = (v: string | number): string => {
  const s = String(v);
  return /[;"\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
};
const csvLine = (...fields: (string | number)[]): string => fields.map(csvField).join(";");

export function exportMonthCsv(
  settings: YearSettings,
  summary: MonthSummary,
  year: number,
  month: number
): void {
  const lines = [
    csvLine("Indemnités kilométriques", `${MONTH_NAMES[month - 1]} ${year}`),
    csvLine("Nom & Prénom", settings.name),
    csvLine("Véhicule", vehicleLabel(settings.cv, settings.electric)),
    "",
    csvLine("Date", "Départ", "Destination / Client", "Distance (km)"),
    ...summary.trips.map((t) =>
      csvLine(fmtDate(year, month, t.day), t.depart, t.destination, csvNum(t.km))
    ),
    csvLine("TOTAL", "", "", csvNum(summary.monthKm)),
    "",
    csvLine("Cumul annuel (km)", csvNum(summary.cumKm)),
    csvLine("Tranche du barème", summary.bracket),
    csvLine("Indemnité du mois à payer (€)", csvNum(summary.allowance)),
    csvLine(`Cumul indemnités ${year} (€)`, csvNum(summary.cumAllowance)),
  ];
  // BOM UTF-8 pour qu'Excel reconnaisse les accents
  downloadBlob(
    new Blob(["\uFEFF" + lines.join("\r\n")], { type: "text/csv;charset=utf-8" }),
    `${reportFileBase(settings, year, month)}.csv`
  );
}
