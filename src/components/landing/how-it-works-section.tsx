import { BentoCard } from "@/components/landing/bento/bento-card";
import { SetupSteps } from "@/components/landing/bento/setup-steps";
import { StudentScene } from "@/components/landing/bento/student-scene";
import { SectionShell } from "@/components/landing/section-shell";
import { SignupButton } from "@/components/landing/signup-button";
import { TRIAL_TERMS } from "@/lib/landing-content";

export function HowItWorksSection() {
  return (
    <SectionShell id="como-funciona" labelledBy="como-funciona-titulo" tinted analyticsSection="como_funciona">
      <div className="flex max-w-3xl flex-col gap-3">
        <h2
          id="como-funciona-titulo"
          className="text-[clamp(1.75rem,3.2vw,2.5rem)] leading-[1.12] font-semibold tracking-[-0.025em] text-balance"
        >
          Pronto em três passos
        </h2>
        <p className="text-lg leading-relaxed text-foreground/75 text-pretty">
          Depois disso, as cobranças saem sozinhas todo mês.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <SetupSteps />

        <BentoCard
          title="E para o seu assinante?"
          description="Tudo acontece no WhatsApp dele: recebe a cobrança, paga no Pix, manda o comprovante e recebe a confirmação. Sem app, sem cadastro e sem custo para ele."
          className="bento-stage--on-tint"
          stageClassName="min-h-[31rem] flex-1 sm:min-h-[26.5rem]"
        >
          <StudentScene />
        </BentoCard>
      </div>

      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
        <SignupButton className="w-full sm:w-auto" location="how_it_works" />
        <p className="text-sm text-foreground/70">{TRIAL_TERMS}</p>
      </div>
    </SectionShell>
  );
}
