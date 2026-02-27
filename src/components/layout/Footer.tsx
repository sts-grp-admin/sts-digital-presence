import { Link } from "react-router-dom";
import logo from "@/assets/sabius_logo.png";
import { useLanguage, t } from "@/i18n/LanguageContext";
import { translations } from "@/i18n/translations";

const Footer = () => {
  const { lang } = useLanguage();
  const f = translations.footer;
  const n = translations.nav;

  return (
    <footer className="bg-night text-night-foreground">
      <div className="container py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <img src={logo} alt="Sabius Tech Solutions" className="h-10 w-auto brightness-0 invert opacity-90" />
            <p className="mt-3 text-sm leading-relaxed opacity-80">{t(f.tagline, lang)}</p>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-primary-foreground mb-4">{t(f.navigation, lang)}</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="opacity-70 hover:opacity-100 transition-opacity">{t(n.home, lang)}</Link></li>
              <li><Link to="/services" className="opacity-70 hover:opacity-100 transition-opacity">{t(n.services, lang)}</Link></li>
              <li><Link to="/references" className="opacity-70 hover:opacity-100 transition-opacity">{t(n.references, lang)}</Link></li>
              <li><Link to="/a-propos" className="opacity-70 hover:opacity-100 transition-opacity">{t(n.about, lang)}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-primary-foreground mb-4">{t(f.servicesTitle, lang)}</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/services" className="opacity-70 hover:opacity-100 transition-opacity">{t(f.consultingIT, lang)}</Link></li>
              <li><Link to="/services" className="opacity-70 hover:opacity-100 transition-opacity">{t(f.development, lang)}</Link></li>
              <li><Link to="/services" className="opacity-70 hover:opacity-100 transition-opacity">{t(f.technicalExpertise, lang)}</Link></li>
              <li><Link to="/services" className="opacity-70 hover:opacity-100 transition-opacity">{t(f.support, lang)}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-primary-foreground mb-4">{t(f.contactTitle, lang)}</h4>
            <ul className="space-y-2 text-sm opacity-70">
              <li>contact@sabiustechsolutions.com</li>
              <li>+33 (0)1 XX XX XX XX</li>
              <li>Paris, France</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-night-foreground/20 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs opacity-60">
          <p>© {new Date().getFullYear()} Sabius Tech Solutions. {t(f.rights, lang)}</p>
          <Link to="/mentions-legales" className="hover:opacity-100 transition-opacity">{t(f.legalNotice, lang)}</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
