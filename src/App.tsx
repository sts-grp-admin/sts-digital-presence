import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/i18n/LanguageContext";
import Layout from "@/components/layout/Layout";
import ScrollToTop from "@/components/shared/ScrollToTop";
import Index from "./pages/Index";
import Services from "./pages/Services";
import References from "./pages/References";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Careers from "./pages/Careers";
import LegalNotice from "./pages/LegalNotice";

// Outil interne : chargé uniquement à l'ouverture de /outils/ik — le site
// public ne paie ni supabase-js, ni lz-string, ni les composants IK
const IK = lazy(() => import("./pages/IK"));
import NotFound from "./pages/NotFound";

const App = () => (
  <TooltipProvider>
    <LanguageProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Layout>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/services" element={<Services />} />
            <Route path="/references" element={<References />} />
            <Route path="/a-propos" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/nous-recrutons" element={<Careers />} />
            <Route path="/mentions-legales" element={<LegalNotice />} />
            {/* Outil interne (non listé dans le menu, noindex) */}
            <Route path="/outils/ik" element={<Suspense fallback={null}><IK /></Suspense>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </LanguageProvider>
  </TooltipProvider>
);

export default App;
