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
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </LanguageProvider>
  </TooltipProvider>
);

export default App;
