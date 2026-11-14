import { SectionHeading } from "@/components/landing/section-heading";
import { SectionShell } from "@/components/landing/section-shell";
import { TENNIS_LANDING_AUDIENCE } from "@/lib/landing-analytics";
import { tennisPain } from "@/lib/tennis-landing-content";

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
        {tennisPain.situations.map((situation) => (
          <li
            key={situation.id}
            className="flex flex-col gap-1 py-5 sm:grid sm:grid-cols-[minmax(12rem,18rem)_minmax(0,1fr)] sm:items-center sm:gap-x-8 sm:py-6"
          >
            <h3 className="text-lg font-semibold tracking-[-0.01em] text-balance">
              {situation.title}
            </h3>
            <p className="text-base leading-relaxed text-foreground/72 text-pretty">
              {situation.body}
            </p>
          </li>
        ))}
      </ul>
      <p className="max-w-3xl font-heading text-xl leading-snug font-semibold tracking-[-0.02em] text-balance sm:text-2xl">
        {tennisPain.closing}
      </p>
    </SectionShell>
  );
}
