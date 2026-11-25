import Image from "next/image";

import { SectionShell } from "@/components/landing/section-shell";
import { tennisTestimonials } from "@/lib/tennis-landing-content";

/** Example quotes (`placeholder: true`) only render in development. */
const visibleTestimonials = tennisTestimonials.items.filter(
  (item) => !item.placeholder || process.env.NODE_ENV !== "production"
);

function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

/** Quotes on the same bento cards as the panel section. Hidden until there are real ones. */
export function TennisTestimonials() {
  if (visibleTestimonials.length === 0) return null;

  return (
    <SectionShell id="depoimentos" labelledBy="depoimentos-titulo" analyticsSection="depoimentos">
      <div className="flex max-w-3xl flex-col gap-3">
        <h2
          id="depoimentos-titulo"
          className="text-[clamp(1.75rem,3.2vw,2.5rem)] leading-[1.12] font-semibold tracking-[-0.025em] text-balance"
        >
          {tennisTestimonials.title}
        </h2>
        <p className="text-lg leading-relaxed text-foreground/75 text-pretty">
          {tennisTestimonials.description}
        </p>
      </div>

      <ul className="grid list-none gap-4 p-0 lg:grid-cols-3">
        {visibleTestimonials.map((item) => (
          <li
            key={item.id}
            className="bento-stage flex min-w-0 flex-col gap-6 rounded-[1.75rem] p-6 sm:p-7"
          >
            <blockquote className="text-lg leading-relaxed font-medium tracking-[-0.01em] text-foreground text-pretty">
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
                  aria-hidden
                  className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground"
                >
                  {initials(item.name)}
                </span>
              )}
              <div className="min-w-0">
                <p className="text-[15px] font-semibold text-foreground">{item.name}</p>
                <p className="text-sm text-foreground/70">
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
