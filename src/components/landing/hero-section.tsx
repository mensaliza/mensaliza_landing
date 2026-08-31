"use client";

import type { CSSProperties } from "react";

import { HeroAtmosphere } from "@/components/landing/hero-atmosphere";
import { HeroMockupShowcase } from "@/components/landing/hero-mockup-showcase";
import { SignupButton } from "@/components/landing/signup-button";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative -mt-16 overflow-hidden px-4 pt-28 pb-10 sm:px-6 sm:pt-32 sm:pb-12 lg:px-8 lg:pb-14 min-w-0 min-h-0"
    >
      <HeroAtmosphere />

      <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center gap-11 text-center lg:max-w-5xl lg:gap-14">
        <div className="flex flex-col items-center gap-6 sm:gap-7 lg:gap-8">
          <h1 className="max-w-[20ch] font-heading text-[clamp(2.45rem,5.6vw,4rem)] leading-[1.05] font-semibold tracking-[-0.03em] text-balance sm:max-w-4xl">
            <span
              className="hero-line"
              style={{ "--hero-i": 0 } as CSSProperties}
            >
              Deixe de ser cobrador dos seus próprios clientes
            </span>
          </h1>

          <p
            className="hero-enter max-w-2xl text-base leading-relaxed text-foreground/72 text-pretty sm:text-xl sm:leading-8"
            style={{ "--hero-i": 2 } as CSSProperties}
          >
            O Mensaliza tira da sua rotina a planilha, as mensagens constrangedoras e a
            incerteza de quem pagou. Lembrete automático no WhatsApp, comprovantes organizados e
            controle claro do mês.
          </p>

          <div
            className="hero-enter pointer-events-auto flex w-full flex-col items-center gap-4"
            style={{ "--hero-i": 3 } as CSSProperties}
          >
            <div className="flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row">
              <SignupButton className="w-full sm:w-auto" />
              <Button
                variant="outline"
                size="lg"
                className="w-full bg-background font-medium sm:w-auto"
                nativeButton={false}
                render={<a href="/#como-funciona" />}
              >
                Ver como funciona
              </Button>
            </div>
          </div>
        </div>

        <HeroMockupShowcase />
      </div>
    </section>
  );
}
