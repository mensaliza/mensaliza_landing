import { SectionHeading } from "@/components/landing/section-heading";
import { SectionShell } from "@/components/landing/section-shell";
import { TENNIS_LANDING_AUDIENCE } from "@/lib/landing-analytics";
import { tennisSolution } from "@/lib/tennis-landing-content";

export function TennisSolution() {
  return (
    <SectionShell
      id="tennis_solucao"
      labelledBy="tennis-solucao-titulo"
      analyticsSection="tennis_solucao"
      analyticsAudience={TENNIS_LANDING_AUDIENCE}
    >
      <SectionHeading
        titleId="tennis-solucao-titulo"
        title={tennisSolution.title}
        description={tennisSolution.lead}
      />
      <ol className="grid gap-4 lg:grid-cols-3">
        {tennisSolution.blocks.map((block, index) => (
          <li
            key={block.id}
            className="flex flex-col gap-4 rounded-xl border border-border bg-card p-6 sm:p-8"
          >
            <span className="font-mono text-sm font-medium text-primary">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className="text-xl font-semibold tracking-[-0.02em] text-balance">
              {block.title}
            </h3>
            <p className="text-base leading-relaxed text-muted-foreground text-pretty">
              {block.body}
            </p>
          </li>
        ))}
      </ol>
    </SectionShell>
  );
}
