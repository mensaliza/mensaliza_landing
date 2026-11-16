import { InfoIcon } from "lucide-react";

import { Reveal } from "@/components/landing/motion/reveal";
import { SectionHeading } from "@/components/landing/section-heading";
import { SectionShell } from "@/components/landing/section-shell";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { TENNIS_LANDING_AUDIENCE } from "@/lib/landing-analytics";
import { tennisHowItWorks } from "@/lib/tennis-landing-content";
import { cn } from "cn";

export function TennisHowItWorks() {
  return (
    <SectionShell
      id="como-funciona"
      labelledBy="tennis-como-funciona-titulo"
      analyticsSection="tennis_como_funciona"
      analyticsAudience={TENNIS_LANDING_AUDIENCE}
    >
      <div className="flex flex-col gap-12">
        <Reveal>
          <SectionHeading
            align="center"
            titleId="tennis-como-funciona-titulo"
            title={tennisHowItWorks.title}
            description={tennisHowItWorks.lead}
            className="mx-auto"
          />
        </Reveal>

        <Reveal delay={80}>
          <ol className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
            {tennisHowItWorks.steps.map((step, index) => (
              <li
                key={step.title}
                className="how-it-works-step landing-card-lift group flex flex-col gap-4 rounded-xl border border-border bg-card p-6 sm:p-7"
              >
                <div className="flex items-center justify-between gap-3">
                  <span
                    className={cn(
                      "flex size-9 items-center justify-center rounded-lg bg-primary/10 font-mono text-sm font-bold text-primary",
                      "transition-[transform,background-color] duration-200 ease-[cubic-bezier(0.25,1,0.5,1)]",
                      "group-hover:scale-105 group-hover:bg-primary/15"
                    )}
                    aria-hidden
                  >
                    {index + 1}
                  </span>
                  <span className="font-mono text-[11px] font-medium text-muted-foreground">
                    Passo {index + 1}
                  </span>
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-lg font-semibold tracking-[-0.01em] text-balance">
                    {step.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground text-pretty sm:text-[0.9375rem]">
                    {step.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </Reveal>

        <Reveal delay={140}>
          <Alert className="mx-auto max-w-3xl border-border bg-muted/50">
            <InfoIcon className="size-4 text-foreground" />
            <AlertTitle className="font-semibold text-foreground">
              O Mensaliza não processa pagamentos
            </AlertTitle>
            <AlertDescription className="text-foreground/80">
              O aluno paga o Pix direto na sua chave. O Mensaliza envia a cobrança e guarda o
              comprovante, sem ficar com nenhum valor.
            </AlertDescription>
          </Alert>
        </Reveal>
      </div>
    </SectionShell>
  );
}
