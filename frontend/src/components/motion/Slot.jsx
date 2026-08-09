import { useMemo, isValidElement } from "react";
import { motion, isMotionComponent } from "motion/react";
import { cn } from "@/lib/cn";

/**
 * Ported from Animate UI's `slot` primitive.
 *
 * Lets an effect animate its child element directly instead of wrapping it in
 * an extra <div>. That matters here: most sections sit inside CSS grids, where
 * an injected wrapper would break `col-span` placement.
 */
function mergeRefs(...refs) {
  return (node) => {
    refs.forEach((ref) => {
      if (!ref) return;
      if (typeof ref === "function") ref(node);
      else ref.current = node;
    });
  };
}

function mergeProps(childProps, slotProps) {
  const merged = { ...childProps, ...slotProps };

  if (childProps.className || slotProps.className) {
    merged.className = cn(childProps.className, slotProps.className);
  }

  if (childProps.style || slotProps.style) {
    merged.style = { ...childProps.style, ...slotProps.style };
  }

  return merged;
}

export default function Slot({ children, ref, ...props }) {
  const childType = isValidElement(children) ? children.type : null;

  const isAlreadyMotion =
    typeof childType === "object" &&
    childType !== null &&
    isMotionComponent(childType);

  const Base = useMemo(
    () => (isAlreadyMotion ? childType : childType && motion.create(childType)),
    [isAlreadyMotion, childType],
  );

  if (!isValidElement(children) || !Base) return null;

  const { ref: childRef, ...childProps } = children.props;

  return (
    <Base
      {...mergeProps(childProps, props)}
      ref={mergeRefs(childRef, ref)}
    />
  );
}

export { Slot };
