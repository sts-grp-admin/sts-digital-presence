import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import AnimatedSection from "@/components/shared/AnimatedSection";
import { ArrowRight, Code2, Users, Shield, Lightbulb } from "lucide-react";

const services = [
  {
    icon: Lightbulb,
    title: "Conseil IT",
    desc: "Cadrage technique, choix d'architecture et stratégie digitale adaptés à vos enjeux métier.",
  },
  {
    icon: Code2,
    title: "Développement",
    desc: "Conception et réalisation d'applications sur mesure, du back-end aux interfaces utilisateur.",
  },
  {
    icon: Shield,
    title: "Expertise technique",
    desc: "Audit de code, montée en compétences et résolution de problématiques complexes.",
  },
  {
    icon: Users,
    title: "Accompagnement",
    desc: "Renfort d'équipe et assistance technique au quotidien, en régie ou au forfait.",
  },
];

const Index = () => {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-card">
        {/* Subtle grid background */}
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
              Conseil, développement, data et intelligence artificielle : un accompagnement technique sur mesure pour les entreprises qui exigent l'excellence.
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

      {/* Expertise keywords banner */}
      <section className="bg-muted py-6">
        <div className="container">
          <p className="text-center text-sm md:text-base text-muted-foreground tracking-wide">
            IA &amp; GenAI · Data Science · Cloud · Développement · Architecture · DevOps
          </p>
        </div>
      </section>

      {/* Services overview */}
      <section className="bg-background py-20 md:py-28">
        <div className="container">
          <AnimatedSection>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">Nos domaines d'expertise</h2>
            <p className="mt-4 text-muted-foreground max-w-xl">
              Une offre de services complète pour répondre à vos enjeux techniques, du conseil stratégique à la mise en œuvre.
            </p>
          </AnimatedSection>
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((s, i) => (
              <AnimatedSection key={s.title} delay={i * 0.1}>
                <div className="group bg-card border border-border rounded-lg p-6 h-full hover:border-primary/40 transition-colors">
                  <s.icon className="h-8 w-8 text-primary mb-4" />
                  <h3 className="font-heading font-bold text-lg text-foreground">{s.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
          <AnimatedSection className="mt-10">
            <Button asChild variant="link" className="group text-base">
              <Link to="/services">
                En savoir plus <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </AnimatedSection>
        </div>
      </section>

      {/* Trust banner */}
      <section className="bg-accent py-16 md:py-20">
        <div className="container">
          <AnimatedSection className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              Des résultats concrets, un engagement total
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Quel que soit votre contexte, nous nous adaptons pour délivrer des résultats mesurables, avec la réactivité et la rigueur que vos projets exigent.
            </p>
            <div className="mt-8">
              <Button asChild variant="default">
                <Link to="/references">Voir nos références</Link>
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-card py-20 md:py-28">
        <div className="container">
          <AnimatedSection className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">Un projet ? Un besoin technique ?</h2>
            <p className="mt-4 text-muted-foreground">
              Parlons-en. Nous serons ravis de comprendre vos enjeux et de vous proposer un accompagnement sur mesure.
            </p>
            <div className="mt-8">
              <Button asChild size="lg">
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
