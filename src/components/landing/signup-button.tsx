"use client";

import { ArrowRightIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  trackLandingCta,
  type BillingInterval,
  type LandingCtaLocation,
} from "@/lib/landing-analytics";
import { getSignupLinkProps } from "@/lib/site-urls";
import { cn } from "@/lib/utils";

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

export function SignupButton({
  className,
  size = "lg",
  variant = "default",
  showIcon = true,
  label = "Começar agora",
  location,
  plan,
  billingInterval,
}: SignupButtonProps) {
  const signupLink = getSignupLinkProps({
    plan,
    interval: billingInterval,
  });

  return (
    <Button
      variant={variant}
      size={size}
      className={cn("demo-cta-motion", className)}
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
