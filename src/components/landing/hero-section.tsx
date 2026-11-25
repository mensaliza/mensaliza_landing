import { HowItWorksLink } from "@/components/landing/how-it-works-link";
import { SectionViewTracker } from "@/components/landing/section-view-tracker";
import { SignupButton } from "@/components/landing/signup-button";
import { HeroShowcase } from "@/components/landing/whatsapp-demo/hero-showcase";
import { TRIAL_TERMS } from "@/lib/landing-content";

export function HeroSection() {
  return (
    <section
      id="hero"
      aria-labelledby="hero-titulo"
      className="relative overflow-hidden px-4 pt-24 pb-16 sm:px-6 sm:pt-32 sm:pb-20 lg:px-8"
    >
      <SectionViewTracker section="hero" />

      <div aria-hidden className="hero-plains">
        <div className="hero-plain" />
        <div className="hero-plain hero-plain--2" />
        <div className="hero-plain hero-plain--3" />
      </div>

      <div className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-2 lg:gap-16 xl:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
        <div className="flex min-w-0 flex-col gap-6">
          <h1
            id="hero-titulo"
            className="hero-rise hero-step-1 max-w-[16ch] text-[clamp(2.25rem,6vw,3.75rem)] leading-[1.04] font-semibold tracking-[-0.035em] text-balance"
          >
            Seus assinantes pagam em dia. Sem você mandar mensagem.
          </h1>

          <p className="hero-rise hero-step-2 max-w-[34rem] text-lg leading-relaxed text-foreground/75 text-pretty sm:text-xl sm:leading-8">
            No dia combinado, o Mensaliza manda a cobrança no WhatsApp de cada assinante. Ele paga
            no Pix, direto na sua conta, e manda o comprovante na mesma conversa.
          </p>

          <div className="flex flex-col gap-3">
            <div className="hero-rise hero-step-3 flex flex-col gap-3 sm:flex-row sm:items-center">
              <SignupButton className="w-full sm:w-auto" location="hero" />
              <HowItWorksLink />
            </div>
            <p className="hero-rise hero-step-4 text-sm text-foreground/70">{TRIAL_TERMS}</p>
          </div>
        </div>

        <HeroShowcase className="mx-auto w-full max-w-68 sm:max-w-70 lg:mr-0 lg:justify-self-end" />
      </div>
    </section>
  );
}
