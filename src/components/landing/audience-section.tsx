import { PersonaTile } from "@/components/landing/persona-tile";
import { Reveal } from "@/components/landing/motion/reveal";
import { SectionHeading } from "@/components/landing/section-heading";
import { SectionShell } from "@/components/landing/section-shell";
import { audienceSectionFooter, personas } from "@/lib/landing-content";

export function AudienceSection() {
  return (
    <SectionShell id="para-quem-e">
      <div className="flex flex-col gap-12">
        <Reveal>
          <SectionHeading
            align="center"
            title="Para quem cobra mensalidade todo mês"
            description="Nutricionistas, psicólogas, professores, mentores e negócios por assinatura — quem tem assinantes e quer parar de cobrar na mão."
            className="mx-auto max-w-3xl"
          />
        </Reveal>

        <ul
          className="grid list-none grid-cols-1 gap-4 p-0 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3"
          aria-label="Profissões e negócios atendidos pelo Mensaliza"
        >
          {personas.map((item, index) => (
            <Reveal key={item.persona} as="li" delay={60 + index * 40} className="min-w-0">
              <PersonaTile
                persona={item.persona}
                tagline={item.tagline}
                icon={item.icon}
                className="h-full"
              />
            </Reveal>
          ))}
        </ul>

        <Reveal delay={120}>
          <p className="mx-auto max-w-2xl text-center text-lg font-semibold leading-relaxed text-foreground text-balance">
            {audienceSectionFooter}
          </p>
        </Reveal>
      </div>
    </SectionShell>
  );
}
