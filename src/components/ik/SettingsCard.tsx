import { useState } from "react";
import { Car, Pencil, Save, Zap } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Cv, CV_LABELS } from "@/lib/ik/bareme";
import { fmtKm } from "@/lib/ik/compute";
import { YearSettings } from "@/lib/ik/storage";

interface Props {
  year: number;
  settings: YearSettings | null;
  /** Pré-remplissage proposé (ex. réglages de l'année précédente) */
  fallback?: YearSettings | null;
  onSave: (settings: YearSettings) => void;
}

const inputClass =
  "w-full rounded-md border border-input bg-background px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring";

const toForm = (s: YearSettings | null | undefined) => ({
  name: s?.name ?? "",
  cv: s ? String(s.cv) : "",
  electric: s?.electric ?? false,
  depart: s?.depart ?? "",
  destination: s?.destination ?? "",
  distanceKm: s ? String(s.distanceKm) : "",
});

const SettingsCard = ({ year, settings, fallback, onSave }: Props) => {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState(() => toForm(settings ?? fallback));

  const startEdit = () => {
    setForm(toForm(settings ?? fallback));
    setEditing(true);
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const distanceKm = parseFloat(form.distanceKm.replace(",", "."));
    if (
      !form.name.trim() || !form.cv || !form.depart.trim() ||
      !form.destination.trim() || isNaN(distanceKm) || distanceKm <= 0
    ) {
      toast.error("Merci de remplir tous les champs (distance > 0).");
      return;
    }
    onSave({
      name: form.name.trim(),
      cv: Number(form.cv) as Cv,
      electric: form.electric,
      depart: form.depart.trim(),
      destination: form.destination.trim(),
      distanceKm,
    });
    setEditing(false);
  };

  if (settings && !editing) {
    return (
      <div className="bg-card border border-border rounded-xl px-6 py-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-4 min-w-0">
          <div className="h-10 w-10 rounded-lg bg-accent flex items-center justify-center shrink-0">
            {settings.electric
              ? <Zap className="h-5 w-5 text-primary" />
              : <Car className="h-5 w-5 text-primary" />}
          </div>
          <div className="min-w-0">
            <p className="font-heading font-bold text-foreground truncate">
              {settings.name}
              <span className="ml-2 font-body font-normal text-sm text-muted-foreground">
                {CV_LABELS[settings.cv]}{settings.electric ? " · électrique +20 %" : ""}
              </span>
            </p>
            <p className="text-sm text-muted-foreground truncate">
              {settings.depart} → {settings.destination} · {fmtKm(settings.distanceKm)}/jour
            </p>
          </div>
        </div>
        <Button variant="ghost" size="sm" onClick={startEdit}>
          <Pencil className="mr-2 h-4 w-4" /> Modifier
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="bg-card border border-border rounded-xl p-6">
      <h2 className="font-heading font-bold text-lg text-foreground mb-1">
        Mon véhicule & trajet habituel — {year}
      </h2>
      <p className="text-sm text-muted-foreground mb-5">
        À renseigner une fois par année. Le trajet habituel s'applique à chaque jour coché.
      </p>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <Label className="block text-sm font-medium mb-2" htmlFor="ik-name">Nom & prénom</Label>
          <input id="ik-name" className={inputClass} value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Jean Dupont" />
        </div>
        <div>
          <Label className="block text-sm font-medium mb-2" htmlFor="ik-cv">Puissance fiscale</Label>
          <Select value={form.cv} onValueChange={(v) => setForm({ ...form, cv: v })}>
            <SelectTrigger id="ik-cv"><SelectValue placeholder="Sélectionner…" /></SelectTrigger>
            <SelectContent>
              {([3, 4, 5, 6, 7] as Cv[]).map((cv) => (
                <SelectItem key={cv} value={String(cv)}>{CV_LABELS[cv]}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label className="block text-sm font-medium mb-2" htmlFor="ik-depart">Départ habituel</Label>
          <input id="ik-depart" className={inputClass} value={form.depart}
            onChange={(e) => setForm({ ...form, depart: e.target.value })}
            placeholder="Adresse de départ" />
        </div>
        <div>
          <Label className="block text-sm font-medium mb-2" htmlFor="ik-dest">Destination habituelle (client)</Label>
          <input id="ik-dest" className={inputClass} value={form.destination}
            onChange={(e) => setForm({ ...form, destination: e.target.value })}
            placeholder="Adresse du client" />
        </div>
        <div>
          <Label className="block text-sm font-medium mb-2" htmlFor="ik-km">Distance par jour travaillé (km)</Label>
          <input id="ik-km" className={inputClass} inputMode="decimal" value={form.distanceKm}
            onChange={(e) => setForm({ ...form, distanceKm: e.target.value })} placeholder="86" />
        </div>
        <div className="flex items-end justify-between gap-4 pb-1">
          <div className="flex items-center gap-2">
            <Switch id="ik-elec" checked={form.electric}
              onCheckedChange={(c) => setForm({ ...form, electric: c })} />
            <Label htmlFor="ik-elec" className="text-sm">100 % électrique (+20 %)</Label>
          </div>
          <Button type="submit"><Save className="mr-2 h-4 w-4" /> Enregistrer</Button>
        </div>
      </div>
    </form>
  );
};

export default SettingsCard;
