"use client";

import { Button } from "@/components/ui/button";
import { trackLandingCta } from "@/lib/landing-analytics";

export function HowItWorksLink() {
  return (
    <Button
      variant="ghost"
      size="lg"
      className="min-h-11 w-full font-medium sm:w-auto"
      nativeButton={false}
      render={
        <a
          href="#como-funciona"
          onClick={() => trackLandingCta({ cta: "how_it_works", location: "hero" })}
        />
      }
    >
      Ver como funciona
    </Button>
  );
}
