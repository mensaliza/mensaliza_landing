import { SectionShell } from "@/components/landing/section-shell";
import { TennisHeroScene } from "@/components/landing/tennis/tennis-hero-scene";
import { TennisSignupButton } from "@/components/landing/tennis/tennis-signup-button";
import { TennisTrialNote } from "@/components/landing/tennis/tennis-trial-note";
import { TENNIS_LANDING_AUDIENCE } from "@/lib/landing-analytics";
import { tennisHero } from "@/lib/tennis-landing-content";

function TennisCourtBackdrop() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute -inset-3 -z-10 overflow-hidden rounded-[2rem] bg-[#f3e4d4] sm:-inset-5"
    >
      <svg className="size-full" viewBox="0 0 320 560" preserveAspectRatio="xMidYMid slice">
        <line x1="28" y1="36" x2="28" y2="524" stroke="white" strokeOpacity="0.7" strokeWidth="3" />
        <line x1="292" y1="36" x2="292" y2="524" stroke="white" strokeOpacity="0.7" strokeWidth="3" />
        <line x1="28" y1="280" x2="292" y2="280" stroke="white" strokeOpacity="0.7" strokeWidth="3" />
        <line x1="160" y1="36" x2="160" y2="280" stroke="white" strokeOpacity="0.45" strokeWidth="2" />
        <line x1="160" y1="280" x2="160" y2="524" stroke="white" strokeOpacity="0.45" strokeWidth="2" />
      </svg>
    </div>
  );
}

export function TennisHero() {
  return (
    <SectionShell
      id="tennis_hero"
      labelledBy="tennis-hero-titulo"
      analyticsSection="tennis_hero"
      analyticsAudience={TENNIS_LANDING_AUDIENCE}
      className="overflow-hidden py-10 sm:py-16 lg:py-20"
    >
      <div className="relative z-10 grid w-full items-center gap-10 lg:grid-cols-[minmax(0,32rem)_minmax(24rem,28rem)] lg:justify-between lg:gap-x-12">
        <div className="flex max-w-3xl flex-col gap-4 sm:gap-6 lg:col-start-1">
          <p className="text-sm font-medium text-foreground/72">{tennisHero.eyebrow}</p>
          <h1
            id="tennis-hero-titulo"
            className="font-heading text-[clamp(2.35rem,5vw,3.75rem)] leading-[1.05] font-semibold tracking-[-0.02em] text-balance"
          >
            {tennisHero.headline}
          </h1>
          <p className="max-w-2xl text-base leading-relaxed text-foreground/72 text-pretty sm:text-xl sm:leading-8">
            {tennisHero.subheadline}
          </p>
          <p className="text-base font-medium text-foreground sm:text-lg">{tennisHero.support}</p>
          <div id="tennis-hero-cta" className="flex w-full flex-col items-start gap-3">
            <TennisSignupButton location="tennis_hero" className="w-full sm:w-auto" />
            <TennisTrialNote variant="summary" />
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[28rem] lg:col-start-2 lg:row-start-1 lg:mx-0 lg:max-w-none lg:justify-self-end">
          <TennisCourtBackdrop />
          <TennisHeroScene className="relative max-w-none" />
        </div>
      </div>
    </SectionShell>
  );
}
