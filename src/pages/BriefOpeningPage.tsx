import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Lottie from "lottie-react";
import catPlaying from "../../assets/lottie/Cat playing animation.json";
import { resolveBriefUrl } from "../lib/briefLinks";

const BRIEF_FUN_FACTS = [
  "Marcus used to have a buzzcut (it was ugly).",
  "William dreams of being a seal in the next lifetime.",
  "A cat wandered into their kitchen while they were... mid sex.\nThey then adopted the cat and named it Banana (Marcus did not approve this).",
  "William bought Marcus 7 cars for the man's 36th birthday.",
  "Marcus is an eater (iykyk).",
] as const;

const FACT_DISPLAY_MS = 3000;
const FACT_TRANSITION_MS = 350;
const MINIMUM_OPENING_MS = 1600;

function getRandomFactIndex(previousIndex?: number) {
  if (BRIEF_FUN_FACTS.length <= 1) {
    return 0;
  }

  let nextIndex = Math.floor(Math.random() * BRIEF_FUN_FACTS.length);

  while (nextIndex === previousIndex) {
    nextIndex = Math.floor(Math.random() * BRIEF_FUN_FACTS.length);
  }

  return nextIndex;
}

function isInternalPath(href: string) {
  return /^\/(?!\/)/.test(href);
}

function wait(ms: number) {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms);
  });
}

export default function BriefOpeningPage() {
  const [searchParams] = useSearchParams();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [factIndex, setFactIndex] = useState(() => getRandomFactIndex());
  const [isFactVisible, setIsFactVisible] = useState(true);

  useEffect(() => {
    const briefRef = searchParams.get("brief");
    const expiresIn = Number(searchParams.get("expiresIn") || "86400");

    if (!briefRef) {
      setErrorMessage("Missing brief reference.");
      return;
    }

    const resolvedBriefRef = briefRef;
    let cancelled = false;

    async function openBrief() {
      try {
        const openingStartedAt = Date.now();
        const destination = isInternalPath(resolvedBriefRef) || /^https?:\/\//i.test(resolvedBriefRef)
          ? resolvedBriefRef
          : await resolveBriefUrl(resolvedBriefRef, expiresIn);
        const elapsed = Date.now() - openingStartedAt;

        if (elapsed < MINIMUM_OPENING_MS) {
          await wait(MINIMUM_OPENING_MS - elapsed);
        }

        if (!cancelled) {
          window.location.replace(destination);
        }
      } catch (error) {
        if (!cancelled) {
          console.error("Could not open brief:", error);
          setErrorMessage("Could not open this brief right now.");
        }
      }
    }

    void openBrief();

    return () => {
      cancelled = true;
    };
  }, [searchParams]);

  useEffect(() => {
    if (errorMessage) {
      return;
    }

    let timeoutId: number | null = null;
    let cancelled = false;

    const scheduleNextFact = () => {
      timeoutId = window.setTimeout(() => {
        setIsFactVisible(false);

        timeoutId = window.setTimeout(() => {
          if (cancelled) {
            return;
          }

          setFactIndex((currentIndex) => getRandomFactIndex(currentIndex));
          setIsFactVisible(true);
          scheduleNextFact();
        }, FACT_TRANSITION_MS);
      }, FACT_DISPLAY_MS);
    };

    scheduleNextFact();

    return () => {
      cancelled = true;

      if (timeoutId !== null) {
        window.clearTimeout(timeoutId);
      }
    };
  }, [errorMessage]);

  return (
    <main className="brief-loading-screen min-h-screen flex items-center justify-center px-6 py-10 text-center">
      <div className="brief-loading-card w-full max-w-md">
        <div className="mx-auto w-[220px] max-w-full">
          <Lottie animationData={catPlaying} loop />
        </div>

        {!errorMessage ? (
          <div className="mt-3">
            <p className="brief-loading-eyebrow">Fun fact</p>
            <p
              className={`brief-loading-copy brief-loading-fact mt-3 ${
                isFactVisible ? "is-visible" : "is-hidden"
              }`}
              aria-live="polite"
            >
              {BRIEF_FUN_FACTS[factIndex]}
            </p>
          </div>
        ) : null}

        {errorMessage ? (
          <>
            <p className="brief-loading-copy mt-3">{errorMessage}</p>
            <Link
              to="/ideas"
              className="brief-loading-link mt-6 inline-block underline underline-offset-4"
            >
              Back to ideas
            </Link>
          </>
        ) : null}
      </div>
    </main>
  );
}
