import { SignupButton } from "@/components/landing/signup-button";
import {
  TENNIS_LANDING_AUDIENCE,
  type LandingCtaLocation,
} from "@/lib/landing-analytics";
import { TENNIS_SIGNUP_CAMPAIGN_REF } from "@/lib/site-urls";
import { tennisCtaLabel, tennisPlan } from "@/lib/tennis-landing-content";

type TennisCtaLocation = Extract<
  LandingCtaLocation,
  | "tennis_hero"
  | "tennis_header"
  | "tennis_final"
  | "tennis_mobile"
  | "tennis_pricing"
>;

type TennisSignupButtonProps = {
  location: TennisCtaLocation;
  className?: string;
  size?: "default" | "sm" | "lg";
  showIcon?: boolean;
};

export function TennisSignupButton({
  location,
  className,
  size = "lg",
  showIcon = true,
}: TennisSignupButtonProps) {
  return (
    <SignupButton
      label={tennisCtaLabel}
      location={location}
      plan={tennisPlan.slug}
      billingInterval={tennisPlan.interval}
      audience={TENNIS_LANDING_AUDIENCE}
      campaignRef={TENNIS_SIGNUP_CAMPAIGN_REF}
      className={className}
      size={size}
      showIcon={showIcon}
    />
  );
}
