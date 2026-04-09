import { useEffect, useRef } from 'react';

/**
 * Hook: returns a ref to attach to an element.
 * When the element enters the viewport, the hook adds the class 'in-view' to it.
 * Uses a single IntersectionObserver instance per element.
 */
export function useInView(options = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          el.classList.add('in-view');
          observer.unobserve(el); // stop observing after it becomes visible
        }
      }
    }, options);

    observer.observe(el);
    return () => observer.disconnect();
  }, [options]);

  return ref;
}
