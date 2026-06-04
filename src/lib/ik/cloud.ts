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

export async function deleteMonth(year: number, month: number): Promise<void> {
  const { error } = await sb()
    .from("ik_months")
    .delete()
    .eq("user_id", await uid())
    .eq("year", year)
    .eq("month", month);
  if (error) throw error;
}

/** Vrai si le compte n'a encore AUCUNE donnée pour cette année (migration locale → cloud). */
export async function cloudIsEmpty(year: number): Promise<boolean> {
  const id = await uid();
  const [s, m] = await Promise.all([
    sb().from("ik_settings").select("year", { count: "exact", head: true })
      .eq("user_id", id).eq("year", year),
    sb().from("ik_months").select("year", { count: "exact", head: true })
      .eq("user_id", id).eq("year", year),
  ]);
  if (s.error) throw s.error;
  if (m.error) throw m.error;
  return (s.count ?? 0) === 0 && (m.count ?? 0) === 0;
}

// --- Vue admin (RLS : seulement si ik_profiles.is_admin) ---

export interface TeamMemberData {
  userId: string;
  settings: YearSettings;
  months: MonthData[];
}

export async function fetchTeam(year: number): Promise<TeamMemberData[]> {
  const [settingsRes, monthsRes] = await Promise.all([
    sb().from("ik_settings").select("*").eq("year", year),
    sb().from("ik_months").select("user_id, month, days").eq("year", year),
  ]);
  if (settingsRes.error) throw settingsRes.error;
  if (monthsRes.error) throw monthsRes.error;

  const byUser = new Map<string, TeamMemberData>();
  for (const row of (settingsRes.data ?? []) as SettingsRow[]) {
    byUser.set(row.user_id, {
      userId: row.user_id,
      settings: toSettings(row),
      months: Array.from({ length: 12 }, () => ({ days: {} })),
    });
  }
  for (const row of (monthsRes.data ?? []) as MonthRow[]) {
    const member = byUser.get(row.user_id);
    if (member) member.months[row.month - 1] = { days: row.days ?? {} };
  }
  return [...byUser.values()].sort((a, b) => a.settings.name.localeCompare(b.settings.name));
}

/** Envoi du rapport via l'Edge Function (cumul recalculé côté serveur, xlsx en pièce jointe). */
export async function sendReportCloud(
  year: number,
  month: number,
  xlsxBase64: string,
  filename: string
): Promise<{ allowance: number }> {
  const { data, error } = await sb().functions.invoke("send-report", {
    body: { year, month, xlsxBase64, filename },
  });
  if (error) throw error;
  return data as { allowance: number };
}
