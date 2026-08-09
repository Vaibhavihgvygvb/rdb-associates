import { useRef } from "react";
import { motion, useScroll, useSpring, useInView, useReducedMotion } from "motion/react";
import Reveal from "@/components/motion/Reveal";

const events = [
  { year: "2011", title: "Called to the Bar", body: "Began practice under the mentorship of Senior Advocate Ajay Burman — developing foundational rigour in courtroom advocacy, drafting and litigation strategy." },
  { year: "2012", title: "Diploma in Cyber Laws", body: "Government Law College, Mumbai — an early specialisation in the emerging jurisprudence of information technology." },
  { year: "2013", title: "Independent Practice", body: "Established an independent practice representing clients across District Courts, High Courts and tribunals throughout India." },
  { year: "2022", title: "PG Diploma · Medical Law & Ethics", body: "National Law School of India University — deepening capability in medico-legal disputes, consent and professional negligence." },
  { year: "2022", title: "Diploma in ADR", body: "Indian Law Institute — formalising expertise in negotiated and structured dispute resolution." },
  { year: "Today", title: "Founder · RDB Associates", body: "A boutique chambers based in New Delhi, focused on courtroom advocacy, commercial disputes and specialised advisory work." },
];

// Palette literals, needed because these are animated between rather than
// swapped as classes. Kept in step with tailwind.config.js.
const EMERALD = "#007A5A";
const HAIRLINE = "#D9D9D9";
const SURFACE = "#F5F5F4"; // bg-cream-dark, so an inactive marker reads as hollow

// Both the spine and the markers key off the same imaginary read line at 65%
// of the viewport, so a marker fills exactly as the line reaches it.
//
// The top margin is deliberately enormous rather than 0. With a narrow band an
// item only ever activates if it is sampled *while inside* it — so jumping the
// scroll (a #hash link, End, a fast flick) skips items and strands them at 45%
// opacity for good. Extending the root upward makes the test "has this reached
// the read line yet", which is monotonic and cannot be skipped.
const READ_LINE_MARGIN = "9999px 0px -35% 0px";

function TimelineEvent({ event, index }) {
  const ref = useRef(null);
  const reduceMotion = useReducedMotion();
  const inView = useInView(ref, { once: true, margin: READ_LINE_MARGIN });
  const active = reduceMotion || inView;

  return (
    <div
      ref={ref}
      data-testid={`timeline-item-${index}`}
      data-active={active}
      className={`relative md:grid md:grid-cols-2 md:gap-16 ${index % 2 === 0 ? "" : "md:[&>*:first-child]:col-start-2"}`}
    >
      <motion.div
        initial={false}
        animate={{ opacity: active ? 1 : 0.45, y: active || reduceMotion ? 0 : 12 }}
        transition={{ type: "spring", stiffness: 160, damping: 24 }}
        className={`pl-14 md:pl-0 ${index % 2 === 0 ? "md:text-right md:pr-16" : "md:pl-16"}`}
      >
        <div className="text-brown font-serif text-3xl md:text-4xl">{event.year}</div>
        <h2 className="font-serif text-xl md:text-2xl text-ink mt-2">{event.title}</h2>
        <p className="text-ink-soft text-sm md:text-base mt-3 leading-relaxed max-w-md md:inline-block">{event.body}</p>
      </motion.div>

      {/* Fills as the read line reaches it. z-10 keeps it above the spine. */}
      <motion.span
        aria-hidden
        initial={false}
        animate={{
          backgroundColor: active ? EMERALD : SURFACE,
          borderColor: active ? EMERALD : HAIRLINE,
          scale: active ? 1 : 0.7,
        }}
        transition={{ type: "spring", stiffness: 320, damping: 26 }}
        /* rotate and x live in `style`, not as Tailwind classes: motion writes
           the whole `transform` property, so `rotate-45` would be overwritten
           the moment the scale animation ran and the diamond would square off. */
        className="absolute left-4 md:left-1/2 top-2 z-10 w-3 h-3 border"
        style={{ x: "-50%", rotate: 45 }}
      />
    </div>
  );
}

export default function Timeline() {
  const trackRef = useRef(null);
  const reduceMotion = useReducedMotion();

  // 0 when the first marker meets the read line, 1 when the last one does.
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start 65%", "end 65%"],
  });
  const drawn = useSpring(scrollYProgress, { stiffness: 220, damping: 40, bounce: 0 });

  return (
    <section id="timeline" data-testid="timeline-section" className="relative py-24 md:py-32 bg-cream-dark text-ink">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <Reveal asChild>
          <div className="max-w-3xl mb-16">
            <div className="eyebrow">
              <span className="eyebrow-label">The Journey</span>
            </div>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.05]">
              A career built <span className="italic text-brown">brief by brief</span>.
            </h1>
          </div>
        </Reveal>

        <div ref={trackRef} className="relative">
          {/* The unread remainder of the career. */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-1/2" />
          {/* Drawn over it as you descend — a career accumulating, which is the
              one thing on this site where the motion is the content. */}
          <motion.div
            aria-hidden
            style={{ scaleY: reduceMotion ? 1 : drawn, transformOrigin: "top" }}
            className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-brown md:-translate-x-1/2"
          />
          <div className="space-y-14">
            {events.map((e, i) => (
              <TimelineEvent key={e.year + e.title} event={e} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
