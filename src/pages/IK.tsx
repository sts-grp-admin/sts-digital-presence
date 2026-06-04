import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import { Session } from "@supabase/supabase-js";
import { Cloud, Download, Loader2, LogOut, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { CloudLogin, PinGate, UNLOCK_KEY } from "@/components/ik/AuthGate";
import AdminPanel from "@/components/ik/AdminPanel";
import CalendarGrid from "@/components/ik/CalendarGrid";
import MonthSummaryCard from "@/components/ik/MonthSummary";
import ReceivedReport from "@/components/ik/ReceivedReport";
import SettingsCard from "@/components/ik/SettingsCard";
import YearDashboard from "@/components/ik/YearDashboard";
import { email } from "@/lib/email";
import {
  cloudIsEmpty, fetchMonths, fetchProfile, fetchSettings, Profile,
  deleteMonth as deleteMonthCloud, sendReportCloud, upsertMonth, upsertSettings,
} from "@/lib/ik/cloud";
import {
  dashboardRows, fmtEur, monthSummary, workweekDays,
} from "@/lib/ik/compute";
import { buildMonthXlsxBase64, exportMonthCsv, exportMonthXlsx } from "@/lib/ik/export";
import {
  buildEmailBody, buildEmailSubject, buildPayload, readReportFromHash,
  ReportPayload, reportUrl,
} from "@/lib/ik/report";
import {
  clearMonth, exportBackup, importBackup, loadSettings, loadYearMonths,
  MonthData, saveMonth, saveSettings, YearSettings,
} from "@/lib/ik/storage";
import { cloudEnabled, supabase } from "@/lib/ik/supabase";

// Même clé que le formulaire de contact (mode local uniquement).
const WEB3FORMS_KEY = "b53fc5e4-2dd7-495f-aede-edd7b01fc6a8";

const YEARS = [2025, 2026, 2027, 2028];
const CURRENT_YEAR = new Date().getFullYear();
const emptyMonths = (): MonthData[] => Array.from({ length: 12 }, () => ({ days: {} }));

const IKPage = () => {
  // ── Accès ──
  const [unlocked, setUnlocked] = useState(() => localStorage.getItem(UNLOCK_KEY) === "1");
  const [session, setSession] = useState<Session | null | undefined>(
    cloudEnabled ? undefined : null
  );
  const [profile, setProfile] = useState<Profile | null>(null);

  // ── Lien magique reçu ──
  const [received, setReceived] = useState<ReportPayload | null>(() =>
    readReportFromHash(window.location.hash)
  );

  // ── Données ──
  const [year, setYear] = useState(() => (YEARS.includes(CURRENT_YEAR) ? CURRENT_YEAR : 2026));
  const [month, setMonth] = useState(() => (CURRENT_YEAR === year ? new Date().getMonth() + 1 : 1));
  const [settings, setSettings] = useState<YearSettings | null>(null);
  const [fallbackSettings, setFallbackSettings] = useState<YearSettings | null>(null);
  const [months, setMonths] = useState<MonthData[]>(emptyMonths);
  const [loadingData, setLoadingData] = useState(false);
  const [sending, setSending] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Page interne : ne pas indexer
  useEffect(() => {
    const meta = document.createElement("meta");
    meta.name = "robots";
    meta.content = "noindex,nofollow";
    document.head.appendChild(meta);
    return () => { document.head.removeChild(meta); };
  }, []);

  // Lien magique collé pendant la session
  useEffect(() => {
    const onHash = () => {
      const p = readReportFromHash(window.location.hash);
      if (p) setReceived(p);
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  // Session Supabase (mode cloud)
  useEffect(() => {
    if (!supabase) return;
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    return () => sub.subscription.unsubscribe();
  }, []);

  const cloudReady = cloudEnabled && !!session;

  // Chargement des données de l'année (cloud ou local)
  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      if (cloudEnabled) {
        if (!session) return; // pas encore connecté
        setLoadingData(true);
        try {
          // Migration automatique des données locales au premier passage
          const localSettings = loadSettings(year);
          const localMonths = loadYearMonths(year);
          const hasLocal =
            localSettings !== null || localMonths.some((m) => Object.keys(m.days).length > 0);
          let migrated = false;
          if (hasLocal && (await cloudIsEmpty(year))) {
            if (localSettings) await upsertSettings(year, localSettings);
            for (let i = 0; i < 12; i++) {
              if (Object.keys(localMonths[i].days).length > 0) {
                await upsertMonth(year, i + 1, localMonths[i]);
              }
            }
            migrated = true;
          }
          const [s, m, p] = await Promise.all([
            fetchSettings(year),
            fetchMonths(year),
            profile ? Promise.resolve(profile) : fetchProfile(),
          ]);
          const fb = s ? null : await fetchSettings(year - 1).catch(() => null);
          if (cancelled) return;
          setSettings(s);
          setMonths(m);
          setFallbackSettings(fb);
          setProfile(p);
          if (migrated) toast.success("Vos données locales ont été importées dans votre compte.");
        } catch {
          if (!cancelled) toast.error("Chargement impossible. Vérifiez votre connexion puis rechargez.");
        } finally {
          if (!cancelled) setLoadingData(false);
        }
      } else {
        setSettings(loadSettings(year));
        setFallbackSettings(loadSettings(year - 1));
        setMonths(loadYearMonths(year));
      }
    };
    load();
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [year, session]);

  const summary = useMemo(
    () => (settings ? monthSummary(settings, months, year, month) : null),
    [settings, months, year, month]
  );
  const dashboard = useMemo(
    () => (settings ? dashboardRows(settings, months, year) : null),
    [settings, months, year]
  );

  // ── Persistance (auto-save, cloud + miroir local) ──
  const persistMonth = useCallback(
    (m: number, data: MonthData) => {
      saveMonth(year, m, data); // miroir local : cache hors-ligne + mode local
      if (cloudReady) {
        upsertMonth(year, m, data).catch(() =>
          toast.error("Synchronisation échouée — vérifiez votre connexion.")
        );
      }
    },
    [year, cloudReady]
  );

  const updateMonth = useCallback(
    (updater: (data: MonthData) => MonthData) => {
      setMonths((prev) => {
        const next = [...prev];
        const updated = updater(next[month - 1]);
        next[month - 1] = updated;
        persistMonth(month, updated);
        return next;
      });
    },
    [month, persistMonth]
  );

  const toggleDay = (day: number) =>
    updateMonth((data) => {
      const days = { ...data.days };
      if (days[day] !== undefined) delete days[day];
      else days[day] = {};
      return { days };
    });

  const setOverride = (day: number, field: "km" | "dest", raw: string) =>
    updateMonth((data) => {
      const entry = { ...(data.days[day] ?? {}) };
      if (field === "km") {
        const km = parseFloat(raw.replace(",", "."));
        if (raw.trim() === "" || isNaN(km) || km <= 0) delete entry.km;
        else entry.km = km;
      } else {
        if (raw.trim() === "") delete entry.dest;
        else entry.dest = raw;
      }
      return { days: { ...data.days, [day]: entry } };
    });

  const resetOverride = (day: number) =>
    updateMonth((data) => ({ days: { ...data.days, [day]: {} } }));

  const fillWorkweek = () =>
    updateMonth((data) => {
      const days = { ...data.days };
      for (const d of workweekDays(year, month)) days[d] = days[d] ?? {};
      return { days };
    });

  const handleClearMonth = () => {
    setMonths((prev) => {
      const next = [...prev];
      next[month - 1] = { days: {} };
      return next;
    });
    clearMonth(year, month);
    if (cloudReady) {
      deleteMonthCloud(year, month).catch(() => toast.error("Suppression cloud échouée."));
    }
    toast.success("Mois vidé. Les autres mois sont intacts.");
  };

  const handleSaveSettings = (s: YearSettings) => {
    setSettings(s);
    saveSettings(year, s);
    if (cloudReady) {
      upsertSettings(year, s).catch(() => toast.error("Synchronisation des réglages échouée."));
    }
    toast.success(`Réglages ${year} enregistrés.`);
  };

  // ── Envoi ──
  const handleSend = async () => {
    if (!settings || !summary || !dashboard) return;
    setSending(true);
    try {
      if (cloudReady) {
        // Pièce jointe générée ici, cumul/indemnité revérifiés côté serveur
        const { base64, filename } = await buildMonthXlsxBase64(
          settings, summary, year, month, dashboard
        );
        const res = await sendReportCloud(year, month, base64, filename);
        toast.success(`Rapport envoyé à ${email()} — ${fmtEur(res.allowance)} (validé serveur).`);
      } else {
        const payload = buildPayload(settings, months[month - 1], year, month, summary.cumKmBefore);
        const body = buildEmailBody(payload, summary, reportUrl(payload));
        const res = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            access_key: WEB3FORMS_KEY,
            subject: buildEmailSubject(payload, summary),
            from_name: settings.name,
            name: settings.name,
            message: body,
          }),
        });
        if (!res.ok) throw new Error();
        toast.success(`Rapport envoyé à ${email()}.`);
      }
    } catch {
      toast.error("Échec de l'envoi. Réessayez, ou exportez le xlsx manuellement.");
    } finally {
      setSending(false);
    }
  };

  // ── Sauvegarde locale (mode local uniquement) ──
  const downloadBackup = () => {
    const blob = new Blob([exportBackup()], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `sauvegarde-ik-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportBackup = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const count = importBackup(String(reader.result));
        setSettings(loadSettings(year));
        setMonths(loadYearMonths(year));
        toast.success(`Sauvegarde restaurée (${count} entrées).`);
      } catch {
        toast.error("Fichier de sauvegarde invalide.");
      }
    };
    reader.readAsText(file);
  };

  // ── Rendu ──

  // 1. Lien magique : prioritaire (les données sont dans le lien)
  if (received) {
    return (
      <ReceivedReport
        payload={received}
        onClose={() => {
          history.replaceState(null, "", window.location.pathname);
          setReceived(null);
        }}
      />
    );
  }

  // 2. Accès
  if (cloudEnabled) {
    if (session === undefined) {
      return (
        <section className="py-24 min-h-[60vh] flex items-center justify-center text-muted-foreground">
          <Loader2 className="h-6 w-6 animate-spin" />
        </section>
      );
    }
    if (!session) return <CloudLogin />;
  } else if (!unlocked) {
    return <PinGate onUnlocked={() => setUnlocked(true)} />;
  }

  return (
    <>
      <section className="py-8 md:py-10 border-b border-border" style={{ backgroundColor: "#F7F9FA" }}>
        <div className="container flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-foreground leading-tight">
              Indemnités kilométriques
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Barème {year} (gelé depuis 2023) — la tranche dépend du <strong>cumul annuel</strong>.
              Enregistrement automatique.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Select value={String(year)} onValueChange={(v) => setYear(Number(v))}>
              <SelectTrigger aria-label="Année" className="w-24 bg-card">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {YEARS.map((y) => <SelectItem key={y} value={String(y)}>{y}</SelectItem>)}
              </SelectContent>
            </Select>
            {cloudReady && (
              <div className="flex items-center gap-1.5 rounded-md border border-border bg-card px-2.5 py-2 text-xs text-muted-foreground">
                <Cloud className="h-3.5 w-3.5 text-primary" />
                <span className="max-w-36 truncate">{session?.user.email}</span>
                <button
                  aria-label="Se déconnecter"
                  className="ml-1 hover:text-destructive transition-colors"
                  onClick={() => supabase?.auth.signOut()}
                >
                  <LogOut className="h-3.5 w-3.5" />
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="bg-background py-8 md:py-10">
        <div className="container max-w-5xl space-y-6">
          {loadingData ? (
            <p className="py-16 text-center text-muted-foreground flex items-center justify-center gap-2">
              <Loader2 className="h-5 w-5 animate-spin" /> Chargement de vos données…
            </p>
          ) : (
            <>
              <SettingsCard
                key={`${year}-${settings ? "ok" : "new"}`}
                year={year}
                settings={settings}
                fallback={fallbackSettings}
                onSave={handleSaveSettings}
              />

              {settings && summary && dashboard && (
                <>
                  <div className="grid lg:grid-cols-3 gap-6 items-start">
                    <div className="lg:col-span-2">
                      <CalendarGrid
                        year={year}
                        month={month}
                        settings={settings}
                        data={months[month - 1]}
                        onMonthChange={setMonth}
                        onToggle={toggleDay}
                        onOverride={setOverride}
                        onResetOverride={resetOverride}
                        onFillWorkweek={fillWorkweek}
                        onClearMonth={handleClearMonth}
                      />
                    </div>
                    <div className="space-y-4">
                      <MonthSummaryCard
                        year={year}
                        month={month}
                        summary={summary}
                        sending={sending}
                        recipient={email()}
                        cloudMode={cloudReady}
                        onSend={handleSend}
                        onExportXlsx={() => exportMonthXlsx(settings, summary, year, month, dashboard)}
                        onExportCsv={() => exportMonthCsv(settings, summary, year, month)}
                      />
                      {!cloudEnabled && (
                        <div className="bg-card border border-border rounded-xl p-4">
                          <p className="text-xs text-muted-foreground mb-2">
                            Les données vivent dans ce navigateur — pensez à une sauvegarde
                            si vous changez de poste.
                          </p>
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm" onClick={downloadBackup}>
                              <Download className="mr-2 h-3.5 w-3.5" /> Sauvegarder
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => fileInputRef.current?.click()}>
                              <Upload className="mr-2 h-3.5 w-3.5" /> Restaurer
                            </Button>
                            <input
                              ref={fileInputRef} type="file" accept=".json" className="hidden"
                              onChange={(e) => {
                                const f = e.target.files?.[0];
                                if (f) handleImportBackup(f);
                                e.target.value = "";
                              }}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <YearDashboard
                    year={year}
                    rows={dashboard}
                    selectedMonth={month}
                    onSelectMonth={setMonth}
                  />
                </>
              )}

              {profile?.isAdmin && <AdminPanel year={year} />}
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default IKPage;
