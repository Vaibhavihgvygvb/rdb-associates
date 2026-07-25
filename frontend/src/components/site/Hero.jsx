import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const HERO_IMG =
  "https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&w=1400&q=80";

export default function Hero() {
  return (
    <section id="top" data-testid="hero-section" className="relative bg-white pt-[72px]">
      <div className="grid lg:grid-cols-2 min-h-[calc(100vh-72px)]">
        {/* Text panel */}
        <div className="flex items-center order-2 lg:order-1">
          <div className="max-w-[620px] mx-auto lg:ml-auto lg:mr-0 px-6 md:px-12 lg:pr-16 py-16 lg:py-0 w-full">
            <div className="flex items-center gap-3 mb-7">
              <span className="h-px w-8 bg-brown" />
              <span className="text-brown text-[12px] font-semibold uppercase tracking-[0.16em]">
                Advocates &amp; Legal Counsel · New Delhi
              </span>
            </div>

            <h1 className="font-serif text-ink text-4xl sm:text-5xl lg:text-[56px] xl:text-[64px] leading-[1.04] tracking-tight">
              Rigorous advocacy,
              <br />
              considered counsel.
            </h1>

            <p className="mt-6 text-lg text-ink font-medium">
              The Chambers of Ramandeep Bawa — Advocate, High Court of Delhi.
            </p>

            <p className="mt-5 max-w-xl text-ink-soft text-base leading-relaxed">
              A boutique practice representing individuals and enterprises before the High Court of
              Delhi, District Courts and tribunals across India — with an unwavering commitment to
              craft, discretion and outcome.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link
                to="/contact"
                data-testid="hero-cta-consult"
                className="inline-flex items-center gap-2.5 bg-brown text-white px-7 py-3.5 text-[13px] font-semibold uppercase tracking-[0.08em] hover:bg-brown-light transition-colors duration-200 group"
              >
                Request a consultation
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
              <Link
                to="/practice-areas"
                data-testid="hero-cta-practice"
                className="inline-flex items-center gap-2.5 text-ink px-2 py-3.5 text-[13px] font-semibold uppercase tracking-[0.08em] border-b-2 border-ink hover:border-brown hover:text-brown transition-colors duration-200"
              >
                Explore capabilities
              </Link>
            </div>

            <div className="mt-12 pt-6 border-t border-border flex flex-wrap gap-x-8 gap-y-3 text-[13px] text-ink-soft">
              <span>New Delhi, India</span>
              <span className="text-border">•</span>
              <span>NLSIU Alumnus</span>
              <span className="text-border">•</span>
              <span>15+ Years at the Bar</span>
            </div>
          </div>
        </div>

        {/* Image panel */}
        <div className="relative order-1 lg:order-2 min-h-[320px] lg:min-h-0">
          <img src={HERO_IMG} alt="Courthouse colonnade" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/30 via-transparent to-transparent lg:bg-gradient-to-r lg:from-white/10 lg:to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 lg:left-8 lg:right-auto lg:max-w-xs bg-white/95 backdrop-blur-sm px-6 py-5 shadow-[0_16px_40px_-16px_rgba(0,0,0,0.3)]">
            <div className="text-[10px] uppercase tracking-[0.18em] text-brown font-semibold">Est. 2013</div>
            <div className="mt-1.5 font-serif text-ink text-lg leading-snug">Practising before the High Court of Delhi</div>
          </div>
        </div>
      </div>
    </section>
  );
}
