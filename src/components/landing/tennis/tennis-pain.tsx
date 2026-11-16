import { Reveal } from "@/components/landing/motion/reveal";
import { SectionHeading } from "@/components/landing/section-heading";
import { SectionShell } from "@/components/landing/section-shell";
import { TENNIS_LANDING_AUDIENCE } from "@/lib/landing-analytics";
import { tennisPain } from "@/lib/tennis-landing-content";

export function TennisPain() {
  return (
    <SectionShell
      id="rotina"
      labelledBy="tennis-dor-titulo"
      tinted
      analyticsSection="tennis_dor"
      analyticsAudience={TENNIS_LANDING_AUDIENCE}
    >
      <div className="flex flex-col gap-12">
        <Reveal>
          <SectionHeading
            align="center"
            titleId="tennis-dor-titulo"
            title={tennisPain.title}
            description={tennisPain.lead}
            className="mx-auto"
          />
        </Reveal>

        <Reveal delay={60}>
          <ul className="divide-y divide-border overflow-hidden rounded-xl border border-border bg-card">
            {tennisPain.situations.map((situation) => (
              <li
                key={situation.id}
                className="flex flex-col gap-1 p-5 sm:grid sm:grid-cols-[minmax(12rem,18rem)_minmax(0,1fr)] sm:items-center sm:gap-x-8 sm:px-6 sm:py-6"
              >
                <h3 className="text-base font-semibold tracking-[-0.01em] text-balance sm:text-lg">
                  {situation.title}
                </h3>
                <p className="text-sm leading-relaxed text-foreground/72 text-pretty sm:text-base">
                  {situation.body}
                </p>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={120}>
          <p className="mx-auto max-w-2xl text-center text-lg font-semibold leading-relaxed text-foreground text-balance">
            {tennisPain.closing}
          </p>
        </Reveal>
      </div>
    </SectionShell>
  );
}
