import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Check, ChevronDown, Search, X } from "lucide-react";
import NewsroomImage from "@/components/site/NewsroomImage";
import { CATEGORIES, FORUMS, PRACTICES, categoryLabel, formatDate, sortedItems } from "@/data/newsroom";
import Reveal from "@/components/motion/Reveal";
import { EMAIL } from "@/data/chambers";

const PAGE_SIZE = 9;

export default function Newsroom() {
  // A proportional threshold cannot be met by a full-page index: at one column this
  // section is ~9000px tall, so the default 15% asks for more pixels than a phone
  // viewport has and the reveal never fires, leaving the page at opacity 0.
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

  // The spotlight is a promotion of the newest flagged item, not an extra one: it
  // is lifted out of the grid so nothing appears twice, and the result count still
  // covers it. Once the reader filters, the grid alone answers the query.
  const spotlight = activeCount === 0 ? all.find((i) => i.featured) ?? all[0] : null;
  const gridItems = spotlight ? results.filter((i) => i.slug !== spotlight.slug) : results;

  const clearAll = () => {
    setQuery("");
    setCategories([]);
    setPractices([]);
    setForums([]);
  };

  return (
    <Reveal asChild inViewMargin="0px">
      <section id="newsroom" data-testid="newsroom-section" className="bg-white text-ink">
        <header className="border-b border-border">
          <div className="shell py-20 md:py-28">
            <div className="eyebrow">
              <span className="eyebrow-label">Newsroom</span>
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
        <div className="sticky top-nav z-30 bg-white border-b border-border">
          <div className="shell py-5">
            <div className="flex flex-col lg:flex-row lg:items-center gap-4">
              <label className="relative flex-1 min-w-0">
                <Search size={17} strokeWidth={1.6} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-soft pointer-events-none" />
                <input
                  data-testid="newsroom-search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  aria-label="Search the newsroom"
                  placeholder="Search the newsroom"
                  /* No `focus:outline-none` here. It out-specified the global
                     :focus-visible rule in index.css (0,2,0 against 0,1,0), so
                     this field was the one control on the page a keyboard user
                     could land in without seeing where they were. */
                  className="w-full border border-border bg-white pl-11 pr-4 py-3 text-[15px] text-ink placeholder:text-ink-soft focus:border-brown transition-colors"
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
              {/* Typing in the search field or toggling a facet re-renders the
                  grid silently. `aria-live="polite"` makes the count the one
                  thing that announces, which is exactly the feedback a sighted
                  user gets from the grid redrawing. */}
              <span
                data-testid="newsroom-count"
                aria-live="polite"
                className="text-[11px] uppercase tracking-widest-plus text-ink-soft mr-2"
              >
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
        <div className="shell py-14 md:py-20">
          {results.length === 0 ? (
            <div data-testid="newsroom-empty" className="border border-border py-24 text-center">
              <p className="font-serif text-2xl text-ink">Nothing matches those filters.</p>
              <button onClick={clearAll} className="mt-5 text-brown text-[13px] font-semibold uppercase tracking-[0.1em] hover:text-brown-light transition-colors">
                Clear all filters
              </button>
            </div>
          ) : (
            <>
              {spotlight && <Spotlight item={spotlight} />}

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {gridItems.slice(0, visible).map((item, i) => (
                  <NewsCard key={item.slug} item={item} index={i} />
                ))}
              </div>

              {visible < gridItems.length && (
                <div className="flex justify-center mt-14">
                  <button
                    data-testid="newsroom-load-more"
                    onClick={() => setVisible((v) => v + PAGE_SIZE)}
                    className="border border-ink px-8 py-3.5 text-[13px] font-semibold uppercase tracking-[0.1em] text-ink hover:bg-ink hover:text-white transition-colors duration-200"
                  >
                    Load more — {gridItems.length - visible} remaining
                  </button>
                </div>
              )}
            </>
          )}
        </div>

        {/* Media & enquiries */}
        <div className="border-t border-border bg-cream-dark">
          <div className="shell py-16 grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="md:col-span-2">
              <div className="text-[11px] uppercase tracking-widest-plus text-brown font-semibold">Press &amp; media enquiries</div>
              <p className="mt-5 text-ink-soft text-sm leading-relaxed max-w-2xl">
                Journalists seeking comment on a reported judgment or a point of procedure may write to
                the chambers. Comment is offered on questions of law only, and never on a matter in
                which the chambers is engaged or on the facts of a pending case.
              </p>
              <a
                href={`mailto:${EMAIL}`}
                className="mt-6 inline-flex items-center gap-2 text-brown text-[13px] font-semibold uppercase tracking-[0.1em] transition-colors duration-200"
              >
                {EMAIL} <ArrowUpRight size={15} />
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
    </Reveal>
  );
}

function Spotlight({ item }) {
  return (
    <Link
      to={`/newsroom/${item.slug}`}
      data-testid="newsroom-spotlight"
      className="group relative block border border-border bg-white mb-6 hover:border-brown hover:elevate-feature transition-[border-color,box-shadow] duration-300"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <NewsroomImage
          image={item.image}
          priority
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="aspect-[16/10] lg:aspect-auto lg:min-h-[440px]"
        />
        <div className="p-8 md:p-12 flex flex-col justify-center">
          <div className="flex items-center gap-4">
            <span className="text-brown text-[10px] uppercase tracking-widest-plus font-semibold">Spotlight</span>
            <span className="h-px w-8 bg-border" />
            <span className="text-ink-soft text-[10px] uppercase tracking-widest-plus">{formatDate(item.date)}</span>
          </div>
          <h2 className="font-serif text-2xl md:text-3xl lg:text-[34px] text-ink mt-6 leading-[1.15] group-hover:text-brown transition-colors duration-200">
            {item.title}
          </h2>
          <p className="text-ink-soft text-[15px] md:text-base mt-5 leading-relaxed">{item.summary}</p>
          <div className="mt-8 pt-6 border-t border-border flex items-center justify-between gap-4">
            <span className="text-[10px] uppercase tracking-widest-plus text-ink-soft">
              {categoryLabel(item.category)} · {item.forum}
            </span>
            <ArrowUpRight size={17} className="text-brown group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
          </div>
        </div>
      </div>
    </Link>
  );
}

function NewsCard({ item, index }) {
  return (
    <Link
      to={`/newsroom/${item.slug}`}
      data-testid={`newsroom-card-${index}`}
      className="group relative flex flex-col border border-border bg-white hover:border-brown hover:elevate-card transition-[border-color,box-shadow] duration-300"
    >
      <NewsroomImage
        image={item.image}
        sizes="(min-width: 1280px) 30vw, (min-width: 768px) 46vw, 92vw"
        className="aspect-[16/10]"
      />
      <span className="absolute top-4 left-4 bg-brown text-white text-[10px] uppercase tracking-widest-plus font-semibold px-3 py-1.5">
        {categoryLabel(item.category)}
      </span>

      <div className="p-8 flex flex-col flex-1">
        <div className="text-[10px] uppercase tracking-widest-plus text-ink-soft">{formatDate(item.date)}</div>
        <h3 className="font-serif text-xl md:text-[22px] text-ink mt-4 leading-snug group-hover:text-brown transition-colors duration-200">
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
        // role="group" + role="checkbox" rather than bare buttons. The filled
        // square was drawn purely in CSS, so a screen reader heard "Civil
        // Litigation, button" whether or not the filter was on — the selected
        // state existed only for sighted users. A check mark also replaces the
        // solid fill, so the on-state is not carried by colour alone (1.4.1).
        <div
          role="group"
          aria-label={label}
          className="absolute left-0 top-full mt-2 w-72 max-h-80 overflow-y-auto bg-white border border-border elevate-panel animate-fade-in-up p-2 z-40"
        >
          {options.map(([value, text]) => {
            const on = selected.includes(value);
            return (
              <button
                key={value}
                role="checkbox"
                aria-checked={on}
                onClick={() => onToggle(value)}
                className={`w-full text-left px-3 py-2.5 text-[14px] flex items-center gap-3 transition-colors duration-150 ${
                  on ? "text-brown" : "text-ink-soft hover:text-ink"
                }`}
              >
                <span
                  aria-hidden
                  className={`w-4 h-4 border flex-shrink-0 flex items-center justify-center transition-colors duration-150 ${
                    on ? "bg-brown border-brown text-white" : "border-border"
                  }`}
                >
                  {on && <Check size={11} strokeWidth={3} />}
                </span>
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
