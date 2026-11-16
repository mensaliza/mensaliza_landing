import { SectionViewTracker } from "@/components/landing/section-view-tracker";
import { TennisSignupButton } from "@/components/landing/tennis/tennis-signup-button";
import { TennisSupportLink } from "@/components/landing/tennis/tennis-support-link";
import { TennisTrialNote } from "@/components/landing/tennis/tennis-trial-note";
import { TENNIS_LANDING_AUDIENCE } from "@/lib/landing-analytics";
import { tennisFinalCta } from "@/lib/tennis-landing-content";

/** Same orange closing band as the home's "Agende sua demonstração". */
export function TennisFinalCta() {
  return (
    <section
      id="comecar"
      aria-labelledby="tennis-cta-titulo"
      className="relative scroll-mt-24 bg-primary px-4 py-20 text-primary-foreground sm:px-6 sm:py-24 lg:px-8 lg:py-28"
    >
      <SectionViewTracker section="tennis_cta" audience={TENNIS_LANDING_AUDIENCE} />
      <div className="mx-auto flex w-full max-w-2xl flex-col items-center gap-8 text-center">
        <h2
          id="tennis-cta-titulo"
          className="text-[clamp(1.875rem,3vw,2.75rem)] leading-[1.15] font-semibold tracking-[-0.02em] text-balance"
        >
          {tennisFinalCta.title}
        </h2>
        <div id="tennis-final-cta" className="flex w-full flex-col items-center gap-4">
          <div className="flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row">
            <TennisSignupButton
              location="tennis_final"
              variant="outline"
              className="w-full border-transparent bg-background text-foreground hover:bg-background/90 sm:w-auto"
            />
            <TennisSupportLink className="w-full border-primary-foreground/50 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground sm:w-auto" />
          </div>
          <TennisTrialNote variant="summary" className="text-center text-primary-foreground" />
        </div>
      </div>
    </section>
  );
}
