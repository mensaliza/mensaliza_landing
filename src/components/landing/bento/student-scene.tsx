"use client";

import { QrCodeIcon } from "lucide-react";
import type { CSSProperties, ReactNode } from "react";

import { useDemoPlayback } from "@/components/landing/whatsapp-demo/use-demo-playback";
import {
  ConfirmedMessage,
  PaymentMessage,
  ReceiptSentMessage,
} from "@/components/landing/whatsapp-demo/whatsapp-messages";
import { heroConversation, studentSteps } from "@/lib/landing-content";
import { cn } from "cn";

/**
 * The student's side, told in their own WhatsApp: the charge, the Pix page (floating over the
 * chat, since it opens from the link), the receipt they send and the confirmation. The four
 * steps come in one after another the first time the card is on screen.
 */
function Step({ index, shown, className, children }: { index: number; shown: boolean; className?: string; children: ReactNode }) {
  return (
    <div
      style={{ "--bento-delay": `${index * 260}ms` } as CSSProperties}
      className={cn(shown ? "bento-rise" : "opacity-0", className)}
    >
      {children}
    </div>
  );
}

function PixPiece() {
  return (
    <div className="bento-piece w-[12.5rem] rounded-2xl p-3">
      <div className="flex items-center gap-2.5">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-foreground/[0.05]">
          <QrCodeIcon className="size-5 text-foreground/80" aria-hidden />
        </span>
        <span className="flex min-w-0 flex-col leading-tight">
          <span className="text-[12.5px] font-semibold">Pix copia e cola</span>
          <span className="truncate text-[11px] text-foreground/55">Para Rafa Personal</span>
        </span>
      </div>
      <div className="mt-2.5 flex items-center justify-between gap-2">
        <span className="text-[15px] font-semibold tracking-[-0.02em] tabular-nums">R$ 150,00</span>
        <span className="flex h-7 items-center rounded-lg bg-primary px-3 text-[12px] font-medium text-white">
          Copiar
        </span>
      </div>
    </div>
  );
}

export function StudentScene() {
  const { ref, inView, reducedMotion } = useDemoPlayback<HTMLDivElement>(0.35);
  const shown = inView || reducedMotion;

  return (
    <div ref={ref} className="absolute inset-0">
      <ol className="sr-only">
        {studentSteps.map((step) => (
          <li key={step}>{step}</li>
        ))}
      </ol>

      <div
        aria-hidden
        className="absolute top-6 right-0 bottom-0 left-6 flex flex-col gap-2 rounded-tl-2xl [mask-image:linear-gradient(to_bottom,black_82%,transparent)] bg-[#efeae2] p-3 shadow-[inset_0_0_0_1px_rgb(0_0_0/0.04)] sm:top-7 sm:left-7"
      >
        <Step index={0} shown={shown} className="max-w-[16rem]">
          <PaymentMessage conversation={heroConversation} />
        </Step>
        <Step index={2} shown={shown} className="mt-24 flex justify-end pr-1 sm:mt-3">
          <ReceiptSentMessage conversation={heroConversation} />
        </Step>
        <Step index={3} shown={shown} className="max-w-[16rem]">
          <ConfirmedMessage conversation={heroConversation} />
        </Step>
      </div>

      {/* The Pix page opens from the link, so it floats over the chat */}
      <Step index={1} shown={shown} className="absolute top-[12.25rem] left-3 z-10 sm:top-[12.5rem]">
        <div aria-hidden>
          <PixPiece />
        </div>
      </Step>
    </div>
  );
}
