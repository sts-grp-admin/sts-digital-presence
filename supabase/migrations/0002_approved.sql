-- Allowlist serveur (revue PR #1) : « sur invitation » ne doit pas reposer
-- uniquement sur shouldCreateUser côté client. Un compte auto-créé via l'API
-- publique reste approved = false : il ne peut ni écrire ses IK ni envoyer
-- de rapport tant que STS ne l'a pas approuvé.

alter table public.ik_profiles
  add column approved boolean not null default false;

create or replace function public.is_ik_approved()
returns boolean
language sql
security definer set search_path = public
stable
as $$
  select coalesce(
    (select approved from public.ik_profiles where id = auth.uid()),
    false
  );
$$;

-- Écritures réservées aux comptes approuvés (la lecture de ses propres
-- lignes — vides pour un intrus — reste sans intérêt)
drop policy "settings: insérer" on public.ik_settings;
create policy "settings: insérer" on public.ik_settings
  for insert with check (user_id = auth.uid() and public.is_ik_approved());
drop policy "settings: modifier" on public.ik_settings;
create policy "settings: modifier" on public.ik_settings
  for update using (user_id = auth.uid())
  with check (user_id = auth.uid() and public.is_ik_approved());

drop policy "mois: insérer" on public.ik_months;
create policy "mois: insérer" on public.ik_months
  for insert with check (user_id = auth.uid() and public.is_ik_approved());
drop policy "mois: modifier" on public.ik_months;
create policy "mois: modifier" on public.ik_months
  for update using (user_id = auth.uid())
  with check (user_id = auth.uid() and public.is_ik_approved());

-- Comptes existants connus de STS
update public.ik_profiles set approved = true;

-- ─────────────── Onboarding d'un nouveau salarié (2 actions) ───────────────
-- 1. Authentication → Users → créer/inviter l'email
-- 2. SQL :  update public.ik_profiles set approved = true
--           where id = (select id from auth.users where email = 'nouveau@email.fr');
