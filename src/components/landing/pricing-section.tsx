"use client";

import { useState } from "react";

import { PlanPricingCard, type BillingInterval } from "@/components/landing/plan-pricing-card";
import { SectionHeading } from "@/components/landing/section-heading";
import { SectionShell } from "@/components/landing/section-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  YEARLY_SAVINGS_PERCENT,
  pricingEnterprise,
  pricingPlans,
} from "@/lib/landing-content";
import {
  trackLandingCta,
  trackLandingPricingIntervalChanged,
} from "@/lib/landing-analytics";
import { getDemoLinkProps } from "@/lib/site-urls";

export function PricingSection() {
  const enterpriseDemoLink = getDemoLinkProps("enterprise");
  const [billingInterval, setBillingInterval] =
    useState<BillingInterval>("monthly");

  return (
    <SectionShell id="precos" tinted analyticsSection="precos">
      <div className="flex flex-col gap-10">
        <SectionHeading
          align="center"
          title="Planos para cada tamanho de base"
          description="Escolha quantos assinantes você tem. O produto é o mesmo em todos os planos."
          className="mx-auto"
        />

        <div className="flex flex-col gap-5">
          <div className="flex flex-col items-center gap-3">
            <Tabs
              value={billingInterval}
              onValueChange={(value) => {
                const interval = value as BillingInterval;
                setBillingInterval(interval);
                trackLandingPricingIntervalChanged(interval);
              }}
            >
              <TabsList
                aria-label="Período de cobrança"
                className="mx-auto grid h-auto! w-fit grid-cols-2 rounded-full bg-muted p-0.5"
              >
                <TabsTrigger
                  value="monthly"
                  className="rounded-full px-3 py-1.5 text-xs font-medium transition-[color,background-color,box-shadow] duration-200 ease-[cubic-bezier(0.25,1,0.5,1)]"
                >
                  Mensal
                </TabsTrigger>
                <TabsTrigger
                  value="yearly"
                  className="rounded-full px-3 py-1.5 text-xs font-medium transition-[color,background-color,box-shadow] duration-200 ease-[cubic-bezier(0.25,1,0.5,1)]"
                >
                  Anual
                </TabsTrigger>
              </TabsList>
            </Tabs>
            <Badge variant="success">
              Economize {YEARLY_SAVINGS_PERCENT}% na cobrança anual
            </Badge>
          </div>

          <div className="grid grid-cols-1 gap-4 pt-3 sm:grid-cols-2 lg:grid-cols-4">
            {pricingPlans.map((plan) => (
              <PlanPricingCard
                key={plan.id}
                slug={plan.id}
                name={plan.name}
                tagline={plan.tagline}
                maxSubscribers={plan.maxSubscribers}
                priceMonthly={plan.priceMonthly}
                priceYearly={plan.priceYearly}
                billingInterval={billingInterval}
                popular={plan.popular}
              />
            ))}
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
                  onClick={() =>
                    trackLandingCta({
                      cta: "demo",
                      location: "pricing_enterprise",
                    })
                  }
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
