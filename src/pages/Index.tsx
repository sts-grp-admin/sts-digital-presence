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
import { useLanguage, t } from "@/i18n/LanguageContext";
import { translations } from "@/i18n/translations";

const expertiseIcons = [Lightbulb, Code2, Building2, BrainCircuit, Plug, UsersRound];
const whyIcons = [Award, Zap, Target, Shuffle];

const missionStacks = [
  ["Java", "Spring Boot", "AWS", "Kafka"],
  ["React", "Node.js", "PostgreSQL", "Docker"],
  ["Python", "Azure", "Talend", "API REST"],
];

const clients = [
  "Whize", "Akkodis", "Teragone Solutions", "Celexio", "Esmoz",
  "Extracens", "MSI Experts", "Newco Data Services", "Odhcom", "OpenClassrooms",
];

const Index = () => {
  const { lang } = useLanguage();
  const h = translations.home;
  const ex = translations.expertises;
  const wi = translations.whyItems;
  const mi = translations.missions;

  return (
    <>
      {/* Hero */}
      <section
        className="relative overflow-hidden"
        style={{ background: "linear-gradient(180deg, #FFFFFF 0%, #F0FAFA 40%, #F0FAFA 70%, hsl(var(--background)) 100%)" }}
      >
        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(hsl(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* Geometric SVG element — right side */}
        <div className="absolute right-[5%] top-0 h-full w-1/2 pointer-events-none hidden md:block">
          <svg
            className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] lg:w-[600px] h-[500px] lg:h-[600px]"
            viewBox="0 0 600 600"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Angular shapes inspired by STS logo */}
            <rect x="180" y="80" width="200" height="200" stroke="#3AAFA9" strokeWidth="1.2" opacity="0.25" transform="rotate(15 280 180)" />
            <rect x="260" y="160" width="160" height="160" stroke="#3AAFA9" strokeWidth="1.2" opacity="0.22" transform="rotate(-10 340 240)" />
            <rect x="140" y="300" width="120" height="120" stroke="#3AAFA9" strokeWidth="1" opacity="0.18" transform="rotate(25 200 360)" />
            <line x1="100" y1="150" x2="400" y2="100" stroke="#3AAFA9" strokeWidth="1" opacity="0.2" />
            <line x1="200" y1="350" x2="500" y2="250" stroke="#3AAFA9" strokeWidth="1" opacity="0.18" />
            <line x1="300" y1="450" x2="550" y2="380" stroke="#3AAFA9" strokeWidth="0.8" opacity="0.15" />
            <polygon points="420,120 480,200 360,200" stroke="#3AAFA9" strokeWidth="1" fill="none" opacity="0.22" />
            <polygon points="350,380 430,440 270,440" stroke="#3AAFA9" strokeWidth="1" fill="none" opacity="0.18" />
            {/* Dots */}
            <circle cx="450" cy="150" r="3" fill="#3AAFA9" opacity="0.25" />
            <circle cx="200" cy="250" r="2.5" fill="#3AAFA9" opacity="0.22" />
            <circle cx="380" cy="350" r="2" fill="#3AAFA9" opacity="0.2" />
            <circle cx="500" cy="300" r="3.5" fill="#3AAFA9" opacity="0.22" />
          </svg>
        </div>

        <div className="container relative py-14 md:py-20 lg:py-24">
          <div className="grid md:grid-cols-[3fr_2fr] gap-8 items-center">
            <AnimatedSection className="max-w-2xl">
              <h1 className="text-3xl md:text-4xl lg:text-[2.75rem] font-extrabold leading-tight tracking-tight text-foreground text-balance">
                {t(h.heroTitle, lang)}
              </h1>
              <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
                {t(h.heroSubtitle, lang)}
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <Button asChild size="lg" className="text-base">
                  <Link to="/services">{t(h.heroBtn1, lang)}</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="text-base">
                  <Link to="/contact">{t(h.heroBtn2, lang)}</Link>
                </Button>
              </div>
            </AnimatedSection>
            {/* Right column is filled by the absolute SVG on desktop, empty spacer on mobile */}
            <div className="hidden md:block" aria-hidden="true" />
          </div>
        </div>
      </section>

      {/* Nos domaines d'expertise */}
      <section className="bg-background py-14 md:py-20">
        <div className="container">
          <AnimatedSection>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              {t(h.expertiseTitle, lang)}
            </h2>
            <p className="mt-4 text-muted-foreground max-w-xl">
              {t(h.expertiseSubtitle, lang)}
            </p>
          </AnimatedSection>

          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {ex.map((s, i) => {
              const Icon = expertiseIcons[i];
              return (
                <AnimatedSection key={i} delay={i * 0.08}>
                  <div className="group bg-card border border-border rounded-lg p-6 h-full hover:border-primary/40 hover:shadow-md transition-all duration-300">
                    <Icon className="h-8 w-8 text-primary mb-4" />
                    <h3 className="font-heading font-bold text-lg text-foreground">
                      {t(s.title, lang)}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                      {t(s.desc, lang)}
                    </p>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>

          <AnimatedSection className="mt-10">
            <Button asChild variant="link" className="group text-base">
              <Link to="/services">
                {t(h.seeAllServices, lang)}
                <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </AnimatedSection>
        </div>
      </section>

      {/* Pourquoi Sabius */}
      <section className="py-14 md:py-20" style={{ backgroundColor: "#F7F9FA" }}>
        <div className="container">
          <AnimatedSection>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center">
              {t(h.whyTitle, lang)}
            </h2>
          </AnimatedSection>

          <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {wi.map((item, i) => {
              const Icon = whyIcons[i];
              return (
                <AnimatedSection key={i} delay={i * 0.1} className="text-center">
                  <Icon className="h-10 w-10 text-primary mx-auto mb-4" />
                  <h3 className="font-heading font-bold text-lg text-foreground">
                    {t(item.keyword, lang)}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    {t(item.text, lang)}
                  </p>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* Ils nous font confiance */}
      <section className="bg-card py-14 md:py-20">
        <div className="container">
          <AnimatedSection>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center">
              {t(h.trustTitle, lang)}
            </h2>
          </AnimatedSection>

          <AnimatedSection className="mt-12">
            <div className="flex flex-wrap justify-center gap-x-10 gap-y-4">
              {clients.map((name) => (
                <span key={name} className="text-muted-foreground font-medium text-base md:text-lg tracking-wide">
                  {name}
                </span>
              ))}
            </div>
          </AnimatedSection>

          <AnimatedSection className="mt-10 max-w-3xl mx-auto text-center">
            <p className="text-sm text-muted-foreground leading-relaxed">
              {t(h.trustFootnote, lang)}
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Missions représentatives */}
      <section className="bg-background py-14 md:py-20">
        <div className="container">
          <AnimatedSection>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center">
              {t(h.missionsTitle, lang)}
            </h2>
          </AnimatedSection>

          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {mi.map((m, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <div className="bg-card border border-border rounded-lg p-6 h-full flex flex-col hover:border-primary/40 hover:shadow-md transition-all duration-300">
                  <Badge variant="secondary" className="w-fit mb-4 text-xs">
                    {t(h.sector, lang)} {t(m.sector, lang)}
                  </Badge>
                  <h3 className="font-heading font-bold text-lg text-foreground leading-snug">
                    {t(m.title, lang)}
                  </h3>
                  <div className="mt-auto pt-5 flex flex-wrap gap-2">
                    {missionStacks[i].map((tech) => (
                      <span key={tech} className="text-xs font-medium px-2.5 py-1 rounded-full border border-border text-muted-foreground">
                        {tech}
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
                {t(h.seeAllReferences, lang)}
                <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </AnimatedSection>
        </div>
      </section>

      {/* CTA final */}
      <section className="py-14 md:py-20" style={{ backgroundColor: "#2B7A78" }}>
        <div className="container">
          <AnimatedSection className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              {t(h.ctaTitle, lang)}
            </h2>
            <p className="mt-4 text-white/80">
              {t(h.ctaSubtitle, lang)}
            </p>
            <div className="mt-8">
              <Button asChild size="lg" className="bg-white text-foreground hover:bg-white/90 text-base">
                <Link to="/contact">{t(h.ctaBtn, lang)}</Link>
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
};

export default Index;
