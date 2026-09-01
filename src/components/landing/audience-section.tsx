import { PersonaTile } from "@/components/landing/persona-tile";
import { Reveal } from "@/components/landing/motion/reveal";
import { SectionHeading } from "@/components/landing/section-heading";
import { SectionShell } from "@/components/landing/section-shell";
import { audienceSectionFooter, personas } from "@/lib/landing-content";

export function AudienceSection() {
  return (
    <SectionShell id="para-quem-e" labelledBy="para-quem-e-titulo" analyticsSection="para_quem_e">
      <div className="flex flex-col gap-12">
        <Reveal>
          <SectionHeading
            align="center"
            titleId="para-quem-e-titulo"
            title="Para quem cobra mensalidade todo mês"
            description="Nutricionistas, psicólogas, professores, mentores e negócios por assinatura — quem tem assinantes e quer parar de cobrar na mão."
            className="mx-auto max-w-3xl"
          />
        </Reveal>

        <ul
          className="grid list-none grid-cols-1 gap-x-10 gap-y-4 sm:gap-y-8 p-0 sm:grid-cols-2 lg:grid-cols-3"
          aria-label="Profissões e negócios atendidos pelo Mensaliza"
        >
          {personas.map((item) => (
            <li
              key={item.persona}
              className="min-w-0 border-t border-border pt-3 sm:pt-4"
            >
              <PersonaTile
                persona={item.persona}
                tagline={item.tagline}
                icon={item.icon}
              />
            </li>
          ))}
        </ul>

        <p className="mx-auto max-w-2xl text-center text-lg font-semibold leading-relaxed text-foreground text-balance">
          {audienceSectionFooter}
        </p>
      </div>
    </SectionShell>
  );
}
