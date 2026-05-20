import {
    Routes,
    Route,
    UNSAFE_createBrowserHistory,
    unstable_HistoryRouter as HistoryRouter,
    useLocation,
    useNavigate,
} from "react-router";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import Home from "../pages/Home";
import BriefPage from "../pages/BriefPage";
import { LanguageProvider } from "../LanguageContext";
import UniversalTopBar from "../components/UniversalTopBar";
import MyCurrentIdeasPage from "../pages/MyCurrentIdeasPage";
import TheirStory from "../pages/TheirStory";
import AuArchive from "../pages/AuArchive";
import Footer from "../components/Footer";
import BriefLoadingPage from "../pages/BriefLoadingPage";
import BriefOpeningPage from "../pages/BriefOpeningPage";

function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    }, [pathname]);

    return null;
}

type RouteTransitionTone = "archive";
type RouteTransitionPhase = "leaving" | "arriving";
type RouteTransitionDetail = {
    to: string;
    tone?: RouteTransitionTone;
};
type ActiveRouteTransition = Required<RouteTransitionDetail> & {
    key: number;
    phase: RouteTransitionPhase;
};

const ROUTE_TRANSITION_NAV_DELAY_MS = 920;
const ROUTE_TRANSITION_TOTAL_MS = 1880;
const ROUTE_TRANSITION_PATHS = new Set(["/", "/marcus", "/william", "/story", "/au"]);

function normalizeTransitionPath(pathname: string) {
    return pathname.replace(/\/+$/, "") || "/";
}

const browserHistory = UNSAFE_createBrowserHistory({ v5Compat: true });
type AppHistory = typeof browserHistory;
type HistoryUpdate = Parameters<Parameters<AppHistory["listen"]>[0]>[0];

function shouldAnimatePathChange(fromPathname: string, toPathname: string) {
    const fromPath = normalizeTransitionPath(fromPathname);
    const toPath = normalizeTransitionPath(toPathname);

    if (fromPath === toPath) return false;
    if (!ROUTE_TRANSITION_PATHS.has(fromPath)) return false;
    if (!ROUTE_TRANSITION_PATHS.has(toPath)) return false;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;

    return true;
}

const transitionHistory: AppHistory = {
    get action() {
        return browserHistory.action;
    },
    get location() {
        return browserHistory.location;
    },
    createHref(to) {
        return browserHistory.createHref(to);
    },
    createURL(to) {
        return browserHistory.createURL(to);
    },
    encodeLocation(to) {
        return browserHistory.encodeLocation(to);
    },
    push(to, state) {
        browserHistory.push(to, state);
    },
    replace(to, state) {
        browserHistory.replace(to, state);
    },
    go(delta) {
        browserHistory.go(delta);
    },
    listen(listener) {
        let currentLocation = browserHistory.location;
        let pendingPopTimeoutId: number | null = null;

        const clearPendingPop = () => {
            if (pendingPopTimeoutId === null) return;
            window.clearTimeout(pendingPopTimeoutId);
            pendingPopTimeoutId = null;
        };

        const unlisten = browserHistory.listen((update: HistoryUpdate) => {
            const shouldDelayPop =
                update.action === "POP" &&
                shouldAnimatePathChange(currentLocation.pathname, update.location.pathname);

            if (!shouldDelayPop) {
                clearPendingPop();
                currentLocation = update.location;
                listener(update);
                return;
            }

            clearPendingPop();
            window.dispatchEvent(new CustomEvent<RouteTransitionDetail>("oc:route-pop-transition", {
                detail: {
                    to: `${update.location.pathname}${update.location.search}${update.location.hash}`,
                    tone: "archive",
                },
            }));

            pendingPopTimeoutId = window.setTimeout(() => {
                pendingPopTimeoutId = null;
                currentLocation = update.location;
                listener(update);
            }, ROUTE_TRANSITION_NAV_DELAY_MS);
        });

        return () => {
            clearPendingPop();
            unlisten();
        };
    },
};

function RouteTransitionOverlay({
    transition,
    onArriveEnd,
}: {
    transition: ActiveRouteTransition | null;
    onArriveEnd: () => void;
}) {
    if (!transition) return null;

    return (
        <div
            key={transition.key}
            className={[
                "route-transition-overlay",
                `route-transition-overlay--${transition.tone}`,
                `is-${transition.phase}`,
            ].filter(Boolean).join(" ")}
            aria-hidden="true"
            onAnimationEnd={(event) => {
                if (event.currentTarget !== event.target) return;
                if (transition.phase !== "arriving") return;
                onArriveEnd();
            }}
        >
            <div className="route-transition-overlay__texture" />
            <div className="route-transition-overlay__frame" />
        </div>
    );
}

function AppLayout() {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const [activeTransition, setActiveTransition] = useState<ActiveRouteTransition | null>(null);
    const transitionTimeoutsRef = useRef<number[]>([]);
    const activeTransitionRef = useRef<ActiveRouteTransition | null>(null);
    const pathnameRef = useRef(pathname);
    const pendingTraversalPathnameRef = useRef<string | null>(null);
    const isBriefLoadingRoute = pathname === "/brief-loading";
    const isBriefOpeningRoute = pathname === "/brief-opening";
    const isBriefFlowRoute = isBriefLoadingRoute || isBriefOpeningRoute;
    const normalizedPathname = pathname.replace(/\/+$/, "") || "/";
    const isHomeRoute = normalizedPathname === "/";
    const isStoryRoute = normalizedPathname === "/story";
    const isAuRoute = normalizedPathname === "/au";
    const isFooterlessRoute =
        isHomeRoute ||
        normalizedPathname === "/ideas" ||
        normalizedPathname === "/marcus" ||
        normalizedPathname === "/william" ||
        isStoryRoute ||
        isAuRoute;

    useEffect(() => {
        pathnameRef.current = pathname;
    }, [pathname]);

    useEffect(() => {
        activeTransitionRef.current = activeTransition;
    }, [activeTransition]);

    const setRouteTransition = useCallback((transition: ActiveRouteTransition | null) => {
        activeTransitionRef.current = transition;
        setActiveTransition(transition);
    }, []);

    useEffect(() => {
        if (!activeTransition) return;

        const fallbackTimeoutId = window.setTimeout(() => {
            setRouteTransition(null);
        }, ROUTE_TRANSITION_TOTAL_MS + 250);

        return () => {
            window.clearTimeout(fallbackTimeoutId);
        };
    }, [activeTransition, setRouteTransition]);

    useLayoutEffect(() => {
        if (pendingTraversalPathnameRef.current !== pathname) return;

        const targetPathname = pendingTraversalPathnameRef.current;
        pendingTraversalPathnameRef.current = null;
        const current = activeTransitionRef.current;
        setRouteTransition(current ? { ...current, to: targetPathname, phase: "arriving" } : current);

        transitionTimeoutsRef.current = [
            window.setTimeout(() => {
                setRouteTransition(null);
            }, ROUTE_TRANSITION_TOTAL_MS - ROUTE_TRANSITION_NAV_DELAY_MS),
        ];
    }, [pathname, setRouteTransition]);

    useEffect(() => {
        const clearTransitionTimeouts = () => {
            transitionTimeoutsRef.current.forEach((timeoutId) => window.clearTimeout(timeoutId));
            transitionTimeoutsRef.current = [];
        };

        const startLeavingTransition = ({ to, tone = "archive" }: RouteTransitionDetail) => {
            if (!to || to === pathnameRef.current) return false;

            clearTransitionTimeouts();

            if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
                return false;
            }

            setRouteTransition({
                key: Date.now(),
                to,
                tone,
                phase: "leaving",
            });

            return true;
        };

        const handleRouteTransition = (event: Event) => {
            const { to, tone = "archive" } =
                (event as CustomEvent<RouteTransitionDetail>).detail ?? {};

            if (!to || to === pathnameRef.current) return;

            if (!startLeavingTransition({ to, tone })) {
                navigate(to);
                return;
            }

            transitionTimeoutsRef.current = [
                window.setTimeout(() => {
                    navigate(to);
                    const current = activeTransitionRef.current;
                    setRouteTransition(current ? { ...current, phase: "arriving" } : current);
                }, ROUTE_TRANSITION_NAV_DELAY_MS),
                window.setTimeout(() => {
                    setRouteTransition(null);
                }, ROUTE_TRANSITION_TOTAL_MS),
            ];
        };

        const handlePopTransition = (event: Event) => {
            const { to, tone = "archive" } =
                (event as CustomEvent<RouteTransitionDetail>).detail ?? {};
            if (!startLeavingTransition({ to, tone })) return;
            pendingTraversalPathnameRef.current = normalizeTransitionPath(new URL(to, window.location.origin).pathname);
        };

        const handleTransitionLinkClick = (event: MouseEvent) => {
            if (event.defaultPrevented || event.button !== 0) return;
            if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

            const target = event.target;
            if (!(target instanceof Element)) return;

            const link = target.closest<HTMLAnchorElement>("a[href]");
            if (!link) return;
            if (link.target && link.target !== "_self") return;
            if (link.hasAttribute("download")) return;

            const url = new URL(link.href, window.location.origin);
            if (url.origin !== window.location.origin) return;
            if (!ROUTE_TRANSITION_PATHS.has(url.pathname)) return;
            if (url.pathname === pathnameRef.current) return;

            event.preventDefault();
            window.dispatchEvent(new CustomEvent<RouteTransitionDetail>("oc:route-transition", {
                detail: {
                    to: `${url.pathname}${url.search}${url.hash}`,
                    tone: "archive",
                },
            }));
        };

        window.addEventListener("oc:route-transition", handleRouteTransition);
        window.addEventListener("oc:route-pop-transition", handlePopTransition);
        document.addEventListener("click", handleTransitionLinkClick, true);
        return () => {
            window.removeEventListener("oc:route-transition", handleRouteTransition);
            window.removeEventListener("oc:route-pop-transition", handlePopTransition);
            document.removeEventListener("click", handleTransitionLinkClick, true);
            clearTransitionTimeouts();
        };
    }, [navigate, setRouteTransition]);

    return (
        <>
        <ScrollToTop />
        {!isBriefFlowRoute && !isHomeRoute && <UniversalTopBar />}
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/ideas" element={<MyCurrentIdeasPage />} />
            <Route path="/story" element={<TheirStory />} />
            <Route path="/au" element={<AuArchive />} />
            <Route path="/brief-loading" element={<BriefLoadingPage />} />
            <Route path="/brief-opening" element={<BriefOpeningPage />} />
            <Route path=":id" element={<BriefPage />} />
        </Routes>
        {!isBriefFlowRoute && !isFooterlessRoute && <Footer />}
        <RouteTransitionOverlay
            transition={activeTransition}
            onArriveEnd={() => setRouteTransition(null)}
        />
        </>
    );
}

export default function AppRouter() {
    return (
        <HistoryRouter history={transitionHistory}>
        <LanguageProvider>
        <AppLayout />
        </LanguageProvider>
        </HistoryRouter>
    );
}
