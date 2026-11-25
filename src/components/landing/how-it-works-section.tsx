import { BentoCard } from "@/components/landing/bento/bento-card";
import { SetupSteps, type SetupExample, type SetupStep } from "@/components/landing/bento/setup-steps";
import { StudentScene } from "@/components/landing/bento/student-scene";
import type { Conversation } from "@/components/landing/whatsapp-demo/whatsapp-messages";
import { SectionShell } from "@/components/landing/section-shell";
import { SignupButton } from "@/components/landing/signup-button";
import { TRIAL_TERMS } from "@/lib/landing-content";

/** Copy for a campaign page; the home uses the defaults. */
export type HowItWorksContent = {
  title: string;
  description: string;
  steps: readonly [SetupStep, SetupStep, SetupStep];
  example: SetupExample;
  studentTitle: string;
  studentDescription: string;
  studentSteps: readonly string[];
  conversation: Conversation;
};

export function HowItWorksSection({ content }: { content?: HowItWorksContent }) {
  return (
    <SectionShell id="como-funciona" labelledBy="como-funciona-titulo" tinted analyticsSection="como_funciona">
      <div className="flex max-w-3xl flex-col gap-3">
        <h2
          id="como-funciona-titulo"
          className="text-[clamp(1.75rem,3.2vw,2.5rem)] leading-[1.12] font-semibold tracking-[-0.025em] text-balance"
        >
          {content?.title ?? "Pronto em três passos"}
        </h2>
        <p className="text-lg leading-relaxed text-foreground/75 text-pretty">
          {content?.description ?? "Depois disso, as cobranças saem sozinhas todo mês."}
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <SetupSteps steps={content?.steps} example={content?.example} />

        <BentoCard
          title={content?.studentTitle ?? "E para o seu assinante?"}
          description={
            content?.studentDescription ??
            "Tudo acontece no WhatsApp dele: recebe a cobrança, paga no Pix, manda o comprovante e recebe a confirmação. Sem app, sem cadastro e sem custo para ele."
          }
          className="bento-stage--on-tint"
          stageClassName="min-h-[31rem] flex-1 sm:min-h-[26.5rem]"
        >
          <StudentScene conversation={content?.conversation} steps={content?.studentSteps} />
        </BentoCard>
      </div>

      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
        <SignupButton className="w-full sm:w-auto" location="how_it_works" />
        <p className="text-sm text-foreground/70">{TRIAL_TERMS}</p>
      </div>
    </SectionShell>
  );
}
