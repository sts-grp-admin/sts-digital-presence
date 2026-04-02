import AnimatedSection from "@/components/shared/AnimatedSection";
import { Button } from "@/components/ui/button";
import { Mail, MapPin, Clock, CheckCircle, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { useLanguage, t } from "@/i18n/LanguageContext";
import { translations } from "@/i18n/translations";
import { email, mailto } from "@/lib/email";

const WEB3FORMS_KEY = "b53fc5e4-2dd7-495f-aede-edd7b01fc6a8";

const ContactPage = () => {
  const { lang } = useLanguage();
  const c = translations.contact;
  const v = translations.validation;

  const [form, setForm] = useState({
    name: "", email: "", company: "", phone: "", subject: "", message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; message?: string }>({});
  const [canSubmit, setCanSubmit] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setCanSubmit(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  const validate = (): boolean => {
    const newErrors: { email?: string; message?: string } = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      newErrors.email = t(v.invalidEmail, lang);
    }
    if (form.message.trim().length < 10) {
      newErrors.message = t(v.messageTooShort, lang);
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const subjectLabels: Record<string, typeof c.optionProject> = {
    projet: c.optionProject,
    regie: c.optionStaff,
    conseil: c.optionConsulting,
    partenariat: c.optionPartnership,
    autre: c.optionOther,
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);

    const subjectLabel = subjectLabels[form.subject] ? t(subjectLabels[form.subject], lang) : form.subject;

    const payload = {
      access_key: WEB3FORMS_KEY,
      subject: `[WEB] ${subjectLabel || "Contact"} — ${form.name}`,
      from_name: form.name,
      name: form.name,
      email: form.email,
      company: form.company || "—",
      phone: form.phone || "—",
      message: form.message,
    };

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        setSubmitted(true);
      } else {
        setErrors({ message: lang === "fr" ? "Une erreur est survenue. Veuillez réessayer." : lang === "es" ? "Se produjo un error. Inténtelo de nuevo." : "An error occurred. Please try again." });
      }
    } catch {
      setErrors({ message: lang === "fr" ? "Erreur réseau. Veuillez réessayer." : lang === "es" ? "Error de red. Inténtelo de nuevo." : "Network error. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full rounded-md border border-input bg-background px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring";

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

      {/* Formulaire + infos */}
      <section className="bg-background py-14 md:py-20">
        <div className="container">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Formulaire */}
            <AnimatedSection className="lg:col-span-3">
              {submitted ? (
                <div className="bg-card border border-green-200 rounded-lg p-8 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto">
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">
                    {t(v.successTitle, lang)}
                  </h3>
                  <p className="text-green-700 text-sm leading-relaxed">
                    {t(v.successText, lang)}
                  </p>
                </div>
              ) : (
              <>
              <form
                onSubmit={handleSubmit}
                className="bg-card border border-border rounded-lg p-8 space-y-6"
              >
                {/* Honeypot anti-spam */}
                <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" />

                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="contact-name" className="block text-sm font-medium text-foreground mb-2">
                      {t(c.labelName, lang)}
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      name="name"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className={inputClass}
                      placeholder={t(c.placeholderName, lang)}
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-email" className="block text-sm font-medium text-foreground mb-2">
                      {t(c.labelEmail, lang)}
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      name="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className={inputClass}
                      placeholder={t(c.placeholderEmail, lang)}
                    />
                    {errors.email && (
                      <p className="mt-1 text-xs text-destructive" role="alert">{errors.email}</p>
                    )}
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="contact-company" className="block text-sm font-medium text-foreground mb-2">
                      {t(c.labelCompany, lang)}
                    </label>
                    <input
                      id="contact-company"
                      type="text"
                      name="company"
                      value={form.company}
                      onChange={(e) => setForm({ ...form, company: e.target.value })}
                      className={inputClass}
                      placeholder={t(c.placeholderCompany, lang)}
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-phone" className="block text-sm font-medium text-foreground mb-2">
                      {t(c.labelPhone, lang)} <span className="text-muted-foreground font-normal">{t(c.labelPhoneOptional, lang)}</span>
                    </label>
                    <input
                      id="contact-phone"
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className={inputClass}
                      placeholder={t(c.placeholderPhone, lang)}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-subject" className="block text-sm font-medium text-foreground mb-2">
                    {t(c.labelSubject, lang)}
                  </label>
                  <select
                    id="contact-subject"
                    name="subject"
                    required
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    className={inputClass}
                  >
                    <option value="" disabled>{t(c.placeholderSelect, lang)}</option>
                    <option value="projet">{t(c.optionProject, lang)}</option>
                    <option value="regie">{t(c.optionStaff, lang)}</option>
                    <option value="conseil">{t(c.optionConsulting, lang)}</option>
                    <option value="partenariat">{t(c.optionPartnership, lang)}</option>
                    <option value="autre">{t(c.optionOther, lang)}</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="contact-message" className="block text-sm font-medium text-foreground mb-2">
                    {t(c.labelMessage, lang)}
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className={`${inputClass} resize-none`}
                    placeholder={t(c.placeholderMessage, lang)}
                  />
                  {errors.message && (
                    <p className="mt-1 text-xs text-destructive" role="alert">{errors.message}</p>
                  )}
                </div>

                <Button type="submit" size="lg" className="w-full sm:w-auto" disabled={!canSubmit || loading}>
                  {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {t(c.submitBtn, lang)}
                </Button>
              </form>

              <p className="mt-4 text-xs text-muted-foreground">
                {t(c.privacy, lang)}
              </p>
              </>
              )}
            </AnimatedSection>

            {/* Infos de contact */}
            <AnimatedSection className="lg:col-span-2" delay={0.15}>
              <div className="rounded-lg p-8 space-y-8" style={{ backgroundColor: "#F7F9FA" }}>
                <div>
                  <h3 className="font-heading font-bold text-lg text-foreground mb-6">
                    {t(c.coordTitle, lang)}
                  </h3>
                  <div className="space-y-5">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center flex-shrink-0">
                        <Mail className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">{t(c.labelEmailInfo, lang)}</p>
                        <a href={mailto()} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                          {email()}
                        </a>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center flex-shrink-0">
                        <MapPin className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">{t(c.labelLocation, lang)}</p>
                        <p className="text-sm text-muted-foreground">Paris, France</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t border-border pt-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center flex-shrink-0">
                      <Clock className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{t(c.labelAvailability, lang)}</p>
                      <p className="text-sm text-muted-foreground">{t(c.availabilityText, lang)}</p>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactPage;
