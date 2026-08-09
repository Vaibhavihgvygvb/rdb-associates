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
 */
export default function PageShell({ testId, className, offset = true, title, description, children }) {
  useDocumentMeta(title, description);

  return (
    <main data-testid={testId} className={cn("bg-cream text-ink page-transition", className)}>
      <Nav />
      {offset && <div className="pt-nav" />}
      {children}
      <Footer />
    </main>
  );
}

export { PageShell };
