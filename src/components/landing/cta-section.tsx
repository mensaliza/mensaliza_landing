"use client";

import { Suspense } from "react";

import { DemoRequestForm } from "@/components/landing/demo-request-form";
import { SectionViewTracker } from "@/components/landing/section-view-tracker";
import { trackLandingCta } from "@/lib/landing-analytics";
import { getLoginLinkProps } from "@/lib/site-urls";

function DemoFormFallback() {
  return (
    <div
      className="h-[28rem] animate-pulse rounded-xl border border-border bg-card"
      aria-hidden
    />
  );
}

export function CtaSection() {
  const loginLink = getLoginLinkProps();

  return (
    <section
      id="agendar-demo"
      className="relative scroll-mt-24 bg-primary px-4 py-20 text-primary-foreground sm:px-6 sm:py-24 lg:px-8 lg:py-28"
    >
      <SectionViewTracker section="agendar_demo" />
      <div className="mx-auto flex w-full max-w-xl flex-col gap-8">
        <div className="flex flex-col gap-4 text-center">
          <h2 className="text-[clamp(1.875rem,3vw,2.75rem)] leading-[1.15] font-semibold tracking-[-0.02em] text-balance">
            Agende sua demonstração
          </h2>
          <p className="mx-auto max-w-lg text-base leading-relaxed text-pretty sm:text-lg">
            Conte um pouco sobre sua base. Respondemos para marcar um horário —
            sem compromisso e sem cartão.
          </p>
        </div>

        <Suspense fallback={<DemoFormFallback />}>
          <DemoRequestForm />
        </Suspense>

        <p className="text-center text-sm">
          Já tem conta?{" "}
          <a
            {...loginLink}
            className="font-medium underline underline-offset-4 hover:opacity-80"
            onClick={() =>
              trackLandingCta({
                cta: "login",
                location: "cta_section",
              })
            }
          >
            Entrar
          </a>
        </p>
      </div>
    </section>
  );
}
