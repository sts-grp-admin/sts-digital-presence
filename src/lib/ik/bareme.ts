// Le barème vit dans supabase/functions/_shared/bareme.ts : SOURCE UNIQUE
// partagée entre le site et l'Edge Function send-report (revue PR #1 —
// une table dupliquée divergerait à la prochaine révision DGFiP).
export {
  BAREME,
  CV_LABELS,
  ELECTRIC_FACTOR,
  MAX_DAILY_KM,
  bracketLabel,
  entitlement,
  isValidDailyKm,
  monthlyAllowance,
  round2,
} from "../../../supabase/functions/_shared/bareme";
export type { BaremeRow, Cv } from "../../../supabase/functions/_shared/bareme";
