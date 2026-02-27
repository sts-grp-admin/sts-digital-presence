import AnimatedSection from "@/components/shared/AnimatedSection";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, Clock, Linkedin, CheckCircle } from "lucide-react";
import { useState } from "react";
import { useLanguage, t } from "@/i18n/LanguageContext";
import { translations } from "@/i18n/translations";

const ContactPage = () => {
  const { lang } = useLanguage();
  const c = translations.contact;

  const [form, setForm] = useState({
    name: "", email: "", company: "", phone: "", subject: "", message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formEl = e.target as HTMLFormElement;
    const formData = new FormData(formEl);

    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(formData as unknown as Record<string, string>).toString(),
    })
      .then(() => setSubmitted(true))
      .catch(() => setSubmitted(true));
  };

  const inputClass =
    "w-full rounded-md border border-input bg-background px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring";

  return (
    <>
      {/* En-tête */}
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
                    {lang === "fr" ? "Message envoyé !" : "Message sent!"}
                  </h3>
                  <p className="text-green-700 text-sm leading-relaxed">
                    {lang === "fr"
                      ? "Votre message a bien été envoyé. Nous vous répondrons sous 24h."
                      : "Your message has been sent. We will reply within 24 hours."}
                  </p>
                </div>
              ) : (
              <>
              <form
                name="contact"
                method="POST"
                data-netlify="true"
                onSubmit={handleSubmit}
                className="bg-card border border-border rounded-lg p-8 space-y-6"
              >
                <input type="hidden" name="form-name" value="contact" />
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      {t(c.labelName, lang)}
                    </label>
                    <input
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
                    <label className="block text-sm font-medium text-foreground mb-2">
                      {t(c.labelEmail, lang)}
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className={inputClass}
                      placeholder={t(c.placeholderEmail, lang)}
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      {t(c.labelCompany, lang)}
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={form.company}
                      onChange={(e) => setForm({ ...form, company: e.target.value })}
                      className={inputClass}
                      placeholder={t(c.placeholderCompany, lang)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      {t(c.labelPhone, lang)} <span className="text-muted-foreground font-normal">{t(c.labelPhoneOptional, lang)}</span>
                    </label>
                    <input
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
                  <label className="block text-sm font-medium text-foreground mb-2">
                    {t(c.labelSubject, lang)}
                  </label>
                  <select
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
                  <label className="block text-sm font-medium text-foreground mb-2">
                    {t(c.labelMessage, lang)}
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className={`${inputClass} resize-none`}
                    placeholder={t(c.placeholderMessage, lang)}
                  />
                </div>

                <Button type="submit" size="lg" className="w-full sm:w-auto">
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
                        <a href="mailto:contact@sabiustechsolutions.com" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                          contact@sabiustechsolutions.com
                        </a>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center flex-shrink-0">
                        <Phone className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">{t(c.labelPhoneInfo, lang)}</p>
                        <p className="text-sm text-muted-foreground">+33 (0)1 XX XX XX XX</p>
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

                <div className="border-t border-border pt-6">
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
                  >
                    <Linkedin className="h-5 w-5" />
                    {t(c.linkedin, lang)}
                  </a>
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
