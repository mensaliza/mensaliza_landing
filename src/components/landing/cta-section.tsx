import { Suspense } from "react";

import { DemoRequestForm } from "@/components/landing/demo-request-form";
import { getAppLinkProps } from "@/lib/site-urls";

function DemoFormFallback() {
  return (
    <div
      className="h-[28rem] animate-pulse rounded-xl border border-border bg-card"
      aria-hidden
    />
  );
}

export function CtaSection() {
  const appLink = getAppLinkProps();

  return (
    <section
      id="agendar-demo"
      className="scroll-mt-24 bg-primary px-4 py-20 text-primary-foreground sm:px-6 sm:py-24 lg:px-8 lg:py-28"
    >
      <div className="mx-auto flex w-full max-w-xl flex-col gap-8">
        <div className="flex flex-col gap-4 text-center">
          <h2 className="text-[clamp(1.875rem,3vw,2.75rem)] leading-[1.15] font-semibold tracking-[-0.02em] text-balance">
            Agende sua demonstração
          </h2>
          <p className="mx-auto max-w-lg text-base leading-relaxed text-primary-foreground/85 text-pretty sm:text-lg">
            Conte um pouco sobre sua base. Respondemos para marcar um horário —
            sem compromisso e sem cartão.
          </p>
        </div>

        <Suspense fallback={<DemoFormFallback />}>
          <DemoRequestForm />
        </Suspense>

        {appLink ? (
          <p className="text-center text-sm text-primary-foreground/75">
            Já tem conta?{" "}
            <a
              {...appLink}
              className="font-medium text-primary-foreground underline underline-offset-4 hover:text-primary-foreground/90"
            >
              Entrar
            </a>
          </p>
        ) : null}
      </div>
    </section>
  );
}
