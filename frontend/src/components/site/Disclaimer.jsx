import { createContext, useCallback, useContext, useEffect, useId, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Scale } from "lucide-react";
import useFocusTrap from "@/lib/useFocusTrap";
import useScrollLock from "@/lib/useScrollLock";
import {
  AGREE_LABEL,
  DECLINE_LABEL,
  DISCLAIMER_DECLINED,
  DISCLAIMER_PARAGRAPHS,
  DISCLAIMER_STORAGE_KEY,
  DISCLAIMER_TITLE,
  LAST_REVIEWED,
} from "@/data/disclaimer";

/**
 * The Bar Council of India notice, shown before the site is first read.
 *
 * This is deliberately *not* built on components/site/Modal.jsx. That one is a
 * detail overlay: Escape closes it, so does a click on the backdrop, and it
 * carries an X in the corner — three ways to get past it without reading. A
 * Rule 36 gate records an affirmation, so the only ways out are the two
 * buttons, and dismissing it is not one of them. Sharing a component with
 * Modal would have meant threading `dismissible={false}` through every one of
 * those behaviours and hoping no later change re-enabled one.
 *
 * What it does share is the parts that are about being a dialog at all —
 * useFocusTrap and useScrollLock — including the reason Modal portals to
 * <body>: an ancestor with a transform becomes the containing block for
 * `position: fixed`, and Reveal animates transforms all over this site.
 *
 * Mounted once, by DisclaimerProvider in App.js. It has to sit inside
 * <SmoothScroll> because the scroll lock talks to Lenis, and above <Routes>
 * so the footer's Disclaimer link can reopen it from any page.
 */

const DisclaimerContext = createContext(null);

/**
 * Lets anything below the provider reopen the notice (see Footer.jsx) and,
 * through `blocking`, know that the gate is currently up.
 *
 * `blocking` exists because stopping pointer input and scrolling is not the
 * same as stopping interaction. Global keyboard shortcuts keep firing while
 * the gate is open — Nav's ⌘K opened the search panel at z-60, underneath the
 * gate's z-200 backdrop, and its focus trap then pulled focus into a dialog
 * the reader could not see. Anything that opens UI from a global listener has
 * to consult this first.
 */
export function useDisclaimer() {
  const value = useContext(DisclaimerContext);
  if (!value) {
    throw new Error("useDisclaimer must be used inside <DisclaimerProvider>.");
  }
  return value;
}

// Storage is wrapped because reading it can *throw*, not merely come back
// empty: Safari in private browsing and any browser set to block site data
// raise on access rather than returning null. A visitor in that mode should
// see the notice every time, which is the correct failure, but they should
// not see a blank screen where the site was.
function hasAccepted() {
  try {
    return window.sessionStorage.getItem(DISCLAIMER_STORAGE_KEY) === "true";
  } catch {
    return false;
  }
}

function rememberAcceptance() {
  try {
    window.sessionStorage.setItem(DISCLAIMER_STORAGE_KEY, "true");
  } catch {
    // Non-fatal: the visitor has affirmed, they just get asked again next
    // visit. Blocking entry over a storage failure would be the worse trade.
  }
}

export function DisclaimerProvider({ children }) {
  // Read synchronously in the initialiser rather than in an effect. An effect
  // runs after the first paint, so a returning visitor would see the site for
  // a frame before the gate dropped over it — and a first-time visitor would
  // see the reverse, a frame of the site behind a notice that is meant to
  // precede it.
  const [open, setOpen] = useState(() => !hasAccepted());
  const [declined, setDeclined] = useState(false);

  const accept = useCallback(() => {
    rememberAcceptance();
    setDeclined(false);
    setOpen(false);
  }, []);

  const decline = useCallback(() => setDeclined(true), []);
  const reconsider = useCallback(() => setDeclined(false), []);

  // Reopening from the footer always starts at the affirmation, never at the
  // declined state a previous visit may have left behind.
  const reopen = useCallback(() => {
    setDeclined(false);
    setOpen(true);
  }, []);

  const value = useMemo(() => ({ reopen, blocking: open }), [reopen, open]);

  return (
    <DisclaimerContext.Provider value={value}>
      {children}
      <DisclaimerDialog
        open={open}
        declined={declined}
        onAccept={accept}
        onDecline={decline}
        onReconsider={reconsider}
      />
    </DisclaimerContext.Provider>
  );
}

function DisclaimerDialog({ open, declined, onAccept, onDecline, onReconsider }) {
  const containerRef = useRef(null);
  const titleId = useId();
  const bodyId = useId();
  const reduceMotion = useReducedMotion();

  useScrollLock(open);

  // No `onEscape`. The trap still handles Tab and restores focus on close; it
  // simply has no key that closes this one.
  useFocusTrap(open, containerRef);

  // Swapping the affirmation for the declined text replaces everything the
  // dialog was describing, so focus goes back to the container and a screen
  // reader reads the new content from the top. Without this, focus would be
  // left on a button that no longer exists.
  useEffect(() => {
    if (open) containerRef.current?.focus();
  }, [open, declined]);

  const paragraphs = declined ? DISCLAIMER_DECLINED : DISCLAIMER_PARAGRAPHS;

  return createPortal(
    <AnimatePresence>
      {open && (
        /* Above Modal's z-[100] and the fixed header's z-50: nothing on the
           site may paint over a notice that has to be read first. */
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8">
          {/* No onClick. A click outside is not an acknowledgement. */}
          <motion.div
            aria-hidden
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-0 bg-ink/80 backdrop-blur-sm"
          />

          <motion.div
            ref={containerRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            aria-describedby={bodyId}
            tabIndex={-1}
            data-testid="disclaimer-dialog"
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 14, scale: 0.98 }}
            animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 10, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 260, damping: 26 }}
            /* A flex column, not one scrolling box. Capping the whole panel at
               88dvh and letting the whole thing scroll put both buttons below
               the fold on an ordinary laptop — 687px of content in a 584px
               panel, so what a visitor met was a wall of text with no visible
               way forward. Only the prose scrolls now; the heading and the
               actions stay put. `min-h-0` on the scroller is what lets a flex
               child shrink under its content instead of forcing the parent
               taller. */
            className="relative flex w-full max-w-2xl flex-col bg-white border border-border shadow-2xl outline-none max-h-[88dvh]"
          >
            <div className="flex-shrink-0 px-8 pt-8 md:px-12 md:pt-12">
              <div className="flex items-center gap-4">
                <span
                  aria-hidden
                  className="inline-flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-brown-soft text-brown"
                >
                  <Scale size={22} strokeWidth={1.5} />
                </span>
                <div>
                  <div className="eyebrow-label">Bar Council of India · Rule 36</div>
                  <h2 id={titleId} className="font-serif text-2xl md:text-3xl text-ink mt-1">
                    {DISCLAIMER_TITLE}
                  </h2>
                </div>
              </div>
              <div className="brown-hairline mt-8" />
            </div>

            {/* The only scrolling region, so `data-lenis-prevent` belongs here
                rather than on the panel: these are the wheel events that would
                otherwise reach Lenis and move the page behind. */}
            <div
              id={bodyId}
              data-lenis-prevent
              className="min-h-0 flex-1 space-y-5 overflow-y-auto px-8 py-8 md:px-12"
            >
              {paragraphs.map((text) => (
                <p key={text} className="text-sm leading-relaxed text-ink-soft">
                  {text}
                </p>
              ))}
            </div>

            <div className="flex-shrink-0 border-t border-border/60 px-8 pb-8 pt-6 md:px-12 md:pb-12">
              <div className="flex flex-col sm:flex-row gap-3 sm:justify-end">
                {declined ? (
                  <button
                    type="button"
                    onClick={onReconsider}
                    data-testid="disclaimer-back"
                    className="border border-brown text-brown px-8 py-3.5 text-xs uppercase tracking-widest-plus font-semibold hover:bg-brown hover:text-white transition-colors duration-300 pressable"
                  >
                    Back to the notice
                  </button>
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={onDecline}
                      data-testid="disclaimer-decline"
                      className="border border-ink/20 text-ink-soft px-8 py-3.5 text-xs uppercase tracking-widest-plus font-semibold hover:border-ink/40 hover:text-ink transition-colors duration-300 pressable"
                    >
                      {DECLINE_LABEL}
                    </button>
                    <button
                      type="button"
                      onClick={onAccept}
                      data-testid="disclaimer-agree"
                      className="bg-brown text-white px-10 py-3.5 text-xs uppercase tracking-widest-plus font-semibold hover:bg-brown-light transition-colors duration-300 pressable"
                    >
                      {AGREE_LABEL}
                    </button>
                  </>
                )}
              </div>

              <p className="mt-6 text-[11px] text-ink-soft/80">Last reviewed · {LAST_REVIEWED}</p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
