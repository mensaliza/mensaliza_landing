"use client";

import type { CSSProperties } from "react";
import { ArrowLeftIcon } from "lucide-react";

import { HeroAtmosphere } from "@/components/landing/hero-atmosphere";
import { SignupButton } from "@/components/landing/signup-button";
import { Button } from "@/components/ui/button";

export function NotFoundSection() {
  return (
    <section
      aria-labelledby="not-found-heading"
      className="relative flex min-h-svh min-w-0 flex-col items-center justify-center overflow-hidden px-4 pt-28 pb-16 sm:px-6 sm:pt-32 sm:pb-20 lg:px-8"
    >
      <HeroAtmosphere fullViewport />

      <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center text-center lg:max-w-5xl">
        <div className="flex flex-col items-center gap-6 sm:gap-7 lg:gap-8">
          <h1
            id="not-found-heading"
            className="max-w-[16ch] font-heading text-[clamp(2.35rem,5vw,3.35rem)] leading-[1.08] font-semibold tracking-[-0.02em] text-balance sm:max-w-4xl"
          >
            <span
              className="hero-line"
              style={{ "--hero-i": 0 } as CSSProperties}
            >
              Essa página não existe
            </span>
          </h1>

          <p
            className="hero-enter max-w-xl text-base leading-relaxed text-foreground/72 text-pretty sm:text-xl sm:leading-8"
            style={{ "--hero-i": 2 } as CSSProperties}
          >
            O endereço pode estar errado, ou o link saiu do ar. Volte ao início
            — ou crie sua conta e deixe a cobrança no automático.
          </p>

          <div
            className="hero-enter pointer-events-auto flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row"
            style={{ "--hero-i": 3 } as CSSProperties}
          >
            <Button
              variant="outline"
              size="lg"
              className="demo-cta-motion min-h-11 w-full bg-background px-4 font-medium sm:w-auto"
              nativeButton={false}
              render={<a href="/" />}
            >
              <ArrowLeftIcon data-icon="inline-start" />
              Voltar ao início
            </Button>
            <SignupButton className="min-h-11 w-full px-4 sm:w-auto" location="not_found" />
          </div>
        </div>
      </div>
    </section>
  );
}
