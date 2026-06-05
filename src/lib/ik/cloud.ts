import { Cv } from "./bareme";
import { supabase } from "./supabase";
import { MonthData, YearSettings } from "./storage";

// Accès aux tables Supabase (RLS : chaque salarié ne voit que ses lignes,
// l'admin voit tout). Toutes les fonctions supposent une session active.

export interface Profile {
  id: string;
  name: string;
  isAdmin: boolean;
}

interface SettingsRow {
  user_id: string;
  year: number;
  name: string;
  cv: number;
  electric: boolean;
  depart: string;
  destination: string;
  distance_km: number;
}

interface MonthRow {
  user_id: string;
  year: number;
  month: number;
  days: Record<number, { km?: number; dest?: string }>;
}

const sb = () => {
  if (!supabase) throw new Error("Supabase non configuré");
  return supabase;
};

/** Id de l'utilisateur courant. Indispensable dans les requêtes « mes données » :
 *  le RLS laisse l'admin voir TOUTES les lignes, il faut donc toujours filtrer. */
const uid = async (): Promise<string> => {
  const { data } = await sb().auth.getUser();
  if (!data.user) throw new Error("Session expirée");
  return data.user.id;
};

const toSettings = (r: SettingsRow): YearSettings => ({
  name: r.name,
  cv: r.cv as Cv,
  electric: r.electric,
  depart: r.depart,
  destination: r.destination,
  distanceKm: Number(r.distance_km),
});

export async function fetchProfile(): Promise<Profile | null> {
  const { data: auth } = await sb().auth.getUser();
  if (!auth.user) return null;
  const { data, error } = await sb()
    .from("ik_profiles")
    .select("id, name, is_admin")
    .eq("id", auth.user.id)
    .maybeSingle();
  if (error) throw error;
  return data ? { id: data.id, name: data.name ?? "", isAdmin: data.is_admin } : null;
}

export async function fetchSettings(year: number): Promise<YearSettings | null> {
  const { data, error } = await sb()
    .from("ik_settings")
    .select("*")
    .eq("user_id", await uid())
    .eq("year", year)
    .maybeSingle();
  if (error) throw error;
  return data ? toSettings(data as SettingsRow) : null;
}

export async function upsertSettings(year: number, s: YearSettings): Promise<void> {
  const { data: auth } = await sb().auth.getUser();
  if (!auth.user) throw new Error("Session expirée");
  const { error } = await sb().from("ik_settings").upsert({
    user_id: auth.user.id,
    year,
    name: s.name,
    cv: s.cv,
    electric: s.electric,
    depart: s.depart,
    destination: s.destination,
    distance_km: s.distanceKm,
  });
  if (error) throw error;
}

export async function fetchMonths(year: number): Promise<MonthData[]> {
  const { data, error } = await sb()
    .from("ik_months")
    .select("month, days")
    .eq("user_id", await uid())
    .eq("year", year);
  if (error) throw error;
  const months: MonthData[] = Array.from({ length: 12 }, () => ({ days: {} }));
  for (const row of (data ?? []) as Pick<MonthRow, "month" | "days">[]) {
    months[row.month - 1] = { days: row.days ?? {} };
  }
  return months;
}

export async function upsertMonth(year: number, month: number, data: MonthData): Promise<void> {
  const { data: auth } = await sb().auth.getUser();
  if (!auth.user) throw new Error("Session expirée");
  const { error } = await sb().from("ik_months").upsert({
    user_id: auth.user.id,
    year,
    month,
    days: data.days,
    updated_at: new Date().toISOString(),
  });
  if (error) throw error;
}

// --- Vue admin (RLS : seulement si ik_profiles.is_admin) ---

export interface TeamMemberData {
  userId: string;
  /** null = des mois existent mais pas de ligne réglages (état atteignable :
   *  upsert de réglages échoué, migration partielle) — à signaler, pas à cacher */
  settings: YearSettings | null;
  /** Nom de secours (ik_profiles) quand les réglages manquent */
  profileName: string;
  months: MonthData[];
}

export async function fetchTeam(year: number): Promise<TeamMemberData[]> {
  const [settingsRes, monthsRes, profilesRes] = await Promise.all([
    sb().from("ik_settings").select("*").eq("year", year),
    sb().from("ik_months").select("user_id, month, days").eq("year", year),
    sb().from("ik_profiles").select("id, name, is_admin"),
  ]);
  if (settingsRes.error) throw settingsRes.error;
  if (monthsRes.error) throw monthsRes.error;
  if (profilesRes.error) throw profilesRes.error;

  const profiles = new Map(
    (profilesRes.data ?? []).map((p) => [p.id as string, p as { name: string; is_admin: boolean }])
  );
  const emptyYear = () => Array.from({ length: 12 }, () => ({ days: {} }));

  const byUser = new Map<string, TeamMemberData>();
  for (const row of (settingsRes.data ?? []) as SettingsRow[]) {
    byUser.set(row.user_id, {
      userId: row.user_id,
      settings: toSettings(row),
      profileName: profiles.get(row.user_id)?.name ?? "",
      months: emptyYear(),
    });
  }
  for (const row of (monthsRes.data ?? []) as MonthRow[]) {
    let member = byUser.get(row.user_id);
    if (!member) {
      // Mois sans réglages : le salarié doit quand même apparaître au cockpit
      member = {
        userId: row.user_id,
        settings: null,
        profileName: profiles.get(row.user_id)?.name ?? "",
        months: emptyYear(),
      };
      byUser.set(row.user_id, member);
    }
    member.months[row.month - 1] = { days: row.days ?? {} };
  }
  const label = (m: TeamMemberData) => m.settings?.name || m.profileName || "Salarié sans nom";
  return [...byUser.values()]
    .filter((m) => !profiles.get(m.userId)?.is_admin) // l'admin n'est pas un salarié
    .sort((a, b) => label(a).localeCompare(label(b)));
}

/** Envoi du rapport via l'Edge Function : cumul recalculé côté serveur,
 *  xlsx + PDF joints à contact@, PDF relayé vers l'ingestion compta (Tiime). */
export async function sendReportCloud(
  year: number,
  month: number,
  xlsxBase64: string,
  filename: string,
  pdfBase64?: string,
  pdfFilename?: string
): Promise<{ allowance: number; compta: "envoye" | "echec" | "desactive" }> {
  const { data, error } = await sb().functions.invoke("send-report", {
    body: { year, month, xlsxBase64, filename, pdfBase64, pdfFilename },
  });
  if (error) throw error;
  return data as { allowance: number; compta: "envoye" | "echec" | "desactive" };
}
