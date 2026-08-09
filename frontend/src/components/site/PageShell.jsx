import Nav from "@/components/site/Nav";
import Footer from "@/components/site/Footer";
import useDocumentMeta from "@/lib/useDocumentMeta";
import { cn } from "@/lib/cn";

/**
 * The frame every route shares: the fixed header, a spacer that clears it, the
 * page body, and the footer.
 *
 * Each page used to declare this itself, which is how eleven of them ended up
 * reserving `pt-20` (80px) under a 72px header while the two newsroom routes
 * used the correct `pt-[72px]`. The spacer now reads the `nav` spacing token,
 * so the offset cannot drift from the header's height again.
 *
 * `offset={false}` is for routes whose first section clears the header itself —
 * the home page's hero is full-bleed and applies `pt-nav` internally, so a
 * spacer above it would push the fold down twice.
 *
 * Because every route already renders this, it is also where each one declares
 * its `title` and `description` — see lib/useDocumentMeta.js. Omitting the
 * title falls back to the bare firm name.
 *
 * <Nav> and <Footer> are siblings of <main>, not children of it. They used to
 * be nested inside, which silently cost the site both of its bookend
 * landmarks: `banner` and `contentinfo` are only exposed when the element is
 * *not* a descendant of <main>, so on every route the header and footer
 * announced as generic groups and landmark navigation had one destination.
 * The `page-transition` fade stays on <main> alone, which is also more correct
 * — the header is persistent chrome and has no reason to flicker per route.
 */
export default function PageShell({ testId, className, offset = true, title, description, children }) {
  useDocumentMeta(title, description);

  return (
    <>
      <a href="#main-content" className="skip-link bg-brown text-white px-5 py-3 text-[13px] font-semibold uppercase tracking-[0.08em]">
        Skip to content
      </a>
      <Nav />
      <main
        id="main-content"
        tabIndex={-1}
        data-testid={testId}
        className={cn("bg-cream text-ink page-transition outline-none", className)}
      >
        {offset && <div className="pt-nav" />}
        {children}
      </main>
      <Footer />
    </>
  );
}

export { PageShell };
