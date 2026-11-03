"use client";

import Link from "next/link";

import { Logo } from "@/components/logo";
import { trackLandingCta } from "@/lib/landing-analytics";
import {
  SUPPORT_EMAIL,
  SUPPORT_WHATSAPP_DISPLAY,
  SUPPORT_WHATSAPP_URL,
  getLoginLinkProps,
} from "@/lib/site-urls";

const footerLinkClassName =
  "inline-flex min-h-11 items-center text-sm text-muted-foreground transition-colors duration-150 hover:text-foreground focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50";

const supportLinkClassName =
  "inline-flex min-h-11 items-center text-sm font-medium text-foreground underline-offset-4 transition-colors duration-150 hover:underline focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50";

export function TennisSiteFooter() {
  const loginLink = getLoginLinkProps();

  return (
    <footer className="border-t border-border bg-background px-4 py-16 text-foreground sm:px-6 sm:py-20 lg:px-8">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 sm:gap-14">
        <div className="grid gap-10 sm:gap-12 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1.15fr]">
          <div className="flex flex-col gap-4">
            <Link
              href="/"
              className="w-fit rounded-sm text-foreground focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
              aria-label="Mensaliza — início"
            >
              <Logo size="md" />
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-muted-foreground text-pretty">
              Cobrança pelo WhatsApp do Mensaliza e comprovantes no painel. O Pix vai direto para o professor.
            </p>
          </div>

          <div className="flex flex-col items-start gap-3">
            <p className="font-heading text-sm font-semibold tracking-[-0.01em] text-foreground">
              Plataforma
            </p>
            <a
              {...loginLink}
              className={footerLinkClassName}
              onClick={() =>
                trackLandingCta({
                  cta: "login",
                  location: "footer",
                })
              }
            >
              Entrar
            </a>
          </div>

          <div className="flex flex-col gap-3">
            <p className="font-heading text-sm font-semibold tracking-[-0.01em] text-foreground">
              Suporte ao cliente
            </p>
            <p className="max-w-xs text-sm leading-relaxed text-muted-foreground text-pretty">
              Dúvidas de conta, uso da plataforma ou cancelamento.
            </p>
            <a
              href={`mailto:${SUPPORT_EMAIL}`}
              aria-label={`Enviar e-mail para o suporte: ${SUPPORT_EMAIL}`}
              className={supportLinkClassName}
            >
              {SUPPORT_EMAIL}
            </a>
            <a
              href={SUPPORT_WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Falar com o suporte no WhatsApp: ${SUPPORT_WHATSAPP_DISPLAY}`}
              className={supportLinkClassName}
            >
              WhatsApp {SUPPORT_WHATSAPP_DISPLAY}
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-border pt-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:gap-6">
          <p>© 2026 Mensaliza. Todos os direitos reservados.</p>
          <div className="flex flex-wrap gap-x-6">
            <Link href="/termos-de-uso" className={footerLinkClassName}>
              Termos de uso
            </Link>
            <Link href="/politicas-de-privacidade" className={footerLinkClassName}>
              Política de privacidade
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
