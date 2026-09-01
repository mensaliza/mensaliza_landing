"use client";

import { useState } from "react";
import { InfoIcon } from "lucide-react";

import { Reveal } from "@/components/landing/motion/reveal";
import { SectionHeading } from "@/components/landing/section-heading";
import { SectionShell } from "@/components/landing/section-shell";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { clientSteps, professionalSteps } from "@/lib/landing-content";
import { trackLandingHowItWorksTabChanged } from "@/lib/landing-analytics";
import { cn } from "@/lib/utils";

type WorkflowTab = "professional" | "client";

type Step = {
  step: string;
  title: string;
  description: string;
};

function StepCardGrid({
  steps,
  columns,
}: {
  steps: readonly Step[];
  columns: "professional" | "client";
}) {
  return (
    <ol
      className={cn(
        "grid gap-4 sm:gap-5",
        columns === "professional" && "sm:grid-cols-2",
        columns === "client" &&
          "sm:grid-cols-2 lg:grid-cols-6 lg:[&>li]:col-span-2 lg:[&>li:nth-child(4)]:col-start-2"
      )}
    >
      {steps.map((item, index) => (
        <li
          key={item.title}
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
              {item.step}
            </span>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-semibold tracking-[-0.01em] text-balance">
              {item.title}
            </h3>
            <p className="max-w-[42ch] text-sm leading-relaxed text-muted-foreground text-pretty sm:text-[0.9375rem]">
              {item.description}
            </p>
          </div>
        </li>
      ))}
    </ol>
  );
}

export function HowItWorksSection() {
  const [activeTab, setActiveTab] = useState<WorkflowTab>("professional");

  return (
    <SectionShell id="como-funciona" labelledBy="como-funciona-titulo" analyticsSection="como_funciona">
      <div className="flex flex-col gap-12">
        <Reveal>
          <SectionHeading
            align="center"
            titleId="como-funciona-titulo"
            title="Do cadastro ao comprovante aprovado em poucos passos"
            description="Simples para você. Simples para o seu cliente."
            className="mx-auto"
          />
        </Reveal>

        <Reveal delay={80}>
          <Tabs
            value={activeTab}
            onValueChange={(value) => {
              const tab = value as WorkflowTab;
              setActiveTab(tab);
              trackLandingHowItWorksTabChanged(tab);
            }}
            className="flex flex-col gap-8 sm:gap-10"
          >
            <TabsList className="mx-auto grid h-auto! w-full min-h-11 max-w-md grid-cols-2 rounded-full bg-muted p-1">
              <TabsTrigger
                value="professional"
                className="min-h-11 rounded-full px-4 py-2.5 text-sm font-medium transition-[color,background-color] duration-200 ease-[cubic-bezier(0.25,1,0.5,1)]"
              >
                Para o profissional
              </TabsTrigger>
              <TabsTrigger
                value="client"
                className="min-h-11 rounded-full px-4 py-2.5 text-sm font-medium transition-[color,background-color] duration-200 ease-[cubic-bezier(0.25,1,0.5,1)]"
              >
                Para o cliente
              </TabsTrigger>
            </TabsList>

            <TabsContent
              value="professional"
              className="how-it-works-panel mt-0 outline-none"
            >
              <StepCardGrid
                key="professional"
                steps={professionalSteps}
                columns="professional"
              />
            </TabsContent>
            <TabsContent
              value="client"
              className="how-it-works-panel mt-0 outline-none"
            >
              <StepCardGrid
                key="client"
                steps={clientSteps}
                columns="client"
              />
            </TabsContent>
          </Tabs>
        </Reveal>

        <Reveal delay={140}>
          <Alert className="mx-auto max-w-3xl border-border bg-muted/50">
            <InfoIcon className="size-4 text-foreground" />
            <AlertTitle className="font-semibold text-foreground">
              O Mensaliza não processa pagamentos
            </AlertTitle>
            <AlertDescription className="text-foreground/80">
              Seu cliente paga do jeito que vocês combinarem, direto para você. A plataforma
              organiza a cobrança e centraliza os comprovantes — não retém valores.
            </AlertDescription>
          </Alert>
        </Reveal>
      </div>
    </SectionShell>
  );
}
