import { motion, useScroll, useSpring } from "motion/react";
import { cn } from "@/lib/cn";

/**
 * Reading-progress bar, adapted from Animate UI's `scroll-progress` primitive.
 *
 * Animate UI ships this as a provider/container/bar trio so it can track an
 * arbitrary scroll container. Every use here tracks the window, so it collapses
 * to a single element driven by a spring-smoothed `scrollYProgress`.
 */
export default function ScrollProgress({ className, transition, ...props }) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 250,
    damping: 40,
    bounce: 0,
    ...transition,
  });

  return (
    <motion.div
      data-slot="scroll-progress"
      role="presentation"
      style={{ scaleX, transformOrigin: "0% 50%" }}
      className={cn("h-px w-full bg-brown", className)}
      {...props}
    />
  );
}

export { ScrollProgress };
