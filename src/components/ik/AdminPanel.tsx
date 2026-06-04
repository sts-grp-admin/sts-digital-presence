import { useEffect, useState } from "react";
import { Loader2, Users } from "lucide-react";
import { fetchTeam, TeamMemberData } from "@/lib/ik/cloud";
import { CV_LABELS } from "@/lib/ik/bareme";
import { dashboardRows, fmtEur, fmtKm, MONTH_NAMES } from "@/lib/ik/compute";

/** Vue patron : tous les salariés de l'année (visible uniquement si is_admin). */
const AdminPanel = ({ year }: { year: number }) => {
  const [team, setTeam] = useState<TeamMemberData[] | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    setTeam(null);
    setError(false);
    fetchTeam(year).then(setTeam).catch(() => setError(true));
  }, [year]);

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden">
      <div className="px-6 py-4 border-b border-border flex items-center gap-3">
        <Users className="h-5 w-5 text-primary" />
        <h3 className="font-heading font-bold text-lg text-foreground">Équipe — {year}</h3>
      </div>

      {error && (
        <p className="px-6 py-8 text-sm text-destructive">Chargement de l'équipe impossible.</p>
      )}
      {!team && !error && (
        <p className="px-6 py-8 text-sm text-muted-foreground flex items-center gap-2">
          <Loader2 className="h-4 w-4 animate-spin" /> Chargement…
        </p>
      )}
      {team && team.length === 0 && (
        <p className="px-6 py-8 text-sm text-muted-foreground">
          Aucun salarié n'a encore rempli ses réglages {year}.
        </p>
      )}

      {team && team.length > 0 && (
        <div className="divide-y divide-border">
          {team.map((member) => {
            const rows = dashboardRows(member.settings, member.months, year);
            const total = rows[11];
            const maxKm = Math.max(...rows.map((r) => r.km), 1);
            return (
              <div key={member.userId} className="px-6 py-4">
                <div className="flex flex-wrap items-baseline justify-between gap-2 mb-2">
                  <p className="font-heading font-bold text-foreground">
                    {member.settings.name}
                    <span className="ml-2 font-body font-normal text-xs text-muted-foreground">
                      {CV_LABELS[member.settings.cv]}
                      {member.settings.electric ? " · électrique" : ""}
                    </span>
                  </p>
                  <p className="text-sm tabular-nums">
                    {fmtKm(total.cumKm)} ·{" "}
                    <span className="font-bold text-primary">{fmtEur(total.cumAllowance)}</span>
                  </p>
                </div>
                <div className="flex items-end gap-1 h-10" aria-hidden>
                  {rows.map((r) => (
                    <div
                      key={r.month}
                      title={`${MONTH_NAMES[r.month - 1]} : ${fmtKm(r.km)} · ${fmtEur(r.allowance)}`}
                      className="flex-1 rounded-sm bg-primary/15 relative overflow-hidden"
                      style={{ height: "100%" }}
                    >
                      <div
                        className="absolute bottom-0 left-0 right-0 bg-primary rounded-sm"
                        style={{ height: `${(r.km / maxKm) * 100}%` }}
                      />
                    </div>
                  ))}
                </div>
                <div className="flex justify-between text-[9px] text-muted-foreground mt-1" aria-hidden>
                  <span>janv.</span><span>déc.</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
