import AnimatedSection from "@/components/shared/AnimatedSection";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Code2, Users, Shield, Lightbulb, Settings, BarChart3 } from "lucide-react";

const services = [
  {
    icon: Lightbulb,
    title: "Conseil IT & stratégie",
    desc: "Nous vous aidons à définir votre feuille de route technique : choix d'architecture, audit de l'existant, benchmark de solutions et cadrage de projet. Notre approche est pragmatique et orientée résultats.",
    items: ["Cadrage et avant-projet", "Choix d'architecture", "Audit technique", "Stratégie de transformation"],
  },
  {
    icon: Code2,
    title: "Développement sur mesure",
    desc: "De la conception à la mise en production, nous développons des applications robustes et maintenables. Back-end, front-end, API, intégrations : chaque projet est traité avec rigueur.",
    items: ["Applications web & métier", "APIs et microservices", "Intégrations SI", "Migration et refonte"],
  },
  {
    icon: Shield,
    title: "Expertise & audit technique",
    desc: "Nos experts interviennent sur vos sujets les plus complexes : review de code, optimisation de performances, sécurité applicative, dette technique.",
    items: ["Revue de code", "Optimisation des performances", "Sécurité applicative", "Réduction de la dette technique"],
  },
  {
    icon: Users,
    title: "Renfort d'équipe",
    desc: "Nous intégrons vos équipes en régie ou au forfait pour renforcer votre capacité de delivery, tout en partageant nos bonnes pratiques.",
    items: ["Assistance technique", "Développeurs senior", "Tech leads", "DevOps & SRE"],
  },
  {
    icon: Settings,
    title: "DevOps & Cloud",
    desc: "Automatisation, CI/CD, infrastructure as code, conteneurisation : nous mettons en place les fondations pour un delivery fiable et rapide.",
    items: ["CI/CD pipelines", "Infrastructure as Code", "Conteneurisation", "Monitoring & observabilité"],
  },
  {
    icon: BarChart3,
    title: "Data & analytics",
    desc: "Structuration de vos données, mise en place de pipelines et d'outils d'analyse pour des décisions éclairées.",
    items: ["Data engineering", "Pipelines ETL", "Dashboarding", "Data governance"],
  },
];

const ServicesPage = () => {
  return (
    <>
      <section className="bg-card py-20 md:py-28">
        <div className="container">
          <AnimatedSection className="max-w-2xl">
            <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">Nos services</p>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-foreground leading-tight">
              Des expertises complémentaires au service de vos projets
            </h1>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              Chaque mission est unique. Nous mobilisons les compétences adaptées pour répondre précisément à vos besoins, qu'il s'agisse d'un conseil ponctuel ou d'un accompagnement long terme.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="bg-background py-16 md:py-24">
        <div className="container space-y-12">
          {services.map((s, i) => (
            <AnimatedSection key={s.title} delay={i * 0.05}>
              <div className="bg-card border border-border rounded-lg p-8 md:p-10 flex flex-col md:flex-row gap-8">
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 rounded-lg bg-accent flex items-center justify-center">
                    <s.icon className="h-7 w-7 text-primary" />
                  </div>
                </div>
                <div className="flex-1">
                  <h2 className="font-heading text-xl md:text-2xl font-bold text-foreground">{s.title}</h2>
                  <p className="mt-3 text-muted-foreground leading-relaxed">{s.desc}</p>
                  <ul className="mt-4 grid sm:grid-cols-2 gap-2">
                    {s.items.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-sm text-foreground">
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

      <section className="bg-accent py-16 md:py-20">
        <div className="container text-center">
          <AnimatedSection>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">Un besoin spécifique ?</h2>
            <p className="mt-4 text-muted-foreground max-w-lg mx-auto">
              Chaque projet est différent. Contactez-nous pour discuter de vos enjeux et construire ensemble la solution adaptée.
            </p>
            <Button asChild size="lg" className="mt-8">
              <Link to="/contact">Discutons de votre projet</Link>
            </Button>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
};

export default ServicesPage;
