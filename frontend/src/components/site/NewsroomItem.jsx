import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowUpRight, Link2, Linkedin, Mail, Printer, Check } from "lucide-react";
import NewsroomImage from "@/components/site/NewsroomImage";
import { categoryLabel, formatDate, relatedItems } from "@/data/newsroom";
import Reveal from "@/components/motion/Reveal";

export default function NewsroomItem({ item }) {
  // Same reason as the index: a long article on a narrow screen can outgrow the
  // default proportional threshold and never reveal. See Newsroom.jsx.
  const related = relatedItems(item);

  return (
    <Reveal asChild inViewMargin="0px">
      <article data-testid="newsroom-item" className="bg-white text-ink">
        <div className="shell pt-14 pb-8">
          <Link
            to="/newsroom"
            data-testid="newsroom-back"
            className="print-hide inline-flex items-center gap-2 text-ink-soft text-[12px] uppercase tracking-widest-plus hover:text-brown transition-colors"
          >
            <ArrowLeft size={14} /> Newsroom
          </Link>
        </div>

        <div className="shell">
          <NewsroomImage
            image={item.image}
            priority
            grade="soft"
            scrim={false}
            sizes="(min-width: 1400px) 1320px, 92vw"
            className="w-full aspect-[16/9] md:aspect-[21/9]"
          />
        </div>

        <div className="shell grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 pt-12 pb-20">
          {/* Body */}
          <div className="lg:col-span-8">
            <div className="flex flex-wrap items-center gap-4 text-[10px] uppercase tracking-widest-plus">
              <span className="text-brown font-semibold">{categoryLabel(item.category)}</span>
              <span className="h-px w-6 bg-border" />
              <span className="text-ink-soft tnum">{formatDate(item.date)}</span>
            </div>

            <h1 className="font-serif text-3xl md:text-4xl lg:text-[46px] leading-[1.08] mt-6">{item.title}</h1>

            <p className="mt-8 text-ink text-lg md:text-xl leading-relaxed font-light border-l-2 border-brown pl-6">
              {item.summary}
            </p>

            <div className="mt-10 space-y-6">
              {item.body.map((para, i) => (
                <p key={i} className="text-ink-soft text-[16px] leading-[1.8]">{para}</p>
              ))}
            </div>

            {item.quote && (
              <figure className="mt-12 border-t border-border pt-10">
                <blockquote className="font-serif text-2xl md:text-[28px] leading-snug text-ink hanging-quote">
                  &ldquo;{item.quote.text}&rdquo;
                </blockquote>
                <figcaption className="mt-6 text-[11px] uppercase tracking-widest-plus text-ink-soft">
                  {item.quote.by} <span className="text-brown">·</span> {item.quote.role}
                </figcaption>
              </figure>
            )}

            <ShareRow title={item.title} />

            <p className="mt-10 text-[11px] text-ink-soft leading-relaxed border border-border p-5">
              <span className="text-brown uppercase tracking-widest-plus">Note · </span>
              Published for information only. In accordance with the Bar Council of India Rules, the
              matter above is described generally and does not identify any client, and no claim value
              or fee is disclosed. Nothing here is an advertisement, a solicitation, or legal advice,
              and reading it does not create an advocate–client relationship.
            </p>
          </div>

          {/* Rail */}
          <aside className="lg:col-span-4 space-y-10">
            <div className="border border-border p-7">
              <div className="text-[11px] uppercase tracking-widest-plus text-brown font-semibold">Counsel</div>
              <ul className="mt-5 space-y-4">
                {item.counsel.map((c) => (
                  <li key={c.name + c.role}>
                    <div className="text-[15px] text-ink">{c.name}</div>
                    <div className="text-[13px] text-ink-soft mt-0.5">{c.role}</div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border border-border p-7">
              <div className="text-[11px] uppercase tracking-widest-plus text-brown font-semibold">Related capabilities</div>
              <ul className="mt-5 space-y-2.5">
                {item.practices.map((p) => (
                  <li key={p}>
                    <Link to="/practice-areas" className="group inline-flex items-center gap-1.5 text-[15px] text-ink-soft hover:text-brown transition-colors">
                      {p}
                      <ArrowUpRight size={13} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-7 pt-6 border-t border-border">
                <div className="text-[11px] uppercase tracking-widest-plus text-ink-soft">Forum</div>
                <div className="mt-2 text-[15px] text-ink">{item.forum}</div>
              </div>
            </div>

            <Link to="/contact" className="group block bg-ink text-white p-7">
              <div className="text-[11px] uppercase tracking-widest-plus text-white/60">Consultation</div>
              <div className="font-serif text-2xl leading-snug mt-5">Discuss your matter with the chambers.</div>
              <div className="mt-5 inline-flex items-center gap-2 text-brown-soft text-sm font-medium">
                Request a consultation
                <ArrowUpRight size={15} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
              </div>
            </Link>
          </aside>
        </div>

        {related.length > 0 && (
          <div data-testid="newsroom-related" className="print-hide border-t border-border bg-cream-dark">
            <div className="shell section-y-sm">
              <div className="eyebrow">
                <span className="eyebrow-label">Related</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {related.map((r) => (
                  <Link
                    key={r.slug}
                    to={`/newsroom/${r.slug}`}
                    className="group flex flex-col border border-border bg-white hover:border-brown transition-colors duration-300"
                  >
                    <NewsroomImage
                      image={r.image}
                      sizes="(min-width: 768px) 30vw, 92vw"
                      className="aspect-[16/9]"
                    />
                    <div className="p-7">
                      <div className="flex items-center justify-between text-[10px] uppercase tracking-widest-plus">
                        <span className="text-brown font-semibold">{categoryLabel(r.category)}</span>
                        <span className="text-ink-soft tnum">{formatDate(r.date)}</span>
                      </div>
                      <h2 className="font-serif text-lg text-ink mt-5 leading-snug group-hover:text-brown transition-colors">{r.title}</h2>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </article>
    </Reveal>
  );
}

function ShareRow({ title }) {
  const [copied, setCopied] = useState(false);
  const url = typeof window !== "undefined" ? window.location.href : "";

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div data-testid="newsroom-share" className="print-hide mt-12 pt-8 border-t border-border flex flex-wrap items-center gap-3">
      <span className="text-[11px] uppercase tracking-widest-plus text-ink-soft mr-2">Share</span>
      <ShareBtn onClick={copy} label={copied ? "Link copied" : "Copy link"}>
        {copied ? <Check size={15} /> : <Link2 size={15} />}
      </ShareBtn>
      <ShareBtn
        href={`mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(url)}`}
        label="Email"
      >
        <Mail size={15} />
      </ShareBtn>
      <ShareBtn
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`}
        label="LinkedIn"
      >
        <Linkedin size={15} />
      </ShareBtn>
      <ShareBtn onClick={() => window.print()} label="Print">
        <Printer size={15} />
      </ShareBtn>
    </div>
  );
}

function ShareBtn({ href, onClick, label, children }) {
  const cls =
    "inline-flex items-center gap-2 border border-border px-4 py-2.5 text-[12px] text-ink-soft hover:border-brown hover:text-brown transition-colors duration-200";
  return href ? (
    <a href={href} target="_blank" rel="noreferrer" className={cls}>
      {children} {label}
    </a>
  ) : (
    <button onClick={onClick} className={cls}>
      {children} {label}
    </button>
  );
}
