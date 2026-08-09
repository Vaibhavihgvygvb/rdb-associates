import { useEffect } from "react";
import { useMotionValue, useSpring, useReducedMotion } from "motion/react";
import useIsInView from "@/lib/useIsInView";

/**
 * Ported from Animate UI's `counting-number` primitive.
 *
 * Springs from `fromNumber` to `number` when the element scrolls into view.
 * Writes to `textContent` directly rather than through state, so counting never
 * triggers a React re-render.
 */
export default function CountingNumber({
  ref,
  number,
  fromNumber = 0,
  decimalPlaces,
  decimalSeparator = ".",
  transition = { stiffness: 90, damping: 50 },
  delay = 0,
  inView = true,
  inViewOnce = true,
  inViewMargin = "-40px",
  ...props
}) {
  const reduceMotion = useReducedMotion();
  const { ref: localRef, isInView } = useIsInView(ref, {
    inView,
    inViewOnce,
    inViewMargin,
  });

  const numberStr = number.toString();
  const decimals =
    typeof decimalPlaces === "number"
      ? decimalPlaces
      : numberStr.includes(".")
        ? (numberStr.split(".")[1]?.length ?? 0)
        : 0;

  const format = (value) => {
    const out =
      decimals > 0 ? value.toFixed(decimals) : Math.round(value).toString();
    return decimals > 0 ? out.replace(".", decimalSeparator) : out;
  };

  const motionVal = useMotionValue(reduceMotion ? number : fromNumber);
  const springVal = useSpring(motionVal, transition);

  useEffect(() => {
    if (reduceMotion) return;
    const timeoutId = setTimeout(() => {
      if (isInView) motionVal.set(number);
    }, delay);
    return () => clearTimeout(timeoutId);
  }, [isInView, number, motionVal, delay, reduceMotion]);

  useEffect(() => {
    const unsubscribe = springVal.on("change", (latest) => {
      if (localRef.current) localRef.current.textContent = format(latest);
    });
    return () => unsubscribe();
  }, [springVal, decimals, decimalSeparator]); // `format` is derived from these

  return (
    <span ref={localRef} data-slot="counting-number" {...props}>
      {format(reduceMotion ? number : fromNumber)}
    </span>
  );
}

export { CountingNumber };
