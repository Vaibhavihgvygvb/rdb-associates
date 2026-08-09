import { useEffect } from "react";
import { useLenis } from "lenis/react";

/**
 * Holds the page still behind an overlay.
 *
 * `overflow: hidden` on its own is not enough here. Lenis drives the real
 * scroll position itself through rAF rather than letting the browser do it, so
 * it will happily keep scrolling a body that CSS has declared unscrollable —
 * it has to be told to stand down as well. The overflow lock stays for the
 * reduced-motion path, where Lenis never mounts and `useLenis()` returns null.
 */
export default function useScrollLock(active) {
  const lenis = useLenis();

  useEffect(() => {
    if (!active) return;

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    lenis?.stop();

    return () => {
      document.body.style.overflow = previous;
      lenis?.start();
    };
  }, [active, lenis]);
}

export { useScrollLock };
