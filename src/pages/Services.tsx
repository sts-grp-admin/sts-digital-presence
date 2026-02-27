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
import { useLanguage, t } from "@/i18n/LanguageContext";
import { translations } from "@/i18n/translations";

const serviceIcons = [Lightbulb, Code2, BrainCircuit, Building2, Plug, UsersRound];
const serviceIds = ["conseil-it", "developpement", "data-ia", "architecture", "integration", "accompagnement"];

const ServicesPage = () => {
  const { lang } = useLanguage();
  const s = translations.services;

  return (
    <>
      {/* En-tête */}
      <section className="py-20 md:py-28" style={{ backgroundColor: "#F7F9FA" }}>
        <div className="container">
          <AnimatedSection className="max-w-2xl">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-foreground leading-tight">
              {t(s.pageTitle, lang)}
            </h1>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              {t(s.pageSubtitle, lang)}
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Blocs de services */}
      <section className="bg-background py-16 md:py-24">
        <div className="container space-y-12">
          {s.items.map((svc, i) => {
            const Icon = serviceIcons[i];
            return (
              <AnimatedSection key={i} delay={i * 0.05}>
                <div id={serviceIds[i]} className="bg-card border border-border rounded-lg p-8 md:p-10 flex flex-col md:flex-row gap-8 hover:border-primary/40 hover:shadow-md transition-all duration-300 scroll-mt-24">
                  <div className="flex-shrink-0">
                    <div className="w-14 h-14 rounded-lg bg-accent flex items-center justify-center">
                      <Icon className="h-7 w-7 text-primary" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h2 className="font-heading text-xl md:text-2xl font-bold text-foreground">
                      {t(svc.title, lang)}
                    </h2>
                    <p className="mt-3 text-muted-foreground leading-relaxed">
                      {t(svc.desc, lang)}
                    </p>
                    <ul className="mt-5 flex flex-wrap gap-2">
                      {svc.items[lang].map((item) => (
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
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28" style={{ backgroundColor: "#2B7A78" }}>
        <div className="container text-center">
          <AnimatedSection>
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              {t(s.ctaTitle, lang)}
            </h2>
            <div className="mt-8">
              <Button asChild size="lg" className="bg-white text-foreground hover:bg-white/90 text-base">
                <Link to="/contact">{t(s.ctaBtn, lang)}</Link>
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
};

export default ServicesPage;
