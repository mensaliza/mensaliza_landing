"use client";

import { Button } from "@/components/ui/button";
import {
  trackLandingCta,
  type LandingCtaLocation,
} from "@/lib/landing-analytics";
import { getLoginLinkProps } from "@/lib/site-urls";
import { cn } from "@/lib/utils";

type LoginLinkProps = {
  className?: string;
  size?: "default" | "sm" | "lg";
  variant?: "default" | "outline" | "secondary" | "ghost";
  fullWidth?: boolean;
  location: LandingCtaLocation;
};

export function LoginLink({
  className,
  size = "sm",
  variant = "ghost",
  fullWidth = false,
  location,
}: LoginLinkProps) {
  const loginLink = getLoginLinkProps();

  return (
    <Button
      variant={variant}
      size={size}
      className={cn("min-h-11", fullWidth && "w-full", className)}
      nativeButton={false}
      render={
        <a
          {...loginLink}
          onClick={() =>
            trackLandingCta({
              cta: "login",
              location,
            })
          }
        />
      }
    >
      Entrar
    </Button>
  );
}
