import { DashboardRow, fmtEur, fmtKm } from "@/lib/ik/compute";

interface Props {
  year: number;
  rows: DashboardRow[];
  selectedMonth: number;
  onSelectMonth: (month: number) => void;
}

/** Tableau de bord annuel : 12 lignes, barres de km intégrées, passages de tranche signalés. */
const YearDashboard = ({ year, rows, selectedMonth, onSelectMonth }: Props) => {
  const maxKm = Math.max(...rows.map((r) => r.km), 1);
  const total = rows[11];

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden">
      <div className="px-6 py-4 border-b border-border flex items-baseline justify-between">
        <h3 className="font-heading font-bold text-lg text-foreground">Année {year}</h3>
        <p className="text-sm text-muted-foreground tabular-nums">
          {fmtKm(total.cumKm)} · <span className="font-bold text-primary">{fmtEur(total.cumAllowance)}</span>
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-[11px] uppercase tracking-wider text-muted-foreground">
              <th className="text-left font-medium px-6 py-2.5">Mois</th>
              <th className="text-right font-medium px-3 py-2.5">Jours</th>
              <th className="text-left font-medium px-3 py-2.5 w-[28%] min-w-32">Km</th>
              <th className="text-right font-medium px-3 py-2.5">Cumul</th>
              <th className="text-right font-medium px-3 py-2.5">Indemnité</th>
              <th className="text-right font-medium px-6 py-2.5">Cumul €</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => {
              const crossed = i > 0 && rows[i - 1].bracket !== r.bracket && r.km > 0;
              const selected = r.month === selectedMonth;
              return (
                <tr
                  key={r.month}
                  onClick={() => onSelectMonth(r.month)}
                  className={`cursor-pointer border-t border-border/60 transition-colors ${
                    selected ? "bg-accent/70" : "hover:bg-muted/60"
                  }`}
                >
                  <td className={`px-6 py-2 ${selected ? "font-bold text-primary" : "font-medium"}`}>
                    {r.label}
                    {crossed && (
                      <span className="ml-2 inline-block rounded-full bg-accent px-2 py-0.5 text-[10px] font-bold text-accent-foreground align-middle">
                        ↗ {r.bracket}
                      </span>
                    )}
                  </td>
                  <td className="px-3 py-2 text-right tabular-nums text-muted-foreground">
                    {r.days || "·"}
                  </td>
                  <td className="px-3 py-2">
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 flex-1 rounded-full bg-muted overflow-hidden">
                        <div
                          className="h-full rounded-full bg-primary transition-all duration-500"
                          style={{ width: `${(r.km / maxKm) * 100}%` }}
                        />
                      </div>
                      <span className="tabular-nums text-xs w-16 text-right">
                        {r.km ? fmtKm(r.km) : "·"}
                      </span>
                    </div>
                  </td>
                  <td className="px-3 py-2 text-right tabular-nums text-muted-foreground">
                    {r.cumKm ? fmtKm(r.cumKm) : "·"}
                  </td>
                  <td className="px-3 py-2 text-right tabular-nums font-medium">
                    {r.allowance ? fmtEur(r.allowance) : "·"}
                  </td>
                  <td className="px-6 py-2 text-right tabular-nums text-muted-foreground">
                    {r.cumAllowance ? fmtEur(r.cumAllowance) : "·"}
                  </td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr className="border-t-2 border-border bg-muted/40">
              <td className="px-6 py-3 font-heading font-bold">TOTAL {year}</td>
              <td className="px-3 py-3 text-right font-bold tabular-nums">
                {rows.reduce((s, r) => s + r.days, 0)}
              </td>
              <td className="px-3 py-3 text-right font-bold tabular-nums" colSpan={2}>
                {fmtKm(total.cumKm)}
              </td>
              <td className="px-6 py-3 text-right font-bold tabular-nums text-primary" colSpan={2}>
                {fmtEur(total.cumAllowance)}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default YearDashboard;
