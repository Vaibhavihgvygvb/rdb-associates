import { ArrowRight, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const HERO_BG = "https://thumbs4.imagebam.com/ef/f9/c9/ME1EKUBA_t.jpeg";

export default function Hero() {
  return (
    <section id="top" data-testid="hero-section" className="relative min-h-[100vh] flex items-end overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${HERO_BG}')` }} aria-hidden />
      <div className="absolute inset-0 bg-gradient-to-r from-sage/95 via-sage/85 to-sage/50" />
      <div className="absolute inset-0 bg-gradient-to-b from-sage/40 via-transparent to-sage/70" />

      <div className="absolute left-6 md:left-12 top-1/2 -translate-y-1/2 hidden md:block">
        <span className="vertical-text text-[10px] text-brown/70 uppercase tracking-widest-plus">Est. 2013 · New Delhi</span>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 md:px-12 pb-20 md:pb-28 pt-40 w-full">
        <div className="max-w-4xl">
          <div className="flex items-center gap-4 mb-8 animate-fade-in-up">
            <span className="h-px w-12 bg-brown" />
            <span className="text-brown text-xs md:text-sm uppercase tracking-widest-plus">
              RDB Associates · Advocates &amp; Legal Counsel
            </span>
          </div>

          <h1 className="font-serif text-cream text-5xl sm:text-6xl md:text-7xl lg:text-[88px] leading-[1.05] tracking-tight animate-fade-in-up" style={{ animationDelay: "150ms" }}>
            Ramandeep <span className="italic text-brown/90">Bawa</span>
            <span className="block text-2xl md:text-3xl mt-6 text-cream/85 font-serif italic tracking-normal">
              Advocate, High Court of Delhi
            </span>
          </h1>

          <p className="mt-10 max-w-2xl text-cream/80 text-base md:text-lg leading-relaxed animate-fade-in-up" style={{ animationDelay: "300ms" }}>
            A boutique practice built on rigorous courtroom advocacy and considered counsel. Representing individuals and enterprises before the High Court of Delhi, District Courts, and tribunals across India — with an unwavering commitment to craft, discretion and outcome.
          </p>

          <div className="mt-12 flex flex-wrap items-center gap-5 animate-fade-in-up" style={{ animationDelay: "450ms" }}>
            <Link to="/contact" data-testid="hero-cta-consult"
              className="inline-flex items-center gap-3 bg-brown text-cream px-8 py-4 text-xs uppercase tracking-widest-plus font-medium hover:bg-cream hover:text-brown transition-colors duration-300 group">
              Contact
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
            <Link to="/practice-areas" data-testid="hero-cta-practice"
              className="inline-flex items-center gap-3 border border-cream/40 text-cream px-8 py-4 text-xs uppercase tracking-widest-plus hover:border-brown hover:text-brown transition-colors duration-300">
              Practice Areas
            </Link>
          </div>

          <div className="mt-16 flex flex-wrap gap-x-10 gap-y-4 text-cream/70 text-xs uppercase tracking-widest-plus animate-fade-in-up" style={{ animationDelay: "600ms" }}>
            <span className="flex items-center gap-2">
              <MapPin size={13} className="text-brown" strokeWidth={1.5} /> New Delhi, India
            </span>
            <span>NLSIU · Alumnus</span>
            <span>15+ Years at the Bar</span>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-brown/60 to-transparent" />
    </section>
  );
}