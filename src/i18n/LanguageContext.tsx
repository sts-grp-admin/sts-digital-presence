import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Language } from "./translations";

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: "fr",
  setLang: () => {},
});

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLangState] = useState<Language>(() => {
    const saved = localStorage.getItem("lang");
    return (saved === "en" || saved === "es") ? saved : "fr";
  });

  const setLang = (l: Language) => {
    setLangState(l);
    localStorage.setItem("lang", l);
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);

/** Helper to get a translated value */
export const t = (obj: Record<Language, string>, lang: Language): string => obj[lang];
