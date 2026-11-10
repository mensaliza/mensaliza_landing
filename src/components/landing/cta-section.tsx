"use client";

import { SectionViewTracker } from "@/components/landing/section-view-tracker";
import { SignupButton } from "@/components/landing/signup-button";
import { trackWhatsAppClick } from "@/components/landing/whatsapp-floating-button";
import { TRIAL_DAYS, TRIAL_TERMS } from "@/lib/landing-content";
import { getWhatsAppHref } from "@/lib/site-urls";

/** Last call: the same sign-up as the hero, with WhatsApp for whoever still has a question. */
export function CtaSection() {
  return (
    <section
      id="comecar"
      aria-labelledby="comecar-titulo"
      className="relative scroll-mt-24 bg-foreground px-4 py-20 text-background sm:px-6 sm:py-24 lg:px-8"
    >
      <SectionViewTracker section="cta_final" />
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
        <h2
          id="comecar-titulo"
          className="max-w-[18ch] text-[clamp(2rem,4.5vw,3rem)] leading-[1.06] font-semibold tracking-[-0.03em] text-balance"
        >
          Teste {TRIAL_DAYS} dias e veja a primeira cobrança sair sozinha
        </h2>
        <p className="max-w-xl text-lg leading-relaxed text-background/80 text-pretty">
          Cadastre um assinante, ligue o WhatsApp dele e acompanhe o pagamento chegar no painel.
        </p>
        <div className="flex flex-col gap-3">
          <SignupButton
            className="w-full sm:w-auto sm:self-start"
            location="cta_section"
          />
          <p className="text-sm text-background/75">{TRIAL_TERMS}</p>
        </div>
        <p className="text-background/80">
          Prefere conversar antes?{" "}
          <a
            href={getWhatsAppHref()}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackWhatsAppClick("cta_section")}
            className="font-medium text-background underline underline-offset-4 focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-background/50"
          >
            Chame a gente no WhatsApp
          </a>
          .
        </p>
      </div>
    </section>
  );
}
