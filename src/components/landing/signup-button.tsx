"use client";

import { ArrowRightIcon } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

import { Button } from "@/components/ui/button";
import {
  trackLandingCta,
  type BillingInterval,
  type LandingAudience,
  type LandingCtaLocation,
} from "@/lib/landing-analytics";
import {
  getSignupLinkProps,
  type SignupCampaignRef,
  type SignupSearchParams,
} from "@/lib/site-urls";
import { cn } from "cn";

type SignupButtonProps = {
  className?: string;
  size?: "default" | "sm" | "lg";
  variant?: "default" | "outline" | "secondary" | "ghost";
  showIcon?: boolean;
  label?: string;
  location: LandingCtaLocation;
  plan?: string;
  billingInterval?: BillingInterval;
  /** Omitted on home. Tennis page passes `"professores_tenis"`. */
  audience?: LandingAudience;
  /** Omitted on home. Tennis page passes `"professores-de-tenis"`. */
  campaignRef?: SignupCampaignRef;
};

function SignupButtonLink({
  className,
  size = "lg",
  variant = "default",
  showIcon = true,
  label = "Começar agora",
  location,
  plan,
  billingInterval,
  audience,
  campaignRef,
  searchParams,
}: SignupButtonProps & { searchParams: SignupSearchParams | null }) {
  const signupLink = getSignupLinkProps({
    plan,
    interval: billingInterval,
    searchParams,
    campaignRef,
  });

  return (
    <Button
      variant={variant}
      size={size}
      className={cn("demo-cta-motion min-h-11", className)}
      nativeButton={false}
      render={
        <a
          {...signupLink}
          aria-label={
            signupLink.target === "_blank"
              ? `${label} (abre em nova aba)`
              : label
          }
          onClick={() =>
            trackLandingCta({
              cta: "signup",
              location,
              plan,
              billing_interval: billingInterval,
              ...(audience ? { audience } : {}),
            })
          }
        />
      }
    >
      {label}
      {showIcon ? <ArrowRightIcon data-icon="inline-end" /> : null}
    </Button>
  );
}

function SignupButtonWithSearchParams(props: SignupButtonProps) {
  const searchParams = useSearchParams();
  return <SignupButtonLink {...props} searchParams={searchParams} />;
}

export function SignupButton(props: SignupButtonProps) {
  return (
    <Suspense fallback={<SignupButtonLink {...props} searchParams={null} />}>
      <SignupButtonWithSearchParams {...props} />
    </Suspense>
  );
}
