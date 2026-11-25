"use client";

import { useCountUp } from "@/components/landing/use-count-up";
import { cn } from "cn";

import type { DemoStage } from "./whatsapp-conversation-demo";

/**
 * The professional's side of the same moment, as a month statement in the brand orange:
 * a big received total that ticks up when Ana pays, the month filling up, and the latest
 * activity, with the same times as the messages in the phone. Example data, like the chat.
 */

/** The month in the card. Defaults are the home's example (Ana pays R$ 150). */
export type PanelMonth = {
  subscriberName: string;
  /** What this subscriber pays, in reais. */
  amount: number;
  receivedBefore: number;
  expected: number;
};

const HOME_MONTH: PanelMonth = {
  subscriberName: "Ana",
  amount: 150,
  receivedBefore: 1700,
  expected: 2400,
};

/** Same times as the bubbles in the phone; short enough to stay on one line. */
const ACTIVITY: Record<DemoStage, { text: string; time: string }> = {
  charge: { text: "Cobrança enviada", time: "12:30" },
  reminder: { text: "Lembrete enviado", time: "12:30" },
  receipt: { text: "Comprovante recebido", time: "14:07" },
  confirmed: { text: "Pagamento confirmado", time: "14:20" },
};

const brl = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });

export function PanelCard({
  stage,
  month = HOME_MONTH,
  className,
}: {
  stage: DemoStage;
  month?: PanelMonth;
  className?: string;
}) {
  const { subscriberName, amount, receivedBefore, expected } = month;
  const paid = stage === "confirmed";
  const received = useCountUp(paid ? receivedBefore + amount : receivedBefore);
  const progress = Math.round(((paid ? receivedBefore + amount : receivedBefore) / expected) * 100);

  const activity = ACTIVITY[stage];

  return (
    <div
      role="img"
      aria-label={`Exemplo do painel do profissional: quando ${subscriberName} manda o comprovante e você confirma, o recebido do mês sobe de ${brl.format(receivedBefore)} para ${brl.format(receivedBefore + amount)}.`}
      className={cn(
        "panel-statement relative flex flex-col overflow-hidden rounded-[1.5rem] bg-primary p-4 text-white lg:p-5",
        className
      )}
    >
      <span className="text-[12px] font-medium text-white/80">Recebido em novembro</span>
      <span className="mt-0.5 text-[1.875rem] leading-[1.1] font-semibold tracking-[-0.03em] tabular-nums lg:text-[2.25rem]">
        {brl.format(received)}
      </span>

      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/25" aria-hidden>
        <div
          className="h-full rounded-full bg-white transition-[width] duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
          style={{ width: `${progress}%` }}
        />
      </div>
      <span className="mt-1.5 text-[11px] text-white/75 tabular-nums">
        {progress}% de {brl.format(expected)} previstos
      </span>

      <div className="mt-4 border-t border-white/20 pt-3">
        <div key={stage} className="panel-activity flex flex-col gap-0.5 leading-snug">
          <div className="flex items-baseline justify-between gap-3">
            <span className="text-[13px] font-semibold">{subscriberName}</span>
            <span className="text-[11px] text-white/70 tabular-nums">{activity.time}</span>
          </div>
          <span className="truncate text-[12px] text-white/80">{activity.text}</span>
        </div>
      </div>
    </div>
  );
}
