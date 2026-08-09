import { useId, useRef } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { X } from "lucide-react";
import useFocusTrap from "@/lib/useFocusTrap";
import useScrollLock from "@/lib/useScrollLock";
import { cn } from "@/lib/cn";

/**
 * The detail overlay used by the practice-area and expertise grids.
 *
 * Both sections previously inlined their own copy of this: a fixed backdrop, a
 * click-outside handler and a close button, with none of the behaviour a
 * dialog actually needs. No `role="dialog"`, so assistive tech announced it as
 * an ordinary div; no Escape; no focus trap or restore; no scroll lock, which
 * on a Lenis-driven page meant the wheel scrolled the article *behind* the
 * open panel while the panel's own `overflow-y-auto` sat there unused.
 *
 * `open` is derived from the caller's selection state, so the content is
 * whatever was last selected — kept mounted through the exit animation by
 * AnimatePresence.
 */
export default function Modal({ open, onClose, title, children, className }) {
  const containerRef = useRef(null);
  const titleId = useId();
  const reduceMotion = useReducedMotion();

  useScrollLock(open);
  useFocusTrap(open, containerRef, { onEscape: onClose });

  // Portalled to <body>. Both callers render this inside a <Reveal>-wrapped
  // <section>, and Reveal animates a transform on that section — which makes
  // it the containing block for any `position: fixed` descendant, so the
  // overlay would be positioned against the section rather than the viewport.
  // PracticeAreas' section additionally sets `overflow-hidden`, which clips
  // fixed descendants once such a containing block exists. Escaping to the
  // body sidesteps both, and is what a dialog wants regardless.
  return createPortal(
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
          <motion.div
            aria-hidden
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-ink/70 backdrop-blur-sm"
          />

          <motion.div
            ref={containerRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            /* -1 so the trap can move focus here on open without adding the
               panel to the normal tab order. */
            tabIndex={-1}
            /* Wheel events inside the panel stay inside it instead of being
               handed to Lenis and applied to the page behind. */
            data-lenis-prevent
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 12, scale: 0.98 }}
            animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 8, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 260, damping: 26 }}
            className={cn(
              "relative max-w-2xl w-full bg-white border border-border p-10 md:p-14",
              "max-h-[85dvh] overflow-y-auto shadow-2xl outline-none",
              className,
            )}
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute top-4 right-4 text-ink-soft hover:text-brown transition-colors p-1"
            >
              <X size={22} strokeWidth={1.5} />
            </button>

            {children({ titleId })}

            <div className="mt-8 flex justify-end">
              <button
                type="button"
                onClick={onClose}
                className="border border-brown text-brown px-6 py-3 text-xs tracking-widest-plus uppercase hover:bg-brown hover:text-white transition-colors duration-300"
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body,
  );
}

export { Modal };
