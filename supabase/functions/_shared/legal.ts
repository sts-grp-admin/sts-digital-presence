// SOURCE UNIQUE des textes juridiquement porteurs et des contrats d'API,
// partagée entre le site (Vite) et l'Edge Function (Deno) — même modèle
// que _shared/bareme.ts. Toute évolution (avocat, comptable, changement de
// capital…) se fait ICI et se propage partout : écran de consentement,
// email, PDF comptable, footer du site.

/** Identité légale de la société (footer du site + pied du justificatif PDF). */
export const LEGAL_LINE =
  "SABIUS TECH SOLUTIONS — SARL au capital de 5 000 € — SIREN 918 031 675 — RCS Paris";

/** Déclaration (3e personne) portée sur le justificatif PDF et l'email de rapport. */
export const DECLARATION_SALARIE =
  "Les trajets déclarés ont été saisis et transmis par le salarié depuis son espace personnel " +
  "sécurisé (connexion par lien email nominatif). Cette transmission dématérialisée vaut " +
  "certification sur l'honneur de l'exactitude des informations déclarées ; le déclarant " +
  "reconnaît avoir connaissance des sanctions pénales encourues par l'auteur d'une fausse " +
  "attestation (article 441-7 du Code pénal).";

/** Même engagement, à la 1re personne — affiché AVANT l'envoi (consentement). */
export const CERTIFICATION_ENVOI =
  "En envoyant, vous certifiez sur l'honneur l'exactitude des informations déclarées " +
  "(article 441-7 du Code pénal).";

/** Statut du relais du justificatif vers l'ingestion comptable. */
export type ComptaStatus =
  | "envoye" // PDF livré à l'adresse compta
  | "echec" // tentative faite, refus/erreur Resend
  | "ecart_client" // montant du PDF client ≠ calcul serveur : relais REFUSÉ
  | "sans_pdf" // le client n'a pas fourni de PDF (ancienne UI en cache ?)
  | "non_configure"; // secret IK_RECIPIENT_COMPTA absent
