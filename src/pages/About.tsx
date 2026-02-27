import AnimatedSection from "@/components/shared/AnimatedSection";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Target, Handshake, Zap } from "lucide-react";

const values = [
  {
    icon: Target,
    title: "Excellence technique",
    desc: "Nous ne faisons pas de compromis sur la qualité. Chaque ligne de code, chaque recommandation est portée par un haut niveau d'exigence.",
  },
  {
    icon: Handshake,
    title: "Proximité client",
    desc: "Nous entretenons une relation directe et transparente avec chacun de nos clients. Pas d'intermédiaire, pas de distance.",
  },
  {
    icon: Zap,
    title: "Pragmatisme",
    desc: "Nous privilégions les solutions concrètes et actionnables. Notre objectif : créer de la valeur rapidement, sans complexité inutile.",
  },
];

const AboutPage = () => {
  return (
    <>
      <section className="bg-card py-20 md:py-28">
        <div className="container">
          <AnimatedSection className="max-w-2xl">
            <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">À propos</p>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-foreground leading-tight">
              L'expertise au cœur de chaque mission
            </h1>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              Sabius Tech Solutions est une ESN spécialisée en conseil, développement et expertise technique. Notre mission : délivrer un haut niveau de qualité sur chaque intervention, avec réactivité et engagement.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="bg-background py-16 md:py-24">
        <div className="container">
          <AnimatedSection>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Notre approche</h2>
            <div className="max-w-3xl space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Sabius Tech Solutions intervient auprès d'entreprises de tous secteurs sur des missions à forte valeur ajoutée : conseil en architecture, développement d'applications critiques, audits techniques et renfort d'équipe.
              </p>
              <p>
                Ce qui nous distingue, c'est notre exigence de qualité à chaque étape. Nous mobilisons des consultants expérimentés, capables de s'intégrer rapidement et de produire des résultats concrets.
              </p>
              <p>
                Notre force : une expertise pointue, un engagement total sur chaque mission, et une capacité de livraison éprouvée.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="bg-accent py-16 md:py-24">
        <div className="container">
          <AnimatedSection>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-12">Nos valeurs</h2>
          </AnimatedSection>
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((v, i) => (
              <AnimatedSection key={v.title} delay={i * 0.1}>
                <div className="text-center">
                  <div className="w-14 h-14 rounded-lg bg-card flex items-center justify-center mx-auto mb-4">
                    <v.icon className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="font-heading font-bold text-lg text-foreground">{v.title}</h3>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-card py-16 md:py-20">
        <div className="container text-center">
          <AnimatedSection>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">Envie de rejoindre l'aventure ?</h2>
            <p className="mt-4 text-muted-foreground max-w-lg mx-auto">
              Nous sommes toujours à la recherche de talents passionnés. Contactez-nous pour en discuter.
            </p>
            <Button asChild size="lg" className="mt-8">
              <Link to="/contact">Nous écrire</Link>
            </Button>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
};

export default AboutPage;
