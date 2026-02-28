import { useLanguage } from "../LanguageContext";

export default function Footer() {
  const { language } = useLanguage();

  const translations = {
    en: {
      line1: "Created to honor the story, the craft, and the characters.",
      line2: "Marcus Hayes & William Cartier © Vivian Nguyeenx.",
    },
    vi: {
      line1: "Được tạo dựng để tôn vinh câu chuyện, nghệ thuật, và linh hồn nhân vật.",
      line2: "Marcus Hayes & William Cartier © Vivian Nguyeenx.",
    },
  } as const;

  const t = translations[language] || translations.en;

  return (
    <footer className="w-full bg-[#e5e7eb] border-t border-slate-300 text-center py-5 text-[0.75rem] tracking-[0.18em] text-slate-700">
      <p>{t.line1}</p>
      <p className="mt-1">{t.line2}</p>
    </footer>
  );
}