import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import comingSoonAnim from "../../assets/lottie/aboutThemComingSoon.json";
import { useLanguage } from "../LanguageContext";

export default function AboutThem() {
  const { language } = useLanguage();

  const translations = {
    en: {
      title: "About Them",
      subtitle: "Vivian is crying while working.\n Please be patient.",
      body: "Please go back and enjoy the rest of the page : D.",
      back: "← Back home",
    },
    vi: {
      title: "Về hai ảnh",
      subtitle: "Tui đang vừa khóc vừa code cái page này.\n Mọi người đợi tui xíu nha.",
      body: "Quay lại home coi cái khác ik : D.",
      back: "← Về trang chủ",
    },
  } as const;

  const t = translations[language] || translations.en;

  return (
    <main className="min-h-screen bg-white text-slate-100 flex flex-col">
      <section className="flex-1 flex flex-col items-center justify-center px-6 py-12 text-center">
        <div className="w-56 h-56 md:w-72 md:h-72 mb-6">
          <Lottie
            animationData={comingSoonAnim}
            loop
            className="w-full h-full"
          />
        </div>

        <h2 className="text-base md:text-lg font-semibold tracking-[0.16em] uppercase text-slate-100">
          {t.subtitle}
        </h2>

        <p className="mt-4 max-w-xl text-xs md:text-sm leading-relaxed text-slate-300">
          {t.body}
        </p>

        <Link
          to="/"
          className="mt-8 inline-block text-xs md:text-sm uppercase tracking-[0.18em] text-slate-300 hover:text-white transition"
        >
          {t.back}
        </Link>
      </section>
    </main>
  );
}