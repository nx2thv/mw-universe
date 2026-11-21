import "./about-them.css";
import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { useLanguage } from "../LanguageContext";
import PageCredit from "../components/PageCredit";
import auBackgroundVideo from "../../assets/au1-background-small.m4v?url";

import { getAuEntries, localizeAuEntry, matchesAu, type AuEntry, type AuRow } from "../lib/auEntries";

type DustSpec = {
  left: string;
  top: string;
  size: string;
  duration: string;
  delay: string;
  driftX: string;
  driftY: string;
};

const dustSpecs: DustSpec[] = [
  { left: "12%", top: "18%", size: "2px", duration: "18s", delay: "-4s", driftX: "18px", driftY: "-26px" },
  { left: "24%", top: "72%", size: "3px", duration: "24s", delay: "-10s", driftX: "-14px", driftY: "-34px" },
  { left: "38%", top: "28%", size: "2px", duration: "20s", delay: "-7s", driftX: "12px", driftY: "-22px" },
  { left: "52%", top: "82%", size: "2px", duration: "28s", delay: "-14s", driftX: "-10px", driftY: "-42px" },
  { left: "66%", top: "22%", size: "3px", duration: "22s", delay: "-11s", driftX: "20px", driftY: "-18px" },
  { left: "78%", top: "64%", size: "2px", duration: "26s", delay: "-9s", driftX: "-16px", driftY: "-28px" },
  { left: "88%", top: "34%", size: "2px", duration: "19s", delay: "-6s", driftX: "10px", driftY: "-20px" },
];

const AU_ENTRY_TRANSITION_NAV_DELAY_MS = 920;
const AU_ENTRY_TRANSITION_TOTAL_MS = 1880;
type AuEntryTransitionPhase = "leaving" | "arriving";

const translations = {
  en: {
    titleLabel: "rorrim world",
    intro:
      "\"...mirror symmetry implies that the masses and couplings of the particles in the mirror sector are exactly the same as the corresponding ones in the ordinary sector... it is an exact, unbroken symmetry of the theory.\"",
    citation: "R. Foot, 2004",
    jumpLabel: "Jump to an AU",
    loading: "Loading universes…",
    loadError: "Could not load the AU archive.",
    retry: "Try again",
    noAus: "No AUs have been published yet.",
    unavailable: "This AU is unavailable or has not been published.",
    empty: "not here yet...",
    sharedView: "Showing linked AU",
    clearSharedView: "Show all AUs",
    gatePrompt: "Would you like to see\nthem in another universe?",
    copyLink: "Copy AU link",
    copied: "Copied",
  },
  vi: {
    titleLabel: "rorrim world",
    intro:
      "\"...lý thuyết đối xứng gương cho rằng mọi hạt tồn tại trong thế giới phản chiếu đều mang cùng một khối lượng và bản chất như phiên bản của chúng ở thế giới thông thường... một sự đối xứng hoàn hảo không thể phá vỡ.\"",
    citation: "R. Foot, 2004",
    jumpLabel: "Đi tới AU",
    loading: "Đang tải các vũ trụ…",
    loadError: "Không thể tải kho AU.",
    retry: "Thử lại",
    noAus: "Chưa có AU nào được xuất bản.",
    unavailable: "AU này không khả dụng hoặc chưa được xuất bản.",
    empty: "not here yet...",
    sharedView: "Đang xem AU được gửi",
    clearSharedView: "Xem tất cả AU",
    gatePrompt: "Xem họ ở vũ\ntrụ khác nhé?",
    copyLink: "Sao chép link AU",
    copied: "Đã sao chép",
  },
} as const;

function getSharedAuId() {
  if (typeof window === "undefined") return null;
  return new URLSearchParams(window.location.search).get("au");
}

function getGatedAuId() {
  if (typeof window === "undefined") return null;
  return new URLSearchParams(window.location.search).get("gate");
}

export default function AuArchive() {
  const { language } = useLanguage();
  const [auRows, setAuRows] = useState<AuRow[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [loadAttempt, setLoadAttempt] = useState(0);
  const auEntries = useMemo(() => auRows.map((row) => localizeAuEntry(row, language)), [auRows, language]);
  const archiveRef = useRef<HTMLElement | null>(null);
  const [sharedAuId, setSharedAuId] = useState<string | null>(getSharedAuId);
  const [gatedAuId, setGatedAuId] = useState<string | null>(getGatedAuId);
  const [selectedAuId, setSelectedAuId] = useState<string | null>(null);
  const [openAuMenuId, setOpenAuMenuId] = useState<string | null>(null);
  const [copiedAuId, setCopiedAuId] = useState<string | null>(null);
  const [entryTransitionPhase, setEntryTransitionPhase] = useState<AuEntryTransitionPhase | null>(null);
  const entryTransitionTimeoutsRef = useRef<number[]>([]);
  const t = translations[language] || translations.en;
  const activeAuEntry = sharedAuId
    ? auEntries.find((entry) => matchesAu(entry, sharedAuId))
    : selectedAuId
      ? auEntries.find((entry) => entry.id === selectedAuId)
      : null;
  const gatedAuEntry = gatedAuId
    ? auEntries.find((entry) => matchesAu(entry, gatedAuId))
    : null;
  const welcomeEntries = gatedAuEntry ? [gatedAuEntry] : auEntries;
  const showWelcome = !activeAuEntry;
  const requestedAuMissing = Boolean(
    (sharedAuId && !activeAuEntry) || (gatedAuId && !gatedAuEntry)
  );

  useEffect(() => {
    let cancelled = false;
    async function loadArchive() {
      setIsLoading(true);
      setLoadError(false);
      try {
        const rows = await getAuEntries();
        if (!cancelled) setAuRows(rows);
      } catch (error) {
        console.error("Could not load AU archive:", error);
        if (!cancelled) setLoadError(true);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }
    void loadArchive();
    return () => { cancelled = true; };
  }, [loadAttempt]);

  useEffect(() => {
    return () => {
      entryTransitionTimeoutsRef.current.forEach((timeoutId) => window.clearTimeout(timeoutId));
    };
  }, []);

  useEffect(() => {
    if (activeAuEntry) window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [activeAuEntry?.id]);

  const getAuShareUrl = (entry: AuEntry) => {
    const url = new URL("/au", window.location.origin);
    url.searchParams.set("gate", entry.code);
    return url.toString();
  };

  const copyAuShareUrl = async (entry: AuEntry) => {
    const shareUrl = getAuShareUrl(entry);
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopiedAuId(entry.id);
      setOpenAuMenuId(null);
      window.setTimeout(() => setCopiedAuId((current) => (current === entry.id ? null : current)), 1800);
    } catch (error) {
      console.error("Could not copy AU link:", error);
      window.prompt("Copy this AU link:", shareUrl);
    }
  };

  const applyOpenAuEntry = (entry: AuEntry) => {
    if (sharedAuId || gatedAuId) {
      const url = new URL(window.location.href);
      url.searchParams.delete("au");
      url.searchParams.delete("gate");
      window.history.replaceState(window.history.state, "", url);
      setSharedAuId(null);
      setGatedAuId(null);
    }
    setSelectedAuId(entry.id);
    setOpenAuMenuId(null);
    setCopiedAuId(null);
  };

  const openAuEntry = (entry: AuEntry) => {
    if (activeAuEntry?.id === entry.id || entryTransitionPhase) return;

    if (!showWelcome) {
      applyOpenAuEntry(entry);
      return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      applyOpenAuEntry(entry);
      return;
    }

    entryTransitionTimeoutsRef.current.forEach((timeoutId) => window.clearTimeout(timeoutId));
    setEntryTransitionPhase("leaving");

    entryTransitionTimeoutsRef.current = [
      window.setTimeout(() => {
        applyOpenAuEntry(entry);
        setEntryTransitionPhase("arriving");
      }, AU_ENTRY_TRANSITION_NAV_DELAY_MS),
      window.setTimeout(() => {
        setEntryTransitionPhase(null);
      }, AU_ENTRY_TRANSITION_TOTAL_MS),
    ];
  };

  return (
    <main ref={archiveRef} className={`au-archive ${showWelcome ? "au-archive--welcome" : "au-archive--entry"} about-portal relative min-h-screen overflow-hidden text-[#f2ede2]`}>
      <div className="about-portal__vignette pointer-events-none fixed inset-0" aria-hidden="true" />
      <div className="about-portal__grain pointer-events-none fixed inset-0" aria-hidden="true" />

      <div className="pointer-events-none fixed inset-0" aria-hidden="true">
        {dustSpecs.map((spec, index) => (
          <span
            key={`${spec.left}-${spec.top}-${index}`}
            className="about-portal__dust"
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

      {showWelcome ? (
        <section className="au-archive__welcome" aria-labelledby="au-archive-title">
          <video
            className="au-archive__background-video"
            src={auBackgroundVideo}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            disablePictureInPicture
            data-credit="Background video by Colin Jones"
            aria-hidden="true"
          />
          <div className="au-archive__hero">
            <h1 id="au-archive-title" className="au-archive__title portal-fade-up" aria-label={t.titleLabel}>
              <span className="au-archive__title-reflection-word">rorri<span className="au-archive__title-accent">m</span></span>
              <span className="au-archive__title-world"><span className="au-archive__title-accent">w</span>orld</span>
            </h1>
            <div className="au-archive__intro-wrap portal-fade-up portal-fade-up--subheading">
              <p className="au-archive__intro">{t.intro}</p>
              <p className="au-archive__citation">{t.citation}</p>
            </div>
          </div>

          <nav className={`au-archive__index portal-fade-up portal-fade-up--choices ${gatedAuEntry ? "is-gated" : ""}`} aria-label={t.jumpLabel}>
            {gatedAuEntry ? <p className="au-archive__gate-prompt">{t.gatePrompt}</p> : null}
            {(isLoading || loadError || requestedAuMissing || auEntries.length === 0) && (
              <div className="au-archive__load-state" role={loadError ? "alert" : "status"}>
                <span>
                  {isLoading ? t.loading : loadError ? t.loadError : requestedAuMissing ? t.unavailable : t.noAus}
                </span>
                {loadError && (
                  <button type="button" onClick={() => setLoadAttempt((attempt) => attempt + 1)}>
                    {t.retry}
                  </button>
                )}
              </div>
            )}
            {(!requestedAuMissing || isLoading) && welcomeEntries.map((entry) => {
              const coverImage = entry.indexImage;

              return (
                <button key={entry.id} type="button" className={`au-archive__index-link ${gatedAuEntry?.id === entry.id ? "is-active" : ""}`} onClick={() => openAuEntry(entry)}>
                  <span className="au-archive__index-thumb" aria-hidden="true">
                    {coverImage ? <img src={coverImage} alt="" loading="lazy" /> : <span>{entry.code}</span>}
                  </span>
                  <span className="au-archive__index-name">{entry.shortTitle}</span>
                </button>
              );
            })}
          </nav>
        </section>
      ) : null}



      {sharedAuId ? (
        <div className="au-archive__shared-bar" role="status" aria-live="polite">
          <span>{t.sharedView}</span>
        </div>
      ) : null}

      {!showWelcome ? (
        <section className="au-archive__shelf portal-fade-up portal-fade-up--choices" aria-label={t.titleLabel}>
          {activeAuEntry ? (
            <article key={activeAuEntry.id} id={activeAuEntry.id} className="au-card au-card--stagger">
              <div className="au-card__actions">
                <button
                  type="button"
                  className="au-card__action-trigger"
                  aria-label={`Open actions for ${activeAuEntry.title}`}
                  aria-expanded={openAuMenuId === activeAuEntry.id}
                  onClick={() => setOpenAuMenuId((current) => (current === activeAuEntry.id ? null : activeAuEntry.id))}
                >
                  ⋮
                </button>
                {openAuMenuId === activeAuEntry.id ? (
                  <div className="au-card__action-menu">
                    <button type="button" onClick={() => copyAuShareUrl(activeAuEntry)}>
                      {t.copyLink}
                    </button>
                  </div>
                ) : null}
              </div>
              <header className="au-entry-hero">
                <p className="au-entry-hero__code">{activeAuEntry.code}</p>
                <h1 className="au-entry-hero__title">{activeAuEntry.title}</h1>
                {activeAuEntry.premise && (
                  <p className="au-entry-hero__subtitle">{activeAuEntry.premise}</p>
                )}
                {activeAuEntry.motifs.length > 0 && (
                  <ul className="au-entry-hero__tags" aria-label={language === "vi" ? "Chủ đề" : "Themes"}>
                    {activeAuEntry.motifs.map((motif, index) => (
                      <li key={index}>{motif}</li>
                    ))}
                  </ul>
                )}
              </header>

              <div className="au-card__body">
                <div className="au-card__text">
                  {activeAuEntry.contextSections.map((section) => (
                    <div key={section.id} className="au-card__meta-block">
                      <p className="au-card__label">{section.label}</p>
                      {section.paragraphs.map((paragraph, index) => (
                        <p key={index} className="au-card__paragraph">{paragraph}</p>
                      ))}
                    </div>
                  ))}
                </div>

                <div className="au-card__board-wrap">
                  <div
                    className={`au-photoboard ${activeAuEntry.commissions.length <= 1
                      ? "is-single"
                      : activeAuEntry.commissions.length === 2
                        ? "is-duo"
                        : "is-multi"
                      }`}
                  >
                    {activeAuEntry.commissions.length === 0 && <p className="au-card__paragraph">{t.empty}</p>}
                    {activeAuEntry.commissions.map((commission, commissionIndex) => {
                      const artistTagDirection = commissionIndex % 2 === 0 ? "is-right" : "is-left";

                      return (
                        <figure
                          key={commission.id}
                          className="au-polaroid au-polaroid--auto"
                          style={{
                            ["--pin-offset" as string]: `${(commissionIndex % 5) * 5 - 10}px`,
                          } as CSSProperties}
                        >
                          <span className="au-polaroid__pin" aria-hidden="true" />
                          {commission.artist ? (
                            <span className={`about-story__artist-tag ${artistTagDirection}`}>{`(A) ${commission.artist}`}</span>
                          ) : null}
                          <div className="au-polaroid__image">
                            <img src={commission.image} alt={commission.alt} loading="lazy" />
                          </div>
                          <figcaption>
                            <span>{commission.title}</span>
                            {commission.note && <small>{commission.note}</small>}
                          </figcaption>
                        </figure>
                      );
                    })}
                  </div>
                </div>
              </div>
              {copiedAuId === activeAuEntry.id ? (
                <p className="au-card__copy-state">{t.copied}</p>
              ) : null}
            </article>
          ) : null}
        </section>
      ) : null}

      {!showWelcome ? (
        <nav className="au-archive__index portal-fade-up portal-fade-up--choices" aria-label={t.jumpLabel}>
          {auEntries.map((entry) => {
            const coverImage = entry.indexImage;

            return (
              <button
                key={entry.id}
                type="button"
                className={`au-archive__index-link ${activeAuEntry?.id === entry.id ? "is-active" : ""}`}
                onClick={() => openAuEntry(entry)}
              >
                <span className="au-archive__index-thumb" aria-hidden="true">
                  {coverImage ? <img src={coverImage} alt="" loading="lazy" /> : <span>{entry.code}</span>}
                </span>
                <span className="au-archive__index-name">{entry.shortTitle}</span>
              </button>
            );
          })}
        </nav>
      ) : null}

      <div className="au-archive__credit">
        <PageCredit tone="on-dark" className="page-credit--bottom" />
      </div>

      {entryTransitionPhase ? (
        <div
          className={`route-transition-overlay route-transition-overlay--archive is-${entryTransitionPhase}`}
          aria-hidden="true"
          onAnimationEnd={(event) => {
            if (event.currentTarget !== event.target) return;
            if (entryTransitionPhase !== "arriving") return;
            setEntryTransitionPhase(null);
          }}
        >
          <div className="route-transition-overlay__texture" />
          <div className="route-transition-overlay__frame" />
        </div>
      ) : null}
    </main>
  );
}
