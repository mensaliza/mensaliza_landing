import { ClockIcon, ImageOffIcon, MessagesSquareIcon, PauseIcon, UsersIcon } from "lucide-react";

import { SectionHeading } from "@/components/landing/section-heading";
import { SectionShell } from "@/components/landing/section-shell";
import { TENNIS_LANDING_AUDIENCE } from "@/lib/landing-analytics";
import { tennisPain } from "@/lib/tennis-landing-content";

const situationIcons = {
  "one-by-one": MessagesSquareIcon,
  "lost-receipt": ImageOffIcon,
  "who-paid": UsersIcon,
  court: PauseIcon,
  late: ClockIcon,
} as const;

export function TennisPain() {
  return (
    <SectionShell
      id="tennis_dor"
      labelledBy="tennis-dor-titulo"
      tinted
      analyticsSection="tennis_dor"
      analyticsAudience={TENNIS_LANDING_AUDIENCE}
    >
      <SectionHeading
        titleId="tennis-dor-titulo"
        title={tennisPain.title}
        description={tennisPain.lead}
      />
      <ul className="divide-y divide-border border-y border-border">
        {tennisPain.situations.map((situation) => {
          const Icon = situationIcons[situation.id];

          return (
            <li
              key={situation.id}
              className="grid grid-cols-[auto_1fr] items-start gap-x-4 gap-y-1 py-5 sm:grid-cols-[auto_minmax(12rem,16rem)_minmax(0,1fr)] sm:items-center sm:gap-x-8 sm:py-6"
            >
              <span className="row-span-2 flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary sm:row-span-1">
                <Icon className="size-5" aria-hidden />
              </span>
              <h3 className="text-lg font-semibold tracking-[-0.01em] text-balance">
                {situation.title}
              </h3>
              <p className="col-start-2 text-base leading-relaxed text-foreground/72 text-pretty sm:col-start-auto">
                {situation.body}
              </p>
            </li>
          );
        })}
      </ul>
      <p className="max-w-3xl font-heading text-xl leading-snug font-semibold tracking-[-0.02em] text-balance sm:text-2xl">
        {tennisPain.closing}
      </p>
    </SectionShell>
  );
}
