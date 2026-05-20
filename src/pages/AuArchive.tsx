import "./about-them.css";
import { useState, type CSSProperties } from "react";
import { useLanguage } from "../LanguageContext";
import PageCredit from "../components/PageCredit";

import commissionBoard1 from "../../assets/loop3.jpeg";

type DustSpec = {
  left: string;
  top: string;
  size: string;
  duration: string;
  delay: string;
  driftX: string;
  driftY: string;
};

type CommissionSlot = {
  title: string;
  artist?: string;
  image?: string;
  note?: string;
  orientation?: "portrait" | "landscape" | "square";
};

type AuEntry = {
  id: string;
  code: string;
  title: string;
  shortTitle: string;
  indexImage?: string;
  premise: string;
  setting: string;
  background: string[];
  motifs: string[];
  commissions: CommissionSlot[];
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

const auEntries: AuEntry[] = [
  {
    id: "au1",
    code: "AU-001",
    title: "The Quiet Husband",
    shortTitle: "Contract",
    premise: "p/s: it's just them being in love with extra legal complications.",
    setting: "A quiet two-storey house in a suburban neighbourhood just outside the city.",
    background: [
      "Marcus officially divorced the army at 37 and bought a quiet house to retire in. Allegedly.",
      "The day he returned home, his mother threw a welcome-back party and hired a local bakery for dessert service. William worked there with Chef Remy. He was 27. Marcus got hooked immediately and kept coming back for desserts despite barely liking sweets.",
      "One night, William accidentally fell asleep with the oven still on. The bakery caught fire. Marcus arrived just in time to run inside and drag him out.",
      "The store burned to the ground. William drowned in guilt over it, insisting he would repay Chef Remy somehow. Marcus, already halfway in love and catastrophically stupid, offered a contract marriage instead.",
      "William would help around the house. Marcus would pay the debt.",
      "\"Contract,\" he said.",
      "Then he started taking William to jazz bars because the blond mentioned liking jazz once.",
      "This AU is basically one big idiot who could not speak upon his feelings, and another idiot who convinced himself that the big idiot didn't like him while Vivian was the one who suffered the most as she wrote them.",
    ],
    motifs: ["domestic slow burn", "suburban setting", "idiots being in love"],
    commissions: [
      { title: "The Captain & The Spare", artist: "maxiine", image: commissionBoard1, orientation: "landscape", note: "formal portrait" },
    ],
  },

  {
  id: "au2",
  code: "AU-002",
  title: "Your AU Title",
  shortTitle: "Short Name",
  premise: "One-line vibe or joke/premise.",
  setting: "Where this AU takes place.",
  background: [
    "Paragraph one.",
    "Paragraph two.",
    "Paragraph three.",
  ],
  motifs: ["motif one", "motif two", "motif three"],
  commissions: [
    {
      title: "Commission title",
      artist: "artist name",
      image: commissionBoard1,
      orientation: "landscape",
      note: "optional note",
    },
  ],
},



];

const translations = {
  en: {
    title: "AU Archive",
    intro:
      "A living archive for timelines that bend away from New York but keep the same center: Marcus, William, and the pressure each world puts on them.",
    jumpLabel: "Jump to an AU",
    backgroundLabel: "Background",
    settingLabel: "Setting",
    motifLabel: "Motifs",
    commissionLabel: "Commission Board",
    empty: "not here yet...",
    sharedView: "Showing linked AU",
    clearSharedView: "Show all AUs",
    copyLink: "Copy AU link",
    copied: "Copied",
  },
  vi: {
    title: "Vũ Trụ AU",
    intro:
      "Kho lưu trữ cho những timeline rẽ khỏi New York nhưng vẫn giữ cùng một trọng tâm: Marcus, William, và cách từng thế giới thử thách họ.",
    jumpLabel: "Đi tới AU",
    backgroundLabel: "Bối cảnh",
    settingLabel: "Không gian",
    motifLabel: "Motif",
    commissionLabel: "Bảng Commission",
    empty: "not here yet...",
    sharedView: "Đang xem AU được gửi",
    clearSharedView: "Xem tất cả AU",
    copyLink: "Sao chép link AU",
    copied: "Đã sao chép",
  },
} as const;

const getRotation = (seed: string) => {
  const value = Array.from(seed).reduce((sum, character) => sum + character.charCodeAt(0), 0);
  return ((value % 9) - 4) * 0.5;
};

function getSharedAuId() {
  if (typeof window === "undefined") return null;
  return new URLSearchParams(window.location.search).get("au");
}

export default function AuArchive() {
  const { language } = useLanguage();
  const [sharedAuId, setSharedAuId] = useState<string | null>(getSharedAuId);
  const [selectedAuId, setSelectedAuId] = useState<string | null>(null);
  const [openAuMenuId, setOpenAuMenuId] = useState<string | null>(null);
  const [copiedAuId, setCopiedAuId] = useState<string | null>(null);
  const t = translations[language] || translations.en;
  const activeAuEntry = sharedAuId
    ? auEntries.find((entry) => {
      const sharedValue = sharedAuId.toLowerCase();
      return entry.id.toLowerCase() === sharedValue || entry.code.toLowerCase() === sharedValue;
    })
    : selectedAuId
      ? auEntries.find((entry) => entry.id === selectedAuId)
      : null;
  const showWelcome = !sharedAuId && !activeAuEntry;

  const getAuShareUrl = (entry: AuEntry) => {
    const url = new URL("/au", window.location.origin);
    url.searchParams.set("au", entry.code);
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

  const openAuEntry = (entry: AuEntry) => {
    if (sharedAuId) {
      window.history.replaceState(null, "", "/au");
      setSharedAuId(null);
    }
    setSelectedAuId(entry.id);
    setOpenAuMenuId(null);
    setCopiedAuId(null);
  };

  return (
    <main className={`au-archive ${showWelcome ? "au-archive--welcome" : ""} about-portal relative min-h-screen overflow-hidden text-[#f2ede2]`}>
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
          <div className="au-archive__hero">
            <h1 id="au-archive-title" className="au-archive__title portal-fade-up">{t.title}</h1>
            <p className="au-archive__intro portal-fade-up portal-fade-up--subheading">{t.intro}</p>
          </div>

          <nav className="au-archive__index portal-fade-up portal-fade-up--choices" aria-label={t.jumpLabel}>
            {auEntries.map((entry) => {
              const coverImage = entry.indexImage ?? entry.commissions.find((commission) => commission.image)?.image;

              return (
                <button key={entry.id} type="button" className="au-archive__index-link" onClick={() => openAuEntry(entry)}>
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

      {!showWelcome ? (
        <nav className="au-archive__index portal-fade-up portal-fade-up--choices" aria-label={t.jumpLabel}>
          <div className="au-archive__index-track">
            {auEntries.map((entry) => {
              const coverImage = entry.indexImage ?? entry.commissions.find((commission) => commission.image)?.image;

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
          </div>
        </nav>
      ) : null}

      {sharedAuId ? (
        <div className="au-archive__shared-bar" role="status" aria-live="polite">
          <span>{t.sharedView}</span>
        </div>
      ) : null}

      {!showWelcome ? (
        <section className="au-archive__shelf portal-fade-up portal-fade-up--choices" aria-label={t.title}>
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
            <div className="au-card__header">
              <p className="au-card__code">{activeAuEntry.code}</p>
              <div className="au-card__heading-copy">
                <h2 className="au-card__title">{activeAuEntry.title}</h2>
                <p className="au-card__premise">{activeAuEntry.premise}</p>
              </div>
            </div>

            <div className="au-card__body">
              <div className="au-card__text">
                <div className="au-card__meta-block">
                  <p className="au-card__label">{t.settingLabel}</p>
                  <p className="au-card__setting">{activeAuEntry.setting}</p>
                </div>

                <div className="au-card__meta-block">
                  <p className="au-card__label">{t.backgroundLabel}</p>
                  {activeAuEntry.background.map((paragraph) => (
                    <p key={paragraph} className="au-card__paragraph">{paragraph}</p>
                  ))}
                </div>

                <div className="au-card__meta-block">
                  <p className="au-card__label">{t.motifLabel}</p>
                  <div className="au-card__motifs">
                    {activeAuEntry.motifs.map((motif) => (
                      <span key={motif}>{motif}</span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="au-card__board-wrap">
                <p className="au-card__label">{t.commissionLabel}</p>
                <div
                  className={`au-photoboard ${
                    activeAuEntry.commissions.length <= 1
                      ? "is-single"
                      : activeAuEntry.commissions.length === 2
                        ? "is-duo"
                        : "is-multi"
                  }`}
                >
                  {activeAuEntry.commissions.map((commission, commissionIndex) => {
                    const orientation = commission.orientation ?? "portrait";
                    const rotationSeed = `${activeAuEntry.id}-${commission.title}`;
                    const artistTagDirection = commissionIndex % 2 === 0 ? "is-right" : "is-left";

                    return (
                      <figure
                        key={commission.title}
                        className={`au-polaroid au-polaroid--${orientation} ${commission.image ? "" : "is-empty"}`}
                        style={{
                          transform: `rotate(${getRotation(rotationSeed)}deg)`,
                          ["--pin-offset" as string]: `${(commissionIndex % 5) * 5 - 10}px`,
                        } as CSSProperties}
                      >
                        <span className="au-polaroid__pin" aria-hidden="true" />
                        {commission.artist ? (
                          <span className={`about-story__artist-tag ${artistTagDirection}`}>{`(A) ${commission.artist}`}</span>
                        ) : null}
                        <div className="au-polaroid__image">
                          {commission.image ? (
                            <img src={commission.image} alt={`${activeAuEntry.title}: ${commission.title}`} loading="lazy" />
                          ) : (
                            <span>{t.empty}</span>
                          )}
                        </div>
                        <figcaption>
                          <span>{commission.title}</span>
                          {commission.note ? <small>{commission.note}</small> : !commission.artist ? <small>{t.empty}</small> : null}
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

      <div className="au-archive__credit">
        <PageCredit tone="on-dark" className="page-credit--bottom" />
      </div>
    </main>
  );
}
