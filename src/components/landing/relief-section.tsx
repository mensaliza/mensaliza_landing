import { CheckIcon, XIcon } from "lucide-react";

import { SectionHeading } from "@/components/landing/section-heading";
import { Reveal } from "@/components/landing/motion/reveal";
import { SectionShell } from "@/components/landing/section-shell";
import { reliefComparison } from "@/lib/landing-content";
import { cn } from "@/lib/utils";

function ComparisonCell({
  variant,
  children,
}: {
  variant: "without" | "with";
  children: React.ReactNode;
}) {
  const Icon = variant === "with" ? CheckIcon : XIcon;

  return (
    <span className="flex items-center gap-2.5 text-pretty">
      <Icon
        aria-hidden
        className={cn(
          "mt-0.5 size-4 shrink-0",
          variant === "with" ? "text-primary" : "text-muted-foreground/70"
        )}
        strokeWidth={2.5}
      />
      <span
        className={cn(
          "text-sm leading-relaxed sm:text-base",
          variant === "with" ? "text-foreground" : "text-foreground/72"
        )}
      >
        {children}
      </span>
    </span>
  );
}

export function ReliefSection() {
  return (
    <SectionShell tinted>
      <div className="flex flex-col gap-12">
        <Reveal>
          <SectionHeading
            align="center"
            eyebrow="Comparativo"
            title="Com Mensaliza vs sem Mensaliza"
            description="Veja a diferença objetiva na sua rotina de cobranças mensais."
            className="mx-auto"
          />
        </Reveal>

        <Reveal delay={60}>
          <div className="overflow-hidden rounded-xl border border-border bg-card">
            {/* Desktop table */}
            <div className="hidden md:block">
              <div
                className="grid border-b border-border"
                style={{ gridTemplateColumns: "minmax(7rem, .5fr) 1fr 1fr" }}
              >
                <div className="px-5 py-4 text-sm font-semibold text-foreground sm:px-6 sm:py-5">
                  Dificuldade
                </div>
                <div className="border-l border-border px-5 py-4 text-sm font-semibold text-foreground sm:px-6 sm:py-5">
                  Sem Mensaliza
                </div>
                <div className="border-l border-border bg-primary/3 px-5 py-4 text-sm font-semibold text-primary sm:px-6 sm:py-5">
                  Com Mensaliza
                </div>
              </div>

              {reliefComparison.map((item, index) => (
                <div
                  key={item.criterion}
                  className={cn(
                    "grid",
                    index < reliefComparison.length - 1 && "border-b border-border"
                  )}
                  style={{ gridTemplateColumns: "minmax(7rem, .5fr) 1fr 1fr" }}
                >
                  <div className="px-5 py-5 text-sm font-semibold leading-snug text-foreground sm:px-6 sm:py-6 sm:text-base">
                    {item.criterion}
                  </div>
                  <div className="border-l border-border px-5 py-5 sm:px-6 sm:py-6">
                    <ComparisonCell variant="without">{item.before}</ComparisonCell>
                  </div>
                  <div className="border-l border-border bg-primary/3 px-5 py-5 sm:px-6 sm:py-6">
                    <ComparisonCell variant="with">{item.after}</ComparisonCell>
                  </div>
                </div>
              ))}
            </div>

            {/* Mobile stacked rows */}
            <div className="divide-y divide-border md:hidden">
              {reliefComparison.map((item) => (
                <div key={item.criterion} className="flex flex-col gap-4 p-5">
                  <p className="text-base font-semibold text-foreground">{item.criterion}</p>
                  <div className="flex flex-col gap-3">
                    <div>
                      <p className="mb-1.5 text-xs font-medium text-muted-foreground">
                        Sem Mensaliza
                      </p>
                      <ComparisonCell variant="without">{item.before}</ComparisonCell>
                    </div>
                    <div className="rounded-lg bg-primary/3 p-3">
                      <p className="mb-1.5 text-xs font-medium text-primary">Com Mensaliza</p>
                      <ComparisonCell variant="with">{item.after}</ComparisonCell>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <p className="mx-auto max-w-2xl text-center text-lg font-semibold leading-relaxed text-foreground text-balance">
            Menos peso na consciência. Mais previsibilidade no bolso.
          </p>
        </Reveal>
      </div>
    </SectionShell>
  );
}
