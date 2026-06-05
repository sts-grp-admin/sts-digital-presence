import logoUrl from "@/assets/sabius_logo.png";
import { MonthSummary, fmtDate, MONTH_NAMES } from "./compute";
import { reportFileBase, vehicleLabel } from "./report";
import { YearSettings } from "./storage";

// Justificatif PDF mensuel (compta) — généré 100 % côté navigateur.
// jsPDF est importé dynamiquement : il ne pèse que sur le clic « PDF ».

const TEAL: [number, number, number] = [57, 171, 168]; // primary du site
const NIGHT: [number, number, number] = [22, 40, 43]; // night du site
const LEGAL = "SABIUS TECH SOLUTIONS — SARL au capital de 5 000 € — SIREN 918 031 675 — RCS Paris";

/** Les polices PDF standard sont en WinAnsi : on remplace ce qui n'y existe pas. */
const pdfText = (s: string): string =>
  s.replace(/[\u202F\u00A0]/g, " ").replace(/→/g, ">").replace(/–/g, "-");

const eur = (n: number): string =>
  pdfText(n.toLocaleString("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })) + " EUR";
const km = (n: number): string =>
  pdfText(n.toLocaleString("fr-FR", { maximumFractionDigits: 2 })) + " km";

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
  if (logo) doc.addImage(logo, "PNG", margin, 12, 30, 0);
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
  doc.setDrawColor(...TEAL);
  doc.setLineWidth(0.6);
  doc.line(margin, 30, pageW - margin, 30);

  // ── Bloc salarié ──
  const info: [string, string][] = [
    ["Salarié", settings.name],
    ["Véhicule", pdfText(vehicleLabel(settings.cv, settings.electric))],
    ["Trajet habituel", pdfText(`${settings.depart} > ${settings.destination}`)],
    ["Distance habituelle", `${km(settings.distanceKm)} / jour travaillé`],
  ];
  doc.setFontSize(9);
  let y = 37;
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
  let recapY = (doc as unknown as { lastAutoTable: { finalY: number } }).lastAutoTable.finalY + 8;
  if (recapY > 235) {
    doc.addPage();
    recapY = 20;
  }
  const recap: [string, string, boolean][] = [
    [`Cumul annuel à fin ${MONTH_NAMES[month - 1].toLowerCase()}`, km(summary.cumKm), false],
    ["Tranche du barème (selon cumul annuel)", pdfText(summary.bracket), false],
    ["INDEMNITÉ DU MOIS — À PAYER", eur(summary.allowance), true],
    [`Cumul indemnités ${year}`, eur(summary.cumAllowance), false],
  ];
  const boxX = pageW / 2 - 4;
  for (const [label, value, strong] of recap) {
    if (strong) {
      doc.setFillColor(...TEAL);
      doc.rect(boxX - 2, recapY - 4.5, pageW - margin - boxX + 2, 7, "F");
      doc.setTextColor(255);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(10);
    } else {
      doc.setTextColor(60);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
    }
    doc.text(label, boxX, recapY);
    doc.text(value, pageW - margin, recapY, { align: "right" });
    recapY += 7.5;
  }

  doc.setFontSize(7.5);
  doc.setTextColor(120);
  doc.setFont("helvetica", "italic");
  doc.text(
    pdfText(
      "Calcul : barème kilométrique forfaitaire DGFiP (taux gelés depuis 2023), tranche déterminée par le " +
      "cumul annuel de kilomètres - indemnité du mois = droits(cumul fin de mois) - droits(cumul fin du mois précédent)."
    ),
    margin, recapY + 3, { maxWidth: pageW - margin * 2 }
  );

  // ── Déclaration du salarié (remplace les signatures manuscrites :
  //     la transmission depuis l'espace authentifié vaut certification) ──
  const declY = Math.min(recapY + 14, 252);
  doc.setDrawColor(...TEAL);
  doc.setLineWidth(0.3);
  doc.setFillColor(248, 250, 250);
  doc.rect(margin, declY - 5, pageW - margin * 2, 22, "FD");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.setTextColor(...NIGHT);
  doc.text("DÉCLARATION DU SALARIÉ", margin + 3, declY);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.5);
  doc.setTextColor(60);
  doc.text(
    pdfText(
      "Les trajets ci-dessus ont été déclarés et transmis par le salarié depuis son espace personnel " +
      "sécurisé (connexion par lien email nominatif). Cette transmission dématérialisée vaut certification " +
      "sur l'honneur de l'exactitude des informations déclarées ; le déclarant reconnaît avoir connaissance " +
      "des sanctions pénales encourues par l'auteur d'une fausse attestation (article 441-7 du Code pénal)."
    ),
    margin + 3, declY + 4.5, { maxWidth: pageW - margin * 2 - 6 }
  );

  // ── Pied de page légal ──
  doc.setFontSize(7);
  doc.setTextColor(150);
  doc.text(pdfText(LEGAL), pageW / 2, 287, { align: "center" });
  doc.text(
    pdfText(`Document généré le ${new Date().toLocaleDateString("fr-FR")} via l'outil IK — sabiustechsolutions.com/outils/ik`),
    pageW / 2, 291, { align: "center" }
  );

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
