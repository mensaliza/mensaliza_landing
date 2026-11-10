"use client";

import { cn } from "cn";

import { useDemoPlayback } from "@/components/landing/whatsapp-demo/use-demo-playback";

import { StatusChip } from "./status-chip";

/**
 * The professional's daily summary, sent at 08:00 to their own WhatsApp, next to the students
 * who are late. The student never gets a late message: lateness shows only here and in the panel.
 * Wording is an example built from the summary's real fields (to receive, late, due tomorrow).
 */
const LATE = [
  { name: "Lucas", since: "Venceu dia 5" },
  { name: "Pedro", since: "Venceu dia 8" },
];

function SummaryLine({ label, detail }: { label: string; detail: string }) {
  return (
    <span className="flex flex-col">
      <span className="font-medium">{label}</span>
      <span className="text-foreground/65 tabular-nums">{detail}</span>
    </span>
  );
}

export function SummaryScene() {
  const { ref, inView, reducedMotion } = useDemoPlayback<HTMLDivElement>(0.4);
  const shown = inView || reducedMotion;

  return (
    <div
      ref={ref}
      role="img"
      aria-label="Exemplo do resumo diário no seu WhatsApp às 8h: quanto falta receber, quem está atrasado e quem vence amanhã."
      className="absolute inset-0"
    >
      {/* Your WhatsApp */}
      <div className="bento-fade-bottom absolute top-7 right-0 bottom-0 left-[22%] rounded-tl-2xl bg-[#efeae2] p-3 shadow-[inset_0_0_0_1px_rgb(0_0_0/0.04)] sm:top-8 sm:left-[34%] sm:p-4">
        <div
          className={cn(
            "ml-auto w-fit max-w-[16.5rem] rounded-xl rounded-tl-sm bg-white px-3 pt-2.5 pb-1.5 text-[12.5px] leading-snug shadow-[0_1px_1px_rgb(0_0_0/0.06)]",
            shown ? "bento-rise" : "opacity-0"
          )}
        >
          <p className="font-semibold">Bom dia! Seu resumo de hoje:</p>
          <div className="mt-2 flex flex-col gap-1.5">
            <SummaryLine label="A receber" detail="4 alunos, R$ 600,00" />
            <SummaryLine label="Em atraso" detail="2 alunos, R$ 300,00" />
            <SummaryLine label="Vencem amanhã" detail="3 alunos, R$ 450,00" />
          </div>
          <span className="mt-1 block text-right text-[11px] text-foreground/55">08:00</span>
        </div>
      </div>

      {/* Late students in your panel */}
      <ul className="absolute bottom-6 left-5 flex w-[12.5rem] flex-col gap-2 sm:top-14 sm:bottom-auto sm:left-8 sm:w-[13.5rem]">
        {LATE.map((student, index) => (
          <li
            key={student.name}
            style={{ "--bento-delay": `${300 + index * 140}ms` } as React.CSSProperties}
            className={cn(
              "bento-piece flex items-center justify-between gap-3 rounded-2xl px-3.5 py-2.5",
              index > 0 && "max-sm:hidden",
              shown ? "bento-rise" : "opacity-0"
            )}
          >
            <span className="flex min-w-0 flex-col">
              <span className="truncate text-[13px] font-semibold">{student.name}</span>
              <span className="text-[11.5px] text-foreground/55">{student.since}</span>
            </span>
            <StatusChip status="late" />
          </li>
        ))}
      </ul>
    </div>
  );
}
