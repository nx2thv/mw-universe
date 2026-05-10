import { useEffect, useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import scrollArrow from "../../assets/lottie/Arrow Down Pulse.json";

type Props = {
  backHref?: string;
  backgroundImage: string;
  kicker: string;
  title: string;
  subtitle: string;
  children: ReactNode;
  backLabel?: string;
  bodyClassName?: string;
  gradientOverlayClassName?: string;
  bottomOverlayClassName?: string;
  showArrow?: boolean;
  showHero?: boolean;
  pageClassName?: string;
};

export default function HeroScrollPage({
  backHref,
  backgroundImage,
  kicker,
  title,
  subtitle,
  children,
  backLabel = "← Back",
  bodyClassName,
  gradientOverlayClassName,
  bottomOverlayClassName,
  showArrow = true,
  showHero = true,
  pageClassName,
}: Props) {
  const [arrowVisible, setArrowVisible] = useState(showArrow);

  useEffect(() => {
    setArrowVisible(showArrow);
  }, [showArrow]);

  const firstOverlayClass =
    gradientOverlayClassName ||
    "absolute inset-0 bg-gradient-to-r from-[#0c1117]/92 via-[#0f1720]/88 to-[#1c2633]/82";
  const secondOverlayClass =
    bottomOverlayClassName || "absolute inset-0 bg-gradient-to-b from-black/15 via-transparent to-black/25";

  const bodyContent = bodyClassName ? <div className={bodyClassName}>{children}</div> : children;
  const mainClassName = `min-h-screen ${pageClassName ?? "bg-[#050608] text-[#e9edf3]"}`;

  return (
    <main className={mainClassName}>
      {showHero && (
        <section className="relative isolate z-40 w-full min-h-screen overflow-hidden bg-[#0c1117] text-white">
          <img
            src={backgroundImage}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
            style={{ opacity: 0.08 }}
          />
          <div className={firstOverlayClass} />
          <div className={secondOverlayClass} />
          <div className="relative max-w-6xl mx-auto px-6 md:px-12 flex min-h-screen flex-col items-center justify-center text-center gap-3 py-16">
            <p className="uppercase tracking-[0.16em] text-[#a7b0bf] text-xs md:text-sm">{kicker}</p>
            <h1 className="font-black leading-tight tracking-tight text-4xl md:text-5xl">{title}</h1>
            <p className="font-semibold text-[#c7cfd7] text-lg md:text-2xl">{subtitle}</p>
            {backHref ? (
              <Link
                to={backHref}
                className="absolute right-6 md:right-10 top-1/2 -translate-y-1/2 hidden sm:inline-flex font-semibold text-[#d5dcff] hover:text-white transition text-sm opacity-80"
              >
                {backLabel}
              </Link>
            ) : null}

            {arrowVisible && (
              <Lottie
                animationData={scrollArrow}
                loop
                autoplay
                className="pointer-events-none absolute scroll-arrow"
                onError={() => setArrowVisible(false)}
              />
            )}
          </div>
        </section>
      )}

      {bodyContent}
    </main>
  );
}
