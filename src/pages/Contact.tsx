import AnimatedSection from "@/components/shared/AnimatedSection";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, Clock, Linkedin } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const ContactPage = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message envoyé",
      description: "Nous reviendrons vers vous dans les meilleurs délais.",
    });
    setForm({ name: "", email: "", company: "", phone: "", subject: "", message: "" });
  };

  const inputClass =
    "w-full rounded-md border border-input bg-background px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring";

  return (
    <>
      {/* En-tête */}
      <section className="py-20 md:py-28" style={{ backgroundColor: "#F7F9FA" }}>
        <div className="container">
          <AnimatedSection className="max-w-2xl">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-foreground leading-tight">
              Contactez-nous
            </h1>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              Un projet, une mission, une question ? Nous vous répondons sous 24 heures.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Formulaire + infos */}
      <section className="bg-background py-16 md:py-24">
        <div className="container">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Formulaire */}
            <AnimatedSection className="lg:col-span-3">
              <form onSubmit={handleSubmit} className="bg-card border border-border rounded-lg p-8 space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Nom complet
                    </label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className={inputClass}
                      placeholder="Jean Dupont"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Email professionnel
                    </label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className={inputClass}
                      placeholder="jean@entreprise.fr"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Entreprise
                    </label>
                    <input
                      type="text"
                      value={form.company}
                      onChange={(e) => setForm({ ...form, company: e.target.value })}
                      className={inputClass}
                      placeholder="Nom de votre entreprise"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Téléphone <span className="text-muted-foreground font-normal">(optionnel)</span>
                    </label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className={inputClass}
                      placeholder="+33 6 12 34 56 78"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Sujet
                  </label>
                  <select
                    required
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    className={inputClass}
                  >
                    <option value="" disabled>
                      Sélectionnez un sujet
                    </option>
                    <option value="projet">Nouveau projet</option>
                    <option value="regie">Mission / Régie</option>
                    <option value="conseil">Conseil</option>
                    <option value="partenariat">Partenariat</option>
                    <option value="autre">Autre</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Message
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className={`${inputClass} resize-none`}
                    placeholder="Décrivez votre projet ou votre besoin..."
                  />
                </div>

                <Button type="submit" size="lg" className="w-full sm:w-auto">
                  Envoyer votre message
                </Button>
              </form>

              <p className="mt-4 text-xs text-muted-foreground">
                Vos données sont traitées de manière confidentielle. Nous ne partageons jamais vos informations avec des tiers.
              </p>
            </AnimatedSection>

            {/* Infos de contact */}
            <AnimatedSection className="lg:col-span-2" delay={0.15}>
              <div className="rounded-lg p-8 space-y-8" style={{ backgroundColor: "#F7F9FA" }}>
                <div>
                  <h3 className="font-heading font-bold text-lg text-foreground mb-6">
                    Coordonnées
                  </h3>
                  <div className="space-y-5">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center flex-shrink-0">
                        <Mail className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">Email</p>
                        <a
                          href="mailto:contact@sabiustechsolutions.com"
                          className="text-sm text-muted-foreground hover:text-primary transition-colors"
                        >
                          contact@sabiustechsolutions.com
                        </a>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center flex-shrink-0">
                        <Phone className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">Téléphone</p>
                        <p className="text-sm text-muted-foreground">+33 (0)1 XX XX XX XX</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center flex-shrink-0">
                        <MapPin className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">Localisation</p>
                        <p className="text-sm text-muted-foreground">Paris, France</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t border-border pt-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center flex-shrink-0">
                      <Clock className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">Disponibilité</p>
                      <p className="text-sm text-muted-foreground">
                        Lundi — Vendredi, 9h — 18h
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border-t border-border pt-6">
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
                  >
                    <Linkedin className="h-5 w-5" />
                    Suivez-nous sur LinkedIn
                  </a>
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
