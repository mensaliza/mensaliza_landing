"use client";

import { useRef } from "react";

import { useSectionView } from "@/hooks/use-section-view";
import type { LandingSectionId } from "@/lib/landing-analytics";

type SectionViewTrackerProps = {
  section: LandingSectionId;
};

export function SectionViewTracker({ section }: SectionViewTrackerProps) {
  const ref = useRef<HTMLDivElement>(null);
  useSectionView(section, ref);

  return (
    <div
      ref={ref}
      className="pointer-events-none absolute inset-0"
      aria-hidden
    />
  );
}
