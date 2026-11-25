"use client";

import { cn } from "cn";

import { StatusChip, type PaymentStatus } from "./status-chip";
import { useStepLoop } from "./use-step-loop";

/** 0: as it is · 1: Maria Clara pays · 2: Giovani's billing is switched off. */
const STEPS = [2400, 2600, 3200] as const;

type Row = { name: string; value: string; day: string; status: (step: number) => PaymentStatus };

const ROWS: Row[] = [
  { name: "Ana", value: "R$ 150", day: "Dia 17", status: () => "paid" },
  { name: "Maria Clara", value: "R$ 180", day: "Dia 5", status: (step) => (step >= 1 ? "paid" : "open") },
  { name: "Lucas", value: "R$ 150", day: "Dia 5", status: () => "late" },
  { name: "Giovani", value: "R$ 120", day: "Dia 10", status: (step) => (step >= 2 ? "paused" : "open") },
];

export function StudentsScene() {
  const { ref, step, reducedMotion } = useStepLoop(STEPS, 2);
  const billingOn = step < 2;

  return (
    <div
      ref={ref}
      role="img"
      aria-label="Exemplo da lista de assinantes: cada um com valor, dia de vencimento e status. A Maria Clara paga e a cobrança do Giovani é desligada."
      className="absolute inset-0"
    >
      <div className="bento-piece bento-fade absolute top-10 left-6 w-[38rem] rounded-2xl sm:top-11 sm:left-8">
        <div className="flex items-baseline gap-2 border-b border-foreground/[0.06] px-5 py-3.5">
          <span className="text-[14px] font-semibold">Assinantes</span>
          <span className="text-[12px] text-foreground/55 tabular-nums max-sm:hidden">32 ativos</span>
        </div>
        <ul>
          {ROWS.map((row) => {
            const status = row.status(step);
            const paused = status === "paused";
            const changed = !reducedMotion && step > 0 && row.status(step) !== row.status(step - 1);
            return (
              <li
                key={row.name}
                className={cn(
                  "bento-move grid grid-cols-[7rem_4.5rem_auto] sm:grid-cols-[8.5rem_5rem_4.5rem_auto] items-center gap-3 border-b border-foreground/[0.05] px-5 py-2.5 text-[13px] last:border-b-0",
                  changed && status === "paid" && "bg-[#14c95a]/[0.06]"
                )}
              >
                <span className={cn("truncate font-medium transition-opacity", paused && "opacity-45")}>{row.name}</span>
                <span className={cn("text-foreground/70 tabular-nums transition-opacity", paused && "opacity-45")}>
                  {row.value}
                </span>
                <span className={cn("hidden text-foreground/55 tabular-nums transition-opacity sm:block", paused && "opacity-45")}>
                  {row.day}
                </span>
                <span>
                  <StatusChip status={status} animate={changed} />
                </span>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Floating control: billing for one student, switched off in the last step. */}
      <div className="bento-piece absolute top-4 right-4 flex items-center gap-3 rounded-full py-2 pr-2.5 pl-4 sm:top-5 sm:right-6">
        <span className="text-[12.5px] font-medium whitespace-nowrap">Cobrança do Giovani</span>
        <span
          aria-hidden
          className={cn(
            "bento-move relative h-5 w-9 shrink-0 rounded-full",
            billingOn ? "bg-primary" : "bg-foreground/20"
          )}
        >
          <span
            className={cn(
              "bento-move absolute top-0.5 left-0.5 size-4 rounded-full bg-white shadow-sm",
              billingOn ? "translate-x-4" : "translate-x-0"
            )}
          />
        </span>
      </div>
    </div>
  );
}
