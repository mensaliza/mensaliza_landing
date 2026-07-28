import Link from "next/link";

import { Logo } from "@/components/logo";
import { navLinks } from "@/lib/landing-content";
import { getAppLinkProps, getDemoLinkProps } from "@/lib/site-urls";

const footerLinkClassName =
  "inline-flex min-h-11 items-center text-sm text-muted-foreground transition-colors duration-150 hover:text-foreground focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50";

export function SiteFooter() {
  const appLink = getAppLinkProps();
  const demoLink = getDemoLinkProps();

  return (
    <footer className="border-t border-border bg-background px-4 py-16 text-foreground sm:px-6 sm:py-20 lg:px-8">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 sm:gap-14">
        <div className="grid gap-10 sm:gap-12 md:grid-cols-[1.5fr_1fr_1fr]">
          <div className="flex flex-col gap-4">
            <a href="/" className="w-fit text-foreground" aria-label="Mensaliza — início">
              <Logo size="sm" />
            </a>
            <p className="max-w-xs text-sm leading-relaxed text-muted-foreground text-pretty">
              Cobrança mensal via WhatsApp e comprovantes em um só lugar — sem processar
              pagamentos.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <p className="font-heading text-sm font-semibold tracking-[-0.01em] text-foreground">
              Navegação
            </p>
            <nav aria-label="Links do rodapé" className="flex flex-col">
              {navLinks.map((link) => (
                <a key={link.href} href={link.href} className={footerLinkClassName}>
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          <div className="flex flex-col gap-3">
            <p className="font-heading text-sm font-semibold tracking-[-0.01em] text-foreground">
              Plataforma
            </p>
            <nav aria-label="Links da plataforma" className="flex flex-col">
              {appLink ? (
                <a {...appLink} className={footerLinkClassName}>
                  Entrar
                </a>
              ) : null}
              <a {...demoLink} className={footerLinkClassName}>
                Agendar demonstração
              </a>
            </nav>
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
