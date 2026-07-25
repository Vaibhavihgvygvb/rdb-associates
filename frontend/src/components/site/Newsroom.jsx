import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, ChevronDown, Search, X } from "lucide-react";
import useReveal from "@/lib/useReveal";
import { CATEGORIES, FORUMS, PRACTICES, categoryLabel, formatDate, sortedItems } from "@/data/newsroom";

const PAGE_SIZE = 9;

export default function Newsroom() {
  const ref = useReveal();
  const [query, setQuery] = useState("");
  const [categories, setCategories] = useState([]);
  const [practices, setPractices] = useState([]);
  const [forums, setForums] = useState([]);
  const [visible, setVisible] = useState(PAGE_SIZE);

  const all = useMemo(() => sortedItems(), []);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return all.filter((i) => {
      if (categories.length && !categories.includes(i.category)) return false;
      if (practices.length && !i.practices.some((p) => practices.includes(p))) return false;
      if (forums.length && !forums.includes(i.forum)) return false;
      if (!q) return true;
      return [i.title, i.summary, i.forum, ...i.practices, categoryLabel(i.category)]
        .join(" ")
        .toLowerCase()
        .includes(q);
    });
  }, [all, query, categories, practices, forums]);

  // Any change to the query narrows the set — reset the page window with it.
  useEffect(() => setVisible(PAGE_SIZE), [query, categories, practices, forums]);

  const activeCount = categories.length + practices.length + forums.length + (query ? 1 : 0);
  const clearAll = () => {
    setQuery("");
    setCategories([]);
    setPractices([]);
    setForums([]);
  };

  return (
    <section id="newsroom" data-testid="newsroom-section" ref={ref} className="reveal bg-white text-ink">
      <header className="border-b border-border">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-20 md:py-28">
          <div className="flex items-center gap-4 mb-6">
            <span className="h-px w-10 bg-brown" />
            <span className="text-brown text-xs uppercase tracking-widest-plus">Newsroom</span>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.05] max-w-4xl">
            What the chambers is <span className="text-brown">doing</span>, and what it has to say.
          </h1>
          <p className="mt-8 text-ink-soft text-base md:text-lg leading-relaxed max-w-3xl">
            Matter notes, chambers announcements, publications and speaking engagements. In accordance
            with the Bar Council of India Rules, matters are described generally: no client is
            identified, no claim value is stated, and nothing on this page is an advertisement or an
            offer to act.
          </p>
        </div>
      </header>

      {/* Filter bar */}
      <div className="sticky top-[72px] z-30 bg-white border-b border-border">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-5">
          <div className="flex flex-col lg:flex-row lg:items-center gap-4">
            <label className="relative flex-1 min-w-0">
              <Search size={17} strokeWidth={1.6} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-soft pointer-events-none" />
              <input
                data-testid="newsroom-search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search the newsroom"
                className="w-full border border-border bg-white pl-11 pr-4 py-3 text-[15px] text-ink placeholder:text-ink-soft focus:outline-none focus:border-brown transition-colors"
              />
            </label>

            <div className="flex flex-wrap items-center gap-3">
              <Facet
                label="Category"
                testid="facet-category"
                options={CATEGORIES.map((c) => [c.id, c.label])}
                selected={categories}
                onToggle={(v) => setCategories(toggle(categories, v))}
              />
              <Facet
                label="Practice area"
                testid="facet-practice"
                options={PRACTICES.map((p) => [p, p])}
                selected={practices}
                onToggle={(v) => setPractices(toggle(practices, v))}
              />
              <Facet
                label="Forum"
                testid="facet-forum"
                options={FORUMS.map((f) => [f, f])}
                selected={forums}
                onToggle={(v) => setForums(toggle(forums, v))}
              />
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 mt-4">
            <span data-testid="newsroom-count" className="text-[11px] uppercase tracking-widest-plus text-ink-soft mr-2">
              {results.length} {results.length === 1 ? "result" : "results"}
            </span>
            {categories.map((c) => (
              <Pill key={c} label={categoryLabel(c)} onRemove={() => setCategories(toggle(categories, c))} />
            ))}
            {practices.map((p) => (
              <Pill key={p} label={p} onRemove={() => setPractices(toggle(practices, p))} />
            ))}
            {forums.map((f) => (
              <Pill key={f} label={f} onRemove={() => setForums(toggle(forums, f))} />
            ))}
            {activeCount > 0 && (
              <button
                data-testid="newsroom-clear"
                onClick={clearAll}
                className="text-[11px] uppercase tracking-widest-plus text-brown font-semibold hover:text-brown-light transition-colors ml-1"
              >
                Clear all
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-14 md:py-20">
        {results.length === 0 ? (
          <div data-testid="newsroom-empty" className="border border-border py-24 text-center">
            <p className="font-serif text-2xl text-ink">Nothing matches those filters.</p>
            <button onClick={clearAll} className="mt-5 text-brown text-[13px] font-semibold uppercase tracking-[0.1em] hover:text-brown-light transition-colors">
              Clear all filters
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {results.slice(0, visible).map((item, i) => (
                <NewsCard key={item.slug} item={item} index={i} />
              ))}
            </div>

            {visible < results.length && (
              <div className="flex justify-center mt-14">
                <button
                  data-testid="newsroom-load-more"
                  onClick={() => setVisible((v) => v + PAGE_SIZE)}
                  className="border border-ink px-8 py-3.5 text-[13px] font-semibold uppercase tracking-[0.1em] text-ink hover:bg-ink hover:text-white transition-colors duration-200"
                >
                  Load more — {results.length - visible} remaining
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Media & enquiries */}
      <div className="border-t border-border bg-cream-dark">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-16 grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="md:col-span-2">
            <div className="text-[11px] uppercase tracking-widest-plus text-brown font-semibold">Press &amp; media enquiries</div>
            <p className="mt-5 text-ink-soft text-sm leading-relaxed max-w-2xl">
              Journalists seeking comment on a reported judgment or a point of procedure may write to
              the chambers. Comment is offered on questions of law only, and never on a matter in
              which the chambers is engaged or on the facts of a pending case.
            </p>
            <a
              href="mailto:contact@rdbassociates.in"
              className="mt-6 inline-flex items-center gap-2 text-brown text-[13px] font-semibold uppercase tracking-[0.1em] hover:gap-3 transition-all duration-200"
            >
              contact@rdbassociates.in <ArrowUpRight size={15} />
            </a>
          </div>
          <div>
            <div className="text-[11px] uppercase tracking-widest-plus text-brown font-semibold">Elsewhere</div>
            <ul className="mt-5 space-y-3 text-sm">
              {[["Insights", "/insights"], ["Our Work", "/work"], ["Credentials", "/credentials"], ["Newsletter", "/newsletter"]].map(([l, to]) => (
                <li key={to}>
                  <Link to={to} className="text-ink-soft hover:text-brown transition-colors">{l}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function NewsCard({ item, index }) {
  return (
    <Link
      to={`/newsroom/${item.slug}`}
      data-testid={`newsroom-card-${index}`}
      className="group relative flex flex-col border border-border bg-white hover:border-brown hover:shadow-[0_24px_48px_-28px_rgba(0,0,0,0.3)] transition-[border-color,box-shadow] duration-300"
    >
      <div className="h-1 w-full bg-brown scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
      <div className="p-8 flex flex-col flex-1">
        <div className="flex items-center justify-between text-[10px] uppercase tracking-widest-plus">
          <span className="text-brown font-semibold">{categoryLabel(item.category)}</span>
          <span className="text-ink-soft">{formatDate(item.date)}</span>
        </div>
        <h3 className="font-serif text-xl md:text-[22px] text-ink mt-6 leading-snug group-hover:text-brown transition-colors duration-200">
          {item.title}
        </h3>
        <p className="text-ink-soft text-sm mt-4 leading-relaxed flex-1">{item.summary}</p>
        <div className="mt-7 pt-5 border-t border-border flex items-center justify-between gap-4">
          <span className="text-[10px] uppercase tracking-widest-plus text-ink-soft">{item.forum}</span>
          <ArrowUpRight size={15} className="text-brown group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
        </div>
      </div>
    </Link>
  );
}

function Facet({ label, options, selected, onToggle, testid }) {
  const [open, setOpen] = useState(false);
  const box = useRef(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e) => {
      if (box.current && !box.current.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={box} className="relative">
      <button
        data-testid={testid}
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className={`inline-flex items-center gap-2 border px-4 py-3 text-[13px] font-medium transition-colors duration-200 ${
          selected.length || open ? "border-brown text-brown" : "border-border text-ink hover:border-brown"
        }`}
      >
        {label}
        {selected.length > 0 && (
          <span className="bg-brown text-white text-[10px] leading-none px-1.5 py-1 font-semibold">{selected.length}</span>
        )}
        <ChevronDown size={14} className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute left-0 top-full mt-2 w-72 max-h-80 overflow-y-auto bg-white border border-border shadow-[0_24px_40px_-16px_rgba(0,0,0,0.18)] animate-fade-in-up p-2 z-40">
          {options.map(([value, text]) => {
            const on = selected.includes(value);
            return (
              <button
                key={value}
                onClick={() => onToggle(value)}
                className={`w-full text-left px-3 py-2.5 text-[14px] flex items-center gap-3 transition-colors duration-150 ${
                  on ? "text-brown" : "text-ink-soft hover:text-ink"
                }`}
              >
                <span className={`w-3.5 h-3.5 border flex-shrink-0 ${on ? "bg-brown border-brown" : "border-border"}`} />
                {text}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

function Pill({ label, onRemove }) {
  return (
    <span className="inline-flex items-center gap-2 border border-brown/40 bg-brown-soft text-brown text-[12px] px-3 py-1.5">
      {label}
      <button onClick={onRemove} aria-label={`Remove ${label}`} className="hover:text-ink transition-colors">
        <X size={12} />
      </button>
    </span>
  );
}

const toggle = (list, value) => (list.includes(value) ? list.filter((v) => v !== value) : [...list, value]);
