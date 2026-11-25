"use client";

import { SectionShell } from "@/components/landing/section-shell";
import { trackWhatsAppClick } from "@/components/landing/whatsapp-floating-button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqItems } from "@/lib/landing-content";
import { trackLandingFaqExpanded } from "@/lib/landing-analytics";
import { getWhatsAppHref } from "@/lib/site-urls";

/** Copy for a campaign page; the home uses the defaults. */
export type FaqContent = {
  title: string;
  items: readonly { question: string; answer: string }[];
};

const HOME_FAQ: FaqContent = { title: "Dúvidas antes de começar", items: faqItems };

export function FaqSection({ content = HOME_FAQ }: { content?: FaqContent }) {
  return (
    <SectionShell id="faq" labelledBy="faq-titulo" tinted analyticsSection="faq">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-start lg:gap-16">
        <div className="flex flex-col gap-3 lg:sticky lg:top-28">
          <h2
            id="faq-titulo"
            className="text-[clamp(1.75rem,3.2vw,2.5rem)] leading-[1.12] font-semibold tracking-[-0.025em] text-balance"
          >
            {content.title}
          </h2>
          <p className="text-lg leading-relaxed text-foreground/75 text-pretty">
            Não achou a sua?{" "}
            <a
              href={getWhatsAppHref()}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackWhatsAppClick("faq")}
              className="font-medium text-primary underline underline-offset-4 focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
            >
              Pergunte no WhatsApp
            </a>
            .
          </p>
        </div>

        <Accordion
          hiddenUntilFound
          className="flex w-full flex-col gap-2"
          onValueChange={(value) => {
            if (!value || Array.isArray(value)) return;
            const item = content.items.find((faq) => faq.question === value);
            if (item) trackLandingFaqExpanded(item.question);
          }}
        >
          {content.items.map((item) => (
            <AccordionItem
              key={item.question}
              value={item.question}
              className="rounded-xl border border-border/80 bg-background px-5 py-1"
            >
              <AccordionTrigger className="min-h-11 py-4 text-left text-base font-semibold tracking-[-0.01em] hover:no-underline">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="pb-4 leading-relaxed text-foreground/75 text-pretty">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </SectionShell>
  );
}
