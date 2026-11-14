import { SectionHeading } from "@/components/landing/section-heading";
import { SectionShell } from "@/components/landing/section-shell";
import { TennisSignupButton } from "@/components/landing/tennis/tennis-signup-button";
import { TennisTrialNote } from "@/components/landing/tennis/tennis-trial-note";
import { TENNIS_LANDING_AUDIENCE } from "@/lib/landing-analytics";
import { tennisPlan, tennisPricing } from "@/lib/tennis-landing-content";

export function TennisPricing() {
  return (
    <SectionShell
      id="tennis_preco"
      labelledBy="tennis-preco-titulo"
      tinted
      analyticsSection="tennis_preco"
      analyticsAudience={TENNIS_LANDING_AUDIENCE}
    >
      <div className="mx-auto flex w-full max-w-xl flex-col gap-8">
        <SectionHeading
          align="center"
          titleId="tennis-preco-titulo"
          title={tennisPricing.title}
          description={tennisPricing.lead}
        />
        <div className="flex flex-col gap-6 rounded-xl border border-border bg-card p-6 sm:p-8">
          <div className="flex flex-col gap-2 text-center">
            <p className="text-sm font-semibold tracking-wide text-primary uppercase">
              {tennisPlan.name}
            </p>
            <p className="font-heading text-4xl font-semibold tracking-tight text-foreground tabular-nums">
              {tennisPlan.monthlyLabel}
              <span className="font-sans text-base font-medium text-foreground/72">/mês</span>
            </p>
            <p className="text-sm text-foreground/72">{tennisPricing.yearlyNote}</p>
            <p className="mx-auto mt-1 w-fit font-heading text-base font-medium tracking-[-0.01em] text-foreground">
              <span className="bg-[linear-gradient(transparent_58%,color-mix(in_oklab,var(--primary)_34%,transparent)_58%)] px-0.5">
                {tennisPricing.comparison}
              </span>
            </p>
          </div>
          <p className="text-center text-base leading-relaxed text-foreground text-pretty">
            {tennisPricing.feature}
          </p>
          <TennisTrialNote className="mx-auto" />
          <div id="tennis-pricing-cta" className="flex justify-center">
            <TennisSignupButton location="tennis_pricing" className="w-full sm:w-auto" />
          </div>
          <p className="text-center text-sm leading-relaxed text-foreground/72 text-pretty">
            {tennisPricing.moreStudents}
          </p>
        </div>
      </div>
    </SectionShell>
  );
}
