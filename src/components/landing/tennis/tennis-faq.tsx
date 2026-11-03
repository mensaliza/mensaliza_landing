"use client";

import { SectionHeading } from "@/components/landing/section-heading";
import { SectionShell } from "@/components/landing/section-shell";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  TENNIS_LANDING_AUDIENCE,
  trackLandingFaqExpanded,
} from "@/lib/landing-analytics";
import { tennisFaq } from "@/lib/tennis-landing-content";

export function TennisFaq() {
  return (
    <SectionShell
      id="tennis_faq"
      labelledBy="tennis-faq-titulo"
      analyticsSection="tennis_faq"
      analyticsAudience={TENNIS_LANDING_AUDIENCE}
    >
      <div className="grid gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-start lg:gap-16">
        <SectionHeading
          titleId="tennis-faq-titulo"
          title={tennisFaq.title}
          className="lg:sticky lg:top-28"
        />
        <Accordion
          hiddenUntilFound
          className="flex w-full flex-col gap-2"
          onValueChange={(value) => {
            if (!value || Array.isArray(value)) return;
            const item = tennisFaq.items.find((faq) => faq.question === value);
            if (item) {
              trackLandingFaqExpanded(item.question);
            }
          }}
        >
          {tennisFaq.items.map((item) => (
            <AccordionItem
              key={item.question}
              value={item.question}
              className="rounded-xl border border-border/80 bg-muted px-5 py-1"
            >
              <AccordionTrigger className="min-h-11 py-4 text-left font-heading text-base font-semibold tracking-[-0.01em] hover:no-underline">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="pb-4 leading-relaxed text-foreground/72 text-pretty">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </SectionShell>
  );
}
