import { useBriefReveals } from "../lib/useBriefReveals";
import { useEffect, useMemo, useRef, useState } from "react";
import williamBriefPage from "../../assets/williamBriefPage.jpeg";
import FloatingSoundtrackBar from "../components/FloatingSoundtrackBar";
import HeroScrollPage from "../components/HeroScrollPage";
import GalleryLightbox, {
  type GalleryLightboxImage,
} from "../components/GalleryLightbox";
import PageCredit from "../components/PageCredit";
import { useLanguage } from "../LanguageContext";
import { getGalleryItems } from "../lib/galleryItems";
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
import williamTattooPlacement1 from "../../assets/optimized/williamTattooPlacement1.webp";
import williamTattoo2 from "../../assets/williamTattoo2.jpeg";
import williamTattooPlacement2 from "../../assets/williamTattooPlacement2.jpeg";
import williamTattooPlacement21 from "../../assets/williamTattooPlacement21.jpeg";
import williamGallery1 from "../../assets/optimized/williamGallery1.webp";
import williamGallery2 from "../../assets/optimized/williamGallery2.webp";
import williamGallery3 from "../../assets/williamGallery3.jpeg";
import williamGallery4 from "../../assets/optimized/williamGallery4.webp";
import williamGallery5 from "../../assets/WilliamCartier.jpeg";
import williamGallery6 from "../../assets/optimized/williamGallery6.webp"
import williamGallery7 from "../../assets/optimized/williamGallery7.webp";
import williamGallery8 from "../../assets/optimized/williamGallery8.webp";
import williamAesthetic from "../../assets/optimized/williamAesthetic.webp";

type SectionBullet = string | { title: string; detail: string[] };

type Section = {
  id: string;
  kicker: string;
  body?: string;
  bullets?: SectionBullet[];
};

const williamPlaylistEmbedUrl =
  "https://open.spotify.com/embed/playlist/4nFTksip42Gbu3jOcGnu3Q?utm_source=generator&theme=0";

export default function WilliamBriefPage() {
  const { language } = useLanguage();
  const scrollRootRef = useRef<HTMLDivElement | null>(null);
  useBriefReveals(scrollRootRef, ".william-section-kicker, .william-body-text, .william-section > .mt-10:not(:has(.william-stagger-item)), .william-stagger-item");
  const [activeAnchor, setActiveAnchor] = useState("basic-info");
  const [chapterOpen, setChapterOpen] = useState(false);
  const [selectedGalleryImage, setSelectedGalleryImage] =
    useState<GalleryLightboxImage | null>(null);
  const [supabaseWilliamGallery, setSupabaseWilliamGallery] = useState<
    { id: string; src: string; artist: string }[]
  >([]);

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

  // Track chapters within the contained vertical scroll panel.
  useEffect(() => {
    const scrollRoot = scrollRootRef.current;
    if (!scrollRoot) return;
    let activeFrame = 0;

    const updateActiveChapter = () => {
      activeFrame = 0;
      const targets = Array.from(
        scrollRoot.querySelectorAll<HTMLElement>("[data-section-index], #gallery")
      );
      if (!targets.length) return;

      const rootTop = scrollRoot.getBoundingClientRect().top;
      const readLine = rootTop + scrollRoot.clientHeight * 0.38;
      const isNearPageEnd =
        scrollRoot.scrollTop + scrollRoot.clientHeight >=
        scrollRoot.scrollHeight - 16;

      if (isNearPageEnd) {
        setActiveAnchor("gallery");
        return;
      }

      const current = targets.reduce((active, target) => {
        const rect = target.getBoundingClientRect();
        if (rect.top <= readLine && rect.bottom > rootTop) {
          return target;
        }
        return active;
      }, targets[0]);

      if (current.id) {
        setActiveAnchor(current.id);
      }
    };

    const queueActiveChapterUpdate = () => {
      if (activeFrame) return;
      activeFrame = window.requestAnimationFrame(updateActiveChapter);
    };

    queueActiveChapterUpdate();
    scrollRoot.addEventListener("scroll", queueActiveChapterUpdate, { passive: true });
    window.addEventListener("resize", queueActiveChapterUpdate);

    return () => {
      if (activeFrame) {
        window.cancelAnimationFrame(activeFrame);
      }
      scrollRoot.removeEventListener("scroll", queueActiveChapterUpdate);
      window.removeEventListener("resize", queueActiveChapterUpdate);
    };
  }, []);

  useEffect(() => {
    let isMounted = true;

    async function fetchSupabaseWilliamGallery() {
      try {
        const rows = await getGalleryItems("william_gallery");
        if (!isMounted) return;
        setSupabaseWilliamGallery(
          rows.map((row) => {
            const artistBase = row.artistCredit.trim().length > 0
              ? row.artistCredit.trim()
              : "Unknown";
            const artist = artistBase.startsWith("(A)")
              ? artistBase
              : `(A): ${artistBase}`;

            return {
              id: `supabase-${row.id}`,
              src: row.src,
              artist,
            };
          }),
        );
      } catch (error) {
        console.error("Failed to load William gallery items from Supabase.", error);
      }
    }

    fetchSupabaseWilliamGallery();

    return () => {
      isMounted = false;
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
      quote: "\"High fashion. Higher standards.\"",
      quoteName: "Mr. William Cartier-Hayes",
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
            "William's hair is essentially a refined, modern wolfcut.\n" +
            "The back is longer and softly curled at the nape of his neck.\n" +
            "While the front has styled bangs that frame his face.",
            "He switches between two looks:",
            "First style: Soft front bang with a loose, effortless knot at the back.\n" +
            "(See the first row of reference images.)",
            "Second style: Same cut, but without the knot. The wolfcut flows naturally.\n" +
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
      quote: "\"High fashion. Higher standards.\"",
      quoteName: "Mr. William Cartier-Hayes",
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
            "Cách vẽ:\n tóc hơi hướng theo kiểu wolfcut.\n tóc dài đến tầm gáy, lọn tóc mềm, hơi rối ôm sát lại gáy.\n có mái ở phía trước tạo khung cho khuôn mặt.",
            "Có 2 kiểu tóc:",
            "Kiểu 1: tóc buộc hờ phía sau\n (xem 2 ảnh ở dòng đầu tiên)",
            "Kiểu 2: tóc khi không buộc\nnên để cho tóc ôm sát lại gáy hơn\n (xem 2 ảnh ở dòng thứ hai)",
            "Phụ kiện:\ncó khuyên ngực.\n còn lại xem dòng cuối.\n"
          ],
        },
        {
          id: "silhouette",
          kicker: "D. Dáng người & khí chất chung",
          bullets: [
            "Tay:\n ngón tay dài và mảnh — dáng tay của người ít khi làm việc nặng.\n gân nổi nhẹ, khớp xương mảnh mai.",
            "Vai:\n gầy, tinh tế nhưng vẫn hơi vuông để không quá nữ tính.\n xương quai xanh lộ rõ, nằm nông duới da.\n có tàn nhang trên xương quai xanh.",
            "Eo và hông:\n Eo bé, tầm 23 inches/58-59cm.\nHông hẹp và gọn.",
            "Chân:\n dài, thon, đùi to vừa đủ và săn chắc.\n bắp chân hơi có cơ để không quá yếu đuối.\nKiểu như quả chân của Bella Hadid.",
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
  const chapterLabelsByLang: Record<"en" | "vi", Record<string, string>> = {
    en: {
      "basic info": "Snapshot",
      face: "Face",
      "hair and stuffs": "Hair & Acc",
      silhouette: "Build",
      tatts: "Ink",
    },
    vi: {
      "basic info": "Tổng quan",
      face: "Gương mặt",
      "hair and stuffs": "Tạo hình",
      silhouette: "Dáng người",
      tatts: "Hình xăm",
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
      label: "Gallery",
    },
  ];
  const activeChapterLabel =
    chapterItems.find((item) => item.anchor === activeAnchor)?.label ?? chapterItems[0]?.label ?? "Chapter";

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

  const localWilliamSoloGallery: { id: string; src: string; artist: string }[] = [
    {
      id: "local-1",
      src: williamGallery5,
      artist: "(A): The Breadsident",
    },
    {
      id: "local-2",
      src: williamGallery8,
      artist: "(A): Lê Ly",
    },
    {
      id: "local-3",
      src: williamGallery7,
      artist: "(A): Tinh Tú",
    },
    {
      id: "local-4",
      src: williamGallery3,
      artist: "(A): ihn.",
    },
    {
      id: "local-5",
      src: williamGallery4,
      artist: "(A): Tô Nghi",
    },
    {
      id: "local-6",
      src: williamGallery6,
      artist: "(A): Đẹptrai Giaiđoạncuối",
    },
    {
      id: "local-7",
      src: williamGallery2,
      artist: "(A): Bảo Khánhh",
    },
    {
      id: "local-8",
      src: williamGallery1,
      artist: "(A): ihn.",
    },
  ];
  const williamSoloGallery = useMemo(
    () => [...localWilliamSoloGallery, ...supabaseWilliamGallery],
    [supabaseWilliamGallery],
  );


  const handleChapterJump = (anchor: string) => {
    const scrollRoot = scrollRootRef.current;
    const target = document.getElementById(anchor);
    if (scrollRoot && target) {
      scrollRoot.scrollTo({
        top: scrollRoot.scrollTop + target.getBoundingClientRect().top - scrollRoot.getBoundingClientRect().top,
        behavior: "smooth",
      });
      setActiveAnchor(anchor);
    }
  };

  return (
    <div
      ref={scrollRootRef}
      className="william-scroll-viewport"
      style={selectedGalleryImage ? { overflowY: "hidden" } : undefined}
    >
    <HeroScrollPage
      backgroundImage={williamBriefPage}
      kicker=""
      title=""
      subtitle=""
      showHero={false}
      pageClassName="william-brief-page"
      bodyClassName="william-brief-body scroll-smooth"
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

      <section className="border-t border-neutral-200 min-h-[120vh] flex flex-col items-center justify-center px-4">
        <div className="max-w-2xl mx-auto text-center">
          <p className="william-intro-name mt-2 uppercase tracking-[0.2em]">
            {t.quoteName}
          </p>
          <p className="william-intro-quote whitespace-pre-line">
            {t.quote}
          </p>
        </div>
      </section>

      <div className="william-brief-content william-brief-content-shell max-w-6xl mx-auto px-6 md:px-10 lg:px-16 py-12 md:py-16">
        <div className="brief-chapter-layout brief-chapter-layout--light">
          <aside className="brief-chapter-rail" aria-label="William sections">
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
            <div className="william-content-divider h-px w-full opacity-80 rounded-full" />
            {/* sections */}
            <div className="space-y-28 md:space-y-36">
              {sectionAnchors.map((section, sectionIndex) => {
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
                    className={`william-section py-16 lg:py-24  is-visible`}
                  >
                    {/* TEXT BLOCK */}
                    <div className="max-w-3xl mx-auto text-center space-y-4 leading-relaxed">
                      {/* kicker */}
                      <div
                        className={`william-section-kicker text-[11px] md:text-xs uppercase tracking-[0.18em] text-neutral-600  `}
                      >
                        {section.kicker}
                      </div>

                      {/* optional body paragraph */}
                      {bodyText && (
                        <p
                          className={`william-body-text mt-4 whitespace-pre-line text-[12px] md:text-sm md:leading-[1.9] leading-[1.8] tracking-[0.16em] uppercase text-neutral-800  `}
                        >
                          {bodyText}
                        </p>
                      )}
                    </div>

                    {/* IMAGE BLOCK */}
                    <div
                      className={`mt-10 flex   ${isFaceSection || isSilhouetteSection || isTattooSection
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
                            <div className="william-basic-info-media__playlist">
                              <FloatingSoundtrackBar
                                title="William's soundtrack"
                                embedUrl={williamPlaylistEmbedUrl}
                              />
                            </div>
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
                                <figure
                                  key={idx}
                                  className={`hair-figure william-hair-figure--stagger william-stagger-item william-stagger-item--${idx + 1}`}
                                >
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
                          className="scroll-arrow-btn scroll-arrow-btn--left scroll-arrow-btn--gutter"
                        >
                          ‹
                        </button>

                        {/* SCROLL STRIP */}
                        <div
                          ref={accStripRef}
                          className="
                      acc-strip strip-with-gutter no-scrollbar
                      flex gap-6 overflow-x-auto
                      pl-6 pr-6
                      "
                        >
                          <figure className="acc-card william-accessory-card--stagger william-stagger-item william-stagger-item--1">
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

                          <figure className="acc-card william-accessory-card--stagger william-stagger-item william-stagger-item--2">
                            <div className="acc-figure">
                              <img
                                src={williamRightRings}
                                alt="Right hand – wedding ring"
                                className="brief-img"
                              />
                            </div>
                            <figcaption className="acc-caption william-caption text-center mt-2">
                              {accessoryCaptions.rightRing}
                            </figcaption>
                          </figure>

                          <figure className="acc-card william-accessory-card--stagger william-stagger-item william-stagger-item--3">
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

                          <figure className="acc-card william-accessory-card--stagger william-stagger-item william-stagger-item--4">
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

                          <figure className="acc-card william-accessory-card--stagger william-stagger-item william-stagger-item--5">
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
                          className="scroll-arrow-btn scroll-arrow-btn--right scroll-arrow-btn--gutter"
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
            <section id="gallery" className="commission-gallery william-gallery-section mt-20">
              <h3 className="commission-gallery-title text-slate-100">
                Gallery
              </h3>

              <div className="mt-8 relative">
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
                  {williamSoloGallery.map((item) => (
                    <figure key={item.id} className="gallery-card figure-zoom">
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
                            loading="lazy"
                            decoding="async"
                          />
                        </div>
                      </button>
                      <figcaption className="gallery-caption">
                        <span className="gallery-caption-artist text-slate-300">
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
            <GalleryLightbox
              image={selectedGalleryImage}
              onClose={() => setSelectedGalleryImage(null)}
            />
          </div>
        </div>
        <PageCredit tone="on-dark" />
      </div>
    </HeroScrollPage>
    </div>
  );
}
