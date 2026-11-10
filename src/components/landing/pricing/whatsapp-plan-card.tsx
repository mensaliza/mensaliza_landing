"use client";

import type { CSSProperties } from "react";

import { SignupButton } from "@/components/landing/signup-button";
import { useCountUp } from "@/components/landing/use-count-up";
import { trackWhatsAppClick } from "@/components/landing/whatsapp-floating-button";
import { Button } from "@/components/ui/button";
import { trackLandingPricingTierChanged, type BillingInterval } from "@/lib/landing-analytics";
import { pricingEnterprise, pricingPlans } from "@/lib/landing-content";
import { SUPPORT_WHATSAPP_ENTERPRISE_MESSAGE, getWhatsAppHref } from "@/lib/site-urls";
import { cn } from "cn";

import { formatCentavos, formatReais } from "./pricing-format";

/**
 * The main door, in the brand orange: pick how many students WhatsApp charges and the price,
 * the plan and the price per student follow. Stops match real plans only; the last one is the
 * made-to-measure plan, which is a WhatsApp conversation instead of a sign-up.
 */
const STOPS = [
  ...pricingPlans
    .filter((plan) => plan.maxSubscribers > 0)
    .map((plan) => ({
      id: plan.id,
      label: String(plan.maxSubscribers),
      name: plan.name,
      students: plan.maxSubscribers,
      priceMonthly: plan.priceMonthly,
      priceYearly: plan.priceYearly,
    })),
  { id: "enterprise", label: "200+", name: "Sob medida", students: null, priceMonthly: null, priceYearly: null },
] as const;

const DOTS = 20;
const STUDENTS_PER_DOT = 10;

/** Stop positions follow the thumb centre: 12px in from each end of the track. */
function stopLeft(index: number) {
  return `calc(12px + (100% - 24px) * ${index / (STOPS.length - 1)})`;
}

export function WhatsappPlanCard({
  interval,
  stop,
  onStopChange,
  className,
}: {
  interval: BillingInterval;
  stop: number;
  onStopChange: (stop: number) => void;
  className?: string;
}) {
  const current = STOPS[stop];
  const custom = current.students === null;
  const yearly = interval === "yearly";
  const cents = custom ? 0 : yearly ? current.priceYearly : current.priceMonthly;
  const price = useCountUp(cents / 100, 700);
  const charged = custom ? DOTS : current.students / STUDENTS_PER_DOT;

  const select = (next: number) => {
    if (next === stop) return;
    onStopChange(next);
    trackLandingPricingTierChanged(STOPS[next].id);
  };

  return (
    <article
      aria-labelledby="plano-whatsapp"
      className={cn(
        "panel-statement flex flex-col gap-7 rounded-[1.75rem] bg-primary p-6 text-white sm:p-8",
        className
      )}
    >
      <header className="flex flex-col gap-1">
        <h3 id="plano-whatsapp" className="text-xl font-semibold tracking-[-0.015em]">
          Cobrar no WhatsApp
        </h3>
        <p className="text-[15px] leading-relaxed text-white/80 text-pretty">
          O Mensaliza manda a cobrança, o lembrete e recebe o comprovante por você.
        </p>
      </header>

      {/* How many students WhatsApp charges */}
      <div className="flex flex-col gap-3">
        <label htmlFor="alunos-no-whatsapp" className="text-[15px] font-medium">
          Quantos alunos o WhatsApp vai cobrar?
        </label>
        <div className="relative pb-7">
          <input
            id="alunos-no-whatsapp"
            type="range"
            min={0}
            max={STOPS.length - 1}
            step={1}
            value={stop}
            onChange={(event) => select(Number(event.target.value))}
            aria-valuetext={custom ? "Mais de 200 alunos" : `Até ${current.students} alunos`}
            className="plan-range"
            style={{ "--fill": `${(stop / (STOPS.length - 1)) * 100}%` } as CSSProperties}
          />
          <div aria-hidden className="absolute inset-x-0 bottom-0 h-6">
            {STOPS.map((item, index) => (
              <button
                key={item.id}
                type="button"
                tabIndex={-1}
                onClick={() => select(index)}
                style={{ left: stopLeft(index) }}
                className={cn(
                  "absolute top-0 -translate-x-1/2 px-1.5 text-[13px] tabular-nums transition-colors",
                  index === stop ? "font-semibold text-white" : "text-white/65 hover:text-white"
                )}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Price, plan and what it means */}
      <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-3">
        <div className="flex flex-col gap-1" aria-live="polite">
          <span className="text-[13px] font-medium text-white/75">
            {custom ? pricingEnterprise.name : `Plano ${current.name}`}
          </span>
          {custom ? (
            <span className="text-[2.5rem] leading-none font-semibold tracking-[-0.035em]">Sob medida</span>
          ) : (
            <p className="flex items-baseline gap-1">
              <span className="text-[2.75rem] leading-none font-semibold tracking-[-0.035em] tabular-nums sm:text-[3.25rem]">
                {formatReais(price)}
              </span>
              <span className="text-[15px] text-white/75">/mês</span>
            </p>
          )}
          <span className="text-[13px] text-white/75 tabular-nums">
            {custom
              ? "Montamos o plano com você no WhatsApp"
              : yearly
                ? `${formatCentavos(cents * 12)} por ano, cobrado de uma vez`
                : "Cobrado todo mês"}
          </span>
        </div>
        {!custom ? (
          <span className="rounded-full bg-white/15 px-3 py-1.5 text-[13px] font-medium tabular-nums">
            {formatCentavos(Math.round(cents / current.students))} por aluno cobrado
          </span>
        ) : null}
      </div>

      {/* The quota, drawn: filled dots are charged on WhatsApp, the rest stay in the panel */}
      <div className="flex flex-col gap-2.5 border-t border-white/20 pt-5">
        <div aria-hidden className="grid grid-cols-[repeat(20,minmax(0,1fr))] gap-1">
          {Array.from({ length: DOTS }, (_, index) => (
            <span
              key={index}
              style={{ transitionDelay: `${index * 18}ms` }}
              className={cn(
                "aspect-square rounded-[3px] transition-colors duration-300",
                index < charged ? "bg-white" : "bg-white/22"
              )}
            />
          ))}
        </div>
        <div className="flex flex-wrap gap-x-5 gap-y-1 text-[13px] text-white/80">
          <span className="flex items-center gap-1.5">
            <span aria-hidden className="size-2.5 rounded-[2px] bg-white" />
            {custom ? "Mais de 200 cobrados no WhatsApp" : `Até ${current.students} cobrados no WhatsApp`}
          </span>
          <span className="flex items-center gap-1.5">
            <span aria-hidden className="size-2.5 rounded-[2px] bg-white/22" />
            Ilimitados no painel
          </span>
        </div>
        {!custom ? (
          <p className="text-[13px] leading-relaxed text-white/70 text-pretty">
            Passou do limite? Os demais seguem no painel, só sem a cobrança automática.
          </p>
        ) : null}
      </div>

      {custom ? (
        <Button
          size="lg"
          className="min-h-11 w-full bg-white text-primary hover:bg-white/90"
          nativeButton={false}
          render={
            <a
              href={getWhatsAppHref(SUPPORT_WHATSAPP_ENTERPRISE_MESSAGE)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackWhatsAppClick("pricing_enterprise")}
            />
          }
        >
          Falar no WhatsApp
        </Button>
      ) : (
        <SignupButton
          className="w-full bg-white text-primary hover:bg-white/90"
          location="pricing_plan"
          plan={current.id}
          billingInterval={interval}
        />
      )}
    </article>
  );
}
