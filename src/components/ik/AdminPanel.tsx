import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Users, Zap } from "lucide-react";
import { fetchTeam, TeamMemberData } from "@/lib/ik/cloud";
import { CV_LABELS } from "@/lib/ik/bareme";
import { DashboardRow, dashboardRows, fmtEur, fmtKm, MONTH_NAMES } from "@/lib/ik/compute";
import { YearSettings } from "@/lib/ik/storage";

/** Réglages de secours quand la ligne manque : seuls les km explicitement
 *  saisis (overrides) comptent, les jours « habituels » valent 0. */
const FALLBACK_SETTINGS: YearSettings = {
  name: "", cv: 3, electric: false, depart: "", destination: "", distanceKm: 0,
};

const memberName = (m: TeamMemberData) =>
  m.settings?.name || m.profileName || "Salarié sans nom";

const initials = (name: string) =>
  name.split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0]!.toUpperCase()).join("") || "?";

const bracketBadge = (bracket: string) =>
  bracket.startsWith("≤")
    ? "bg-accent text-accent-foreground"
    : bracket.startsWith("5")
      ? "bg-amber-100 text-amber-800"
      : "bg-red-100 text-red-700";

interface MemberRowProps {
  member: TeamMemberData;
  rows: DashboardRow[];
  globalMaxKm: number;
  index: number;
}

const MemberRow = ({ member, rows, globalMaxKm, index }: MemberRowProps) => {
  const [open, setOpen] = useState(false);
  const total = rows[11];
  const activeRows = rows.filter((r) => r.days > 0);
  const lastActive = activeRows[activeRows.length - 1];
  const currentBracket = lastActive?.bracket ?? rows[0].bracket;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.08 * index, duration: 0.35, ease: "easeOut" }}
    >
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="w-full text-left px-4 sm:px-6 py-4 flex items-center gap-4 hover:bg-muted/50 transition-colors group"
      >
        {/* Identité */}
        <div className="flex items-center gap-3 w-56 min-w-0 shrink-0">
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-primary-dark text-primary-foreground flex items-center justify-center font-heading font-bold text-sm shrink-0 shadow-sm">
            {initials(memberName(member))}
          </div>
          <div className="min-w-0">
            <p className="font-heading font-bold text-foreground truncate leading-tight">
              {memberName(member)}
            </p>
            {member.settings ? (
              <p className="text-xs text-muted-foreground truncate">
                {CV_LABELS[member.settings.cv]}
                {member.settings.electric && (
                  <Zap className="inline h-3 w-3 -mt-0.5 ml-1 text-primary" aria-label="électrique" />
                )}
                {" · "}{fmtKm(member.settings.distanceKm)}/j
              </p>
            ) : (
              <p className="text-xs font-medium text-amber-700 truncate">
                ⚠ Réglages {"manquants"} — km habituels comptés à 0
              </p>
            )}
          </div>
        </div>

        {/* Jauge 12 mois — échelle commune à toute l'équipe */}
        <div className="hidden md:flex items-end gap-[3px] h-9 flex-1" aria-hidden>
          {rows.map((r) => (
            <div key={r.month} className="flex-1 h-full flex flex-col justify-end" title={`${MONTH_NAMES[r.month - 1]} : ${fmtKm(r.km)} · ${fmtEur(r.allowance)}`}>
              <div
                className={`rounded-sm transition-all duration-500 ${r.km > 0 ? "bg-primary group-hover:bg-primary-dark" : "bg-muted"}`}
                style={{ height: r.km > 0 ? `${Math.max((r.km / globalMaxKm) * 100, 8)}%` : "3px" }}
              />
            </div>
          ))}
        </div>

        {/* Tranche + totaux */}
        <span className={`hidden sm:inline-block shrink-0 rounded-full px-2.5 py-1 text-[10px] font-bold ${bracketBadge(currentBracket)}`}>
          {currentBracket}
        </span>
        <div className="text-right shrink-0 w-32">
          <p className="font-heading font-extrabold text-foreground tabular-nums leading-tight">
            {fmtEur(total.cumAllowance)}
          </p>
          <p className="text-xs text-muted-foreground tabular-nums">{fmtKm(total.cumKm)}</p>
        </div>
        <ChevronDown
          className={`h-4 w-4 text-muted-foreground shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {/* Détail 12 mois */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-4 sm:px-6 pb-5">
              <div className="rounded-lg border border-border overflow-hidden">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="bg-muted/60 text-[10px] uppercase tracking-wider text-muted-foreground">
                      <th className="text-left font-medium px-3 py-2">Mois</th>
                      <th className="text-right font-medium px-3 py-2">Jours</th>
                      <th className="text-right font-medium px-3 py-2">Km</th>
                      <th className="text-right font-medium px-3 py-2">Cumul km</th>
                      <th className="text-right font-medium px-3 py-2">Indemnité</th>
                      <th className="text-right font-medium px-3 py-2">Cumul €</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((r, i) => {
                      const crossed = i > 0 && rows[i - 1].bracket !== r.bracket && r.km > 0;
                      return (
                        <tr key={r.month} className={`border-t border-border/50 ${r.days === 0 ? "text-muted-foreground/50" : ""}`}>
                          <td className="px-3 py-1.5 font-medium">
                            {r.label}
                            {crossed && (
                              <span className={`ml-2 rounded-full px-1.5 py-0.5 text-[9px] font-bold ${bracketBadge(r.bracket)}`}>
                                ↗ {r.bracket}
                              </span>
                            )}
                          </td>
                          <td className="px-3 py-1.5 text-right tabular-nums">{r.days || "·"}</td>
                          <td className="px-3 py-1.5 text-right tabular-nums">{r.km ? fmtKm(r.km) : "·"}</td>
                          <td className="px-3 py-1.5 text-right tabular-nums">{r.cumKm ? fmtKm(r.cumKm) : "·"}</td>
                          <td className="px-3 py-1.5 text-right tabular-nums font-medium">{r.allowance ? fmtEur(r.allowance) : "·"}</td>
                          <td className="px-3 py-1.5 text-right tabular-nums">{r.cumAllowance ? fmtEur(r.cumAllowance) : "·"}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              {member.settings && (
                <p className="mt-2 text-[11px] text-muted-foreground">
                  {member.settings.depart} → {member.settings.destination}
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

/** Vue patron : cockpit de l'équipe (visible uniquement si is_admin). */
const AdminPanel = ({ year }: { year: number }) => {
  const [team, setTeam] = useState<TeamMemberData[] | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    setTeam(null);
    setError(false);
    fetchTeam(year).then(setTeam).catch(() => setError(true));
  }, [year]);

  const teamRows = (team ?? []).map((m) =>
    dashboardRows(m.settings ?? FALLBACK_SETTINGS, m.months, year)
  );
  const teamKm = teamRows.reduce((s, rows) => s + rows[11].cumKm, 0);
  const teamAllowance = teamRows.reduce((s, rows) => s + rows[11].cumAllowance, 0);
  const globalMaxKm = Math.max(1, ...teamRows.flatMap((rows) => rows.map((r) => r.km)));

  return (
    <div className="rounded-xl border border-border overflow-hidden bg-card">
      {/* Bandeau cockpit */}
      <div className="relative bg-night text-night-foreground">
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.06] bg-[repeating-linear-gradient(90deg,transparent,transparent_39px,white_39px,white_40px)]"
        />
        <div className="relative px-4 sm:px-6 py-5 flex flex-wrap items-center gap-x-10 gap-y-3">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-white/10 flex items-center justify-center">
              <Users className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-white leading-tight">Équipe</h3>
              <p className="text-[11px] uppercase tracking-wider text-night-foreground/60">{year}</p>
            </div>
          </div>
          <div className="flex items-baseline gap-8 sm:gap-10 ml-auto">
            <div className="text-right">
              <p className="text-[11px] uppercase tracking-wider text-night-foreground/60">Salariés</p>
              <p className="font-heading font-bold text-xl text-white tabular-nums">{team?.length ?? "–"}</p>
            </div>
            <div className="text-right">
              <p className="text-[11px] uppercase tracking-wider text-night-foreground/60">Km équipe</p>
              <p className="font-heading font-bold text-xl text-white tabular-nums">
                {team ? fmtKm(Math.round(teamKm)) : "–"}
              </p>
            </div>
            <div className="text-right">
              <p className="text-[11px] uppercase tracking-wider text-night-foreground/60">Indemnités {year}</p>
              <p className="font-heading font-extrabold text-2xl text-primary tabular-nums">
                {team ? fmtEur(teamAllowance) : "–"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Lignes salariés */}
      {error && (
        <p className="px-6 py-10 text-sm text-destructive">Chargement de l'équipe impossible.</p>
      )}
      {!team && !error && (
        <div className="divide-y divide-border" aria-label="Chargement">
          {[0, 1, 2].map((i) => (
            <div key={i} className="px-6 py-5 flex items-center gap-4 animate-pulse">
              <div className="h-10 w-10 rounded-full bg-muted" />
              <div className="flex-1 space-y-2">
                <div className="h-3 w-40 rounded bg-muted" />
                <div className="h-2 w-24 rounded bg-muted" />
              </div>
              <div className="h-3 w-20 rounded bg-muted" />
            </div>
          ))}
        </div>
      )}
      {team && team.length === 0 && (
        <p className="px-6 py-10 text-sm text-muted-foreground">
          Aucun salarié n'a encore rempli ses réglages {year}.
        </p>
      )}
      {team && team.length > 0 && (
        <div className="divide-y divide-border">
          {team.map((member, i) => (
            <MemberRow
              key={member.userId}
              member={member}
              rows={teamRows[i]}
              globalMaxKm={globalMaxKm}
              index={i}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
