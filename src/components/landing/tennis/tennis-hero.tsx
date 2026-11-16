"use client";

import type { CSSProperties } from "react";

import { HeroAtmosphere } from "@/components/landing/hero-atmosphere";
import { SectionViewTracker } from "@/components/landing/section-view-tracker";
import { TennisHeroScene } from "@/components/landing/tennis/tennis-hero-scene";
import { TennisSignupButton } from "@/components/landing/tennis/tennis-signup-button";
import { TennisTrialNote } from "@/components/landing/tennis/tennis-trial-note";
import { Button } from "@/components/ui/button";
import { TENNIS_LANDING_AUDIENCE, trackLandingCta } from "@/lib/landing-analytics";
import { tennisHero } from "@/lib/tennis-landing-content";

export function TennisHero() {
  return (
    <section
      id="hero"
      aria-labelledby="tennis-hero-titulo"
      className="relative min-w-0 overflow-hidden px-4 pt-28 pb-10 sm:px-6 sm:pt-32 sm:pb-12 lg:px-8 lg:pb-14"
    >
      <SectionViewTracker section="tennis_hero" audience={TENNIS_LANDING_AUDIENCE} />
      <HeroAtmosphere />

      <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center gap-11 text-center lg:max-w-5xl lg:gap-14">
        <div className="flex flex-col items-center gap-6 sm:gap-7 lg:gap-8">
          <p
            className="hero-enter text-sm font-medium text-foreground/72"
            style={{ "--hero-i": 0 } as CSSProperties}
          >
            {tennisHero.eyebrow}
          </p>
          <h1
            id="tennis-hero-titulo"
            className="max-w-[20ch] font-heading text-[clamp(2.35rem,5vw,3.35rem)] leading-[1.08] font-semibold tracking-[-0.02em] text-balance sm:max-w-4xl"
          >
            <span className="hero-line" style={{ "--hero-i": 1 } as CSSProperties}>
              {tennisHero.headline}
            </span>
          </h1>

          <div
            className="hero-enter flex max-w-2xl flex-col gap-3"
            style={{ "--hero-i": 2 } as CSSProperties}
          >
            <p className="text-base leading-relaxed text-foreground/72 text-pretty sm:text-xl sm:leading-8">
              {tennisHero.subheadline}
            </p>
            <p className="text-base font-medium text-foreground sm:text-lg">
              {tennisHero.support}
            </p>
          </div>

          <div
            id="tennis-hero-cta"
            className="hero-enter flex w-full flex-col items-center gap-3"
            style={{ "--hero-i": 3 } as CSSProperties}
          >
            <div className="flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row">
              <TennisSignupButton location="tennis_hero" className="w-full sm:w-auto" />
              <Button
                variant="outline"
                size="lg"
                className="w-full bg-background font-medium sm:w-auto"
                nativeButton={false}
                render={
                  <a
                    href="#como-funciona"
                    onClick={() =>
                      trackLandingCta({
                        cta: "how_it_works",
                        location: "tennis_hero",
                        audience: TENNIS_LANDING_AUDIENCE,
                      })
                    }
                  />
                }
              >
                Ver como funciona
              </Button>
            </div>
            <TennisTrialNote variant="summary" className="text-center" />
          </div>
        </div>

        <div
          className="hero-enter w-full max-w-[26rem]"
          style={{ "--hero-i": 4 } as CSSProperties}
        >
          <TennisHeroScene className="max-w-none text-left" />
        </div>
      </div>
    </section>
  );
}
