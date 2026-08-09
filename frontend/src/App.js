import "@/App.css";
import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import SmoothScroll from "@/components/motion/SmoothScroll";
import ErrorBoundary from "@/components/site/ErrorBoundary";
import Nav from "@/components/site/Nav";

// The landing page stays in the main bundle — splitting it would only add a
// round trip to the one route most visitors see first. Every other route is
// fetched on demand.
import Home from "@/pages/Home";

// Not lazy, unlike the rest: this is the page shown when routing has already
// gone wrong, so it must not depend on another chunk resolving.
import NotFoundPage from "@/pages/NotFoundPage";

const AboutPage = lazy(() => import("@/pages/AboutPage"));
const PracticeAreasPage = lazy(() => import("@/pages/PracticeAreasPage"));
const ExpertisePage = lazy(() => import("@/pages/ExpertisePage"));
const JourneyPage = lazy(() => import("@/pages/JourneyPage"));
const CredentialsPage = lazy(() => import("@/pages/CredentialsPage"));
const WorkPage = lazy(() => import("@/pages/WorkPage"));
const StagesPage = lazy(() => import("@/pages/StagesPage"));
const CareersPage = lazy(() => import("@/pages/CareersPage"));
const NewsletterPage = lazy(() => import("@/pages/NewsletterPage"));
const InsightsPage = lazy(() => import("@/pages/InsightsPage"));
const NewsroomPage = lazy(() => import("@/pages/NewsroomPage"));
const NewsroomItemPage = lazy(() => import("@/pages/NewsroomItemPage"));
const ContactPage = lazy(() => import("@/pages/ContactPage"));
const PrivacyPage = lazy(() => import("@/pages/PrivacyPage"));

/**
 * Every page renders its own <Nav />, so an empty fallback would blank the
 * header while a chunk is in flight. Rendering the real Nav keeps it fixed in
 * place across the swap; the spacer holds the background so nothing flashes.
 *
 * The spacer used to be all there was: on a slow connection a visitor got a
 * header over an empty screen with nothing to say a page was on its way, which
 * is indistinguishable from a site that has simply broken. An indeterminate
 * bar under the header covers the only case this fallback exists for — a chunk
 * in flight, of unknowable duration. It is delayed by 300ms so a chunk that
 * arrives promptly never flashes a loading state on the way past, and carries
 * role="status" so the wait is announced rather than purely visual.
 */
function RouteFallback() {
  return (
    <>
      <Nav />
      <div className="pt-nav">
        <div
          role="status"
          aria-label="Loading page"
          className="route-loading h-px w-full overflow-hidden bg-border/40"
        >
          <span className="block h-full w-1/3 bg-brown" />
        </div>
      </div>
      <div className="min-h-screen bg-cream" />
    </>
  );
}

function App() {
  return (
    <div className="App" data-testid="app-root">
      {/* Outside the router: a chunk that fails to load throws through the
          Suspense boundary, and the fallback page has to survive that. */}
      <ErrorBoundary>
        <BrowserRouter>
          {/* Owns Lenis smooth scrolling and the per-route scroll reset. */}
          <SmoothScroll>
            <Suspense fallback={<RouteFallback />}>
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
                <Route path="/newsroom" element={<NewsroomPage />} />
                <Route path="/newsroom/:slug" element={<NewsroomItemPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/privacy" element={<PrivacyPage />} />
                {/* Any other path rendered nothing at all before this. */}
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </Suspense>
          </SmoothScroll>
        </BrowserRouter>
      </ErrorBoundary>
      <Toaster
        position="top-right"
        theme="light"
        toastOptions={{
          style: {
            background: "#121212",
            color: "#FFFFFF",
            border: "1px solid #007A5A",
            // Inter, like the rest of the site. This read "IBM Plex Sans",
            // which is not among the families public/index.html loads, so
            // every toast silently fell back to the generic system sans.
            fontFamily: '"Inter", system-ui, sans-serif',
          },
        }}
      />
    </div>
  );
}

export default App;
