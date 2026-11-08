import { SectionHeading } from "@/components/landing/section-heading";
import { SectionShell } from "@/components/landing/section-shell";
import { TENNIS_LANDING_AUDIENCE } from "@/lib/landing-analytics";
import { tennisHowItWorks } from "@/lib/tennis-landing-content";

export function TennisHowItWorks() {
  return (
    <SectionShell
      id="tennis_como_funciona"
      labelledBy="tennis-como-funciona-titulo"
      analyticsSection="tennis_como_funciona"
      analyticsAudience={TENNIS_LANDING_AUDIENCE}
    >
      <SectionHeading
        titleId="tennis-como-funciona-titulo"
        title={tennisHowItWorks.title}
        description={tennisHowItWorks.lead}
      />
      <ol className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {tennisHowItWorks.steps.map((step, index) => (
          <li key={step.title} className="flex flex-col gap-3">
            <span
              className="flex size-9 items-center justify-center rounded-lg bg-primary/10 font-mono text-sm font-bold text-primary"
              aria-hidden
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className="text-lg font-semibold tracking-[-0.01em] text-balance">{step.title}</h3>
            <p className="text-sm leading-relaxed text-foreground/72 text-pretty sm:text-base">
              {step.description}
            </p>
          </li>
        ))}
      </ol>
      <p className="max-w-3xl text-base font-medium text-foreground text-pretty sm:text-lg">
        {tennisHowItWorks.closing}
      </p>
    </SectionShell>
  );
}
