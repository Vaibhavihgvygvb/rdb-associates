import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Search, ArrowRight, ChevronDown } from "lucide-react";

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

const topLinks = [
  { label: "About", to: "/about" },
  { label: "Insights", to: "/insights" },
  { label: "Careers", to: "/careers" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [mega, setMega] = useState(false);
  const closeTimer = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const openMega = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setMega(true);
  };
  const closeMega = () => {
    closeTimer.current = setTimeout(() => setMega(false), 120);
  };

  return (
    <header
      data-testid="site-nav"
      onMouseLeave={closeMega}
      className={`fixed top-0 inset-x-0 z-50 transition-shadow duration-300 bg-white ${
        scrolled || mega ? "border-b border-border shadow-[0_1px_0_rgba(0,0,0,0.02)]" : "border-b border-border/60"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 h-[72px] flex items-center justify-between">
        <Link to="/" data-testid="nav-logo" className="flex items-center gap-3 group shrink-0">
          <div className="w-9 h-9 bg-ink text-white flex items-center justify-center font-serif text-base tracking-tight">R</div>
          <div className="hidden sm:flex flex-col leading-none">
            <span className="font-serif text-ink text-[17px] font-semibold tracking-tight">RDB Associates</span>
            <span className="text-[10px] uppercase tracking-[0.18em] text-ink-soft mt-1">Chambers of Ramandeep Bawa</span>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-8 h-full">
          <button
            data-testid="nav-capabilities"
            onMouseEnter={openMega}
            className={`flex items-center gap-1.5 text-[15px] font-medium h-full border-b-2 transition-colors duration-200 ${
              mega ? "text-brown border-brown" : "text-ink border-transparent hover:text-brown"
            }`}
          >
            Capabilities
            <ChevronDown size={15} className={`transition-transform duration-200 ${mega ? "rotate-180" : ""}`} />
          </button>
          {topLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              data-testid={`nav-link-${l.label.toLowerCase()}`}
              onMouseEnter={closeMega}
              className="text-[15px] font-medium text-ink hover:text-brown border-b-2 border-transparent hover:border-brown h-full flex items-center transition-colors duration-200"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-5 shrink-0">
          <button aria-label="Search" className="text-ink hover:text-brown transition-colors">
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

        <button data-testid="nav-mobile-toggle" className="lg:hidden text-ink p-2" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Capabilities mega-menu (desktop) */}
      {mega && (
        <div
          data-testid="nav-mega"
          onMouseEnter={openMega}
          className="hidden lg:block absolute inset-x-0 top-[72px] bg-white border-b border-border shadow-[0_24px_40px_-16px_rgba(0,0,0,0.14)] animate-fade-in-up"
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
      )}

      {/* Mobile panel */}
      {open && (
        <div data-testid="nav-mobile-panel" className="lg:hidden bg-white border-t border-border px-6 py-6 max-h-[80vh] overflow-y-auto">
          <div className="flex flex-col gap-1">
            <MobileGroup label="Practice Areas" items={practiceAreas} onNav={() => setOpen(false)} />
            <MobileGroup label="Expertise" items={expertise} onNav={() => setOpen(false)} />
            <MobileGroup label="The Chambers" items={firmLinks} onNav={() => setOpen(false)} />
            {topLinks.map((l) => (
              <Link key={l.to} to={l.to} onClick={() => setOpen(false)} className="py-3 text-[15px] font-medium text-ink border-b border-border">
                {l.label}
              </Link>
            ))}
            <Link to="/contact" onClick={() => setOpen(false)} className="mt-4 bg-brown text-white px-5 py-3.5 text-[13px] font-semibold uppercase tracking-[0.08em] text-center">
              Contact
            </Link>
          </div>
        </div>
      )}
    </header>
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
