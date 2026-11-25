"use client";

import { useEffect, useRef, useState } from "react";

import { createWaiter, useDemoPlayback } from "@/components/landing/whatsapp-demo/use-demo-playback";

/**
 * Walks through the steps of a small scene, holding each one for its duration, then starts over.
 * Plays only while the scene is on screen; with reduced motion it rests on `restingStep`.
 */
export function useStepLoop(durations: readonly number[], restingStep: number) {
  const { ref, inView, reducedMotion } = useDemoPlayback<HTMLDivElement>();
  const [step, setStep] = useState(0);
  const stepRef = useRef(0);

  useEffect(() => {
    if (!inView || reducedMotion) return;
    const timer = createWaiter();

    const loop = async () => {
      while (!timer.cancelled) {
        await timer.wait(durations[stepRef.current]);
        if (timer.cancelled) return;
        stepRef.current = (stepRef.current + 1) % durations.length;
        setStep(stepRef.current);
      }
    };

    void loop();
    return () => timer.cancel();
  }, [inView, reducedMotion, durations]);

  return { ref, inView, reducedMotion, step: reducedMotion ? restingStep : step };
}
