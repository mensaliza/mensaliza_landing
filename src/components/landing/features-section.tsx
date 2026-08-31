import {
  ChartNoAxesColumnIcon,
  CheckCircle2Icon,
  MessageCircleIcon,
  UsersIcon,
} from "lucide-react";

import { AppScreenshotSlot } from "@/components/landing/app-screenshot-slot";
import { DashboardCardsDemo } from "@/components/landing/dashboard-cards-demo";
import { ProofApprovalDemo } from "@/components/landing/proof-approval-demo";
import { Reveal } from "@/components/landing/motion/reveal";
import { SectionHeading } from "@/components/landing/section-heading";
import { SectionShell } from "@/components/landing/section-shell";
import { SubscribersListDemo } from "@/components/landing/subscribers-list-demo";
import { WhatsappBillingDemo } from "@/components/landing/whatsapp-billing-demo";
import { features } from "@/lib/landing-content";
import { cn } from "@/lib/utils";

const iconMap = {
  users: UsersIcon,
  chart: ChartNoAxesColumnIcon,
  whatsapp: MessageCircleIcon,
  check: CheckCircle2Icon,
} as const;

export function FeaturesSection() {
  return (
    <SectionShell id="funcionalidades" analyticsSection="funcionalidades">
      <div className="flex flex-col gap-16 sm:gap-20">
        <Reveal>
          <SectionHeading
            align="center"
            title="Do lembrete ao comprovante aprovado"
            description="Cobrança automática no WhatsApp e comprovantes centralizados — sem você processar pagamentos."
            className="mx-auto"
          />
        </Reveal>

        <div className="flex flex-col gap-20 sm:gap-24">
          {features.map((feature, index) => {
            const Icon = iconMap[feature.icon];
            const reversed = index % 2 === 1;

            return (
              <Reveal key={feature.title} delay={index * 60}>
                <div
                  className={cn(
                    "grid items-center gap-10 lg:grid-cols-2 lg:gap-16",
                    reversed && "lg:[&>*:first-child]:order-2 lg:[&>*:last-child]:order-1"
                  )}
                >
                  <div className="flex flex-col gap-5">
                    <div
                      className={cn(
                        "flex size-11 items-center justify-center rounded-lg",
                        "highlight" in feature && feature.highlight
                          ? "bg-primary/10 text-primary"
                          : "bg-muted text-foreground"
                      )}
                    >
                      <Icon className="size-5" aria-hidden />
                    </div>
                    <h3 className="text-2xl font-semibold tracking-[-0.02em] text-balance sm:text-3xl">
                      {feature.title}
                    </h3>
                    <p className="max-w-lg text-base leading-relaxed text-muted-foreground text-pretty sm:text-lg">
                      {feature.description}
                    </p>
                    <ul className="flex flex-col gap-2 pt-1">
                      {feature.bullets.slice(0, 3).map((bullet) => (
                        <li
                          key={bullet}
                          className="flex items-start gap-2 text-sm text-muted-foreground sm:text-base"
                        >
                          <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" aria-hidden />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {index === 0 ? (
                    <SubscribersListDemo className="aspect-16/10" />
                  ) : index === 1 ? (
                    <DashboardCardsDemo className="aspect-16/10" />
                  ) : index === 2 ? (
                    <WhatsappBillingDemo className="aspect-16/10" />
                  ) : index === 3 ? (
                    <ProofApprovalDemo className="aspect-16/10" />
                  ) : (
                    <AppScreenshotSlot
                      label={feature.title}
                      className="aspect-16/10 border-border"
                    />
                  )}
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </SectionShell>
  );
}
