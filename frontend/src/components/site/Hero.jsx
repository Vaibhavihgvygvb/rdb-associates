import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Reveal from "@/components/motion/Reveal";

const HERO_IMG =
  "https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&w=1400&q=80";

/**
 * The hero sits above the fold, so nothing here is scroll-triggered —
 * `inView={false}` tells Reveal to animate on mount instead. Delays climb in
 * small steps so the panel assembles in reading order (eyebrow → headline →
 * copy → actions → credentials) and finishes in well under a second.
 */
const STAGE = {
  eyebrow: 0,
  heading: 90,
  lead: 190,
  body: 260,
  actions: 350,
  meta: 430,
};

export default function Hero() {
  return (
    <section id="top" data-testid="hero-section" className="relative bg-white pt-nav">
      {/* dvh, not vh: on mobile browsers `100vh` is the viewport with the
          toolbars retracted, so the fold sat below the visible screen edge
          until the user scrolled. */}
      <div className="grid lg:grid-cols-2 min-h-[calc(100dvh-theme(spacing.nav))]">
        {/* Text panel */}
        <div className="flex items-center order-2 lg:order-1">
          {/* The left inset is computed so the hero's text starts on exactly
              the same vertical line as `.shell` — the header logo, every page
              heading and the footer. Previously this column was a 620px box
              right-aligned inside its half of the split, which put the h1 at
              141px against the shell's 121px: the one page where the header
              did not line up with the content under it.

              The arithmetic, in terms of this cell's own width C (half the
              viewport, since the grid is two equal columns): the shell's
              content edge is (100vw − 1280)/2 + 48, and 100vw = 2C, which
              reduces to C − 592px. `max()` holds it at the 48px gutter below
              1280px, where the shell is gutter-bound rather than centred.
              Expressed against `100%` rather than `100vw` deliberately — a
              percentage resolves against this element's containing block, so
              it excludes the scrollbar and the two edges agree exactly.

              `lg:py-12` replaces `lg:py-0`: with the column vertically centred,
              a tall hero at a short viewport (1024×900) ran its first line hard
              against the fixed header. */}
          {/* `mr-auto`, not `mx-auto`. Centring the 620px column only has an
              effect once the viewport exceeds it — so between roughly 670px
              and the `lg` breakpoint the hero's text sat up to 100px inside the
              gutter that the header above it and every section below it share.
              The same misalignment `lg:pl` corrects above 1024, one breakpoint
              band lower. Below ~670px the column is narrower than its own
              max-width and this changes nothing. */}
          <div className="w-full py-16 px-6 md:px-12 max-w-[620px] mr-auto lg:max-w-none lg:py-12 lg:pr-16 lg:pl-[max(3rem,calc(100%-37rem))]">
            <Reveal inView={false} delay={STAGE.eyebrow} distance={12} asChild>
              <div className="eyebrow">
                <span className="eyebrow-label">
                  Advocates &amp; Legal Counsel · New Delhi
                </span>
              </div>
            </Reveal>

            <Reveal inView={false} delay={STAGE.heading} distance={20} blur asChild>
              <h1 className="font-serif text-ink text-4xl sm:text-5xl lg:text-[56px] xl:text-[64px] leading-[1.04] tracking-tight">
                Rigorous advocacy,
                <br />
                considered counsel.
              </h1>
            </Reveal>

            <Reveal inView={false} delay={STAGE.lead} distance={16} asChild>
              <p className="mt-6 text-lg text-ink font-medium">
                The Chambers of Ramandeep Bawa — Advocate, High Court of Delhi.
              </p>
            </Reveal>

            <Reveal inView={false} delay={STAGE.body} distance={16} asChild>
              <p className="mt-5 max-w-xl text-ink-soft text-base leading-relaxed">
                A boutique practice representing individuals and enterprises before the High Court of
                Delhi, District Courts and tribunals across India — with an unwavering commitment to
                craft, discretion and outcome.
              </p>
            </Reveal>

            <Reveal inView={false} delay={STAGE.actions} distance={16} asChild>
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
            </Reveal>

            <Reveal inView={false} delay={STAGE.meta} distance={14} asChild>
              {/* The bullets were `text-border` (#D9D9D9) on white — 1.35:1,
                  which is not a separator so much as a gap of unexplained
                  width — and were not `aria-hidden`, so a screen reader read
                  each one out between the facts. */}
              <div className="mt-12 pt-6 border-t border-border flex flex-wrap gap-x-8 gap-y-3 text-[13px] text-ink-soft">
                <span>New Delhi, India</span>
                <span aria-hidden className="text-ink-soft/50">•</span>
                <span>NLSIU Alumnus</span>
                <span aria-hidden className="text-ink-soft/50">•</span>
                <span>15+ Years at the Bar</span>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Image panel */}
        <div className="relative order-1 lg:order-2 min-h-[320px] lg:min-h-0 overflow-hidden">
          {/* Settles from a slight overscale rather than sliding — the frame
              stays put, which keeps the split-screen edge from shifting. */}
          <Reveal
            inView={false}
            direction="none"
            initialScale={1.06}
            transition={{ type: "spring", stiffness: 60, damping: 20, mass: 0.9 }}
            asChild
          >
            <img
              src={HERO_IMG}
              alt="Courthouse colonnade"
              /* LCP element: must not be lazy, and wants priority over the
                 route chunks the browser is fetching in parallel. Reveal
                 already fades this in, so it doesn't need FadeImage. */
              fetchPriority="high"
              decoding="async"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </Reveal>
          <div className="absolute inset-0 bg-gradient-to-t from-ink/30 via-transparent to-transparent lg:bg-gradient-to-r lg:from-white/10 lg:to-transparent" />
          <Reveal inView={false} delay={STAGE.actions} distance={20} asChild>
            <div className="absolute bottom-6 left-6 right-6 lg:left-8 lg:right-auto lg:max-w-xs bg-white/95 backdrop-blur-sm px-6 py-5 elevate-card">
              <div className="text-[10px] uppercase tracking-[0.18em] text-brown font-semibold">Est. 2013</div>
              <div className="mt-1.5 font-serif text-ink text-lg leading-snug">Practising before the High Court of Delhi</div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
