import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import marcusBriefPage from "../../assets/marcusBriefPage.jpg";
import HeroScrollPage from "../components/HeroScrollPage";
import GalleryLightbox, {
  type GalleryLightboxImage,
} from "../components/GalleryLightbox";
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

type Props = {
  backHref: string;
};

type SectionBullet = string | { title: string; detail: string[] };
type Section = {
  id: string;
  kicker: string;
  body?: string;
  bullets: SectionBullet[];
};

export default function MarcusBriefPage({ backHref }: Props) {
  const { language } = useLanguage();
  const [visibleSections, setVisibleSections] = useState<Record<number, boolean>>({
    0: true,
  });
  const [selectedGalleryImage, setSelectedGalleryImage] =
    useState<GalleryLightboxImage | null>(null);

  // STRIP REFS FOR HORIZONTAL SCROLL
  const faceStripRef = useRef<HTMLDivElement | null>(null);
  const hairStripRef = useRef<HTMLDivElement | null>(null);
  const bodyStripRef = useRef<HTMLDivElement | null>(null);
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
      { threshold: 0.35, rootMargin: "-28% 0px -22% 0px" }
    );

    const sectionEls = document.querySelectorAll("[data-section-index]");
    sectionEls.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const translations: Record<
    "en" | "vi",
    {
      kicker: string;
      title: string;
      subtitle: string;
      back: string;
      intro?: string;
      sections: Section[];
    }
  > = {
    en: {
      kicker: "Delta Force dossier",
      title: "Marcus Hayes",
      subtitle: "Precision in every breath. Discipline in every step.",
      back: "← Back home",
      intro:
        "This page consolidates Marcus' operator profile:\n" +
        "Capturing his features, combat-built physique, defining traits, and artistic references.\n" +
        "Navigate through the sections or scroll as if reading a mission briefing.",
      sections: [
        {
          id: "basic info",
          kicker: "A. Snapshot",
          bullets: [
            "Male.",
            "14/1 (Capricorn)",
            "Height: 6'3\"/190cm",
            "Weight: 210 pounds/90-95kg.",
            "Skintone: #B98267. Deep sun-warmed tan from outdoor labour.",
            "Occupation: Former NYPD cop (ESU Captain). Now an elite operator in U.S. military.",
            "Vibe: Stoic, deliberate, masculine in the most unpretentious way.\n" +
            "Built like a threat — acts like a shield.\n" +
            "The kind of man whose presence alone tells you nothing will touch you.",
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
      kicker: "Delta Force Dossier",
      title: "Marcus Hayes",
      subtitle: "Precision in every breath. Discipline in every step.",
      intro:
        "Trang này tổng hợp hồ sơ tác chiến của Marcus Hayes:\n" +
        "Bao gồm vibe chung, mô tả chi tiết các đặc điểm nhận dạng trên khuôn mặt và cơ thể, cùng với hình ảnh tham khảo.\n" +
        "Bạn có thể bấm vào một trong những lựa chọn ở dưới để đến section bạn muốn đọc.\n" +
        "Hoặc lướt xuống và đọc từng dòng để cảm nhận rõ ràng hơn.",
      back: "← Về trang chủ",
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
            "Râu:\n Italian beard style (xem ảnh tham khảo bên dưới).",
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
      hair1: "Hair ref 1",
      hair2: "Hair ref 2",
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
      hair1: "Tóc",
      hair2: "Tóc",
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

  const handleChipClick = (anchor: string) => {
    const target = document.getElementById(anchor);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <HeroScrollPage
      backHref={backHref}
      backgroundImage={marcusBriefPage}
      kicker={t.kicker}
      title={t.title}
      subtitle={t.subtitle}
      pageClassName="marcus-brief-page"
      bodyClassName="marcus-brief-body scroll-smooth"
    >

      {/* INTRO + UNDERLINED NAV */}
      <section className="min-h-[120vh] flex flex-col items-center justify-center px-4">
        <div className="max-w-2xl mx-auto text-center space-y-8">
          {t.intro && (
            <div className="max-w-4xl mx-auto px-6 md:px-10">
              <p className="whitespace-pre-line text-xs md:text-sm md:leading-[1.9] leading-[1.8] tracking-[0.18] md:tracking-[0.2em] uppercase text-slate-100">
                {t.intro}
              </p>
            </div>
          )}

          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-3 text-[11px] md:text-[11px] uppercase tracking-[0.16em]">
            {sectionAnchors.map((section) => (
              <button
                key={section.anchor}
                type="button"
                onClick={() => handleChipClick(section.anchor)}
                className="nav-chip marcus-nav-chip bg-transparent border-0 pb-1 text-slate-200 border-b border-transparent hover:border-slate-100 hover:text-slate-100 focus:outline-none underline"              >
                {section.kicker}
              </button>
            ))}

            {/* Gallery nav chip */}
            <button
              type="button"
              onClick={() => handleChipClick("gallery")}
              className="nav-chip marcus-nav-chip bg-transparent border-0 pb-1 text-slate-200 border-b border-transparent hover:border-slate-100 hover:text-slate-100 focus:outline-none underline"
            >
              F. Gallery
            </button>
          </nav>
        </div>
      </section>
      <div className="marcus-brief-content max-w-6xl mx-auto px-6 md:px-10 lg:px-16 py-12 md:py-16">
        {/* divider under hero */}
        <div className="h-px w-full bg-slate-500/60 opacity-80 rounded-full" />

        <div className="space-y-28 md:space-y-36">
          {sectionAnchors.map((section, sectionIndex) => {
            const isVisible = visibleSections[sectionIndex] ?? true;

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
                className={`py-16 lg:py-24 transition-all duration-700 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                  }`}
              >
                {/* TEXT BLOCK */}
                <div className="max-w-3xl mx-auto text-center space-y-4 leading-relaxed">
                  <div
                    className={`marcus-section-kicker text-[11px] md:text-xs uppercase tracking-[0.18em] text-slate-200/80 transition-all duration-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}
                    style={{ transitionDelay: isVisible ? "60ms" : "0ms" }}
                  >
                    {section.kicker}
                  </div>

                  {bodyText && (
                    <p
                      className={`marcus-body-text mt-4 whitespace-pre-line text-[12px] md:text-sm md:leading-[1.9] leading-[1.8] tracking-[0.16em] uppercase text-slate-100 transition-all duration-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}
                      style={{ transitionDelay: isVisible ? "180ms" : "0ms" }}
                    >
                      {bodyText}
                    </p>
                  )}
                </div>

                {/* IMAGE AREA */}
                {images.length > 0 && (
                  <>
                    {/* PALETTE – match William's layout */}
                    {isPaletteSection && images.length === 1 && (
                      <div className="mt-10 marcus-basic-info-media">
                        <figure className="ref-image marcus-brief-palette marcus-basic-info-media__item bg-neutral-50 border border-neutral-200 overflow-hidden">
                          <img
                            src={images[0]}
                            alt="Marcus colour palette"
                            className="w-full h-auto object-contain block"
                          />
                        </figure>

                        <figure className="ref-image marcus-brief-palette marcus-basic-info-media__item bg-neutral-50 border border-neutral-200 overflow-hidden">
                          <img
                            src={marcusAesthetic}
                            alt="Marcus aesthetic reference"
                            className="w-full h-auto object-contain block"
                          />
                        </figure>
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
                            className="no-scrollbar marcus-scroll-strip strip-with-gutter"
                          >
                            {imageIds.map((id: string, idx: number) => {
                              const src = imageMap[id];
                              if (!src) return null;
                              const label = imageLabels[id] ?? "";

                              return (
                                <div
                                  key={`${section.id}-${idx}`}
                                  className="marcus-scroll-item"
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
                        <div className="tattoo-collage mt-10">
                          {imageIds.map((id: string, idx: number) => {
                            const src = imageMap[id];
                            if (!src) return null;
                            const isPrimaryTattoo = id === "tattoo";

                            return (
                              <figure
                                key={`${section.id}-tattoo-${idx}`}
                                className={`tattoo-item tattoo-item--${id}`}
                              >
                                <img
                                  src={src}
                                  alt={`${section.kicker} reference ${idx + 1}`}
                                  className="tattoo-img"
                                />
                                {isPrimaryTattoo && (
                                  <figcaption className="tattoo-credit-overlay lg:hidden">
                                    (A): MAR QYH
                                  </figcaption>
                                )}
                              </figure>
                            );
                          })}
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
                  </>
                )}
              </section>
            );
          })}

          {/* SIMPLE GALLERY – rows, no scroll */}
          <section id="gallery" className="commission-gallery mt-20">
            <h3 className="commission-gallery-title text-slate-100">
              Marcus – Solo Commissions
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

          <Link
            to={backHref}
            className="block mt-12 text-sm uppercase tracking-[0.16em] text-slate-300 hover:text-white transition"
          >
            {t.back}
          </Link>

          <GalleryLightbox
            image={selectedGalleryImage}
            onClose={() => setSelectedGalleryImage(null)}
          />
        </div>
      </div>
    </HeroScrollPage>
  );
}
