import Image from "next/image";

import { Reveal } from "@/components/landing/motion/reveal";
import { SectionHeading } from "@/components/landing/section-heading";
import { SectionShell } from "@/components/landing/section-shell";
import { TENNIS_LANDING_AUDIENCE } from "@/lib/landing-analytics";
import { tennisTestimonials } from "@/lib/tennis-landing-content";

function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

/** Example quotes (`placeholder: true`) only render in development. */
const visibleTestimonials = tennisTestimonials.items.filter(
  (item) => !item.placeholder || process.env.NODE_ENV !== "production"
);

export function TennisTestimonials() {
  if (visibleTestimonials.length === 0) return null;

  return (
    <SectionShell
      id="depoimentos"
      labelledBy="tennis-depoimentos-titulo"
      analyticsSection="tennis_depoimentos"
      analyticsAudience={TENNIS_LANDING_AUDIENCE}
    >
      <Reveal>
        <SectionHeading
          align="center"
          titleId="tennis-depoimentos-titulo"
          title={tennisTestimonials.title}
          description={tennisTestimonials.lead}
          className="mx-auto"
        />
      </Reveal>
      <Reveal delay={60}>
      <ul className="grid w-full min-w-0 gap-4 lg:grid-cols-3">
        {visibleTestimonials.map((item) => (
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
                <p className="text-sm font-semibold wrap-break-word text-foreground">{item.name}</p>
                <p className="text-sm wrap-break-word text-foreground/72">
                  {item.role}
                  {item.location ? ` · ${item.location}` : ""}
                </p>
              </div>
            </footer>
          </li>
        ))}
      </ul>
      </Reveal>
    </SectionShell>
  );
}
