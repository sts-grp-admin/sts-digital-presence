import { useLanguage, t } from "@/i18n/LanguageContext";
import { translations } from "@/i18n/translations";

const LegalNotice = () => {
  const { lang } = useLanguage();
  const l = translations.legal;

  return (
    <section className="py-16 md:py-24">
      <div className="container max-w-3xl">
        <h1 className="font-heading text-3xl md:text-4xl font-bold mb-12">{t(l.title, lang)}</h1>

        <div className="space-y-10 text-foreground/90 leading-relaxed">
          <div>
            <h2 className="font-heading text-xl font-semibold mb-3">{t(l.editorTitle, lang)}</h2>
            <div className="space-y-1 text-sm">
              <p className="font-semibold">Sabius Tech Solutions (STS)</p>
              <p>{t(l.editorType, lang)}</p>
              <p>{t(l.editorAddress, lang)}</p>
              <p>SIREN : 918 031 675</p>
              <p>SIRET : 918 031 675 00021</p>
              <p>RCS Paris</p>
              <p>{t(l.editorAPE, lang)}</p>
              <p>{t(l.editorTVA, lang)}</p>
              
              <p>Email : contact@sabiustechsolutions.com</p>
            </div>
          </div>

          <div>
            <h2 className="font-heading text-xl font-semibold mb-3">{t(l.hostingTitle, lang)}</h2>
            <p className="text-sm">{t(l.hostingText, lang)}</p>
          </div>

          <div>
            <h2 className="font-heading text-xl font-semibold mb-3">{t(l.ipTitle, lang)}</h2>
            <p className="text-sm">{t(l.ipText, lang)}</p>
          </div>

          <div>
            <h2 className="font-heading text-xl font-semibold mb-3">{t(l.dataTitle, lang)}</h2>
            <p className="text-sm">{t(l.dataText, lang)}</p>
          </div>

          <div>
            <h2 className="font-heading text-xl font-semibold mb-3">{t(l.cookiesTitle, lang)}</h2>
            <p className="text-sm">{t(l.cookiesText, lang)}</p>
          </div>

          <div>
            <h2 className="font-heading text-xl font-semibold mb-3">{t(l.liabilityTitle, lang)}</h2>
            <p className="text-sm">{t(l.liabilityText, lang)}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LegalNotice;
