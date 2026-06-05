import logoUrl from "@/assets/sabius_logo.png";
import { DECLARATION_SALARIE, LEGAL_LINE } from "../../../supabase/functions/_shared/legal";
import { fmtEur, fmtKm, MonthSummary, fmtDate, MONTH_NAMES } from "./compute";
import { reportFileBase, vehicleLabel } from "./report";
import { YearSettings } from "./storage";

// Justificatif PDF mensuel (compta) — généré 100 % côté navigateur.
// jsPDF est importé dynamiquement : il ne pèse que sur le clic « PDF ».

const TEAL: [number, number, number] = [57, 171, 168]; // primary du site
const NIGHT: [number, number, number] = [22, 40, 43]; // night du site

/** Les polices PDF standard sont en WinAnsi : on remplace ce qui n'y existe pas. */
const pdfText = (s: string): string =>
  s.replace(/[\u202F\u00A0]/g, " ").replace(/→/g, ">").replace(/–/g, "-").replace(/≤/g, "<=");

// Mêmes règles d'affichage que l'écran et le xlsx (compute.ts), normalisées WinAnsi
const eur = (n: number): string => pdfText(fmtEur(n)).replace("€", "EUR");
const km = (n: number): string => pdfText(fmtKm(n));

async function loadLogoDataUrl(): Promise<string | null> {
  try {
    const blob = await (await fetch(logoUrl)).blob();
    return await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result));
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch {
    return null; // le justificatif reste valable sans logo
  }
}

async function buildMonthPdf(
  settings: YearSettings,
  summary: MonthSummary,
  year: number,
  month: number
) {
  const [{ default: JsPDF }, { default: autoTable }, logo] = await Promise.all([
    import("jspdf"),
    import("jspdf-autotable"),
    loadLogoDataUrl(),
  ]);

  const doc = new JsPDF({ unit: "mm", format: "a4" });
  const pageW = doc.internal.pageSize.getWidth();
  const margin = 16;

  // ── En-tête : logo + titre ──
  // Logo dimensionné par son ratio réel et plafonné (h 14 mm / l 34 mm) ;
  // tout le contenu démarre SOUS le plus bas de (logo, titre) — plus aucun
  // chevauchement quel que soit le fichier logo.
  let headerBottom = 26;
  if (logo) {
    const props = doc.getImageProperties(logo);
    const ratio = props.width / props.height;
    const h = Math.min(14, 34 / ratio);
    const w = h * ratio;
    doc.addImage(logo, "PNG", margin, 12, w, h);
    headerBottom = Math.max(headerBottom, 12 + h);
  }
  doc.setFont("helvetica", "bold");
  doc.setFontSize(15);
  doc.setTextColor(...NIGHT);
  doc.text("INDEMNITÉS KILOMÉTRIQUES", pageW - margin, 18, { align: "right" });
  doc.setFontSize(10.5);
  doc.setTextColor(...TEAL);
  doc.text(
    pdfText(`Justificatif mensuel — ${MONTH_NAMES[month - 1]} ${year}`),
    pageW - margin, 24, { align: "right" }
  );
  const lineY = headerBottom + 4;
  doc.setDrawColor(...TEAL);
  doc.setLineWidth(0.6);
  doc.line(margin, lineY, pageW - margin, lineY);

  // ── Bloc salarié ──
  const info: [string, string][] = [
    ["Salarié", pdfText(settings.name)],
    ["Véhicule", pdfText(vehicleLabel(settings.cv, settings.electric))],
    ["Trajet habituel", pdfText(`${settings.depart} > ${settings.destination}`)],
    ["Distance habituelle", `${km(settings.distanceKm)} / jour travaillé`],
  ];
  doc.setFontSize(9);
  let y = lineY + 7;
  for (const [label, value] of info) {
    doc.setFont("helvetica", "bold");
    doc.setTextColor(110);
    doc.text(label, margin, y);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(30);
    doc.text(value, margin + 38, y, { maxWidth: pageW - margin * 2 - 38 });
    y += 5.5;
  }

  // ── Tableau des trajets ──
  autoTable(doc, {
    startY: y + 2,
    margin: { left: margin, right: margin },
    head: [["Date", "Départ", "Destination / Client", "Km"]],
    body: summary.trips.map((t) => [
      pdfText(fmtDate(year, month, t.day)),
      pdfText(t.depart),
      pdfText(t.destination),
      km(t.km),
    ]),
    foot: [["", "", "TOTAL", km(summary.monthKm)]],
    styles: { font: "helvetica", fontSize: 8, cellPadding: 1.6 },
    headStyles: { fillColor: TEAL, textColor: 255, fontStyle: "bold" },
    footStyles: { fillColor: [240, 245, 245], textColor: 30, fontStyle: "bold" },
    columnStyles: { 0: { cellWidth: 26 }, 3: { cellWidth: 20, halign: "right" } },
    alternateRowStyles: { fillColor: [248, 250, 250] },
  });

  // ── Récapitulatif & montant à payer ──
  // Positionnement en FLUX avec hauteurs mesurées : chaque bloc qui ne tient
  // pas au-dessus du pied de page bascule entièrement sur la page suivante
  // (revue PR #2 : le clamp précédent superposait déclaration et récap
  // pour les mois de 20 à 23 trajets).
  const FOOTER_LIMIT = 278;
  let cursorY = (doc as unknown as { lastAutoTable: { finalY: number } }).lastAutoTable.finalY + 10;
  const ensureRoom = (needed: number) => {
    if (cursorY + needed > FOOTER_LIMIT) {
      doc.addPage();
      cursorY = 20;
    }
  };

  const recap: [string, string, boolean][] = [
    [`Cumul annuel à fin ${MONTH_NAMES[month - 1].toLowerCase()}`, km(summary.cumKm), false],
    ["Tranche du barème (selon cumul annuel)", pdfText(summary.bracket), false],
    ["INDEMNITÉ DU MOIS — À PAYER", eur(summary.allowance), true],
    [`Cumul indemnités ${year}`, eur(summary.cumAllowance), false],
  ];
  ensureRoom(recap.length * 7.5);
  const boxX = pageW / 2 - 4;
  for (const [label, value, strong] of recap) {
    if (strong) {
      doc.setFillColor(...TEAL);
      doc.rect(boxX - 2, cursorY - 4.5, pageW - margin - boxX + 2, 7, "F");
      doc.setTextColor(255);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(10);
    } else {
      doc.setTextColor(60);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
    }
    doc.text(label, boxX, cursorY);
    doc.text(value, pageW - margin, cursorY, { align: "right" });
    cursorY += 7.5;
  }

  // Note de calcul — hauteur mesurée avant dessin
  doc.setFontSize(7.5);
  doc.setFont("helvetica", "italic");
  const noteLines: string[] = doc.splitTextToSize(
    pdfText(
      "Calcul : barème kilométrique forfaitaire DGFiP (taux gelés depuis 2023), tranche déterminée par le " +
      "cumul annuel de kilomètres - indemnité du mois = droits(cumul fin de mois) - droits(cumul fin du mois précédent)."
    ),
    pageW - margin * 2
  );
  const noteH = noteLines.length * 3.2;
  ensureRoom(noteH + 4);
  doc.setTextColor(120);
  doc.text(noteLines, margin, cursorY + 2);
  cursorY += noteH + 8;

  // ── Déclaration du salarié (remplace les signatures manuscrites :
  //     la transmission depuis l'espace authentifié vaut certification) ──
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.5);
  const declLines: string[] = doc.splitTextToSize(
    pdfText(DECLARATION_SALARIE),
    pageW - margin * 2 - 6
  );
  const declH = 8 + declLines.length * 3.2 + 3;
  ensureRoom(declH);
  doc.setDrawColor(...TEAL);
  doc.setLineWidth(0.3);
  doc.setFillColor(248, 250, 250);
  doc.rect(margin, cursorY, pageW - margin * 2, declH, "FD");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.setTextColor(...NIGHT);
  doc.text("DÉCLARATION DU SALARIÉ", margin + 3, cursorY + 5);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.5);
  doc.setTextColor(60);
  doc.text(declLines, margin + 3, cursorY + 9.5);

  // ── Pied de page légal, sur chaque page ──
  const pages = doc.getNumberOfPages();
  for (let i = 1; i <= pages; i++) {
    doc.setPage(i);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7);
    doc.setTextColor(150);
    doc.text(pdfText(LEGAL_LINE), pageW / 2, 287, { align: "center" });
    doc.text(
      pdfText(
        `Document généré le ${new Date().toLocaleDateString("fr-FR")} via l'outil IK — ` +
        `sabiustechsolutions.com/outils/ik` + (pages > 1 ? ` — page ${i}/${pages}` : "")
      ),
      pageW / 2, 291, { align: "center" }
    );
  }

  return doc;
}

/** Téléchargement local (bouton PDF du cockpit). */
export async function exportMonthPdf(
  settings: YearSettings,
  summary: MonthSummary,
  year: number,
  month: number
): Promise<void> {
  const doc = await buildMonthPdf(settings, summary, year, month);
  doc.save(`${reportFileBase(settings, year, month)}.pdf`);
}

/** PDF encodé base64 — joint à l'envoi (boîte contact@ + ingestion compta). */
export async function buildMonthPdfBase64(
  settings: YearSettings,
  summary: MonthSummary,
  year: number,
  month: number
): Promise<{ base64: string; filename: string }> {
  const doc = await buildMonthPdf(settings, summary, year, month);
  return {
    base64: doc.output("datauristring").split(",")[1],
    filename: `${reportFileBase(settings, year, month)}.pdf`,
  };
}
