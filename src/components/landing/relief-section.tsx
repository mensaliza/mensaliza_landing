import { ProfessionsMarquee } from "@/components/landing/relief/professions-marquee";
import { StruckPainPoints, type PainPointItem } from "@/components/landing/relief/struck-pain-points";
import { SectionShell } from "@/components/landing/section-shell";
import { audienceLine, audienceProfessions, painPoints } from "@/lib/landing-content";

/** Copy for a campaign page; the home uses the defaults. */
export type ReliefContent = {
  title: string;
  professions: readonly string[];
  audienceLine: string;
  painPoints: readonly PainPointItem[];
};

const HOME_RELIEF: ReliefContent = {
  title: "Para quem cobra mensalidade na mão todo mês",
  professions: audienceProfessions,
  audienceLine,
  painPoints,
};

/**
 * Who it is for, then the three chores it takes away. Type-led on purpose: the sections below
 * show the product, this one shows the chores being crossed out. White, so it does not merge
 * with the grey "Como funciona" right after it.
 */
export function ReliefSection({ content = HOME_RELIEF }: { content?: ReliefContent }) {
  return (
    <SectionShell id="para-quem-e" labelledBy="para-quem-e-titulo" analyticsSection="para_quem_e">
      <div className="flex flex-col gap-6">
        <h2
          id="para-quem-e-titulo"
          className="max-w-3xl text-[clamp(1.75rem,3.2vw,2.5rem)] leading-[1.12] font-semibold tracking-[-0.025em] text-balance"
        >
          {content.title}
        </h2>
        <ProfessionsMarquee professions={content.professions} line={content.audienceLine} />
      </div>

      <StruckPainPoints items={content.painPoints} />
    </SectionShell>
  );
}
