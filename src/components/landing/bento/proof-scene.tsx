"use client";

import { CheckIcon } from "lucide-react";

import { cn } from "cn";

import { StatusChip } from "./status-chip";
import { useStepLoop } from "./use-step-loop";

/** 0: receipt waiting · 1: your cursor goes to Confirmar · 2: pressed, confirmed, Ana is told. */
const STEPS = [1800, 1100, 3200] as const;

function Cursor() {
  return (
    <svg viewBox="0 0 16 18" className="size-4 drop-shadow-[0_1px_1px_rgb(0_0_0/0.25)]" aria-hidden>
      <path d="M1.5 1.2 14 8.4l-5.6 1.3-2.7 5.6z" fill="var(--foreground)" stroke="white" strokeWidth="1.2" strokeLinejoin="round" />
    </svg>
  );
}

export function ProofScene() {
  const { ref, step, reducedMotion } = useStepLoop(STEPS, 2);
  const confirmed = step === 2;
  const cursorOnButton = step >= 1;

  return (
    <div
      ref={ref}
      role="img"
      aria-label="Exemplo: o comprovante Pix da Ana chega no painel, você toca em Confirmar e ela é avisada no WhatsApp."
      className="absolute inset-0"
    >
      <div className="absolute top-9 left-1/2 w-[15.5rem] -translate-x-1/2">
        {/* Receipts still waiting, stacked behind */}
        <div aria-hidden className="bento-piece absolute inset-x-6 -top-5 h-20 rounded-2xl opacity-60" />
        <div aria-hidden className="bento-piece absolute inset-x-3 -top-2.5 h-20 rounded-2xl" />

        <div className="bento-piece relative rounded-2xl p-4">
          <div className="flex items-center justify-between gap-2">
            <span className="text-[13px] font-semibold">Comprovante Pix</span>
            {confirmed ? (
              <StatusChip status="paid" animate={!reducedMotion} />
            ) : (
              <span className="inline-flex h-6 items-center rounded-full bg-primary/10 px-2.5 text-[12px] font-medium text-primary">
                Novo
              </span>
            )}
          </div>
          <p className="mt-0.5 text-[12px] text-foreground/55">Ana enviou às 14:07</p>
          <p className="mt-3 text-[1.375rem] leading-none font-semibold tracking-[-0.02em] tabular-nums">R$ 150,00</p>
          <div aria-hidden className="mt-3 flex flex-col gap-1.5">
            <span className="h-1.5 w-11/12 rounded-full bg-foreground/[0.07]" />
            <span className="h-1.5 w-3/4 rounded-full bg-foreground/[0.07]" />
          </div>

          <div className="relative mt-4 grid grid-cols-2 gap-2 text-[12.5px] font-medium">
            <span className="flex h-8 items-center justify-center rounded-lg ring-1 ring-foreground/12 ring-inset">
              Recusar
            </span>
            <span
              key={confirmed ? "pressed" : "idle"}
              className={cn(
                "flex h-8 items-center justify-center rounded-lg bg-primary text-white",
                confirmed && !reducedMotion && "bento-press"
              )}
            >
              Confirmar
            </span>

            {/* Your cursor, coming in from outside the card */}
            <span
              aria-hidden
              className={cn(
                "bento-move absolute right-6 -bottom-3 flex items-start gap-1",
                cursorOnButton ? "translate-x-0 translate-y-0" : "translate-x-16 translate-y-14 opacity-0"
              )}
            >
              <Cursor />
              <span className="mt-3 rounded-full bg-foreground px-2 py-0.5 text-[11px] font-medium text-background">
                Você
              </span>
            </span>
          </div>
        </div>
      </div>

      {/* What happens on Ana's side */}
      <div
        className={cn(
          "bento-move bento-piece absolute bottom-5 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full py-1.5 pr-4 pl-1.5 whitespace-nowrap",
          confirmed ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
        )}
      >
        <span className="flex size-6 items-center justify-center rounded-full bg-[#14c95a] text-white">
          <CheckIcon className="size-3.5" strokeWidth={3} aria-hidden />
        </span>
        <span className="text-[12.5px] font-medium">Ana foi avisada no WhatsApp</span>
      </div>
    </div>
  );
}
