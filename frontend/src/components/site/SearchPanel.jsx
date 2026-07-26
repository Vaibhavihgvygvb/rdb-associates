import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, X, CornerDownLeft } from "lucide-react";
import { SUGGESTIONS, search } from "@/data/searchIndex";

export default function SearchPanel({ open, onClose }) {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef(null);
  const listRef = useRef(null);
  const navigate = useNavigate();

  const trimmed = query.trim();
  const results = useMemo(() => (trimmed ? search(trimmed) : SUGGESTIONS), [trimmed]);

  // Reopen should never inherit the last search.
  useEffect(() => {
    if (open) {
      setQuery("");
      setActive(0);
    }
  }, [open]);

  useEffect(() => setActive(0), [trimmed]);

  useEffect(() => {
    if (!open) return;
    const id = requestAnimationFrame(() => inputRef.current?.focus());
    return () => cancelAnimationFrame(id);
  }, [open]);

  // Kept apart from the key handler below: that effect re-runs as the selection
  // moves, and restoring a value captured on a re-run would leave scroll locked.
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setActive((a) => (results.length ? (a + 1) % results.length : 0));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActive((a) => (results.length ? (a - 1 + results.length) % results.length : 0));
      } else if (e.key === "Enter") {
        const hit = results[active];
        if (hit) {
          e.preventDefault();
          go(hit.to);
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, results, active, onClose]);

  // Keep the highlighted row visible while arrowing through a long list.
  useEffect(() => {
    listRef.current?.querySelector(`[data-idx="${active}"]`)?.scrollIntoView({ block: "nearest" });
  }, [active]);

  const go = (to) => {
    onClose();
    navigate(to);
  };

  if (!open) return null;

  return (
    <div data-testid="search-panel" className="fixed inset-0 z-[60]" role="dialog" aria-modal="true" aria-label="Search the site">
      {/* No entrance animation on the backdrop: fade-in-up starts it 24px lower,
          which would leave a strip of the page uncovered along the top edge. */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-ink/70 backdrop-blur-[2px]"
        aria-hidden
      />

      <div className="relative mx-auto mt-[8vh] w-[92vw] max-w-2xl bg-white border border-border shadow-[0_40px_80px_-24px_rgba(0,0,0,0.5)] animate-fade-in-up">
        <div className="flex items-center gap-3 border-b border-border px-5">
          <Search size={19} strokeWidth={1.6} className="text-ink-soft shrink-0" />
          <input
            ref={inputRef}
            data-testid="search-input"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search practice areas, newsroom, pages…"
            aria-label="Search query"
            className="flex-1 bg-transparent py-5 text-[16px] text-ink placeholder:text-ink-soft focus:outline-none"
          />
          <button
            onClick={onClose}
            data-testid="search-close"
            aria-label="Close search"
            className="text-ink-soft hover:text-brown transition-colors p-1 shrink-0"
          >
            <X size={18} />
          </button>
        </div>

        <div className="px-5 pt-4 text-[10px] uppercase tracking-widest-plus text-ink-soft">
          {trimmed
            ? `${results.length} ${results.length === 1 ? "result" : "results"}`
            : "Suggested"}
        </div>

        {results.length === 0 ? (
          <div data-testid="search-empty" className="px-5 py-10 text-center">
            <p className="font-serif text-xl text-ink">Nothing matches “{trimmed}”.</p>
            <p className="mt-2 text-sm text-ink-soft">
              Try a practice area, a forum, or a word from a newsroom entry.
            </p>
          </div>
        ) : (
          <ul ref={listRef} className="max-h-[52vh] overflow-y-auto py-2">
            {results.map((r, i) => (
              <li key={`${r.to}-${r.title}`}>
                <button
                  data-idx={i}
                  data-testid={`search-result-${i}`}
                  onClick={() => go(r.to)}
                  onMouseEnter={() => setActive(i)}
                  className={`w-full text-left px-5 py-3.5 flex items-start gap-4 transition-colors duration-150 ${
                    i === active ? "bg-brown-soft" : "hover:bg-cream-dark"
                  }`}
                >
                  <span className="flex-1 min-w-0">
                    <span className={`block text-[15px] leading-snug ${i === active ? "text-brown" : "text-ink"}`}>
                      {r.title}
                    </span>
                    {r.blurb && (
                      <span className="block text-[13px] text-ink-soft mt-1 leading-relaxed line-clamp-2">
                        {r.meta ? `${r.meta} — ${r.blurb}` : r.blurb}
                      </span>
                    )}
                  </span>
                  <span className="text-[9px] uppercase tracking-widest-plus text-ink-soft whitespace-nowrap pt-1 shrink-0">
                    {r.group}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        )}

        {/* Hidden on touch widths — there is no keyboard to hint at. */}
        <div className="border-t border-border px-5 py-3 hidden sm:flex items-center gap-5 text-[10px] uppercase tracking-widest-plus text-ink-soft">
          <span className="inline-flex items-center gap-1.5">
            <CornerDownLeft size={12} /> Open
          </span>
          <span>↑ ↓ Navigate</span>
          <span>Esc Close</span>
        </div>
      </div>
    </div>
  );
}
