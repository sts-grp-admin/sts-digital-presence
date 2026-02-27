import AnimatedSection from "@/components/shared/AnimatedSection";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const references = [
  {
    sector: "Banque & Finance",
    client: "Grand groupe bancaire",
    mission: "Refonte de la plateforme de gestion des risques et accompagnement de l'équipe interne sur les bonnes pratiques de développement.",
    tags: ["Java", "Spring Boot", "React", "Architecture micro-services"],
  },
  {
    sector: "Industrie",
    client: "ETI industrielle — secteur aéronautique",
    mission: "Développement d'une application métier de suivi de production et mise en place d'une chaîne CI/CD complète.",
    tags: [".NET", "Angular", "Azure DevOps", "Docker"],
  },
  {
    sector: "Assurance",
    client: "Mutuelle nationale",
    mission: "Audit de performance et optimisation d'une application de gestion des contrats traitant plusieurs millions de transactions par jour.",
    tags: ["Performance", "PostgreSQL", "Kubernetes", "Monitoring"],
  },
  {
    sector: "Services publics",
    client: "Établissement public",
    mission: "Conseil en architecture et accompagnement à la migration cloud d'un SI legacy vers une infrastructure conteneurisée.",
    tags: ["Cloud", "AWS", "Terraform", "Migration"],
  },
  {
    sector: "E-commerce",
    client: "PME e-commerce en forte croissance",
    mission: "Renfort d'équipe sur une refonte front-end complète et mise en place d'un design system partagé.",
    tags: ["React", "TypeScript", "Design System", "Storybook"],
  },
];

const ReferencesPage = () => {
  return (
    <>
      <section className="bg-card py-20 md:py-28">
        <div className="container">
          <AnimatedSection className="max-w-2xl">
            <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">Références</p>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-foreground leading-tight">
              Ils nous font confiance
            </h1>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              Quelques missions représentatives de notre savoir-faire, dans des contextes variés et exigeants.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="bg-background py-16 md:py-24">
        <div className="container space-y-8">
          {references.map((ref, i) => (
            <AnimatedSection key={i} delay={i * 0.05}>
              <div className="bg-card border border-border rounded-lg p-8">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-4">
                  <span className="text-xs font-semibold uppercase tracking-wider text-primary bg-accent px-3 py-1 rounded-full w-fit">
                    {ref.sector}
                  </span>
                  <span className="text-sm text-muted-foreground">{ref.client}</span>
                </div>
                <p className="text-foreground leading-relaxed">{ref.mission}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {ref.tags.map((tag) => (
                    <span key={tag} className="text-xs px-2.5 py-1 rounded-md bg-muted text-muted-foreground font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      <section className="bg-accent py-16 md:py-20">
        <div className="container text-center">
          <AnimatedSection>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">Votre projet sera-t-il le prochain ?</h2>
            <p className="mt-4 text-muted-foreground max-w-lg mx-auto">
              Parlons de vos enjeux techniques. Nous serions ravis de contribuer à votre réussite.
            </p>
            <Button asChild size="lg" className="mt-8">
              <Link to="/contact">Nous contacter</Link>
            </Button>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
};

export default ReferencesPage;
