import { useState } from "react";
import { Lock, MailCheck, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/lib/ik/supabase";

// Mode local : code d'accès DISSUASIF (le site est public), pas une vraie sécurité.
// Pour le changer : console navigateur →
//   crypto.subtle.digest("SHA-256", new TextEncoder().encode("NOUVEAU_CODE"))
//     .then(b => console.log([...new Uint8Array(b)].map(x => x.toString(16).padStart(2, "0")).join("")))
// Surchageable au build (variable de repo VITE_IK_PIN_SHA256) pour sortir le
// hash de l'historique git public — un PIN court se brute-force de toute façon.
const IK_PIN_SHA256 =
  (import.meta.env.VITE_IK_PIN_SHA256 as string | undefined) ??
  "24f5f99be6b3c881c2d711db6052664f6cc57331bea0e004936207f8d5b44a01";
export const UNLOCK_KEY = "ik:v1:unlocked";

async function sha256Hex(text: string): Promise<string> {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
  return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, "0")).join("");
}

const Shell = ({ children }: { children: React.ReactNode }) => (
  <section className="py-20 bg-background min-h-[60vh] flex items-center">
    <div className="container max-w-sm">
      <div className="bg-card border border-border rounded-xl p-8 space-y-4 text-center">
        {children}
      </div>
    </div>
  </section>
);

/** Gate PIN (mode local, sans Supabase). */
export const PinGate = ({ onUnlocked }: { onUnlocked: () => void }) => {
  const [pin, setPin] = useState("");
  const [error, setError] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if ((await sha256Hex(pin.trim())) === IK_PIN_SHA256) {
      localStorage.setItem(UNLOCK_KEY, "1");
      onUnlocked();
    } else {
      setError(true);
    }
  };

  return (
    <Shell>
      <form onSubmit={submit} className="space-y-4">
        <Lock className="h-8 w-8 text-primary mx-auto" />
        <h1 className="text-xl font-bold text-foreground">Outil interne — Indemnités kilométriques</h1>
        <p className="text-sm text-muted-foreground">Entrez le code d'accès communiqué par STS.</p>
        <Input
          type="password" inputMode="numeric" autoFocus
          value={pin}
          onChange={(e) => { setPin(e.target.value); setError(false); }}
          placeholder="Code d'accès" className="text-center"
        />
        {error && <p className="text-xs text-destructive" role="alert">Code incorrect.</p>}
        <Button type="submit" className="w-full">Accéder</Button>
      </form>
    </Shell>
  );
};

/** Connexion par lien email (mode cloud Supabase, sur invitation uniquement). */
export const CloudLogin = () => {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!supabase) return;
    setState("sending");
    const { error } = await supabase.auth.signInWithOtp({
      email: email.trim(),
      options: {
        emailRedirectTo: `${window.location.origin}/outils/ik`,
        // Verrou « sur invitation » : ne crée JAMAIS de compte — seuls les
        // emails déjà enregistrés par STS reçoivent un lien.
        shouldCreateUser: false,
      },
    });
    setState(error ? "error" : "sent");
  };

  if (state === "sent") {
    return (
      <Shell>
        <MailCheck className="h-8 w-8 text-primary mx-auto" />
        <h1 className="text-xl font-bold text-foreground">Vérifiez votre boîte mail</h1>
        <p className="text-sm text-muted-foreground">
          Un lien de connexion a été envoyé à <strong>{email}</strong>.
          Cliquez-le depuis cet appareil — la session reste ensuite ouverte.
        </p>
      </Shell>
    );
  }

  return (
    <Shell>
      <form onSubmit={submit} className="space-y-4">
        <Lock className="h-8 w-8 text-primary mx-auto" />
        <h1 className="text-xl font-bold text-foreground">Indemnités kilométriques</h1>
        <p className="text-sm text-muted-foreground">
          Connexion sans mot de passe : entrez votre email professionnel,
          vous recevrez un lien de connexion. Accès sur invitation uniquement.
        </p>
        <Input
          type="email" required autoFocus
          value={email}
          onChange={(e) => { setEmail(e.target.value); setState("idle"); }}
          placeholder="prenom@exemple.fr" className="text-center"
        />
        {state === "error" && (
          <p className="text-xs text-destructive" role="alert">
            Envoi impossible. Vérifiez l'adresse (elle doit avoir été invitée) puis réessayez.
          </p>
        )}
        <Button type="submit" className="w-full" disabled={state === "sending"}>
          <Send className="mr-2 h-4 w-4" />
          {state === "sending" ? "Envoi…" : "Recevoir le lien de connexion"}
        </Button>
      </form>
    </Shell>
  );
};
