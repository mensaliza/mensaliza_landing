import { CalendarClockIcon, FileImageIcon, ListChecksIcon } from "lucide-react";

import { SectionHeading } from "@/components/landing/section-heading";
import { SectionShell } from "@/components/landing/section-shell";
import { TENNIS_LANDING_AUDIENCE } from "@/lib/landing-analytics";
import { tennisProduct } from "@/lib/tennis-landing-content";

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
            <p className="text-right font-mono text-sm font-medium tabular-nums text-foreground">
              {student.amount}
            </p>
            <p className="text-xs text-foreground/72">
              {student.tag} · {student.day}
            </p>
            <p
              className={
                student.status === "Comprovante pendente"
                  ? "justify-self-end rounded-md bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary"
                  : "justify-self-end text-xs font-medium text-foreground/80"
              }
            >
              {student.status}
            </p>
          </li>
        ))}
      </ul>
    </figure>
  );
}

export function TennisProduct() {
  return (
    <SectionShell
      id="tennis_produto"
      labelledBy="tennis-produto-titulo"
      tinted
      analyticsSection="tennis_produto"
      analyticsAudience={TENNIS_LANDING_AUDIENCE}
    >
      <SectionHeading
        titleId="tennis-produto-titulo"
        title={tennisProduct.title}
        description={tennisProduct.lead}
      />
      <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-16">
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
      </div>
    </SectionShell>
  );
}
