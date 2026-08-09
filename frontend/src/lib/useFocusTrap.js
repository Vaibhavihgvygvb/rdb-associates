import { useEffect, useRef } from "react";

/**
 * Keeps keyboard focus inside an open overlay, and gives it back when the
 * overlay closes.
 *
 * `aria-modal="true"` is a promise to assistive tech that the rest of the page
 * is inert. Nothing enforces it: without a trap, Tab walks straight out of the
 * dialog and into the page behind, which is still scrolled away underneath.
 * Restoring focus on close matters just as much — otherwise focus resets to
 * <body> and the next Tab starts again from the top of the document, losing
 * the reader's place entirely.
 */
const FOCUSABLE = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
].join(", ");

// `getClientRects()` rather than `offsetParent`, which is null for anything
// `position: fixed` — i.e. for the overlays this is used on.
const isVisible = (el) => el.getClientRects().length > 0;

export default function useFocusTrap(active, containerRef, options = {}) {
  const { onEscape, initialFocus = true } = options;

  // Held in a ref so a caller passing an inline arrow doesn't re-run the
  // effect on every render — which would restore focus each time through the
  // cleanup and yank it back out of the dialog.
  const onEscapeRef = useRef(onEscape);
  onEscapeRef.current = onEscape;

  useEffect(() => {
    if (!active) return;

    const restoreTo = document.activeElement;
    const node = containerRef.current;

    if (initialFocus && node) {
      // The container itself, not its first control: a screen reader then
      // announces the dialog's label and content from the top rather than
      // starting partway in at whatever happens to be focusable first.
      node.focus();
    }

    const onKey = (e) => {
      if (e.key === "Escape") {
        if (onEscapeRef.current) {
          e.preventDefault();
          onEscapeRef.current();
        }
        return;
      }
      if (e.key !== "Tab" || !containerRef.current) return;

      const items = Array.from(containerRef.current.querySelectorAll(FOCUSABLE)).filter(isVisible);
      if (items.length === 0) {
        // Nothing to land on — keep focus on the container rather than
        // letting Tab escape to the page behind.
        e.preventDefault();
        containerRef.current.focus();
        return;
      }

      const first = items[0];
      const last = items[items.length - 1];
      const activeEl = document.activeElement;

      if (e.shiftKey && (activeEl === first || activeEl === containerRef.current)) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && activeEl === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      // Guard: the trigger may itself have unmounted while the dialog was open.
      if (restoreTo instanceof HTMLElement && document.contains(restoreTo)) {
        restoreTo.focus();
      }
    };
  }, [active, containerRef, initialFocus]);
}

export { useFocusTrap };
