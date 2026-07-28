import { DemoButton } from "@/components/landing/demo-button";
import { LoginLink } from "@/components/landing/login-link";

export function CtaSection() {
  return (
    <section
      id="agendar-demo"
      className="scroll-mt-24 bg-primary px-4 py-20 text-primary-foreground sm:px-6 sm:py-24 lg:px-8 lg:py-28"
    >
      <div className="mx-auto flex w-full max-w-3xl flex-col items-center gap-8 text-center">
        <div className="flex flex-col gap-4">
          <h2 className="text-[clamp(1.875rem,3vw,2.75rem)] leading-[1.15] font-semibold tracking-[-0.02em] text-balance">
            Pronto para parar de cobrar na mão?
          </h2>
          <p className="mx-auto max-w-xl text-base leading-relaxed text-primary-foreground/85 text-pretty sm:text-lg">
            Veja em poucos minutos como automatizar cobranças e aprovar comprovantes — sem
            intermediar pagamentos.
          </p>
        </div>

        <div className="flex w-full flex-col items-center gap-4 sm:w-auto">
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <DemoButton className="w-full bg-primary-foreground text-primary hover:bg-primary-foreground/90 sm:w-auto" />
            <LoginLink
              variant="outline"
              size="lg"
              className="w-full border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 sm:w-auto"
            />
          </div>
          <p className="text-sm text-primary-foreground/75">
            Demonstração gratuita · Sem compromisso · Setup em minutos
          </p>
        </div>
      </div>
    </section>
  );
}
