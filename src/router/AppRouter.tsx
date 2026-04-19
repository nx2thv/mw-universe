import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Home from "../pages/Home";
import BriefPage from "../pages/BriefPage";
import { LanguageProvider } from "../LanguageContext";
import GlobalNav from "../components/GlobalNav";
import MyCurrentIdeasPage from "../pages/MyCurrentIdeasPage";
import AboutThem from "../pages/AboutThem";
import TheirStory from "../pages/TheirStory";
import Footer from "../components/Footer";
import BriefLoadingPage from "../pages/BriefLoadingPage";

function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    }, [pathname]);

    return null;
}

function AppLayout() {
    const { pathname } = useLocation();
    const isBriefLoadingRoute = pathname === "/brief-loading";
    const normalizedPathname = pathname.replace(/\/+$/, "") || "/";
    const isAboutThemRoute = normalizedPathname.startsWith("/them");
    const isFooterlessRoute =
        normalizedPathname === "/ideas" ||
        normalizedPathname === "/marcus" ||
        normalizedPathname === "/william" ||
        isAboutThemRoute;

    return (
        <>
        <ScrollToTop />
        {!isBriefLoadingRoute && <GlobalNav />}
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/ideas" element={<MyCurrentIdeasPage />} />
            <Route path="/them" element={<AboutThem />} />
            <Route path="/them/story" element={<TheirStory />} />
            <Route path="/them/au" element={<AboutThem />} />
            <Route path="/brief-loading" element={<BriefLoadingPage />} />
            <Route path=":id" element={<BriefPage />} />
        </Routes>
        {!isBriefLoadingRoute && !isFooterlessRoute && <Footer />}
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
