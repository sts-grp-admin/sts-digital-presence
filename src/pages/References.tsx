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
  Users,
  Package,
  Lightbulb,
} from "lucide-react";
import { useLanguage, t } from "@/i18n/LanguageContext";
import { translations } from "@/i18n/translations";
import clientsData from "@/data/clients";
import ClientLogoCard from "@/components/shared/ClientLogoCard";

const environments = [
  "Disneyland Paris", "Société Générale", "Servier", "Fnac", "KPMG", "LCL", "BPCE",
];

const interventionIcons = [Users, Package, Lightbulb];
const sectorIcons = [Landmark, ShieldCheck, Zap, ShoppingCart, Factory, Building, Radio, HeartPulse];

const techItems = [
  ["Java", "Python", "TypeScript", "C#"],
  ["React", "Angular", "Vue.js"],
  ["Spring Boot", "Node.js", ".NET"],
  ["Python", "TensorFlow", "PyTorch", "Scikit-learn", "LangChain", "OpenAI API", "HuggingFace", "Pandas", "Spark", "Power BI"],
  ["AWS", "Azure", "GCP"],
  ["Docker", "Kubernetes", "GitLab CI", "Terraform"],
];

const ReferencesPage = () => {
  const { lang } = useLanguage();
  const r = translations.references;

  return (
    <>
      {/* En-tête */}
      <section className="py-12 md:py-16" style={{ backgroundColor: "#F7F9FA" }}>
        <div className="container">
          <AnimatedSection className="max-w-2xl">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-foreground leading-tight">
              {t(r.pageTitle, lang)}
            </h1>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              {t(r.pageSubtitle, lang)}
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Nos clients */}
      <section className="bg-background py-14 md:py-20">
        <div className="container">
          <AnimatedSection>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center">
              {t(r.trustTitle, lang)}
            </h2>
          </AnimatedSection>

          <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {clientsData.map((client, i) => (
              <AnimatedSection key={client.name} delay={i * 0.05}>
                <ClientLogoCard name={client.name} logo={client.logo} logoClassName={client.name === "OpenClassrooms" ? "max-h-[70px] w-auto object-contain grayscale group-hover:grayscale-0 transition-all duration-300" : undefined} />
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Environnements de mission */}
      <section className="bg-card py-14 md:py-20">
        <div className="container">
          <AnimatedSection className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              {t(r.envTitle, lang)}
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              {t(r.envSubtitle, lang)}
            </p>
          </AnimatedSection>

          <AnimatedSection className="mt-12">
            <div className="flex flex-wrap justify-center gap-4">
              {environments.map((name) => (
                <div key={name} className="border border-border rounded-lg px-6 py-4 bg-background">
                  <span className="font-heading font-semibold text-foreground text-sm md:text-base">
                    {name}
                  </span>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Nos modes d'intervention */}
      <section className="bg-background py-14 md:py-20">
        <div className="container">
          <AnimatedSection className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              {t(r.interventionTitle, lang)}
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              {t(r.interventionSubtitle, lang)}
            </p>
          </AnimatedSection>

          <div className="mt-12 grid sm:grid-cols-3 gap-6">
            {r.interventionModes.map((mode, i) => {
              const Icon = interventionIcons[i];
              return (
                <AnimatedSection key={i} delay={i * 0.1}>
                  <div className="bg-card border border-border rounded-lg p-8 h-full text-center hover:border-primary/40 hover:shadow-md transition-all duration-300">
                    <Icon className="h-10 w-10 text-primary mx-auto mb-4" />
                    <h3 className="font-heading font-bold text-lg text-foreground">
                      {t(mode.title, lang)}
                    </h3>
                    <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                      {t(mode.text, lang)}
                    </p>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* Environnements techniques */}
      <section className="py-14 md:py-20" style={{ backgroundColor: "#F7F9FA" }}>
        <div className="container">
          <AnimatedSection>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center">
              {t(r.techTitle, lang)}
            </h2>
          </AnimatedSection>

          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {r.techCategories[lang].map((catLabel, i) => (
              <AnimatedSection key={catLabel} delay={i * 0.08}>
                <div>
                  <h3 className="font-heading font-bold text-foreground mb-3">
                    {catLabel}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {techItems[i].map((item) => (
                      <span key={item} className="text-sm font-medium px-3 py-1.5 rounded-full bg-card border border-border text-muted-foreground">
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
      <section className="bg-card py-14 md:py-20">
        <div className="container">
          <AnimatedSection>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center">
              {t(r.sectorsTitle, lang)}
            </h2>
          </AnimatedSection>

          <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-6">
            {r.sectors[lang].map((label, i) => {
              const Icon = sectorIcons[i];
              return (
                <AnimatedSection key={label} delay={i * 0.06} className="text-center">
                  <Icon className="h-8 w-8 text-primary mx-auto mb-3" />
                  <span className="text-sm font-medium text-foreground">{label}</span>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 md:py-20" style={{ backgroundColor: "#2B7A78" }}>
        <div className="container text-center">
          <AnimatedSection>
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              {t(r.ctaTitle, lang)}
            </h2>
            <p className="mt-4 text-white/80">
              {t(r.ctaSubtitle, lang)}
            </p>
            <div className="mt-8">
              <Button asChild size="lg" className="bg-white text-foreground hover:bg-white/90 text-base">
                <Link to="/contact">{t(r.ctaBtn, lang)}</Link>
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
};

export default ReferencesPage;
