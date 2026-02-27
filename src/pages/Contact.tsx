import AnimatedSection from "@/components/shared/AnimatedSection";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const ContactPage = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", company: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: "Message envoyé", description: "Nous reviendrons vers vous dans les meilleurs délais." });
    setForm({ name: "", email: "", company: "", message: "" });
  };

  return (
    <>
      <section className="bg-card py-20 md:py-28">
        <div className="container">
          <AnimatedSection className="max-w-2xl">
            <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">Contact</p>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-foreground leading-tight">
              Parlons de votre projet
            </h1>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              Un besoin technique ? Une question ? N'hésitez pas à nous contacter, nous vous répondrons rapidement.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="bg-background py-16 md:py-24">
        <div className="container">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Form */}
            <AnimatedSection className="lg:col-span-3">
              <form onSubmit={handleSubmit} className="bg-card border border-border rounded-lg p-8 space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Nom complet</label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full rounded-md border border-input bg-background px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                      placeholder="Jean Dupont"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full rounded-md border border-input bg-background px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                      placeholder="jean@entreprise.fr"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Entreprise</label>
                  <input
                    type="text"
                    value={form.company}
                    onChange={(e) => setForm({ ...form, company: e.target.value })}
                    className="w-full rounded-md border border-input bg-background px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    placeholder="Nom de votre entreprise"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Message</label>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full rounded-md border border-input bg-background px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                    placeholder="Décrivez votre projet ou votre besoin..."
                  />
                </div>
                <Button type="submit" size="lg" className="w-full sm:w-auto">
                  Envoyer le message
                </Button>
              </form>
            </AnimatedSection>

            {/* Contact info */}
            <AnimatedSection className="lg:col-span-2" delay={0.15}>
              <div className="space-y-8">
                <div>
                  <h3 className="font-heading font-bold text-lg text-foreground mb-6">Coordonnées</h3>
                  <div className="space-y-5">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center flex-shrink-0">
                        <Mail className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">Email</p>
                        <p className="text-sm text-muted-foreground">contact@sabius-tech.fr</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center flex-shrink-0">
                        <Phone className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">Téléphone</p>
                        <p className="text-sm text-muted-foreground">+33 1 23 45 67 89</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center flex-shrink-0">
                        <MapPin className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">Adresse</p>
                        <p className="text-sm text-muted-foreground">
                          12 rue de l'Innovation<br />75008 Paris, France
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-accent rounded-lg p-6">
                  <h4 className="font-heading font-semibold text-foreground mb-2">Horaires</h4>
                  <p className="text-sm text-muted-foreground">
                    Lundi — Vendredi : 9h00 — 18h00<br />
                    Réponse sous 24h ouvrées
                  </p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactPage;
