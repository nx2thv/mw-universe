import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Home from "../pages/Home";
import BriefPage from "../pages/BriefPage";
import { LanguageProvider } from "../LanguageContext";
import GlobalNav from "../components/GlobalNav";
import MyCurrentIdeasPage from "../pages/MyCurrentIdeasPage";
import AboutThem from "../pages/AboutThem";
import Footer from "../components/Footer";

function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    }, [pathname]);

    return null;
}

export default function AppRouter() {
    return (
        <BrowserRouter>
        <LanguageProvider>
        <ScrollToTop />
        <GlobalNav />
        <Routes>
            {/* Home page */}
            <Route path="/" element={<Home />} />

            {/* My current ideas */}
            <Route path="/ideas" element={<MyCurrentIdeasPage />} />

            <Route path="/them" element={<AboutThem />} />
            {/* Character long-form page (dynamic) */}
            <Route path=":id" element={<BriefPage />} />

        </Routes>
        <Footer />
        </LanguageProvider>
        </BrowserRouter>
    );
}
