import { useEffect, useState, type CSSProperties, type KeyboardEvent } from "react";
import { useLanguage } from "../LanguageContext";
import TosModal from "../components/TosModal";
import loop1 from "../../assets/loop1-carousel.jpg";
import loop2 from "../../assets/loop2-carousel.jpg";
import loop3 from "../../assets/loop3-carousel.jpg";

type SectionKey = "welcome" | "them" | "universe";
type DustSpec = {
  left: string;
  top: string;
  size: string;
  duration: string;
  delay: string;
  driftX: string;
  driftY: string;
};

const SECTION_ORDER: SectionKey[] = ["welcome", "them", "universe"];
const welcomeLoopImages = [
  { src: loop1, alt: "Portrait loop image one" },
  { src: loop2, alt: "Portrait loop image two" },
  { src: loop3, alt: "Portrait loop image three" },
];
const welcomeLoopPanels = Array.from(
  { length: 6 },
  (_, index) => welcomeLoopImages[index % welcomeLoopImages.length],
);
const dustSpecs: DustSpec[] = [
  { left: "10%", top: "16%", size: "2px", duration: "18s", delay: "-4s", driftX: "18px", driftY: "-26px" },
  { left: "22%", top: "74%", size: "3px", duration: "24s", delay: "-10s", driftX: "-14px", driftY: "-34px" },
  { left: "36%", top: "30%", size: "2px", duration: "20s", delay: "-7s", driftX: "12px", driftY: "-22px" },
  { left: "50%", top: "82%", size: "2px", duration: "28s", delay: "-14s", driftX: "-10px", driftY: "-42px" },
  { left: "64%", top: "20%", size: "3px", duration: "22s", delay: "-11s", driftX: "20px", driftY: "-18px" },
  { left: "76%", top: "62%", size: "2px", duration: "26s", delay: "-9s", driftX: "-16px", driftY: "-28px" },
  { left: "86%", top: "36%", size: "2px", duration: "19s", delay: "-6s", driftX: "10px", driftY: "-20px" },
  { left: "16%", top: "48%", size: "2px", duration: "23s", delay: "-13s", driftX: "14px", driftY: "-24px" },
  { left: "44%", top: "58%", size: "3px", duration: "25s", delay: "-8s", driftX: "-12px", driftY: "-30px" },
];

function splitHeadingLines(heading: string) {
  const words = heading.trim().split(/\s+/).filter(Boolean);
  if (words.length <= 1) return [heading];
  if (words.length === 2) return [words[0], words[1]];
  if (words.length === 3) return [words[0], words[1], words[2]];

  const first = words[0];
  const last = words[words.length - 1];
  const middle = words.slice(1, -1).join(" ");
  return [first, middle, last];
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export default function Home() {
  const [showTos, setShowTos] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<SectionKey>("welcome");

  useEffect(() => {
    const accepted = localStorage.getItem("tosAccepted");
    if (!accepted) {
      setShowTos(true);
    }
  }, []);

  function handleAcceptTos() {
    localStorage.setItem("tosAccepted", "true");
    setShowTos(false);
  }

  const { language, setLanguage } = useLanguage();

  const languages = [
    { code: "en" as const, label: "English" },
    { code: "vi" as const, label: "Tiếng Việt" },
  ];

  const translations = {
    en: {
      title: "MW Universe",
      language: "Language",
      nav: {
        welcome: "WELCOME",
        them: "THEM",
        universe: "ACROSS LIFETIME",
      },
      sections: {
        welcome: {
          heading: "always want more time",
        },
        them: {
          kicker: "II. Them",
          heading: "Portraits In Motion",
          body: "This chapter moves into a quieter, patterned canvas. No video, just a steady visual field around the story.",
        },
        universe: {
          kicker: "III. Their universe",
          heading: "The Shared Orbit",
          body: "A final room with abstract linework and texture. Use the chapter handle to switch in and out of this space.",
        },
      },
    },
    vi: {
      title: "Mr. Hayes & Mr. Cartier-Hayes",
      language: "Ngôn ngữ",
      nav: {
        welcome: "Mở đầu",
        them: "CH I",
        universe: "CH II",
      },
      sections: {
        welcome: {
          kicker: "I. Chào mừng",
          heading: "Mở Đầu Điện Ảnh",
          body: "Dùng thanh chương bên trái để chuyển phần. Khung hiện tại lùi nhẹ và khung tiếp theo phóng vào.",
        },
        them: {
          kicker: "II. Về họ",
          heading: "Chân Dung Chuyển Động",
          body: "Phần này chuyển sang nền đồng nhất có hoa văn. Không còn video, chỉ giữ không gian kể chuyện.",
        },
        universe: {
          kicker: "III. Vũ trụ của họ",
          heading: "Quỹ Đạo Chung",
          body: "Không gian cuối với họa tiết trừu tượng. Dùng thanh chương để chuyển qua lại và cảm nhận nhịp lùi/phóng.",
        },
      },
    },
  } as const;

  const t = translations[language] || translations.en;
  const sectionLinks = [
    { key: "welcome" as const, label: t.nav.welcome },
    { key: "them" as const, label: t.nav.them },
    { key: "universe" as const, label: t.nav.universe },
  ];

  const jumpToSection = (key: SectionKey) => {
    if (key === activeSection) return;
    setLangOpen(false);
    setActiveSection(key);
  };

  const handleSwitcherKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (!["ArrowDown", "ArrowRight", "ArrowUp", "ArrowLeft"].includes(event.key)) return;
    event.preventDefault();

    const direction = event.key === "ArrowDown" || event.key === "ArrowRight" ? 1 : -1;
    const currentIndex = SECTION_ORDER.indexOf(activeSection);
    const nextIndex = clamp(currentIndex + direction, 0, SECTION_ORDER.length - 1);
    jumpToSection(SECTION_ORDER[nextIndex]);
  };

  return (
    <>
      {showTos && <TosModal onAccept={handleAcceptTos} />}
      <main className="home-journey-page">
        <div className="home-journey-ui">
          <div className="home-journey-top-row">
            <div className="home-journey-language-wrap" onMouseLeave={() => setLangOpen(false)}>
              <button
                type="button"
                className="home-journey-language-trigger"
                aria-haspopup="listbox"
                aria-expanded={langOpen}
                onClick={() => setLangOpen((open) => !open)}
              >
                {t.language}
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

            <header className="home-journey-heading">
              <h1 className="home-journey-title">{t.title}</h1>
            </header>
          </div>

          <nav
            className="home-journey-left-nav"
            aria-label="Journey sections"
            onKeyDown={handleSwitcherKeyDown}
          >
            {sectionLinks.map(({ key, label }, index) => {
              const isActive = activeSection === key;
              const className = [
                "home-journey-left-link",
                isActive ? "is-active" : "",
              ].filter(Boolean).join(" ");

              return (
              <button
                key={key}
                type="button"
                className={className}
                aria-current={isActive ? "step" : undefined}
                aria-label={label}
                onClick={() => jumpToSection(key)}
              >
                <span className="home-journey-left-index" aria-hidden="true">
                  {String(index).padStart(2, "0")}
                </span>
                <span className="home-journey-left-label">{label}</span>
              </button>
              );
            })}
          </nav>
        </div>

        <div className="home-journey-stage">
        <div className="home-journey-ambient" aria-hidden="true" />
        <div className="home-journey-contours" aria-hidden="true" />
        <div className="home-journey-glow" aria-hidden="true" />
        <div className="home-journey-grain" aria-hidden="true" />
        <div className="home-journey-vignette" aria-hidden="true" />
        <div className="home-journey-dust-layer" aria-hidden="true">
          {dustSpecs.map((spec, index) => (
            <span
              key={`${spec.left}-${spec.top}-${index}`}
              className="home-journey-dust"
              style={{
                left: spec.left,
                top: spec.top,
                width: spec.size,
                height: spec.size,
                animationDuration: spec.duration,
                animationDelay: spec.delay,
                ["--dust-x" as string]: spec.driftX,
                ["--dust-y" as string]: spec.driftY,
              }}
            />
          ))}
        </div>
        <section
          id="welcome"
          className={`home-journey-section home-journey-section--welcome ${activeSection === "welcome" ? "is-active" : ""}`}
        >
          <div className="home-journey-loop" aria-hidden="true">
            <div className="home-journey-loop-slider" style={{ "--quantity": welcomeLoopPanels.length } as CSSProperties}>
              {welcomeLoopPanels.map((image, index) => (
                <div
                  key={`${image.src}-${index}`}
                  className="home-journey-loop-item"
                  style={{ "--position": index + 1 } as CSSProperties}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    decoding="async"
                    fetchPriority={index < 2 ? "high" : "low"}
                    draggable={false}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="home-journey-text">
            <h2 className="home-journey-section-title">
              {splitHeadingLines(t.sections.welcome.heading).map((line, index) => (
                <span key={`${line}-${index}`} className="home-journey-section-title-line">
                  {line}
                </span>
              ))}
            </h2>
          </div>
        </section>

        <section
          id="them"
          className={`home-journey-section home-journey-section--them ${activeSection === "them" ? "is-active" : ""}`}
        >
          <div className="home-journey-text">
            <p className="home-journey-kicker">{t.sections.them.kicker}</p>
            <h2 className="home-journey-section-title">
              {splitHeadingLines(t.sections.them.heading).map((line, index) => (
                <span key={`${line}-${index}`} className="home-journey-section-title-line">
                  {line}
                </span>
              ))}
            </h2>
            <p className="home-journey-copy">{t.sections.them.body}</p>
          </div>
        </section>

        <section
          id="universe"
          className={`home-journey-section home-journey-section--universe ${activeSection === "universe" ? "is-active" : ""}`}
        >
          <div className="home-journey-text">
            <p className="home-journey-kicker">{t.sections.universe.kicker}</p>
            <h2 className="home-journey-section-title">
              {splitHeadingLines(t.sections.universe.heading).map((line, index) => (
                <span key={`${line}-${index}`} className="home-journey-section-title-line">
                  {line}
                </span>
              ))}
            </h2>
            <p className="home-journey-copy">{t.sections.universe.body}</p>
          </div>
        </section>
        </div>
      </main>
    </>
  );
}
