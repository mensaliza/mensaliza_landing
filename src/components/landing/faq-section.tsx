"use client";

import { SectionHeading } from "@/components/landing/section-heading";
import { SectionShell } from "@/components/landing/section-shell";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { essentialFaqItems } from "@/lib/landing-content";
import { trackLandingFaqExpanded } from "@/lib/landing-analytics";

export function FaqSection() {
  return (
    <SectionShell id="faq" tinted analyticsSection="faq">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start lg:gap-16">
        <SectionHeading
          title="Perguntas que todo mundo faz antes de agendar"
          description="O essencial sobre cobrança, WhatsApp e comprovantes — sem surpresas."
          className="lg:sticky lg:top-28"
        />

        <Accordion
          hiddenUntilFound
          className="flex w-full flex-col gap-2"
          onValueChange={(value) => {
            if (!value || Array.isArray(value)) return;
            const item = essentialFaqItems.find((faq) => faq.question === value);
            if (item) {
              trackLandingFaqExpanded(item.question);
            }
          }}
        >
          {essentialFaqItems.map((item) => (
            <AccordionItem
              key={item.question}
              value={item.question}
              className="rounded-xl border border-border/80 bg-background px-5 py-1"
            >
              <AccordionTrigger className="py-4 text-left font-heading text-base font-semibold tracking-[-0.01em] hover:no-underline">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="pb-4 leading-relaxed text-muted-foreground text-pretty">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </SectionShell>
  );
}
