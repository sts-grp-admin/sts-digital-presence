import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import AnimatedSection from "@/components/shared/AnimatedSection";
import {
  ArrowRight,
  Lightbulb,
  Code2,
  Building2,
  BrainCircuit,
  Plug,
  UsersRound,
  Award,
  Zap,
  Target,
  Shuffle,
} from "lucide-react";

const expertises = [
  {
    icon: Lightbulb,
    title: "Conseil IT & Stratégie",
    desc: "Audit, cadrage et recommandations pour aligner votre SI avec vos objectifs métier.",
  },
  {
    icon: Code2,
    title: "Développement logiciel",
    desc: "Conception et réalisation d'applications sur mesure, robustes et maintenables.",
  },
  {
    icon: Building2,
    title: "Architecture & Modernisation",
    desc: "Refonte d'architectures, migration cloud et modernisation de systèmes existants.",
  },
  {
    icon: BrainCircuit,
    title: "Data & Intelligence Artificielle",
    desc: "Structuration de données, pipelines analytics et intégration de solutions IA.",
  },
  {
    icon: Plug,
    title: "Intégration de solutions",
    desc: "Mise en œuvre et intégration de progiciels, API et écosystèmes techniques complexes.",
  },
  {
    icon: UsersRound,
    title: "Accompagnement projet",
    desc: "Renfort d'équipes, pilotage technique et expertise embarquée sur vos projets critiques.",
  },
];

const whyItems = [
  {
    icon: Award,
    keyword: "Expertise",
    text: "Des consultants seniors avec une maîtrise technique éprouvée sur des environnements exigeants.",
  },
  {
    icon: Zap,
    keyword: "Réactivité",
    text: "Un interlocuteur dédié, disponible et impliqué dans la réussite de vos projets.",
  },
  {
    icon: Target,
    keyword: "Exigence",
    text: "Des livrables de qualité, dans le respect des délais et des engagements.",
  },
  {
    icon: Shuffle,
    keyword: "Agilité",
    text: "Une capacité d'adaptation rapide à vos contextes, contraintes et enjeux.",
  },
];

const missions = [
  {
    sector: "Banque",
    title: "Modernisation d'une plateforme de gestion des risques",
    stack: ["Java", "Spring Boot", "AWS", "Kafka"],
  },
  {
    sector: "Énergie",
    title: "Développement d'un portail de suivi opérationnel",
    stack: ["React", "Node.js", "PostgreSQL", "Docker"],
  },
  {
    sector: "Retail",
    title: "Intégration et automatisation des flux logistiques",
    stack: ["Python", "Azure", "Talend", "API REST"],
  },
];

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

const Index = () => {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-card">
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(hsl(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <div className="container relative py-24 md:py-36 lg:py-44">
          <AnimatedSection className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight text-foreground text-balance">
              L'expertise IT au service de vos ambitions
            </h1>
            <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
              Conseil, développement et accompagnement technique sur mesure pour les entreprises qui exigent l'excellence.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Button asChild size="lg" className="text-base">
                <Link to="/services">Découvrir nos services</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-base">
                <Link to="/contact">Nous contacter</Link>
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Nos domaines d'expertise */}
      <section className="bg-background py-20 md:py-28">
        <div className="container">
          <AnimatedSection>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Nos domaines d'expertise
            </h2>
            <p className="mt-4 text-muted-foreground max-w-xl">
              Une offre de services complète pour répondre à vos enjeux techniques, du conseil stratégique à la mise en œuvre.
            </p>
          </AnimatedSection>

          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {expertises.map((s, i) => (
              <AnimatedSection key={s.title} delay={i * 0.08}>
                <div className="group bg-card border border-border rounded-lg p-6 h-full hover:border-primary/40 transition-colors">
                  <s.icon className="h-8 w-8 text-primary mb-4" />
                  <h3 className="font-heading font-bold text-lg text-foreground">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection className="mt-10">
            <Button asChild variant="link" className="group text-base">
              <Link to="/services">
                Voir tous nos services
                <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </AnimatedSection>
        </div>
      </section>

      {/* Pourquoi Sabius */}
      <section className="py-20 md:py-28" style={{ backgroundColor: "#F7F9FA" }}>
        <div className="container">
          <AnimatedSection>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center">
              Pourquoi choisir Sabius Tech Solutions ?
            </h2>
          </AnimatedSection>

          <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyItems.map((item, i) => (
              <AnimatedSection key={item.keyword} delay={i * 0.1} className="text-center">
                <item.icon className="h-10 w-10 text-primary mx-auto mb-4" />
                <h3 className="font-heading font-bold text-lg text-foreground">
                  {item.keyword}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {item.text}
                </p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Ils nous font confiance */}
      <section className="bg-card py-20 md:py-28">
        <div className="container">
          <AnimatedSection>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center">
              Ils nous font confiance
            </h2>
          </AnimatedSection>

          <AnimatedSection className="mt-12">
            <div className="flex flex-wrap justify-center gap-x-10 gap-y-4">
              {clients.map((name) => (
                <span
                  key={name}
                  className="text-muted-foreground font-medium text-base md:text-lg tracking-wide"
                >
                  {name}
                </span>
              ))}
            </div>
          </AnimatedSection>

          <AnimatedSection className="mt-10 max-w-3xl mx-auto text-center">
            <p className="text-sm text-muted-foreground leading-relaxed">
              Nos consultants sont également intervenus dans des environnements tels que Disneyland Paris, Société Générale, Servier, Fnac, KPMG, LCL et BPCE.
            </p>
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

          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {missions.map((m, i) => (
              <AnimatedSection key={m.title} delay={i * 0.1}>
                <div className="bg-card border border-border rounded-lg p-6 h-full flex flex-col">
                  <Badge variant="secondary" className="w-fit mb-4 text-xs">
                    Secteur {m.sector}
                  </Badge>
                  <h3 className="font-heading font-bold text-lg text-foreground leading-snug">
                    {m.title}
                  </h3>
                  <div className="mt-auto pt-5 flex flex-wrap gap-2">
                    {m.stack.map((t) => (
                      <span
                        key={t}
                        className="text-xs font-medium px-2.5 py-1 rounded-full border border-border text-muted-foreground"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection className="mt-10 text-center">
            <Button asChild variant="link" className="group text-base">
              <Link to="/references">
                Voir toutes nos références
                <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </AnimatedSection>
        </div>
      </section>

      {/* CTA final */}
      <section className="py-20 md:py-28" style={{ backgroundColor: "#2B7A78" }}>
        <div className="container">
          <AnimatedSection className="text-center max-w-2xl mx-auto">
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
                <Link to="/contact">Prendre contact</Link>
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
};

export default Index;
