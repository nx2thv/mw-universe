import { useLayoutEffect, type RefObject } from "react";

// Story's card reveal, observed inside the brief's own scrolling panel.
export function useBriefReveals(rootRef: RefObject<HTMLDivElement | null>, selector: string) {
  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const targets = Array.from(root.querySelectorAll<HTMLElement>(selector));
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        (entry.target as HTMLElement).dataset.briefReveal = "visible";
        observer.unobserve(entry.target);
      });
    }, { root, threshold: 0.18, rootMargin: "0px 0px -14% 0px" });

    targets.forEach((target, index) => {
      target.dataset.briefReveal = "pending";
      target.style.setProperty("--brief-reveal-delay", `${60 + (index % 3) * 72}ms`);
      observer.observe(target);
    });
    return () => {
      observer.disconnect();
      targets.forEach((target) => {
        delete target.dataset.briefReveal;
        target.style.removeProperty("--brief-reveal-delay");
      });
    };
  }, [rootRef, selector]);
}
