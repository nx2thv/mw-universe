import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import williamBriefPage from "../../assets/williamBriefPage.jpeg";
import HeroScrollPage from "../components/HeroScrollPage";
import GalleryLightbox, {
  type GalleryLightboxImage,
} from "../components/GalleryLightbox";
import { useLanguage } from "../LanguageContext";
import williamBrows from "../../assets/williamBrows.jpeg";
import williamEyes from "../../assets/williamEyesAndMark.jpeg";
import williamFreckles from "../../assets/williamFreckles.jpeg";
import williamToothGem from "../../assets/williamToothGem.jpeg";
import williamColourPalette from "../../assets/williamColourPalette.jpeg";
import williamHairStyle1Front from "../../assets/william-hairstyle1-front.jpeg";
import williamHairStyle1Side from "../../assets/william-hairstyle1-side.jpeg";
import williamHairStyle2Front from "../../assets/william-hairstyle2-front.jpeg";
import williamHairStyle2Side from "../../assets/william-hairstyle2-side.jpeg";
import williamLeftEarrings from "../../assets/williamLeftEarrings.jpeg";
import williamRightEarrings from "../../assets/williamRightEarring.jpg";
import williamLeftRings from "../../assets/williamLeftRing.jpeg";
import williamRightRings from "../../assets/williamRightRing.jpg";
import williamSilhouette1 from "../../assets/williamSilhouette1.jpeg";
import williamSilhouette2 from "../../assets/williamSilhouette2.jpeg";
import williamSihouette3 from "../../assets/williamSilhouette3.jpeg";
import williamSilhouette4 from "../../assets/williamSilhouette4.jpeg";
import williamTattoo1 from "../../assets/williamTattoo1.jpeg";
import williamTattooPlacement1 from "../../assets/williamTattooPlacement1.jpeg";
import williamTattoo2 from "../../assets/williamTattoo2.jpeg";
import williamTattooPlacement2 from "../../assets/williamTattooPlacement2.jpeg";
import williamTattooPlacement21 from "../../assets/williamTattooPlacement21.jpeg";
import williamGallery1 from "../../assets/williamGallery1.jpeg";
import williamGallery2 from "../../assets/williamGallery2.jpeg";
import williamGallery3 from "../../assets/williamGallery3.jpeg";
import williamGallery4 from "../../assets/williamGallery4.jpeg";
import williamGallery5 from "../../assets/WilliamCartier.jpeg";
import williamGallery6 from "../../assets/williamGallery6.jpeg"
import williamGallery7 from "../../assets/williamGallery7.jpeg";
import williamGallery8 from "../../assets/williamGallery8.jpeg";
import williamAesthetic from "../../assets/williamAesthetic.jpeg";

type Props = {
  label: string;
  backHref: string;
};

type SectionBullet = string | { title: string; detail: string[] };

type Section = {
  id: string;
  kicker: string;
  body?: string;
  bullets?: SectionBullet[];
};

export default function WilliamBriefPage({ label, backHref }: Props) {
  const { language } = useLanguage();
  const [visibleSections, setVisibleSections] = useState<Record<number, boolean>>({
    0: true,
  });
  const [selectedGalleryImage, setSelectedGalleryImage] =
    useState<GalleryLightboxImage | null>(null);

  const accStripRef = useRef<HTMLDivElement | null>(null);
  const scrollAccessories = (direction: "left" | "right") => {
    const container = accStripRef.current;
    if (!container) return;

    // Try to base scroll distance on one card width + gap
    const card = container.querySelector<HTMLElement>(".acc-card");
    const cardWidth = card?.offsetWidth ?? 260;
    const scrollAmount = cardWidth + 24; // 24px ~ gap-6

    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  const galleryStripRef = useRef<HTMLDivElement | null>(null);
  const scrollGallery = (direction: "left" | "right") => {
    const container = galleryStripRef.current;
    if (!container) return;

    const card = container.querySelector<HTMLElement>(".gallery-card");
    const cardWidth = card?.offsetWidth ?? 360;
    const scrollAmount = cardWidth + 24;

    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  // Intersection observer for section animations
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
      kicker: "Chanel Portfolio",
      title: label,
      subtitle: "Chanel's darling. Marcus' sweetheart.",
      back: "← Back home",
      intro:
        "This page gathers William's core reference in one editorial-style scroll:\n" +
        "overall vibe, features, colour palette, silhouette, tattoos, and past commissions.\n" +
        "Skim the quick navigation below or wander down the page like a lookbook.",
      sections: [
        {
          id: "basic info",
          kicker: "A. Snapshot",
          bullets: [
            "Male",
            "20/10 (Libra).",
            "Height: 5'10\"/177cm.",
            "Weight: 130 pounds/57-58kg.",
            "Skintone:\n#F6E0D1\n Porcelain fair with soft flush.",
            "Occupation:\n Used to be a model.\n Now a full-time fashion designer at Chanel.",
            "First impression:\n Ethereal, graceful, androgynous beauty.\n" +
            "Sharp-witted, flirtatious, with couture arrogance.\n" +
            "The kind of a person who passes you on the street and makes you painfully aware that you could never afford the life he's living.",
            "Bonus quirk:\n Talks to inanimate objects like they wronged him.\n 'You're a whore' — once said to a curling iron when it burnt his neck.",
          ],
        },
        {
          id: "face",
          kicker: "B. Face Structure",
          bullets: [
            "Brows:\n" +
            "Perfectly shaped brows with a natural, effortless arch.\n(First picture in the collage.)\n",
            "Eyes:\nFox-like, slightly hooded eyes that give him the signature 'elegantly juding you' look.\n" +
            "A small beauty mark sits under his right eye.\n(Second picture in the collage.)",

            "Eye colour:\n" +
            "#C3D5DC\n" +
            "Bright, pastel, cold-toned blue eyes.",

            "Nose, jaw & lips:\n" +
            "Clean, elegant nose bridge.\n" +
            "Pouty, full lower lip with a sculpted cupid's bow. Plush, a little petulant, very kissable.\n" +
            "Oval face with a slender jaw, pointed chin, and delicate angles.\n" +
            "Light freckles scattered across the cheeks and nose. (The standalone image.)",
          ],
        },
        {
          id: "hair and stuffs",
          kicker: "C. Hair and accessories",
          bullets: [
            "Hair colour:\n" +
            "#F1D27A",
            "Highlight:\n" +
            "#FFF3CC\n" +
            "#F6E8B1",
            "How to draw it:\n" +
            "William's hair is essentially a refined, modern mullet.\n" +
            "The back is longer and softly curled at the nape of his neck.\n" +
            "While the front has styled bangs that frame his face.",
            "He switches between two looks:",
            "First style: Soft front bang with a loose, effortless knot at the back.\n" +
            "(See the first row of reference images.)",
            "Second style: Same cut, but without the knot. The mullet flows naturally.\n" +
            "Sleek, expensive, slightly tousled in a deliberate way.\n" +
            "(See the second row of reference images.)",
            "Accessories:\nhas nipples piercings.\n the rest is shown in the row beneath the hair reference images.\n" +
            "(You can scroll left and right. Or press the arrows.)",
          ],
        },
        {
          id: "silhouette",
          kicker: "D. Silhouette & overall vibe",
          bullets: [
            "Hands:\n Long, elegant fingers. He was born into indulgence. He married a man who refuses to let him lift anything, not even his purse.\n Slight veins run along the forehands. Think of delicate, soft, artistic hands.",
            "Shoulders:\n Lithe, delicate with defined shoulder blades.\n Visibly sharp collarbones.\n There are freckles on his collarbones.",
            "Waist & hips:\n SNATCHED. AS. HELL. A perfect 23 inches. \n Any larger or smaller and his husband will throw hands.\n Hips are narrow, don't make it wide.",
            "Legs:\n His legs are longer than anyone's will to live.\n Think Bella Hadid runway legs — devastatingly long, and unfairly beautiful.",
            "Posture:\n elegantly commanding.\nstraight spine, shoulders rolled back.",
            "Overal vibe:\n Moves like he's always on a runway.\n Everything about him should appear elegant and effortlessly beautiful.",
          ],
        },
        {
          id: "tatts",
          kicker: "E. Tattoos",
          bullets: [
            "Two tattoos:",
            "Right hipbone:\n 'veni, vidi, vici' — Bickham Script (regular) font.",
            "Behind his back (between the Apollo's dimples):\n 'HAYES' — Cinzel Decorative Regular.",
          ],
        },
      ],
    },
    vi: {
      kicker: "Chanel Portfolio",
      title: label,
      subtitle: "Chanel's darling. Marcus' sweetheart.",
      intro: "Trang này cung cấp toàn bộ những gì cần thiết để vẽ William Cartier:\nBao gồm vibe chung, mô tả chi tiết các đặc điểm nhận dạng trên khuôn mặt và cơ thể, cùng với hình ảnh tham khảo.\n Bạn có thể bấm vào một trong những lựa chọn ở dưới để đến section bạn muốn đọc.\nHoặc lướt xuống và đọc từng dòng để cảm nhận rõ ràng hơn.",
      back: "← Về trang chủ",
      sections: [
        {
          id: "basic info",
          kicker: "A. Thông tin chung",
          bullets: [
            "Nam",
            "20/10 (Thiên Bình)",
            "Chiều cao: 1m77.",
            "Cân nặng: Khoảng 57-58kg.",
            "Màu da:\n #F6E0D1\n màu da trắng hồng, má hơi ửng đỏ.",
            "Nghề nghiệp:\n Cựu người mẫu.\n Hiện tại đã đổi sang làm thiết kế thời trang ở Chanel.",
            "Ấn tượng đầu tiên:\n Nét đẹp phi giới tính.\nTrông dễ thương nhưng miệng lưỡi sắc sảo.\n Là kiểu người ít ai với tới được.",
            "Thói quen kỳ lạ:\nnói chuyện với đồ vật như chúng nó là người thật và đã làm sai việc gì đó.",
          ],
        },
        {
          id: "face",
          kicker: "B. Cấu trúc mặt",
          bullets: [
            "Chân mày:\n Lông mày được tỉa gọn. Phần đuôi hơi nhướng lên.\n(Ảnh đầu ở 2 ref xếp đè lên nhau.)",
            "Mắt:\n Đuôi mắt xếch nhẹ như mắt cáo.\n phần mí hơi hạ/híp lại — tạo cảm giác như đang đánh giá người đối diện.\nCó nốt ruồi nhỏ ở dưới mắt phải.\n(Ảnh thứ hai ở 2 ref xếp đè lên nhau.)",
            "Màu mắt:\n #C3d5dc\n Màu xanh sáng và lạnh.",
            "Mũi, hàm & môi:\n Sống mũi thẳng, đầu mũi nhỏ.\n Hay chu, bĩu môi.\n Môi dưới mềm và đầy, môi trên có hai đỉnh với rãnh nhỏ.\n mặt trái xoan thon gọn, cằm nhọn vừa đủ, góc hàm mảnh.\n có tàn nhang (xem ảnh tham khảo).",
          ],
        },
        {
          id: "hair and stuffs",
          kicker: "C. Tóc & phụ kiện",
          bullets: [
            "Màu tóc:\n #F1D27A",
            "Highlight:\n #FFF3cc\n #f6e8b1",
            "Cách vẽ:\n tóc hơi hướng theo kiểu mullet.\n tóc dài đến tầm gáy, lọn tóc mềm, hơi rối ôm sát lại da.\n có mái ở phía trước tạo khung cho khuôn mặt.",
            "Có 2 kiểu tóc:",
            "Kiểu 1: tóc buộc hờ phía sau\n (xem 2 ảnh ở dòng đầu tiên)",
            "Kiểu 2: tóc khi không buộc\n (xem 2 ảnh ở dòng thứ hai)",
            "Phụ kiện:\ncó khuyên ngực.\n còn lại xem dòng cuối.\n(bạn có thể lướt trái phải trên touchpad hoặc nhấn nút.)"
          ],
        },
        {
          id: "silhouette",
          kicker: "D. Dáng người & khí chất chung",
          bullets: [
            "Tay:\n ngón tay dài và mảnh — dáng tay của người ít khi làm việc nặng.\n gân nổi nhẹ, khớp xương mảnh mai.",
            "Vai:\n gầy, tinh tế nhưng vẫn hơi vuông để không quá nữ tính.\n xương quai xanh lộ rõ, nằm nông duới da.\n có tàn nhang trên xương quai xanh.",
            "Eo và hông:\n Eo bé, tầm 23 inches/58-59cm.\n Vẽ to hay bé hơn là Marcus đánh bạn.\nHông hẹp và gọn.",
            "Chân:\n dài, thon, đùi to vừa đủ và săn chắc.\n bắp chân có cơ vừa đủ để không quá yếu đuối.\n hãy nghĩ tới chân của Bella Hadid khi bạn vẽ tới đây.",
            "Tư thế:\n sang trọng và uy nghi.\n sống lưng luôn thẳng, vai hơi đưa về sau.",
            "Tóm tắt:\n cơ thể mảnh khảnh, sang trọng.\n nên được vẽ để toát ra vibe của người trong ngành thời trang.",
          ],
        },
        {
          id: "tatts",
          kicker: "E. Hình xăm",
          bullets: [
            "Có tổng cộng 2 hình xăm:",
            "Xương hông bên phải:\n 'veni, vidi, vici'\n font của hình xăm: Bickham Script (Regular)",
            "Ở giữa hõm Apollo (tên gọi của hõm Venus trên người nam giới):\n 'HAYES'\n font của hình xăm: Cinzel Decorative Regular.",
          ],
        },
      ],
    },
  } as const;

  const t = translations[language] || translations.en;
  const williamSections = t.sections;

  const sectionAnchors = williamSections.map((section) => ({
    ...section,
    anchor: section.id.replace(/\s+/g, "-").toLowerCase(),
  }));

  const sectionImageIds: Record<string, string[]> = {
    "basic info": ["palette"],
    face: ["brows", "eyes", "freckles"],
    "hair and stuffs": ["hair1Front", "hair1Side", "hair2Front", "hair2Side"],
    silhouette: ["sil1", "sil2", "sil3", "sil4"],
    tatts: ["tatt1", "tattPlacement1", "tatt2", "tattPlacement2", "tattPlacement21"],
  };

  const accessoryCaptionsByLang: Record<
    "en" | "vi",
    {
      leftRing: string;
      rightRing: string;
      leftEar: string;
      rightEar: string;
      toothGem: string;
    }
  > = {
    en: {
      leftRing: "LEFT HAND – RING STACK",
      rightRing: "RIGHT HAND – WEDDING RING",
      leftEar: "LEFT EAR – STACK",
      rightEar: "RIGHT EAR – STACK (change K to M)",
      toothGem: "TOOTH GEM",
    },
    vi: {
      leftRing: "NHẪN BÊN TAY TRÁI",
      rightRing: "NHẪN CƯỚI BÊN TAY PHẢI",
      leftEar: "KHUYÊN TAI BÊN TRÁI",
      rightEar: "KHUYÊN TAI BÊN PHẢI — đổi K thành M",
      toothGem: "TOOTH GEM",
    },
  };
  const accessoryCaptions = accessoryCaptionsByLang[language] || accessoryCaptionsByLang.en;

  const imageMap: Record<string, string> = {
    brows: williamBrows,
    eyes: williamEyes,
    freckles: williamFreckles,
    toothgem: williamToothGem,
    palette: williamColourPalette,
    hair1Front: williamHairStyle1Front,
    hair1Side: williamHairStyle1Side,
    hair2Front: williamHairStyle2Front,
    hair2Side: williamHairStyle2Side,
    sil1: williamSilhouette1,
    sil2: williamSilhouette2,
    sil3: williamSihouette3,
    sil4: williamSilhouette4,
    tatt1: williamTattoo1,
    tattPlacement1: williamTattooPlacement1,
    tatt2: williamTattoo2,
    tattPlacement2: williamTattooPlacement2,
    tattPlacement21: williamTattooPlacement21,
  };

  const williamSoloGallery: { src: string; artist: string }[] = [
    {
      src: williamGallery5,
      artist: "(A): The Breadsident",
    },
    {
      src: williamGallery8,
      artist: "(A): Lê Ly",
    },
    {
      src: williamGallery7,
      artist: "(A): Tinh Tú",
    },
    {
      src: williamGallery3,
      artist: "(A): ihn.",
    },
    {
      src: williamGallery4,
      artist: "(A): Tô Nghi",
    },
    {
      src: williamGallery6,
      artist: "(A): Đẹptrai Giaiđoạncuối",
    },
    {
      src: williamGallery2,
      artist: "(A): Bảo Khánhh",
    },
    {
      src: williamGallery1,
      artist: "(A): ihn.",
    },
  ]


  const handleChipClick = (anchor: string) => {
    const target = document.getElementById(anchor);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <HeroScrollPage
      backHref={backHref}
      backgroundImage={williamBriefPage}
      kicker={t.kicker}
      title={t.title}
      subtitle={t.subtitle}
      pageClassName="william-brief-page"
      bodyClassName="william-brief-body scroll-smooth"
    >
      {/* INTRO + UNDERLINED NAV */}
      <section className="border-t border-neutral-200 min-h-[120vh] flex flex-col items-center justify-center px-4">
        <div className="max-w-2xl mx-auto text-center">
          {t.intro && (
            <div className="max-w-4xl mx-auto px-6 md:px-10">
              <p className="whitespace-pre-line text-xs md:text-sm md:leading-[1.9] leading-[1.8] tracking-[0.18] md:tracking-[0.2em] uppercase text-neutral-800">
                {t.intro}
              </p>
            </div>
          )}

          <nav className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-3 text-[11px] md:text-[11px] uppercase tracking-[0.16em]">
            {sectionAnchors.map((section) => (
              <button
                key={section.anchor}
                type="button"
                onClick={() => handleChipClick(section.anchor)}
                className="nav-chip bg-transparent border-0 pb-1 text-neutral-800 border-b border-transparent hover:border-neutral-900 hover:text-neutral-900 focus:outline-none underline"
              >
                {section.kicker}
              </button>
            ))}

            {/* F. Gallery nav chip */}
            <button
              type="button"
              onClick={() => handleChipClick("gallery")}
              className="nav-chip bg-transparent border-0 pb-1 text-neutral-800 border-b border-transparent hover:border-neutral-900 hover:text-neutral-900 focus:outline-none underline"
            >
              F. Gallery
            </button>
          </nav>
        </div>
      </section>

      <div className="william-brief-content max-w-6xl mx-auto px-6 md:px-10 lg:px-16 py-12 md:py-16">
        {/* sections */}
        <div className="space-y-28 md:space-y-36">
          {sectionAnchors.map((section, sectionIndex) => {
            const isVisible = visibleSections[sectionIndex] ?? true;

            const animationClass = isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-6";
            const imageIds = sectionImageIds[section.id] || [];
            const images = imageIds.map((id) => imageMap[id]).filter(Boolean);

            const isFaceSection = section.id === "face";
            const isPaletteSection = section.id === "basic info";
            const isHairSection = section.id === "hair and stuffs";
            const isSilhouetteSection = section.id === "silhouette";
            const isTattooSection = section.id === "tatts";

            const bodyText =
              section.body ??
              section.bullets
                ?.map((item) =>
                  typeof item === "string"
                    ? `• ${item}`
                    : `${item.title}\n${item.detail.map((d) => `• ${d}`).join("\n")}`
                )
                .join("\n\n");
            return (
              <section
                key={section.id}
                id={section.anchor}
                data-section-index={sectionIndex}
                className={`py-16 lg:py-24 transition-all duration-700 ease-out ${animationClass}`}
              >
                {/* TEXT BLOCK */}
                <div className="max-w-3xl mx-auto text-center space-y-4 leading-relaxed">
                  {/* kicker */}
                  <div
                    className={`william-section-kicker text-[11px] md:text-xs uppercase tracking-[0.18em] text-neutral-600 transition-all duration-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
                      }`}
                    style={{ transitionDelay: isVisible ? "60ms" : "0ms" }}
                  >
                    {section.kicker}
                  </div>

                  {/* optional body paragraph */}
                  {bodyText && (
                    <p
                      className={`william-body-text mt-4 whitespace-pre-line text-[12px] md:text-sm md:leading-[1.9] leading-[1.8] tracking-[0.16em] uppercase text-neutral-800 transition-all duration-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
                        }`}
                      style={{ transitionDelay: isVisible ? "180ms" : "0ms" }}
                    >
                      {bodyText}
                    </p>
                  )}
                </div>

                {/* IMAGE BLOCK */}
                <div
                  className={`mt-10 flex ${isFaceSection || isSilhouetteSection || isTattooSection
                    ? "justify-start"
                    : "justify-center"
                    }`}
                >
                  {images.length > 0 ? (
                    // A. PALETTE – single image
                    isPaletteSection && images.length === 1 ? (
                      <div className="william-basic-info-media w-full">
                        <figure className="ref-image william-basic-info-media__item bg-neutral-50 border border-neutral-200 overflow-hidden">
                          <img
                            src={images[0]}
                            alt="William colour palette"
                            className="w-full h-auto object-contain block"
                          />
                        </figure>
                        <figure className="ref-image william-basic-info-media__item bg-neutral-50 border border-neutral-200 overflow-hidden">
                          <img
                            src={williamAesthetic}
                            alt="William aesthetic reference"
                            className="w-full h-auto object-contain block"
                          />
                        </figure>
                      </div>
                    ) : (isFaceSection || isSilhouetteSection || isTattooSection) && images.length > 1 ? (
                      <div className="face-image-stack">
                        {images.map((src, idx) => {
                          const id = imageIds[idx];
                          const isSil3 = isSilhouetteSection && id === "sil3";

                          return (
                            <figure
                              key={id}
                              className={`williamBriefImage brief-${id} overflow-hidden`}
                            >
                              <img
                                src={src}
                                alt={`${section.kicker} reference ${idx + 1}`}
                                className="brief-img"
                              />
                              {isSil3 && (
                                <figcaption className="mt-2 lg:hidden text-[10px] md:text-xs uppercase tracking-[0.18em] text-neutral-500 text-center">
                                  (A): TRẦN THỊ MINH ANH
                                </figcaption>
                              )}
                            </figure>
                          );
                        })}
                      </div>
                    ) : // D. HAIR – grid
                      isHairSection ? (
                        <div className="hair-grid max-w-4xl mx-auto">
                          {images.map((src, idx) => (
                            <figure key={idx} className="hair-figure">
                              <img
                                src={src}
                                alt={`Hair style ${idx + 1}`}
                                className="brief-img"
                              />
                            </figure>
                          ))}
                        </div>
                      ) : // E. GENERIC – single image
                        images.length === 1 ? (
                          <figure className="ref-image w-full max-w-[420px] aspect-[3/4] bg-neutral-50 border border-neutral-200 overflow-hidden">
                            <img
                              src={images[0]}
                              alt={`${section.kicker} reference`}
                              className="h-full w-full object-cover"
                            />
                          </figure>
                        ) : (
                          // F. GENERIC – simple grid
                          <div className="grid grid-cols-2 gap-3">
                            {images.map((src, idx) => (
                              <figure
                                key={idx}
                                className={`williamBriefImage brief-${imageIds[idx]} overflow-hidden`}
                              >
                                <img
                                  src={src}
                                  alt={`${section.kicker} reference ${idx + 1}`}
                                  className="brief-img"
                                />
                              </figure>
                            ))}
                          </div>
                        )
                  ) : (
                    // G. NO IMAGES
                    <div className="aspect-[3/4] bg-neutral-50 border border-dashed border-neutral-200 flex items-center justify-center text-[11px] uppercase tracking-[0.16em] text-neutral-400">
                      Visual reference coming soon
                    </div>
                  )}
                </div>
                {/* ACCESSORIES STRIP – ONLY FOR HAIR SECTION */}
                {isHairSection && (
                  <div className="mt-10 relative">
                    {/* LEFT ARROW */}
                    <button
                      type="button"
                      onClick={() => scrollAccessories("left")}
                      className="scroll-arrow-btn scroll-arrow-btn--left scroll-arrow-btn--gutter md:!hidden"
                    >
                      ‹
                    </button>

                    {/* SCROLL STRIP */}
                    <div
                      ref={accStripRef}
                      className="
                      acc-strip strip-with-gutter no-scrollbar
                      flex gap-6 overflow-x-auto
                      md:overflow-x-visible
                      pl-6 pr-6
                      "
                    >
                      <figure className="acc-card">
                        <div className="acc-figure">
                          <img
                            src={williamLeftRings}
                            alt="Left hand – ring stack"
                            className="brief-img"
                          />
                        </div>
                        <figcaption className="acc-caption william-caption text-center mt-2">
                          {accessoryCaptions.leftRing}
                        </figcaption>
                      </figure>

                      <figure className="acc-card">
                        <div className="acc-figure">
                          <img
                            src={williamRightRings}
                            alt="Right hand – wedding ring"
                            className="brief-img"
                          />
                        </div>
                        <figcaption className="acc-caption text-center mt-2">
                          <figcaption className="acc-caption william-caption text-center mt-2">
                            {accessoryCaptions.rightRing}
                          </figcaption>
                        </figcaption>
                      </figure>

                      <figure className="acc-card">
                        <div className="acc-figure">
                          <img
                            src={williamLeftEarrings}
                            alt="Left ear – stack"
                            className="brief-img"
                          />
                        </div>
                        <figcaption className="acc-caption text-center mt-2">
                          {accessoryCaptions.leftEar}
                        </figcaption>
                      </figure>

                      <figure className="acc-card">
                        <div className="acc-figure">
                          <img
                            src={williamRightEarrings}
                            alt="Right ear – stack"
                            className="brief-img"
                          />
                        </div>
                        <figcaption className="acc-caption text-center mt-2">
                          {accessoryCaptions.rightEar}
                        </figcaption>
                      </figure>

                      <figure className="acc-card">
                        <div className="acc-figure">
                          <img
                            src={williamToothGem}
                            alt="Tooth gem"
                            className="brief-img"
                          />
                        </div>
                        <figcaption className="acc-caption text-center mt-2">
                          {accessoryCaptions.toothGem}
                        </figcaption>
                      </figure>
                    </div>


                    {/* RIGHT ARROW */}
                    <button
                      type="button"
                      onClick={() => scrollAccessories("right")}
                      className="scroll-arrow-btn scroll-arrow-btn--right scroll-arrow-btn--gutter md:!hidden"
                    >
                      ›
                    </button>
                  </div>
                )}
              </section>
            );
          })}


        </div>
        {/* WILLIAM SOLO COMMISSIONS GALLERY */}
        <section id="gallery" className="commission-gallery mt-20">
          <h3 className="commission-gallery-title">
            William – Solo Commissions
          </h3>

          <div className="mt-10 relative">
            {/* LEFT ARROW */}
            <button
              type="button"
              onClick={() => scrollGallery("left")}
              className="scroll-arrow-btn scroll-arrow-btn--left scroll-arrow-btn--gutter"
            >
              ‹
            </button>

            {/* STRIP */}
            <div
              ref={galleryStripRef}
              className="gallery-strip strip-with-gutter no-scrollbar"
            >
              {williamSoloGallery.map((item, idx) => (
                <figure key={idx} className="gallery-card figure-zoom">
                  <button
                    type="button"
                    className="gallery-card-button"
                    onClick={() =>
                      setSelectedGalleryImage({
                        src: item.src,
                        alt: `William solo commission by ${item.artist}`,
                        caption: item.artist,
                      })
                    }
                    aria-label={`Open William solo commission by ${item.artist}`}
                  >
                    <div className="gallery-figure">
                      <img
                        src={item.src}
                        alt={`William solo commission by ${item.artist}`}
                        className="gallery-img"
                      />
                    </div>
                  </button>
                  <figcaption className="gallery-caption">
                    <span className="gallery-caption-artist william-caption">
                      {item.artist}
                    </span>
                  </figcaption>
                </figure>
              ))}
            </div>

            {/* RIGHT ARROW */}
            <button
              type="button"
              onClick={() => scrollGallery("right")}
              className="scroll-arrow-btn scroll-arrow-btn--right scroll-arrow-btn--gutter"
            >
              ›
            </button>
          </div>
        </section>

        <Link
          to={backHref}
          className="block mt-12 text-sm uppercase tracking-[0.16em] text-neutral-700 hover:text-neutral-900 transition"
        >
          {t.back}
        </Link>

        <GalleryLightbox
          image={selectedGalleryImage}
          onClose={() => setSelectedGalleryImage(null)}
        />
      </div>
    </HeroScrollPage>
  );
}
