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

function revealTennisFaqAnswer(question: string) {
  const trigger = [
    ...document.querySelectorAll<HTMLElement>(
      "#tennis_faq [data-slot=accordion-trigger]",
    ),
  ].find((element) => element.textContent?.includes(question));
  const item = trigger?.closest<HTMLElement>("[data-slot=accordion-item]");
  if (!item) return;

  const align = () => item.scrollIntoView({ block: "nearest" });
  align();
  const observer = new ResizeObserver(align);
  observer.observe(item);
  window.setTimeout(() => observer.disconnect(), 700);
}

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
            const opened = value[0];
            if (!opened) return;
            const item = tennisFaq.items.find((faq) => faq.question === opened);
            if (item) {
              trackLandingFaqExpanded(item.question);
              revealTennisFaqAnswer(item.question);
            }
          }}
        >
          {tennisFaq.items.map((item) => (
            <AccordionItem
              key={item.question}
              value={item.question}
              className="scroll-mb-28 rounded-xl border border-border/80 bg-muted px-5 py-1 lg:scroll-mb-4"
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
