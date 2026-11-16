import { CalendarClockIcon, FileImageIcon, ListChecksIcon } from "lucide-react";

import { Reveal } from "@/components/landing/motion/reveal";
import { SectionHeading } from "@/components/landing/section-heading";
import { SectionShell } from "@/components/landing/section-shell";
import { TENNIS_LANDING_AUDIENCE } from "@/lib/landing-analytics";
import { tennisProduct } from "@/lib/tennis-landing-content";
import { cn } from "cn";

const pointIcons = {
  status: ListChecksIcon,
  receipt: FileImageIcon,
  repeat: CalendarClockIcon,
} as const;

const students = [
  { name: "Ana Costa", tag: "Tênis", amount: "R$ 280,00", day: "Dia 5", status: "Paga" },
  {
    name: "Pedro Lima",
    tag: "Beach tennis",
    amount: "R$ 320,00",
    day: "Dia 10",
    status: "Comprovante pendente",
  },
  { name: "Júlia Mendes", tag: "Tênis", amount: "R$ 250,00", day: "Dia 15", status: "Em aberto" },
  {
    name: "Rafael Souza",
    tag: "Beach tennis",
    amount: "R$ 300,00",
    day: "Dia 1",
    status: "Atrasada",
  },
  { name: "Camila Rocha", tag: "Tênis", amount: "R$ 280,00", day: "Dia 20", status: "Paga" },
] as const;

type StudentStatus = (typeof students)[number]["status"];

/** Same status language as the home demos: dot + label, chip for the actionable state, no green. */
function StudentStatusLabel({ status }: { status: StudentStatus }) {
  if (status === "Comprovante pendente") {
    return (
      <span className="justify-self-end rounded-md bg-primary/12 px-1.5 py-0.5 text-[11px] leading-none font-medium text-primary">
        {status}
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1 justify-self-end text-[11px] font-medium">
      <span
        className={cn(
          "size-1.5 shrink-0 rounded-full",
          status === "Atrasada" && "bg-destructive",
          status === "Paga" && "bg-primary",
          status === "Em aberto" && "bg-foreground/30"
        )}
        aria-hidden
      />
      <span className={status === "Atrasada" ? "text-destructive" : "text-foreground/72"}>{status}</span>
    </span>
  );
}

function TennisStudentsBoard() {
  return (
    <figure className="overflow-hidden rounded-xl border border-border bg-card">
      <figcaption className="border-b border-border px-4 py-3 text-sm font-medium text-foreground/72">
        Exemplo do painel
      </figcaption>
      <ul>
        {students.map((student) => (
          <li
            key={student.name}
            className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-3 gap-y-1 border-b border-border px-4 py-3 last:border-b-0"
          >
            <p className="truncate text-sm font-semibold text-foreground">{student.name}</p>
            <p className="text-right font-heading text-sm font-semibold tabular-nums text-foreground">
              {student.amount}
            </p>
            <p className="text-xs text-foreground/72">
              {student.tag} · {student.day}
            </p>
            <StudentStatusLabel status={student.status} />
          </li>
        ))}
      </ul>
    </figure>
  );
}

export function TennisProduct() {
  return (
    <SectionShell
      id="painel"
      labelledBy="tennis-produto-titulo"
      tinted
      analyticsSection="tennis_produto"
      analyticsAudience={TENNIS_LANDING_AUDIENCE}
    >
      <Reveal>
        <SectionHeading
          align="center"
          titleId="tennis-produto-titulo"
          title={tennisProduct.title}
          description={tennisProduct.lead}
          className="mx-auto"
        />
      </Reveal>
      <Reveal
        delay={60}
        className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-16"
      >
        <TennisStudentsBoard />
        <ul className="flex flex-col gap-6">
          {tennisProduct.points.map((point) => {
            const Icon = pointIcons[point.id];

            return (
              <li key={point.id} className="flex items-start gap-4">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Icon className="size-5" aria-hidden />
                </span>
                <div className="flex flex-col gap-1">
                  <h3 className="text-lg font-semibold tracking-[-0.01em]">{point.title}</h3>
                  <p className="text-sm leading-relaxed text-foreground/72 text-pretty sm:text-base">
                    {point.body}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </Reveal>
    </SectionShell>
  );
}
