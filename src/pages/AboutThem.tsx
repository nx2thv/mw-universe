import "./about-them.css";
import { Link } from "react-router-dom";
import { useLanguage } from "../LanguageContext";
import PageCredit from "../components/PageCredit";

type ArchiveKey = "story" | "au";

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
  { left: "16%", top: "48%", size: "2px", duration: "23s", delay: "-13s", driftX: "14px", driftY: "-24px" },
  { left: "44%", top: "58%", size: "3px", duration: "25s", delay: "-8s", driftX: "-12px", driftY: "-30px" },
  { left: "72%", top: "46%", size: "2px", duration: "21s", delay: "-5s", driftX: "16px", driftY: "-18px" },
  { left: "58%", top: "10%", size: "2px", duration: "27s", delay: "-15s", driftX: "-8px", driftY: "-24px" },
  { left: "30%", top: "90%", size: "3px", duration: "29s", delay: "-12s", driftX: "18px", driftY: "-36px" },
];

const translations = {
  en: {
    title: "To my Beloved",
    prompt: "Choose your path.",
    archives: {
      story: "Their Story",
      au: "AU Archive",
    },
  },
  vi: {
    title: "Gửi người tôi yêu",
    prompt: "Chọn một trong hai.",
    archives: {
      story: "Chuyện của họ",
      au: "Vũ trụ khác",
    },
  },
} as const;

const archiveOrder: ArchiveKey[] = ["story", "au"];

function splitTitleIntoLines(title: string, wordsPerLine: number) {
  const words = title.trim().split(/\s+/).filter(Boolean);
  const lines: string[] = [];

  for (let index = 0; index < words.length; index += wordsPerLine) {
    lines.push(words.slice(index, index + wordsPerLine).join(" "));
  }

  return lines;
}

export default function AboutThem() {
  const { language } = useLanguage();
  const t = translations[language] || translations.en;
  const titleLines = splitTitleIntoLines(t.title, 3);

  return (
    <main className="about-portal relative min-h-screen overflow-hidden bg-[#090808] text-[#f2ede2] flex flex-col">
      <div className="about-portal__vignette pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="about-portal__grain pointer-events-none absolute inset-0" aria-hidden="true" />

      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
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

      <section className="relative z-10 flex flex-1 items-center justify-center px-6 pt-12 pb-20 sm:px-8 sm:pb-24">
        <div className="w-full max-w-4xl text-center">
          <div className="flex flex-col items-center">
            <h1 className="about-portal__title portal-fade-up text-[#f6f1e8]">
              {titleLines.map((line, index) => (
                <span key={`${line}-${index}`} className="about-portal__title-line">
                  {line}
                </span>
              ))}
            </h1>
          </div>

          <div className="mt-8 flex flex-col items-center gap-6 sm:mt-10 sm:gap-7">
            <p className="about-portal__prompt portal-fade-up portal-fade-up--prompt text-[0.76rem] uppercase tracking-[0.3em] text-[#bcae9b]/72 sm:text-[0.82rem]">
              {t.prompt}
            </p>

            <div
              className="portal-fade-up portal-fade-up--choices flex flex-wrap items-center justify-center gap-x-4 gap-y-3 text-[1.15rem] text-[#eadfce]/86 sm:text-[1.38rem]"
              aria-label="Archive choices"
            >
              {archiveOrder.map((archiveKey, index) => {
                const href = archiveKey === "story" ? "/them/story" : "/them/au";

                return (
                  <div key={archiveKey} className="contents">
                    {index > 0 ? (
                      <span className="about-portal__choice-separator" aria-hidden="true">
                        /
                      </span>
                    ) : null}

                    <Link
                      to={href}
                      className="about-portal__choice-link"
                    >
                      {t.archives[archiveKey]}
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
      <div className="relative z-10 px-6 pb-6 sm:pb-8">
        <PageCredit tone="on-dark" className="page-credit--bottom" />
      </div>
    </main>
  );
}
