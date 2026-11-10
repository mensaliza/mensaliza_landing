"use client";

import { useEffect, useRef, useState } from "react";

import { painPoints } from "@/lib/landing-content";

/**
 * The three chores, said big, then crossed out with an orange marker the first time each one
 * scrolls into view; what Mensaliza does instead rises in under it. The stroke is a background
 * on the inline text, so it runs line by line across a wrapped sentence, like a pen would.
 */
function PainPoint({ before, after }: { before: string; after: string }) {
  const ref = useRef<HTMLLIElement>(null);
  const [struck, setStruck] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setStruck(true);
        observer.disconnect();
      },
      { threshold: 0.6 }
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <li
      ref={ref}
      data-struck={struck}
      className="pain-point grid gap-4 border-t border-foreground/12 py-8 first:border-t-0 sm:py-10 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:items-end lg:gap-16"
    >
      <p className="text-[clamp(1.5rem,3.2vw,2.25rem)] leading-[1.2] font-semibold tracking-[-0.025em] text-pretty">
        <span className="pain-point-before">{before}</span>
      </p>
      <p className="pain-point-after max-w-[32ch] text-lg leading-snug font-medium text-foreground text-pretty sm:text-xl">
        {after}
      </p>
    </li>
  );
}

export function StruckPainPoints() {
  return (
    <ul className="list-none p-0">
      {painPoints.map((item) => (
        <PainPoint key={item.before} before={item.before} after={item.after} />
      ))}
    </ul>
  );
}
