"use client";

import { PanelCard } from "@/components/landing/whatsapp-demo/panel-card";
import type { DemoStage } from "@/components/landing/whatsapp-demo/whatsapp-conversation-demo";

import { useStepLoop } from "./use-step-loop";

/** The same month card as in the hero, walking through Ana's month on its own. */
const STAGES: DemoStage[] = ["charge", "reminder", "receipt", "confirmed"];
const STEPS = [2200, 2200, 2400, 3600] as const;

/** Earlier months, stacked behind the current one. */
function PastMonth({ month, className }: { month: string; className: string }) {
  return (
    <div aria-hidden className={`bento-piece absolute left-1/2 h-32 -translate-x-1/2 rounded-[1.5rem] px-5 pt-1.5 ${className}`}>
      <span className="block text-[11px] font-medium text-foreground/45">{month}</span>
    </div>
  );
}

export function MonthScene() {
  const { ref, step } = useStepLoop(STEPS, 3);

  return (
    <div ref={ref} className="absolute inset-0">
      <PastMonth month="Setembro" className="top-3 w-[13rem] opacity-70" />
      <PastMonth month="Outubro" className="top-8 w-[14.75rem]" />
      <div className="absolute top-[3.25rem] left-1/2 w-[16.5rem] -translate-x-1/2">
        <PanelCard stage={STAGES[step]} />
      </div>
    </div>
  );
}
