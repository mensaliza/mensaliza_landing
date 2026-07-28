"use client";

import { CheckIcon } from "lucide-react";
import { useId, useState } from "react";

import { DemoButton } from "@/components/landing/demo-button";
import { SectionHeading } from "@/components/landing/section-heading";
import { SectionShell } from "@/components/landing/section-shell";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  pricingEnterprise,
  pricingSharedFeatures,
  pricingTiers,
} from "@/lib/landing-content";
import { getDemoLinkProps } from "@/lib/site-urls";
import { cn } from "@/lib/utils";

const DEFAULT_TIER_INDEX = pricingTiers.findIndex((tier) => tier.popular);
const INITIAL_INDEX = DEFAULT_TIER_INDEX >= 0 ? DEFAULT_TIER_INDEX : 0;

function subscriberBubbleLabel(tier: (typeof pricingTiers)[number]) {
  return `${tier.label} assinantes`;
}

export function PricingSection() {
  const enterpriseDemoLink = getDemoLinkProps("200-plus");
  const sliderLabelId = useId();
  const [tierIndex, setTierIndex] = useState(INITIAL_INDEX);
  const selectedTier = pricingTiers[tierIndex] ?? pricingTiers[0];
  const thumbPercent =
    pricingTiers.length > 1 ? (tierIndex / (pricingTiers.length - 1)) * 100 : 0;

  return (
    <SectionShell id="precos" tinted>
      <div className="flex flex-col gap-10">
        <SectionHeading
          align="center"
          title="Planos para cada tamanho de base"
          description="Escolha quantos assinantes você tem. O produto é o mesmo em todos os planos."
          className="mx-auto"
        />

        <div className="rounded-xl border border-border bg-card">
          <div className="grid lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
            <div className="flex flex-col gap-8 p-6 sm:p-8 lg:p-10">
              <div className="flex flex-col gap-5">
                <p
                  id={sliderLabelId}
                  className="text-base font-semibold tracking-[-0.01em] text-foreground"
                >
                  Selecione o número de assinantes
                </p>

                <div className="relative pt-12 pb-1">
                  <div
                    className="pointer-events-none absolute top-0 z-10 -translate-x-1/2 transition-[left] duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none"
                    style={{ left: `${thumbPercent}%` }}
                    aria-hidden
                  >
                    <div className="relative rounded-lg bg-primary px-3 py-1.5 text-center text-xs font-semibold whitespace-nowrap text-primary-foreground">
                      {subscriberBubbleLabel(selectedTier)}
                      <span className="absolute top-full left-1/2 size-0 -translate-x-1/2 border-x-[6px] border-t-[6px] border-x-transparent border-t-primary" />
                    </div>
                  </div>

                  <Slider
                    min={0}
                    max={pricingTiers.length - 1}
                    step={1}
                    value={[tierIndex]}
                    onValueChange={(value) => {
                      const next = Array.isArray(value) ? value[0] : value;
                      if (typeof next === "number") {
                        setTierIndex(next);
                      }
                    }}
                    aria-labelledby={sliderLabelId}
                    aria-valuetext={subscriberBubbleLabel(selectedTier)}
                    className="w-full [&_[data-slot=slider-thumb]]:size-4 [&_[data-slot=slider-thumb]]:border-primary [&_[data-slot=slider-thumb]]:bg-primary [&_[data-slot=slider-track]]:h-1.5"
                  />

                  <div className="mt-3 flex justify-between px-0.5">
                    {pricingTiers.map((tier, index) => (
                      <button
                        key={tier.id}
                        type="button"
                        onClick={() => setTierIndex(index)}
                        className={cn(
                          "min-w-8 rounded-md px-1 py-1 text-center text-sm tabular-nums transition-colors",
                          index === tierIndex
                            ? "font-semibold text-foreground"
                            : "text-foreground/55 hover:text-foreground"
                        )}
                        aria-label={`Selecionar ${tier.label} assinantes`}
                        aria-pressed={index === tierIndex}
                      >
                        {tier.label}
                      </button>
                    ))}
                  </div>
                </div>

                <p className="text-sm leading-relaxed text-foreground/72 text-pretty">
                  Agende uma demonstração para ver o plano no seu fluxo — sem
                  compromisso e sem cartão.
                </p>
              </div>

              <div className="flex flex-col gap-5">
                <div
                  className="flex flex-col gap-1"
                  aria-live="polite"
                  aria-atomic="true"
                >
                  <p className="text-sm font-medium text-foreground/72">
                    {selectedTier.custom
                      ? "Plano sob medida"
                      : `Até ${selectedTier.label} assinantes`}
                  </p>
                  <div className="flex items-baseline gap-2">
                    <span
                      className={cn(
                        "font-heading font-semibold tracking-[-0.02em] text-foreground",
                        selectedTier.custom
                          ? "text-3xl sm:text-4xl"
                          : "text-4xl sm:text-5xl"
                      )}
                    >
                      {selectedTier.price}
                    </span>
                    {selectedTier.pricePeriod ? (
                      <span className="text-base text-foreground/72">
                        {selectedTier.pricePeriod}
                      </span>
                    ) : null}
                  </div>
                </div>

                {selectedTier.custom ? (
                  <Button
                    variant="default"
                    size="lg"
                    className="w-full sm:w-auto"
                    nativeButton={false}
                    render={
                      <a
                        {...enterpriseDemoLink}
                        aria-label="Agendar demonstração para o plano Enterprise"
                      />
                    }
                  >
                    Falar sobre Enterprise
                  </Button>
                ) : (
                  <DemoButton
                    className="w-full sm:w-auto"
                    assinantes={selectedTier.id}
                  />
                )}
              </div>
            </div>

            <div className="flex flex-col gap-5 rounded-b-xl border-t border-border bg-muted/60 p-6 sm:p-8 lg:rounded-r-xl lg:rounded-bl-none lg:border-t-0 lg:border-l lg:p-10">
              <h3 className="text-lg font-semibold tracking-[-0.01em] text-foreground">
                Todos os planos incluem
              </h3>
              <ul className="flex flex-col gap-3.5">
                {pricingSharedFeatures.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-3 text-sm leading-relaxed text-foreground/80 sm:text-base"
                  >
                    <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      <CheckIcon className="size-3" strokeWidth={3} aria-hidden />
                    </span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-5 rounded-xl border border-border bg-card p-6 sm:flex-row sm:items-center sm:justify-between sm:gap-8 sm:p-8">
            <div className="flex max-w-xl flex-col gap-1.5">
              <h3 className="text-xl font-semibold tracking-[-0.01em] text-balance">
                {pricingEnterprise.name}
              </h3>
              <p className="text-sm leading-relaxed text-foreground/72 text-pretty sm:text-base">
                {pricingEnterprise.description}
              </p>
            </div>

            <Button
              variant="outline"
              size="lg"
              className="w-full shrink-0 sm:w-auto"
              nativeButton={false}
              render={
                <a
                  {...enterpriseDemoLink}
                  aria-label="Agendar demonstração para o plano Enterprise"
                />
              }
            >
              Agendar demonstração
            </Button>
          </div>

          <p className="text-center text-sm text-foreground/72">
            O Mensaliza não processa pagamentos — seu cliente paga direto para
            você.
          </p>
        </div>
      </div>
    </SectionShell>
  );
}
