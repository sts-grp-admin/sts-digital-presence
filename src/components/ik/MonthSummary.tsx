import { Download, FileDown, FileSpreadsheet, Loader2, Send } from "lucide-react";
import { motion } from "framer-motion";
import { CERTIFICATION_ENVOI } from "../../../supabase/functions/_shared/legal";
import { Button } from "@/components/ui/button";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { fmtEur, fmtKm, MONTH_NAMES, MonthSummary as Summary } from "@/lib/ik/compute";

interface Props {
  year: number;
  month: number;
  summary: Summary;
  sending: boolean;
  recipient: string;
  cloudMode: boolean;
  onSend: () => void;
  onExportXlsx: () => void;
  onExportCsv: () => void;
  onExportPdf: () => void;
}

const Stat = ({ label, value }: { label: string; value: string }) => (
  <div>
    <p className="text-[11px] uppercase tracking-wider text-night-foreground/60">{label}</p>
    <p className="font-heading font-bold text-lg text-white tabular-nums">{value}</p>
  </div>
);

/** Bandeau « ligne de paie » du mois, sur fond night. */
const MonthSummaryCard = ({
  year, month, summary, sending, recipient, cloudMode,
  onSend, onExportXlsx, onExportCsv, onExportPdf,
}: Props) => {
  const hasTrips = summary.trips.length > 0;

  return (
    <div className="relative rounded-xl bg-night text-night-foreground overflow-hidden">
      {/* trame de fond discrète */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.06] bg-[repeating-linear-gradient(90deg,transparent,transparent_39px,white_39px,white_40px)]"
      />
      <div className="relative p-6 space-y-5">
        <div className="flex items-baseline justify-between gap-2">
          <h3 className="font-heading font-bold text-white">
            {MONTH_NAMES[month - 1]} <span className="text-night-foreground/60">{year}</span>
          </h3>
          <span className="text-[11px] uppercase tracking-wider text-night-foreground/60">
            {summary.bracket}
          </span>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <Stat label="Jours" value={String(summary.trips.length)} />
          <Stat label="Km du mois" value={fmtKm(summary.monthKm)} />
          <Stat label="Cumul annuel" value={fmtKm(summary.cumKm)} />
        </div>

        <div className="border-t border-white/10 pt-4">
          <p className="text-[11px] uppercase tracking-wider text-night-foreground/60">
            Indemnité du mois
          </p>
          <motion.p
            key={summary.allowance}
            initial={{ opacity: 0.4, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-heading font-extrabold text-4xl text-white tabular-nums"
          >
            {fmtEur(summary.allowance)}
          </motion.p>
          <p className="text-xs text-night-foreground/60 mt-1 tabular-nums">
            Cumul {year} : {fmtEur(summary.cumAllowance)}
          </p>
        </div>

        <div className="flex flex-col gap-2 pt-1">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button disabled={!hasTrips || sending} className="w-full" size="lg">
                {sending
                  ? <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  : <Send className="mr-2 h-4 w-4" />}
                Envoyer le rapport
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Envoyer {MONTH_NAMES[month - 1]} {year} ?</AlertDialogTitle>
                <AlertDialogDescription>
                  {summary.trips.length} jours · {fmtKm(summary.monthKm)} · {fmtEur(summary.allowance)}.
                  {cloudMode
                    ? ` Le rapport part à ${recipient} avec le fichier Excel et le justificatif
                        PDF en pièces jointes ; si le relais comptable est activé, le justificatif
                        est également transmis à la comptabilité de STS. Le cumul annuel est
                        revérifié côté serveur avant calcul.`
                    : ` Le rapport part par email à ${recipient}, avec un lien pour télécharger
                        le fichier Excel.`}
                  {" "}{CERTIFICATION_ENVOI}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Annuler</AlertDialogCancel>
                <AlertDialogAction onClick={onSend}>Envoyer</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <div className="flex gap-2">
            <Button
              variant="outline" className="flex-1 border-white/20 bg-transparent text-white hover:bg-white/10 hover:text-white"
              disabled={!hasTrips} onClick={onExportXlsx}
            >
              <FileSpreadsheet className="mr-2 h-4 w-4" /> xlsx
            </Button>
            <Button
              variant="outline" className="flex-1 border-white/20 bg-transparent text-white hover:bg-white/10 hover:text-white"
              disabled={!hasTrips} onClick={onExportCsv}
            >
              <Download className="mr-2 h-4 w-4" /> CSV
            </Button>
            <Button
              variant="outline" className="flex-1 border-white/20 bg-transparent text-white hover:bg-white/10 hover:text-white"
              disabled={!hasTrips} onClick={onExportPdf}
            >
              <FileDown className="mr-2 h-4 w-4" /> PDF
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MonthSummaryCard;
