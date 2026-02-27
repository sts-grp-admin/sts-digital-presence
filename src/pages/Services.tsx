import AnimatedSection from "@/components/shared/AnimatedSection";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Lightbulb,
  Code2,
  Building2,
  BrainCircuit,
  Plug,
  UsersRound,
} from "lucide-react";

const services = [
  {
    icon: Lightbulb,
    title: "Conseil IT & Stratégie",
    desc: "Nous aidons les directions IT et métier à prendre les bonnes décisions technologiques. Audit de l'existant, cadrage de projets, études d'opportunité et feuilles de route SI : nous intervenons en amont pour sécuriser vos choix.",
    items: [
      "Audit et diagnostic SI",
      "Cadrage et études d'opportunité",
      "Schéma directeur et feuille de route",
      "Aide au choix de solutions",
      "Gouvernance IT",
    ],
  },
  {
    icon: Code2,
    title: "Développement logiciel",
    desc: "Nous concevons et développons des applications métier sur mesure, pensées pour durer. Notre approche allie rigueur technique, bonnes pratiques et proximité avec les équipes produit.",
    items: [
      "Applications web et API",
      "Applications mobiles",
      "Back-end et microservices",
      "Tests et qualité logicielle",
      "Maintenance et évolution",
    ],
  },
  {
    icon: BrainCircuit,
    title: "Data & Intelligence Artificielle",
    desc: "Nous concevons des solutions IA sur mesure qui transforment vos données en levier de performance. De la stratégie data à la mise en production, nous accompagnons vos équipes sur l'ensemble de la chaîne de valeur.",
    items: [
      "IA Générative & Agents intelligents",
      "RAG & Knowledge Management",
      "Data Engineering & Analytics",
      "MLOps & industrialisation",
    ],
  },
  {
    icon: Building2,
    title: "Architecture & Modernisation",
    desc: "Nous accompagnons la transformation de vos systèmes d'information : refonte d'architectures monolithiques, migration cloud, conteneurisation et mise en place de pratiques DevOps.",
    items: [
      "Architecture logicielle et technique",
      "Migration cloud (AWS, Azure, GCP)",
      "Conteneurisation et orchestration",
      "CI/CD et DevOps",
      "Refonte de SI legacy",
    ],
  },
  {
    icon: Plug,
    title: "Intégration de solutions",
    desc: "Nous prenons en charge l'intégration technique de solutions tierces dans votre écosystème : ERP, CRM, outils métier, API partenaires. Nous garantissons la cohérence et la fiabilité de vos flux.",
    items: [
      "Intégration d'ERP et CRM",
      "Connecteurs et API",
      "Orchestration de flux",
      "Middleware et ESB",
      "Recette et déploiement",
    ],
  },
  {
    icon: UsersRound,
    title: "Accompagnement projet",
    desc: "Nous renforçons vos équipes avec des profils experts capables de monter rapidement en charge. Pilotage technique, expertise embarquée ou renfort ponctuel : nous nous adaptons à vos besoins.",
    items: [
      "Assistance technique et régie",
      "Pilotage et direction technique",
      "Expertise ponctuelle",
      "Renfort d'équipe projet",
      "Transfert de compétences",
    ],
  },
];

const ServicesPage = () => {
  return (
    <>
      {/* En-tête */}
      <section className="py-20 md:py-28" style={{ backgroundColor: "#F7F9FA" }}>
        <div className="container">
          <AnimatedSection className="max-w-2xl">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-foreground leading-tight">
              Nos services
            </h1>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              Conseil, réalisation et accompagnement technique pour répondre à vos enjeux IT les plus exigeants.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Blocs de services */}
      <section className="bg-background py-16 md:py-24">
        <div className="container space-y-12">
          {services.map((s, i) => (
            <AnimatedSection key={s.title} delay={i * 0.05}>
              <div className="bg-card border border-border rounded-lg p-8 md:p-10 flex flex-col md:flex-row gap-8 hover:border-primary/40 hover:shadow-md transition-all duration-300">
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 rounded-lg bg-accent flex items-center justify-center">
                    <s.icon className="h-7 w-7 text-primary" />
                  </div>
                </div>
                <div className="flex-1">
                  <h2 className="font-heading text-xl md:text-2xl font-bold text-foreground">
                    {s.title}
                  </h2>
                  <p className="mt-3 text-muted-foreground leading-relaxed">
                    {s.desc}
                  </p>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {s.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-center gap-2 text-sm text-foreground bg-accent/60 rounded-full px-3 py-1"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28" style={{ backgroundColor: "#2B7A78" }}>
        <div className="container text-center">
          <AnimatedSection>
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              Besoin d'un accompagnement sur mesure ? Contactez-nous.
            </h2>
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

export default ServicesPage;
