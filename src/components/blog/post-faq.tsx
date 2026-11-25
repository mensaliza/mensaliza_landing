import { ChevronDownIcon } from "lucide-react";

import type { BlogFaqItem } from "@/lib/blog";

/** Native <details> keeps every answer in the server HTML for crawlers. */
export function PostFaq({ items }: { items: BlogFaqItem[] }) {
  return (
    <section aria-labelledby="perguntas-frequentes" className="mt-14 flex flex-col gap-5">
      <h2
        id="perguntas-frequentes"
        className="scroll-mt-28 font-heading text-[clamp(1.375rem,2.2vw,1.75rem)] leading-[1.25] font-semibold tracking-[-0.02em] text-balance text-foreground"
      >
        Perguntas frequentes
      </h2>
      <div className="flex flex-col gap-2">
        {items.map((item) => (
          <details
            key={item.question}
            className="group rounded-xl border border-border bg-card px-5 [&_summary::-webkit-details-marker]:hidden"
          >
            <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 py-4 font-heading text-base font-semibold tracking-[-0.01em] text-foreground focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50">
              {item.question}
              <ChevronDownIcon
                aria-hidden="true"
                className="size-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-180 motion-reduce:transition-none"
              />
            </summary>
            <p className="pb-4 leading-relaxed text-pretty text-foreground/72">{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
