// Edge Function « send-report » — Deno (Supabase)
//
// Reçoit { year, month, xlsxBase64, filename } d'un salarié AUTHENTIFIÉ,
// relit TOUS ses mois de l'année dans la base (le serveur fait foi),
// recalcule cumul + tranche + indemnité, puis envoie l'email au patron
// avec le xlsx en pièce jointe via Resend.
//
// Secrets attendus (supabase secrets set …) :
//   RESEND_API_KEY  — clé API Resend
//   IK_RECIPIENT    — destinataire fixe (le patron), JAMAIS paramétrable par le client
//   IK_FROM         — expéditeur vérifié chez Resend, ex. "STS IK <ik@sabiustechsolutions.com>"

import { createClient } from "npm:@supabase/supabase-js@2";
// SOURCE UNIQUE du barème, partagée avec le site (src/lib/ik/bareme.ts la ré-exporte)
import {
  bracketLabel, CV_LABELS, entitlement, isValidDailyKm, round2, type Cv,
} from "../_shared/bareme.ts";

const MONTH_NAMES = [
  "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
  "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre",
];

const fmtEur = (n: number) =>
  n.toLocaleString("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " €";
const fmtKm = (n: number) => n.toLocaleString("fr-FR", { maximumFractionDigits: 2 }) + " km";

const MAX_ATTACHMENT_BASE64 = 1_400_000; // ~1 Mo décodé

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const json = (status: number, body: unknown) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...CORS, "Content-Type": "application/json" },
  });

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: CORS });
  if (req.method !== "POST") return json(405, { error: "Méthode non autorisée" });

  // 1. Authentification : le JWT du salarié est exigé
  const authHeader = req.headers.get("Authorization") ?? "";
  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_ANON_KEY")!,
    { global: { headers: { Authorization: authHeader } } }
  );
  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError || !userData.user) return json(401, { error: "Non authentifié" });
  const userId = userData.user.id;

  // 2. Entrée
  let body: { year?: number; month?: number; xlsxBase64?: string; filename?: string };
  try {
    body = await req.json();
  } catch {
    return json(400, { error: "JSON invalide" });
  }
  const { year, month, xlsxBase64, filename } = body;
  if (
    !Number.isInteger(year) || year! < 2020 || year! > 2100 ||
    !Number.isInteger(month) || month! < 1 || month! > 12
  ) {
    return json(400, { error: "Année/mois invalides" });
  }
  if (xlsxBase64 && xlsxBase64.length > MAX_ATTACHMENT_BASE64) {
    return json(413, { error: "Pièce jointe trop volumineuse" });
  }

  // 3. Le SERVEUR relit les données (clé service : passe RLS, mais filtre sur ce user)
  const admin = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
  );

  // Allowlist serveur : seuls les comptes APPROUVÉS par STS peuvent envoyer —
  // shouldCreateUser:false côté client n'engage que notre page (revue PR #1).
  const profileRes = await admin
    .from("ik_profiles").select("approved").eq("id", userId).maybeSingle();
  if (profileRes.error || !profileRes.data?.approved) {
    return json(403, { error: "Compte non approuvé par STS" });
  }

  const [settingsRes, monthsRes] = await Promise.all([
    admin.from("ik_settings").select("*").eq("user_id", userId).eq("year", year).maybeSingle(),
    admin.from("ik_months").select("month, days").eq("user_id", userId).eq("year", year),
  ]);
  if (settingsRes.error || !settingsRes.data) {
    return json(400, { error: "Réglages introuvables pour cette année" });
  }
  if (monthsRes.error) return json(500, { error: "Lecture des mois impossible" });

  const s = settingsRes.data as {
    name: string; cv: number; electric: boolean;
    depart: string; destination: string; distance_km: number;
  };
  if (![3, 4, 5, 6, 7].includes(Number(s.cv))) {
    return json(400, { error: "Puissance fiscale invalide" });
  }
  const cv = Number(s.cv) as Cv;
  const distanceKm = Number(s.distance_km);
  if (!isValidDailyKm(distanceKm)) return json(400, { error: "Distance habituelle invalide" });

  type DayEntry = { km?: number; dest?: string };
  const monthDays = new Map<number, Record<string, DayEntry>>();
  for (const row of monthsRes.data as { month: number; days: Record<string, DayEntry> }[]) {
    monthDays.set(row.month, row.days ?? {});
  }

  // Bornes serveur : un km stocké hors de tout bon sens (via PostgREST direct,
  // import corrompu…) invalide le rapport plutôt que de fabriquer un montant.
  for (const [m, days] of monthDays) {
    for (const e of Object.values(days)) {
      if (e.km !== undefined && !isValidDailyKm(e.km)) {
        return json(400, { error: `Distance invalide détectée (mois ${m}) — corrigez la saisie` });
      }
    }
  }

  const kmOfMonth = (m: number): number => {
    const days = monthDays.get(m) ?? {};
    return round2(
      Object.values(days).reduce((sum, e) => sum + (typeof e.km === "number" ? e.km : distanceKm), 0)
    );
  };

  // 4. Cumul ANNUEL côté serveur → tranche garantie
  let cumBefore = 0;
  for (let m = 1; m < month!; m++) cumBefore = round2(cumBefore + kmOfMonth(m));
  const monthKm = kmOfMonth(month!);
  const cumKm = round2(cumBefore + monthKm);
  const allowance = round2(
    entitlement(cumKm, cv, s.electric) - entitlement(cumBefore, cv, s.electric)
  );
  const cumAllowance = entitlement(cumKm, cv, s.electric);

  const days = monthDays.get(month!) ?? {};
  const sortedDays = Object.keys(days).map(Number).sort((a, b) => a - b);
  if (sortedDays.length === 0) return json(400, { error: "Aucun jour travaillé ce mois" });

  // 5. Corps de l'email (récap 12 mois inclus : chaque rapport est auto-auditable)
  const monthLabel = `${MONTH_NAMES[month! - 1]} ${year}`;
  const pad2 = (n: number) => String(n).padStart(2, "0");
  const lines: string[] = [
    `INDEMNITÉS KILOMÉTRIQUES — ${monthLabel}`,
    ``,
    `Salarié : ${s.name}`,
    `Véhicule : ${CV_LABELS[cv]} — ${s.electric ? "100 % électrique (+20 %)" : "thermique"}`,
    `Trajet habituel : ${s.depart} → ${s.destination} (${fmtKm(distanceKm)}/jour)`,
    ``,
    `Jours travaillés : ${sortedDays.length}`,
  ];
  for (const d of sortedDays) {
    const e = days[String(d)] ?? {};
    const km = typeof e.km === "number" ? e.km : distanceKm;
    const dest = e.dest?.trim() || s.destination;
    // « → destination » seulement si elle diffère : le km figure déjà sur la ligne
    const override = dest !== s.destination ? ` → ${dest}` : "";
    lines.push(`  ${pad2(d)}/${pad2(month!)}/${year} — ${fmtKm(km)}${override}`);
  }
  lines.push(
    ``,
    `TOTAL KM DU MOIS : ${fmtKm(monthKm)}`,
    `Cumul annuel (recalculé serveur) : ${fmtKm(cumKm)} — tranche ${bracketLabel(cumKm)}`,
    `INDEMNITÉ DU MOIS À PAYER : ${fmtEur(allowance)}`,
    `Cumul indemnités ${year} : ${fmtEur(cumAllowance)}`,
    ``,
    `Récap ${year} (km par mois) :`,
  );
  let cum = 0;
  for (let m = 1; m <= 12; m++) {
    const km = kmOfMonth(m);
    cum = round2(cum + km);
    if (km > 0) lines.push(`  ${MONTH_NAMES[m - 1].padEnd(10)} ${fmtKm(km).padStart(12)}   cumul ${fmtKm(cum)}`);
  }

  // 6. Envoi Resend — destinataire FIXE (jamais fourni par le client)
  const recipient = Deno.env.get("IK_RECIPIENT");
  const from = Deno.env.get("IK_FROM");
  const resendKey = Deno.env.get("RESEND_API_KEY");
  if (!recipient || !from || !resendKey) return json(500, { error: "Configuration email manquante" });

  const payload: Record<string, unknown> = {
    from,
    to: [recipient],
    subject: `[IK] ${monthLabel} — ${s.name} — ${fmtEur(allowance)}`,
    text: lines.join("\n"),
  };
  if (xlsxBase64) {
    payload.attachments = [{
      filename: filename?.replace(/[^\w.\-éèêàç ]/g, "") || `IK-${pad2(month!)}-${year}.xlsx`,
      content: xlsxBase64,
    }];
  }

  const resendRes = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${resendKey}`, "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!resendRes.ok) {
    const detail = await resendRes.text();
    console.error("Resend error:", detail);
    return json(502, { error: "Échec de l'envoi de l'email" });
  }

  return json(200, { ok: true, monthKm, cumKm, allowance, bracket: bracketLabel(cumKm) });
});
