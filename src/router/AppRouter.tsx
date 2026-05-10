import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import Home from "../pages/Home";
import BriefPage from "../pages/BriefPage";
import { LanguageProvider } from "../LanguageContext";
import UniversalTopBar from "../components/UniversalTopBar";
import MyCurrentIdeasPage from "../pages/MyCurrentIdeasPage";
import TheirStory from "../pages/TheirStory";
import AuArchive from "../pages/AuArchive";
import Footer from "../components/Footer";
import BriefLoadingPage from "../pages/BriefLoadingPage";

function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    }, [pathname]);

    return null;
}

function RouteTransitionOverlay() {
    const { pathname } = useLocation();
    const isFirstPaintRef = useRef(true);
    const [transitionKey, setTransitionKey] = useState(0);

    useEffect(() => {
        if (isFirstPaintRef.current) {
            isFirstPaintRef.current = false;
            return;
        }
        setTransitionKey((prev) => prev + 1);
    }, [pathname]);

    if (transitionKey === 0) return null;

    return (
        <div
            key={transitionKey}
            className="route-transition-overlay"
            aria-hidden="true"
        />
    );
}

function AppLayout() {
    const { pathname } = useLocation();
    const isBriefLoadingRoute = pathname === "/brief-loading";
    const normalizedPathname = pathname.replace(/\/+$/, "") || "/";
    const isHomeRoute = normalizedPathname === "/";
    const isAboutThemRoute = normalizedPathname.startsWith("/them");
    const isFooterlessRoute =
        isHomeRoute ||
        normalizedPathname === "/ideas" ||
        normalizedPathname === "/marcus" ||
        normalizedPathname === "/william" ||
        isAboutThemRoute;

    return (
        <>
        <ScrollToTop />
        {!isBriefLoadingRoute && !isHomeRoute && <UniversalTopBar />}
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/ideas" element={<MyCurrentIdeasPage />} />
            <Route path="/them" element={<Navigate to="/them/story" replace />} />
            <Route path="/them/story" element={<TheirStory />} />
            <Route path="/them/au" element={<AuArchive />} />
            <Route path="/brief-loading" element={<BriefLoadingPage />} />
            <Route path=":id" element={<BriefPage />} />
        </Routes>
        {!isBriefLoadingRoute && !isFooterlessRoute && <Footer />}
        <RouteTransitionOverlay />
        </>
    );
}

export default function AppRouter() {
    return (
        <BrowserRouter>
        <LanguageProvider>
        <AppLayout />
        </LanguageProvider>
        </BrowserRouter>
    );
}
