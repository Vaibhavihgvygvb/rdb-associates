import { Link } from "react-router-dom";
import { ArrowRight, Linkedin } from "lucide-react";
import { PORTRAIT } from "@/data/chambers";
import { Reveal, FadeImage } from "@/components/motion";

// The founding advocate leads the chambers. As associates and interns join,
// add them to this array — each renders as a card in the grid below.
// Shape: { name, role, credentials, image, focus }
const associates = [
  // {
  //   name: "Associate Name",
  //   role: "Associate",
  //   credentials: "LL.B",
  //   image: "https://…",
  //   focus: "Civil & commercial litigation",
  // },
];

export default function Team() {
  return (
    <Reveal asChild>
      <section id="team" data-testid="team-section" className="relative section-y bg-cream-dark text-ink">
        <div className="shell">
          <div className="max-w-3xl mb-16">
            <div className="eyebrow">
              <span className="eyebrow-label">Meet the Team</span>
            </div>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.04] tracking-tight">
              The people behind <span className="text-brown">the chambers</span>.
            </h2>
            <p className="mt-6 text-ink-soft text-base md:text-lg leading-relaxed">
              RDB Associates is led personally by its founding advocate, supported by a growing team of
              associates and interns who work directly on live matters — from drafting and research to
              courtroom advocacy.
            </p>
          </div>

          {/* Featured — founding advocate */}
          <article data-testid="team-featured" className="grid md:grid-cols-12 bg-white border border-border">
            <div className="md:col-span-5 lg:col-span-4 relative min-h-[380px]">
              {/* object-top: this frame is close to square while the portrait is taller
                  than it is wide, so a centred crop would cut the hairline. */}
              <FadeImage src={PORTRAIT} alt="Ramandeep Bawa, Founding Advocate" className="absolute inset-0 w-full h-full object-cover object-top grayscale-[10%]" />
            </div>
            <div className="md:col-span-7 lg:col-span-8 p-8 md:p-12 flex flex-col justify-center">
              <div className="text-[11px] uppercase tracking-widest-plus text-brown font-semibold">Founding Advocate</div>
              <h3 className="font-serif text-3xl md:text-4xl text-ink mt-3">Ramandeep Bawa</h3>
              <div className="mt-2 text-ink-soft">Advocate, High Court of Delhi · B.A. LL.B (NLSIU)</div>
              <p className="mt-6 text-ink-soft leading-relaxed max-w-2xl">
                Ramandeep Bawa founded RDB Associates in 2013 after training under Senior Advocate Ajay
                Burman. A litigating advocate based in New Delhi, he practises principally before the High
                Court of Delhi across civil, commercial, medical and cyber law — leading every mandate
                personally.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-6">
                <Link to="/journey" className="inline-flex items-center gap-2 text-brown text-[13px] font-semibold uppercase tracking-[0.08em] transition-colors duration-200">
                  View journey <ArrowRight size={15} />
                </Link>
                <a href="https://www.linkedin.com/in/ramandeep-bawa-6081b6155/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-ink-soft hover:text-brown transition-colors duration-200">
                  <Linkedin size={17} strokeWidth={1.6} /> <span className="text-sm">LinkedIn</span>
                </a>
              </div>
            </div>
          </article>

          {/* Associates — rendered as the team grows */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {associates.map((p) => (
              <article
                key={p.name}
                className="group bg-white border border-border hover:border-brown hover:elevate-card transition-[border-color,box-shadow] duration-300"
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <FadeImage src={p.image} alt={p.name} className="absolute inset-0 w-full h-full object-cover grayscale-[10%] group-hover:scale-[1.03] transition-transform duration-500" />
                </div>
                <div className="p-6">
                  <h3 className="font-serif text-xl text-ink">{p.name}</h3>
                  <div className="text-sm text-ink-soft mt-1">{p.role}</div>
                  {p.focus && <div className="text-[13px] text-ink-soft mt-3 leading-relaxed">{p.focus}</div>}
                  {p.credentials && (
                    <div className="text-[10px] uppercase tracking-widest-plus text-brown font-semibold mt-4">{p.credentials}</div>
                  )}
                </div>
              </article>
            ))}

            {/* Growing-practice / careers invitation — always shown */}
            <Link
              to="/careers"
              data-testid="team-join"
              className="group flex flex-col justify-between bg-ink text-white p-8 min-h-[300px] hover:bg-brown transition-colors duration-300"
            >
              <div className="text-[11px] uppercase tracking-widest-plus text-white/60">Associates &amp; Interns</div>
              <div>
                <div className="font-serif text-2xl leading-snug">The chambers are growing.</div>
                <p className="mt-3 text-white/70 text-sm leading-relaxed">
                  We welcome advocates and law students who share our commitment to craft.
                </p>
                <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold">
                  Join the team <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform duration-200" />
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </Reveal>
  );
}
