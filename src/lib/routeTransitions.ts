export type RouteTransitionTone = "archive";

type RouteTransitionDetail = {
  to: string;
  tone?: RouteTransitionTone;
};

export function runRouteTransition(to: string, tone: RouteTransitionTone = "archive") {
  const url = new URL(to, window.location.origin);
  window.dispatchEvent(new CustomEvent<RouteTransitionDetail>("oc:route-transition", {
    detail: {
      to: `${url.pathname}${url.search}${url.hash}`,
      tone,
    },
  }));
}
