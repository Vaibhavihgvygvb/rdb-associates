import "@/App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Toaster } from "sonner";
import Home from "@/pages/Home";
import AboutPage from "@/pages/AboutPage";
import PracticeAreasPage from "@/pages/PracticeAreasPage";
import ExpertisePage from "@/pages/ExpertisePage";
import JourneyPage from "@/pages/JourneyPage";
import CredentialsPage from "@/pages/CredentialsPage";
import WorkPage from "@/pages/WorkPage";
import StagesPage from "@/pages/StagesPage";
import CareersPage from "@/pages/CareersPage";
import NewsletterPage from "@/pages/NewsletterPage";
import InsightsPage from "@/pages/InsightsPage";
import ContactPage from "@/pages/ContactPage";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  return (
    <div className="App" data-testid="app-root">
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/practice-areas" element={<PracticeAreasPage />} />
          <Route path="/expertise" element={<ExpertisePage />} />
          <Route path="/journey" element={<JourneyPage />} />
          <Route path="/credentials" element={<CredentialsPage />} />
          <Route path="/work" element={<WorkPage />} />
          <Route path="/stages" element={<StagesPage />} />
          <Route path="/careers" element={<CareersPage />} />
          <Route path="/newsletter" element={<NewsletterPage />} />
          <Route path="/insights" element={<InsightsPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </BrowserRouter>
      <Toaster
        position="top-right"
        theme="light"
        toastOptions={{
          style: {
            background: "#12151A",
            color: "#FFFFFF",
            border: "1px solid #0B57D0",
            fontFamily: "IBM Plex Sans, sans-serif",
          },
        }}
      />
    </div>
  );
}

export default App;
