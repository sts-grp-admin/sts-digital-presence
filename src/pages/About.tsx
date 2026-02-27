import AnimatedSection from "@/components/shared/AnimatedSection";
import AnimatedCounter from "@/components/shared/AnimatedCounter";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Award, Handshake, Settings, Zap } from "lucide-react";
import { useLanguage, t } from "@/i18n/LanguageContext";
import { translations } from "@/i18n/translations";

const valueIcons = [Award, Handshake, Settings, Zap];
const statValues = ["30+", "8+", "10+", "100%"];

const AboutPage = () => {
  const { lang } = useLanguage();
  const a = translations.about;

  return (
    <>
      {/* En-tête */}
      <section className="py-20 md:py-28" style={{ backgroundColor: "#F7F9FA" }}>
        <div className="container">
          <AnimatedSection className="max-w-2xl">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-foreground leading-tight">
              {t(a.pageTitle, lang)}
            </h1>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              {t(a.pageSubtitle, lang)}
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Qui sommes-nous */}
      <section className="bg-background py-20 md:py-28">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <AnimatedSection>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                {t(a.whoTitle, lang)}
              </h2>
              <div className="mt-6 space-y-4 text-muted-foreground leading-relaxed">
                <p>{t(a.whoP1, lang)}</p>
                <p>{t(a.whoP2, lang)}</p>
                <p>{t(a.whoP3, lang)}</p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.15}>
              <div className="relative aspect-square max-w-md mx-auto lg:ml-auto">
                <div
                  className="absolute inset-0 rounded-2xl opacity-[0.06]"
                  style={{
                    backgroundImage:
                      "linear-gradient(hsl(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)",
                    backgroundSize: "40px 40px",
                  }}
                />
                <div className="absolute top-[10%] left-[10%] w-[55%] h-[55%] rounded-full border-2 border-primary/20 bg-primary/5" />
                <div className="absolute bottom-[12%] right-[8%] w-[50%] h-[40%] rounded-xl border-2 border-primary/30 bg-accent/50" />
                <div className="absolute top-[18%] right-[18%] w-[22%] h-[22%] rounded-lg bg-primary/10 border border-primary/20" />
                <div className="absolute bottom-[35%] left-[25%] flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-primary/40" />
                  <div className="w-3 h-3 rounded-full bg-primary/25" />
                  <div className="w-3 h-3 rounded-full bg-primary/15" />
                </div>
                <div className="absolute top-[60%] left-[5%] w-[30%] h-0.5 bg-primary/20 rounded-full" />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Nos valeurs */}
      <section className="bg-card py-20 md:py-28">
        <div className="container">
          <AnimatedSection>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center">
              {t(a.valuesTitle, lang)}
            </h2>
          </AnimatedSection>

          <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {a.values.map((v, i) => {
              const Icon = valueIcons[i];
              return (
                <AnimatedSection key={i} delay={i * 0.1} className="text-center">
                  <div className="w-14 h-14 rounded-lg bg-accent flex items-center justify-center mx-auto mb-4">
                    <Icon className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="font-heading font-bold text-lg text-foreground">
                    {t(v.title, lang)}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    {t(v.text, lang)}
                  </p>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* Notre approche */}
      <section className="bg-background py-20 md:py-28">
        <div className="container">
          <AnimatedSection>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center">
              {t(a.approachTitle, lang)}
            </h2>
          </AnimatedSection>

          <div className="mt-14 grid md:grid-cols-3 gap-8 relative">
            <div className="hidden md:block absolute top-[52px] left-[16.6%] right-[16.6%] h-0.5 bg-border" />

            {a.steps.map((step, i) => (
              <AnimatedSection key={i} delay={i * 0.15} className="text-center relative">
                <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-5 text-sm font-bold relative z-10">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="font-heading font-bold text-lg text-foreground">
                  {t(step.title, lang)}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed max-w-xs mx-auto">
                  {t(step.text, lang)}
                </p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Quelques chiffres */}
      <section className="py-20 md:py-28" style={{ backgroundColor: "#F7F9FA" }}>
        <div className="container">
          <AnimatedSection>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center">
              {t(a.statsTitle, lang)}
            </h2>
          </AnimatedSection>

          <div className="mt-14 grid grid-cols-2 lg:grid-cols-4 gap-8">
            {a.stats.map((s, i) => (
              <AnimatedSection key={i} delay={i * 0.1} className="text-center">
                <AnimatedCounter
                  value={statValues[i]}
                  className="text-4xl md:text-5xl font-extrabold text-primary"
                />
                <p className="mt-2 text-sm text-muted-foreground font-medium">
                  {t(s.label, lang)}
                </p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28" style={{ backgroundColor: "#2B7A78" }}>
        <div className="container text-center">
          <AnimatedSection>
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              {t(a.ctaTitle, lang)}
            </h2>
            <p className="mt-4 text-white/80">
              {t(a.ctaSubtitle, lang)}
            </p>
            <div className="mt-8">
              <Button asChild size="lg" className="bg-white text-foreground hover:bg-white/90 text-base">
                <Link to="/contact">{t(a.ctaBtn, lang)}</Link>
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
};

export default AboutPage;
