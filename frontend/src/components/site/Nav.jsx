import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

const links = [
  { to: "/about", label: "About" },
  { to: "/practice-areas", label: "Practice" },
  { to: "/expertise", label: "Expertise" },
  { to: "/journey", label: "Journey" },
  { to: "/work", label: "Our Work" },
  { to: "/careers", label: "Careers" },
  { to: "/insights", label: "Insights" },
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
        scrolled ? "bg-sage/95 backdrop-blur-xl border-b border-brown/30" : "bg-sage/60 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
        <Link to="/" data-testid="nav-logo" className="flex items-center gap-3 group">
          <div className="w-10 h-10 border border-brown flex items-center justify-center text-brown font-serif text-lg tracking-widest">R</div>
          <div className="hidden sm:flex flex-col leading-none">
            <span className="font-serif text-cream text-lg tracking-wide">RDB Associates</span>
            <span className="text-[10px] uppercase tracking-widest-plus text-brown mt-1">Chambers of Ramandeep Bawa</span>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-6">
          {links.map((l) => (
            <Link key={l.to} to={l.to} data-testid={`nav-link-${l.label.toLowerCase().replace(/\s+/g, "-")}`}
              className="text-cream/85 hover:text-brown text-xs tracking-widest uppercase transition-colors duration-300 brown-underline">
              {l.label}
            </Link>
          ))}
        </nav>

        <Link to="/contact" data-testid="nav-cta-contact"
          className="hidden md:inline-flex items-center gap-2 border border-brown text-brown px-5 py-2.5 text-xs tracking-widest-plus uppercase hover:bg-brown hover:text-sage transition-colors duration-300">
          Contact
        </Link>

        <button data-testid="nav-mobile-toggle" className="lg:hidden text-cream p-2"
          onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div data-testid="nav-mobile-panel" className="lg:hidden bg-sage/98 backdrop-blur-xl border-t border-brown/30 px-6 py-6">
          <div className="flex flex-col gap-5">
            {links.map((l) => (
              <Link key={l.to} to={l.to} onClick={() => setOpen(false)}
                className="text-cream/90 text-sm tracking-widest uppercase">
                {l.label}
              </Link>
            ))}
            <Link to="/contact" onClick={() => setOpen(false)}
              className="mt-2 border border-brown text-brown px-5 py-3 text-xs tracking-widest-plus uppercase text-center">
              Contact
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
