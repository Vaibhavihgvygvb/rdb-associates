import { useImperativeHandle, useRef } from "react";
import { useInView } from "motion/react";

/**
 * Ported from Animate UI's `use-is-in-view` hook.
 *
 * Returns a ref to attach to the animated element plus whether it has entered
 * the viewport. `inView: false` opts out of scroll-triggering entirely — the
 * element is then treated as always visible and animates on mount.
 */
export default function useIsInView(ref, options = {}) {
  const { inView = true, inViewOnce = true, inViewMargin = "0px" } = options;

  const localRef = useRef(null);
  useImperativeHandle(ref, () => localRef.current);

  const inViewResult = useInView(localRef, {
    once: inViewOnce,
    margin: inViewMargin,
  });

  return { ref: localRef, isInView: !inView || inViewResult };
}

export { useIsInView };
