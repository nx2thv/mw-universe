import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import UniversalTopBar from "../components/UniversalTopBar";
import { useLanguage } from "../LanguageContext";
import { resolveBriefUrl } from "../lib/briefLinks";
import { runRouteTransition } from "../lib/routeTransitions";
import { supabase } from "../lib/supabaseClients";
import { normalizeCharacter } from "../data/commissionIdeas";
import PageCredit from "../components/PageCredit";

type CharacterParam = "william" | "marcus" | "couple";
type ResolvedContextLink = {
  href: string;
  label?: string;
};
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
  { left: "9%", top: "20%", size: "2px", duration: "21s", delay: "-4s", driftX: "14px", driftY: "-24px" },
  { left: "22%", top: "70%", size: "2px", duration: "28s", delay: "-11s", driftX: "-10px", driftY: "-34px" },
  { left: "37%", top: "28%", size: "3px", duration: "24s", delay: "-7s", driftX: "13px", driftY: "-21px" },
  { left: "54%", top: "78%", size: "2px", duration: "32s", delay: "-15s", driftX: "-12px", driftY: "-39px" },
  { left: "66%", top: "17%", size: "2px", duration: "20s", delay: "-5s", driftX: "17px", driftY: "-18px" },
  { left: "79%", top: "58%", size: "2px", duration: "25s", delay: "-12s", driftX: "-15px", driftY: "-26px" },
  { left: "90%", top: "33%", size: "2px", duration: "23s", delay: "-8s", driftX: "9px", driftY: "-20px" },
];

function isInternalPath(href: string) {
  return /^\/(?!\/)/.test(href);
}

function normalizeOptionalText(value?: string | null) {
  const trimmed = value?.trim();
  return trimmed || null;
}

export default function BriefLoadingPage() {
  const { language } = useLanguage();
  const [searchParams] = useSearchParams();
  const [openingCommissionHref, setOpeningCommissionHref] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [auPath, setAuPath] = useState<string | null>(null);
  const [includeMainStory, setIncludeMainStory] = useState(true);
  const [characterComment, setCharacterComment] = useState<string | null>(null);
  const [backgroundComment, setBackgroundComment] = useState<string | null>(null);
  const [commissionComment, setCommissionComment] = useState<string | null>(null);

  const briefRef = searchParams.get("brief") || "";
  const expiresIn = Number(searchParams.get("expiresIn") || "86400");
  const ideaTitle = searchParams.get("ideaTitle");
  const ideaId = searchParams.get("ideaId");
  const character = searchParams.get("character");
  const normalizedCharacter: CharacterParam | null =
    character === "william" || character === "marcus" || character === "couple"
      ? character
      : null;
  const [resolvedBriefRef, setResolvedBriefRef] = useState(briefRef);
  const [resolvedCharacter, setResolvedCharacter] = useState<CharacterParam | null>(normalizedCharacter);

  const t = language === "vi"
    ? {
      language: "Ngôn ngữ",
      heading: "Tổng Hợp",
      subheading: "những điều artist cần biết trước khi vẽ comm",
      cardBackground: "Bối cảnh",
      cardCommission: "Commission brief",
      cardCharacter: "Nhân vật",
      openCommission: "Mở brief của cms →",
      openingLabel: "Opening...",
      noBrief: "Missing brief reference.",
      openError: "Could not open this brief right now.",
      william: "William →",
      marcus: "Marcus →",
      mainUniverse: "Vũ trụ chính →",
      au: "AU →",
    }
    : {
      language: "Language",
      heading: "Combination",
      subheading: "of refs artist need to know before drawing the commission",
      cardBackground: "Context",
      cardCommission: "Commission brief",
      cardCharacter: "Character(s)",
      openCommission: "Open commission brief →",
      openingLabel: "Opening...",
      noBrief: "Missing brief reference.",
      openError: "Could not open this brief right now.",
      william: "William →",
      marcus: "Marcus →",
      mainUniverse: "Main universe →",
      au: "AU →",
    };

  useEffect(() => {
    let cancelled = false;

    async function fetchIdeaContext() {
      if (!ideaId) return;

      const { data, error } = await supabase
        .from("commission_ideas")
        .select("brief_path, character, au_path, include_main_story, character_comment, background_comment, commission_comment")
        .eq("id", ideaId)
        .maybeSingle<{
          brief_path: string;
          character: string | null;
          au_path: string | null;
          include_main_story: boolean | null;
          character_comment: string | null;
          background_comment: string | null;
          commission_comment: string | null;
        }>();

      if (cancelled) return;
      if (error) {
        console.error("Could not fetch idea context links:", error.message);
        return;
      }
      if (!data) return;

      if (data.brief_path?.trim()) {
        setResolvedBriefRef(data.brief_path.trim());
      }
      setAuPath(data.au_path?.trim() || null);
      setIncludeMainStory(data.include_main_story ?? true);
      setCharacterComment(normalizeOptionalText(data.character_comment));
      setBackgroundComment(normalizeOptionalText(data.background_comment));
      setCommissionComment(normalizeOptionalText(data.commission_comment));

      const dbCharacter = normalizeCharacter(data.character);
      if (dbCharacter === "william" || dbCharacter === "marcus" || dbCharacter === "couple") {
        setResolvedCharacter(dbCharacter);
      }
    }

    fetchIdeaContext();
    return () => {
      cancelled = true;
    };
  }, [ideaId]);

  const fallbackCharacterLinks = useMemo<ResolvedContextLink[]>(() => {
    if (resolvedCharacter === "william") return [{ href: "/william", label: t.william }];
    if (resolvedCharacter === "marcus") return [{ href: "/marcus", label: t.marcus }];
    return [
      { href: "/william", label: t.william },
      { href: "/marcus", label: t.marcus },
    ];
  }, [resolvedCharacter, t.marcus, t.william]);

  const shouldShowBackgroundCard = resolvedCharacter === "couple" || resolvedCharacter === null;
  const hasAuPath = Boolean(auPath);
  const backgroundLinks = useMemo<ResolvedContextLink[]>(() => {
    if (!shouldShowBackgroundCard) return [];

    const links: ResolvedContextLink[] = [];
    if (includeMainStory) {
      links.push({ href: "/story", label: t.mainUniverse });
    }
    if (hasAuPath && auPath) {
      links.push({ href: auPath, label: t.au });
    }

    return links;
  }, [auPath, hasAuPath, includeMainStory, shouldShowBackgroundCard, t.au, t.mainUniverse]);
  const characterLinks = fallbackCharacterLinks;
  const commissionLinks = resolvedBriefRef.trim()
    ? [{ href: resolvedBriefRef, label: t.openCommission }]
    : [];

  const hasCommissionLinks = commissionLinks.length > 0;
  const displayedCommissionLinks = hasCommissionLinks ? commissionLinks : [{ href: "", label: t.openCommission }];
  const commissionCardNumber = shouldShowBackgroundCard ? "03" : "02";
  const commissionAnimationDelay = shouldShowBackgroundCard ? "270ms" : "170ms";

  const openContextLink = async (href: string) => {
    if (!href.trim()) return;
    setErrorMessage(null);

    if (isInternalPath(href)) {
      runRouteTransition(href);
      return;
    }

    if (/^https?:\/\//i.test(href)) {
      window.open(href, "_blank", "noopener,noreferrer");
      return;
    }

    try {
      const signedUrl = await resolveBriefUrl(href, expiresIn);
      window.open(signedUrl, "_blank", "noopener,noreferrer");
    } catch (error) {
      console.error("Could not open context link:", error);
      setErrorMessage(t.openError);
    }
  };

  const handleOpenCommission = async (href: string) => {
    if (!href.trim()) {
      setErrorMessage(t.noBrief);
      return;
    }

    setErrorMessage(null);
    setOpeningCommissionHref(href);

    const openingUrl = new URL("/brief-opening", window.location.origin);
    openingUrl.searchParams.set("brief", href);
    openingUrl.searchParams.set("expiresIn", String(expiresIn));

    const popup = window.open(openingUrl.toString(), "_blank");
    if (popup) {
      popup.opener = null;
      setOpeningCommissionHref(null);
      return;
    }

    runRouteTransition(openingUrl.toString());
  };

  return (
    <main className="home-journey-page brief-portal-page">
      <div className="home-journey-ui">
        <UniversalTopBar embedded languageLabel={t.language} />
      </div>

      <div className="home-journey-stage">
        <div className="home-journey-ambient" aria-hidden="true" />
        <div className="home-journey-contours" aria-hidden="true" />
        <div className="home-journey-glow" aria-hidden="true" />
        <div className="home-journey-grain" aria-hidden="true" />
        <div className="home-journey-vignette" aria-hidden="true" />
        <div className="home-journey-dust-layer" aria-hidden="true">
          {dustSpecs.map((spec, index) => (
            <span
              key={`${spec.left}-${spec.top}-${index}`}
              className="home-journey-dust"
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

        <section className="home-journey-section home-journey-section--briefs is-active">
          <div className="home-journey-text home-journey-text--briefs brief-portal-content">
            <div className="brief-portal-idea-meta">
              {ideaId}
              {ideaId && ideaTitle ? " · " : null}
              {ideaTitle ? ideaTitle : null}
            </div>

            <h2 className="home-journey-section-title">
              <span className="home-journey-section-title-line">{t.heading}</span>
            </h2>
            <p className="home-journey-copy">{t.subheading}</p>

            <div className={`brief-portal-grid ${shouldShowBackgroundCard ? "is-couple" : "is-solo"}`}>
              <article className="brief-portal-card brief-portal-card--character" style={{ animationDelay: "70ms" }}>
                <p className="brief-portal-card-kicker">01</p>
                <h3 className="brief-portal-card-title">{t.cardCharacter}</h3>
                {characterComment ? (
                  <p className="brief-portal-card-comment">{characterComment}</p>
                ) : null}
                <div className={`brief-portal-link-row ${characterLinks.length > 1 ? "is-couple" : ""}`}>
                  {characterLinks.map((link) => (
                    <button
                      key={`${link.href}-${link.label ?? ""}`}
                      type="button"
                      className="brief-portal-link brief-portal-link-static"
                      onClick={() => {
                        void openContextLink(link.href);
                      }}
                    >
                      {link.label}
                    </button>
                  ))}
                </div>
              </article>

              {shouldShowBackgroundCard ? (
                <article className="brief-portal-card brief-portal-card--background" style={{ animationDelay: "170ms" }}>
                  <p className="brief-portal-card-kicker">02</p>
                  <h3 className="brief-portal-card-title">{t.cardBackground}</h3>
                  {backgroundComment ? (
                    <p className="brief-portal-card-comment">{backgroundComment}</p>
                  ) : null}
                  <div className="brief-portal-link-row">
                    {backgroundLinks.map((link, index) => (
                      <button
                        key={`${link.href}-${index}`}
                        type="button"
                        className="brief-portal-link brief-portal-link-static"
                      onClick={() => {
                        void openContextLink(link.href);
                      }}
                    >
                        {link.label}
                      </button>
                    ))}
                  </div>
                </article>
              ) : null}

              <article className="brief-portal-card brief-portal-card--commission" style={{ animationDelay: commissionAnimationDelay }}>
                <p className="brief-portal-card-kicker">{commissionCardNumber}</p>
                <h3 className="brief-portal-card-title">{t.cardCommission}</h3>
                {commissionComment ? (
                  <p className="brief-portal-card-comment">{commissionComment}</p>
                ) : null}
                <div className="brief-portal-link-row">
                  {displayedCommissionLinks.map((link, index) => (
                    <button
                      key={`${link.href}-${index}`}
                      type="button"
                      className="brief-portal-link brief-portal-link-button brief-portal-link-action"
                      disabled={Boolean(openingCommissionHref) || !hasCommissionLinks}
                      onClick={() => {
                        void handleOpenCommission(link.href);
                      }}
                    >
                      {openingCommissionHref === link.href ? t.openingLabel : link.label}
                    </button>
                  ))}
                </div>
              </article>

            </div>

            {errorMessage ? (
              <p className="brief-portal-error" role="status">{errorMessage}</p>
            ) : null}
          </div>
        </section>
      </div>
      <PageCredit tone="on-dark" className="brief-portal-page-credit page-credit--bottom" />
    </main>
  );
}
