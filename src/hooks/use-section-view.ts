"use client";

import { useEffect, useRef } from "react";

import {
  trackLandingSectionViewed,
  type LandingAudience,
  type LandingSectionId,
} from "@/lib/landing-analytics";

const viewedSections = new Set<LandingSectionId>();

export function useSectionView(
  section: LandingSectionId,
  ref: React.RefObject<HTMLElement | null>,
  audience?: LandingAudience,
) {
  const hasFired = useRef(false);

  useEffect(() => {
    const element = ref.current;
    if (!element || hasFired.current || viewedSections.has(section)) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting || hasFired.current) return;

        hasFired.current = true;
        viewedSections.add(section);
        trackLandingSectionViewed(
          section,
          audience ? { audience } : undefined,
        );
        observer.disconnect();
      },
      { threshold: 0.35 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [audience, ref, section]);
}
