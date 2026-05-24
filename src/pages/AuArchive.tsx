import "./about-them.css";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { useLanguage } from "../LanguageContext";
import PageCredit from "../components/PageCredit";
import auBackgroundVideo from "../../assets/au1-background-small.m4v?url";

import auSelector1 from "../../assets/auSelector1.jpeg";
import auSelector2 from "../../assets/auSelector2.jpeg";

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
  settingVi?: string;
  background: string[];
  backgroundVi?: string[];
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

const AU_ENTRY_TRANSITION_NAV_DELAY_MS = 920;
const AU_ENTRY_TRANSITION_TOTAL_MS = 1880;
type AuEntryTransitionPhase = "leaving" | "arriving";

const auEntries: AuEntry[] = [
  {
    id: "au1",
    code: "AU-001",
    title: "The Quiet Husband",
    shortTitle: "Contract",
    indexImage: auSelector1,
    premise: "p/s: yêu nhau mẹ đi phiền quá",
    setting: "A quiet two-storey house in a\nsuburban neighbourhood just outside the city.",
    settingVi: "Một căn nhà hai tầng yên tĩnh ở\nkhu ngoại ô ngay bên ngoài thành phố.",
    background: [
      "Marcus officially divorced the army at 37 and bought a quiet house to retire in. Allegedly.",
      "The day he returned home, his mother threw a welcome-back party and hired a local bakery for dessert service. William worked there with Chef Remy. He was 27. Marcus got hooked immediately and kept coming back for desserts despite barely liking sweets.",
      "One night, William accidentally fell asleep with the oven still on. The bakery caught fire. Marcus arrived just in time to run inside and drag him out.",
      "The store burned to the ground. William drowned in guilt over it, insisting he would repay Chef Remy somehow. Marcus, already halfway in love and catastrophically stupid, offered a contract marriage instead.",
      "William would help around the house. Marcus would pay the debt.",
      "\"Contract,\" he said.",
      "Then he started taking William to jazz bars because the blond mentioned liking jazz once.",
      "This AU is basically one big idiot who could not speak upon his feelings, and another idiot who convinced himself that the big idiot didn't like him while Vivian was the one who suffered the most as she wrote them.",
      "Partly inspired by \"Đá đen sữa bò đậu đỏ\".",
    ],
    backgroundVi: [
      "Marcus chính thức \"chia tay\" sự nghiệp trong quân đội ở tuổi 37, dùng tiền anh tích cóp bấy lâu nay để mua một căn nhà yên tĩnh cho việc nghỉ hưu sớm. Ít nhất là anh tự nói vậy.",
      "Ngày anh về nhà, mẹ anh tổ chức tiệc mừng và thuê một tiệm bánh địa phương để phụ trách phần tráng miệng. William làm ở đó cùng bếp trưởng Remy. Lúc ấy em 27 tuổi. Marcus để ý em ngay từ lần gặp đầu mặt, rồi cứ quay lại mua bánh liên tục dù bản thân anh vốn chẳng mê đồ ngọt.",
      "Trong một lần làm việc, William lỡ ngủ quên khi lò nướng còn bật. Tiệm bánh bốc cháy. Marcus tới đúng lúc, lao vào kéo em ra ngoài.",
      "Cửa tiệm cháy rụi hoàn toàn. William ngập chìm trong cảm giác tội lỗi, một mực khăng khăng sẽ kiếm đủ tiền để trả cho bếp trưởng Remy xây tiệm mới dù ông đã nói rằng em không cần phải làm thế. Marcus, khi đó vừa yêu dở sống dở chết vừa ngốc, liền đề nghị một cuộc hôn nhân hợp đồng.",
      "William sẽ giúp việc trong nhà. Marcus sẽ trả món nợ đó.",
      "\"Hợp đồng thôi,\" anh nói.",
      "Rồi anh bắt đầu dẫn William đi nghe nhạc jazz chỉ vì có lần em thuận miệng bảo mình thích jazz.",
      "Nói ngắn gọn thì AU này về cơ bản là câu chuyện của một gã khổng lồ không biết mở miệng nói thích người ta, và một cậu tóc vàng khác cũng ngốc không kém khi tự thuyết phục bản thân rằng tên khổng lồ kia chắc chắn không thích mình. Người chịu khổ nhiều nhất thì chỉ có Vivian thôi vì phải ngồi viết hai đứa ngốc này.",
      "Mình có lấy một tí cảm hứng từ \"Đá đen sữa bò đậu đỏ\".",
    ],
    motifs: ["domestic slow burn", "suburban setting", "idiots being in love"],
    commissions: [
      { title: "Jazz Club", artist: "maxiine", image: commissionBoard1, orientation: "landscape", note: "First Official Date Night" },
    ],
  },

  {
    id: "au2",
    code: "AU-002",
    title: "Blind Shutter",
    shortTitle: "Flash",
    indexImage: auSelector2,
    premise: "No names. One date. Two cameras.",
    setting: "Downtown Manhattan, NYC",
    settingVi: "Trung tâm Manhattan, thành phố NY",
    background: [
      "Marcus, 37, walked out of a bodega with milk in one hand, cat food in the other, still sweaty from the gym, when a stranger suddenly stopped him with a disposable camera and an offer for a blind date. Marcus immediately assumed this was either a cult recruitment tactic or the beginning of a true crime documentary. It was neither. Against his better judgement, he still said yes.",
      "Across the city, William, 30, got approached with the same proposition while working at a café. He assumed the stranger was trying to flirt through some painfully creative social experiment. Mostly out of curiosity, he agreed too.",
      "William arrived five minutes late. Marcus had been there since exactly 7PM. The moment Marcus saw a furious-looking blond walking through the restaurant in a halter top, low-rise jeans, and kitten heels, he somehow just knew that was his date. No photos exchanged beforehand. No information. Just instinct. He walked up. He was right.",
      "The rest of the night unfolded too naturally for two strangers. Disposable cameras passed back and forth between dinner conversations, tequila shots, rooftop bars, mirror selfies, and increasingly dangerous levels of flirting. At some point, William declared he wanted to come back as a seal in his next life. Marcus immediately agreed to become the tusked one beside him.",
      "By the end of the night, they were sharing a greasy sandwich outside another bodega while Marcus carried William’s kitten heels in one hand and William wore Marcus’ jacket. Then somebody walked past with a boombox because New York refuses to behave normally, and William dared Marcus to catch up before the song ended.",
      "So they ran.",
      "They went home together on the late train that night. Only one disposable camera got returned the next day. There are now two names on one lease.",
    ],
    backgroundVi: [
      "AU này cũng ngắn thui, như one shot. Ngắn gọn là 2 ảnh được 1 gã set up cho một buổi blind date.",
      "Marcus 37 tuổi, William 30 tuổi. Hai người là người lạ hoàn toàn, xong được gã Tiktoker nào đó tiếp cận ở 2 thời điểm khác nhau vời offer là họ sẽ đi date cùng nhau (không dc biết danh tính trước), xong mỗi ng sẽ cầm 1 cái máy chụp một lần do gã kia đưa, rùi họ phải chụp ảnh buổi date ctct.",
      "Cả 2 cha ban đầu cũng hơi ngần ngại xong vẫn ok. Tới khúc mí ảnh đi thật thì mí ảnh thấy vui. Kiểu chemistry sparked ngay từ ban đầu, chủ yếu vì W nó giỏi khơi chuyện và thg M cũng thoải mái trả lời. Sau bữa ăn tối ở nhà hàng dc cha Tiktoker đặt bàn trước cho họ thì cả hai đi tăng 2 lun ở quán bar cuối phố. Cả đêm họ i chơi chụp ảnh cùng nhau, W nó còn say xong nó lải nhải bảo kiếp sau nó muốn làm con hải cẩu và thg M cũng đồng ý sẽ làm hải cẩu cùng nó, mà còn là rất nghiêm túc đồng ý ヽ║ ˘ _ ˘ ║ノ",
      "Kết thúc buổi date là cả hai ngồi ở lề đường hốc chiếc sandwich ở tiệm tạp hóa bên góc đường =))))) Xong vì cno trẩu and this is NYC, có cha kia say xỉn đi ngang với quả nhạc phát to đùng trên loa xong e W thách thg M đuổi kịp nó tới trạm subway (im suck at translating so pls read the english ver if this confuses u)",
      "Hôm sau thì chỉ có 1 camera được trả lại cho gã Tiktoker kia thui. Nhưng mà, thay vào đó thì cta có 2 cái tên mới toanh đứng cùng 1 hợp đồng thuê nhà 1 năm sau đó (´～｀ヾ)",
    ],
    motifs: ["fast AU", "blurry memories", "strangers to something"],
    commissions: [
      { title: "Commission pending", orientation: "landscape" },
    ],
  },

];

const translations = {
  en: {
    titleLabel: "rorrim world",
    intro:
      "\"...mirror symmetry implies that the masses and couplings of the particles in the mirror sector are exactly the same as the corresponding ones in the ordinary sector... it is an exact, unbroken symmetry of the theory.\"",
    citation: "R. Foot, 2004",
    jumpLabel: "Jump to an AU",
    backgroundLabel: "Background",
    settingLabel: "Setting",
    commissionLabel: "Commission Board",
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
    backgroundLabel: "Bối cảnh",
    settingLabel: "Không gian",
    commissionLabel: "Bảng Commission",
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
  const [sharedAuId, setSharedAuId] = useState<string | null>(getSharedAuId);
  const [gatedAuId, setGatedAuId] = useState<string | null>(getGatedAuId);
  const [selectedAuId, setSelectedAuId] = useState<string | null>(null);
  const [openAuMenuId, setOpenAuMenuId] = useState<string | null>(null);
  const [copiedAuId, setCopiedAuId] = useState<string | null>(null);
  const [entryTransitionPhase, setEntryTransitionPhase] = useState<AuEntryTransitionPhase | null>(null);
  const entryTransitionTimeoutsRef = useRef<number[]>([]);
  const t = translations[language] || translations.en;
  const activeAuEntry = sharedAuId
    ? auEntries.find((entry) => {
      const sharedValue = sharedAuId.toLowerCase();
      return entry.id.toLowerCase() === sharedValue || entry.code.toLowerCase() === sharedValue;
    })
    : selectedAuId
      ? auEntries.find((entry) => entry.id === selectedAuId)
      : null;
  const activeSetting = language === "vi" ? activeAuEntry?.settingVi ?? activeAuEntry?.setting : activeAuEntry?.setting;
  const activeBackground = language === "vi" ? activeAuEntry?.backgroundVi ?? activeAuEntry?.background : activeAuEntry?.background;
  const gatedAuEntry = gatedAuId
    ? auEntries.find((entry) => {
      const gatedValue = gatedAuId.toLowerCase();
      return entry.id.toLowerCase() === gatedValue || entry.code.toLowerCase() === gatedValue;
    })
    : null;
  const welcomeEntries = gatedAuEntry ? [gatedAuEntry] : auEntries;
  const showWelcome = !sharedAuId && !activeAuEntry;

  useEffect(() => {
    return () => {
      entryTransitionTimeoutsRef.current.forEach((timeoutId) => window.clearTimeout(timeoutId));
    };
  }, []);

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
    if (sharedAuId) {
      window.history.replaceState(null, "", "/au");
      setSharedAuId(null);
    }
    if (gatedAuId) {
      window.history.replaceState(null, "", "/au");
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
            {welcomeEntries.map((entry) => {
              const coverImage = entry.indexImage ?? entry.commissions.find((commission) => commission.image)?.image;

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

      {!showWelcome ? (
        <nav className="au-archive__index portal-fade-up portal-fade-up--choices" aria-label={t.jumpLabel}>
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
        </nav>
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
                    <div className="au-card__meta-block">
                      <div className="au-card__motifs">
                        {activeAuEntry.motifs.map((motif) => (
                          <span key={motif}>{motif}</span>
                        ))}
                      </div>
                    </div>
                    <p className="au-card__label">{t.settingLabel}</p>
                    <p className="au-card__setting">{activeSetting}</p>
                  </div>

                  <div className="au-card__meta-block">
                    <p className="au-card__label">{t.backgroundLabel}</p>
                    {activeBackground?.map((paragraph) => (
                      <p key={paragraph} className="au-card__paragraph">{paragraph}</p>
                    ))}
                  </div>
                </div>

                <div className="au-card__board-wrap">
                  <p className="au-card__label">{t.commissionLabel}</p>
                  <div
                    className={`au-photoboard ${activeAuEntry.commissions.length <= 1
                      ? "is-single"
                      : activeAuEntry.commissions.length === 2
                        ? "is-duo"
                        : "is-multi"
                      }`}
                  >
                    {activeAuEntry.commissions.map((commission, commissionIndex) => {
                      const orientation = commission.orientation ?? "portrait";
                      const artistTagDirection = commissionIndex % 2 === 0 ? "is-right" : "is-left";

                      return (
                        <figure
                          key={commission.title}
                          className={`au-polaroid au-polaroid--${orientation} ${commission.image ? "" : "is-empty"}`}
                          style={{
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
