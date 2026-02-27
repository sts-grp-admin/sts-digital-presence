import AnimatedSection from "@/components/shared/AnimatedSection";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Award, Handshake, Settings, Zap } from "lucide-react";

const values = [
  {
    icon: Award,
    title: "Excellence technique",
    text: "Chaque ligne de code, chaque recommandation reflète notre exigence de qualité et de rigueur.",
  },
  {
    icon: Handshake,
    title: "Engagement client",
    text: "Nous nous impliquons dans la réussite de chaque mission comme si c'était la nôtre.",
  },
  {
    icon: Settings,
    title: "Pragmatisme",
    text: "Nous privilégions les solutions qui fonctionnent. L'efficacité prime sur les effets de mode.",
  },
  {
    icon: Zap,
    title: "Réactivité",
    text: "Disponibilité, écoute et adaptation rapide : nous répondons à vos besoins sans inertie.",
  },
];

const steps = [
  {
    number: "01",
    title: "Comprendre",
    text: "Analyse de votre contexte, vos contraintes et vos objectifs avant toute intervention.",
  },
  {
    number: "02",
    title: "Concevoir",
    text: "Proposition de solutions adaptées, réalistes et alignées avec votre stratégie technique.",
  },
  {
    number: "03",
    title: "Délivrer",
    text: "Exécution avec rigueur et transparence, en maintenant un dialogue permanent avec vos équipes.",
  },
];

const stats = [
  { value: "30+", label: "missions réalisées" },
  { value: "8+", label: "secteurs d'intervention" },
  { value: "10+", label: "clients actifs et fidèles" },
  { value: "100%", label: "engagement qualité" },
];

const AboutPage = () => {
  return (
    <>
      {/* En-tête */}
      <section className="py-20 md:py-28" style={{ backgroundColor: "#F7F9FA" }}>
        <div className="container">
          <AnimatedSection className="max-w-2xl">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-foreground leading-tight">
              À propos
            </h1>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              L'expertise technique au service de vos enjeux.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Qui sommes-nous */}
      <section className="bg-background py-20 md:py-28">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <AnimatedSection>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                Qui sommes-nous
              </h2>
              <div className="mt-6 space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Sabius Tech Solutions est une ESN spécialisée dans le conseil, le développement et l'accompagnement technique des entreprises.
                </p>
                <p>
                  Nous intervenons auprès de PME, d'ETI et de grands comptes sur des missions à forte valeur ajoutée : stratégie SI, développement sur mesure, architecture, data et pilotage de projets complexes.
                </p>
                <p>
                  Notre conviction : chaque entreprise mérite un partenaire technique capable de comprendre ses enjeux métier autant que ses défis technologiques. C'est cette exigence qui guide l'ensemble de nos interventions.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.15}>
              <div className="relative aspect-square max-w-md mx-auto lg:ml-auto">
                <div
                  className="absolute inset-0 rounded-2xl opacity-[0.06]"
                  style={{
                    backgroundImage:
                      "linear-gradient(hsl(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)",
                    backgroundSize: "40px 40px",
                  }}
                />
                <div className="absolute top-[10%] left-[10%] w-[55%] h-[55%] rounded-full border-2 border-primary/20 bg-primary/5" />
                <div className="absolute bottom-[12%] right-[8%] w-[50%] h-[40%] rounded-xl border-2 border-primary/30 bg-accent/50" />
                <div className="absolute top-[18%] right-[18%] w-[22%] h-[22%] rounded-lg bg-primary/10 border border-primary/20" />
                <div className="absolute bottom-[35%] left-[25%] flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-primary/40" />
                  <div className="w-3 h-3 rounded-full bg-primary/25" />
                  <div className="w-3 h-3 rounded-full bg-primary/15" />
                </div>
                <div className="absolute top-[60%] left-[5%] w-[30%] h-0.5 bg-primary/20 rounded-full" />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Nos valeurs */}
      <section className="bg-card py-20 md:py-28">
        <div className="container">
          <AnimatedSection>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center">
              Nos valeurs
            </h2>
          </AnimatedSection>

          <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((v, i) => (
              <AnimatedSection key={v.title} delay={i * 0.1} className="text-center">
                <div className="w-14 h-14 rounded-lg bg-accent flex items-center justify-center mx-auto mb-4">
                  <v.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-heading font-bold text-lg text-foreground">
                  {v.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {v.text}
                </p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Notre approche */}
      <section className="bg-background py-20 md:py-28">
        <div className="container">
          <AnimatedSection>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center">
              Notre approche
            </h2>
          </AnimatedSection>

          <div className="mt-14 grid md:grid-cols-3 gap-8 relative">
            <div className="hidden md:block absolute top-[52px] left-[16.6%] right-[16.6%] h-0.5 bg-border" />

            {steps.map((step, i) => (
              <AnimatedSection key={step.title} delay={i * 0.15} className="text-center relative">
                <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-5 text-sm font-bold relative z-10">
                  {step.number}
                </div>
                <h3 className="font-heading font-bold text-lg text-foreground">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed max-w-xs mx-auto">
                  {step.text}
                </p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Quelques chiffres */}
      <section className="py-20 md:py-28" style={{ backgroundColor: "#F7F9FA" }}>
        <div className="container">
          <AnimatedSection>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center">
              Quelques chiffres
            </h2>
          </AnimatedSection>

          <div className="mt-14 grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((s, i) => (
              <AnimatedSection key={s.label} delay={i * 0.1} className="text-center">
                <span className="text-4xl md:text-5xl font-extrabold text-primary">
                  {s.value}
                </span>
                <p className="mt-2 text-sm text-muted-foreground font-medium">
                  {s.label}
                </p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28" style={{ backgroundColor: "#2B7A78" }}>
        <div className="container text-center">
          <AnimatedSection>
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              Un projet ? Une mission ? Parlons-en.
            </h2>
            <p className="mt-4 text-white/80">
              Nous répondons sous 24h pour étudier votre besoin.
            </p>
            <div className="mt-8">
              <Button
                asChild
                size="lg"
                className="bg-white text-foreground hover:bg-white/90 text-base"
              >
                <Link to="/contact">Nous contacter</Link>
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
};

export default AboutPage;
