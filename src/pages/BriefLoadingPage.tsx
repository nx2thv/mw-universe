import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import UniversalTopBar from "../components/UniversalTopBar";
import { useLanguage } from "../LanguageContext";
import { resolveBriefUrl } from "../lib/briefLinks";
import { supabase } from "../lib/supabaseClients";
import { normalizeCharacter } from "../data/commissionIdeas";

type CharacterParam = "william" | "marcus" | "couple";
type ResolvedContextLink = {
  href: string;
  label?: string;
};
type IdeaContextLinks = {
  background: ResolvedContextLink[];
  commission: ResolvedContextLink[];
  characters: ResolvedContextLink[];
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

function toResolvedContextLink(entry: unknown): ResolvedContextLink | null {
  if (typeof entry === "string") {
    const href = entry.trim();
    return href ? { href } : null;
  }

  if (!entry || typeof entry !== "object") return null;
  const value = entry as Record<string, unknown>;
  const hrefCandidate = value.href ?? value.url ?? value.path ?? value.link;
  if (typeof hrefCandidate !== "string" || !hrefCandidate.trim()) return null;

  const labelCandidate = value.label ?? value.text ?? value.title;
  return {
    href: hrefCandidate.trim(),
    label: typeof labelCandidate === "string" && labelCandidate.trim() ? labelCandidate.trim() : undefined,
  };
}

function normalizeContextList(value: unknown): ResolvedContextLink[] {
  if (Array.isArray(value)) {
    return value
      .map(toResolvedContextLink)
      .filter((entry): entry is ResolvedContextLink => Boolean(entry));
  }

  const single = toResolvedContextLink(value);
  return single ? [single] : [];
}

function parseContextLinks(value: unknown): IdeaContextLinks {
  if (!value || typeof value !== "object") {
    return { background: [], commission: [], characters: [] };
  }

  const raw = value as Record<string, unknown>;
  const background = normalizeContextList(raw.background);
  const commission = normalizeContextList(raw.commission);
  const characters = normalizeContextList(raw.characters);

  if (!background.length) {
    background.push(...normalizeContextList([raw.background_story, raw.au_archive]));
  }
  if (!characters.length) {
    characters.push(...normalizeContextList([raw.character_william, raw.character_marcus]));
  }

  return { background, commission, characters };
}

function isInternalPath(href: string) {
  return /^\/(?!\/)/.test(href);
}

export default function BriefLoadingPage() {
  const { language } = useLanguage();
  const [searchParams] = useSearchParams();
  const [openingCommissionHref, setOpeningCommissionHref] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [contextLinks, setContextLinks] = useState<IdeaContextLinks>({
    background: [],
    commission: [],
    characters: [],
  });

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
      heading: "Before You Open The Brief",
      subheading: "Chọn tài liệu nền nhanh trước khi vào commission brief.",
      cardBackground: "Background brief",
      cardCommission: "Commission brief",
      cardCharacter: "Characters' brief",
      openLabel: "Open (→)",
      openingLabel: "Opening...",
      noBrief: "Missing brief reference.",
      openError: "Could not open this brief right now.",
      william: "William (→)",
      marcus: "Marcus (→)",
      ideaPrefix: "Idea",
    }
    : {
      language: "Language",
      heading: "Before You Open The Brief",
      subheading: "Grab the key references first, then jump into the commission brief.",
      cardBackground: "Background brief",
      cardCommission: "Commission brief",
      cardCharacter: "Characters' brief",
      openLabel: "Open (→)",
      openingLabel: "Opening...",
      noBrief: "Missing brief reference.",
      openError: "Could not open this brief right now.",
      william: "William (→)",
      marcus: "Marcus (→)",
      ideaPrefix: "Idea",
    };

  useEffect(() => {
    let cancelled = false;

    async function fetchIdeaContext() {
      if (!ideaId) return;

      const { data, error } = await supabase
        .from("commission_ideas")
        .select("brief_path, character, context_links")
        .eq("id", ideaId)
        .maybeSingle<{
          brief_path: string;
          character: string | null;
          context_links: unknown;
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
      setContextLinks(parseContextLinks(data.context_links));

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

  const backgroundLinks = contextLinks.background.length
    ? contextLinks.background
    : [{ href: "/them/story" }];
  const characterLinks = contextLinks.characters.length
    ? contextLinks.characters
    : fallbackCharacterLinks;
  const commissionLinks = contextLinks.commission.length
    ? contextLinks.commission
    : (resolvedBriefRef.trim() ? [{ href: resolvedBriefRef }] : []);

  const hasCommissionLinks = commissionLinks.length > 0;
  const displayedCommissionLinks = hasCommissionLinks ? commissionLinks : [{ href: "", label: t.openLabel }];

  const inferCharacterLabel = (link: ResolvedContextLink) => {
    if (link.label) return link.label;
    const href = link.href.toLowerCase();
    if (href.includes("william")) return t.william;
    if (href.includes("marcus")) return t.marcus;
    return t.openLabel;
  };

  const openContextLink = async (href: string) => {
    if (!href.trim()) return;
    setErrorMessage(null);

    if (isInternalPath(href)) {
      window.location.assign(href);
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

    if (isInternalPath(href)) {
      window.location.assign(href);
      return;
    }

    if (/^https?:\/\//i.test(href)) {
      window.open(href, "_blank", "noopener,noreferrer");
      return;
    }

    setOpeningCommissionHref(href);
    const popup = window.open("", "_blank");
    if (popup) {
      popup.opener = null;
    }

    try {
      const signedUrl = await resolveBriefUrl(href, expiresIn);
      if (popup) {
        popup.location.replace(signedUrl);
      } else {
        window.location.assign(signedUrl);
      }
    } catch (error) {
      console.error("Could not open brief:", error);
      setErrorMessage(t.openError);
      if (popup && !popup.closed) {
        popup.close();
      }
    } finally {
      setOpeningCommissionHref(null);
    }
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
              {ideaId ? `${t.ideaPrefix} ${ideaId}` : null}
              {ideaId && ideaTitle ? " · " : null}
              {ideaTitle ? ideaTitle : null}
            </div>

            <h2 className="home-journey-section-title">
              <span className="home-journey-section-title-line">{t.heading}</span>
            </h2>
            <p className="home-journey-copy">{t.subheading}</p>

            <div className="brief-portal-grid">
              <article className="brief-portal-card brief-portal-card--character" style={{ animationDelay: "70ms" }}>
                <p className="brief-portal-card-kicker">01</p>
                <h3 className="brief-portal-card-title">{t.cardCharacter}</h3>
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
                      {inferCharacterLabel(link)}
                    </button>
                  ))}
                </div>
              </article>

              <article className="brief-portal-card brief-portal-card--background" style={{ animationDelay: "170ms" }}>
                <p className="brief-portal-card-kicker">02</p>
                <h3 className="brief-portal-card-title">{t.cardBackground}</h3>
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
                      {link.label ?? t.openLabel}
                    </button>
                  ))}
                </div>
              </article>

              <article className="brief-portal-card brief-portal-card--commission" style={{ animationDelay: "270ms" }}>
                <p className="brief-portal-card-kicker">03</p>
                <h3 className="brief-portal-card-title">{t.cardCommission}</h3>
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
                      {openingCommissionHref === link.href ? t.openingLabel : (link.label ?? t.openLabel)}
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
    </main>
  );
}
