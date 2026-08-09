import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Search, ArrowRight, ArrowUpRight, ChevronDown } from "lucide-react";
import SearchPanel from "@/components/site/SearchPanel";
import ScrollProgress from "@/components/motion/ScrollProgress";
import { POSTS as insightPieces, TOPICS as insightTopics } from "@/data/insights";

const practiceAreas = [
  ["Civil Litigation", "/practice-areas"],
  ["Commercial Litigation", "/practice-areas"],
  ["Trial Advocacy", "/practice-areas"],
  ["Alternative Dispute Resolution", "/practice-areas"],
  ["Medical Law & Ethics", "/practice-areas"],
  ["Cyber Law", "/practice-areas"],
  ["Tribunals & Regulatory", "/practice-areas"],
  ["Advisory & Drafting", "/practice-areas"],
];

const expertise = [
  ["Courtroom Advocacy", "/expertise"],
  ["Trial Strategy", "/expertise"],
  ["Legal Drafting", "/expertise"],
  ["Litigation Management", "/expertise"],
  ["Legal Research", "/expertise"],
  ["Dispute Resolution", "/expertise"],
];

const firmLinks = [
  ["Journey", "/journey"],
  ["Credentials", "/credentials"],
  ["Our Work", "/work"],
  ["Stages of a Matter", "/stages"],
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  // "capabilities" | "insights" | null — only one panel is ever open.
  const [panel, setPanel] = useState(null);
  const closeTimer = useRef(null);
  // Keyed by panel id, so Escape can hand focus back to whichever trigger
  // opened the panel.
  const triggerRefs = useRef({});

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    // Passive: this only reads scrollY, so the browser need not wait on it to
    // decide whether the scroll was cancelled.
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Escape closes an open panel, matching the search dialog and the newsroom
  // facets. Without it a keyboard user who opened Capabilities had no way to
  // dismiss it.
  useEffect(() => {
    if (!panel) return;
    const onKey = (e) => {
      if (e.key !== "Escape") return;
      setPanel(null);
      triggerRefs.current[panel]?.focus();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [panel]);

  // A pending close must not fire into an unmounted component.
  useEffect(() => () => clearTimeout(closeTimer.current), []);

  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const openPanel = (id) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setPanel(id);
  };
  const closePanel = () => {
    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setPanel(null), 120);
  };
  // Hover opens these, but hover is not an interaction a keyboard or a touch
  // screen can perform — Capabilities was a <button> with no onClick at all,
  // so pressing Enter on it did nothing and its entire submenu was
  // unreachable without a mouse.
  const togglePanel = (id) => {
    clearTimeout(closeTimer.current);
    setPanel((current) => (current === id ? null : id));
  };

  return (
    <>
    <header
      data-testid="site-nav"
      onMouseLeave={closePanel}
      className={`fixed top-0 inset-x-0 z-50 transition-shadow duration-300 bg-white ${
        scrolled || panel ? "border-b border-border shadow-[0_1px_0_rgba(0,0,0,0.02)]" : "border-b border-border/60"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 h-nav flex items-center justify-between">
        {/* aria-label rather than alt text on the mark: the wordmark beside it
            is `hidden sm:flex`, so on a phone the image is all that is left and
            the link would otherwise have no accessible name at all. With the
            name on the link, the mark itself is decorative. */}
        <Link
          to="/"
          data-testid="nav-logo"
          aria-label="RDB Associates — home"
          className="flex items-center gap-3 group shrink-0"
        >
          <img
            src="/rdb-monogram.png"
            alt=""
            aria-hidden="true"
            width={167}
            height={120}
            className="h-9 w-auto"
          />
          <div className="hidden sm:flex flex-col leading-none">
            <span className="font-serif text-ink text-[17px] font-semibold tracking-tight">RDB Associates</span>
            <span className="text-[10px] uppercase tracking-[0.18em] text-ink-soft mt-1">Chambers of Ramandeep Bawa</span>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-8 h-full">
          <button
            type="button"
            data-testid="nav-capabilities"
            ref={(el) => { triggerRefs.current.capabilities = el; }}
            onMouseEnter={() => openPanel("capabilities")}
            onClick={() => togglePanel("capabilities")}
            aria-expanded={panel === "capabilities"}
            aria-haspopup="true"
            aria-controls="nav-panel-capabilities"
            className={`flex items-center gap-1.5 text-[15px] font-medium h-full border-b-2 transition-colors duration-200 ${
              panel === "capabilities" ? "text-brown border-brown" : "text-ink border-transparent hover:text-brown"
            }`}
          >
            Capabilities
            <ChevronDown size={15} className={`transition-transform duration-200 ${panel === "capabilities" ? "rotate-180" : ""}`} />
          </button>

          <Link
            to="/about"
            data-testid="nav-link-about"
            onMouseEnter={closePanel}
            className="text-[15px] font-medium text-ink hover:text-brown border-b-2 border-transparent hover:border-brown h-full flex items-center transition-colors duration-200"
          >
            About
          </Link>
          <Link
            to="/newsroom"
            data-testid="nav-link-newsroom"
            onMouseEnter={closePanel}
            className="text-[15px] font-medium text-ink hover:text-brown border-b-2 border-transparent hover:border-brown h-full flex items-center transition-colors duration-200"
          >
            Newsroom
          </Link>

          {/* Insights keeps its link — clicking still goes to /insights — and reveals
              a panel on hover, the same interaction Capabilities already uses. */}
          <Link
            to="/insights"
            data-testid="nav-link-insights"
            ref={(el) => { triggerRefs.current.insights = el; }}
            onMouseEnter={() => openPanel("insights")}
            aria-expanded={panel === "insights"}
            aria-haspopup="true"
            aria-controls="nav-panel-insights"
            className={`flex items-center gap-1.5 text-[15px] font-medium h-full border-b-2 transition-colors duration-200 ${
              panel === "insights" ? "text-brown border-brown" : "text-ink border-transparent hover:text-brown"
            }`}
          >
            Insights
            <ChevronDown size={15} className={`transition-transform duration-200 ${panel === "insights" ? "rotate-180" : ""}`} />
          </Link>

          <Link
            to="/careers"
            data-testid="nav-link-careers"
            onMouseEnter={closePanel}
            className="text-[15px] font-medium text-ink hover:text-brown border-b-2 border-transparent hover:border-brown h-full flex items-center transition-colors duration-200"
          >
            Careers
          </Link>
        </nav>

        <div className="hidden lg:flex items-center gap-5 shrink-0">
          <button
            onClick={() => setSearchOpen(true)}
            data-testid="nav-search"
            aria-label="Search"
            className="text-ink hover:text-brown transition-colors"
          >
            <Search size={19} strokeWidth={1.6} />
          </button>
          <Link
            to="/contact"
            data-testid="nav-cta-contact"
            className="inline-flex items-center gap-2 bg-brown text-white px-5 py-2.5 text-[13px] font-semibold uppercase tracking-[0.08em] hover:bg-brown-light transition-colors duration-200"
          >
            Contact
            <ArrowRight size={15} />
          </Link>
        </div>

        <div className="lg:hidden flex items-center gap-1">
          <button
            onClick={() => {
              setOpen(false);
              setSearchOpen(true);
            }}
            data-testid="nav-search-mobile"
            aria-label="Search"
            className="text-ink w-11 h-11 flex items-center justify-center"
          >
            <Search size={21} strokeWidth={1.6} />
          </button>
          {/* w-11/h-11 keeps both controls at the 44px minimum tap target. */}
          <button
            data-testid="nav-mobile-toggle"
            className="text-ink w-11 h-11 flex items-center justify-center"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Capabilities mega-menu (desktop) */}
      <div
        id="nav-panel-capabilities"
        data-testid="nav-mega"
        onMouseEnter={() => openPanel("capabilities")}
        aria-hidden={panel !== "capabilities"}
        className={`hidden lg:block absolute inset-x-0 top-nav bg-white border-b border-border shadow-[0_24px_40px_-16px_rgba(0,0,0,0.14)] transition-[opacity,transform] duration-200 ease-out ${
          panel === "capabilities"
            ? "visible opacity-100 translate-y-0 pointer-events-auto"
            : "invisible opacity-0 -translate-y-1 pointer-events-none"
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-10 grid grid-cols-12 gap-10">
          <div className="col-span-4">
            <MegaHeading to="/practice-areas" label="Practice Areas" />
            <ul className="mt-5 space-y-2.5">
              {practiceAreas.map(([t, to]) => (
                <MegaItem key={t} to={to} label={t} />
              ))}
            </ul>
          </div>
          <div className="col-span-3">
            <MegaHeading to="/expertise" label="Expertise" />
            <ul className="mt-5 space-y-2.5">
              {expertise.map(([t, to]) => (
                <MegaItem key={t} to={to} label={t} />
              ))}
            </ul>
          </div>
          <div className="col-span-2">
            <MegaHeading to="/about" label="The Chambers" />
            <ul className="mt-5 space-y-2.5">
              {firmLinks.map(([t, to]) => (
                <MegaItem key={t} to={to} label={t} />
              ))}
            </ul>
          </div>
          <Link to="/contact" className="col-span-3 group relative bg-ink text-white p-7 flex flex-col justify-between overflow-hidden">
            <div className="text-[11px] uppercase tracking-[0.18em] text-white/60">Consultation</div>
            <div>
              <div className="font-serif text-2xl leading-snug mt-6">Discuss your matter with the chambers.</div>
              <div className="mt-4 inline-flex items-center gap-2 text-brown-soft text-sm font-medium">
                Request a consultation
                <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform duration-200" />
              </div>
            </div>
          </Link>
        </div>
      </div>

      {/* Insights panel (desktop) */}
      <div
        id="nav-panel-insights"
        data-testid="nav-insights-panel"
        onMouseEnter={() => openPanel("insights")}
        aria-hidden={panel !== "insights"}
        className={`hidden lg:block absolute inset-x-0 top-nav bg-white border-b border-border shadow-[0_24px_40px_-16px_rgba(0,0,0,0.14)] transition-[opacity,transform] duration-200 ease-out ${
          panel === "insights"
            ? "visible opacity-100 translate-y-0 pointer-events-auto"
            : "invisible opacity-0 -translate-y-1 pointer-events-none"
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-10 grid grid-cols-12 gap-10">
          <div className="col-span-5">
            <MegaHeading to="/insights" label="Latest Writing" />
            <div className="mt-5 grid gap-4">
              {insightPieces.map((p) => (
                <Link
                  key={p.title}
                  to="/insights"
                  className="group border border-border p-4 hover:border-brown transition-colors duration-200"
                >
                  <div className="text-[9.5px] uppercase tracking-widest-plus text-brown font-semibold">{p.tag}</div>
                  <div className="text-[14.5px] text-ink mt-2 leading-snug group-hover:text-brown transition-colors duration-200">
                    {p.title}
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="col-span-4">
            <div className="text-[11px] uppercase tracking-[0.18em] text-ink-soft font-semibold">Topics</div>
            <ul className="mt-5 space-y-2.5">
              {insightTopics.map((t) => (
                <MegaItem key={t} to="/insights" label={t} />
              ))}
            </ul>
          </div>

          <Link to="/newsletter" className="col-span-3 group relative bg-ink text-white p-7 flex flex-col justify-between overflow-hidden">
            <div className="text-[11px] uppercase tracking-[0.18em] text-white/60">Newsletter</div>
            <div>
              <div className="font-serif text-2xl leading-snug mt-6">Firm news and legal updates.</div>
              <div className="mt-4 inline-flex items-center gap-2 text-brown-soft text-sm font-medium">
                Subscribe
                <ArrowUpRight size={15} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
              </div>
            </div>
          </Link>
        </div>
      </div>

      {/* Mobile panel */}
      {open && (
        <div data-testid="nav-mobile-panel" data-lenis-prevent className="lg:hidden bg-white border-t border-border px-6 py-6 max-h-[80vh] overflow-y-auto">
          <div className="flex flex-col gap-1">
            <MobileGroup label="Practice Areas" items={practiceAreas} onNav={() => setOpen(false)} />
            <MobileGroup label="Expertise" items={expertise} onNav={() => setOpen(false)} />
            <MobileGroup label="The Chambers" items={firmLinks} onNav={() => setOpen(false)} />
            <Link to="/about" onClick={() => setOpen(false)} className="py-3 text-[15px] font-medium text-ink border-b border-border">
              About
            </Link>
            <Link to="/newsroom" onClick={() => setOpen(false)} className="py-3 text-[15px] font-medium text-ink border-b border-border">
              Newsroom
            </Link>
            <Link to="/insights" onClick={() => setOpen(false)} className="py-3 text-[15px] font-medium text-ink border-b border-border">
              Insights
            </Link>
            <Link to="/careers" onClick={() => setOpen(false)} className="py-3 text-[15px] font-medium text-ink border-b border-border">
              Careers
            </Link>
            <Link to="/contact" onClick={() => setOpen(false)} className="mt-4 bg-brown text-white px-5 py-3.5 text-[13px] font-semibold uppercase tracking-[0.08em] text-center">
              Contact
            </Link>
          </div>
        </div>
      )}

      {/* Reading progress, pinned to the header's bottom edge. Sits on top of
          the existing 1px border rather than adding height to the 72px bar. */}
      <ScrollProgress className="absolute inset-x-0 -bottom-px" />
    </header>

    {/* Sibling of the header, not a child: the panel needs its own stacking
        context above the fixed nav rather than inheriting the nav's. */}
    <SearchPanel open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}

function MegaHeading({ to, label }) {
  return (
    <Link to={to} className="group inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.18em] text-brown font-semibold">
      {label}
      <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform duration-200" />
    </Link>
  );
}

function MegaItem({ to, label }) {
  return (
    <li>
      <Link to={to} className="text-[15px] text-ink-soft hover:text-brown transition-colors duration-150">
        {label}
      </Link>
    </li>
  );
}

function MobileGroup({ label, items, onNav }) {
  return (
    <div className="border-b border-border py-3">
      <div className="text-[11px] uppercase tracking-[0.18em] text-brown font-semibold mb-3">{label}</div>
      <ul className="space-y-2.5">
        {items.map(([t, to]) => (
          <li key={t}>
            <Link to={to} onClick={onNav} className="text-[15px] text-ink-soft">
              {t}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
