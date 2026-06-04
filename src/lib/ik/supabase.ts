import { createClient, SupabaseClient } from "@supabase/supabase-js";

// Cloud optionnel : tant que les variables d'env ne sont pas fournies
// (voir SETUP-SUPABASE.md), l'outil fonctionne en mode 100 % local
// (PIN + localStorage), exactement comme avant.

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

export const supabase: SupabaseClient | null =
  url && anonKey ? createClient(url, anonKey) : null;

export const cloudEnabled = supabase !== null;
