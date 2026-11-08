"use client";

import { Button } from "@/components/ui/button";
import { TENNIS_LANDING_AUDIENCE, trackLandingCta } from "@/lib/landing-analytics";
import { SUPPORT_WHATSAPP_DISPLAY, SUPPORT_WHATSAPP_URL } from "@/lib/site-urls";
import { tennisFinalCta } from "@/lib/tennis-landing-content";
import { cn } from "cn";

type TennisSupportLinkProps = {
  className?: string;
};

export function TennisSupportLink({ className }: TennisSupportLinkProps) {
  return (
    <Button
      variant="outline"
      size="lg"
      className={cn("min-h-11", className)}
      nativeButton={false}
      render={
        <a
          href={SUPPORT_WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${tennisFinalCta.supportLabel}: ${SUPPORT_WHATSAPP_DISPLAY}`}
          onClick={() =>
            trackLandingCta({
              cta: "whatsapp",
              location: "tennis_final",
              audience: TENNIS_LANDING_AUDIENCE,
            })
          }
        />
      }
    >
      {tennisFinalCta.supportLabel}
    </Button>
  );
}
