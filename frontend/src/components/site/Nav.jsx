import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { href: "#about", label: "About" },
  { href: "#practice", label: "Practice" },
  { href: "#expertise", label: "Expertise" },
  { href: "#timeline", label: "Journey" },
  { href: "#credentials", label: "Credentials" },
  { href: "#insights", label: "Insights" },
  { href: "#contact", label: "Contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      data-testid="site-nav"
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-500 ${
        scrolled ? "bg-navy/95 backdrop-blur-xl border-b border-gold/30" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
        <a href="#top" data-testid="nav-logo" className="flex items-center gap-3 group">
          <div className="w-10 h-10 border border-gold flex items-center justify-center text-gold font-serif text-lg tracking-widest">R</div>
          <div className="hidden sm:flex flex-col leading-none">
            <span className="font-serif text-cream text-lg tracking-wide">RDB Associates</span>
            <span className="text-[10px] uppercase tracking-widest-plus text-gold mt-1">Chambers of Ramandeep Bawa</span>
          </div>
        </a>

        <nav className="hidden lg:flex items-center gap-9">
          {links.map((l) => (
            <a key={l.href} href={l.href} data-testid={`nav-link-${l.label.toLowerCase()}`}
              className="text-cream/85 hover:text-gold text-sm tracking-widest uppercase transition-colors duration-300 gold-underline">
              {l.label}
            </a>
          ))}
        </nav>

        <a href="#contact" data-testid="nav-cta-consult"
          className="hidden md:inline-flex items-center gap-2 border border-gold text-gold px-5 py-2.5 text-xs tracking-widest-plus uppercase hover:bg-gold hover:text-navy transition-colors duration-300">
          Book Consultation
        </a>

        <button data-testid="nav-mobile-toggle" className="lg:hidden text-cream p-2"
          onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div data-testid="nav-mobile-panel" className="lg:hidden bg-navy/98 backdrop-blur-xl border-t border-gold/30 px-6 py-6">
          <div className="flex flex-col gap-5">
            {links.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)}
                className="text-cream/90 text-sm tracking-widest uppercase">
                {l.label}
              </a>
            ))}
            <a href="#contact" onClick={() => setOpen(false)}
              className="mt-2 border border-gold text-gold px-5 py-3 text-xs tracking-widest-plus uppercase text-center">
              Book Consultation
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
