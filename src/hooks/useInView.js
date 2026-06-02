import { useEffect, useRef, useState } from "react";

export const useInView = (options = {}) => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (!options.repeat) observer.unobserve(entry.target);
        } else if (options.repeat) {
          setInView(false);
        }
      },
      { threshold: options.threshold || 0.15, ...options }
    );

    const el = ref.current;
    if (el) observer.observe(el);
    return () => { if (el) observer.unobserve(el); };
  }, [options.threshold, options.repeat]);

  return [ref, inView];
};
