import "./about-them.css";
import { useLanguage } from "../LanguageContext";
import PageCredit from "../components/PageCredit";

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

const translations = {
  en: {
    title: "AU Archive",
    prompt: "Archive index is being prepared.",
  },
  vi: {
    title: "Vũ trụ khác",
    prompt: "Kho lưu trữ đang được chuẩn bị.",
  },
} as const;

export default function AuArchive() {
  const { language } = useLanguage();
  const t = translations[language] || translations.en;

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
          <h1 className="about-portal__title portal-fade-up text-[#f6f1e8]">{t.title}</h1>
          <p className="about-portal__prompt portal-fade-up portal-fade-up--prompt text-[0.76rem] uppercase tracking-[0.3em] text-[#bcae9b]/72 sm:text-[0.82rem]">
            {t.prompt}
          </p>
        </div>
      </section>

      <div className="relative z-10 px-6 pb-6 sm:pb-8">
        <PageCredit tone="on-dark" className="page-credit--bottom" />
      </div>
    </main>
  );
}
