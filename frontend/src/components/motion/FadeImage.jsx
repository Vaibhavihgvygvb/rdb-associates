import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

/**
 * An <img> that fades up once the bitmap is actually decoded, instead of
 * snapping in at full opacity halfway through a scroll.
 *
 * Layout is unaffected — the element occupies its box from first paint, so this
 * introduces no shift. Callers keep supplying their own sizing classes.
 *
 * `priority` marks an above-the-fold image: it opts out of lazy loading and
 * asks the browser to fetch it ahead of the route chunks competing for
 * bandwidth. Everything else defers.
 */
export default function FadeImage({
  className,
  style,
  priority = false,
  duration = 700,
  ...props
}) {
  const ref = useRef(null);
  const [loaded, setLoaded] = useState(false);

  // A cached image can finish before React attaches onLoad, which would leave
  // it stuck at opacity 0. `complete` catches that case on mount.
  useEffect(() => {
    if (ref.current?.complete) setLoaded(true);
  }, []);

  return (
    <img
      {...props}
      ref={ref}
      onLoad={() => setLoaded(true)}
      // A decode error must not leave a permanently invisible image.
      onError={() => setLoaded(true)}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      fetchPriority={priority ? "high" : "auto"}
      className={cn(loaded ? "opacity-100" : "opacity-0", className)}
      style={{
        transition: `opacity ${duration}ms cubic-bezier(0.16, 1, 0.3, 1)`,
        ...style,
      }}
    />
  );
}

export { FadeImage };
