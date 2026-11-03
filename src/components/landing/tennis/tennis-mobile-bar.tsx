"use client";

import { useEffect, useState } from "react";

import { TennisSignupButton } from "@/components/landing/tennis/tennis-signup-button";
import { cn } from "cn";

const TRIAL_NOTE_IDS = ["tennis-hero-trial", "tennis-final-trial"] as const;

export function TennisMobileBar() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const notes = TRIAL_NOTE_IDS.map((id) => document.getElementById(id)).filter(
      (note): note is HTMLElement => note instanceof HTMLElement
    );

    if (notes.length === 0) {
      setShow(true);
      return;
    }

    const visible = new Set<Element>();
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          visible.add(entry.target);
        } else {
          visible.delete(entry.target);
        }
      }
      setShow(visible.size === 0);
    });

    for (const note of notes) {
      observer.observe(note);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 backdrop-blur-sm lg:hidden",
        !show && "hidden"
      )}
      aria-hidden={!show}
    >
      <div className="px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
        <TennisSignupButton location="tennis_mobile" className="w-full" />
      </div>
    </div>
  );
}
