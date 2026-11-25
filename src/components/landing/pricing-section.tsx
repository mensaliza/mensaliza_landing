"use client";

import { CheckIcon } from "lucide-react";
import { useState } from "react";

import { BillingIntervalSwitch } from "@/components/landing/pricing/billing-interval-switch";
import { WhatsappPlanCard } from "@/components/landing/pricing/whatsapp-plan-card";
import { SectionShell } from "@/components/landing/section-shell";
import { TRIAL_TERMS, pricingPlans } from "@/lib/landing-content";
import type { BillingInterval } from "@/lib/landing-analytics";

const ESSENTIAL_STOP = Math.max(
  0,
  pricingPlans.findIndex((plan) => plan.id === "essential")
);

/** Said once for every plan, instead of repeating the same lines in each card. */
const includedInAll = [
  "Cobrança e comprovante no WhatsApp",
  "Assinantes ilimitados no painel",
  "Pix direto na sua conta",
  "Previsão do mês e alerta de atraso",
  "Sem fidelidade",
];

/**
 * One card instead of five look-alike ones: every plan charges on WhatsApp, so the only choice
 * is how many subscribers. Defaults to 100 (Essential), the plan most people land on.
 */
export function PricingSection({
  title = "Cadastre quantos assinantes quiser. Pague só pelos que o Mensaliza cobra.",
}: {
  /** Heading for a campaign page; the home uses the default. */
  title?: string;
} = {}) {
  const [interval, setBillingInterval] = useState<BillingInterval>("monthly");
  const [stop, setStop] = useState(ESSENTIAL_STOP);

  return (
    <SectionShell id="precos" labelledBy="precos-titulo" analyticsSection="precos">
      {/* Desktop: the pitch, the interval and what every plan has on the left; the card on the right.
          Mobile keeps the card right after the interval, before the list. */}
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:grid-rows-[auto_1fr] lg:gap-x-16 lg:gap-y-10">
        <div className="flex flex-col gap-6 lg:col-start-1 lg:row-start-1">
          <div className="flex max-w-xl flex-col gap-3">
            <h2
              id="precos-titulo"
              className="text-[clamp(1.75rem,3.2vw,2.5rem)] leading-[1.12] font-semibold tracking-[-0.025em] text-balance"
            >
              {title}
            </h2>
            <p className="text-[15px] font-medium text-foreground/75">{TRIAL_TERMS}</p>
          </div>

          <BillingIntervalSwitch interval={interval} onIntervalChange={setBillingInterval} />
        </div>

        <WhatsappPlanCard
          interval={interval}
          stop={stop}
          onStopChange={setStop}
          className="lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:self-center"
        />

        <div className="flex flex-col gap-3 lg:col-start-1 lg:row-start-2">
          <span className="text-[15px] font-semibold">Todos os planos têm</span>
          <ul className="flex list-none flex-wrap gap-x-6 gap-y-2 p-0 lg:flex-col">
            {includedInAll.map((item) => (
              <li key={item} className="flex items-center gap-2 text-[15px] text-foreground/75">
                <CheckIcon className="size-4 shrink-0 text-primary" strokeWidth={2.5} aria-hidden />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </SectionShell>
  );
}
