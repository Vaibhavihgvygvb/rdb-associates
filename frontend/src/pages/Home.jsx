import { Link } from "react-router-dom";
import {
  ArrowRight, Scale, GraduationCap, Clock3, Award, Landmark,
  Newspaper, PenLine, Mail, Users, MessageSquare,
} from "lucide-react";
import PageShell from "@/components/site/PageShell";
import Hero from "@/components/site/Hero";
import Contact from "@/components/site/Contact";
import { Reveal, Reveals } from "@/components/motion";

// Twelve destinations, which is every route the nav can reach and a whole
// number of rows at one, two and three columns. It was ten, which left an
// orphan card alone on the last row at the desktop width, and omitted the
// newsroom and contact entirely.
const explore = [
  { to: "/about", Icon: Users, title: "About", body: "The advocate, the philosophy, the practice." },
  { to: "/practice-areas", Icon: Scale, title: "Practice Areas", body: "Civil, commercial, medical, cyber and more — with the Acts under which each is conducted." },
  { to: "/expertise", Icon: Award, title: "Expertise", body: "A method for every stage of a matter." },
  { to: "/journey", Icon: Clock3, title: "Journey", body: "A career built brief by brief since 2011." },
  { to: "/credentials", Icon: GraduationCap, title: "Credentials", body: "Education, memberships and languages." },
  { to: "/work", Icon: Landmark, title: "Our Work", body: "Previous works, major cases and clients." },
  { to: "/stages", Icon: Clock3, title: "Stages of a Matter", body: "How a matter typically progresses, step by step." },
  { to: "/careers", Icon: GraduationCap, title: "Careers", body: "Recruitment and internship opportunities." },
  { to: "/newsroom", Icon: Newspaper, title: "Newsroom", body: "Matter notes, announcements and speaking engagements." },
  { to: "/insights", Icon: PenLine, title: "Insights", body: "Notes from the chambers." },
  { to: "/newsletter", Icon: Mail, title: "Newsletter", body: "Subscribe for firm news and legal updates." },
  { to: "/contact", Icon: MessageSquare, title: "Contact", body: "Request a consultation with the chambers." },
];

function AboutTeaser() {
  return (
    <Reveal asChild>
      <section className="relative section-y bg-cream">
        {/* A measure-limited column. This was a 12-column grid holding a single
            `col-span-7` child — five columns of nothing, left over from an
            image that is no longer here. */}
        <div className="shell">
          <div className="max-w-3xl">
            <div className="eyebrow">
              <span className="eyebrow-label">About the Advocate</span>
            </div>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-ink leading-[1.05]">
              A practice grounded in <span className="italic text-brown">discipline</span>.
            </h2>
            <p className="mt-8 text-ink/70 text-base md:text-lg leading-relaxed">
              Ramandeep Bawa is a litigating advocate based in New Delhi and the founder of RDB
              Associates, practising principally before the High Court of Delhi across civil,
              commercial, medical and cyber law matters.
            </p>
            <Link to="/about" className="mt-8 inline-flex items-center gap-3 text-brown text-xs uppercase tracking-widest-plus hover:text-sage transition-colors duration-300 group">
              Read the full story
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>
        </div>
      </section>
    </Reveal>
  );
}

function ExploreGrid() {
  return (
    <Reveal asChild>
      <section className="relative section-y bg-cream-dark text-ink">
        <div className="shell">
          <div className="max-w-3xl mb-16">
            <div className="eyebrow">
              <span className="eyebrow-label">Explore the Chambers</span>
            </div>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.05]">
              Everything about <span className="italic text-brown">the practice</span>.
            </h2>
          </div>

          <div data-testid="explore-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* asChild so each Link stays the direct grid item — a wrapper div
                here would collapse the card's hover transform and shadow. */}
            {/* 40ms, not 70. Twelve cards at 70ms put the last one 770ms
                behind the first, and with the spring still settling after that
                the grid was not at rest for well over a second — long enough
                that a reader who has already started scanning watches the
                bottom row arrive late. The stagger should read the grid in, not
                perform it. */}
            <Reveals holdDelay={40} distance={22} blur asChild>
            {explore.map(({ to, Icon, title, body }) => (
              <Link key={to} to={to} data-testid={`explore-card-${title.replace(/\s+/g, "-").toLowerCase()}`}
                className="group relative border border-border bg-white p-8 hover:border-brown hover:-translate-y-1 transition-[transform,border-color,box-shadow] duration-300 hover:elevate-card">
                <Icon size={26} strokeWidth={1.3} className="text-brown mb-5 group-hover:scale-110 transition-transform duration-500" />
                <h3 className="font-serif text-xl text-ink mb-2">{title}</h3>
                <p className="text-ink-soft text-sm leading-relaxed">{body}</p>
              </Link>
            ))}
            </Reveals>
          </div>
        </div>
      </section>
    </Reveal>
  );
}

export default function Home() {
  // offset={false}: the hero clears the fixed header itself.
  return (
    <PageShell
      testId="home-page"
      offset={false}
      title="Ramandeep Bawa — Advocate, High Court of Delhi"
      description="A boutique litigation practice in New Delhi representing individuals and enterprises before the High Court of Delhi, District Courts and tribunals across India."
    >
      <Hero />
      <AboutTeaser />
      <ExploreGrid />
      <Contact />
    </PageShell>
  );
}
