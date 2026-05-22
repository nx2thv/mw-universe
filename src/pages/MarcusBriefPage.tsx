import { useEffect, useState, useRef } from "react";
import marcusBriefPage from "../../assets/marcus-pattern.jpeg";
import FloatingSoundtrackBar from "../components/FloatingSoundtrackBar";
import HeroScrollPage from "../components/HeroScrollPage";
import GalleryLightbox, {
  type GalleryLightboxImage,
} from "../components/GalleryLightbox";
import PageCredit from "../components/PageCredit";
import { useLanguage } from "../LanguageContext";

import marcusBeard from "../../assets/marcusBeard.jpeg";
import marcusThighs from "../../assets/marcusThighs.jpeg";
import marcusDogTags from "../../assets/marcusDogTags.jpeg";
import marcusEyesAndBrows from "../../assets/marcusEyesAndBrows.jpeg";
import marcusHair1 from "../../assets/marcusHair1.jpeg";
import marcusHair2 from "../../assets/marcusHair2.jpeg";
import marcusNose from "../../assets/marcusNose.jpeg";
import marcusLipScar from "../../assets/marcusLipScar.jpeg";
import marcusBrowScar from "../../assets/marcusBrowScar.jpeg";
import marcusJawScar from "../../assets/marcusJawScar.jpeg";
import marcusHands from "../../assets/marcusHands.jpeg";
import marcusBiceps1 from "../../assets/marcusBiceps.jpeg";
import marcusBiceps2 from "../../assets/marcusBiceps2.jpeg";
import marcusBack from "../../assets/marcusBack.jpeg";
import marcusBody from "../../assets/marcusBody.jpeg";
import marcusGallery1 from "../../assets/marcusGallery1.jpeg";
import marcusGallery2 from "../../assets/marcusGallery2.jpeg";
import marcusGallery3 from "../../assets/marcusGallery3.jpeg";
import marcusColourPalette from "../../assets/marcusColourPalette.jpeg";
import marcusWeddingRing from "../../assets/marcusWeddingRing.jpeg";
import marcusTattoo from "../../assets/marcusTattoo.jpeg";
import marcusID from "../../assets/MarcusHayes.jpeg";
import marcusTattoo2 from "../../assets/marcusTattoo2.jpeg";
import marcusTattoo3 from "../../assets/marcusTattoo3.jpeg";
import marcusAesthetic from "../../assets/marcusAesthetic.jpeg";

type SectionBullet = string | { title: string; detail: string[] };
type Section = {
  id: string;
  kicker: string;
  body?: string;
  bullets: SectionBullet[];
};

const marcusPlaylistEmbedUrl =
  "https://open.spotify.com/embed/playlist/2XfYN0FRWwECxSKLk333qZ?utm_source=generator&theme=0";

export default function MarcusBriefPage() {
  const { language } = useLanguage();
  const [visibleSections, setVisibleSections] = useState<Record<number, boolean>>({});
  const [activeAnchor, setActiveAnchor] = useState("basic-info");
  const [chapterOpen, setChapterOpen] = useState(false);
  const [isBasicInfoMediaVisible, setIsBasicInfoMediaVisible] = useState(false);
  const [selectedGalleryImage, setSelectedGalleryImage] =
    useState<GalleryLightboxImage | null>(null);

  // STRIP REFS FOR HORIZONTAL SCROLL
  const faceStripRef = useRef<HTMLDivElement | null>(null);
  const hairStripRef = useRef<HTMLDivElement | null>(null);
  const bodyStripRef = useRef<HTMLDivElement | null>(null);
  const tattooStripRef = useRef<HTMLDivElement | null>(null);
  const galleryStripRef = useRef<HTMLDivElement | null>(null);

  const scrollStrip = (
    container: HTMLDivElement | null,
    direction: "left" | "right"
  ) => {
    if (!container) return;

    const card = container.querySelector<HTMLElement>("figure");
    const cardWidth = card?.offsetWidth ?? 260;
    const scrollAmount = cardWidth + 24;

    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible) {
          const nextAnchor = (visible.target as HTMLElement).id;
          if (nextAnchor) {
            setActiveAnchor(nextAnchor);
          }
        }

        entries.forEach((entry) => {
          const indexAttr = entry.target.getAttribute("data-section-index");
          const index = indexAttr ? Number(indexAttr) : NaN;
          if (!Number.isFinite(index)) return;
          if (entry.isIntersecting) {
            setVisibleSections((prev) =>
              prev[index] ? prev : { ...prev, [index]: true }
            );
          }
        });
      },
      { threshold: 0.08, rootMargin: "-8% 0px -8% 0px" }
    );

    const sectionEls = document.querySelectorAll("[data-section-index]");
    sectionEls.forEach((el) => observer.observe(el));

    const galleryObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setActiveAnchor("gallery");
        }
      },
      { threshold: 0.28, rootMargin: "-8% 0px -55% 0px" },
    );
    const galleryEl = document.getElementById("gallery");
    if (galleryEl) galleryObserver.observe(galleryEl);

    const mediaObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsBasicInfoMediaVisible(true);
          mediaObserver.disconnect();
        }
      },
      { threshold: 0.06, rootMargin: "0px 0px -8% 0px" }
    );

    const basicInfoMedia = document.querySelector("[data-marcus-basic-info-media]");
    if (basicInfoMedia) {
      mediaObserver.observe(basicInfoMedia);
    }

    return () => {
      observer.disconnect();
      mediaObserver.disconnect();
      galleryObserver.disconnect();
    };
  }, []);

  const translations: Record<
    "en" | "vi",
    {
      quote: string;
      quoteName: string;
      intro?: string;
      sections: Section[];
    }
  > = {
    en: {
      quoteName: "MSG. Marcus Hayes",
      quote: "\"Discipline is habit. Not heroism.\"",
      sections: [
        {
          id: "basic info",
          kicker: "A. Snapshot",
          bullets: [
            "Male.",
            "14/1 (Capricorn)",
            "Height:\n6'3\"/190cm",
            "Weight:\n210 pounds/90-95kg.",
            "Skintone:\n#B98267.\nDeep sun-warmed tan from outdoor labour.",
            "Occupation:\nFormer NYPD cop (ESU Captain).\nNow an elite operator in U.S. military.",
            "Vibe:\nStoic, deliberate, masculine in the most unpretentious way.\n" +
            "The kind of man whose presence alone tells you nothing will touch you.",
            "Bonus quirk:\n Always has to read a physics book before sleep.\n",
          ],
        },
        {
          id: "face",
          kicker: "B. Face Structure",
          bullets: [
            "Brows & eyes:\n" +
            "Thick brows with slightly messy tails. Usually caught drawn together intensely.\n" +
            "Heavy-lidded eyes. Always carrying a squint like he's asking 'are you sure you wanna do that?'",
            "Eye colour:\n" +
            "#5b6b74\n" +
            "Muted, deep blue-grey ish. Not bright or vibrant.",
            "Nose & jaw\n" +
            "Straight nose with a stuble bump from an old fight.\n" +
            "Jawline is angular, strong, and slightly wide. Masculinity at its peak.",
            "Scars:\n" +
            "One at the tail of his right brow.\n" +
            "One at the corner of his right upper lip.\n" +
            "One faint line curved upwards from his left jawline.",
          ],
        },
        {
          id: "hair and stuffs",
          kicker: "C. Hair, beard, accessories",
          bullets: [
            "Hair:\n" +
            "Pitch black.\n Taper fade on the sides with a tousled, pushed-back top.",
            "Beard:\nItalian beard style (As shown in the reference).",
            "Accessories:\n One gold wedding ring on his left hand,\n two dogtags on his neck (Engraved his name 'Marcus Hayes' — Helvetica font).",
          ],
        },
        {
          id: "dilf coded",
          kicker: "D. Body silhouette & overall vibe",
          bullets: [
            "Hands:\n Huge. Rough. Calloused. Veiny enough to qualify as a road map.",
            "Biceps:\n Literally massive.Stretches a T-shirt so badly it counts as property damage.",
            "Back:\nWide enough to block the sun. Scarred like he's lived six lifetimes of warfare and still crawls back for more.",
            "Overall vibe:\nDraw him like a functional fortress.\nNot a model, not a bodybuilder — a soldier.\nHis physique should reflect heat, grit, sweat, exhaustion and discipline.\nHis body and posture should tell the story of his life before he even speaks.",
          ],
        },
        {
          id: "tatts",
          kicker: "E. Tattoos",
          bullets: [
            "Two tattoos:",
            "Left arm:\nfull sleeve",
            "Right side of the neck:\n'For My William' — Honey Script Font",
          ],
        },
      ],
    },
    vi: {
      quote: "\"Discipline is habit. Not heroism.\"",
      quoteName: "MSG. Marcus Hayes",
      sections: [
        {
          id: "basic info",
          kicker: "A. Thông tin chung",
          bullets: [
            "Nam",
            "14/1 (Ma kết)",
            "Chiều cao: 1m90",
            "Cân nặng: khoảng 90-95kg",
            "Màu da:\n #b98267\n Nâu đồng rám nắng do lao động ngoài trời.",
            "Nghề nghiệp:\n Từng làm cho NYPD (Đội trưởng của ESU).\n Giờ là lính đặc nhiệm trong quân đội Mỹ.",
            "Ấn tượng đầu tiên:\n Điềm tĩnh, chủ động, nam tính kiểu bụi bặm (rugged).\n" +
            "Nhìn như mối đe dọa — hành động như tấm chắn bảo vệ.\n" +
            "Là nguời khi đứng cạnh thì không bố con thằng nào dám động đến bạn.",
            "Thói quen kỳ lạ:\n đêm nào cũng phải đọc sách về khái niệm vật lý trước khi ngủ.\n Cơ học lượng tử, bảo toàn năng lượng, hố đen vũ trụ, bất kì cái gì liên quan tới vật lý — hỏi là trả lời được hết.",
          ],
        },
        {
          id: "face",
          kicker: "B. Đặc điểm khuôn mặt",
          bullets: [
            "Chân mày & mắt:\n Lông mày rậm, không tỉa gọn. Đầu lông mày hay nhăn lại.\n Mí mắt hạ xuống (heavy-lidded), nhíu lại như đang suy nghĩ (hoặc đang ngầm đánh giá bạn).",
            "Màu mắt:\n #5B6b74\nXanh xám lạnh, nhạt màu, không quá sáng.",
            "Mũi & hàm:\n Mũi thẳng, hơi gồ nhẹ trên sống mũi do lúc trước dánh nhau gãy mũi.\n Quai hàm góc cạnh, hơi rộng, nam tính.",
            "Sẹo:\n một cái ở cuối đuôi lông mày bên phải.\n một cái ở bên phải của môi trên.\n một cái chạy dọc lên từ quai hàm bên trái, hơi mờ.",
          ],
        },
        {
          id: "hair and stuffs",
          kicker: "C. Tóc, râu, phụ kiện",
          bullets: [
            "Tóc:\n màu đen.\ncắt gọn hai bên, phần trên đỉnh dài vừa đủ để vuốt gel/vuốt về phía sau.",
            "Râu:\n Italian beard style (xem ảnh tham khảo).",
            "Phụ kiện:\nnhẫn cưới màu vàng bên tay trái.\n hai thẻ dogtag trên cổ (khắc tên 'Marcus Hayes' — font: Helvetica).",
          ],
        },
        {
          id: "dilf coded",
          kicker: "D. Dáng người & khí chất chung",
          bullets: [
            "Tay:\nTo. thô ráp. chai sạn. gân guốc.",
            "Bắp tay:\n Rất đồ sộ. Dày và nặng.",
            "Lưng:\n Rộng đủ để che luôn ánh nắng.\n Nhiều sẹo, ngang dọc có đủ.\n Ref vẽ vài đường cho mọi người hình dung chung chung thui.",
            "Tóm tắt:\n nên được vẽ để nổi bật khí chất của người đàn ông được rèn dũa trong khuôn phép từ nhỏ, và chỉ càng ngày càng cứng cỏi hơn.\n",
          ],
        },
        {
          id: "tatts",
          kicker: "E. Hình xăm",
          bullets: [
            "Hai hình xăm:",
            "Tay trái:\n full sleeve",
            "Phần cổ bên phải:\n'For My William' — Honey Script Font"
          ],
        },
      ],
    },
  } as const;

  const t = translations[language] || translations.en;
  const marcusSections = t.sections;

  const sectionAnchors = marcusSections.map((section) => ({
    ...section,
    anchor: section.id.replace(/\s+/g, "-").toLowerCase(),
  }));
  const chapterLabelsByLang: Record<"en" | "vi", Record<string, string>> = {
    en: {
      "basic info": "A. Snapshot",
      face: "B. Face",
      "hair and stuffs": "C. Hair & Acc",
      "dilf coded": "D. Build",
      tatts: "E. Ink",
    },
    vi: {
      "basic info": "A. Tổng quan",
      face: "B. Gương mặt",
      "hair and stuffs": "C. Tóc & phụ kiện",
      "dilf coded": "D. Dáng người",
      tatts: "E Hình xăm",
    },
  };
  const chapterLabels = chapterLabelsByLang[language] || chapterLabelsByLang.en;
  const chapterItems = [
    ...sectionAnchors.map((section) => ({
      anchor: section.anchor,
      label: chapterLabels[section.id] || section.kicker,
    })),
    {
      anchor: "gallery",
      label: "F Gallery",
    },
  ];
  const activeChapterLabel =
    chapterItems.find((item) => item.anchor === activeAnchor)?.label ?? chapterItems[0]?.label ?? "Chapter";

  // images per section – rows / strips
  const sectionImageIds: Record<string, string[]> = {
    "basic info": ["palette"],
    face: ["eyesBrows", "nose", "lipScar", "browScar", "jawScar"],
    "hair and stuffs": ["hair1", "hair2", "beard", "weddingRing", "dogtags"],
    "dilf coded": ["hands", "biceps1", "biceps2", "back", "thighs", "body"],
    tatts: ["tattoo", "tattoo2", "tattoo3"],
  };

  const imageMap: Record<string, string> = {
    palette: marcusColourPalette,
    body: marcusBody,
    eyesBrows: marcusEyesAndBrows,
    nose: marcusNose,
    lipScar: marcusLipScar,
    browScar: marcusBrowScar,
    jawScar: marcusJawScar,
    hair1: marcusHair1,
    hair2: marcusHair2,
    beard: marcusBeard,
    weddingRing: marcusWeddingRing,
    dogtags: marcusDogTags,
    hands: marcusHands,
    biceps1: marcusBiceps1,
    biceps2: marcusBiceps2,
    back: marcusBack,
    thighs: marcusThighs,
    tattoo: marcusTattoo,
    tattoo2: marcusTattoo2,
    tattoo3: marcusTattoo3,
    gallery1: marcusGallery1,
    gallery2: marcusGallery2,
    gallery4: marcusGallery3,
    gallery3: marcusID,
  };

  // images per section – rows / strips
  const imageLabelsByLang: Record<"en" | "vi", Record<string, string>> = {
    en: {
      // FACE
      eyesBrows: "Eyes & brows",
      nose: "Nose",
      lipScar: "Right upper lip scar",
      browScar: "Right brow scar",
      jawScar: "Left jawline scar",

      // HAIR / BEARD / ACCESSORIES
      hair1: "Hair ref 1 (Slicked back)",
      hair2: "Hair ref 2 (A bit tousled)",
      beard: "Beard",
      weddingRing: "Wedding ring",
      dogtags: "Dog tags",

      // BODY / SILHOUETTE
      hands: "Hands",
      biceps1: "Biceps – relaxed",
      biceps2: "Biceps – flexed",
      back: "Back",
      thighs: "Thighs",
      body: "Overall build",
    },

    vi: {
      // FACE
      eyesBrows: "Mắt & chân mày",
      nose: "Mũi",
      lipScar: "Sẹo bên phải\nmôi trên",
      browScar: "Sẹo gần cuối\nđuôi chân mày bên phải",
      jawScar: "Sẹo chạy dọc\nlên từ quai hàm bên trái",

      // HAIR / BEARD / ACCESSORIES
      hair1: "Tóc (chỉn chu)",
      hair2: "Tóc (lúc rối)",
      beard: "Râu",
      weddingRing: "Nhẫn cưới",
      dogtags: "Dây chuyền",

      // BODY / SILHOUETTE
      hands: "Bàn tay",
      biceps1: "Bắp tay — thả lỏng",
      biceps2: "Bắp tay — gồng lên",
      back: "Lưng",
      thighs: "Đùi",
      body: "Dáng người tổng thể",
    },
  };

  // pick the right labels for current language
  const imageLabels = imageLabelsByLang[language] || imageLabelsByLang.en;

  const marcusSoloGallery: { src: string; label: string }[] = [
    { src: marcusID, label: "(A): Ha Vee" },
    { src: marcusGallery3, label: "(A): Tì Khi" },
    { src: marcusGallery2, label: "(A): Thy An" },
    { src: marcusGallery1, label: "(A): Cẩm Đíc Nhót" },
  ];

  const handleChapterJump = (anchor: string) => {
    const target = document.getElementById(anchor);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveAnchor(anchor);
    }
  };

  return (
    <HeroScrollPage
      backgroundImage={marcusBriefPage}
      kicker=""
      title=""
      subtitle=""
      showHero={false}
      pageClassName="marcus-brief-page"
      bodyClassName="marcus-brief-body scroll-smooth"
    >
      <div className="brief-chapter-mobile-jump-wrap" onMouseLeave={() => setChapterOpen(false)}>
        <button
          type="button"
          className="home-journey-chapter-trigger"
          aria-haspopup="listbox"
          aria-expanded={chapterOpen}
          onClick={() => setChapterOpen((open) => !open)}
        >
          <span className="home-journey-chapter-trigger-kicker">Chapter</span>
          <span className="home-journey-chapter-trigger-current">{activeChapterLabel}</span>
          <span className="home-journey-chapter-trigger-caret" aria-hidden="true">
            {chapterOpen ? "−" : "+"}
          </span>
        </button>
        <div className={`home-journey-chapter-menu ${chapterOpen ? "open" : ""}`} role="listbox">
          {chapterItems.map((item, index) => (
            <button
              key={item.anchor}
              type="button"
              role="option"
              aria-selected={activeAnchor === item.anchor}
              className={`home-journey-chapter-option ${activeAnchor === item.anchor ? "is-active" : ""}`}
              onClick={() => {
                handleChapterJump(item.anchor);
                setChapterOpen(false);
              }}
            >
              <span className="home-journey-chapter-option-index" aria-hidden="true">
                {String(index).padStart(2, "0")}
              </span>
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      <section className="marcus-intro min-h-[120vh] flex flex-col items-center justify-center px-4">
        <div className="marcus-intro-panel max-w-2xl mx-auto text-center">
          <p className="marcus-intro-name mt-2 uppercase tracking-[0.2em]">
            {t.quoteName}
          </p>
          <p className="marcus-intro-quote whitespace-pre-line">
            {t.quote}
          </p>
        </div>
      </section>
      <div className="marcus-brief-content marcus-brief-content-shell max-w-6xl mx-auto px-6 md:px-10 lg:px-16 py-12 md:py-16">
        <div className="brief-chapter-layout brief-chapter-layout--dark">
          <aside className="brief-chapter-rail" aria-label="Marcus sections">
            {chapterItems.map((item) => (
              <button
                key={item.anchor}
                type="button"
                onClick={() => handleChapterJump(item.anchor)}
                className={`brief-chapter-rail-item ${activeAnchor === item.anchor ? "is-active" : ""}`}
              >
                {item.label}
              </button>
            ))}
          </aside>
          <div className="brief-chapter-main">
            {/* divider under hero */}
            <div className="marcus-content-divider h-px w-full bg-slate-500/60 opacity-80 rounded-full" />

            <div className="space-y-28 md:space-y-36">
              {sectionAnchors.map((section, sectionIndex) => {
                const isVisible = visibleSections[sectionIndex] ?? false;

                const bodyText =
                  section.body ??
                  section.bullets
                    ?.map((item) =>
                      typeof item === "string"
                        ? `• ${item}`
                        : `${item.title}\n${item.detail.map((d) => `• ${d}`).join("\n")}`
                    )
                    .join("\n\n");

                const imageIds: string[] = sectionImageIds[section.id] ?? [];
                const images = imageIds
                  .map((id: string) => imageMap[id])
                  .filter((src): src is string => Boolean(src));

                const isPaletteSection = section.id === "basic info";
                const isFaceSection = section.id === "face";
                const isHairSection = section.id === "hair and stuffs";
                const isBodySection = section.id === "dilf coded";
                const isTattooSection = section.id === "tatts";

                // pick correct ref for scroll sections
                const currentStripRef = isFaceSection
                  ? faceStripRef
                  : isHairSection
                    ? hairStripRef
                    : isBodySection
                      ? bodyStripRef
                      : null;

                return (
                  <section
                    key={section.id}
                    id={section.anchor}
                    data-section-index={sectionIndex}
                    className={`marcus-chapter py-16 lg:py-24 ${isVisible ? "is-visible" : ""}`}
                  >
                    <div
                      className={`marcus-chapter-shell ${sectionIndex % 2 === 0
                        ? "marcus-chapter-shell--media-right"
                        : "marcus-chapter-shell--media-left"
                        }`}
                    >
                      {/* TEXT BLOCK */}
                      <div className="marcus-chapter-text max-w-3xl mx-auto text-center space-y-4 leading-relaxed">
                        <div
                          className="marcus-section-kicker marcus-reveal-item marcus-reveal-item--kicker text-[11px] md:text-xs uppercase tracking-[0.18em] text-slate-200/80"
                        >
                          {section.kicker}
                        </div>

                        {bodyText && (
                          <p
                            className="marcus-body-text marcus-reveal-item marcus-reveal-item--body mt-4 whitespace-pre-line text-[12px] md:text-sm md:leading-[1.9] leading-[1.8] tracking-[0.16em] uppercase text-slate-100"
                          >
                            {bodyText}
                          </p>
                        )}
                      </div>

                      {/* IMAGE AREA */}
                      {images.length > 0 && (
                        <div
                          className="marcus-chapter-media marcus-reveal-item marcus-reveal-item--media"
                        >
                          {/* PALETTE – match William's layout */}
                          {isPaletteSection && images.length === 1 && (
                            <div
                              data-marcus-basic-info-media
                              className={`mt-10 marcus-basic-info-media ${isBasicInfoMediaVisible ? "is-media-visible" : ""}`}
                            >
                              <figure className="ref-image marcus-basic-info-media__item marcus-basic-info-media__item--palette bg-neutral-50 border border-neutral-200 overflow-hidden">
                                <img
                                  src={images[0]}
                                  alt="Marcus colour palette"
                                  className="w-full h-auto object-contain block"
                                />
                              </figure>

                              <figure className="ref-image marcus-basic-info-media__item marcus-basic-info-media__item--aesthetic bg-neutral-50 border border-neutral-200 overflow-hidden">
                                <img
                                  src={marcusAesthetic}
                                  alt="Marcus aesthetic reference"
                                  className="w-full h-auto object-contain block"
                                />
                              </figure>

                              <div className="marcus-basic-info-media__playlist marcus-basic-info-media__playlist--stagger">
                                <FloatingSoundtrackBar
                                  title="Marcus's soundtrack"
                                  embedUrl={marcusPlaylistEmbedUrl}
                                />
                              </div>
                            </div>
                          )}

                          {/* FACE / HAIR / BODY → HORIZONTAL STRIP WITH ARROWS */}
                          {(isFaceSection || isHairSection || isBodySection) &&
                            !isPaletteSection &&
                            currentStripRef && (
                              <div className="mt-10 relative">
                                {/* LEFT ARROW */}
                                <button
                                  type="button"
                                  onClick={() =>
                                    scrollStrip(currentStripRef?.current ?? null, "left")
                                  }
                                  className="scroll-arrow-btn scroll-arrow-btn--left scroll-arrow-btn--gutter"
                                >
                                  ‹
                                </button>

                                <div
                                  ref={currentStripRef}
                                  className={`no-scrollbar marcus-scroll-strip strip-with-gutter ${isFaceSection ? "marcus-scroll-strip--face" : ""}`}
                                >
                                  {imageIds.map((id: string, idx: number) => {
                                    const src = imageMap[id];
                                    if (!src) return null;
                                    const label = imageLabels[id] ?? "";

                                    return (
                                      <div
                                        key={`${section.id}-${idx}`}
                                        className={`marcus-scroll-item ${isFaceSection ? "marcus-scroll-item--face" : ""}`}
                                      >
                                        <figure className="marcus-scroll-card">
                                          <div className="marcus-scroll-card-inner">
                                            <img
                                              src={src}
                                              alt={label || `${section.kicker} reference ${idx + 1}`}
                                              className="w-full h-full object-cover"
                                            />
                                          </div>
                                        </figure>

                                        {label && (
                                          <div className="marcus-scroll-caption">
                                            {label}
                                          </div>
                                        )}
                                      </div>
                                    );
                                  })}
                                </div>

                                {/* RIGHT ARROW */}
                                <button
                                  type="button"
                                  onClick={() =>
                                    scrollStrip(currentStripRef?.current ?? null, "right")
                                  }
                                  className="scroll-arrow-btn scroll-arrow-btn--right scroll-arrow-btn--gutter"
                                >
                                  ›
                                </button>
                              </div>
                            )}

                          {/* TATTOO SECTION → SINGLE CENTERED IMAGE */}
                          {isTattooSection &&
                            !isFaceSection &&
                            !isHairSection &&
                            !isBodySection &&
                            !isPaletteSection && (
                              <div className="mt-10 relative">
                                <button
                                  type="button"
                                  onClick={() => scrollStrip(tattooStripRef.current, "left")}
                                  className="scroll-arrow-btn scroll-arrow-btn--left scroll-arrow-btn--gutter"
                                >
                                  ‹
                                </button>

                                <div
                                  ref={tattooStripRef}
                                  className="no-scrollbar marcus-scroll-strip marcus-scroll-strip--tattoo strip-with-gutter"
                                >
                                  <div className="marcus-scroll-item marcus-scroll-item--tattoo">
                                    <figure className="marcus-scroll-card">
                                      <div className="marcus-scroll-card-inner">
                                        <img
                                          src={marcusTattoo}
                                          alt={`${section.kicker} reference 1`}
                                          className="w-full h-full object-cover"
                                        />
                                      </div>
                                    </figure>
                                    <div className="marcus-scroll-caption tattoo-image-caption">
                                      (A): MAR QYH
                                    </div>
                                  </div>

                                  <div className="marcus-scroll-item marcus-scroll-item--tattoo">
                                    <figure className="marcus-scroll-card marcus-tattoo-combo-card">
                                      <div className="marcus-scroll-card-inner marcus-tattoo-combo">
                                        <img
                                          src={marcusTattoo3}
                                          alt={`${section.kicker} combined reference base`}
                                          className="marcus-tattoo-combo__base"
                                        />
                                        <img
                                          src={marcusTattoo2}
                                          alt={`${section.kicker} combined reference detail`}
                                          className="marcus-tattoo-combo__overlay"
                                        />
                                      </div>
                                    </figure>
                                  </div>
                                </div>

                                <button
                                  type="button"
                                  onClick={() => scrollStrip(tattooStripRef.current, "right")}
                                  className="scroll-arrow-btn scroll-arrow-btn--right scroll-arrow-btn--gutter"
                                >
                                  ›
                                </button>
                              </div>
                            )}

                          {/* FALLBACK GRID FOR ANY OTHER SECTIONS */}
                          {!isFaceSection &&
                            !isHairSection &&
                            !isBodySection &&
                            !isTattooSection &&
                            !isPaletteSection && (
                              <div className="mt-10">
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                                  {images.map((src: string, idx: number) => (
                                    <figure
                                      key={`${section.id}-${idx}`}
                                      className="ref-image w-full aspect-[3/4] bg-slate-900/60 border border-slate-700/60 rounded-xl overflow-hidden shadow-lg"
                                    >
                                      <img
                                        src={src}
                                        alt={`${section.kicker} reference ${idx + 1}`}
                                        className="w-full h-full object-cover"
                                      />
                                    </figure>
                                  ))}
                                </div>
                              </div>
                            )}
                        </div>
                      )}
                    </div>
                  </section>
                );
              })}

              {/* SIMPLE GALLERY – rows, no scroll */}
              <section id="gallery" className="commission-gallery marcus-gallery-section mt-20">
                <h3 className="commission-gallery-title text-slate-100">
                  Gallery
                </h3>
                <div className="mt-8 relative">
                  {/* LEFT ARROW */}
                  <button
                    type="button"
                    onClick={() => scrollStrip(galleryStripRef.current, "left")}
                    className="scroll-arrow-btn scroll-arrow-btn--left scroll-arrow-btn--gutter"
                  >
                    ‹
                  </button>

                  {/* STRIP */}
                  <div
                    ref={galleryStripRef}
                    className="gallery-strip strip-with-gutter no-scrollbar"
                  >
                    {marcusSoloGallery.map((item, idx) => (
                      <figure key={idx} className="gallery-card figure-zoom">
                        <button
                          type="button"
                          className="gallery-card-button"
                          onClick={() =>
                            setSelectedGalleryImage({
                              src: item.src,
                              alt: `Marcus solo commission ${item.label}`,
                              caption: item.label,
                            })
                          }
                          aria-label={`Open Marcus solo commission ${item.label}`}
                        >
                          <div className="gallery-figure">
                            <img
                              src={item.src}
                              alt={`Marcus solo commission ${item.label}`}
                              className="gallery-img"
                            />
                          </div>
                        </button>
                        <figcaption className="gallery-caption">
                          <span className="gallery-caption-artist text-slate-300">
                            {item.label}
                          </span>
                        </figcaption>
                      </figure>
                    ))}
                  </div>
                  {/* RIGHT ARROW */}
                  <button
                    type="button"
                    onClick={() => scrollStrip(galleryStripRef.current, "right")}
                    className="scroll-arrow-btn scroll-arrow-btn--right scroll-arrow-btn--gutter"
                  >
                    ›
                  </button>
                </div>
              </section>
              <GalleryLightbox
                image={selectedGalleryImage}
                onClose={() => setSelectedGalleryImage(null)}
              />
            </div>
          </div>
        </div>
        <PageCredit tone="on-dark" />
      </div>
    </HeroScrollPage>
  );
}
