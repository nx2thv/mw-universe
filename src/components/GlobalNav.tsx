import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useLanguage } from "../LanguageContext";

const translations = {
  en: {
    home: "Home",
    them: "About Them",
    ideas: "My current ideas",
    languages: "Languages",
  },
  vi: {
    home: "Trang chủ",
    them: "Về hai ảnh",
    ideas: "Ý tưởng hiện có",
    languages: "Ngôn ngữ",
  },
} as const;

const languages = [
  { code: "en" as const, label: "English" },
  { code: "vi" as const, label: "Tiếng Việt" },
];

const mobileNavItem =
  "flex items-center justify-center px-6 py-2 rounded-md text-white text-lg leading-snug w-full text-center focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 transition";

export default function GlobalNav() {
  const { language, setLanguage } = useLanguage();
  const [navOpen, setNavOpen] = useState(false);
  const [mobileLangOpen, setMobileLangOpen] = useState(false);
  const location = useLocation();
  const t = translations[language] || translations.en;

  const closeNav = () => {
    setNavOpen(false);
    setMobileLangOpen(false);
  };

  // Close menu when navigating to a new route
  useEffect(() => {
    setNavOpen(false);
    setMobileLangOpen(false);
  }, [location.pathname]);

  const hideNav = location.pathname === "/them";

  if (hideNav) {
    return null;
  }
  
  return (
    <>
      <div className="global-nav-anchor">
        {!navOpen && (
          <button
            type="button"
            aria-label="Toggle navigation"
            onClick={() => setNavOpen((open) => !open)}
            className="hamburger-button"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        )}
      </div>

      {/* Mobile overlay */}
      <div className={`mobile-overlay ${navOpen ? "open" : ""}`} onClick={closeNav}>
        <div className="mobile-overlay-backdrop"></div>
      </div>

      {/* Mobile slide-out drawer */}
      <aside className={`mobile-drawer ${navOpen ? "open" : ""}`}>
        <nav className="flex h-full flex-col items-center justify-center gap-6 px-10 text-lg">
          <Link to="/" className={`${mobileNavItem} hover:bg-white/10`} onClick={closeNav}>
            {t.home}
          </Link>
          <Link to="/them" className={`${mobileNavItem} hover:bg-white/10`} onClick={closeNav}>
            {t.them}
          </Link>
          <Link to="/ideas" className={`${mobileNavItem} hover:bg-white/10`} onClick={closeNav}>
            {t.ideas}
          </Link>
          <div className="flex w-full flex-col items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileLangOpen((open) => !open)}
              aria-haspopup="listbox"
              aria-expanded={mobileLangOpen}
              className={`mobile-lang-trigger ${mobileNavItem} cursor-pointer bg-transparent border-0 appearance-none hover:bg-white/10 gap-2`}
            >
              {t.languages}
              <span
                className={`text-[10px] leading-none translate-y-[1px] transition-transform ${mobileLangOpen ? "rotate-180" : ""
                  }`}
                aria-hidden="true"
              >
                ▾
              </span>
            </button>
            <div className={`${mobileLangOpen ? "flex" : "hidden"} flex-col gap-2 w-full items-center`}>
              {languages.map(({ code, label }) => (
                <button
                  key={code}
                  onClick={() => {
                    setLanguage(code);
                    setMobileLangOpen(false);
                    setNavOpen(false);
                  }}
                  className={`mobile-lang-option cursor-pointer text-center px-2 py-1.5 rounded-md transition bg-transparent border-0 appearance-none w-full inline-flex items-center justify-center gap-2 ${language === code ? "text-white" : "text-white/80"
                    }`}
                >
                  <span aria-hidden="true" className="text-sm opacity-70">
                    ›
                  </span>
                  {label}
                </button>
              ))}
            </div>
          </div>
        </nav>
      </aside>
    </>
  );
}
