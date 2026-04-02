import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useLanguage, t } from "@/i18n/LanguageContext";
import { translations } from "@/i18n/translations";

const NotFound = () => {
  const { lang } = useLanguage();
  const nf = translations.notFound;

  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="text-center px-6">
        <p className="text-7xl font-extrabold text-primary">404</p>
        <h1 className="mt-4 text-2xl font-bold text-foreground">
          {t(nf.title, lang)}
        </h1>
        <p className="mt-2 text-muted-foreground">
          {t(nf.text, lang)}
        </p>
        <div className="mt-8">
          <Button asChild>
            <Link to="/">{t(nf.btn, lang)}</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
