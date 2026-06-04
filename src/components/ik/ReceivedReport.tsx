import { Download, FileSpreadsheet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { fmtEur, fmtKm, MONTH_NAMES, monthSummaryFromCumul } from "@/lib/ik/compute";
import { exportMonthCsv, exportMonthXlsx } from "@/lib/ik/export";
import { ReportPayload, vehicleLabel } from "@/lib/ik/report";

interface Props {
  payload: ReportPayload;
  onClose: () => void;
}

/** Vue destinataire d'un lien magique : régénère le xlsx côté navigateur. */
const ReceivedReport = ({ payload, onClose }: Props) => {
  const summary = monthSummaryFromCumul(
    payload.settings, { days: payload.days }, payload.year, payload.month, payload.cumKmBefore
  );

  return (
    <section className="py-14 md:py-20 bg-background min-h-[60vh]">
      <div className="container max-w-2xl">
        <div className="bg-card border border-border rounded-xl p-8 space-y-6">
          <div className="flex items-center gap-3">
            <FileSpreadsheet className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-2xl font-bold text-foreground">Rapport IK reçu</h1>
              <p className="text-sm text-muted-foreground">
                {MONTH_NAMES[payload.month - 1]} {payload.year} — {payload.settings.name}
              </p>
            </div>
          </div>
          <dl className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
            <dt className="text-muted-foreground">Véhicule</dt>
            <dd className="text-foreground">{vehicleLabel(payload.settings.cv, payload.settings.electric)}</dd>
            <dt className="text-muted-foreground">Jours travaillés</dt>
            <dd className="text-foreground">{summary.trips.length}</dd>
            <dt className="text-muted-foreground">Km du mois</dt>
            <dd className="text-foreground">{fmtKm(summary.monthKm)}</dd>
            <dt className="text-muted-foreground">Cumul annuel</dt>
            <dd className="text-foreground">{fmtKm(summary.cumKm)} ({summary.bracket})</dd>
            <dt className="text-muted-foreground font-medium">Indemnité à payer</dt>
            <dd className="text-foreground font-bold text-primary">{fmtEur(summary.allowance)}</dd>
          </dl>
          <div className="flex flex-wrap gap-3">
            <Button onClick={() => exportMonthXlsx(payload.settings, summary, payload.year, payload.month)}>
              <Download className="mr-2 h-4 w-4" /> Télécharger le xlsx
            </Button>
            <Button
              variant="outline"
              onClick={() => exportMonthCsv(payload.settings, summary, payload.year, payload.month)}
            >
              <Download className="mr-2 h-4 w-4" /> CSV
            </Button>
            <Button variant="ghost" onClick={onClose}>Ouvrir mon propre suivi</Button>
          </div>
          <p className="text-xs text-muted-foreground">
            Le fichier est régénéré dans votre navigateur à partir des données contenues dans le lien.
            Rien n'est stocké sur un serveur.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ReceivedReport;
