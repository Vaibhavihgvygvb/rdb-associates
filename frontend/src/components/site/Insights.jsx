import { ArrowUpRight } from "lucide-react";
import useReveal from "@/lib/useReveal";

const LIBRARY = "https://images.unsplash.com/photo-1769092992534-f2d0210162b9?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1ODF8MHwxfHNlYXJjaHwyfHxsYXclMjBib29rcyUyMGxpYnJhcnklMjBsZWdhbHxlbnwwfHx8fDE3ODQyNzYwNjV8MA&ixlib=rb-4.1.0&q=85";

const posts = [
  { tag: "ADR", date: "Coming soon", title: "When Mediation Wins: Building a Settlement Architecture", excerpt: "A practical framework for choosing between litigation and structured dispute resolution in commercial matters." },
  { tag: "Cyber Law", date: "Coming soon", title: "Digital Evidence in Indian Courts: What Practitioners Miss", excerpt: "Notes on Section 65B, chain of custody and admissibility of electronic records under the Bharatiya Sakshya Adhiniyam." },
  { tag: "Medical Law", date: "Coming soon", title: "Informed Consent Beyond the Paperwork", excerpt: "Why the doctrine has moved on — and what treating hospitals should be documenting today." },
];

export default function Insights() {
  const ref = useReveal();
  return (
    <section id="insights" data-testid="insights-section" ref={ref} className="reveal relative py-24 md:py-32 bg-navy text-cream overflow-hidden">
      <div className="absolute inset-0 opacity-[0.12] bg-cover bg-center" style={{ backgroundImage: `url('${LIBRARY}')` }} aria-hidden />
      <div className="absolute inset-0 bg-gradient-to-b from-navy via-navy/95 to-navy" />

      <div className="relative max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <div className="flex items-center gap-4 mb-6">
              <span className="h-px w-10 bg-gold" />
              <span className="text-gold text-xs uppercase tracking-widest-plus">Legal Insights</span>
            </div>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.05]">
              Notes from the <span className="italic text-gold">chambers</span>.
            </h2>
          </div>
          <a href="#contact" className="inline-flex items-center gap-2 text-gold text-xs uppercase tracking-widest-plus hover:text-cream transition-colors duration-300">
            Subscribe for updates <ArrowUpRight size={14} />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((p, i) => (
            <article key={p.title} data-testid={`insight-card-${i}`}
              className="group relative border border-gold/20 bg-navy-light/40 hover:bg-navy-light hover:border-gold/60 transition-[background-color,border-color] duration-500">
              <div className="p-8">
                <div className="flex items-center justify-between text-[10px] uppercase tracking-widest-plus text-gold/80">
                  <span>{p.tag}</span>
                  <span className="text-cream/50">{p.date}</span>
                </div>
                <h3 className="font-serif text-xl md:text-2xl text-cream mt-6 leading-snug group-hover:text-gold transition-colors duration-500">{p.title}</h3>
                <p className="text-cream/65 text-sm mt-4 leading-relaxed">{p.excerpt}</p>
                <div className="mt-8 flex items-center gap-2 text-gold text-xs uppercase tracking-widest">
                  Read note <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-500" />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}