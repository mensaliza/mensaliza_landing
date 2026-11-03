import { SectionShell } from "@/components/landing/section-shell";
import { TennisCourtLines } from "@/components/landing/tennis/tennis-court-lines";
import { TennisSignupButton } from "@/components/landing/tennis/tennis-signup-button";
import { TennisTrialNote } from "@/components/landing/tennis/tennis-trial-note";
import { TENNIS_LANDING_AUDIENCE } from "@/lib/landing-analytics";
import { tennisHero } from "@/lib/tennis-landing-content";

export function TennisHero() {
  return (
    <SectionShell
      id="tennis_hero"
      labelledBy="tennis-hero-titulo"
      analyticsSection="tennis_hero"
      analyticsAudience={TENNIS_LANDING_AUDIENCE}
      className="overflow-hidden"
    >
      <div className="relative z-10 grid w-full items-center gap-6 lg:grid-cols-[minmax(0,40rem)_minmax(14rem,1fr)] lg:gap-12">
        <div className="flex max-w-3xl flex-col items-start gap-6 sm:gap-7">
          <p className="text-sm font-medium text-foreground/72">{tennisHero.eyebrow}</p>
          <h1
            id="tennis-hero-titulo"
            className="font-heading text-[clamp(2.35rem,5vw,3.35rem)] leading-[1.08] font-semibold tracking-[-0.02em] text-balance"
          >
            {tennisHero.headline}
          </h1>
          <p className="max-w-2xl text-base leading-relaxed text-foreground/72 text-pretty sm:text-xl sm:leading-8">
            {tennisHero.subheadline}
          </p>
          <p className="text-base font-medium text-foreground sm:text-lg">{tennisHero.support}</p>
          <div className="flex w-full flex-col items-start gap-3">
            <TennisSignupButton location="tennis_hero" className="w-full sm:w-auto" />
            <TennisTrialNote id="tennis-hero-trial" />
          </div>
        </div>
        <div className="hidden min-h-80 lg:block" aria-hidden>
          <TennisCourtLines />
        </div>
      </div>
    </SectionShell>
  );
}
