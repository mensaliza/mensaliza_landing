import Image from "next/image";

import { SectionHeading } from "@/components/landing/section-heading";
import { SectionShell } from "@/components/landing/section-shell";
import { TENNIS_LANDING_AUDIENCE } from "@/lib/landing-analytics";
import { tennisProduct } from "@/lib/tennis-landing-content";

function TennisDashboardFrame() {
  const image = tennisProduct.image;

  return (
    <figure className="overflow-hidden rounded-xl border border-border bg-card">
      <div
        aria-hidden
        className="flex items-center gap-3 border-b border-border/80 bg-muted px-3 py-2 sm:gap-4 sm:px-4 sm:py-2.5"
      >
        <div className="flex shrink-0 items-center gap-1.5">
          <span className="size-2.5 rounded-full bg-foreground/35 sm:size-3" />
          <span className="size-2.5 rounded-full bg-foreground/25 sm:size-3" />
          <span className="size-2.5 rounded-full bg-foreground/15 sm:size-3" />
        </div>
        <div className="flex min-w-0 flex-1 items-center justify-center">
          <div className="flex w-full max-w-md items-center gap-2 rounded-md border border-border/70 bg-card px-2.5 py-1.5 sm:px-3">
            <svg
              aria-hidden
              viewBox="0 0 16 16"
              className="size-3 shrink-0 text-foreground/40 sm:size-3.5"
              fill="none"
            >
              <path
                d="M5.2 7.2V5.6a2.8 2.8 0 0 1 5.6 0v1.6M4.4 7.2h7.2v5.2H4.4V7.2Z"
                stroke="currentColor"
                strokeWidth="1.25"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="truncate font-sans text-[11px] leading-none text-foreground/72 sm:text-xs">
              app.mensaliza.com
            </span>
          </div>
        </div>
        <div className="hidden w-10 shrink-0 sm:block" />
      </div>
      <Image
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 92vw, 72rem"
        className="h-auto w-full"
      />
    </figure>
  );
}

export function TennisProduct() {
  return (
    <SectionShell
      id="tennis_produto"
      labelledBy="tennis-produto-titulo"
      analyticsSection="tennis_produto"
      analyticsAudience={TENNIS_LANDING_AUDIENCE}
    >
      <SectionHeading
        titleId="tennis-produto-titulo"
        title={tennisProduct.title}
        description={tennisProduct.lead}
      />
      <TennisDashboardFrame />
      <ol className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {tennisProduct.flow.map((item, index) => (
          <li key={item.id} className="flex flex-col gap-3">
            <span className="font-mono text-sm font-medium text-primary">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className="text-lg font-semibold tracking-[-0.01em] text-balance">
              {item.title}
            </h3>
            <p className="text-sm leading-relaxed text-muted-foreground text-pretty sm:text-base">
              {item.body}
            </p>
          </li>
        ))}
      </ol>
    </SectionShell>
  );
}
