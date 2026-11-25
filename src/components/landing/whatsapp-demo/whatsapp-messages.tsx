import { CheckCheckIcon, ExternalLinkIcon } from "lucide-react";
import type { ReactNode } from "react";

import { cn } from "cn";

/**
 * Bubbles copied from the app's onboarding stage
 * (`mensaliza-app/src/components/modules/onboarding/stage/whatsapp-*.tsx`), so the landing
 * shows the same messages the student really gets. Keep the wording in sync with the app.
 */

export type Conversation = {
  providerName: string;
  subscriberName: string;
  value: string;
  dueDate: string;
};

const CUSTOMER_BUBBLE = "bg-[oklch(from_var(--primary)_0.93_calc(c*0.35)_h)]";

function Strong({ children }: { children: ReactNode }) {
  return <span className="font-medium">{children}</span>;
}

function BubbleMeta({ time, outgoing = false }: { time: string; outgoing?: boolean }) {
  return (
    <span className="mt-1 flex items-center justify-end gap-0.5 text-[11px] leading-none text-foreground/60">
      {time}
      {outgoing ? <CheckCheckIcon className="size-3 text-primary" aria-hidden /> : null}
    </span>
  );
}

function BotBubble({ time, children, actions }: { time: string; children: ReactNode; actions?: string[] }) {
  return (
    <div className="w-fit max-w-[88%] overflow-hidden rounded-xl rounded-tl-sm bg-card text-foreground">
      <div className="px-2.5 pt-2 pb-1.5 text-[12.5px] leading-snug">
        <div className="flex flex-col gap-1.5 text-pretty">{children}</div>
        <BubbleMeta time={time} />
      </div>
      {actions?.map((action) => (
        <div
          key={action}
          className="flex items-center justify-center gap-1.5 border-t border-foreground/8 px-2.5 py-1.5 text-[12px] font-medium text-[#0a7cff]"
        >
          {action === "Ver cobrança" ? <ExternalLinkIcon className="size-3" aria-hidden /> : null}
          {action}
        </div>
      ))}
    </div>
  );
}

function CustomerBubble({ time, children }: { time: string; children: ReactNode }) {
  return (
    <div className={cn("w-fit max-w-[80%] overflow-hidden rounded-xl rounded-tr-sm p-1.5 text-foreground", CUSTOMER_BUBBLE)}>
      {children}
      <BubbleMeta time={time} outgoing />
    </div>
  );
}

function ReceiptMock({ value }: { value: string }) {
  return (
    <div className="relative aspect-[5/3.4] w-[9rem] overflow-hidden rounded-md bg-card">
      <div className="flex h-full flex-col gap-1 p-2">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-semibold text-foreground/72">Comprovante Pix</span>
          <span className="rounded bg-primary/10 px-1 py-0.5 text-[10px] font-semibold text-primary">Enviado</span>
        </div>
        <div className="mt-0.5 space-y-1">
          <div className="h-1.5 w-3/5 rounded-full bg-foreground/10" />
          <div className="h-1.5 w-4/5 rounded-full bg-foreground/10" />
          <div className="h-1.5 w-2/5 rounded-full bg-foreground/10" />
        </div>
        <div className="mt-auto rounded-md bg-muted/80 px-2 py-1.5">
          <p className="text-[10px] text-foreground/72">Valor</p>
          <p className="text-[12px] font-semibold tracking-[-0.02em] text-foreground">{value}</p>
        </div>
      </div>
    </div>
  );
}

type MessageProps = { conversation: Conversation };

export function PaymentMessage({ conversation }: MessageProps) {
  return (
    <BotBubble time="12:30" actions={["Ver cobrança"]}>
      <p>
        Olá, <Strong>{conversation.subscriberName}</Strong>!
      </p>
      <p>
        <Strong>{conversation.providerName}</Strong> registrou uma cobrança de{" "}
        <Strong>{conversation.value}</Strong>.
      </p>
      <p>
        Vencimento: <Strong>{conversation.dueDate}</Strong>.
      </p>
    </BotBubble>
  );
}

export function ReminderMessage({ conversation }: MessageProps) {
  return (
    <BotBubble time="12:30" actions={["Ver cobrança"]}>
      <p>
        Olá, <Strong>{conversation.subscriberName}</Strong>!
      </p>
      <p>
        Lembrete: a cobrança de <Strong>{conversation.value}</Strong> de{" "}
        <Strong>{conversation.providerName}</Strong> vence hoje.
      </p>
      <p>
        Vencimento: <Strong>{conversation.dueDate}</Strong>.
      </p>
    </BotBubble>
  );
}

export function ReceiptSentMessage({ conversation }: MessageProps) {
  return (
    <CustomerBubble time="14:07">
      <ReceiptMock value={conversation.value} />
    </CustomerBubble>
  );
}

export function ReceiptReceivedMessage({ conversation }: MessageProps) {
  return (
    <BotBubble time="14:07">
      <p>✨ Aí sim!! Comprovante de pagamento recebido!</p>
      <p>
        <Strong>{conversation.value}</Strong> · vence <Strong>{conversation.dueDate}</Strong>
      </p>
      <p>Agora é só aguardar o seu prestador de serviços confirmar seu pagamento...</p>
    </BotBubble>
  );
}

export function ConfirmedMessage({ conversation }: MessageProps) {
  return (
    <BotBubble time="14:20">
      <p>
        Pagamento confirmado para <Strong>{conversation.providerName}</Strong>.
      </p>
      <p>
        Valor: <Strong>{conversation.value}</Strong>.
      </p>
    </BotBubble>
  );
}
