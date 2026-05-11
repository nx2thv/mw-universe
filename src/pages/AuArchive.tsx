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

const auEntries = [
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
] satisfies AuEntry[];

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
  const [openAuMenuId, setOpenAuMenuId] = useState<string | null>(null);
  const [copiedAuId, setCopiedAuId] = useState<string | null>(null);
  const t = translations[language] || translations.en;
  const visibleAuEntries = sharedAuId
    ? auEntries.filter((entry) => {
      const sharedValue = sharedAuId.toLowerCase();
      return entry.id.toLowerCase() === sharedValue || entry.code.toLowerCase() === sharedValue;
    })
    : auEntries;

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

  const clearSharedAu = () => {
    window.history.replaceState(null, "", "/au");
    setSharedAuId(null);
  };

  return (
    <main className="au-archive about-portal relative min-h-screen overflow-hidden text-[#f2ede2]">
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

      <section className="au-archive__hero">
        <h1 className="au-archive__title portal-fade-up">{t.title}</h1>
        <p className="au-archive__intro portal-fade-up portal-fade-up--subheading">{t.intro}</p>
      </section>

      <section className="au-archive__shelf" aria-label={t.title}>
        {sharedAuId ? (
          <div className="au-archive__shared-bar portal-fade-up portal-fade-up--choices">
            <span>{t.sharedView}</span>
            <button type="button" onClick={clearSharedAu}>
              {t.clearSharedView}
            </button>
          </div>
        ) : null}

        {visibleAuEntries.map((entry, entryIndex) => (
          <article key={entry.id} id={entry.id} className="au-card">
            <div className="au-card__actions">
              <button
                type="button"
                className="au-card__action-trigger"
                aria-label={`Open actions for ${entry.title}`}
                aria-expanded={openAuMenuId === entry.id}
                onClick={() => setOpenAuMenuId((current) => (current === entry.id ? null : entry.id))}
              >
                ⋮
              </button>
              {openAuMenuId === entry.id ? (
                <div className="au-card__action-menu">
                  <button type="button" onClick={() => copyAuShareUrl(entry)}>
                    {t.copyLink}
                  </button>
                </div>
              ) : null}
            </div>
            <div className="au-card__header">
              <p className="au-card__code">{entry.code}</p>
              <div>
                <h2 className="au-card__title">{entry.title}</h2>
                <p className="au-card__premise">{entry.premise}</p>
              </div>
            </div>

            <div className="au-card__body">
              <div className="au-card__text">
                <div className="au-card__meta-block">
                  <p className="au-card__label">{t.settingLabel}</p>
                  <p className="au-card__setting">{entry.setting}</p>
                </div>

                <div className="au-card__meta-block">
                  <p className="au-card__label">{t.backgroundLabel}</p>
                  {entry.background.map((paragraph) => (
                    <p key={paragraph} className="au-card__paragraph">{paragraph}</p>
                  ))}
                </div>

                <div className="au-card__meta-block">
                  <p className="au-card__label">{t.motifLabel}</p>
                  <div className="au-card__motifs">
                    {entry.motifs.map((motif) => (
                      <span key={motif}>{motif}</span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="au-card__board-wrap">
                <p className="au-card__label">{t.commissionLabel}</p>
                <div
                  className={`au-photoboard ${
                    entry.commissions.length <= 1
                      ? "is-single"
                      : entry.commissions.length === 2
                        ? "is-duo"
                        : "is-multi"
                  }`}
                >
                  {entry.commissions.map((commission, commissionIndex) => {
                    const orientation = commission.orientation ?? "portrait";
                    const rotationSeed = `${entry.id}-${commission.title}`;
                    const artistTagDirection = (entryIndex + commissionIndex) % 2 === 0 ? "is-right" : "is-left";

                    return (
                      <figure
                        key={commission.title}
                        className={`au-polaroid au-polaroid--${orientation} ${commission.image ? "" : "is-empty"}`}
                        style={{
                          transform: `rotate(${getRotation(rotationSeed)}deg)`,
                          ["--pin-offset" as string]: `${((entryIndex + commissionIndex) % 5) * 5 - 10}px`,
                        } as CSSProperties}
                      >
                        <span className="au-polaroid__pin" aria-hidden="true" />
                        {commission.artist ? (
                          <span className={`about-story__artist-tag ${artistTagDirection}`}>{`(A) ${commission.artist}`}</span>
                        ) : null}
                        <div className="au-polaroid__image">
                          {commission.image ? (
                            <img src={commission.image} alt={`${entry.title}: ${commission.title}`} loading="lazy" />
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
            {copiedAuId === entry.id ? (
              <p className="au-card__copy-state">{t.copied}</p>
            ) : null}
          </article>
        ))}
      </section>

      <div className="relative z-10 px-6 pb-6 sm:pb-8">
        <PageCredit tone="on-dark" className="page-credit--bottom" />
      </div>
    </main>
  );
}
