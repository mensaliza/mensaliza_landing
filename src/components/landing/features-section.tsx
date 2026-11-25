import { BentoCard } from "@/components/landing/bento/bento-card";
import { MonthScene } from "@/components/landing/bento/month-scene";
import { ProofScene } from "@/components/landing/bento/proof-scene";
import { StudentsScene } from "@/components/landing/bento/students-scene";
import { SummaryScene } from "@/components/landing/bento/summary-scene";
import { SectionShell } from "@/components/landing/section-shell";
import { features } from "@/lib/landing-content";

const scenes = {
  alunos: StudentsScene,
  mes: MonthScene,
  comprovantes: ProofScene,
  atrasados: SummaryScene,
} as const;

/** Wide, narrow / narrow, wide: the list and the daily summary get the room they need. */
const spans = {
  alunos: "lg:col-span-7",
  mes: "lg:col-span-5",
  comprovantes: "lg:col-span-5",
  atrasados: "lg:col-span-7",
} as const;

type FeatureId = (typeof features)[number]["id"];

/** Copy for a campaign page; the four scenes stay the same. The home uses the defaults. */
export type FeaturesContent = {
  title: string;
  description: string;
  items: readonly { id: FeatureId; title: string; description: string }[];
};

const HOME_FEATURES: FeaturesContent = {
  title: "O seu painel",
  description:
    "Enquanto o WhatsApp cobra, você acompanha tudo num lugar só, no celular ou no computador.",
  items: features,
};

export function FeaturesSection({ content = HOME_FEATURES }: { content?: FeaturesContent }) {
  return (
    <SectionShell id="funcionalidades" labelledBy="funcionalidades-titulo" analyticsSection="funcionalidades">
      <div className="flex max-w-3xl flex-col gap-3">
        <h2
          id="funcionalidades-titulo"
          className="text-[clamp(1.75rem,3.2vw,2.5rem)] leading-[1.12] font-semibold tracking-[-0.025em] text-balance"
        >
          {content.title}
        </h2>
        <p className="text-lg leading-relaxed text-foreground/75 text-pretty">
          {content.description}
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-12">
        {content.items.map((feature) => {
          const Scene = scenes[feature.id];
          return (
            <BentoCard
              key={feature.id}
              title={feature.title}
              description={feature.description}
              className={spans[feature.id]}
            >
              <Scene />
            </BentoCard>
          );
        })}
      </div>
    </SectionShell>
  );
}
