import { useState } from "react";
import { motion } from "framer-motion";
import { CalendarCheck, ChevronLeft, ChevronRight, Pencil, RotateCcw, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { daysInMonth, isWeekend, MONTH_NAMES } from "@/lib/ik/compute";
import { MonthData, YearSettings } from "@/lib/ik/storage";

interface Props {
  year: number;
  month: number;
  settings: YearSettings;
  data: MonthData;
  onMonthChange: (month: number) => void;
  onToggle: (day: number) => void;
  onOverride: (day: number, field: "km" | "dest", raw: string) => void;
  onResetOverride: (day: number) => void;
  onFillWorkweek: () => void;
  onClearMonth: () => void;
}

const WEEK_HEADER = ["lun", "mar", "mer", "jeu", "ven", "sam", "dim"];

// Hachures CSS pour les week-ends — lisible sans être criard
const weekendBg =
  "bg-[repeating-linear-gradient(135deg,transparent,transparent_5px,hsl(var(--muted))_5px,hsl(var(--muted))_10px)]";

const CalendarGrid = ({
  year, month, settings, data,
  onMonthChange, onToggle, onOverride, onResetOverride, onFillWorkweek, onClearMonth,
}: Props) => {
  const [popoverDay, setPopoverDay] = useState<number | null>(null);

  const nb = daysInMonth(year, month);
  // Lundi en première colonne
  const leadingBlanks = (new Date(year, month - 1, 1).getDay() + 6) % 7;
  const today = new Date();
  const isToday = (d: number) =>
    today.getFullYear() === year && today.getMonth() === month - 1 && today.getDate() === d;

  const workedCount = Object.keys(data.days).length;

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden">
      {/* Barre du mois */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 sm:px-6 py-4 border-b border-border">
        <div className="flex items-center gap-1">
          <Button
            variant="ghost" size="icon" aria-label="Mois précédent"
            disabled={month === 1}
            onClick={() => onMonthChange(month - 1)}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Select value={String(month)} onValueChange={(v) => onMonthChange(Number(v))}>
            <SelectTrigger
              aria-label="Choisir le mois"
              className="w-44 border-0 shadow-none font-heading font-bold text-lg focus:ring-0"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {MONTH_NAMES.map((m, i) => (
                <SelectItem key={m} value={String(i + 1)}>{m} {year}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button
            variant="ghost" size="icon" aria-label="Mois suivant"
            disabled={month === 12}
            onClick={() => onMonthChange(month + 1)}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={onFillWorkweek}>
            <CalendarCheck className="mr-2 h-4 w-4" />
            Remplir lun → ven
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="ghost" size="sm" aria-label="Vider le mois"
                className="text-muted-foreground hover:text-destructive"
                disabled={workedCount === 0}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Vider {MONTH_NAMES[month - 1]} {year} ?</AlertDialogTitle>
                <AlertDialogDescription>
                  Les {workedCount} jour(s) coché(s) de ce mois seront supprimés.
                  Les autres mois ne sont pas touchés. Action irréversible.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Annuler</AlertDialogCancel>
                <AlertDialogAction
                  onClick={onClearMonth}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  Vider le mois
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      {/* Grille calendrier */}
      <div className="p-4 sm:p-6">
        <div className="grid grid-cols-7 gap-1.5 sm:gap-2 mb-2">
          {WEEK_HEADER.map((d) => (
            <div
              key={d}
              className="text-center text-[11px] uppercase tracking-wider text-muted-foreground font-medium"
            >
              {d}
            </div>
          ))}
        </div>

        <motion.div
          key={`${year}-${month}`}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="grid grid-cols-7 gap-1.5 sm:gap-2"
        >
          {Array.from({ length: leadingBlanks }).map((_, i) => (
            <div key={`blank-${i}`} />
          ))}

          {Array.from({ length: nb }, (_, i) => i + 1).map((day) => {
            const entry = data.days[day];
            const worked = entry !== undefined;
            const weekend = isWeekend(year, month, day);
            const overridden = worked && (entry.km !== undefined || !!entry.dest);
            const km = worked ? (entry.km ?? settings.distanceKm) : null;

            return (
              <div key={day} className="relative">
                <motion.button
                  type="button"
                  whileTap={{ scale: 0.92 }}
                  onClick={() => onToggle(day)}
                  aria-pressed={worked}
                  aria-label={`${day} ${MONTH_NAMES[month - 1]}${worked ? " — travaillé" : ""}`}
                  className={[
                    "w-full aspect-square rounded-lg border text-sm transition-all duration-150",
                    "flex flex-col items-center justify-center gap-0.5 select-none",
                    isToday(day) ? "ring-2 ring-primary/40 ring-offset-1" : "",
                    worked
                      ? "bg-primary border-primary text-primary-foreground shadow-md shadow-primary/25 font-bold"
                      : weekend
                        ? `${weekendBg} border-border/60 text-muted-foreground/50 hover:border-border`
                        : "bg-background border-border text-foreground hover:border-primary/60 hover:-translate-y-0.5 hover:shadow-sm",
                  ].join(" ")}
                >
                  <span className="tabular-nums leading-none">{day}</span>
                  {worked && (
                    <span
                      className={`text-[9px] sm:text-[10px] leading-none font-medium tabular-nums ${
                        overridden ? "text-amber-200" : "text-primary-foreground/75"
                      }`}
                    >
                      {km} km
                    </span>
                  )}
                </motion.button>

                {worked && (
                  <Popover
                    open={popoverDay === day}
                    onOpenChange={(open) => setPopoverDay(open ? day : null)}
                  >
                    <PopoverTrigger asChild>
                      <button
                        type="button"
                        aria-label={`Trajet particulier du ${day}`}
                        onClick={(e) => e.stopPropagation()}
                        className={`absolute -top-1.5 -right-1.5 h-5 w-5 rounded-full border flex items-center justify-center
                          transition-colors shadow-sm
                          ${overridden
                            ? "bg-amber-400 border-amber-500 text-amber-950"
                            : "bg-card border-border text-muted-foreground hover:text-primary hover:border-primary"}`}
                      >
                        <Pencil className="h-2.5 w-2.5" />
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-72" align="center" onClick={(e) => e.stopPropagation()}>
                      <p className="font-heading font-bold text-sm mb-3">
                        Trajet du {day} {MONTH_NAMES[month - 1].toLowerCase()}
                      </p>
                      <div className="space-y-3">
                        <div>
                          <Label htmlFor={`ovr-km-${day}`} className="text-xs text-muted-foreground">
                            Distance (km)
                          </Label>
                          <Input
                            id={`ovr-km-${day}`}
                            inputMode="decimal"
                            placeholder={String(settings.distanceKm)}
                            value={entry.km !== undefined ? String(entry.km) : ""}
                            onChange={(e) => onOverride(day, "km", e.target.value)}
                            className="mt-1 h-9"
                          />
                        </div>
                        <div>
                          <Label htmlFor={`ovr-dest-${day}`} className="text-xs text-muted-foreground">
                            Destination / client
                          </Label>
                          <Input
                            id={`ovr-dest-${day}`}
                            placeholder={settings.destination}
                            value={entry.dest ?? ""}
                            onChange={(e) => onOverride(day, "dest", e.target.value)}
                            className="mt-1 h-9"
                          />
                        </div>
                        {overridden && (
                          <Button
                            variant="ghost" size="sm" className="w-full text-muted-foreground"
                            onClick={() => { onResetOverride(day); setPopoverDay(null); }}
                          >
                            <RotateCcw className="mr-2 h-3.5 w-3.5" />
                            Revenir au trajet habituel
                          </Button>
                        )}
                      </div>
                    </PopoverContent>
                  </Popover>
                )}
              </div>
            );
          })}
        </motion.div>

        <p className="mt-4 text-xs text-muted-foreground">
          Cliquez un jour pour le marquer travaillé (trajet habituel).
          Le crayon <Pencil className="inline h-3 w-3 -mt-0.5" /> permet un trajet différent ce jour-là
          — il devient <span className="inline-block h-2.5 w-2.5 rounded-full bg-amber-400 align-middle" /> ambre
          si le jour est particulier.
        </p>
      </div>
    </div>
  );
};

export default CalendarGrid;
