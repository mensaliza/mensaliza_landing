"use client";

import { CheckIcon } from "lucide-react";
import { useState } from "react";

import { BasicPlanCard } from "@/components/landing/pricing/basic-plan-card";
import { WhatsappPlanCard } from "@/components/landing/pricing/whatsapp-plan-card";
import { SectionShell } from "@/components/landing/section-shell";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TRIAL_TERMS, YEARLY_SAVINGS_PERCENT } from "@/lib/landing-content";
import { trackLandingPricingIntervalChanged, type BillingInterval } from "@/lib/landing-analytics";

/** Said once for every plan, instead of repeating the same lines in each card. */
const includedInAll = [
  "Assinantes ilimitados no painel",
  "Pix direto na sua conta",
  "Previsão do mês e alerta de atraso",
  "Sem fidelidade",
];

/**
 * Two doors instead of four look-alike cards: just organise (Basic), or have WhatsApp charge
 * for you, where the only choice left is how many students. Defaults to 100 (Essential).
 */
export function PricingSection() {
  const [interval, setBillingInterval] = useState<BillingInterval>("monthly");
  const [stop, setStop] = useState(0);

  return (
    <SectionShell id="precos" labelledBy="precos-titulo" analyticsSection="precos">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="flex max-w-2xl flex-col gap-3">
          <h2
            id="precos-titulo"
            className="text-[clamp(1.75rem,3.2vw,2.5rem)] leading-[1.12] font-semibold tracking-[-0.025em] text-balance"
          >
            Cadastre quantos assinantes quiser. Pague só pelos que o WhatsApp cobra.
          </h2>
          <p className="text-[15px] font-medium text-foreground/75">{TRIAL_TERMS}</p>
        </div>

        <Tabs
          value={interval}
          onValueChange={(value) => {
            const next = value as BillingInterval;
            setBillingInterval(next);
            trackLandingPricingIntervalChanged(next);
          }}
        >
          <TabsList
            aria-label="Período de cobrança"
            className="grid h-auto! min-h-11 w-full grid-cols-2 rounded-full bg-muted p-1 sm:w-80"
          >
            <TabsTrigger value="monthly" className="min-h-10 rounded-full px-4 text-sm font-medium">
              Mensal
            </TabsTrigger>
            <TabsTrigger value="yearly" className="min-h-10 rounded-full px-4 text-sm font-medium">
              Anual, {YEARLY_SAVINGS_PERCENT}% off
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="grid gap-4 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.4fr)]">
        <BasicPlanCard interval={interval} className="max-lg:order-last" />
        <WhatsappPlanCard interval={interval} stop={stop} onStopChange={setStop} />
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-8">
        <span className="text-[15px] font-semibold">Todos os planos têm</span>
        <ul className="flex list-none flex-wrap gap-x-6 gap-y-2 p-0">
          {includedInAll.map((item) => (
            <li key={item} className="flex items-center gap-2 text-[15px] text-foreground/75">
              <CheckIcon className="size-4 shrink-0 text-primary" strokeWidth={2.5} aria-hidden />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </SectionShell>
  );
}
