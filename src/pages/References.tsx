import AnimatedSection from "@/components/shared/AnimatedSection";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

import {
  Landmark,
  ShieldCheck,
  Zap,
  ShoppingCart,
  Factory,
  Building,
  Radio,
  HeartPulse,
  Handshake,
  Code2,
  TrendingUp,
} from "lucide-react";

/* ── Clients directs ── */
const clients = [
  "Whize",
  "Akkodis",
  "Teragone Solutions",
  "Celexio",
  "Esmoz",
  "Extracens",
  "MSI Experts",
  "Newco Data Services",
  "Odhcom",
  "OpenClassrooms",
];

/* ── Environnements de mission ── */
const environments = [
  "Disneyland Paris",
  "Société Générale",
  "Servier",
  "Fnac",
  "KPMG",
  "LCL",
  "BPCE",
];

/* ── Notre approche ── */
const approachBlocks = [
  {
    icon: Handshake,
    title: "Conseil & cadrage",
    text: "Nous analysons votre contexte, vos contraintes et vos objectifs pour proposer une solution technique adaptée.",
  },
  {
    icon: Code2,
    title: "Réalisation & delivery",
    text: "Nos consultants intègrent vos équipes ou pilotent vos projets au forfait, avec un engagement qualité et délai.",
  },
  {
    icon: TrendingUp,
    title: "Suivi & amélioration continue",
    text: "Nous assurons un accompagnement dans la durée : TMA, optimisation, montée en compétences de vos équipes.",
  },
];

/* ── Environnements techniques ── */
const techCategories = [
  { label: "Langages", items: ["Java", "Python", "TypeScript", "C#"] },
  { label: "Front-end", items: ["React", "Angular", "Vue.js"] },
  { label: "Back-end", items: ["Spring Boot", "Node.js", ".NET"] },
  { label: "Cloud", items: ["AWS", "Azure", "GCP"] },
  { label: "Data", items: ["Kafka", "Spark", "Snowflake", "Power BI"] },
  { label: "DevOps", items: ["Docker", "Kubernetes", "GitLab CI", "Terraform"] },
];

/* ── Secteurs d'intervention ── */
const sectors = [
  { icon: Landmark, label: "Banque & Finance" },
  { icon: ShieldCheck, label: "Assurance" },
  { icon: Zap, label: "Énergie" },
  { icon: ShoppingCart, label: "Retail" },
  { icon: Factory, label: "Industrie" },
  { icon: Building, label: "Secteur public" },
  { icon: Radio, label: "Télécoms" },
  { icon: HeartPulse, label: "Santé" },
];

const ReferencesPage = () => {
  return (
    <>
      {/* En-tête */}
      <section className="py-20 md:py-28" style={{ backgroundColor: "#F7F9FA" }}>
        <div className="container">
          <AnimatedSection className="max-w-2xl">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-foreground leading-tight">
              Nos références
            </h1>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              Des interventions concrètes dans des environnements techniques exigeants.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Nos clients */}
      <section className="bg-background py-20 md:py-28">
        <div className="container">
          <AnimatedSection>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center">
              Ils nous font confiance
            </h2>
          </AnimatedSection>

          <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {clients.map((name, i) => (
              <AnimatedSection key={name} delay={i * 0.05}>
                <div className="bg-card border border-border rounded-lg p-6 flex items-center justify-center h-24 hover:border-primary/40 hover:shadow-sm transition-all duration-300">
                  <span className="font-heading font-semibold text-foreground text-center text-sm md:text-base">
                    {name}
                  </span>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Environnements de mission */}
      <section className="bg-card py-20 md:py-28">
        <div className="container">
          <AnimatedSection className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Nos équipes sont intervenues chez
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Dans le cadre de missions de conseil, de développement et d'expertise technique, nos consultants ont opéré au sein des environnements suivants :
            </p>
          </AnimatedSection>

          <AnimatedSection className="mt-12">
            <div className="flex flex-wrap justify-center gap-4">
              {environments.map((name) => (
                <div
                  key={name}
                  className="border border-border rounded-lg px-6 py-4 bg-background"
                >
                  <span className="font-heading font-semibold text-foreground text-sm md:text-base">
                    {name}
                  </span>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Notre approche */}
      <section className="bg-background py-20 md:py-28">
        <div className="container">
          <AnimatedSection>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center">
              Une approche sur mesure, orientée résultat
            </h2>
          </AnimatedSection>

          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {approachBlocks.map((block, i) => (
              <AnimatedSection key={block.title} delay={i * 0.1}>
                <div className="bg-card border border-border rounded-lg p-8 h-full hover:border-primary/40 hover:shadow-md transition-all duration-300 text-center">
                  <div className="w-14 h-14 rounded-lg bg-accent flex items-center justify-center mx-auto mb-5">
                    <block.icon className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="font-heading font-bold text-lg text-foreground">
                    {block.title}
                  </h3>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                    {block.text}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Environnements techniques */}
      <section className="py-20 md:py-28" style={{ backgroundColor: "#F7F9FA" }}>
        <div className="container">
          <AnimatedSection>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center">
              Environnements techniques
            </h2>
          </AnimatedSection>

          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {techCategories.map((cat, i) => (
              <AnimatedSection key={cat.label} delay={i * 0.08}>
                <div>
                  <h3 className="font-heading font-bold text-foreground mb-3">
                    {cat.label}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {cat.items.map((item) => (
                      <span
                        key={item}
                        className="text-sm font-medium px-3 py-1.5 rounded-full bg-card border border-border text-muted-foreground"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Secteurs d'intervention */}
      <section className="bg-card py-20 md:py-28">
        <div className="container">
          <AnimatedSection>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center">
              Secteurs d'intervention
            </h2>
          </AnimatedSection>

          <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-6">
            {sectors.map((s, i) => (
              <AnimatedSection key={s.label} delay={i * 0.06} className="text-center">
                <s.icon className="h-8 w-8 text-primary mx-auto mb-3" />
                <span className="text-sm font-medium text-foreground">{s.label}</span>
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

export default ReferencesPage;
