import { useEffect, useRef } from "react";

export default function useReveal(options = { threshold: 0.15 }) {
  const ref = useRef(null);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("in-view");
          io.unobserve(e.target);
        }
      });
    }, options);
    io.observe(node);
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return ref;
}