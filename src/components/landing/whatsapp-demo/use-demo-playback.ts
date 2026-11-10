"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeReducedMotion(onChange: () => void) {
  const media = window.matchMedia(REDUCED_MOTION_QUERY);
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
}

/** Plays a demo only while it is on screen, and never when the visitor asked for less motion. */
export function useDemoPlayback<T extends HTMLElement>(threshold = 0.28) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia(REDUCED_MOTION_QUERY).matches,
    () => false
  );

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      threshold,
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView, reducedMotion };
}

export function createWaiter() {
  let timer: number | undefined;
  let cancelled = false;

  return {
    wait: (ms: number) =>
      new Promise<void>((resolve) => {
        timer = window.setTimeout(resolve, ms);
      }),
    get cancelled() {
      return cancelled;
    },
    cancel: () => {
      cancelled = true;
      if (timer !== undefined) window.clearTimeout(timer);
    },
  };
}
