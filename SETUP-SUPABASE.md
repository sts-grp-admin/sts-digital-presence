# Mise en service du cloud IK (Supabase + Resend) — ~30 minutes, une fois

Tant que ces étapes ne sont pas faites, `/outils/ik` fonctionne en **mode local**
(PIN + données dans le navigateur, envoi Web3Forms avec lien magique).
Dès que les variables sont en place, la page bascule automatiquement en **mode cloud** :
connexion par lien email, données centralisées, cumul garanti côté serveur,
email avec le **xlsx en pièce jointe**.

## 1. Supabase (~10 min)

1. Créez un compte sur <https://supabase.com> → **New project**
   - Région : **Europe (Frankfurt / eu-central-1)** (RGPD)
   - Notez le mot de passe base (vous n'en aurez plus besoin ensuite)
2. **SQL Editor** → collez `supabase/migrations/0001_ik.sql` → **Run**, puis `0002_approved.sql` → **Run**
3. **Authentication → Sign In / Up** : laissez **« Allow new users to sign up » ACTIVÉ**.
   ⚠️ Contre-intuitif mais nécessaire : GoTrue bloque TOUT le endpoint de connexion par
   lien email quand ce toggle est désactivé. La protection réelle est double :
   la page ne crée jamais de compte (`shouldCreateUser: false`) et un compte
   auto-créé par l'API reste `approved = false` → il ne peut ni écrire ni envoyer.
4. **Authentication → Users → Invite user** (ou Create new user + Auto Confirm) :
   votre email + ceux des salariés
5. Déclarez-vous admin et approuvez chaque salarié — SQL Editor :
   ```sql
   update public.ik_profiles set is_admin = true
   where id = (select id from auth.users where email = 'contact@sabiustechsolutions.com');
   -- pour CHAQUE salarié (obligatoire depuis 0002) :
   update public.ik_profiles set approved = true
   where id = (select id from auth.users where email = 'salarie@email.fr');
   ```

## 2. Resend (~10 min)

1. Créez un compte sur <https://resend.com>
2. **Domains → Add domain** : `sabiustechsolutions.com` → ajoutez les 3 enregistrements
   DNS proposés chez votre registrar → attendez « Verified »
3. **API Keys → Create** : notez la clé (`re_…`)
4. *(Recommandé)* Dans Supabase : **Authentication → Emails → SMTP Settings** →
   activez le SMTP custom avec Resend (`smtp.resend.com`, user `resend`, pass = la clé API,
   expéditeur `ik@sabiustechsolutions.com`). Sans ça, les emails de connexion sont
   limités à ~2/heure par Supabase.

## 3. Déployer l'Edge Function (~5 min, depuis ce dossier)

```powershell
npm install -g supabase
supabase login                       # ouvre le navigateur
supabase link --project-ref XXXX     # XXXX = ref du projet (Settings → General)
supabase secrets set RESEND_API_KEY=re_xxxxxxxx
supabase secrets set IK_RECIPIENT=contact@sabiustechsolutions.com
supabase secrets set "IK_FROM=STS IK <ik@sabiustechsolutions.com>"
# Optionnel mais recommandé : le justificatif PDF part automatiquement
# vers l'ingestion comptable (Tiime…) à chaque envoi de rapport
supabase secrets set IK_RECIPIENT_COMPTA=justif+VOTRE-ADRESSE@tiime.fr
supabase functions deploy send-report
```

## 4. Brancher le site (~5 min)

Sur GitHub → repo → **Settings → Secrets and variables → Actions → Variables** (pas Secrets) :

| Variable | Valeur (Supabase → Settings → API) |
|---|---|
| `VITE_SUPABASE_URL` | `https://XXXX.supabase.co` |
| `VITE_SUPABASE_ANON_KEY` | la clé `anon public` |

Relancez le déploiement (push ou Actions → Deploy → Run workflow). C'est tout :
- le workflow `supabase-keepalive.yml` se met à pinger la base 2×/semaine (anti-pause) ;
- au premier login d'un salarié, **ses données locales existantes sont importées
  automatiquement** dans son compte.

## Pour développer en local

Créez `.env.local` (jamais commité) :

```
VITE_SUPABASE_URL=https://XXXX.supabase.co
VITE_SUPABASE_ANON_KEY=eyJ...
```

## Sécurité — rappels

- Allowlist serveur : un compte non **approuvé** (`ik_profiles.approved`) ne peut ni
  écrire ses IK ni déclencher d'envoi, même s'il s'est créé via l'API publique.
- RLS : un salarié ne peut techniquement lire/écrire que **ses** lignes ; vous (is_admin) lisez tout.
- Personne ne peut s'auto-promouvoir admin (colonne protégée).
- L'Edge Function n'envoie **qu'à votre adresse** (secret `IK_RECIPIENT`), recalcule le
  cumul depuis la base (le navigateur ne décide jamais de la tranche), et plafonne la pièce jointe à ~1 Mo.
- Activez la **2FA** sur les comptes Supabase, Resend et GitHub.
