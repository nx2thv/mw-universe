import { useState } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../LanguageContext";
import { runRouteTransition } from "../lib/routeTransitions";

const languages = [
  { code: "en" as const, label: "English" },
  { code: "vi" as const, label: "Tiếng Việt" },
];

const labels = {
  en: {
    language: "Language",
    title: "MW Universe",
  },
  vi: {
    language: "Ngôn ngữ",
    title: "MW Universe",
  },
} as const;

type Props = {
  embedded?: boolean;
  title?: string;
  languageLabel?: string;
  linkToHome?: boolean;
};

export default function UniversalTopBar({
  embedded = false,
  title,
  languageLabel,
  linkToHome = true,
}: Props) {
  const { language, setLanguage } = useLanguage();
  const [langOpen, setLangOpen] = useState(false);
  const t = labels[language] || labels.en;
  const resolvedTitle = title ?? t.title;
  const resolvedLanguageLabel = languageLabel ?? t.language;

  const topRow = (
    <div className="home-journey-top-row">
      <div className="home-journey-language-wrap" onMouseLeave={() => setLangOpen(false)}>
        <button
          type="button"
          className="home-journey-language-trigger"
          aria-haspopup="listbox"
          aria-expanded={langOpen}
          onClick={() => setLangOpen((open) => !open)}
        >
          {resolvedLanguageLabel}
          <span className="home-journey-language-caret" aria-hidden="true">▾</span>
        </button>
        <div className={`home-journey-language-menu ${langOpen ? "open" : ""}`} role="listbox">
          {languages.map((item) => (
            <button
              key={item.code}
              type="button"
              role="option"
              aria-selected={language === item.code}
              className={`home-journey-language-option ${language === item.code ? "is-active" : ""}`}
              onClick={() => {
                setLanguage(item.code);
                setLangOpen(false);
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {linkToHome ? (
        <Link
          to="/"
          className="home-journey-heading site-topbar-title-link"
          aria-label="Go to home"
          onClick={(event) => {
            if (event.defaultPrevented) return;
            if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

            event.preventDefault();
            runRouteTransition("/");
          }}
        >
          <h1 className="home-journey-title">{resolvedTitle}</h1>
        </Link>
      ) : (
        <header className="home-journey-heading">
          <h1 className="home-journey-title">{resolvedTitle}</h1>
        </header>
      )}
    </div>
  );

  if (embedded) return topRow;

  return (
    <header className="home-journey-ui site-topbar">
      {topRow}
    </header>
  );
}
