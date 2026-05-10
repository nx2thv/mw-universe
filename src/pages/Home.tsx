import { useEffect, useMemo, useRef, useState, type CSSProperties, type KeyboardEvent } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../LanguageContext";
import TosModal from "../components/TosModal";
import UniversalTopBar from "../components/UniversalTopBar";
import { normalizeCharacter, type CharacterType, type CommissionIdea, type NsfwType, type StatusType } from "../data/commissionIdeas";
import { openBriefDocument } from "../lib/briefLinks";
import { supabase } from "../lib/supabaseClients";
import loop1 from "../../assets/loop1-carousel.jpg";
import loop2 from "../../assets/loop2-carousel.jpg";
import loop3 from "../../assets/loop3-carousel.jpg";

type SectionKey = "welcome" | "them" | "universe" | "briefs";
type DustSpec = {
  left: string;
  top: string;
  size: string;
  duration: string;
  delay: string;
  driftX: string;
  driftY: string;
};
type CommissionIdeaRow = {
  id: string;
  title: string;
  character: string | null;
  status: StatusType;
  preview: string;
  brief_path: string;
  assigned_to: string | null;
  nsfw: NsfwType | null;
};

const SECTION_ORDER: SectionKey[] = ["welcome", "them", "universe", "briefs"];
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
  const singleLineHeadings = new Set(["chân dung", "dư âm", "ý tưởng", "to my beloved"]);
  if (singleLineHeadings.has(heading.trim().toLocaleLowerCase("vi"))) {
    return [heading];
  }

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
  const mainRef = useRef<HTMLElement | null>(null);
  const [showTos, setShowTos] = useState(false);
  const [activeSection, setActiveSection] = useState<SectionKey>("welcome");
  const [isCompactViewport, setIsCompactViewport] = useState(false);
  const [chapterOpen, setChapterOpen] = useState(false);
  const [ideas, setIdeas] = useState<CommissionIdea[]>([]);
  const [ideasLoading, setIdeasLoading] = useState(true);
  const [characterFilter, setCharacterFilter] = useState<CharacterType | "all">("all");
  const [statusFilter, setStatusFilter] = useState<StatusType>("not-started");
  const [nsfwFilter, setNsfwFilter] = useState<NsfwType>("sfw");

  useEffect(() => {
    const accepted = localStorage.getItem("tosAccepted");
    if (!accepted) {
      setShowTos(true);
    }
  }, []);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 900px)");
    const sync = () => setIsCompactViewport(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    let isMounted = true;

    async function fetchIdeas() {
      const { data, error } = await supabase
        .from("commission_ideas")
        .select("id, title, character, status, preview, brief_path, assigned_to, nsfw");

      if (!isMounted) return;

      if (error) {
        console.error("Supabase fetch error:", error.message);
        setIdeas([]);
        setIdeasLoading(false);
        return;
      }

      const mapped: CommissionIdea[] = ((data || []) as CommissionIdeaRow[]).map((row) => ({
        id: row.id,
        title: row.title,
        character: normalizeCharacter(row.character),
        status: row.status,
        preview: row.preview,
        briefPath: row.brief_path,
        assignedTo: row.assigned_to ?? null,
        nsfw: row.nsfw ?? "sfw",
      }));

      setIdeas(mapped);
      setIdeasLoading(false);
    }

    fetchIdeas();

    return () => {
      isMounted = false;
    };
  }, []);

  function handleAcceptTos() {
    localStorage.setItem("tosAccepted", "true");
    setShowTos(false);
  }

  const { language } = useLanguage();

  const translations = {
    en: {
      title: "MW Universe",
      language: "Language",
      nav: {
        welcome: "WELCOME",
        them: "Visages",
        universe: "Echoes",
        briefs: "IDEAS",
      },
      sections: {
        welcome: {
          heading: "always want more time",
        },
        them: {
          heading: "Visages",
          body: "For their presence",
          marcusCta: "Enter Marcus Brief",
          williamCta: "Enter William Brief",
        },
        universe: {
          heading: "Echoes",
          prompt: "For their love",
          story: "New York",
          au: "Across Lifetimes",
          storyCta: "Main Universe",
          auCta: "Alternative Universes",
        },
        briefs: {
          heading: "Ideas",
          body: "For their creation",
          noResults: "No ideas match these filters yet.",
          openBrief: "Open full brief ->",
          loading: "Loading briefs...",
          filters: {
            character: "Character",
            status: "Status",
            content: "Content",
            all: "All",
            william: "William",
            marcus: "Marcus",
            couple: "Couple",
            notStarted: "Not started",
            inProgress: "In progress",
            sfw: "SFW",
            nsfw: "NSFW",
          },
        }
      },
    },
    vi: {
      title: "Mr. Hayes & Mr. Cartier-Hayes",
      language: "Ngôn ngữ",
      nav: {
        welcome: "Khởi điểm",
        them: "Chân Dung",
        universe: "Dư Âm",
        briefs: "Ý Tưởng",
      },
      sections: {
        welcome: {
          heading: "always want more time",
        },
        them: {
          heading: "Chân Dung",
          body: "Cho những bóng hình",
          marcusCta: "Vào Brief của Marcus",
          williamCta: "Vào Brief của William",
        },
        universe: {
          heading: "Dư Âm",
          prompt: "Cho những mối duyên",
          story: "New York",
          au: "Xuyên thời gian",
          storyCta: "Thế giới chính",
          auCta: "AU phụ",
        },
        briefs: {
          heading: "Ý Tưởng",
          body: "Cho những điều sắp được tạo nên",
          noResults: "Chưa có brief nào khớp với bộ lọc này.",
          openBrief: "Mở file mô tả ->",
          loading: "Đang tải briefs...",
          filters: {
            character: "Nhân vật",
            status: "Trạng thái",
            content: "Nội dung",
            all: "Tất cả",
            william: "William",
            marcus: "Marcus",
            couple: "Couple",
            notStarted: "Chưa bắt đầu",
            inProgress: "Đang làm",
            sfw: "SFW",
            nsfw: "NSFW",
          },
        }
      },
    },
  } as const;

  const t = translations[language] || translations.en;
  const filteredIdeas = useMemo(
    () =>
      ideas.filter((idea) => {
        if (characterFilter !== "all" && idea.character !== characterFilter) return false;
        if (idea.status !== statusFilter) return false;
        if (idea.nsfw !== nsfwFilter) return false;
        return true;
      }),
    [ideas, characterFilter, nsfwFilter, statusFilter],
  );

  const getCharacterLabel = (character?: CharacterType | null) => {
    if (character === "william") return t.sections.briefs.filters.william;
    if (character === "marcus") return t.sections.briefs.filters.marcus;
    if (character === "couple") return t.sections.briefs.filters.couple;
    return t.sections.briefs.filters.all;
  };

  const getStatusLabel = (idea: CommissionIdea) => {
    if (idea.status === "not-started") return t.sections.briefs.filters.notStarted;
    if (!idea.assignedTo) return t.sections.briefs.filters.inProgress;
    return language === "vi"
      ? `${idea.assignedTo} đang vẽ cồm nì òi`
      : `${idea.assignedTo} is working on this brief`;
  };

  const handleOpenBrief = async (briefPath: string) => {
    try {
      await openBriefDocument(briefPath);
    } catch (error) {
      console.error("Could not open brief:", error);
      window.alert("Could not open this brief right now.");
    }
  };

  const sectionLinks = [
    { key: "welcome" as const, label: t.nav.welcome },
    { key: "them" as const, label: t.nav.them },
    { key: "universe" as const, label: t.nav.universe },
    { key: "briefs" as const, label: t.nav.briefs },
  ];
  const activeSectionLabel = sectionLinks.find(({ key }) => key === activeSection)?.label ?? t.nav.welcome;

  const jumpToSection = (key: SectionKey) => {
    if (isCompactViewport && mainRef.current) {
      const section = mainRef.current.querySelector<HTMLElement>(`#${key}`);
      if (section) {
        mainRef.current.scrollTo({
          top: section.offsetTop,
          behavior: "smooth",
        });
      }
    }

    if (key === activeSection) return;
    setActiveSection(key);
  };

  const stepSection = (direction: 1 | -1) => {
    setActiveSection((current) => {
      const currentIndex = SECTION_ORDER.indexOf(current);
      const nextIndex = clamp(currentIndex + direction, 0, SECTION_ORDER.length - 1);
      return SECTION_ORDER[nextIndex];
    });
  };

  const handleSwitcherKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (!["ArrowDown", "ArrowRight", "ArrowUp", "ArrowLeft"].includes(event.key)) return;
    event.preventDefault();

    const direction = event.key === "ArrowDown" || event.key === "ArrowRight" ? 1 : -1;
    stepSection(direction as 1 | -1);
  };

  useEffect(() => {
    if (!isCompactViewport) return;
    const root = mainRef.current;
    if (!root) return;

    const sectionElements = SECTION_ORDER
      .map((key) => root.querySelector<HTMLElement>(`#${key}`))
      .filter((section): section is HTMLElement => Boolean(section));

    if (!sectionElements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (!visible) return;
        const nextKey = visible.target.id as SectionKey;
        setActiveSection((current) => (current === nextKey ? current : nextKey));
      },
      {
        root,
        threshold: [0.35, 0.55, 0.75],
      },
    );

    sectionElements.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [isCompactViewport]);

  return (
    <>
      {showTos && <TosModal onAccept={handleAcceptTos} />}
      <main ref={mainRef} className="home-journey-page">
        <div className="home-journey-ui">
          <UniversalTopBar
            embedded
            linkToHome={false}
            languageLabel={t.language}
          />
          <div className="home-journey-mobile-jump-wrap" onMouseLeave={() => setChapterOpen(false)}>
            <button
              type="button"
              className="home-journey-chapter-trigger"
              aria-haspopup="listbox"
              aria-expanded={chapterOpen}
              onClick={() => setChapterOpen((open) => !open)}
            >
              <span className="home-journey-chapter-trigger-kicker">Chapter</span>
              <span className="home-journey-chapter-trigger-current">{activeSectionLabel}</span>
              <span className="home-journey-chapter-trigger-caret" aria-hidden="true">
                {chapterOpen ? "−" : "+"}
              </span>
            </button>
            <div className={`home-journey-chapter-menu ${chapterOpen ? "open" : ""}`} role="listbox">
              {sectionLinks.map(({ key, label }, index) => (
                <button
                  key={key}
                  type="button"
                  role="option"
                  aria-selected={activeSection === key}
                  className={`home-journey-chapter-option ${activeSection === key ? "is-active" : ""}`}
                  onClick={() => {
                    jumpToSection(key);
                    setChapterOpen(false);
                  }}
                >
                  <span className="home-journey-chapter-option-index" aria-hidden="true">
                    {String(index).padStart(2, "0")}
                  </span>
                  <span>{label}</span>
                </button>
              ))}
            </div>
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
                  <span
                    key={`${line}-${index}`}
                    className={[
                      "home-journey-section-title-line",
                      line.trim().toLowerCase() === "time" ? "is-outline" : "",
                      line.trim().toLowerCase() === "more" ? "is-soft-outline" : "",
                    ].filter(Boolean).join(" ")}
                  >
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
              <h2 className="home-journey-section-title">
                {splitHeadingLines(t.sections.them.heading).map((line, index) => (
                  <span key={`${line}-${index}`} className="home-journey-section-title-line">
                    {line}
                  </span>

                ))}
              </h2>
              <p className="home-journey-copy">{t.sections.them.body}</p>
              <div className="home-journey-portal-options" role="group" aria-label="Select a portrait brief">
                <Link to="/marcus" className="home-journey-portal-option">
                  <span className="home-journey-portal-name">MARCUS</span>
                  <span className="home-journey-portal-cta">{t.sections.them.marcusCta}</span>
                </Link>
                <Link to="/william" className="home-journey-portal-option">
                  <span className="home-journey-portal-name">WILLIAM</span>
                  <span className="home-journey-portal-cta">{t.sections.them.williamCta}</span>
                </Link>
              </div>
            </div>
          </section>

          <section
            id="universe"
            className={`home-journey-section home-journey-section--universe ${activeSection === "universe" ? "is-active" : ""}`}
          >
            <div className="home-journey-text">
              <h2 className="home-journey-section-title">
                {splitHeadingLines(t.sections.universe.heading).map((line, index) => (
                  <span key={`${line}-${index}`} className="home-journey-section-title-line">
                    {line}
                  </span>
                ))}
              </h2>
              <p className="home-journey-universe-prompt">{t.sections.universe.prompt}</p>
              <div className="home-journey-universe-choices" role="group" aria-label="Select an across-lifetime path">
                <Link to="/them/story" className="home-journey-universe-choice-link">
                  <span className="home-journey-portal-name">{t.sections.universe.story}</span>
                  <span className="home-journey-portal-cta">{t.sections.universe.storyCta}</span>
                </Link>
                <Link to="/them/au" className="home-journey-universe-choice-link">
                  <span className="home-journey-portal-name">{t.sections.universe.au}</span>
                  <span className="home-journey-portal-cta">{t.sections.universe.auCta}</span>
                </Link>
              </div>
            </div>
          </section>

          <section
            id="briefs"
            className={`home-journey-section home-journey-section--briefs ${activeSection === "briefs" ? "is-active" : ""}`}
          >
            <div className="home-journey-text home-journey-text--briefs">
              <h2 className="home-journey-section-title">
                {splitHeadingLines(t.sections.briefs.heading).map((line, index) => (
                  <span key={`${line}-${index}`} className="home-journey-section-title-line">
                    {line}
                  </span>
                ))}
              </h2>
              <p className="home-journey-copy">{t.sections.briefs.body}</p>

              <div className="home-journey-ideas-board">
                <div className="home-journey-ideas-filters" role="group" aria-label="Ideas filters">
                  <label className="home-journey-ideas-filter">
                    <span>{t.sections.briefs.filters.character}</span>
                    <select
                      value={characterFilter}
                      onChange={(event) => setCharacterFilter(event.target.value as CharacterType | "all")}
                    >
                      <option value="all">{t.sections.briefs.filters.all}</option>
                      <option value="william">{t.sections.briefs.filters.william}</option>
                      <option value="marcus">{t.sections.briefs.filters.marcus}</option>
                      <option value="couple">{t.sections.briefs.filters.couple}</option>
                    </select>
                  </label>

                  <label className="home-journey-ideas-filter">
                    <span>{t.sections.briefs.filters.status}</span>
                    <select
                      value={statusFilter}
                      onChange={(event) => setStatusFilter(event.target.value as StatusType)}
                    >
                      <option value="not-started">{t.sections.briefs.filters.notStarted}</option>
                      <option value="in-progress">{t.sections.briefs.filters.inProgress}</option>
                    </select>
                  </label>

                  <label className="home-journey-ideas-filter">
                    <span>{t.sections.briefs.filters.content}</span>
                    <select
                      value={nsfwFilter}
                      onChange={(event) => setNsfwFilter(event.target.value as NsfwType)}
                    >
                      <option value="sfw">{t.sections.briefs.filters.sfw}</option>
                      <option value="nsfw">{t.sections.briefs.filters.nsfw}</option>
                    </select>
                  </label>
                </div>

                <div className="home-journey-ideas-grid">
                  {ideasLoading ? (
                    <p className="home-journey-ideas-state">{t.sections.briefs.loading}</p>
                  ) : null}

                  {!ideasLoading && !filteredIdeas.length ? (
                    <p className="home-journey-ideas-state">{t.sections.briefs.noResults}</p>
                  ) : null}

                  {!ideasLoading
                    ? filteredIdeas.map((idea) => {
                      const statusLabel = getStatusLabel(idea);
                      return (
                        <article key={idea.id} className="home-journey-idea-card">
                          <p className="home-journey-idea-id">{idea.id}</p>
                          <p className="home-journey-idea-meta">
                            {getCharacterLabel(idea.character)} • {idea.nsfw === "nsfw" ? t.sections.briefs.filters.nsfw : t.sections.briefs.filters.sfw}
                          </p>
                          <h3 className="home-journey-idea-title">{idea.title}</h3>
                          <p className="home-journey-idea-preview">{idea.preview}</p>

                          <div className="home-journey-idea-footer">
                            <span className={`home-journey-idea-status ${idea.status === "not-started" ? "is-idle" : "is-working"}`}>
                              <span className="home-journey-idea-status-dot" />
                              {statusLabel}
                            </span>
                            <button
                              type="button"
                              onClick={() => handleOpenBrief(idea.briefPath)}
                              className="home-journey-idea-link"
                            >
                              {t.sections.briefs.openBrief}
                            </button>
                          </div>
                        </article>
                      );
                    })
                    : null}
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
