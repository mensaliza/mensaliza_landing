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

export function FeaturesSection() {
  return (
    <SectionShell id="funcionalidades" labelledBy="funcionalidades-titulo" analyticsSection="funcionalidades">
      <div className="flex max-w-3xl flex-col gap-3">
        <h2
          id="funcionalidades-titulo"
          className="text-[clamp(1.75rem,3.2vw,2.5rem)] leading-[1.12] font-semibold tracking-[-0.025em] text-balance"
        >
          O seu painel
        </h2>
        <p className="text-lg leading-relaxed text-foreground/75 text-pretty">
          Enquanto o WhatsApp cobra, você acompanha tudo num lugar só, no celular ou no computador.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-12">
        {features.map((feature) => {
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
