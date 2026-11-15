export const HOME_SECTION_STORAGE_KEY = "mwHomeLastSection";

export function getBriefFocusHub(ideaId: string) {
  return `/combination?${new URLSearchParams({ idea: ideaId })}`;
}

export function withBriefFocus(href: string, ideaId: string | null) {
  if (!ideaId || !/^(?:\/(?!\/)|https?:\/\/)/i.test(href)) return href;

  const url = new URL(href, window.location.origin);
  if (url.origin !== window.location.origin) return href;

  url.searchParams.set("focusIdea", ideaId);
  return `${url.pathname}${url.search}${url.hash}`;
}
