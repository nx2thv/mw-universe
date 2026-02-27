import { Link } from "react-router-dom";
import { useLanguage } from "../LanguageContext";
import { useState } from "react";

export default function GlobalHeader() {
  const { language, setLanguage } = useLanguage();
  const [langOpen, setLangOpen] = useState(false);

  const translations = {
    en: {
      title: "Mr. Hayes & Mr. Cartier-Hayes",
      tagline: "Two husbands. Zero peace.",
      nav: { home: "Home", them: "About Them", ideas: "My current ideas", languages: "Languages" },
    },
    vi: {
      title: "Mr. Hayes & Mr. Cartier-Hayes",
      tagline: "Two husbands. Zero peace.",
      nav: { home: "Trang chủ", them: "Về hai ảnh", ideas: "Ý tưởng hiện có", languages: "Ngôn ngữ" },
    },
  } as const;

  const languages = [
    { code: "en" as const, label: "English" },
    { code: "vi" as const, label: "Tiếng Việt" },
  ];

  const t = translations[language];

  return (
    <header className="relative w-full bg-[#111827] border-b border-slate-700/60 text-slate-100 shadow-md px-6 pt-16 md:pt-12 pb-6 flex flex-col items-center text-center gap-4">
      <div className="text-center">
        <h1 className="mt-10 md:mt-0 text-2xl md:text-3xl tracking-wider drop-shadow">
          <span className="block md:inline">Mr. Hayes &&nbsp;</span>
          <span className="block md:inline md:ml-2">Mr. Cartier-Hayes</span>
        </h1>
        <h2 className="text-md md:text-lg font-medium mt-2 text-gray-200">
          {t.tagline}
        </h2>
      </div>

      <nav className="main-nav hidden md:flex text-xs sm:text-sm text-white items-center gap-2">
        <Link to="/" className="hover:text-white transition px-3 py-1">{t.nav.home}</Link>
        <Link to="/them" className="hover:text-white transition px-3 py-1">{t.nav.them}</Link>
        <Link to="/ideas" className="hover:text-white transition px-3 py-1">{t.nav.ideas}</Link>

        {/* Language dropdown */}
        <div className="relative" onMouseLeave={() => setLangOpen(false)}>
          <button
            type="button"
            onClick={() => setLangOpen((o) => !o)}
            className="language-trigger inline-flex items-center gap-1 px-3 py-1"
          >
            {t.nav.languages} ▾
          </button>

          <div className={`absolute right-0 mt-2 min-w-[140px] rounded-md border border-white/20 bg-[#1f2a3a]/95 shadow-lg 
            backdrop-blur-sm ${langOpen ? "flex" : "hidden"} flex-col z-20`}
          >
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => {
                  setLanguage(lang.code);
                  setLangOpen(false);
                }}
                className={`text-left px-3 py-2 text-xs sm:text-sm hover:bg-white/10 transition 
                ${language === lang.code ? "text-white" : "text-[#d6d6d6]"}`}
              >
                {lang.label}
              </button>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
}