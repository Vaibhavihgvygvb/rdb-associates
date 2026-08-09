import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ReactLenis, useLenis } from "lenis/react";
import { useReducedMotion } from "motion/react";
import { NAV_HEIGHT } from "@/lib/layout";
import "lenis/dist/lenis.css";

/**
 * Lenis smooth-scroll root.
 *
 * Mounted inside <BrowserRouter> so `ScrollReset` can read the current route.
 * Lenis drives the real window scroll position (it doesn't transform a
 * container), which keeps `window.scrollY` listeners — Nav's shadow toggle —
 * and motion's `useScroll` working untouched.
 *
 * `anchors` hands same-page `#hash` links to Lenis; the old
 * `html { scroll-behavior: smooth }` rule was removed from index.css because
 * native smooth scrolling fights Lenis for control of the scroll position.
 */
const LENIS_OPTIONS = {
  duration: 1.05,
  // Gentle exponential ease-out — matches the site's cubic-bezier(0.16, 1, 0.3, 1).
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
  // Native momentum on touch devices feels better than an emulated one.
  syncTouch: false,
  anchors: { offset: -NAV_HEIGHT }, // clears the fixed header
};

function ScrollReset() {
  const { pathname } = useLocation();
  const lenis = useLenis();

  useEffect(() => {
    if (lenis) lenis.scrollTo(0, { immediate: true, force: true });
    else window.scrollTo(0, 0);
  }, [pathname, lenis]);

  return null;
}

export default function SmoothScroll({ children }) {
  const reduceMotion = useReducedMotion();

  // Readers who ask for reduced motion get the browser's own scrolling.
  if (reduceMotion) {
    return (
      <>
        <ScrollReset />
        {children}
      </>
    );
  }

  return (
    <ReactLenis root options={LENIS_OPTIONS}>
      <ScrollReset />
      {children}
    </ReactLenis>
  );
}

export { SmoothScroll, ScrollReset };
