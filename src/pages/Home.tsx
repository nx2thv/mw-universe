import { useEffect, useState, type CSSProperties, type MouseEvent } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../LanguageContext";
import TosModal from "../components/TosModal";
import williamAesthetic from "../../assets/williamAesthetic.jpeg";
import marcusAesthetic from "../../assets/marcusAesthetic.jpeg";

type PaneKey = "marcus" | "william";

export default function Home() {
  const [showTos, setShowTos] = useState(false);
  const [activePane, setActivePane] = useState<PaneKey | null>(null);

  useEffect(() => {
    const accepted = localStorage.getItem("tosAccepted");
    if (!accepted) {
      setShowTos(true);
    }
  }, []);

  function handleAcceptTos() {
    localStorage.setItem("tosAccepted", "true");
    setShowTos(false);
  }

  const { language } = useLanguage();

  const translations = {
    en: {
      title: "Mr. Hayes & Mr. Cartier-Hayes",
      prompt: "Two husbands. Zero peace.",
      marcus: {
        name: "Marcus",
        quote: "Discipline is habit, not heroism.",
      },
      william: {
        name: "William",
        quote: "High fashion. Higher standards.",
      },
    },
    vi: {
      title: "Mr. Hayes & Mr. Cartier-Hayes",
      prompt: "Two husbands. Zero Peace",
      marcus: {
        name: "Marcus",
        quote: "Discipline is habit, not heroism.",
      },
      william: {
        name: "William",
        quote: "High fashion. Higher standards.",
      },
    },
  } as const;

  const t = translations[language] || translations.en;
  const isMarcusActive = activePane === "marcus";
  const isWilliamActive = activePane === "william";
  const marcusPaneStyle = {
    clipPath: `polygon(0 0, 100% 0, 100% 100%, 0 100%)`,
    WebkitClipPath: `polygon(0 0, 100% 0, 100% 100%, 0 100%)`,
  } as CSSProperties;
  const williamPaneStyle = {
    clipPath: `polygon(100% 0%, 100% 100%, 0 100%, 0 100%)`,
    WebkitClipPath: `polygon(100% 0%, 100% 100%, 0 100%, 0 100%)`,
  } as CSSProperties;

  const handlePaneClick =
    (pane: PaneKey) => (event: MouseEvent<HTMLAnchorElement>) => {
      if (activePane !== pane) {
        event.preventDefault();
        setActivePane(pane);
      }
    };

  return (
    <>
      {showTos && <TosModal onAccept={handleAcceptTos} />}
      <main className="home-split-home" onMouseLeave={() => setActivePane(null)}>
        <div className="home-split-stage">
          <Link
            to="/marcus"
            className={`home-split-pane home-split-pane--marcus ${isMarcusActive ? "is-active" : ""}`}
            style={marcusPaneStyle}
            onMouseEnter={() => setActivePane("marcus")}
            onFocus={() => setActivePane("marcus")}
            onTouchStart={() => setActivePane("marcus")}
            onClick={handlePaneClick("marcus")}
          >
            <img
              src={marcusAesthetic}
              alt="Marcus Hayes portrait"
              className="home-split-image"
            />
            <span className="home-split-shade" aria-hidden="true" />
            <div className="home-split-copy home-split-copy--marcus">
              <h1 className="home-split-name">{t.marcus.name}</h1>
              <p className="home-split-quote">"{t.marcus.quote}"</p>
            </div>
          </Link>

          <Link
            to="/william"
            className={`home-split-pane home-split-pane--william ${isWilliamActive ? "is-active" : ""}`}
            style={williamPaneStyle}
            onMouseEnter={() => setActivePane("william")}
            onFocus={() => setActivePane("william")}
            onTouchStart={() => setActivePane("william")}
            onClick={handlePaneClick("william")}
          >
            <img
              src={williamAesthetic}
              alt="William Cartier portrait"
              className="home-split-image"
            />
            <span className="home-split-shade" aria-hidden="true" />
            <div className="home-split-copy home-split-copy--william">
              <h1 className="home-split-name">{t.william.name}</h1>
              <p className="home-split-quote">"{t.william.quote}"</p>
            </div>
          </Link>

          <div className="home-split-center-copy" aria-hidden="true">
            <p className="home-split-title">{t.title}</p>
            <p className="home-split-prompt">{t.prompt}</p>
          </div>
        </div>
      </main>
    </>
  );
}
