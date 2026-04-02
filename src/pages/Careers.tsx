import { useState } from "react";
import AnimatedSection from "@/components/shared/AnimatedSection";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Briefcase,
  MapPin,
  Clock,
  GraduationCap,
  ChevronDown,
  ChevronUp,
  Rocket,
  TrendingUp,
  Heart,
  Send,
} from "lucide-react";
import { useLanguage, t } from "@/i18n/LanguageContext";
import { translations } from "@/i18n/translations";

const whyIcons = [Rocket, TrendingUp, Heart];

const CareersPage = () => {
  const { lang } = useLanguage();
  const c = translations.careers;
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  const toggle = (i: number) => setExpandedIndex(expandedIndex === i ? null : i);

  return (
    <>
      {/* En-tete */}
      <section className="py-12 md:py-16" style={{ backgroundColor: "#F7F9FA" }}>
        <div className="container">
          <AnimatedSection className="max-w-2xl">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-foreground leading-tight">
              {t(c.pageTitle, lang)}
            </h1>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              {t(c.pageSubtitle, lang)}
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Pourquoi nous rejoindre */}
      <section className="bg-background py-14 md:py-20">
        <div className="container">
          <AnimatedSection>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center">
              {t(c.whyTitle, lang)}
            </h2>
          </AnimatedSection>

          <div className="mt-14 grid sm:grid-cols-3 gap-8">
            {c.whyItems.map((item, i) => {
              const Icon = whyIcons[i];
              return (
                <AnimatedSection key={i} delay={i * 0.1} className="text-center">
                  <Icon className="h-10 w-10 text-primary mx-auto mb-4" />
                  <h3 className="font-heading font-bold text-lg text-foreground">
                    {t(item.title, lang)}
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

      {/* Offres */}
      <section className="py-14 md:py-20" style={{ backgroundColor: "#F7F9FA" }}>
        <div className="container">
          <AnimatedSection>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center">
              {t(c.offersTitle, lang)}
            </h2>
          </AnimatedSection>

          <div className="mt-12 space-y-6">
            {c.offers.map((offer, i) => {
              const isFilled = offer.status === "filled";
              const isExpanded = expandedIndex === i;

              return (
                <AnimatedSection key={i} delay={i * 0.1}>
                  <div className={`bg-card border rounded-lg overflow-hidden transition-all duration-300 ${isFilled ? "border-border opacity-75" : "border-primary/30 hover:border-primary/50 hover:shadow-md"}`}>
                    {/* Header — always visible */}
                    <button
                      onClick={() => toggle(i)}
                      className="w-full text-left p-6 md:p-8 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-3 mb-2">
                          <span className={`inline-flex items-center text-xs font-semibold px-2.5 py-1 rounded-full ${isFilled ? "bg-muted text-muted-foreground" : "bg-primary/10 text-primary"}`}>
                            {isFilled ? t(c.filledBadge, lang) : t(c.activeBadge, lang)}
                          </span>
                        </div>
                        <h3 className="font-heading text-xl md:text-2xl font-bold text-foreground">
                          {t(offer.title, lang)}
                        </h3>
                        <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1.5">
                            <Briefcase className="h-4 w-4" />
                            {t(offer.contract, lang)}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <MapPin className="h-4 w-4" />
                            {t(offer.location, lang)}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Clock className="h-4 w-4" />
                            {t(offer.experience, lang)}
                          </span>
                        </div>
                      </div>
                      <div className="flex-shrink-0 text-muted-foreground">
                        {isExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                      </div>
                    </button>

                    {/* Expanded detail */}
                    {isExpanded && (
                      <div className="px-6 md:px-8 pb-8 border-t border-border pt-6 space-y-8">
                        <p className="text-muted-foreground leading-relaxed">
                          {t(offer.desc, lang)}
                        </p>

                        <div className="grid md:grid-cols-2 gap-8">
                          {/* Left column */}
                          <div className="space-y-6">
                            <div>
                              <h4 className="font-heading font-bold text-foreground mb-3">
                                {t(c.missions, lang)}
                              </h4>
                              <ul className="space-y-2">
                                {offer.missions[lang].map((m, j) => (
                                  <li key={j} className="flex gap-2 text-sm text-muted-foreground leading-relaxed">
                                    <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0 mt-2" />
                                    {m}
                                  </li>
                                ))}
                              </ul>
                            </div>

                            <div>
                              <h4 className="font-heading font-bold text-foreground mb-3">
                                {t(c.stack, lang)}
                              </h4>
                              <div className="flex flex-wrap gap-2">
                                {offer.techStack.map((tech) => (
                                  <span key={tech} className="text-xs font-medium px-3 py-1.5 rounded-full bg-accent border border-border text-muted-foreground">
                                    {tech}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>

                          {/* Right column */}
                          <div className="space-y-6">
                            <div>
                              <h4 className="font-heading font-bold text-foreground mb-3">
                                {t(c.profile, lang)}
                              </h4>
                              <ul className="space-y-2">
                                {offer.profileItems[lang].map((p, j) => (
                                  <li key={j} className="flex gap-2 text-sm text-muted-foreground leading-relaxed">
                                    <GraduationCap className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                                    {p}
                                  </li>
                                ))}
                              </ul>
                            </div>

                            <div>
                              <h4 className="font-heading font-bold text-foreground mb-3">
                                {t(c.benefits, lang)}
                              </h4>
                              <ul className="space-y-1.5">
                                {offer.benefitsItems[lang].map((b, j) => (
                                  <li key={j} className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                                    {b}
                                  </li>
                                ))}
                              </ul>
                            </div>

                            <div className="pt-2 space-y-2 text-sm text-muted-foreground">
                              <p><span className="font-medium text-foreground">{t(c.salary, lang)} :</span> {t(offer.salary, lang)}</p>
                              <p><span className="font-medium text-foreground">{t(c.remote, lang)} :</span> {t(offer.remote, lang)}</p>
                            </div>
                          </div>
                        </div>

                        {!isFilled && (
                          <div className="pt-2">
                            <Button asChild size="lg" className="text-base">
                              <a href={`mailto:contact@sabiustechsolutions.com?subject=${encodeURIComponent(`[CANDIDATURE] ${offer.title.fr}`)}`}>
                                {t(c.applyBtn, lang)}
                              </a>
                            </Button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA candidature spontanee */}
      <section className="py-14 md:py-20" style={{ backgroundColor: "#2B7A78" }}>
        <div className="container text-center">
          <AnimatedSection className="max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              {t(c.spontaneousTitle, lang)}
            </h2>
            <p className="mt-4 text-white/80">
              {t(c.spontaneousText, lang)}
            </p>
            <div className="mt-8">
              <Button asChild size="lg" className="bg-white text-foreground hover:bg-white/90 text-base">
                <a href={`mailto:contact@sabiustechsolutions.com?subject=${encodeURIComponent("[CANDIDATURE] Candidature spontanée")}`}>
                  <Send className="mr-2 h-4 w-4" />
                  {t(c.spontaneousBtn, lang)}
                </a>
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
};

export default CareersPage;
