"use client";

import { CheckIcon, XIcon } from "lucide-react";

import { SignupButton } from "@/components/landing/signup-button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

export type BillingInterval = "monthly" | "yearly";

type PlanFeatureItem = {
  label: string;
  included: boolean;
};

const BASE_FEATURES: PlanFeatureItem[] = [
  { label: "Assinantes ilimitados", included: true },
  { label: "Dashboard financeiro", included: true },
  { label: "Gestão de assinantes", included: true },
  { label: "Gestão de cobranças", included: true },
  { label: "Previsão de recebimentos", included: true },
];

const PREVIOUS_PLAN_NAMES: Record<string, string> = {
  essential: "Basic",
  business: "Essential",
  scale: "Business",
};

function getPlanFeatures(
  slug: string,
  maxSubscribers: number | null
): PlanFeatureItem[] {
  if (slug === "basic") {
    return [
      ...BASE_FEATURES,
      { label: "Cobrança automática via WhatsApp", included: false },
      { label: "Recebimento de comprovantes via WhatsApp", included: false },
    ];
  }

  const previousPlanName = PREVIOUS_PLAN_NAMES[slug];
  const whatsappLimit = maxSubscribers ?? 0;

  const incrementalFeatures: PlanFeatureItem[] =
    slug === "essential"
      ? [
          { label: "Recebimento de comprovantes via WhatsApp", included: true },
          {
            label: `Cobrança automática via WhatsApp - até ${whatsappLimit} assinantes`,
            included: true,
          },
        ]
      : [
          {
            label: `Cobrança automática via WhatsApp - até ${whatsappLimit} assinantes`,
            included: true,
          },
        ];

  return [
    { label: `Tudo do plano ${previousPlanName}, mais:`, included: true },
    ...incrementalFeatures,
  ];
}

function formatCurrencyFromCents(cents: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(cents / 100);
}

type PlanPricingCardProps = {
  slug: string;
  name: string;
  tagline: string;
  maxSubscribers: number | null;
  priceMonthly: number | null;
  priceYearly: number | null;
  billingInterval: BillingInterval;
  popular?: boolean;
};

export function PlanPricingCard({
  slug,
  name,
  tagline,
  maxSubscribers,
  priceMonthly,
  priceYearly,
  billingInterval,
  popular = false,
}: PlanPricingCardProps) {
  const features = getPlanFeatures(slug, maxSubscribers);
  const isYearly = billingInterval === "yearly";
  const displayPrice = isYearly ? priceYearly : priceMonthly;
  const yearlyTotal =
    isYearly && displayPrice != null ? displayPrice * 12 : null;

  return (
    <div className="relative h-full">
      {popular ? (
        <div className="absolute top-0 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
          <Badge variant="default">Mais popular</Badge>
        </div>
      ) : null}

      <Card
        className={cn(
          "h-full py-5 ring-2",
          popular ? "border-primary ring-primary/30" : "ring-foreground/10"
        )}
      >
        <CardHeader className="gap-y-0.5! pb-0">
          <p
            className={cn(
              "text-sm font-semibold tracking-wide uppercase",
              popular && "text-primary"
            )}
          >
            {name}
          </p>
          <p className="text-sm text-foreground/72">{tagline}</p>
        </CardHeader>

        <CardContent className="space-y-4 pt-2">
          <div>
            {isYearly && priceMonthly != null ? (
              <p className="font-heading text-sm font-medium text-foreground/50 tabular-nums">
                <span className="sr-only">Preço no plano mensal: </span>
                <s className="decoration-foreground/40">
                  {formatCurrencyFromCents(priceMonthly)}
                </s>
              </p>
            ) : null}
            <div className="flex items-end gap-1">
              <span className="font-heading text-3xl font-semibold tracking-tight tabular-nums">
                {displayPrice != null
                  ? formatCurrencyFromCents(displayPrice)
                  : "—"}
              </span>
              <span className="pb-1 text-sm text-foreground/72">/mês</span>
            </div>
            <p className="text-xs text-foreground/72">
              {yearlyTotal != null ? (
                <>
                  {formatCurrencyFromCents(yearlyTotal)} por ano.
                  Cobrado à vista
                </>
              ) : (
                "Cobrado mensalmente"
              )}
            </p>
          </div>

          <Separator />

          <ul className="space-y-2.5">
            {features.map((feature) => (
              <li key={feature.label} className="flex items-start gap-2 text-sm">
                {feature.included ? (
                  <CheckIcon
                    className={cn(
                      "mt-0.5 size-4 shrink-0",
                      popular ? "text-primary" : "text-foreground"
                    )}
                    aria-hidden
                  />
                ) : (
                  <XIcon
                    className="mt-0.5 size-4 shrink-0 text-foreground/40"
                    aria-hidden
                  />
                )}
                <span className={cn(!feature.included && "text-foreground/72")}>
                  {feature.label}
                </span>
              </li>
            ))}
          </ul>
        </CardContent>

        <CardFooter className="mt-auto border-0 bg-transparent pt-2">
          <SignupButton
            className="w-full"
            variant={popular ? "default" : "outline"}
            showIcon={false}
            location="pricing_plan"
            plan={slug}
            billingInterval={billingInterval}
          />
        </CardFooter>
      </Card>
    </div>
  );
}
