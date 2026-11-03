import { SectionHeading } from "@/components/landing/section-heading";
import { SectionShell } from "@/components/landing/section-shell";
import { TENNIS_LANDING_AUDIENCE } from "@/lib/landing-analytics";
import { tennisHowItWorks } from "@/lib/tennis-landing-content";

export function TennisHowItWorks() {
  return (
    <SectionShell
      id="tennis_como_funciona"
      labelledBy="tennis-como-funciona-titulo"
      tinted
      analyticsSection="tennis_como_funciona"
      analyticsAudience={TENNIS_LANDING_AUDIENCE}
    >
      <SectionHeading
        titleId="tennis-como-funciona-titulo"
        title={tennisHowItWorks.title}
        description={tennisHowItWorks.lead}
      />
      <ol className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {tennisHowItWorks.steps.map((step) => (
          <li key={step.title} className="flex flex-col gap-3 border-t border-foreground/15 pt-4">
            <span className="font-mono text-sm font-medium text-primary">{step.step}</span>
            <h3 className="text-lg font-semibold tracking-[-0.01em] text-balance">
              {step.title}
            </h3>
            <p className="text-sm leading-relaxed text-foreground/72 text-pretty sm:text-base">
              {step.description}
            </p>
          </li>
        ))}
      </ol>
    </SectionShell>
  );
}
