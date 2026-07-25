import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import useReveal from "@/lib/useReveal";

const posts = [
  { tag: "ADR", date: "Coming soon", title: "When Mediation Wins: Building a Settlement Architecture", excerpt: "A practical framework for choosing between litigation and structured dispute resolution in commercial matters." },
  { tag: "Cyber Law", date: "Coming soon", title: "Digital Evidence in Indian Courts: What Practitioners Miss", excerpt: "Notes on Section 65B, chain of custody and admissibility of electronic records under the Bharatiya Sakshya Adhiniyam." },
  { tag: "Medical Law", date: "Coming soon", title: "Informed Consent Beyond the Paperwork", excerpt: "Why the doctrine has moved on — and what treating hospitals should be documenting today." },
];

export default function Insights() {
  const ref = useReveal();
  return (
    <section id="insights" data-testid="insights-section" ref={ref} className="reveal relative py-24 md:py-32 bg-white text-ink">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-14">
          <div className="max-w-2xl">
            <div className="flex items-center gap-4 mb-6">
              <span className="h-px w-10 bg-brown" />
              <span className="text-brown text-xs uppercase tracking-widest-plus">Legal Insights</span>
            </div>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.04] tracking-tight">
              Notes from the <span className="text-brown">chambers</span>.
            </h2>
          </div>
          <Link to="/newsletter" className="inline-flex items-center gap-2 text-brown text-[13px] font-semibold uppercase tracking-[0.1em] hover:gap-3 transition-all duration-200">
            Subscribe for updates <ArrowUpRight size={15} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((p, i) => (
            <article
              key={p.title}
              data-testid={`insight-card-${i}`}
              className="group relative border border-border bg-white hover:border-brown hover:shadow-[0_24px_48px_-28px_rgba(0,0,0,0.3)] transition-[border-color,box-shadow] duration-300"
            >
              <div className="h-1 w-full bg-brown scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
              <div className="p-8">
                <div className="flex items-center justify-between text-[10px] uppercase tracking-widest-plus">
                  <span className="text-brown font-semibold">{p.tag}</span>
                  <span className="text-ink-soft">{p.date}</span>
                </div>
                <h3 className="font-serif text-xl md:text-2xl text-ink mt-6 leading-snug group-hover:text-brown transition-colors duration-200">{p.title}</h3>
                <p className="text-ink-soft text-sm mt-4 leading-relaxed">{p.excerpt}</p>
                <div className="mt-8 flex items-center gap-2 text-brown text-xs font-semibold uppercase tracking-widest">
                  Read note <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
