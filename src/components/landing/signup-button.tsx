"use client";

import { ArrowRightIcon } from "lucide-react";
import type { MouseEvent } from "react";

import { Button } from "@/components/ui/button";
import { withAttribution } from "@/lib/attribution";
import { SIGNUP_CTA_LABEL } from "@/lib/landing-content";
import {
  trackLandingCta,
  type BillingInterval,
  type LandingCtaLocation,
} from "@/lib/landing-analytics";
import { getSignupLinkProps } from "@/lib/site-urls";
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
};

/** Every "start" button on the site: same tab, carrying the visit's UTMs to the app. */
export function SignupButton({
  className,
  size = "lg",
  variant = "default",
  showIcon = true,
  label = SIGNUP_CTA_LABEL,
  location,
  plan,
  billingInterval,
}: SignupButtonProps) {
  const signupLink = getSignupLinkProps({
    plan,
    interval: billingInterval,
  });

  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    event.currentTarget.href = withAttribution(signupLink.href);
    trackLandingCta({
      cta: "signup",
      location,
      plan,
      billing_interval: billingInterval,
    });
  }

  return (
    <Button
      variant={variant}
      size={size}
      className={cn("min-h-11", className)}
      nativeButton={false}
      render={<a href={signupLink.href} onClick={handleClick} />}
    >
      {label}
      {showIcon ? <ArrowRightIcon data-icon="inline-end" /> : null}
    </Button>
  );
}
