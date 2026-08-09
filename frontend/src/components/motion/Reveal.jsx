import { Children, isValidElement, cloneElement } from "react";
import { motion, useReducedMotion } from "motion/react";
import useIsInView from "@/lib/useIsInView";
import Slot from "./Slot";

/**
 * Scroll-triggered reveal — Animate UI's `fade`, `slide` and `blur` effects
 * folded into one component, since the site always uses them together.
 *
 * Replaces the IntersectionObserver + `.reveal`/`.in-view` CSS pair for new
 * markup. The old hook still works; this adds direction, blur, stagger and
 * spring physics that CSS transitions can't express.
 *
 *   <Reveal>…</Reveal>                        fade + rise
 *   <Reveal asChild><section/></Reveal>       animate the child, no wrapper
 *   <Reveal direction="left" delay={120} />   slide in from the left
 *   <Reveal blur>…</Reveal>                   add a blur-in
 */
const OFFSETS = {
  up: (d) => ({ y: d, x: 0 }),
  down: (d) => ({ y: -d, x: 0 }),
  left: (d) => ({ y: 0, x: d }),
  right: (d) => ({ y: 0, x: -d }),
  none: () => ({ y: 0, x: 0 }),
};

export default function Reveal({
  ref,
  children,
  direction = "up",
  distance = 28,
  delay = 0,
  blur = false,
  blurAmount = 8,
  initialOpacity = 0,
  opacity = 1,
  initialScale = 1,
  transition = { type: "spring", stiffness: 150, damping: 24, mass: 0.6 },
  inView = true,
  inViewOnce = true,
  inViewMargin = "-80px",
  asChild = false,
  ...props
}) {
  const reduceMotion = useReducedMotion();
  const { ref: localRef, isInView } = useIsInView(ref, {
    inView,
    inViewOnce,
    inViewMargin,
  });

  const offset = reduceMotion
    ? OFFSETS.none()
    : (OFFSETS[direction] ?? OFFSETS.up)(distance);

  const useBlur = blur && !reduceMotion;

  const Component = asChild ? Slot : motion.div;

  return (
    <Component
      ref={localRef}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: {
          opacity: initialOpacity,
          ...offset,
          ...(reduceMotion ? {} : { scale: initialScale }),
          ...(useBlur ? { filter: `blur(${blurAmount}px)` } : {}),
        },
        visible: {
          opacity,
          y: 0,
          x: 0,
          ...(reduceMotion ? {} : { scale: 1 }),
          ...(useBlur ? { filter: "blur(0px)" } : {}),
        },
      }}
      transition={{
        ...transition,
        delay: (transition?.delay ?? 0) + delay / 1000,
      }}
      {...props}
    >
      {children}
    </Component>
  );
}

/**
 * Staggers a list of children, mirroring Animate UI's `Fades` helper.
 * `holdDelay` is the gap in ms between consecutive items.
 */
function Reveals({ children, delay = 0, holdDelay = 90, asChild = false, ...props }) {
  const items = Children.toArray(children).filter(isValidElement);

  return items.map((child, index) => (
    <Reveal
      key={child.key ?? index}
      delay={delay + index * holdDelay}
      asChild={asChild}
      {...props}
    >
      {asChild ? cloneElement(child) : child}
    </Reveal>
  ));
}

export { Reveal, Reveals };
