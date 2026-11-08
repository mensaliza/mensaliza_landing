import { SectionShell } from "@/components/landing/section-shell";
import { TennisHeroScene } from "@/components/landing/tennis/tennis-hero-scene";
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
      className="overflow-hidden py-10 sm:py-16 lg:py-20"
    >
      <div className="relative z-10 grid w-full items-center gap-8 lg:grid-cols-[minmax(0,36rem)_22rem] lg:justify-between lg:gap-x-16">
        <div className="flex max-w-3xl flex-col gap-4 sm:gap-6 lg:col-start-1">
          <p className="text-sm font-medium text-foreground/72">{tennisHero.eyebrow}</p>
          <h1
            id="tennis-hero-titulo"
            className="font-heading text-[clamp(2.15rem,5vw,3.35rem)] leading-[1.08] font-semibold tracking-[-0.02em] text-balance"
          >
            {tennisHero.headline}
          </h1>
          <p className="max-w-2xl text-base leading-relaxed text-foreground/72 text-pretty sm:text-xl sm:leading-8">
            {tennisHero.subheadline}
          </p>
          <p className="text-base font-medium text-foreground sm:text-lg">{tennisHero.support}</p>
          <div id="tennis-hero-cta" className="flex w-full flex-col items-start gap-4">
            <TennisSignupButton location="tennis_hero" className="w-full sm:w-auto" />
            <TennisTrialNote />
          </div>
        </div>

        <TennisHeroScene className="mx-auto justify-self-center lg:col-start-2 lg:row-start-1 lg:mx-0 lg:justify-self-end" />
      </div>
    </SectionShell>
  );
}
