"use client";

import { ArrowRightIcon } from "lucide-react";
import type { MouseEvent, SyntheticEvent } from "react";

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

  /**
   * The UTMs live in the browser, so they go onto the href as late as possible: on pointer down
   * (covers left, middle and right click, so "open in new tab" and "copy link" keep them too),
   * on focus (keyboard), and again on click as a last resort.
   */
  function attachAttribution(event: SyntheticEvent<HTMLAnchorElement>) {
    event.currentTarget.href = withAttribution(signupLink.href);
  }

  function track() {
    trackLandingCta({
      cta: "signup",
      location,
      plan,
      billing_interval: billingInterval,
    });
  }

  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    attachAttribution(event);
    track();
  }

  function handleAuxClick(event: MouseEvent<HTMLAnchorElement>) {
    if (event.button !== 1) return;
    attachAttribution(event);
    track();
  }

  return (
    <Button
      variant={variant}
      size={size}
      className={cn("min-h-11", className)}
      nativeButton={false}
      render={
        <a
          href={signupLink.href}
          onPointerDown={attachAttribution}
          onFocus={attachAttribution}
          onClick={handleClick}
          onAuxClick={handleAuxClick}
        />
      }
    >
      {label}
      {showIcon ? <ArrowRightIcon data-icon="inline-end" /> : null}
    </Button>
  );
}
