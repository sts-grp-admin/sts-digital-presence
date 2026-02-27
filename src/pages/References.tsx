import AnimatedSection from "@/components/shared/AnimatedSection";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Landmark,
  ShieldCheck,
  Zap,
  ShoppingCart,
  Factory,
  Building,
  Radio,
  HeartPulse,
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

/* ── Missions représentatives ── */
const missions = [
  {
    sector: "Banque & Finance",
    title: "Modernisation d'une plateforme de gestion des risques",
    desc: "Refonte de l'architecture d'un système de calcul de risques. Migration d'un monolithe vers une architecture microservices cloud.",
    stack: ["Java", "Spring Boot", "Kafka", "AWS", "PostgreSQL"],
    duration: "18 mois",
    mode: "Régie",
  },
  {
    sector: "Énergie",
    title: "Portail de suivi opérationnel temps réel",
    desc: "Conception et développement d'un portail de suivi d'indicateurs opérationnels critiques.",
    stack: ["React", "Node.js", "PostgreSQL", "Docker", "Grafana"],
    duration: "10 mois",
    mode: "Forfait",
  },
  {
    sector: "Retail & E-commerce",
    title: "Automatisation des flux logistiques",
    desc: "Intégration et automatisation des flux entre SI logistique, ERP et partenaires de livraison.",
    stack: ["Python", "Azure Functions", "Talend", "API REST"],
    duration: "8 mois",
    mode: "Forfait",
  },
  {
    sector: "Assurance",
    title: "Refonte d'un parcours de souscription en ligne",
    desc: "Accompagnement de la refonte d'un parcours client digital, de la conception UX à la mise en production.",
    stack: ["React", "TypeScript", ".NET", "Azure", "Kubernetes"],
    duration: "14 mois",
    mode: "Régie",
  },
  {
    sector: "Industrie",
    title: "Data platform et tableaux de bord décisionnels",
    desc: "Mise en place d'une plateforme de données et de dashboards de pilotage pour les opérations industrielles.",
    stack: ["Python", "Spark", "Airflow", "Power BI", "Snowflake"],
    duration: "12 mois",
    mode: "Forfait",
  },
  {
    sector: "Secteur public",
    title: "Expertise technique sur un programme de transformation SI",
    desc: "Intervention en tant qu'architecte technique sur un programme de modernisation SI.",
    stack: ["Java", "Angular", "OpenShift", "Oracle", "CI/CD GitLab"],
    duration: "24 mois",
    mode: "Régie",
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
                <div className="bg-card border border-border rounded-lg p-6 flex items-center justify-center h-24 hover:border-primary/40 transition-colors">
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

      {/* Missions représentatives */}
      <section className="bg-background py-20 md:py-28">
        <div className="container">
          <AnimatedSection>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center">
              Des missions concrètes, des résultats mesurables
            </h2>
          </AnimatedSection>

          <div className="mt-12 grid md:grid-cols-2 gap-6">
            {missions.map((m, i) => (
              <AnimatedSection key={m.title} delay={i * 0.07}>
                <div className="bg-card border border-border rounded-lg p-8 h-full flex flex-col">
                  <Badge variant="secondary" className="w-fit mb-4 text-xs">
                    {m.sector}
                  </Badge>
                  <h3 className="font-heading font-bold text-lg text-foreground leading-snug">
                    {m.title}
                  </h3>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                    {m.desc}
                  </p>
                  <div className="mt-auto pt-5 space-y-3">
                    <div className="flex flex-wrap gap-2">
                      {m.stack.map((t) => (
                        <span
                          key={t}
                          className="text-xs font-medium px-2.5 py-1 rounded-full border border-border text-muted-foreground"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {m.duration} · {m.mode}
                    </p>
                  </div>
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
