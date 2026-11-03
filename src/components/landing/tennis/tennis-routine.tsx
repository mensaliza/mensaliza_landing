import { CheckIcon } from "lucide-react";

import { SectionHeading } from "@/components/landing/section-heading";
import { SectionShell } from "@/components/landing/section-shell";
import { TENNIS_LANDING_AUDIENCE } from "@/lib/landing-analytics";
import { tennisRoutineBenefits } from "@/lib/tennis-landing-content";

export function TennisRoutine() {
  return (
    <SectionShell
      id="tennis_rotina"
      labelledBy="tennis-rotina-titulo"
      tinted
      analyticsSection="tennis_rotina"
      analyticsAudience={TENNIS_LANDING_AUDIENCE}
    >
      <SectionHeading
        titleId="tennis-rotina-titulo"
        title={tennisRoutineBenefits.title}
        description={tennisRoutineBenefits.lead}
      />
      <ul className="grid gap-x-12 gap-y-8 sm:grid-cols-2">
        {tennisRoutineBenefits.benefits.map((benefit) => (
          <li key={benefit.id} className="flex items-start gap-3">
            <CheckIcon className="mt-1 size-5 shrink-0 text-primary" strokeWidth={2.5} aria-hidden />
            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-semibold tracking-[-0.01em] text-balance">
                {benefit.title}
              </h3>
              <p className="text-base leading-relaxed text-foreground/72 text-pretty">
                {benefit.body}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </SectionShell>
  );
}
