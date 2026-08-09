import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import Slot from "./Slot";

/**
 * Drifts its content against the scroll direction as the element crosses the
 * viewport. Reads Lenis' smoothed scroll position through motion's `useScroll`,
 * so the movement inherits the same easing as the page itself.
 *
 * `speed` is the total travel in pixels across a full viewport pass; negative
 * values invert the direction.
 */
export default function Parallax({
  children,
  speed = 60,
  axis = "y",
  asChild = false,
  style,
  ...props
}) {
  const containerRef = useRef(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const travel = useTransform(scrollYProgress, [0, 1], [speed, -speed]);

  const Component = asChild ? Slot : motion.div;

  return (
    <Component
      ref={containerRef}
      data-slot="parallax"
      style={reduceMotion ? style : { ...style, [axis]: travel }}
      {...props}
    >
      {children}
    </Component>
  );
}

export { Parallax };
