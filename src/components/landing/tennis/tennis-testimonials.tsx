import Image from "next/image";

import { SectionHeading } from "@/components/landing/section-heading";
import { SectionShell } from "@/components/landing/section-shell";
import { TENNIS_LANDING_AUDIENCE } from "@/lib/landing-analytics";
import { tennisTestimonials, type TennisTestimonial } from "@/lib/tennis-landing-content";

function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

function visibleTestimonials(): TennisTestimonial[] {
  const hidePlaceholders = process.env.VERCEL_ENV === "production";
  return tennisTestimonials.items.filter((item) => !(hidePlaceholders && item.placeholder));
}

export function TennisTestimonials() {
  const items = visibleTestimonials();
  if (items.length === 0) return null;

  return (
    <SectionShell
      id="tennis_depoimentos"
      labelledBy="tennis-depoimentos-titulo"
      analyticsSection="tennis_depoimentos"
      analyticsAudience={TENNIS_LANDING_AUDIENCE}
    >
      <SectionHeading
        titleId="tennis-depoimentos-titulo"
        title={tennisTestimonials.title}
        description={tennisTestimonials.lead}
      />
      <ul className="grid w-full min-w-0 gap-4 lg:grid-cols-3">
        {items.map((item) => (
          <li
            key={item.id}
            className="flex min-w-0 flex-col gap-6 rounded-xl border border-border bg-card p-6"
          >
            <blockquote className="text-lg leading-relaxed wrap-break-word text-foreground text-pretty">
              “{item.quote}”
            </blockquote>
            <footer className="mt-auto flex min-w-0 items-center gap-3">
              {item.photo ? (
                <Image
                  src={item.photo.src}
                  alt={item.photo.alt}
                  width={40}
                  height={40}
                  className="size-10 shrink-0 rounded-full object-cover"
                />
              ) : (
                <span
                  className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 font-mono text-sm font-bold text-primary"
                  aria-hidden
                >
                  {initials(item.name)}
                </span>
              )}
              <div className="min-w-0">
                <p className="text-sm font-semibold wrap-break-word text-foreground">
                  {item.name}
                  {item.placeholder ? (
                    <span className="ml-2 align-middle text-xs font-medium text-primary">Exemplo</span>
                  ) : null}
                </p>
                <p className="text-sm wrap-break-word text-foreground/72">
                  {item.role}
                  {item.location ? ` · ${item.location}` : ""}
                </p>
              </div>
            </footer>
          </li>
        ))}
      </ul>
    </SectionShell>
  );
}
