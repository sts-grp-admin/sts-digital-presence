# Sabius Tech Solutions — Site vitrine

Site web de [Sabius Tech Solutions](https://sabiustechsolutions.com), ESN specialisee dans le conseil, le developpement et l'accompagnement technique.

## Tech Stack

- React 18 + TypeScript
- Vite
- Tailwind CSS + shadcn/ui
- Framer Motion
- i18n : FR / EN / ES

## Getting Started

```sh
npm install
npm run dev
```

## Deployment

Deploiement automatique via GitHub Actions sur chaque push sur `main`.

- **Hosting** : GitHub Pages
- **Domaine** : sabiustechsolutions.com (Namecheap)
- **Formulaire de contact** : Web3Forms
- **Email** : Zoho Mail

## Outil interne — Indemnités kilométriques

Outil de suivi des IK des salariés sur `/outils/ik` (non listé dans le menu) :
calendrier mensuel, barème fiscal à cumul annuel, envoi du rapport avec xlsx + PDF,
relais automatique du justificatif vers la comptabilité (Tiime), cockpit admin.

- **Backend** : Supabase (auth par lien email, Postgres + RLS, Edge Function `send-report`)
- **Emails** : Resend (domaine vérifié)
- **Mise en service complète** : voir [SETUP-SUPABASE.md](SETUP-SUPABASE.md)

### Ajouter un salarié

1. **Créer le compte** — dashboard Supabase → Authentication → Users →
   *Add user → Create new user* : email du salarié, mot de passe quelconque
   (jamais utilisé), cocher **Auto Confirm User**.
   Ne pas utiliser *Invite user* (sa redirection ne mène pas à l'outil).
2. **L'approuver** — SQL Editor :
   ```sql
   update public.ik_profiles set approved = true
   where id = (select id from auth.users where email = 'nouveau@email.fr');
   ```
   Sans cette ligne, le compte ne peut ni saisir ni envoyer (allowlist de sécurité).
3. **Lui communiquer** l'adresse `sabiustechsolutions.com/outils/ik` : connexion
   avec son email, il remplit son véhicule et son trajet habituel, puis coche
   ses jours. Barème, envoi et relais compta sont automatiques.

## Project Structure

```
src/
  components/   UI components (layout, shared, ui)
  pages/        Index, Services, References, About, Contact, Careers, LegalNotice
  i18n/         Translations (FR/EN/ES) + LanguageContext
  lib/          Utilities
  data/         Client logos
  assets/       Logo
```
