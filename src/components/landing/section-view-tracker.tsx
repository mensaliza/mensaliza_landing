"use client";

import { useRef } from "react";

import { useSectionView } from "@/hooks/use-section-view";
import type { LandingAudience, LandingSectionId } from "@/lib/landing-analytics";

type SectionViewTrackerProps = {
  section: LandingSectionId;
  audience?: LandingAudience;
};

export function SectionViewTracker({ section, audience }: SectionViewTrackerProps) {
  const ref = useRef<HTMLDivElement>(null);
  useSectionView(section, ref, audience);

  return (
    <div
      ref={ref}
      className="pointer-events-none absolute inset-0"
      aria-hidden
    />
  );
}
