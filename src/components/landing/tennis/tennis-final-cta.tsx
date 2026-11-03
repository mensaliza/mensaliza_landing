import { SectionHeading } from "@/components/landing/section-heading";
import { SectionShell } from "@/components/landing/section-shell";
import { TennisSignupButton } from "@/components/landing/tennis/tennis-signup-button";
import { TennisTrialNote } from "@/components/landing/tennis/tennis-trial-note";
import { TENNIS_LANDING_AUDIENCE } from "@/lib/landing-analytics";
import { tennisFinalCta } from "@/lib/tennis-landing-content";

export function TennisFinalCta() {
  return (
    <SectionShell
      id="tennis_cta"
      labelledBy="tennis-cta-titulo"
      tinted
      analyticsSection="tennis_cta"
      analyticsAudience={TENNIS_LANDING_AUDIENCE}
    >
      <div className="mx-auto flex w-full max-w-2xl flex-col items-center gap-6 text-center">
        <SectionHeading
          align="center"
          titleId="tennis-cta-titulo"
          title={tennisFinalCta.title}
          description={tennisFinalCta.body}
        />
        <div className="flex w-full flex-col items-center gap-3">
          <TennisSignupButton location="tennis_final" className="w-full sm:w-auto" />
          <TennisTrialNote id="tennis-final-trial" className="text-center" />
        </div>
      </div>
    </SectionShell>
  );
}
