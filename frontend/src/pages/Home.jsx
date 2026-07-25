import { Link } from "react-router-dom";
import { ArrowRight, Scale, GraduationCap, Clock3, Award, Landmark, Newspaper, Mail, Users } from "lucide-react";
import Nav from "@/components/site/Nav";
import Hero from "@/components/site/Hero";
import Contact from "@/components/site/Contact";
import Footer from "@/components/site/Footer";
import useReveal from "@/lib/useReveal";

const explore = [
  { to: "/about", Icon: Users, title: "About", body: "The advocate, the philosophy, the practice." },
  { to: "/practice-areas", Icon: Scale, title: "Practice Areas", body: "Civil, commercial, medical, cyber and more — with the Acts under which each is conducted." },
  { to: "/expertise", Icon: Award, title: "Expertise", body: "A method for every stage of a matter." },
  { to: "/journey", Icon: Clock3, title: "Journey", body: "A career built brief by brief since 2011." },
  { to: "/credentials", Icon: GraduationCap, title: "Credentials", body: "Education, memberships and languages." },
  { to: "/work", Icon: Landmark, title: "Our Work", body: "Previous works, major cases and clients." },
  { to: "/stages", Icon: Clock3, title: "Stages of a Matter", body: "How a matter typically progresses, step by step." },
  { to: "/careers", Icon: GraduationCap, title: "Careers", body: "Recruitment and internship opportunities." },
  { to: "/insights", Icon: Newspaper, title: "Insights", body: "Notes from the chambers." },
  { to: "/newsletter", Icon: Mail, title: "Newsletter", body: "Subscribe for firm news and legal updates." },
];

function AboutTeaser() {
  const ref = useReveal();
  return (
    <section ref={ref} className="reveal relative py-24 md:py-32 bg-cream">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 items-center">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-4 mb-6">
              <span className="h-px w-10 bg-brown" />
              <span className="text-brown text-xs uppercase tracking-widest-plus">About the Advocate</span>
            </div>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-ink leading-[1.05]">
              A practice grounded in <span className="italic text-brown">discipline</span>.
            </h2>
            <p className="mt-8 text-ink/70 text-base md:text-lg leading-relaxed max-w-2xl">
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
      </div>
    </section>
  );
}

function ExploreGrid() {
  const ref = useReveal();
  return (
    <section ref={ref} className="reveal relative py-24 md:py-32 bg-cream-dark text-ink">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-4 mb-6">
            <span className="h-px w-10 bg-brown" />
            <span className="text-brown text-xs uppercase tracking-widest-plus">Explore the Chambers</span>
          </div>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.05]">
            Everything about <span className="italic text-brown">the practice</span>.
          </h2>
        </div>

        <div data-testid="explore-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {explore.map(({ to, Icon, title, body }) => (
            <Link key={to} to={to} data-testid={`explore-card-${title.replace(/\s+/g, "-").toLowerCase()}`}
              className="group relative border border-border bg-white p-8 hover:border-brown hover:-translate-y-1 transition-[transform,border-color,box-shadow] duration-300 hover:shadow-[0_24px_48px_-28px_rgba(0,0,0,0.3)]">
              <Icon size={26} strokeWidth={1.3} className="text-brown mb-5 group-hover:scale-110 transition-transform duration-500" />
              <h3 className="font-serif text-xl text-ink mb-2">{title}</h3>
              <p className="text-ink-soft text-sm leading-relaxed">{body}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <main data-testid="home-page" className="bg-cream text-ink">
      <Nav />
      <Hero />
      <AboutTeaser />
      <ExploreGrid />
      <Contact />
      <Footer />
    </main>
  );
}
