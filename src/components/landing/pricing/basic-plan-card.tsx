"use client";

import { SignupButton } from "@/components/landing/signup-button";
import { useCountUp } from "@/components/landing/use-count-up";
import type { BillingInterval } from "@/lib/landing-analytics";
import { pricingPlans } from "@/lib/landing-content";
import { cn } from "cn";

import { formatCentavos, formatReais } from "./pricing-format";

const basic = pricingPlans.find((plan) => plan.id === "basic")!;

/** The quiet door: keep every student in the panel and charge them your own way. */
export function BasicPlanCard({ interval, className }: { interval: BillingInterval; className?: string }) {
  const yearly = interval === "yearly";
  const cents = yearly ? basic.priceYearly : basic.priceMonthly;
  const price = useCountUp(cents / 100, 600);

  return (
    <article
      aria-labelledby="plano-basic"
      className={cn("bento-stage flex flex-col gap-6 rounded-[1.75rem] p-6 sm:p-8", className)}
    >
      <header className="flex flex-col gap-1">
        <h3 id="plano-basic" className="text-xl font-semibold tracking-[-0.015em]">
          Só organizar
        </h3>
        <p className="text-[15px] leading-relaxed text-foreground/70 text-pretty">
          Todos os alunos no painel. A cobrança você faz do seu jeito e marca quem pagou.
        </p>
      </header>

      <div className="flex flex-col gap-1">
        <span className="text-[13px] font-medium text-foreground/55">Plano Basic</span>
        <p className="flex items-baseline gap-1">
          <span className="text-[2.5rem] leading-none font-semibold tracking-[-0.035em] tabular-nums">
            {formatReais(price)}
          </span>
          <span className="text-[15px] text-foreground/60">/mês</span>
        </p>
        <p className="text-[13px] text-foreground/60 tabular-nums">
          {yearly ? (
            <>
              {formatCentavos(cents * 12)} por ano, cobrado de uma vez.{" "}
              <s className="decoration-foreground/40">{formatReais(basic.priceMonthly / 100)}/mês</s> no mensal
            </>
          ) : (
            "Cobrado todo mês"
          )}
        </p>
      </div>

      <p className="text-[14px] leading-relaxed text-foreground/65 text-pretty">
        Sem cobrança automática no WhatsApp. Dá para mudar de plano quando quiser.
      </p>

      <SignupButton
        className="mt-auto w-full"
        variant="outline"
        showIcon={false}
        label="Testar o Basic grátis"
        location="pricing_plan"
        plan="basic"
        billingInterval={interval}
      />
    </article>
  );
}
