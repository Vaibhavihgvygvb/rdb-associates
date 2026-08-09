import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import Reveal from "@/components/motion/Reveal";
import { POSTS, isPublished } from "@/data/insights";

/**
 * The writing index.
 *
 * Every piece here is announced but unwritten (`date: null` in data/insights.js),
 * and there is no article route for them to point at yet. The cards used to
 * carry the site's full interactive-card treatment anyway — hover border,
 * hover shadow, a title that turned emerald, an animated top rule and a "Read
 * note →" affordance — while being plain <article> elements with no link on
 * them. Every one of those signals promised a destination that did not exist.
 *
 * So the unpublished state is now drawn as what it is: a standing list of work
 * in preparation, with the interactive treatment removed and the one live
 * action on the page — subscribing to hear when they land — made the primary
 * one. `isPublished` is what flips a card back to a real link, so adding a
 * date and a `to` in the data module is all it takes to restore the original
 * behaviour piece by piece.
 */
export default function Insights() {
  const anyPublished = POSTS.some(isPublished);

  return (
    <Reveal asChild>
      <section id="insights" data-testid="insights-section" className="relative py-24 md:py-32 bg-white text-ink">
        <div className="shell">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-14">
            <div className="max-w-2xl">
              <div className="eyebrow">
              <span className="eyebrow-label">Legal Insights</span>
            </div>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.04] tracking-tight">
                Notes from the <span className="text-brown">chambers</span>.
              </h1>
              {!anyPublished && (
                <p className="mt-6 text-ink-soft text-base md:text-lg leading-relaxed">
                  The first notes are being written. They will appear here as they are published —
                  subscribers hear first.
                </p>
              )}
            </div>
            <Link
              to="/newsletter"
              className="inline-flex items-center gap-2 bg-brown text-white px-7 py-3.5 text-[13px] font-semibold uppercase tracking-[0.08em] hover:bg-brown-light transition-colors duration-200 shrink-0"
            >
              Subscribe for updates <ArrowUpRight size={15} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {POSTS.map((p, i) => (
              <InsightCard key={p.title} post={p} index={i} />
            ))}
          </div>
        </div>
      </section>
    </Reveal>
  );
}

function InsightCard({ post, index }) {
  const published = isPublished(post);

  // Published: the interactive card, with the affordances it can honour.
  if (published) {
    return (
      <Link
        to={post.to}
        data-testid={`insight-card-${index}`}
        className="group relative flex flex-col border border-border bg-white hover:border-brown hover:elevate-card transition-[border-color,box-shadow] duration-300"
      >
        <span className="block h-1 w-full bg-brown scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
        <span className="p-8 block">
          <span className="flex items-center justify-between text-[10px] uppercase tracking-widest-plus">
            <span className="text-brown font-semibold">{post.tag}</span>
            <span className="text-ink-soft">{post.date}</span>
          </span>
          <span className="font-serif text-xl md:text-2xl text-ink mt-6 leading-snug block group-hover:text-brown transition-colors duration-200">
            {post.title}
          </span>
          <span className="text-ink-soft text-sm mt-4 leading-relaxed block">{post.excerpt}</span>
          <span className="mt-8 flex items-center gap-2 text-brown text-xs font-semibold uppercase tracking-widest">
            Read note <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
          </span>
        </span>
      </Link>
    );
  }

  // Unpublished: no hover states, no arrow, no border-colour shift — nothing
  // that reads as "this will take you somewhere".
  return (
    <article
      data-testid={`insight-card-${index}`}
      className="relative flex flex-col border border-dashed border-border bg-cream-dark/40 p-8"
    >
      <div className="flex items-center justify-between text-[10px] uppercase tracking-widest-plus">
        <span className="text-brown font-semibold">{post.tag}</span>
        <span className="inline-flex items-center gap-1.5 text-ink-soft">
          <span className="h-1.5 w-1.5 rounded-full bg-brown/40" aria-hidden />
          In preparation
        </span>
      </div>
      <h2 className="font-serif text-xl md:text-2xl text-ink mt-6 leading-snug">{post.title}</h2>
      <p className="text-ink-soft text-sm mt-4 leading-relaxed">{post.excerpt}</p>
    </article>
  );
}
