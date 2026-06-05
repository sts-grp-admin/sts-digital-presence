-- Indemnités kilométriques — schéma + RLS
-- À exécuter dans le SQL Editor de Supabase (ou via `supabase db push`).

-- ───────────────────────────── Tables ─────────────────────────────

create table public.ik_profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  name text not null default '',
  is_admin boolean not null default false,
  created_at timestamptz not null default now()
);

create table public.ik_settings (
  user_id uuid not null references auth.users (id) on delete cascade,
  year int not null check (year between 2020 and 2100),
  name text not null default '',
  cv int not null check (cv between 3 and 7),
  electric boolean not null default false,
  depart text not null default '',
  destination text not null default '',
  distance_km numeric not null check (distance_km > 0),
  updated_at timestamptz not null default now(),
  primary key (user_id, year)
);

create table public.ik_months (
  user_id uuid not null references auth.users (id) on delete cascade,
  year int not null check (year between 2020 and 2100),
  month int not null check (month between 1 and 12),
  days jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now(),
  primary key (user_id, year, month)
);

-- Profil créé automatiquement à l'inscription (invitation)
create or replace function public.handle_new_ik_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.ik_profiles (id, name)
  values (new.id, coalesce(new.raw_user_meta_data ->> 'name', ''))
  on conflict (id) do nothing;
  return new;
end;
$$;

create trigger on_auth_user_created_ik
  after insert on auth.users
  for each row execute function public.handle_new_ik_user();

-- ───────────────────────────── RLS ─────────────────────────────
-- Fonction SECURITY DEFINER pour éviter la récursion des policies sur ik_profiles.

create or replace function public.is_ik_admin()
returns boolean
language sql
security definer set search_path = public
stable
as $$
  select coalesce(
    (select is_admin from public.ik_profiles where id = auth.uid()),
    false
  );
$$;

alter table public.ik_profiles enable row level security;
alter table public.ik_settings enable row level security;
alter table public.ik_months enable row level security;

-- Profils : chacun lit/édite le sien ; l'admin lit tout
create policy "profil: lire le sien ou admin" on public.ik_profiles
  for select using (id = auth.uid() or public.is_ik_admin());
create policy "profil: modifier le sien" on public.ik_profiles
  for update using (id = auth.uid()) with check (id = auth.uid());

-- ─────────────── Privilèges Data API (exposition automatique désactivée) ───────────────
-- Les tables ne sont accessibles que via ces droits explicites ; RLS filtre ensuite les lignes.

grant usage on schema public to anon, authenticated;

grant select, insert, update, delete on public.ik_settings to authenticated;
grant select, insert, update, delete on public.ik_months to authenticated;

-- Profils : lecture seule + modification de la seule colonne name
-- (personne ne peut s'auto-promouvoir admin)
grant select on public.ik_profiles to authenticated;
grant update (name) on public.ik_profiles to authenticated;

-- Keep-alive GitHub Action : requête anonyme autorisée, mais RLS ne renvoie
-- jamais aucune ligne à anon (aucune policy ne le permet)
grant select on public.ik_months to anon;

-- Edge Function (clé service) : contourne RLS mais a besoin des privilèges table
grant select, insert, update, delete on public.ik_settings to service_role;
grant select, insert, update, delete on public.ik_months to service_role;
grant select, update on public.ik_profiles to service_role;

-- Réglages : CRUD sur ses lignes ; l'admin lit tout
create policy "settings: lire" on public.ik_settings
  for select using (user_id = auth.uid() or public.is_ik_admin());
create policy "settings: insérer" on public.ik_settings
  for insert with check (user_id = auth.uid());
create policy "settings: modifier" on public.ik_settings
  for update using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy "settings: supprimer" on public.ik_settings
  for delete using (user_id = auth.uid());

-- Mois : CRUD sur ses lignes ; l'admin lit tout
create policy "mois: lire" on public.ik_months
  for select using (user_id = auth.uid() or public.is_ik_admin());
create policy "mois: insérer" on public.ik_months
  for insert with check (user_id = auth.uid());
create policy "mois: modifier" on public.ik_months
  for update using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy "mois: supprimer" on public.ik_months
  for delete using (user_id = auth.uid());

-- ─────────────────── Après exécution, une seule action manuelle ───────────────────
-- Vous déclarer admin (remplacez l'email par le vôtre) :
--   update public.ik_profiles set is_admin = true
--   where id = (select id from auth.users where email = 'contact@sabiustechsolutions.com');
